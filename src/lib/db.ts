/**
 * Supabase data layer.
 * Every read/write here runs as the currently-authenticated user; RLS in
 * Postgres guarantees users can only touch their own rows. No service-role
 * key is used client-side.
 *
 * Shapes match the legacy data-layer types so call sites don't change.
 */

"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type {
  AudienceRow,
  SimulationRow,
  ProfileRow,
  AssetFolderRow,
  AssetRow,
  ProductContextRow,
  Json,
} from "@/lib/supabase/types";
import type { AssetFolder, Asset } from "@/types/asset";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  plan: "free" | "pro" | "custom";
  creditsRemaining: number;
  creditsTotal: number;
  creditsUsed: number;
  hasSeenWelcome: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductContextData {
  productType: string;
  pricingModel: string;
  salesMotion: string;
  kpis: string[];
  constraints: string;
}

/** Stored audience; includes filter tree and description so nothing is lost. */
export type AudienceDoc = {
  id: string;
  name: string;
  description?: string;
  audienceDescription?: string;
  filters?: unknown;
  status: "draft" | "active" | "archived";
  usedInSimulations: number;
  demographics: string[];
  psychographics: string[];
  budget: string;
  risk: string;
  identity?: unknown;
  firmographics?: unknown;
  goals?: unknown;
  painPoints?: unknown;
  decisionBehavior?: unknown;
  budgetDetails?: unknown;
  createdAt: string;
  updatedAt: string;
};

