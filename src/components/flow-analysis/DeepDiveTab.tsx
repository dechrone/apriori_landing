"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { FlowAnalysisData, FlowPersona, JourneyStep } from "@/types/flow-analysis";
import { PersonaCardLight } from "./PersonaCardLight";
import {
  ArrowDown,
  X as XIcon,
  ChevronDown,
  Monitor,
  User,
} from "lucide-react";

/* ─────────── Design tokens (from dashboard-design-rules) ─────────── */
const CARD_SHADOW = "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)";
const ACCENT = "#E8583A";
const PAGE_BG = "#F5F4F2";

const PERSONA_COLORS: Record<string, string> = {};
const COLOR_PALETTE = [
  "#3B5BDB", "#7950F2", "#0CA678", "#E67700",
  "#D6336C", "#1098AD", "#5C940D", "#E8590C",
];
let colorIdx = 0;
function getPersonaColor(name: string) {
  if (!PERSONA_COLORS[name]) {
    PERSONA_COLORS[name] = COLOR_PALETTE[colorIdx % COLOR_PALETTE.length];
    colorIdx++;
  }
  return PERSONA_COLORS[name];
}

/* ─────────── Types ─────────── */
type ViewMode = "screen" | "persona";
type OutcomeFilter = "all" | "dropped" | "completed";
type ExpFilter = "all" | "first-time" | "experienced" | "never";
type UrgencyFilter = "all" | "emergency" | "planned" | "opportunistic" | "not-urgent";

/* ─────────── Dropdown Component ─────────── */
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 transition-colors"
        style={{
          padding: "7px 14px",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 500,
          backgroundColor: value !== "all" ? "#FEF2F2" : "#F3F4F6",
          color: value !== "all" ? "#DC2626" : "#374151",
          border: value !== "all" ? "1px solid #FECACA" : "1px solid #E5E7EB",
          cursor: "pointer",
        }}
      >
        {label}: {current?.label ?? value}
        <ChevronDown size={14} style={{ opacity: 0.5 }} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute left-0 top-full mt-1 z-50 rounded-[12px] py-1"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
              minWidth: 180,
              border: "1px solid #E5E7EB",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full text-left transition-colors hover:bg-gray-50"
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: opt.value === value ? 600 : 400,
                  color: opt.value === value ? ACCENT : "#374151",
                  cursor: "pointer",
                  border: "none",
                  background: opt.value === value ? "#FFF5F3" : "transparent",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────── Filter Pill ─────────── */
function FilterPill({ label, onRemove, variant = "neutral" }: { label: string; onRemove: () => void; variant?: "danger" | "neutral" }) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        padding: "4px 10px",
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: variant === "danger" ? "#FEF2F2" : "#F3F4F6",
        color: variant === "danger" ? "#DC2626" : "#374151",
        cursor: "pointer",
      }}
      onClick={onRemove}
    >
      {label}
      <XIcon size={12} style={{ opacity: 0.6 }} />
    </span>
  );
}

