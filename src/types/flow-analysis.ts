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
