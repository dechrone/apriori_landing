/**
 * NDJSON streaming utility for simulation API responses.
 * The backend streams newline-delimited JSON events over a single HTTP response.
 */

import type { SimulationData } from "@/types/simulation";
import type {
  AbReport,
  DesignCombinerReadyData,
  RevalidationReadyData,
} from "@/types/ab-report";

/** A single tile in the 9-segment picker. The full GeneratedSegment also
 * carries an `embedding: number[1536]` server-side; the wizard never
 * receives or sends it (the backend keeps it in the pending-simulation cache
 * during phase 1 and looks it up by id at phase 2). */
export type GeneratedSegmentSummary = {
  id: string;
  name: string;
  description: string;
  pool_id: string;
  pool_name: string;
  /**
   * Pre-screen mindset / "why this cohort arrived" — generated in phase 1.
   * The picker shows it and lets the user edit it for selected tiles; edits go
   * back at phase 2 as `segment_intent_overrides` (keyed by segment id). It is
   * the persona's entry mindset, NOT the conversion objective. Null/absent when
   * the backend prompt hasn't been re-published yet (older cached payloads).
   */
  entry_intent?: string | null;
  /** Demographic predicate the backend hard-filters retrieval on (read-only,
   *  shown for transparency on who the cohort targets). All optional. */
  income_tiers?: string[];
  occupation_categories?: string[];
  derived_urbanicities?: string[];
  derived_regions?: string[];
  derived_generations?: string[];
  derived_tiers?: string[];
  age_min?: number | null;
  age_max?: number | null;
};

/** Flatten a segment's demographic predicate into a compact, human-readable
 *  summary (e.g. "upper middle · tech engineering · tier-1 · age 25–40"), or ""
 *  when the segment carries no predicate. Read-only display only. */
export function segmentPredicateSummary(seg: GeneratedSegmentSummary): string {
  const tokens: string[] = [];
  for (const arr of [
    seg.income_tiers,
    seg.occupation_categories,
    seg.derived_tiers,
    seg.derived_urbanicities,
    seg.derived_regions,
    seg.derived_generations,
  ]) {
    if (arr) for (const v of arr) tokens.push(v.replace(/_/g, " "));
  }
  if (seg.age_min != null && seg.age_max != null) tokens.push(`age ${seg.age_min}–${seg.age_max}`);
  else if (seg.age_min != null) tokens.push(`age ${seg.age_min}+`);
  else if (seg.age_max != null) tokens.push(`age ≤${seg.age_max}`);
  return tokens.join(" · ");
}

/** Build the phase-2 `segment_intent_overrides` map: only the selected segments
 *  whose entry-intent the user actually edited (non-empty AND different from the
 *  generated value). Returns undefined when there are no real edits, so the
 *  backend falls back to the generated segment intent. */
export function buildSegmentIntentOverrides(
  selectedSegmentIds: string[],
  edits: Record<string, string>,
  segments?: GeneratedSegmentSummary[],
): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  for (const id of selectedSegmentIds) {
    const edited = edits[id];
    if (edited == null) continue;
    const trimmed = edited.trim();
    if (!trimmed) continue;
    const original = (segments?.find((s) => s.id === id)?.entry_intent ?? "").trim();
    if (trimmed !== original) out[id] = trimmed;
  }
  return Object.keys(out).length ? out : undefined;
}

