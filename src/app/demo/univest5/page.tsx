"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { buildUnivestFlowAnalysisStub } from "@/data/univest-flow-analysis-stub";
import univestInsights from "@/data/univest5-insights.json";
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
  "5": "/screens/univest/5.png",
};

const sim = univestInsights as unknown as SimulationData;
const stub = buildUnivestFlowAnalysisStub(
  "Univest",
  "Variant 5, Trust Pillars + Dual CTA (Unlock + Start Trial @ ₹1)",
  sim,
);

export default function UnivestFlow5DemoPage() {
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
