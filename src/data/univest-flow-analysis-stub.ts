import type { FlowAnalysisData } from "@/types/flow-analysis";
import type { SimulationData } from "@/types/simulation";

/**
 * Minimal FlowAnalysisData stub for the Univest demo pages.
 *
 * `FlowAnalysisView` requires a `data: FlowAnalysisData` prop, but when
 * `simulationData` is also passed (which is the case for all Univest demos),
 * the Overview / Drop-Off Funnel / Deep Dive tabs all read from `simulationData`
 * and the `data` object is effectively unused. We still need something that
 * satisfies the type, so this builds a tiny stub from the raw insights JSON.
 */
export function buildUnivestFlowAnalysisStub(
  product: string,
  flow: string,
  sim: SimulationData,
): FlowAnalysisData {
  const summary = sim.summary ?? {
    total_personas: 0,
    completed: 0,
    dropped_off: 0,
    completion_rate_pct: 0,
    avg_time_to_complete_seconds: 0,
    dominant_plan: "",
    dominant_plan_pct: 0,
  };

  return {
    meta: {
      product,
      flow,
      date: (sim.generated_at ?? "").slice(0, 10) || "-",
      totalPersonas: summary.total_personas,
      completionRate: Math.round(summary.completion_rate_pct ?? 0),
    },
    screens: [],
    funnel: [],
    rootCauses: [],
    oneBet: {
      title: "",
      rationale: "",
      effort: "",
      impact: "",
      projectedCompletion: "",
      currentCompletion: 0,
      personas: [],
    },
    personas: [],
  };
}