export type SimulationDoc = {
  id: string;
  type: string;
  status: "draft" | "running" | "completed" | "failed";
  name: string;
  metric: string;
  timestamp: string;
  simulationId?: string;
  result?: unknown;
  /** simul2design Multiverse Synthesis Engine payload — populated ~5min after
   * comparison_ready by the backend's `synthesis_ready` UPDATE. Null until then. */
  synthesis?: unknown;
  /** Lever-driven design combiner payload — populated ~2min after
   * comparison_ready by the backend's `design_combiner_ready` UPDATE. Carries
   * `combined_variant_image_url` (Supabase Storage public URL), the full combiner result, and
   * an `input_summary` of what was fused. Null until the combiner runs. */
  designCombiner?: unknown;
  /** Pro-tier revalidation payload (validated_lift + combined-variant
   * insights) — populated by the `revalidation_ready` UPDATE. Null when
   * the revalidation flag was off. */
  revalidation?: unknown;
  creditsSpent?: number;
  /** ISO timestamp, or null for UI-only sample rows that never hit the DB. */
  createdAt: string | null;
  updatedAt: string | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rowToProfile(r: ProfileRow): UserProfile {
  return {
    userId: r.id,
    email: r.email,
    firstName: r.first_name ?? undefined,
    lastName: r.last_name ?? undefined,
    displayName: r.display_name ?? undefined,
    avatarUrl: r.avatar_url ?? undefined,
    plan: r.plan,
    creditsRemaining: r.credits_remaining,
    creditsTotal: r.credits_total,
    creditsUsed: r.credits_used,
    hasSeenWelcome: r.has_seen_welcome,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function rowToAudience(r: AudienceRow): AudienceDoc {
  const demographics = Array.isArray(r.demographics) ? (r.demographics as string[]) : [];
  const psychographics = Array.isArray(r.psychographics) ? (r.psychographics as string[]) : [];
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? undefined,
    audienceDescription: r.audience_description ?? undefined,
    filters: r.filters ?? undefined,
    status: r.status,
    usedInSimulations: r.used_in_simulations,
    demographics,
    psychographics,
    budget: r.budget ?? "",
    risk: r.risk ?? "",
    identity: r.identity ?? undefined,
    firmographics: r.firmographics ?? undefined,
    goals: r.goals ?? undefined,
    painPoints: r.pain_points ?? undefined,
    decisionBehavior: r.decision_behavior ?? undefined,
    budgetDetails: r.budget_details ?? undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function rowToSimulation(r: SimulationRow): SimulationDoc {
  return {
    id: r.id,
    type: r.type,
    status: r.status,
    name: r.name,
    metric: r.metric ?? "",
    timestamp: r.timestamp_label ?? "",
    simulationId: r.simulation_id ?? undefined,
    result: r.result ?? undefined,
    synthesis: r.synthesis ?? undefined,
    designCombiner: r.design_combiner ?? undefined,
    revalidation: r.revalidation ?? undefined,
    creditsSpent: r.credits_spent,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function rowToFolder(r: AssetFolderRow): AssetFolder {
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? undefined,
    assetType: r.asset_type as AssetFolder["assetType"],
    parentId: r.parent_id,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    assetCount: r.asset_count,
    usedInSimulations: r.used_in_simulations,
    status: r.status as AssetFolder["status"],
  };
}

function rowToAsset(r: AssetRow): Asset {
  return {
    id: r.id,
    folderId: r.folder_id,
    name: r.name,
    url: r.url ?? "",
    assetType: r.asset_type as Asset["assetType"],
    createdAt: r.created_at,
    status: r.status as Asset["status"],
    productFlowMetadata: (r.product_flow_metadata ?? undefined) as Asset["productFlowMetadata"],
    adCreativeMetadata: (r.ad_creative_metadata ?? undefined) as Asset["adCreativeMetadata"],
    linkedSimulationIds: Array.isArray(r.linked_simulation_ids)
      ? (r.linked_simulation_ids as string[])
      : undefined,
  };
}

function rowToProductContext(r: ProductContextRow): ProductContextData {
  const kpis = Array.isArray(r.kpis) ? (r.kpis as string[]) : [];
  return {
    productType: r.product_type ?? "",
    pricingModel: r.pricing_model ?? "",
    salesMotion: r.sales_motion ?? "",
    kpis,
    constraints: r.constraints ?? "",
  };
}

/** Strip keys whose value is undefined so Supabase doesn't set them to null. */
function clean<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

function orThrow<T>(label: string, { data, error }: { data: T | null; error: unknown }): T {
  if (error) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`${label}: ${msg}`);
  }
  if (data === null || data === undefined) {
    throw new Error(`${label}: empty response`);
  }
  return data;
}

// ─── User profile ─────────────────────────────────────────────────────────────

/**
 * Profile rows are created server-side by the `handle_new_user` trigger when
 * a new auth.users row appears. This function exists so callers can force an
 * upsert if the trigger hasn't fired yet (e.g. brand-new OAuth user with a
 * race against the first dashboard hit).
 */
export async function createUserProfile(
  userId: string,
  data: { email: string; firstName?: string; lastName?: string }
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("profiles")
    .upsert(
      clean({
        id: userId,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
      }),
      { onConflict: "id", ignoreDuplicates: true }
    );
  if (error && !/duplicate/i.test(error.message)) {
    // Common case: trigger already inserted; nothing to do.
    console.warn("[createUserProfile]", error.message);
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(`getUserProfile: ${error.message}`);
  return data ? rowToProfile(data) : null;
}

export async function markWelcomeSeen(userId: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("profiles")
    .update({ has_seen_welcome: true })
    .eq("id", userId);
  if (error) throw new Error(`markWelcomeSeen: ${error.message}`);
}

// ─── Product context ──────────────────────────────────────────────────────────

export async function saveProductContext(
  userId: string,
  data: ProductContextData
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb.from("product_context").upsert(
    {
      user_id: userId,
      product_type: data.productType,
      pricing_model: data.pricingModel,
      sales_motion: data.salesMotion,
      kpis: data.kpis as unknown as Json,
      constraints: data.constraints,
    },
    { onConflict: "user_id" }
  );
  if (error) throw new Error(`saveProductContext: ${error.message}`);
}

export async function getProductContext(
  userId: string
): Promise<ProductContextData | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("product_context")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`getProductContext: ${error.message}`);
  return data ? rowToProductContext(data) : null;
}

// ─── Audiences ────────────────────────────────────────────────────────────────

type AudiencePayload = Omit<AudienceDoc, "id" | "createdAt" | "updatedAt">;

function audienceToRow(userId: string, a: Partial<AudiencePayload>) {
  return clean({
    user_id: userId,
    name: a.name,
    description: a.description,
    audience_description: a.audienceDescription,
    filters: (a.filters ?? undefined) as Json | undefined,
    status: a.status,
    used_in_simulations: a.usedInSimulations,
    demographics: (a.demographics ?? undefined) as unknown as Json | undefined,
    psychographics: (a.psychographics ?? undefined) as unknown as Json | undefined,
    budget: a.budget,
    risk: a.risk,
    identity: (a.identity ?? undefined) as Json | undefined,
    firmographics: (a.firmographics ?? undefined) as Json | undefined,
    goals: (a.goals ?? undefined) as Json | undefined,
    pain_points: (a.painPoints ?? undefined) as Json | undefined,
    decision_behavior: (a.decisionBehavior ?? undefined) as Json | undefined,
    budget_details: (a.budgetDetails ?? undefined) as Json | undefined,
  });
}

export async function saveAudience(
  userId: string,
  audience: AudiencePayload
): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("audiences")
    .insert(audienceToRow(userId, audience))
    .select("id")
    .single();
  const row = orThrow("saveAudience", { data, error });
  return row.id;
}

export async function updateAudience(
  userId: string,
  audienceId: string,
  updates: Partial<AudiencePayload>
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("audiences")
    .update(audienceToRow(userId, updates))
    .eq("id", audienceId)
    .eq("user_id", userId);
  if (error) throw new Error(`updateAudience: ${error.message}`);
}

export async function deleteAudience(userId: string, audienceId: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("audiences")
    .delete()
    .eq("id", audienceId)
    .eq("user_id", userId);
  if (error) throw new Error(`deleteAudience: ${error.message}`);
}

export async function getAudiences(userId: string): Promise<AudienceDoc[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("audiences")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getAudiences: ${error.message}`);
  return (data ?? []).map(rowToAudience);
}

export async function getAudience(
  userId: string,
  audienceId: string
): Promise<AudienceDoc | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("audiences")
    .select("*")
    .eq("id", audienceId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`getAudience: ${error.message}`);
  return data ? rowToAudience(data) : null;
}

// ─── Simulations ──────────────────────────────────────────────────────────────

type SimulationPayload = Omit<SimulationDoc, "id" | "createdAt" | "updatedAt">;

function simulationToRow(userId: string, s: Partial<SimulationPayload>) {
  return clean({
    user_id: userId,
    type: s.type,
    status: s.status,
    name: s.name,
    metric: s.metric,
    timestamp_label: s.timestamp,
    simulation_id: s.simulationId,
    result: (s.result ?? undefined) as Json | undefined,
    credits_spent: s.creditsSpent,
  });
}

export async function saveSimulation(
  userId: string,
  simulation: SimulationPayload
): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("simulations")
    .insert(simulationToRow(userId, simulation))
    .select("id")
    .single();
  const row = orThrow("saveSimulation", { data, error });
  return row.id;
}

export async function updateSimulation(
  userId: string,
  simulationId: string,
  updates: Partial<SimulationPayload>
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("simulations")
    .update(simulationToRow(userId, updates))
    .eq("id", simulationId)
    .eq("user_id", userId);
  if (error) throw new Error(`updateSimulation: ${error.message}`);
}

export async function deleteSimulation(userId: string, simulationId: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("simulations")
    .delete()
    .eq("id", simulationId)
    .eq("user_id", userId);
  if (error) throw new Error(`deleteSimulation: ${error.message}`);
}

export async function getSimulations(userId: string): Promise<SimulationDoc[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("simulations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getSimulations: ${error.message}`);
  return (data ?? []).map(rowToSimulation);
}

