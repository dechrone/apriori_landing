/**
 * Assets System — structured inputs for simulations.
 * PRD: Asset types, folder/asset models, simulation-aware metadata.
 */

export type AssetType = 'product-flow' | 'ad-creative';

export type FolderStatus = 'ready' | 'missing-metadata' | 'incompatible';

export type AssetStatus = 'complete' | 'missing-info';

// --- Page types for Product Flow (step semantics) ---
export type ProductFlowPageType =
  | 'signup'
  | 'onboarding'
  | 'pricing'
  | 'dashboard'
  | 'checkout'
  | 'other';

// --- Product Flow asset metadata ---
export interface ProductFlowMetadata {
  stepNumber: number;
  stepName: string;
  pageType: ProductFlowPageType;
  userIntent?: string;
  expectedAction?: string;
  notes?: string;
}

// --- Ad Creative metadata ---
export type CreativeFormat = 'image' | 'video';
export type AdPlatform = 'meta' | 'google' | 'generic';
export type HookType = 'pain-driven' | 'curiosity' | 'authority' | 'offer-led';

export interface AdCreativeMetadata {
  caption: string;
  creativeFormat: CreativeFormat;
  platform: AdPlatform;
  hookType?: HookType;
  ctaType?: string;
  targetPersonaId?: string;
  angleTheme?: string;
}

// --- Folder (asset type locked after creation) ---
export interface AssetFolder {
  id: string;
  name: string;
  description?: string;
  assetType: AssetType;
  createdAt: string;
  updatedAt: string;
  assetCount: number;
  usedInSimulations: number;
  status: FolderStatus;
}

// --- Asset (simulation-specific metadata by type) ---
export interface Asset {
  id: string;
  folderId: string;
  name: string;
  url: string;
  assetType: AssetType;
  createdAt: string;
  status: AssetStatus;
  // Type-specific metadata (one will be set based on assetType)
  productFlowMetadata?: ProductFlowMetadata;
  adCreativeMetadata?: AdCreativeMetadata;
  linkedSimulationIds?: string[];
}

// --- Helpers for validation ---
export function getAssetTypeLabel(type: AssetType): string {
  return type === 'product-flow' ? 'Product Flow Screens' : 'Ad Creatives';
}

export function getFolderStatusLabel(status: FolderStatus): string {
  switch (status) {
    case 'ready':
      return 'Ready for Simulation';
    case 'missing-metadata':
      return 'Missing Metadata';
    case 'incompatible':
      return 'Incompatible with Simulation Type';
    default:
      return status;
  }
}