/* ─────────── Main Component ─────────── */
export function DeepDiveTab({ data }: { data: FlowAnalysisData }) {
  const { screens, personas, funnel } = data;

  /* ── State ── */
  const [mode, setMode] = useState<ViewMode>("screen");
  const [selectedScreen, setSelectedScreen] = useState(screens[0]?.id ?? "S1");
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0]?.id ?? "");
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");
  const [expFilter, setExpFilter] = useState<ExpFilter>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>("all");
  const [personaSortBy, setPersonaSortBy] = useState<"journey" | "trust" | "clarity">("journey");

  /* ── Drop counts per screen ── */
  const dropCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const f of funnel) map[f.screen] = f.dropped;
    return map;
  }, [funnel]);

  /* ── Filtered personas (Screen View) ── */
  const filteredPersonas = useMemo(() => {
    return personas.filter((p) => {
      if (outcomeFilter === "dropped" && p.outcome !== "dropped") return false;
      if (outcomeFilter === "completed" && p.outcome !== "completed") return false;
      if (expFilter === "first-time" && p.lamfExp !== "First-time") return false;
      if (expFilter === "experienced" && (p.lamfExp === "First-time" || p.lamfExp === "Never heard of LAMF")) return false;
      if (expFilter === "never" && p.lamfExp !== "Never heard of LAMF") return false;
      if (urgencyFilter !== "all") {
        const u = p.urgency.toLowerCase();
        if (urgencyFilter === "emergency" && u !== "emergency") return false;
        if (urgencyFilter === "planned" && u !== "planned") return false;
        if (urgencyFilter === "opportunistic" && u !== "opportunistic") return false;
      }
      return true;
    });
  }, [personas, outcomeFilter, expFilter, urgencyFilter]);

  /* ── Personas with step for selected screen ── */
  const screenPersonas = useMemo(() => {
    const result: { persona: FlowPersona; step: JourneyStep }[] = [];
    for (const p of filteredPersonas) {
      const step = p.journey.find((s) => s.screen === selectedScreen);
      if (step) result.push({ persona: p, step });
    }
    return result;
  }, [filteredPersonas, selectedScreen]);

  /* ── Selected persona for Persona View ── */
  const selectedPersona = useMemo(() => personas.find((p) => p.id === selectedPersonaId), [personas, selectedPersonaId]);

  /* ── Persona View personas (filtered by outcome, experience, urgency) ── */
  const personaViewList = useMemo(() => {
    return personas.filter((p) => {
      if (outcomeFilter === "dropped" && p.outcome !== "dropped") return false;
      if (outcomeFilter === "completed" && p.outcome !== "completed") return false;
      if (expFilter === "first-time" && p.lamfExp !== "First-time") return false;
      if (expFilter === "experienced" && (p.lamfExp === "First-time" || p.lamfExp === "Never heard of LAMF")) return false;
      if (expFilter === "never" && p.lamfExp !== "Never heard of LAMF") return false;
      if (urgencyFilter !== "all") {
        const u = p.urgency.toLowerCase();
        if (urgencyFilter === "emergency" && u !== "emergency") return false;
        if (urgencyFilter === "planned" && u !== "planned") return false;
        if (urgencyFilter === "opportunistic" && u !== "opportunistic") return false;
      }
      return true;
    });
  }, [personas, outcomeFilter, expFilter, urgencyFilter]);

  const hasActiveFilters = outcomeFilter !== "all" || expFilter !== "all" || urgencyFilter !== "all";

  /* ── Auto-select first persona when filtered list changes ── */
  useEffect(() => {
    if (mode === "persona" && personaViewList.length > 0) {
      const stillValid = personaViewList.some((p) => p.id === selectedPersonaId);
      if (!stillValid) {
        setSelectedPersonaId(personaViewList[0].id);
      }
    }
  }, [mode, personaViewList, selectedPersonaId]);

  const clearAll = useCallback(() => {
    setOutcomeFilter("all");
    setExpFilter("all");
    setUrgencyFilter("all");
  }, []);

  const resultCount = mode === "screen"
    ? `Showing ${screenPersonas.length} of ${personas.length} personas`
    : `Showing ${personaViewList.length} of ${personas.length} personas · ${screens.length} screens`;

  return (
    <div style={{ padding: "0 24px 64px", backgroundColor: PAGE_BG }}>

      {/* ═══════ Section 1 — Mode Switcher ═══════ */}
      <div className="flex items-center justify-between pt-8 pb-5">
        <div className="flex items-center gap-5">
          {/* Segmented control */}
          <div
            className="inline-flex"
            style={{
              borderRadius: 8,
              backgroundColor: "#F3F4F6",
              padding: 3,
            }}
          >
            <button
              type="button"
              onClick={() => setMode("screen")}
              className="flex items-center gap-1.5 transition-colors"
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: mode === "screen" ? 600 : 500,
                backgroundColor: mode === "screen" ? ACCENT : "transparent",
                color: mode === "screen" ? "#FFFFFF" : "#6B7280",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Monitor size={15} />
              Screen View
            </button>
            <button
              type="button"
              onClick={() => setMode("persona")}
              className="flex items-center gap-1.5 transition-colors"
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: mode === "persona" ? 600 : 500,
                backgroundColor: mode === "persona" ? ACCENT : "transparent",
                color: mode === "persona" ? "#FFFFFF" : "#6B7280",
                border: "none",
                cursor: "pointer",
              }}
            >
              <User size={15} />
              Persona View
            </button>
          </div>
        </div>

        {/* Result count */}
        <p style={{ fontSize: 13, fontWeight: 400, color: "#9CA3AF" }}>
          {resultCount}
        </p>
      </div>

      {/* ═══════ Section 2 — Filter Bar ═══════ */}
      {mode === "screen" ? (
        <ScreenViewFilters
          screens={screens}
          selectedScreen={selectedScreen}
          onSelectScreen={setSelectedScreen}
          dropCounts={dropCounts}
          outcomeFilter={outcomeFilter}
          expFilter={expFilter}
          urgencyFilter={urgencyFilter}
          onOutcome={setOutcomeFilter}
          onExp={setExpFilter}
          onUrgency={setUrgencyFilter}
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAll}
        />
      ) : (
        <PersonaViewControls
          personas={personaViewList}
          selectedId={selectedPersonaId}
          onSelect={setSelectedPersonaId}
          sortBy={personaSortBy}
          onSortChange={setPersonaSortBy}
          outcomeFilter={outcomeFilter}
          expFilter={expFilter}
          urgencyFilter={urgencyFilter}
          onOutcome={setOutcomeFilter}
          onExp={setExpFilter}
          onUrgency={setUrgencyFilter}
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAll}
        />
      )}

      {/* ── Active Filter Pills ── */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3">
          {outcomeFilter !== "all" && (
            <FilterPill
              label={outcomeFilter === "dropped" ? "Dropped" : "Completed"}
              onRemove={() => setOutcomeFilter("all")}
              variant="danger"
            />
          )}
          {expFilter !== "all" && (
            <FilterPill
              label={expFilter === "first-time" ? "First-time" : expFilter === "never" ? "Never heard of LAMF" : "Experienced"}
              onRemove={() => setExpFilter("all")}
            />
          )}
          {urgencyFilter !== "all" && (
            <FilterPill
              label={urgencyFilter.charAt(0).toUpperCase() + urgencyFilter.slice(1)}
              onRemove={() => setUrgencyFilter("all")}
            />
          )}
        </div>
      )}

      {/* ═══════ Section 3 — Active Filter Summary ═══════ */}
      <ActiveFilterSummary
        mode={mode}
        selectedScreen={selectedScreen}
        screenLabel={screens.find((s) => s.id === selectedScreen)?.label ?? ""}
        screenPersonaCount={screenPersonas.length}
        totalPersonas={personas.length}
        screenDropped={screenPersonas.filter((sp) => sp.step.decision === "drop").length}
        screenContinued={screenPersonas.filter((sp) => sp.step.decision === "continue").length}
        selectedPersona={selectedPersona}
      />

      {/* ═══════ Section 4 — Results ═══════ */}
      {mode === "screen" ? (
        <ScreenViewResults personas={screenPersonas} />
      ) : (
        selectedPersona && (
          <PersonaViewResults
            persona={selectedPersona}
            screens={screens}
            funnel={funnel}
            totalPersonas={personas.length}
            sortBy={personaSortBy}
          />
        )
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Screen View — Filter Bar
   ═══════════════════════════════════════════════════════════════════ */
function ScreenViewFilters({
  screens,
  selectedScreen,
  onSelectScreen,
  dropCounts,
  outcomeFilter,
  expFilter,
  urgencyFilter,
  onOutcome,
  onExp,
  onUrgency,
  hasActiveFilters,
  onClearAll,
}: {
  screens: FlowAnalysisData["screens"];
  selectedScreen: string;
  onSelectScreen: (id: string) => void;
  dropCounts: Record<string, number>;
  outcomeFilter: OutcomeFilter;
  expFilter: ExpFilter;
  urgencyFilter: UrgencyFilter;
  onOutcome: (v: OutcomeFilter) => void;
  onExp: (v: ExpFilter) => void;
  onUrgency: (v: UrgencyFilter) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}) {
  return (
    <div>
      {/* Row 1 — Screen Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
        {screens.map((s) => {
          const active = selectedScreen === s.id;
          const drops = dropCounts[s.id] ?? 0;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectScreen(s.id)}
              className="flex items-center gap-1.5 shrink-0 transition-colors"
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: active ? "#1A1A1A" : "#F3F4F6",
                color: active ? "#FFFFFF" : "#374151",
                border: "none",
                cursor: "pointer",
              }}
            >
              {s.id} · {s.label}
              {drops > 0 && (
                <span
                  className="inline-flex items-center gap-0.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: active ? "#FCA5A5" : ACCENT,
                    marginLeft: 2,
                  }}
                >
                  <ArrowDown size={11} />
                  {drops}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Row 2 — Persona Filters */}
      <div className="flex items-center gap-2 flex-wrap mt-1">
        <FilterDropdown
          label="Outcome"
          value={outcomeFilter}
          options={[
            { value: "all", label: "All outcomes" },
            { value: "dropped", label: "Dropped" },
            { value: "completed", label: "Completed" },
          ]}
          onChange={(v) => onOutcome(v as OutcomeFilter)}
        />
        <FilterDropdown
          label="Experience"
          value={expFilter}
          options={[
            { value: "all", label: "All" },
            { value: "first-time", label: "First-time" },
            { value: "experienced", label: "Experienced" },
            { value: "never", label: "Never heard of it" },
          ]}
          onChange={(v) => onExp(v as ExpFilter)}
        />
        <FilterDropdown
          label="Urgency"
          value={urgencyFilter}
          options={[
            { value: "all", label: "All" },
            { value: "emergency", label: "Emergency" },
            { value: "planned", label: "Planned" },
            { value: "opportunistic", label: "Opportunistic" },
          ]}
          onChange={(v) => onUrgency(v as UrgencyFilter)}
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: ACCENT,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 8px",
            }}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Persona View — Dropdowns + Sort
   ═══════════════════════════════════════════════════════════════════ */
function PersonaViewControls({
  personas,
  selectedId,
  onSelect,
  sortBy,
  onSortChange,
  outcomeFilter,
  expFilter,
  urgencyFilter,
  onOutcome,
  onExp,
  onUrgency,
  hasActiveFilters,
  onClearAll,
}: {
  personas: FlowPersona[];
  selectedId: string;
  onSelect: (id: string) => void;
  sortBy: "journey" | "trust" | "clarity";
  onSortChange: (v: "journey" | "trust" | "clarity") => void;
  outcomeFilter: OutcomeFilter;
  expFilter: ExpFilter;
  urgencyFilter: UrgencyFilter;
  onOutcome: (v: OutcomeFilter) => void;
  onExp: (v: ExpFilter) => void;
  onUrgency: (v: UrgencyFilter) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}) {
  const personaOptions = personas.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <div>
      {/* Row 1 — Persona selector dropdown */}
      <div className="flex items-center gap-3 pb-3">
        <FilterDropdown
          label="Persona"
          value={selectedId}
          options={[...personaOptions]}
          onChange={(v) => onSelect(v)}
        />
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <span style={{ fontSize: 12, fontWeight: 500, color: "#9CA3AF", whiteSpace: "nowrap" }}>Sort screens by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "journey" | "trust" | "clarity")}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#374151",
              backgroundColor: "#F3F4F6",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              appearance: "auto",
            }}
          >
            <option value="journey">Journey order</option>
            <option value="trust">Trust (low → high)</option>
            <option value="clarity">Clarity (low → high)</option>
          </select>
        </div>
      </div>

      {/* Row 2 — Filter dropdowns (same style as Screen View) */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterDropdown
          label="Outcome"
          value={outcomeFilter}
          options={[
            { value: "all", label: "All outcomes" },
            { value: "dropped", label: "Dropped" },
            { value: "completed", label: "Completed" },
          ]}
          onChange={(v) => onOutcome(v as OutcomeFilter)}
        />
        <FilterDropdown
          label="Experience"
          value={expFilter}
          options={[
            { value: "all", label: "All" },
            { value: "first-time", label: "First-time" },
            { value: "experienced", label: "Experienced" },
            { value: "never", label: "Never heard of it" },
          ]}
          onChange={(v) => onExp(v as ExpFilter)}
        />
        <FilterDropdown
          label="Urgency"
          value={urgencyFilter}
          options={[
            { value: "all", label: "All" },
            { value: "emergency", label: "Emergency" },
            { value: "planned", label: "Planned" },
            { value: "opportunistic", label: "Opportunistic" },
          ]}
          onChange={(v) => onUrgency(v as UrgencyFilter)}
        />
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: ACCENT,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 8px",
            }}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Active Filter Summary Bar
   ═══════════════════════════════════════════════════════════════════ */
