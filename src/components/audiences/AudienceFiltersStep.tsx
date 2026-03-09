"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Minus,
  Plus,
  Settings2,
  X,
} from "lucide-react";
import { AUDIENCE_TEMPLATES } from "@/data/audience-templates";
import {
  countActiveFilters,
  getActiveCategories,
  getFilterTags,
  generateFilterSummary,
  hasAnyAdvancedFilter,
} from "@/lib/audience-filter-utils";
import { DemographicsForm } from "./forms/DemographicsForm";
import { LocationForm } from "./forms/LocationForm";
import { IncomeForm } from "./forms/IncomeForm";
import { BehaviourForm } from "./forms/BehaviourForm";
import { PsychographicsForm } from "./forms/PsychographicsForm";
import { DigitalForm } from "./forms/DigitalForm";
import type {
  AdvancedFilters,
  FilterCategory,
  DemographicsFilter,
  LocationFilter,
  IncomeFilter,
  BehaviourFilter,
  PsychographicsFilter,
  DigitalFilter,
  FilterLogic,
} from "@/types/audience-filters";

/* ──── Category definitions ──── */
const CATEGORIES: {
  key: FilterCategory;
  icon: string;
  title: string;
  subtitle: string;
}[] = [
  { key: "demographics", icon: "👤", title: "Audience Attributes", subtitle: "Age, gender, education" },
  { key: "location", icon: "📍", title: "Location", subtitle: "City tier, state, specific cities" },
  { key: "income", icon: "💰", title: "Income & Spending", subtitle: "Monthly/annual income, household" },
  { key: "digital", icon: "📱", title: "Digital Habits", subtitle: "Primary device" },
];

/* ──── Props ──── */
interface AudienceFiltersStepProps {
  sidebarCollapsed: boolean;
  onBack: () => void;
  onSaveDraft: (audienceDescription: string, filters: AdvancedFilters | null) => Promise<void>;
  onCreateAudience: (audienceDescription: string, filters: AdvancedFilters | null) => Promise<void>;
  saving: boolean;
  /** Pre-fill for edit mode */
  initialAudienceText?: string;
  initialFilters?: AdvancedFilters | null;
  /** Custom label for the primary CTA button (e.g. "Save changes") */
  createButtonLabel?: string;
}

