/**
 * Study-based simulation data types.
 * Powers the new Overview tab with Act 1 / Act 2 / Act 3 structure.
 */

/* ── Study Metadata ── */
export interface StudyMetadata {
  study_id: string;
  study_name: string;
  flow_name: string;
  flow_version: string;
  date_run: string;
  total_users: number;
  completed_users: number;
  dropped_users: number;
  failed_users: number;
  completion_rate: number;
  acquisition_channels: string[];
  personas_used: string[];
  persona_distribution: Record<string, number>;
  analysis_status: string;
}

/* ── Executive Summary ── */
export interface StudyTopFinding {
  rank: number;
  finding: string;
}

export interface StudyTopRecommendation {
  headline: string;
  linked_rec_id: string;
  effort: string;
  routing: string;
}

export interface StudyExecutiveSummary {
  completion_rate: number;
  sus_score: number;
  sus_grade: string;
  sus_label: string;
  avg_seq: number;
  critical_drop_point: string;
  critical_drop_pct: number;
  top_findings: StudyTopFinding[];
  top_recommendation: StudyTopRecommendation;
  open_insights_count: number;
  this_sprint_count: number;
  next_sprint_count: number;
  backlog_count: number;
}

/* ── Scores ── */
export interface CompletionRateScore {
  overall: number;
  ci_lower: number;
  ci_upper: number;
  by_persona: Record<string, number>;
}

export interface SUSQuestion {
  q_id: number;
  type: string;
  text: string;
}

export interface SUSScore {
  mean: number;
  grade: string;
  label: string;
  benchmark: number;
  delta_from_benchmark: number;
  questions: SUSQuestion[];
  distribution: Record<string, number>;
  by_persona: Record<string, number>;
}

export interface SEQTask {
  avg: number;
  benchmark: number;
  delta: number;
  flag: string;
  by_persona: Record<string, number>;
}

export interface StudyScores {
  completion_rate: CompletionRateScore;
  sus: SUSScore;
  seq_by_task: Record<string, SEQTask>;
}

/* ── Emotional Fingerprint ── */
export interface EmotionalTag {
  tag: string;
  frequency_pct: number;
}

export interface PersonaEmotionalProfile {
  dominant_tag: string;
  sentiment: string;
}

export interface EmotionalFingerprint {
  top_positive_tags: EmotionalTag[];
  top_negative_tags: EmotionalTag[];
  overall_sentiment: string;
  sentiment_score: number;
  most_emotional_step: string;
  smoothest_step: string;
  by_persona: Record<string, PersonaEmotionalProfile>;
}

/* ── Themes ── */
export interface SupportingCode {
  code_name: string;
  frequency_pct: number;
}

export interface ThemeMonologue {
  session_id: string;
  persona_type: string;
  text: string;
}

export interface ThemeCounterEvidence {
  summary: string;
  frequency_pct: number;
}

export interface ThemeQuantSupport {
  completion_rate: number;
  avg_seq: number;
}

export interface StudyTheme {
  theme_id: string;
  rank: number;
  theme_name: string;
  description: string;
  frequency_pct: number;
  affected_personas: string[];
  not_affected_personas: string[];
  supporting_codes: SupportingCode[];
  key_monologues: ThemeMonologue[];
  counter_evidence: ThemeCounterEvidence;
  quantitative_support: ThemeQuantSupport;
  /** Root cause explanation — why this happens systemically */
  root_causes?: string;
  /** Friction point IDs where this theme surfaces */
  connected_friction_point_ids?: string[];
}

/* ── Screens ── */
export interface ScreenMonologueEntry {
  session_id: string;
  persona_type: string;
  action_taken: string;
  internal_monologue: string;
  emotional_tags: string[];
  behavioral_tags: string[];
  completed: boolean;
  dropped: boolean;
  drop_reason?: string;
}

export interface StudyScreen {
  step_id: number;
  step_name: string;
  reached: number;
  completed: number;
  dropped: number;
  drop_off_pct: number;
  avg_seq: number;
  top_emotional_tags: string[];
  top_behavioral_tags: string[];
  all_monologues: ScreenMonologueEntry[];
  dropped_monologues: ScreenMonologueEntry[];
}

/* ── Friction Points ── */
export interface FrictionPointMonologue {
  session_id: string;
  persona_type: string;
  text: string;
}

export interface StudyFrictionPoint {
  friction_point_id: string;
  rank: number;
  step_id: number;
  step_name: string;
  friction_type: string;
  friction_score: number;
  severity: string;
  drop_off_pct: number;
  frequency_pct: number;
  affected_personas: string[];
  top_emotional_tags: string[];
  top_behavioral_tags: string[];
  avg_seq: number;
  key_monologues: FrictionPointMonologue[];
  /** Plain-language 2–3 sentence explanation of the problem */
  problem_narrative?: string;
  /** What the user expected at this step */
  user_expectation?: string;
  /** What actually happened */
  actual_experience?: string;
  /** Business-language impact statement */
  business_impact?: string;
  /** Theme IDs this friction point relates to */
  related_theme_ids?: string[];
}

/* ── Behavioral Patterns ── */
export interface BehavioralPatternMonologue {
  session_id: string;
  persona_type: string;
  text: string;
}