export async function getSimulation(
  userId: string,
  simulationDocId: string
): Promise<SimulationDoc | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("simulations")
    .select("*")
    .eq("id", simulationDocId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`getSimulation: ${error.message}`);
  return data ? rowToSimulation(data) : null;
}

// ─── Asset folders ────────────────────────────────────────────────────────────

export async function saveAssetFolder(
  userId: string,
  folder: Omit<AssetFolder, "id">,
  options?: { parentId?: string | null }
): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const parentId = options?.parentId ?? folder.parentId ?? null;
  const { data, error } = await sb
    .from("asset_folders")
    .insert(
      clean({
        user_id: userId,
        name: folder.name,
        description: folder.description,
        asset_type: folder.assetType,
        parent_id: parentId,
        asset_count: folder.assetCount,
        used_in_simulations: folder.usedInSimulations,
        status: folder.status,
      })
    )
    .select("id")
    .single();
  const row = orThrow("saveAssetFolder", { data, error });
  return row.id;
}

export async function updateAssetFolder(
  userId: string,
  folderId: string,
  updates: Partial<Omit<AssetFolder, "id">>
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("asset_folders")
    .update(
      clean({
        name: updates.name,
        description: updates.description,
        asset_type: updates.assetType,
        parent_id: updates.parentId,
        asset_count: updates.assetCount,
        used_in_simulations: updates.usedInSimulations,
        status: updates.status,
      })
    )
    .eq("id", folderId)
    .eq("user_id", userId);
  if (error) throw new Error(`updateAssetFolder: ${error.message}`);
}

