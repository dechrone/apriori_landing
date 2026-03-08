"use client";

import { motion } from "framer-motion";
import { emotionColor } from "./utils/colorHelpers";
import { parseEmotionalArc } from "./utils/emotionParser";
import { truncate } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

function ArcRow({
  label,
  emotions,
  delay,
}: {
  label: string;
  emotions: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 0",
      }}
    >
      {/* Persona label */}
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.textSecondary,
          minWidth: 160,
          maxWidth: 200,
          flexShrink: 0,
          fontFamily: "var(--font-inter), sans-serif",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={label}
      >
        {truncate(label, 24)}
      </span>

      {/* Nodes + lines */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {emotions.map((emotion, i) => {
          const color = emotionColor(emotion);
          return (
            <div
              key={`${emotion}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {/* Connecting line */}
              {i > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.3, delay: delay + i * 0.1 }}
                  style={{
                    height: 2,
                    background: `linear-gradient(90deg, ${emotionColor(emotions[i - 1])}, ${color})`,
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: delay + i * 0.12,
                    type: "spring",
                    stiffness: 400,
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: `${color}25`,
                    border: `2px solid ${color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  className="sim-emotion-node"
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                    }}
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: color,
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {emotion}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function EmotionalJourneyMap({ data }: Props) {
  const journeys = data.persona_journeys ?? [];
  const ej = data.flow_assessment?.emotional_journey_map;
  const noCompleters = data.summary.completed === 0;

  if (journeys.length === 0 && !ej) return null;

  const displayJourneys = journeys.slice(0, 3);

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
        Emotional Journey
      </h2>

      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: 28,
          overflowX: "auto",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Persona arcs */}
        {displayJourneys.length > 0 ? (
          displayJourneys.map((j, i) => {
            const emotions = parseEmotionalArc(j.emotional_arc);
            return (
              <ArcRow
                key={j.persona_type + i}
                label={j.persona_type}
                emotions={emotions}
                delay={0.1 + i * 0.15}
              />
            );
          })
        ) : (
          ej?.drop_offs && (
            <p
              style={{
                fontSize: 16,
                color: COLORS.textSecondary,
                lineHeight: 1.6,
                fontStyle: "italic",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {ej.drop_offs}
            </p>
          )
        )}

        {/* Drop-offs callout when 0 completers */}
        {noCompleters && ej?.drop_offs && displayJourneys.length > 0 && (
          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              background: "rgba(255, 59, 59, 0.06)",
              borderLeft: `3px solid ${COLORS.red}`,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.textSecondary,
                lineHeight: 1.6,
                fontStyle: "italic",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {ej.drop_offs}
            </p>
          </div>
        )}

        {/* Completers row */}
        {!noCompleters && ej?.completers && ej.completers !== "Not applicable, as there were zero completers in the simulation." && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(0, 229, 160, 0.06)",
              borderLeft: `3px solid ${COLORS.green}`,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: COLORS.green,
                marginBottom: 6,
              }}
            >
              Completers
            </p>
            <p
              style={{
                fontSize: 15,
                color: COLORS.textSecondary,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {ej.completers}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
