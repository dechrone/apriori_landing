"use client";

import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

/* ── Trait ordering ── */
const TRAIT_ORDER = [
  "age_range",
  "income_range",
  "digital_literacy",
  "employer_type",
  "zone",
];

/* ── Trait labels ── */
const TRAIT_LABELS: Record<string, string> = {
  age_range: "Age",
  income_range: "Income",
  digital_literacy: "Digital Literacy",
  employer_type: "Employer Type",
  zone: "Zone",
};

/* ── Parse conversion_rate_estimate ── */
function parseConversionRate(raw: string) {
  const match = raw.match(/(\d+[\-–]\d+%)/);
  if (match) {
    const pct = match[1];
    const rest = raw
      .replace(pct, "")
      .trim()
      .replace(/^[,\s\-–]+/, "")
      .replace(/[,\s\-–]+$/, "");
    return { pct, rest };
  }
  return { pct: null, rest: raw };
}

/* ── Shared styles ── */
const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#9090A8",
  marginBottom: 8,
  fontFamily: "var(--font-plus-jakarta), sans-serif",
};

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E2E2EA",
  borderRadius: 12,
  padding: 20,
};

export function PowerUsers({ data }: Props) {
  const pu = data.power_users;
  const hasArchetypes =
    pu?.power_user_archetypes && pu.power_user_archetypes.length > 0;

  if (!hasArchetypes) return null;

  const arch = pu!.power_user_archetypes[0]; // primary archetype
  const traits = arch.defining_traits ?? {};
  const behavioralArchetype = traits.behavioral_archetype;

  // Ordered trait entries (excluding behavioral_archetype)
  const orderedTraitEntries = TRAIT_ORDER.map((key) => ({
    key,
    label: TRAIT_LABELS[key] ?? key.replace(/_/g, " "),
    value: traits[key],
  })).filter((t) => t.value);

  // Also pick up any extra keys not in TRAIT_ORDER
  const extraTraitEntries = Object.entries(traits)
    .filter(([k]) => k !== "behavioral_archetype" && !TRAIT_ORDER.includes(k))
    .map(([k, v]) => ({
      key: k,
      label: TRAIT_LABELS[k] ?? k.replace(/_/g, " "),
      value: v,
    }));

  const allTraitEntries = [...orderedTraitEntries, ...extraTraitEntries];

  const hasWhatResonates =
    arch.what_resonates && arch.what_resonates.length > 0;
  const conversion = arch.conversion_rate_estimate
    ? parseConversionRate(arch.conversion_rate_estimate)
    : null;

  const flowStrengths = pu!.flow_strengths_for_power_users ?? [];
  const hasFlowStrengths = flowStrengths.length > 0;
  const hasAcquisition = !!pu!.acquisition_recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55 }}
    >
      {/* ── Section Header ── */}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textPrimary,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          marginBottom: 20,
        }}
      >
        Power Users
      </h2>

      {/* ═══ Zone A — Identity Header ═══ */}
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#0D0D14",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            marginBottom: behavioralArchetype ? 4 : 0,
          }}
        >
          {arch.archetype_name}
        </p>
        {behavioralArchetype && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#9090A8",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {behavioralArchetype}
          </p>
        )}
      </div>

      {/* ═══ Zone B — Traits Strip ═══ */}
      {allTraitEntries.length > 0 && (
        <div
          style={{
            background: "#F7F7F9",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px 0",
          }}
        >
          {allTraitEntries.map((entry, i) => (
            <span key={entry.key} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && (
                <span
                  style={{
                    color: "#D0D0DC",
                    fontSize: 13,
                    margin: "0 10px",
                    userSelect: "none",
                  }}
                >
                  •
                </span>
              )}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#0D0D14",
                  fontFamily: "var(--font-inter), sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontWeight: 600 }}>{entry.label}:</span> {entry.value}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* ═══ Zone C — Why They Convert + What Resonates ═══ */}
      {(arch.why_they_convert || hasWhatResonates) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              arch.why_they_convert && hasWhatResonates ? "1fr 1fr" : "1fr",
            gap: 16,
            marginBottom: 16,
          }}
          className="sim-power-zone-c"
        >
          {/* Why They Convert */}
          {arch.why_they_convert && (
            <div style={cardStyle}>
              <p style={sectionLabel}>Why They Convert</p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#5A5A72",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {arch.why_they_convert}
              </p>
            </div>
          )}

          {/* What Resonates */}
          {hasWhatResonates && (
            <div style={cardStyle}>
              <p style={sectionLabel}>What Resonates</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {arch.what_resonates.map((item, ri) => (
                  <div
                    key={ri}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      padding: "8px 0",
                      borderBottom:
                        ri < arch.what_resonates.length - 1
                          ? "1px solid #E2E2EA"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        color: "#9090A8",
                        flexShrink: 0,
                        lineHeight: 1.6,
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      →
                    </span>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#0D0D14",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ Zone D — Conversion Rate Estimate ═══ */}
      {conversion && (
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <p style={{ ...sectionLabel, marginBottom: 10 }}>
            Estimated Conversion Rate
          </p>
          {conversion.pct ? (
            <>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#16A34A",
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  marginBottom: conversion.rest ? 4 : 0,
                  lineHeight: 1.2,
                }}
              >
                {conversion.pct}
              </p>
              {conversion.rest && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#5A5A72",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  {conversion.rest}
                </p>
              )}
            </>
          ) : (
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#16A34A",
                fontFamily: "var(--font-plus-jakarta), sans-serif",
              }}
            >
              {conversion.rest}
            </p>
          )}
        </div>
      )}

      {/* ═══ Zone E — Flow Strengths + Acquisition Strategy ═══ */}
      {(hasFlowStrengths || hasAcquisition) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              hasFlowStrengths && hasAcquisition ? "1fr 1fr" : "1fr",
            gap: 16,
          }}
          className="sim-power-zone-e"
        >
          {/* Flow Strengths */}
          {hasFlowStrengths && (
            <div style={cardStyle}>
              <p style={sectionLabel}>Flow Strengths</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {flowStrengths.map((s, si) => (
                  <div
                    key={si}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        color: "#9090A8",
                        flexShrink: 0,
                        lineHeight: 1.65,
                      }}
                    >
                      •
                    </span>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#5A5A72",
                        lineHeight: 1.65,
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acquisition Strategy */}
          {hasAcquisition && (
            <div style={cardStyle}>
              <p style={sectionLabel}>Acquisition Strategy</p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#5A5A72",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {pu!.acquisition_recommendation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Responsive breakpoints ── */}
      <style>{`
        @media (max-width: 767px) {
          .sim-power-zone-c,
          .sim-power-zone-e {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
