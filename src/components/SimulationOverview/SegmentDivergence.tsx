"use client";

import { motion } from "framer-motion";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

/** Segment color palette — distinct, accessible */
const SEGMENT_COLORS = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EF4444", // red
  "#F59E0B", // amber
  "#10B981", // green
  "#EC4899", // pink
];

function barColor(pct: number): string {
  if (pct <= 0) return "#E5E7EB";
  if (pct < 15) return "#10B981";
  if (pct < 40) return "#F59E0B";
  return "#EF4444";
}

export function SegmentDivergence({ data }: Props) {
  const breakdown = data.segment_screen_breakdown;
  const segments = data.segments_used;

  if (!breakdown || !segments || segments.length === 0) return null;

  const screenIds = Object.keys(breakdown);
  if (screenIds.length === 0) return null;

  // Find screens with actual divergence (spread > 0)
  type ScreenDivergence = {
    sid: string;
    spread: number;
    segmentPcts: Record<string, number>;
    highSegment: string;
    highPct: number;
    lowSegment: string;
    lowPct: number;
  };

  const divergences: ScreenDivergence[] = [];
  for (const sid of screenIds) {
    const segData = breakdown[sid];
    const segmentPcts: Record<string, number> = {};
    let max = -1,
      min = 101,
      highSeg = "",
      lowSeg = "";
    for (const s of segments) {
      const pct = segData[s]?.drop_off_pct ?? 0;
      segmentPcts[s] = pct;
      if (pct > max) {
        max = pct;
        highSeg = s;
      }
      if (pct < min) {
        min = pct;
        lowSeg = s;
      }
    }
    const spread = max - min;
    if (spread > 0 || max > 0) {
      divergences.push({
        sid,
        spread,
        segmentPcts,
        highSegment: highSeg,
        highPct: max,
        lowSegment: lowSeg,
        lowPct: min,
      });
    }
  }

  // Sort by spread descending — worst divergences first
  divergences.sort((a, b) => b.spread - a.spread);

  // The headline divergence
  const worst = divergences[0];
  if (!worst) return null;

  // Assign colors to segments
  const segColorMap: Record<string, string> = {};
  segments.forEach((s, i) => {
    segColorMap[s] = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: COLORS.textPrimary,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          marginBottom: 8,
        }}
      >
        Segment Divergence
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        The same screen, dramatically different outcomes — this is what
        aggregate metrics hide
      </p>

      {/* Headline insight card */}
      {worst.spread >= 15 && (
        <div
          style={{
            background: "#1A1814",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#EF4444",
                animation: "pulse 2s infinite",
              }}
            />
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#EF4444",
              }}
            >
              Critical Divergence
            </p>
          </div>

          <p
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.6,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            At{" "}
            <strong style={{ color: "#F59E0B" }}>
              {formatScreenId(worst.sid)}
            </strong>
            , <strong style={{ color: "#EF4444" }}>{worst.highSegment}</strong>{" "}
            users drop off at{" "}
            <strong style={{ color: "#EF4444" }}>{worst.highPct}%</strong> while{" "}
            <strong style={{ color: "#10B981" }}>{worst.lowSegment}</strong>{" "}
            users drop off at just{" "}
            <strong style={{ color: "#10B981" }}>{worst.lowPct}%</strong>.
            That&apos;s a{" "}
            <strong style={{ color: "#FFFFFF" }}>
              {Math.round(worst.spread)}pp gap
            </strong>{" "}
            on the same screen.
          </p>
        </div>
      )}

      {/* Segment legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {segments.map((seg) => (
          <div
            key={seg}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: segColorMap[seg],
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: COLORS.textSecondary,
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {seg}
            </p>
          </div>
        ))}
      </div>

      {/* Per-screen divergence bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {divergences.map((d, di) => {
          const hasDivergence = d.spread > 0;
          return (
            <motion.div
              key={d.sid}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + di * 0.05 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${hasDivergence && d.spread >= 50 ? "rgba(239,68,68,0.3)" : COLORS.border}`,
                borderRadius: 14,
                padding: "18px 24px",
                ...(d.spread >= 50
                  ? { boxShadow: "0 0 0 1px rgba(239,68,68,0.1)" }
                  : {}),
              }}
            >
              {/* Screen name + aggregate */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {formatScreenId(d.sid)}
                </p>
                {hasDivergence && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color:
                        d.spread >= 50
                          ? COLORS.red
                          : d.spread >= 20
                            ? COLORS.amber
                            : COLORS.textMuted,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {Math.round(d.spread)}pp spread
                  </span>
                )}
              </div>

              {/* Segment bars */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {segments.map((seg) => {
                  const pct = d.segmentPcts[seg] ?? 0;
                  const reached = breakdown[d.sid]?.[seg]?.reached ?? 0;
                  if (reached === 0) return null;

                  return (
                    <div
                      key={seg}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "140px 1fr 60px",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {/* Segment label */}
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: COLORS.textSecondary,
                          fontFamily: "var(--font-inter), sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {seg}
                      </p>

                      {/* Bar */}
                      <div
                        style={{
                          height: 20,
                          background: "#F3F2EF",
                          borderRadius: 4,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: pct > 0 ? `${Math.max(pct, 4)}%` : "0%",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + di * 0.05,
                          }}
                          style={{
                            height: "100%",
                            background: barColor(pct),
                            borderRadius: 4,
                          }}
                        />
                      </div>

                      {/* Value */}
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            pct === 0
                              ? COLORS.green
                              : pct >= 50
                                ? COLORS.red
                                : COLORS.textPrimary,
                          textAlign: "right",
                          fontFamily: "var(--font-plus-jakarta), sans-serif",
                        }}
                      >
                        {pct > 0 ? `${pct}%` : "0%"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Screens with no divergence — collapsed */}
        {screenIds.filter((sid) => !divergences.find((d) => d.sid === sid))
          .length > 0 && (
          <p
            style={{
              fontSize: 13,
              color: COLORS.textMuted,
              fontStyle: "italic",
              marginTop: 4,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {
              screenIds.filter(
                (sid) => !divergences.find((d) => d.sid === sid)
              ).length
            }{" "}
            screen(s) with no drop-offs omitted
          </p>
        )}
      </div>
    </motion.div>
  );
}
