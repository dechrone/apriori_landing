"use client";

import type { ComparatorData, FlowScorecard } from "@/types/comparator";
import type { SimulationData } from "@/types/simulation";
import {
  ArrowUpRight,
  Check,
  Minus,
  CornerDownRight,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — professional B2B SaaS palette (stone + restrained blue).
   Kept in a single block so future tweaks are trivial; no Tailwind classes
   in this file so the visual language stays self-contained and legible.
   ────────────────────────────────────────────────────────────────────── */

const t = {
  // Surfaces
  bgPage: "#FAFAF9",
  bgSurface: "#FFFFFF",
  bgMuted: "#F5F4F2",
  bgInverse: "#0C0A09",

  // Borders
  border: "#E7E5E4",
  borderSoft: "#F1F0EE",
  borderStrong: "#D6D3D1",

  // Text
  ink: "#0C0A09",
  text: "#1C1917",
  textMuted: "#57534E",
  textSubtle: "#78716C",
  textOnDark: "#FAFAF9",
  textOnDarkMuted: "rgba(250,250,249,0.62)",

  // Signals — muted, serious; reserved for directional cues only
  positive: "#047857",
  positiveBg: "#ECFDF5",
  negative: "#B91C1C",
  negativeBg: "#FEF2F2",
  info: "#1D4ED8",
  infoBg: "#EFF6FF",
  warn: "#B45309",
  warnBg: "#FFFBEB",

  // Type system
  sans: "var(--font-inter), system-ui, -apple-system, sans-serif",
  display: "var(--font-plus-jakarta), var(--font-inter), system-ui, sans-serif",
} as const;

/* Title-case helper for snake_case screen ids */
function titleCase(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ────────────────────────────────────────────────────────────────────────
   ROOT
   ────────────────────────────────────────────────────────────────────── */

interface Props {
  data: ComparatorData;
}

export function ComparatorOverview({ data }: Props) {
  // Normalise cross_pollination (some older runs persisted `{}`).
  const cross = {
    flow_0: data.cross_pollination?.flow_0 ?? [],
    flow_1: data.cross_pollination?.flow_1 ?? [],
  };

  const winnerFlowId = data.winner.flow_id as "flow_0" | "flow_1";
  const loserFlowId = winnerFlowId === "flow_0" ? "flow_1" : "flow_0";

  return (
    <div
      style={{
        background: t.bgPage,
        minHeight: "100vh",
        fontFamily: t.sans,
        color: t.text,
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "40px 28px 96px",
        }}
      >
        <VerdictHero data={data} winnerFlowId={winnerFlowId} loserFlowId={loserFlowId} />

        <Spacer h={32} />

        <VariantCompare data={data} winnerFlowId={winnerFlowId} />

        <SectionDivider
          num="01"
          title="What happened"
          subtitle="Head-to-head outcomes across every synthetic persona."
        />
        <WhatHappened data={data} winnerFlowId={winnerFlowId} />

        <SectionDivider
          num="02"
          title="Why it happened"
          subtitle="The design elements that moved the numbers."
        />
        <WhyItHappened data={data} />

        <SectionDivider
          num="03"
          title="What to do"
          subtitle="A ship decision and the concrete changes to ship with it."
        />
        <WhatToDo
          data={data}
          cross={cross}
          winnerFlowId={winnerFlowId}
          loserFlowId={loserFlowId}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   VERDICT HERO — the 3-second answer.
   Dark surface, large single claim, three grounded stat lozenges underneath.
   ═══════════════════════════════════════════════════════════════════════ */

function VerdictHero({
  data,
  winnerFlowId,
  loserFlowId,
}: {
  data: ComparatorData;
  winnerFlowId: "flow_0" | "flow_1";
  loserFlowId: "flow_0" | "flow_1";
}) {
  const win = data.scorecards[winnerFlowId];
  const lose = data.scorecards[loserFlowId];
  const liftPp = Math.round(win.completion_rate_pct - lose.completion_rate_pct);
  const timeDelta = lose.avg_time_to_complete_seconds - win.avg_time_to_complete_seconds;

  // If the cross-pollination set is non-empty, the verdict is "ship A with edits"
  // rather than a clean win. That distinction is crucial for PMs.
  const modsFromLoser = data.cross_pollination?.[winnerFlowId] ?? [];
  const verdictKind: "ship" | "ship_with_mods" | "hybrid" =
    modsFromLoser.length >= 2
      ? "ship_with_mods"
      : liftPp < 3
        ? "hybrid"
        : "ship";

  const verdictLabel =
    verdictKind === "ship"
      ? `Ship ${data.winner.flow_name}`
      : verdictKind === "ship_with_mods"
        ? `Ship ${data.winner.flow_name} — with edits`
        : "Hybrid recommended";

  const verdictKindCopy =
    verdictKind === "ship"
      ? "Clean win. Ship the winner as-is for your primary segment."
      : verdictKind === "ship_with_mods"
        ? `${data.winner.flow_name} is the better base — borrow ${modsFromLoser.length} specific elements from the other variant before launch.`
        : "The two variants are close overall but win different segments — combine their best parts rather than picking one.";

  return (
    <section
      style={{
        background: t.bgInverse,
        borderRadius: 16,
        padding: "36px 40px 32px",
        color: t.textOnDark,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Micro label + confidence */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: t.textOnDarkMuted,
          }}
        >
          Decision
        </p>
        {data.confidence_level && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                background: "rgba(250,250,249,0.08)",
                color: t.textOnDark,
                border: "1px solid rgba(250,250,249,0.16)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background:
                    data.confidence_level === "high"
                      ? "#34D399"
                      : data.confidence_level === "medium"
                        ? "#FBBF24"
                        : "#F87171",
                }}
              />
              {data.confidence_level} confidence
            </span>
          </div>
        )}
      </div>

      {/* Verdict headline */}
      <h1
        style={{
          margin: 0,
          fontFamily: t.display,
          fontSize: "clamp(28px, 3.2vw, 38px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: t.textOnDark,
        }}
      >
        {verdictLabel}
      </h1>

      <p
        style={{
          margin: "12px 0 0",
          fontSize: 15,
          lineHeight: 1.6,
          color: t.textOnDarkMuted,
          maxWidth: 720,
        }}
      >
        {verdictKindCopy}
      </p>

      {/* Primary reason (from LLM) — quoted narrative */}
      <p
        style={{
          margin: "16px 0 0",
          fontSize: 14,
          lineHeight: 1.65,
          color: t.textOnDark,
          maxWidth: 780,
          opacity: 0.92,
        }}
      >
        {data.winner.primary_reason}
      </p>

      {/* Grounded stat strip — three hard numbers */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: "1px solid rgba(250,250,249,0.1)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 24,
        }}
      >
        <HeroStat
          label="Conversion lift"
          value={`${liftPp > 0 ? "+" : ""}${liftPp}pp`}
          sub={`${win.completion_rate_pct}% vs ${lose.completion_rate_pct}%`}
          tone="positive"
        />
        <HeroStat
          label="Time to complete"
          value={`${win.avg_time_to_complete_seconds}s`}
          sub={timeDelta > 0 ? `${timeDelta}s faster than loser` : "slower than loser"}
          tone="neutral"
        />
        <HeroStat
          label="Trust score"
          value={win.avg_trust?.toFixed(1) ?? "—"}
          sub={`${lose.avg_trust?.toFixed(1) ?? "—"} in loser`}
          tone="neutral"
        />
        <HeroStat
          label="Top friction"
          value={titleCase(win.top_drop_off_screen)}
          sub="still costs the winner some drop-off"
          tone="muted"
        />
      </div>

      {data.confidence_reasoning && (
        <p
          style={{
            margin: "20px 0 0",
            fontSize: 12,
            color: t.textOnDarkMuted,
            fontFamily: "var(--font-inter), ui-monospace, monospace",
          }}
        >
          {data.confidence_reasoning}
        </p>
      )}
    </section>
  );
}

