"use client";

import { motion } from "framer-motion";
import { priorityColor, priorityBg } from "./utils/colorHelpers";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function DesignRecommendations({ data }: Props) {
  const recs = data.design_recommendations;
  if (!recs || recs.length === 0) return null;

  const sorted = [...recs].sort((a, b) => {
    const order: Record<string, number> = { P0: 0, P1: 1, P2: 2 };
    return (order[a.priority] ?? 3) - (order[b.priority] ?? 3);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
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
        Design Recommendations
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sorted.map((rec, i) => {
          const pColor = priorityColor(rec.priority);
          const pBg = priorityBg(rec.priority);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderLeft: `4px solid ${pColor}`,
                borderRadius: 16,
                padding: 28,
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
                  gap: 10,
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
                  {/* Priority badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: pColor,
                      background: pBg,
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: pColor,
                        display: "inline-block",
                      }}
                    />
                    {rec.priority}
                  </span>

                  {/* Screen name */}
                  {rec.screen && (
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: COLORS.textPrimary,
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {rec.screen}
                    </span>
                  )}
                </div>

                {/* Expected impact */}
                {rec.expected_impact && (
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: COLORS.green,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {rec.expected_impact}
                  </span>
                )}
              </div>

              {/* Issue */}
              {rec.issue && (
                <p
                  style={{
                    fontSize: 15,
                    color: COLORS.textSecondary,
                    lineHeight: 1.6,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {rec.issue}
                </p>
              )}

              {/* Divider */}
              <div
                style={{
                  borderTop: `1px solid ${COLORS.border}`,
                  marginBottom: 16,
                }}
              />

              {/* Recommendation */}
              {rec.recommendation && (
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: COLORS.textPrimary,
                    lineHeight: 1.6,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {rec.recommendation}
                </p>
              )}

            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
