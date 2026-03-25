"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

// Temporary title map — replace with API field once backend ships it
const INSIGHT_TITLES = [
  "Demographic Misalignment",
  "The Pragmatist Barrier",
  "Discreet Packaging Signal",
  "The Ingredient Gap",
];

export function BehavioralInsights({ data }: Props) {
  const rawInsights = data.behavioral_insights;
  if (!rawInsights || rawInsights.length === 0) return null;

  // Map over behavioral_insights array to add title
  const insights = rawInsights.map((description, i) => ({
    id: String(i + 1).padStart(2, "0"),
    title: INSIGHT_TITLES[i] ?? `Insight ${i + 1}`, // fallback for any extras
    description,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
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
        Behavioral Patterns
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.1 }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E2EA",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "all 0.18s ease",
              cursor: "default",
            }}
            whileHover={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              y: -1,
            }}
          >
            {/* Large numeral - decorative */}
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#E2E2EA",
                lineHeight: 1,
                marginBottom: 12,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {insight.id}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: "#0D0D14",
                marginBottom: 8,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {insight.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#5A5A72",
                lineHeight: 1.65,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {insight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
