"use client";

import { useState, useEffect, useRef } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { StudyOverviewTab } from "@/components/SimulationOverview/StudyOverviewTab";
import { DropOffFunnel } from "@/components/DropOffFunnel";
import { DeepDiveTab } from "@/components/flow-analysis/DeepDiveTab";
import { ComparisonAnalysisTab } from "@/components/comparator/ComparisonAnalysisTab";
import type { ComparisonData, VariantDef } from "@/components/comparator/ComparisonAnalysisTab";
import { univestFlowAnalysisData } from "@/data/univest-flow-analysis-data";
import { univestSimData } from "@/data/univest-sim-data";
import { univestStudyData } from "@/data/univest-study-data";
import type { SimulationData } from "@/types/simulation";
import { List, TrendingDown, Layers, ChevronDown, GitCompareArrows } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-flow-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-flow-body",
  display: "swap",
});

/* ═══════════════════════════════════════════════════════════════════════════
   SAMPLE COMPARISON DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const COMPARISON_DATA: ComparisonData = {
  metadata: {
    simulation_id: "sim_20260411_checkout",
    simulation_name: "SaaS Checkout Flow",
    created_at: "2026-04-11T14:30:00Z",
    persona_count: 15,
    screen_count: 5,
    flow_screens: ["Plan Selection", "Account Creation", "Pricing / Summary", "Payment", "Confirmation"],
  },
  variants: [
    { id: "control", label: "Control", is_control: true, color: "#8B8FA3", description: "Current production checkout flow" },
    { id: "a", label: "Variant A", is_control: false, color: "#6366F1", description: "Progressive disclosure + multi-step form" },
    { id: "b", label: "Variant B", is_control: false, color: "#0D9488", description: "Guided recommendation + progressive pricing" },
    { id: "c", label: "Variant C", is_control: false, color: "#E8913A", description: "Control base + inline upsells + competitor comparison" },
  ],
  metrics: {
    control: { sus: 58, seq: 4.1, completion_rate: 62, friction_count: 7, avg_sentiment: 0.35 },
    a: { sus: 71, seq: 5.4, completion_rate: 78, friction_count: 4, avg_sentiment: 0.58 },
    b: { sus: 76, seq: 5.8, completion_rate: 81, friction_count: 3, avg_sentiment: 0.67 },
    c: { sus: 68, seq: 5.1, completion_rate: 74, friction_count: 5, avg_sentiment: 0.48 },
  },
  verdict: {
    recommended_variant: "b",
    recommendation_type: "ship_with_modifications",
    modifications: [
      "Add 'Compare all plans' escape hatch at plan selection for power users",
      "Replace Variant B's account creation form with Variant A's multi-step approach (reduced from 4 to 3 steps)",
    ],
    verdict_text:
      "Variant B resolves the most Control friction (5 of 7 issues) without introducing critical new ones. Its progressive pricing approach eliminated sticker shock entirely — the single highest-impact improvement across all variants. However, it patronizes power users in the plan selection step. The recommended path is Variant B's core flow with a 'compare all plans' escape hatch for experienced buyers, plus Variant A's multi-step form approach (reduced from 4 to 3 steps) for account creation.",
    confidence: {
      personas_preferring_winner: 12,
      total_personas: 15,
      dissenting_segments: ["Power Users"],
    },
  },
  theme_movement: {
    persistent: [
      { id: "theme_persist_01", name: "Brand trust uncertainty", description: "Personas across all variants expressed hesitation about committing without social proof or trust signals. No variant adequately addressed this.", present_in: ["control", "a", "b", "c"], persona_count: 10, monologue_evidence: null },
      { id: "theme_persist_02", name: "Return policy anxiety", description: "8 of 15 personas mentioned wanting to know the return policy before completing checkout, regardless of flow design.", present_in: ["control", "a", "b", "c"], persona_count: 8, monologue_evidence: null },
    ],
    resolved: [
      { id: "theme_resolv_01", name: "Price sticker shock", description: "Control triggered 'sticker shock' in 9 of 15 personas at the summary screen. Variant B's progressive price breakdown eliminated this entirely. Variant A reduced it partially.", present_in: ["control", "a", "c"], absent_in: ["b"], resolved_by: ["b"], persona_count_in_control: 9, monologue_evidence: { persona_name: "Sarah", persona_archetype: "Price-sensitive, 32", monologues: { control: "Wait — $247? Where did that come from? I was expecting around $180. I need to go back and figure out what's adding up here.", b: "Okay, so $149 base plus $59 for premium features plus $39 setup — that makes sense, I saw each of these as I went." } } },
      { id: "theme_resolv_02", name: "Cognitive overload at plan selection", description: "Control's 4-column comparison table overwhelmed 11 personas. Both A (progressive disclosure) and B (guided recommendation) solved this differently.", present_in: ["control", "c"], absent_in: ["a", "b"], resolved_by: ["a", "b"], persona_count_in_control: 11, monologue_evidence: { persona_name: "James", persona_archetype: "Non-technical, 45", monologues: { control: "There are so many columns... I'm just going to pick the middle one and hope it's right.", b: "Oh nice, it's asking me what I need and then suggesting one. That's much easier." } } },
      { id: "theme_resolv_03", name: "Form fatigue", description: "Control's single long form triggered abandonment thoughts in 6 personas. Variant A's multi-step form with progress bar resolved this.", present_in: ["control", "b", "c"], absent_in: ["a"], resolved_by: ["a"], persona_count_in_control: 6, monologue_evidence: { persona_name: "Priya", persona_archetype: "Busy professional, 38", monologues: { control: "This is a LOT of fields. I don't have time for this right now, I'll come back later.", a: "Step 2 of 4 — okay, each step is short. I can do this." } } },
    ],
    introduced: [
      { id: "theme_intro_01", name: "Paradox of choice in recommendations", description: "Variant B's guided recommendation flow backfired for power users (4 personas) who felt patronized and wanted to see all options.", present_in: ["b"], absent_in: ["control", "a", "c"], introduced_by: ["b"], persona_count: 4, monologue_evidence: { persona_name: "Dev", persona_archetype: "Power user, 28", monologues: { b: "Don't tell me what I need — just show me the comparison table. I know what I'm looking for." } } },
      { id: "theme_intro_02", name: "Progress anxiety", description: "Variant A's multi-step form made 3 personas anxious about how many steps remained, despite the progress bar.", present_in: ["a"], absent_in: ["control", "b", "c"], introduced_by: ["a"], persona_count: 3, monologue_evidence: { persona_name: "Linda", persona_archetype: "Anxious buyer, 55", monologues: { a: "Step 2 of 4... four steps? That feels like a lot. How long is this going to take?" } } },
      { id: "theme_intro_03", name: "Upsell distrust", description: "Variant C's inline upsells triggered distrust in 7 personas who felt the flow was optimizing for revenue over their needs.", present_in: ["c"], absent_in: ["control", "a", "b"], introduced_by: ["c"], persona_count: 7, monologue_evidence: { persona_name: "Marcus", persona_archetype: "Skeptical, 41", monologues: { c: "And now they're trying to sell me add-ons mid-checkout. This feels like those airline booking sites." } } },
    ],
  },
  screen_comparison: [
    { screen_name: "Plan Selection", screen_index: 0, divergence: "high", divergence_score: 0.82, summaries: { control: "Overwhelming. 11 personas described the comparison table as 'noisy' or 'confusing.' Most defaulted to middle tier without understanding differences.", a: "Progressive disclosure worked. Personas engaged more but 3 felt the accordion was 'hiding information.'", b: "Guided flow was the strongest. 10 of 15 felt 'understood.' But 4 power users resented the hand-holding.", c: "Similar to control but with added feature highlights. Marginal improvement. Upsell prompts started here and set a negative tone early." } },
    { screen_name: "Account Creation", screen_index: 1, divergence: "medium", divergence_score: 0.51, summaries: { control: "Long single form. 6 personas expressed fatigue. 2 considered abandoning.", a: "Multi-step form with progress bar. Reduced fatigue. 3 personas felt anxious about step count.", b: "Same as control but with social login options. Minor improvement. Not a meaningful differentiator.", c: "Same as control. No changes. Inherited all friction." } },
    { screen_name: "Pricing / Summary", screen_index: 2, divergence: "high", divergence_score: 0.89, summaries: { control: "Sticker shock. 9 personas surprised by total. Mental math and back-navigation impulses.", a: "Better labeling but still showed total at end. Reduced shock somewhat (5 personas still surprised).", b: "Progressive breakdown throughout flow. No sticker shock. Strongest screen across all variants.", c: "Added comparison to 'similar products' — 5 personas found this helpful, 4 found it manipulative." } },
    { screen_name: "Payment", screen_index: 3, divergence: "low", divergence_score: 0.23, summaries: { control: "Functional but clinical. No trust signals. 4 personas hesitated.", a: "Added security badges. Marginal improvement.", b: "Added security badges + order summary sidebar. Strongest trust signals.", c: "Added payment plan options. Appreciated by 6 personas but 3 felt it signaled the product was expensive." } },
    { screen_name: "Confirmation", screen_index: 4, divergence: "medium", divergence_score: 0.47, summaries: { control: "Minimal. 'Thank you for your order.' 8 personas felt underwhelmed.", a: "Added next steps and timeline. Better but still transactional.", b: "Added next steps + personalized onboarding preview. Strongest emotional finish.", c: "Added referral prompt immediately. 5 personas felt it was 'too soon to ask.'" } },
  ],
  persona_journeys: [
    { persona_id: "persona_03", name: "Sarah", age: 32, archetype: "Price-sensitive, comparison shopper", avatar_emoji: "👩‍💻", segment: "Price-Sensitive Users", preferred_variant: "b", narrative: "Completed the Control flow but described it as 'exhausting' — spent 3 minutes on the pricing screen doing mental math. In Variant B, she described the same checkout as 'surprisingly smooth' because each price component was introduced as she made choices. In Variant A, she finished faster but her monologue reveals lingering doubt: 'I think that was right... but I'm not 100% sure what I'm paying for the premium features.' Variant C triggered her comparison instincts — she started thinking about alternatives." },
    { persona_id: "persona_07", name: "Dev", age: 28, archetype: "Power user, technical buyer", avatar_emoji: "🧑‍💻", segment: "Power Users", preferred_variant: "a", narrative: "Actively frustrated by Variant B's guided flow — 'I already know I want the enterprise tier, just let me select it.' Completed Control fastest despite its friction because he ignored the comparison table entirely. Variant A was his sweet spot: progressive disclosure let him drill into API limits and integrations. Variant C's upsells were dismissed instantly — 'I can see through this.'" },
    { persona_id: "persona_12", name: "Linda", age: 55, archetype: "Anxious first-time buyer", avatar_emoji: "👩‍🏫", segment: "First-Time Buyers", preferred_variant: "b", narrative: "Nearly abandoned Control at the plan selection screen — 'I don't understand the difference between these plans and I'm afraid of picking the wrong one.' Variant B transformed her experience: the guided questions made her feel 'like someone was helping me choose.' Variant A's multi-step form triggered step-count anxiety. Variant C's upsells made her feel 'pressured and uncertain.'" },
  ],
  segment_verdicts: [
    { segment_name: "Price-Sensitive Users", persona_count: 5, winner: "b", narrative: "Strongly prefer Variant B. The progressive pricing breakdown eliminated the uncertainty that drove 4 of 5 to consider abandoning in Control. Variant A helped somewhat but still revealed the total too late. Variant C's comparison-to-competitors actually backfired — it made 3 of them start price-shopping elsewhere.", metrics_by_variant: { control: { sus: 52, seq: 3.8, completion_rate: 55 }, a: { sus: 65, seq: 5.0, completion_rate: 72 }, b: { sus: 78, seq: 6.1, completion_rate: 88 }, c: { sus: 60, seq: 4.5, completion_rate: 65 } } },
    { segment_name: "Power Users", persona_count: 4, winner: "a", narrative: "Prefer Variant A's progressive disclosure because it let them drill into details on their terms. Variant B's guided recommendation felt patronizing — all 4 expressed frustration at not seeing the full comparison upfront. They tolerated Control better than B, which is a notable signal.", metrics_by_variant: { control: { sus: 62, seq: 4.5, completion_rate: 75 }, a: { sus: 79, seq: 5.9, completion_rate: 90 }, b: { sus: 64, seq: 4.8, completion_rate: 78 }, c: { sus: 70, seq: 5.2, completion_rate: 80 } } },
    { segment_name: "First-Time Buyers", persona_count: 4, winner: "b", narrative: "Overwhelmingly prefer Variant B. The guided flow reduced decision anxiety that was acute in Control. Variant A's multi-step form helped but didn't address the core 'which plan?' uncertainty. Variant C's upsells amplified their existing hesitation.", metrics_by_variant: { control: { sus: 48, seq: 3.5, completion_rate: 45 }, a: { sus: 66, seq: 5.1, completion_rate: 70 }, b: { sus: 82, seq: 6.3, completion_rate: 90 }, c: { sus: 58, seq: 4.2, completion_rate: 60 } } },
    { segment_name: "Busy Professionals", persona_count: 2, winner: "a", narrative: "Variant A's multi-step form with clear progress indicators matched their 'get this done efficiently' mindset. They appreciated knowing exactly how much was left. Variant B's guided flow felt slow to them — 'just let me check out.'", metrics_by_variant: { control: { sus: 60, seq: 4.2, completion_rate: 65 }, a: { sus: 75, seq: 5.8, completion_rate: 85 }, b: { sus: 70, seq: 5.4, completion_rate: 80 }, c: { sus: 66, seq: 5.0, completion_rate: 75 } } },
  ],
  friction_provenance: [
    { id: "friction_01", friction: "Plan comparison cognitive overload", screen: "Plan Selection", status: "resolved", resolved_by: ["a", "b"], presence: { control: "present", a: "absent", b: "absent", c: "present" } },
    { id: "friction_02", friction: "Price sticker shock at summary", screen: "Pricing / Summary", status: "resolved", resolved_by: ["b"], presence: { control: "present", a: "partial", b: "absent", c: "present" } },
    { id: "friction_03", friction: "Form fatigue on account creation", screen: "Account Creation", status: "resolved", resolved_by: ["a"], presence: { control: "present", a: "absent", b: "present", c: "present" } },
    { id: "friction_04", friction: "Missing trust signals at payment", screen: "Payment", status: "resolved", resolved_by: ["b"], presence: { control: "present", a: "partial", b: "absent", c: "partial" } },
    { id: "friction_05", friction: "Underwhelming confirmation experience", screen: "Confirmation", status: "resolved", resolved_by: ["b"], presence: { control: "present", a: "partial", b: "absent", c: "present" } },
    { id: "friction_06", friction: "Guided flow patronizes power users", screen: "Plan Selection", status: "introduced", introduced_by: ["b"], presence: { control: "absent", a: "absent", b: "present", c: "absent" } },
    { id: "friction_07", friction: "Progress bar step-count anxiety", screen: "Account Creation", status: "introduced", introduced_by: ["a"], presence: { control: "absent", a: "present", b: "absent", c: "absent" } },
    { id: "friction_08", friction: "Inline upsell distrust", screen: "Plan Selection", status: "introduced", introduced_by: ["c"], presence: { control: "absent", a: "absent", b: "absent", c: "present" } },
    { id: "friction_09", friction: "Brand trust uncertainty", screen: "Payment", status: "persistent", presence: { control: "present", a: "present", b: "present", c: "present" } },
    { id: "friction_10", friction: "Return policy anxiety", screen: "Pricing / Summary", status: "persistent", presence: { control: "present", a: "present", b: "present", c: "present" } },
  ],
  recommendations: [
    { id: "rec_01", recommendation: "Add trust signals (testimonials, security badges, press logos) to plan selection and payment screens", type: "persistent_fix", applies_to: ["all"], priority: "high", rice_score: 84, rationale: "Addresses brand trust uncertainty — the #1 persistent theme across all variants. No flow redesign solved this because it's a content/credibility gap, not a UX gap." },
    { id: "rec_02", recommendation: "Add return policy and cancellation terms as a persistent, accessible element", type: "persistent_fix", applies_to: ["all"], priority: "high", rice_score: 78, rationale: "8 of 15 personas actively looked for this regardless of flow. Its absence created preventable anxiety." },
    { id: "rec_03", recommendation: "Ship Variant B's progressive pricing approach", type: "ship", applies_to: ["b"], priority: "high", rice_score: 91, rationale: "Eliminated sticker shock entirely. Strongest single-screen improvement across all variants." },
    { id: "rec_04", recommendation: "Ship Variant A's multi-step form but reduce to 3 steps", type: "ship", applies_to: ["a"], priority: "medium", rice_score: 65, rationale: "The multi-step approach worked but 4 steps triggered anxiety. Combining account + payment into one step would reduce to 3 and address the concern." },
    { id: "rec_05", recommendation: "Make Variant B's guided flow skippable for power users", type: "variant_fix", applies_to: ["b"], priority: "medium", rice_score: 60, rationale: "Add a 'Compare all plans' escape hatch. 4 power users were frustrated by the guided path — a simple link resolves this without losing the benefit for first-time buyers." },
    { id: "rec_06", recommendation: "Remove Variant C's inline upsells entirely", type: "variant_fix", applies_to: ["c"], priority: "high", rice_score: 72, rationale: "Net negative. 7 of 15 personas reacted negatively. The distrust it creates outweighs any revenue lift." },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   PER-VARIANT DATA LOOKUP
   ═══════════════════════════════════════════════════════════════════════════ */

