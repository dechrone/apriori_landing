"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HelpCircle,
  Copy,
  Check,
  X,
  MessageSquareQuote,
  Users,
} from "lucide-react";
import type { ScreenElement } from "@/types/ab-report";

/* ═══════════════════════════════════════════
   TOKENS
   ═══════════════════════════════════════════ */
const T = {
  accent: "#E8583A",
  accentGoldDark: "#B8860B",
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
  ok: "#10B981",
  okBg: "#D1FAE5",
  okInk: "#065F46",
  warn: "#F59E0B",
  warnBg: "#FEF3C7",
  warnInk: "#92400E",
  bad: "#EF4444",
  badBg: "#FEE2E2",
  badInk: "#991B1B",
  info: "#374151",
  infoBg: "#F3F4F6",
  infoInk: "#111827",
  neutral: "#6B7280",
  neutralBg: "#F3F4F6",
  neutralInk: "#374151",
};

/* ═══════════════════════════════════════════
   1.1 TopBar
   ═══════════════════════════════════════════ */
export function TopBar({
  title,
  breadcrumb,
  actions,
}: {
  title: string;
  breadcrumb: string;
  actions?: React.ReactNode;
}) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        height: 64,
        background: T.card,
        borderBottom: `1px solid ${T.borderWarm}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T.ink, margin: 0, lineHeight: 1.2 }}>{title}</h1>
        <p style={{ fontSize: 14, fontWeight: 400, color: T.text3, margin: 0 }}>{breadcrumb}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{actions}</div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   1.2 TabBar
   ═══════════════════════════════════════════ */
export function TabBar({
  tabs,
  activeId,
  onChange,
}: {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 64,
        zIndex: 20,
        background: T.flowBg,
        borderBottom: `1px solid ${T.border}`,
        display: "flex",
        gap: 0,
      }}
    >
      {tabs.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "14px 24px",
              fontSize: 18,
              fontWeight: active ? 600 : 500,
              color: active ? T.accent : T.text3,
              background: "transparent",
              border: "none",
              borderBottom: active ? `2.5px solid ${T.accent}` : "2.5px solid transparent",
              marginBottom: -1,
              cursor: "pointer",
              transition: "color 0.15s",
            }}
          >
            {t.icon}{t.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   1.3 ReadingGuide
   ═══════════════════════════════════════════ */
const LS_KEY = "apriori.readingGuide.singleScreen.v1";

export function ReadingGuide() {
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    setDismissed(localStorage.getItem(LS_KEY) === "1");
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(LS_KEY, "1");
  };
  const restore = () => {
    setDismissed(false);
    localStorage.removeItem(LS_KEY);
  };

  if (dismissed) {
    return (
      <button
        onClick={restore}
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: T.text3,
          background: T.card,
          border: `1px solid ${T.borderWarm}`,
          borderRadius: 8,
          padding: "6px 14px",
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        <HelpCircle size={13} style={{ marginRight: 6, verticalAlign: -2, color: T.accentGoldDark }} />
        How to read this report
      </button>
    );
  }

  const cols = [
    { title: "What you\u2019re seeing", desc: "A side-by-side comparison of two screen variants, tested against 40 synthetic personas across 3 runs each." },
    { title: "How to read the split-screen", desc: "Colored outlines mark elements as lifts (green), drags (red), or tradeoffs (amber). Click any outline for evidence." },
    { title: "What to do with the ship list", desc: "Each row is a specific recommendation: keep, kill, or revisit. Copy them straight into your product tracker." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: T.card,
        border: `1px solid ${T.borderWarm}`,
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        marginBottom: 24,
        position: "relative",
      }}
    >
      <button
        onClick={dismiss}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: T.text4,
        }}
      >
        <X size={16} />
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {cols.map((c) => (
          <div key={c.title}>
            <HelpCircle size={16} style={{ color: T.accentGoldDark, marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 13, fontWeight: 400, color: T.text2, lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   1.4 SectionHeader

   Savesage-tier editorial header: numeric eyebrow rendered as a leading
   chapter mark, Playfair Display title for editorial weight, a thin
   accent rule that ties together the section. Falls back gracefully when
   the host page hasn't loaded the flow-display font variable.
   ═══════════════════════════════════════════ */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  rightSlot,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 24,
        marginBottom: 24,
        paddingBottom: 18,
        borderBottom: `1px solid ${T.borderWarm}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-flow-display), 'Playfair Display', Georgia, serif",
              fontSize: 13,
              fontWeight: 600,
              color: T.accent,
              letterSpacing: "0.04em",
              fontFeatureSettings: '"lnum" 1',
            }}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden
            style={{
              width: 28,
              height: 1,
              background: T.hairline,
              display: "inline-block",
            }}
          />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-flow-display), 'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            fontWeight: 600,
            color: T.ink,
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: T.text2,
            marginTop: 8,
            marginBottom: 0,
            lineHeight: 1.55,
            maxWidth: 720,
          }}
        >
          {subtitle}
        </p>
      </div>
      {rightSlot && <div style={{ flexShrink: 0 }}>{rightSlot}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   1.5 SectionDivider
   ═══════════════════════════════════════════ */
export function SectionDivider() {
  return <hr style={{ margin: "36px 0", border: "none", borderTop: `1px solid ${T.border}` }} />;
}

/* ═══════════════════════════════════════════
   1.6 Pill
   ═══════════════════════════════════════════ */
const intentMap: Record<string, { bg: string; color: string }> = {
  success: { bg: T.okBg, color: T.okInk },
  warning: { bg: T.warnBg, color: T.warnInk },
  danger: { bg: T.badBg, color: T.badInk },
  info: { bg: T.infoBg, color: T.infoInk },
  neutral: { bg: T.neutralBg, color: T.neutralInk },
  brand: { bg: "#FDE8E4", color: T.accent },
};

export function Pill({ intent, children }: { intent: keyof typeof intentMap; children: React.ReactNode }) {
  const s = intentMap[intent] || intentMap.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: s.bg,
        color: s.color,
      }}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1.7 PersonaChip
   ═══════════════════════════════════════════ */
