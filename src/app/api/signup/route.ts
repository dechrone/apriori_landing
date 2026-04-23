import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Landing-page signup endpoint. Inserts a row into public.signups via the
 * service-role client (bypasses RLS). Dedupes on (lower(email), source).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role } = body;

    if (!name || !email || !company || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const source = "signup-landing";
    const sb = getSupabaseAdminClient();

    const { data: existing, error: lookupErr } = await sb
      .from("signups")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("source", source)
      .limit(1);

    if (lookupErr) throw lookupErr;
    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    const { error: insertErr } = await sb.from("signups").insert({
      name: String(name).trim(),
      email: normalizedEmail,
      company: String(company).trim(),
      role: String(role),
      source,
    });
    if (insertErr) throw insertErr;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Signup API Error]", error);
    return NextResponse.json(
      { error: "Failed to save registration" },
      { status: 500 }
    );
  }
}
