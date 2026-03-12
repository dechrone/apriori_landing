"use client";

import { useState, useMemo, useEffect } from "react";
import type { PersonaDetail } from "@/types/flow-analysis";
import { PersonaIdentityCard } from "./PersonaIdentityCard";
import { JourneyTimeline } from "./JourneyTimeline";
import { buildJourneyNodes } from "@/utils/deepDiveHelpers";

/* ── Types ──────────────────────────────────────────────────────────── */
type PersonaFilter = "all" | "completed" | "dropped";

/* ── Parse full name using the PRD regex ────────────────────────────── */
function parsePersonaName(background: string): string {
  const match = background.match(/([A-Z][a-z]+(?: [A-Z][a-z]+)+),\s+a\s+/);
  if (match) return match[1];
  const fallback = background.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  if (fallback) return fallback[1];
  return "Unknown";
}

/* ── Deterministic avatar color from persona_uuid ───────────────────── */
function avatarColorFromUuid(uuid: string): string {
  const colors = [
    "#2563EB", "#7C3AED", "#0D9488", "#D97706",
    "#DB2777", "#059669", "#DC2626", "#0369A1",
  ];
  const hash = uuid.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

/* ── Initials from parsed name ──────────────────────────────────────── */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

/* ── Truncate helper ────────────────────────────────────────────────── */
function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/* ── Prepared persona (pre-computed fields for rendering) ───────────── */
interface PreparedPersona {
  detail: PersonaDetail;
  name: string;
  initials: string;
  avatarColor: string;
  age: number;
  district: string;
  isCompleted: boolean;
}

function preparePersonas(personas: PersonaDetail[]): PreparedPersona[] {
  return personas
    .map((p) => {
      const name = parsePersonaName(p.professional_background);
      return {
        detail: p,
        name,
        initials: getInitials(name),
        avatarColor: avatarColorFromUuid(p.persona_uuid),
        age: p.demographics.age,
        district: p.demographics.district,
        isCompleted: p.outcome === "completed",
      };
    })
    .sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? -1 : 1;
      return a.age - b.age;
    });
}

/* ── Filter Bar (pill-style segmented toggle) ───────────────────────── */
function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: PersonaFilter;
  onChange: (f: PersonaFilter) => void;
  counts: { all: number; completed: number; dropped: number };
}) {
  const tabs: { key: PersonaFilter; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "dropped", label: "Dropped Off", count: counts.dropped },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        backgroundColor: "#F0F0F5",
        borderRadius: 8,
        padding: 4,
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            style={{
              flex: 1,
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#0D0D14" : "#9090A8",
              backgroundColor: isActive ? "#FFFFFF" : "transparent",
              boxShadow: isActive
                ? "0 1px 3px rgba(0,0,0,0.08)"
                : "none",
              border: "none",
              cursor: "pointer",
              transition: "all 150ms ease",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label} {tab.count}
          </button>
        );
      })}
    </div>
  );
}

/* ── Persona Row ────────────────────────────────────────────────────── */
function PersonaRow({
  persona,
  isSelected,
  onSelect,
}: {
  persona: PreparedPersona;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        cursor: "pointer",
        border: "none",
        textAlign: "left",
        backgroundColor: isSelected ? "#F0F0F5" : "transparent",
        borderLeft: isSelected
          ? "3px solid #0D0D14"
          : "3px solid transparent",
        transition: "background-color 120ms ease",
      }}
      onMouseEnter={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLElement).style.backgroundColor = "#F7F7F9";
      }}
      onMouseLeave={(e) => {
        if (!isSelected)
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: persona.avatarColor,
          color: "#FFFFFF",
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {persona.initials}
      </div>

      {/* Name + subline */}
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#0D0D14",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 0,
          }}
        >
          {truncate(persona.name, 18)}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#9090A8",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {persona.age}y · {persona.district}
        </p>
      </div>

      {/* Status icon */}
      <span
        style={{
          fontSize: 11,
          flexShrink: 0,
          color: persona.isCompleted ? "#16A34A" : "#EF4444",
          lineHeight: 1,
        }}
        aria-label={persona.isCompleted ? "Completed" : "Dropped off"}
      >
        {persona.isCompleted ? "✓" : "↓"}
      </span>
    </button>
  );
}

/* ── Main Export ─────────────────────────────────────────────────────── */
interface Props {
  personas: PersonaDetail[];
}