const chipPalette: Record<string, { bg: string; color: string; border: string }> = {
  A: { bg: "#F3F4F6", color: "#1F2937", border: "#C4B5FD" },
  B: { bg: "#D1FAE5", color: "#065F46", border: "#6EE7B7" },
  both: { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" },
  neither: { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" },
  tie: { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" },
  segment: { bg: "#F3F4F6", color: "#111827", border: "#D1D5DB" },
  default: { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" },
};

export function PersonaChip({ variant, label }: { variant: string; label: string }) {
  const p = chipPalette[variant] || chipPalette.default;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: p.bg,
        color: p.color,
        border: `1px solid ${p.border}`,
      }}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1.8 ConfidenceBadge
   ═══════════════════════════════════════════ */
export function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high: { icon: "✓", ...intentMap.success },
    medium: { icon: "⚠", ...intentMap.warning },
    low: { icon: "✗", ...intentMap.danger },
  };
  const s = map[level];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        whiteSpace: "nowrap",
      }}
    >
      {s.icon} {level}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1.9 MagnitudeDots
   ═══════════════════════════════════════════ */
export function MagnitudeDots({ magnitude, showLabel = true }: { magnitude: "strong" | "moderate" | "slight"; showLabel?: boolean }) {
  const count = magnitude === "strong" ? 3 : magnitude === "moderate" ? 2 : 1;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: i < count ? T.ink : T.border,
          }}
        />
      ))}
      {showLabel && (
        <span style={{ fontSize: 11, fontWeight: 500, color: T.text3, marginLeft: 4, textTransform: "capitalize" }}>
          {magnitude}
        </span>
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1.10 Modal
   ═══════════════════════════════════════════ */
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.card,
              borderRadius: 12,
              maxWidth: 680,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: 28,
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                cursor: "pointer",
                padding: 4,
                color: T.text4,
                display: "flex",
              }}
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   1.11 QuoteLine
   ═══════════════════════════════════════════ */
