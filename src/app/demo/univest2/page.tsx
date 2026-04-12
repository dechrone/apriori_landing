"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { buildUnivestFlowAnalysisStub } from "@/data/univest-flow-analysis-stub";
import univestInsights from "@/data/univest2-insights.json";
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
  "2": "/screens/univest/2.png",
};

const sim = univestInsights as unknown as SimulationData;
const stub = buildUnivestFlowAnalysisStub(
  "Univest",
  "Variant 2 — Trusted Advisory + Live Trades + Sticky 'Start Trial @ ₹1'",
  sim,
);

export default function UnivestFlow2DemoPage() {
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
