"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useCreditProfile } from "@/lib/credits";

/**
 * Compact credit balance pill. Renders in TopBar next to the profile menu.
 * Clicking navigates to /pricing so users on the free tier can see upgrade
 * options.
 */
export function CreditBadge() {
  const { profile, loading } = useCreditProfile();

  if (loading || !profile) {
    return (
      <Link
        href="/pricing"
        className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full border border-[#E8E4DE] bg-white text-[13px] text-[#6B7280] hover:bg-[#FDFBF7] transition-colors"
      >
        <Zap className="w-3.5 h-3.5 text-[#9CA3AF]" />
        <span>— credits</span>
      </Link>
    );
  }

  const { credits_remaining, credits_total, plan } = profile;
  const pct = credits_total > 0 ? credits_remaining / credits_total : 0;
  const low = pct < 0.2;

  return (
    <Link
      href="/pricing"
      title={`${credits_remaining} / ${credits_total} credits remaining (${plan} plan)`}
      className={`hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full border text-[13px] font-medium transition-colors ${
        low
          ? "border-[#FCA5A5] bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEE2E2]"
          : "border-[#E8E4DE] bg-white text-[#374151] hover:bg-[#FDFBF7]"
      }`}
    >
      <Zap
        className={`w-3.5 h-3.5 ${low ? "text-[#DC2626]" : "text-[#4F46E5]"}`}
      />
      <span>
        {credits_remaining}
        <span className="text-[#9CA3AF] font-normal"> / {credits_total}</span>
      </span>
      {plan !== "free" && (
        <span className="ml-1 text-[11px] uppercase tracking-wide text-[#4F46E5]">
          {plan}
        </span>
      )}
    </Link>
  );
}
