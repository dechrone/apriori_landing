"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function SegmentAnalysis({ data }: Props) {
  const seg = data.segment_analysis;
  if (!seg) return null;

  const hasHigh = seg.high_propensity_segment && seg.high_propensity_segment.trim().length > 0;
  const hasLow = seg.low_propensity_segment && seg.low_propensity_segment.trim().length > 0;
  if (!hasHigh && !hasLow && !seg.summary) return null;

  const isNA = (val: string) =>
    !val || val.trim().toLowerCase().startsWith("n/a");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
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
        Segment Analysis
      </h2>

      {/* Two-card layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
        className="sim-segment-grid"
      >
        {/* High propensity */}
        <div
          style={{
            background: "rgba(0, 229, 160, 0.04)",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 28,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COLORS.green,
              marginBottom: 14,
            }}
          >
            ✓ Who Converts
          </p>
          {isNA(seg.high_propensity_segment) ? (
            <p
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: COLORS.textMuted,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              No high-propensity segment identified in this run.
            </p>
          ) : (
            <p
              style={{
                fontSize: 15,
                color: COLORS.textPrimary,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {seg.high_propensity_segment}
            </p>
          )}
        </div>

        {/* Low propensity */}
        <div
          style={{
            background: "rgba(255, 59, 59, 0.04)",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 28,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COLORS.red,
              marginBottom: 14,
            }}
          >
            ✗ Who Drops Off
          </p>
          {isNA(seg.low_propensity_segment) ? (
            <p
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: COLORS.textMuted,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              No low-propensity segment identified in this run.
            </p>
          ) : (
            <p
              style={{
                fontSize: 15,
                color: COLORS.textPrimary,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {seg.low_propensity_segment}
            </p>
          )}
        </div>
      </div>

      {/* Summary prose */}
      {seg.summary && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {seg.summary}
          </p>
        </div>
      )}
    </motion.div>
  );
}
