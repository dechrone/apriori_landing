/**
 * Audience & Persona Management — Data Model
 * PRD: Audience types, sections, and lifecycle.
 */

export type AudienceType =
  | 'b2b-decision-maker'
  | 'b2b-influencer'
  | 'b2c-end-user'
  | 'custom';

export type AudienceStatus = 'draft' | 'active' | 'archived';

export type ReportingStructure = 'ic' | 'manager' | 'exec';

export type CompanyStage =
  | 'seed'
  | 'series-a'
  | 'series-b'
  | 'series-c'
  | 'growth'
  | 'enterprise';

export type TeamMaturity = 'early' | 'scaling' | 'mature';

export type BuyingMotion = 'founder-led' | 'committee-led' | 'hybrid';

export type ProcurementComplexity = 'low' | 'medium' | 'high';

export type Severity = 'low' | 'medium' | 'existential';

export type DecisionSpeed = 'immediate' | 'considered' | 'slow';

export type ChangeResistance = 'low' | 'medium' | 'high';

export type BudgetFlexibility = 'fixed' | 'flexible' | 'expandable';

// --- Section 1: Identity & Context ---
export interface IdentityContext {
  audienceName: string;
  audienceType: AudienceType;
  primaryRole: string;
  secondaryRoles?: string;
  reportingStructure?: ReportingStructure;
}

// --- Section 2: Firmographics ---
export interface Firmographics {
  companySizeMin?: number;
  companySizeMax?: number;
  revenueRange?: string;
  companyStage?: CompanyStage;
  industryPrimary?: string;
  industrySecondary?: string;
  geographyHQ?: string;
  geographyMarkets?: string;
  teamMaturity?: TeamMaturity;
  buyingMotion?: BuyingMotion;
  procurementComplexity?: ProcurementComplexity;
}

// --- Section 3: Goals & Success Metrics ---
export interface GoalsMetrics {
  businessGoal1?: string;
  businessGoal2?: string;
  businessGoal3?: string;
  personalSuccessMetrics?: string;
  timeHorizon?: 'short' | 'medium' | 'long';
}

// --- Section 4: Pain Points ---
export interface PainPoints {
  topProblems?: string;
  problemSeverity?: Severity;
  currentWorkarounds?: string;
  triedBefore?: string;
}

// --- Section 5: Decision-Making Behavior ---
export interface DecisionBehavior {
  riskAppetite: number; // 0–100 slider: Conservative → Aggressive
  dataDependency?: 'gut-driven' | 'balanced' | 'metrics-driven';
  decisionSpeed?: DecisionSpeed;
  trustThreshold?: string;
  changeResistance?: ChangeResistance;
  openToNewTools?: boolean;
  prefersBestInClass?: boolean;
  vendorLockInSensitive?: boolean;
}

// --- Section 6: Budget & Economics ---
export interface BudgetEconomics {
  budgetRange?: string;
  budgetFlexibility?: BudgetFlexibility;
  approvalRequired?: boolean;
  willingnessToPay?: string;
}

// --- Full Audience ---
export interface Audience {
  id: string;
  status: AudienceStatus;
  createdAt: string;
  updatedAt: string;
  usedInSimulations?: number;
  confidenceScore?: number; // 0–100, system-generated
  identity: IdentityContext;
  firmographics?: Firmographics;
  goals?: GoalsMetrics;
  painPoints?: PainPoints;
  decisionBehavior: DecisionBehavior;
  budget?: BudgetEconomics;
}

// --- Form state (for create/edit) ---
export interface AudienceFormState {
  identity: IdentityContext;
  firmographics: Firmographics;
  goals: GoalsMetrics;
  painPoints: PainPoints;
  decisionBehavior: DecisionBehavior;
  budget: BudgetEconomics;
}

export const DEFAULT_IDENTITY: IdentityContext = {
  audienceName: '',
  audienceType: 'b2b-decision-maker',
  primaryRole: '',
  secondaryRoles: '',
  reportingStructure: undefined,
};

export const DEFAULT_FIRMOGRAPHICS: Firmographics = {};

export const DEFAULT_GOALS: GoalsMetrics = {};

export const DEFAULT_PAIN_POINTS: PainPoints = {};

export const DEFAULT_DECISION_BEHAVIOR: DecisionBehavior = {
  riskAppetite: 50,
};

export const DEFAULT_BUDGET: BudgetEconomics = {};

export const DEFAULT_AUDIENCE_FORM: AudienceFormState = {
  identity: DEFAULT_IDENTITY,
  firmographics: DEFAULT_FIRMOGRAPHICS,
  goals: DEFAULT_GOALS,
  painPoints: DEFAULT_PAIN_POINTS,
  decisionBehavior: DEFAULT_DECISION_BEHAVIOR,
  budget: DEFAULT_BUDGET,
};
