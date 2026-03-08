"use client";

import React from "react";
import { Users, AlertTriangle, ArrowDown } from "lucide-react";
import type { FunnelScreen } from "./utils/parseFunnelData";
import { avatarColorFromUuid } from "./utils/colorHelper";
import { parseDisplayName, parseShortLabel } from "./utils/nameParser";
import type { PersonaDetail } from "@/types/simulation";

interface Props {
  screen: FunnelScreen;
  isSelected: boolean;
  onClick: (screen_id: string) => void;
  totalPersonas: number;
  personaDetails: PersonaDetail[];
}

/* ── Badge color logic ── */

function badgeColors(screen: FunnelScreen) {
  if (screen.is_biggest_drop) {
    return { bg: "#FEE2E2", color: "#DC2626", border: "2px solid #FCA5A5" };
  }
  if (screen.has_drop_offs) {
    return { bg: "#FFF7ED", color: "#EA580C", border: "2px solid #FED7AA" };
  }
  return { bg: "#F0FDF4", color: "#16A34A", border: "2px solid #BBF7D0" };
}

function cardBorder(screen: FunnelScreen, isSelected: boolean) {
  if (isSelected) return "2px solid #6366F1";
  if (screen.is_biggest_drop) return "2px solid #FCA5A5";
  if (screen.has_drop_offs) return "1.5px solid #FED7AA";
  return "1px solid #E2E2EA";
}

function cardBg(screen: FunnelScreen) {
  if (screen.is_biggest_drop) return "#FFFBFB";
  return "#FFFFFF";
}

function remainingChipColor(pct: number) {
  if (pct >= 70) return { bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
  if (pct >= 40) return { bg: "#FFF7ED", color: "#EA580C", border: "#FED7AA" };
  return { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" };
}

/* ── Build avatar data for dropped personas ── */

function buildDroppedAvatars(
  uuids: string[],
  personaDetails: PersonaDetail[]
) {
  return uuids.map((uuid, i) => {
    const persona = personaDetails.find((p) => p.persona_uuid === uuid);
    const name = persona
      ? parseDisplayName(persona.professional_background, i)
      : `P${i + 1}`;
    return {
      uuid,
      label: parseShortLabel(name),
      color: avatarColorFromUuid(uuid),
    };
  });
}

export function FunnelScreenCard({
  screen,
  isSelected,
  onClick,
  personaDetails,
}: Props) {
  const badge = badgeColors(screen);
  const chipColor = remainingChipColor(screen.remaining_pct);
  const isClickable = screen.has_drop_offs; // Only screens with drop-offs open the panel
  const noUsersReached = screen.users_at_screen === 0;

  const avatars = buildDroppedAvatars(
    screen.dropped_persona_uuids,
    personaDetails
  );
  const maxAvatars = 4;
  const visibleAvatars = avatars.slice(0, maxAvatars);
  const overflow = avatars.length - maxAvatars;

  return (
    <div
      onClick={() => isClickable && onClick(screen.screen_id)}
      style={{
        border: cardBorder(screen, isSelected),
        borderRadius: 12,
        background: noUsersReached ? "#FAFAFA" : cardBg(screen),
        cursor: isClickable ? "pointer" : "default",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 0 0 2px #6366F1" : "none",
        overflow: "hidden",
        opacity: noUsersReached ? 0.6 : 1,
      }}
    >
      {/* ── Top row ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          gap: 12,
        }}
      >
        {/* Left: Badge + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          {/* Step badge */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: badge.bg,
              border: badge.border,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: badge.color,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {screen.step_number}
            </span>
          </div>

          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#0D0D14",
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {screen.view_name}
            </p>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#9090A8",
                fontFamily: "var(--font-inter), sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginTop: 2,
              }}
            >
              Step {screen.step_number}
            </p>
          </div>
        </div>

        {/* Right: Users + Remaining */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          {noUsersReached ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 12,
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
              }}
            >
              <Users size={12} color="#9090A8" />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#9090A8",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                No users reached here
              </span>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end" }}>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#0D0D14",
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {screen.users_at_screen}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "#9090A8",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  Users
                </span>
              </div>

              {/* Remaining chip */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 4,
                  padding: "2px 8px",
                  borderRadius: 12,
                  background: chipColor.bg,
                  border: `1px solid ${chipColor.border}`,
                }}
              >
                <Users size={12} color={chipColor.color} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: chipColor.color,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {screen.remaining_pct}% Remaining
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Drop-off row ── */}
      {screen.has_drop_offs && (
        <div
          style={{
            borderTop: "1px solid #F0F0F5",
            padding: "12px 20px",
            background: screen.is_biggest_drop ? "#FEF2F2" : "#FEFCFB",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Left: drop count + reason */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 0 }}>
            {/* Drop badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexShrink: 0,
              }}
            >
              <ArrowDown size={14} color="#DC2626" />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#DC2626",
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {screen.drop_offs}
              </span>
            </div>

            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#DC2626",
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {screen.is_biggest_drop && (
                  <AlertTriangle size={11} color="#DC2626" />
                )}
                {screen.is_biggest_drop ? "⚠ Biggest Drop" : "Drop-Off Reason"}
              </p>
              {screen.drop_reason_summary && (
                <p
                  style={{
                    fontSize: 13,
                    color: "#374151",
                    fontFamily: "var(--font-inter), sans-serif",
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {screen.drop_reason_summary}
                </p>
              )}
            </div>
          </div>

          {/* Right: Persona avatars */}
          {visibleAvatars.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#9090A8",
                  marginRight: 6,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Personas:
              </span>
              <div style={{ display: "flex", marginLeft: 0 }}>
                {visibleAvatars.map((av, i) => (
                  <div
                    key={av.uuid}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: av.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #FFFFFF",
                      marginLeft: i > 0 ? -6 : 0,
                      zIndex: visibleAvatars.length - i,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#FFF",
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {av.label}
                    </span>
                  </div>
                ))}
                {overflow > 0 && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #FFFFFF",
                      marginLeft: -6,
                      zIndex: 0,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#6B7280",
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      +{overflow}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
