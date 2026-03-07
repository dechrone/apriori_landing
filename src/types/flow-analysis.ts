/**
 * Flow Analysis Tool — data shape from PRD.
 * Used for Product Simulation results (Overview + Deep Dive).
 */

export interface FlowAnalysisMeta {
  product: string;
  flow: string;
  date: string;
  totalPersonas: number;
  completionRate: number;
}

export interface FlowScreen {
  id: string;
  label: string;
  order: number;
}

export interface FlowFunnelEntry {
  screen: string;
  entered: number;
  dropped: number;
}

export interface RootCause {
  id: string;
  screen: string;
  title: string;
  detail: string;
  affectedPersonas: string[];
  severity: "high" | "critical";
}

export interface OneBetChange {
  number: string;
  title?: string;
  description: string;
  icon?: string;
  /** Short benefit tag shown at the bottom, e.g. "Builds initial trust" */
  benefit?: string;
}

export interface OneBetPersona {
  name: string;
  role?: string;
}

export interface OneBet {
  title: string;
  rationale: string;
  effort: string;
  impact: string;
  projectedCompletion: string;
  currentCompletion: number;
  personas: string[];
  /** Enhanced persona data with roles — if provided, used instead of string personas */
  personaDetails?: OneBetPersona[];
  whatChanges?: OneBetChange[];
}

export interface BehavioralPattern {
  stat: string;
  title: string;
  description: string;
}

export interface PersonaQuote {
  quote: string;
  attribution: string;
  /** Screen where persona dropped, for badge (e.g. "S4"). Parsed from attribution if absent. */
  dropScreen?: string;
}

export interface JourneyStep {
  screen: string;
  decision: "continue" | "drop";
  trustScore: number;
  clarityScore: number;
  gutReaction: string;
  reasoning: string;
  frictionPoints: string[];
  missing: string;
  dropReason?: string;
}

export interface FlowPersona {
  id: string;
  name: string;
  role: string;
  city: string;
  lamfExp: string;
  urgency: string;
  need: string;
  fear: string;
  outcome: "completed" | "dropped";
  dropScreen?: string;
  journey: JourneyStep[];
}

export interface FlowAnalysisData {
  meta: FlowAnalysisMeta;
  screens: FlowScreen[];
  funnel: FlowFunnelEntry[];
  rootCauses: RootCause[];
  oneBet: OneBet;
  personas: FlowPersona[];
  /** Drop reason per screen id (for funnel drop tags). */
  dropReasons?: Record<string, string>;
  /** Persona names who dropped at each screen (for funnel persona dots). */
  dropPersonas?: Record<string, string[]>;
  patterns?: BehavioralPattern[];
  quotes?: PersonaQuote[];
}

/* ─── Deep-Dive Simulation Types (new) ──────────────────────────────────── */

export interface ScreenMonologue {
  screen_id: string;             // "view_1", "view_2", etc.
  view_name: string;             // "KYC – Secure Verification (Step 1/6)"
  internal_monologue: string;
  reasoning: string;
  emotional_state: string;       // CSV: "Anxious, Cautious"
  trust_score: number;           // 1–10
  clarity_score: number;         // 1–10
  value_score: number;           // 1–10
  time_seconds: number;
  friction_points: string[];
  selected_choice: "CONTINUE" | "DROP_OFF";
  decision_outcome: "CONTINUE" | "DROP_OFF";
}

export interface Demographics {
  occupation: string;
  age: number;
  sex: string;
  state: string;
  district: string;
  monthly_income_inr: number;
  digital_literacy: number;       // 1–10
  behavioral_archetype: string;   // e.g. "The Pragmatist"
  emi_comfort: "comfortable" | "uncomfortable";
  education_level: string;
  first_language: string;
  family_size: number;
  primary_device: string;
  employer_type: string;
  purchasing_power_tier: string;
  current_insurance: boolean;
  existing_health_conditions: boolean;
  zone: string;
}

export interface PersonaDetail {
  persona_uuid: string;
  demographics: Demographics;
  professional_background: string;
  cultural_background: string;
  outcome: string;               // "dropped_off_at_view_3" | "completed"
  key_selections: Record<string, unknown>;
  final_price_inr: number | null;
  total_time_seconds: number;
  overall_monologue: string;
  screen_monologues: ScreenMonologue[];
}
