"use client";

import type { SimulationOverviewProps } from "@/types/simulation";
import { ExecutiveVerdict } from "./ExecutiveVerdict";
import { SegmentScorecard } from "./SegmentScorecard";
import { FlowFunnel } from "./FlowFunnel";
import { SegmentDivergence } from "./SegmentDivergence";
import { PersonaMonologues } from "./PersonaMonologues";
import { ClusteredDropOffs } from "./ClusteredDropOffs";
import { FixRecommendations } from "./FixRecommendations";
import { CalibrationAppendix } from "./CalibrationAppendix";
import { IntentAnalysis } from "./IntentAnalysis";
import { SkeletonLoader } from "./SkeletonLoader";
import COLORS from "./utils/colorHelpers";

/**
 * SimulationOverview — Decision-ready report
 *
 * 6 core sections answering: What's happening? Why? What do I do?
 *   1. Executive Verdict — the forwarding-ready summary
 *   2. Flow Funnel — screen-by-screen conversion rates
 *   3. Segment Divergence — where populations split (the differentiator)
 *   4. Persona Monologues — actual voices at drop-off points
 *   5. Clustered Drop-Off Reasons — root causes with percentages
 *   6. Fix Recommendations — ranked by impact x feasibility
 *   + Calibration Appendix (conditional, when real-world baseline available)
 */
export function SimulationOverview({
  simulationData,
  isLoading,
  error,
}: SimulationOverviewProps) {
  /* ── Loading state ── */
  if (isLoading) {
    return <SkeletonLoader />;
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div
        style={{
          background: COLORS.bgBase,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            background: COLORS.bgSurface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: 40,
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 48, marginBottom: 16 }}>!</p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.textPrimary,
              marginBottom: 8,
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Something went wrong
          </p>
          <p
            style={{
              fontSize: 15,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  /* ── Data state ── */
  const d = simulationData;

  return (
    <div
      style={{
        background: COLORS.bgBase,
        minHeight: "100vh",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 24px 80px",
        }}
      >
        {/* Flow name header */}
        {d.flow_name && (
          <p
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.textMuted,
              marginBottom: 24,
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {d.flow_name}
          </p>
        )}

        {/* Section 1 — The Verdict */}
        <section style={{ marginBottom: 48 }}>
          <ExecutiveVerdict data={d} />
        </section>

        {/* Section 1b — Segment Scorecard (who converts, who doesn't, why) */}
        <section style={{ marginBottom: 64 }}>
          <SegmentScorecard data={d} />
        </section>

        {/* Section 2 — Flow Funnel */}
        <section style={{ marginBottom: 64 }}>
          <FlowFunnel data={d} />
        </section>

        {/* Section 3 — Segment Divergence */}
        <section style={{ marginBottom: 64 }}>
          <SegmentDivergence data={d} />
        </section>

        {/* Section 4 — Persona Monologues */}
        <section style={{ marginBottom: 64 }}>
          <PersonaMonologues data={d} />
        </section>

        {/* Section 5 — Clustered Drop-Off Reasons */}
        <section style={{ marginBottom: 64 }}>
          <ClusteredDropOffs data={d} />
        </section>

        {/* Section 6 — Fix Recommendations */}
        <section style={{ marginBottom: 64 }}>
          <FixRecommendations data={d} />
        </section>

        {/* Section 7 — Intent Analysis (conditional, shown when post-flow questions exist) */}
        <section style={{ marginBottom: 64 }}>
          <IntentAnalysis data={d} />
        </section>

        {/* Section 8 — Calibration Appendix (conditional) */}
        <section style={{ marginBottom: 40 }}>
          <CalibrationAppendix data={d} />
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: `1px solid ${COLORS.border}`,
            paddingTop: 24,
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>
            {d.flow_name} · Simulation Report ·{" "}
            {d.generated_at
              ? new Date(d.generated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </p>
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>
            {d.summary.total_personas} personas ·{" "}
            {Object.keys(d.screen_metrics || {}).length} screens ·{" "}
            {d.summary.completion_rate_pct}% completion
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SimulationOverview;
