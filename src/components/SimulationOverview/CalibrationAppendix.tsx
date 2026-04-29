"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function CalibrationAppendix({ data }: Props) {
  const expected = data.expected_completion_rate_pct;
  if (expected == null) return null;

  const simulated = data.summary.completion_rate_pct;
  const delta = Math.round((simulated - expected) * 10) / 10;
  const direction = delta >= 0 ? "above" : "below";
  const absDelta = Math.abs(delta);

  const simColor = completionColor(simulated);
  const expColor = completionColor(expected);

  const maxVal = Math.max(simulated, expected, 1);

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
          marginBottom: 8,
        }}
      >
        Calibration
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        Simulated completion rate vs. your reported real-world baseline
      </p>

      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "28px 32px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Simulated bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Simulated
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: simColor,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {simulated}%
              </p>
            </div>
            <div
              style={{
                height: 28,
                background: "#F4F1EC",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(simulated / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  height: "100%",
                  background: simColor,
                  borderRadius: 8,
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          {/* Expected bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Real-World Baseline
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: expColor,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {expected}%
              </p>
            </div>
            <div
              style={{
                height: 28,
                background: "#F4F1EC",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(expected / maxVal) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  height: "100%",
                  background: expColor,
                  borderRadius: 8,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Delta callout */}
        <div
          style={{
            marginTop: 24,
            padding: "14px 20px",
            borderRadius: 10,
            background:
              absDelta <= 5
                ? "rgba(16, 185, 129, 0.06)"
                : "rgba(245, 158, 11, 0.06)",
            border: `1px solid ${
              absDelta <= 5
                ? "rgba(16, 185, 129, 0.2)"
                : "rgba(245, 158, 11, 0.2)"
            }`,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: COLORS.textPrimary,
              lineHeight: 1.6,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            Simulation predicted{" "}
            <strong>
              {absDelta}pp {direction}
            </strong>{" "}
            the real-world baseline.
            {absDelta <= 5
              ? " Strong calibration, simulation closely matches observed behavior."
              : absDelta <= 15
                ? " Moderate deviation, directionally useful but verify key drop-off screens with real data."
                : " Significant deviation, treat simulation insights as directional. Investigate root causes of the gap."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
