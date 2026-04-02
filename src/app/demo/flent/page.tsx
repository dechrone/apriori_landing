"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flentSimData } from "@/data/flent-sim-data";
import type { FlowAnalysisData } from "@/types/flow-analysis";

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

const flentFlowData: FlowAnalysisData = {
  meta: {
    product: "Flent Secured",
    flow: flentSimData.flow_name || "Rent Payment Onboarding",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    totalPersonas: flentSimData.summary?.total_personas ?? 50,
    completionRate: flentSimData.summary?.completion_rate_pct ?? 0,
  },
  screens: (flentSimData.funnel_drop_off ?? []).map((f, i) => ({
    id: f.screen_id,
    label: f.screen_id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    order: i,
  })),
  funnel: (flentSimData.funnel_drop_off ?? []).map((f) => ({
    screen: f.screen_id,
    entered: 0,
    dropped: f.drop_offs,
  })),
  rootCauses: [],
  oneBet: {
    title: flentSimData.flow_assessment?.overall_verdict ?? "",
    rationale: "",
    effort: "",
    impact: "",
    projectedCompletion: "",
    currentCompletion: flentSimData.summary?.completion_rate_pct ?? 0,
    personas: [],
  },
  personas: [],
};

export default function FlentDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <FlowAnalysisView data={flentFlowData} simulationData={flentSimData} />
    </div>
  );
}
