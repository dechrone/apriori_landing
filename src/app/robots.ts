import type { MetadataRoute } from "next";

/**
 * robots.txt for apriori.work.
 *
 * App Router convention: this file is automatically served at /robots.txt.
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 *
 * Allow all crawlers on public marketing + demo report pages. Disallow auth
 * endpoints, the auth-gated app shell, API routes, the OAuth callback, and
 * per-user share links (which are unguessable share URLs, not meant for
 * search indexing).
 */

const SITE_URL = "https://apriori.work";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          // Override the broader `/simulations/` block below for the public
          // frozen SaveSage case study. Google/Bing resolve conflicting rules
          // by longest/most-specific match, so this `Allow` wins over the
          // shorter `Disallow: /simulations/` for any URL under this prefix.
          // Keep this in sync with /case-studies + sitemap entries.
          "/simulations/savesage/",
        ],
        disallow: [
          "/api/",
          "/auth/",
          "/sign-in",
          "/sign-up",
          "/r/",
          // Auth-gated app shell (the /(app) route group resolves to these
          // top-level paths; none of them should appear in search results).
          "/dashboard",
          "/settings",
          "/pricing",
          "/assets",
          "/audiences",
          "/live-url",
          "/product-context",
          // Block the broader /simulations namespace (user-run reports).
          // The public /simulations/savesage/* reports are re-allowed above.
          "/simulations/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
