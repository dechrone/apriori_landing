/** Score → color mapping functions for the simulation overview */

const COLORS = {
  red: "#EF4444",
  amber: "#F59E0B",
  green: "#10B981",
  blue: "#3B82F6",
  textPrimary: "#1A1A1A",
  textSecondary: "#4B5563",
  textMuted: "#9CA3AF",
  bgBase: "#F2F0EC",
  bgSurface: "#FFFFFF",
  bgElevated: "#F9FAFB",
  border: "#E5E7EB",
  cardShadow: "0 1px 4px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)",
  cardShadowHover: "0 4px 20px rgba(0, 0, 0, 0.08)",
} as const;

export default COLORS;

/** Get color based on completion rate thresholds */
export function completionColor(pct: number): string {
  if (pct <= 30) return COLORS.red;
  if (pct <= 60) return COLORS.amber;
  return COLORS.green;
}

/** Get color based on a score 0–10 */
export function scoreColor(score: number): string {
  if (score < 4) return COLORS.red;
  if (score < 7) return COLORS.amber;
  return COLORS.green;
}

/** Priority badge colors */
export function priorityColor(priority: string): string {
  switch (priority) {
    case "P0":
      return COLORS.red;
    case "P1":
      return COLORS.amber;
    case "P2":
      return COLORS.blue;
    default:
      return COLORS.textMuted;
  }
}

/** Priority badge background colors (light theme — subtle tinted bg) */
export function priorityBg(priority: string): string {
  switch (priority) {
    case "P0":
      return "rgba(239, 68, 68, 0.08)";
    case "P1":
      return "rgba(245, 158, 11, 0.08)";
    case "P2":
      return "rgba(59, 130, 246, 0.08)";
    default:
      return "rgba(156, 163, 175, 0.08)";
  }
}

/** Map emotion words to a color */
export function emotionColor(emotion: string): string {
  const e = emotion.toLowerCase().trim();
  const positives = [
    "curious",
    "engaged",
    "confident",
    "excited",
    "comfortable",
    "interested",
    "optimistic",
    "satisfied",
    "relieved",
  ];
  const neutrals = [
    "cautious",
    "hesitant",
    "considering",
    "neutral",
    "dependent",
  ];
  // everything else is negative
  if (positives.includes(e)) return COLORS.green;
  if (neutrals.includes(e)) return COLORS.amber;
  return COLORS.red;
}
