/**
 * Client-side helper: upload a file to Cloudinary via our API and get back the URL.
 * The API builds a unique public_id from account name, company name, and image name.
 */

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
}

export async function uploadAssetToCloudinary(
  file: File,
  clerkId: string,
  folderId: string,
  options?: { accountName?: string; companyName?: string }
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("clerkId", clerkId);
  formData.append("folderId", folderId);
  if (options?.accountName) formData.append("accountName", options.accountName);
  if (options?.companyName) formData.append("companyName", options.companyName);

  const res = await fetch("/api/upload-asset", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Upload failed (${res.status})`);
  }

  return res.json() as Promise<CloudinaryUploadResult>;
}
