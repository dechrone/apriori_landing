"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Check as CheckIcon, X as XIcon, ChevronDown, ChevronUp, UserCircle2, Users, Activity, Layers } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import reportJson from "../../../../public/single-screen-sample/report.json";
import type { Report } from "@/components/sample-single-screen/types";
import {
  TopBar,
  TabBar,
  SectionHeader,
  SectionDivider,
  Pill,
  PersonaChip,
  ConfidenceBadge,
  CopyButton,
  QuoteLine,
  AnnotatedPhone,
} from "@/components/sample-single-screen/primitives";

const data = reportJson as unknown as Report;

const playfair = Playfair_Display({
  variable: "--font-flow-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-flow-body",
  subsets: ["latin"],
  display: "swap",
});

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
  badBg: "#FEE2E2",
  badInk: "#991B1B",
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
  A: { bg: "#EDE9FE", color: "#5B21B6", label: "A" },
  B: { bg: "#D1FAE5", color: "#065F46", label: "B" },
  both: { bg: "#F3F4F6", color: "#374151", label: "A+B" },
  neither: { bg: "transparent", color: "#9CA3AF", label: "—" },
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

import { SingleScreenDeepDive } from "@/components/deep-dive-single-screen/SingleScreenDeepDive";
import type { PersonaSplit as PersonaSplitType } from "@/components/sample-single-screen/types";

