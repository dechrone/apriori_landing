import type { ScreenMonologue } from "@/types/flow-analysis";

export type ScoreLevel = "low" | "mid" | "high";
// low = 1–4, mid = 5–6, high = 7–10

export type FrictionCategory = "trust" | "clarity" | "ux";
// trust   = trust, brand, security, data concerns
// clarity = comprehension, jargon, missing info
// ux      = flow, timer, navigation, layout

export interface CategorisedFrictionPoint {
  text: string;
  category: FrictionCategory;
}

export interface FrictionPattern {
  id: string;
  title: string;
  category: FrictionCategory;
  count: number; // personas sharing this pattern
  total: number; // total personas on this screen
  personaUuids: string[];
  description: string;
}

export interface ScreenSummary {
  screenId: string; // "view_1"
  screenLabel: string; // "S1 · KYC"
  dropOffCount: number;
  totalPersonas: number;
  avgTrust: number;
  avgClarity: number;
}

export interface JourneyNode {
  screenId: string;
  screenLabel: string;
  trustScore: number;
  clarityScore: number;
  timeSeconds: number;
  topEmotion: string; // first item from emotional_state CSV
  outcome: "CONTINUE" | "DROP_OFF";
  monologue: ScreenMonologue;
}
