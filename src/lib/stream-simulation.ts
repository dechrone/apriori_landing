/**
 * NDJSON streaming utility for simulation API responses.
 * The backend streams newline-delimited JSON events over a single HTTP response.
 */

import type { SimulationData } from "@/types/simulation";
import type {
  AbReport,
  DesignCombinerReadyData,
  RevalidationReadyData,
  SynthesisReadyData,
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
};

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
   * Multiverse Synthesis Engine (simul2design) follow-on. Arrives ~4-5 min
   * AFTER comparison_ready when SIMUL2DESIGN_ENABLED is on in the backend.
   * The wizard typically redirects on comparison_ready before this lands;
   * the durable write is the server-side UPDATE to `public.simulations.synthesis`,
   * which the results page reads via supabase realtime.
   */
  | { type: "synthesis_ready"; data: SynthesisReadyData }
  | {
      type: "synthesis_failed";
      data: { message: string; comparison_id: string };
    }
  /**
   * Lever-driven design combiner follow-on. Arrives ~2 min AFTER
   * comparison_ready when APRIORI_DESIGN_COMBINER_ENABLED is on. Carries the
   * Supabase Storage public URL of the fused variant PNG (`combined_variant_image_url`)
   * so the results page can render it directly. Server also UPDATEs
   * `public.simulations.design_combiner` so the URL survives refresh / share.
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