function ActiveFilterSummary({
  mode,
  selectedScreen,
  screenLabel,
  screenPersonaCount,
  totalPersonas,
  screenDropped,
  screenContinued,
  selectedPersona,
}: {
  mode: ViewMode;
  selectedScreen: string;
  screenLabel: string;
  screenPersonaCount: number;
  totalPersonas: number;
  screenDropped: number;
  screenContinued: number;
  selectedPersona?: FlowPersona;
}) {
  return (
    <div
      style={{
        padding: "10px 0",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
        marginTop: 16,
        marginBottom: 24,
        backgroundColor: "#F9FAFB",
        paddingLeft: 16,
        paddingRight: 16,
        marginLeft: -24,
        marginRight: -24,
      }}
    >
      {mode === "screen" ? (
        <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: 13, color: "#6B7280" }}>
          <Monitor size={14} style={{ color: "#9CA3AF" }} />
          <span style={{ fontWeight: 600, color: "#374151" }}>
            {selectedScreen} · {screenLabel}
          </span>
          <span>·</span>
          <span>Showing {screenPersonaCount} of {totalPersonas} personas</span>
          {screenDropped > 0 && (
            <>
              <span>·</span>
              <span style={{ color: "#DC2626", fontWeight: 600 }}>Dropped: {screenDropped}</span>
            </>
          )}
          {screenContinued > 0 && (
            <>
              <span>·</span>
              <span style={{ color: "#16A34A", fontWeight: 600 }}>Continued: {screenContinued}</span>
            </>
          )}
        </div>
      ) : selectedPersona ? (
        <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: 13, color: "#6B7280" }}>
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 22,
              height: 22,
              backgroundColor: getPersonaColor(selectedPersona.name),
              color: "#FFFFFF",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {selectedPersona.name.charAt(0)}
          </span>
          <span style={{ fontWeight: 600, color: "#374151" }}>
            {selectedPersona.name}
          </span>
          <span>·</span>
          <span>{selectedPersona.role} · {selectedPersona.city}</span>
          <span>·</span>
          <span>{selectedPersona.lamfExp}</span>
          <span>·</span>
          <span style={{ fontWeight: 600, color: selectedPersona.outcome === "completed" ? "#16A34A" : "#DC2626" }}>
            Outcome: {selectedPersona.outcome === "completed" ? "Completed" : `Dropped at ${selectedPersona.dropScreen ?? "—"}`}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Screen View — Card Results Grid
   ═══════════════════════════════════════════════════════════════════ */
