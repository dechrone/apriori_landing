/**
 * Dealshare — shared constants + formatting helpers.
 *
 * Pure data, no React / no Supabase imports, so both the data layer and the
 * UI can pull from one source of truth. The pipeline stage order here is the
 * canonical one used for the timeline dots, the stat buckets, and progress %.
 */

export type DealStage =
  | "submitted"
  | "intro_sent"
  | "meeting"
  | "negotiation"
  | "won"
  | "lost";

export interface StageMeta {
  key: DealStage;
  label: string;
  /** Short label for the compact timeline dots. */
  short: string;
  /** Whether the stage sits on the linear "happy path" timeline. */
  onTrack: boolean;
}

/** The ordered happy path. `lost` is terminal and lives off the track. */
export const PIPELINE: StageMeta[] = [
  { key: "submitted", label: "Submitted", short: "Submitted", onTrack: true },
  { key: "intro_sent", label: "Intro sent", short: "Intro", onTrack: true },
  { key: "meeting", label: "Meeting", short: "Meeting", onTrack: true },
  { key: "negotiation", label: "Negotiation", short: "Negotiation", onTrack: true },
  { key: "won", label: "Won", short: "Won", onTrack: true },
];

export const LOST_STAGE: StageMeta = {
  key: "lost",
  label: "Lost",
  short: "Lost",
  onTrack: false,
};

export const ALL_STAGES: StageMeta[] = [...PIPELINE, LOST_STAGE];

export function stageMeta(stage: DealStage): StageMeta {
  return ALL_STAGES.find((s) => s.key === stage) ?? PIPELINE[0];
}

/** Index of the stage on the happy path (lost → last on-track index reached). */
export function stageIndex(stage: DealStage): number {
  if (stage === "lost") return -1;
  return PIPELINE.findIndex((s) => s.key === stage);
}

/** 0..1 progress along the pipeline. `won` = 1, `lost` = 0. */
export function stageProgress(stage: DealStage): number {
  if (stage === "won") return 1;
  if (stage === "lost") return 0;
  const i = stageIndex(stage);
  return i <= 0 ? 0.04 : i / (PIPELINE.length - 1);
}

export const STAGE_TONE: Record<DealStage, { bg: string; text: string; dot: string }> = {
  submitted: { bg: "#F3F4F6", text: "#4B5563", dot: "#9CA3AF" },
  intro_sent: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  meeting: { bg: "#FEF9C3", text: "#854D0E", dot: "#CA8A04" },
  negotiation: { bg: "#FFF7ED", text: "#9A3412", dot: "#EA580C" },
  won: { bg: "#DCFCE7", text: "#15803D", dot: "#16A34A" },
  lost: { bg: "#FEE2E2", text: "#B91C1C", dot: "#DC2626" },
};

// ─── Formatting ─────────────────────────────────────────────────────────────

const CURRENCY_SYMBOL: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };

export function currencySymbol(code: string): string {
  return CURRENCY_SYMBOL[code] ?? `${code} `;
}

/** Compact money, e.g. ₹4.5L / ₹1.2Cr / $12K. Indian grouping for INR. */
export function formatMoney(value: number | null | undefined, currency = "INR"): string {
  if (value == null || Number.isNaN(value)) return "—";
  const sym = currencySymbol(currency);
  if (currency === "INR") {
    if (value >= 1e7) return `${sym}${(value / 1e7).toFixed(value % 1e7 === 0 ? 0 : 1)}Cr`;
    if (value >= 1e5) return `${sym}${(value / 1e5).toFixed(value % 1e5 === 0 ? 0 : 1)}L`;
    if (value >= 1e3) return `${sym}${(value / 1e3).toFixed(0)}K`;
    return `${sym}${value.toFixed(0)}`;
  }
  if (value >= 1e6) return `${sym}${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${sym}${(value / 1e3).toFixed(0)}K`;
  return `${sym}${value.toFixed(0)}`;
}

/**
 * Stable date formatter — pass an explicit ISO string. Avoids module-level
 * `new Date()` (which caused hydration mismatches elsewhere in this app).
 */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** "5mo ago" / "3d ago" relative label given a reference `now` (passed in). */
export function relativeFrom(iso: string | null | undefined, nowMs: number): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const diff = Math.max(0, nowMs - t);
  const day = 86_400_000;
  if (diff < day) return "today";
  const days = Math.floor(diff / day);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export const TNC_VERSION = "2026-06-19";

export const TNC_TEXT = `Apriori Dealshare — Scout Terms (v${TNC_VERSION})

1. Attribution. A deal is credited to you when you are the first scout to introduce a qualified prospect and that introduction is recorded here with the prospect's correct registered email, CC'd (not BCC'd) to the Apriori team. Duplicate or pre-existing prospects are not attributable.

2. Commission. You earn the agreed commission rate on the net contract value of any deal that reaches the "Won" stage and is collected by Apriori. Rates are set per-scout and shown on your account.

3. Payout. Commissions are reconciled monthly and paid within 30 days of Apriori receiving payment from the customer.

4. Conduct. You will represent Apriori honestly, make no pricing or product commitments on Apriori's behalf, and respect prospect confidentiality.

5. Term. Either party may end this arrangement at any time; deals already "Won" before termination remain payable.

By accepting, you agree to these terms and to having your referred deals, meetings, and stage history recorded on this platform.`;
