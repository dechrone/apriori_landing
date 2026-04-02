"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { fitSquareSimData } from "@/data/fitsquare-sim-data";
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

const fitSquareFlowData: FlowAnalysisData = {
  meta: {
    product: "Fit Square",
    flow: fitSquareSimData.flow_name || "Gym Session Membership Onboarding",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    totalPersonas: fitSquareSimData.summary?.total_personas ?? 50,
    completionRate: fitSquareSimData.summary?.completion_rate_pct ?? 0,
  },
  screens: (fitSquareSimData.funnel_drop_off ?? []).map((f, i) => ({
    id: f.screen_id,
    label: f.screen_id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    order: i,
  })),
  funnel: (fitSquareSimData.funnel_drop_off ?? []).map((f) => ({
    screen: f.screen_id,
    entered: 0,
    dropped: f.drop_offs,
  })),
  rootCauses: [],
  oneBet: {
    title: fitSquareSimData.flow_assessment?.overall_verdict ?? "",
    rationale: "",
    effort: "",
    impact: "",
    projectedCompletion: "",
    currentCompletion: fitSquareSimData.summary?.completion_rate_pct ?? 0,
    personas: [],
  },
  personas: [],
};

export default function FitSquareDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <FlowAnalysisView
        data={fitSquareFlowData}
        simulationData={fitSquareSimData}
      />
    </div>
  );
}
