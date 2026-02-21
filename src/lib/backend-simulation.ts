/**
 * Trigger backend API when user runs a simulation.
 * Base URL: localhost:8080 for now (override with NEXT_PUBLIC_BACKEND_URL).
 */

const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
    : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface ProductFlowSimulationPayload {
  name: string;
  audience: string;
  personaDepth: "low" | "medium" | "high";
  optimizeMetric: string;
  selectedFolderIds: string[];
}

export interface AdPortfolioSimulationPayload {
  name: string;
  audience: string;
  selectedFolderId: string;
}

/** POST /api/v1/simulations/product-flow with profileId + simulation payload */
export async function triggerProductFlowSimulation(
  profileId: string,
  payload: ProductFlowSimulationPayload
): Promise<Response> {
  const res = await fetch(`${BASE_URL}/api/v1/simulations/product-flow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profileId, ...payload }),
  });
  return res;
}
