"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, MessageSquareQuote, ArrowUp, ArrowDown, X, Info } from "lucide-react";
import type { StudyData } from "@/types/study";

/* ─── Persona Colors (expanded views only) ─── */
const PERSONA_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Pragmatist: { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
  Skeptic: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  Enthusiast: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  "Confused Novice": { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" },
};
const DEFAULT_PC = { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
function personaColor(p: string) { return PERSONA_COLORS[p] || DEFAULT_PC; }

const SEV: Record<string, string> = { critical: "#EF4444", high: "#F59E0B", moderate: "#EAB308", low: "#6B7280" };
const SENTIMENT: Record<string, string> = { positive: "#10B981", neutral: "#6B7280", negative: "#EF4444" };
function pctColor(v: number) { return v < 60 ? "#EF4444" : v < 80 ? "#F59E0B" : "#10B981"; }
const ROUTING_STYLES: Record<string, { bg: string; text: string; label: string }> = { this_sprint: { bg: "#D1FAE5", text: "#065F46", label: "This Sprint" }, next_sprint: { bg: "#DBEAFE", text: "#1E40AF", label: "Next Sprint" }, backlog: { bg: "#F3F4F6", text: "#6B7280", label: "Backlog" } };
const EFFORT_STYLES: Record<string, { bg: string; text: string; label: string }> = { quick_win: { bg: "#D1FAE5", text: "#065F46", label: "Quick Win" }, medium: { bg: "#FEF3C7", text: "#92400E", label: "Medium" }, large: { bg: "#FEE2E2", text: "#991B1B", label: "Large" } };
function susGradeColor(g: string) { return g === "A+" || g === "A" ? "#10B981" : g === "B" ? "#14B8A6" : g === "C" ? "#EAB308" : g === "D" ? "#F59E0B" : g === "F" ? "#EF4444" : "#6B7280"; }
function seqFlagStyle(f: string) { return f === "very_difficult" ? { bg: "#FEE2E2", text: "#991B1B", label: "Very Difficult" } : f === "needs_improvement" ? { bg: "#FEF3C7", text: "#92400E", label: "Needs Improvement" } : f === "acceptable" ? { bg: "#D1FAE5", text: "#065F46", label: "Acceptable" } : { bg: "#F3F4F6", text: "#6B7280", label: f.replace(/_/g, " ") }; }
function humanize(s: string) { return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }
function truncate(s: string, m: number) { return !s ? "" : s.length <= m ? s : s.slice(0, m).trimEnd() + "…"; }
function emotionTagColor(tag: string) { const t = tag.toUpperCase(); return ["CONFIDENT","DELIGHTED","SURPRISED_POSITIVE"].includes(t) ? { bg: "#D1FAE5", text: "#065F46" } : ["HESITATED"].includes(t) ? { bg: "#FEF3C7", text: "#92400E" } : { bg: "#FEE2E2", text: "#991B1B" }; }

/* ═══ PRIMITIVES ═══ */
function Pill({ bg, text, children, style }: { bg: string; text: string; children: React.ReactNode; style?: React.CSSProperties }) { return <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: bg, color: text, whiteSpace: "nowrap", ...style }}>{children}</span>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "10px 14px", border: "1px solid #E5E7EB" }}><p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginBottom: 2 }}>{label}</p><p style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A" }}>{value}</p></div>; }
function DetailRow({ label, value }: { label: string; value: string }) { return <div style={{ marginBottom: 12 }}><p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 4 }}>{label}</p><p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{value}</p></div>; }
function EmptyState({ message }: { message: string }) { return <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 24, textAlign: "center", border: "1px dashed #D1D5DB" }}><p style={{ fontSize: 14, color: "#9CA3AF" }}>{message}</p></div>; }
function SectionTitle({ children }: { children: React.ReactNode }) { return <h3 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", marginBottom: 16 }}>{children}</h3>; }
function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>{num}</p>
      <h3 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>{subtitle}</p>
    </div>
  );
}
function SectionDivider() { return <div style={{ marginTop: 36, marginBottom: 36, borderTop: "1px solid #E5E7EB" }} />; }
function ActDivider({ label }: { label: string }) { return <div style={{ margin: "48px 0 32px", display: "flex", alignItems: "center", gap: 16 }}><div style={{ height: 2, flex: 1, background: "linear-gradient(90deg, #E8583A 0%, #E5E7EB 100%)" }} /><h2 style={{ fontSize: 28, fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{label}</h2><div style={{ height: 2, flex: 1, background: "linear-gradient(90deg, #E5E7EB 0%, #E8583A 100%)" }} /></div>; }

/* ─── Info Tooltip ─── */
function InfoTooltip({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const open = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (iconRef.current) {
        const rect = iconRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setAbove(spaceBelow < 260);
      }
      setShow(true);
    }, 150);
  }, []);

  const close = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShow(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span
        ref={iconRef}
        onMouseEnter={open}
        onMouseLeave={close}
        onClick={(e) => { e.stopPropagation(); show ? close() : open(); }}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, borderRadius: "50%", border: "0.5px solid #D1D5DB", cursor: "help", flexShrink: 0, marginLeft: 4, transition: "border-color 0.15s", fontSize: 9, fontWeight: 500, color: "#6B7280", lineHeight: 1, textTransform: "none", letterSpacing: 0 }}
      >
        i
      </span>
      {show && (
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          ...(above ? { bottom: 26 } : { top: 26 }),
          width: 280,
          background: "#FFF",
          border: "0.5px solid #E5E7EB",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          zIndex: 100,
          textTransform: "none",
          letterSpacing: "normal",
        }}>
          {/* Caret */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: 8,
            height: 8,
            background: "#FFF",
            border: "0.5px solid #E5E7EB",
            ...(above
              ? { bottom: -5, borderTop: "none", borderLeft: "none" }
              : { top: -5, borderBottom: "none", borderRight: "none" }),
          }} />
          <div style={{ position: "relative" }}>{children}</div>
        </div>
      )}
    </span>
  );
}

