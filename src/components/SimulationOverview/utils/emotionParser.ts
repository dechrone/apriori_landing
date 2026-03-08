/** Parse "cautious → hesitant → alarmed" into ["cautious", "hesitant", "alarmed"] */
export function parseEmotionalArc(arc: string): string[] {
  if (!arc) return [];
  return arc
    .split("→")
    .map((s) => s.trim())
    .filter(Boolean);
}
