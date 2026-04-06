"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flentFlowAnalysisData } from "@/data/flent-flow-analysis-data";
import { flentSimData } from "@/data/flent-sim-data";
import { flentStudyData } from "@/data/flent-study-data";
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

export default function FlentSamplePage() {
  const { toggleMobileMenu } = useAppShell();
  const { meta } = flentFlowAnalysisData;

  return (
    <>
      <TopBar
        title={`${meta.product} · Sample Results`}
        breadcrumb="Product Flow · Flent Secured Sample"
        onMenuClick={toggleMobileMenu}
      />
      <div className={`${playfair.variable} ${dmSans.variable}`}>
        <FlowAnalysisView
          data={flentFlowAnalysisData}
          simulationData={flentSimData as unknown as SimulationData}
          studyData={flentStudyData}
        />
      </div>
    </>
  );
}
