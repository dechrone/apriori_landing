import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function DELETE(request: NextRequest) {
  try {
    const { clerkId, folderId, assetId } = await request.json();

    if (!clerkId || !folderId || !assetId) {
      return NextResponse.json(
        { error: "Missing required fields: clerkId, folderId, assetId" },
        { status: 400 }
      );
    }

    // Delete the asset document
    const assetRef = adminDb
      .collection("apriori_users")
      .doc(clerkId)
      .collection("assetFolders")
      .doc(folderId)
      .collection("assets")
      .doc(assetId);

    const assetSnap = await assetRef.get();
    if (!assetSnap.exists) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: 404 }
      );
    }

    await assetRef.delete();

    // Update the folder's assetCount
    const folderRef = adminDb
      .collection("apriori_users")
      .doc(clerkId)
      .collection("assetFolders")
      .doc(folderId);

    const folderSnap = await folderRef.get();
    if (folderSnap.exists) {
      const currentCount = folderSnap.data()?.assetCount ?? 1;
      await folderRef.update({
        assetCount: Math.max(0, currentCount - 1),
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[delete-asset] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
