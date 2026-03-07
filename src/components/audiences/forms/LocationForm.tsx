"use client";

import { useState } from "react";
import { INDIAN_STATES } from "@/data/audience-templates";
import type { LocationFilter } from "@/types/audience-filters";
import { ChevronDown, X } from "lucide-react";

interface Props {
  value: LocationFilter;
  onChange: (v: LocationFilter) => void;
}

const CITY_TIERS = ["Tier 1", "Tier 2", "Tier 3", "Rural"] as const;

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

export function LocationForm({ value, onChange }: Props) {
  const update = (patch: Partial<LocationFilter>) => onChange({ ...value, ...patch });
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityInput, setCityInput] = useState("");

  return (
    <div className="space-y-6">
      {/* City tier */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">City tier</label>
        <div className="flex flex-wrap gap-2">
          {CITY_TIERS.map((tier) => {
            const selected = value.cityTiers?.includes(tier) ?? false;
            return (
              <Chip
                key={tier}
                label={tier}
                selected={selected}
                onClick={() => {
                  const current = value.cityTiers ?? [];
                  const next = selected ? current.filter((t) => t !== tier) : [...current, tier];
                  update({ cityTiers: next as LocationFilter["cityTiers"] });
                }}
              />
            );
          })}
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-1.5">
          Tier 1: Mumbai, Delhi, Bengaluru · Tier 2: Jaipur, Surat, Nagpur
        </p>
      </div>

      {/* State */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">State</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[13px] text-[#6B7280] bg-white hover:border-[#F59E0B] transition-colors"
          >
            <span>{value.states?.length ? `${value.states.length} states selected` : "Select states..."}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${stateDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {stateDropdownOpen && (
            <div className="absolute z-20 top-full mt-1 left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-[#E5E7EB] rounded-lg shadow-lg">
              {INDIAN_STATES.map((state) => {
                const checked = value.states?.includes(state) ?? false;
                return (
                  <button
                    key={state}
                    type="button"
                    onClick={() => {
                      const current = value.states ?? [];
                      const next = checked ? current.filter((s) => s !== state) : [...current, state];
                      update({ states: next });
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-[#374151] hover:bg-[#FFFBEB] text-left"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center ${
                        checked ? "bg-[#F59E0B] border-[#F59E0B]" : "border-[#D1D5DB]"
                      }`}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {state}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {value.states && value.states.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {value.states.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium bg-[#FEF3C7] text-[#92400E]"
              >
                {s}
                <button
                  type="button"
                  onClick={() => update({ states: value.states!.filter((x) => x !== s) })}
                  className="text-[#9CA3AF] hover:text-[#EF4444]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Specific cities */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Specific cities</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && cityInput.trim()) {
                e.preventDefault();
                const city = cityInput.trim();
                if (!value.cities?.includes(city)) {
                  update({ cities: [...(value.cities ?? []), city] });
                }
                setCityInput("");
              }
            }}
            placeholder="Type a city and press Enter..."
            className="flex-1 border border-[#E5E7EB] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/15 transition-all"
          />
        </div>
        {value.cities && value.cities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {value.cities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-medium bg-[#FEF3C7] text-[#92400E]"
              >
                {c}
                <button
                  type="button"
                  onClick={() => update({ cities: value.cities!.filter((x) => x !== c) })}
                  className="text-[#9CA3AF] hover:text-[#EF4444]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
