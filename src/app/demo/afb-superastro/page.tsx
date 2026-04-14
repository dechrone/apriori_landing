"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { afbSuperastroFlowAnalysisData } from "@/data/afb-superastro-flow-analysis-data";
import { afbSuperastroSimData } from "@/data/afb-superastro-sim-data";
import { afbSuperastroStudyData } from "@/data/afb-superastro-study-data";
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

export default function AfbSuperAstroDemoPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ minHeight: "100vh", background: "#fff" }}>
      <FlowAnalysisView
        data={afbSuperastroFlowAnalysisData}
        simulationData={afbSuperastroSimData as unknown as SimulationData}
        studyData={afbSuperastroStudyData}
        screenImages={SCREEN_IMAGES}
      />
    </div>
  );
}
