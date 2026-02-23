"use client";

import { useState } from "react";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { OverviewTab } from "./OverviewTab";
import { DeepDiveTab } from "./DeepDiveTab";
import { BarChart3, Layers } from "lucide-react";

const TAB_OVERVIEW = "overview";
const TAB_DEEP_DIVE = "deep-dive";
const ACCENT = "#E8583A";

export function FlowAnalysisView({ data }: { data: FlowAnalysisData }) {
  const [activeTab, setActiveTab] = useState<typeof TAB_OVERVIEW | typeof TAB_DEEP_DIVE>(TAB_OVERVIEW);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F2" }}>
      {/* ── Tab Bar only ── */}
      <div style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#F5F4F2" }}>
        <div style={{ padding: "0 24px" }}>
          <div className="flex gap-0">
            <button
              type="button"
              onClick={() => setActiveTab(TAB_OVERVIEW)}
              className="transition-colors"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                fontSize: 18,
                fontWeight: activeTab === TAB_OVERVIEW ? 600 : 500,
                color: activeTab === TAB_OVERVIEW ? ACCENT : "#6B7280",
                borderBottom: activeTab === TAB_OVERVIEW ? `2.5px solid ${ACCENT}` : "2.5px solid transparent",
                marginBottom: -1,
                background: "transparent",
                cursor: "pointer",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
            >
              <BarChart3 size={18} style={{ opacity: activeTab === TAB_OVERVIEW ? 1 : 0.5 }} />
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(TAB_DEEP_DIVE)}
              className="transition-colors"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 24px",
                fontSize: 18,
                fontWeight: activeTab === TAB_DEEP_DIVE ? 600 : 500,
                color: activeTab === TAB_DEEP_DIVE ? ACCENT : "#6B7280",
                borderBottom: activeTab === TAB_DEEP_DIVE ? `2.5px solid ${ACCENT}` : "2.5px solid transparent",
                marginBottom: -1,
                background: "transparent",
                cursor: "pointer",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
            >
              <Layers size={18} style={{ opacity: activeTab === TAB_DEEP_DIVE ? 1 : 0.5 }} />
              Deep Dive
            </button>
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
          className={activeTab === TAB_DEEP_DIVE ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DEEP_DIVE && <DeepDiveTab data={data} />}
        </div>
      </main>
    </div>
  );
}
