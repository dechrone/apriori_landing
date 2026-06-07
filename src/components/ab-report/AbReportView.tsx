"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, DM_Sans } from "next/font/google";
import {
  Check as CheckIcon,
  X as XIcon,
  UserCircle2,
  Users,
  Activity,
  Layers,
  Sliders,
  Sparkles,
  AlertTriangle,
  Link2,
  ArrowUpRight,
  Info,
} from "lucide-react";

/* Match the savesage demo's typographic system: editorial Playfair Display
   for section titles + verdict, DM Sans for body. Loaded here so the CSS
   variables resolve inside this report only — no global font churn. */
const reportDisplayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-flow-display",
  display: "swap",
});

const reportBodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-flow-body",
  display: "swap",
});
import type {
  AbReport,
  AnnotatedScreenPair,
  PersonaSplit as PersonaSplitType,
  DesignCombinerReadyData,
} from "@/types/ab-report";
import {
  TopBar,
  TabBar,
  SectionHeader,
  SectionDivider,
  PersonaChip,
  QuoteLine,
  ConfidenceBadge,
  CopyButton,
  AnnotatedPhone,
  Pill,
} from "./primitives";
import { AbReportDeepDive } from "./DeepDive";
import { LeverAnalysisView } from "./LeverAnalysisView";
import { toggleSimulationShare } from "@/lib/backend-simulation";

const T = {
  accent: "#E8583A",
  pageBg: "#F2F0EC",
  flowBg: "#F5F4F2",
  card: "#FFFFFF",
  heroBg: "#1A1814",
  ink: "#1A1A1A",
  text2: "#4B5563",
  text3: "#6B7280",
  text4: "#9CA3AF",
  border: "#E5E7EB",
  borderWarm: "#E8E4DE",
  hairline: "#D1D5DB",
};

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

/* Strip em dashes from any backend-generated string before rendering.
   The LLM router occasionally slips them into rationale / feature copy,
   and the user has a standing rule that em dashes never reach the UI.
   Em dashes most often mark a continuation or aside, so a comma flows
   better than a period in almost every case the LLM produces. */
function noDash(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/\s*—\s*/g, ", ").replace(/\s+,/g, ",");
}

function stagger(i: number) {
  return { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35, delay: i * 0.05 } };
}

const cardStyle: React.CSSProperties = {
  background: T.card,
  border: `0.5px solid ${T.hairline}`,
  borderRadius: 12,
  padding: "18px 20px",
  transition: "border-color 0.15s",
};

function fmtPct(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return `${Math.round(n)}%`;
}

/* Data-quality + caveats strip. Surfaces `lever_attribution.notes` (degraded
   personas, base confidence, top drag-levers) right under the verdict — the
   "show me the caveats" content that earns a veteran's trust instead of
   reading as overclaiming. */
function CaveatsStrip({ notes }: { notes: string }) {
  return (
    <motion.div
      {...fadeUp}
      style={{ marginTop: 16, display: "flex", gap: 11, alignItems: "flex-start", background: "#FFF", border: `0.5px solid ${T.hairline}`, borderRadius: 10, padding: "12px 16px" }}
    >
      <Info size={14} style={{ color: T.text4, flexShrink: 0, marginTop: 2 }} />
      <div>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.text3, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
          Data quality &amp; caveats
        </div>
        <p style={{ fontSize: 12.5, color: T.text2, lineHeight: 1.5, margin: 0 }}>{noDash(notes)}</p>
      </div>
    </motion.div>
  );
}

/* One predicted-completion bar inside the dark verdict hero. `emphasis` tints
   the variant that completes more in the brand accent. */
function CompletionBar({ label, pct, emphasis }: { label: string; pct: number | null | undefined; emphasis: boolean }) {
  const w = pct == null ? 0 : Math.max(0, Math.min(100, pct));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 62, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", textTransform: "uppercase", flexShrink: 0 }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 8, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", borderRadius: 999, background: emphasis ? T.accent : "rgba(255,255,255,0.5)", transition: "width 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
      <span style={{ width: 42, textAlign: "right", fontSize: 14, fontWeight: 700, color: "#FFFFFF", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
        {fmtPct(pct)}
      </span>
    </div>
  );
}

/* The hero's right-hand metric card: per-variant predicted completion + the
   signed lift as the headline number. Returns null when the backend didn't
   stamp the deterministic rates (legacy / cached reports). */
function HeroCompletion({ verdict }: { verdict: AbReport["verdict"] }) {
  const a = verdict.completion_rate_a;
  const b = verdict.completion_rate_b;
  const lift = verdict.lift_pp;
  if (a == null || b == null || lift == null) return null;

  const compLeader = lift > 0 ? "B" : lift < 0 ? "A" : "neither";
  const magnitude = Math.abs(Math.round(lift));

  return (
    <div style={{ flex: "0 0 auto", minWidth: 280, maxWidth: 360, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "22px 24px" }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16 }}>
        Predicted completion
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <CompletionBar label="Variant A" pct={a} emphasis={compLeader === "A"} />
        <CompletionBar label="Variant B" pct={b} emphasis={compLeader === "B"} />
      </div>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "baseline", gap: 9 }}>
        <span style={{ fontFamily: "var(--font-flow-display), serif", fontSize: 34, fontWeight: 600, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.02em" }}>
          {compLeader === "neither" ? "Even" : `${lift > 0 ? "+" : "−"}${magnitude}pp`}
        </span>
        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.35 }}>
          {compLeader === "neither" ? "identical completion" : `higher on Variant ${compLeader}`}
        </span>
      </div>
    </div>
  );
}

