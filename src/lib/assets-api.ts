/**
 * Backend HTTP client for the Assets API.
 * All functions require a Supabase access token (JWT) obtained via
 * `useAuthContext().getAccessToken()`.
 * Base URL: NEXT_PUBLIC_BACKEND_URL (defaults to http://localhost:8000).
 */

import type { AssetFolder, Asset, AssetType, AssetStatus } from "@/types/asset";
import type { ProductFlowMetadata, AdCreativeMetadata } from "@/types/asset";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// ─── Response shapes from the backend ─────────────────────────────────────────

export interface BackendFolder {
  id: string;
  name: string;
  asset_type: AssetType;
  description?: string;
  parent_id?: string | null;
  asset_count: number;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface BackendAsset {
  id: string;
  folder_id: string;
  name: string;
  url: string;
  asset_type: AssetType;
  created_at: string;
  status?: AssetStatus;
  product_flow_metadata?: ProductFlowMetadata;
  ad_creative_metadata?: AdCreativeMetadata;
}

// ─── Conversion helpers ────────────────────────────────────────────────────────

function toAssetFolder(bf: BackendFolder): AssetFolder {
  return {
    id: bf.id,
    name: bf.name,
    assetType: bf.asset_type,
    description: bf.description,
    parentId: bf.parent_id ?? null,
    createdAt: bf.created_at,
    updatedAt: bf.updated_at,
    assetCount: bf.asset_count,
    usedInSimulations: 0,
    status: (bf.status as AssetFolder["status"]) ?? "ready",
  };
}

function toAsset(ba: BackendAsset): Asset {
  return {
    id: ba.id,
    folderId: ba.folder_id,
    name: ba.name,
    url: ba.url,
    assetType: ba.asset_type,
    createdAt: ba.created_at,
    status: ba.status ?? "missing-info",
    productFlowMetadata: ba.product_flow_metadata,
    adCreativeMetadata: ba.ad_creative_metadata,
  };
}

// ─── Shared fetch helper ───────────────────────────────────────────────────────

type Token = string | null | undefined;

async function apiFetch<T>(
  token: Token,
  path: string,
  options?: RequestInit
): Promise<T> {
  if (!token) throw new Error("Not signed in");
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    throw new Error(
      `Cannot connect to the backend server at ${BASE_URL}. Please ensure it is running.`
    );
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Folder operations ─────────────────────────────────────────────────────────

export async function getFolders(token: Token): Promise<AssetFolder[]> {
  const folders = await apiFetch<BackendFolder[]>(
    token,
    "/api/v1/assets/folders"
  );
  return folders.map(toAssetFolder);
}

export async function createFolder(
  token: Token,
  data: { name: string; assetType: AssetType; description?: string }
): Promise<AssetFolder> {
  const folder = await apiFetch<BackendFolder>(
    token,
    "/api/v1/assets/folders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        asset_type: data.assetType,
        description: data.description,
      }),
    }
  );
  return toAssetFolder(folder);
}

export async function updateFolder(
  token: Token,
  folderId: string,
  data: { name?: string; description?: string }
): Promise<void> {
  await apiFetch<unknown>(token, `/api/v1/assets/folders/${folderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteFolder(
  token: Token,
  folderId: string
): Promise<void> {
  await apiFetch<unknown>(token, `/api/v1/assets/folders/${folderId}`, {
    method: "DELETE",
  });
}

// ─── Asset operations ──────────────────────────────────────────────────────────

export async function getAssets(
  token: Token,
  folderId: string
): Promise<Asset[]> {
  const assets = await apiFetch<BackendAsset[]>(
    token,
    `/api/v1/assets/folders/${folderId}/assets`
  );
  return assets.map(toAsset);
}

export async function uploadAssets(
  token: Token,
  folderId: string,
  files: File[]
): Promise<Asset[]> {
  if (!token) throw new Error("Not signed in");
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await fetch(
    `${BASE_URL}/api/v1/assets/folders/${folderId}/assets`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Upload failed: ${res.status}`);
  }
  const assets = (await res.json()) as BackendAsset[];
  return assets.map(toAsset);
}

export async function updateAssetMetadata(
  token: Token,
  assetId: string,
  folderId: string,
  metadata: Partial<ProductFlowMetadata> | Partial<AdCreativeMetadata>
): Promise<void> {
  await apiFetch<unknown>(
    token,
    `/api/v1/assets/${assetId}?folderId=${folderId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata),
    }
  );
}

export async function deleteAsset(
  token: Token,
  assetId: string,
  folderId: string
): Promise<void> {
  await apiFetch<unknown>(
    token,
    `/api/v1/assets/${assetId}?folderId=${folderId}`,
    { method: "DELETE" }
  );
}
