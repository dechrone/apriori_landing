/**
 * Client helpers that call the backend simulation engine.
 * Auth flows through the Supabase access token (JWT); the backend verifies
 * it with its SUPABASE_JWT_SECRET.
 */

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
    : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function authHeaders(): Promise<Record<string, string>> {
  const sb = getSupabaseBrowserClient();
  const { data } = await sb.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not signed in");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Optional audience plumbing the backend uses for:
 *   - audienceId:         persona cache key (skips LLM filter extraction on repeat runs)
 *   - audienceTemplateId: curated audience template (skips filter extraction entirely)
 *
 * Both are optional. If neither is supplied, the backend runs the full cold
 * retrieval pipeline keyed off `audience` (the free-text description).
 */
export interface AudienceRoutingHints {
  audienceId?: string;
  audienceTemplateId?: string;
}

export interface ProductFlowSimulationPayload extends AudienceRoutingHints {
  name: string;
  audience: string;
  /** Legacy bucket — kept for back-compat. Ignored when numPersonas is set. */
  personaDepth?: "low" | "medium" | "high";
  /** Explicit persona count, 1-50. Free PM wizard hardcodes this to 50. */
  numPersonas?: number;
  optimizeMetric: string;
  /** Free-text: what is this flow trying to achieve for the user? */
  objective?: string;
  selectedFolderIds: string[];
}

export interface AdPortfolioSimulationPayload extends AudienceRoutingHints {
  name: string;
  audience: string;
  selectedFolderId: string;
}

export interface ProductFlowComparatorPayload extends AudienceRoutingHints {
  name: string;
  audience: string;
  personaDepth: "low" | "medium" | "high";
  optimizeMetric: string;
  selectedFolderIds: string[];
}

// ---------------------------------------------------------------------------
// Audience templates (curated pre-defined audiences)
// ---------------------------------------------------------------------------

export interface AudienceTemplate {
  id: string;
  name: string;
  description: string;
  country: "IN" | "US";
  category: string;
  target_group_seed: string;
  pre_cached_uuids_count: number;
  filters: Record<string, unknown>;
}

/** GET /api/v1/audiences/templates */
export async function fetchAudienceTemplates(country?: string): Promise<AudienceTemplate[]> {
  const url = new URL(`${BASE_URL}/api/v1/audiences/templates`);
  if (country) url.searchParams.set("country", country);
  const res = await fetch(url.toString(), { method: "GET" });
  if (!res.ok) throw new Error(`Failed to load audience templates (${res.status})`);
  const data = (await res.json()) as { count: number; templates: AudienceTemplate[] };
  return data.templates ?? [];
}

/** POST /api/v1/audiences/{id}/refresh-personas — invalidate persona cache */
export async function refreshAudiencePersonas(audienceId: string): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/api/v1/audiences/${encodeURIComponent(audienceId)}/refresh-personas`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error(`Failed to refresh audience personas (${res.status})`);
}

/** POST /api/v1/simulations/product-flow with profileId + simulation payload */
export async function triggerProductFlowSimulation(
  profileId: string,
  payload: ProductFlowSimulationPayload
): Promise<Response> {
  const res = await fetch(`${BASE_URL}/api/v1/simulations/product-flow`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ profileId, ...payload }),
  });
  return res;
}

/** POST /api/v1/simulations/ad-portfolio with profileId + simulation payload */
export async function triggerAdPortfolioSimulation(
  profileId: string,
  payload: AdPortfolioSimulationPayload
): Promise<Response> {
  const res = await fetch(`${BASE_URL}/api/v1/simulations/ad-portfolio`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ profileId, ...payload }),
  });
  return res;
}

/** POST /api/v1/simulations/product-flow-comparator with profileId + simulation payload */
export async function triggerProductFlowComparatorSimulation(
  profileId: string,
  payload: ProductFlowComparatorPayload
): Promise<Response> {
  const res = await fetch(
    `${BASE_URL}/api/v1/simulations/product-flow-comparator`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({ profileId, ...payload }),
    }
  );
  return res;
}

// ---------------------------------------------------------------------------
// Server-persisted simulation results & public sharing
// ---------------------------------------------------------------------------

export interface ServerSimulationRecord<T = unknown> {
  simulation_id: string;
  uid: string;
  kind: string;
  name?: string;
  audience?: string;
  objective?: string;
  num_personas?: number;
  retrieval_mode?: string;
  public: boolean;
  public_share_id?: string;
  created_at?: string;
  updated_at?: string;
  result: T;
}

/** GET /api/v1/simulations/{id} — owner-scoped fetch (auth required). */
export async function fetchSimulationById<T = unknown>(
  simulationId: string,
): Promise<ServerSimulationRecord<T> | null> {
  const res = await fetch(
    `${BASE_URL}/api/v1/simulations/${encodeURIComponent(simulationId)}`,
    { method: "GET", headers: await authHeaders() },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load simulation (${res.status})`);
  return (await res.json()) as ServerSimulationRecord<T>;
}

export interface ShareToggleResponse {
  simulation_id: string;
  public: boolean;
  public_share_id: string | null;
  share_url_path: string | null;
}

/** POST /api/v1/simulations/{id}/share?enable=true|false — flip public visibility. */
export async function toggleSimulationShare(
  simulationId: string,
  enable: boolean,
): Promise<ShareToggleResponse> {
  const url = new URL(
    `${BASE_URL}/api/v1/simulations/${encodeURIComponent(simulationId)}/share`,
  );
  url.searchParams.set("enable", enable ? "true" : "false");
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: await authHeaders(),
  });
  if (!res.ok) throw new Error(`Failed to update sharing (${res.status})`);
  return (await res.json()) as ShareToggleResponse;
}

/** GET /api/v1/simulations/shared/{shareId} — no auth; the /r/[shareId] route calls this. */
export async function fetchSharedSimulation<T = unknown>(
  shareId: string,
): Promise<ServerSimulationRecord<T> | null> {
  const res = await fetch(
    `${BASE_URL}/api/v1/simulations/shared/${encodeURIComponent(shareId)}`,
    { method: "GET" },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load shared simulation (${res.status})`);
  return (await res.json()) as ServerSimulationRecord<T>;
}
