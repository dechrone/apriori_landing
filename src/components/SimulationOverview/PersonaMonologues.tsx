"use client";

import { motion } from "framer-motion";
import { emotionColor } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, DropOffMonologue } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function PersonaMonologues({ data }: Props) {
  let monologuesByScreen: Record<string, DropOffMonologue[]> =
    data.drop_off_monologues || {};

  // Fallback: extract from persona_details if drop_off_monologues not available
  if (
    Object.keys(monologuesByScreen).length === 0 &&
    data.persona_details &&
    data.persona_details.length > 0
  ) {
    const fallback: Record<string, DropOffMonologue[]> = {};
    for (const pd of data.persona_details) {
      if (!pd.outcome?.startsWith("dropped_off_at_")) continue;
      const screenId = pd.outcome.replace("dropped_off_at_", "");
      const screenMono = pd.screen_monologues?.find(
        (sm) =>
          sm.screen_id === screenId ||
          sm.decision_outcome === "DROP_OFF"
      );
      if (!screenMono || !screenMono.internal_monologue) continue;

      if (!fallback[screenId]) fallback[screenId] = [];
      if (fallback[screenId].length >= 5) continue;

      const age = pd.demographics?.age ?? "?";
      const occ = pd.demographics?.occupation ?? "Unknown";
      const district = pd.demographics?.district ?? "";
      fallback[screenId].push({
        persona_uuid: pd.persona_uuid,
        persona_label: `${age}yo ${occ}${district ? `, ${district}` : ""}`,
        behavioral_archetype:
          pd.demographics?.behavioral_archetype ?? "Unknown",
        internal_monologue: screenMono.internal_monologue,
        reasoning: screenMono.reasoning,
        emotional_state: screenMono.emotional_state,
        trust_score: screenMono.trust_score,
        clarity_score: screenMono.clarity_score,
        value_score: screenMono.value_score,
      });
    }
    monologuesByScreen = fallback;
  }

  const screenIds = Object.keys(monologuesByScreen);
  if (screenIds.length === 0) return null;

  // Sort screens by number of monologues (most drop-offs first)
  const sortedScreens = [...screenIds].sort(
    (a, b) =>
      (monologuesByScreen[b]?.length ?? 0) -
      (monologuesByScreen[a]?.length ?? 0)
  );

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
          marginBottom: 8,
        }}
      >
        The Why — Persona Monologues
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        What users were thinking at the moment they decided to leave
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {sortedScreens.map((screenId) => {
          const monologues = monologuesByScreen[screenId];
          if (!monologues || monologues.length === 0) return null;

          return (
            <div key={screenId}>
              {/* Screen header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: COLORS.red,
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {formatScreenId(screenId)}
                </p>
                <span
                  style={{
                    fontSize: 13,
                    color: COLORS.textMuted,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  — {monologues.length} voice{monologues.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Monologue cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {monologues.map((m, i) => (
                  <MonologueCard key={m.persona_uuid || i} monologue={m} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function MonologueCard({
  monologue,
  index,
}: {
  monologue: DropOffMonologue;
  index: number;
}) {
  const emColor = emotionColor(monologue.emotional_state || "");

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.06 }}
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderLeft: `4px solid ${emColor}`,
        borderRadius: 16,
        padding: "28px 32px",
        position: "relative",
      }}
    >
      {/* Large decorative quote mark */}
      <span
        style={{
          position: "absolute",
          top: 16,
          right: 24,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.border,
          lineHeight: 1,
          fontFamily: "Georgia, serif",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </span>

      {/* The monologue — the hero element */}
      <p
        style={{
          fontSize: 17,
          fontStyle: "italic",
          color: COLORS.textPrimary,
          lineHeight: 1.75,
          fontFamily: "var(--font-inter), sans-serif",
          marginBottom: 20,
          paddingRight: 40,
        }}
      >
        &ldquo;{monologue.internal_monologue || monologue.reasoning}&rdquo;
      </p>

      {/* Persona attribution + scores */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 16,
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Left: persona info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {/* Avatar dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: emColor,
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {monologue.persona_label}
          </p>
          {monologue.behavioral_archetype &&
            monologue.behavioral_archetype !== "Unknown" && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  background: COLORS.bgElevated,
                  padding: "3px 8px",
                  borderRadius: 5,
                }}
              >
                {monologue.behavioral_archetype}
              </span>
            )}
          {monologue.emotional_state && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: emColor,
                background: `${emColor}12`,
                padding: "3px 8px",
                borderRadius: 5,
              }}
            >
              {monologue.emotional_state}
            </span>
          )}
        </div>

        {/* Right: scores */}
        {(monologue.trust_score != null ||
          monologue.clarity_score != null ||
          monologue.value_score != null) && (
          <div style={{ display: "flex", gap: 14 }}>
            {monologue.trust_score != null && (
              <MiniScore label="Trust" value={monologue.trust_score} />
            )}
            {monologue.clarity_score != null && (
              <MiniScore label="Clarity" value={monologue.clarity_score} />
            )}
            {monologue.value_score != null && (
              <MiniScore label="Value" value={monologue.value_score} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MiniScore({ label, value }: { label: string; value: number }) {
  const color =
    value >= 7 ? COLORS.green : value >= 4 ? COLORS.amber : COLORS.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.textMuted,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
        }}
      >
        {value}/10
      </p>
    </div>
  );
}
