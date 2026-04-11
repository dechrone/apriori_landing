"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, MessageSquareQuote } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPE DEFINITIONS — matches variant-comparison-schema.json
   ═══════════════════════════════════════════════════════════════════════════ */

export interface VariantDef {
  id: string;
  label: string;
  is_control: boolean;
  color: string;
  description: string;
}

interface MetricsRow {
  sus: number;
  seq: number;
  completion_rate: number;
  friction_count: number;
  avg_sentiment: number;
}

interface ThemeMonologueEvidence {
  persona_name: string;
  persona_archetype: string;
  monologues: Record<string, string>;
}

interface ThemeItem {
  id: string;
  name: string;
  description: string;
  present_in?: string[];
  absent_in?: string[];
  resolved_by?: string[];
  introduced_by?: string[];
  persona_count?: number;
  persona_count_in_control?: number;
  monologue_evidence: ThemeMonologueEvidence | null;
}

interface ScreenComparisonItem {
  screen_name: string;
  screen_index: number;
  divergence: "high" | "medium" | "low";
  divergence_score: number;
  summaries: Record<string, string>;
}

interface PersonaJourney {
  persona_id: string;
  name: string;
  age: number;
  archetype: string;
  avatar_emoji: string;
  segment: string;
  preferred_variant: string;
  narrative: string;
}

interface SegmentVerdict {
  segment_name: string;
  persona_count: number;
  winner: string;
  narrative: string;
  metrics_by_variant: Record<string, { sus: number; seq: number; completion_rate: number }>;
}

interface FrictionProvenanceItem {
  id: string;
  friction: string;
  screen: string;
  status: "persistent" | "resolved" | "introduced";
  resolved_by?: string[];
  introduced_by?: string[];
  presence: Record<string, "present" | "partial" | "absent">;
}

interface Recommendation {
  id: string;
  recommendation: string;
  type: "persistent_fix" | "ship" | "variant_fix";
  applies_to: string[];
  priority: "high" | "medium";
  rice_score: number;
  rationale: string;
}

