/**
 * NDJSON streaming utility for simulation API responses.
 * The backend streams newline-delimited JSON events over a single HTTP response.
 */

import type { SimulationData } from "@/types/simulation";
import type { ComparatorResult } from "@/types/comparator";

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
  | { type: "personas_loaded"; data: { count: number } }
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
  | { type: "comparison_ready"; data: ComparatorResult }
  | { type: "error"; data: { message: string; flow_id?: string } };

/**
 * Reads an NDJSON response stream and calls `onEvent` for each parsed JSON line.
 * Buffers partial lines across chunks.
 */
export async function consumeNDJSONStream(
  response: Response,
  onEvent: (event: SimulationEvent) => void
): Promise<void> {
  if (!response.body) throw new Error("Response has no body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    // Keep the last (possibly incomplete) chunk in the buffer
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const event = JSON.parse(trimmed) as SimulationEvent;
        onEvent(event);
      } catch {
        console.warn("[stream] Failed to parse NDJSON line:", trimmed);
      }
    }
  }

  // Flush any remaining buffered content
  if (buffer.trim()) {
    try {
      const event = JSON.parse(buffer.trim()) as SimulationEvent;
      onEvent(event);
    } catch {
      console.warn("[stream] Failed to parse final NDJSON line:", buffer);
    }
  }
}