/* ── Source tag palette ── */
const sourceTagStyle: Record<string, { bg: string; color: string; label: string }> = {
  A: { bg: "#F3F4F6", color: "#1F2937", label: "A" },
  B: { bg: "#D1FAE5", color: "#065F46", label: "B" },
  both: { bg: "#F3F4F6", color: "#374151", label: "A+B" },
  neither: { bg: "transparent", color: "#9CA3AF", label: "-" },
};

function SourceChip({ name, source }: { name: string; source: string }) {
  const tag = sourceTagStyle[source] || sourceTagStyle.neither;
  return (
    <span style={{ display: "inline-flex", alignItems: "stretch", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, overflow: "hidden" }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 8px", minWidth: 18, background: tag.bg, fontSize: 11, fontWeight: 700, color: tag.color, borderRight: "1px solid #E5E7EB" }}>
        {tag.label}
      </span>
      <span style={{ padding: "4px 10px", fontSize: 12, fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>
        {name}
      </span>
    </span>
  );
}

/* "Who preferred what" — row-wise table.
   Each segment becomes a row with three columns: Segment | Crux | Winner.
   Click a row to expand inline and reveal the LOVED / DISLIKED / TOLERATED /
   MIXED / NEEDS reaction buckets. The previous grid-of-modals layout buried
   the data — the user wanted scannable rows with progressive disclosure. */

function VariantBadge({ variant }: { variant: PersonaSplitType["preferred_variant"] }) {
  if (variant === "neither") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: T.text3, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 6, padding: "4px 10px", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: 0.4 }}>
        Neither
      </span>
    );
  }
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: "#FFFFFF", background: T.ink, borderRadius: 6, padding: "4px 10px", whiteSpace: "nowrap", letterSpacing: 0.2 }}>
      Variant {variant}
    </span>
  );
}