export function QuoteLine({ text, decision }: { text: string; decision?: "convert" | "hesitate" | "abandon" }) {
  const decMap: Record<string, "success" | "warning" | "danger"> = {
    convert: "success",
    hesitate: "warning",
    abandon: "danger",
  };
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <MessageSquareQuote size={13} style={{ color: T.hairline, flexShrink: 0, marginTop: 3 }} />
      <div>
        <p style={{ fontSize: 13, fontStyle: "italic", color: T.text2, lineHeight: 1.5, margin: 0 }}>
          &ldquo;{text}&rdquo;
        </p>
        {decision && (
          <div style={{ marginTop: 6 }}>
            <Pill intent={decMap[decision]}>{decision.toUpperCase()}</Pill>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   1.12 CopyButton
   ═══════════════════════════════════════════ */
export function CopyButton({ getText, labeled }: { getText: () => string; labeled?: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getText());
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1500);
  };

  if (labeled) {
    return (
      <button
        onClick={handleCopy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: T.card,
          border: `0.5px solid ${T.hairline}`,
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13,
          fontWeight: 500,
          color: T.ink,
          cursor: "pointer",
          transition: "border-color 0.15s",
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : labeled}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: T.text4,
        flexShrink: 0,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

/* ═══════════════════════════════════════════
   Annotated Phone with Leader-Line Callouts
   ═══════════════════════════════════════════ */
const verdictColor: Record<string, string> = {
  lift: T.ok,
  drag: T.bad,
  tradeoff: T.warn,
};

/**
 * Desktop/tablet: phone with leader-line callouts.
 * calloutSide: "left" = callouts left of phone (Variant A),
 *              "right" = callouts right of phone (Variant B).
 * Dots + lines render ABOVE the image via z-index.
 * Callout endpoint is a small rounded-square badge showing persona_count.
 * Click badge → modal with full details.
 */
const PHONE_W = 280;
const PHONE_H = 580;
const LINE_GAP = 40; // horizontal gap between phone edge and badge

export function AnnotatedPhone({
  imagePath,
  elements,
  variantLabel,
  calloutSide,
}: {
  imagePath: string;
  elements: ScreenElement[];
  variantLabel: string;
  calloutSide: "left" | "right";
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedEl, setSelectedEl] = useState<ScreenElement | null>(null);

  const verdictIntent = (v: string) =>
    v === "lift" ? "success" : v === "drag" ? "danger" : "warning";

  const interact = (id: string) => ({
    onMouseEnter: () => setHoveredId(id),
    onMouseLeave: () => setHoveredId(null),
  });

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: T.text3, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>
        {variantLabel}
      </div>

      {/* Desktop layout */}
      <div
        className="phone-desktop"
        style={{
          position: "relative",
          width: PHONE_W + LINE_GAP + 36, // phone + line + badge
          ...(calloutSide === "left" ? { marginLeft: LINE_GAP + 36, marginRight: "auto" } : { marginRight: LINE_GAP + 36, marginLeft: "auto" }),
          height: PHONE_H,
        }}
      >
        {/* Phone image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            ...(calloutSide === "left" ? { right: 0 } : { left: 0 }),
            width: PHONE_W,
            height: PHONE_H,
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${T.border}`,
          }}
        >
          <Image
            src={imagePath}
            alt={variantLabel}
            width={PHONE_W}
            height={PHONE_H}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Dots, lines, badges — all above the phone */}
        {elements.map((el) => {
          const hovered = hoveredId === el.id;
          const dotY = el.anchor.y * PHONE_H;
          const dotX = calloutSide === "left"
            ? (1 - el.anchor.x) * PHONE_W // distance from right edge of phone area (phone is right-aligned)
            : el.anchor.x * PHONE_W;      // distance from left edge

          // Dot position (on the phone)
          const dotStyle: React.CSSProperties = {
            position: "absolute",
            top: dotY,
            ...(calloutSide === "left"
              ? { right: dotX }
              : { left: dotX }),
            transform: "translate(50%, -50%)",
            ...(calloutSide === "right" ? { transform: "translate(-50%, -50%)" } : {}),
            width: 10,
            height: 10,
            borderRadius: 999,
            background: verdictColor[el.verdict],
            boxShadow: `0 0 0 2px #FFFFFF, 0 0 6px rgba(0,0,0,0.15)`,
            cursor: "pointer",
            transition: "transform 0.15s",
            zIndex: 4,
          };

          // Line from dot edge to badge
          const lineStyle: React.CSSProperties = {
            position: "absolute",
            top: dotY,
            height: 1.5,
            transform: "translateY(-50%)",
            background: verdictColor[el.verdict],
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.15s",
            cursor: "pointer",
            zIndex: 3,
          };

          if (calloutSide === "left") {
            const lineWidth = (PHONE_W - dotX) + LINE_GAP + 5;
            Object.assign(lineStyle, { right: dotX + 5, width: lineWidth, left: undefined });
          } else {
            const lineWidth = (PHONE_W - dotX) + LINE_GAP + 5;
            Object.assign(lineStyle, { left: dotX + 5, width: lineWidth, right: undefined });
          }

          // Badge (rounded square) at end of line
          const badgeStyle: React.CSSProperties = {
            position: "absolute",
            top: dotY,
            transform: "translateY(-50%)",
            ...(calloutSide === "left"
              ? { right: PHONE_W + LINE_GAP + 4 }
              : { left: PHONE_W + LINE_GAP + 4 }),
            minWidth: 32,
            height: 28,
            borderRadius: 6,
            background: hovered ? verdictColor[el.verdict] : T.card,
            border: `1.5px solid ${verdictColor[el.verdict]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "0 8px",
            fontSize: 12,
            fontWeight: 700,
            color: hovered ? "#FFFFFF" : verdictColor[el.verdict],
            cursor: "pointer",
            transition: "all 0.15s",
            zIndex: 4,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            whiteSpace: "nowrap",
          };

          return (
            <React.Fragment key={el.id}>
              {/* Dot */}
              <div style={dotStyle} {...interact(el.id)} onClick={() => setSelectedEl(el)} />
              {/* Line */}
              <div style={lineStyle} {...interact(el.id)} onClick={() => setSelectedEl(el)} />
              {/* Badge */}
              <div style={badgeStyle} {...interact(el.id)} onClick={() => setSelectedEl(el)}>
                <Users size={12} />
                {el.persona_count}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile fallback */}
      <div className="mobile-callouts" style={{ display: "none", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => setSelectedEl(el)}
            style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: verdictColor[el.verdict], flexShrink: 0, marginTop: 4 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, lineHeight: 1.3 }}>{el.persona_count} personas</div>
              <div style={{ fontSize: 11, fontWeight: 400, color: T.text4, marginTop: 1 }}>{el.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selectedEl} onClose={() => setSelectedEl(null)}>
        {selectedEl && (
          <>
            <h4 style={{ fontSize: 18, fontWeight: 500, color: T.ink, margin: "0 0 12px" }}>{selectedEl.label}</h4>
            <div style={{ marginBottom: 8 }}>
              <Pill intent={verdictIntent(selectedEl.verdict)}>
                {selectedEl.verdict.toUpperCase()}
              </Pill>
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.text4, marginBottom: 4 }}>
              {selectedEl.persona_count} personas whose decision hinged on this
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: T.ink, margin: "8px 0 8px", lineHeight: 1.4 }}>{selectedEl.callout}</p>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: T.text2, margin: 0 }}>{selectedEl.summary}</p>
          </>
        )}
      </Modal>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Tradeoff Split Bar
   ═══════════════════════════════════════════ */
export function TradeoffBar({ segments }: { segments: { segment: string; effect: string; direction: "positive" | "negative" }[] }) {
  const neg = segments.filter((s) => s.direction === "negative");
  const pos = segments.filter((s) => s.direction === "positive");

  return (
    <div style={{ display: "flex", height: 40, borderRadius: 6, overflow: "hidden", marginTop: 12, marginBottom: 12 }}>
      <div style={{ flex: neg.length || 0.5, background: T.badBg, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 8px" }}>
        {neg.map((s) => (
          <span key={s.segment} style={{ fontSize: 12, fontWeight: 500, color: T.badInk, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {s.segment} · {s.effect}
          </span>
        ))}
      </div>
      <div style={{ flex: pos.length || 0.5, background: T.okBg, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 8px" }}>
        {pos.map((s) => (
          <span key={s.segment} style={{ fontSize: 12, fontWeight: 500, color: T.okInk, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {s.segment} · {s.effect}
          </span>
        ))}
      </div>
    </div>
  );
}
