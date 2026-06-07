"use client";

/**
 * Reusable Live URL report — renders the PM-grade output of a live-url run.
 *
 * Works in two modes:
 *  - live:      pass `agents` + `order` (the streaming wizard) for real-time data.
 *  - persisted: pass only `insights` (a saved run); the persona list is derived
 *               from `insights.persona_details`.
 *
 * Shared types + small presentational helpers live here so both the wizard page
 * and the saved-run viewer render identically.
 */

import { useState, useRef, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Eye, MousePointerClick, HelpCircle, AlertTriangle } from "lucide-react";

export interface StepEvent {
  step_index: number;
  view_label: string;
  action_type: string;
  x: number | null;
  y: number | null;
  element_description?: string;
  reasoning?: string;
  internal_monologue?: string;
  emotional_state?: string;
  trust_score?: number | null;
  clarity_score?: number | null;
  thumb: string | null;
  orig_w: number;
  orig_h: number;
}

export interface AgentState {
  uuid: string;
  name: string;
  occupation?: string;
  archetype?: string;
  age?: number;
  zone?: string;
  status: "running" | "completed" | "dropped" | "error";
  steps: StepEvent[];
  finalIntent?: string;
  monologue?: string;
  numSteps?: number;
  error?: string;
}

export type HeatPoint = { x: number; y: number; w?: number; label?: string; thought?: string; reason?: string };
export type HeatScreens = Record<string, { attention: HeatPoint[]; clicks: HeatPoint[]; confusion: HeatPoint[] }>;

export type Finding = {
  severity: "critical" | "high" | "medium";
  category: string;
  title: string;
  screen?: string | null;
  affected_personas: number;
  evidence: string[];
  recommendation: string;
};

export interface PersonaDetail {
  persona_uuid?: string;
  persona_snapshot?: { occupation?: string; zone?: string; age?: number };
  completed_flow?: boolean;
  overall_monologue?: string;
  final_intent?: string;
}

export type Insights = {
  summary?: Record<string, unknown>;
  attention_heat?: { viewport: { w: number; h: number }; screens: HeatScreens };
  technical_issues?: Array<{ kind: string; status?: number; url?: string; text?: string; count: number }>;
  key_findings?: Finding[];
  persona_details?: PersonaDetail[];
  objective_alignment_rate_pct?: number;
};

export const ACTION_LABEL: Record<string, string> = {
  TAP: "TAP", LONG_PRESS: "LONG_PRESS", TYPE: "TYPE", SWIPE: "SWIPE", SCROLL: "SCROLL",
  BACK: "BACK", WAIT: "WAIT", CHECK_EMAIL: "CHECK_EMAIL", SOLVE_CAPTCHA: "SOLVE_CAPTCHA",
  TAKE_NOTE: "NOTE", REVISE_INTENT: "REVISE", RECALL: "RECALL", COMPLETE: "COMPLETE", DROP_OFF: "DROP_OFF",
};

type Person = { uuid: string; name: string; occupation?: string; zone?: string; status: string; monologue?: string; finalIntent?: string };

export function StatusLed({ status }: { status?: string }) {
  const c = status === "completed" ? "bg-green-500" : status === "dropped" ? "bg-orange-500" : status === "error" ? "bg-red-500" : "bg-accent-gold animate-pulse";
  return <span className={`h-2 w-2 rounded-full ${c}`} />;
}

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" }) {
  const cls = severity === "critical"
    ? "bg-red-100 text-red-700"
    : severity === "high"
      ? "bg-orange-100 text-orange-700"
      : "bg-amber-100 text-amber-700";
  return (
    <span className={`mt-0.5 flex-shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cls}`}>
      {severity}
    </span>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card>
      <CardContent className="px-4 py-3">
        <div className={`text-2xl font-semibold ${accent ? "text-orange-600" : "text-text-primary"}`}>{value}</div>
        <div className="text-xs text-text-tertiary">{label}</div>
      </CardContent>
    </Card>
  );
}

function HeatCanvas({ viewport, points, layer }: { viewport: { w: number; h: number }; points: HeatPoint[]; layer: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const W = 360;
  const H = Math.round((viewport.h / viewport.w) * W);

  const ramp = useMemo(() => (layer === "confusion"
    ? ["rgba(239,68,68,0)", "rgba(239,68,68,0.65)"]
    : layer === "clicks"
      ? ["rgba(212,160,23,0)", "rgba(212,160,23,0.7)"]
      : ["rgba(59,130,246,0)", "rgba(59,130,246,0.6)"]), [layer]);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (const pt of points) {
      const px = (pt.x / viewport.w) * W;
      const py = (pt.y / viewport.h) * H;
      const r = 22 * (pt.w && pt.w > 1 ? 1.5 : 1);
      const g = ctx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, ramp[1]);
      g.addColorStop(1, ramp[0]);
      ctx.fillStyle = g;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }
  }, [points, viewport, W, H, ramp]);

  return (
    <div className="flex items-center justify-center bg-[#0d1117] p-4">
      <canvas ref={ref} width={W} height={H} className="rounded-lg border border-white/10" style={{ width: W, height: H, background: "#11161d" }} />
    </div>
  );
}

function derivePeople(insights: Insights, agents?: Record<string, AgentState>, order?: string[]): Person[] {
  if (agents && order && order.length) {
    return order.map((u) => agents[u]).filter(Boolean).map((a) => ({
      uuid: a.uuid, name: a.name, occupation: a.occupation, zone: a.zone,
      status: a.status, monologue: a.monologue, finalIntent: a.finalIntent,
    }));
  }
  return (insights.persona_details ?? []).map((p, i) => {
    const snap = p.persona_snapshot ?? {};
    const name = snap.occupation
      ? `${snap.age ? `${snap.age}yo ` : ""}${snap.occupation}`
      : (p.persona_uuid ?? `persona-${i + 1}`).slice(0, 8);
    return {
      uuid: p.persona_uuid ?? `persona-${i}`,
      name,
      occupation: snap.occupation,
      zone: snap.zone,
      status: p.completed_flow ? "completed" : "dropped",
      monologue: p.overall_monologue,
      finalIntent: p.final_intent,
    };
  });
}

