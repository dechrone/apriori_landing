"use client";

import type { PsychographicsFilter } from "@/types/audience-filters";

interface Props {
  value: PsychographicsFilter;
  onChange: (v: PsychographicsFilter) => void;
}

const LEVELS = ["Any", "Low", "Medium", "High"] as const;

function Chip({
  label,
  selected,
  onClick,
  variant = "default",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "default" | "green" | "amber";
}) {
  const variantStyles = {
    default: selected
      ? "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] font-semibold border-[1.5px]"
      : "border-[#E5E7EB] bg-white text-[#6B7280]",
    green: selected
      ? "border-emerald-300 bg-emerald-50 text-emerald-700 font-semibold border-[1.5px]"
      : "border-[#E5E7EB] bg-white text-[#6B7280]",
    amber: selected
      ? "border-amber-300 bg-amber-50 text-amber-700 font-semibold border-[1.5px]"
      : "border-[#E5E7EB] bg-white text-[#6B7280]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[13px] border transition-all cursor-pointer hover:border-[#F59E0B] hover:bg-[#FFFBEB] ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
}

export function PsychographicsForm({ value, onChange }: Props) {
  const update = (patch: Partial<PsychographicsFilter>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      {/* Brand loyalty */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Brand loyalty</label>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const isAny = l === "Any";
            const selected = isAny ? !value.brandLoyalty : value.brandLoyalty === l;
            return (
              <Chip
                key={l}
                label={l}
                selected={selected}
                onClick={() => update({ brandLoyalty: isAny ? undefined : (l as "Low" | "Medium" | "High") })}
              />
            );
          })}
        </div>
      </div>

      {/* Price sensitivity */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Price sensitivity</label>
        <p className="text-[12px] text-[#9CA3AF] mb-2">Low = not price sensitive, High = very price sensitive</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => {
            const isAny = l === "Any";
            const selected = isAny ? !value.priceSensitivity : value.priceSensitivity === l;
            const variant = !selected ? "default" : l === "Low" ? "green" : l === "High" ? "amber" : "default";
            return (
              <Chip
                key={l}
                label={l}
                selected={selected}
                variant={variant}
                onClick={() => update({ priceSensitivity: isAny ? undefined : (l as "Low" | "Medium" | "High") })}
              />
            );
          })}
        </div>
      </div>

      {/* Risk appetite */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Risk appetite</label>
        <div className="flex flex-wrap gap-2">
          {(["Any", "Low (conservative)", "Medium", "High (early adopter)"] as const).map((l) => {
            const val = l === "Any" ? undefined : l.startsWith("Low") ? "Low" : l.startsWith("High") ? "High" : "Medium";
            const isAny = l === "Any";
            const selected = isAny ? !value.riskAppetite : value.riskAppetite === val;
            return (
              <Chip
                key={l}
                label={l}
                selected={selected}
                onClick={() => update({ riskAppetite: isAny ? undefined : (val as "Low" | "Medium" | "High") })}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
