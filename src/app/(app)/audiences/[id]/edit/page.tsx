"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { useToast } from "@/components/ui/Toast";
import { useUser } from "@/contexts/UserContext";
import { AudienceFiltersStep } from "@/components/audiences/AudienceFiltersStep";
import { ArrowLeft, ArrowRight, Users, Loader2, RefreshCw } from "lucide-react";
import { getAudience, updateAudience, type AudienceDoc } from "@/lib/db";
import { refreshAudiencePersonas } from "@/lib/backend-simulation";
import type { AdvancedFilters } from "@/types/audience-filters";

export default function EditAudiencePage() {
  const { toggleMobileMenu, sidebarCollapsed } = useAppShell();
  const router = useRouter();
  const params = useParams();
  const audienceId = params.id as string;
  const { showToast } = useToast();
  const { userId } = useUser();

  const [loading, setLoading] = useState(true);
  const [audience, setAudience] = useState<AudienceDoc | null>(null);

  const [step, setStep] = useState<"details" | "builder">("details");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshingPersonas, setRefreshingPersonas] = useState(false);

  // Fetch existing audience
  useEffect(() => {
    if (!userId || !audienceId) return;
    (async () => {
      try {
        const doc = await getAudience(userId, audienceId);
        if (!doc) {
          showToast("error", "Audience not found", "Redirecting to audiences list.");
          router.push("/audiences");
          return;
        }
        setAudience(doc);
        setName(doc.name || "");
        setDescription(doc.description || "");
      } catch (err) {
        console.error(err);
        showToast("error", "Failed to load audience", "Please try again.");
        router.push("/audiences");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, audienceId, showToast, router]);

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
      if (!userId || !audienceId) return;
      setSaving(true);
      try {
        await updateAudience(userId, audienceId, {
          name: name.trim(),
          description: description.trim() || undefined,
          audienceDescription: audienceDescription || undefined,
          filters: filters ?? undefined,
          status: "draft",
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
    [userId, audienceId, name, description, showToast, router]
  );

  const handleSaveAudience = useCallback(
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
      if (!userId || !audienceId) return;
      setSaving(true);
      try {
        await updateAudience(userId, audienceId, {
          name: trimmed,
          description: description.trim() || undefined,
          audienceDescription: audienceDescription || undefined,
          filters: filters ?? undefined,
          status: "active",
        });
        showToast("success", "Audience updated", "Your changes have been saved.");
        router.push("/audiences");
      } catch (err) {
        console.error(err);
        showToast("error", "Failed to update audience", "Please try again.");
      } finally {
        setSaving(false);
      }
    },
    [userId, audienceId, name, description, showToast, router]
  );

  const handleRefreshPersonas = useCallback(async () => {
    if (!audienceId) return;
    setRefreshingPersonas(true);
    try {
      // Backend: POST /api/v1/audiences/{id}/refresh-personas. Invalidates the
      // Supabase persona cache so the next simulation against this audience
      // re-runs the full filter-first retrieval pipeline. Idempotent — 200
      // even if nothing was cached.
      await refreshAudiencePersonas(audienceId);
      showToast(
        "success",
        "Persona cache cleared",
        "Next simulation will re-run retrieval against the latest audience text.",
      );
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        "Failed to refresh personas",
        err instanceof Error ? err.message : "Is the backend running?",
      );
    } finally {
      setRefreshingPersonas(false);
    }
  }, [audienceId, showToast]);

  if (loading) {
    return (
      <>
        <TopBar title="Edit Audience" onMenuClick={toggleMobileMenu} />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Edit Audience" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-24">
        {step === "details" ? (
          <div className="max-w-[560px] mx-auto space-y-5 mt-8 px-4 sm:px-0">

            {/* Step progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#F59E0B] text-white text-[11px] font-bold flex items-center justify-center shadow-[0_0_0_3px_rgba(245,158,11,0.15)]">
                  1
                </span>
                <span className="text-[13px] font-semibold text-[#111827]">Details</span>
              </div>
              <div className="flex-1 h-[2px] rounded-full bg-[#E5E7EB] mx-1 overflow-hidden">
                <div className="h-full w-1/2 bg-[#F59E0B] rounded-full" />
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
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <h2 className="text-[20px] font-bold text-[#111827] leading-snug">
                    Edit Audience Details
                  </h2>
                  <p className="text-[14px] text-[#6B7280] mt-1 leading-relaxed">
                    Update this audience&apos;s name and description.
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
                    className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/15 transition-all"
                  />
                </div>

                {/* Description field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[15px] font-semibold text-[#111827]">
                    Description
                    <span className="text-[14px] font-normal text-[#9CA3AF]">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Short note for collaborators."
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/15 transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Card footer / actions */}
              <div className="flex items-center justify-between gap-4 px-7 py-5 border-t border-[#F3F4F6] bg-[#FAFAFA]">
                {/* Refresh personas — secondary, advanced action.
                    The backend caches retrieved persona UUIDs per audience to
                    skip the full LLM filter-extraction + BM25 hybrid retrieval
                    on repeat runs. Users hit this when they've edited the
                    audience text or just want a freshly sampled cohort. */}
                <button
                  type="button"
                  onClick={handleRefreshPersonas}
                  disabled={refreshingPersonas}
                  title="Clear the cached persona cohort for this audience. The next simulation will re-retrieve."
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#6B7280] hover:text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {refreshingPersonas ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  {refreshingPersonas ? "Refreshing…" : "Refresh cached personas"}
                </button>

                <button
                  onClick={handleContinueToBuilder}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[10px] hover:bg-[#D97706] active:bg-[#B45309] transition-all shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.4)]"
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
            onCreateAudience={handleSaveAudience}
            saving={saving}
            initialAudienceText={audience?.audienceDescription ?? ""}
            initialFilters={(audience?.filters as AdvancedFilters) ?? null}
            createButtonLabel="Save changes"
          />
        )}
      </div>
    </>
  );
}
