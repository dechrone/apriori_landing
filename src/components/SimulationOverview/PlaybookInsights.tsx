"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

/* ── Cluster type labels & colors ── */
const CLUSTER_TYPE_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  trust_deficit:        { label: "Trust Deficit",        color: "#DC2626", bg: "#FEF2F2" },
  comprehension_barrier:{ label: "Comprehension Barrier", color: "#D97706", bg: "#FFFBEB" },
  social_proof_gap:     { label: "Social Proof Gap",     color: "#2563EB", bg: "#EFF6FF" },
  price_sensitivity:    { label: "Price Sensitivity",    color: "#7C3AED", bg: "#F5F3FF" },
};

function clusterTypeStyle(type: string) {
  return CLUSTER_TYPE_STYLES[type] ?? { label: type.replace(/_/g, " "), color: "#6B7280", bg: "#F3F4F6" };
}

/* ── Effort badge colors ── */
function effortStyle(effort: string): { color: string; bg: string } {
  if (effort === "low")    return { color: "#16A34A", bg: "#F0FDF4" };
  if (effort === "high")   return { color: "#DC2626", bg: "#FEF2F2" };
  return { color: "#D97706", bg: "#FFFBEB" }; // medium
}

/* ── Sort screen IDs by their leading number ── */
function extractNum(id: string): number {
  const m = id.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export function PlaybookInsights({ data }: Props) {
  const playbook = data.playbook_insights;
  if (!playbook || Object.keys(playbook).length === 0) return null;

  const screenEntries = Object.entries(playbook).sort(([a], [b]) => {
    const diff = extractNum(a) - extractNum(b);
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

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
        Playbook Insights
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {screenEntries.map(([screenId, insight], si) => {
          const recs = (insight.cluster_recommendations ?? []) as Record<string, unknown>[];

          return (
            <motion.div
              key={screenId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.45 + si * 0.08 }}
            >
              {/* Screen header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#6B7280",
                    background: "#F3F4F6",
                    padding: "3px 10px",
                    borderRadius: 6,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  Screen {screenId}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {insight.playbook_theme as string}
                </span>
              </div>

              {/* Screen summary */}
              {insight.screen_summary && (
                <p
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: COLORS.textSecondary,
                    lineHeight: 1.65,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), sans-serif",
                    borderLeft: "3px solid #E5E7EB",
                    paddingLeft: 14,
                  }}
                >
                  {insight.screen_summary as string}
                </p>
              )}

              {/* Recommendation cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: 16,
                }}
                className="playbook-recs-grid"
              >
                {recs.map((rec, ri) => {
                  const ct = clusterTypeStyle(String(rec.cluster_type ?? ""));
                  const ef = effortStyle(String(rec.effort ?? "").toLowerCase());
                  const uplift = rec.conversion_uplift_pct as string | undefined;

                  return (
                    <div
                      key={ri}
                      style={{
                        background: COLORS.bgSurface,
                        border: `1px solid ${COLORS.border}`,
                        borderTop: `3px solid ${ct.color}`,
                        borderRadius: 14,
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}
                    >
                      {/* Row 1 — badges */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: ct.color,
                            background: ct.bg,
                            padding: "3px 8px",
                            borderRadius: 5,
                            textTransform: "capitalize",
                            letterSpacing: "0.04em",
                            fontFamily: "var(--font-plus-jakarta), sans-serif",
                          }}
                        >
                          {ct.label}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: ef.color,
                            background: ef.bg,
                            padding: "3px 8px",
                            borderRadius: 5,
                            textTransform: "capitalize",
                            letterSpacing: "0.04em",
                            fontFamily: "var(--font-plus-jakarta), sans-serif",
                          }}
                        >
                          {String(rec.effort ?? "").charAt(0).toUpperCase() + String(rec.effort ?? "").slice(1)} effort
                        </span>
                        {uplift && (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#16A34A",
                              background: "#F0FDF4",
                              padding: "3px 8px",
                              borderRadius: 5,
                              fontFamily: "var(--font-plus-jakarta), sans-serif",
                            }}
                          >
                            {uplift}
                          </span>
                        )}
                      </div>

                      {/* Technique name */}
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: COLORS.textPrimary,
                          lineHeight: 1.4,
                          marginBottom: 8,
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                        }}
                      >
                        {rec.technique as string}
                      </p>

                      {/* Description */}
                      {rec.description && (
                        <p
                          style={{
                            fontSize: 14,
                            color: COLORS.textSecondary,
                            lineHeight: 1.65,
                            marginBottom: 12,
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          {rec.description as string}
                        </p>
                      )}

                      {/* Divider */}
                      <div style={{ borderTop: `1px solid ${COLORS.border}`, marginBottom: 12 }} />

                      {/* Expected impact */}
                      {rec.expected_impact && (
                        <p
                          style={{
                            fontSize: 13,
                            color: COLORS.green,
                            fontWeight: 500,
                            lineHeight: 1.5,
                            marginBottom: rec.industry_example ? 8 : 0,
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          ↑ {rec.expected_impact as string}
                        </p>
                      )}

                      {/* Industry example */}
                      {rec.industry_example && (
                        <p
                          style={{
                            fontSize: 13,
                            color: COLORS.textMuted,
                            lineHeight: 1.5,
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          💡 {rec.industry_example as string}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .playbook-recs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
