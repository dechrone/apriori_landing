/**
 * Trigger backend API when user runs a simulation.
 * Base URL: localhost:8080 for now (override with NEXT_PUBLIC_BACKEND_URL).
 */

import { auth } from "@/lib/firebase";

const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
    : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

/**
 * Resolve the current Firebase ID token for authenticated requests.
 * Throws if the user is not signed in — callers must gate on auth state first.
 */
async function authHeaders(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not signed in");
  const token = await user.getIdToken();
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
  personaDepth: "low" | "medium" | "high";
  optimizeMetric: string;
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
