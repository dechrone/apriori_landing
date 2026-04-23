#!/usr/bin/env node
/**
 * Sync persona pool templates from the monorepo-root `shared/` dir into
 * `landing/src/data/pool-templates.json`, then verify the committed copy
 * matches the source.
 *
 * Runs on `npm run dev` / `npm run build`.
 *
 * - Monorepo dev (shared/pool_templates.json exists): copy shared → local.
 * - Vercel / standalone landing deploy (no shared/ dir): no-op. The committed
 *   local copy at src/data/pool-templates.json is used as-is.
 *
 * To change pool metadata: edit the shared JSON, run `npm run dev`, commit the
 * updated src/data/pool-templates.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LANDING_ROOT = path.resolve(__dirname, "..");
const SHARED_SRC = path.resolve(LANDING_ROOT, "..", "shared", "pool_templates.json");
const LOCAL_DST = path.join(LANDING_ROOT, "src", "data", "pool-templates.json");

if (!fs.existsSync(SHARED_SRC)) {
  if (!fs.existsSync(LOCAL_DST)) {
    console.error(`[sync-pool-templates] FATAL: neither ${SHARED_SRC} nor ${LOCAL_DST} exists.`);
    process.exit(1);
  }
  console.log(`[sync-pool-templates] shared/ not present — using committed copy at ${path.relative(LANDING_ROOT, LOCAL_DST)}.`);
  process.exit(0);
}

const sourceBytes = fs.readFileSync(SHARED_SRC);
const sourceDoc = JSON.parse(sourceBytes.toString("utf8"));
if (!Array.isArray(sourceDoc.pools) || sourceDoc.pools.length === 0) {
  console.error(`[sync-pool-templates] FATAL: ${SHARED_SRC} has no pools.`);
  process.exit(1);
}

const existing = fs.existsSync(LOCAL_DST) ? fs.readFileSync(LOCAL_DST) : null;
if (existing && existing.equals(sourceBytes)) {
  console.log(`[sync-pool-templates] in sync (${sourceDoc.pools.length} pools).`);
  process.exit(0);
}

fs.writeFileSync(LOCAL_DST, sourceBytes);
console.log(
  `[sync-pool-templates] copied ${sourceDoc.pools.length} pools: ` +
  `${path.relative(LANDING_ROOT, SHARED_SRC)} → ${path.relative(LANDING_ROOT, LOCAL_DST)}`,
);
