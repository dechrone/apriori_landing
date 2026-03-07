"use client";

import { useState, useEffect } from "react";
import type { JourneyNode } from "@/types/deepDive";
import {
  getScreenShortLabel,
  getNodeEmotionColor,
} from "@/utils/deepDiveHelpers";
import { PersonaScreenCard } from "./PersonaScreenCard";

interface Props {
  nodes: JourneyNode[];
  personaUuid: string;
}

export function JourneyTimeline({ nodes, personaUuid }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Auto-expand drop-off node on mount
  useEffect(() => {
    const dropNode = nodes.find((n) => n.outcome === "DROP_OFF");
    setExpandedId(dropNode ? dropNode.screenId : null);
  }, [personaUuid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = (screenId: string) => {
    setExpandedId((prev) => (prev === screenId ? null : screenId));
  };

  return (
    <div>
      {/* ── Timeline row ── */}
      <div className="flex items-start" style={{ padding: "0 8px" }}>
        {nodes.map((node, i) => {
          const isDropOff = node.outcome === "DROP_OFF";
          const isExpanded = expandedId === node.screenId;

          const shortLabel = getScreenShortLabel(node.screenLabel);

          // Truncate emotion to 12 chars
          const topEmotion =
            node.topEmotion.length > 12
              ? node.topEmotion.slice(0, 12).trim() + "…"
              : node.topEmotion;
          const emotionColor = getNodeEmotionColor(node.topEmotion);

          return (
            <div key={node.screenId} className="flex items-start flex-1">
              {/* Node column */}
              <div
                className="flex flex-col items-center text-center"
                style={{ minWidth: 64, maxWidth: 80 }}
              >
                {/* Dot — 28px */}
                <button
                  type="button"
                  onClick={() => handleToggle(node.screenId)}
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-semibold text-white transition-transform cursor-pointer ${
                    isDropOff ? "bg-red-500" : "bg-slate-700"
                  } ${isExpanded ? "ring-2 ring-offset-2 ring-slate-400 scale-110" : ""}`}
                >
                  {isDropOff ? "✕" : i + 1}
                </button>

                {/* Screen short label */}
                <span className="text-[11px] font-semibold text-slate-600 mt-1.5 truncate max-w-[80px]">
                  {shortLabel}
                </span>

                {/* Top emotion — plain text, no pill */}
                <span
                  className={`text-[10px] mt-0.5 ${emotionColor}`}
                >
                  {topEmotion}
                </span>
              </div>

              {/* Connecting line — 1px, centered with dot */}
              {i < nodes.length - 1 && (
                <div
                  className="flex-1 h-px"
                  style={{
                    marginTop: 14, // center with 28px dot
                    backgroundColor:
                      nodes[i + 1]?.outcome === "DROP_OFF"
                        ? "#FECACA" // red-200
                        : "#E2E8F0", // slate-200
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Expanded panel / empty hint ── */}
      {expandedId ? (
        <div className="mt-4">
          {nodes
            .filter((n) => n.screenId === expandedId)
            .map((n) => (
              <PersonaScreenCard key={n.screenId} monologue={n.monologue} />
            ))}
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <svg
            className="w-4 h-4 text-blue-400 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4l7 18 3-7 7-3z" />
          </svg>
          <p className="text-[13px] text-blue-500">
            Click on journey steps above to view details for that screen
          </p>
        </div>
      )}
    </div>
  );
}
