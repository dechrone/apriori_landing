"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flowAnalysisDummyData } from "@/data/flow-analysis-dummy";
import type { SimulationData } from "@/types/simulation";
import bJson from "@/app/(app)/simulations/b.json";

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

export default function BlinkMoneyFlow1PublicPage() {
  const { meta } = flowAnalysisDummyData;

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} min-h-screen`}
      style={{ backgroundColor: "#F5F4F2" }}
    >
      {/* Minimal top bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 24px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Apriori wordmark */}
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
            }}
          >
            Apriori
          </span>
          <span style={{ color: "#D1D5DB", fontSize: 14 }}>/</span>
          <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
            {meta.product} · Sample Results
          </span>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Public Preview
        </span>
      </div>

      {/* Full simulation view */}
      <FlowAnalysisView
        data={flowAnalysisDummyData}
        simulationData={bJson.data as unknown as SimulationData}
      />
    </div>
  );
}
