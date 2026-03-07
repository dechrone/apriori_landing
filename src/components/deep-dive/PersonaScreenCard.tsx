"use client";

import type { ScreenMonologue } from "@/types/flow-analysis";
import type { FrictionCategory } from "@/types/deepDive";
import {
  getScoreLevel,
  SCORE_STYLES,
  categorizeFriction,
  FRICTION_CONFIG,
} from "@/utils/deepDiveHelpers";

interface Props {
  monologue: ScreenMonologue;
  missingElement?: string;
  /** @deprecated No longer used — kept for backward compat */
  defaultCollapsed?: boolean;
}

/** Split emotional_state CSV into array, max 3 */
function parseEmotions(raw: string): string[] {
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .slice(0, 3);
}

/** Emotion pill color — only the first (primary) emotion gets color */
function getEmotionStyle(emotion: string, isPrimary: boolean): string {
  if (!isPrimary) return "bg-slate-100 text-slate-500";
  const e = emotion.toLowerCase();
  if (
    ["anxious", "terrified", "overwhelmed", "alarmed"].some((k) =>
      e.includes(k),
    )
  )
    return "bg-red-50 text-red-600";
  if (["cautious", "suspicious", "hesitant"].some((k) => e.includes(k)))
    return "bg-amber-50 text-amber-700";
  return "bg-slate-100 text-slate-600";
}

export function PersonaScreenCard({ monologue, missingElement }: Props) {
  const {
    view_name,
    internal_monologue,
    reasoning,
    emotional_state,
    trust_score,
    clarity_score,
    decision_outcome,
    friction_points,
  } = monologue;

  const emotions = parseEmotions(emotional_state);

  // Group friction by category
  const grouped = friction_points.reduce(
    (acc, point) => {
      const cat = categorizeFriction(point);
      if (!acc[cat]) acc[cat] = [];
      acc[cat]!.push(point);
      return acc;
    },
    {} as Partial<Record<FrictionCategory, string[]>>,
  );

  const trustLevel = getScoreLevel(trust_score);
  const clarityLevel = getScoreLevel(clarity_score);

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* ── Section 1: Header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug">
          {view_name.replace(/\s*\(Step.*\)/, "")}
        </h3>
        {decision_outcome === "CONTINUE" ? (
          <span className="text-xs font-medium text-green-600 flex-shrink-0 ml-3">
            Continued →
          </span>
        ) : (
          <span className="text-xs font-medium text-red-500 flex-shrink-0 ml-3">
            Dropped off ✕
          </span>
        )}
      </div>

      {/* ── Section 2: Voice ── */}
      <div className="px-4 py-3 border-b border-slate-100">
        {/* WHAT THEY FELT */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
          What they felt
        </p>
        <blockquote className="border-l-2 border-slate-300 pl-3 text-[15px] italic text-slate-700 leading-relaxed mb-4">
          &ldquo;{internal_monologue}&rdquo;
        </blockquote>

        {/* WHY THEY DECIDED */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
          Why they decided
        </p>
        <p className="text-[15px] text-slate-600 leading-relaxed">
          {reasoning}
        </p>

        {/* Emotion pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {emotions.map((emotion, i) => (
            <span
              key={emotion}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getEmotionStyle(emotion, i === 0)}`}
            >
              {emotion}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section 3: Signals ── */}
      <div className="grid grid-cols-2 gap-4 px-4 py-3 border-b border-slate-100">
        {/* Trust */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Trust
            </span>
            <span
              className={`text-xs font-medium ${SCORE_STYLES[trustLevel].text}`}
            >
              {trust_score}/10 · {SCORE_STYLES[trustLevel].label}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${SCORE_STYLES[trustLevel].bar}`}
              style={{ width: `${(trust_score / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Clarity */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Clarity
            </span>
            <span
              className={`text-xs font-medium ${SCORE_STYLES[clarityLevel].text}`}
            >
              {clarity_score}/10 · {SCORE_STYLES[clarityLevel].label}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${SCORE_STYLES[clarityLevel].bar}`}
              style={{ width: `${(clarity_score / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Section 4: Friction ── */}
      {friction_points.length > 0 && (
        <div className="px-4 pt-3 pb-4">
          {(["trust", "clarity", "ux"] as FrictionCategory[]).map(
            (cat, catIndex) => {
              const points = grouped[cat];
              if (!points?.length) return null;
              const cfg = FRICTION_CONFIG[cat];

              return (
                <div key={cat} className={catIndex > 0 ? "mt-4" : ""}>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                    {cfg.icon}&ensp;{cfg.label}
                  </p>
                  <ul>
                    {points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 py-2 border-b border-slate-100 last:border-0"
                      >
                        {/* Thin color indicator line */}
                        <span
                          className={`mt-1 w-0.5 h-4 rounded-full flex-shrink-0 ${
                            cat === "trust"
                              ? "bg-red-400"
                              : cat === "clarity"
                                ? "bg-amber-400"
                                : "bg-blue-400"
                          }`}
                        />
                        <span className="text-[14px] text-slate-700 leading-snug">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )}

          {/* Missing element */}
          {missingElement && (
            <div className="mt-4 rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                💡&ensp;What would have helped
              </p>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {missingElement}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
