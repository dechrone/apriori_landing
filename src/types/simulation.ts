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

export interface ScreenMetric {
  avg_trust: number;
  avg_clarity: number;
  avg_value: number;
  avg_time_s: number;
  sample_size: number;
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

export interface EmotionalJourneyMap {
  completers: string;
  drop_offs: string;
}

export interface FlowAssessment {
  overall_verdict: string;
  what_works?: WhatWorks[];
  what_needs_fixing?: WhatNeedsFixing[];
  quick_wins?: QuickWin[];
  fix_recommendations?: FixRecommendation[];
  // New: single usability score (replaces ux_health_scores)
  usability_score?: number;
  emotional_journey_map?: EmotionalJourneyMap;
  cognitive_load_assessment?: CognLoadItem[];
  // Legacy fields kept optional for backward compat with existing sample data
  ux_health_scores?: unknown;
  information_architecture_issues?: unknown[];
  micro_interaction_gaps?: unknown[];
  three_month_roadmap?: unknown;
}

export interface SegmentAnalysis {
  summary: string;
  high_propensity_segment: string;
  low_propensity_segment: string;
}

export interface DropOffCluster {
  cluster_id?: number;
  label?: string;
  persona_count?: number;
  representative_reasoning?: string;
  sample_reasonings?: string[];
}

export interface DropOffScreen {
  total_drop_offs?: number;
  drop_off_count?: number;  // legacy alias
  clusters: DropOffCluster[];
  [key: string]: unknown;   // allow extra fields from sample data
}

export interface DropOffAnalysis {
  top_n_screens?: number;
  total_drop_offs_analyzed?: number;
  screens: Record<string, DropOffScreen>;
}

export interface FunnelDropOff {
  screen_id: string;
  drop_offs: number;
  drop_off_pct: number;
  // Populated when the run was uploaded via Supabase Storage assets; empty for legacy runs.
  screen_url?: string;
  step_number?: number | null;
  view_name?: string;
}

export interface ScreenImageMapEntry {
  url: string;           // Supabase Storage public URL; empty string means no image available
  step_number: number | null;
  view_name: string;
  node_type: string;
}

export interface CompletionAnalysis {
  total_completers?: number;
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

// ── Usability Findings (replaces design_recommendations) ──────────────────────

export type UsabilityFindingSeverity = "critical" | "major" | "minor";
export type UsabilityFindingType =
  | "task_failure"
  | "confusion"
  | "unexpected_behavior"
  | "trust_issue"
  | "friction_point";

export interface UsabilityFinding {
  severity: UsabilityFindingSeverity;
  type: UsabilityFindingType;
  screen: string;
  finding: string;
  evidence: string;
  affected_segments: string[];
  recommendation: string;
}

// ── Per-screen Behavioral Analysis (replaces playbook_insights) ───────────────

export interface BehaviorAnalysisScreen {
  primary_task: string;
  task_success_rate: number;
  behavioral_observations: string[];
  confusion_signals: string[];
  decision_drivers: string[];
  verbatim_reactions: string[];
  segment_differences: string[];
  screen_verdict: string;
  analysis_error?: string;
}

// ── Segment-Screen Breakdown (Section 3: Segment Divergence) ─────────────────

export interface SegmentScreenEntry {
  reached: number;
  dropped_off: number;
  drop_off_pct: number;
}

export type SegmentScreenBreakdown = Record<string, Record<string, SegmentScreenEntry>>;

// ── Drop-Off Monologues (Section 4: Persona Monologues) ──────────────────────

export interface DropOffMonologue {
  persona_uuid: string;
  persona_label: string;
  behavioral_archetype: string;
  internal_monologue: string;
  reasoning: string;
  emotional_state: string;
  trust_score?: number;
  clarity_score?: number;
  value_score?: number;
}

// ── Fix Recommendations (Section 6: Ranked Fixes) ────────────────────────────

export interface FixRecommendation {
  root_cause: string;
  screen: string;
  recommendation: string;
  estimated_impact: "high" | "medium" | "low";
  feasibility: "high" | "medium" | "low";
  impact_feasibility_score: number;
  affected_segment: string;
  expected_uplift: string;
}

// ── Segment Completion Summary (Segment Scorecard) ───────────────────────────

export interface SegmentCompletionEntry {
  segment: string;
  total: number;
  completed: number;
  dropped: number;
  completion_pct: number;
  top_drop_off_screen: string;
  top_drop_off_reason: string;
}

// ── Post-flow Question Analysis (e.g. payment intent capture) ───────────

export interface QuestionPersonaResponse {
  persona_uuid: string;
  reasoning: string;
  willingness_to_pay_score: number;
  max_monthly_price_inr: number;
  income: number;
  occupation: string;
  age: number;
  zone: string;
  completed_flow: boolean;
}

export interface QuestionActionGroup {
  count: number;
  pct: number;
  personas: QuestionPersonaResponse[];
}

export interface QuestionReasonAgainst {
  reason: string;
  frequency: number;
}

export interface QuestionAnalysis {
  question_id: string;
  question_text: string;
  total_responses: number;
  would_pay_count: number;
  would_pay_pct: number;
  would_not_pay_count: number;
  action_distribution: Record<string, QuestionActionGroup>;
  avg_willingness_to_pay_score: number;
  avg_max_monthly_price_inr: number;
  top_reasons_against: QuestionReasonAgainst[];
}

// ── Root simulation data ──────────────────────────────────────────────────────

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
  // screen_id → { url, step_number, view_name, node_type }. Ordered by step_number
  // when the UI needs a funnel-order traversal of screens.
  screen_image_map?: Record<string, ScreenImageMapEntry>;
  top_friction_points: FrictionPoint[];
  screen_metrics: Record<string, ScreenMetric>;
  executive_summary: string;
  // New user-testing fields (optional for backward compat with existing sample data)
  usability_findings?: UsabilityFinding[];
  segment_analysis?: SegmentAnalysis;
  drop_off_analysis?: DropOffAnalysis;
  flow_assessment?: FlowAssessment;
  completion_analysis?: CompletionAnalysis;
  behavior_analysis?: Record<string, BehaviorAnalysisScreen>;
  persona_details?: PersonaDetail[];
  // New report sections
  segment_screen_breakdown?: SegmentScreenBreakdown;
  segments_used?: string[];
  segment_completion_summary?: SegmentCompletionEntry[];
  drop_off_monologues?: Record<string, DropOffMonologue[]>;
  fix_recommendations?: FixRecommendation[];
  expected_completion_rate_pct?: number;
  // Post-flow question analysis (e.g. payment intent)
  question_analysis?: QuestionAnalysis[];
  // Legacy fields kept optional for backward compat with existing sample data
  design_recommendations?: unknown[];
  ux_analysis?: unknown;
  visual_design_analysis?: unknown;
  playbook_insights?: unknown;
}

export interface SimulationOverviewProps {
  simulationData: SimulationData;
  isLoading?: boolean;
  error?: string | null;
}
