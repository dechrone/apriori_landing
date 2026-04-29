"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { buildUnivestFlowAnalysisStub } from "@/data/univest-flow-analysis-stub";
import univestInsights from "@/data/univest4-insights.json";
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

const SCREEN_IMAGES: Record<string, string> = {
  "4": "/screens/univest/4.png",
};

const sim = univestInsights as unknown as SimulationData;
const stub = buildUnivestFlowAnalysisStub(
  "Univest",
  "Variant 4, Crown + Trust Pillars + 'Unlock FREE trade'",
  sim,
);

export default function UnivestFlow4DemoPage() {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ minHeight: "100vh", background: "#fff" }}
    >
      <FlowAnalysisView
        data={stub}
        simulationData={sim}
        screenImages={SCREEN_IMAGES}
      />
    </div>
  );
}
