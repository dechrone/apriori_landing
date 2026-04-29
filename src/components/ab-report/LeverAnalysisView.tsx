"use client";

/**
 * Lever Analysis tab — third tab on the AB comparator report (after
 * Overview and Deep Dive). Shows the auto-extracted lever inventory and
 * the structured signal that drives the per-screen overlay + the
 * combinatorial attribution.
 *
 * Sections (top-to-bottom):
 *   1. Summary header — N screens with levers, total levers, persona-reaction
 *      coverage. Quick orientation for what's available.
 *   2. Per-screen breakdown — one block per paired screen that has a lever
 *      inventory. Two sub-views inside each:
 *        (a) Inventory listing — variant A value vs variant B value, category
 *            badge, anchor pinpoint.
 *        (b) Side-by-side verdicts — each lever's deterministic verdict on
 *            variant A AND variant B with persona counts, so you can see
 *            "this lever helped A but dragged B," etc.
 *   3. Winning lever combinations — moved from Overview 02b. Combos sorted
 *      by |Δ vs baseline|, with collapsible per-segment drilldown.
 *
 * Hidden at the tab level when the report has no lever data at all (legacy
 * runs or extraction failure across every screen pair).
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sliders, Users } from "lucide-react";
import type {
  AbReport,
  AnnotatedScreenPair,
  LeverAttribution,
  LeverCombination,
  ScreenElement,
} from "@/types/ab-report";

const T = {
  accent: "#E8583A",
  pageBg: "#F2F0EC",
  flowBg: "#F5F4F2",
  card: "#FFFFFF",
  ink: "#1A1A1A",
  text2: "#4B5563",
  text3: "#6B7280",
  text4: "#9CA3AF",
  border: "#E5E7EB",
  hairline: "#D1D5DB",
  ok: "#10B981",
  okBg: "#D1FAE5",
  okInk: "#065F46",
  warn: "#F59E0B",
  warnBg: "#FEF3C7",
  warnInk: "#92400E",
  bad: "#EF4444",
  badBg: "#FEE2E2",
  badInk: "#991B1B",
  neutralBg: "#F3F4F6",
  neutralInk: "#374151",
};

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: i * 0.04 },
  };
}

const cardStyle: React.CSSProperties = {
  background: T.card,
  border: `0.5px solid ${T.hairline}`,
  borderRadius: 12,
  padding: "20px 24px",
};

/* ── Category palette ─────────────────────────────────────────────────────── */

const categoryPalette: Record<string, { bg: string; color: string }> = {
  copy: { bg: "#F3F4F6", color: "#1F2937" },
  cta: { bg: "#FDE8E4", color: T.accent },
  imagery: { bg: "#F3F4F6", color: "#111827" },
  layout: { bg: "#FEF3C7", color: "#92400E" },
  color: { bg: "#FCE7F3", color: "#9D174D" },
  content: { bg: T.neutralBg, color: T.neutralInk },
};

function CategoryBadge({ category }: { category: string }) {
  const c = categoryPalette[category] || categoryPalette.content;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        background: c.bg,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
}

/* ── Verdict pill ─────────────────────────────────────────────────────────── */

const verdictPalette: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  lift: { bg: T.okBg, color: T.okInk, dot: T.ok, label: "Lift" },
  drag: { bg: T.badBg, color: T.badInk, dot: T.bad, label: "Drag" },
  tradeoff: { bg: T.warnBg, color: T.warnInk, dot: T.warn, label: "Tradeoff" },
};

function VerdictPill({ verdict }: { verdict: string }) {
  const p = verdictPalette[verdict] || verdictPalette.tradeoff;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: p.bg,
        color: p.color,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: p.dot }} />
      {p.label}
    </span>
  );
}

function PersonaCount({ count }: { count: number }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 500,
        color: T.text3,
        whiteSpace: "nowrap",
      }}
    >
      <Users size={11} />
      {count}
    </span>
  );
}

/* ── lever_id → label map (for combo chips & summary cards) ─────────────────── */

function buildLeverLabelMap(data: AbReport): Record<string, string> {
  const map: Record<string, string> = {};
  for (const screen of data.annotated_screens?.screens ?? []) {
    // Prefer the inventory's labels (canonical) over element labels.
    for (const lev of screen.levers ?? []) {
      if (lev.lever_id && lev.label) map[lev.lever_id] = lev.label;
    }
    for (const el of screen.variant_a?.elements ?? []) {
      if (el.id && el.label && !map[el.id]) map[el.id] = el.label;
    }
    for (const el of screen.variant_b?.elements ?? []) {
      if (el.id && el.label && !map[el.id]) map[el.id] = el.label;
    }
  }
  return map;
}

