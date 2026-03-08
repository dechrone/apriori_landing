"use client";

import { motion } from "framer-motion";
import { scoreColor } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

function HealthBar({
  value,
  label,
  delay,
}: {
  value: number;
  label: string;
  delay: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / 10) * 100));
  const color = scoreColor(value);

  return (
    <div style={{ flex: 1, minWidth: 100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: COLORS.textSecondary,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: color,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {value.toFixed(1)}
        </span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
          style={{
            height: "100%",
            borderRadius: 4,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

export function ScreenHealthMap({ data }: Props) {
  const metrics = data.screen_metrics;
  const ux = data.ux_analysis;

  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: 28,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 15, color: COLORS.textMuted }}>
          Screen metrics not available for this simulation
        </p>
      </div>
    );
  }

  const sortedScreens = Object.entries(metrics).sort(([a], [b]) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div style={{ marginBottom: 12 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: COLORS.textPrimary,
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            marginBottom: 4,
          }}
        >
          Screen Health
        </h2>
        <p
          style={{
            fontSize: 15,
            color: COLORS.textSecondary,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          Trust · Clarity · Value scores per screen (out of 10)
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sortedScreens.map(([screenId, m], idx) => {
          const tags: { label: string; color: string }[] = [];
          if (ux?.highest_friction_screen === screenId)
            tags.push({ label: "HIGHEST FRICTION", color: COLORS.red });
          if (ux?.clarity_problem_screens?.includes(screenId))
            tags.push({ label: "CLARITY GAP", color: COLORS.amber });
          if (ux?.value_gap_screens?.includes(screenId))
            tags.push({ label: "VALUE GAP", color: COLORS.amber });

          return (
            <div
              key={screenId}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 24,
                transition: "all 0.2s ease",
              }}
              className="sim-card-hover"
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {formatScreenId(screenId)}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: COLORS.textMuted,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    (n={m.sample_size})
                  </span>
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: tag.color,
                        background: `${tag.color}18`,
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: COLORS.textMuted,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  ~{m.avg_time_s}s
                </span>
              </div>

              {/* Bars */}
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  flexWrap: "wrap",
                }}
                className="sim-screen-bars"
              >
                <HealthBar
                  value={m.avg_trust}
                  label="Trust"
                  delay={0.1 + idx * 0.08}
                />
                <HealthBar
                  value={m.avg_clarity}
                  label="Clarity"
                  delay={0.2 + idx * 0.08}
                />
                <HealthBar
                  value={m.avg_value}
                  label="Value"
                  delay={0.3 + idx * 0.08}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
