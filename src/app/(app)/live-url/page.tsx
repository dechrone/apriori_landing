"use client";

/**
 * Live URL Testing — synthetic personas autonomously drive a real website.
 *
 * Fully separate from the design-sim / live-app wizards. Streams NDJSON from
 * POST /api/v1/simulations/live-url/run and renders an agentic console
 * (realtime agent cam + scrubbable activity feed) followed by a PM-grade
 * report: completion stats, a PostHog-style 3-layer attention heatmap, the
 * server-side technical issues the agents tripped, and per-persona transcripts.
 */

import { useState, useRef, useCallback } from "react";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Globe,
  Play,
  Square,
  ChevronDown,
  ChevronRight,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { runLiveUrlSimulation, type LiveUrlPayload, type LiveUrlAuth } from "@/lib/backend-simulation";
import { listPoolTemplates } from "@/data/pool-templates";
import {
  LiveUrlReport,
  StatusLed,
  ACTION_LABEL,
  type Insights,
  type AgentState,
  type StepEvent,
} from "@/components/live-url/LiveUrlReport";

// ---------------------------------------------------------------------------
// Event + state types (loose — live-url events aren't in the shared union).
// Shared shapes (StepEvent/AgentState/Insights) + the report live in
// @/components/live-url/LiveUrlReport so the saved-run viewer renders identically.
// ---------------------------------------------------------------------------

type AuthMode = "none" | "self_signup" | "existing_login" | "session";

interface LiveEventData extends Partial<StepEvent>, Insights {
  persona_uuid?: string;
  persona_name?: string;
  completed?: boolean;
  final_intent?: string;
  overall_monologue?: string;
  num_steps?: number;
  message?: string;
  occupation?: string;
  archetype?: string;
  age?: number;
  zone?: string;
}

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

interface SetupProps {
  startUrl: string; setStartUrl: Dispatch<string>;
  targetGroup: string; setTargetGroup: Dispatch<string>;
  goal: string; setGoal: Dispatch<string>;
  objective: string; setObjective: Dispatch<string>;
  numPersonas: number; setNumPersonas: Dispatch<number>;
  viewport: "mobile" | "desktop"; setViewport: Dispatch<"mobile" | "desktop">;
  productDomain: "investment" | "fintech" | "dating"; setProductDomain: Dispatch<"investment" | "fintech" | "dating">;
  country: "IN" | "US"; setCountry: Dispatch<"IN" | "US">;
  poolId: string; setPoolId: Dispatch<string>;
  maxSteps: number; setMaxSteps: Dispatch<number>;
  blockIrreversible: boolean; setBlockIrreversible: Dispatch<boolean>;
  showAdvanced: boolean; setShowAdvanced: Dispatch<boolean>;
  showAuth: boolean; setShowAuth: Dispatch<boolean>;
  authMode: AuthMode; setAuthMode: Dispatch<AuthMode>;
  username: string; setUsername: Dispatch<string>;
  password: string; setPassword: Dispatch<string>;
  loginUrl: string; setLoginUrl: Dispatch<string>;
  storageState: string; setStorageState: Dispatch<string>;
  onStart: () => void;
}

interface RunViewProps {
  agents: Record<string, AgentState>;
  order: string[];
  activeUuid: string | null;
  setActiveUuid: (u: string) => void;
  selStep: number | "live";
  setSelStep: (s: number | "live") => void;
  insights: Insights | null;
  phase: "setup" | "running" | "done";
  onStop: () => void;
  onReset: () => void;
}

