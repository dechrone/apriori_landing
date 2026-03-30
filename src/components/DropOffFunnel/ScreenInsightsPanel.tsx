"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, AlertTriangle, TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
import type { SimulationData } from "@/types/simulation";
import type { FunnelScreen } from "./utils/parseFunnelData";

interface Props {
  screen: FunnelScreen;
  data: SimulationData;
  onClose: () => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 8,
  fontFamily: "var(--font-plus-jakarta), sans-serif",
};

function ScoreBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  const pct = Math.round((value / max) * 100);
  const color = value < 4 ? "#DC2626" : value < 7 ? "#EA580C" : "#16A34A";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#5A5A72", fontFamily: "var(--font-inter), sans-serif" }}>
          {label}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color, fontFamily: "var(--font-inter), sans-serif" }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6" }}>
        <div style={{ height: 6, borderRadius: 3, background: color, width: `${pct}%`, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

export function ScreenInsightsPanel({ screen, data, onClose }: Props) {
  const screenId = screen.screen_id;

  // Screen metrics
  const metrics = data.screen_metrics?.[screenId];

  // Find matching usability findings for this screen
  const recommendations = (data.usability_findings ?? []).filter((f) => {
    if (f.screen === screenId) return true;
    const stepMatch = f.screen?.match(/Step\s+(\d+)/i);
    if (stepMatch && parseInt(stepMatch[1], 10) === screen.step_number) return true;
    return false;
  });

  // Find matching friction points from top_friction_points
  // Also check what_needs_fixing for this screen
  const fixItems = (data.flow_assessment?.what_needs_fixing ?? []).filter((item) => {
    if (item.element?.includes(screenId)) return true;
    const stepMatch = item.element?.match(/Step\s+(\d+)/i);
    if (stepMatch && parseInt(stepMatch[1], 10) === screen.step_number) return true;
    return false;
  });

  // Drop-off clusters
  const clusters = data.drop_off_analysis?.screens?.[screenId]?.clusters ?? [];

  // Behavioral analysis for this screen
  const behaviorScreen = data.behavior_analysis?.[screenId];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E2EA",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        maxHeight: "calc(100vh - 48px)",
        overflowY: "auto",
      }}
      className="dropoff-persona-panel"
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0D0D14",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              lineHeight: 1.3,
            }}
          >
            Screen Insights
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#9090A8",
              fontFamily: "var(--font-inter), sans-serif",
              marginTop: 2,
            }}
          >
            {screen.view_name}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            border: "1px solid #E2E2EA",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <X size={14} color="#9090A8" />
        </button>
      </div>

      {/* ── Drop-off summary ── */}
      <div
        style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TrendingDown size={18} color="#DC2626" />
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#DC2626", fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
            {screen.drop_offs} user{screen.drop_offs !== 1 ? "s" : ""} dropped off here
            {screen.is_biggest_drop && (
              <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700 }}>
                <AlertTriangle size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 2 }} />
                BIGGEST DROP
              </span>
            )}
          </p>
          <p style={{ fontSize: 12, color: "#9B1C1C", fontFamily: "var(--font-inter), sans-serif", marginTop: 2 }}>
            {screen.drop_off_pct}% of total drop-offs occurred at this screen
          </p>
        </div>
      </div>

      {/* ── Screen Health Scores ── */}
      {metrics && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <BarChart3 size={14} color="#9090A8" />
            <p style={{ ...labelStyle, marginBottom: 0, color: "#9090A8" }}>Screen Health</p>
          </div>
          <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "14px 16px" }}>
            <ScoreBar label="Trust" value={metrics.avg_trust} />
            <ScoreBar label="Clarity" value={metrics.avg_clarity} />
            <ScoreBar label="Perceived Value" value={metrics.avg_value} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: "#9090A8", fontFamily: "var(--font-inter), sans-serif" }}>
                Avg. time on screen
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#5A5A72", fontFamily: "var(--font-inter), sans-serif" }}>
                {metrics.avg_time_s >= 60
                  ? `${Math.floor(metrics.avg_time_s / 60)}m ${Math.round(metrics.avg_time_s % 60)}s`
                  : `${Math.round(metrics.avg_time_s)}s`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Behavioral analysis summary ── */}
      {behaviorScreen && !behaviorScreen.analysis_error && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ ...labelStyle, color: "#EA580C" }}>
            {behaviorScreen.primary_task || "Behavioral Finding"}
          </p>
          <div
            style={{
              background: "#FFF7ED",
              borderLeft: "3px solid #FDBA74",
              borderRadius: "0 8px 8px 0",
              padding: "12px 16px",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontStyle: "italic",
                color: "#0D0D14",
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {behaviorScreen.screen_verdict}
            </p>
          </div>
        </div>
      )}

      {/* ── What's broken ── */}
      {fixItems.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ ...labelStyle, color: "#DC2626" }}>What&apos;s Broken</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {fixItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E2EA",
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0D0D14", marginBottom: 4, fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                  {item.problem}
                </p>
                {item.for_whom && (
                  <p style={{ fontSize: 12, color: "#9090A8", fontFamily: "var(--font-inter), sans-serif" }}>
                    Affects: {item.for_whom}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Recommendations ── */}
      {recommendations.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Lightbulb size={14} color="#16A34A" />
            <p style={{ ...labelStyle, marginBottom: 0, color: "#16A34A" }}>Recommendations</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recommendations.map((rec, i) => (
              <div
                key={i}
                style={{
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: rec.severity === "critical" ? "#DC2626" : rec.severity === "major" ? "#EA580C" : "#3B82F6",
                      background: rec.severity === "critical" ? "#FEE2E2" : rec.severity === "major" ? "#FFF7ED" : "#EFF6FF",
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {rec.severity}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#0D0D14", fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                    {rec.finding.length > 80 ? rec.finding.slice(0, 80) + "…" : rec.finding}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.55, fontFamily: "var(--font-inter), sans-serif" }}>
                  {rec.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Drop reason clusters ── */}
      {clusters.length > 0 && clusters.some((c) => c.label) && (
        <div style={{ marginBottom: 10 }}>
          <p style={{ ...labelStyle, color: "#9090A8" }}>Drop-Off Clusters</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {clusters.filter((c) => c.label).map((cluster, i) => (
              <div
                key={i}
                style={{
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <p style={{ fontSize: 13, color: "#374151", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.5 }}>
                  {cluster.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
