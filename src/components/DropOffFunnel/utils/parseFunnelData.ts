/**
 * parseFunnelData — produces FunnelScreen[] from SimulationData.
 * All data wrangling happens here, the component just renders.
 */

import type {
  SimulationData,
  PersonaDetail,
} from "@/types/simulation";

/* ── Exported types ── */

export interface FunnelScreen {
  screen_id: string;
  step_number: number;
  view_name: string;
  users_at_screen: number;
  drop_offs: number;
  drop_off_pct: number;
  is_biggest_drop: boolean;
  has_drop_offs: boolean;
  drop_reason_summary: string | null;
  remaining_count: number;
  remaining_pct: number;
  /** UUIDs of personas who dropped off at this screen */
  dropped_persona_uuids: string[];
}

/* ── Helpers ── */

/** Extract first number from screen ID: "view_1" → 1, "3_result" → 3, "1" → 1 */
function extractStepNumber(screenId: string): number {
  const m = screenId.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

/** Resolve view_name from multiple data sources */
function resolveViewName(
  screenId: string,
  data: SimulationData
): string {
  const personaDetails: PersonaDetail[] = (data.persona_details ?? []) as PersonaDetail[];

  // 1. Try persona_details screen_monologues first (most reliable)
  for (const p of personaDetails) {
    if (!p.screen_monologues) continue;
    for (const sm of p.screen_monologues) {
      if (sm.screen_id === screenId && sm.view_name) {
        return sm.view_name;
      }
    }
  }

  // 2. Try design_recommendations — match by screen_id pattern in screen field
  //    e.g. "KYC – Secure Verification (Step 1/6)" for view_1
  const stepNum = extractStepNumber(screenId);
  if (stepNum && data.design_recommendations) {
    for (const rec of data.design_recommendations) {
      if (!rec.screen) continue;
      const stepMatch = rec.screen.match(/Step\s+(\d+)/i);
      if (stepMatch && parseInt(stepMatch[1], 10) === stepNum) {
        return rec.screen;
      }
    }
  }

  // 3. Try playbook_insights — use playbook_theme as a descriptive name
  const playbook = data.playbook_insights;
  if (playbook?.[screenId]) {
    const entry = playbook[screenId];
    if (entry.playbook_theme) {
      return `Screen ${stepNum} — ${entry.playbook_theme}`;
    }
  }

  // 4. Fallback: "view_1" → "Screen 1"
  return stepNum ? `Screen ${stepNum}` : screenId.replace(/_/g, " ");
}

/** Truncate to N chars with ellipsis */
function truncate(str: string, maxLen: number): string {
  if (!str) return "";
  return str.length <= maxLen ? str : str.slice(0, maxLen).trimEnd() + "…";
}

/* ── Main parser ── */

export function parseFunnelData(data: SimulationData): FunnelScreen[] {
  const screenMetrics = data.screen_metrics ?? {};
  const funnelDropOff = data.funnel_drop_off ?? [];
  const dropAnalysis = data.drop_off_analysis?.screens ?? {};
  const personaDetails: PersonaDetail[] = (data.persona_details ?? []) as PersonaDetail[];
  const totalPersonas = data.summary?.total_personas ?? 0;

  // Build drop-off lookup: screen_id → { drop_offs, drop_off_pct }
  const dropOffMap = new Map<string, { drop_offs: number; drop_off_pct: number }>();
  for (const item of funnelDropOff) {
    dropOffMap.set(item.screen_id, {
      drop_offs: item.drop_offs,
      drop_off_pct: item.drop_off_pct,
    });
  }

  // Find the screen with the biggest drop
  let biggestDropId: string | null = null;
  let biggestDropCount = 0;
  for (const item of funnelDropOff) {
    if (item.drop_offs > biggestDropCount) {
      biggestDropCount = item.drop_offs;
      biggestDropId = item.screen_id;
    }
  }

  // Build persona drop-off map: screen_id → persona_uuids who dropped here
  const personaDropMap = new Map<string, string[]>();
  for (const p of personaDetails) {
    if (!p.screen_monologues) continue;
    for (const sm of p.screen_monologues) {
      if (sm.decision_outcome === "DROP_OFF") {
        const existing = personaDropMap.get(sm.screen_id) ?? [];
        existing.push(p.persona_uuid);
        personaDropMap.set(sm.screen_id, existing);
      }
    }
  }

  // Also handle personas where screen_monologues is empty but outcome says dropped at a view
  for (const p of personaDetails) {
    if (p.outcome && p.outcome.startsWith("dropped_off_at_")) {
      const screenId = p.outcome.replace("dropped_off_at_", "");
      const existing = personaDropMap.get(screenId) ?? [];
      if (!existing.includes(p.persona_uuid)) {
        existing.push(p.persona_uuid);
        personaDropMap.set(screenId, existing);
      }
    }
  }

  // Build ordered screen list from screen_metrics keys
  // Tiebreaker: "3" < "3_result" alphabetically, so base screens sort before result screens
  const screenIds = Object.keys(screenMetrics).sort((a, b) => {
    const diff = extractStepNumber(a) - extractStepNumber(b);
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  const screens: FunnelScreen[] = screenIds.map((sid) => {
    const metrics = screenMetrics[sid];
    const dropInfo = dropOffMap.get(sid);
    const dropOffs = dropInfo?.drop_offs ?? 0;
    const dropOffPct = dropInfo?.drop_off_pct ?? 0;
    const isBiggest = sid === biggestDropId;
    const hasDropOffs = dropOffs > 0;

    // Drop reason summary from clusters
    let dropReasonSummary: string | null = null;
    const analysisScreen = dropAnalysis[sid];
    if (analysisScreen?.clusters?.length) {
      const firstCluster = analysisScreen.clusters[0];
      if (firstCluster.label) {
        dropReasonSummary = truncate(firstCluster.label, 60);
      }
    }

    return {
      screen_id: sid,
      step_number: extractStepNumber(sid),
      view_name: resolveViewName(sid, data),
      users_at_screen: metrics.sample_size,
      drop_offs: dropOffs,
      drop_off_pct: dropOffPct,
      is_biggest_drop: isBiggest,
      has_drop_offs: hasDropOffs,
      drop_reason_summary: dropReasonSummary,
      remaining_count: 0, // filled below
      remaining_pct: 0,
      dropped_persona_uuids: personaDropMap.get(sid) ?? [],
    };
  });

  // Calculate cumulative remaining
  let cumulativeDropped = 0;
  for (const screen of screens) {
    const remainingCount = totalPersonas - cumulativeDropped;
    const remainingPct =
      totalPersonas > 0 ? Math.round((remainingCount / totalPersonas) * 100) : 0;
    screen.remaining_count = remainingCount;
    screen.remaining_pct = remainingPct;
    cumulativeDropped += screen.drop_offs;
  }

  return screens;
}
