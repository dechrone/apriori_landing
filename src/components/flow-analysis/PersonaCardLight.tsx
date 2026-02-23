"use client";

import type { FlowPersona, JourneyStep } from "@/types/flow-analysis";
import { ChevronRight, X } from "lucide-react";

const CARD_SHADOW = "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
const ACCENT = "#E8583A";

const PERSONA_COLORS: Record<string, string> = {};
const COLOR_PALETTE = [
  "#3B5BDB", "#7950F2", "#0CA678", "#E67700",
  "#D6336C", "#1098AD", "#5C940D", "#E8590C",
];
let colorIdx = 0;
function getPersonaColor(name: string) {
  if (!PERSONA_COLORS[name]) {
    PERSONA_COLORS[name] = COLOR_PALETTE[colorIdx % COLOR_PALETTE.length];
    colorIdx++;
  }
  return PERSONA_COLORS[name];
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(10, Math.max(0, value)) * 10;
  const color = value >= 7 ? "#16A34A" : value >= 5 ? "#F59E0B" : "#DC2626";

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1.5">
        <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {label}
        </span>
        <span className="tabular-nums" style={{ fontSize: 13, fontWeight: 700, color }}>
          {value}/10
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 100, backgroundColor: "#F3F4F6", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 100,
            backgroundColor: color,
            transition: "width 600ms ease-out",
          }}
        />
      </div>
    </div>
  );
}

export function PersonaCardLight({
  persona,
  step,
  compact = false,
}: {
  persona: FlowPersona;
  step: JourneyStep;
  compact?: boolean;
}) {
  const dropped = step.decision === "drop";
  const initial = persona.name.charAt(0).toUpperCase();
  const bgColor = getPersonaColor(persona.name);

  return (
    <article
      className="rounded-[14px]"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: CARD_SHADOW,
        overflow: "hidden",
      }}
    >
      {/* ── Header Row ── */}
      <div style={{ padding: "16px 20px 14px" }} className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: 36,
              height: 36,
              backgroundColor: bgColor,
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {initial}
          </span>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>
              {persona.name}
            </p>
            <p style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF", marginTop: 1 }}>
              {persona.role} · {persona.city}
            </p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1 shrink-0"
          style={{
            padding: "4px 10px",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            backgroundColor: dropped ? "#FEF2F2" : "#DCFCE7",
            color: dropped ? "#DC2626" : "#16A34A",
          }}
        >
          {dropped ? "DROPPED" : "CONTINUED"}
          {dropped ? <X size={12} /> : <ChevronRight size={12} />}
        </span>
      </div>

      {/* ── Score Row ── */}
      <div
        className="flex items-center gap-4"
        style={{ padding: "0 20px 14px" }}
      >
        <ScoreBar label="Trust" value={step.trustScore} />
        <div style={{ width: 1, height: 28, backgroundColor: "#F3F4F6" }} />
        <ScoreBar label="Clarity" value={step.clarityScore} />
      </div>

      {/* ── Quote ── */}
      <div
        style={{
          padding: "12px 20px",
          backgroundColor: "#F9FAFB",
          borderLeft: `3px solid ${ACCENT}`,
          margin: "0 0 0 0",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", fontStyle: "italic", lineHeight: 1.6 }}>
          {step.gutReaction}
        </p>
      </div>

      {/* ── Context / Reasoning ── */}
      <div style={{ padding: "12px 20px" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: "#4B5563",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {step.reasoning}
        </p>
      </div>

      {/* ── Friction Points ── */}
      {step.frictionPoints && step.frictionPoints.length > 0 && (
        <div style={{ padding: "0 20px 12px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
            Friction Points
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {step.frictionPoints.map((fp, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
                style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5, marginBottom: 2 }}
              >
                <span
                  className="shrink-0"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "#DC2626",
                    marginTop: 7,
                  }}
                />
                {fp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Missing ── */}
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#FFF5F3",
        }}
      >
        <p style={{ fontSize: 13, lineHeight: 1.5 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textTransform: "uppercase", marginRight: 6 }}>
            MISSING →
          </span>
          <span style={{ fontWeight: 500, color: ACCENT, fontStyle: "italic" }}>
            {step.missing}
          </span>
        </p>
      </div>

      {/* ── Drop Reason ── */}
      {dropped && step.dropReason && (
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "rgba(220, 38, 38, 0.06)",
            borderTop: "1px solid rgba(220, 38, 38, 0.15)",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
            Drop Reason
          </p>
          <p style={{ fontSize: 13, fontWeight: 400, color: "#4B5563", lineHeight: 1.5 }}>
            {step.dropReason}
          </p>
        </div>
      )}
    </article>
  );
}
