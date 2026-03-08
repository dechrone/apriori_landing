"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, TrendingDown, AlertTriangle, Shield, Clock } from "lucide-react";
import type { PersonaAtScreen } from "./utils/parsePersonaData";
import type { FunnelScreen } from "./utils/parseFunnelData";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { PersonaBioCard } from "./PersonaBioCard";
import type { SimulationData } from "@/types/simulation";

interface Props {
  screen_id: string;
  screen: FunnelScreen;
  view_name: string;
  personas: PersonaAtScreen[];
  onClose: () => void;
  data: SimulationData;
}

/* ── Shared label style ── */
const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 8,
  fontFamily: "var(--font-plus-jakarta), sans-serif",
};

function formatTime(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}m ${s}s`;
  }
  return `${Math.round(seconds)}s`;
}

function trustColor(score: number) {
  if (score <= 3) return { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
  if (score <= 6) return { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" };
  return { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
}

export function PersonaThoughtsPanel({
  screen_id,
  screen,
  view_name,
  personas,
  onClose,
  data,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasPersonas = personas.length > 0;
  const hasMultiple = personas.length > 1;

  // Reset index if it goes out of bounds (screen switch)
  const safeIdx = activeIdx >= personas.length ? 0 : activeIdx;
  const persona = hasPersonas ? personas[safeIdx] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E2EA",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        maxHeight: "calc(100vh - 48px)",
        overflowY: "auto",
      }}
      className="dropoff-persona-panel"
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0D0D14",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              lineHeight: 1.3,
            }}
          >
            Screen Insights
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#9090A8",
              fontFamily: "var(--font-inter), sans-serif",
              marginTop: 2,
            }}
          >
            {view_name}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            border: "1px solid #E2E2EA",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <X size={14} color="#9090A8" />
        </button>
      </div>

      {/* ── Drop Summary Strip ── */}
      <div
        style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TrendingDown size={18} color="#DC2626" />
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#DC2626",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {screen.drop_offs} user{screen.drop_offs !== 1 ? "s" : ""} dropped off here
            {screen.is_biggest_drop && (
              <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700 }}>
                <AlertTriangle
                  size={11}
                  style={{ display: "inline", verticalAlign: "-1px", marginRight: 2 }}
                />
                BIGGEST DROP
              </span>
            )}
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#9B1C1C",
              fontFamily: "var(--font-inter), sans-serif",
              marginTop: 2,
            }}
          >
            {screen.drop_off_pct}% of total drop-offs occurred at this screen
          </p>
        </div>
      </div>

      {/* ══════ Persona Content ══════ */}
      {hasPersonas && persona && (
        <>
          {/* ── Persona Switcher ── */}
          <PersonaSwitcher
            personas={personas}
            activeIndex={safeIdx}
            onSelect={setActiveIdx}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={persona.persona_uuid}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── Bio Card ── */}
              <PersonaBioCard
                display_name={persona.display_name}
                short_label={persona.short_label}
                avatar_color={persona.avatar_color}
                occupation={persona.occupation}
                age={persona.age}
                district={persona.district}
                archetype={persona.behavioral_archetype}
              />

              {/* ── Trust Score + Time row ── */}
              {(persona.trust_score != null || persona.time_seconds != null) && (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20,
                    flexWrap: "wrap",
                  }}
                >
                  {persona.trust_score != null && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 20,
                        background: trustColor(persona.trust_score).bg,
                        border: `1px solid ${trustColor(persona.trust_score).border}`,
                      }}
                    >
                      <Shield size={13} color={trustColor(persona.trust_score).color} />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: trustColor(persona.trust_score).color,
                          fontFamily: "var(--font-inter), sans-serif",
                        }}
                      >
                        Trust: {persona.trust_score}/10
                      </span>
                    </div>
                  )}
                  {persona.time_seconds != null && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 20,
                        background: "#F3F4F6",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Clock size={13} color="#6B7280" />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#374151",
                          fontFamily: "var(--font-inter), sans-serif",
                        }}
                      >
                        {formatTime(persona.time_seconds)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ── GUT REACTION ── */}
              {persona.gut_reaction && (
                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      ...labelStyle,
                      color: "#EA580C",
                    }}
                  >
                    Gut Reaction
                  </p>
                  <div
                    style={{
                      background: "#FFF7ED",
                      borderLeft: "3px solid #EA580C",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <GutReactionText text={persona.gut_reaction} />
                  </div>
                </div>
              )}

              {/* ── WHAT THEY WERE THINKING ── */}
              {persona.internal_reasoning && (
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <p style={{ ...labelStyle, color: "#9090A8" }}>
                    What They Were Thinking
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#5A5A72",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {persona.internal_reasoning}
                  </p>
                </div>
              )}

              {/* ── EMOTIONAL STATE (chips) ── */}
              {persona.emotional_state_chips.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ ...labelStyle, color: "#9090A8" }}>Emotional State</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {persona.emotional_state_chips.map((chip, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          background: "#FEF2F2",
                          border: "1px solid #FECACA",
                          borderRadius: 20,
                          padding: "5px 12px",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#DC2626",
                          fontFamily: "var(--font-inter), sans-serif",
                          textTransform: "capitalize",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── FRICTION POINTS ── */}
              {persona.friction_points.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ ...labelStyle, color: "#9090A8" }}>Friction Points</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {persona.friction_points.map((fp, i) => (
                      <span
                        key={i}
                        style={{
                          background: "#F3F4F6",
                          border: "1px solid #E5E7EB",
                          borderRadius: 20,
                          padding: "6px 12px",
                          fontSize: 13,
                          color: "#374151",
                          fontFamily: "var(--font-inter), sans-serif",
                          lineHeight: 1.4,
                        }}
                      >
                        {fp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination ── */}
          {hasMultiple && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
                paddingTop: 16,
                borderTop: "1px solid #E2E2EA",
              }}
            >
              <button
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                disabled={safeIdx === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: safeIdx === 0 ? "#D0D0DC" : "#6366F1",
                  background: "none",
                  border: "none",
                  cursor: safeIdx === 0 ? "default" : "pointer",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                <ChevronLeft size={14} /> Previous
              </button>

              <span
                style={{
                  fontSize: 12,
                  color: "#9090A8",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {safeIdx + 1} of {personas.length}
              </span>

              <button
                onClick={() =>
                  setActiveIdx((prev) => Math.min(personas.length - 1, prev + 1))
                }
                disabled={safeIdx === personas.length - 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color:
                    safeIdx === personas.length - 1 ? "#D0D0DC" : "#6366F1",
                  background: "none",
                  border: "none",
                  cursor:
                    safeIdx === personas.length - 1 ? "default" : "pointer",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}

      {/* ══════ No Persona Data Fallback ══════ */}
      {!hasPersonas && (
        <div
          style={{
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 10,
            padding: "20px 16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#9090A8",
              fontFamily: "var(--font-inter), sans-serif",
              lineHeight: 1.6,
            }}
          >
            No individual persona data available for this screen.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#B0B0C0",
              fontFamily: "var(--font-inter), sans-serif",
              marginTop: 6,
            }}
          >
            Run a simulation with more personas to see their inner monologues here.
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ── GutReactionText: 4-line clamp with toggle ── */

function GutReactionText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 200;

  return (
    <>
      <p
        style={{
          fontSize: 15,
          fontWeight: 500,
          fontStyle: "italic",
          color: "#0D0D14",
          lineHeight: 1.6,
          fontFamily: "var(--font-inter), sans-serif",
          ...(isLong && !expanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }
            : {}),
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#6366F1",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginTop: 4,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
}
