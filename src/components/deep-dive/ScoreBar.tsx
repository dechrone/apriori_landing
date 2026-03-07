"use client";

import { getScoreLevel, SCORE_STYLES } from "@/utils/deepDiveHelpers";

interface Props {
  label: string;
  score: number;
  avgScore?: number;
  compact?: boolean;
}

export function ScoreBar({ label, score, avgScore, compact = false }: Props) {
  const level = getScoreLevel(score);
  const style = SCORE_STYLES[level];
  const pct = Math.min(10, Math.max(0, score)) * 10;

  if (compact) {
    return (
      <div
        className="rounded-full"
        style={{
          height: 4,
          width: "100%",
          backgroundColor: "#F1F5F9",
          overflow: "hidden",
        }}
      >
        <div
          className={`${style.bar} rounded-full`}
          style={{
            height: "100%",
            width: `${pct}%`,
            transition: "width 500ms ease-out",
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex justify-between items-center mb-1">
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#94A3B8",
          }}
        >
          {label}
        </span>
        <span
          className={`${style.text} tabular-nums`}
          style={{ fontSize: 12, fontWeight: 700 }}
        >
          {score}/10 · {style.label}
        </span>
      </div>

      {/* Bar track */}
      <div
        className="relative rounded-full"
        style={{
          height: 8,
          backgroundColor: "#F1F5F9",
          overflow: "visible",
        }}
      >
        {/* Fill */}
        <div
          className={`${style.bar} rounded-full`}
          style={{
            height: "100%",
            width: `${pct}%`,
            transition: "width 500ms ease-out",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Avg marker */}
        {avgScore !== undefined && (
          <div
            className="absolute top-0"
            style={{
              left: `${Math.min(10, Math.max(0, avgScore)) * 10}%`,
              height: "100%",
              width: 0,
              borderLeft: "2px dashed #94A3B8",
              zIndex: 2,
            }}
            title={`Avg: ${avgScore.toFixed(1)}`}
          />
        )}
      </div>

      {/* Avg label */}
      {avgScore !== undefined && (
        <p
          style={{
            fontSize: 10,
            color: "#94A3B8",
            marginTop: 2,
            textAlign: "right",
          }}
        >
          Avg. across personas: {avgScore.toFixed(1)}
        </p>
      )}
    </div>
  );
}
