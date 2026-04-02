"use client";

import { motion } from "framer-motion";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

export function ClusteredDropOffs({ data }: Props) {
  const screens = data.drop_off_analysis?.screens ?? {};
  const screenIds = Object.keys(screens);
  if (screenIds.length === 0) return null;

  const getDropCount = (s: (typeof screens)[string]) =>
    s?.total_drop_offs ?? s?.drop_off_count ?? 0;

  const sortedScreens = [...screenIds].sort(
    (a, b) => getDropCount(screens[b]) - getDropCount(screens[a])
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
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
        Clustered Drop-Off Reasons
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        Root causes at each drop-off point — clustered from persona reasonings
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sortedScreens.map((screenId, si) => {
          const totalDropOffs = getDropCount(screens[screenId]);
          const clusters = (screens[screenId].clusters ?? []).filter(
            (c) => c.cluster_id == null || c.cluster_id !== -1
          );
          if (clusters.length === 0) return null;

          return (
            <motion.div
              key={screenId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + si * 0.06 }}
              style={{
                background: COLORS.bgSurface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                  }}
                >
                  {formatScreenId(screenId)}
                </p>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.red,
                    background: "rgba(239,68,68,0.08)",
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}
                >
                  {totalDropOffs} drop-off{totalDropOffs !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Cluster items — all expanded, no clicks */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {clusters.map((cluster, ci) => {
                  const pCount = cluster.persona_count ?? 0;
                  const pct =
                    totalDropOffs > 0 && pCount > 0
                      ? Math.round((pCount / totalDropOffs) * 100)
                      : 0;

                  return (
                    <div key={ci}>
                      {/* Label + percentage + bar */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: COLORS.textPrimary,
                            fontFamily: "var(--font-inter), sans-serif",
                            flex: 1,
                          }}
                        >
                          {cluster.label || `Cluster ${cluster.cluster_id ?? ci}`}
                        </p>
                        <p
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color:
                              pct >= 40
                                ? COLORS.red
                                : pct >= 20
                                  ? COLORS.amber
                                  : COLORS.textPrimary,
                            fontFamily:
                              "var(--font-plus-jakarta), sans-serif",
                            marginLeft: 16,
                            flexShrink: 0,
                          }}
                        >
                          {pct}%
                        </p>
                      </div>

                      {/* Bar */}
                      <div
                        style={{
                          height: 6,
                          background: "#F3F2EF",
                          borderRadius: 3,
                          overflow: "hidden",
                          marginBottom: 10,
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.max(pct, 4)}%`,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.35 + si * 0.06,
                          }}
                          style={{
                            height: "100%",
                            background:
                              pct >= 40
                                ? COLORS.red
                                : pct >= 20
                                  ? COLORS.amber
                                  : COLORS.blue,
                            borderRadius: 3,
                          }}
                        />
                      </div>

                      {/* Representative reasoning — always shown */}
                      {cluster.representative_reasoning && (
                        <p
                          style={{
                            fontSize: 14,
                            fontStyle: "italic",
                            color: COLORS.textSecondary,
                            lineHeight: 1.6,
                            paddingLeft: 14,
                            borderLeft: `2px solid ${COLORS.border}`,
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          &ldquo;{cluster.representative_reasoning}&rdquo;
                        </p>
                      )}

                      {/* Sample reasonings if no representative */}
                      {!cluster.representative_reasoning &&
                        cluster.sample_reasonings &&
                        cluster.sample_reasonings.length > 0 && (
                          <p
                            style={{
                              fontSize: 14,
                              fontStyle: "italic",
                              color: COLORS.textSecondary,
                              lineHeight: 1.6,
                              paddingLeft: 14,
                              borderLeft: `2px solid ${COLORS.border}`,
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            &ldquo;{cluster.sample_reasonings[0]}&rdquo;
                          </p>
                        )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
