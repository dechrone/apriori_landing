/**
 * Flow Comparator Results — Data types for comparison simulations.
 * The per-flow data reuses the existing SimulationData type.
 */

import type { SimulationData } from "./simulation";

// --- Comparator-level types ---

export interface FlowRef {
  flow_id: string;         // e.g. "flow_0"
  flow_name: string;       // e.g. "Flow A"
}

export interface ComparatorWinner {
  flow_id: string;
  flow_name: string;
  primary_reason: string;
}

export interface FlowScorecard {
  completion_rate_pct: number;
  avg_time_to_complete_seconds: number;
  dominant_plan: string;
  avg_trust: number;
  avg_clarity: number;
  avg_value: number;
  top_drop_off_screen: string;
  addon_adoption_pct: number;
}

export interface DimensionComparison {
  dimension: string;
  values: {
    flow_0: string;
    flow_1: string;
  };
  winner: string;          // "flow_0" | "flow_1"
  insight: string;
}

export interface SegmentWinner {
  segment: string;
  winner_flow_id: string;  // "flow_0" | "flow_1"
  reason: string;
}

/** Shape of the `comparison_ready` NDJSON stream event — no per-flow raw data. */
export interface ComparatorResult {
  comparison_id: string;
  flows_compared: FlowRef[];
  winner: ComparatorWinner;
  scorecards: {
    flow_0: FlowScorecard;
    flow_1: FlowScorecard;
  };
  dimension_comparisons: DimensionComparison[];
  segment_winners: SegmentWinner[];
  where_each_excels: {
    flow_0: string[];
    flow_1: string[];
  };
  where_each_falls_short: {
    flow_0: string[];
    flow_1: string[];
  };
  cross_pollination: {
    flow_0: string[];
    flow_1: string[];
  };
  recommendation: string;
}

export interface ComparatorData {
  comparison_id: string;
  flows_compared: FlowRef[];                          // always length 2
  winner: ComparatorWinner;
  scorecards: {
    flow_0: FlowScorecard;
    flow_1: FlowScorecard;
  };
  dimension_comparisons: DimensionComparison[];
  segment_winners: SegmentWinner[];
  where_each_excels: {
    flow_0: string[];
    flow_1: string[];
  };
  where_each_falls_short: {
    flow_0: string[];
    flow_1: string[];
  };
  cross_pollination: {
    flow_0: string[];
    flow_1: string[];
  };
  recommendation: string;
  // Per-flow full simulation data — same shape as SimulationData
  flow_0_data: SimulationData;
  flow_1_data: SimulationData;
}
