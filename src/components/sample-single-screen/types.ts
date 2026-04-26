export interface ReportMeta {
  study_name: string;
  client: string;
  screen_label: string;
  persona_count: number;
  runs_per_persona: number;
  generated_at: string;
}

export interface Verdict {
  sentence: string;
  confidence: "high" | "medium" | "low";
}

export interface ShipItem {
  id: string;
  action: "keep" | "kill" | "revisit";
  source_variant: "A" | "B" | "both" | "neither";
  feature: string;
  rationale: string;
  bullet: string;
  confidence: "high" | "medium" | "low";
  markdown: string;
}

export interface Anchor {
  x: number;
  y: number;
}

export interface ScreenElement {
  id: string;
  label: string;
  anchor: Anchor;
  verdict: "lift" | "drag" | "tradeoff";
  callout: string;
  persona_count: number;
  summary: string;
}

export interface AnnotatedVariant {
  image_path: string;
  elements: ScreenElement[];
}

export interface AnnotatedScreens {
  variant_a: AnnotatedVariant;
  variant_b: AnnotatedVariant;
}

export interface ReactionItem {
  name: string;
  source: "A" | "B" | "both" | "neither";
}

export interface PersonaReactions {
  loved: ReactionItem[];
  disliked: ReactionItem[];
  tolerated?: ReactionItem[];
  mixed?: ReactionItem[];
  needs?: ReactionItem[];
}

export interface PersonaSplit {
  segment: string;
  persona_count: number;
  preferred_variant: "A" | "B" | "neither";
  reactions: PersonaReactions;
  interpretation: string;
}

export interface FrictionItem {
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  persona_count: number;
  note: string;
}

export interface FrictionProvenance {
  variant_a: FrictionItem[];
  variant_b: FrictionItem[];
}

export interface MonologueDiff {
  persona_id: string;
  persona_name: string;
  segment: string;
  variant_a_monologue: string;
  variant_b_monologue: string;
  inflection: string;
  decision_a: "convert" | "hesitate" | "abandon";
  decision_b: "convert" | "hesitate" | "abandon";
}

export interface Report {
  meta: ReportMeta;
  verdict: Verdict;
  ship_list: ShipItem[];
  annotated_screens: AnnotatedScreens;
  persona_split: PersonaSplit[];
  friction_provenance: FrictionProvenance;
  monologue_diff: MonologueDiff[];
  deep_dive?: DeepDive;
}

/* ── Deep Dive types ── */

export interface DeepDive {
  personas: PersonaDeepDive[];
}

export interface PersonaVariantExperience {
  outcome: "convert" | "hesitate" | "abandon";
  monologue: string;
  primary_emotion: string;
  why: string;
  liked: string[];
  disliked: string[];
  /** @deprecated kept for backward compat — use `why` */
  reasoning?: string;
  /** @deprecated */
  secondary_emotions?: string[];
  /** @deprecated */
  scores?: { trust: number; clarity: number };
  /** @deprecated */
  friction?: Array<{ category: "trust" | "clarity" | "ux"; text: string }>;
}

export interface PersonaDeepDive {
  id: string;
  name: string;
  segment: string;
  archetype: string;
  occupation: string;
  age: number;
  city: string;
  income_band: string;
  tags: string[];
  behavior_summary: string;
  variant_a: PersonaVariantExperience;
  variant_b: PersonaVariantExperience;
  overall_reflection: {
    text: string;
    leaning: "A" | "B" | "neither";
  };
}
