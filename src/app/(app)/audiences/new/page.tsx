"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { useToast } from "@/components/ui/Toast";
import { useUser } from "@/contexts/UserContext";
import { AudienceFiltersStep } from "@/components/audiences/AudienceFiltersStep";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { saveAudience } from "@/lib/db";
import type { AdvancedFilters } from "@/types/audience-filters";

export default function NewAudiencePage() {
  const { toggleMobileMenu, sidebarCollapsed } = useAppShell();
  const router = useRouter();
  const { showToast } = useToast();
  const { userId } = useUser();

  const [step, setStep] = useState<"details" | "builder">("details");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleContinueToBuilder = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast("error", "Audience name required", "Add a name to continue.");
      return;
    }
    setStep("builder");
  };

  const handleSaveDraft = useCallback(
    async (audienceDescription: string, filters: AdvancedFilters | null) => {
      if (!userId) return;
      setSaving(true);
      try {
        await saveAudience(userId, {
          name: name.trim(),
          description: description.trim() || undefined,
          audienceDescription: audienceDescription || undefined,
          filters: filters ?? undefined,
          status: "draft",
          usedInSimulations: 0,
          demographics: [],
          psychographics: [],
          budget: "",
          risk: "",
        });
        showToast("success", "Draft saved", "Your audience draft has been saved.");
        router.push("/audiences");
      } catch (err) {
        console.error(err);
        showToast("error", "Failed to save draft", "Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [userId, name, description, showToast, router]
  );

  const handleCreateAudience = useCallback(
    async (audienceDescription: string, filters: AdvancedFilters | null) => {
      const trimmed = name.trim();
      if (!trimmed) {
        showToast("error", "Audience name required", "Add a name to continue.");
        setStep("details");
        return;
      }
      const hasText = (audienceDescription?.length ?? 0) >= 10;
      const hasFilters = filters !== null;
      if (!hasText && !hasFilters) {
        showToast(
          "error",
          "Add at least one condition",
          "Describe your audience or add at least one filter."
        );
        return;
      }
      if (!userId) return;
      setSaving(true);
      try {
        await saveAudience(userId, {
          name: trimmed,
          description: description.trim() || undefined,
          audienceDescription: audienceDescription || undefined,
          filters: filters ?? undefined,
          status: "active",
          usedInSimulations: 0,
          demographics: [],
          psychographics: [],
          budget: "",
          risk: "",
        });
        showToast("success", "Audience created", "Your audience has been saved to Firebase.");
        router.push("/audiences");
      } catch (err) {
        console.error(err);
        showToast("error", "Failed to create audience", "Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [userId, name, description, showToast, router]
  );

  return (
    <>
      <TopBar title="Create Audience" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-24">
        {step === "details" ? (
          <div className="max-w-[560px] mx-auto space-y-5 mt-8 px-4 sm:px-0">

            {/* Step progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_3px_rgba(79,70,229,0.15)]">
                  1
                </span>
                <span className="text-[13px] font-semibold text-[#111827]">Details</span>
              </div>
              <div className="flex-1 h-[2px] rounded-full bg-[#E5E7EB] mx-1 overflow-hidden">
                <div className="h-full w-1/2 bg-[#4F46E5] rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full border-2 border-[#E5E7EB] text-[#9CA3AF] text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-[13px] font-medium text-[#9CA3AF]">Filters</span>
              </div>
            </div>

            {/* Main card */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">

              {/* Card header */}
              <div className="flex items-start gap-4 px-7 pt-7 pb-6 border-b border-[#F3F4F6]">
                <div className="w-10 h-10 rounded-xl bg-[#E0E7FF] flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#4338CA]" />
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-[#111827] leading-snug">
                    Audience Details
                  </h2>
                  <p className="text-[14px] text-[#6B7280] mt-1 leading-relaxed">
                    Give this audience a clear name so you can reuse it across simulations and ad experiments.
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div className="px-7 py-6 space-y-6">

                {/* Audience name field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[15px] font-semibold text-[#111827]">
                    Audience name
                    <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Urban millennials – Mumbai/Delhi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 transition-all"
                  />
                </div>

                {/* Description field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[15px] font-semibold text-[#111827]">
                    Description
                    <span className="text-[14px] font-normal text-[#9CA3AF]">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Short note for collaborators. e.g., Urban millennials in Mumbai/Delhi with high digital adoption, monthly income ₹50K-1L, frequent online shoppers."
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 transition-all resize-none leading-relaxed"
                  />
                  <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
                    Add helpful context for your team about this audience segment
                  </p>
                </div>
              </div>

              {/* Card footer / actions */}
              <div className="flex items-center justify-end px-7 py-5 border-t border-[#F3F4F6] bg-[#FAFAFA]">
                <button
                  onClick={handleContinueToBuilder}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white bg-[#4F46E5] rounded-[10px] hover:bg-[#4338CA] active:bg-[#3730A3] transition-all shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.4)]"
                >
                  Save &amp; continue to filters
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cancel link */}
            <div className="flex justify-start">
              <Link
                href="/audiences"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to audiences
              </Link>
            </div>
          </div>
        ) : (
          <AudienceFiltersStep
            sidebarCollapsed={sidebarCollapsed}
            onBack={() => setStep("details")}
            onSaveDraft={handleSaveDraft}
            onCreateAudience={handleCreateAudience}
            saving={saving}
          />
        )}
      </div>
    </>
  );
}