/* ═══ MAIN ═══ */
export function StudyOverviewTab({ data }: { data: StudyData }) {
  const { scores, friction_points, themes, behavioral_patterns, emotional_fingerprint, segment_analysis, priority_table, design_recommendations, executive_summary } = data;
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 80px" }}>
      <ExecSummaryBanner exec={executive_summary} />
      <ActDivider label="What Happened" />
      <ScoreStrip scores={scores} />
      <div style={{ marginTop: 40 }}><FrictionPointGrid points={friction_points} themes={themes} /></div>
      <Act2Section themes={themes} frictionPoints={friction_points} behavioral_patterns={behavioral_patterns} emotional_fingerprint={emotional_fingerprint} segment_analysis={segment_analysis} study={data.study} />
      <ActDivider label="What To Do" />
      <div style={{ marginBottom: 40 }}><PriorityTableSection table={priority_table} recommendations={design_recommendations} /></div>
      <SectionDivider />
      <div><DesignRecGrid recommendations={design_recommendations} themes={themes} frictionPoints={friction_points} /></div>
    </div>
  );
}

/* ═══ EXEC SUMMARY ═══ */
function ExecSummaryBanner({ exec }: { exec: StudyData["executive_summary"] }) {
  /* Build narrative summary from the data */
  const verdict = `${exec.completion_rate}% completion with a SUS grade of ${exec.sus_grade} (${exec.sus_label})${exec.sus_grade === "D" || exec.sus_grade === "F" ? " — below industry average" : ""}.`;
  const critical = `${exec.critical_drop_pct}% of users dropped at ${exec.critical_drop_point}`;
  const findings = exec.top_findings.sort((a, b) => a.rank - b.rank);
  const secondFinding = findings[1]?.finding || "";
  const secondPct = secondFinding.match(/(\d+)%/)?.[1];
  const brokenLine = secondPct
    ? `Two critical friction points are driving most drop-offs: ${critical.toLowerCase()} and ${secondFinding.toLowerCase().replace(/^\d+%\s*/, `${secondPct}% `)}.`
    : `The primary friction point: ${critical.toLowerCase()}.`;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ background: "#1A1814", borderRadius: 20, padding: "36px 40px", position: "relative", overflow: "hidden", marginBottom: 16 }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,88,58,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: "#E8583A", letterSpacing: "0.12em", marginBottom: 14 }}>Executive summary</p>
        <p style={{ fontSize: 16, color: "#FFF", lineHeight: 1.65, marginBottom: 24 }}>
          {verdict} {brokenLine}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {findings.map(f => (
            <div key={f.rank} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px", flex: "1 1 260px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#E8583A", marginBottom: 4 }}>#{f.rank}</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{f.finding}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ SCORE STRIP ═══ */
function ScoreStrip({ scores }: { scores: StudyData["scores"] }) {
  const cr = scores.completion_rate, sus = scores.sus, seq = scores.seq_by_task.first_purchase;
  const sf = seqFlagStyle(seq?.flag || "");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      <ScoreCard title="Completion Rate" value={`${cr.overall}%`} subtitle={<span style={{ fontSize: 13, color: "#6B7280" }}>CI: {cr.ci_lower}% – {cr.ci_upper}%</span>} accent="#10B981" />
      <ScoreCard title="SUS Score" value={sus.mean.toFixed(1)} subtitle={<span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><Pill bg={`${susGradeColor(sus.grade)}20`} text={susGradeColor(sus.grade)}>Grade {sus.grade}</Pill><span style={{ fontSize: 13, color: "#6B7280" }}>{sus.label}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 13, color: sus.delta_from_benchmark < 0 ? "#EF4444" : "#10B981" }}>{sus.delta_from_benchmark < 0 ? <ArrowDown size={13} /> : <ArrowUp size={13} />}{Math.abs(sus.delta_from_benchmark).toFixed(1)} from benchmark</span></span>} accent={susGradeColor(sus.grade)} tooltip={<>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 8px" }}>System usability scale</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: "#6B7280", lineHeight: 1.5, margin: "0 0 8px" }}>A standardized 10-question usability score used across thousands of products. Range: 0–100. Industry average: 68.</p>
        <p style={{ fontSize: 11, fontWeight: 400, color: "#9CA3AF", margin: "0 0 8px" }}>A: 80+ · B: 68–80 · C: 68 · D: 51–68 · F: &lt;51</p>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", margin: 0 }}>This flow scored {sus.mean.toFixed(1)} (<span style={{ color: susGradeColor(sus.grade) }}>Grade {sus.grade}</span>) — {sus.delta_from_benchmark < 0 ? "just below" : "above"} the industry average.</p>
      </>} />
      <ScoreCard title="SEQ (First Purchase)" value={seq?.avg?.toFixed(1) ?? "—"} subtitle={<span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><Pill bg={sf.bg} text={sf.text}>{sf.label}</Pill><span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 13, color: (seq?.delta ?? 0) < 0 ? "#EF4444" : "#10B981" }}>{(seq?.delta ?? 0) < 0 ? <ArrowDown size={13} /> : <ArrowUp size={13} />}{Math.abs(seq?.delta ?? 0).toFixed(1)} from benchmark</span></span>} accent={(seq?.delta ?? 0) < 0 ? "#EF4444" : "#10B981"} tooltip={<>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 8px" }}>Single ease question</p>
        <p style={{ fontSize: 12, fontWeight: 400, color: "#6B7280", lineHeight: 1.5, margin: "0 0 8px" }}>Measures how easy users found a specific task on a 1–7 scale. Asked immediately after each task attempt. Benchmark: 5.5.</p>
        <p style={{ fontSize: 11, fontWeight: 400, color: "#9CA3AF", margin: "0 0 8px" }}>Very easy: 7 · Easy: 5.5+ · Difficult: &lt;5.5 · Very difficult: &lt;3.5</p>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", margin: 0 }}>This task scored {seq?.avg?.toFixed(1) ?? "—"} (<span style={{ color: sf.text }}>{sf.label}</span>) — {Math.abs(seq?.delta ?? 0).toFixed(1)} points {(seq?.delta ?? 0) < 0 ? "below" : "above"} the benchmark.</p>
      </>} />
    </div>
  );
}
function ScoreCard({ title, value, subtitle, accent, tooltip }: { title: string; value: string; subtitle: React.ReactNode; accent: string; tooltip?: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ background: "#FFF", borderRadius: 16, padding: "24px 28px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative", overflow: "visible" }}><div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "16px 0 0 16px" }} /><p style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "inline-flex", alignItems: "center" }}>{title}{tooltip && <InfoTooltip>{tooltip}</InfoTooltip>}</p><p style={{ fontSize: 36, fontWeight: 800, color: "#1A1A1A", lineHeight: 1, marginBottom: 8 }}>{value}</p><div>{subtitle}</div></motion.div>;
}