export type SimulationEvent =
  | {
      type: "started";
      data: {
        simulation_id: string;
        flow_id?: string;
        flow_name?: string;
        target_group?: string;
        num_personas?: number;
        country?: "IN" | "US";
      };
    }
  | {
      type: "pool_routed";
      data: { pool_id: string; pool_name: string };
    }
  | {
      type: "segments_ready";
      data: {
        pool_id: string;
        pool_name: string;
        segments: GeneratedSegmentSummary[];
        used_fallback: boolean;
        fallback_reason: string | null;
      };
    }
  | {
      type: "product_intelligence_ready";
      data: { product_category: string };
    }
  | {
      type: "product_intelligence_failed";
      data: { message: string };
    }
  | {
      type: "awaiting_segment_selection";
      data: { simulation_id: string; expires_in_seconds: number };
    }
  | {
      type: "resumed";
      data: { simulation_id: string };
    }
  | {
      type: "personas_loaded";
      data: {
        count: number;
        /**
         * "segments" — cosine search across the user's 5 picked cohorts (happy path).
         * "cached" — re-used a saved audience's persona uuids.
         * Older modes (router/fallback/strict/relaxed) remain in the type for
         * back-compat with reports persisted before 2026-05-09.
         */
        retrieval_mode?:
          | "segments"
          | "cached"
          | "router"
          | "fallback"
          | "strict"
          | "relaxed"
          | "random_fallback"
          | "cache_hit"
          | "template";
        matched_count?: number;
        persona_uuids?: string[];
        selected_segments_summary?: { id: string; name: string; pool_id: string; pool_name: string }[];
        pool_id?: string;
      };
    }
  | {
      type: "persona_complete";
      data: {
        persona_uuid: string;
        persona_name: string;
        completed: boolean;
        dropped_off_at: string | null;
        total_time_seconds: number;
        plan_selected: string;
        overall_monologue: string;
        flow_id?: string;
      };
    }
  | { type: "insights_ready"; data: SimulationData }
  | {
      type: "multiflow_started";
      data: { comparison_id: string; flow_count: number; flow_ids: string[] };
    }
  | {
      type: "flow_started";
      data: { flow_index: number; flow_id: string; flow_name: string };
    }
  | {
      type: "flow_insights_ready";
      data: { flow_id: string; flow_name: string; insights: SimulationData };
    }
  | { type: "comparison_ready"; data: AbReport }
  /**
   * Lever-driven design combiner follow-on. Runs after comparison_ready on
   * every A/B + comparator run. `design_combiner_ready` carries the Supabase
   * Storage public URL of the fused variant PNG (`combined_variant_image_url`)
   * so the results page can render it directly; `skipped`/`failed` carry a
   * message. The server UPDATEs `public.simulations.design_combiner` with a
   * terminal payload for all three so the URL/status survives refresh / share.
   */
  | { type: "design_combiner_ready"; data: DesignCombinerReadyData }
  | {
      type: "design_combiner_failed";
      data: { message: string; comparison_id: string };
    }
  | {
      type: "design_combiner_skipped";
      data: { message: string; comparison_id: string };
    }
  /**
   * Pro-tier revalidation event. Re-simulates the combined variant with
   * the same persona pool and emits `validated_lift`. Server UPDATEs
   * `public.simulations.revalidation`.
   */
  | { type: "revalidation_ready"; data: RevalidationReadyData }
  | {
      type: "revalidation_failed";
      data: { message: string; comparison_id: string };
    }
  | { type: "error"; data: { message: string; flow_id?: string } };

/**
 * Reads an NDJSON response stream and calls `onEvent` for each parsed JSON line.
 * Buffers partial lines across chunks.
 */
export async function consumeNDJSONStream(
  response: Response,
  onEvent: (event: SimulationEvent) => void,
  signal?: AbortSignal
): Promise<void> {
  if (!response.body) throw new Error("Response has no body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const cleanup = () => {
    try { reader.cancel(); } catch { /* already closed */ }
  };

  if (signal) {
    if (signal.aborted) { cleanup(); return; }
    signal.addEventListener("abort", cleanup, { once: true });
  }

  try {
    while (true) {
      if (signal?.aborted) break;
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const event = JSON.parse(trimmed) as SimulationEvent;
          onEvent(event);
        } catch {
          console.warn("[stream] Failed to parse NDJSON line:", trimmed);
          onEvent({ type: "error", data: { message: "Failed to parse streaming event" } });
        }
      }
    }

    if (buffer.trim()) {
      try {
        const event = JSON.parse(buffer.trim()) as SimulationEvent;
        onEvent(event);
      } catch {
        console.warn("[stream] Failed to parse final NDJSON line:", buffer);
      }
    }
  } finally {
    if (signal) {
      signal.removeEventListener("abort", cleanup);
    }
  }
}
