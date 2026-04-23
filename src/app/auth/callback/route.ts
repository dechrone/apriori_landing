import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * OAuth redirect target. Exchanges the `?code=` query param for a session
 * (setting the auth cookie via the server-side adapter) and then redirects
 * to `?next=`.
 *
 * Supabase calls us here after Google OAuth completes. Same route handles
 * email magic-link confirmation if we add it later.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/sign-in?error=missing_code", url.origin));
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    const msg = encodeURIComponent(error.message);
    return NextResponse.redirect(new URL(`/sign-in?error=${msg}`, url.origin));
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
