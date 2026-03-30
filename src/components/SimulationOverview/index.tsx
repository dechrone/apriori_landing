"use client";

import type { SimulationOverviewProps } from "@/types/simulation";
import { VerdictBanner } from "./VerdictBanner";
import { HeroMetrics } from "./HeroMetrics";
import { ScreenHealthMap } from "./ScreenHealthMap";
import { EmotionalJourneyMap } from "./EmotionalJourneyMap";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { FrictionPoints } from "./FrictionPoints";
import { BehavioralInsights } from "./BehavioralInsights";
import { DropOffAnalysis } from "./DropOffAnalysis";
import { UsabilityFindings } from "./UsabilityFindings";
import { TaskAnalysis } from "./TaskAnalysis";
import { UserMentalModels } from "./UserMentalModels";
import { SegmentAnalysis } from "./SegmentAnalysis";
import { PowerUsers } from "./PowerUsers";
import { SkeletonLoader } from "./SkeletonLoader";
import COLORS from "./utils/colorHelpers";

/**
 * SimulationOverview — Orchestrator component
 * Renders all sections of the usability test report.
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
          <p
            style={{
              fontSize: 48,
              marginBottom: 16,
            }}
          >
            ⚠️
          </p>
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

        {/* Section 1 — Verdict Banner */}
        <section style={{ marginBottom: 80 }}>
          <VerdictBanner data={d} />
        </section>

        {/* Section 2 — Hero Metrics */}
        <section style={{ marginBottom: 80 }}>
          <HeroMetrics data={d} />
        </section>

        {/* Section 3 — Screen Health Map */}
        <section style={{ marginBottom: 80 }}>
          <ScreenHealthMap data={d} />
        </section>

        {/* Section 4 — Emotional Journey */}
        <section style={{ marginBottom: 80 }}>
          <EmotionalJourneyMap data={d} />
        </section>

        {/* Section 5 — Executive Summary */}
        <section style={{ marginBottom: 80 }}>
          <ExecutiveSummary data={d} />
        </section>

        {/* Section 6 — Top Friction Points */}
        <section style={{ marginBottom: 80 }}>
          <FrictionPoints data={d} />
        </section>

        {/* Section 7 — Behavioral Insights */}
        <section style={{ marginBottom: 80 }}>
          <BehavioralInsights data={d} />
        </section>

        {/* Section 8 — Drop-Off Analysis */}
        <section style={{ marginBottom: 80 }}>
          <DropOffAnalysis data={d} />
        </section>

        {/* Section 9 — Usability Findings (replaces Design Recommendations) */}
        <section style={{ marginBottom: 80 }}>
          <UsabilityFindings data={d} />
        </section>

        {/* Section 10 — Task Analysis per screen (replaces Playbook Insights) */}
        <section style={{ marginBottom: 80 }}>
          <TaskAnalysis data={d} />
        </section>

        {/* Section 11 — User Mental Models */}
        <section style={{ marginBottom: 80 }}>
          <UserMentalModels data={d} />
        </section>

        {/* Section 12 — Segment Analysis */}
        <section style={{ marginBottom: 80 }}>
          <SegmentAnalysis data={d} />
        </section>

        {/* Section 13 — Power Users */}
        <section style={{ marginBottom: 40 }}>
          <PowerUsers data={d} />
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
            {d.flow_name} · AI Usability Test Report ·{" "}
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
            {d.summary.completion_rate_pct}% task completion
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SimulationOverview;
