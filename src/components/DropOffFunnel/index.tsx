"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { SimulationData, PersonaDetail } from "@/types/simulation";
import { parseFunnelData } from "./utils/parseFunnelData";
import { parsePersonasAtScreen } from "./utils/parsePersonaData";
import { PersonaThoughtsPanel } from "./PersonaThoughtsPanel";

export interface DropOffFunnelProps {
  data: SimulationData;
}

/* ── Screen image map ── */
const SCREEN_IMAGE_MAP: Record<string, string> = {
  mobile_number: "/superastro-screens/Screen 1.png",
  otp_verify: "/superastro-screens/Screen 2.png",
  name_input: "/superastro-screens/Screen 3.png",
  gender_select: "/superastro-screens/Screen 4.png",
  marital_status: "/superastro-screens/Screen 5.png",
  dob_picker: "/superastro-screens/Screen 6.png",
  time_of_birth: "/superastro-screens/Screen 7.png",
  place_of_birth: "/superastro-screens/Screen 8.png",
  journey_purpose: "/superastro-screens/Screen 9.png",
  ai_chat: "/superastro-screens/Screen 10.png",
};

function dropBadgeStyle(screen: { is_biggest_drop: boolean; has_drop_offs: boolean }) {
  if (screen.is_biggest_drop) return { bg: "#FEE2E2", color: "#DC2626", border: "#FCA5A5" };
  if (screen.has_drop_offs) return { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" };
  return { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
}

function remainingColor(pct: number) {
  if (pct >= 70) return "#16A34A";
  if (pct >= 40) return "#EA580C";
  return "#DC2626";
}

export function DropOffFunnel({ data }: DropOffFunnelProps) {
  const screens = useMemo(() => parseFunnelData(data), [data]);
  const totalPersonas = data.summary?.total_personas ?? 0;

  // Default to first screen with drop-offs
  const firstDropScreen = screens.find((s) => s.has_drop_offs);
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(firstDropScreen?.screen_id ?? screens[0]?.screen_id ?? null);

  const activeScreenId = selectedScreenId;
  const activeScreen = screens.find((s) => s.screen_id === activeScreenId);

  const activePersonas = useMemo(() => {
    if (!activeScreenId) return [];
    return parsePersonasAtScreen(data, activeScreenId);
  }, [data, activeScreenId]);

  if (!screens.length) return null;

  const totalScreens = screens.length;
  const lastScreen = screens[screens.length - 1];
  const finalRemaining = lastScreen ? lastScreen.remaining_count - lastScreen.drop_offs : 0;
  const finalPct = totalPersonas > 0 ? Math.round((finalRemaining / totalPersonas) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1A1A", fontFamily: "var(--font-plus-jakarta), sans-serif", marginBottom: 8 }}>
        Drop-Off Funnel
      </h2>
      <p style={{ fontSize: 14, color: "#9090A8", fontFamily: "var(--font-inter), sans-serif", marginBottom: 24, lineHeight: 1.5 }}>
        {totalPersonas} personas entered &middot; {totalScreens} screens &middot; Click a screen to explore persona insights
      </p>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }} className="dropoff-3col">
        {/* ── LEFT: Compact Funnel ── */}
        <div style={{ width: 240, flexShrink: 0, position: "sticky", top: 120 }} className="dropoff-funnel-col">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 16, padding: "3px 12px", fontSize: 11, fontWeight: 600, color: "#16A34A" }}>
              {totalPersonas} Enter
            </div>
          </div>

          {screens.map((screen) => {
            const isActive = screen.screen_id === activeScreenId;
            const badge = dropBadgeStyle(screen);
            const remaining = screen.remaining_count - screen.drop_offs;
            const remainingPct = totalPersonas > 0 ? Math.round((remaining / totalPersonas) * 100) : 0;
            return (
              <React.Fragment key={screen.screen_id}>
                <div style={{ width: 1.5, height: 8, background: "#E2E2EA", margin: "0 auto" }} />
                <div
                  onClick={() => setSelectedScreenId(screen.screen_id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "7px 10px", borderRadius: 10, cursor: "pointer",
                    background: isActive ? "#F5F3FF" : "transparent",
                    border: isActive ? "1.5px solid #8B5CF6" : "1.5px solid transparent",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "#FAFAFA"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, flexShrink: 0,
                    background: isActive ? "#8B5CF6" : screen.has_drop_offs ? badge.bg : "#F3F4F6",
                    color: isActive ? "#FFF" : screen.has_drop_offs ? badge.color : "#6B7280",
                    border: "1px solid " + (isActive ? "#8B5CF6" : screen.has_drop_offs ? badge.border : "#E5E7EB"),
                  }}>
                    {screen.step_number}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: isActive ? 600 : 500, color: isActive ? "#1A1A1A" : "#374151", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {screen.view_name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 1 }}>
                      {screen.has_drop_offs && (
                        <span style={{ fontSize: 10, fontWeight: 600, color: badge.color }}>↓ {screen.drop_offs}</span>
                      )}
                      <span style={{ fontSize: 10, color: remainingColor(remainingPct), fontWeight: 500 }}>{remainingPct}%</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          <div style={{ width: 1.5, height: 8, background: "#E2E2EA", margin: "0 auto" }} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: finalPct >= 60 ? "#F0FDF4" : "#FEF2F2",
              border: "1px solid " + (finalPct >= 60 ? "#BBF7D0" : "#FECACA"),
              borderRadius: 16, padding: "3px 12px", fontSize: 11, fontWeight: 600,
              color: finalPct >= 60 ? "#16A34A" : "#DC2626",
            }}>
              {finalRemaining} Complete ({finalPct}%)
            </div>
          </div>
        </div>

        {/* ── MIDDLE: Persona Monologues ── */}
        <div style={{ flex: 1, minWidth: 0 }} className="dropoff-personas-col">
          {activeScreen && activeScreenId ? (
            <PersonaThoughtsPanel
              key={activeScreenId}
              screen_id={activeScreenId}
              screen={activeScreen}
              view_name={activeScreen.view_name}
              personas={activePersonas}
              onClose={() => {}}
              data={data}
              hideClose
            />
          ) : (
            <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 40, textAlign: "center", border: "1px dashed #D1D5DB" }}>
              <p style={{ fontSize: 14, color: "#9CA3AF" }}>Select a screen from the funnel to see persona insights</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Screen Screenshot ── */}
        <div style={{ width: 280, flexShrink: 0, position: "sticky", top: 120 }} className="dropoff-screen-col">
          {activeScreenId && SCREEN_IMAGE_MAP[activeScreenId] ? (
            <div style={{ background: "#FFF", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>Screen {activeScreen?.step_number}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>{activeScreen?.view_name}</span>
              </div>
              <div style={{ padding: 10 }}>
                <img
                  src={SCREEN_IMAGE_MAP[activeScreenId]}
                  alt={activeScreen?.view_name + " screen"}
                  style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }}
                />
              </div>
            </div>
          ) : (
            <div style={{ background: "#F9FAFB", borderRadius: 16, padding: 40, textAlign: "center", border: "1px dashed #D1D5DB" }}>
              <p style={{ fontSize: 13, color: "#9CA3AF" }}>Select a screen to preview</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .dropoff-screen-col { display: none !important; }
        }
        @media (max-width: 800px) {
          .dropoff-3col { flex-direction: column !important; }
          .dropoff-funnel-col { width: 100% !important; position: relative !important; top: 0 !important; }
          .dropoff-personas-col { width: 100% !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default DropOffFunnel;