function PersonaSplitRow({ ps, isOpen, onToggle, isLast }: {
  ps: PersonaSplitType;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const buckets = [
    { key: "loved", label: "LOVED", color: "#065F46", items: ps.reactions.loved },
    { key: "disliked", label: "DISLIKED", color: "#991B1B", items: ps.reactions.disliked },
    { key: "tolerated", label: "TOLERATED", color: "#92400E", items: ps.reactions.tolerated },
    { key: "mixed", label: "MIXED", color: "#6B7280", items: ps.reactions.mixed },
    { key: "needs", label: "NEEDS", color: "#111827", items: ps.reactions.needs },
  ].filter((b) => b.items && b.items.length > 0);

  return (
    <>
      <tr
        onClick={onToggle}
        style={{
          borderBottom: isLast && !isOpen ? "none" : "1px solid #F3F4F6",
          background: isOpen ? "#FAFAF8" : "transparent",
          transition: "background 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }}
        onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
      >
        <td style={{ padding: "16px 16px 16px 20px", verticalAlign: "top", width: 40, color: T.text4 }}>
          <span style={{ display: "inline-block", transition: "transform 0.18s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", fontSize: 12 }}>▶</span>
        </td>
        <td style={{ padding: "16px 12px", verticalAlign: "top", minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F3F4F6", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Users size={16} color="#6B7280" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.ink, fontFamily: "var(--font-plus-jakarta), sans-serif", lineHeight: 1.2 }}>
                {ps.segment}
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, marginTop: 2 }}>
                {ps.persona_count} {ps.persona_count === 1 ? "user" : "users"}
              </div>
            </div>
          </div>
        </td>
        <td style={{ padding: "16px 16px", verticalAlign: "top" }}>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: T.text2, margin: 0 }}>
            {ps.interpretation}
          </p>
        </td>
        <td style={{ padding: "16px 20px 16px 12px", verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
          <VariantBadge variant={ps.preferred_variant} />
        </td>
      </tr>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.tr
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ borderBottom: isLast ? "none" : "1px solid #F3F4F6", background: "#FAFAF8" }}
          >
            <td colSpan={4} style={{ padding: "0 20px 20px 76px" }}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                {buckets.length === 0 ? (
                  <div style={{ fontSize: 12, color: T.text3, fontStyle: "italic", padding: "8px 0" }}>
                    No reaction detail captured for this segment.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
                    {buckets.map((b) => (
                      <div key={b.key} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: b.color, letterSpacing: 0.6, textTransform: "uppercase", width: 76, flexShrink: 0, paddingTop: 6 }}>
                          {b.label}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}>
                          {b.items!.map((item) => (
                            <SourceChip key={item.name} name={item.name} source={item.source} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

function PersonaSplitTable({ data: splits }: { data: PersonaSplitType[] }) {
  // Track ONE expanded row at a time so the table doesn't grow unbounded.
  // Reset to null (collapsed) on every click of the same row.
  const [openSegment, setOpenSegment] = useState<string | null>(null);

  if (splits.length === 0) {
    return (
      <div style={{ background: "#FFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", fontSize: 13, color: T.text3 }}>
        No segment-level preferences captured.
      </div>
    );
  }

  return (
    <motion.div
      {...fadeUp}
      style={{
        background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
        <thead>
          <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
            <th style={{ padding: "12px 16px 12px 20px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left", width: 40 }} aria-label="Expand" />
            <th style={{ padding: "12px 12px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>Segment</th>
            <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>Crux</th>
            <th style={{ padding: "12px 20px 12px 12px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "right", textTransform: "uppercase", letterSpacing: 0.5 }}>Winner</th>
          </tr>
        </thead>
        <tbody>
          {splits.map((ps, i) => (
            <PersonaSplitRow
              key={ps.segment}
              ps={ps}
              isOpen={openSegment === ps.segment}
              onToggle={() => setOpenSegment(openSegment === ps.segment ? null : ps.segment)}
              isLast={i === splits.length - 1}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/* Collapsible monologue tile — face shows persona + segment + the inflection
   crux; expanded body shows VARIANT A vs VARIANT B side-by-side. Capped to
   3 instances at the section call-site. */
function MonologueTile({ m, index }: { m: AbReport["monologue_diff"][number]; index: number }) {
  const [open, setOpen] = useState(false);

  const decisionTone = (decision: AbReport["monologue_diff"][number]["decision_a"]) =>
    decision === "convert" ? { bg: "#F0FDF4", color: "#15803D", label: "CONVERT" }
    : decision === "abandon" ? { bg: "#FEF2F2", color: "#B91C1C", label: "ABANDON" }
    : { bg: "#FFFBEB", color: "#A16207", label: "HESITATE" };
  const aTone = decisionTone(m.decision_a);
  const bTone = decisionTone(m.decision_b);

  return (
    <motion.div
      {...stagger(index)}
      style={{
        ...cardStyle,
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%", textAlign: "left", border: "none", background: open ? "#FAFAF8" : "#FFFFFF",
          padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center",
          gap: 16, transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "#FAFAF8"; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF"; }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <UserCircle2 size={20} color="#6B7280" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: T.ink, fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              {m.persona_name}
            </span>
            <PersonaChip variant="segment" label={m.segment} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: T.text4, letterSpacing: 0.5, textTransform: "uppercase" }}>
              <span style={{ background: aTone.bg, color: aTone.color, padding: "2px 7px", borderRadius: 4 }}>A · {aTone.label}</span>
              <span style={{ color: T.text4 }}>→</span>
              <span style={{ background: bTone.bg, color: bTone.color, padding: "2px 7px", borderRadius: 4 }}>B · {bTone.label}</span>
            </span>
          </div>
          <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.accent, letterSpacing: 0.6, textTransform: "uppercase", marginRight: 8 }}>
              WHAT FLIPPED
            </span>
            {m.inflection}
          </div>
        </div>
        <span aria-hidden style={{ flexShrink: 0, color: T.text3, fontSize: 13, transition: "transform 0.18s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden", borderTop: `1px solid ${T.border}` }}
          >
            <div style={{ padding: "20px 24px 24px", background: "#FAFAF8" }}>
              <div className="monologue-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>
                    VARIANT A
                  </div>
                  <QuoteLine text={m.variant_a_monologue} decision={m.decision_a} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>
                    VARIANT B
                  </div>
                  <QuoteLine text={m.variant_b_monologue} decision={m.decision_b} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MonologueTileList({ items }: { items: AbReport["monologue_diff"] }) {
  if (items.length === 0) {
    return (
      <div style={{ background: "#FFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", fontSize: 13, color: T.text3 }}>
        No mind-flipping narratives captured for this comparison.
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((m, i) => (
        <MonologueTile key={m.persona_id} m={m} index={i} />
      ))}
    </div>
  );
}

interface AbReportViewProps {
  data: AbReport;
  /** Lever-driven design combiner output. Arrives after the comparator via the
   * design_combiner_ready / _skipped / _failed events. Null until the first
   * terminal event lands; the WinningDesignCard shows a "Synthesising" state
   * until then and a terminal state (ready / failed / skipped) after. */
  designCombiner?: DesignCombinerReadyData | null;
  /** True when the combiner hasn't reported a terminal state within the
   * client-side budget — flips the WinningDesignCard out of its loading spinner
   * into a neutral "timed out" state so it can't hang forever. */
  combinerStalled?: boolean;
  /** Read-only public view (e.g. the /r/[shareId] shared link). Omits the
   * owner-only Share button (which would 401 for a logged-out viewer and leak
   * the simulation_id) and suppresses the live "Composed Variant" combiner card
   * when no fused-design payload was persisted with the share (nothing to act
   * on / re-run on a static link). */
  readOnly?: boolean;
}

/**
 * Top-right action button on the A/B report. One click flips the report
 * public via the share API and copies the /r/{share_id} URL to clipboard.
 * No revoke flow here — the simulation list page (which is hydrated from
 * the server record) is the source of truth for toggling sharing on/off.
 */
function ShareReportButton({ simulationId }: { simulationId: string | null | undefined }) {
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errored, setErrored] = useState(false);

  const onClick = async () => {
    if (!simulationId || busy) return;
    setBusy(true);
    setErrored(false);
    try {
      const res = await toggleSimulationShare(simulationId, true);
      if (!res.public_share_id) throw new Error("no share id returned");
      const url = `${window.location.origin}/r/${res.public_share_id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setErrored(true);
      window.setTimeout(() => setErrored(false), 2200);
    } finally {
      setBusy(false);
    }
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    borderRadius: 8,
    cursor: busy || !simulationId ? "default" : "pointer",
    transition: "background 0.15s, border-color 0.15s, color 0.15s",
    background: copied ? "#111827" : "#FFFFFF",
    color: copied ? "#FFFFFF" : "#111827",
    border: `1px solid ${copied ? "#111827" : "#D1D5DB"}`,
    opacity: simulationId ? 1 : 0.5,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || !simulationId}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!copied && !busy && simulationId) {
          e.currentTarget.style.background = "#F9FAFB";
          e.currentTarget.style.borderColor = "#9CA3AF";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.background = "#FFFFFF";
          e.currentTarget.style.borderColor = "#D1D5DB";
        }
      }}
      title={simulationId ? "Create a public link and copy it" : "Run not persisted, can't share"}
    >
      {copied ? <CheckIcon size={14} /> : <Link2 size={14} />}
      {errored ? "Couldn't share" : copied ? "Link copied" : "Share report"}
    </button>
  );
}

/* The hero card for "What to ship". Reaches a terminal state (ready / failed /
   skipped / timeout) so it never spins forever: `stalled` flips a stuck loading
   card to a neutral timed-out state. State is pulled from the design combiner
   payload; the right column fills the phone-frame height. */
function WinningDesignCard({
  payload,
  stalled = false,
}: {
  payload: DesignCombinerReadyData | null;
  stalled?: boolean;
}) {
  const imageUrl = payload?.combined_variant_image_url ?? null;
  const status = payload?.result?.status;
  const summary = payload?.input_summary ?? null;
  const result = payload?.result ?? null;

  // Terminal as soon as we have an image (ready), an explicit skip, or a
  // failure. `status === "ok"` with no URL means the upload failed, so treat
  // it as failed rather than spinning. A stalled card with no terminal event
  // yet flips to "timeout" so it can never hang on the spinner forever.
  const state: "loading" | "ready" | "failed" | "skipped" | "timeout" =
    imageUrl
      ? "ready"
      : status === "skipped"
        ? "skipped"
        : status === "failed" || status === "ok"
          ? "failed"
          : stalled
            ? "timeout"
            : "loading";

  // Terminal states that show a placeholder rather than the fused screen.
  const isError = state === "failed";
  const isAlert = state === "failed" || state === "timeout";

  const totalElements =
    (summary?.winning_elements_a ?? 0) + (summary?.winning_elements_b ?? 0);
  const deviceLabel =
    summary?.device_type === "MOBILE"
      ? "Mobile"
      : summary?.device_type === "DESKTOP"
        ? "Desktop"
        : summary?.device_type === "TABLET"
          ? "Tablet"
          : "Adaptive";
  const renderSecs = result?.elapsed_seconds ?? 0;
  const renderLabel =
    renderSecs > 90
      ? `${Math.floor(renderSecs / 60)}m ${Math.round(renderSecs % 60)}s`
      : `${Math.round(renderSecs)}s`;

  /* ---- Status badge in the top-right of the right column. No em dashes. ---- */
  const badge =
    state === "ready"
      ? { label: "Ready to ship", dot: "#10B981", text: "#065F46", bg: "#ECFDF5", ring: "#A7F3D0" }
      : state === "failed"
        ? { label: "Generation failed", dot: "#EF4444", text: "#991B1B", bg: "#FEF2F2", ring: "#FECACA" }
        : state === "skipped"
          ? { label: "No clear winner", dot: "#9CA3AF", text: "#374151", bg: "#F3F4F6", ring: "#E5E7EB" }
          : state === "timeout"
            ? { label: "Timed out", dot: "#F59E0B", text: "#92400E", bg: "#FFFBEB", ring: "#FDE68A" }
            : { label: "Synthesising", dot: T.accent, text: T.accent, bg: "#FCE9E2", ring: "#F5C9BD" };

  /* ---- Headline + body, swapped per state. No em dashes. ---- */
  const heroTitle =
    state === "ready"
      ? "Your shipping candidate."
      : state === "failed"
        ? "We couldn't compose this one."
        : state === "skipped"
          ? "No single screen to compose."
          : state === "timeout"
            ? "Composition is taking longer than expected."
            : "Stitching the winners into one screen.";

  const heroBody =
    state === "ready"
      ? "We composed the highest-converting copy, layout, and CTAs from each variant into a single screen you can hand to your engineering team."
      : state === "failed"
        ? "The design generator hit a snag. The keep list below still ships standalone, and you can re-run the comparator to retry the composition."
        : state === "skipped"
          ? "The variants didn't differ enough for a confident fused design. The keep list below still tells you what to ship."
          : state === "timeout"
            ? "The composed screen didn't finish in time. The keep list below still ships, and you can re-run the comparator to retry."
            : "We're composing the highest-converting copy, layout, and CTAs from each variant into a single screen. This usually takes a couple of minutes.";

  return (
    <motion.div
      {...fadeUp}
      style={{
        background: T.card,
        border: `1px solid ${T.borderWarm}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "minmax(260px, 320px) 1fr",
        marginBottom: 24,
        boxShadow: "0 1px 2px rgba(17,24,39,0.04), 0 12px 36px -12px rgba(17,24,39,0.10)",
      }}
    >
      {/* ── Left: device frame ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #F4F1EC 0%, #EFEBE4 100%)",
          borderRight: `1px solid ${T.borderWarm}`,
          padding: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 460,
        }}
      >
        {state === "ready" && imageUrl ? (
          <div
            style={{
              width: 220,
              background: "#0B0B0B",
              borderRadius: 26,
              overflow: "hidden",
              boxShadow: "0 24px 48px -16px rgba(17,24,39,0.32), 0 4px 12px rgba(17,24,39,0.08)",
              padding: 6,
            }}
          >
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#FFFFFF" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Winning design"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 220,
              aspectRatio: "375 / 812",
              borderRadius: 26,
              background: "#FAF8F4",
              border: `1px solid ${T.borderWarm}`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 2px rgba(17,24,39,0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {state === "loading" && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0.18 }}
                animate={{ opacity: [0.18, 0.42, 0.18] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 38%, rgba(232,88,58,0.18) 0%, rgba(232,88,58,0) 60%)",
                  pointerEvents: "none",
                }}
              />
            )}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: isError ? "#FEF2F2" : "#FFFFFF",
                border: `1px solid ${isError ? "#FECACA" : T.borderWarm}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 2px rgba(17,24,39,0.04)",
                zIndex: 1,
              }}
            >
              {isAlert ? (
                <AlertTriangle size={18} style={{ color: isError ? "#B91C1C" : "#B45309" }} />
              ) : (
                <Sparkles size={18} style={{ color: T.accent }} />
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-flow-display), 'Playfair Display', Georgia, serif",
                fontSize: 16,
                fontWeight: 500,
                color: T.ink,
                textAlign: "center",
                letterSpacing: "-0.01em",
                zIndex: 1,
              }}
            >
              {state === "failed"
                ? "Composition unavailable"
                : state === "skipped"
                  ? "Nothing to compose"
                  : state === "timeout"
                    ? "Still composing"
                    : "Composing preview"}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: T.text3,
                textAlign: "center",
                lineHeight: 1.5,
                maxWidth: 168,
                zIndex: 1,
              }}
            >
              {state === "failed"
                ? "The fused screen will appear here on your next run."
                : state === "skipped"
                  ? "The variants were too close to fuse into one screen."
                  : state === "timeout"
                    ? "Re-run the comparator to retry the composition."
                    : "The fused screen renders here when ready."}
            </div>
          </div>
        )}
      </div>

      {/* ── Right: editorial copy + status timeline + metadata ── */}
      <div
        style={{
          padding: "28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* eyebrow + status badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: T.text3,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Composed Variant
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 999,
              background: badge.bg,
              border: `1px solid ${badge.ring}`,
              fontSize: 11.5,
              fontWeight: 600,
              color: badge.text,
              letterSpacing: "0.01em",
            }}
          >
            {state === "loading" ? (
              <motion.span
                aria-hidden
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 6, height: 6, borderRadius: 999, background: badge.dot, display: "inline-block" }}
              />
            ) : (
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: badge.dot, display: "inline-block" }} />
            )}
            {badge.label}
          </span>
        </div>

        {/* Editorial headline + body */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-flow-display), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 2.2vw, 28px)",
              fontWeight: 600,
              color: T.ink,
              margin: 0,
              lineHeight: 1.18,
              letterSpacing: "-0.018em",
            }}
          >
            {heroTitle}
          </h3>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: T.text2,
              margin: "10px 0 0",
              maxWidth: 540,
            }}
          >
            {heroBody}
          </p>
        </div>

        {/* Body content swaps per state: timeline (loading) vs summary (ready)
            vs a keep-list hint (failed / skipped / timeout). */}
        <div
          style={{
            background: "#FAFAF7",
            border: `1px solid ${T.borderWarm}`,
            borderRadius: 12,
            padding: "16px 18px",
          }}
        >
          {state === "loading" && (
            <CompositionTimeline
              steps={[
                { label: "Identifying winning levers", state: "done" },
                { label: "Composing layout from variants A and B", state: "active" },
                { label: "Rendering preview", state: "pending" },
              ]}
            />
          )}
          {state === "ready" && summary && (
            <CompositionSummary
              fromA={summary.winning_elements_a}
              fromB={summary.winning_elements_b}
              total={totalElements}
            />
          )}
          {state === "ready" && !summary && (
            <div style={{ fontSize: 13, color: T.text3, lineHeight: 1.55 }}>
              Composition complete. Open the design to inspect each fused element.
            </div>
          )}
          {(state === "failed" || state === "skipped" || state === "timeout") && (
            <div style={{ fontSize: 13, color: T.text3, lineHeight: 1.6 }}>
              Inspect the keep list below. Each row is independently shippable, even without the composed screen.
            </div>
          )}
        </div>

        {/* Footer metadata: real numbers when we have them, otherwise a single hint */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {state === "ready" && summary && (
            <>
              <MetaPill label="Device" value={deviceLabel} />
              <MetaPill label="Render" value={renderLabel} />
              {result?.backend && <MetaPill label="Backend" value={result.backend === "claude" ? "Claude" : "Stitch"} />}
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: T.ink,
                    color: "#FFFFFF",
                    borderRadius: 999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                  }}
                >
                  Open full size
                  <ArrowUpRight size={13} />
                </a>
              )}
            </>
          )}
          {state === "loading" && summary && totalElements > 0 && (
            <>
              <MetaPill label="Elements" value={`${totalElements} keep`} />
              <MetaPill label="Device" value={deviceLabel} />
            </>
          )}
          {state === "loading" && (!summary || totalElements === 0) && (
            <span style={{ fontSize: 12, color: T.text4, fontStyle: "italic" }}>
              Composition runs after the comparator finishes.
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* Inline progress timeline used while the design combiner is composing. */
function CompositionTimeline({
  steps,
}: {
  steps: { label: string; state: "done" | "active" | "pending" }[];
}) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      {steps.map((s, i) => {
        const isDone = s.state === "done";
        const isActive = s.state === "active";
        const dotInner = isDone ? (
          <CheckIcon size={10} strokeWidth={3} style={{ color: "#FFFFFF" }} />
        ) : isActive ? (
          <motion.span
            aria-hidden
            animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 6, height: 6, borderRadius: 999, background: "#FFFFFF", display: "inline-block" }}
          />
        ) : null;
        return (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: isDone ? "#10B981" : isActive ? T.accent : "#FFFFFF",
                border: `1px solid ${isDone ? "#10B981" : isActive ? T.accent : T.hairline}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {dotInner}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? T.ink : isDone ? T.text2 : T.text4,
                lineHeight: 1.4,
              }}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* Stat block for the loaded state: how many elements came from each side. */
function CompositionSummary({ fromA, fromB, total }: { fromA: number; fromB: number; total: number }) {
  const cell = (label: string, value: number, accent: boolean) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: T.text3,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-flow-display), 'Playfair Display', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: accent ? T.accent : T.ink,
          lineHeight: 1,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </span>
    </div>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {cell("From Variant A", fromA, false)}
      {cell("From Variant B", fromB, false)}
      {cell("Total composed", total, true)}
    </div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 6,
        padding: "5px 11px",
        background: "#FFFFFF",
        border: `1px solid ${T.borderWarm}`,
        borderRadius: 999,
        fontSize: 11.5,
        color: T.text2,
      }}
    >
      <span style={{ color: T.text4, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
        {label}
      </span>
      <span style={{ color: T.ink, fontWeight: 500 }}>{value}</span>
    </span>
  );
}

/* Legend for the annotated screenshots — maps the marker colors to
   lift / drag / tradeoff so a PM can read the overlays at a glance. */
function VerdictLegend() {
  const items = [
    { c: "#10B981", label: "Lift" },
    { c: "#EF4444", label: "Drag" },
    { c: "#F59E0B", label: "Tradeoff" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginBottom: 28 }}>
      {items.map((i) => (
        <span key={i.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600, color: T.text2 }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, background: i.c, boxShadow: "0 0 0 2px #FFF, 0 0 4px rgba(0,0,0,0.12)" }} />
          {i.label}
        </span>
      ))}
      <span style={{ fontSize: 12, color: T.text4, fontStyle: "italic" }}>Click any marker for the persona evidence behind it.</span>
    </div>
  );
}

/* "Test next" — the revisit-action items the high-confidence ship table
   filters out. A veteran wants these (the follow-up experiments), so surface
   them as a lighter group instead of dropping them on the floor. */
function TestNextGroup({ items }: { items: AbReport["ship_list"] }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.text3, letterSpacing: "0.12em", textTransform: "uppercase" }}>Test next</span>
        <span style={{ fontSize: 12, color: T.text4 }}>Lower-confidence calls worth a follow-up experiment.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFF", border: `0.5px solid ${T.hairline}`, borderRadius: 10, padding: "12px 16px" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#F59E0B", flexShrink: 0, marginTop: 5 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.ink, margin: 0, lineHeight: 1.4 }}>{noDash(item.feature)}</p>
              <p style={{ fontSize: 12.5, color: T.text3, margin: "2px 0 0", lineHeight: 1.45 }}>{noDash(item.rationale)}</p>
            </div>
            <span style={{ flexShrink: 0 }}><Pill intent="warning">Revisit</Pill></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreensTestedBlock({ pair, totalScreens }: { pair: AnnotatedScreenPair; totalScreens: number }) {
  const showLabel = totalScreens > 1;
  const elsA = pair.variant_a.elements ?? [];
  const elsB = pair.variant_b.elements ?? [];
  // Annotate whenever the report carries element overlays (lever-derived or
  // vision-estimated). The pins + leader lines pin the empirical signal to the
  // actual screen — the single most scannable, most differentiated view.
  const hasAnnotations = elsA.length > 0 || elsB.length > 0;

  const phoneStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 320,
    aspectRatio: "375 / 812",
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${T.border}`,
    background: "#FFFFFF",
    boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    color: T.text3,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 12,
  };
  return (
    <motion.div {...fadeUp} style={{ marginBottom: totalScreens > 1 ? 40 : 0 }}>
      {showLabel && (
        <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 16, letterSpacing: -0.01 }}>
          <span style={{ display: "inline-block", padding: "2px 8px", background: T.ink, color: "#FFFFFF", borderRadius: 4, marginRight: 10, fontSize: 11, fontWeight: 700 }}>
            {pair.index + 1}
          </span>
          {pair.screen_label}
        </div>
      )}
      {hasAnnotations ? (
        <>
          <VerdictLegend />
          <div className="annotated-phones-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, justifyItems: "center", alignItems: "start" }}>
            <AnnotatedPhone imagePath={pair.variant_a.image_path} elements={elsA} variantLabel="Variant A" calloutSide="left" />
            <AnnotatedPhone imagePath={pair.variant_b.image_path} elements={elsB} variantLabel="Variant B" calloutSide="right" />
          </div>
        </>
      ) : (
        <div className="annotated-phones-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, justifyItems: "center" }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ ...labelStyle, alignSelf: "flex-start", marginLeft: "auto", marginRight: "auto", textAlign: "center", width: "100%" }}>Variant A</div>
            <div style={phoneStyle}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pair.variant_a.image_path} alt="Variant A" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ ...labelStyle, textAlign: "center", width: "100%" }}>Variant B</div>
            <div style={phoneStyle}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pair.variant_b.image_path} alt="Variant B" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function AbReportView({ data, designCombiner, combinerStalled, readOnly }: AbReportViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const screens = data.annotated_screens.screens ?? [];

  // Show the Lever Analysis tab when the report carries any lever data —
  // either an inventory on at least one screen, or attribution combinations.
  // Hidden silently for legacy reports so the tab bar doesn't grow a
  // dead surface.
  const hasLeverData =
    screens.some((s) => (s.levers?.length ?? 0) > 0) ||
    (data.lever_attribution?.top_combinations?.length ?? 0) > 0;

  const tabs = [
    { id: "overview", label: "Overview", icon: <Activity size={16} /> },
    { id: "deepdive", label: "Deep Dive", icon: <Layers size={16} /> },
    ...(hasLeverData
      ? [{ id: "levers", label: "Lever Analysis", icon: <Sliders size={16} /> }]
      : []),
  ];

  return (
    <div
      className={`${reportDisplayFont.variable} ${reportBodyFont.variable}`}
      style={{
        background: T.pageBg,
        minHeight: "100vh",
        fontFamily: "var(--font-flow-body), 'DM Sans', system-ui, sans-serif",
      }}
    >
      <TopBar
        title="A/B Comparison Report"
        breadcrumb={`${data.meta.client} · ${data.meta.screen_label}`}
        actions={readOnly ? null : <ShareReportButton simulationId={data.meta.simulation_id} />}
      />
      <TabBar
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ background: T.flowBg }}>
        {activeTab === "overview" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
            {/* SECTION 1: VERDICT — winner + why only. Run metadata + screen
                filename + confidence used to live as pills here; the user
                explicitly asked for them removed (visual noise; not what the
                verdict is for). The numbers/screen breadcrumb still appear in
                the TopBar above and in the per-section evidence below. */}
            <motion.div {...fadeUp}>
              <div style={{ background: T.heroBg, borderRadius: 20, padding: "40px 44px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(232,88,58,0.18)", filter: "blur(90px)", pointerEvents: "none" }} />
                <div style={{ position: "relative", display: "flex", gap: 36, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between" }}>
                  {/* Left: winner badge + the WHY prose + epistemic framing */}
                  <div style={{ flex: "1 1 460px", minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <span>THE VERDICT</span>
                      {(() => {
                        // Canonical winner — the lever-derived ship direction the
                        // design combiner also builds on. Shown as the headline
                        // badge so the winner is unambiguous and machine-derived,
                        // not parsed out of the prose.
                        const w = data.verdict.winner;
                        if (w !== "A" && w !== "B" && w !== "neither") return null;
                        const label = w === "neither" ? "NO CLEAR WINNER" : `SHIP VARIANT ${w}`;
                        return (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#FFFFFF", background: w === "neither" ? "rgba(255,255,255,0.18)" : "rgba(232,88,58,0.85)", borderRadius: 999, padding: "3px 12px", letterSpacing: "0.08em" }}>
                            {label}
                          </span>
                        );
                      })()}
                    </div>
                    <p style={{ fontFamily: "var(--font-flow-display), serif", fontSize: 24, fontWeight: 500, color: "#FFFFFF", lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: 640, margin: 0 }}>
                      {noDash(data.verdict.sentence)}
                    </p>
                    {/* Epistemic framing — converts a veteran's reflexive
                        skepticism ("is this just N LLM personas?") into trust by
                        stating the basis up front + the confidence we computed. */}
                    <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      {data.verdict.persona_n != null && (
                        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
                          Predicted from {data.verdict.persona_n} simulated personas
                        </span>
                      )}
                      <ConfidenceBadge level={data.verdict.confidence} />
                      {data.verdict.winner_basis === "net_lever_ownership" && (
                        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>
                          · winner decided by net lever ownership
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Right: the headline number */}
                  <HeroCompletion verdict={data.verdict} />
                </div>
                {/* Reconcile note — only when raw completion and the
                    lever-derived winner point opposite ways. Keeps the number
                    honest without letting it contradict the badge. */}
                {(() => {
                  const w = data.verdict.winner;
                  const lift = data.verdict.lift_pp;
                  if (lift == null || (w !== "A" && w !== "B")) return null;
                  const compLeader = lift > 0 ? "B" : lift < 0 ? "A" : "neither";
                  if (compLeader === "neither" || compLeader === w) return null;
                  return (
                    <div style={{ position: "relative", marginTop: 24, padding: "12px 16px", background: "rgba(232,88,58,0.12)", border: "1px solid rgba(232,88,58,0.3)", borderRadius: 10, fontSize: 12.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <AlertTriangle size={15} style={{ color: T.accent, flexShrink: 0, marginTop: 1 }} />
                      <span>
                        Raw predicted completion leans Variant {compLeader} by {Math.abs(Math.round(lift))}pp, but the design levers decisively favour Variant {w}. Completion is the symptom, the levers are the cause, see Lever Analysis.
                      </span>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
            {data.lever_attribution?.notes && <CaveatsStrip notes={data.lever_attribution.notes} />}

            <SectionDivider />

            {/* SECTION 2: SHIP LIST */}
            {(() => {
              const filtered = data.ship_list.filter((s) => s.confidence === "high" && s.action !== "revisit");
              // "revisit" items used to be silently dropped; surface them as
              // "Test next" so the follow-up experiments aren't lost.
              const revisit = data.ship_list.filter((s) => s.action === "revisit");
              const copyAll = () =>
                filtered.map((s) => noDash(s.markdown) || `- [ ] ${s.action} ${noDash(s.feature)}`).join("\n");
              return (
                <>
                  <SectionHeader
                    eyebrow="01"
                    title="What to ship"
                    subtitle="Specific elements to keep or kill, copy directly into your tracker."
                    rightSlot={filtered.length > 0 ? <CopyButton getText={copyAll} labeled="Copy to tracker" /> : undefined}
                  />
                  {/* On a read-only shared view with no persisted fused-design
                      payload, skip the card entirely — its "timed out / re-run
                      the comparator" state reads as actionable but isn't. */}
                  {(designCombiner || (!readOnly && data.lever_attribution)) && (
                    <WinningDesignCard
                      payload={designCombiner ?? null}
                      stalled={combinerStalled ?? false}
                    />
                  )}
                  {filtered.length === 0 ? (
                    <div style={{ background: "#FFF", border: "1px solid #E5E7EB", borderRadius: 12, padding: "20px 24px", fontSize: 13, color: T.text3 }}>
                      No high-confidence ship recommendations for this comparison{revisit.length ? ", see the items to test next below." : "."}
                    </div>
                  ) : (
                  <motion.div {...fadeUp} style={{ background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "visible", boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                      <colgroup>
                        <col style={{ width: 52 }} />
                        <col />
                        <col style={{ width: 100 }} />
                        <col style={{ width: 90 }} />
                      </colgroup>
                      <thead>
                        <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                          <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center", borderRadius: "12px 0 0 0" }}>#</th>
                          <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left" }}>Feature</th>
                          <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left" }}>Source</th>
                          <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center", borderRadius: "0 12px 0 0" }}>Verdict</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((item, ri) => {
                          const isLast = ri === filtered.length - 1;
                          const isKill = item.action === "kill";
                          return (
                            <tr
                              key={item.id}
                              style={{ borderBottom: isLast ? "none" : "1px solid #F3F4F6", transition: "background 0.15s" }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                            >
                              <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 800, color: T.ink, textAlign: "center", verticalAlign: "top", ...(isLast ? { borderRadius: "0 0 0 12px" } : {}) }}>
                                {ri + 1}
                              </td>
                              <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                                <p style={{ fontSize: 13, fontWeight: 500, color: isKill ? T.text3 : T.ink, margin: 0, lineHeight: 1.4, textDecoration: isKill ? "line-through" : "none" }}>{noDash(item.feature)}</p>
                                <p style={{ fontSize: 13, fontWeight: 400, color: T.text3, margin: "2px 0 0", lineHeight: 1.4 }}>{noDash(item.rationale)}</p>
                              </td>
                              <td style={{ padding: "14px 16px", fontSize: 12, color: T.text3, textAlign: "left", verticalAlign: "top" }}>
                                Variant {item.source_variant}
                              </td>
                              <td style={{ padding: "14px 16px", textAlign: "center", verticalAlign: "top", ...(isLast ? { borderRadius: "0 0 12px 0" } : {}) }}>
                                {isKill ? (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: "uppercase", background: "transparent", border: "1px solid #D1D5DB", color: "#6B7280" }}>
                                    <XIcon size={12} /> Kill
                                  </span>
                                ) : (
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: "uppercase", background: "#1A1A1A", color: "#FFFFFF" }}>
                                    <CheckIcon size={12} /> Keep
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                  )}
                  {revisit.length > 0 && <TestNextGroup items={revisit} />}
                </>
              );
            })()}

            <SectionDivider />

            {/* SECTION 02: SCREENS TESTED — annotated side-by-side variants. */}
            <SectionHeader
              eyebrow="02"
              title="Screens Tested"
              subtitle="Colored markers flag the elements that lifted or dragged conversion. Click any marker for the persona evidence."
            />
            {screens.map((pair) => (
              <ScreensTestedBlock key={pair.id} pair={pair} totalScreens={screens.length} />
            ))}

            <SectionDivider />

            {/* SECTION 3: WHO PREFERRED WHAT */}
            <SectionHeader
              eyebrow="03"
              title="Who preferred what"
              subtitle="Segment-level preferences. Click any row for the detailed reactions."
            />
            <PersonaSplitTable data={data.persona_split} />

            <SectionDivider />

            {/* SECTION 4: FRICTION PROVENANCE
                Surfaces only the top 2 friction items per variant by severity, then persona_count.
                JSON may contain more, they are intentionally hidden.  Backend should still emit
                all friction items so the cap can be adjusted without re-running the analysis. */}
            <SectionHeader
              eyebrow="04"
              title="Where users dropped"
              subtitle="Top friction surfaced across both variants."
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="friction-grid">
              {(["variant_a", "variant_b"] as const).map((vk) => {
                const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
                const top2 = [...data.friction_provenance[vk]]
                  .sort((a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9) || b.persona_count - a.persona_count)
                  .slice(0, 2);
                const label = vk === "variant_a" ? "VARIANT A" : "VARIANT B";
                return (
                  <div key={vk}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>
                      {label}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="friction-inner-grid">
                      {top2.map((f, i) => (
                        <motion.div key={f.type} {...stagger(i)} className="friction-card" style={{ ...cardStyle, padding: "18px 20px", position: "relative" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.35, fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{f.type}</div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#FFFFFF", background: T.ink, borderRadius: 6, padding: "3px 10px", whiteSpace: "nowrap", flexShrink: 0 }}>{f.severity.toUpperCase()}</span>
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 500, color: T.text3, marginTop: 6 }}>
                            {f.persona_count} {f.persona_count === 1 ? "user" : "users"} affected
                          </div>
                          <p style={{ fontSize: 13, lineHeight: 1.5, color: "#4B5563", margin: "12px 0 0" }}>{f.note}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <SectionDivider />

            {/* SECTION 5: MONOLOGUE DIFF — three collapsed tiles, click to expand.
                The crux (`inflection`) lives on the tile face so the section is
                scannable; the long Variant A vs Variant B monologues only
                materialise when the reader actively asks for them. The user
                explicitly capped this at 3 — even if backend returns more,
                we only surface the top 3 by signal magnitude (already sorted
                by ab_report_synthesis.py). */}
            <SectionHeader
              eyebrow="05"
              title="What changed their mind"
              subtitle="The three users whose minds the variants flipped most. Click any tile to see their side-by-side narration."
            />
            <MonologueTileList items={data.monologue_diff.slice(0, 3)} />
          </div>
        )}
        {activeTab === "deepdive" && data.deep_dive && (
          <AbReportDeepDive personas={data.deep_dive.personas} />
        )}
        {activeTab === "levers" && hasLeverData && (
          <LeverAnalysisView data={data} />
        )}
      </div>
      <style jsx global>{`
        @media (max-width: 1024px) {
          .annotated-phones-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .friction-grid,
          .monologue-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .phone-desktop {
            display: none !important;
          }
          .mobile-callouts {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