function HeroStat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "positive" | "neutral" | "muted";
}) {
  const valueColor =
    tone === "positive" ? "#34D399" : tone === "muted" ? t.textOnDarkMuted : t.textOnDark;
  return (
    <div>
      <p
        style={{
          margin: 0,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: t.textOnDarkMuted,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "6px 0 4px",
          fontFamily: t.display,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: valueColor,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p style={{ margin: 0, fontSize: 12, color: t.textOnDarkMuted, lineHeight: 1.4 }}>
        {sub}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   VARIANT COMPARE — the two variants side-by-side, grounded in screenshots.
   ═══════════════════════════════════════════════════════════════════════ */

function VariantCompare({
  data,
  winnerFlowId,
}: {
  data: ComparatorData;
  winnerFlowId: "flow_0" | "flow_1";
}) {
  return (
    <section>
      <SectionLabel>Compared</SectionLabel>
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {data.flows_compared.map((flow, idx) => {
          const fid = flow.flow_id as "flow_0" | "flow_1";
          const sc = data.scorecards[fid];
          const sim = (idx === 0 ? data.flow_0_data : data.flow_1_data) as SimulationData | undefined;
          const screenshot = data.variant_screenshots?.[fid];
          const isWinner = fid === winnerFlowId;
          return (
            <VariantCard
              key={fid}
              label={idx === 0 ? "Variant A" : "Variant B"}
              flowName={flow.flow_name}
              scorecard={sc}
              sim={sim}
              screenshot={screenshot}
              isWinner={isWinner}
            />
          );
        })}
      </div>
    </section>
  );
}

function VariantCard({
  label,
  flowName,
  scorecard,
  sim,
  screenshot,
  isWinner,
}: {
  label: string;
  flowName: string;
  scorecard: FlowScorecard;
  sim: SimulationData | undefined;
  screenshot?: string;
  isWinner: boolean;
}) {
  const completed = sim?.summary?.completed;
  const total = sim?.summary?.total_personas;

  return (
    <article
      style={{
        background: t.bgSurface,
        borderRadius: 14,
        border: `1px solid ${t.border}`,
        boxShadow: isWinner
          ? `0 0 0 1px ${t.ink} inset, 0 1px 3px rgba(0,0,0,0.03)`
          : "0 1px 3px rgba(0,0,0,0.03)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Screenshot frame */}
      <div
        style={{
          position: "relative",
          background: t.bgMuted,
          borderBottom: `1px solid ${t.borderSoft}`,
          aspectRatio: "16 / 9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {screenshot ? (
          // Plain <img> so we don't need to whitelist Cloudinary domains in
          // next.config — these are user-uploaded, arbitrary hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshot}
            alt={`${flowName} screen`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              background: t.bgMuted,
            }}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "28px 20px",
              color: t.textSubtle,
              fontSize: 12,
            }}
          >
            <Minus size={18} style={{ opacity: 0.4 }} />
            <p style={{ marginTop: 8, fontSize: 12 }}>No preview available</p>
          </div>
        )}

        {/* Variant label ribbon — top left */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "4px 10px",
            borderRadius: 6,
            background: t.bgInverse,
            color: t.textOnDark,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>

        {/* Winner badge — top right */}
        {isWinner && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 6,
              background: t.positive,
              color: "#FFF",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <Check size={11} strokeWidth={3} />
            Winner
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 600,
              color: t.text,
              fontFamily: t.display,
              letterSpacing: "-0.01em",
            }}
          >
            {flowName}
          </p>
          {completed != null && total != null && (
            <p style={{ margin: "2px 0 0", fontSize: 12, color: t.textSubtle }}>
              {completed} of {total} personas completed
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            paddingTop: 4,
            borderTop: `1px solid ${t.borderSoft}`,
          }}
        >
          <span
            style={{
              fontFamily: t.display,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: isWinner ? t.ink : t.text,
              lineHeight: 1,
            }}
          >
            {scorecard.completion_rate_pct}%
          </span>
          <span style={{ fontSize: 12, color: t.textMuted }}>completion</span>
        </div>

        {/* Stat row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            paddingTop: 10,
            borderTop: `1px solid ${t.borderSoft}`,
          }}
        >
          <MiniStat label="Avg time" value={`${scorecard.avg_time_to_complete_seconds}s`} />
          <MiniStat label="Dominant plan" value={scorecard.dominant_plan} />
          <MiniStat label="Trust" value={scorecard.avg_trust?.toFixed(1) ?? "—"} />
          <MiniStat label="Addon" value={`${scorecard.addon_adoption_pct}%`} />
        </div>

        {/* Top drop-off screen */}
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: t.bgMuted,
            fontSize: 12,
            color: t.textMuted,
            lineHeight: 1.5,
          }}
        >
          Top drop-off —{" "}
          <span style={{ color: t.text, fontWeight: 600 }}>
            {titleCase(scorecard.top_drop_off_screen)}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   01 — WHAT HAPPENED
   Head-to-head bars across dimensions + per-segment winners.
   ═══════════════════════════════════════════════════════════════════════ */

function WhatHappened({
  data,
  winnerFlowId,
}: {
  data: ComparatorData;
  winnerFlowId: "flow_0" | "flow_1";
}) {
  // Keep every dimension the LLM emitted (typically 3–4). Don't filter to just
  // Completion Rate — PMs need to see trust/clarity/time at a glance too.
  const dims = data.dimension_comparisons ?? [];
  const segments = data.segment_winners ?? [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
      {dims.length > 0 && (
        <Card title="Head-to-head dimensions">
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 4 }}>
            {dims.map((dim) => (
              <DimensionRow
                key={dim.dimension}
                dimension={dim.dimension}
                values={dim.values}
                winner={dim.winner as "flow_0" | "flow_1"}
                insight={dim.insight}
                flowNames={{
                  flow_0: data.flows_compared[0].flow_name,
                  flow_1: data.flows_compared[1].flow_name,
                }}
                overallWinner={winnerFlowId}
              />
            ))}
          </div>
        </Card>
      )}

      {segments.length > 0 && (
        <Card
          title="Segment winners"
          subtitle="Which variant converted best inside each sub-segment."
        >
          <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
            {segments.map((seg, i) => {
              const winName = data.flows_compared.find((f) => f.flow_id === seg.winner_flow_id)
                ?.flow_name;
              const variantLabel = seg.winner_flow_id === "flow_0" ? "Variant A" : "Variant B";
              const isAlignedWithOverall = seg.winner_flow_id === winnerFlowId;
              return (
                <div
                  key={seg.segment}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 2fr) auto",
                    gap: 16,
                    alignItems: "start",
                    padding: "16px 0",
                    borderTop: i === 0 ? "none" : `1px solid ${t.borderSoft}`,
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: t.text }}>
                      {seg.segment}
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: 13,
                        color: t.textMuted,
                        lineHeight: 1.55,
                      }}
                    >
                      {seg.reason}
                    </p>
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      background: isAlignedWithOverall ? t.positiveBg : t.warnBg,
                      color: isAlignedWithOverall ? t.positive : t.warn,
                      border: `1px solid ${isAlignedWithOverall ? "#D1FAE5" : "#FDE68A"}`,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {variantLabel} — {winName}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

function DimensionRow({
  dimension,
  values,
  winner,
  insight,
  flowNames,
  overallWinner,
}: {
  dimension: string;
  values: { flow_0: string; flow_1: string };
  winner: "flow_0" | "flow_1";
  insight: string;
  flowNames: { flow_0: string; flow_1: string };
  overallWinner: "flow_0" | "flow_1";
}) {
  const v0 = parseFloat(values.flow_0) || 0;
  const v1 = parseFloat(values.flow_1) || 0;
  const max = Math.max(v0, v1, 1);

  return (
    <div style={{ paddingBottom: 4 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.text }}>{dimension}</p>
        <p style={{ margin: 0, fontSize: 11, color: t.textSubtle, letterSpacing: "0.02em" }}>
          {flowNames[winner]} leads
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <DimBar
          name="A"
          value={values.flow_0}
          pct={(v0 / max) * 100}
          isWinner={winner === "flow_0"}
          isOverall={overallWinner === "flow_0"}
        />
        <DimBar
          name="B"
          value={values.flow_1}
          pct={(v1 / max) * 100}
          isWinner={winner === "flow_1"}
          isOverall={overallWinner === "flow_1"}
        />
      </div>

      {insight && (
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 12.5,
            color: t.textMuted,
            lineHeight: 1.55,
          }}
        >
          {insight}
        </p>
      )}
    </div>
  );
}

function DimBar({
  name,
  value,
  pct,
  isWinner,
  isOverall,
}: {
  name: string;
  value: string;
  pct: number;
  isWinner: boolean;
  isOverall: boolean;
}) {
  // Winner of THIS dimension is filled ink; loser is filled stone-300. The
  // overall-winner stays ink even when it loses a specific dimension — the bar
  // colour alone tracks per-dimension winner, with an "overall" asterisk-less
  // cue via the ring.
  const barBg = isWinner ? t.ink : "#D6D3D1";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          width: 18,
          fontSize: 11,
          fontWeight: 700,
          color: isOverall ? t.ink : t.textMuted,
          textAlign: "right",
        }}
      >
        {name}
      </span>
      <div
        style={{
          flex: 1,
          position: "relative",
          height: 22,
          borderRadius: 4,
          background: t.bgMuted,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.max(pct, 4)}%`,
            height: "100%",
            background: barBg,
            borderRadius: 4,
            transition: "width 0.35s ease",
          }}
        />
      </div>
      <span
        style={{
          width: 56,
          textAlign: "right",
          fontSize: 13,
          fontWeight: 600,
          color: t.text,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   02 — WHY IT HAPPENED
   Strengths & gaps that drove the numbers.
   ═══════════════════════════════════════════════════════════════════════ */

function WhyItHappened({ data }: { data: ComparatorData }) {
  const flows = data.flows_compared;
  const excels = data.where_each_excels;
  const shorts = data.where_each_falls_short;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
      {flows.map((flow, idx) => {
        const fid = flow.flow_id as "flow_0" | "flow_1";
        const wins = excels?.[fid] ?? [];
        const losses = shorts?.[fid] ?? [];
        return (
          <Card
            key={fid}
            title={flow.flow_name}
            subtitle={idx === 0 ? "Variant A" : "Variant B"}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 6 }}>
              {wins.length > 0 && (
                <div>
                  <MiniHeading tone="positive">Strengths · what drove conversion</MiniHeading>
                  <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                    {wins.map((item, i) => (
                      <BulletItem key={i} tone="positive">
                        {item}
                      </BulletItem>
                    ))}
                  </ul>
                </div>
              )}

              {losses.length > 0 && (
                <div>
                  <MiniHeading tone="negative">Gaps · what cost conversion</MiniHeading>
                  <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                    {losses.map((item, i) => (
                      <BulletItem key={i} tone="negative">
                        {item}
                      </BulletItem>
                    ))}
                  </ul>
                </div>
              )}

              {wins.length === 0 && losses.length === 0 && (
                <p style={{ margin: 0, fontSize: 13, color: t.textSubtle }}>
                  No divergent signals for this flow.
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function MiniHeading({
  tone,
  children,
}: {
  tone: "positive" | "negative" | "info";
  children: React.ReactNode;
}) {
  const color =
    tone === "positive" ? t.positive : tone === "negative" ? t.negative : t.info;
  return (
    <p
      style={{
        margin: 0,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </p>
  );
}

function BulletItem({
  tone,
  children,
}: {
  tone: "positive" | "negative" | "info";
  children: React.ReactNode;
}) {
  const dotColor =
    tone === "positive" ? t.positive : tone === "negative" ? t.negative : t.info;
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "14px 1fr",
        gap: 10,
        padding: "8px 0",
        fontSize: 13.5,
        lineHeight: 1.55,
        color: t.text,
        borderTop: `1px solid ${t.borderSoft}`,
      }}
    >
      <span
        aria-hidden
        style={{
          marginTop: 8,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: dotColor,
          display: "inline-block",
          alignSelf: "start",
          justifySelf: "center",
        }}
      />
      <span>{children}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   03 — WHAT TO DO
   The recommendation paragraph + concrete patches to apply.
   ═══════════════════════════════════════════════════════════════════════ */

function WhatToDo({
  data,
  cross,
  winnerFlowId,
  loserFlowId,
}: {
  data: ComparatorData;
  cross: { flow_0: string[]; flow_1: string[] };
  winnerFlowId: "flow_0" | "flow_1";
  loserFlowId: "flow_0" | "flow_1";
}) {
  const winnerName = data.flows_compared.find((f) => f.flow_id === winnerFlowId)?.flow_name;
  const loserName = data.flows_compared.find((f) => f.flow_id === loserFlowId)?.flow_name;
  const patchesForWinner = cross[winnerFlowId] ?? [];
  const patchesForLoser = cross[loserFlowId] ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Recommendation panel — single restrained accent (info blue) */}
      <div
        style={{
          background: t.bgSurface,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
          padding: "24px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: t.info,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <ArrowUpRight size={14} strokeWidth={2.25} color={t.info} />
          <p
            style={{
              margin: 0,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: t.info,
            }}
          >
            Recommendation
          </p>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.65,
            color: t.text,
          }}
        >
          {data.recommendation}
        </p>
      </div>

      {/* Patch lists */}
      {(patchesForWinner.length > 0 || patchesForLoser.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 20,
          }}
        >
          {patchesForWinner.length > 0 && (
            <Card
              title={`Patch ${winnerName ?? "the winner"} before launch`}
              subtitle={`Borrow from ${loserName ?? "the loser"}`}
            >
              <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                {patchesForWinner.map((item, i) => (
                  <PatchItem key={i}>{item}</PatchItem>
                ))}
              </ul>
            </Card>
          )}
          {patchesForLoser.length > 0 && (
            <Card
              title={`If you ever revisit ${loserName ?? "the loser"}`}
              subtitle={`Borrow from ${winnerName ?? "the winner"}`}
              tone="muted"
            >
              <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                {patchesForLoser.map((item, i) => (
                  <PatchItem key={i}>{item}</PatchItem>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

function PatchItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "16px 1fr",
        gap: 10,
        padding: "10px 0",
        fontSize: 13.5,
        lineHeight: 1.55,
        color: t.text,
        borderTop: `1px solid ${t.borderSoft}`,
      }}
    >
      <CornerDownRight size={14} strokeWidth={2.2} color={t.info} style={{ marginTop: 3 }} />
      <span>{children}</span>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Primitives
   ═══════════════════════════════════════════════════════════════════════ */

function Spacer({ h }: { h: number }) {
  return <div style={{ height: h }} />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: t.textSubtle,
      }}
    >
      {children}
    </p>
  );
}

function SectionDivider({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ marginTop: 56, marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter), ui-monospace, monospace",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: t.textSubtle,
          }}
        >
          {num}
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: t.display,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: t.ink,
          }}
        >
          {title}
        </h2>
      </div>
      <p style={{ margin: "0 0 12px 34px", fontSize: 13.5, color: t.textMuted }}>
        {subtitle}
      </p>
      <div style={{ height: 1, background: t.border, marginTop: 6 }} />
    </div>
  );
}

function Card({
  title,
  subtitle,
  tone,
  children,
}: {
  title?: string;
  subtitle?: string;
  tone?: "default" | "muted";
  children: React.ReactNode;
}) {
  const isMuted = tone === "muted";
  return (
    <section
      style={{
        background: isMuted ? t.bgMuted : t.bgSurface,
        borderRadius: 12,
        border: `1px solid ${t.border}`,
        padding: "22px 24px",
      }}
    >
      {(title || subtitle) && (
        <header style={{ marginBottom: 8 }}>
          {title && (
            <h3
              style={{
                margin: 0,
                fontFamily: t.display,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: t.ink,
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 12,
                color: t.textSubtle,
                letterSpacing: "0.02em",
              }}
            >
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          margin: 0,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: t.textSubtle,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "2px 0 0",
          fontSize: 14,
          fontWeight: 600,
          color: t.text,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </p>
    </div>
  );
}
