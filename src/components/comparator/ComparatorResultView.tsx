"use client";

import { useState, useEffect } from "react";
import type { ComparatorData } from "@/types/comparator";
import type { SimulationData } from "@/types/simulation";
import type { PersonaDetail as FlowPersonaDetail } from "@/types/flow-analysis";
import { ComparatorOverview } from "./ComparatorOverview";
import { FlowToggle } from "./FlowToggle";
import { SimulationOverview } from "@/components/SimulationOverview";
import { DropOffFunnel } from "@/components/DropOffFunnel";
import { DeepDiveView } from "@/components/deep-dive/DeepDiveView";
import { Activity, List, TrendingDown, Layers } from "lucide-react";

/* ── Tab definitions ── */
const TAB_OVERVIEW = "overview";
const TAB_FLOW_DETAILS = "flow_details";
const TAB_FUNNEL = "funnel";
const TAB_DEEP_DIVE = "deep_dive";

type TabId =
  | typeof TAB_OVERVIEW
  | typeof TAB_FLOW_DETAILS
  | typeof TAB_FUNNEL
  | typeof TAB_DEEP_DIVE;

const ACCENT = "#D4621A";

interface ComparatorResultViewProps {
  data: ComparatorData;
}

export function ComparatorResultView({ data }: ComparatorResultViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>(TAB_OVERVIEW);
  const [activeFlowId, setActiveFlowId] = useState<string>("flow_0");
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState<number>(0);

  /* Derive active simulation data for per-flow tabs */
  const activeSimData: SimulationData =
    activeFlowId === "flow_0" ? data.flow_0_data : data.flow_1_data;

  /* Reset persona index when flow changes */
  useEffect(() => {
    setSelectedPersonaIndex(0);
  }, [activeFlowId]);

  const tabs: { id: TabId; label: string; icon: typeof Activity }[] = [
    { id: TAB_OVERVIEW, label: "Overview", icon: Activity },
    { id: TAB_FLOW_DETAILS, label: "Flow Details", icon: List },
    { id: TAB_FUNNEL, label: "Drop-Off Funnel", icon: TrendingDown },
    { id: TAB_DEEP_DIVE, label: "Deep Dive", icon: Layers },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F2" }}>
      {/* ── Tab Bar ── */}
      <div style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#F5F4F2" }}>
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
                  borderBottom:
                    activeTab === tab.id
                      ? `2.5px solid ${ACCENT}`
                      : "2.5px solid transparent",
                  marginBottom: -1,
                  background: "transparent",
                  cursor: "pointer",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                }}
              >
                <tab.icon
                  size={18}
                  style={{ opacity: activeTab === tab.id ? 1 : 0.5 }}
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <main>
        {/* ── Overview Tab ── */}
        <div
          className={activeTab === TAB_OVERVIEW ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_OVERVIEW && <ComparatorOverview data={data} />}
        </div>

        {/* ── Flow Details Tab ── */}
        <div
          className={activeTab === TAB_FLOW_DETAILS ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_FLOW_DETAILS && (
            <div style={{ backgroundColor: "#F5F4F2" }}>
              {/* Flow Toggle header */}
              <div
                style={{
                  maxWidth: 1280,
                  margin: "0 auto",
                  padding: "20px 24px 0",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <FlowToggle
                  flows={data.flows_compared}
                  activeFlowId={activeFlowId}
                  onChange={setActiveFlowId}
                />
              </div>
              <SimulationOverview simulationData={activeSimData} />
            </div>
          )}
        </div>

        {/* ── Drop-Off Funnel Tab ── */}
        <div
          className={activeTab === TAB_FUNNEL ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_FUNNEL && (
            <div style={{ backgroundColor: "#F5F4F2" }}>
              <div style={{ padding: "32px 24px 64px" }}>
                {/* Section header with toggle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 24,
                  }}
                >
                  <div />
                  <FlowToggle
                    flows={data.flows_compared}
                    activeFlowId={activeFlowId}
                    onChange={setActiveFlowId}
                  />
                </div>
                <DropOffFunnel data={activeSimData} />
              </div>
            </div>
          )}
        </div>

        {/* ── Deep Dive Tab ── */}
        <div
          className={activeTab === TAB_DEEP_DIVE ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DEEP_DIVE && (
            <div style={{ backgroundColor: "#F5F4F2" }}>
              {/* Toggle above persona list */}
              <div
                style={{
                  padding: "20px 24px 0",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <FlowToggle
                  flows={data.flows_compared}
                  activeFlowId={activeFlowId}
                  onChange={setActiveFlowId}
                />
              </div>
              <DeepDiveView personas={activeSimData.persona_details as unknown as FlowPersonaDetail[]} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
