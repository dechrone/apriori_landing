"use client";

import { DualRangeSlider } from "../DualRangeSlider";
import { formatCurrency } from "@/lib/audience-filter-utils";
import type { IncomeFilter } from "@/types/audience-filters";
import { Minus, Plus } from "lucide-react";

interface Props {
  value: IncomeFilter;
  onChange: (v: IncomeFilter) => void;
}

const INCOME_BRACKETS = [
  { label: "Below ₹3L", annualMin: 0, annualMax: 300000 },
  { label: "₹3–10L", annualMin: 300000, annualMax: 1000000 },
  { label: "₹10–25L", annualMin: 1000000, annualMax: 2500000 },
  { label: "₹25–50L", annualMin: 2500000, annualMax: 5000000 },
  { label: "₹50L+", annualMin: 5000000, annualMax: 10000000 },
];

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[13px] border transition-all cursor-pointer ${
        selected
          ? "border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] font-semibold border-[1.5px]"
          : "border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#F59E0B] hover:bg-[#FFFBEB]"
      }`}
    >
      {label}
    </button>
  );
}

export function IncomeForm({ value, onChange }: Props) {
  const update = (patch: Partial<IncomeFilter>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      {/* Monthly income */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Monthly income</label>
        <p className="text-[12px] text-[#9CA3AF] mb-3">Range in ₹ per month</p>
        <DualRangeSlider
          min={5000}
          max={500000}
          step={5000}
          valueMin={value.monthlyMin ?? 10000}
          valueMax={value.monthlyMax ?? 100000}
          onChange={(monthlyMin: number, monthlyMax: number) => update({ monthlyMin, monthlyMax })}
          formatLabel={(v: number) => `₹${formatCurrency(v)}`}
        />
      </div>

      {/* Annual income */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Annual income</label>
        <p className="text-[12px] text-[#9CA3AF] mb-3">Range in ₹ per year</p>
        <DualRangeSlider
          min={60000}
          max={10000000}
          step={100000}
          valueMin={value.annualMin ?? 300000}
          valueMax={value.annualMax ?? 2500000}
          onChange={(annualMin: number, annualMax: number) => update({ annualMin, annualMax })}
          formatLabel={(v: number) => `₹${formatCurrency(v)}`}
        />
      </div>

      {/* Income bracket shortcuts */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Income bracket shortcut</label>
        <div className="flex flex-wrap gap-2">
          {INCOME_BRACKETS.map((bracket) => (
            <Chip
              key={bracket.label}
              label={bracket.label}
              selected={value.incomeBracket === bracket.label}
              onClick={() => {
                update({
                  incomeBracket: bracket.label,
                  annualMin: bracket.annualMin,
                  annualMax: bracket.annualMax,
                });
              }}
            />
          ))}
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1.5 italic">
          Selecting a bracket updates the annual income range above
        </p>
      </div>

      {/* Household size */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Household size</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const min = Math.max(1, (value.householdSizeMin ?? 1) - 1);
              update({ householdSizeMin: min });
            }}
            className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] hover:bg-[#FFFBEB] transition-all"
          >
            <Minus className="w-3.5 h-3.5 text-[#6B7280]" />
          </button>
          <span className="text-[14px] text-[#1A1A1A] font-medium min-w-[80px] text-center">
            {value.householdSizeMin ?? 1} – {value.householdSizeMax ?? 4} people
          </span>
          <button
            type="button"
            onClick={() => {
              const max = Math.min(10, (value.householdSizeMax ?? 4) + 1);
              update({ householdSizeMax: max });
            }}
            className="w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] hover:bg-[#FFFBEB] transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#6B7280]" />
          </button>
        </div>
      </div>
    </div>
  );
}