export default function LiveUrlPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId } = useUser();
  const { showToast } = useToast();
  const err = useCallback((m: string) => showToast("error", m), [showToast]);

  const [phase, setPhase] = useState<"setup" | "running" | "done">("setup");

  // form
  const [startUrl, setStartUrl] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [goal, setGoal] = useState("");
  const [objective, setObjective] = useState("");
  const [numPersonas, setNumPersonas] = useState(3);
  const [viewport, setViewport] = useState<"mobile" | "desktop">("mobile");
  const [productDomain, setProductDomain] = useState<"investment" | "fintech" | "dating">("investment");
  const [country, setCountry] = useState<"IN" | "US">("IN");
  const [poolId, setPoolId] = useState("");  // "" = let the audience router pick
  const [maxSteps, setMaxSteps] = useState(40);
  const [blockIrreversible, setBlockIrreversible] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("none");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUrl, setLoginUrl] = useState("");
  const [storageState, setStorageState] = useState("");

  // run state
  const [agents, setAgents] = useState<Record<string, AgentState>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [activeUuid, setActiveUuid] = useState<string | null>(null);
  const [selStep, setSelStep] = useState<number | "live">("live");
  const [insights, setInsights] = useState<Insights | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sawInsightsRef = useRef(false);  // did insights_ready arrive this run?
  const sawErrorRef = useRef(false);     // was an error already surfaced this run?

  const upsertAgent = useCallback((uuid: string, patch: Partial<AgentState>) => {
    setAgents((prev) => {
      const existing = prev[uuid] ?? { uuid, name: uuid.slice(0, 8), status: "running" as const, steps: [] };
      return { ...prev, [uuid]: { ...existing, ...patch } };
    });
  }, []);

  const handleEvent = useCallback((ev: { type: string; data: LiveEventData }) => {
    const d = ev.data ?? {};
    const uuid = d.persona_uuid;
    switch (ev.type) {
      case "persona_started":
        if (!uuid) break;
        setOrder((o) => (o.includes(uuid) ? o : [...o, uuid]));
        upsertAgent(uuid, { name: d.persona_name, status: "running", steps: [] });
        setActiveUuid((a) => a ?? uuid);
        break;
      case "step":
        if (!uuid) break;
        setAgents((prev) => {
          const a = prev[uuid] ?? { uuid, name: uuid.slice(0, 8), status: "running" as const, steps: [] };
          return {
            ...prev,
            [uuid]: {
              ...a,
              occupation: d.occupation ?? a.occupation,
              archetype: d.archetype ?? a.archetype,
              age: d.age ?? a.age,
              zone: d.zone ?? a.zone,
              steps: [...a.steps, d as StepEvent],
            },
          };
        });
        break;
      case "persona_complete":
        if (!uuid) break;
        upsertAgent(uuid, {
          status: d.completed ? "completed" : "dropped",
          finalIntent: d.final_intent,
          monologue: d.overall_monologue,
          numSteps: d.num_steps,
        });
        break;
      case "persona_error":
        if (!uuid) break;
        upsertAgent(uuid, { status: "error", error: d.message });
        break;
      case "insights_ready":
        sawInsightsRef.current = true;
        setInsights(d as Insights);
        setPhase("done");
        break;
      case "error":
        sawErrorRef.current = true;
        err(d.message ?? "Run failed");
        break;
    }
  }, [upsertAgent, err]);

  const start = useCallback(async () => {
    if (!userId) { err("Not signed in."); return; }
    if (!startUrl.trim()) { err("Enter a URL."); return; }
    if (targetGroup.trim().length < 3) { err("Describe the audience (the personas to send)."); return; }
    if (goal.trim().length < 5) { err("Add product context so personas form the right intent."); return; }

    let auth: LiveUrlAuth | undefined;
    if (authMode === "self_signup") auth = { create_account: true };
    else if (authMode === "existing_login") auth = { username: username.trim(), password: password.trim(), login_url: loginUrl.trim() || undefined };
    else if (authMode === "session") {
      try { auth = { storage_state: JSON.parse(storageState) }; }
      catch { err("Session must be valid JSON (a Playwright storage_state)."); return; }
    }

    setAgents({}); setOrder([]); setActiveUuid(null); setSelStep("live"); setInsights(null);
    sawInsightsRef.current = false; sawErrorRef.current = false;
    setPhase("running");

    const payload: LiveUrlPayload = {
      start_url: startUrl.trim(),
      goal: goal.trim(),
      objective: objective.trim() || undefined,
      target_group: targetGroup.trim(),
      num_personas: numPersonas,
      max_steps_per_persona: maxSteps,
      mode: "autonomous",
      viewport,
      block_irreversible: blockIrreversible,
      product_domain: productDomain,
      country,
      pool_id: poolId || undefined,
      auth,
    };

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    let streamed = false;
    try {
      const res = await runLiveUrlSimulation(payload, ctrl.signal);
      if (!res.ok || !res.body) {
        err(`Run failed (${res.status})`);
        setPhase("setup");
        return;
      }
      const reader = res.body.getReader();
      // Cancel a pending reader.read() the moment Stop is pressed — otherwise the
      // loop blocks in read() between NDJSON chunks and the run stays "running".
      ctrl.signal.addEventListener("abort", () => { reader.cancel().catch(() => {}); }, { once: true });
      streamed = true;
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        if (ctrl.signal.aborted) { try { reader.cancel(); } catch {} break; }
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t) continue;
          try { handleEvent(JSON.parse(t)); } catch { /* skip partial */ }
        }
      }
    } catch (e) {
      if (!ctrl.signal.aborted) { sawErrorRef.current = true; err(e instanceof Error ? e.message : "Stream error"); }
    } finally {
      // Stream closed without insights_ready (backend error / timeout / early
      // termination) — don't leave the UI stuck on "Agents working…". The normal
      // insights_ready path already set phase to "done" (sawInsightsRef), and Stop
      // set it via abort, so this only fires on an abnormal close.
      if (streamed && !ctrl.signal.aborted) {
        setPhase((p) => (p === "running" ? "done" : p));
        if (!sawInsightsRef.current && !sawErrorRef.current) {
          err("The run ended without a final report (backend error or timeout).");
        }
      }
    }
  }, [userId, startUrl, targetGroup, goal, objective, numPersonas, maxSteps, viewport, blockIrreversible, productDomain, country, poolId, authMode, username, password, loginUrl, storageState, handleEvent, err]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setPhase((p) => (p === "running" ? "done" : p));
  }, []);

  return (
    <>
      <TopBar title="Live URL Testing" onMenuClick={toggleMobileMenu} />
      <div className="p-5 sm:p-8 lg:p-10 space-y-6">
        {phase === "setup" ? (
          <SetupForm
            startUrl={startUrl} setStartUrl={setStartUrl}
            targetGroup={targetGroup} setTargetGroup={setTargetGroup}
            goal={goal} setGoal={setGoal}
            objective={objective} setObjective={setObjective}
            numPersonas={numPersonas} setNumPersonas={setNumPersonas}
            viewport={viewport} setViewport={setViewport}
            productDomain={productDomain} setProductDomain={setProductDomain}
            country={country} setCountry={setCountry}
            poolId={poolId} setPoolId={setPoolId}
            maxSteps={maxSteps} setMaxSteps={setMaxSteps}
            blockIrreversible={blockIrreversible} setBlockIrreversible={setBlockIrreversible}
            showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
            showAuth={showAuth} setShowAuth={setShowAuth}
            authMode={authMode} setAuthMode={setAuthMode}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            loginUrl={loginUrl} setLoginUrl={setLoginUrl}
            storageState={storageState} setStorageState={setStorageState}
            onStart={start}
          />
        ) : (
          <RunView
            agents={agents}
            order={order}
            activeUuid={activeUuid}
            setActiveUuid={(u: string) => { setActiveUuid(u); setSelStep("live"); }}
            selStep={selStep}
            setSelStep={setSelStep}
            insights={insights}
            phase={phase}
            onStop={stop}
            onReset={() => { setPhase("setup"); setInsights(null); }}
          />
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Setup form
// ---------------------------------------------------------------------------

function SetupForm(p: SetupProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-accent-gold/10 p-2.5 text-accent-gold"><Globe className="w-6 h-6" /></div>
        <div>
          <h2 className="text-h3 text-text-primary">Test a live website</h2>
          <p className="text-body-sm text-text-secondary">Synthetic personas open the URL, pursue the task on their own, and report what broke.</p>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-5 py-6">
          <Input label="URL" required placeholder="https://www.urbancompany.com/bangalore" value={p.startUrl} onChange={(e) => p.setStartUrl(e.target.value)} />
          <Input label="Audience" required placeholder="mid-income salaried professionals in Bengaluru" helperText="Free-text segment — the audience router picks a matching persona pool." value={p.targetGroup} onChange={(e) => p.setTargetGroup(e.target.value)} />
          <Textarea label="Product context" required placeholder="Urban Company is an at-home services marketplace (salon, cleaning, repairs)." helperText="Grounds each persona's intent so they don't assume the wrong category." value={p.goal} onChange={(e) => p.setGoal(e.target.value)} rows={2} />
          <Textarea label="Objective" placeholder="Book a salon-at-home appointment for this weekend." helperText="What success looks like. Graded post-hoc — never injected into per-step decisions." value={p.objective} onChange={(e) => p.setObjective(e.target.value)} rows={2} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#4B5563]">Personas</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 5, 10].map((n) => (
                  <button key={n} type="button" onClick={() => p.setNumPersonas(n)}
                    className={`h-9 w-10 rounded-lg border text-sm font-medium transition-colors ${p.numPersonas === n ? "border-accent-gold bg-accent-gold/10 text-accent-gold" : "border-border text-text-secondary hover:border-text-tertiary"}`}>{n}</button>
                ))}
              </div>
            </div>
            <Select label="Viewport" value={p.viewport} onChange={(e) => p.setViewport(e.target.value as "mobile" | "desktop")}
              options={[{ value: "mobile", label: "Mobile (390×844)" }, { value: "desktop", label: "Desktop (1280×800)" }]} />
            <Select label="Domain" value={p.productDomain} onChange={(e) => p.setProductDomain(e.target.value as "investment" | "fintech" | "dating")}
              options={[{ value: "investment", label: "Investment" }, { value: "fintech", label: "Fintech" }, { value: "dating", label: "Dating" }]} />
            <Select label="Country" value={p.country} onChange={(e) => p.setCountry(e.target.value as "IN" | "US")}
              options={[{ value: "IN", label: "India" }, { value: "US", label: "United States" }]} />
          </div>

          <Select
            label="Persona pool"
            helperText="Pin a curated pool, or let the audience router pick from your description."
            value={p.poolId}
            onChange={(e) => p.setPoolId(e.target.value)}
            options={[
              { value: "", label: "Auto — router picks from the audience" },
              ...listPoolTemplates(p.country).map((t) => ({
                value: t.pool_id,
                label: `${t.display_name} (~${t.target_size.toLocaleString()})`,
              })),
            ]}
          />
        </CardContent>
      </Card>

      {/* Login / signup gate */}
      <Card>
        <button type="button" onClick={() => p.setShowAuth(!p.showAuth)} className="flex w-full items-center justify-between px-5 py-4 text-body-sm font-medium text-text-primary">
          <span>Login / signup gate (optional)</span>
          {p.showAuth ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {p.showAuth && (
          <div className="space-y-4 border-t border-border px-5 py-5">
            <div className="flex flex-wrap gap-2">
              {([["none", "No gate"], ["self_signup", "Agents self-signup"], ["existing_login", "Existing account"], ["session", "Reuse my session"]] as const).map(([m, lbl]) => (
                <button key={m} type="button" onClick={() => p.setAuthMode(m)}
                  className={`h-9 px-3 rounded-lg border text-sm transition-colors ${p.authMode === m ? "border-accent-gold bg-accent-gold/10 text-accent-gold" : "border-border text-text-secondary hover:border-text-tertiary"}`}>{lbl}</button>
              ))}
            </div>
            {p.authMode === "self_signup" && (
              <p className="text-body-sm text-text-tertiary">Each persona gets its own email inbox (AgentMail), signs up as a brand-new user, and reads the verification code from its inbox. Requires <code className="text-text-secondary">AGENTMAIL_API_KEY</code> on the backend.</p>
            )}
            {p.authMode === "existing_login" && (
              <div className="space-y-3">
                <Input label="Username / email" placeholder="test@yourapp.com" value={p.username} onChange={(e) => p.setUsername(e.target.value)} />
                <Input label="Password" type="password" value={p.password} onChange={(e) => p.setPassword(e.target.value)} />
                <Input label="Login URL" placeholder="defaults to the start URL" value={p.loginUrl} onChange={(e) => p.setLoginUrl(e.target.value)} />
                <p className="text-body-sm text-text-tertiary">Apriori logs in once headlessly, captures the session, and every persona starts authenticated.</p>
              </div>
            )}
            {p.authMode === "session" && (
              <div className="space-y-2">
                <Textarea label="Playwright storage_state (JSON)" placeholder='{"cookies":[...],"origins":[...]}' value={p.storageState} onChange={(e) => p.setStorageState(e.target.value)} rows={4} />
                <p className="text-body-sm text-text-tertiary">Paste a previously exported session. Tokens are sensitive — rotate by signing out after the run.</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Advanced */}
      <Card>
        <button type="button" onClick={() => p.setShowAdvanced(!p.showAdvanced)} className="flex w-full items-center justify-between px-5 py-4 text-body-sm font-medium text-text-primary">
          <span>Advanced</span>
          {p.showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {p.showAdvanced && (
          <div className="space-y-4 border-t border-border px-5 py-5">
            <Input label="Max steps per persona" type="number" min={5} max={200} value={p.maxSteps} onChange={(e) => p.setMaxSteps(Math.max(5, Math.min(200, Number(e.target.value) || 40)))} />
            <label className="flex items-center gap-2 text-body-sm text-text-secondary">
              <input type="checkbox" checked={p.blockIrreversible} onChange={(e) => p.setBlockIrreversible(e.target.checked)} className="accent-[#d4a017]" />
              Block irreversible actions (pay / place-order / OTP)
            </label>
          </div>
        )}
      </Card>

      <Button variant="primary" onClick={p.onStart}>
        <Play className="w-4 h-4" /> Run live test
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Run view — agent cam + report
// ---------------------------------------------------------------------------

function RunView({ agents, order, activeUuid, setActiveUuid, selStep, setSelStep, insights, phase, onStop, onReset }: RunViewProps) {
  const active: AgentState | undefined = activeUuid ? agents[activeUuid] : undefined;
  const liveStep = active?.steps.length ? active.steps.length - 1 : 0;
  const stepIdx = selStep === "live" ? liveStep : Math.min(selStep, (active?.steps.length ?? 1) - 1);
  const step = active?.steps[stepIdx];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-body-sm">
          {phase === "running" ? (
            <><Loader2 className="w-4 h-4 animate-spin text-accent-gold" /><span className="text-text-secondary">Agents working…</span></>
          ) : (
            <><CheckCircle2 className="w-4 h-4 text-green-600" /><span className="text-text-secondary">Run complete</span></>
          )}
        </div>
        <div className="flex gap-2">
          {phase === "running" && (
            <Button variant="secondary" size="sm" onClick={onStop}><Square className="w-3.5 h-3.5" /> Stop</Button>
          )}
          {phase === "done" && (
            <Button variant="secondary" size="sm" onClick={onReset}>New run</Button>
          )}
        </div>
      </div>

      {/* Agent console */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* Cam */}
        <div className="rounded-xl border border-border bg-[#0d1117] overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 px-2 py-2">
            {order.map((u: string) => {
              const a: AgentState = agents[u];
              return (
                <button key={u} onClick={() => setActiveUuid(u)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${activeUuid === u ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}>
                  <StatusLed status={a?.status} />
                  {a?.name ?? u.slice(0, 8)}
                </button>
              );
            })}
          </div>
          <div className="relative bg-black flex items-center justify-center min-h-[420px]">
            {step?.thumb ? (
              <div className="relative inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`data:image/jpeg;base64,${step.thumb}`} alt="agent screen" className="max-h-[560px] w-auto" />
                {step.x != null && step.y != null && step.orig_w > 0 && (
                  <span className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-gold"
                    style={{ left: `${(step.x / step.orig_w) * 100}%`, top: `${(step.y / step.orig_h) * 100}%`, boxShadow: "0 0 0 4px rgba(212,160,23,0.25)" }} />
                )}
              </div>
            ) : (
              <div className="text-white/30 text-sm">Waiting for first frame…</div>
            )}
          </div>
          {step && (
            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
                <span>STEP {String(stepIdx + 1).padStart(2, "0")}</span>
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-accent-gold">{ACTION_LABEL[step.action_type] ?? step.action_type}</span>
                <span className="truncate">{step.view_label}</span>
              </div>
              <p className="mt-1.5 text-sm text-white/85 leading-snug">{step.internal_monologue || step.reasoning || step.element_description}</p>
            </div>
          )}
          {/* scrubber */}
          {active && active.steps.length > 0 && (
            <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2">
              <input type="range" min={0} max={active.steps.length - 1} value={stepIdx}
                onChange={(e) => setSelStep(Number(e.target.value))} className="flex-1 accent-[#d4a017]" />
              <button onClick={() => setSelStep("live")}
                className={`text-[11px] font-mono ${selStep === "live" ? "text-accent-gold" : "text-white/40"}`}>LIVE</button>
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div className="rounded-xl border border-border bg-[#0d1117] overflow-hidden flex flex-col">
          <div className="border-b border-white/10 px-4 py-2.5">
            <div className="text-xs font-medium text-white/80">{active?.name ?? "—"}</div>
            <div className="text-[11px] text-white/40">{[active?.occupation, active?.age && `${active.age}y`, active?.zone].filter(Boolean).join(" · ")}</div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[600px] divide-y divide-white/5">
            {(active?.steps ?? []).map((s, i) => (
              <button key={i} onClick={() => setSelStep(i)}
                className={`flex w-full gap-2 px-3 py-2 text-left ${i === stepIdx ? "bg-white/10" : "hover:bg-white/5"}`}>
                <span className="font-mono text-[10px] text-white/30 mt-0.5 w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-accent-gold">{ACTION_LABEL[s.action_type] ?? s.action_type}</span>
                  <p className="text-[12px] text-white/70 leading-snug line-clamp-2">{s.element_description || s.internal_monologue || s.reasoning}</p>
                </div>
              </button>
            ))}
            {active?.status === "completed" && <FeedFooter icon="ok" text={`Completed — ${active.numSteps ?? active.steps.length} steps`} />}
            {active?.status === "dropped" && <FeedFooter icon="drop" text="Dropped off" />}
            {active?.status === "error" && <FeedFooter icon="err" text={active.error ?? "Error"} />}
          </div>
        </div>
      </div>

      {phase === "done" && insights && <LiveUrlReport insights={insights} agents={agents} order={order} />}
    </div>
  );
}

function FeedFooter({ icon, text }: { icon: "ok" | "drop" | "err"; text: string }) {
  const I = icon === "ok" ? CheckCircle2 : XCircle;
  const col = icon === "ok" ? "text-green-400" : icon === "drop" ? "text-orange-400" : "text-red-400";
  return (
    <div className={`flex items-center gap-2 px-3 py-2.5 text-[12px] ${col}`}>
      <I className="w-3.5 h-3.5" /> {text}
    </div>
  );
}
