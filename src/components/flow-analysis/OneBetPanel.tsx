"use client";

import type { OneBet } from "@/types/flow-analysis";
import type { FlowPersona } from "@/types/flow-analysis";
import {
  TrendingUp,
  Shield,
  Flag,
  BookOpen,
  Users,
  CheckCircle2,
} from "lucide-react";

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)";
const ACCENT = "#E8583A";

const PERSONA_COLORS = ["#3B5BDB", "#7950F2", "#0CA678", "#E67700", "#D6336C", "#1098AD"];

const CHANGE_ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  flag: Flag,
  "book-open": BookOpen,
};

const ICON_BG: Record<string, string> = {
  shield: "#EFF6FF",
  flag: "#FEF2F2",
  "book-open": "#F5F3FF",
};
const ICON_COLOR: Record<string, string> = {
  shield: "#2563EB",
  flag: "#E8583A",
  "book-open": "#7C3AED",
};

function parseProjectedRange(projected: string): { low: number; high: number; mid: number } {
  const match = projected.match(/(\d+)[–\-](\d+)/);
  if (match) {
    const low = parseInt(match[1], 10);
    const high = parseInt(match[2], 10);
    return { low, high, mid: Math.round((low + high) / 2) };
  }
  const single = projected.match(/(\d+)/);
  const v = single ? parseInt(single[1], 10) : 65;
  return { low: v, high: v, mid: v };
}

/** Extract key noun phrases from the title for highlighting */
function splitHeadline(title: string): { before: string; highlighted: string } {
  // Try to split on common patterns like "+" or "on Screen"
  const onIdx = title.toLowerCase().indexOf(" on screen");
  const plusIdx = title.indexOf("+");

  if (onIdx !== -1) {
    // Everything before "on Screen..." becomes the highlight part
    const mainPart = title.slice(0, onIdx);
    // Extract noun phrases separated by "+"
    return { before: "", highlighted: mainPart.replace(/^show\s+/i, "").trim() };
  }

  if (plusIdx !== -1) {
    return { before: "", highlighted: title.replace(/^show\s+/i, "").trim() };
  }

  return { before: "", highlighted: title };
}

interface OneBetPanelProps {
  oneBet: OneBet;
  personas?: FlowPersona[];
}

