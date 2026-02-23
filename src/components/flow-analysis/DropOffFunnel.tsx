"use client";

import type { FlowAnalysisData } from "@/types/flow-analysis";
import { ArrowDown, Users, AlertTriangle } from "lucide-react";

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)";
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
  const { meta, funnel, screens, dropReasons, dropPersonas } = data;
  const total = meta.totalPersonas;

  // Find biggest drop screen
  let biggestDropScreen = "";
  let biggestDropCount = 0;
  for (const entry of funnel) {
    if (entry.dropped > biggestDropCount) {
      biggestDropCount = entry.dropped;
      biggestDropScreen = entry.screen;
    }
  }

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

      {/* Vertical card-based funnel */}
      <div className="flex flex-col items-center">
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

          // Step badge colors
          const badgeBg = hasDrop ? "#FEF2F2" : "#DCFCE7";
          const badgeColor = hasDrop ? "#DC2626" : "#16A34A";

          // Card border
          const cardBorder = isBiggestDrop
            ? `1.5px solid ${ACCENT}`
            : hasDrop
              ? "1.5px solid #FECACA"
              : "1.5px solid #E5E7EB";

          return (
            <div key={entry.screen} className="flex flex-col items-center w-full" style={{ maxWidth: 640 }}>
              {/* ── Step Card ── */}
              <div
                className="rounded-2xl w-full overflow-hidden"
                style={{
                  backgroundColor: "#FFFFFF",
                  boxShadow: CARD_SHADOW,
                  border: cardBorder,
                }}
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
                          backgroundColor: remainPct === 100 ? "#F0FDF4" : isBiggestDrop ? "#FEF2F2" : "#EFF6FF",
                          color: remainPct === 100 ? "#16A34A" : isBiggestDrop ? ACCENT : "#2563EB",
                          border: `1px solid ${remainPct === 100 ? "#BBF7D0" : isBiggestDrop ? "#FECACA" : "#BFDBFE"}`,
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
                      backgroundColor: "#FFFFFF",
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
              </div>

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
    </section>
  );
}
