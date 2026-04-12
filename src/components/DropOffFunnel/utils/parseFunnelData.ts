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

  // 2. Try usability_findings — match by screen field
  const stepNum = extractStepNumber(screenId);
  if (data.usability_findings) {
    for (const f of data.usability_findings) {
      if (f.screen === screenId) return f.screen;
      const stepMatch = f.screen?.match(/Step\s+(\d+)/i);
      if (stepNum && stepMatch && parseInt(stepMatch[1], 10) === stepNum) {
        return f.screen;
      }
    }
  }

  // 3. Try behavior_analysis — use primary_task as a descriptive name
  const ba = data.behavior_analysis;
  if (ba?.[screenId]?.primary_task) {
    return `Screen ${stepNum || screenId} — ${ba[screenId].primary_task}`;
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

  // Build ordered screen list.
  // Primary source: screen_metrics keys (these come from the flow traversal and are
  // already in the correct flow order — first screen visited first).
  // Merge in any funnel_drop_off screens that aren't in screen_metrics.
  // funnel_drop_off is NOT reliable for ordering — it's often sorted by drop count.
  const metricsKeys = Object.keys(screenMetrics);
  const funnelKeys = funnelDropOff.map((item) => item.screen_id);

  let screenIds: string[];
  if (metricsKeys.length > 0) {
    screenIds = [...metricsKeys];
    for (const sid of funnelKeys) {
      if (!screenIds.includes(sid)) screenIds.push(sid);
    }
  } else if (funnelKeys.length > 0) {
    // No screen_metrics — use funnel keys sorted by extracted number
    screenIds = [...funnelKeys].sort((a, b) => {
      const diff = extractStepNumber(a) - extractStepNumber(b);
      if (diff !== 0) return diff;
      return a.localeCompare(b);
    });
  } else {
    screenIds = [];
  }

  const screens: FunnelScreen[] = screenIds.map((sid, index) => {
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
      step_number: index + 1,
      view_name: resolveViewName(sid, data),
      users_at_screen: metrics?.sample_size ?? 0,
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

  // Calculate cumulative remaining and correct users_at_screen
  let cumulativeDropped = 0;
  for (const screen of screens) {
    const remainingCount = totalPersonas - cumulativeDropped;
    const remainingPct =
      totalPersonas > 0 ? Math.round((remainingCount / totalPersonas) * 100) : 0;
    screen.users_at_screen = remainingCount;
    screen.remaining_count = remainingCount;
    screen.remaining_pct = remainingPct;
    cumulativeDropped += screen.drop_offs;
  }

  return screens;
}
