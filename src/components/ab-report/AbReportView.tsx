"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import type {
  AbReport,
  AnnotatedScreenPair,
  PersonaSplit as PersonaSplitType,
  SynthesisReadyData,
} from "@/types/ab-report";
import {
  TopBar,
  TabBar,
  SectionHeader,
  SectionDivider,
  Pill,
  PersonaChip,
  QuoteLine,
  AnnotatedPhone,
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
  hairline: "#D1D5DB",
};

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

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

function ScreenPairBlock({ pair, totalScreens }: { pair: AnnotatedScreenPair; totalScreens: number }) {
  const showLabel = totalScreens > 1;
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
      <div className="annotated-phones-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <AnnotatedPhone
          imagePath={pair.variant_a.image_path}
          elements={pair.variant_a.elements}
          variantLabel="VARIANT A"
          calloutSide="left"
        />
        <AnnotatedPhone
          imagePath={pair.variant_b.image_path}
          elements={pair.variant_b.elements}
          variantLabel="VARIANT B"
          calloutSide="right"
        />
      </div>
    </motion.div>
  );
}

interface AbReportViewProps {
  data: AbReport;
  /** simul2design Multiverse Synthesis Engine output. Arrives ~5min after the
   * comparator finishes, surfaced via supabase realtime. Null until then; the
   * recommended-variant section is hidden in that case. */
  synthesis?: SynthesisReadyData | null;
}

/** Pull the first paragraph (up to 480 chars) out of a markdown blob. The
 * upstream spec_markdown leads with §0 Executive summary so this is the right
 * teaser to surface. Returns null if the markdown is empty. */
function specBrief(md: string | null | undefined): string | null {
  if (!md) return null;
  const stripped = md.replace(/^<!--[\s\S]*?-->\s*/m, "").trim();
  // First non-heading paragraph
  const para = stripped
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#"));
  if (!para) return null;
  if (para.length <= 480) return para;
  return para.slice(0, 477).trimEnd() + "…";
}

