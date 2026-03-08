"use client";

import { motion } from "framer-motion";
import { completionColor } from "./utils/colorHelpers";
import { formatPct } from "./utils/formatters";
import COLORS from "./utils/colorHelpers";
import type { SimulationData } from "@/types/simulation";
import { useState } from "react";

interface Props {
  data: SimulationData;
}

export function VerdictBanner({ data }: Props) {
  const [expanded, setExpanded] = useState(false);
  const verdict =
    data.flow_assessment?.overall_verdict ||
    "Simulation complete. Review metrics below.";
  const pct = data.summary.completion_rate_pct;
  const color = completionColor(pct);

  const isLong = verdict.length > 280;
  const displayText =
    !expanded && isLong ? verdict.slice(0, 280).trimEnd() + "…" : verdict;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      style={{
        background: COLORS.bgSurface,
        borderLeft: `4px solid ${color}`,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        borderLeftWidth: 4,
        borderLeftColor: color,
        padding: 28,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 24,
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Left — Verdict */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: color,
            background: `${color}18`,
            padding: "4px 10px",
            borderRadius: 6,
            marginBottom: 14,
          }}
        >
          Simulation Verdict
        </span>
        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.textPrimary,
            lineHeight: 1.6,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {displayText}
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none",
                border: "none",
                color: color,
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 6,
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Right — Completion % */}
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <p
          style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: color,
            lineHeight: 1,
            fontFamily: "var(--font-plus-jakarta), sans-serif",
          }}
        >
          {formatPct(pct)}
        </p>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: COLORS.textSecondary,
            marginTop: 6,
          }}
        >
          Completion Rate
        </p>
      </div>
    </motion.div>
  );
}