export function PersonaView({ personas }: Props) {
  const prepared = useMemo(() => preparePersonas(personas), [personas]);

  const counts = useMemo(
    () => ({
      all: prepared.length,
      completed: prepared.filter((p) => p.isCompleted).length,
      dropped: prepared.filter((p) => !p.isCompleted).length,
    }),
    [prepared],
  );

  const [activeFilter, setActiveFilter] = useState<PersonaFilter>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return prepared;
    if (activeFilter === "completed")
      return prepared.filter((p) => p.isCompleted);
    return prepared.filter((p) => !p.isCompleted);
  }, [prepared, activeFilter]);

  /* ── Selection (stored as persona_uuid for stability) ──────────── */
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  // Auto-select first persona on mount
  useEffect(() => {
    if (prepared.length > 0 && selectedUuid === null) {
      setSelectedUuid(prepared[0].detail.persona_uuid);
    }
  }, [prepared, selectedUuid]);

  // When filter changes and selected persona is no longer visible, auto-select first visible
  useEffect(() => {
    if (filtered.length === 0) return;
    const stillVisible = filtered.some(
      (p) => p.detail.persona_uuid === selectedUuid,
    );
    if (!stillVisible) {
      setSelectedUuid(filtered[0].detail.persona_uuid);
    }
  }, [filtered, selectedUuid]);

  const selectedPersona = useMemo(
    () => prepared.find((p) => p.detail.persona_uuid === selectedUuid),
    [prepared, selectedUuid],
  );

  if (!selectedPersona) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ padding: 48, color: "#9CA3AF" }}
      >
        <p style={{ fontSize: 15 }}>No personas available.</p>
      </div>
    );
  }

  const nodes = buildJourneyNodes(selectedPersona.detail);

  return (
    <div
      className="flex"
      style={{
        padding: "0 24px",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      {/* ── Left panel — 280px fixed, sticky + independent scroll ── */}
      <div
        className="shrink-0"
        style={{
          width: 280,
          marginRight: 24,
          position: "sticky",
          top: 117,          /* TopBar 64px + tab bar ~53px */
          height: "calc(100vh - 117px)",
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
        }}
      >
        {/* Sticky top section — does NOT scroll */}
        <div className="shrink-0" style={{ padding: "24px 0 0" }}>
          {/* Persona count */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#0D0D14",
              marginBottom: 12,
            }}
          >
            {filtered.length} Persona{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Filter bar */}
          <div style={{ marginBottom: 16 }}>
            <FilterBar
              active={activeFilter}
              onChange={setActiveFilter}
              counts={counts}
            />
          </div>
        </div>

        {/* Scrollable persona list — only this part scrolls */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: 24,
            marginRight: -8,
            paddingRight: 8,
          }}
        >
          <div className="flex flex-col">
            {filtered.map((p) => (
              <PersonaRow
                key={p.detail.persona_uuid}
                persona={p}
                isSelected={p.detail.persona_uuid === selectedUuid}
                onSelect={() =>
                  setSelectedUuid(p.detail.persona_uuid)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — remaining width, grows with content ───── */}
      <div
        className="flex-1 min-w-0 flex flex-col gap-6"
        style={{ padding: "24px 0 64px" }}
      >
        <PersonaIdentityCard persona={selectedPersona.detail} />

        {/* Journey Timeline */}
        <div
          className="rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            padding: "20px 16px",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              marginBottom: 16,
            }}
          >
            Journey Timeline
          </p>
          <JourneyTimeline
            nodes={nodes}
            personaUuid={selectedPersona.detail.persona_uuid}
          />
        </div>

        {/* Overall Reflection */}
        {selectedPersona.detail.overall_monologue && (
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              padding: "16px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#94A3B8",
                marginBottom: 8,
              }}
            >
              Overall Reflection
            </p>
            <div
              style={{
                borderLeft: `3px solid ${
                  selectedPersona.isCompleted ? "#BBF7D0" : "#FECACA"
                }`,
                padding: "8px 14px",
                backgroundColor: selectedPersona.isCompleted
                  ? "#F0FDF4"
                  : "#FFF5F5",
                borderRadius: "0 6px 6px 0",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "#374151",
                  lineHeight: 1.65,
                }}
              >
                &ldquo;{selectedPersona.detail.overall_monologue}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