function RecommendedVariantSection({ synthesis }: { synthesis: SynthesisReadyData }) {
  const result = synthesis.result;
  const imageUrl = synthesis.variant_image_url ?? result?.variant_image_url ?? null;
  const brief = specBrief(result?.spec_markdown);
  const adversaryObjections: Array<{ title: string; severity?: string; note?: string }> = (() => {
    const ar = result?.adversary_review;
    if (!ar || typeof ar !== "object") return [];
    const list = (ar as Record<string, unknown>).objections;
    if (!Array.isArray(list)) return [];
    return list.slice(0, 3).map((o) => {
      if (typeof o === "string") return { title: o };
      if (o && typeof o === "object") {
        const r = o as Record<string, unknown>;
        return {
          title: String(r.title ?? r.objection ?? r.summary ?? r.name ?? "Objection"),
          severity: typeof r.severity === "string" ? r.severity : undefined,
          note: typeof r.note === "string" ? r.note : (typeof r.detail === "string" ? r.detail : undefined),
        };
      }
      return { title: "Objection" };
    });
  })();
  const reviewCount = result?.cells_needing_review?.length ?? 0;

  return (
    <motion.div {...fadeUp}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Sparkles size={16} style={{ color: T.accent }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: T.accent, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Recommended next variant
        </span>
        <span style={{ fontSize: 11, color: T.text3 }}>
          · simul2design synthesis · {result?.pipeline_version ?? "v0.2"}
        </span>
      </div>
      <div
        style={{
          ...cardStyle,
          padding: 0,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "minmax(320px, 420px) 1fr",
          gap: 0,
        }}
      >
        {/* Left: phone-frame mockup */}
        <div
          style={{
            background: "#F9FAFB",
            borderRight: `0.5px solid ${T.hairline}`,
            padding: 24,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {imageUrl ? (
            <div
              style={{
                width: 320,
                background: "#000",
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
              }}
            >
              <img
                src={imageUrl}
                alt="V(N+1) recommended variant"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 320,
                aspectRatio: "375 / 812",
                borderRadius: 28,
                background: "#EEEEEC",
                border: `1px dashed ${T.hairline}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                color: T.text3,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Image generation unavailable —
              <br />
              spec available below
            </div>
          )}
        </div>

        {/* Right: spec summary */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
          {brief && (
            <p style={{ fontSize: 14, lineHeight: 1.55, color: T.ink, margin: 0 }}>
              {brief}
            </p>
          )}
          {!brief && (
            <p style={{ fontSize: 13, lineHeight: 1.55, color: T.text3, margin: 0, fontStyle: "italic" }}>
              The cascade did not return a written brief. The image alone reflects the recommendation.
            </p>
          )}

          {adversaryObjections.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.text3, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                Adversary objections
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {adversaryObjections.map((o, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "10px 12px",
                      background: "#FEF7F4",
                      border: `1px solid ${T.hairline}`,
                      borderRadius: 8,
                    }}
                  >
                    <AlertTriangle size={14} style={{ color: T.accent, flexShrink: 0, marginTop: 2 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, lineHeight: 1.35 }}>
                        {o.title}
                        {o.severity && (
                          <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 600, color: T.text3, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            {o.severity}
                          </span>
                        )}
                      </div>
                      {o.note && (
                        <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.4, marginTop: 2 }}>
                          {o.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Pill intent="neutral">{result?.client_slug ?? "synthesis"}</Pill>
            {typeof result?.estimated_cost_usd === "number" && (
              <Pill intent="neutral">${result.estimated_cost_usd.toFixed(2)} cascade cost</Pill>
            )}
            {reviewCount > 0 && (
              <Pill intent="warning">{reviewCount} cell{reviewCount === 1 ? "" : "s"} need review</Pill>
            )}
            {!result?.ready_for_synthesis && reviewCount === 0 && (
              <Pill intent="neutral">Awaiting human review</Pill>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
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

export function AbReportView({ data, synthesis }: AbReportViewProps) {
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
    <div style={{ background: T.pageBg, minHeight: "100vh" }}>
      <TopBar
        title="A/B Comparison Report"
        breadcrumb={`${data.meta.client} · ${data.meta.screen_label}`}
        actions={<ShareReportButton simulationId={data.meta.simulation_id} />}
      />
      <TabBar
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ background: T.flowBg }}>
        {activeTab === "overview" && (
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
            {/* SECTION 0: RECOMMENDED V(N+1) — only when simul2design synthesis arrives */}
            <AnimatePresence initial={false}>
              {synthesis && (
                <motion.div
                  key="synthesis-section"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{ marginBottom: 32 }}
                >
                  <RecommendedVariantSection synthesis={synthesis} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTION 1: VERDICT — winner + why only. Run metadata + screen
                filename + confidence used to live as pills here; the user
                explicitly asked for them removed (visual noise; not what the
                verdict is for). The numbers/screen breadcrumb still appear in
                the TopBar above and in the per-section evidence below. */}
            <motion.div {...fadeUp}>
              <div style={{ background: T.heroBg, borderRadius: 20, padding: "40px 44px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(232,88,58,0.18)", filter: "blur(90px)", pointerEvents: "none" }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: T.accent, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16 }}>
                  THE VERDICT
                </div>
                <p style={{ fontFamily: "var(--font-flow-display), serif", fontSize: 24, fontWeight: 500, color: "#FFFFFF", lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: 980, margin: 0 }}>
                  {data.verdict.sentence}
                </p>
              </div>
            </motion.div>

            <SectionDivider />

            {/* SECTION 2: SHIP LIST */}
            {(() => {
              const filtered = data.ship_list.filter((s) => s.confidence === "high" && s.action !== "revisit");
              return (
                <>
                  <SectionHeader
                    eyebrow="01"
                    title="What to ship"
                    subtitle="Specific elements to keep or kill, copy directly into your tracker."
                  />
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
                                <p style={{ fontSize: 13, fontWeight: 500, color: isKill ? T.text3 : T.ink, margin: 0, lineHeight: 1.4, textDecoration: isKill ? "line-through" : "none" }}>{item.feature}</p>
                                <p style={{ fontSize: 13, fontWeight: 400, color: T.text3, margin: "2px 0 0", lineHeight: 1.4 }}>{item.rationale}</p>
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
                </>
              );
            })()}

            <SectionDivider />

            {/* SECTION 3: ANNOTATED SCREENS — iterate one block per screen pair */}
            <SectionHeader
              eyebrow="02"
              title={screens.length > 1 ? "How each screen landed" : "How the screen landed"}
              subtitle="Element-level read of both variants. Click any callout to open evidence."
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
              {[
                { dot: "#10B981", term: "Lift", desc: "moved users toward conversion" },
                { dot: "#EF4444", term: "Drag", desc: "moved users away from conversion" },
                { dot: "#F59E0B", term: "Tradeoff", desc: "lifted some segments, dragged others" },
              ].map((p) => (
                <span key={p.term} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 999, padding: "6px 12px", whiteSpace: "nowrap" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: p.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{p.term}</span>
                  <span style={{ fontSize: 12, fontWeight: 400, color: T.text3 }}>{p.desc}</span>
                </span>
              ))}
            </div>
            {screens.map((pair) => (
              <ScreenPairBlock key={pair.id} pair={pair} totalScreens={screens.length} />
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
