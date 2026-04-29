/**
 * NDJSON streaming utility for simulation API responses.
 * The backend streams newline-delimited JSON events over a single HTTP response.
 */

import type { SimulationData } from "@/types/simulation";
import type { AbReport, SynthesisReadyData } from "@/types/ab-report";

export type SimulationEvent =
  | {
      type: "started";
      data: {
        simulation_id: string;
        flow_id: string;
        flow_name: string;
        target_group: string;
        num_personas: number;
      };
    }
  | {
      type: "personas_loaded";
      data: {
        count: number;
        /**
         * How the audience was resolved. "strict" means filter+semantic hit cleanly;
         * "relaxed" means we widened the search; "random_fallback" means we
         * couldn't match at all and are simulating on a random sample.
         */
        retrieval_mode?:
          | "strict"
          | "relaxed"
          | "random_fallback"
          | "cache_hit"
          | "template";
        matched_count?: number;
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