export async function deleteAssetFolder(userId: string, folderId: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("asset_folders")
    .delete()
    .eq("id", folderId)
    .eq("user_id", userId);
  if (error) throw new Error(`deleteAssetFolder: ${error.message}`);
}

/**
 * When parentId is null/undefined, returns root folders (parent_id IS NULL).
 * When parentId is a string, returns the children of that folder.
 */
export async function getAssetFolders(
  userId: string,
  parentId?: string | null
): Promise<AssetFolder[]> {
  const sb = getSupabaseBrowserClient();
  let query = sb.from("asset_folders").select("*").eq("user_id", userId);

  if (parentId != null && parentId !== "") {
    query = query.eq("parent_id", parentId).order("created_at", { ascending: true });
  } else {
    query = query.is("parent_id", null).order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw new Error(`getAssetFolders: ${error.message}`);
  return (data ?? []).map(rowToFolder);
}

// ─── Assets ──────────────────────────────────────────────────────────────────

export async function saveAssetMetadata(
  userId: string,
  folderId: string,
  assetId: string,
  asset: Omit<Asset, "id">
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("assets")
    .upsert(
      clean({
        id: assetId,
        user_id: userId,
        folder_id: folderId,
        name: asset.name,
        url: asset.url,
        asset_type: asset.assetType,
        status: asset.status,
        product_flow_metadata: asset.productFlowMetadata as unknown as Json | undefined,
        ad_creative_metadata: asset.adCreativeMetadata as unknown as Json | undefined,
        linked_simulation_ids: (asset.linkedSimulationIds ?? undefined) as unknown as Json | undefined,
      }),
      { onConflict: "id" }
    );
  if (error) throw new Error(`saveAssetMetadata: ${error.message}`);
}

export async function getAssetsInFolder(
  userId: string,
  folderId: string
): Promise<Asset[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("assets")
    .select("*")
    .eq("user_id", userId)
    .eq("folder_id", folderId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`getAssetsInFolder: ${error.message}`);
  return (data ?? []).map(rowToAsset);
}

export async function deleteAssetMetadata(
  userId: string,
  folderId: string,
  assetId: string
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("assets")
    .delete()
    .eq("id", assetId)
    .eq("folder_id", folderId)
    .eq("user_id", userId);
  if (error) throw new Error(`deleteAssetMetadata: ${error.message}`);
}

/** Create an asset row (e.g. after uploading to Supabase Storage / Figma CDN). */
export async function addAssetDocument(
  userId: string,
  folderId: string,
  asset: Record<string, unknown>,
  storagePath: string
): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("assets")
    .insert(
      clean({
        user_id: userId,
        folder_id: folderId,
        name: (asset.name as string) ?? "Untitled",
        url: (asset.url as string | undefined) ?? null,
        storage_path: storagePath,
        asset_type: (asset.assetType as string) ?? "product-flow",
        status: (asset.status as string) ?? "missing-info",
        source: (asset.source as string | undefined) ?? null,
        product_flow_metadata: (asset.productFlowMetadata ?? undefined) as Json | undefined,
        ad_creative_metadata: (asset.adCreativeMetadata ?? undefined) as Json | undefined,
      })
    )
    .select("id")
    .single();
  const row = orThrow("addAssetDocument", { data, error });
  return row.id;
}