/* ═══ FRICTION POINTS — RANKED GRID + POPUP ═══ */
function fpSevStyle(sev: string): { bg: string; text: string } {
  return sev === "critical" ? { bg: "#FEE2E2", text: "#991B1B" } : { bg: "#FEF3C7", text: "#92400E" };
}
function fpDropColor(sev: string): string {
  return sev === "critical" ? "#EF4444" : "#D97706";
}
function FrictionPointGrid({ points, themes }: { points: StudyData["friction_points"]; themes: StudyData["themes"] }) {
  const [selId, setSelId] = useState<string | null>(null);
  /* When a user clicks a "Related theme" link, close this popup and open that theme's popup.
     We pass a callback to ThemesGrid via a shared state pattern, but since they're sibling components,
     we just use a custom event to signal "open theme X". For now, link text is informational. */
  const [openThemeId, setOpenThemeId] = useState<string | null>(null);
  const sorted = [...points].sort((a, b) => a.rank - b.rank);
  if (!sorted.length) return <EmptyState message="No friction points found" />;
  const sel = sorted.find(fp => fp.friction_point_id === selId) || null;
  const cols = sorted.length <= 3 ? `repeat(${sorted.length}, 1fr)` : "1fr 1fr";

  /* Build theme lookup for cross-linking */
  const themeMap = new Map(themes.map(t => [t.theme_id, t]));

  return (
    <>
      <SectionHeader num="" title="Top Friction Points" subtitle="The steps where users dropped off — ranked by severity and impact" />
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
        {sorted.map(fp => {
          const sv = fpSevStyle(fp.severity);
          return (
            <div key={fp.friction_point_id} onClick={() => setSelId(fp.friction_point_id)}
              style={{ background: "#FFF", borderRadius: 12, border: "0.5px solid #D1D5DB", padding: "20px 20px 18px", cursor: "pointer", transition: "border-color 0.15s", display: "flex", flexDirection: "column" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: "#9CA3AF" }}>#{fp.rank}</span>
                <Pill bg={sv.bg} text={sv.text}>{humanize(fp.severity)}</Pill>
              </div>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#1A1A1A", margin: "0 0 4px", lineHeight: 1.4 }}>{fp.step_name}</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 14px" }}>{humanize(fp.friction_type)}</p>
              <p style={{ fontSize: 28, fontWeight: 500, color: fpDropColor(fp.severity), lineHeight: 1, margin: "0 0 2px" }}>{fp.drop_off_pct}%</p>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: "0 0 14px" }}>dropped here</p>
              {fp.key_monologues[0] && (
                <p style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic", lineHeight: 1.5, margin: "auto 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  &ldquo;{fp.key_monologues[0].text}&rdquo;
                </p>
              )}
              <p className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", margin: fp.key_monologues[0] ? "12px 0 0" : "auto 0 0", textAlign: "right" }}>View details →</p>
            </div>
          );
        })}
      </div>

      {/* ── Friction Point Detail Popup — SHORT & TACTICAL ── */}
      <AnimatePresence>{sel && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={() => setSelId(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
              <button type="button" onClick={() => setSelId(null)} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}>
                <X size={16} style={{ color: "#9CA3AF" }} />
              </button>
            </div>

            {/* 1. Header */}
            <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 8px", lineHeight: 1.4 }}>{sel.step_name}</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              <Pill bg={fpSevStyle(sel.severity).bg} text={fpSevStyle(sel.severity).text}>{humanize(sel.severity)}</Pill>
              <span style={{ fontSize: 13, color: "#6B7280" }}>{humanize(sel.friction_type)}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: fpDropColor(sel.severity) }}>{sel.drop_off_pct}% drop-off</span>
            </div>

            {/* 2. Expected vs experienced — UNIQUE to friction points */}
            {(sel.user_expectation || sel.actual_experience) && (
              <div style={{ border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                {sel.user_expectation && (
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 4 }}>What users expected</p>
                    <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, margin: 0 }}>{sel.user_expectation}</p>
                  </div>
                )}
                {sel.user_expectation && sel.actual_experience && <div style={{ borderTop: "1px solid #E5E7EB" }} />}
                {sel.actual_experience && (
                  <div style={{ padding: "14px 16px", background: "#FEF2F2" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "#991B1B", letterSpacing: "0.5px", marginBottom: 4 }}>What actually happened</p>
                    <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, margin: 0 }}>{sel.actual_experience}</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. What users said — quotes from THIS step only */}
            {sel.key_monologues.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 10 }}>What users said</p>
                {sel.key_monologues.map((m, mi) => (
                  <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <MessageSquareQuote size={13} style={{ color: "#D1D5DB", marginTop: 3, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>&ldquo;{m.text}&rdquo;</p>
                      <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{m.persona_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Affected personas + emotional response — side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Affected personas</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {sel.affected_personas.map(p => { const c = personaColor(p); return <Pill key={p} bg={c.bg} text={c.text}>{p}</Pill>; })}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Emotional response</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {sel.top_emotional_tags.map(tag => { const c = emotionTagColor(tag); return <Pill key={tag} bg={c.bg} text={c.text}>{humanize(tag)}</Pill>; })}
                </div>
              </div>
            </div>

            {/* 5. Related themes — cross-link UP to the big picture */}
            {sel.related_theme_ids && sel.related_theme_ids.length > 0 && (() => {
              const relatedThemes = sel.related_theme_ids!.map(id => themeMap.get(id)).filter(Boolean) as StudyData["themes"];
              return relatedThemes.length > 0 ? (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Part of</p>
                  {relatedThemes.map(theme => (
                    <div key={theme.theme_id} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{theme.theme_name}</p>
                        <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{theme.frequency_pct}% of users · Rank #{theme.rank}</p>
                      </div>
                      <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              ) : null;
            })()}
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </>
  );
}

/* ═══ ACT 2 ═══ */
function Act2Section({ themes, frictionPoints, behavioral_patterns, emotional_fingerprint, segment_analysis, study }: { themes: StudyData["themes"]; frictionPoints: StudyData["friction_points"]; behavioral_patterns: StudyData["behavioral_patterns"]; emotional_fingerprint: StudyData["emotional_fingerprint"]; segment_analysis: StudyData["segment_analysis"]; study: StudyData["study"] }) {
  return (
    <div>
      <ActDivider label="Why It Happened" />

      <div style={{ paddingTop: 0 }}>
        <SectionHeader num="01" title="Themes" subtitle="The recurring problems synthetic users encountered across this flow" />
        <ThemesGrid themes={themes} frictionPoints={frictionPoints} />
      </div>

      <SectionDivider />

      <div>
        <SectionHeader num="02" title="Who Converts vs Who Drops" subtitle="The profile split between users who complete the flow and those who abandon" />
        <ComparisonTable converter={segment_analysis.converter_profile} dropper={segment_analysis.dropper_profile} />
      </div>

      <SectionDivider />

      <div>
        <SectionHeader num="03" title="Behavioral Patterns" subtitle="How different user types navigated the flow — their strategies and failure modes" />
        <BehavioralPatternsGrid patterns={behavioral_patterns} themes={themes} frictionPoints={frictionPoints} />
      </div>

      <SectionDivider />

      <div>
        <SegmentTable segments={segment_analysis.segments} study={study} frictionPoints={frictionPoints} />
      </div>
    </div>
  );
}

/* ═══ THEMES 2×2 GRID + POPUP — RICH & ANALYTICAL ═══ */
function ThemesGrid({ themes, frictionPoints }: { themes: StudyData["themes"]; frictionPoints: StudyData["friction_points"] }) {
  const [selId, setSelId] = useState<string | null>(null);
  const sorted = [...themes].sort((a, b) => a.rank - b.rank);
  if (!sorted.length) return <EmptyState message="No themes identified" />;
  const sel = sorted.find(t => t.theme_id === selId) || null;

  /* Build friction point lookup for cross-linking */
  const fpMap = new Map(frictionPoints.map(fp => [fp.friction_point_id, fp]));

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {sorted.map(t => (
          <div key={t.theme_id} onClick={() => setSelId(t.theme_id)} style={{ background: "#FFF", borderRadius: 12, border: "0.5px solid #D1D5DB", padding: "18px 20px", cursor: "pointer", transition: "border-color 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }} onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 8 }}><span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", flex: "1 1 auto", lineHeight: 1.45 }}>{t.theme_name}</span><div style={{ flexShrink: 0, textAlign: "right" }}><p style={{ fontSize: 22, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: 0 }}>{t.frequency_pct}%</p><p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>users</p></div></div>
            {t.key_monologues[0] && <p style={{ fontSize: 13, color: "#6B7280", fontStyle: "italic", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>&ldquo;{t.key_monologues[0].text}&rdquo;</p>}
            <p className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", margin: "12px 0 0", textAlign: "right" }}>View details →</p>
          </div>
        ))}
      </div>

      {/* ── Theme Detail Popup — RICH & ANALYTICAL ── */}
      <AnimatePresence>{sel && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={() => setSelId(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
          {/* Close */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}><button type="button" onClick={() => setSelId(null)} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}><X size={16} style={{ color: "#9CA3AF" }} /></button></div>

          {/* 1. Header */}
          <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1.4 }}>{sel.theme_name}</h4>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 18px" }}>{sel.frequency_pct}% of users</p>

          {/* 2. The story — analytical narrative */}
          <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "0 0 20px" }}>{sel.description}</p>

          {/* 3. What users said — flow-wide quotes */}
          {sel.key_monologues.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 10 }}>What users said</p>
              {sel.key_monologues.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <MessageSquareQuote size={13} style={{ color: "#D1D5DB", marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>&ldquo;{m.text}&rdquo;</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{m.persona_type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Root causes — UNIQUE to themes */}
          {sel.root_causes && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>Why this happens</p>
              <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.55, margin: 0 }}>{sel.root_causes}</p>
            </div>
          )}

          {/* 5. Who this didn't affect — counter evidence, UNIQUE to themes */}
          {sel.counter_evidence && (
            <div style={{ background: "#FFFBEB", borderRadius: 10, padding: "14px 16px", marginBottom: 20, border: "1px solid #FDE68A" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#92400E", letterSpacing: "0.5px", marginBottom: 4 }}>Who this didn&apos;t affect ({sel.counter_evidence.frequency_pct}%)</p>
              <p style={{ fontSize: 13, color: "#78350F", lineHeight: 1.5, margin: 0 }}>{sel.counter_evidence.summary}</p>
            </div>
          )}

          {/* 6. Connected friction points — cross-link DOWN to specific locations */}
          {sel.connected_friction_point_ids && sel.connected_friction_point_ids.length > 0 && (() => {
            const connectedFps = sel.connected_friction_point_ids!.map(id => fpMap.get(id)).filter(Boolean) as StudyData["friction_points"];
            return connectedFps.length > 0 ? (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Where this surfaces</p>
                {connectedFps.map(fp => {
                  const sv = fpSevStyle(fp.severity);
                  return (
                    <div key={fp.friction_point_id} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{fp.step_name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{fp.drop_off_pct}% drop-off</span>
                          <Pill bg={sv.bg} text={sv.text} style={{ fontSize: 10, padding: "2px 8px" }}>{humanize(fp.severity)}</Pill>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            ) : null;
          })()}

          {/* 7. Affected personas + emotional response — side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Affected personas</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {sel.affected_personas.map(p => { const c = personaColor(p); return <Pill key={p} bg={c.bg} text={c.text}>{p}</Pill>; })}
              </div>
            </div>
            {sel.not_affected_personas.length > 0 && (
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Not affected</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {sel.not_affected_personas.map(p => <Pill key={p} bg="#F3F4F6" text="#9CA3AF">{p}</Pill>)}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>}</AnimatePresence>
    </>
  );
}

/* ═══ BEHAVIORAL PATTERNS 2×2 GRID + POPUP — BEHAVIORAL NARRATIVE ═══ */
function BehavioralPatternsGrid({ patterns, themes, frictionPoints }: { patterns: StudyData["behavioral_patterns"]; themes: StudyData["themes"]; frictionPoints: StudyData["friction_points"] }) {
  const [selId, setSelId] = useState<string | null>(null);
  if (!patterns.length) return <EmptyState message="No behavioral patterns identified" />;
  const sel = patterns.find(bp => bp.pattern_id === selId) || null;

  /* Build lookups for cross-linking */
  const themeMap = new Map(themes.map(t => [t.theme_id, t]));
  const fpMap = new Map(frictionPoints.map(fp => [fp.friction_point_id, fp]));

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {patterns.map(bp => (
          <div key={bp.pattern_id} onClick={() => setSelId(bp.pattern_id)} style={{ background: "#FFF", borderRadius: 12, border: "0.5px solid #D1D5DB", padding: "18px 20px", cursor: "pointer", transition: "border-color 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }} onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 6 }}><span style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", flex: "1 1 auto", lineHeight: 1.45 }}>{bp.pattern_name}</span><div style={{ flexShrink: 0, textAlign: "right" }}><p style={{ fontSize: 22, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: 0 }}>{bp.frequency_pct}%</p><p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>users</p></div></div>
            {bp.trigger_step_name && <div style={{ marginBottom: 8 }}><span style={{ fontSize: 11, color: "#6B7280", background: "#F3F4F6", padding: "3px 10px", borderRadius: 6 }}>{bp.trigger_step_name}</span></div>}
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{bp.behavior_narrative || bp.implication}</p>
            <p className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", margin: "12px 0 0", textAlign: "right" }}>View details →</p>
          </div>
        ))}
      </div>

      {/* ── Behavioral Pattern Popup — BEHAVIORAL NARRATIVE ── */}
      <AnimatePresence>{sel && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={() => setSelId(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
          {/* Close */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}><button type="button" onClick={() => setSelId(null)} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}><X size={16} style={{ color: "#9CA3AF" }} /></button></div>

          {/* 1. Header */}
          <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 8px", lineHeight: 1.4 }}>{sel.pattern_name}</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, color: "#6B7280" }}>{sel.frequency_pct}% of users</span>
            {sel.trigger_step_name && <span style={{ fontSize: 11, color: "#6B7280", background: "#F3F4F6", padding: "3px 10px", borderRadius: 6 }}>{sel.trigger_step_name}</span>}
          </div>

          {/* 2. Persona pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
            {sel.affected_personas.map(p => { const c = personaColor(p); return <Pill key={p} bg={c.bg} text={c.text}>{p}</Pill>; })}
          </div>

          {/* 3. The behavior story — chronological journey */}
          <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "0 0 20px" }}>{sel.behavior_narrative || sel.implication}</p>

          {/* 4. What users said — monologues */}
          {sel.key_monologues && sel.key_monologues.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 10 }}>What users said</p>
              {sel.key_monologues.map((m, mi) => (
                <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <MessageSquareQuote size={13} style={{ color: "#D1D5DB", marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>&ldquo;{m.text}&rdquo;</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{m.persona_type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. What this means — actionable insight callout */}
          {sel.actionable_insight && (
            <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 14, marginBottom: 20, border: "1px solid #E5E7EB", borderLeft: "3px solid #D1D5DB" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>What this means</p>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.55, margin: 0 }}>{sel.actionable_insight}</p>
            </div>
          )}

          {/* 6. Emotional response */}
          {sel.trigger_tags.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Emotional response</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {sel.trigger_tags.map(t => { const c = emotionTagColor(t); return <Pill key={t} bg={c.bg} text={c.text}>{humanize(t)}</Pill>; })}
              </div>
            </div>
          )}

          {/* 7. Connected to — cross-links to themes and friction points */}
          {(() => {
            const relatedThemes = (sel.related_theme_ids || []).map(id => themeMap.get(id)).filter(Boolean) as StudyData["themes"];
            const relatedFps = (sel.related_friction_point_ids || []).map(id => fpMap.get(id)).filter(Boolean) as StudyData["friction_points"];
            if (!relatedThemes.length && !relatedFps.length) return null;
            return (
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Connected to</p>
                {relatedThemes.map(theme => (
                  <div key={theme.theme_id} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{theme.theme_name}</p>
                      <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{theme.frequency_pct}% of users · Theme</p>
                    </div>
                    <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                  </div>
                ))}
                {relatedFps.map(fp => {
                  const sv = fpSevStyle(fp.severity);
                  return (
                    <div key={fp.friction_point_id} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{fp.step_name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{fp.drop_off_pct}% drop-off</span>
                          <Pill bg={sv.bg} text={sv.text} style={{ fontSize: 10, padding: "2px 8px" }}>{humanize(fp.severity)}</Pill>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </motion.div>
      </motion.div>}</AnimatePresence>
    </>
  );
}

/* ═══ EMOTIONAL FINGERPRINT ═══ */
const NEG_DOTS = ["#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"];
const POS_DOTS = ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];
function EmotionalFingerprintSection({ data }: { data: StudyData["emotional_fingerprint"] }) {
  const [expanded, setExpanded] = useState(false);
  const sc = SENTIMENT[data.overall_sentiment] || SENTIMENT.neutral;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}><h3 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Emotional Fingerprint</h3><span style={{ fontSize: 14, color: "#6B7280" }}>Overall sentiment:</span><span style={{ fontSize: 14, fontWeight: 500, color: sc }}>{data.sentiment_score.toFixed(2)}</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#FEF2F2", borderRadius: 10, padding: "14px 18px" }}><p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginBottom: 4 }}>Most emotional step</p><p style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{data.most_emotional_step}</p></div>
        <div style={{ background: "#ECFDF5", borderRadius: 10, padding: "14px 18px" }}><p style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginBottom: 4 }}>Smoothest step</p><p style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{data.smoothest_step}</p></div>
      </div>
      <div onClick={() => setExpanded(!expanded)} style={{ background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", padding: "16px 20px", cursor: "pointer" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div><p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 10 }}>Top negative</p>{data.top_negative_tags.map((t, i) => <div key={t.tag} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: NEG_DOTS[i] || NEG_DOTS[4], flexShrink: 0 }} /><span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{humanize(t.tag)}</span><span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{t.frequency_pct}%</span></div>)}</div>
          <div><p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 10 }}>Top positive</p>{data.top_positive_tags.map((t, i) => <div key={t.tag} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: POS_DOTS[i] || POS_DOTS[4], flexShrink: 0 }} /><span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{humanize(t.tag)}</span><span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{t.frequency_pct}%</span></div>)}</div>
        </div>
        <AnimatePresence>{expanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}><div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #E5E7EB" }}><p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 10 }}>Per-Persona Dominant Emotion</p><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>{Object.entries(data.by_persona).map(([p, prof]) => { const pc = personaColor(p); return <div key={p} style={{ background: pc.bg, borderRadius: 8, padding: "8px 12px", border: `1px solid ${pc.border}` }}><p style={{ fontSize: 13, fontWeight: 600, color: pc.text, marginBottom: 2 }}>{p}</p><span style={{ fontSize: 12, color: "#374151" }}>{humanize(prof.dominant_tag)} · {humanize(prof.sentiment)}</span></div>; })}</div></div></motion.div>}</AnimatePresence>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}><ChevronDown size={15} style={{ color: "#9CA3AF", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} /></div>
      </div>
    </div>
  );
}

/* ═══ SEGMENT TABLE + POPUP — PERSONA STORY ═══ */
function SegmentTable({ segments, study, frictionPoints }: { segments: StudyData["segment_analysis"]["segments"]; study: StudyData["study"]; frictionPoints: StudyData["friction_points"] }) {
  const [selId, setSelId] = useState<string | null>(null);
  const sorted = [...segments].sort((a, b) => b.conversion_rate - a.conversion_rate);
  if (!sorted.length) return <EmptyState message="No segments" />;
  const sel = sorted.find(s => s.segment_id === selId) || null;
  const short = (s: string) => { const w = s.split(/\s+/); return w.length <= 10 ? s : w.slice(0, 10).join(" ") + "…"; };
  return (
    <>
      <div>
        <SectionHeader num="04" title="Segment Analysis" subtitle={`${study.total_users} synthetic users across ${sorted.length} persona types — how each segment performed`} />
        <div style={{ background: "#FFF", borderRadius: 14, border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "180px 60px 120px 70px 1fr", padding: "14px 24px", borderBottom: "1px solid #E5E7EB" }}><span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Persona</span><span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>n</span><span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Conversion</span><span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>SUS</span><span style={{ fontSize: 13, fontWeight: 500, color: "#9CA3AF" }}>Key insight</span></div>
          {sorted.map((seg, i) => <div key={seg.segment_id} onClick={() => setSelId(seg.segment_id)} style={{ display: "grid", gridTemplateColumns: "180px 60px 120px 70px 1fr", padding: "16px 24px", borderBottom: i < sorted.length - 1 ? "1px solid #F3F4F6" : "none", alignItems: "center", cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "#FAFAF8"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }} onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}><span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>{seg.label}</span><span style={{ fontSize: 14, color: "#6B7280" }}>{seg.n}</span><span style={{ fontSize: 15, fontWeight: 600, color: pctColor(seg.conversion_rate) }}>{seg.conversion_rate}%</span><span style={{ fontSize: 14, color: "#374151" }}>{seg.avg_sus}</span><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 14, color: "#4B5563" }}>{short(seg.summary)}</span><span className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, marginLeft: 12, transition: "color 0.15s" }}>View details →</span></div></div>)}
        </div>
      </div>

      {/* ── Segment Detail Popup — COMPACT PERSONA STORY ── */}
      <AnimatePresence>{sel && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setSelId(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
          {/* Close */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
            <button type="button" onClick={() => setSelId(null)} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}>
              <X size={16} style={{ color: "#9CA3AF" }} />
            </button>
          </div>

          {/* 1. Header */}
          <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px", lineHeight: 1.4 }}>{sel.label}</h4>
          <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 14px" }}>
            n={sel.n} · <span style={{ color: pctColor(sel.conversion_rate), fontWeight: 500 }}>{sel.conversion_rate}% conversion</span> · SUS {sel.avg_sus}
          </p>

          {/* 2. Persona profile — no label, flows from header */}
          {sel.persona_profile && (
            <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: "0 0 16px" }}>{sel.persona_profile}</p>
          )}

          {/* --- divider --- */}
          <div style={{ borderTop: "0.5px solid #E5E7EB", margin: "0 0 16px" }} />

          {/* 3. Their journey — merged narrative + what worked/struggled */}
          {sel.journey_narrative && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>Their journey</p>
              <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6, margin: 0 }}>{sel.journey_narrative}</p>
            </div>
          )}

          {/* 4. What they said — max 2 quotes */}
          {sel.monologues && sel.monologues.length > 0 && (
            <div style={{ marginBottom: 16, borderTop: "0.5px solid #E5E7EB", paddingTop: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>What they said</p>
              {sel.monologues.slice(0, 2).map((m, mi) => (
                <div key={mi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <MessageSquareQuote size={13} style={{ color: "#D1D5DB", marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#4B5563", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>&ldquo;{m.text}&rdquo;</p>
                </div>
              ))}
            </div>
          )}

          {/* 5. Emotional arc — deduplicated, sentence case */}
          {sel.emotional_arc && sel.emotional_arc.length > 0 && (() => {
            /* Deduplicate while preserving order */
            const unique = sel.emotional_arc!.filter((tag, i, arr) => arr.indexOf(tag) === i);
            /* Check if monotone (all same sentiment) */
            const allPositive = unique.every(t => ["CONFIDENT", "DELIGHTED", "SURPRISED_POSITIVE"].includes(t.toUpperCase()));
            const allNegative = unique.every(t => !["CONFIDENT", "DELIGHTED", "SURPRISED_POSITIVE", "HESITATED"].includes(t.toUpperCase()));
            return (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>Emotional arc</p>
                {unique.length <= 1 || allPositive ? (
                  <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>Consistently {humanize(unique[0] || "confident").toLowerCase()} throughout — no friction points triggered negative emotions.</p>
                ) : allNegative ? (
                  <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>Negative throughout — {unique.map(t => humanize(t).toLowerCase()).join(", ")} dominated the experience.</p>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                    {unique.map((tag, ti) => {
                      const c = emotionTagColor(tag);
                      return (
                        <span key={ti} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Pill bg={c.bg} text={c.text} style={{ fontSize: 11, padding: "3px 10px" }}>{humanize(tag)}</Pill>
                          {ti < unique.length - 1 && <span style={{ fontSize: 12, color: "#D1D5DB" }}>→</span>}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* 6. Recommendation callout — visually distinct */}
          {sel.segment_recommendation && (
            <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "14px 16px", border: "1px solid #E5E7EB", borderLeft: "3px solid #9CA3AF" }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>What to do for this segment</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#1A1A1A", lineHeight: 1.5, margin: 0 }}>{sel.segment_recommendation}</p>
            </div>
          )}
        </motion.div>
      </motion.div>}</AnimatePresence>
    </>
  );
}

/* ═══ DESIGN RECOMMENDATIONS — CARD GRID + POPUP ═══ */
function recEffortStyle(effort: string): { bg: string; text: string; border: string } {
  switch (effort) {
    case "quick_win": return { bg: "#D1FAE5", text: "#065F46", border: "#10B981" };
    case "medium": return { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" };
    case "large": return { bg: "#FEE2E2", text: "#991B1B", border: "#EF4444" };
    default: return { bg: "#F3F4F6", text: "#6B7280", border: "#9CA3AF" };
  }
}
function DesignRecGrid({ recommendations, themes, frictionPoints }: { recommendations: StudyData["design_recommendations"]; themes: StudyData["themes"]; frictionPoints: StudyData["friction_points"] }) {
  const [selId, setSelId] = useState<string | null>(null);
  const sorted = [...recommendations].sort((a, b) => a.rank - b.rank);
  if (!sorted.length) return <EmptyState message="No design recommendations" />;
  const sel = sorted.find(r => r.rec_id === selId) || null;
  const cols = sorted.length <= 3 ? `repeat(${sorted.length}, 1fr)` : "1fr 1fr";

  /* Lookups for cross-linking */
  const themeMap = new Map(themes.map(t => [t.theme_id, t]));
  const fpMap = new Map(frictionPoints.map(fp => [fp.friction_point_id, fp]));

  /* Extract a short drop-off number from the problem text, e.g. "83%" or "67%" */
  function extractPct(problem: string): string | null {
    const m = problem.match(/(\d+)%/);
    return m ? m[1] + "%" : null;
  }

  return (
    <>
      <SectionHeader num="" title="Design Recommendations" subtitle="Specific changes to implement based on the friction points and behavioral patterns identified above" />
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12 }}>
        {sorted.map(rec => {
          const es = recEffortStyle(rec.effort);
          const impactPct = extractPct(rec.problem);
          return (
            <div key={rec.rec_id} onClick={() => setSelId(rec.rec_id)}
              style={{ background: "#FFF", borderRadius: "0 0 12px 12px", borderTop: `3px solid ${es.border}`, border: `0.5px solid #D1D5DB`, borderTopColor: es.border, borderTopWidth: 3, borderTopStyle: "solid", padding: "20px 20px 18px", cursor: "pointer", transition: "border-color 0.15s", display: "flex", flexDirection: "column" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#9CA3AF"; (e.currentTarget as HTMLDivElement).style.borderTopColor = es.border; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#1A1A1A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB"; (e.currentTarget as HTMLDivElement).style.borderTopColor = es.border; const h = e.currentTarget.querySelector(".viewHint") as HTMLElement; if (h) h.style.color = "#9CA3AF"; }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: es.text, background: es.bg, padding: "3px 10px", borderRadius: 6 }}>{humanize(rec.effort)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 6 }}>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4, flex: "1 1 auto" }}>{rec.headline}</p>
                {impactPct && (
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    <p style={{ fontSize: 22, fontWeight: 500, color: "#1A1A1A", lineHeight: 1, margin: 0 }}>{impactPct}</p>
                    <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>affected</p>
                  </div>
                )}
              </div>
              <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: "0 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: "1 1 auto" }}>{rec.problem}</p>
              <p className="viewHint" style={{ fontSize: 11, color: "#9CA3AF", margin: "12px 0 0", textAlign: "right" }}>View details →</p>
            </div>
          );
        })}
      </div>

      {/* ── Detail Popup — ACTION CARD ── */}
      <AnimatePresence>{sel && (() => {
        const es = recEffortStyle(sel.effort);
        const linkedTheme = sel.linked_theme_id ? themeMap.get(sel.linked_theme_id) : null;
        const linkedFp = fpMap.get(sel.linked_friction_point_id);
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={() => setSelId(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }} transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()} style={{ background: "#FFF", borderRadius: 12, width: "100%", maxWidth: 680, maxHeight: "85vh", overflowY: "auto", padding: 28 }}>
              {/* Close */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                <button type="button" onClick={() => setSelId(null)} style={{ background: "none", border: "1px solid #E5E7EB", cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", lineHeight: 1 }}>
                  <X size={16} style={{ color: "#9CA3AF" }} />
                </button>
              </div>

              {/* 1. Header */}
              <h4 style={{ fontSize: 18, fontWeight: 500, color: "#1A1A1A", margin: "0 0 8px", lineHeight: 1.4 }}>{sel.headline}</h4>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: es.text, background: es.bg, padding: "3px 10px", borderRadius: 6 }}>{humanize(sel.effort)}</span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>{sel.problem}</span>
              </div>

              {/* 2. Before → After block — THE HERO */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ background: "#FEF2F2", padding: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "#991B1B", letterSpacing: "0.5px", marginBottom: 6 }}>Now</p>
                  <p style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.55, margin: 0 }}>{sel.current_experience}</p>
                </div>
                <div style={{ background: "#F0FDF4", padding: 20, borderLeft: "1px solid #E5E7EB" }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "#065F46", letterSpacing: "0.5px", marginBottom: 6 }}>After this change</p>
                  <p style={{ fontSize: 13, color: "#14532D", lineHeight: 1.55, margin: 0 }}>{sel.after_experience || sel.recommended_change}</p>
                </div>
              </div>

              {/* 3. Success metric */}
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 6 }}>Success metric</p>
                <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.55, margin: 0 }}>{sel.success_metric}</p>
              </div>

              {/* 4. Evidence trail — cross-links */}
              {(linkedTheme || linkedFp) && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", letterSpacing: "0.5px", marginBottom: 8 }}>Based on</p>
                  {linkedTheme && (
                    <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{linkedTheme.theme_name}</p>
                        <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{linkedTheme.frequency_pct}% of users · Theme</p>
                      </div>
                      <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    </div>
                  )}
                  {linkedFp && (
                    <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB", marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "default" }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: 0, lineHeight: 1.4 }}>{linkedFp.step_name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{linkedFp.drop_off_pct}% drop-off</span>
                          <Pill bg={fpSevStyle(linkedFp.severity).bg} text={fpSevStyle(linkedFp.severity).text} style={{ fontSize: 10, padding: "2px 8px" }}>{humanize(linkedFp.severity)}</Pill>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })()}</AnimatePresence>
    </>
  );
}

/* ═══ COMPARISON TABLE (Who Converts vs Who Drops) ═══ */
function ComparisonTable({ converter, dropper }: { converter: StudyData["segment_analysis"]["converter_profile"]; dropper: StudyData["segment_analysis"]["dropper_profile"] }) {
  const dims: { key: string; label: string; cv: string[]; dv: string[]; type: "persona" | "neutral" | "emotion" }[] = [
    { key: "personas", label: "Personas", cv: converter.dominant_personas, dv: dropper.dominant_personas, type: "persona" },
    { key: "channels", label: "Channels", cv: converter.dominant_channels.map(humanize), dv: dropper.dominant_channels.map(humanize), type: "neutral" },
    { key: "patterns", label: "Patterns", cv: converter.common_patterns.map(humanize), dv: dropper.common_patterns.map(humanize), type: "neutral" },
    { key: "emotions", label: "Emotional signals", cv: converter.shared_emotional_signals.map(humanize), dv: dropper.shared_emotional_signals.map(humanize), type: "emotion" },
  ];
  function cs(v: string, side: "c" | "d", type: "persona" | "neutral" | "emotion"): React.CSSProperties {
    const b: React.CSSProperties = { display: "inline-block", fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap" };
    if (type === "neutral") return { ...b, background: "#F3F4F6", color: "#374151" };
    if (type === "persona") return side === "c" ? { ...b, background: "#ECFDF5", color: "#065F46" } : { ...b, background: "#FEF2F2", color: "#991B1B" };
    const pos = ["CONFIDENT", "DELIGHTED", "SURPRISED POSITIVE"];
    return pos.some(p => v.toUpperCase().includes(p)) ? { ...b, background: "#ECFDF5", color: "#065F46" } : { ...b, background: "#FEF2F2", color: "#991B1B" };
  }
  return (
    <div style={{ background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 1fr" }}>
        <div style={{ background: "#ECFDF5", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} /><span style={{ fontSize: 15, fontWeight: 500, color: "#065F46" }}>Who converts</span></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB" }}><span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>vs</span></div>
        <div style={{ background: "#FEF2F2", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}><span style={{ fontSize: 15, fontWeight: 500, color: "#991B1B" }}>Who drops off</span><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", flexShrink: 0 }} /></div>
      </div>
      {dims.map(d => (
        <div key={d.key} style={{ display: "grid", gridTemplateColumns: "1fr 90px 1fr", borderTop: "0.5px solid #E5E7EB" }}>
          <div style={{ padding: d.key === "emotions" ? "16px 20px" : "12px 20px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>{d.cv.map(v => <span key={v} style={cs(v, "c", d.type)}>{v}</span>)}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", padding: "12px 4px" }}><span style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center", lineHeight: 1.3 }}>{d.label}</span></div>
          <div style={{ padding: d.key === "emotions" ? "16px 20px" : "12px 20px", display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end" }}>{d.dv.map(v => <span key={v} style={cs(v, "d", d.type)}>{v}</span>)}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ PRIORITY TABLE ═══ */
function PriorityTableSection({ table, recommendations }: { table: StudyData["priority_table"]; recommendations: StudyData["design_recommendations"] }) {
  if (!table.length) return <EmptyState message="No priority items" />;
  const recMap = new Map(recommendations.map(r => [r.rec_id, r]));
  return (
    <div>
      <SectionHeader num="" title="Priority Table" subtitle="Issues ranked by impact, confidence, and effort — fix these first to improve conversion" />
      <div style={{ background: "#FFF", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "visible", boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 6px rgba(0,0,0,0.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: 60 }} />
            <col />
            <col style={{ width: 120 }} />
            <col style={{ width: 70 }} />
            <col style={{ width: 90 }} />
            <col style={{ width: 70 }} />
          </colgroup>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center", borderRadius: "12px 0 0 0" }}>Rank</th>
              <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left" }}>Issue</th>
              <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "left" }}>Type</th>
              <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center" }}><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%" }}>Impact<InfoTooltip><p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px" }}>Impact</p><p style={{ fontSize: 12, fontWeight: 400, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>How many users are affected and how severely. Scale: 1 (low) – 3 (high).</p></InfoTooltip></span></th>
              <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center" }}><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%" }}>Confidence<InfoTooltip><p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px" }}>Confidence</p><p style={{ fontSize: 12, fontWeight: 400, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>How confident the analysis is in this finding based on monologue frequency. Shown as a percentage.</p></InfoTooltip></span></th>
              <th style={{ padding: "12px 16px 12px 12px", fontSize: 11, fontWeight: 500, color: "#6B7280", textAlign: "center", borderRadius: "0 12px 0 0" }}><span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%" }}>Effort<InfoTooltip><p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 6px" }}>Effort</p><p style={{ fontSize: 12, fontWeight: 400, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>Estimated implementation effort. Scale: 0.5 (quick fix) – 3 (major rebuild).</p></InfoTooltip></span></th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, ri) => {
              const rec = recMap.get(row.linked_rec_id);
              const action = rec?.recommended_change || "";
              const isLast = ri === table.length - 1;
              return (
                <tr key={row.rank} style={{ borderBottom: isLast ? "none" : "1px solid #F3F4F6", transition: "background 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAF8"; }} onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}>
                  <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 800, color: "#1A1A1A", textAlign: "center", verticalAlign: "top", ...(isLast ? { borderRadius: "0 0 0 12px" } : {}) }}>#{row.rank}</td>
                  <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px", lineHeight: 1.4 }}>{row.headline}</p>
                    {action && <p style={{ fontSize: 12, color: "#6B7280", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{action}</p>}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "#6B7280", textAlign: "left", verticalAlign: "top" }}>{row.type}</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 500, color: "#1A1A1A", textAlign: "center", verticalAlign: "top" }}>{row.impact}</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151", textAlign: "center", verticalAlign: "top" }}>{(row.confidence * 100).toFixed(0)}%</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151", textAlign: "center", verticalAlign: "top", ...(isLast ? { borderRadius: "0 0 12px 0" } : {}) }}>{row.effort}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudyOverviewTab;
