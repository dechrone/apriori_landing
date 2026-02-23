"use client";

import type { FlowAnalysisData } from "@/types/flow-analysis";

export function FlowAnalysisHeader({ data }: { data: FlowAnalysisData }) {
  const { meta } = data;
  const droppedPct = 100 - meta.completionRate;

  return (
    <header
      className="bg-[var(--fa-surface)] border-b border-[var(--fa-divider)] px-6 py-5"
      style={{ fontFamily: "var(--font-flow-body)" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className="text-h3 text-[var(--fa-text)]"
            style={{ fontFamily: "var(--font-flow-display)" }}
          >
            {meta.product} · {meta.flow}
          </h1>
          <p className="text-body-sm text-[var(--fa-text-muted)] mt-1">{meta.date}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--fa-surface2)] text-body-sm font-medium text-[var(--fa-text-body)]">
            Total Users: {meta.totalPersonas}
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--fa-green-continue)]/20 text-[var(--fa-green-light)] text-body-sm font-medium border border-[var(--fa-green-continue)]/40">
            Completed: {meta.completionRate}%
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--fa-red-high)]/20 text-[#C0392B] text-body-sm font-medium border border-[var(--fa-red-high)]/40">
            Dropped: {droppedPct}%
          </span>
        </div>
      </div>
    </header>
  );
}
