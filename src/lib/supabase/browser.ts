"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Browser-side Supabase client. Singleton — reused across the SPA so the auth
 * session stays in sync. Safe to call from any client component.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (_client) return _client;
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY env vars. " +
      "Add them to .env.local (see supabase/README.md)."
    );
  }
  _client = createBrowserClient(url, anon);
  return _client;
}