function PersonaSplitCard({ ps, index }: { ps: PersonaSplitType; index: number }) {
  const [open, setOpen] = useState(false);

  const buckets = [
    { key: "loved", label: "LOVED", color: "#065F46", items: ps.reactions.loved },
    { key: "disliked", label: "DISLIKED", color: "#991B1B", items: ps.reactions.disliked },
    { key: "tolerated", label: "TOLERATED", color: "#92400E", items: ps.reactions.tolerated },
    { key: "mixed", label: "MIXED", color: "#6B7280", items: ps.reactions.mixed },
    { key: "needs", label: "NEEDS", color: "#1E40AF", items: ps.reactions.needs },
  ].filter((b) => b.items && b.items.length > 0);

  return (
    <>
      <motion.div
        {...stagger(index)}
        onClick={() => setOpen(true)}
        style={{ ...cardStyle, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", cursor: "pointer", transition: "box-shadow 0.15s" }}
        whileHover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F3F4F6", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Users size={18} color="#6B7280" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, fontFamily: "var(--font-plus-jakarta), sans-serif", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ps.segment}</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, marginTop: 2 }}>{ps.persona_count} personas</div>
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#FFFFFF", background: T.ink, borderRadius: 6, padding: "4px 10px", whiteSpace: "nowrap", flexShrink: 0, alignSelf: "center" }}>
            Variant {ps.preferred_variant}
          </span>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.5, color: T.text2, margin: "12px 0 0" }}>{ps.interpretation}</p>
        <div style={{ fontSize: 11, fontWeight: 500, color: T.text4, textAlign: "right", marginTop: 10 }}>View details →</div>
      </motion.div>

      {/* Popup overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: T.card, borderRadius: 16, padding: "32px 36px",
                maxWidth: 520, width: "90vw", maxHeight: "80vh", overflowY: "auto",
                boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: T.ink, fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{ps.segment}</span>
                <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.text3, lineHeight: 1 }}>
                  <XIcon size={18} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Pill intent="neutral">{ps.persona_count} personas</Pill>
                <span style={{ fontSize: 10, fontWeight: 500, color: T.text4, letterSpacing: 0.5, textTransform: "uppercase" }}>PREFERS</span>
                <PersonaChip variant={ps.preferred_variant} label={`Variant ${ps.preferred_variant}`} />
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: T.text2, margin: "0 0 20px" }}>{ps.interpretation}</p>

              {/* Reaction buckets */}
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                {buckets.map((b) => (
                  <div key={b.key}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: b.color, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                      {b.label}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {b.items!.map((item) => (
                        <SourceChip key={item.name} name={item.name} source={item.source} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PersonaSplitGrid({ data: splits }: { data: PersonaSplitType[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      {splits.map((ps, i) => (
        <PersonaSplitCard key={ps.segment} ps={ps} index={i} />
      ))}
    </div>
  );
}

export default function SingleScreenPage() {
  const severityIntent = (s: string) => (s === "critical" || s === "high" ? "danger" : s === "medium" ? "warning" : "neutral");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ background: T.pageBg, minHeight: "100vh" }}>
      <TopBar title="A/B Comparison Report" breadcrumb={`${data.meta.client} · ${data.meta.screen_label}`} />
      <TabBar tabs={[{ id: "overview", label: "Overview", icon: <Activity size={16} /> }, { id: "deepdive", label: "Deep Dive", icon: <Layers size={16} /> }]} activeId={activeTab} onChange={setActiveTab} />

      <div style={{ background: T.flowBg }}>
        {activeTab === "overview" && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
          {/* ── SECTION 1: VERDICT ── */}
          <motion.div {...fadeUp}>
            <div
              style={{
                background: T.heroBg,
                borderRadius: 20,
                padding: "40px 44px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: "rgba(232,88,58,0.18)",
                  filter: "blur(90px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.accent,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                THE VERDICT
              </div>
              <p
                style={{
                  fontFamily: "var(--font-flow-display), serif",
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                  maxWidth: 980,
                  margin: 0,
                }}
              >
                {data.verdict.sentence}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {[
                  `${data.meta.persona_count} × ${data.meta.runs_per_persona} runs`,
                  data.meta.screen_label,
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      padding: "4px 14px",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {t}
                  </span>
                ))}
                <ConfidenceBadge level={data.verdict.confidence} />
              </div>
            </div>
          </motion.div>

          <SectionDivider />

          {/* ── SECTION 2: SHIP LIST ── */}
          {(() => {
            const filtered = data.ship_list.filter(s => s.confidence === "high" && s.action !== "revisit");
            return (
              <>
                <SectionHeader
                  eyebrow="01"
                  title="What to ship"
                  subtitle="Specific elements to keep or kill — copy directly into your tracker."
                  rightSlot={
                    <CopyButton
                      getText={() => filtered.map((s) => s.markdown).join("\n")}
                      labeled="Copy all as markdown"
                    />
                  }
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
                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                          >
                            <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 800, color: T.ink, textAlign: "center", verticalAlign: "top", ...(isLast ? { borderRadius: "0 0 0 12px" } : {}) }}>
                              {ri + 1}
                            </td>
                            <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                              <p style={{ fontSize: 13, fontWeight: 500, color: isKill ? T.text3 : T.ink, margin: 0, lineHeight: 1.4, textDecoration: isKill ? "line-through" : "none" }}>{item.feature}</p>
                              <p style={{ fontSize: 13, fontWeight: 400, color: T.text3, margin: "2px 0 0", lineHeight: 1.4 }}>{item.rationale}</p>
                            </td>
                            <td style={{ padding: "14px 16px", fontSize: 12, color: isKill ? T.text3 : T.text3, textAlign: "left", verticalAlign: "top" }}>
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

          {/* ── SECTION 3: ANNOTATED SPLIT-SCREEN ── */}
          <SectionHeader
            eyebrow="02"
            title="How each screen landed"
            subtitle="Element-level read of both variants. Click any callout to open evidence."
          />
          {/* Explainer pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            {[
              { dot: "#10B981", term: "Lift", desc: "moved personas toward conversion" },
              { dot: "#EF4444", term: "Drag", desc: "moved personas away from conversion" },
              { dot: "#F59E0B", term: "Tradeoff", desc: "lifted some segments, dragged others" },
            ].map((p) => (
              <span
                key={p.term}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 999,
                  padding: "6px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: p.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{p.term}</span>
                <span style={{ fontSize: 12, fontWeight: 400, color: T.text3 }}>— {p.desc}</span>
              </span>
            ))}
          </div>
          {/* Two-column phone layout */}
          <motion.div {...fadeUp}>
            <div className="annotated-phones-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <AnnotatedPhone
                imagePath={data.annotated_screens.variant_a.image_path}
                elements={data.annotated_screens.variant_a.elements}
                variantLabel="VARIANT A"
                calloutSide="left"
              />
              <AnnotatedPhone
                imagePath={data.annotated_screens.variant_b.image_path}
                elements={data.annotated_screens.variant_b.elements}
                variantLabel="VARIANT B"
                calloutSide="right"
              />
            </div>
          </motion.div>

          <SectionDivider />

          {/* ── SECTION 3: WHO PREFERRED WHAT ── */}
          <SectionHeader
            eyebrow="03"
            title="Who preferred what"
            subtitle="Segment-level preferences across the study."
          />
          <PersonaSplitGrid data={data.persona_split} />

          <SectionDivider />

          {/* ── SECTION 4: FRICTION PROVENANCE ── */}
          {/* FRICTION CAP — only the top 2 friction items per variant render in this section,
              regardless of how many exist in the JSON. This is a product decision, not a UI overflow safeguard.
              Do not add pagination, "show more", or scroll-to-reveal. The surface is intentionally curated.
              When productionized, the upstream pipeline should still emit all friction items so the cap can be
              adjusted or removed without re-running the analysis. */}
          <SectionHeader
            eyebrow="04"
            title="Where personas dropped"
            subtitle="Top friction surfaced across both variants."
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="friction-grid">
            {(["variant_a", "variant_b"] as const).map((vk) => {
              // Surfaces only the top 2 friction items per variant by severity, then persona_count.
              // JSON may contain more — they are intentionally hidden. See PRD §"Where personas dropped".
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
                        {/* ZONE 1 — Title + severity */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.35, fontFamily: "var(--font-plus-jakarta), sans-serif" }}>{f.type}</div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#FFFFFF", background: T.ink, borderRadius: 6, padding: "3px 10px", whiteSpace: "nowrap", flexShrink: 0 }}>{f.severity.toUpperCase()}</span>
                        </div>
                        {/* ZONE 2 — Persona count */}
                        <div style={{ fontSize: 12, fontWeight: 500, color: T.text3, marginTop: 6 }}>
                          {f.persona_count} personas affected
                        </div>
                        {/* ZONE 3 — Reason */}
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: "#4B5563", margin: "12px 0 0" }}>{f.note}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <SectionDivider />

          {/* ── SECTION 5: MONOLOGUE DIFF ── */}
          <SectionHeader
            eyebrow="05"
            title="What changed their mind"
            subtitle="Three personas, two screens, different outcomes."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {data.monologue_diff.map((m, i) => (
              <motion.div key={m.persona_id} {...stagger(i)} style={{ ...cardStyle, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F3F4F6", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <UserCircle2 size={20} color="#6B7280" />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 500, color: T.ink }}>{m.persona_name}</span>
                  </div>
                  <PersonaChip variant="segment" label={m.segment} />
                </div>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
                  className="monologue-grid"
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: T.text3,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      VARIANT A
                    </div>
                    <QuoteLine text={m.variant_a_monologue} decision={m.decision_a} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: T.text3,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        marginBottom: 10,
                      }}
                    >
                      VARIANT B
                    </div>
                    <QuoteLine text={m.variant_b_monologue} decision={m.decision_b} />
                  </div>
                </div>
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: T.accent,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    WHAT FLIPPED
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: T.ink, lineHeight: 1.5 }}>{m.inflection}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}
        {activeTab === "deepdive" && data.deep_dive && (
          <SingleScreenDeepDive personas={data.deep_dive.personas} />
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
