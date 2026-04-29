"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, SegmentCompletionEntry } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function SegmentScorecard({ data }: Props) {
  let entries: SegmentCompletionEntry[] =
    data.segment_completion_summary ?? [];

  // Fallback: compute from segment_screen_breakdown + persona_details if summary not available
  if (entries.length === 0 && data.segments_used && data.persona_details) {
    const segKey =
      (data.segments_used?.length ?? 0) >= 2
        ? "behavioral_archetype"
        : "purchasing_power_tier";
    const segMap: Record<
      string,
      { total: number; completed: number; dropped: number; dropScreens: string[] }
    > = {};

    for (const pd of data.persona_details) {
      const seg =
        (pd.demographics?.[segKey] as string) ?? "Unknown";
      if (!segMap[seg])
        segMap[seg] = { total: 0, completed: 0, dropped: 0, dropScreens: [] };
      segMap[seg].total++;
      if (pd.outcome === "completed") {
        segMap[seg].completed++;
      } else {
        segMap[seg].dropped++;
        const screen = pd.outcome?.replace("dropped_off_at_", "") ?? "";
        if (screen) segMap[seg].dropScreens.push(screen);
      }
    }

    // Build cluster reason lookup
    const clusterReasons: Record<string, string> = {};
    const screens = data.drop_off_analysis?.screens ?? {};
    for (const [sid, sdata] of Object.entries(screens)) {
      const clusters = sdata.clusters ?? [];
      const valid = clusters.filter(
        (c) => c.cluster_id == null || c.cluster_id !== -1
      );
      if (valid.length > 0) {
        const top = valid.reduce((a, b) =>
          (a.persona_count ?? 0) >= (b.persona_count ?? 0) ? a : b
        );
        clusterReasons[sid] = top.label ?? "";
      }
    }

    entries = Object.entries(segMap)
      .map(([seg, s]) => {
        const topScreen = s.dropScreens.length > 0
          ? s.dropScreens
              .sort(
                (a, b) =>
                  s.dropScreens.filter((x) => x === b).length -
                  s.dropScreens.filter((x) => x === a).length
              )[0]
          : "";
        return {
          segment: seg,
          total: s.total,
          completed: s.completed,
          dropped: s.dropped,
          completion_pct:
            s.total > 0 ? Math.round((s.completed / s.total) * 1000) / 10 : 0,
          top_drop_off_screen: topScreen,
          top_drop_off_reason: clusterReasons[topScreen] ?? "",
        };
      })
      .sort((a, b) => a.completion_pct - b.completion_pct);
  }

  if (entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
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
        Who Converts, Who Doesn&apos;t
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        Per-segment completion rates, sorted by biggest opportunity first
      </p>

      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {entries.map((entry, i) => {
          const color = completionColor(entry.completion_pct);
          const isBlocked = entry.completion_pct === 0 && entry.total > 0;

          return (
            <motion.div
              key={entry.segment}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 200px auto",
                alignItems: "center",
                gap: 16,
                padding: "18px 24px",
                borderBottom:
                  i < entries.length - 1
                    ? `1px solid ${COLORS.border}`
                    : "none",
                ...(isBlocked
                  ? { background: "rgba(239, 68, 68, 0.04)" }
                  : {}),
              }}
              className="sim-scorecard-row"
            >
              {/* Left: segment name + why */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: entry.top_drop_off_reason ? 6 : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {entry.segment}
                  </p>
                  <span
                    style={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                      flexShrink: 0,
                    }}
                  >
                    {entry.completed}/{entry.total}
                  </span>
                </div>

                {/* The WHY — top drop-off reason */}
                {entry.top_drop_off_reason && (
                  <p
                    style={{
                      fontSize: 13,
                      color: COLORS.textSecondary,
                      lineHeight: 1.4,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {entry.top_drop_off_screen && (
                      <span style={{ color: COLORS.textMuted }}>
                        {formatScreenId(entry.top_drop_off_screen)}:{" "}
                      </span>
                    )}
                    {entry.top_drop_off_reason}
                  </p>
                )}

                {/* Blocked state for 0% segments */}
                {isBlocked && !entry.top_drop_off_reason && (
                  <p
                    style={{
                      fontSize: 13,
                      color: COLORS.red,
                      fontWeight: 500,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {entry.top_drop_off_screen
                      ? `Blocked at ${formatScreenId(entry.top_drop_off_screen)}`
                      : "All users dropped off"}
                  </p>
                )}
              </div>

              {/* Middle: completion bar */}
              <div>
                <div
                  style={{
                    height: 8,
                    background: "#F3F2EF",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.max(entry.completion_pct, isBlocked ? 0 : 3)}%`,
                    }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.04 }}
                    style={{
                      height: "100%",
                      background: color,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>

              {/* Right: percentage */}
              <div style={{ width: 64, textAlign: "right" }}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: isBlocked ? COLORS.red : color,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {isBlocked ? (
                    <span style={{ fontSize: 14, fontWeight: 700 }}>
                      BLOCKED
                    </span>
                  ) : (
                    `${entry.completion_pct}%`
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
