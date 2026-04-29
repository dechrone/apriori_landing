"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function FlowFunnel({ data }: Props) {
  const { funnel_drop_off, summary, screen_metrics } = data;
  if (!funnel_drop_off || funnel_drop_off.length === 0) return null;

  const total = summary.total_personas;

  // Build cumulative funnel: how many reach each screen
  // Sort screens by their order in funnel_drop_off (already sorted by drop-off desc from backend)
  // We need screen order — use screen_metrics keys if available, otherwise use funnel order
  const allScreenIds = Object.keys(screen_metrics || {});
  const funnelMap = new Map(funnel_drop_off.map((f) => [f.screen_id, f.drop_offs]));

  // Build step-by-step funnel
  const steps: {
    screen_id: string;
    entering: number;
    drop_offs: number;
    continuing: number;
    conversion_pct: number;
  }[] = [];

  let remaining = total;
  for (const screenId of allScreenIds) {
    const drops = funnelMap.get(screenId) || 0;
    const entering = remaining;
    const continuing = entering - drops;
    const conversionPct =
      entering > 0 ? Math.round((continuing / entering) * 100 * 10) / 10 : 100;

    steps.push({
      screen_id: screenId,
      entering,
      drop_offs: drops,
      continuing,
      conversion_pct: conversionPct,
    });
    remaining = continuing;
  }

  const maxEntering = steps[0]?.entering || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
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
        Flow Funnel
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        Screen-by-screen conversion rates, {total} personas entered
      </p>

      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {steps.map((step, i) => {
          const barWidth = (step.entering / maxEntering) * 100;
          const barColor =
            step.drop_offs === 0
              ? COLORS.green
              : step.conversion_pct >= 80
                ? COLORS.green
                : step.conversion_pct >= 50
                  ? COLORS.amber
                  : COLORS.red;

          return (
            <div
              key={step.screen_id}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 80px 80px",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderBottom:
                  i < steps.length - 1
                    ? `1px solid ${COLORS.border}`
                    : "none",
              }}
              className="sim-funnel-row"
            >
              {/* Screen name */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {formatScreenId(step.screen_id)}
              </p>

              {/* Bar */}
              <div
                style={{
                  height: 24,
                  background: "#F4F1EC",
                  borderRadius: 6,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(barWidth, 3)}%` }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                  style={{
                    height: "100%",
                    background: barColor,
                    borderRadius: 6,
                    opacity: 0.75,
                  }}
                />
                {/* Drop-off indicator */}
                {step.drop_offs > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      right: `${100 - barWidth + 1}%`,
                      top: 0,
                      bottom: 0,
                      width: Math.max(
                        (step.drop_offs / maxEntering) * 100,
                        2
                      ),
                      background: `${COLORS.red}30`,
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                )}
              </div>

              {/* Entering count */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  textAlign: "right",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {step.entering}
              </p>

              {/* Conversion % */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: barColor,
                  textAlign: "right",
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {step.drop_offs > 0 ? (
                  <>
                    {step.conversion_pct}%
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: COLORS.red,
                        marginLeft: 4,
                      }}
                    >
                      −{step.drop_offs}
                    </span>
                  </>
                ) : (
                  "100%"
                )}
              </p>
            </div>
          );
        })}

        {/* Completion row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 80px 80px",
            alignItems: "center",
            gap: 16,
            padding: "16px 24px",
            background: `${completionColor(summary.completion_rate_pct)}08`,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: completionColor(summary.completion_rate_pct),
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Completed
          </p>
          <div />
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: completionColor(summary.completion_rate_pct),
              textAlign: "right",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {summary.completed}
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: completionColor(summary.completion_rate_pct),
              textAlign: "right",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {summary.completion_rate_pct}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