export function OneBetPanel({ oneBet, personas }: OneBetPanelProps) {
  const current = oneBet.currentCompletion ?? 40;
  const projected = parseProjectedRange(oneBet.projectedCompletion);
  const liftPct = projected.mid - current;

  // Build persona role lookup from FlowPersona data if available
  const personaRoleLookup: Record<string, string> = {};
  if (personas) {
    for (const p of personas) {
      const shortName = p.name.split(" ")[0] + " " + (p.name.split(" ")[1]?.[0] ?? "") + ".";
      personaRoleLookup[shortName] = `${p.role} · ${p.lamfExp}`;
      personaRoleLookup[p.name] = `${p.role} · ${p.lamfExp}`;
    }
  }
  if (oneBet.personaDetails) {
    for (const pd of oneBet.personaDetails) {
      if (pd.role) personaRoleLookup[pd.name] = pd.role;
    }
  }

  // Parse headline
  const headline = splitHeadline(oneBet.title);
  // Split highlighted part on " + " to get individual phrases
  const highlightPhrases = headline.highlighted
    .split(/\s*\+\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section style={{ marginTop: 16 }}>
      {/* ── Big headline outside the card ── */}
      <h2
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: "#1A1A1A",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          marginBottom: 32,
        }}
      >
        {highlightPhrases.length > 1 ? (
          <>
            {highlightPhrases.slice(0, -1).join(", ")}{" "}
            <span style={{ color: ACCENT }}>&amp;</span>{" "}
            {highlightPhrases[highlightPhrases.length - 1]}
          </>
        ) : (
          headline.highlighted
        )}
      </h2>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
        {/* LEFT COLUMN — Main insight card (3/5) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Main Card */}
          <div
            className="rounded-2xl w-full"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: CARD_SHADOW,
              border: "1px solid #E5E7EB",
              padding: "28px 32px",
            }}
          >
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 14px",
                }}
              >
                High Impact
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full"
                style={{
                  backgroundColor: "#F3F4F6",
                  color: "#374151",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "5px 14px",
                }}
              >
                {oneBet.effort} Effort
              </span>
            </div>

            {/* Rationale heading + trend icon */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1A1A1A",
                  lineHeight: 1.3,
                }}
              >
                Why this is the highest leverage fix
              </h3>
              <TrendingUp
                size={36}
                style={{ color: "#D1D5DB", flexShrink: 0 }}
              />
            </div>

            {/* Rationale text */}
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#4B5563",
                lineHeight: 1.75,
                marginBottom: 24,
              }}
            >
              {oneBet.rationale}
            </p>

            {/* Projected Conversion Lift — sub-card */}
            <div
              className="rounded-xl"
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                padding: "18px 22px",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="uppercase"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: "0.08em",
                  }}
                >
                  PROJECTED CONVERSION LIFT
                </p>
                <span
                  className="inline-flex items-center gap-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#16A34A",
                  }}
                >
                  <TrendingUp size={14} />
                  +{liftPct}% Increase
                </span>
              </div>

              {/* Lift bar */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  height: 12,
                  borderRadius: 100,
                  backgroundColor: "#E5E7EB",
                }}
              >
                {/* Current fill */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${current}%`,
                    backgroundColor: "#3B82F6",
                    borderRadius: "100px 0 0 100px",
                  }}
                />
                {/* Projected gain */}
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: `${current}%`,
                    width: `${projected.mid - current}%`,
                    backgroundColor: "#93C5FD",
                    borderRadius: "0 100px 100px 0",
                  }}
                />
              </div>

              {/* Labels below bar */}
              <div className="flex justify-between mt-2">
                <span style={{ fontSize: 12, fontWeight: 500, color: "#6B7280" }}>
                  {current}% (Today)
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>
                  {projected.mid}% (Projected)
                </span>
              </div>
            </div>
          </div>

          {/* Unlocks Key Personas — bottom card */}
          <div
            className="rounded-2xl w-full"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: CARD_SHADOW,
              border: "1px solid #E5E7EB",
              padding: "18px 24px",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={20} style={{ color: "#9CA3AF" }} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.2 }}>
                    Unlocks Key Personas
                  </p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1 }}>
                    First-time users who need reassurance
                  </p>
                </div>
              </div>

              {/* Avatar stack */}
              <div className="flex items-center">
                {oneBet.personas.slice(0, 4).map((name, idx) => {
                  const initials =
                    (name.split(" ")[0]?.[0] ?? "") +
                    (name.split(" ")[1]?.[0] ?? "");
                  const bgColor = PERSONA_COLORS[idx % PERSONA_COLORS.length];
                  return (
                    <span
                      key={name}
                      className="flex items-center justify-center rounded-full shrink-0"
                      title={name}
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: bgColor,
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 700,
                        border: "2px solid #FFFFFF",
                        marginLeft: idx > 0 ? -8 : 0,
                        zIndex: 10 - idx,
                        position: "relative",
                      }}
                    >
                      {initials}
                    </span>
                  );
                })}
                {oneBet.personas.length > 4 && (
                  <span
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                      fontSize: 11,
                      fontWeight: 600,
                      border: "2px solid #FFFFFF",
                      marginLeft: -8,
                      position: "relative",
                    }}
                  >
                    +{oneBet.personas.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Implementation Plan (2/5) */}
        <div className="lg:col-span-2 flex flex-col gap-0">
          {/* Section label */}
          <p
            className="uppercase"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#9CA3AF",
              letterSpacing: "0.1em",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            IMPLEMENTATION PLAN
          </p>

          {/* Implementation cards */}
          <div className="flex flex-col gap-3">
            {(oneBet.whatChanges ?? []).map((change, idx) => {
              const iconKey = change.icon ?? "shield";
              const IconComp = CHANGE_ICONS[iconKey] ?? Shield;
              const iconBg = ICON_BG[iconKey] ?? "#EFF6FF";
              const iconColor = ICON_COLOR[iconKey] ?? "#2563EB";
              const title = change.title ?? change.description.split(".")[0];

              return (
                <div
                  key={idx}
                  className="rounded-2xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: CARD_SHADOW,
                    border: "1px solid #E5E7EB",
                    padding: "18px 22px",
                  }}
                >
                  {/* Top row: Icon + Title inline, benefit on right */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="flex items-center justify-center rounded-xl shrink-0"
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: iconBg,
                        }}
                      >
                        <IconComp size={18} style={{ color: iconColor }} />
                      </div>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#1A1A1A",
                          lineHeight: 1.3,
                        }}
                      >
                        {title}
                      </p>
                    </div>

                    {/* Benefit tag — right aligned */}
                    {change.benefit && (
                      <span
                        className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "#16A34A",
                          marginTop: 2,
                        }}
                      >
                        <CheckCircle2 size={14} />
                        {change.benefit}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#6B7280",
                      lineHeight: 1.5,
                      marginTop: 8,
                      paddingLeft: 48,
                    }}
                  >
                    {change.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
