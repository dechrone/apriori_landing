"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function QuickWins({ data }: Props) {
  const wins = data.flow_assessment?.quick_wins;
  if (!wins || wins.length === 0) return null;

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
        Quick Wins
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: wins.length === 1 ? "1fr" : "repeat(2, 1fr)",
          gap: 16,
        }}
        className="sim-quickwins-grid"
      >
        {wins.map((win, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 + i * 0.06 }}
            style={{
              background: "#FFFFFF",
              border: `1px solid ${COLORS.border}`,
              borderLeft: `4px solid ${COLORS.green}`,
              borderRadius: 16,
              padding: 24,
              transition: "all 0.2s ease",
            }}
            className="sim-card-hover"
          >
            {/* Change text */}
            {win.change && (
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-inter), sans-serif",
                  marginBottom: 8,
                }}
              >
                {win.change}
              </p>
            )}

            {/* Expected uplift */}
            {win.expected_uplift && (
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.textSecondary,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {win.expected_uplift}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
