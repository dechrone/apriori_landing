"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, BehaviorAnalysisScreen } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

function successRateColor(rate: number): string {
  if (rate >= 70) return "#16A34A";
  if (rate >= 40) return "#D97706";
  return "#DC2626";
}

export function TaskAnalysis({ data }: Props) {
  const ba = data.behavior_analysis;
  if (!ba || Object.keys(ba).length === 0) return null;

  const entries = Object.entries(ba).sort(([a], [b]) => a.localeCompare(b));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textPrimary,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          marginBottom: 20,
        }}
      >
        Task Analysis
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {entries.map(([screenId, screen]: [string, BehaviorAnalysisScreen], si) => {
          if (screen.analysis_error) {
            return (
              <div
                key={screenId}
                style={{
                  background: COLORS.bgSurface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: 24,
                  opacity: 0.6,
                }}
              >
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>
                  {screenId}: analysis unavailable
                </span>
              </div>
            );
          }

          const rateColor = successRateColor(screen.task_success_rate ?? 0);

          return (
            <motion.div
              key={screenId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.45 + si * 0.06 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 28,
              }}
              className="sim-card-hover"
            >
              {/* Screen header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#6B7280",
                      background: "rgba(255,255,255,0.06)",
                      padding: "3px 10px",
                      borderRadius: 6,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {screenId}
                  </span>
                  {screen.primary_task && (
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {screen.primary_task}
                    </span>
                  )}
                </div>

                {/* Task success rate badge */}
                {screen.task_success_rate !== undefined && (
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: rateColor,
                      background: `${rateColor}1a`,
                      padding: "4px 12px",
                      borderRadius: 8,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {screen.task_success_rate}% task success
                  </span>
                )}
              </div>

              {/* Screen verdict */}
              {screen.screen_verdict && (
                <p
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: COLORS.textSecondary,
                    lineHeight: 1.65,
                    marginBottom: 20,
                    borderLeft: `3px solid ${COLORS.border}`,
                    paddingLeft: 14,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {screen.screen_verdict}
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 16,
                }}
                className="task-analysis-grid"
              >
                {/* Behavioral observations */}
                {screen.behavioral_observations?.length > 0 && (
                  <ObservationBlock
                    title="What Users Did"
                    color="#2563EB"
                    items={screen.behavioral_observations}
                  />
                )}

                {/* Confusion signals */}
                {screen.confusion_signals?.length > 0 && (
                  <ObservationBlock
                    title="Where They Got Stuck"
                    color="#DC2626"
                    items={screen.confusion_signals}
                  />
                )}

                {/* Decision drivers */}
                {screen.decision_drivers?.length > 0 && (
                  <ObservationBlock
                    title="What Drove Them Forward"
                    color="#16A34A"
                    items={screen.decision_drivers}
                  />
                )}

                {/* Segment differences */}
                {screen.segment_differences?.length > 0 && (
                  <ObservationBlock
                    title="Segment Differences"
                    color="#7C3AED"
                    items={screen.segment_differences}
                  />
                )}
              </div>

              {/* Verbatim reactions */}
              {screen.verbatim_reactions?.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: COLORS.textMuted,
                      marginBottom: 10,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    Verbatim Reactions
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {screen.verbatim_reactions.map((quote, qi) => (
                      <p
                        key={qi}
                        style={{
                          fontSize: 14,
                          fontStyle: "italic",
                          color: COLORS.textSecondary,
                          lineHeight: 1.6,
                          borderLeft: `3px solid rgba(245,158,11,0.4)`,
                          paddingLeft: 12,
                          fontFamily: "var(--font-inter), sans-serif",
                        }}
                      >
                        {quote}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .task-analysis-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

function ObservationBlock({
  title,
  color,
  items,
}: {
  title: string;
  color: string;
  items: string[];
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${COLORS.border}`,
        borderTop: `3px solid ${color}`,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color,
          marginBottom: 10,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
        }}
      >
        {title}
      </p>
      <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: COLORS.textSecondary,
              lineHeight: 1.55,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
