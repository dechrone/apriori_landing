"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { superastroFlowAnalysisData } from "@/data/superastro-flow-analysis-data";
import { superastroSimData } from "@/data/superastro-sim-data";
import { superastro1StudyData } from "@/data/superastro1-study-data";
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
  intro_mobile: "/screens/superastro/1.jpeg",
  otp_verify: "/screens/superastro/2.jpeg",
  name_entry: "/screens/superastro/3.jpeg",
  gender_select: "/screens/superastro/4.jpeg",
  marital_status: "/screens/superastro/5.jpeg",
  dob_picker: "/screens/superastro/6.jpeg",
  time_of_birth: "/screens/superastro/7.jpeg",
  place_of_birth: "/screens/superastro/8.jpeg",
  journey_purpose: "/screens/superastro/9.jpeg",
  ai_chat: "/screens/superastro/10.jpeg",
};

export default function SuperAstro1DemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ minHeight: "100vh", background: "#fff" }}>
      <FlowAnalysisView
        data={superastroFlowAnalysisData}
        simulationData={superastroSimData as unknown as SimulationData}
        studyData={superastro1StudyData}
        screenImages={SCREEN_IMAGES}
      />
    </div>
  );
}
