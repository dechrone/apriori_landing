"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function FrictionPoints({ data }: Props) {
  const points = data.top_friction_points;
  if (!points || points.length === 0) return null;

  const sorted = [...points].sort((a, b) => b.frequency - a.frequency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
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
        Top Friction Points
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
        className="sim-friction-grid"
      >
        {sorted.map((fp, i) => (
          <motion.div
            key={fp.friction}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
            style={{
              background: COLORS.bgSurface,
              border: `1px solid ${COLORS.border}`,
              borderLeft: `3px solid rgba(255, 59, 59, 0.3)`,
              borderRadius: 16,
              padding: "24px 28px",
              position: "relative",
              transition: "all 0.2s ease",
              cursor: "default",
            }}
            className="sim-friction-card"
          >
            {/* Decorative quote mark */}
            <span
              style={{
                position: "absolute",
                top: 12,
                left: 20,
                fontSize: 64,
                fontWeight: 800,
                color: COLORS.red,
                opacity: 0.12,
                lineHeight: 1,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              &ldquo;
            </span>

            <p
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: COLORS.textPrimary,
                lineHeight: 1.6,
                paddingTop: 8,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {fp.friction}
            </p>

            {fp.frequency > 1 && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: COLORS.amber,
                  background: "rgba(245, 166, 35, 0.12)",
                  padding: "4px 10px",
                  borderRadius: 6,
                }}
              >
                Reported {fp.frequency}×
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
