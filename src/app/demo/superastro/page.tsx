"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { superastroFlowAnalysisData } from "@/data/superastro-flow-analysis-data";
import { superastroSimData } from "@/data/superastro-sim-data";
import { superastroStudyData } from "@/data/superastro-study-data";
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

export default function SuperAstroDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ minHeight: "100vh", background: "#fff" }}>
      <FlowAnalysisView
        data={superastroFlowAnalysisData}
        simulationData={superastroSimData as unknown as SimulationData}
        studyData={superastroStudyData}
      />
    </div>
  );
}
