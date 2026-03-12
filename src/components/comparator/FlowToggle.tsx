"use client";

import type { FlowRef } from "@/types/comparator";

export interface FlowToggleProps {
  flows: FlowRef[];
  activeFlowId: string;
  onChange: (flowId: string) => void;
}

/**
 * Pill-shaped toggle for switching between two flows.
 * Used in Flow Details, Drop-Off Funnel, and Deep Dive tabs.
 */
export function FlowToggle({ flows, activeFlowId, onChange }: FlowToggleProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#EDEAE4",
        borderRadius: 8,
        padding: 4,
      }}
    >
      {flows.map((flow) => {
        const isActive = flow.flow_id === activeFlowId;
        return (
          <button
            key={flow.flow_id}
            type="button"
            onClick={() => onChange(flow.flow_id)}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "#1A1814" : "#8A8178",
              backgroundColor: isActive ? "#FFFFFF" : "transparent",
              boxShadow: isActive
                ? "0 1px 3px rgba(0,0,0,0.08)"
                : "none",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {flow.flow_name}
          </button>
        );
      })}
    </div>
  );
}
