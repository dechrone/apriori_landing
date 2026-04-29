"use client";

/**
 * SimulationRunningView
 *
 * Long-form (3-5 min) "in flight" panel rendered while a comparator / A-B
 * simulation is streaming. The visual is intentionally muted (graphite,
 * not blue) so the wait reads as a working dashboard rather than a marketing
 * spinner. Progress is real: the head dot's position on each lane is tied
 * to personasDone/personasTotal, not a looping animation.
 *
 * Used by:
 *   - product-flow-ab/page.tsx     (Variant A / Variant B)
 *   - product-flow-comparator/...  (Flow 1 / Flow 2, names from backend)
 */
import { useEffect, useRef, useState } from "react";
import { Check, Layers, BrainCircuit, FileText, Users } from "lucide-react";

export interface RunningFlow {
  /** Friendly label, e.g. "Variant A" or the backend's flow_name. */
  displayName: string;
  personasTotal: number;
  personasDone: number;
}

interface SimulationRunningViewProps {
  /** True while client-side asset upload is happening (before the stream). */
  uploading: boolean;
  /** Stream phase: "starting" | "simulating" | "saving". */
  phase: "starting" | "simulating" | "saving" | string | undefined;
  /** Per-flow progress, keyed by stable flow id. Order is preserved. */
  flows: Record<string, RunningFlow>;
  /** Audience-retrieval notice (relaxed / random fallback). */
  retrievalNotice?: string;
  /** Title prefix above the phase line. Defaults to "Running A/B simulation". */
  eyebrow?: string;
}

const INSIGHT_TIPS = [
  "Each persona is sampled from a Hinglish-fluent cohort grounded in a 83K-row India dataset.",
  "Both variants face the same 25 personas, so the verdict isolates the design as the variable.",
  "We resample every high-stakes decision three times and take the mode for stability.",
  "Drop-off explanations come from the persona's own words, not a heuristic.",
  "After the run, behaviours are clustered so you see what kinds of users react which way.",
  "System-1 vs System-2 cognitive modes are matched per decision so reads stay realistic.",
  "Counterfactual probes ask each persona what one change would have flipped their choice.",
];

// Graphite palette. Single source of truth so we don't sprinkle
// colour literals across every sub-component.
const C = {
  ink: "#111827", // gray-900
  inkSoft: "#1F2937", // gray-800
  body: "#374151", // gray-700
  muted: "#6B7280", // gray-500
  faint: "#9CA3AF", // gray-400
  hairline: "#E5E7EB", // gray-200
  hairlineSoft: "#F3F4F6", // gray-100
  surface: "#FAFAFA", // near-white
  shell: "#FFFFFF",
};

