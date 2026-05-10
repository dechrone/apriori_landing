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

// ---------------------------------------------------------------------------
// Audience-segments wizard (two-phase) — single-flow free-PM path.
// Phase 1: POST /start-product-flow → 9 generated segments + parallel PI.
// Phase 2: POST /{sim_id}/run-with-segments → run sim against the 5 picks.
// Re-use:  POST /start-from-saved-audience → run sim against cached uuids.
// ---------------------------------------------------------------------------

export interface ProductFlowStartPayload {
  name: string;
  description: string;
  country: "IN" | "US";
  optimizeMetric: string;
  objective?: string;
}

export interface RunWithSegmentsPayload {
  selectedSegmentIds: string[]; // exactly 5
  selectedFolderIds: string[];  // exactly 1
  optimizeMetric?: string;
  saveAudience?: boolean;
  audienceName?: string | null;
}

export interface RunAbWithSegmentsPayload {
  selectedSegmentIds: string[];      // exactly 5
  selectedFolderIds: string[];       // 2 for A/B (Variant A + B)
  optimizeMetric?: string;
  name?: string | null;
}

export interface StartFromSavedAudiencePayload {
  audienceId: string;
  name: string;
  country: "IN" | "US";
  optimizeMetric: string;
  objective?: string;
  selectedFolderIds: string[];
}

// Multi-flow comparator (legacy freeform-audience path; auto-picks segments
// internally until the comparator wizard adopts the two-phase flow).
export interface ProductFlowComparatorPayload {
  name: string;
  audience: string;
  numPersonas?: number;
  optimizeMetric: string;
  selectedFolderIds: string[];
  objective?: string;
  // Routing hints carried by the comparator/AB pages until they adopt the
  // two-phase wizard. Backend is tolerant: unknown ids fall back to auto-pick.
  poolId?: string;
  audienceId?: string;
  audienceTemplateId?: string;
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

// `refreshAudiencePersonas` (legacy `/api/v1/audiences/{id}/refresh-personas`)
// was deleted when the audience-segments wizard shipped. Saved audiences with
// a populated `cached_persona_uuids` are re-used directly via
// `startFromSavedAudience`; legacy rows show a "Regenerate cohorts" button
// that hits `startProductFlow` with the saved description.

/** POST /api/v1/simulations/start-product-flow — phase 1 of the audience-segments wizard.
 * Streams NDJSON: started → pool_routed → segments_ready → product_intelligence_ready
 *               → awaiting_segment_selection. Caller stashes simulation_id from the
 * `awaiting_segment_selection` event and calls runWithSegments to continue. */
export async function startProductFlow(
  profileId: string,
  payload: ProductFlowStartPayload
): Promise<Response> {
  const headers = await authHeaders();
  try {
    return await fetch(`${BASE_URL}/api/v1/simulations/start-product-flow`, {
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

/** POST /api/v1/simulations/{sim_id}/run-with-segments — phase 2.
 * Streams NDJSON: resumed → personas_loaded → persona_complete × N → insights_ready. */
export async function runWithSegments(
  simulationId: string,
  payload: RunWithSegmentsPayload
): Promise<Response> {
  const headers = await authHeaders();
  try {
    return await fetch(
      `${BASE_URL}/api/v1/simulations/${encodeURIComponent(simulationId)}/run-with-segments`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      }
    );
  } catch {
    throw new Error(
      `Cannot connect to the backend server at ${BASE_URL}. Please check your network and try again.`
    );
  }
}

/** POST /api/v1/simulations/{sim_id}/run-ab-with-segments — phase 2 (single-screen A/B).
 * Reuses the same phase 1 (`startProductFlow`) as single-flow; then runs the
 * comparator with the 5 picked segments against the 2 variant folders. */
export async function runAbWithSegments(
  simulationId: string,
  payload: RunAbWithSegmentsPayload
): Promise<Response> {
  const headers = await authHeaders();
  try {
    return await fetch(
      `${BASE_URL}/api/v1/simulations/${encodeURIComponent(simulationId)}/run-ab-with-segments`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      }
    );
  } catch {
    throw new Error(
      `Cannot connect to the backend server at ${BASE_URL}. Please check your network and try again.`
    );
  }
}

/** POST /api/v1/simulations/start-from-saved-audience — re-use a saved audience
 * with a populated cached_persona_uuids. Skips both segment generation and the picker. */
export async function startFromSavedAudience(
  profileId: string,
  payload: StartFromSavedAudiencePayload
): Promise<Response> {
  const headers = await authHeaders();
  try {
    return await fetch(`${BASE_URL}/api/v1/simulations/start-from-saved-audience`, {
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
