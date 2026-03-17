/**
 * Firestore service layer.
 * All data is scoped under apriori_users/{userId}/...
 * Firebase Auth handles authentication.
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  type DocumentReference,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type { AssetFolder, Asset } from "@/types/asset";

/** Firestore does not allow `undefined`; strip those keys before writing. */
function withoutUndefined<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Record<string, unknown>;
}

/** Recursively strip undefined so nested objects (e.g. audience.identity) are valid. */
function deepWithoutUndefined(value: unknown): unknown {
  if (value === undefined) return undefined;
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepWithoutUndefined);
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, deepWithoutUndefined(v)])
      .filter(([, v]) => v !== undefined)
  );
}

/** Type-safe wrapper – Firestore's UpdateData type doesn't accept `unknown` values. */
async function safeUpdateDoc(
  ref: DocumentReference<DocumentData, DocumentData>,
  data: Record<string, unknown>
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await updateDoc(ref, data as Record<string, any>);
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: unknown;
  updatedAt: unknown;
}

export async function createUserProfile(
  userId: string,
  data: Omit<UserProfile, "userId" | "createdAt" | "updatedAt">
): Promise<void> {
  const userRef = doc(db, "apriori_users", userId);
  const existing = await getDoc(userRef);
  if (existing.exists()) return; // profile already created
  await setDoc(
    userRef,
    withoutUndefined({
      userId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "apriori_users", userId));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

// ─── Product Context ───────────────────────────────────────────────────────────

export interface ProductContextData {
  productType: string;
  pricingModel: string;
  salesMotion: string;
  kpis: string[];
  constraints: string;
}

export async function saveProductContext(
  userId: string,
  data: ProductContextData
): Promise<void> {
  const cleaned = deepWithoutUndefined({ ...data, updatedAt: serverTimestamp() });
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await setDoc(
    doc(db, "apriori_users", userId, "productContext", "settings"),
    cleaned as Record<string, unknown>,
    { merge: true }
  );
}

export async function getProductContext(
  userId: string
): Promise<ProductContextData | null> {
  const snap = await getDoc(doc(db, "apriori_users", userId, "productContext", "settings"));
  return snap.exists() ? (snap.data() as ProductContextData) : null;
}

// ─── Audiences ────────────────────────────────────────────────────────────────

/** Stored audience; includes filter tree and description so nothing is lost. */
export type AudienceDoc = {
  id: string;
  name: string;
  description?: string;
  /** Natural language audience description from Step 2 */
  audienceDescription?: string;
  /** Root filter group from the builder (condition tree). */
  filters?: unknown;
  status: "draft" | "active" | "archived";
  usedInSimulations: number;
  demographics: string[];
  psychographics: string[];
  budget: string;
  risk: string;
  /** Full identity/firmographics/goals/etc. when using full audience form. */
  identity?: unknown;
  firmographics?: unknown;
  goals?: unknown;
  painPoints?: unknown;
  decisionBehavior?: unknown;
  budgetDetails?: unknown;
  createdAt: unknown;
  updatedAt: unknown;
};

export async function saveAudience(
  userId: string,
  audience: Omit<AudienceDoc, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const cleaned = deepWithoutUndefined(audience);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return "";
  const payload = {
    ...(cleaned as Record<string, unknown>),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(
    collection(db, "apriori_users", userId, "audiences"),
    payload as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateAudience(
  userId: string,
  audienceId: string,
  updates: Partial<Omit<AudienceDoc, "id" | "createdAt">>
): Promise<void> {
  const cleaned = deepWithoutUndefined(updates);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await safeUpdateDoc(
    doc(db, "apriori_users", userId, "audiences", audienceId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() }
  );
}

export async function deleteAudience(userId: string, audienceId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", userId, "audiences", audienceId));
}

export async function getAudiences(userId: string): Promise<AudienceDoc[]> {
  const q = query(
    collection(db, "apriori_users", userId, "audiences"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AudienceDoc));
}

export async function getAudience(userId: string, audienceId: string): Promise<AudienceDoc | null> {
  const snap = await getDoc(doc(db, "apriori_users", userId, "audiences", audienceId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as AudienceDoc;
}

// ─── Simulations ──────────────────────────────────────────────────────────────

export type SimulationDoc = {
  id: string;
  type: string;
  status: "draft" | "running" | "completed" | "failed";
  name: string;
  metric: string;
  timestamp: string;
  /** Backend simulation id from API response */
  simulationId?: string;
  /** Full result from backend (ad or product_flow) */
  result?: unknown;
  createdAt: unknown;
  updatedAt: unknown;
};

export async function saveSimulation(
  userId: string,
  simulation: Omit<SimulationDoc, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const cleaned = deepWithoutUndefined(simulation);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return "";
  const docRef = await addDoc(
    collection(db, "apriori_users", userId, "simulations"),
    {
      ...(cleaned as Record<string, unknown>),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateSimulation(
  userId: string,
  simulationId: string,
  updates: Partial<Omit<SimulationDoc, "id" | "createdAt">>
): Promise<void> {
  const cleaned = deepWithoutUndefined(updates);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await safeUpdateDoc(
    doc(db, "apriori_users", userId, "simulations", simulationId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() }
  );
}

export async function deleteSimulation(userId: string, simulationId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", userId, "simulations", simulationId));
}

export async function getSimulations(userId: string): Promise<SimulationDoc[]> {
  const q = query(
    collection(db, "apriori_users", userId, "simulations"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SimulationDoc));
}

export async function getSimulation(
  userId: string,
  simulationDocId: string
): Promise<SimulationDoc | null> {
  const snap = await getDoc(doc(db, "apriori_users", userId, "simulations", simulationDocId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as SimulationDoc) : null;
}

// ─── Asset Folders ────────────────────────────────────────────────────────────

export async function saveAssetFolder(
  userId: string,
  folder: Omit<AssetFolder, "id">,
  options?: { parentId?: string | null }
): Promise<string> {
  const parentId = options?.parentId ?? folder.parentId ?? null;
  const docRef = await addDoc(
    collection(db, "apriori_users", userId, "assetFolders"),
    withoutUndefined({ ...folder, parentId, updatedAt: serverTimestamp() }) as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateAssetFolder(
  userId: string,
  folderId: string,
  updates: Partial<Omit<AssetFolder, "id">>
): Promise<void> {
  const cleaned = deepWithoutUndefined(updates);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await safeUpdateDoc(
    doc(db, "apriori_users", userId, "assetFolders", folderId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() }
  );
}

export async function deleteAssetFolder(userId: string, folderId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", userId, "assetFolders", folderId));
}

/**
 * Get asset folders. When parentId is null/undefined, returns root folders only
 * (parentId null or missing, for backwards compatibility). When parentId is a string,
 * returns subfolders of that folder.
 */
export async function getAssetFolders(
  userId: string,
  parentId?: string | null
): Promise<AssetFolder[]> {
  const coll = collection(db, "apriori_users", userId, "assetFolders");
  if (parentId != null && parentId !== "") {
    // Simple equality query — no composite index needed.
    // Sort client-side to avoid requiring a Firestore composite index on parentId + createdAt.
    const q = query(coll, where("parentId", "==", parentId));
    const snap = await getDocs(q);
    const folders = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AssetFolder));
    return folders.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  // Root folders: fetch all and filter (so folders without parentId still count as roots)
  const q = query(coll, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AssetFolder));
  return all.filter((f) => f.parentId == null || f.parentId === "");
}

// ─── Assets (images: upload via Cloudinary; URL + public_id stored in Firestore) ─

export async function saveAssetMetadata(
  userId: string,
  folderId: string,
  assetId: string,
  asset: Omit<Asset, "id">
): Promise<void> {
  const cleaned = deepWithoutUndefined(asset);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await setDoc(
    doc(db, "apriori_users", userId, "assetFolders", folderId, "assets", assetId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() } as Record<string, unknown>,
    { merge: true }
  );
}

export async function getAssetsInFolder(
  userId: string,
  folderId: string
): Promise<Asset[]> {
  const q = query(
    collection(db, "apriori_users", userId, "assetFolders", folderId, "assets"),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Asset));
}

export async function deleteAssetMetadata(
  userId: string,
  folderId: string,
  assetId: string
): Promise<void> {
  await deleteDoc(
    doc(db, "apriori_users", userId, "assetFolders", folderId, "assets", assetId)
  );
}

/** Add a new asset document (e.g. after uploading file to Storage). Strips undefined. */
export async function addAssetDocument(
  userId: string,
  folderId: string,
  asset: Record<string, unknown>,
  storagePath: string
): Promise<string> {
  const cleaned = deepWithoutUndefined({ ...asset, storagePath });
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return "";
  const docRef = await addDoc(
    collection(db, "apriori_users", userId, "assetFolders", folderId, "assets"),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() } as Record<string, unknown>
  );
  return docRef.id;
}
