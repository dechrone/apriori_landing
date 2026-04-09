"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { hexahealthFlowAnalysisData } from "@/data/hexahealth-flow-analysis-data";
import { hexahealthSimData } from "@/data/hexahealth-sim-data";
import { hexahealthStudyData } from "@/data/hexahealth-study-data";
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

export default function HexaHealthSamplePage() {
  const { toggleMobileMenu } = useAppShell();
  const { meta } = hexahealthFlowAnalysisData;

  return (
    <>
      <TopBar
        title={`${meta.product} · Sample Results`}
        breadcrumb="Product Flow · HexaHealth Sample"
        onMenuClick={toggleMobileMenu}
      />
      <div className={`${playfair.variable} ${dmSans.variable}`}>
        <FlowAnalysisView
          data={hexahealthFlowAnalysisData}
          simulationData={hexahealthSimData as unknown as SimulationData}
          studyData={hexahealthStudyData}
        />
      </div>
    </>
  );
}
