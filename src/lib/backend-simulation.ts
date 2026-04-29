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
 *   - poolId:             pre-selected persona pool (see shared/pool_templates.json) —
 *                         tells the backend to skip pool-picking in the audience router
 *                         and only sub-segment within the chosen pool.
 *
 * All three are optional. If none are supplied, the backend runs the full cold
 * retrieval pipeline keyed off `audience` (the free-text description).
 */
export interface AudienceRoutingHints {
  audienceId?: string;
  audienceTemplateId?: string;
  poolId?: string;
}

export interface ProductFlowSimulationPayload extends AudienceRoutingHints {
  name: string;
  audience: string;
  /** Persona count, 1-50. Backend defaults to 25. */
  numPersonas?: number;
  optimizeMetric: string;
  /** Free-text: what is this flow trying to achieve for the user? */
  objective?: string;
  selectedFolderIds: string[];
}

export interface ProductFlowComparatorPayload extends AudienceRoutingHints {
  name: string;
  audience: string;
  /** Persona count, 1-100. Same set is reused across every variant. Backend defaults to 25. */
  numPersonas?: number;
  optimizeMetric: string;
  selectedFolderIds: string[];
  objective?: string;
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

/**
 * Primary source: static JSON at `/shared/pool_templates.json` — no backend
 * round-trip, no empty-state when the API is down. Shape-compat with the
 * legacy backend `/audiences/templates` response so the wizard code stays
 * identical.
 */
async function loadLocalPoolTemplates(country?: string): Promise<AudienceTemplate[]> {
  const { listPoolTemplates } = await import("@/data/pool-templates");
  const typedCountry = country === "US" || country === "IN" ? country : undefined;
  return listPoolTemplates(typedCountry).map((p) => ({
    id: p.pool_id,
    name: p.display_name,
    description: p.description,
    country: p.country,
    category: p.ideal_customer_profile,
    target_group_seed: `${p.display_name}, ${p.description}`,
    pre_cached_uuids_count: p.target_size,
    filters: {},
  }));
}

/**
 * Fetch curated audience templates.
 *
 * Reads from the local shared JSON by default — the picker renders even when
 * the backend is down. If that ever fails (e.g. bundling mishap), falls back
 * to the backend endpoint.
 */
export async function fetchAudienceTemplates(country?: string): Promise<AudienceTemplate[]> {
  try {
    return await loadLocalPoolTemplates(country);
  } catch (err) {
    console.warn("[templates] local JSON load failed, falling back to backend:", err);
    const url = new URL(`${BASE_URL}/api/v1/audiences/templates`);
    if (country) url.searchParams.set("country", country);
    const res = await fetch(url.toString(), { method: "GET" });
    if (!res.ok) throw new Error(`Failed to load audience templates (${res.status})`);
    const data = (await res.json()) as { count: number; templates: AudienceTemplate[] };
    return data.templates ?? [];
  }
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
  const headers = await authHeaders();
  try {
    return await fetch(`${BASE_URL}/api/v1/simulations/product-flow`, {
      method: "POST",
      headers,
      body: JSON.stringify({ profileId, ...payload }),
    });
  } catch {
    throw new Error(
      `Cannot connect to the backend server at ${BASE_URL}. Please check your network and try again.`
    );
  }
}

/** POST /api/v1/simulations/product-flow-comparator with profileId + simulation payload */
export async function triggerProductFlowComparatorSimulation(
  profileId: string,
  payload: ProductFlowComparatorPayload
): Promise<Response> {
  const headers = await authHeaders();
  try {
    return await fetch(
      `${BASE_URL}/api/v1/simulations/product-flow-comparator`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ profileId, ...payload }),
      }
    );
  } catch {
    throw new Error(
      `Cannot connect to the backend server at ${BASE_URL}. Please check your network and try again.`
    );
  }
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
