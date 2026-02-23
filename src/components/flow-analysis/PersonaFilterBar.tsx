"use client";

import type { FlowPersona } from "@/types/flow-analysis";

export function PersonaFilterBar({
  personas,
  selectedIds,
  onToggle,
  onSelectAll,
}: {
  personas: FlowPersona[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-body-sm text-[var(--fa-text-muted)] mr-2">Filter by persona:</span>
      <button
        type="button"
        onClick={onSelectAll}
        className={`
          px-4 py-2 rounded-full text-body-sm font-medium transition-colors
          ${selectedIds.size === 0
            ? "bg-[var(--fa-gold)] text-[var(--fa-bg)]"
            : "bg-[var(--fa-surface2)] text-[var(--fa-text-body)] hover:bg-[var(--fa-surface)]"
          }
        `}
      >
        All
      </button>
      {personas.map((p) => {
        const shortName = p.name.split(" ").length >= 2
          ? `${p.name.split(" ")[0]} ${(p.name.split(" ")[1] ?? "").charAt(0)}.`
          : p.name;
        const selected = selectedIds.has(p.id);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onToggle(p.id)}
            className={`
              px-4 py-2 rounded-full text-body-sm font-medium transition-colors
              ${selected
                ? "bg-[var(--fa-gold)] text-[var(--fa-bg)]"
                : "bg-[var(--fa-surface2)] text-[var(--fa-text-body)] hover:bg-[var(--fa-surface)]"
              }
            `}
          >
            {shortName}
          </button>
        );
      })}
    </div>
  );
}
