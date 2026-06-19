"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import { formatPct, formatScreenId } from "./utils/formatters";
import type { SimulationData, DecisionVerdict } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

const VERDICT_STYLES: Record<
  DecisionVerdict,
  { label: string; color: string; bg: string; blurb: string }
> = {
  ship: {
    label: "Ship it",
    color: "#059669",
    bg: "rgba(5,150,105,0.10)",
    blurb: "The flow converts well with no blocking barrier.",
  },
  fix_first: {
    label: "Fix first",
    color: "#D97706",
    bg: "rgba(217,119,6,0.10)",
    blurb: "Salvageable, but one barrier is costing conversions — fix it before shipping.",
  },
  hold: {
    label: "Hold",
    color: "#DC2626",
    bg: "rgba(220,38,38,0.10)",
    blurb: "Too many users fall out to ship as-is; this needs rework, not a tweak.",
  },
};

/**
 * DecisionBrief — Section 0. The one card a PM forwards to their VP.
 *
 * Reads the deterministic `decision_brief` block (no LLM, no model
 * self-assessment). Renders nothing for legacy runs that predate the field, so
 * ExecutiveVerdict below still leads the report.
 */
export function DecisionBrief({ data }: Props) {
  const brief = data.decision_brief;
  if (!brief) return null;

  const v = VERDICT_STYLES[brief.verdict_label] ?? VERDICT_STYLES.fix_first;
  const cal = brief.calibration;
  const barrier = brief.headline_barrier;
  const seg = brief.worst_segment;
  const fix = brief.top_fix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderTop: `4px solid ${v.color}`,
        borderRadius: 16,
        padding: "28px 32px",
        boxShadow: COLORS.cardShadow,
      }}
    >
      {/* Header: eyebrow + verdict pill + completion */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: COLORS.textMuted,
              marginBottom: 10,
            }}
          >
            Decision Brief
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: v.color,
                background: v.bg,
                padding: "6px 16px",
                borderRadius: 8,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {v.label}
            </span>
            <span
              style={{
                fontSize: 15,
                color: COLORS.textSecondary,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {v.blurb}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: v.color,
              lineHeight: 1,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {formatPct(brief.completion_rate_pct)}
          </p>
          <p style={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, marginTop: 4 }}>
            completion
            {cal && (
              <>
                {" · "}
                <span style={{ color: cal.delta_pp >= 0 ? COLORS.green : COLORS.red }}>
                  {cal.delta_pp >= 0 ? "+" : ""}
                  {cal.delta_pp}pp vs {formatPct(cal.expected_completion_rate_pct)} real
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Overall verdict sentence */}
      {brief.overall_verdict && (
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: COLORS.textPrimary,
            lineHeight: 1.6,
            fontFamily: "var(--font-inter), sans-serif",
            marginBottom: 24,
          }}
        >
          {brief.overall_verdict}
        </p>
      )}

      {/* Three supporting facts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: brief.confidence_note ? 20 : 0,
        }}
      >
        {barrier && (
          <FactTile
            label="Biggest barrier"
            headline={`${formatScreenId(barrier.screen)} · ${formatPct(barrier.drop_off_pct)} drop`}
            body={barrier.reason}
            color={COLORS.red}
          />
        )}
        {seg && (
          <FactTile
            label="Most-affected segment"
            headline={`${seg.segment} · ${formatPct(seg.completion_pct)} complete`}
            body={seg.top_drop_off_reason}
            color={COLORS.amber}
          />
        )}
        {fix && (
          <FactTile
            label="Do this first"
            headline={fix.recommendation}
            body={[fix.screen ? formatScreenId(fix.screen) : "", fix.expected_uplift]
              .filter(Boolean)
              .join(" · ")}
            color={COLORS.green}
          />
        )}
      </div>

      {/* Confidence qualifier (sampling note — not model self-assessment) */}
      {brief.confidence_note && (
        <p
          style={{
            fontSize: 12,
            color: COLORS.textMuted,
            fontStyle: "italic",
            fontFamily: "var(--font-inter), sans-serif",
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 14,
          }}
        >
          {brief.confidence_note}
        </p>
      )}
    </motion.div>
  );
}

function FactTile({
  label,
  headline,
  body,
  color,
}: {
  label: string;
  headline: string;
  body?: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: COLORS.bgElevated,
        border: `1px solid ${COLORS.border}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textMuted,
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.textPrimary,
          lineHeight: 1.4,
          fontFamily: "var(--font-inter), sans-serif",
          marginBottom: body ? 6 : 0,
        }}
      >
        {headline}
      </p>
      {body && (
        <p
          style={{
            fontSize: 12.5,
            color: COLORS.textSecondary,
            lineHeight: 1.5,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export default DecisionBrief;
