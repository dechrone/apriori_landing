"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SimulationData, PersonaDetail } from "@/types/simulation";
import { parseFunnelData } from "./utils/parseFunnelData";
import { parsePersonasAtScreen } from "./utils/parsePersonaData";
import { FunnelScreenCard } from "./FunnelScreenCard";
import { PersonaThoughtsPanel } from "./PersonaThoughtsPanel";

export interface DropOffFunnelProps {
  data: SimulationData;
}

export function DropOffFunnel({ data }: DropOffFunnelProps) {
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null);

  // Parse funnel data (memoized)
  const screens = useMemo(() => parseFunnelData(data), [data]);

  // Parse personas for selected screen
  const personasAtScreen = useMemo(() => {
    if (!selectedScreenId) return [];
    return parsePersonasAtScreen(data, selectedScreenId);
  }, [data, selectedScreenId]);

  const selectedScreen = screens.find((s) => s.screen_id === selectedScreenId);
  const totalPersonas = data.summary?.total_personas ?? 0;
  const personaDetails: PersonaDetail[] = (data.persona_details ?? []) as PersonaDetail[];

  // Panel opens only for screens that have drop-offs
  const isPanelOpen = !!selectedScreenId && !!selectedScreen?.has_drop_offs;

  function handleScreenClick(screenId: string) {
    if (selectedScreenId === screenId) {
      setSelectedScreenId(null);
    } else {
      setSelectedScreenId(screenId);
    }
  }

  function handleClosePanel() {
    setSelectedScreenId(null);
  }

  if (!screens.length) return null;

  // Total screens count for subtitle
  const totalScreens = screens.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* Section Header */}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#1A1A1A",
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          marginBottom: 8,
        }}
      >
        Drop-Off Funnel
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#9090A8",
          fontFamily: "var(--font-inter), sans-serif",
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        {totalPersonas} personas entered · {totalScreens} screen{totalScreens !== 1 ? "s" : ""} ·{" "}
        Click a screen with drop-offs to explore persona insights
      </p>

      {/* Two-panel layout */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          justifyContent: isPanelOpen ? "flex-start" : "center",
          transition: "justify-content 0.3s ease",
        }}
        className="dropoff-funnel-layout"
      >
        {/* ═══ LEFT PANEL — Funnel ═══ */}
        <div
          style={{
            width: isPanelOpen ? 460 : "100%",
            maxWidth: 520,
            flexShrink: 0,
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            margin: isPanelOpen ? 0 : "0 auto",
          }}
          className="dropoff-funnel-left"
        >
          {/* Entry indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#16A34A",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {totalPersonas} Personas Enter Flow
            </div>
          </div>

          {/* Connector line → first card */}
          <div
            style={{
              width: 2,
              height: 24,
              background: "#E2E2EA",
              margin: "0 auto",
            }}
          />

          {screens.map((screen, i) => (
            <React.Fragment key={screen.screen_id}>
              <FunnelScreenCard
                screen={screen}
                isSelected={selectedScreenId === screen.screen_id}
                onClick={handleScreenClick}
                totalPersonas={totalPersonas}
                personaDetails={personaDetails}
              />

              {/* Connector line between cards */}
              {i < screens.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 40,
                    background: "#E2E2EA",
                    margin: "0 auto",
                  }}
                />
              )}
            </React.Fragment>
          ))}

          {/* Exit indicator */}
          <div
            style={{
              width: 2,
              height: 24,
              background: "#E2E2EA",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {(() => {
              const lastScreen = screens[screens.length - 1];
              const finalRemaining = lastScreen
                ? lastScreen.remaining_count - lastScreen.drop_offs
                : 0;
              const finalPct =
                totalPersonas > 0
                  ? Math.round((finalRemaining / totalPersonas) * 100)
                  : 0;
              const chipColor =
                finalPct >= 70
                  ? { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" }
                  : finalPct >= 40
                  ? { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" }
                  : { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };

              return (
                <div
                  style={{
                    background: chipColor.bg,
                    border: `1px solid ${chipColor.border}`,
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: chipColor.color,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {finalRemaining} Completed ({finalPct}%)
                </div>
              );
            })()}
          </div>
        </div>

        {/* ═══ RIGHT PANEL — Persona Thoughts ═══ */}
        <AnimatePresence>
          {isPanelOpen && selectedScreen && (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                position: "sticky",
                top: 24,
              }}
              className="dropoff-funnel-right"
            >
              <PersonaThoughtsPanel
                key={selectedScreenId}
                screen_id={selectedScreenId!}
                screen={selectedScreen}
                view_name={selectedScreen.view_name}
                personas={personasAtScreen}
                onClose={handleClosePanel}
                data={data}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile overlay for panel ── */}
      <AnimatePresence>
        {isPanelOpen && selectedScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dropoff-funnel-mobile-overlay"
            style={{
              display: "none", /* shown via media query */
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.4)",
            }}
            onClick={handleClosePanel}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#FFFFFF",
                borderRadius: "16px 16px 0 0",
                padding: 20,
              }}
            >
              <PersonaThoughtsPanel
                key={`mobile-${selectedScreenId}`}
                screen_id={selectedScreenId!}
                screen={selectedScreen}
                view_name={selectedScreen.view_name}
                personas={personasAtScreen}
                onClose={handleClosePanel}
                data={data}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 900px) {
          .dropoff-funnel-layout {
            flex-direction: column !important;
            justify-content: flex-start !important;
          }
          .dropoff-funnel-left {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
          }
          .dropoff-funnel-right {
            display: none !important;
          }
          .dropoff-funnel-mobile-overlay {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .dropoff-funnel-mobile-overlay {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default DropOffFunnel;
