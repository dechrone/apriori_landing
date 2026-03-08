"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function ExecutiveSummary({ data }: Props) {
  const summary = data.executive_summary;
  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
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
        Executive Summary
      </h2>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E2EA",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <p
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: "#1A1A1A",
            lineHeight: 1.8,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {summary}
        </p>
      </div>
    </motion.div>
  );
}
