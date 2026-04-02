"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import { formatPct } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function ExecutiveVerdict({ data }: Props) {
  const pct = data.summary.completion_rate_pct;
  const color = completionColor(pct);

  const verdict =
    data.flow_assessment?.overall_verdict ||
    "Simulation complete. Review metrics below.";

  // Executive summary provides the segment context below the verdict
  const execSummary = data.executive_summary || null;
  const segmentInsight = data.segment_analysis?.summary || null;
  // Use exec summary if available, fall back to segment insight
  const contextText = execSummary || segmentInsight || null;

  const topDropOff = data.funnel_drop_off?.[0];
  const topDropOffLabel = topDropOff
    ? topDropOff.screen_id
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      {/* Main verdict card */}
      <div
        style={{
          background: "#1A1814",
          borderRadius: 20,
          padding: "40px 44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle accent glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `${color}15`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          {/* Left — Verdict text */}
          <div style={{ flex: 1, minWidth: 320 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: color,
                marginBottom: 16,
              }}
            >
              The Verdict
            </p>

            <p
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.5,
                fontFamily: "var(--font-inter), sans-serif",
                marginBottom: contextText ? 16 : 0,
              }}
            >
              {verdict}
            </p>

            {contextText && (
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {contextText}
              </p>
            )}
          </div>

          {/* Right — Completion rate */}
          <div style={{ textAlign: "center", flexShrink: 0, paddingTop: 8 }}>
            <p
              style={{
                fontSize: "clamp(56px, 10vw, 80px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: color,
                lineHeight: 1,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {formatPct(pct)}
            </p>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.4)",
                marginTop: 8,
              }}
            >
              Completion Rate
            </p>
          </div>
        </div>
      </div>

      {/* Key metrics strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          marginTop: 2,
          borderRadius: "0 0 16px 16px",
          overflow: "hidden",
          background: COLORS.border,
        }}
        className="sim-verdict-metrics"
      >
        <MetricCell
          label="Personas Tested"
          value={String(data.summary.total_personas)}
          sub={data.summary.total_personas <= 20 ? "production: 50–200" : undefined}
        />
        <MetricCell
          label="Dropped Off"
          value={`${data.summary.dropped_off}`}
          sub={topDropOffLabel ? `worst: ${topDropOffLabel}` : undefined}
          valueColor={data.summary.dropped_off > 0 ? COLORS.red : undefined}
        />
        <MetricCell
          label="Avg. Time"
          value={formatTime(data.summary.avg_time_to_complete_seconds)}
        />
      </div>
    </motion.div>
  );
}

function MetricCell({
  label,
  value,
  sub,
  valueColor,
}: {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        background: COLORS.bgSurface,
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: COLORS.textMuted,
          marginBottom: 6,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: valueColor || COLORS.textPrimary,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontSize: 12,
            color: COLORS.textMuted,
            marginTop: 4,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}
