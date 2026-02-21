export type Decision =
  | 'clicked_high_intent'
  | 'clicked_low_intent'
  | 'viewed_no_click'
  | 'rejected'
  | 'high_vulnerability';

export type IncomeTier = 'high' | 'mid' | 'low';
export type GeographyType = 'urban' | 'rural';
export type DeviceType = 'mobile' | 'desktop' | 'both';

export interface PersonaReaction {
  persona_id: string;
  persona_name: string;
  occupation: string;
  income_tier: IncomeTier;
  digital_literacy: number;
  vulnerability_level: 'high' | 'low';
  geography_type: GeographyType;
  device_type: DeviceType;
  decision: Decision;
  high_intent: boolean;
  trust_score: number;
  relevance_score: number;
  confidence_score: number;
  click_probability?: number;
  positive_triggers: string[];
  negative_frictions: string[];
  trust_drivers: string[];
  trust_breakers: string[];
  initial_impression: string;
  decision_driver: string;
  risk_flag: boolean;
  counterfactual?: {
    change: string;
    probability_before: number;
    probability_after: number;
  };
}

export interface AdSummary {
  id: string;
  name: string;
  desc: string;
  ctr: number;
  ctrCi: number;
  highIntent: number;
  trust: number;
  trustCi: number;
  relevance: number;
  sims: number;
  riskScore?: number;
}

export interface PersonaFilters {
  income_tier: IncomeTier | 'all';
  digital_literacy_min: number;
  digital_literacy_max: number;
  vulnerability: 'high' | 'low' | 'all';
  geography: GeographyType | 'all';
  device_type: DeviceType | 'all';
}

export interface PatternInsight {
  id: string;
  label: string;
  type: 'click_reason' | 'rejection_cause' | 'segment_mismatch' | 'risk_signal' | 'literacy_mismatch' | 'claim_sensitivity';
  persona_count: number;
  confidence: number;
  statistically_significant: boolean;
  description: string;
}
