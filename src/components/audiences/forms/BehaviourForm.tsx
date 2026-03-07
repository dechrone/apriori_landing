"use client";

import { DualRangeSlider } from "../DualRangeSlider";
import { formatCurrency } from "@/lib/audience-filter-utils";
import type { BehaviourFilter } from "@/types/audience-filters";

interface Props {
  value: BehaviourFilter;
  onChange: (v: BehaviourFilter) => void;
}

const FREQ_OPTIONS = ["Any", "Daily", "Weekly", "Monthly", "Occasional"] as const;
const RISK_OPTIONS = ["Any", "Low", "Medium", "High"] as const;
const LTV_OPTIONS = ["Any", "Low", "Medium", "High"] as const;

function Chip({
  label,
  selected,
  onClick,
  variant = "default",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "default" | "green" | "amber" | "red";
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
    red: selected
      ? "border-red-300 bg-red-50 text-red-700 font-semibold border-[1.5px]"
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

function churnVariant(label: string, selected: boolean): "default" | "green" | "amber" | "red" {
  if (!selected) return "default";
  if (label === "Low") return "green";
  if (label === "Medium") return "amber";
  if (label === "High") return "red";
  return "default";
}

function ltvVariant(label: string, selected: boolean): "default" | "green" | "amber" | "red" {
  if (!selected) return "default";
  if (label === "High") return "green";
  if (label === "Low") return "red";
  return "default";
}

export function BehaviourForm({ value, onChange }: Props) {
  const update = (patch: Partial<BehaviourFilter>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      {/* Purchase frequency */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Purchase frequency</label>
        <div className="flex flex-wrap gap-2">
          {FREQ_OPTIONS.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={f === "Any" ? !value.purchaseFrequency : value.purchaseFrequency === f}
              onClick={() => update({ purchaseFrequency: f === "Any" ? undefined : f })}
            />
          ))}
        </div>
      </div>

      {/* Cart abandonment toggle */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Cart abandonment</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => update({ highCartAbandonment: !value.highCartAbandonment })}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              value.highCartAbandonment ? "bg-amber-400" : "bg-[#E5E7EB]"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                value.highCartAbandonment ? "translate-x-[18px]" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-[13px] text-[#374151]">High cart abandonment</span>
        </div>
      </div>

      {/* Churn risk */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Churn risk</label>
        <div className="flex flex-wrap gap-2">
          {RISK_OPTIONS.map((r) => {
            const isAny = r === "Any";
            const selected = isAny ? !value.churnRisk : value.churnRisk === r;
            return (
              <Chip
                key={r}
                label={r}
                selected={selected}
                variant={churnVariant(r, selected)}
                onClick={() => update({ churnRisk: isAny ? undefined : (r as "Low" | "Medium" | "High") })}
              />
            );
          })}
        </div>
      </div>

      {/* Average order value */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Average order value</label>
        <p className="text-[12px] text-[#9CA3AF] mb-3">Range in ₹</p>
        <DualRangeSlider
          min={0}
          max={50000}
          step={500}
          valueMin={value.avgOrderValueMin ?? 0}
          valueMax={value.avgOrderValueMax ?? 50000}
          onChange={(avgOrderValueMin: number, avgOrderValueMax: number) =>
            update({ avgOrderValueMin, avgOrderValueMax })
          }
          formatLabel={(v: number) => `₹${formatCurrency(v)}`}
        />
      </div>

      {/* Customer lifetime value */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Customer lifetime value</label>
        <div className="flex flex-wrap gap-2">
          {LTV_OPTIONS.map((l) => {
            const isAny = l === "Any";
            const selected = isAny ? !value.lifetimeValue : value.lifetimeValue === l;
            return (
              <Chip
                key={l}
                label={l}
                selected={selected}
                variant={ltvVariant(l, selected)}
                onClick={() => update({ lifetimeValue: isAny ? undefined : (l as "Low" | "Medium" | "High") })}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