export interface StudyBehavioralPattern {
  pattern_id: string;
  pattern_type: string;
  pattern_name: string;
  frequency_pct: number;
  affected_personas: string[];
  trigger_step_id: number | null;
  trigger_step_name: string | null;
  trigger_tags: string[];
  implication: string;
  session_ids: string[];
  /** Chronological 3–4 sentence narrative of the user journey for this pattern */
  behavior_narrative?: string;
  /** Representative quotes capturing decision-making moments */
  key_monologues?: BehavioralPatternMonologue[];
  /** 1–2 sentence actionable product insight */
  actionable_insight?: string;
  /** Theme IDs this pattern connects to */
  related_theme_ids?: string[];
  /** Friction point IDs where this pattern manifests */
  related_friction_point_ids?: string[];
}

/* ── Segment Analysis ── */
export interface StudySegment {
  segment_id: string;
  dimension: string;
  label: string;
  n: number;
  conversion_rate: number;
  avg_sus: number;
  top_friction_point_ids: string[];
  primary_pattern: string;
  top_emotional_tags: string[];
  summary: string;
  /** 2–3 sentence character profile of this persona's mindset and needs */
  persona_profile?: string;
  /** 3–4 sentence chronological narrative of this persona's journey through the flow */
  journey_narrative?: string;
  /** Representative quotes from this persona type */
  monologues?: { text: string }[];
  /** For high-converting personas: what steps worked well for them */
  positive_experience?: string;
  /** Ordered sequence of emotions through the flow */
  emotional_arc?: string[];
  /** 1–2 sentence actionable recommendation for this specific segment */
  segment_recommendation?: string;
}

export interface SegmentProfile {
  label: string;
  dominant_personas: string[];
  dominant_channels: string[];
  common_patterns: string[];
  shared_emotional_signals: string[];
}

export interface CriticalSplit {
  dimension: string;
  label: string;
  value_a: string;
  rate_a: number;
  value_b: string;
  rate_b: number;
  delta: number;
  implication: string;
}

export interface StudySegmentAnalysis {
  segments: StudySegment[];
  converter_profile: SegmentProfile;
  dropper_profile: SegmentProfile;
  critical_splits: CriticalSplit[];
}

/* ── Insights ── */
export interface StudyInsight {
  insight_id: string;
  rank: number;
  headline: string;
  one_liner: string;
  type: string;
  observation: string;
  finding: string;
  insight: string;
  recommendation: string;
  frequency_pct: number;
  affected_personas: string[];
  not_affected_personas: string[];
  counter_evidence: string;
  top_emotional_tags: string[];
  confidence_score: number;
  avg_seq: number;
  step_drop_off_pct: number;
  supporting_monologues: FrictionPointMonologue[];
  linked_friction_point_id: string;
  linked_theme_id: string;
  linked_rec_id: string;
  rice_score: number | null;
  status: string;
  owner: string | null;
  linked_ticket: string | null;
  created_at: string;
}

/* ── Design Recommendations ── */
export interface StudyDesignRecommendation {
  rec_id: string;
  rank: number;
  headline: string;
  linked_insight_id: string;
  linked_friction_point_id: string;
  problem: string;
  user_need: string;
  current_experience: string;
  recommended_change: string;
  emotional_target: string;
  effort: string;
  success_metric: string;
  priority: string;
  rice_score: number | null;
  /** What the experience looks like after the fix */
  after_experience?: string;
  /** Theme ID this recommendation traces back to */
  linked_theme_id?: string;
}

/* ── Priority Table ── */
export interface PriorityTableEntry {
  rank: number;
  insight_id: string;
  headline: string;
  type: string;
  reach: number | null;
  impact: number;
  confidence: number;
  effort: number;
  rice_score: number | null;
  routing: string;
  linked_rec_id: string;
}

/* ── Power Users ── */
export interface PowerUserResonance {
  step_id: number;
  step_name: string;
  signal: string;
  tag: string;
  frequency_pct: number;
}

export interface PowerUserStrength {
  step_id: number;
  step_name: string;
  strength: string;
  evidence: string;
}

export interface ChannelPersonaMatrix {
  channel: string;
  persona: string;
  conversion_rate: number;
}

export interface StudyPowerUsers {
  count: number;
  pct_of_total: number;
  pct_of_converters: number;
  why_they_convert: string[];
  what_resonates: PowerUserResonance[];
  flow_strengths: PowerUserStrength[];
  persona_breakdown: Record<string, { count: number; pct: number }>;
  acquisition_strategy: {
    highest_yield_channel: string;
    highest_yield_persona: string;
    recommendation: string;
    channel_persona_matrix: ChannelPersonaMatrix[];
  };
}

/* ── Playbook Insights ── */
export interface PlaybookInsight {
  playbook_id: string;
  title: string;
  category: string;
  finding: string;
  implication: string;
  action: string;
  applies_to: string[];
  evidence_studies: string[];
  confidence: number;
  is_new: boolean;
  status: string;
}

/* ── Root Study Data ── */
export interface StudyData {
  study: StudyMetadata;
  executive_summary: StudyExecutiveSummary;
  scores: StudyScores;
  emotional_fingerprint: EmotionalFingerprint;
  themes: StudyTheme[];
  screens: StudyScreen[];
  friction_points: StudyFrictionPoint[];
  behavioral_patterns: StudyBehavioralPattern[];
  segment_analysis: StudySegmentAnalysis;
  power_users: StudyPowerUsers;
  insights: StudyInsight[];
  design_recommendations: StudyDesignRecommendation[];
  playbook_insights: PlaybookInsight[];
  priority_table: PriorityTableEntry[];
}
