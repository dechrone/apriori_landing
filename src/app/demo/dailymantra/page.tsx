"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { dailymantraFlowAnalysisData } from "@/data/dailymantra-flow-analysis-data";
import { dailymantraSimData } from "@/data/dailymantra-sim-data";
import { dailymantraStudyData } from "@/data/dailymantra-study-data";
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

const SCREEN_IMAGES: Record<string, string> = {};

export default function DailyMantraDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ minHeight: "100vh", background: "#fff" }}>
      <FlowAnalysisView
        data={dailymantraFlowAnalysisData}
        simulationData={dailymantraSimData as unknown as SimulationData}
        studyData={dailymantraStudyData}
        screenImages={SCREEN_IMAGES}
      />
    </div>
  );
}
