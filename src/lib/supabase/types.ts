/**
 * Minimal hand-written shape of the Supabase schema consumed by the frontend.
 * Mirrors supabase/schema.sql — keep in sync when you touch the SQL.
 *
 * Intentionally narrow: only the columns we read/write. Regenerate with
 * `supabase gen types typescript` if you want a richer schema-typed client.
 *
 * Note: we don't feed these into a strongly-typed SupabaseClient generic —
 * supabase-js's latest Database shape requires generated types. Instead,
 * we use these as row-level interfaces for conversion helpers in db.ts.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PlanTier = "free" | "pro" | "custom";
export type SimulationStatus = "draft" | "running" | "completed" | "failed";
export type AudienceStatus = "draft" | "active" | "archived";

export interface ProfileRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  plan: PlanTier;
  credits_remaining: number;
  credits_total: number;
  credits_used: number;
  has_seen_welcome: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreditTransactionRow {
  id: string;
  user_id: string;
  delta: number;
  reason: string;
  simulation_id: string | null;
  balance_after: number;
  metadata: Json | null;
  created_at: string;
}

export interface ProductContextRow {
  user_id: string;
  product_type: string | null;
  pricing_model: string | null;
  sales_motion: string | null;
  kpis: Json;
  constraints: string | null;
  updated_at: string;
}

export interface AudienceRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  audience_description: string | null;
  filters: Json | null;
  status: AudienceStatus;
  used_in_simulations: number;
  demographics: Json;
  psychographics: Json;
  budget: string | null;
  risk: string | null;
  identity: Json | null;
  firmographics: Json | null;
  goals: Json | null;
  pain_points: Json | null;
  decision_behavior: Json | null;
  budget_details: Json | null;
  created_at: string;
  updated_at: string;
}

export interface SimulationRow {
  id: string;
  user_id: string;
  type: string;
  status: SimulationStatus;
  name: string;
  metric: string | null;
  timestamp_label: string | null;
  simulation_id: string | null;
  result: Json | null;
  /** simul2design Multiverse Synthesis Engine output. Populated server-side by
   * the comparator route on `synthesis_ready` (~5 min after `comparison_ready`).
   * Null until the cascade runs. See SynthesisReadyData in @/types/ab-report. */
  synthesis: Json | null;
  /** Lever-driven design combiner output. Populated server-side by the
   * comparator route on `design_combiner_ready` (~2 min after `comparison_ready`).
   * Carries `combined_variant_image_url` (Supabase Storage public URL), the full combiner
   * `result` dict, and an `input_summary` describing what was fused. Null
   * until the combiner runs. See DesignCombinerReadyData in @/types/ab-report. */
  design_combiner: Json | null;
  /** Pro-tier revalidation result. Populated when the combined variant is
   * re-simulated against the same persona pool. Carries `validated_lift` +
   * `completion_rate_combined`. Null when revalidation flag was off. */
  revalidation: Json | null;
  credits_spent: number;
  created_at: string;
  updated_at: string;
}

export interface AssetFolderRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  asset_type: string;
  parent_id: string | null;
  asset_count: number;
  used_in_simulations: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AssetRow {
  id: string;
  user_id: string;
  folder_id: string;
  name: string;
  url: string | null;
  storage_path: string | null;
  asset_type: string;
  status: string;
  source: string | null;
  product_flow_metadata: Json | null;
  ad_creative_metadata: Json | null;
  linked_simulation_ids: Json;
  created_at: string;
  updated_at: string;
}

export interface SignupRow {
  id: string;
  name: string | null;
  email: string;
  company: string | null;
  role: string | null;
  building: string | null;
  source: string | null;
  user_agent: string | null;
  created_at: string;
}