/* All variants use the same underlying data for now — swap when real data arrives */
function getVariantData(_variantId: string) {
  return {
    flowAnalysis: univestFlowAnalysisData,
    sim: univestSimData as unknown as SimulationData,
    study: univestStudyData,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT DROPDOWN (styled like /simulations page)
   ═══════════════════════════════════════════════════════════════════════════ */

interface DropdownOption {
  value: string;
  label: string;
}

function VariantDropdown({
  options,
  value,
  onChange,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 border-[1.5px] rounded-[10px] px-3.5 py-[10px] bg-white
          text-[14px] text-[#374151] cursor-pointer whitespace-nowrap min-w-[150px]
          transition-colors duration-150
          ${open ? "border-[#E8583A]" : "border-[#E5E7EB] hover:border-[#D1D5DB]"}
        `}
      >
        <span className="flex-1 text-left font-medium">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-[#E8E4DE] rounded-[10px] py-1 min-w-full"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                block w-full text-left px-3.5 py-2 text-[14px] transition-colors
                ${opt.value === value ? "text-[#E8583A] font-semibold bg-[#FFF5F3]" : "text-[#374151] hover:bg-[#F9FAFB]"}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TAB DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const TAB_COMPARISON = "comparison";
const TAB_FLOW_DETAILS = "flow_details";
const TAB_FUNNEL = "funnel";
const TAB_DEEP_DIVE = "deep_dive";

type TabId = typeof TAB_COMPARISON | typeof TAB_FLOW_DETAILS | typeof TAB_FUNNEL | typeof TAB_DEEP_DIVE;

const ACCENT = "#E8583A";

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function UnivestDemoPage() {
  const variants = COMPARISON_DATA.variants;
  const hasMultipleVariants = variants.length > 1;

  const [activeTab, setActiveTab] = useState<TabId>(hasMultipleVariants ? TAB_COMPARISON : TAB_FLOW_DETAILS);
  const [activeVariant, setActiveVariant] = useState<string>(variants[0]?.id ?? "control");

  const variantData = getVariantData(activeVariant);

  /* Build dropdown options from the variant list */
  const variantDropdownOptions: DropdownOption[] = variants.map((v) => ({
    value: v.id,
    label: v.label,
  }));

  /* Tabs — Comparison Analysis only appears when multiple variants exist */
  const tabs: { id: TabId; label: string; icon: typeof List }[] = [
    ...(hasMultipleVariants
      ? [{ id: TAB_COMPARISON as TabId, label: "Comparison Analysis", icon: GitCompareArrows }]
      : []),
    { id: TAB_FLOW_DETAILS, label: "Flow Details", icon: List },
    { id: TAB_FUNNEL, label: "Drop-Off Funnel", icon: TrendingDown },
    { id: TAB_DEEP_DIVE, label: "Deep Dive", icon: Layers },
  ];

  /* Hide the variant dropdown on the comparison tab (it shows all variants) */
  const showVariantDropdown = activeTab !== TAB_COMPARISON;

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} min-h-screen`}
      style={{ backgroundColor: "#F5F4F2", paddingTop: 52 }}
    >
      {/* ── Variant pills in header area ── */}
      {hasMultipleVariants && (
        <div style={{ padding: "12px 24px 0", display: "flex", justifyContent: "flex-end", gap: 6, flexWrap: "wrap" }}>
          {variants.map((v) => (
            <span
              key={v.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "3px 10px",
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "monospace",
                background: `${v.color}15`,
                border: `1px solid ${v.color}30`,
                color: v.color,
                whiteSpace: "nowrap",
              }}
            >
              {v.label}
            </span>
          ))}
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div
        className="sticky z-20"
        style={{
          top: 52,
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#F5F4F2",
        }}
      >
        <div style={{ padding: "0 24px" }}>
          <div className="flex items-center justify-between">
            {/* Left: tabs */}
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="transition-colors"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 24px",
                    fontSize: 18,
                    fontWeight: activeTab === tab.id ? 600 : 500,
                    color: activeTab === tab.id ? ACCENT : "#6B7280",
                    borderBottom:
                      activeTab === tab.id ? `2.5px solid ${ACCENT}` : "2.5px solid transparent",
                    marginBottom: -1,
                    background: "transparent",
                    cursor: "pointer",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                  }}
                >
                  <tab.icon size={18} style={{ opacity: activeTab === tab.id ? 1 : 0.5 }} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: variant dropdown (hidden on comparison tab) */}
            {showVariantDropdown && (
              <VariantDropdown
                options={variantDropdownOptions}
                value={activeVariant}
                onChange={setActiveVariant}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <main>
        {/* ── Comparison Analysis Tab ── */}
        {hasMultipleVariants && (
          <div
            className={activeTab === TAB_COMPARISON ? "animate-fadeIn opacity-100" : "hidden"}
            style={{ animationDuration: "200ms" }}
          >
            {activeTab === TAB_COMPARISON && (
              <div style={{ background: "#F2F0EC", minHeight: "100vh" }}>
                <ComparisonAnalysisTab data={COMPARISON_DATA} />
              </div>
            )}
          </div>
        )}

        {/* ── Flow Details Tab ── */}
        <div
          className={activeTab === TAB_FLOW_DETAILS ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_FLOW_DETAILS && (
            <div style={{ background: "#F2F0EC", minHeight: "100vh" }}>
              <StudyOverviewTab data={variantData.study} />
            </div>
          )}
        </div>

        {/* ── Drop-Off Funnel Tab ── */}
        <div
          className={activeTab === TAB_FUNNEL ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_FUNNEL && (
            <div style={{ backgroundColor: "#F5F4F2" }}>
              <div style={{ padding: "32px 24px 64px" }}>
                <DropOffFunnel data={variantData.sim} />
              </div>
            </div>
          )}
        </div>

        {/* ── Deep Dive Tab ── */}
        <div
          className={activeTab === TAB_DEEP_DIVE ? "animate-fadeIn opacity-100" : "hidden"}
          style={{ animationDuration: "200ms" }}
        >
          {activeTab === TAB_DEEP_DIVE && (
            <DeepDiveTab data={variantData.flowAnalysis} simulationData={variantData.sim} />
          )}
        </div>
      </main>
    </div>
  );
}
