import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client bound to the current request's cookies.
 * Use from Route Handlers, Server Components, and Server Actions.
 *
 * The cookie adapter silently ignores write errors in Server Components
 * (where cookies are read-only). Refresh-then-set is handled by the
 * callback route at /auth/callback.
 */
export async function getSupabaseServerClient(): Promise<SupabaseClient> {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: CookieOptions }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — cookie writes aren't allowed
          // there. The /auth/callback Route Handler handles the actual
          // write during the OAuth exchange.
        }
      },
    },
  });
}
