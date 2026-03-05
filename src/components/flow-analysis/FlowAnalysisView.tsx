"use client";

import { useState } from "react";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { OverviewTab } from "./OverviewTab";
import { DeepDiveTab } from "./DeepDiveTab";
import { DropOffFunnel } from "./DropOffFunnel";
import { BarChart3, Layers, TrendingDown } from "lucide-react";

const TAB_OVERVIEW = "overview";
const TAB_DEEP_DIVE = "deep-dive";
const TAB_DROP_OFF = "drop-off";
const ACCENT = "#E8583A";

type TabId = typeof TAB_OVERVIEW | typeof TAB_DEEP_DIVE | typeof TAB_DROP_OFF;

export function FlowAnalysisView({ data }: { data: FlowAnalysisData }) {
  const [activeTab, setActiveTab] = useState<TabId>(TAB_OVERVIEW);

  const tabs = [
    { id: TAB_OVERVIEW as TabId, label: "Overview", icon: BarChart3 },
    { id: TAB_DROP_OFF as TabId, label: "Drop-Off Funnel", icon: TrendingDown },
    { id: TAB_DEEP_DIVE as TabId, label: "Deep Dive", icon: Layers },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F2" }}>
      {/* ── Tab Bar only ── */}
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
        <div
          className={activeTab === TAB_OVERVIEW ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_OVERVIEW && <OverviewTab data={data} />}
        </div>
        <div
          className={activeTab === TAB_DROP_OFF ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DROP_OFF && (
            <div className="py-0" style={{ backgroundColor: "#F5F4F2" }}>
              <div style={{ padding: "32px 24px 64px" }}>
                <DropOffFunnel data={data} />
              </div>
            </div>
          )}
        </div>
        <div
          className={activeTab === TAB_DEEP_DIVE ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DEEP_DIVE && <DeepDiveTab data={data} />}
        </div>
      </main>
    </div>
  );
}
