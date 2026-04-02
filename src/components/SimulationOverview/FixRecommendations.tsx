"use client";

import { motion } from "framer-motion";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, FixRecommendation } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

const IMPACT_STYLES: Record<string, { color: string; bg: string }> = {
  high: { color: "#DC2626", bg: "rgba(220,38,38,0.10)" },
  medium: { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  low: { color: "#6B7280", bg: "rgba(107,114,128,0.10)" },
};

const FEASIBILITY_STYLES: Record<string, { color: string; bg: string }> = {
  high: { color: "#059669", bg: "rgba(5,150,105,0.10)" },
  medium: { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  low: { color: "#DC2626", bg: "rgba(220,38,38,0.10)" },
};

export function FixRecommendations({ data }: Props) {
  // Try new fix_recommendations first, fall back to legacy what_needs_fixing
  let fixes: FixRecommendation[] = data.fix_recommendations || [];

  if (fixes.length === 0 && data.flow_assessment?.fix_recommendations) {
    fixes = data.flow_assessment.fix_recommendations;
  }

  // Legacy fallback: convert what_needs_fixing to FixRecommendation shape
  if (fixes.length === 0 && data.flow_assessment?.what_needs_fixing) {
    fixes = data.flow_assessment.what_needs_fixing.map((item) => ({
      root_cause: item.problem,
      screen: item.element,
      recommendation: item.fix,
      estimated_impact: item.priority === "P0" ? "high" : item.priority === "P1" ? "medium" : "low",
      feasibility: "medium" as const,
      impact_feasibility_score: item.priority === "P0" ? 9 : item.priority === "P1" ? 6 : 3,
      affected_segment: item.for_whom,
      expected_uplift: "",
    }));
  }

  if (fixes.length === 0) return null;

  // Sort by impact_feasibility_score descending
  const sorted = [...fixes].sort(
    (a, b) => (b.impact_feasibility_score ?? 0) - (a.impact_feasibility_score ?? 0)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
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
        Fix Recommendations
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        Ranked by impact and feasibility — build these first
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {sorted.map((fix, i) => (
          <FixCard key={i} fix={fix} rank={i + 1} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

function FixCard({
  fix,
  rank,
  index,
}: {
  fix: FixRecommendation;
  rank: number;
  index: number;
}) {
  const impact = IMPACT_STYLES[fix.estimated_impact] ?? IMPACT_STYLES.medium;
  const feasibility =
    FEASIBILITY_STYLES[fix.feasibility] ?? FEASIBILITY_STYLES.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.35 + index * 0.06 }}
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "24px 28px",
        position: "relative",
      }}
      className="sim-card-hover"
    >
      {/* Rank number */}
      <span
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontSize: 32,
          fontWeight: 800,
          color: COLORS.border,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          lineHeight: 1,
        }}
      >
        {rank}
      </span>

      {/* Badges row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        {/* Impact badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: impact.color,
            background: impact.bg,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          {fix.estimated_impact} impact
        </span>

        {/* Feasibility badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: feasibility.color,
            background: feasibility.bg,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          {fix.feasibility} feasibility
        </span>

        {/* Screen */}
        {fix.screen && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.textSecondary,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {formatScreenId(fix.screen)}
          </span>
        )}
      </div>

      {/* Root cause */}
      {fix.root_cause && (
        <p
          style={{
            fontSize: 13,
            color: COLORS.textMuted,
            fontFamily: "var(--font-inter), sans-serif",
            marginBottom: 8,
          }}
        >
          Root cause: {fix.root_cause}
        </p>
      )}

      {/* Recommendation */}
      <p
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: COLORS.textPrimary,
          lineHeight: 1.6,
          fontFamily: "var(--font-inter), sans-serif",
          marginBottom: 12,
          paddingRight: 40,
        }}
      >
        {fix.recommendation}
      </p>

      {/* Footer: segment + uplift */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {fix.affected_segment && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: COLORS.textMuted,
              background: COLORS.bgElevated,
              border: `1px solid ${COLORS.border}`,
              padding: "3px 10px",
              borderRadius: 5,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Affects: {fix.affected_segment}
          </span>
        )}
        {fix.expected_uplift && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.green,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {fix.expected_uplift}
          </span>
        )}
      </div>
    </motion.div>
  );
}
