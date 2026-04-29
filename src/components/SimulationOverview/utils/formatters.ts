/** Formatting utilities for the simulation overview */

/** Convert seconds to "Xm Ys" format */
export function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "-";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

/** Format percentage with optional decimal */
export function formatPct(pct: number): string {
  if (Number.isInteger(pct)) return `${pct}%`;
  return `${pct.toFixed(1)}%`;
}

/** Map view_1 → "Screen 1", view_2 → "Screen 2", etc. */
export function formatScreenId(id: string): string {
  const match = id.match(/view_(\d+)/i);
  if (match) return `Screen ${match[1]}`;
  // fallback: capitalize the id
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Clamp a string to maxLen characters, adding "…" if truncated */
export function truncate(str: string, maxLen: number): string {
  if (!str) return "";
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "…";
}
