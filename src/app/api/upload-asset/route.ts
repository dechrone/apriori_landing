import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

/**
 * Build a unique public_id: apriori/{accountSlug}/{companySlug}/{folderId}/{timestamp}_{imageSlug}
 * Safe for Cloudinary (alphanumeric, underscores, slashes).
 */
function slug(str: string): string {
  return str
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_.-]/g, "")
    .replace(/_{2,}/g, "_")
    .slice(0, 100) || "asset";
}

const CLOUDINARY_CLOUD_NAME = "da9uwccqm";
const CLOUDINARY_API_KEY = "922121495748568";

export async function POST(request: NextRequest) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_API_SECRET in .env.local." },
      { status: 500 }
    );
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: apiSecret,
  });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  const clerkId = formData.get("clerkId")?.toString();
  const folderId = formData.get("folderId")?.toString();
  const accountName = formData.get("accountName")?.toString() || clerkId || "account";
  const companyName = formData.get("companyName")?.toString() || "default";

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing or invalid file." }, { status: 400 });
  }
  if (!clerkId || !folderId) {
    return NextResponse.json({ error: "Missing clerkId or folderId." }, { status: 400 });
  }

  const timestamp = Date.now();
  const imageSlug = slug(file.name.replace(/\.[^.]+$/, ""));
  const publicId = `apriori/${slug(accountName)}/${slug(companyName)}/${folderId}/${timestamp}_${imageSlug}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<NextResponse>((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: error.message || "Cloudinary upload failed." },
              { status: 502 }
            )
          );
          return;
        }
        if (!result?.secure_url) {
          resolve(
            NextResponse.json(
              { error: "No URL returned from Cloudinary." },
              { status: 502 }
            )
          );
          return;
        }
        resolve(
          NextResponse.json({
            url: result.secure_url,
            public_id: result.public_id,
          })
        );
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}
