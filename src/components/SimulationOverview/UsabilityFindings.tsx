"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, UsabilityFinding } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

const SEVERITY_STYLES: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: "#DC2626", bg: "rgba(220,38,38,0.12)", label: "Critical" },
  major:    { color: "#D97706", bg: "rgba(217,119,6,0.12)", label: "Major" },
  minor:    { color: "#6B7280", bg: "rgba(107,114,128,0.12)", label: "Minor" },
};

const TYPE_LABELS: Record<string, string> = {
  task_failure:         "Task Failure",
  confusion:            "Confusion",
  unexpected_behavior:  "Unexpected Behavior",
  trust_issue:          "Trust Issue",
  friction_point:       "Friction Point",
};

function severityOrder(s: string): number {
  return { critical: 0, major: 1, minor: 2 }[s] ?? 3;
}

export function UsabilityFindings({ data }: Props) {
  const findings = data.usability_findings;
  if (!findings || findings.length === 0) return null;

  const sorted = [...findings].sort(
    (a, b) => severityOrder(a.severity) - severityOrder(b.severity),
  );

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
        Usability Findings
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sorted.map((f: UsabilityFinding, i) => {
          const sev = SEVERITY_STYLES[f.severity] ?? SEVERITY_STYLES.minor;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderLeft: `4px solid ${sev.color}`,
                borderRadius: 16,
                padding: 28,
              }}
              className="sim-card-hover"
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: sev.color,
                    background: sev.bg,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  {sev.label}
                </span>

                {f.type && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: COLORS.textMuted,
                      background: "rgba(255,255,255,0.05)",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {TYPE_LABELS[f.type] ?? f.type.replace(/_/g, " ")}
                  </span>
                )}

                {f.screen && (
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {f.screen}
                  </span>
                )}
              </div>

              {/* Finding */}
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.textPrimary,
                  lineHeight: 1.6,
                  fontWeight: 500,
                  marginBottom: 10,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {f.finding}
              </p>

              {/* Evidence */}
              {f.evidence && (
                <p
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: COLORS.textSecondary,
                    lineHeight: 1.6,
                    marginBottom: 14,
                    borderLeft: `3px solid ${COLORS.border}`,
                    paddingLeft: 12,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {f.evidence}
                </p>
              )}

              {/* Affected segments */}
              {f.affected_segments && f.affected_segments.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 14,
                  }}
                >
                  {f.affected_segments.map((seg, si) => (
                    <span
                      key={si}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: COLORS.textMuted,
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${COLORS.border}`,
                        padding: "3px 8px",
                        borderRadius: 5,
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {seg}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, marginBottom: 14 }} />

              {/* Recommendation */}
              {f.recommendation && (
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: COLORS.green,
                    lineHeight: 1.6,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  → {f.recommendation}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
