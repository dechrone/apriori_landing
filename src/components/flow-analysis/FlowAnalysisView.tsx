"use client";

import { useState } from "react";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import type { SimulationData } from "@/types/simulation";
import type { StudyData } from "@/types/study";
import { OverviewTab } from "./OverviewTab";
import { DeepDiveTab } from "./DeepDiveTab";
import { DropOffFunnel as LegacyDropOffFunnel } from "./DropOffFunnel";
import { DropOffFunnel as SimDropOffFunnel } from "@/components/DropOffFunnel";
import { SimulationOverview } from "@/components/SimulationOverview";
import { StudyOverviewTab } from "@/components/SimulationOverview/StudyOverviewTab";
import { BarChart3, Layers, TrendingDown, Activity } from "lucide-react";

const TAB_SIM_OVERVIEW = "sim-overview";
const TAB_OVERVIEW = "overview";
const TAB_DEEP_DIVE = "deep-dive";
const TAB_DROP_OFF = "drop-off";
const ACCENT = "#E8583A";

type TabId =
  | typeof TAB_SIM_OVERVIEW
  | typeof TAB_OVERVIEW
  | typeof TAB_DEEP_DIVE
  | typeof TAB_DROP_OFF;

interface FlowAnalysisViewProps {
  data: FlowAnalysisData;
  /** Optional simulation insights data — when provided, adds a Simulation Overview tab */
  simulationData?: SimulationData;
  /** Optional study-format data — when provided, replaces the Overview tab with the new Act 1/2/3 layout */
  studyData?: StudyData;
  /** Optional screen image map (screen_id → URL) used by founder-driven demo pages.
   *  Currently unused inside this component but accepted so demo pages compile. */
  screenImages?: Record<string, string>;
}

export function FlowAnalysisView({ data, simulationData, studyData }: FlowAnalysisViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>(
    simulationData || studyData ? TAB_SIM_OVERVIEW : TAB_OVERVIEW
  );

  const tabs: { id: TabId; label: string; icon: typeof BarChart3 }[] = [
    ...(simulationData || studyData
      ? [{ id: TAB_SIM_OVERVIEW as TabId, label: "Overview", icon: Activity }]
      : []),
    // Legacy Overview - Commented out
    // { id: TAB_OVERVIEW as TabId, label: simulationData ? "Legacy Overview" : "Overview", icon: BarChart3 },
    { id: TAB_DROP_OFF as TabId, label: "Drop-Off Funnel", icon: TrendingDown },
    { id: TAB_DEEP_DIVE as TabId, label: "Deep Dive", icon: Layers },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F2", paddingTop: 52 }}>
      {/* ── Tab Bar only ── */}
      <div
        className="sticky z-20"
        style={{
          top: 52, /* sits below the fixed TopBar */
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#F5F4F2",
        }}
      >
        <div style={{ padding: "0 24px" }}>
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="transition-colors"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 24px",
                  fontSize: 18,
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? ACCENT : "#6B7280",
                  borderBottom: activeTab === tab.id ? `2.5px solid ${ACCENT}` : "2.5px solid transparent",
                  marginBottom: -1,
                  background: "transparent",
                  cursor: "pointer",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                }}
              >
                <tab.icon size={18} style={{ opacity: activeTab === tab.id ? 1 : 0.5 }} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <main>
        {/* Simulation Overview tab */}
        {(simulationData || studyData) && (
          <div
            className={activeTab === TAB_SIM_OVERVIEW ? "animate-fadeIn opacity-100" : "hidden"}
            style={{ animationDuration: "200ms" }}
          >
            {activeTab === TAB_SIM_OVERVIEW && (
              studyData ? (
                <div style={{ background: "#F2F0EC", minHeight: "100vh" }}>
                  <StudyOverviewTab data={studyData} />
                </div>
              ) : simulationData ? (
                <SimulationOverview simulationData={simulationData} />
              ) : null
            )}
          </div>
        )}
        {/* Legacy Overview - Commented out */}
        {/* <div
          className={activeTab === TAB_OVERVIEW ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_OVERVIEW && <OverviewTab data={data} />}
        </div> */}
        <div
          className={activeTab === TAB_DROP_OFF ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DROP_OFF && (
            <div className="py-0" style={{ backgroundColor: "#F5F4F2" }}>
              <div style={{ padding: "32px 24px 64px" }}>
                {simulationData ? (
                  <SimDropOffFunnel data={simulationData} />
                ) : (
                  <LegacyDropOffFunnel data={data} />
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className={activeTab === TAB_DEEP_DIVE ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DEEP_DIVE && <DeepDiveTab data={data} simulationData={simulationData} />}
        </div>
      </main>
    </div>
  );
}