export interface ComparisonData {
  metadata: {
    simulation_id: string;
    simulation_name: string;
    created_at: string;
    persona_count: number;
    screen_count: number;
    flow_screens: string[];
  };
  variants: VariantDef[];
  metrics: Record<string, MetricsRow>;
  verdict: {
    recommended_variant: string;
    recommendation_type: string;
    modifications: string[];
    verdict_text: string;
    confidence: {
      personas_preferring_winner: number;
      total_personas: number;
      dissenting_segments: string[];
    };
  };
  theme_movement: {
    persistent: ThemeItem[];
    resolved: ThemeItem[];
    introduced: ThemeItem[];
  };
  screen_comparison: ScreenComparisonItem[];
  persona_journeys: PersonaJourney[];
  segment_verdicts: SegmentVerdict[];
  friction_provenance: FrictionProvenanceItem[];
  recommendations: Recommendation[];
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

function variantById(variants: VariantDef[], id: string): VariantDef | undefined {
  return variants.find((v) => v.id === id);
}

function controlVariant(variants: VariantDef[]): VariantDef | undefined {
  return variants.find((v) => v.is_control);
}

function variantLabel(variants: VariantDef[], id: string): string {
  return variantById(variants, id)?.label ?? id;
}

function variantColor(variants: VariantDef[], id: string): string {
  return variantById(variants, id)?.color ?? "#8B8FA3";
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRIMITIVES — matches StudyOverviewTab design system exactly
   ═══════════════════════════════════════════════════════════════════════════ */

function Pill({ bg, text, children, style: s }: { bg: string; text: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: bg, color: text, whiteSpace: "nowrap", ...s }}>{children}</span>;
}

function SectionHeader({ num, title, subtitle }: { num?: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {num && (
        <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>
          {num}
        </p>
      )}
      <h3 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function SectionDivider() {
  return <div style={{ marginTop: 36, marginBottom: 36, borderTop: "1px solid #E5E7EB" }} />;
}

function ActDivider({ label }: { label: string }) {
  return (
    <div style={{ margin: "48px 0 32px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ height: 2, flex: 1, background: "linear-gradient(90deg, #E8583A 0%, #E5E7EB 100%)" }} />
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{label}</h2>
      <div style={{ height: 2, flex: 1, background: "linear-gradient(90deg, #E5E7EB 0%, #E8583A 100%)" }} />
    </div>
  );
}

function VariantPill({ variant }: { variant: VariantDef }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: "monospace", background: `${variant.color}15`, border: `1px solid ${variant.color}30`, color: variant.color, whiteSpace: "nowrap" }}>
      {variant.label}
    </span>
  );
}

function SemanticPill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${color}15`, border: `1px solid ${color}30`, color, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   POPUP — same architecture as StudyOverviewTab
   ═══════════════════════════════════════════════════════════════════════════ */

function Popup({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
          <button type="button" onClick={onClose} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}>
            <X size={16} style={{ color: "#9CA3AF" }} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXEC SUMMARY BANNER — dark banner matching StudyOverviewTab
   ═══════════════════════════════════════════════════════════════════════════ */

function VerdictBanner({ data, variants }: { data: ComparisonData["verdict"]; variants: VariantDef[] }) {
  const winner = variantById(variants, data.recommended_variant);
  const winnerColor = winner?.color ?? "#10B981";

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ background: "#1A1814", borderRadius: 20, padding: "36px 40px", position: "relative", overflow: "hidden", marginBottom: 16 }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,88,58,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#E8583A", letterSpacing: "0.12em", marginBottom: 14 }}>The Verdict</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          {winner && (
            <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, fontFamily: "monospace", background: `${winnerColor}25`, border: `1px solid ${winnerColor}50`, color: winnerColor }}>
              Recommended: {winner.label}
            </span>
          )}
          {data.recommendation_type === "ship_with_modifications" && (
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>with modifications</span>
          )}
        </div>
        <p style={{ fontSize: 16, color: "#FFF", lineHeight: 1.65, marginBottom: 24 }}>
          {renderVerdictText(data.verdict_text)}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px", flex: "1 1 260px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: winnerColor, marginBottom: 4 }}>Confidence</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
              {data.confidence.personas_preferring_winner} of {data.confidence.total_personas} personas had their best experience in {winner?.label ?? "the recommended variant"}
            </p>
          </div>
          {data.confidence.dissenting_segments.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px", flex: "1 1 260px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B", marginBottom: 4 }}>Dissenting</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                {data.confidence.dissenting_segments.join(", ")} preferred a different variant
              </p>
            </div>
          )}
          {data.modifications.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px", flex: "1 1 100%" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#E8583A", marginBottom: 4 }}>Modifications needed</p>
              {data.modifications.map((m, i) => (
                <p key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: "0 0 2px" }}>• {m}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function renderVerdictText(text: string): React.ReactNode {
  const idx = text.indexOf("The recommended path is");
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const rest = text.slice(idx);
  const dotIdx = rest.indexOf(".");
  if (dotIdx === -1) return <>{before}<strong style={{ color: "#FFF" }}>{rest}</strong></>;
  const sentence = rest.slice(0, dotIdx + 1);
  const after = rest.slice(dotIdx + 1);
  return <>{before}<strong style={{ color: "#FFF" }}>{sentence}</strong>{after}</>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCORE STRIP — 3-card layout matching StudyOverviewTab ScoreCard
   ═══════════════════════════════════════════════════════════════════════════ */

function ScoreCard({ title, value, subtitle, accent }: { title: string; value: string; subtitle: React.ReactNode; accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      style={{ background: "#FFF", borderRadius: 16, padding: "24px 28px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative", overflow: "visible" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "16px 0 0 16px" }} />
      <p style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "inline-flex", alignItems: "center" }}>{title}</p>
      <p style={{ fontSize: 36, fontWeight: 800, color: "#1A1A1A", lineHeight: 1, marginBottom: 8 }}>{value}</p>
      <div>{subtitle}</div>
    </motion.div>
  );
}

function WinnerScoreStrip({ metrics, variants }: { metrics: Record<string, MetricsRow>; variants: VariantDef[] }) {
  const ctrl = controlVariant(variants);
  const ctrlMetrics = ctrl ? metrics[ctrl.id] : undefined;
  /* Find highest completion rate variant */
  let bestCR = { id: "", val: 0 };
  let bestSUS = { id: "", val: 0 };
  let bestSEQ = { id: "", val: 0 };
  for (const v of variants) {
    const m = metrics[v.id];
    if (!m) continue;
    if (m.completion_rate > bestCR.val) bestCR = { id: v.id, val: m.completion_rate };
    if (m.sus > bestSUS.val) bestSUS = { id: v.id, val: m.sus };
    if (m.seq > bestSEQ.val) bestSEQ = { id: v.id, val: m.seq };
  }
  const bestCRVariant = variantById(variants, bestCR.id);
  const bestSUSVariant = variantById(variants, bestSUS.id);
  const bestSEQVariant = variantById(variants, bestSEQ.id);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      <ScoreCard
        title="Best Completion Rate"
        value={`${bestCR.val}%`}
        accent={bestCRVariant?.color ?? "#10B981"}
        subtitle={
          <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {bestCRVariant && <Pill bg={`${bestCRVariant.color}20`} text={bestCRVariant.color}>{bestCRVariant.label}</Pill>}
            {ctrlMetrics && <span style={{ fontSize: 13, color: bestCR.val > ctrlMetrics.completion_rate ? "#10B981" : "#EF4444" }}>
              {bestCR.val > ctrlMetrics.completion_rate ? "+" : ""}{bestCR.val - ctrlMetrics.completion_rate}% vs Control
            </span>}
          </span>
        }
      />
      <ScoreCard
        title="Best SUS Score"
        value={bestSUS.val.toString()}
        accent={bestSUSVariant?.color ?? "#10B981"}
        subtitle={
          <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {bestSUSVariant && <Pill bg={`${bestSUSVariant.color}20`} text={bestSUSVariant.color}>{bestSUSVariant.label}</Pill>}
            {ctrlMetrics && <span style={{ fontSize: 13, color: bestSUS.val > ctrlMetrics.sus ? "#10B981" : "#EF4444" }}>
              {bestSUS.val > ctrlMetrics.sus ? "+" : ""}{bestSUS.val - ctrlMetrics.sus} vs Control
            </span>}
          </span>
        }
      />
      <ScoreCard
        title="Best SEQ Score"
        value={bestSEQ.val.toFixed(1)}
        accent={bestSEQVariant?.color ?? "#10B981"}
        subtitle={
          <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {bestSEQVariant && <Pill bg={`${bestSEQVariant.color}20`} text={bestSEQVariant.color}>{bestSEQVariant.label}</Pill>}
            {ctrlMetrics && <span style={{ fontSize: 13, color: bestSEQ.val > ctrlMetrics.seq ? "#10B981" : "#EF4444" }}>
              {bestSEQ.val > ctrlMetrics.seq ? "+" : ""}{(bestSEQ.val - ctrlMetrics.seq).toFixed(1)} vs Control
            </span>}
          </span>
        }
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   METRICS TABLE — full comparison table
   ═══════════════════════════════════════════════════════════════════════════ */

interface MetricDef { label: string; key: keyof MetricsRow; unit: string; bestIs: "highest" | "lowest"; }
const METRIC_DEFS: MetricDef[] = [
  { label: "SUS Score", key: "sus", unit: "", bestIs: "highest" },
  { label: "SEQ Score", key: "seq", unit: "", bestIs: "highest" },
  { label: "Completion Rate", key: "completion_rate", unit: "%", bestIs: "highest" },
  { label: "Friction Points", key: "friction_count", unit: "", bestIs: "lowest" },
  { label: "Avg Sentiment", key: "avg_sentiment", unit: "", bestIs: "highest" },
];

function MetricsTable({ metrics, variants }: { metrics: Record<string, MetricsRow>; variants: VariantDef[] }) {
  const ctrl = controlVariant(variants);
  const ctrlId = ctrl?.id ?? variants[0]?.id;

  return (
    <div>
      <SectionHeader num="02" title="Metrics at a Glance" subtitle="Quantitative snapshot. Deltas shown vs Control. Best-in-row highlighted." />
      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E5E7EB", background: "#F9FAFB" }}>
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Metric</th>
              {variants.map((v) => (
                <th key={v.id} style={{ textAlign: "center", padding: "14px 16px", fontSize: 11, fontWeight: 600, color: v.color, textTransform: "uppercase", letterSpacing: 1, fontFamily: "monospace" }}>
                  {v.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRIC_DEFS.map((md) => {
              const values = variants.map((v) => ({ variantId: v.id, value: metrics[v.id]?.[md.key] ?? 0 }));
              const bestVal = md.bestIs === "highest" ? Math.max(...values.map((v) => v.value)) : Math.min(...values.map((v) => v.value));
              const controlVal = metrics[ctrlId]?.[md.key] ?? 0;

              return (
                <tr key={md.key} style={{ borderBottom: "1px solid #F3F4F6", transition: "background 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}>
                  <td style={{ textAlign: "left", padding: "16px 20px", fontSize: 13, fontWeight: 500, color: "#6B7280" }}>{md.label}</td>
                  {variants.map((v) => {
                    const val = metrics[v.id]?.[md.key] ?? 0;
                    const isBest = val === bestVal;
                    const isControl = v.id === ctrlId;
                    const rawDelta = val - controlVal;
                    const delta = md.bestIs === "lowest" ? -rawDelta : rawDelta;
                    const deltaStr = rawDelta === 0 ? "" : rawDelta > 0 ? `+${Number.isInteger(rawDelta) ? rawDelta : rawDelta.toFixed(2)}` : `${Number.isInteger(rawDelta) ? rawDelta : rawDelta.toFixed(2)}`;
                    return (
                      <td key={v.id} style={{ textAlign: "center", padding: "16px 16px", background: isBest ? "#ECFDF510" : "transparent" }}>
                        <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "monospace", color: isBest ? "#10B981" : "#1A1A1A" }}>
                          {val}{md.unit}
                        </span>
                        {!isControl && deltaStr && (
                          <div style={{ fontSize: 11, fontFamily: "monospace", color: delta > 0 ? "#10B981" : "#EF4444", marginTop: 2 }}>{deltaStr}</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   THEME MOVEMENT — 2×2 card grid matching ThemesGrid
   ═══════════════════════════════════════════════════════════════════════════ */

const THEME_COLORS = { persistent: "#F59E0B", resolved: "#10B981", introduced: "#EF4444" };

function ThemeCard({ theme, category, variants }: { theme: ThemeItem; category: "persistent" | "resolved" | "introduced"; variants: VariantDef[] }) {
  const [expanded, setExpanded] = useState(false);
  const color = THEME_COLORS[category];
  const evidence = theme.monologue_evidence;

  return (
    <div onClick={() => setExpanded(!expanded)}
      style={{ background: "#FFF", borderRadius: 12, border: "0.5px solid #D1D5DB", borderLeft: `3px solid ${color}`, padding: "18px 20px", cursor: "pointer", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; (e.currentTarget as HTMLDivElement).style.borderLeftColor = color; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLDivElement).style.borderLeftColor = color; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", flex: 1, lineHeight: 1.45 }}>{theme.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {category === "resolved" && theme.resolved_by?.map((vId) => (
            <Pill key={vId} bg={`${variantColor(variants, vId)}20`} text={variantColor(variants, vId)} style={{ fontSize: 10, padding: "2px 8px" }}>
              Resolved by {variantLabel(variants, vId)}
            </Pill>
          ))}
          {category === "introduced" && theme.introduced_by?.map((vId) => (
            <Pill key={vId} bg="#FEE2E2" text="#991B1B" style={{ fontSize: 10, padding: "2px 8px" }}>
              Introduced by {variantLabel(variants, vId)}
            </Pill>
          ))}
          {(theme.persona_count || theme.persona_count_in_control) && (
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <p style={{ fontSize: 22, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: 0 }}>{theme.persona_count ?? theme.persona_count_in_control}</p>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>users</p>
            </div>
          )}
          <ChevronDown size={14} style={{ color: "#9CA3AF", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>
      </div>
      {/* Description */}
      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, margin: "6px 0 0", ...(!expanded ? { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" } : {}) }}>{theme.description}</p>
      {/* Hint */}
      {evidence && !expanded && <p className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", margin: "12px 0 0", textAlign: "right", transition: "color 0.15s" }}>View details →</p>}
      {/* Expanded monologue evidence */}
      {expanded && evidence && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #E5E7EB" }}>
          <p style={{ fontSize: 12, fontStyle: "italic", color: "#9CA3AF", margin: "0 0 10px" }}>{evidence.persona_name} — {evidence.persona_archetype}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {variants.filter((v) => evidence.monologues[v.id]).map((v) => (
              <div key={v.id} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <MessageSquareQuote size={13} style={{ color: v.color, marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: v.color, fontFamily: "monospace", margin: "0 0 2px", textTransform: "uppercase" }}>{v.label}</p>
                  <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>&ldquo;{evidence.monologues[v.id]}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeMovementSection({ data, variants }: { data: ComparisonData["theme_movement"]; variants: VariantDef[] }) {
  const sections: { key: "persistent" | "resolved" | "introduced"; label: string; desc: string }[] = [
    { key: "resolved", label: "Resolved", desc: "Friction from Control that one or more variants eliminated" },
    { key: "introduced", label: "Introduced", desc: "New friction that didn't exist in Control" },
    { key: "persistent", label: "Persistent", desc: "Present in all variants — no flow redesign fixed these" },
  ];

  return (
    <div>
      <SectionHeader num="03" title="Theme Movement" subtitle="Where did themes persist, get resolved, or get introduced across variants?" />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {sections.map((sec) => {
          const items = data[sec.key];
          if (!items?.length) return null;
          const color = THEME_COLORS[sec.key];
          return (
            <div key={sec.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 15, fontWeight: 500, color }}>{sec.label}</span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>— {sec.desc}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: items.length === 1 ? "1fr" : "1fr 1fr", gap: 12 }}>
                {items.map((theme) => (
                  <ThemeCard key={theme.id} theme={theme} category={sec.key} variants={variants} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCREEN-BY-SCREEN — expandable rows matching card pattern
   ═══════════════════════════════════════════════════════════════════════════ */

function divergenceStyle(d: string): { color: string; bg: string; text: string } {
  if (d === "high") return { color: "#EF4444", bg: "#FEE2E2", text: "#991B1B" };
  if (d === "medium") return { color: "#F59E0B", bg: "#FEF3C7", text: "#92400E" };
  return { color: "#6B7280", bg: "#F3F4F6", text: "#6B7280" };
}

function ScreenComparisonSection({ screens, variants }: { screens: ScreenComparisonItem[]; variants: VariantDef[] }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div>
      <SectionHeader num="04" title="Screen-by-Screen Experience" subtitle="How did each screen's experience differ across variants? Click to expand." />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {screens.sort((a, b) => a.screen_index - b.screen_index).map((screen, i) => {
          const isExpanded = expandedIdx === i;
          const ds = divergenceStyle(screen.divergence);
          return (
            <div key={screen.screen_name}>
              <div onClick={() => setExpandedIdx(isExpanded ? null : i)}
                style={{ background: "#FFF", border: "0.5px solid #D1D5DB", borderRadius: 12, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A" }}>{screen.screen_name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Pill bg={ds.bg} text={ds.text} style={{ fontSize: 10, padding: "2px 8px" }}>{screen.divergence} divergence</Pill>
                  <ChevronDown size={14} style={{ color: "#9CA3AF", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} />
                </div>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10, padding: "0 4px" }}>
                      {variants.map((v) => {
                        const summary = screen.summaries[v.id] ?? "";
                        return (
                          <div key={v.id} style={{ background: "#FFF", border: `1px solid ${v.color}25`, borderRadius: 12, padding: "16px 18px", borderLeft: `3px solid ${v.color}` }}>
                            <p style={{ fontSize: 11, fontWeight: 600, color: v.color, fontFamily: "monospace", textTransform: "uppercase", margin: "0 0 8px" }}>{v.label}</p>
                            <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.55, margin: 0 }}>{summary}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PERSONA JOURNEYS — card grid matching behavioral patterns
   ═══════════════════════════════════════════════════════════════════════════ */

function PersonaJourneysSection({ journeys, variants }: { journeys: PersonaJourney[]; variants: VariantDef[] }) {
  return (
    <div>
      <SectionHeader num="05" title="Persona Journeys" subtitle="How representative personas experienced the same checkout across all variants." />
      <div style={{ display: "grid", gridTemplateColumns: journeys.length <= 2 ? `repeat(${journeys.length}, 1fr)` : "1fr 1fr", gap: 12 }}>
        {journeys.map((pj) => {
          const prefVariant = variantById(variants, pj.preferred_variant);
          const prefColor = prefVariant?.color ?? "#6B7280";
          return (
            <div key={pj.persona_id}
              style={{ background: "#FFF", borderRadius: 12, border: "0.5px solid #D1D5DB", borderLeft: `3px solid ${prefColor}`, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 24 }}>{pj.avatar_emoji}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", margin: 0, lineHeight: 1.3 }}>{pj.name}, {pj.age}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>{pj.archetype}</p>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                {prefVariant && <Pill bg={`${prefColor}20`} text={prefColor} style={{ fontSize: 10, padding: "2px 8px" }}>Preferred: {prefVariant.label}</Pill>}
              </div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{pj.narrative}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEGMENT VERDICTS — table matching SegmentTable + popup
   ═══════════════════════════════════════════════════════════════════════════ */

function SegmentVerdictsSection({ segments, variants }: { segments: SegmentVerdict[]; variants: VariantDef[] }) {
  const [selId, setSelId] = useState<string | null>(null);
  const sel = segments.find((s) => s.segment_name === selId) ?? null;
  const ctrl = controlVariant(variants);
  const ctrlId = ctrl?.id ?? variants[0]?.id;

  return (
    <div>
      <SectionHeader num="06" title="Segment Verdicts" subtitle="Which variant won for each user segment, and why." />
      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "180px 60px 100px 1fr", padding: "14px 24px", borderBottom: "1px solid #E5E7EB" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Segment</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>n</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Winner</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Key insight</span>
        </div>
        {segments.map((seg, i) => {
          const winner = variantById(variants, seg.winner);
          const winColor = winner?.color ?? "#6B7280";
          const short = seg.narrative.length > 80 ? seg.narrative.slice(0, 80).trimEnd() + "…" : seg.narrative;
          return (
            <div key={seg.segment_name} onClick={() => setSelId(seg.segment_name)}
              style={{ display: "grid", gridTemplateColumns: "180px 60px 100px 1fr", padding: "16px 24px", borderBottom: i < segments.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#FAFAF8"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{seg.segment_name}</span>
              <span style={{ fontSize: 14, color: "#6B7280" }}>{seg.persona_count}</span>
              <span>{winner && <Pill bg={`${winColor}20`} text={winColor}>{winner.label}</Pill>}</span>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, color: "#4B5563" }}>{short}</span>
                <span className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, marginLeft: 12, transition: "color 0.15s" }}>View details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup */}
      <AnimatePresence>{sel && (
        <Popup onClose={() => setSelId(null)}>
          <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px" }}>{sel.segment_name}</h4>
          <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 14px" }}>
            n={sel.persona_count} · Winner: <span style={{ color: variantColor(variants, sel.winner), fontWeight: 500 }}>{variantLabel(variants, sel.winner)}</span>
          </p>
          <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "0 0 20px" }}>{sel.narrative}</p>
          <div style={{ borderTop: "0.5px solid #E5E7EB", paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 10 }}>Per-variant metrics</p>
            <div style={{ background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #E5E7EB", background: "#F9FAFB" }}>
                    <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Metric</th>
                    {variants.map((v) => (
                      <th key={v.id} style={{ textAlign: "center", padding: "10px 14px", fontSize: 11, fontWeight: 600, color: v.color, textTransform: "uppercase", letterSpacing: 1, fontFamily: "monospace" }}>{v.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["sus", "seq", "completion_rate"] as const).map((key) => {
                    const values = variants.map((v) => sel.metrics_by_variant[v.id]?.[key] ?? 0);
                    const best = Math.max(...values);
                    return (
                      <tr key={key} style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ textAlign: "left", padding: "12px 14px", fontSize: 13, fontWeight: 500, color: "#6B7280" }}>
                          {key === "sus" ? "SUS Score" : key === "seq" ? "SEQ Score" : "Completion Rate"}
                        </td>
                        {variants.map((v) => {
                          const val = sel.metrics_by_variant[v.id]?.[key] ?? 0;
                          const isBest = val === best;
                          return (
                            <td key={v.id} style={{ textAlign: "center", padding: "12px 14px", background: isBest ? "#ECFDF510" : "transparent" }}>
                              <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "monospace", color: isBest ? "#10B981" : "#1A1A1A" }}>
                                {val}{key === "completion_rate" ? "%" : ""}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Popup>
      )}</AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FRICTION PROVENANCE — table matching Priority Table styling
   ═══════════════════════════════════════════════════════════════════════════ */

function presenceDot(status: "present" | "partial" | "absent"): { char: string; color: string } {
  if (status === "present") return { char: "●", color: "#EF4444" };
  if (status === "partial") return { char: "◐", color: "#F59E0B" };
  return { char: "●", color: "#10B981" };
}

function FrictionProvenanceSection({ items, variants }: { items: FrictionProvenanceItem[]; variants: VariantDef[] }) {
  return (
    <div>
      <SectionHeader num="07" title="Friction Provenance" subtitle="Every friction point tracked across all variants. Green = absent, amber = partial, red = present." />
      <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, fontWeight: 500, color: "#6B7280" }}>Friction Point</th>
              <th style={{ textAlign: "left", padding: "14px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280" }}>Screen</th>
              {variants.map((v) => (
                <th key={v.id} style={{ textAlign: "center", padding: "14px 12px", fontSize: 11, fontWeight: 600, color: v.color, textTransform: "uppercase", letterSpacing: 1, fontFamily: "monospace" }}>
                  {v.is_control ? "CTL" : v.label.replace("Variant ", "")}
                </th>
              ))}
              <th style={{ textAlign: "left", padding: "14px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, ri) => (
              <tr key={item.id} style={{ borderBottom: ri < items.length - 1 ? "1px solid #F3F4F6" : "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}>
                <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 500, color: "#1A1A1A", lineHeight: 1.4 }}>{item.friction}</td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: "#6B7280" }}>{item.screen}</td>
                {variants.map((v) => {
                  const p = item.presence[v.id] ?? "absent";
                  const dot = presenceDot(p);
                  return <td key={v.id} style={{ textAlign: "center", padding: "14px 12px" }}><span style={{ fontSize: 14, color: dot.color }}>{dot.char}</span></td>;
                })}
                <td style={{ padding: "14px 16px" }}>
                  {item.status === "persistent" && <Pill bg="#FEF3C7" text="#92400E" style={{ fontSize: 10, padding: "2px 8px" }}>Persistent</Pill>}
                  {item.status === "resolved" && <Pill bg="#D1FAE5" text="#065F46" style={{ fontSize: 10, padding: "2px 8px" }}>Resolved by {item.resolved_by?.map((id) => variantLabel(variants, id).replace("Variant ", "")).join(", ")}</Pill>}
                  {item.status === "introduced" && <Pill bg="#FEE2E2" text="#991B1B" style={{ fontSize: 10, padding: "2px 8px" }}>New in {item.introduced_by?.map((id) => variantLabel(variants, id).replace("Variant ", "")).join(", ")}</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   RECOMMENDATIONS — card grid matching DesignRecGrid
   ═══════════════════════════════════════════════════════════════════════════ */

function recBorderColor(type: string): string {
  if (type === "persistent_fix") return "#F59E0B";
  if (type === "ship") return "#10B981";
  if (type === "variant_fix") return "#EF4444";
  return "#D1D5DB";
}

function RecommendationsSection({ recommendations, variants }: { recommendations: Recommendation[]; variants: VariantDef[] }) {
  const sorted = [...recommendations].sort((a, b) => b.rice_score - a.rice_score);
  const cols = sorted.length <= 3 ? `repeat(${sorted.length}, 1fr)` : "1fr 1fr";

  return (
    <div>
      <SectionHeader title="Design Recommendations" subtitle="Unified recommendations across all variants, ranked by RICE score." />
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
        {sorted.map((rec) => {
          const borderColor = recBorderColor(rec.type);
          const appliesToLabel = rec.applies_to.includes("all") ? "All variants" : rec.applies_to.map((id) => variantLabel(variants, id)).join(", ");

          return (
            <div key={rec.id}
              style={{ background: "#FFF", borderRadius: "0 0 12px 12px", borderTop: `3px solid ${borderColor}`, border: `0.5px solid #D1D5DB`, borderTopColor: borderColor, borderTopWidth: 3, borderTopStyle: "solid", padding: "20px 20px 18px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <Pill bg={rec.priority === "high" ? "#FEE2E2" : "#FEF3C7"} text={rec.priority === "high" ? "#991B1B" : "#92400E"} style={{ fontSize: 10, padding: "2px 8px" }}>
                  {rec.priority === "high" ? "High" : "Medium"}
                </Pill>
                <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F3F4F6", padding: "3px 10px", borderRadius: 6 }}>{appliesToLabel}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: "auto" }}>RICE {rec.rice_score}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1.4, flex: "1 1 auto" }}>{rec.recommendation}</p>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{rec.rationale}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

export function ComparisonAnalysisTab({ data }: { data: ComparisonData }) {
  const { variants } = data;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
      {/* Executive-style verdict banner */}
      <VerdictBanner data={data.verdict} variants={variants} />

      <ActDivider label="What Happened" />

      {/* Score strip — best metrics across variants */}
      <WinnerScoreStrip metrics={data.metrics} variants={variants} />

      {/* Full metrics comparison table */}
      <div style={{ marginTop: 40 }}>
        <MetricsTable metrics={data.metrics} variants={variants} />
      </div>

      <SectionDivider />

      {/* Theme Movement */}
      <ThemeMovementSection data={data.theme_movement} variants={variants} />

      <SectionDivider />

      {/* Screen-by-Screen */}
      <ScreenComparisonSection screens={data.screen_comparison} variants={variants} />

      <SectionDivider />

      {/* Persona Journeys */}
      <PersonaJourneysSection journeys={data.persona_journeys} variants={variants} />

      <SectionDivider />

      {/* Segment Verdicts */}
      <SegmentVerdictsSection segments={data.segment_verdicts} variants={variants} />

      <ActDivider label="What To Do" />

      {/* Friction Provenance */}
      <FrictionProvenanceSection items={data.friction_provenance} variants={variants} />

      <SectionDivider />

      {/* Recommendations */}
      <RecommendationsSection recommendations={data.recommendations} variants={variants} />
    </div>
  );
}
