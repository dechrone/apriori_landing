import type { MetadataRoute } from "next";

/**
 * Public sitemap for apriori.work.
 *
 * App Router convention: this file is automatically served at /sitemap.xml.
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Only public, indexable pages live here. Auth-gated app routes (dashboard,
 * settings, /sign-in, /sign-up, the /(app) group), API handlers, OAuth
 * callback, and per-user share links (/r/[shareId]) are intentionally
 * excluded — they're either gated, dynamic with no canonical list, or have
 * zero SEO value.
 */

const SITE_URL = "https://apriori.work";

// Single shared `lastModified` so the sitemap is stable across builds. Bump
// this whenever you ship a meaningful content change to the marketing site,
// or replace with a per-page timestamp if/when you wire content to a CMS.
const LAST_MODIFIED = new Date("2026-06-11");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Marketing ──────────────────────────────────────────────────────────
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/research`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Demo / case-study reports ─────────────────────────────────────────
    // /demo/univest is the canonical entry for the Univest case study. The
    // per-variant deep-dives /demo/univest1…6 are intentionally OMITTED here:
    // they remain reachable from /case-studies for users, but each variant
    // page declares `alternates.canonical = /demo/univest` so search engines
    // consolidate ranking signals on the main URL instead of competing
    // against six near-duplicates. Keep the two in sync.
    {
      url: `${SITE_URL}/demo/univest`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/simulations/savesage/1ef345g7hjklo9`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Conversion endpoints ──────────────────────────────────────────────
    {
      url: `${SITE_URL}/signup`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/joinwaitlist`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
