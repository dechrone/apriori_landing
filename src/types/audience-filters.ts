/**
 * Advanced audience filter data model for Step 2 of the Create Audience flow.
 * Covers demographics, location, income, behaviour, psychographics, digital habits.
 */

export type FilterLogic = "AND" | "OR";

export interface DemographicsFilter {
  ageMin?: number;
  ageMax?: number;
  gender?: "Male" | "Female" | "Other" | null;
  education?: string[];
  occupation?: string[];
  maritalStatus?: string[];
}

export interface LocationFilter {
  cityTiers?: ("Tier 1" | "Tier 2" | "Tier 3" | "Rural")[];
  states?: string[];
  cities?: string[];
}

export interface IncomeFilter {
  monthlyMin?: number;
  monthlyMax?: number;
  annualMin?: number;
  annualMax?: number;
  incomeBracket?: string;
  householdSizeMin?: number;
  householdSizeMax?: number;
}

export interface BehaviourFilter {
  purchaseFrequency?: string;
  highCartAbandonment?: boolean;
  churnRisk?: "Low" | "Medium" | "High";
  avgOrderValueMin?: number;
  avgOrderValueMax?: number;
  lifetimeValue?: "Low" | "Medium" | "High";
}

export interface PsychographicsFilter {
  brandLoyalty?: "Low" | "Medium" | "High";
  priceSensitivity?: "Low" | "Medium" | "High";
  riskAppetite?: "Low" | "Medium" | "High";
}

export interface DigitalFilter {
  primaryDevice?: string[];
  paymentApps?: string[];
  ecommercePlatforms?: string[];
  internetConnection?: string;
}

export interface AdvancedFilters {
  logic: FilterLogic;
  demographics?: DemographicsFilter;
  location?: LocationFilter;
  income?: IncomeFilter;
  behaviour?: BehaviourFilter;
  psychographics?: PsychographicsFilter;
  digital?: DigitalFilter;
}

export type FilterCategory =
  | "demographics"
  | "location"
  | "income"
  | "behaviour"
  | "psychographics"
  | "digital";

export interface AudiencePayload {
  name: string;
  description?: string;
  audienceDescription?: string;
  filters?: AdvancedFilters;
}

/** Template definition */
export interface AudienceTemplate {
  id: string;
  icon: string;
  name: string;
  chips: string[];
  text: string;
}