function ScreenViewResults({
  personas,
}: {
  personas: { persona: FlowPersona; step: JourneyStep }[];
}) {
  if (personas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16" style={{ color: "#9CA3AF" }}>
        <Monitor size={32} style={{ color: "#D1D5DB", marginBottom: 12 }} />
        <p style={{ fontSize: 15, fontWeight: 600, color: "#6B7280", marginBottom: 4 }}>No personas match these filters.</p>
        <p style={{ fontSize: 13 }}>Try removing one filter to broaden results.</p>
      </div>
    );
  }

  // Single result: full width
  const cols = personas.length === 1
    ? "grid-cols-1"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${cols} gap-4`}>
      {personas.map(({ persona, step }) => (
        <PersonaCardLight
          key={`${step.screen}-${persona.id}`}
          persona={persona}
          step={step}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Persona View — Timeline Results
   ═══════════════════════════════════════════════════════════════════ */
function PersonaViewResults({
  persona,
  screens,
  funnel,
  totalPersonas,
  sortBy,
}: {
  persona: FlowPersona;
  screens: FlowAnalysisData["screens"];
  funnel: FlowAnalysisData["funnel"];
  totalPersonas: number;
  sortBy: "journey" | "trust" | "clarity";
}) {
  /* Build step list */
  const steps = screens.map((screen) => {
    const step = persona.journey.find((s) => s.screen === screen.id);
    const funnelEntry = funnel.find((f) => f.screen === screen.id);
    const reached = !!step;
    const pctReached = funnelEntry
      ? Math.round((funnelEntry.entered / totalPersonas) * 100)
      : 100;
    return { screen, step, reached, pctReached };
  });

  /* Sort if needed */
  const sorted = [...steps];
  if (sortBy === "trust") {
    sorted.sort((a, b) => (a.step?.trustScore ?? 99) - (b.step?.trustScore ?? 99));
  } else if (sortBy === "clarity") {
    sorted.sort((a, b) => (a.step?.clarityScore ?? 99) - (b.step?.clarityScore ?? 99));
  }

  return (
    <div>
      {/* ── Journey mini-map ── */}
      <div className="flex items-center gap-0 mb-8" style={{ padding: "0 8px" }}>
        {steps.map((s, i) => {
          const isDropPoint = s.step?.decision === "drop";
          const notReached = !s.reached;
          const hasFriction = s.step && (s.step.frictionPoints?.length ?? 0) > 0;

          const nodeColor = notReached
            ? "#D1D5DB"
            : isDropPoint
              ? "#DC2626"
              : hasFriction
                ? "#F59E0B"
                : "#16A34A";

          return (
            <div key={s.screen.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center" style={{ minWidth: 40 }}>
                {/* Node */}
                {isDropPoint ? (
                  <div className="flex items-center justify-center" style={{ width: 18, height: 18 }}>
                    <XIcon size={14} style={{ color: "#DC2626" }} strokeWidth={3} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: notReached ? 10 : 12,
                      height: notReached ? 10 : 12,
                      borderRadius: "50%",
                      backgroundColor: notReached ? "transparent" : nodeColor,
                      border: notReached ? "2px solid #D1D5DB" : "none",
                    }}
                  />
                )}
                {/* Screen label */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: notReached ? "#D1D5DB" : "#374151",
                    marginTop: 4,
                  }}
                >
                  {s.screen.id}
                </span>
                {/* Percentage */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#9CA3AF",
                    marginTop: 1,
                  }}
                >
                  {s.pctReached}%
                </span>
              </div>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div
                  className="flex-1"
                  style={{
                    height: 2,
                    backgroundColor: notReached || !steps[i + 1]?.reached ? "#E5E7EB" : "#D1D5DB",
                    marginTop: -16,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Timeline Cards ── */}
      <div className="relative" style={{ paddingLeft: 40 }}>
        {/* Vertical line */}
        <div
          className="absolute"
          style={{
            left: 15,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: "#E5E7EB",
          }}
        />

        <div className="flex flex-col gap-6">
          {sorted.map((s) => {
            const isDropPoint = s.step?.decision === "drop";
            const notReached = !s.reached;
            const hasFriction = s.step && (s.step.frictionPoints?.length ?? 0) > 0;

            const nodeColor = notReached
              ? "#D1D5DB"
              : isDropPoint
                ? "#DC2626"
                : hasFriction
                  ? "#F59E0B"
                  : "#16A34A";

            return (
              <div key={s.screen.id} className="relative">
                {/* Timeline node */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: -40,
                    top: 18,
                    width: 30,
                    height: 30,
                  }}
                >
                  {isDropPoint ? (
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: "rgba(220,38,38,0.1)",
                      }}
                    >
                      <XIcon size={14} style={{ color: "#DC2626" }} strokeWidth={3} />
                    </div>
                  ) : notReached ? (
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "2px dashed #D1D5DB",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: nodeColor,
                        boxShadow: `0 0 0 4px ${nodeColor}20`,
                      }}
                    />
                  )}
                </div>

                {/* Screen label */}
                <div className="flex items-center gap-2 mb-2" style={{ marginLeft: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: notReached ? "#D1D5DB" : "#374151" }}>
                    {s.screen.id} · {s.screen.label}
                  </span>
                  {isDropPoint && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#DC2626",
                        backgroundColor: "#FEF2F2",
                        padding: "2px 8px",
                        borderRadius: 100,
                        textTransform: "uppercase",
                      }}
                    >
                      Dropped
                    </span>
                  )}
                </div>

                {/* Card or ghost */}
                {s.step ? (
                  <div style={{ marginLeft: 4 }}>
                    <PersonaCardLight persona={persona} step={s.step} />
                  </div>
                ) : (
                  <div
                    className="rounded-[14px] flex items-center justify-center"
                    style={{
                      backgroundColor: "#F9FAFB",
                      border: "1.5px dashed #E5E7EB",
                      padding: "32px 24px",
                      marginLeft: 4,
                    }}
                  >
                    <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center" }}>
                      {persona.name.split(" ")[0]} did not reach this screen. Dropped at {persona.dropScreen ?? "—"}.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