/* ──── Component ──── */
export function AudienceFiltersStep({
  sidebarCollapsed,
  onBack,
  onSaveDraft,
  onCreateAudience,
  saving,
  initialAudienceText = "",
  initialFilters = null,
  createButtonLabel = "Create audience",
}: AudienceFiltersStepProps) {
  // --- Text input state ---
  const [audienceText, setAudienceText] = useState(initialAudienceText);
  const [debouncedText, setDebouncedText] = useState(initialAudienceText);
  const [appliedTemplate, setAppliedTemplate] = useState<string | null>(null);
  const [templateWarning, setTemplateWarning] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<string | null>(null);

  // --- Advanced filters state ---
  const [advancedOpen, setAdvancedOpen] = useState(!!initialFilters);
  const [templatesVisible, setTemplatesVisible] = useState(!initialFilters);
  const [expandedCategory, setExpandedCategory] = useState<FilterCategory | null>(null);
  const [filterLogic, setFilterLogic] = useState<FilterLogic>(initialFilters?.logic ?? "AND");
  const [demographics, setDemographics] = useState<DemographicsFilter>(initialFilters?.demographics ?? {});
  const [location, setLocation] = useState<LocationFilter>(initialFilters?.location ?? {});
  const [income, setIncome] = useState<IncomeFilter>(initialFilters?.income ?? {});
  const [behaviour, setBehaviour] = useState<BehaviourFilter>(initialFilters?.behaviour ?? {});
  const [psychographics, setPsychographics] = useState<PsychographicsFilter>(initialFilters?.psychographics ?? {});
  const [digital, setDigital] = useState<DigitalFilter>(initialFilters?.digital ?? {});

  // --- Validation ---
  const [validationError, setValidationError] = useState(false);

  // --- Summary pulse ---
  const [summaryPulsing, setSummaryPulsing] = useState(false);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPulse = useCallback(() => {
    setSummaryPulsing(true);
    if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = setTimeout(() => setSummaryPulsing(false), 2000);
  }, []);

  // Debounce text for summary
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedText(audienceText);
      if (audienceText) triggerPulse();
    }, 400);
    return () => clearTimeout(t);
  }, [audienceText, triggerPulse]);

  // Build combined filters object
  const advancedFilters = useMemo<AdvancedFilters | null>(() => {
    const f: AdvancedFilters = { logic: filterLogic };
    let hasAny = false;
    if (Object.keys(demographics).length) { f.demographics = demographics; hasAny = true; }
    if (Object.keys(location).length) { f.location = location; hasAny = true; }
    if (Object.keys(income).length) { f.income = income; hasAny = true; }
    if (Object.keys(behaviour).length) { f.behaviour = behaviour; hasAny = true; }
    if (Object.keys(psychographics).length) { f.psychographics = psychographics; hasAny = true; }
    if (Object.keys(digital).length) { f.digital = digital; hasAny = true; }
    return hasAny ? f : null;
  }, [filterLogic, demographics, location, income, behaviour, psychographics, digital]);

  const filterCount = countActiveFilters(advancedFilters);
  const activeCategories = getActiveCategories(advancedFilters);
  const filterTags = getFilterTags(advancedFilters);

  const canCreate = audienceText.trim().length >= 10 || hasAnyAdvancedFilter(advancedFilters);

  // --- Template apply ---
  const handleApplyTemplate = useCallback(
    (templateId: string) => {
      const tpl = AUDIENCE_TEMPLATES.find((t) => t.id === templateId);
      if (!tpl) return;

      if (audienceText.trim().length > 0 && appliedTemplate !== templateId) {
        setTemplateWarning(true);
        setPendingTemplate(templateId);
        return;
      }

      setAudienceText(tpl.text);
      setAppliedTemplate(templateId);
      setTemplateWarning(false);
      setPendingTemplate(null);
      triggerPulse();
    },
    [audienceText, appliedTemplate, triggerPulse]
  );

  const confirmTemplateReplace = useCallback(() => {
    if (!pendingTemplate) return;
    const tpl = AUDIENCE_TEMPLATES.find((t) => t.id === pendingTemplate);
    if (!tpl) return;
    setAudienceText(tpl.text);
    setAppliedTemplate(pendingTemplate);
    setTemplateWarning(false);
    setPendingTemplate(null);
    triggerPulse();
  }, [pendingTemplate, triggerPulse]);

  // --- Toggle advanced filters ---
  const toggleAdvanced = useCallback(() => {
    setAdvancedOpen((prev) => {
      if (!prev) setTemplatesVisible(false);
      else setTemplatesVisible(true);
      return !prev;
    });
  }, []);

  // --- Category toggle ---
  const toggleCategory = useCallback((cat: FilterCategory) => {
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  }, []);

  // --- Clear specific category ---
  const clearCategory = useCallback((cat: FilterCategory) => {
    switch (cat) {
      case "demographics": setDemographics({}); break;
      case "location": setLocation({}); break;
      case "income": setIncome({}); break;
      case "behaviour": setBehaviour({}); break;
      case "psychographics": setPsychographics({}); break;
      case "digital": setDigital({}); break;
    }
    triggerPulse();
  }, [triggerPulse]);

  // --- Clear all ---
  const clearAllFilters = useCallback(() => {
    setDemographics({});
    setLocation({});
    setIncome({});
    setBehaviour({});
    setPsychographics({});
    setDigital({});
    setExpandedCategory(null);
    triggerPulse();
  }, [triggerPulse]);

  // --- Remove single tag ---
  const removeTag = useCallback(
    (key: string) => {
      // Parse key to figure out which filter to remove
      if (key === "demo-age") setDemographics((p) => ({ ...p, ageMin: undefined, ageMax: undefined }));
      else if (key === "demo-gender") setDemographics((p) => ({ ...p, gender: null }));
      else if (key.startsWith("demo-edu-")) {
        const v = key.replace("demo-edu-", "");
        setDemographics((p) => ({ ...p, education: p.education?.filter((e) => e !== v) }));
      } else if (key.startsWith("demo-occ-")) {
        const v = key.replace("demo-occ-", "");
        setDemographics((p) => ({ ...p, occupation: p.occupation?.filter((o) => o !== v) }));
      } else if (key.startsWith("demo-mar-")) {
        const v = key.replace("demo-mar-", "");
        setDemographics((p) => ({ ...p, maritalStatus: p.maritalStatus?.filter((m) => m !== v) }));
      } else if (key.startsWith("loc-tier-")) {
        const v = key.replace("loc-tier-", "");
        setLocation((p) => ({ ...p, cityTiers: p.cityTiers?.filter((t) => t !== v) as LocationFilter["cityTiers"] }));
      } else if (key.startsWith("loc-state-")) {
        const v = key.replace("loc-state-", "");
        setLocation((p) => ({ ...p, states: p.states?.filter((s) => s !== v) }));
      } else if (key.startsWith("loc-city-")) {
        const v = key.replace("loc-city-", "");
        setLocation((p) => ({ ...p, cities: p.cities?.filter((c) => c !== v) }));
      } else if (key === "inc-monthly") setIncome((p) => ({ ...p, monthlyMin: undefined, monthlyMax: undefined }));
      else if (key === "inc-bracket") setIncome((p) => ({ ...p, incomeBracket: undefined }));
      else if (key === "inc-household") setIncome((p) => ({ ...p, householdSizeMin: undefined, householdSizeMax: undefined }));
      else if (key === "beh-freq") setBehaviour((p) => ({ ...p, purchaseFrequency: undefined }));
      else if (key === "beh-cart") setBehaviour((p) => ({ ...p, highCartAbandonment: false }));
      else if (key === "beh-churn") setBehaviour((p) => ({ ...p, churnRisk: undefined }));
      else if (key === "beh-ltv") setBehaviour((p) => ({ ...p, lifetimeValue: undefined }));
      else if (key === "psych-loyalty") setPsychographics((p) => ({ ...p, brandLoyalty: undefined }));
      else if (key === "psych-price") setPsychographics((p) => ({ ...p, priceSensitivity: undefined }));
      else if (key === "psych-risk") setPsychographics((p) => ({ ...p, riskAppetite: undefined }));
      else if (key.startsWith("dig-dev-")) {
        const v = key.replace("dig-dev-", "");
        setDigital((p) => ({ ...p, primaryDevice: p.primaryDevice?.filter((d) => d !== v) }));
      } else if (key.startsWith("dig-pay-")) {
        const v = key.replace("dig-pay-", "");
        setDigital((p) => ({ ...p, paymentApps: p.paymentApps?.filter((a) => a !== v) }));
      } else if (key.startsWith("dig-ecom-")) {
        const v = key.replace("dig-ecom-", "");
        setDigital((p) => ({ ...p, ecommercePlatforms: p.ecommercePlatforms?.filter((e) => e !== v) }));
      } else if (key === "dig-internet") setDigital((p) => ({ ...p, internetConnection: undefined }));
      triggerPulse();
    },
    [triggerPulse]
  );

  // --- Render category form ---
  const renderCategoryForm = (cat: FilterCategory) => {
    switch (cat) {
      case "demographics":
        return <DemographicsForm value={demographics} onChange={(v) => { setDemographics(v); triggerPulse(); }} />;
      case "location":
        return <LocationForm value={location} onChange={(v) => { setLocation(v); triggerPulse(); }} />;
      case "income":
        return <IncomeForm value={income} onChange={(v) => { setIncome(v); triggerPulse(); }} />;
      case "behaviour":
        return <BehaviourForm value={behaviour} onChange={(v) => { setBehaviour(v); triggerPulse(); }} />;
      case "psychographics":
        return <PsychographicsForm value={psychographics} onChange={(v) => { setPsychographics(v); triggerPulse(); }} />;
      case "digital":
        return <DigitalForm value={digital} onChange={(v) => { setDigital(v); triggerPulse(); }} />;
    }
  };

  // --- Get category summary chips for card header ---
  const getCategorySummary = (cat: FilterCategory): string => {
    const tags = filterTags.filter((t) => {
      const catMap: Record<string, FilterCategory> = {
        "Audience Attributes": "demographics",
        Location: "location",
        "Income & Spending": "income",
        Behaviour: "behaviour",
        Psychographics: "psychographics",
        "Digital Habits": "digital",
      };
      return catMap[t.category] === cat;
    });
    if (!tags.length) return "";
    return tags.map((t) => t.label).join(" · ");
  };

  // --- Footer status ---
  const footerStatus = useMemo(() => {
    const hasText = audienceText.trim().length > 0;
    const hasFilters = hasAnyAdvancedFilter(advancedFilters);
    if (hasText && hasFilters) return `Description + ${filterCount} filters`;
    if (hasText) return "Description added";
    if (hasFilters) return `${filterCount} filters active`;
    return "";
  }, [audienceText, advancedFilters, filterCount]);

  // --- Grouped tags by category ---
  const groupedTags = useMemo(() => {
    const groups: Record<string, typeof filterTags> = {};
    filterTags.forEach((t) => {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    });
    return groups;
  }, [filterTags]);

  // --- Handle create ---
  const handleCreate = useCallback(async () => {
    if (!canCreate) {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 3000);
      return;
    }
    await onCreateAudience(audienceText.trim(), advancedFilters);
  }, [canCreate, onCreateAudience, audienceText, advancedFilters]);

  const handleDraft = useCallback(async () => {
    await onSaveDraft(audienceText.trim(), advancedFilters);
  }, [onSaveDraft, audienceText, advancedFilters]);

  const charCount = audienceText.length;
  const charColor = charCount >= 500 ? "text-[#EF4444]" : charCount >= 400 ? "text-[#F59E0B]" : "text-[#9CA3AF]";

  return (
    <div className="space-y-0 mt-6">
      {/* ── Step indicator ── */}
      <div className="max-w-[480px] mx-auto flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-4 h-4" />
          </span>
          <span className="text-sm font-medium text-emerald-600">Details</span>
        </div>
        <div className="flex-1 h-[2px] bg-[#F59E0B] rounded-full" />
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white text-sm font-bold flex items-center justify-center">
            2
          </span>
          <span className="text-sm font-semibold text-[#1A1A1A]">Filters</span>
        </div>
      </div>

      {/* ── Main layout: left 60% / right 40% ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 lg:px-8">
        {/* LEFT PANEL */}
        <div className="lg:col-span-3">
          <div className="max-w-[680px] mx-auto space-y-5">

            {/* ── BLOCK 1: Natural language input ── */}
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-6 sm:p-7">
              <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-1">
                Describe your audience
              </h3>
              <p className="text-[13px] text-[#6B7280] mb-4">
                Write who you want to simulate — in plain English.
              </p>
              <div className="relative">
                <textarea
                  value={audienceText}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setAudienceText(e.target.value);
                  }}
                  placeholder={'e.g. "Urban women aged 25–35, living in Tier 1 cities, earning ₹50K–1L/month, who shop online frequently and prefer UPI payments."'}
                  rows={5}
                  className="w-full min-h-[120px] max-h-[240px] resize-y border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3.5 text-[14px] text-[#1A1A1A] leading-[1.7] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] transition-all duration-150"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[12px] text-[#9CA3AF]">
                    The more specific you are, the better your simulation results.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] ${charColor}`}>
                      {charCount} / 500
                    </span>
                    {audienceText.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setAudienceText("");
                          setAppliedTemplate(null);
                        }}
                        className="text-[12px] text-[#9CA3AF] hover:text-[#EF4444] transition-colors cursor-pointer"
                      >
                        Clear ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── BLOCK 2: Templates ── */}
            {templatesVisible && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#6B7280]">
                    Start from a template
                  </span>
                  <button
                    type="button"
                    onClick={() => setTemplatesVisible(false)}
                    className="text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
                  >
                    Hide
                  </button>
                </div>

                {/* Template warning */}
                {templateWarning && (
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-[13px] text-[#92400E]">
                      This will replace your current description.
                    </span>
                    <button
                      type="button"
                      onClick={confirmTemplateReplace}
                      className="text-[12px] font-semibold text-[#F59E0B] hover:text-[#D97706] cursor-pointer"
                    >
                      Replace →
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTemplateWarning(false); setPendingTemplate(null); }}
                      className="text-[12px] text-[#9CA3AF] hover:text-[#6B7280] ml-auto cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                  {AUDIENCE_TEMPLATES.map((tpl) => {
                    const isApplied = appliedTemplate === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        className={`min-w-[180px] max-w-[200px] flex-shrink-0 rounded-xl p-4 border-[1.5px] cursor-pointer transition-all duration-[180ms] ${
                          isApplied
                            ? "border-[#F59E0B] bg-[#FFFBEB]"
                            : "border-[#E8E4DE] bg-white hover:border-[#F59E0B] hover:shadow-[0_4px_12px_rgba(245,158,11,0.1)] hover:-translate-y-px"
                        }`}
                        onClick={() => handleApplyTemplate(tpl.id)}
                      >
                        <span className="text-[20px] block mb-2">{tpl.icon}</span>
                        <p className="text-[13px] font-semibold text-[#1A1A1A] mb-2">{tpl.name}</p>
                        <div className="flex flex-col gap-0.5 mb-3">
                          {tpl.chips.map((chip) => (
                            <span key={chip} className="text-[11px] text-[#6B7280] leading-[1.5]">
                              · {chip}
                            </span>
                          ))}
                        </div>
                        {isApplied ? (
                          <span className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Applied
                          </span>
                        ) : (
                          <span className="text-[12px] font-semibold text-[#F59E0B] hover:text-[#D97706] flex items-center gap-1">
                            Use template <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Show templates link when hidden */}
            {!templatesVisible && !advancedOpen && (
              <button
                type="button"
                onClick={() => setTemplatesVisible(true)}
                className="text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
              >
                Show templates
              </button>
            )}

            {/* ── BLOCK 3: Advanced Filters Toggle ── */}
            <div
              onClick={toggleAdvanced}
              className={`flex items-center justify-between p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-[180ms] mt-2 ${
                advancedOpen
                  ? "border-[1.5px] border-[#F59E0B] border-solid bg-white rounded-b-none"
                  : "border-[1.5px] border-dashed border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#F59E0B] hover:border-solid hover:bg-[#FFFBEB]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings2 className="w-4 h-4 text-[#9CA3AF]" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-semibold text-[#374151]">
                      Advanced filters
                    </span>
                    <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
                  </div>
                  <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                    Add precise demographic &amp; behavioural targeting rules
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {filterCount > 0 && !advancedOpen && (
                  <span className="text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] rounded-full px-2 py-0.5">
                    {filterCount} filters
                  </span>
                )}
                {advancedOpen ? (
                  <div className="flex items-center gap-1">
                    <Minus className="w-5 h-5 text-[#9CA3AF]" />
                    <span className="text-[12px] text-[#9CA3AF]">Collapse</span>
                  </div>
                ) : (
                  <Plus className="w-5 h-5 text-[#9CA3AF]" />
                )}
              </div>
            </div>

            {/* ── BLOCK 4: Advanced Filter Builder ── */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                advancedOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-[1.5px] border-[#F59E0B] border-t-0 rounded-b-xl bg-white p-6 -mt-5 mb-5">
                {/* Show templates link inside advanced */}
                {!templatesVisible && (
                  <button
                    type="button"
                    onClick={() => setTemplatesVisible(true)}
                    className="text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors mb-4 cursor-pointer"
                  >
                    Show templates
                  </button>
                )}

                {/* Category grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((cat, idx) => {
                    const isActive = activeCategories.includes(cat.key);
                    const isExpanded = expandedCategory === cat.key;
                    const summary = getCategorySummary(cat.key);

                    return (
                      <div key={cat.key} className="contents">
                        {/* AND/OR connector — rendered between active categories in full width */}
                        {idx > 0 &&
                          isActive &&
                          activeCategories.length >= 2 &&
                          activeCategories.indexOf(cat.key) > 0 &&
                          expandedCategory === cat.key && (
                            <div className="col-span-1 sm:col-span-2 flex items-center gap-3 my-1">
                              <div className="flex-1 h-px bg-[#E5E7EB]" />
                              <button
                                type="button"
                                onClick={() => setFilterLogic((l) => (l === "AND" ? "OR" : "AND"))}
                                className={`px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.06em] border transition-all cursor-pointer ${
                                  filterLogic === "AND"
                                    ? "border-[#1A1A1A] text-[#1A1A1A] bg-[#F9FAFB]"
                                    : "border-[#F59E0B] text-[#92400E] bg-[#F9FAFB]"
                                }`}
                              >
                                {filterLogic}
                              </button>
                              <div className="flex-1 h-px bg-[#E5E7EB]" />
                            </div>
                          )}

                        {/* Category card */}
                        <div
                          className={`${isExpanded ? "col-span-1 sm:col-span-2" : ""}`}
                        >
                          <div
                            onClick={() => toggleCategory(cat.key)}
                            className={`flex items-start gap-3 p-3.5 sm:p-4 border-[1.5px] cursor-pointer transition-all duration-150 ${
                              isActive
                                ? isExpanded
                                  ? "border-[#F59E0B] bg-[#FFFBEB] rounded-t-[10px] rounded-b-none"
                                  : "border-[#F59E0B] bg-[#FFFBEB] rounded-[10px]"
                                : "border-[#E5E7EB] bg-[#FAFAFA] rounded-[10px] hover:border-[#F59E0B] hover:bg-[#FFFBEB]"
                            }`}
                          >
                            <span className={`text-[18px] ${isActive ? "" : "grayscale-[30%]"}`}>
                              {cat.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[14px] font-semibold ${isActive ? "text-[#92400E] font-bold" : "text-[#6B7280]"}`}>
                                {cat.title}
                              </p>
                              <p className="text-[12px] text-[#9CA3AF] mt-0.5 leading-[1.5]">
                                {cat.subtitle}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {isActive && summary ? (
                                <>
                                  <span className="text-[11px] bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 max-w-[140px] truncate">
                                    {summary}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      clearCategory(cat.key);
                                    }}
                                    className="text-[11px] text-[#9CA3AF] hover:text-[#EF4444] transition-colors cursor-pointer"
                                  >
                                    Clear ✕
                                  </button>
                                </>
                              ) : (
                                <Plus className="w-4 h-4 text-[#D1D5DB]" />
                              )}
                            </div>
                          </div>

                          {/* Expanded form */}
                          {isExpanded && (
                            <div className="border-[1.5px] border-[#F59E0B] border-t-0 rounded-b-[10px] bg-white p-5 sm:p-6 mb-3">
                              {renderCategoryForm(cat.key)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 bg-white border border-[#E8E4DE] rounded-[14px] p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[14px] font-bold text-[#1A1A1A]">Your audience</h4>
              {summaryPulsing && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>

            {/* Prose block */}
            <div className="border-l-[3px] border-[#F59E0B] bg-[#FFFBEB] rounded-r-[10px] px-4 py-3.5 mb-5">
              {debouncedText.trim() ? (
                <>
                  <p className="text-[14px] text-[#374151] leading-[1.7] italic">
                    {debouncedText}
                  </p>
                  {filterCount > 0 && (
                    <p className="text-[12px] text-[#92400E] font-medium mt-2">
                      + {filterCount} additional filter rules applied
                    </p>
                  )}
                </>
              ) : hasAnyAdvancedFilter(advancedFilters) ? (
                <p className="text-[14px] text-[#374151] leading-[1.7] italic">
                  {generateFilterSummary(advancedFilters)}
                </p>
              ) : (
                <p className="text-[13px] text-[#9CA3AF] italic">
                  Describe your audience in the text box, or use the templates above.
                </p>
              )}
            </div>

            {/* Filter tags */}
            {filterTags.length > 0 && (
              <div className="space-y-3 mb-4">
                <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-[0.07em]">
                  Advanced filters
                </p>
                {Object.entries(groupedTags).map(([category, tags]) => (
                  <div key={category}>
                    <p className="text-[12px] font-medium text-[#374151] mb-1.5">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag.key}
                          className="inline-flex items-center gap-1 bg-[#F3F4F6] rounded-md px-2 py-0.5 text-[12px] text-[#374151]"
                        >
                          {tag.label}
                          <button
                            type="button"
                            onClick={() => removeTag(tag.key)}
                            className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[12px] text-[#EF4444] hover:underline mt-3 cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Footer count */}
            <div className="border-t border-[#F3F4F6] pt-4 mt-4 flex items-center justify-between">
              <span className="text-[12px] text-[#9CA3AF]">
                {!debouncedText.trim() && filterCount === 0
                  ? "No filters yet"
                  : debouncedText.trim() && filterCount === 0
                  ? "Text description added"
                  : `${filterCount} filter rules active`}
              </span>
              {filterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[12px] text-[#EF4444] hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Validation error ── */}
      {validationError && (
        <div className="text-center mt-4 animate-[shake_0.3s_ease-in-out]">
          <p className="text-[13px] text-[#EF4444]">
            Please describe your audience or add at least one filter.
          </p>
        </div>
      )}

      {/* ── Fixed Footer ── */}
      <footer
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E4DE] px-4 lg:px-8 py-4 z-50 transition-[left] duration-200 ease-out ${
          sidebarCollapsed ? "lg:left-[72px]" : "lg:left-[240px]"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Left */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[14px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to details
          </button>

          {/* Center status */}
          {footerStatus && (
            <div className="hidden sm:flex items-center gap-2 text-[13px] text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {footerStatus}
            </div>
          )}

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDraft}
              disabled={saving}
              className="px-5 py-2.5 text-[14px] font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-[10px] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save draft
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={saving || !canCreate}
              className={`px-6 py-2.5 text-[14px] font-semibold rounded-[10px] transition-all duration-200 inline-flex items-center gap-2 ${
                canCreate
                  ? "bg-[#F59E0B] text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:bg-[#D97706]"
                  : "bg-[#E5E7EB] text-[#9CA3AF] shadow-none cursor-not-allowed"
              } disabled:opacity-70`}
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {createButtonLabel}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
