"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { liciousSimulationData } from "@/data/licious-simulation-data";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import type { SimulationData } from "@/types/simulation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-flow-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-flow-body",
  display: "swap",
});

/**
 * Minimal FlowAnalysisData derived from the Licious simulation.
 * Only needed as a structural requirement for FlowAnalysisView;
 * the SimulationOverview / DeepDiveView tabs consume simulationData directly.
 */
const liciousFlowData: FlowAnalysisData = {
  meta: {
    product: "Lickcious",
    flow: "E-Commerce Purchase Flow v1",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    totalPersonas: liciousSimulationData.summary.total_personas,
    completionRate: liciousSimulationData.summary.completion_rate_pct,
  },
  screens: liciousSimulationData.funnel_drop_off.map((f, i) => ({
    id: f.screen_id,
    label: f.screen_id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    order: i + 1,
  })),
  funnel: liciousSimulationData.funnel_drop_off.map((f, i) => ({
    screen: f.screen_id,
    entered:
      liciousSimulationData.summary.total_personas -
      liciousSimulationData.funnel_drop_off
        .slice(0, i)
        .reduce((sum, s) => sum + s.drop_offs, 0),
    dropped: f.drop_offs,
  })),
  rootCauses: [],
  oneBet: {
    title: "Redesign combo value proposition on product page",
    rationale:
      "70% of users defaulted to single-item purchases despite combo availability. A prominent visual savings comparison could increase average order value by 25–30%.",
    effort: "Low",
    impact: "High",
    projectedCompletion: "100%",
    currentCompletion: 100,
    personas: ["The Pragmatist", "The Cautious Buyer"],
  },
  personas: [],
};

export default function LiciousReportPage() {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} min-h-screen`}
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* ── Minimal top bar ── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 24px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            Apriori
          </span>
          <span style={{ color: "#D1D5DB", fontSize: 14 }}>/</span>
          <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
            Lickcious · Simulation Report
          </span>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Public Preview
        </span>
      </div>

      {/* ── Full simulation view ── */}
      <FlowAnalysisView
        data={liciousFlowData}
        simulationData={liciousSimulationData as unknown as SimulationData}
      />
    </div>
  );
}