export function SimulationRunningView({
  uploading,
  phase,
  flows,
  retrievalNotice,
  eyebrow = "Running A/B simulation",
}: SimulationRunningViewProps) {
  const startedAtRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // Start the elapsed timer once the stream phase begins (i.e. after upload).
  useEffect(() => {
    if (uploading) return;
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
    const id = window.setInterval(() => {
      if (startedAtRef.current) {
        setElapsed(Math.floor((Date.now() - startedAtRef.current) / 1000));
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [uploading]);

  // Rotate insight tips every ~7s so the wait doesn't feel static.
  useEffect(() => {
    const id = window.setInterval(() => {
      setTipIndex((i) => (i + 1) % INSIGHT_TIPS.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const flowEntries = Object.entries(flows);
  const totalPersonas = flowEntries.reduce((s, [, f]) => s + (f.personasTotal || 0), 0);
  const donePersonas = flowEntries.reduce((s, [, f]) => s + f.personasDone, 0);

  // Stage tracker driver. We progress: source -> walk -> cluster -> verdict.
  const activeStageIdx = (() => {
    if (uploading) return 0;
    if (phase === "saving") return 3;
    if (phase === "starting" || flowEntries.length === 0) return 0;
    if (totalPersonas > 0 && donePersonas >= totalPersonas) return 2;
    return 1;
  })();

  const stages: { key: string; label: string; sub: string; Icon: typeof Users }[] = [
    { key: "source", label: "Sourcing personas", sub: "Drawing the cohort", Icon: Users },
    { key: "walk", label: "Walking the screens", sub: "Reading + deciding", Icon: Layers },
    { key: "cluster", label: "Clustering behaviour", sub: "Patterns by cohort", Icon: BrainCircuit },
    { key: "verdict", label: "Writing the verdict", sub: "Synthesizing insight", Icon: FileText },
  ];

  const headerTitle = uploading
    ? "Uploading your variants"
    : phase === "saving"
      ? "Synthesizing the verdict"
      : phase === "simulating" && totalPersonas > 0
        ? `${donePersonas} of ${totalPersonas} personas done`
        : "Sourcing personas from the cohort pool";

  const subline = uploading
    ? "Pushing your screens to the simulator. A few seconds."
    : phase === "saving"
      ? "Almost there. Clustering the verdict and saving your report."
      : "Sit tight. A full A/B run usually takes 3 to 5 minutes.";

  return (
    <div
      className="rounded-[14px] p-6 sm:p-8 overflow-hidden"
      style={{
        background: C.shell,
        border: `1px solid ${C.hairline}`,
      }}
    >
      {/* Header row: phase title + elapsed-time chip */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1.5"
            style={{ color: C.muted }}
          >
            {eyebrow}
          </p>
          <h3
            className="text-[18px] sm:text-[20px] font-bold leading-tight"
            style={{ color: C.ink }}
          >
            {headerTitle}
          </h3>
          <p className="text-[13px] mt-1.5 leading-[1.55]" style={{ color: C.muted }}>
            {subline}
          </p>
        </div>
        <ElapsedChip elapsedSec={elapsed} />
      </div>

      {/* Progress lanes (replaces the looping particle diorama). The head
          dot's position is bound to personasDone/personasTotal so it
          actually moves as the run advances. */}
      <FlowProgressBoard flows={flowEntries} />

      {/* Stage tracker */}
      <StageTracker stages={stages} activeIdx={activeStageIdx} />

      {/* Retrieval notice (relaxed cohort etc.) */}
      {retrievalNotice && (
        <div
          className="mt-5 flex items-start gap-2.5 rounded-[10px] px-3.5 py-2.5 text-[13px]"
          style={{
            background: C.hairlineSoft,
            border: `1px solid ${C.hairline}`,
            color: C.body,
          }}
        >
          <span aria-hidden className="mt-[1px]">!</span>
          <span className="leading-[1.5]">{retrievalNotice}</span>
        </div>
      )}

      {/* Rotating insight tip — plain copy, no decorative icon. */}
      <InsightTip tip={INSIGHT_TIPS[tipIndex]} />
    </div>
  );
}

/* ───────────────────────── Subcomponents ───────────────────────── */

function ElapsedChip({ elapsedSec }: { elapsedSec: number }) {
  const m = Math.floor(elapsedSec / 60);
  const s = elapsedSec % 60;
  const formatted = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0"
      style={{
        background: C.hairlineSoft,
        border: `1px solid ${C.hairline}`,
      }}
    >
      <span
        className="tabular-nums tracking-wide text-[12px] font-semibold"
        style={{ color: C.ink }}
      >
        {formatted}
      </span>
      <span
        className="text-[11px] font-medium hidden sm:inline"
        style={{ color: C.muted }}
      >
        elapsed
      </span>
    </div>
  );
}

function FlowProgressBoard({ flows }: { flows: [string, RunningFlow][] }) {
  // Skeleton lanes if the stream hasn't yet announced any flows.
  const lanes: { id: string; flow: RunningFlow }[] =
    flows.length > 0
      ? flows.map(([id, flow]) => ({ id, flow }))
      : [
          { id: "_a", flow: { displayName: "Variant A", personasTotal: 25, personasDone: 0 } },
          { id: "_b", flow: { displayName: "Variant B", personasTotal: 25, personasDone: 0 } },
        ];

  return (
    <div
      className="mt-6 rounded-[12px] px-4 sm:px-6 py-5 sm:py-6"
      style={{
        background: C.surface,
        border: `1px solid ${C.hairline}`,
      }}
    >
      <div className="space-y-5">
        {lanes.map((lane) => (
          <Lane key={lane.id} flow={lane.flow} />
        ))}
      </div>
    </div>
  );
}

function Lane({ flow }: { flow: RunningFlow }) {
  const ratio =
    flow.personasTotal > 0
      ? Math.min(1, Math.max(0, flow.personasDone / flow.personasTotal))
      : 0;
  // Express progress as a percent — this is what the head dot's `left`
  // and the fill bar's `width` snap to. CSS transitions make the slide smooth.
  const pct = Math.round(ratio * 100);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {/* Lane label */}
        <div
          className="w-[88px] sm:w-[104px] shrink-0 px-2.5 py-1.5 rounded-[8px] text-[12px] font-semibold leading-tight"
          style={{
            color: C.ink,
            border: `1px solid ${C.hairline}`,
            background: C.hairlineSoft,
          }}
        >
          {flow.displayName}
        </div>

        {/* Progress track */}
        <div className="relative flex-1 h-7">
          {/* Background track */}
          <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
            style={{ background: C.hairline }}
          />
          {/* Filled progress (grows left -> right with personasDone) */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full"
            style={{
              width: `${pct}%`,
              background: C.ink,
              transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {/* Head dot — moves with progress */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full"
            style={{
              left: `${pct}%`,
              background: C.ink,
              boxShadow: `0 0 0 4px ${C.shell}, 0 0 0 5px ${C.hairline}`,
              transition: "left 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            aria-hidden
          />
        </div>

        {/* Counter */}
        <div className="shrink-0 text-right min-w-[68px]">
          <div
            className="text-[15px] sm:text-[16px] font-bold tabular-nums leading-none"
            style={{ color: C.ink }}
          >
            {flow.personasDone}
            <span style={{ color: C.faint }} className="font-medium">
              /{flow.personasTotal}
            </span>
          </div>
          <p
            className="text-[10px] uppercase tracking-wider font-medium mt-1"
            style={{ color: C.faint }}
          >
            done
          </p>
        </div>
      </div>
    </div>
  );
}

function StageTracker({
  stages,
  activeIdx,
}: {
  stages: { key: string; label: string; sub: string; Icon: typeof Users }[];
  activeIdx: number;
}) {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
      {stages.map((s, idx) => {
        const isDone = idx < activeIdx;
        const isActive = idx === activeIdx;
        const Icon = s.Icon;
        return (
          <div
            key={s.key}
            className="rounded-[10px] px-3 py-2.5 transition-colors"
            style={{
              background: isActive ? C.hairlineSoft : isDone ? C.shell : C.surface,
              border: `1px solid ${isActive ? C.ink : C.hairline}`,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: isDone ? C.ink : C.shell,
                  border: `${isDone ? 0 : 1.5}px solid ${isActive ? C.ink : C.hairline}`,
                  color: isDone ? C.shell : isActive ? C.ink : C.faint,
                }}
              >
                {isDone ? <Check className="w-3 h-3" /> : <Icon className="w-2.5 h-2.5" />}
              </span>
              <p
                className="text-[12px] font-semibold leading-tight"
                style={{ color: isActive ? C.ink : isDone ? C.body : C.faint }}
              >
                {s.label}
              </p>
            </div>
            <p
              className="text-[11px] mt-1 ml-7 leading-tight"
              style={{ color: C.muted }}
            >
              {isActive ? <ActiveSubText sub={s.sub} /> : s.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ActiveSubText({ sub }: { sub: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {sub}
      <span className="inline-flex gap-[2px] ml-0.5">
        <Dot delay={0} />
        <Dot delay={0.18} />
        <Dot delay={0.36} />
      </span>
    </span>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-[3px] h-[3px] rounded-full"
      style={{
        background: C.body,
        animation: `dot-pulse 0.9s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

function InsightTip({ tip }: { tip: string }) {
  return (
    <>
      <div
        key={tip}
        className="mt-6 rounded-[10px] px-3.5 py-2.5"
        style={{
          background: C.surface,
          border: `1px solid ${C.hairline}`,
          animation: "tip-fade 380ms ease-out",
        }}
      >
        <p className="text-[12.5px] leading-[1.55]" style={{ color: C.body }}>
          {tip}
        </p>
      </div>
      <style jsx global>{`
        @keyframes dot-pulse {
          0% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes tip-fade {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
