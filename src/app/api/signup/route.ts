import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role } = body;

    // Server-side validation
    if (!name || !email || !company || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for duplicate email
    const existing = await adminDb
      .collection("apriori_signups")
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    await adminDb.collection("apriori_signups").add({
      name: name.trim(),
      email: normalizedEmail,
      company: company.trim(),
      role,
      submittedAt: new Date().toISOString(),
      source: "signup-landing",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Signup API Error]", error);
    return NextResponse.json(
      { error: "Failed to save registration" },
      { status: 500 }
    );
  }
}
