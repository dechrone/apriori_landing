"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { goodScoreSimData } from "@/data/goodscore-sim-data";
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

const goodScoreFlowData: FlowAnalysisData = {
  meta: {
    product: "GoodScore",
    flow: goodScoreSimData.flow_name || "Credit Score Dashboard Monetization",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    totalPersonas: goodScoreSimData.summary?.total_personas ?? 2,
    completionRate: goodScoreSimData.summary?.completion_rate_pct ?? 0,
  },
  screens: (goodScoreSimData.funnel_drop_off ?? []).map((f, i) => ({
    id: f.screen_id,
    label: f.screen_id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    order: i,
  })),
  funnel: (goodScoreSimData.funnel_drop_off ?? []).map((f) => ({
    screen: f.screen_id,
    entered: 0,
    dropped: f.drop_offs,
  })),
  rootCauses: [],
  oneBet: {
    title: goodScoreSimData.flow_assessment?.overall_verdict ?? "",
    rationale: "",
    effort: "",
    impact: "",
    projectedCompletion: "",
    currentCompletion: goodScoreSimData.summary?.completion_rate_pct ?? 0,
    personas: [],
  },
  personas: [],
};

export default function GoodScoreDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <FlowAnalysisView data={goodScoreFlowData} simulationData={goodScoreSimData} />
    </div>
  );
}
