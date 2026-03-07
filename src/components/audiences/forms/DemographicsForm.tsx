"use client";

import { DualRangeSlider } from "../DualRangeSlider";
import { EDUCATION_OPTIONS, OCCUPATION_OPTIONS } from "@/data/audience-templates";
import type { DemographicsFilter } from "@/types/audience-filters";

interface Props {
  value: DemographicsFilter;
  onChange: (v: DemographicsFilter) => void;
}

const GENDER_OPTIONS = ["All", "Male", "Female", "Other"] as const;
const MARITAL_OPTIONS = ["Any", "Single", "Married", "Divorced", "Widowed"] as const;

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
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

export function DemographicsForm({ value, onChange }: Props) {
  const update = (patch: Partial<DemographicsFilter>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      {/* Age range */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Age range</label>
        <p className="text-[12px] text-[#9CA3AF] mb-3">Set the minimum and maximum age for this audience</p>
        <DualRangeSlider
          min={13}
          max={75}
          step={1}
          valueMin={value.ageMin ?? 18}
          valueMax={value.ageMax ?? 65}
          onChange={(ageMin, ageMax) => update({ ageMin, ageMax })}
          formatLabel={(v) => `${v}`}
        />
        <p className="text-[12px] text-[#6B7280] mt-1 text-center">
          {value.ageMin ?? 18} – {value.ageMax ?? 65} years
        </p>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Gender</label>
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((g) => (
            <Chip
              key={g}
              label={g}
              selected={g === "All" ? !value.gender : value.gender === g}
              onClick={() => update({ gender: g === "All" ? null : (g as "Male" | "Female" | "Other") })}
            />
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Education</label>
        <div className="grid grid-cols-2 gap-2">
          {EDUCATION_OPTIONS.map((opt) => {
            const checked = value.education?.includes(opt.label) ?? false;
            return (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all ${
                    checked
                      ? "bg-[#F59E0B] border-[#F59E0B]"
                      : "border-[#D1D5DB] group-hover:border-[#F59E0B]"
                  }`}
                >
                  {checked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => {
                    const current = value.education ?? [];
                    const next = checked
                      ? current.filter((e) => e !== opt.label)
                      : [...current, opt.label];
                    update({ education: next });
                  }}
                />
                <span className="text-[13px] text-[#374151]">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Occupation</label>
        <p className="text-[12px] text-[#9CA3AF] mb-2">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {OCCUPATION_OPTIONS.map((occ) => {
            const selected = value.occupation?.includes(occ) ?? false;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => {
                  const current = value.occupation ?? [];
                  const next = selected ? current.filter((o) => o !== occ) : [...current, occ];
                  update({ occupation: next });
                }}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all ${
                  selected
                    ? "bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]"
                    : "bg-[#F3F4F6] text-[#6B7280] border border-transparent hover:border-[#F59E0B]"
                }`}
              >
                {selected ? `${occ} ✕` : occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marital status */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Marital status</label>
        <div className="flex flex-wrap gap-2">
          {MARITAL_OPTIONS.map((m) => {
            const isAny = m === "Any";
            const selected = isAny
              ? !value.maritalStatus?.length
              : value.maritalStatus?.includes(m) ?? false;
            return (
              <Chip
                key={m}
                label={m}
                selected={selected}
                onClick={() => {
                  if (isAny) {
                    update({ maritalStatus: [] });
                  } else {
                    const current = value.maritalStatus ?? [];
                    const next = selected ? current.filter((x) => x !== m) : [...current, m];
                    update({ maritalStatus: next });
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
