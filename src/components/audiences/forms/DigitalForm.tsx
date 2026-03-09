"use client";

import { PAYMENT_APPS, ECOMMERCE_PLATFORMS } from "@/data/audience-templates";
import type { DigitalFilter } from "@/types/audience-filters";

interface Props {
  value: DigitalFilter;
  onChange: (v: DigitalFilter) => void;
}

const DEVICES = [
  { label: "📱 Mobile / Smartphone", value: "Mobile" },
  { label: "💻 Laptop / Desktop", value: "Desktop" },
  { label: "📟 Tablet", value: "Tablet" },
];

const INTERNET_OPTIONS = ["Any", "5G", "4G", "WiFi-only", "3G or below"] as const;

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

function CheckItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
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
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="text-[13px] text-[#374151]">{label}</span>
    </label>
  );
}

export function DigitalForm({ value, onChange }: Props) {
  const update = (patch: Partial<DigitalFilter>) => onChange({ ...value, ...patch });

  const toggleArray = (key: "primaryDevice" | "paymentApps" | "ecommercePlatforms", item: string) => {
    const current = value[key] ?? [];
    const next = current.includes(item) ? current.filter((i) => i !== item) : [...current, item];
    update({ [key]: next });
  };

  return (
    <div className="space-y-6">
      {/* Primary device */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">Primary device</label>
        <div className="space-y-2">
          {DEVICES.map((d) => (
            <CheckItem
              key={d.value}
              label={d.label}
              checked={value.primaryDevice?.includes(d.value) ?? false}
              onChange={() => toggleArray("primaryDevice", d.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
