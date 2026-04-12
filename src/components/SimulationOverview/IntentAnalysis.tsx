"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import COLORS from "./utils/colorHelpers";
import type { SimulationData, QuestionAnalysis, QuestionPersonaResponse } from "@/types/simulation";

interface Props {
  data: SimulationData;
}

const ACTION_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  PAY_1_RUPEE:           { label: "Pay ₹1 Trial",           color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  PAY_YEARLY:            { label: "Pay ₹999/year",          color: "#059669", bg: "rgba(5, 150, 105, 0.08)" },
  SUBSCRIBE_WEEKLY:      { label: "Subscribe Weekly",       color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  SUBSCRIBE_MONTHLY:     { label: "Subscribe Monthly",      color: "#10B981", bg: "rgba(16, 185, 129, 0.08)" },
  SUBSCRIBE_YEARLY:      { label: "Subscribe Yearly",       color: "#059669", bg: "rgba(5, 150, 105, 0.08)" },
  NOT_NOW_MAYBE_LATER:   { label: "Maybe Later",            color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
  WILL_NOT_PAY:          { label: "Will Not Pay",           color: "#EF4444", bg: "rgba(239, 68, 68, 0.08)" },
};

function getActionMeta(action: string) {
  return ACTION_LABELS[action] ?? { label: action, color: COLORS.textMuted, bg: "rgba(156,163,175,0.08)" };
}

export function IntentAnalysis({ data }: Props) {
  const questions = data.question_analysis;
  if (!questions || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      {questions.map((q) => (
        <QuestionSection key={q.question_id} question={q} />
      ))}
    </motion.div>
  );
}

function QuestionSection({ question: q }: { question: QuestionAnalysis }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const payActions = ["PAY_1_RUPEE", "PAY_YEARLY", "SUBSCRIBE_WEEKLY", "SUBSCRIBE_MONTHLY", "SUBSCRIBE_YEARLY"];
  const actionOrder = [...payActions, "NOT_NOW_MAYBE_LATER", "WILL_NOT_PAY"];
  const sortedActions = actionOrder.filter((a) => a in q.action_distribution);
  // Add any remaining actions not in the predefined order
  for (const a of Object.keys(q.action_distribution)) {
    if (!sortedActions.includes(a)) sortedActions.push(a);
  }

  return (
    <div>
      {/* Header */}
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
        Payment Intent Analysis
      </h2>
      <p
        style={{
          fontSize: 14,
          color: COLORS.textMuted,
          marginBottom: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        {q.question_text}
      </p>

      {/* Top-level metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <MetricCard
          label="Would Pay"
          value={`${q.would_pay_count}`}
          sub={`${q.would_pay_pct}% of ${q.total_responses}`}
          color={COLORS.green}
        />
        <MetricCard
          label="Would Not Pay"
          value={`${q.would_not_pay_count}`}
          sub={`${(100 - q.would_pay_pct).toFixed(1)}%`}
          color={COLORS.red}
        />
        <MetricCard
          label="Avg Willingness"
          value={`${q.avg_willingness_to_pay_score}/10`}
          sub="willingness to pay score"
          color={COLORS.amber}
        />
        <MetricCard
          label="Avg Max Price"
          value={`₹${q.avg_max_monthly_price_inr}`}
          sub="per month"
          color={COLORS.blue}
        />
      </div>

      {/* Action distribution */}
      <div
        style={{
          background: COLORS.bgSurface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            marginBottom: 20,
          }}
        >
          Response Distribution
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sortedActions.map((action) => {
            const group = q.action_distribution[action];
            if (!group) return null;
            const meta = getActionMeta(action);
            const isExpanded = expanded === action;

            return (
              <div key={action}>
                {/* Action bar */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : action)}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: meta.color,
                          background: meta.bg,
                          padding: "3px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {meta.label}
                      </span>
                      <span style={{ fontSize: 13, color: COLORS.textMuted }}>
                        {group.count} persona{group.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: meta.color,
                        fontFamily: "var(--font-plus-jakarta), sans-serif",
                      }}
                    >
                      {group.pct}%
                    </span>
                  </div>

                  {/* Bar */}
                  <div
                    style={{
                      height: 6,
                      background: "#F3F2EF",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(group.pct, 2)}%` }}
                      transition={{ duration: 0.5 }}
                      style={{
                        height: "100%",
                        background: meta.color,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </button>

                {/* Expanded persona cards */}
                {isExpanded && group.personas.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      marginTop: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      paddingLeft: 16,
                      borderLeft: `2px solid ${meta.color}20`,
                    }}
                  >
                    {group.personas.map((p, i) => (
                      <PersonaCard key={i} persona={p} actionColor={meta.color} />
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Top reasons against paying */}
      {q.top_reasons_against.length > 0 && (
        <div
          style={{
            background: COLORS.bgSurface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "24px 28px",
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              marginBottom: 16,
            }}
          >
            Top Barriers to Conversion
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.top_reasons_against.slice(0, 8).map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    fontFamily: "var(--font-inter), sans-serif",
                    flex: 1,
                  }}
                >
                  {r.reason}
                </p>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.red,
                    background: "rgba(239,68,68,0.08)",
                    padding: "2px 8px",
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                >
                  {r.frequency}x
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: COLORS.textMuted,
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 28,
          fontWeight: 800,
          color,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
        {sub}
      </p>
    </div>
  );
}

function PersonaCard({
  persona: p,
  actionColor,
}: {
  persona: QuestionPersonaResponse;
  actionColor: string;
}) {
  return (
    <div
      style={{
        background: COLORS.bgElevated,
        borderRadius: 10,
        padding: "12px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          {p.age}yo {p.occupation}, {p.zone}
        </span>
        <span
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          ₹{(p.income || 0).toLocaleString()}/mo
        </span>
        {p.completed_flow && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: COLORS.green,
              background: "rgba(16,185,129,0.08)",
              padding: "1px 6px",
              borderRadius: 4,
            }}
          >
            Completed
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 13,
          fontStyle: "italic",
          color: COLORS.textSecondary,
          lineHeight: 1.5,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        &ldquo;{p.reasoning}&rdquo;
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>
          WTP: <b style={{ color: actionColor }}>{p.willingness_to_pay_score}/10</b>
        </span>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>
          Max: <b>₹{p.max_monthly_price_inr}/mo</b>
        </span>
      </div>
    </div>
  );
}
