/**
 * Firestore service layer.
 * All data is scoped under apriori_users/{clerkUserId}/...
 * Firebase Auth is not used — Clerk handles authentication.
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

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: unknown;
  updatedAt: unknown;
}

export async function createUserProfile(
  clerkId: string,
  data: Omit<UserProfile, "clerkId" | "createdAt" | "updatedAt">
): Promise<void> {
  const userRef = doc(db, "apriori_users", clerkId);
  const existing = await getDoc(userRef);
  if (existing.exists()) return; // profile already created
  await setDoc(
    userRef,
    withoutUndefined({
      clerkId,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
}

export async function getUserProfile(clerkId: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "apriori_users", clerkId));
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
  clerkId: string,
  data: ProductContextData
): Promise<void> {
  await setDoc(
    doc(db, "apriori_users", clerkId, "productContext", "settings"),
    withoutUndefined({ ...data, updatedAt: serverTimestamp() }) as Record<string, unknown>,
    { merge: true }
  );
}

export async function getProductContext(
  clerkId: string
): Promise<ProductContextData | null> {
  const snap = await getDoc(doc(db, "apriori_users", clerkId, "productContext", "settings"));
  return snap.exists() ? (snap.data() as ProductContextData) : null;
}

// ─── Audiences ────────────────────────────────────────────────────────────────

/** Stored audience; includes filter tree and description so nothing is lost. */
export type AudienceDoc = {
  id: string;
  name: string;
  description?: string;
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
  clerkId: string,
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
    collection(db, "apriori_users", clerkId, "audiences"),
    payload as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateAudience(
  clerkId: string,
  audienceId: string,
  updates: Partial<Omit<AudienceDoc, "id" | "createdAt">>
): Promise<void> {
  const cleaned = deepWithoutUndefined(updates);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await updateDoc(
    doc(db, "apriori_users", clerkId, "audiences", audienceId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() } as Record<string, unknown>
  );
}

export async function deleteAudience(clerkId: string, audienceId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", clerkId, "audiences", audienceId));
}

export async function getAudiences(clerkId: string): Promise<AudienceDoc[]> {
  const q = query(
    collection(db, "apriori_users", clerkId, "audiences"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AudienceDoc));
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
  clerkId: string,
  simulation: Omit<SimulationDoc, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(
    collection(db, "apriori_users", clerkId, "simulations"),
    withoutUndefined({
      ...simulation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }) as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateSimulation(
  clerkId: string,
  simulationId: string,
  updates: Partial<Omit<SimulationDoc, "id" | "createdAt">>
): Promise<void> {
  await updateDoc(
    doc(db, "apriori_users", clerkId, "simulations", simulationId),
    withoutUndefined({ ...updates, updatedAt: serverTimestamp() }) as Record<string, unknown>
  );
}

export async function deleteSimulation(clerkId: string, simulationId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", clerkId, "simulations", simulationId));
}

export async function getSimulations(clerkId: string): Promise<SimulationDoc[]> {
  const q = query(
    collection(db, "apriori_users", clerkId, "simulations"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SimulationDoc));
}

export async function getSimulation(
  clerkId: string,
  simulationDocId: string
): Promise<SimulationDoc | null> {
  const snap = await getDoc(doc(db, "apriori_users", clerkId, "simulations", simulationDocId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as SimulationDoc) : null;
}

// ─── Asset Folders ────────────────────────────────────────────────────────────

export async function saveAssetFolder(
  clerkId: string,
  folder: Omit<AssetFolder, "id">
): Promise<string> {
  const docRef = await addDoc(
    collection(db, "apriori_users", clerkId, "assetFolders"),
    withoutUndefined({ ...folder, updatedAt: serverTimestamp() }) as Record<string, unknown>
  );
  return docRef.id;
}

export async function updateAssetFolder(
  clerkId: string,
  folderId: string,
  updates: Partial<Omit<AssetFolder, "id">>
): Promise<void> {
  await updateDoc(
    doc(db, "apriori_users", clerkId, "assetFolders", folderId),
    withoutUndefined({ ...updates, updatedAt: serverTimestamp() }) as Record<string, unknown>
  );
}

export async function deleteAssetFolder(clerkId: string, folderId: string): Promise<void> {
  await deleteDoc(doc(db, "apriori_users", clerkId, "assetFolders", folderId));
}

export async function getAssetFolders(clerkId: string): Promise<AssetFolder[]> {
  const q = query(
    collection(db, "apriori_users", clerkId, "assetFolders"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AssetFolder));
}

// ─── Assets (images: upload via Cloudinary; URL + public_id stored in Firestore) ─

export async function saveAssetMetadata(
  clerkId: string,
  folderId: string,
  assetId: string,
  asset: Omit<Asset, "id">
): Promise<void> {
  const cleaned = deepWithoutUndefined(asset);
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return;
  await setDoc(
    doc(db, "apriori_users", clerkId, "assetFolders", folderId, "assets", assetId),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() } as Record<string, unknown>,
    { merge: true }
  );
}

export async function getAssetsInFolder(
  clerkId: string,
  folderId: string
): Promise<Asset[]> {
  const q = query(
    collection(db, "apriori_users", clerkId, "assetFolders", folderId, "assets"),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Asset));
}

export async function deleteAssetMetadata(
  clerkId: string,
  folderId: string,
  assetId: string
): Promise<void> {
  await deleteDoc(
    doc(db, "apriori_users", clerkId, "assetFolders", folderId, "assets", assetId)
  );
}

/** Add a new asset document (e.g. after uploading file to Storage). Strips undefined. */
export async function addAssetDocument(
  clerkId: string,
  folderId: string,
  asset: Record<string, unknown>,
  storagePath: string
): Promise<string> {
  const cleaned = deepWithoutUndefined({ ...asset, storagePath });
  if (cleaned === undefined || typeof cleaned !== "object" || Array.isArray(cleaned)) return "";
  const docRef = await addDoc(
    collection(db, "apriori_users", clerkId, "assetFolders", folderId, "assets"),
    { ...(cleaned as Record<string, unknown>), updatedAt: serverTimestamp() } as Record<string, unknown>
  );
  return docRef.id;
}
