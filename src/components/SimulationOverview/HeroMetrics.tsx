"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import { formatTime, formatPct } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function HeroMetrics({ data }: Props) {
  const { summary, sample_quality, funnel_drop_off, drop_off_analysis } = data;
  const pct = summary.completion_rate_pct;
  const color = completionColor(pct);
  const uniqueScreens = funnel_drop_off?.length ?? 0;
  const avgTime = summary.avg_time_to_complete_seconds;

  // Count distinct root causes (clusters) across all drop-off screens
  const distinctRootCauses = drop_off_analysis?.screens
    ? Object.values(drop_off_analysis.screens).reduce(
        (total, screen) => total + (screen.clusters?.length ?? 0),
        0
      )
    : 0;

  const cards = [
    {
      label: "Completion Rate",
      value: formatPct(pct),
      sub: `${summary.completed} of ${summary.total_personas} completed`,
      valueColor: color,
    },
    {
      label: "Personas Tested",
      value: String(summary.total_personas),
      sub: distinctRootCauses > 0 ? `${distinctRootCauses} distinct root causes` : "",
      valueColor: COLORS.textPrimary,
    },
    {
      label: "Dropped Off",
      value: String(summary.dropped_off),
      sub: uniqueScreens > 0 ? `across ${uniqueScreens} screens` : "",
      valueColor: summary.dropped_off > 0 ? COLORS.red : COLORS.textPrimary,
    },
    {
      label: "Root Causes",
      value: distinctRootCauses > 0 ? String(distinctRootCauses) : "-",
      sub:
        distinctRootCauses > 0
          ? "distinct friction patterns"
          : "No drop-offs to analyze",
      valueColor: distinctRootCauses > 0 ? COLORS.textPrimary : COLORS.textMuted,
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
        className="sim-hero-grid"
      >
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            style={{
              background: COLORS.bgSurface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: 28,
              transition: "all 0.2s ease",
              cursor: "default",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
            }}
            className="sim-card-hover"
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.textSecondary,
                marginBottom: 12,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: card.valueColor,
                lineHeight: 1,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {card.value}
            </p>
            {card.sub && (
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.textSecondary,
                  marginTop: 8,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {card.sub}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
