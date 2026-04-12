"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { buildUnivestFlowAnalysisStub } from "@/data/univest-flow-analysis-stub";
import univestInsights from "@/data/univest1-insights.json";
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
  "1_1": "/screens/univest/1.1.png",
  "1_2": "/screens/univest/1.2.png",
};

const sim = univestInsights as unknown as SimulationData;
const stub = buildUnivestFlowAnalysisStub(
  "Univest",
  "Control: Trades Modal → Plan Picker (1.1 → 1.2)",
  sim,
);

export default function UnivestFlow1DemoPage() {
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