// ─── Credits ──────────────────────────────────────────────────────────────────

export interface CreditProfile {
  userId: string;
  email: string;
  displayName: string;
  plan: "free" | "pro" | "custom";
  creditsRemaining: number;
  creditsTotal: number;
  creditsUsed: number;
}

/**
 * Pulls the authenticated user's credit + plan summary in a single round trip.
 * Replaces the legacy GET /api/v1/auth/me call, which lived on the backend
 * while auth was on Firebase.
 */
export async function fetchCreditProfile(userId: string): Promise<CreditProfile> {
  const profile = await getUserProfile(userId);
  if (!profile) throw new Error("profile_not_found");
  return {
    userId: profile.userId,
    email: profile.email,
    displayName: profile.displayName || profile.firstName || profile.email,
    plan: profile.plan,
    creditsRemaining: profile.creditsRemaining,
    creditsTotal: profile.creditsTotal,
    creditsUsed: profile.creditsUsed,
  };
}

/** Recent credit-ledger entries for a "transactions" UI (newest first). */
export async function getCreditHistory(
  userId: string,
  limit = 50
): Promise<
  Array<{
    id: string;
    delta: number;
    reason: string;
    balanceAfter: number;
    simulationId: string | null;
    createdAt: string;
  }>
> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`getCreditHistory: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id,
    delta: r.delta,
    reason: r.reason,
    balanceAfter: r.balance_after,
    simulationId: r.simulation_id,
    createdAt: r.created_at,
  }));
}

/**
 * Atomic client-side credit debit. Returns new remaining balance or null if
 * the user didn't have enough credits (caller should route to /pricing).
 */
export async function debitCredits(
  amount: number,
  reason: string,
  simulationId?: string
): Promise<{ ok: true; remaining: number } | { ok: false; reason: "insufficient_credits" | "error"; message: string }> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb.rpc("debit_credits", {
    _amount: amount,
    _reason: reason,
    _simulation_id: simulationId ?? null,
  });
  if (error) {
    if (/insufficient_credits/i.test(error.message)) {
      return { ok: false, reason: "insufficient_credits", message: error.message };
    }
    return { ok: false, reason: "error", message: error.message };
  }
  const remaining = Array.isArray(data) && data[0] ? data[0].remaining : 0;
  return { ok: true, remaining };
}

/** Reverse a prior debit (e.g. when a simulation fails server-side). */
export async function refundCredits(
  amount: number,
  reason: string,
  simulationId?: string
): Promise<number> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb.rpc("refund_credits", {
    _amount: amount,
    _reason: reason,
    _simulation_id: simulationId ?? null,
  });
  if (error) throw new Error(`refundCredits: ${error.message}`);
  return Array.isArray(data) && data[0] ? data[0].remaining : 0;
}
