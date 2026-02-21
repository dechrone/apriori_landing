/**
 * Backend simulation API response shapes.
 */

export interface SimulationPersona {
  uuid: string;
  occupation: string;
  age: number;
  sex: string;
  location: string;
  zone: string;
  monthly_income_inr: number;
  digital_literacy: number;
  primary_device: string;
  purchasing_power_tier: string;
  scam_vulnerability: string;
  financial_risk_tolerance: string;
}

// ─── Ad simulation result ───────────────────────────────────────────────────

export interface AdReaction {
  persona: SimulationPersona;
  ad_id: string;
  trust_score: number;
  relevance_score: number;
  action: string;
  intent_level: string;
  reasoning: string;
  emotional_response: string;
  barriers: string[];
  internal_monologue: string;
}

export interface AdPerformanceEntry {
  ad_id: string;
  total_impressions: number;
  clicks: number;
  click_rate: number;
  high_intent_leads: number;
  conversion_rate: number;
  unique_reach: number;
}

export interface AdResultMetadata {
  target_group: string;
  num_personas: number;
  num_ads: number;
  total_reactions: number;
  valid_reactions: number;
  execution_time_seconds: number;
  simulation_id: string;
  simulation_name: string;
  profile_id: string;
  audience_id: string;
  folder_ids: string[];
  optimize_metric: string;
}

export interface AdSimulationResult {
  simulation_type: "ad";
  personas: SimulationPersona[];
  reactions: AdReaction[];
  performance: Record<string, AdPerformanceEntry>;
  winning_portfolio: unknown[];
  wasted_spend_alerts: unknown[];
  visual_heatmap: {
    rows: string[];
    cols: string[];
    matrix: string[][];
  };
  validation_summary: {
    total: number;
    valid: number;
    flagged: number;
    flagged_percentage: number;
  };
  metadata: AdResultMetadata;
}

export interface AdSimulationResponse {
  status: string;
  simulation_id: string;
  result: AdSimulationResult;
}

// ─── Product flow simulation result ──────────────────────────────────────────

export interface FlowStep {
  view_id: string;
  view_number: number;
  view_name: string;
  step_type: string;
  decision: string;
  reasoning: string;
  drop_off_reason: string | null;
  trust_score: number;
  clarity_score: number;
  value_perception_score: number;
  emotional_state: string;
  time_spent_seconds: number;
}

export interface ProductFlowJourney {
  persona: SimulationPersona;
  flow_id: string;
  completed_flow: boolean;
  dropped_off_at_view: string | null;
  drop_off_reason: string | null;
  total_screens_seen: number;
  total_time_seconds: number;
  steps: FlowStep[];
  monologue: string;
}

export interface FlowInsight {
  flow_id: string;
  flow_name: string;
  completion_rate: number;
  avg_time_seconds: number;
  top_drop_off_screen: string | null;
  top_drop_off_reason: string | null;
  friction_points: unknown[];
}

export interface ProductFlowResultMetadata {
  target_group: string;
  num_personas: number;
  num_screens: number;
  completion_rate_pct: number;
  avg_time_seconds: number;
  execution_time_seconds: number;
  simulation_id: string;
  simulation_name: string;
  profile_id: string;
  audience_id: string;
  folder_ids: string[];
  optimize_metric: string;
}

export interface ProductFlowSimulationResult {
  simulation_type: "product_flow";
  personas: SimulationPersona[];
  journeys: ProductFlowJourney[];
  flow_insights: FlowInsight[];
  metadata: ProductFlowResultMetadata;
}

export interface ProductFlowSimulationResponse {
  status: string;
  simulation_id: string;
  result: ProductFlowSimulationResult;
}

export type SimulationResponse = AdSimulationResponse | ProductFlowSimulationResponse;
