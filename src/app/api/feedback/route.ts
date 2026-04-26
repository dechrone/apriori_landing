import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const ALLOWED_KINDS = ["issue", "idea", "question"] as const;
type FeedbackKind = (typeof ALLOWED_KINDS)[number];

interface FeedbackPayload {
  kind: FeedbackKind;
  message: string;
  email?: string | null;
  path?: string | null;
}

async function notify(payload: FeedbackPayload, uid: string | null) {
  const webhook = process.env.FEEDBACK_WEBHOOK_URL;
  if (!webhook) return;
  const text =
    `*New Apriori feedback* — _${payload.kind}_\n` +
    `From: ${payload.email ?? "anonymous"}${uid ? ` (${uid})` : ""}\n` +
    `Path: ${payload.path ?? "n/a"}\n\n` +
    payload.message;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    console.error("[feedback] webhook failed", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<FeedbackPayload>;
    const kind = body.kind as FeedbackKind | undefined;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!kind || !ALLOWED_KINDS.includes(kind)) {
      return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    const sb = getSupabaseAdminClient();

    let uid: string | null = null;
    const auth = request.headers.get("authorization");
    if (auth?.startsWith("Bearer ")) {
      const token = auth.slice(7);
      const { data: userRes } = await sb.auth.getUser(token);
      uid = userRes?.user?.id ?? null;
    }

    const email = (body.email && String(body.email).trim().toLowerCase()) || null;
    const path = (body.path && String(body.path).slice(0, 200)) || null;

    const { error: insertErr } = await sb.from("feedback").insert({
      user_id: uid,
      email,
      kind,
      message,
      path,
    });
    if (insertErr) throw insertErr;

    await notify({ kind, message, email, path }, uid);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[Feedback API Error]", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
