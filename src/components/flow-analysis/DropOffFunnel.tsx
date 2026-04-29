"use client";

import { useState } from "react";
import type { FlowAnalysisData, FlowPersona, JourneyStep } from "@/types/flow-analysis";
import { ArrowDown, Users, AlertTriangle, X, MessageSquareQuote, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)";
const CARD_SHADOW_HOVER = "0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.1)";
const ACCENT = "#E8583A";

const PERSONA_COLORS: Record<string, string> = {};
const COLOR_PALETTE = ["#3B5BDB", "#7950F2", "#0CA678", "#E67700", "#D6336C", "#1098AD", "#5C940D", "#E8590C"];
let colorIdx = 0;
function getPersonaColor(name: string) {
  if (!PERSONA_COLORS[name]) {
    PERSONA_COLORS[name] = COLOR_PALETTE[colorIdx % COLOR_PALETTE.length];
    colorIdx++;
  }
  return PERSONA_COLORS[name];
}

function getScreenLabel(screens: FlowAnalysisData["screens"], screenId: string) {
  return screens.find((s) => s.id === screenId)?.label ?? screenId;
}

export function DropOffFunnel({ data }: { data: FlowAnalysisData }) {
  const { meta, funnel, screens, dropReasons, dropPersonas, personas: allPersonas } = data;
  const total = meta.totalPersonas;
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [activePersonaIdx, setActivePersonaIdx] = useState(0);
  /* Track whether the panel is visible (including during exit animation) */
  const [panelVisible, setPanelVisible] = useState(false);

  // Find biggest drop screen
  let biggestDropScreen = "";
  let biggestDropCount = 0;
  for (const entry of funnel) {
    if (entry.dropped > biggestDropCount) {
      biggestDropCount = entry.dropped;
      biggestDropScreen = entry.screen;
    }
  }

  /** Get dropped persona journey details for a screen */
  function getDroppedPersonaInsights(screenId: string) {
    const droppedNames = dropPersonas?.[screenId] ?? [];
    const insights: { persona: FlowPersona; step: JourneyStep }[] = [];
    for (const name of droppedNames) {
      const persona = allPersonas.find(
        (p) => p.name === name || p.name.startsWith(name.split(" ")[0])
      );
      if (persona) {
        const step = persona.journey.find((j) => j.screen === screenId);
        if (step) insights.push({ persona, step });
      }
    }
    return insights;
  }

  const selectedInsights = selectedScreen ? getDroppedPersonaInsights(selectedScreen) : [];
  const selectedLabel = selectedScreen ? getScreenLabel(screens, selectedScreen) : "";

  function handleCardClick(screenId: string, hasDrop: boolean) {
    if (!hasDrop) return;
    setSelectedScreen((prev) => {
      if (prev === screenId) {
        // Closing — selectedScreen goes null, but panelVisible stays true
        // until AnimatePresence onExitComplete fires
        return null;
      }
      setActivePersonaIdx(0);
      setPanelVisible(true);
      return screenId;
    });
  }

  function handleClosePanel() {
    setSelectedScreen(null);
    // panelVisible stays true — funnel stays at 50% during exit animation
  }

  /* Whether the funnel should be in "split" mode (left-aligned, 50% width) */
  const isSplit = panelVisible;

  return (
    <section>
      {/* Section heading */}
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#1A1A1A",
          letterSpacing: "-0.01em",
          marginBottom: 24,
        }}
      >
        Drop-Off Funnel
      </h2>
      {/* Hint text */}
      <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20, marginTop: -16 }}>
        Click on any drop-off step to see what personas were thinking
      </p>

      {/* Two-panel layout */}
      <div className="flex gap-8 items-start">
        {/* ── Left: Funnel ── */}
        <div
          className="flex flex-col items-center"
          style={{
            width: isSplit ? "50%" : "100%",
            maxWidth: isSplit ? 520 : 640,
            marginLeft: isSplit ? 0 : "auto",
            marginRight: isSplit ? 0 : "auto",
            flexShrink: 0,
            transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1), margin 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {funnel.map((entry, i) => {
            const dropped = entry.dropped;
            const usersOut = entry.entered - dropped;
            const remainPct = total > 0 ? Math.round((usersOut / total) * 100) : 0;
            const fillPct = total > 0 ? (usersOut / total) * 100 : 0;
            const label = getScreenLabel(screens, entry.screen);
            const dropReason = dropReasons?.[entry.screen] ?? null;
            const personas = dropPersonas?.[entry.screen] ?? [];
            const hasDrop = dropped > 0;
            const isBiggestDrop = entry.screen === biggestDropScreen;
            const isLast = i === funnel.length - 1;
            const screenNum = parseInt(entry.screen.replace("S", ""), 10);
            const isSelected = selectedScreen === entry.screen;

            // Step badge colors
            const badgeBg = hasDrop ? "#FEF2F2" : "#DCFCE7";
            const badgeColor = hasDrop ? "#DC2626" : "#16A34A";

            // Card border
            const cardBorder = isSelected
              ? `2px solid ${ACCENT}`
              : isBiggestDrop
                ? `1.5px solid ${ACCENT}`
                : hasDrop
                  ? "1.5px solid #FECACA"
                  : "1.5px solid #E5E7EB";

            return (
              <div key={entry.screen} className="flex flex-col items-center w-full">
                {/* ── Step Card ── */}
                <motion.div
                  className="rounded-2xl w-full overflow-hidden"
                  style={{
                    backgroundColor: isSelected ? "#FFFBFA" : "#FFFFFF",
                    boxShadow: isSelected ? CARD_SHADOW_HOVER : CARD_SHADOW,
                    border: cardBorder,
                    cursor: hasDrop ? "pointer" : "default",
                  }}
                  whileHover={hasDrop ? {
                    y: -4,
                    scale: 1.02,
                    boxShadow: CARD_SHADOW_HOVER,
                  } : undefined}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => handleCardClick(entry.screen, hasDrop)}
                >
                  {/* Fill area — card background that shrinks with drop-offs */}
                  <div
                    className="relative"
                    style={{ padding: "22px 24px" }}
                  >
                    {/* Background fill layer */}
                    <div
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        width: `${fillPct}%`,
                        backgroundColor: isBiggestDrop
                          ? "rgba(232, 88, 58, 0.08)"
                          : "#E8F0FE",
                      }}
                    />

                    {/* Content on top of fill */}
                    <div className="relative flex items-center justify-between">
                      {/* Left: step badge + label */}
                      <div className="flex items-center gap-3">
                        <span
                          className="flex items-center justify-center rounded-full shrink-0"
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {screenNum}
                        </span>
                        <div>
                          <p style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>
                            {label}
                          </p>
                          <p style={{ fontSize: 12, fontWeight: 500, color: "#9CA3AF", marginTop: 2 }}>
                            STEP {screenNum}
                          </p>
                        </div>
                      </div>

                      {/* Right: user count + remaining badge */}
                      <div className="flex flex-col items-end gap-1.5">
                        <p className="tabular-nums" style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>
                          {usersOut}
                          <span style={{ fontSize: 14, fontWeight: 500, color: "#9CA3AF", marginLeft: 4 }}>Users</span>
                        </p>
                        <span
                          className="inline-flex items-center gap-1 rounded-full"
                          style={{
                            padding: "3px 10px",
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: remainPct === 100 ? "#F0FDF4" : isBiggestDrop ? "#FEF2F2" : "#F9FAFB",
                            color: remainPct === 100 ? "#16A34A" : isBiggestDrop ? ACCENT : "#1F2937",
                            border: `1px solid ${remainPct === 100 ? "#BBF7D0" : isBiggestDrop ? "#FECACA" : "#E5E7EB"}`,
                          }}
                        >
                          <Users size={12} />
                          {remainPct}% Remaining
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Drop-off reason — separate section below the fill */}
                  {hasDrop && (
                    <div
                      className="flex items-start justify-between gap-4"
                      style={{
                        padding: "14px 24px 16px",
                        borderTop: "1px solid #E5E7EB",
                        backgroundColor: isSelected ? "#FFFBFA" : "#FFFFFF",
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Drop count badge */}
                        <span
                          className="inline-flex items-center gap-1 shrink-0 rounded-full"
                          style={{
                            padding: "4px 10px",
                            fontSize: 13,
                            fontWeight: 700,
                            backgroundColor: isBiggestDrop ? "#FEE2E2" : "#FEF2F2",
                            color: isBiggestDrop ? "#DC2626" : ACCENT,
                          }}
                        >
                          <ArrowDown size={12} />
                          {dropped}
                        </span>
                        <div>
                          <p
                            className="uppercase"
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: isBiggestDrop ? "#DC2626" : ACCENT,
                              letterSpacing: "0.04em",
                              lineHeight: 1.3,
                            }}
                          >
                            {isBiggestDrop ? (
                              <span className="inline-flex items-center gap-1">
                                <AlertTriangle size={11} />
                                BIGGEST DROP
                              </span>
                            ) : (
                              "DROP-OFF REASON"
                            )}
                          </p>
                          <p style={{ fontSize: 13, fontWeight: 400, color: "#4B5563", marginTop: 2, lineHeight: 1.4 }}>
                            {dropReason}
                          </p>
                        </div>
                      </div>

                      {/* Persona avatars */}
                      {personas.length > 0 && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.05em" }}>
                            PERSONAS:
                          </span>
                          {personas.map((p) => {
                            const initial = (p.split(" ")[0]?.[0] ?? "?").toUpperCase();
                            const bgColor = getPersonaColor(p);
                            return (
                              <span
                                key={p}
                                className="flex items-center justify-center rounded-full shrink-0"
                                title={p}
                                style={{
                                  width: 26,
                                  height: 26,
                                  backgroundColor: bgColor,
                                  color: "#FFFFFF",
                                  fontSize: 11,
                                  fontWeight: 700,
                                }}
                              >
                                {initial}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>

                {/* ── Connector line between cards ── */}
                {!isLast && (
                  <div className="flex flex-col items-center" style={{ height: 40 }}>
                    <div
                      style={{
                        width: 2,
                        height: "100%",
                        backgroundColor: "#D1D5DB",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Right: Persona Insights Panel ── */}
        <AnimatePresence onExitComplete={() => setPanelVisible(false)}>
          {selectedScreen && (
            <motion.div
              key="insights-panel"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="sticky top-8"
              style={{ width: "50%", minWidth: 0 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: CARD_SHADOW,
                  border: "1.5px solid #E5E7EB",
                  minHeight: 300,
                }}
              >
                {/* Panel header */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: "18px 24px",
                    borderBottom: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAF9",
                  }}
                >
                  <div>
                    <p
                      className="uppercase"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#9CA3AF",
                        letterSpacing: "0.08em",
                        marginBottom: 2,
                      }}
                    >
                      Persona Thoughts
                    </p>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A" }}>
                      {selectedLabel}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleClosePanel}
                    className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-200"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Persona switcher tabs (when multiple personas) */}
                {selectedInsights.length > 1 && (
                  <div
                    className="flex items-center gap-2"
                    style={{
                      padding: "14px 24px",
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#FAFAF9",
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.04em", marginRight: 4 }}>
                      SWITCH PERSONA:
                    </span>
                    {selectedInsights.map(({ persona }, idx) => {
                      const isActive = activePersonaIdx === idx;
                      const bgColor = getPersonaColor(persona.name);
                      return (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => setActivePersonaIdx(idx)}
                          className="flex items-center gap-2 rounded-full transition-all"
                          style={{
                            padding: "5px 14px 5px 5px",
                            backgroundColor: isActive ? `${bgColor}12` : "#F3F4F6",
                            border: isActive ? `1.5px solid ${bgColor}` : "1.5px solid transparent",
                            cursor: "pointer",
                            transform: isActive ? "scale(1.02)" : "scale(1)",
                          }}
                        >
                          <span
                            className="flex items-center justify-center rounded-full shrink-0"
                            style={{
                              width: 26,
                              height: 26,
                              backgroundColor: bgColor,
                              color: "#FFFFFF",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {persona.name[0]?.toUpperCase()}
                          </span>
                          <span style={{
                            fontSize: 12,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#1A1A1A" : "#6B7280",
                          }}>
                            {persona.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Active persona detail */}
                <div style={{ padding: "20px 24px 28px" }}>
                  {selectedInsights.length === 0 && (
                    <p style={{ fontSize: 14, color: "#9CA3AF", padding: "24px 0", textAlign: "center" }}>
                      No detailed persona data available for this screen.
                    </p>
                  )}
                  <AnimatePresence mode="wait">
                  {selectedInsights.length > 0 && (() => {
                    const { persona, step } = selectedInsights[activePersonaIdx] ?? selectedInsights[0];
                    const personaColor = getPersonaColor(persona.name);
                    return (
                      <motion.div
                        key={persona.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {/* Persona identity bar */}
                        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
                          <span
                            className="flex items-center justify-center rounded-full shrink-0"
                            style={{
                              width: 40,
                              height: 40,
                              backgroundColor: personaColor,
                              color: "#FFFFFF",
                              fontSize: 15,
                              fontWeight: 700,
                            }}
                          >
                            {persona.name[0]?.toUpperCase()}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>
                              {persona.name}
                            </p>
                            <p style={{ fontSize: 13, color: "#9CA3AF" }}>
                              {persona.role} · {persona.city}
                            </p>
                          </div>
                        </div>

                        {/* Content sections */}
                        <div className="flex flex-col gap-5">
                          {/* Gut Reaction */}
                          <div
                            className="rounded-xl"
                            style={{
                              padding: "16px 20px",
                              backgroundColor: "#FFFBFA",
                              border: `1px solid ${ACCENT}20`,
                            }}
                          >
                            <div className="flex items-center gap-1.5" style={{ marginBottom: 8 }}>
                              <MessageSquareQuote size={13} style={{ color: ACCENT }} />
                              <p
                                className="uppercase"
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: ACCENT,
                                  letterSpacing: "0.08em",
                                }}
                              >
                                Gut Reaction
                              </p>
                            </div>
                            <p
                              style={{
                                fontSize: 15,
                                fontWeight: 500,
                                color: "#1A1A1A",
                                lineHeight: 1.6,
                                fontStyle: "italic",
                              }}
                            >
                              &ldquo;{step.gutReaction}&rdquo;
                            </p>
                          </div>

                          {/* Reasoning */}
                          <div>
                            <p
                              className="uppercase"
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#9CA3AF",
                                letterSpacing: "0.08em",
                                marginBottom: 6,
                              }}
                            >
                              Internal Reasoning
                            </p>
                            <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>
                              {step.reasoning}
                            </p>
                          </div>

                          {/* Drop Reason */}
                          {step.dropReason && (
                            <div
                              className="rounded-xl"
                              style={{
                                padding: "14px 18px",
                                backgroundColor: "#FEF2F2",
                                border: "1px solid #FECACA",
                              }}
                            >
                              <div className="flex items-center gap-1.5" style={{ marginBottom: 6 }}>
                                <AlertCircle size={13} style={{ color: "#DC2626" }} />
                                <p
                                  className="uppercase"
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#DC2626",
                                    letterSpacing: "0.08em",
                                  }}
                                >
                                  Why They Left
                                </p>
                              </div>
                              <p style={{ fontSize: 14, color: "#991B1B", lineHeight: 1.55 }}>
                                {step.dropReason}
                              </p>
                            </div>
                          )}

                          {/* Friction Points */}
                          {step.frictionPoints.length > 0 && (
                            <div>
                              <p
                                className="uppercase"
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: "#9CA3AF",
                                  letterSpacing: "0.08em",
                                  marginBottom: 8,
                                }}
                              >
                                Friction Points
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {step.frictionPoints.map((fp, fpIdx) => (
                                  <span
                                    key={fpIdx}
                                    className="inline-flex items-center rounded-full"
                                    style={{
                                      padding: "4px 12px",
                                      fontSize: 12,
                                      fontWeight: 600,
                                      backgroundColor: "#F3F4F6",
                                      color: "#4B5563",
                                      border: "1px solid #E5E7EB",
                                    }}
                                  >
                                    {fp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* What was missing */}
                          {step.missing && (
                            <div>
                              <p
                                className="uppercase"
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: "#9CA3AF",
                                  letterSpacing: "0.08em",
                                  marginBottom: 6,
                                }}
                              >
                                What They Needed
                              </p>
                              <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.55 }}>
                                {step.missing}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Persona navigation footer (when multiple) */}
                        {selectedInsights.length > 1 && (
                          <div
                            className="flex items-center justify-between"
                            style={{
                              marginTop: 24,
                              paddingTop: 16,
                              borderTop: "1px solid #E5E7EB",
                            }}
                          >
                            <button
                              type="button"
                              disabled={activePersonaIdx === 0}
                              onClick={() => setActivePersonaIdx((p) => p - 1)}
                              className="inline-flex items-center gap-1.5 rounded-lg transition-colors"
                              style={{
                                padding: "7px 14px",
                                fontSize: 13,
                                fontWeight: 600,
                                backgroundColor: activePersonaIdx === 0 ? "#F9FAFB" : "#F3F4F6",
                                color: activePersonaIdx === 0 ? "#D1D5DB" : "#374151",
                                border: "1px solid #E5E7EB",
                                cursor: activePersonaIdx === 0 ? "not-allowed" : "pointer",
                              }}
                            >
                              ← Previous
                            </button>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF" }}>
                              {activePersonaIdx + 1} of {selectedInsights.length}
                            </span>
                            <button
                              type="button"
                              disabled={activePersonaIdx === selectedInsights.length - 1}
                              onClick={() => setActivePersonaIdx((p) => p + 1)}
                              className="inline-flex items-center gap-1.5 rounded-lg transition-colors"
                              style={{
                                padding: "7px 14px",
                                fontSize: 13,
                                fontWeight: 600,
                                backgroundColor: activePersonaIdx === selectedInsights.length - 1 ? "#F9FAFB" : "#F3F4F6",
                                color: activePersonaIdx === selectedInsights.length - 1 ? "#D1D5DB" : "#374151",
                                border: "1px solid #E5E7EB",
                                cursor: activePersonaIdx === selectedInsights.length - 1 ? "not-allowed" : "pointer",
                              }}
                            >
                              Next →
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })()}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