/* ── Header summary ───────────────────────────────────────────────────────── */

function SummaryHeader({ data }: { data: AbReport }) {
  const screens = data.annotated_screens?.screens ?? [];
  const screensWithLevers = screens.filter((s) => (s.levers?.length ?? 0) > 0);
  const totalLevers = screensWithLevers.reduce((acc, s) => acc + (s.levers?.length ?? 0), 0);
  const totalCombos = data.lever_attribution?.top_combinations?.length ?? 0;

  return (
    <motion.div
      {...fadeUp}
      style={{
        background: "#1A1814",
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(232,88,58,0.18)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.accent,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Sliders size={14} />
        Lever Analysis
      </div>
      <p
        style={{
          fontFamily: "var(--font-flow-display), serif",
          fontSize: 22,
          fontWeight: 500,
          color: "#FFFFFF",
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
          maxWidth: 880,
          margin: 0,
        }}
      >
        Auto-extracted design knobs that vary between A and B, the structured
        per-persona reactions to each, and the combinations that move
        conversion most.
      </p>
      <div style={{ display: "flex", gap: 28, marginTop: 22, flexWrap: "wrap" }}>
        <Stat label="Screens with levers" value={`${screensWithLevers.length}/${screens.length}`} />
        <Stat label="Levers detected" value={totalLevers} />
        <Stat label="Winning combos surfaced" value={totalCombos} />
      </div>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#FFFFFF",
          fontFamily: "var(--font-flow-display), serif",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 0.4, textTransform: "uppercase", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}

/* ── Per-screen lever breakdown ───────────────────────────────────────────── */

function ScreenLeverBlock({
  pair,
  totalScreens,
  index,
}: {
  pair: AnnotatedScreenPair;
  totalScreens: number;
  index: number;
}) {
  const levers = pair.levers ?? [];
  if (levers.length === 0) return null;

  // Build verdict map: lever_id → { A: ScreenElement, B: ScreenElement }
  const elementsA: Record<string, ScreenElement> = {};
  for (const el of pair.variant_a?.elements ?? []) elementsA[el.id] = el;
  const elementsB: Record<string, ScreenElement> = {};
  for (const el of pair.variant_b?.elements ?? []) elementsB[el.id] = el;

  return (
    <motion.div {...stagger(index)} style={{ marginBottom: totalScreens > 1 ? 36 : 0 }}>
      {totalScreens > 1 && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: T.ink,
            marginBottom: 14,
            letterSpacing: -0.01,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "2px 8px",
              background: T.ink,
              color: "#FFFFFF",
              borderRadius: 4,
              marginRight: 10,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {pair.index + 1}
          </span>
          {pair.screen_label}
        </div>
      )}

      {/* Inventory + verdict combined into one row per lever */}
      <div
        style={{
          background: T.card,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 1.2fr) minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: 16,
            padding: "12px 18px",
            background: "#F9FAFB",
            borderBottom: `1px solid ${T.border}`,
            fontSize: 11,
            fontWeight: 500,
            color: T.text3,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          <span>Lever</span>
          <span>Variant A shows</span>
          <span>Variant B shows</span>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <span>A verdict</span>
            <span>B verdict</span>
          </span>
        </div>

        {levers.map((lev, i) => {
          const elA = elementsA[lev.lever_id];
          const elB = elementsB[lev.lever_id];
          return (
            <div
              key={lev.lever_id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(160px, 1.2fr) minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1fr)",
                gap: 16,
                padding: "14px 18px",
                borderBottom: i === levers.length - 1 ? "none" : `1px solid ${T.border}`,
                alignItems: "center",
              }}
            >
              {/* Lever id + label + category */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, lineHeight: 1.3 }}>
                  {lev.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <CategoryBadge category={lev.category} />
                  <span style={{ fontSize: 10, color: T.text4, fontFamily: "var(--font-mono), monospace" }}>
                    {lev.lever_id}
                  </span>
                </div>
              </div>

              {/* Variant A value */}
              <ValueCell value={lev.variant_a_value} />
              {/* Variant B value */}
              <ValueCell value={lev.variant_b_value} />

              {/* Verdicts side-by-side */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                <VerdictWithCount el={elA} />
                <VerdictWithCount el={elB} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ValueCell({ value }: { value: string }) {
  if (!value) {
    return (
      <span style={{ fontSize: 12, color: T.text4, fontStyle: "italic" }}>-</span>
    );
  }
  return (
    <span
      style={{
        fontSize: 12,
        color: T.text2,
        lineHeight: 1.4,
        wordBreak: "break-word",
      }}
    >
      &ldquo;{value}&rdquo;
    </span>
  );
}

function VerdictWithCount({ el }: { el?: ScreenElement }) {
  if (!el) {
    return (
      <span style={{ fontSize: 11, color: T.text4 }}>-</span>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
      <VerdictPill verdict={el.verdict} />
      <PersonaCount count={el.persona_count} />
    </div>
  );
}

/* ── Combinations table (moved from Overview 02b) ─────────────────────────── */

function LeverChipRow({ ids, labels }: { ids: string[]; labels: Record<string, string> }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {ids.map((id) => (
        <span
          key={id}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 9px",
            background: T.neutralBg,
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 500,
            color: T.ink,
            whiteSpace: "nowrap",
          }}
        >
          {labels[id] || id}
        </span>
      ))}
    </div>
  );
}

function DeltaPill({ delta }: { delta: number }) {
  const pp = Math.round(delta * 1000) / 10;
  const positive = pp >= 0;
  const bg = positive ? T.okBg : T.badBg;
  const fg = positive ? T.okInk : T.badInk;
  const sign = positive ? "+" : "";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: bg,
        color: fg,
        whiteSpace: "nowrap",
      }}
    >
      {sign}{pp}pp
    </span>
  );
}

function VariantBadge({ variant }: { variant: "A" | "B" }) {
  const bg = variant === "A" ? "#F3F4F6" : "#D1FAE5";
  const fg = variant === "A" ? "#1F2937" : "#065F46";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 9px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        background: bg,
        color: fg,
        whiteSpace: "nowrap",
      }}
    >
      Variant {variant}
    </span>
  );
}

