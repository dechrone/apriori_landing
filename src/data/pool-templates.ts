/**
 * Persona pool templates — design-time source of truth:
 * `/shared/pool_templates.json` at the monorepo root.
 *
 * This module imports a local mirror committed at
 * `landing/src/data/pool-templates.json`. The mirror is kept in sync with the
 * shared file by `scripts/sync-pool-templates.mjs`, which runs on predev and
 * prebuild. Keeping the mirror in the landing package means Vercel can deploy
 * landing standalone without needing the shared dir in its tree.
 *
 * If you add or rename a pool: edit `shared/pool_templates.json`, run
 * `npm run dev`, commit the updated mirror. Backend reads the shared file
 * directly and validates drift against `_POOL_FILTERS` at import time.
 */
import poolTemplatesJson from "./pool-templates.json";

export interface PoolTemplate {
  pool_id: string;
  display_name: string;
  description: string;
  ideal_customer_profile: string;
  example_companies: string[];
  country: "IN" | "US";
  target_size: number;
}

interface PoolTemplatesDoc {
  version: number;
  note?: string;
  pools: PoolTemplate[];
}

const doc = poolTemplatesJson as PoolTemplatesDoc;

export const POOL_TEMPLATES: readonly PoolTemplate[] = Object.freeze(doc.pools);

export function listPoolTemplates(country?: "IN" | "US"): PoolTemplate[] {
  return country
    ? POOL_TEMPLATES.filter((t) => t.country === country)
    : [...POOL_TEMPLATES];
}

export function getPoolTemplate(poolId: string): PoolTemplate | undefined {
  return POOL_TEMPLATES.find((t) => t.pool_id === poolId);
}
