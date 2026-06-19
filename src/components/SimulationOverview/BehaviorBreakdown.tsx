"use client";

import { motion } from "framer-motion";
import COLORS, { scoreColor } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import type {
  SimulationData,
  BehaviorAnalysisScreen,
  CognLoadItem,
} from "@/types/simulation";

interface Props {
  data: SimulationData;
}

/** Normalize a task-success value to a 0–100 percentage (BE may emit 0–1 or 0–100). */
function toPct(v: number | undefined): number {
  if (typeof v !== "number" || Number.isNaN(v)) return 0;
  const pct = v <= 1 ? v * 100 : v;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

function loadColor(level?: string): string {
  const l = (level || "").toLowerCase();
  if (l.includes("high")) return COLORS.red;
  if (l.includes("med")) return COLORS.amber;
  if (l.includes("low")) return COLORS.green;
  return COLORS.textMuted;
}

/**
 * BehaviorBreakdown — surfaces the per-screen usability depth the engine already
 * computes (`behavior_analysis`) plus the emotional arc + cognitive-load read
 * from `flow_assessment`. These were paid for in LLM credits but rendered
 * nowhere before. Everything is optional-chained so legacy runs render nothing.
 */
export function BehaviorBreakdown({ data }: Props) {
  const behavior = data.behavior_analysis || {};
  const emotional = data.flow_assessment?.emotional_journey_map;
  const cognLoad = (data.flow_assessment?.cognitive_load_assessment || []) as CognLoadItem[];

  const screenEntries = Object.entries(behavior).filter(
    ([, b]) => b && !b.analysis_error,
  );

  // Order screens by funnel step when the image map is present.
  const order = data.screen_image_map || {};
  screenEntries.sort(([a], [b]) => {
    const sa = order[a]?.step_number ?? 999;
    const sb = order[b]?.step_number ?? 999;
    return sa - sb;
  });

  const hasAnything = screenEntries.length > 0 || !!emotional || cognLoad.length > 0;
  if (!hasAnything) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textPrimary,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          marginBottom: 8,
        }}
      >
        Behavioral Analysis
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        How users actually thought and where they hesitated, screen by screen
      </p>

      {/* Emotional arc + cognitive load summary row */}
      {(emotional || cognLoad.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {emotional?.completers && (
            <ArcCard title="Completers felt" body={emotional.completers} color={COLORS.green} />
          )}
          {emotional?.drop_offs && (
            <ArcCard title="Drop-offs felt" body={emotional.drop_offs} color={COLORS.red} />
          )}
          {cognLoad.length > 0 && <CognitiveLoadCard items={cognLoad} />}
        </div>
      )}

      {/* Per-screen behavior cards */}
      {screenEntries.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {screenEntries.map(([screenId, b], i) => (
            <ScreenBehaviorCard key={screenId} screenId={screenId} b={b} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ArcCard({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 12,
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color,
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: 13.5,
          color: COLORS.textSecondary,
          lineHeight: 1.6,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function CognitiveLoadCard({ items }: { items: CognLoadItem[] }) {
  return (
    <div
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textMuted,
          marginBottom: 10,
        }}
      >
        Cognitive Load
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.slice(0, 5).map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            {it.load_level && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: loadColor(it.load_level),
                  background: `${loadColor(it.load_level)}1A`,
                  padding: "2px 7px",
                  borderRadius: 5,
                  flexShrink: 0,
                }}
              >
                {it.load_level}
              </span>
            )}
            <span style={{ fontSize: 12.5, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              {it.screen_id ? `${formatScreenId(it.screen_id)}: ` : ""}
              {it.reason}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBehaviorCard({
  screenId,
  b,
  index,
}: {
  screenId: string;
  b: BehaviorAnalysisScreen;
  index: number;
}) {
  const pct = toPct(b.task_success_rate);
  const barColor = scoreColor(pct / 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "22px 26px",
      }}
      className="sim-card-hover"
    >
      {/* Header: screen + task-success bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {formatScreenId(screenId)}
          </p>
          {b.primary_task && (
            <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 2 }}>
              Task: {b.primary_task}
            </p>
          )}
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, minWidth: 120 }}>
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: barColor,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              lineHeight: 1,
            }}
          >
            {pct}%
          </p>
          <p style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted, marginTop: 2 }}>
            TASK SUCCESS
          </p>
        </div>
      </div>

      <div
        style={{
          height: 6,
          background: "#F3F2EF",
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, 2)}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: "100%", background: barColor, borderRadius: 3 }}
        />
      </div>

      {/* Chip rows */}
      {b.confusion_signals?.length > 0 && (
        <ChipRow label="Confusion" items={b.confusion_signals} color={COLORS.red} />
      )}
      {b.decision_drivers?.length > 0 && (
        <ChipRow label="Drivers" items={b.decision_drivers} color={COLORS.green} />
      )}

      {/* Verbatim reactions */}
      {b.verbatim_reactions?.length > 0 && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {b.verbatim_reactions.slice(0, 3).map((q, i) => (
            <p
              key={i}
              style={{
                fontSize: 13,
                fontStyle: "italic",
                color: COLORS.textSecondary,
                lineHeight: 1.5,
                paddingLeft: 12,
                borderLeft: `2px solid ${COLORS.border}`,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              &ldquo;{q}&rdquo;
            </p>
          ))}
        </div>
      )}

      {/* Verdict footer */}
      {b.screen_verdict && (
        <p
          style={{
            fontSize: 13.5,
            color: COLORS.textPrimary,
            fontWeight: 500,
            lineHeight: 1.55,
            marginTop: 14,
            paddingTop: 14,
            borderTop: `1px solid ${COLORS.border}`,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {b.screen_verdict}
        </p>
      )}
    </motion.div>
  );
}

function ChipRow({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: COLORS.textMuted,
          flexShrink: 0,
          paddingTop: 4,
          minWidth: 64,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.slice(0, 6).map((it, i) => (
          <span
            key={i}
            style={{
              fontSize: 12,
              color,
              background: `${color}14`,
              padding: "3px 10px",
              borderRadius: 6,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BehaviorBreakdown;
