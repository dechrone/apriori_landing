"use client";

import type { ScreenSummary } from "@/types/deepDive";
import { ScoreBar } from "./ScoreBar";

interface Props {
  summaries: ScreenSummary[];
  activeScreenId: string;
  onSelect: (screenId: string) => void;
}

export function ScreenNavigator({
  summaries,
  activeScreenId,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {summaries.map((s) => {
        const active = s.screenId === activeScreenId;
        const drops = s.dropOffCount;
        const borderColor =
          drops >= 2
            ? "border-red-400"
            : drops === 1
              ? "border-amber-400"
              : "border-transparent";
        const badgeBg =
          drops >= 2
            ? "bg-red-50"
            : drops === 1
              ? "bg-amber-50"
              : "";
        const badgeText =
          drops >= 2
            ? "text-red-600"
            : drops === 1
              ? "text-amber-600"
              : "";
        const badgeBorder =
          drops >= 2
            ? "border border-red-200"
            : drops === 1
              ? "border border-amber-200"
              : "";

        return (
          <button
            key={s.screenId}
            type="button"
            onClick={() => onSelect(s.screenId)}
            className={`w-full text-left rounded-lg transition-colors border-l-2 ${borderColor}`}
            style={{
              padding: "10px 12px",
              backgroundColor: active ? "#FFFFFF" : "transparent",
              boxShadow: active
                ? "0 1px 3px rgba(0,0,0,0.08)"
                : "none",
              cursor: "pointer",
              border: "none",
              borderLeft: drops >= 2
                ? "2px solid var(--dd-friction-trust)"
                : drops === 1
                  ? "2px solid var(--dd-score-mid)"
                  : "2px solid transparent",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#0F172A" : "#475569",
                }}
              >
                {s.screenLabel}
              </span>

              {drops > 0 && (
                <span
                  className={`inline-flex items-center ${badgeBg} ${badgeText} ${badgeBorder}`}
                  style={{
                    padding: "2px 8px",
                    borderRadius: 100,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  −{drops}
                </span>
              )}
            </div>

            {/* Micro score bars — only when NOT active */}
            {!active && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1" style={{ width: "45%" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#94A3B8",
                      minWidth: 10,
                    }}
                  >
                    T
                  </span>
                  <div style={{ flex: 1 }}>
                    <ScoreBar label="" score={s.avgTrust} compact />
                  </div>
                </div>
                <div className="flex items-center gap-1" style={{ width: "45%" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#94A3B8",
                      minWidth: 10,
                    }}
                  >
                    C
                  </span>
                  <div style={{ flex: 1 }}>
                    <ScoreBar label="" score={s.avgClarity} compact />
                  </div>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
