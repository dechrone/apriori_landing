"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function UserMentalModels({ data }: Props) {
  const mm = data.user_mental_models;
  if (!mm) return null;

  const hasContent =
    (mm.expectations?.length ?? 0) > 0 ||
    (mm.gaps_found?.length ?? 0) > 0 ||
    (mm.surprising_behaviors?.length ?? 0) > 0;

  if (!hasContent) return null;

  const sections = [
    {
      key: "expectations",
      title: "User Expectations",
      subtitle: "What users expected before interacting with each screen",
      items: mm.expectations ?? [],
      color: "#2563EB",
      icon: "→",
    },
    {
      key: "gaps_found",
      title: "Expectation Gaps",
      subtitle: "Where reality diverged from what users expected",
      items: mm.gaps_found ?? [],
      color: "#DC2626",
      icon: "≠",
    },
    {
      key: "surprising_behaviors",
      title: "Surprising Behaviors",
      subtitle: "Unexpected actions or decisions observed in the simulation",
      items: mm.surprising_behaviors ?? [],
      color: "#D97706",
      icon: "!",
    },
  ];

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
        User Mental Models
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
        className="mental-models-grid"
      >
        {sections.map((s) => {
          if (s.items.length === 0) return null;
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderTop: `3px solid ${s.color}`,
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {s.icon}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {s.title}
                </p>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  marginBottom: 14,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {s.subtitle}
              </p>
              <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {s.items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 14,
                      color: COLORS.textSecondary,
                      lineHeight: 1.6,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mental-models-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
