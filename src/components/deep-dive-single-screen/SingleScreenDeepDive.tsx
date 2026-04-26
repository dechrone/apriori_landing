"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import type { PersonaDeepDive, PersonaVariantExperience } from "@/components/sample-single-screen/types";

/* ── Tokens ── */
const AVATAR_COLORS = [
  "#2563EB", "#7C3AED", "#0D9488", "#D97706",
  "#DB2777", "#059669", "#DC2626", "#0369A1",
];

function avatarColor(name: string): string {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

/* ── Emotion pill styling ── */
function emotionStyle(emotion: string): { bg: string; color: string } {
  const e = emotion.toLowerCase();
  if (["anxious", "terrified", "overwhelmed", "alarmed", "contemptuous", "disdainful", "distrustful"].some(k => e.includes(k)))
    return { bg: "#FEF2F2", color: "#DC2626" };
  if (["cautious", "suspicious", "hesitant", "skeptical", "conflicted"].some(k => e.includes(k)))
    return { bg: "#FFFBEB", color: "#B45309" };
  if (["confident", "excited", "intrigued", "relieved", "focused", "pragmatic"].some(k => e.includes(k)))
    return { bg: "#F0FDF4", color: "#16A34A" };
  return { bg: "#F1F5F9", color: "#475569" };
}

/* ── Outcome badge ── */
function OutcomeBadge({ outcome }: { outcome: "convert" | "hesitate" | "abandon" }) {
  const styles: Record<string, { bg: string; color: string; border: string; label: string }> = {
    convert: { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0", label: "CONVERTED" },
    hesitate: { bg: "#FFFBEB", color: "#A16207", border: "#FDE68A", label: "HESITATED" },
    abandon: { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA", label: "ABANDONED" },
  };
  const s = styles[outcome];
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.02em",
      backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      {s.label}
    </span>
  );
}

/* ── Status icon for persona row ── */
function StatusIcon({ a, b }: { a: PersonaVariantExperience; b: PersonaVariantExperience }) {
  const aConvert = a.outcome === "convert";
  const bConvert = b.outcome === "convert";
  const aAbandon = a.outcome === "abandon";
  const bAbandon = b.outcome === "abandon";

  if (aConvert && bConvert) return <span style={{ fontSize: 11, color: "#16A34A", lineHeight: 1 }}>✓</span>;
  if (aAbandon && bAbandon) return <span style={{ fontSize: 11, color: "#EF4444", lineHeight: 1 }}>↓</span>;
  if (aConvert !== bConvert) return <span style={{ fontSize: 11, color: "#6B7280", lineHeight: 1 }}>⇄</span>;
  return <span style={{ fontSize: 11, color: "#6B7280", lineHeight: 1 }}>⇄</span>;
}

/* ── Filter types ── */
type OutcomeFilter = "all" | "converted" | "hesitated" | "abandoned";
type SegmentFilter = string;

function hasOutcome(p: PersonaDeepDive, f: OutcomeFilter): boolean {
  if (f === "all") return true;
  if (f === "converted") return p.variant_a.outcome === "convert" || p.variant_b.outcome === "convert";
  if (f === "hesitated") return p.variant_a.outcome === "hesitate" || p.variant_b.outcome === "hesitate";
  if (f === "abandoned") return p.variant_a.outcome === "abandon" || p.variant_b.outcome === "abandon";
  return true;
}

/* ── Filter Bar — wraps to two rows instead of overflowing ── */
function FilterBar({ active, onChange, counts }: {
  active: OutcomeFilter;
  onChange: (f: OutcomeFilter) => void;
  counts: Record<OutcomeFilter, number>;
}) {
  const tabs: { key: OutcomeFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "converted", label: "Converted" },
    { key: "hesitated", label: "Hesitated" },
    { key: "abandoned", label: "Abandoned" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 2,
      backgroundColor: "#F0F0F5",
      borderRadius: 8,
      padding: 4,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.key;
        return (
          <button key={tab.key} type="button" onClick={() => onChange(tab.key)} style={{
            padding: "6px 6px", borderRadius: 6, fontSize: 12, fontWeight: isActive ? 600 : 400,
            color: isActive ? "#0D0D14" : "#9090A8", backgroundColor: isActive ? "#FFFFFF" : "transparent",
            boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            border: "none", cursor: "pointer", transition: "all 150ms ease", whiteSpace: "nowrap",
            textAlign: "center",
          }}>
            {tab.label} {counts[tab.key]}
          </button>
        );
      })}
    </div>
  );
}