export function LiveUrlReport({ insights, agents, order }: { insights: Insights; agents?: Record<string, AgentState>; order?: string[] }) {
  const people = derivePeople(insights, agents, order);
  const completed = people.filter((p) => p.status === "completed").length;
  const heat = insights.attention_heat;
  const screens = heat ? Object.keys(heat.screens) : [];
  const [screen, setScreen] = useState(screens[0] ?? "");
  const [layer, setLayer] = useState<"attention" | "clicks" | "confusion">("attention");

  const issues = insights.technical_issues ?? [];
  const findings = insights.key_findings ?? [];
  const objRate = (insights.summary?.["objective_alignment_rate_pct"] as number | undefined) ?? insights.objective_alignment_rate_pct;

  return (
    <div className="space-y-6">
      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Agents" value={String(people.length)} />
        <Stat label="Completed" value={`${completed}/${people.length}`} />
        <Stat label="Objective met" value={objRate != null ? `${objRate}%` : "—"} />
        <Stat label="Issues found" value={String(issues.length)} accent={issues.length > 0} />
      </div>

      {/* key findings — ranked top issues + recommendation across all agents */}
      {findings.length > 0 && (
        <Card className="overflow-hidden">
          <div className="border-b border-border px-4 py-3 text-body-sm font-medium text-text-primary">
            Key findings <span className="text-text-tertiary">({findings.length})</span>
          </div>
          <div className="divide-y divide-border">
            {findings.map((f, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <SeverityBadge severity={f.severity} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-text-primary">{f.title}</p>
                      <span className="flex-shrink-0 text-xs text-text-tertiary">{f.affected_personas} agent{f.affected_personas === 1 ? "" : "s"}</span>
                    </div>
                    <p className="mt-1 text-body-sm text-text-secondary">{f.recommendation}</p>
                    {f.evidence.length > 0 && (
                      <ul className="mt-1.5 space-y-1">
                        {f.evidence.map((e, j) => (
                          <li key={j} className="text-xs text-text-tertiary italic border-l-2 border-border pl-2">&ldquo;{e}&rdquo;</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* heatmap */}
      {heat && screens.length > 0 && (
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 text-body-sm font-medium text-text-primary">Attention heatmap</div>
            <div className="flex items-center gap-2">
              <select value={screen} onChange={(e) => setScreen(e.target.value)}
                className="rounded-lg border border-border bg-white px-2 py-1 text-xs text-text-primary">
                {screens.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {([["attention", Eye], ["clicks", MousePointerClick], ["confusion", HelpCircle]] as const).map(([l, Icon]) => (
                  <button key={l} onClick={() => setLayer(l)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs capitalize ${layer === l ? "bg-text-primary text-white" : "text-text-secondary"}`}>
                    <Icon className="w-3.5 h-3.5" /> {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]">
            <HeatCanvas viewport={heat.viewport} points={(heat.screens[screen]?.[layer] ?? [])} layer={layer} />
            <div className="border-t md:border-t-0 md:border-l border-border max-h-[440px] overflow-y-auto p-3 space-y-2">
              <div className="text-[11px] font-medium uppercase tracking-wide text-text-tertiary">Why ({(heat.screens[screen]?.[layer] ?? []).length})</div>
              {(heat.screens[screen]?.[layer] ?? []).slice(0, 40).map((pt, i) => (
                <div key={i} className="rounded-md bg-surface/50 border border-border px-2.5 py-1.5 text-xs text-text-secondary">
                  {pt.label && <span className="font-medium text-text-primary">{pt.label}: </span>}
                  {pt.thought || pt.reason || "—"}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* technical issues */}
      <Card className="overflow-hidden">
        <div className="border-b border-border px-4 py-3 text-body-sm font-medium text-text-primary">
          Technical issues {issues.length > 0 && <span className="text-text-tertiary">({issues.length})</span>}
        </div>
        {issues.length === 0 ? (
          <div className="px-4 py-6 text-body-sm text-text-tertiary">No server errors, JS exceptions, or console errors were tripped during the run.</div>
        ) : (
          <div className="divide-y divide-border">
            {issues.map((iss, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] rounded bg-orange-100 px-1.5 py-0.5 text-orange-700">{iss.kind}{iss.status ? ` ${iss.status}` : ""}</span>
                    <span className="text-xs text-text-tertiary">×{iss.count}</span>
                  </div>
                  <p className="mt-1 text-body-sm text-text-secondary break-all">{iss.url || iss.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* transcripts */}
      <div className="space-y-3">
        <div className="text-body-sm font-medium text-text-primary">Persona transcripts</div>
        {people.map((a) => (
          <details key={a.uuid} className="rounded-xl border border-border bg-white">
            <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-body-sm">
              <StatusLed status={a.status} />
              <span className="font-medium text-text-primary">{a.name}</span>
              <span className="text-text-tertiary">{[a.occupation, a.zone].filter(Boolean).join(" · ")}</span>
            </summary>
            <div className="border-t border-border px-4 py-3 space-y-2">
              {a.monologue && <p className="text-body-sm text-text-secondary italic">&ldquo;{a.monologue}&rdquo;</p>}
              {a.finalIntent && <p className="text-xs text-text-tertiary">Final intent: {a.finalIntent}</p>}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
