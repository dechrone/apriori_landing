"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flowAnalysisDummyData } from "@/data/flow-analysis-dummy";
import { sampleSimulationData } from "@/data/sample-simulation-data";

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

export default function ProductFlowSamplePage() {
  const { toggleMobileMenu } = useAppShell();
  const { meta } = flowAnalysisDummyData;

  return (
    <>
      <TopBar
        title={`${meta.product} · Sample Results`}
        breadcrumb="Product Flow · Sample"
        onMenuClick={toggleMobileMenu}
      />
      <div className={`${playfair.variable} ${dmSans.variable}`}>
        <FlowAnalysisView data={flowAnalysisDummyData} simulationData={sampleSimulationData} />
      </div>
    </>
  );
}
