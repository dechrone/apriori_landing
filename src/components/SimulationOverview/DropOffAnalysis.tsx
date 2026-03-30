"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { priorityColor, priorityBg } from "./utils/colorHelpers";
import { formatScreenId } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";
import { ChevronDown } from "lucide-react";

interface Props {
  data: SimulationData;
}

export function DropOffAnalysis({ data }: Props) {
  const fixing = data.flow_assessment?.what_needs_fixing ?? [];
  const dropOff = data.drop_off_analysis;
  const screens = dropOff?.screens ?? {};
  const hasFixes = fixing.length > 0;
  const hasScreens = Object.keys(screens).length > 0;

  if (!hasFixes && !hasScreens) return null;

  const sortedFixes = [...fixing].sort((a, b) => {
    const order: Record<string, number> = { P0: 0, P1: 1, P2: 2 };
    return (order[a.priority] ?? 3) - (order[b.priority] ?? 3);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
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
        Drop-Off Analysis
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            hasFixes && hasScreens ? "1.5fr 1fr" : "1fr",
          gap: 20,
        }}
        className="sim-dropoff-grid"
      >
        {/* Left — What's Broken */}
        {hasFixes && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.textMuted,
                marginBottom: 4,
              }}
            >
              What&apos;s Broken
            </p>
            {sortedFixes.map((item, i) => (
              <FixCard key={i} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Right — Drop-Off Evidence */}
        {hasScreens && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.textMuted,
                marginBottom: 4,
              }}
            >
              Drop-Off Evidence
            </p>
            {Object.entries(screens).map(([sid, info]) => (
              <div
                key={sid}
                style={{
                  background: COLORS.bgSurface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                      fontFamily: "var(--font-plus-jakarta), sans-serif",
                    }}
                  >
                    {formatScreenId(sid)}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: COLORS.red,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    {info.total_drop_offs} drop-off{info.total_drop_offs !== 1 ? "s" : ""}
                  </span>
                </div>

                {info.clusters?.map((cluster, ci) => (
                  <div key={ci} style={{ marginBottom: ci < info.clusters.length - 1 ? 12 : 0 }}>
                    {cluster.label && (
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: COLORS.textMuted,
                          marginBottom: 6,
                        }}
                      >
                        {cluster.label}
                        {cluster.persona_count > 0 && (
                          <span style={{ fontWeight: 400, marginLeft: 6 }}>
                            ({cluster.persona_count})
                          </span>
                        )}
                      </p>
                    )}
                    {cluster.representative_reasoning && (
                      <p
                        style={{
                          fontSize: 14,
                          fontStyle: "italic",
                          color: COLORS.textSecondary,
                          lineHeight: 1.6,
                          paddingLeft: 12,
                          borderLeft: `2px solid ${COLORS.border}`,
                          marginBottom: 8,
                          fontFamily: "var(--font-inter), sans-serif",
                        }}
                      >
                        &ldquo;{cluster.representative_reasoning}&rdquo;
                      </p>
                    )}
                  </div>
                ))}

                {(!info.clusters || info.clusters.length === 0) && (
                  <p
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      color: COLORS.textMuted,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    No cluster details available
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FixCard({
  item,
  index,
}: {
  item: { element: string; problem: string; for_whom: string; fix: string; priority: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const pColor = priorityColor(item.priority);
  const pBg = priorityBg(item.priority);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.35 + index * 0.06 }}
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      className="sim-card-hover"
      onClick={() => setOpen(!open)}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        {/* Priority badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: pColor,
            background: pBg,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: pColor,
              display: "inline-block",
            }}
          />
          {item.priority}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ marginLeft: "auto" }}
        >
          <ChevronDown size={16} color={COLORS.textMuted} />
        </motion.div>
      </div>

      {/* Element title */}
      {item.element && (
        <p
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            marginBottom: 6,
          }}
        >
          {item.element}
        </p>
      )}

      {/* Problem text */}
      {item.problem && (
        <p
          style={{
            fontSize: 15,
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {item.problem}
        </p>
      )}

      {/* Affects chip */}
      {item.for_whom && (
        <span
          style={{
            display: "inline-block",
            marginTop: 10,
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textMuted,
            background: COLORS.bgElevated,
            padding: "4px 10px",
            borderRadius: 6,
          }}
        >
          Affects: {item.for_whom}
        </span>
      )}

      {/* Expanded fix content */}
      <AnimatePresence>
        {open && item.fix && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: COLORS.bgElevated,
                borderRadius: 10,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: COLORS.green,
                  marginBottom: 8,
                }}
              >
                Recommended Fix
              </p>
              <p
                style={{
                  fontSize: 15,
                  color: COLORS.textPrimary,
                  lineHeight: 1.6,
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              >
                {item.fix}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
