"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { loopHealthSimData } from "@/data/loop-health-sim-data";
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

/**
 * FlowAnalysisData scaffold derived from the Loop Health simulation.
 */
const loopFlowData: FlowAnalysisData = {
  meta: {
    product: "Loop Health",
    flow: loopHealthSimData.flow_name || "Healthflex Enrollment",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    totalPersonas: loopHealthSimData.summary?.total_personas ?? 5,
    completionRate: loopHealthSimData.summary?.completion_rate_pct ?? 0,
  },
  screens: (loopHealthSimData.funnel_drop_off ?? []).map((f, i) => ({
    id: f.screen_id,
    label: f.screen_id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    order: i,
  })),
  funnel: (loopHealthSimData.funnel_drop_off ?? []).map((f) => ({
    screen: f.screen_id,
    entered: 0,
    dropped: f.drop_offs,
  })),
  rootCauses: [],
  oneBet: {
    title: loopHealthSimData.flow_assessment?.overall_verdict ?? "",
    rationale: "",
    effort: "",
    impact: "",
    projectedCompletion: "",
    currentCompletion: loopHealthSimData.summary?.completion_rate_pct ?? 0,
    personas: [],
  },
  personas: [],
};

export default function LoopHealthDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <FlowAnalysisView data={loopFlowData} simulationData={loopHealthSimData} />
    </div>
  );
}
