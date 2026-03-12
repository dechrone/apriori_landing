"use client";

import type { ComparatorData } from "@/types/comparator";

/* ── Design tokens ── */
const tokens = {
  bg: "#F4F1EC",
  card: "#FFFFFF",
  border: "#E6E1D8",
  text: "#1A1814",
  muted: "#8A8178",
  green: "#22A06B",
  red: "#E5534B",
  orange: "#D4621A",
  blue: "#2563EB",
};

/** Title-case helper */
function titleCase(s: string) {
  return s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface Props {
  data: ComparatorData;
}

export function ComparatorOverview({ data }: Props) {
  const { flows_compared, winner, scorecards, dimension_comparisons, segment_winners, where_each_excels, where_each_falls_short, cross_pollination, recommendation } = data;

  /* Determine winner/loser flow ids */
  const winnerFlowId = winner.flow_id as "flow_0" | "flow_1";
  const loserFlowId = winnerFlowId === "flow_0" ? "flow_1" : "flow_0";

  /* Conversion lift */
  const winnerRate = scorecards[winnerFlowId].completion_rate_pct;
  const loserRate = scorecards[loserFlowId].completion_rate_pct;
  const liftPp = Math.round(winnerRate - loserRate);

  /* Filter dimension comparisons to Completion Rate only */
  const VISIBLE_DIMENSIONS = ["Completion Rate"];
  const filteredDimensions = dimension_comparisons.filter((d) =>
    VISIBLE_DIMENSIONS.includes(d.dimension)
  );

  return (
    <div
      style={{
        background: tokens.bg,
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* ═══ 5.1 Winner Banner ═══ */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              background: "#1A1814",
              borderRadius: 16,
              padding: "32px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 12,
                }}
              >
                Comparison Verdict
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    backgroundColor: tokens.green,
                    color: "#FFFFFF",
                  }}
                >
                  Winner
                </span>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {winner.flow_name}
                </span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: 640 }}>
                {winner.primary_reason}
              </p>
            </div>
            <div
              style={{
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                Conversion Lift
              </p>
              <p
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: tokens.green,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  lineHeight: 1,
                }}
              >
                +{liftPp}pp
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 5.2 Scorecard Comparison ═══ */}
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: tokens.text,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              marginBottom: 16,
            }}
          >
            Scorecard
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {flows_compared.map((flow) => {
              const fid = flow.flow_id as "flow_0" | "flow_1";
              const sc = scorecards[fid];
              const isWinner = fid === winnerFlowId;

              return (
                <div
                  key={fid}
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    borderLeft: isWinner ? `3px solid ${tokens.green}` : `1px solid ${tokens.border}`,
                    padding: "28px 28px 24px",
                    position: "relative",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {isWinner && (
                    <span
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        backgroundColor: tokens.green,
                        color: "#FFF",
                      }}
                    >
                      Winner ✓
                    </span>
                  )}
                  <p style={{ fontSize: 14, fontWeight: 600, color: tokens.muted, marginBottom: 8 }}>
                    {flow.flow_name}
                  </p>
                  <p
                    style={{
                      fontSize: 44,
                      fontWeight: 800,
                      color: isWinner ? tokens.text : tokens.red,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                      lineHeight: 1.1,
                      marginBottom: 16,
                    }}
                  >
                    {sc.completion_rate_pct}%
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <MiniStat label="Avg Time" value={`${sc.avg_time_to_complete_seconds}s`} />
                    <MiniStat label="Dominant Plan" value={sc.dominant_plan} />
                    <MiniStat label="Avg Trust" value={sc.avg_trust.toFixed(1)} />
                    <MiniStat label="Addon Adoption" value={`${sc.addon_adoption_pct}%`} />
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      padding: "10px 14px",
                      borderRadius: 8,
                      backgroundColor: "#FAF8F5",
                      fontSize: 13,
                      color: tokens.muted,
                    }}
                  >
                    Top drop-off: <strong style={{ color: tokens.text }}>{titleCase(sc.top_drop_off_screen)}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 5.3 Dimension Comparisons (Completion Rate only) ═══ */}
        {filteredDimensions.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: tokens.text,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                marginBottom: 16,
              }}
            >
              Key Dimension
            </h2>
            {filteredDimensions.map((dim) => {
              const v0 = parseFloat(dim.values.flow_0);
              const v1 = parseFloat(dim.values.flow_1);
              const maxVal = Math.max(v0, v1) * 1.15;
              const winnerLabel =
                dim.winner === "flow_0"
                  ? `${flows_compared[0].flow_name} Wins`
                  : `${flows_compared[1].flow_name} Wins`;

              return (
                <div
                  key={dim.dimension}
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    padding: "24px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: tokens.text }}>
                      {dim.dimension}
                    </p>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: tokens.green,
                        color: "#FFF",
                      }}
                    >
                      {winnerLabel}
                    </span>
                  </div>
                  {/* Bars */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                    <BarRow label={flows_compared[0].flow_name} value={dim.values.flow_0} pct={(v0 / maxVal) * 100} color={tokens.green} />
                    <BarRow label={flows_compared[1].flow_name} value={dim.values.flow_1} pct={(v1 / maxVal) * 100} color="#D4B896" />
                  </div>
                  <p style={{ fontSize: 13, color: tokens.muted, lineHeight: 1.6, fontStyle: "italic" }}>
                    {dim.insight}
                  </p>
                </div>
              );
            })}
          </section>
        )}

        {/* ═══ 5.4 Segment Winners ═══ */}
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: tokens.text,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              marginBottom: 16,
            }}
          >
            Segment Winners
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {segment_winners.map((seg) => {
              const winFlow = flows_compared.find((f) => f.flow_id === seg.winner_flow_id);
              const badgeColor = seg.winner_flow_id === "flow_0" ? tokens.green : tokens.orange;
              return (
                <div
                  key={seg.segment}
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    padding: "20px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: tokens.text }}>{seg.segment}</p>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: badgeColor,
                        color: "#FFF",
                        flexShrink: 0,
                      }}
                    >
                      {winFlow?.flow_name ?? seg.winner_flow_id}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: tokens.muted, lineHeight: 1.6 }}>{seg.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 5.5 Where Each Excels ═══ */}
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: tokens.text,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              marginBottom: 16,
            }}
          >
            Where Each Flow Excels
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {flows_compared.map((flow) => {
              const fid = flow.flow_id as "flow_0" | "flow_1";
              const items = where_each_excels[fid];
              return (
                <div
                  key={fid}
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    padding: "24px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 700, color: tokens.text, marginBottom: 14 }}>
                    {flow.flow_name}
                  </p>
                  {items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <span style={{ color: tokens.green, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: 13, color: tokens.text, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 5.5 Where Each Falls Short ═══ */}
        <section style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: tokens.text,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              marginBottom: 16,
            }}
          >
            Where Each Flow Falls Short
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {flows_compared.map((flow) => {
              const fid = flow.flow_id as "flow_0" | "flow_1";
              const items = where_each_falls_short[fid];
              return (
                <div
                  key={fid}
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    padding: "24px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 700, color: tokens.text, marginBottom: 14 }}>
                    {flow.flow_name}
                  </p>
                  {items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                      <span style={{ color: tokens.red, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>↓</span>
                      <p style={{ fontSize: 13, color: tokens.text, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 5.6 Cross-Flow Improvement Opportunities ═══ */}
        {(cross_pollination.flow_0.length > 0 || cross_pollination.flow_1.length > 0) && (
          <section style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: tokens.text,
                fontFamily: "var(--font-plus-jakarta), sans-serif",
                marginBottom: 16,
              }}
            >
              Cross-Flow Improvement Opportunities
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {cross_pollination.flow_0.length > 0 && (
                <div
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    borderLeft: `3px solid ${tokens.orange}`,
                    padding: "24px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 700, color: tokens.text, marginBottom: 14 }}>
                    Improvements for {flows_compared[0].flow_name}{" "}
                    <span style={{ fontWeight: 400, color: tokens.muted }}>(borrow from {flows_compared[1].flow_name})</span>
                  </p>
                  {cross_pollination.flow_0.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <span style={{ color: tokens.orange, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>→</span>
                      <p style={{ fontSize: 13, color: tokens.text, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )}
              {cross_pollination.flow_1.length > 0 && (
                <div
                  style={{
                    background: tokens.card,
                    borderRadius: 14,
                    border: `1px solid ${tokens.border}`,
                    borderLeft: `3px solid ${tokens.orange}`,
                    padding: "24px 28px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 700, color: tokens.text, marginBottom: 14 }}>
                    Improvements for {flows_compared[1].flow_name}{" "}
                    <span style={{ fontWeight: 400, color: tokens.muted }}>(borrow from {flows_compared[0].flow_name})</span>
                  </p>
                  {cross_pollination.flow_1.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      <span style={{ color: tokens.orange, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>→</span>
                      <p style={{ fontSize: 13, color: tokens.text, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ═══ 5.7 Recommendation ═══ */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              background: "#F0F4FF",
              borderRadius: 14,
              borderLeft: `3px solid ${tokens.blue}`,
              padding: "28px 32px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: tokens.blue,
                marginBottom: 10,
              }}
            >
              Recommendation
            </p>
            <p style={{ fontSize: 15, color: tokens.text, lineHeight: 1.7 }}>
              {recommendation}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: "#8A8178", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1814" }}>{value}</p>
    </div>
  );
}

function BarRow({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#8A8178", width: 60, flexShrink: 0, textAlign: "right" }}>
        {label}
      </p>
      <div style={{ flex: 1, backgroundColor: "#F4F1EC", borderRadius: 6, height: 28, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.max(pct, 4)}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 6,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1814", width: 48, flexShrink: 0 }}>{value}</p>
    </div>
  );
}