function LeverComboRow({
  combo,
  index,
  labels,
}: {
  combo: LeverCombination;
  index: number;
  labels: Record<string, string>;
}) {
  return (
    <motion.div
      {...stagger(index)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) auto auto auto auto",
        alignItems: "center",
        gap: 16,
        padding: "14px 18px",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <LeverChipRow ids={combo.levers} labels={labels} />
        <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.45 }}>
          {combo.interpretation}
        </div>
      </div>
      <VariantBadge variant={combo.variant} />
      <span style={{ fontSize: 12, fontWeight: 500, color: T.text3, whiteSpace: "nowrap" }}>
        {combo.persona_count} personas
      </span>
      <span style={{ fontSize: 12, fontWeight: 500, color: T.text3, whiteSpace: "nowrap" }}>
        {Math.round(combo.convert_rate * 100)}%
      </span>
      <DeltaPill delta={combo.delta_vs_baseline} />
    </motion.div>
  );
}

function CombinationsBlock({
  attribution,
  labels,
}: {
  attribution: LeverAttribution;
  labels: Record<string, string>;
}) {
  const [showSegments, setShowSegments] = useState(false);
  const top = attribution.top_combinations || [];
  if (top.length === 0) return null;

  const segments = Object.entries(attribution.by_segment || {}).filter(
    ([, rows]) => rows && rows.length > 0,
  );

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, letterSpacing: 1, textTransform: "uppercase" }}>
          Combinations
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: T.ink, marginTop: 4 }}>
          Winning lever combinations
        </div>
        <div style={{ fontSize: 13, fontWeight: 400, color: T.text3, marginTop: 2 }}>
          Combos of design knobs that personas reacted to decisively, sorted
          by absolute Δ vs. variant baseline.
        </div>
      </div>

      <motion.div
        {...fadeUp}
        style={{
          background: T.card,
          borderRadius: 12,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) auto auto auto auto",
            gap: 16,
            padding: "12px 18px",
            background: "#F9FAFB",
            borderBottom: `1px solid ${T.border}`,
            fontSize: 11,
            fontWeight: 500,
            color: T.text3,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          <span>Combo</span>
          <span>Variant</span>
          <span style={{ whiteSpace: "nowrap" }}>Personas</span>
          <span>Convert</span>
          <span style={{ whiteSpace: "nowrap" }}>Δ vs baseline</span>
        </div>
        {top.map((combo, i) => (
          <LeverComboRow
            key={`${combo.variant}-${combo.levers.join("|")}-${i}`}
            combo={combo}
            index={i}
            labels={labels}
          />
        ))}
        {attribution.notes && (
          <div
            style={{
              padding: "10px 18px",
              fontSize: 11,
              fontWeight: 400,
              color: T.text4,
              background: "#FAFAF8",
              borderTop: `1px solid ${T.border}`,
              lineHeight: 1.5,
            }}
          >
            {attribution.notes}
          </div>
        )}
      </motion.div>

      {segments.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={() => setShowSegments((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: T.text2,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <ChevronDown
              size={14}
              style={{
                transform: showSegments ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.15s",
              }}
            />
            {showSegments ? "Hide" : "Show"} per-segment combo winners
          </button>
          {showSegments && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 16 }}>
              {segments.map(([segment, rows]) => (
                <div key={segment}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.ink,
                      marginBottom: 6,
                      letterSpacing: 0.3,
                    }}
                  >
                    {segment}
                  </div>
                  <div
                    style={{
                      background: T.card,
                      borderRadius: 10,
                      border: `1px solid ${T.border}`,
                      overflow: "hidden",
                    }}
                  >
                    {rows.map((combo, i) => (
                      <LeverComboRow
                        key={`${segment}-${combo.variant}-${combo.levers.join("|")}-${i}`}
                        combo={combo}
                        index={i}
                        labels={labels}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────── */

function EmptyLeverState() {
  return (
    <motion.div
      {...fadeUp}
      style={{
        ...cardStyle,
        textAlign: "center",
        padding: "48px 32px",
        marginTop: 12,
      }}
    >
      <Sliders size={28} style={{ color: T.text4, margin: "0 auto 12px" }} />
      <div style={{ fontSize: 16, fontWeight: 500, color: T.ink, marginBottom: 6 }}>
        No lever data on this run
      </div>
      <div style={{ fontSize: 13, color: T.text3, lineHeight: 1.5, maxWidth: 480, margin: "0 auto" }}>
        This comparator run has no auto-extracted lever inventory, typical for
        legacy reports run before the lever pipeline shipped, or runs where the
        vision-diff couldn&apos;t identify clearly differing design knobs.
        New comparator runs against fresh variant pairs will populate this view.
      </div>
    </motion.div>
  );
}

/* ── Public entry ────────────────────────────────────────────────────────── */

export interface LeverAnalysisViewProps {
  data: AbReport;
}

export function LeverAnalysisView({ data }: LeverAnalysisViewProps) {
  const screens = data.annotated_screens?.screens ?? [];
  const screensWithLevers = screens.filter((s) => (s.levers?.length ?? 0) > 0);
  const hasAttribution =
    !!data.lever_attribution && (data.lever_attribution.top_combinations?.length ?? 0) > 0;
  const hasAny = screensWithLevers.length > 0 || hasAttribution;

  if (!hasAny) {
    return (
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
        <EmptyLeverState />
      </div>
    );
  }

  const labels = buildLeverLabelMap(data);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
      <SummaryHeader data={data} />

      {/* Per-screen breakdown */}
      {screensWithLevers.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, letterSpacing: 1, textTransform: "uppercase" }}>
              Per-screen
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: T.ink, marginTop: 4 }}>
              Inventory + verdict, side by side
            </div>
            <div style={{ fontSize: 13, fontWeight: 400, color: T.text3, marginTop: 2 }}>
              For each lever the system detected on a screen, what it shows on each variant and how each variant landed (decisive-reaction count, deterministic verdict).
            </div>
          </div>
          {screensWithLevers.map((pair, i) => (
            <ScreenLeverBlock
              key={pair.id}
              pair={pair}
              totalScreens={screensWithLevers.length}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Combinations */}
      {hasAttribution && data.lever_attribution && (
        <CombinationsBlock attribution={data.lever_attribution} labels={labels} />
      )}

      {/* Mobile responsiveness for the per-lever grid */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .lever-row,
          .lever-row-header {
            grid-template-columns: 1fr !important;
            row-gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
