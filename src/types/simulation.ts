/**
 * Simulation Results — Data types matching the insights JSON contract.
 * Used by the SimulationOverview component system.
 */

export interface SimulationSummary {
  total_personas: number;
  completed: number;
  dropped_off: number;
  completion_rate_pct: number;
  avg_time_to_complete_seconds: number;
  dominant_plan: string;
  dominant_plan_pct: number;
}

export interface SampleQuality {
  sample_size: number;
  margin_of_error_pct: number;
  confidence_level: string;
  note: string;
}

export interface FrictionPoint {
  friction: string;
  frequency: number;
}

export interface Recommendation {
  priority: "P0" | "P1" | "P2";
  screen: string;
  issue: string;
  recommendation: string;
  expected_impact: string;
  primary_affected_segment: string;
}

export interface ScreenMetric {
  avg_trust: number;
  avg_clarity: number;
  avg_value: number;
  avg_time_s: number;
  sample_size: number;
}

export interface UXAnalysis {
  highest_friction_screen: string;
  trust_building_screens: string[];
  clarity_problem_screens: string[];
  value_gap_screens: string[];
}

export interface WhatWorks {
  element: string;
  why: string;
  for_whom: string;
}

export interface WhatNeedsFixing {
  element: string;
  problem: string;
  for_whom: string;
  fix: string;
  priority: "P0" | "P1" | "P2";
}

export interface QuickWin {
  change?: string;
  expected_uplift: string;
}

export interface CognLoadItem {
  screen_id?: string;
  load_level?: string;
  reason: string;
}

export interface UXHealthScores {
  trust_journey: number;
  clarity_journey: number;
  value_communication: number;
  cognitive_load: string;
  emotional_flow: string;
}

export interface EmotionalJourneyMap {
  completers: string;
  drop_offs: string;
}

export interface FlowAssessment {
  overall_verdict: string;
  what_works: WhatWorks[];
  what_needs_fixing: WhatNeedsFixing[];
  quick_wins: QuickWin[];
  ux_health_scores: UXHealthScores;
  emotional_journey_map: EmotionalJourneyMap;
  cognitive_load_assessment: CognLoadItem[];
  information_architecture_issues: unknown[];
  micro_interaction_gaps: string[];
  three_month_roadmap: {
    month_1_P0: string[];
    month_2_P1: string[];
    month_3_P2: string[];
  };
}

export interface PersonaJourney {
  persona_type: string;
  plan_chosen: string;
  key_decision_moment: string;
  emotional_arc: string;
}

export interface SegmentAnalysis {
  summary: string;
  high_propensity_segment: string;
  low_propensity_segment: string;
}

export interface PowerUserArchetype {
  archetype_name: string;
  defining_traits: Record<string, string>;
  why_they_convert: string;
  what_resonates: string[];
  conversion_rate_estimate: string;
  persona_count_in_sample: number;
}

export interface PowerUsers {
  power_user_archetypes: PowerUserArchetype[];
  flow_strengths_for_power_users: string[];
  acquisition_recommendation: string;
}

export interface DropOffCluster {
  label?: string;
  sample_reasonings?: string[];
}

export interface DropOffScreen {
  total_drop_offs: number;
  clusters: DropOffCluster[];
}

export interface DropOffAnalysis {
  top_n_screens: number;
  total_drop_offs_analyzed: number;
  screens: Record<string, DropOffScreen>;
}

export interface FunnelDropOff {
  screen_id: string;
  drop_offs: number;
  drop_off_pct: number;
}

export interface CompletionAnalysis {
  total_completers: number;
  completion_rate_pct: number;
  conversion_drivers: Record<string, unknown>;
  dominant_completion_themes: string[];
  llm_synthesis: string;
}

export interface ScreenMonologue {
  screen_id: string;
  view_name: string;
  internal_monologue: string;
  reasoning: string;
  emotional_state: string;
  friction_points: string[];
  decision_outcome: string;
  trust_score?: number;
  clarity_score?: number;
  value_score?: number;
  time_seconds?: number;
  selected_choice?: string;
}

export interface PersonaDetailDemographics {
  first_language?: string;
  age?: number;
  occupation?: string;
  district?: string;
  behavioral_archetype?: string;
  [key: string]: unknown;
}

export interface PersonaDetail {
  persona_uuid: string;
  demographics: PersonaDetailDemographics;
  professional_background: string;
  cultural_background: string;
  outcome: string;
  key_selections: Record<string, unknown>;
  final_price_inr: number | null;
  total_time_seconds: number;
  overall_monologue: string;
  screen_monologues: ScreenMonologue[];
}

export interface PlaybookClusterRecommendation {
  cluster_id?: number;
  cluster_type?: string;
  technique?: string;
  description?: string;
  industry_example?: string;
  effort?: string;
  expected_impact?: string;
  conversion_uplift_pct?: string;
  [key: string]: unknown;
}

export interface PlaybookInsight {
  playbook_theme: string;
  cluster_recommendations: PlaybookClusterRecommendation[];
  screen_summary: string;
}

export interface SimulationData {
  simulation_id: string;
  flow_id: string;
  flow_name: string;
  generated_at: string;
  summary: SimulationSummary;
  sample_quality: SampleQuality;
  plan_distribution: Record<string, unknown>;
  addon_adoption: Record<string, unknown>;
  funnel_drop_off: FunnelDropOff[];
  top_friction_points: FrictionPoint[];
  screen_metrics: Record<string, ScreenMetric>;
  executive_summary: string;
  design_recommendations: Recommendation[];
  behavioral_insights: string[];
  segment_analysis: SegmentAnalysis;
  ux_analysis: UXAnalysis;
  power_users: PowerUsers;
  drop_off_analysis: DropOffAnalysis;
  flow_assessment: FlowAssessment;
  persona_journeys: PersonaJourney[];
  completion_analysis: CompletionAnalysis;
  persona_details: PersonaDetail[];
  playbook_insights?: Record<string, PlaybookInsight>;
}

export interface SimulationOverviewProps {
  simulationData: SimulationData;
  isLoading?: boolean;
  error?: string | null;
}
