"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// Memoize on globalThis so Turbopack/Next HMR module re-evaluation doesn't
// hand out a second client and race the first one for the auth-token
// Web Lock (manifests as "Lock ... was released because another request
// stole it" + AuthRetryableFetchError on dashboard load).
declare global {
  // eslint-disable-next-line no-var
  var __aprioriSupabaseBrowserClient: SupabaseClient | undefined;
}

/**
 * Browser-side Supabase client. Singleton — reused across the SPA so the auth
 * session stays in sync. Safe to call from any client component.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (globalThis.__aprioriSupabaseBrowserClient) {
    return globalThis.__aprioriSupabaseBrowserClient;
  }
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY env vars. " +
      "Add them to .env.local (see supabase/README.md)."
    );
  }
  globalThis.__aprioriSupabaseBrowserClient = createBrowserClient(url, anon);
  return globalThis.__aprioriSupabaseBrowserClient;
}