/* ── Persona Row ── */
function PersonaRow({ persona, isSelected, onSelect }: {
  persona: PersonaDeepDive; isSelected: boolean; onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      padding: "10px 12px",
      borderRadius: 8, cursor: "pointer", border: "none", textAlign: "left",
      backgroundColor: isSelected ? "#F0F0F5" : "transparent",
      borderLeft: isSelected ? "3px solid #0D0D14" : "3px solid transparent",
      transition: "background-color 120ms ease",
    }}
      onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "#F7F7F9"; }}
      onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
    >
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%", backgroundColor: avatarColor(persona.name),
        color: "#FFF", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}>
        {getInitials(persona.name)}
      </div>
      {/* Name + subline */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#0D0D14", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: 0 }}>
          {persona.name}
        </p>
        <p style={{ fontSize: 12, color: "#9090A8", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {persona.occupation} · {persona.city}
        </p>
        <p style={{ fontSize: 10, color: "#B0B0C0", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {persona.archetype}
        </p>
      </div>
      {/* Status icon — fixed 16px, never clips */}
      <div style={{ width: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <StatusIcon a={persona.variant_a} b={persona.variant_b} />
      </div>
    </button>
  );
}

/* ── Element Chip ── */
function ElementChip({ name }: { name: string }) {
  return (
    <span style={{
      background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6,
      padding: "4px 10px", fontSize: 12, fontWeight: 500, color: "#1A1A1A",
      whiteSpace: "nowrap",
    }}>
      {name}
    </span>
  );
}

/* ── Variant Card (3-zone layout) ── */
function VariantCard({ label, experience }: { label: string; experience: PersonaVariantExperience }) {
  const { outcome, monologue, primary_emotion, why, liked, disliked } = experience;
  const es = emotionStyle(primary_emotion);
  const hasLiked = liked && liked.length > 0;
  const hasDisliked = disliked && disliked.length > 0;

  return (
    <div style={{ borderRadius: 12, border: "1px solid #E2E8F0", backgroundColor: "#FFF", overflow: "hidden" }}>
      {/* ZONE 1 — Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1E293B" }}>{label}</span>
        <OutcomeBadge outcome={outcome} />
      </div>

      {/* ZONE 2 — Monologue + emotion + why */}
      <div style={{ padding: 16 }}>
        <blockquote style={{ borderLeft: "3px solid #E2E8F0", paddingLeft: 12, margin: 0, fontSize: 15, fontStyle: "italic", color: "#334155", lineHeight: 1.6 }}>
          &ldquo;{monologue}&rdquo;
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999, backgroundColor: es.bg, color: es.color, flexShrink: 0 }}>
            {primary_emotion}
          </span>
          <span style={{ fontSize: 13, fontWeight: 400, color: "#475569", lineHeight: 1.4 }}>
            {why}
          </span>
        </div>
      </div>

      {/* ZONE 3 — Liked / Disliked */}
      {(hasLiked || hasDisliked) && (
        <div style={{ padding: 16, borderTop: "1px solid #F1F5F9", display: "flex", flexDirection: "column", gap: 8 }}>
          {hasLiked && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ width: 80, flexShrink: 0, fontSize: 11, fontWeight: 600, color: "#065F46", textTransform: "uppercase", letterSpacing: "0.5px", paddingTop: 4 }}>
                Liked
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {liked.map(name => <ElementChip key={name} name={name} />)}
              </div>
            </div>
          )}
          {hasDisliked && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ width: 80, flexShrink: 0, fontSize: 11, fontWeight: 600, color: "#991B1B", textTransform: "uppercase", letterSpacing: "0.5px", paddingTop: 4 }}>
                Disliked
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {disliked.map(name => <ElementChip key={name} name={name} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
interface Props {
  personas: PersonaDeepDive[];
}

export function SingleScreenDeepDive({ personas }: Props) {
  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>("all");
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const segments = useMemo(() => {
    const set = new Set<string>();
    personas.forEach(p => set.add(p.segment));
    return Array.from(set).sort();
  }, [personas]);

  const counts = useMemo<Record<OutcomeFilter, number>>(() => ({
    all: personas.length,
    converted: personas.filter(p => p.variant_a.outcome === "convert" || p.variant_b.outcome === "convert").length,
    hesitated: personas.filter(p => p.variant_a.outcome === "hesitate" || p.variant_b.outcome === "hesitate").length,
    abandoned: personas.filter(p => p.variant_a.outcome === "abandon" || p.variant_b.outcome === "abandon").length,
  }), [personas]);

  const filtered = useMemo(() => {
    let result = personas;
    if (outcomeFilter !== "all") result = result.filter(p => hasOutcome(p, outcomeFilter));
    if (segmentFilter !== "all") result = result.filter(p => p.segment === segmentFilter);
    return result;
  }, [personas, outcomeFilter, segmentFilter]);

  useEffect(() => {
    if (filtered.length > 0 && (!selectedId || !filtered.find(p => p.id === selectedId))) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = useMemo(() => personas.find(p => p.id === selectedId), [personas, selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileDropdownOpen(false);
    rightPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!selected) return null;

  const reflectionBorder = selected.overall_reflection.leaning === "neither" ? "#FECACA" : "#BBF7D0";
  const reflectionBg = selected.overall_reflection.leaning === "neither" ? "#FFF5F5" : "#F0FDF4";

  return (
    <div style={{ backgroundColor: "#F5F4F2" }}>
      {/* Mobile dropdown (< 640px) */}
      <div className="deep-dive-mobile-dropdown" style={{ display: "none", padding: "16px 24px 0" }}>
        <button type="button" onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #E5E7EB",
          backgroundColor: "#FFF", display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#0D0D14",
        }}>
          <span>{selected.name} · {selected.archetype}</span>
          <span style={{ fontSize: 10, color: "#9090A8" }}>{mobileDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {mobileDropdownOpen && (
          <div className="deep-dive-scroll" style={{ backgroundColor: "#FFF", border: "1px solid #E5E7EB", borderRadius: 8, marginTop: 4, maxHeight: 300, overflowY: "auto", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
            {filtered.map(p => (
              <button key={p.id} type="button" onClick={() => handleSelect(p.id)} style={{
                display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                border: "none", backgroundColor: p.id === selectedId ? "#F0F0F5" : "transparent",
                cursor: "pointer", fontSize: 13, color: "#0D0D14",
                borderBottom: "1px solid #F1F5F9",
              }}>
                {p.name} · <span style={{ color: "#9090A8" }}>{p.occupation}, {p.city}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="deep-dive-container" style={{ display: "flex", padding: "0 24px", minHeight: "calc(100vh - 120px)" }}>
        {/* ── Left Panel ── */}
        <div className="deep-dive-left-panel" style={{
          width: 280, marginRight: 24, position: "sticky", top: 117,
          height: "calc(100vh - 117px)", display: "flex", flexDirection: "column", alignSelf: "flex-start", flexShrink: 0,
          overflow: "hidden",
        }}>
          <div style={{ padding: "24px 0 0", flexShrink: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#0D0D14", marginBottom: 8 }}>
              {filtered.length} user{filtered.length !== 1 ? "s" : ""}
            </p>
            <p style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 8 }}>Filter by outcome on either variant</p>
            <div style={{ marginBottom: 8 }}>
              <FilterBar active={outcomeFilter} onChange={setOutcomeFilter} counts={counts} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9CA3AF", marginBottom: 6 }}>Segment</p>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <button type="button" onClick={() => setSegmentFilter("all")} style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: segmentFilter === "all" ? 600 : 400,
                  color: segmentFilter === "all" ? "#0D0D14" : "#9090A8",
                  backgroundColor: segmentFilter === "all" ? "#FFFFFF" : "transparent",
                  boxShadow: segmentFilter === "all" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  border: "none", cursor: "pointer", transition: "all 150ms ease", whiteSpace: "nowrap",
                }}>
                  All
                </button>
                {segments.map(s => {
                  const isActive = segmentFilter === s;
                  const count = personas.filter(p => p.segment === s).length;
                  return (
                    <button key={s} type="button" onClick={() => setSegmentFilter(isActive ? "all" : s)} style={{
                      padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#7C3AED" : "#9090A8",
                      backgroundColor: isActive ? "#F5F3FF" : "transparent",
                      boxShadow: isActive ? "0 1px 3px rgba(124,58,237,0.12)" : "none",
                      border: isActive ? "1px solid #C4B5FD" : "1px solid transparent",
                      cursor: "pointer", transition: "all 150ms ease", whiteSpace: "nowrap",
                    }}>
                      {s} <span style={{ opacity: 0.5 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="deep-dive-scroll" style={{ flex: 1, overflowY: "auto", paddingBottom: 24, marginRight: -8, paddingRight: 8 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filtered.length === 0 && (
                <p style={{ fontSize: 13, color: "#9CA3AF", padding: "16px 12px" }}>No users match these filters.</p>
              )}
              {filtered.map(p => (
                <PersonaRow key={p.id} persona={p} isSelected={p.id === selectedId} onSelect={() => handleSelect(p.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div ref={rightPanelRef} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 24, padding: "24px 0 64px" }}>
          {/* Identity Card */}
          <div style={{ backgroundColor: "#FFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%", backgroundColor: avatarColor(selected.name),
                  color: "#FFF", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {getInitials(selected.name)}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3, margin: 0 }}>{selected.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 400, color: "#9CA3AF", margin: 0, marginTop: 1 }}>
                    {selected.occupation} · {selected.age}y · {selected.city} · {selected.income_band}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>A:</span>
                  <OutcomeBadge outcome={selected.variant_a.outcome} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase" }}>B:</span>
                  <OutcomeBadge outcome={selected.variant_b.outcome} />
                </div>
              </div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <p style={{ fontSize: 12, fontStyle: "italic", color: "#64748B", lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                {selected.behavior_summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500, backgroundColor: "#F1F5F9", color: "#475569", whiteSpace: "nowrap" }}>
                  {selected.archetype}
                </span>
                {selected.tags.map(tag => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 500, backgroundColor: "#F1F5F9", color: "#475569", whiteSpace: "nowrap" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", margin: 0 }}>
            Both Variants
          </p>

          <div className="deep-dive-variant-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <VariantCard label="VARIANT A" experience={selected.variant_a} />
            <VariantCard label="VARIANT B" experience={selected.variant_b} />
          </div>

          <div style={{ backgroundColor: "#FFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)", padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: 8 }}>
              Overall Reflection
            </p>
            <div style={{
              borderLeft: `3px solid ${reflectionBorder}`, padding: "8px 14px",
              backgroundColor: reflectionBg, borderRadius: "0 6px 6px 0",
            }}>
              <p style={{ fontSize: 14, fontStyle: "italic", color: "#334155", lineHeight: 1.65, margin: 0 }}>
                {selected.overall_reflection.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .deep-dive-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .deep-dive-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .deep-dive-scroll::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 4px;
        }
        .deep-dive-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
        .deep-dive-scroll {
          scrollbar-color: #D1D5DB transparent;
          scrollbar-width: thin;
        }
        @media (max-width: 1024px) {
          .deep-dive-variant-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .deep-dive-left-panel {
            display: none !important;
          }
          .deep-dive-mobile-dropdown {
            display: block !important;
          }
          .deep-dive-container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}