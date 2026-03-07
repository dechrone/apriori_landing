"use client";

import type { PersonaDetail } from "@/types/flow-analysis";
import {
  getAvatarColor,
  parseOutcome,
  formatIncome,
  getArchetypeIcon,
  getBehaviorSummary,
  extractName,
} from "@/utils/deepDiveHelpers";

interface Props {
  persona: PersonaDetail;
}

export function PersonaIdentityCard({ persona }: Props) {
  const d = persona.demographics;
  const name = extractName(persona);
  const firstName = name.split(" ")[0];
  const avatarColor = getAvatarColor(firstName);
  const outcomeInfo = parseOutcome(persona.outcome);

  const dlScore = d.digital_literacy;
  const dlStyle =
    dlScore <= 3
      ? { bg: "bg-red-50", text: "text-red-700" }
      : dlScore <= 6
        ? { bg: "bg-amber-50", text: "text-amber-700" }
        : { bg: "bg-green-50", text: "text-green-700" };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow:
          "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      }}
    >
      {/* ── Header row ── */}
      <div
        className="flex items-center justify-between gap-3"
        style={{
          backgroundColor: "#F8FAFC",
          borderBottom: "1px solid #E5E7EB",
          padding: "14px 16px",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: 40,
              height: 40,
              backgroundColor: avatarColor,
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1A1A1A",
                lineHeight: 1.3,
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: "#9CA3AF",
                marginTop: 1,
              }}
            >
              {d.occupation} · {d.age}y · {d.district}, {d.state} ·{" "}
              {formatIncome(d.monthly_income_inr)}/mo
            </p>
          </div>
        </div>

        {/* Outcome badge */}
        {outcomeInfo.type === "completed" ? (
          <span
            className="inline-flex items-center shrink-0"
            style={{
              padding: "4px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              backgroundColor: "#F0FDF4",
              color: "#15803D",
              border: "1px solid #BBF7D0",
            }}
          >
            COMPLETED
          </span>
        ) : (
          <span
            className="inline-flex items-center shrink-0"
            style={{
              padding: "4px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              backgroundColor: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
            }}
          >
            DROPPED · {outcomeInfo.screen}
          </span>
        )}
      </div>

      {/* ── Content row: behavioral summary (left) + tags (right, aligned with COMPLETED badge) ── */}
      <div
        className="flex justify-between items-start gap-4"
        style={{ padding: "14px 16px" }}
      >
        {/* Left: Behavioral summary */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: "55%" }}>
          <p
            style={{
              fontSize: 12,
              fontStyle: "italic",
              color: "#64748B",
              lineHeight: 1.6,
            }}
          >
            {getBehaviorSummary(persona.professional_background)}
          </p>
        </div>

        {/* Right: Tags - 2 columns grid, aligned with outcome badge above */}
        <div
          style={{ 
            flex: "0 0 auto", 
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "6px",
            minWidth: "fit-content"
          }}
        >
          {/* Archetype */}
          <span
            className="inline-flex items-center gap-1"
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "#F1F5F9",
              color: "#475569",
              whiteSpace: "nowrap",
              justifyContent: "center",
            }}
          >
            {getArchetypeIcon(d.behavioral_archetype)} {d.behavioral_archetype}
          </span>

          {/* Digital literacy */}
          <span
            className={`inline-flex items-center gap-1 ${dlStyle.bg} ${dlStyle.text}`}
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 500,
              whiteSpace: "nowrap",
              justifyContent: "center",
            }}
          >
            📱 Digital: {dlScore}/10
          </span>

          {/* EMI comfort */}
          {d.emi_comfort === "comfortable" ? (
            <span
              className="inline-flex items-center gap-1"
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 500,
                backgroundColor: "#F0FDF4",
                color: "#15803D",
                whiteSpace: "nowrap",
                justifyContent: "center",
              }}
            >
              ✓ EMI-comfortable
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1"
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 500,
                backgroundColor: "#FEF2F2",
                color: "#B91C1C",
                whiteSpace: "nowrap",
                justifyContent: "center",
              }}
            >
              ✗ EMI-averse
            </span>
          )}

          {/* Language */}
          <span
            className="inline-flex items-center gap-1"
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "#F1F5F9",
              color: "#475569",
              whiteSpace: "nowrap",
              justifyContent: "center",
            }}
          >
            💬 {d.first_language}
          </span>

          {/* Family - spans 2 columns if needed, or keep in grid */}
          <span
            className="inline-flex items-center gap-1"
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "#F1F5F9",
              color: "#475569",
              whiteSpace: "nowrap",
              justifyContent: "center",
              gridColumn: "span 2",
            }}
          >
            👨‍👩‍👧 Family of {d.family_size}
          </span>
        </div>
      </div>
    </div>
  );
}
