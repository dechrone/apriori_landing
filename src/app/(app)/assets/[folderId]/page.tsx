"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { IconButton } from '@/components/ui/Button';
import {
  ChevronRight,
  FolderOpen,
  Plus,
  Image as ImageIcon,
  Trash2,
  Pencil,
  Save,
  Loader2,
  CloudUpload,
} from 'lucide-react';
import type { Asset, AssetType } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import { AssetSidePanel } from '@/components/assets/AssetSidePanel';
import {
  getAssetsInFolder,
  uploadAssetFile,
  addAssetDocument,
  deleteAssetMetadata,
  updateAssetFolder,
} from '@/lib/firestore';

interface PendingUpload {
  localId: string;
  file: File;
  previewUrl: string;
  asset: Asset;
}

export default function FolderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { clerkId, profileReady } = useFirebaseUser();

  const folderId = params.folderId as string;
  const folderName = searchParams.get('name') ?? 'Folder';
  const assetType = (searchParams.get('type') as AssetType) ?? 'product-flow';

  const [assets, setAssets] = useState<Asset[]>([]);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const loadAssets = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const data = await getAssetsInFolder(clerkId, folderId);
      setAssets(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load assets', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [clerkId, profileReady, folderId, showToast]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const handleSaveAsset = (assetId: string, updates: Partial<Asset>) => {
    if (updates.productFlowMetadata?.stepNumber != null) {
      const newStep = updates.productFlowMetadata.stepNumber;
      const hasDuplicate = assets.some(
        (a) =>
          a.id !== assetId &&
          a.assetType === 'product-flow' &&
          a.productFlowMetadata?.stepNumber === newStep
      );
      if (hasDuplicate) {
        showToast('error', 'Duplicate step number', `Step ${newStep} is already used.`);
        return;
      }
    }

    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId ? { ...a, ...updates, status: 'complete' as const } : a
      )
    );

    setPendingUploads((prev) =>
      prev.map((p) =>
        p.localId === assetId
          ? { ...p, asset: { ...p.asset, ...updates, status: 'complete' as const } }
          : p
      )
    );

    setSelectedAsset(null);
    showToast('success', 'Metadata saved locally', 'Click "Save to Firebase" to persist.');
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const nextStep =
      Math.max(
        0,
        ...assets.map((a) => a.productFlowMetadata?.stepNumber ?? 0),
        ...pendingUploads.map((p) => p.asset.productFlowMetadata?.stepNumber ?? 0)
      ) + 1;

    const newPending: PendingUpload[] = Array.from(files).map((file, i) => {
      const localId = `pending_${Date.now()}_${i}`;
      const previewUrl = URL.createObjectURL(file);
      const asset: Asset = {
        id: localId,
        folderId,
        name: file.name,
        url: previewUrl,
        assetType,
        createdAt: new Date().toISOString(),
        status: 'missing-info' as const,
        ...(assetType === 'product-flow'
          ? { productFlowMetadata: { stepNumber: nextStep + i, stepName: '', pageType: 'other' as const } }
          : { adCreativeMetadata: { caption: '', creativeFormat: 'image' as const, platform: 'generic' as const } }),
      };
      return { localId, file, previewUrl, asset };
    });

    setPendingUploads((prev) => [...prev, ...newPending]);
    setAssets((prev) => [...prev, ...newPending.map((p) => p.asset)]);
    showToast(
      'success',
      `${files.length} file(s) queued`,
      'Fill metadata, then click "Save to Firebase".'
    );
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const UPLOAD_TIMEOUT_MS = 90_000; // 90s per file so we don't hang forever

  const handleSaveToFirebase = async () => {
    if (!clerkId || pendingUploads.length === 0) return;
    setSaving(true);
    let saved = 0;

    const withTimeout = <T,>(promise: Promise<T>, label: string): Promise<T> => {
      // Log the real error when the underlying promise settles (helps when timeout wins the race)
      promise.catch((e) => console.error(`[${label}] underlying error:`, e));
      return Promise.race([
        promise,
        new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  `${label} timed out. Check: 1) Storage rules for users/.../assetFolders/ (allow write), 2) CORS on the bucket (PUT, POST, OPTIONS from your origin), 3) Network.`
                )
              ),
            UPLOAD_TIMEOUT_MS
          )
        ),
      ]);
    };

    try {
      for (const pending of pendingUploads) {
        try {
          const { storageUrl, storagePath } = await withTimeout(
            uploadAssetFile(clerkId, folderId, pending.file),
            'Upload'
          );
          const finalAsset: Asset = {
            ...pending.asset,
            url: storageUrl,
          };

          const savedId = await withTimeout(
            addAssetDocument(clerkId, folderId, { ...finalAsset }, storagePath),
            'Save to Firestore'
          );

          if (!savedId) {
            showToast('error', `Failed to save "${pending.file.name}"`, 'Document ID was not created.');
            continue;
          }

          setAssets((prev) =>
            prev.map((a) =>
              a.id === pending.localId ? { ...finalAsset, id: savedId } : a
            )
          );
          saved++;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          console.error(err);
          showToast(
            'error',
            `Failed: ${pending.file.name}`,
            message.includes('timed out')
              ? message
              : message.includes('storage/')
                ? message
                : message
          );
        }
      }

      if (saved > 0) {
        setPendingUploads([]);
        await updateAssetFolder(clerkId, folderId, {
          assetCount: assets.filter((a) => !a.id.startsWith('pending_')).length + saved,
          updatedAt: new Date().toISOString(),
        });
        showToast('success', `${saved} asset(s) saved`, 'All files are stored in Firebase.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAsset = (assetId: string, assetName: string) => async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete "${assetName}"? This cannot be undone.`)) return;

    // If it's a pending upload (not yet saved), just remove locally
    if (assetId.startsWith('pending_')) {
      setPendingUploads((prev) => prev.filter((p) => p.localId !== assetId));
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      showToast('success', 'Asset removed', `"${assetName}" was removed from the queue.`);
      return;
    }

    if (!clerkId) return;
    try {
      await deleteAssetMetadata(clerkId, folderId, assetId);
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      showToast('success', 'Asset deleted', `"${assetName}" has been removed.`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete asset', 'Please try again.');
    }
  };

  const uploadCtaLabel = assetType === 'product-flow' ? 'Upload Flow Screens' : 'Upload Ad Creatives';
  const hasPending = pendingUploads.length > 0;

  return (
    <>
      <TopBar title={folderName} onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-28">
        <nav className="flex items-center gap-2 text-body-sm text-text-tertiary mb-6">
          <Link href="/assets" className="hover:text-text-primary transition-colors">
            Assets
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary">{folderName}</span>
          <span className="text-text-tertiary">·</span>
          <span>{getAssetTypeLabel(assetType)}</span>
        </nav>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : assets.length === 0 ? (
          <EmptyState
            icon={<ImageIcon className="w-16 h-16" />}
            title={assetType === 'product-flow' ? 'No flow screens yet' : 'No ad creatives yet'}
            description={
              assetType === 'product-flow'
                ? 'Upload screens for each step of your flow. Add step names and page types so simulations know the journey.'
                : 'Upload creatives and add captions, platform, and hooks. Then use this folder when running ad simulations.'
            }
            action={{ label: uploadCtaLabel, onClick: handleUploadClick }}
          />
        ) : (
          <div className="space-y-4">
            {assetType === 'product-flow' && (
              <p className="text-body-sm text-text-tertiary">
                Ordered by step. Click an asset to edit metadata. Fill step name and page type so this folder is ready for simulation.
              </p>
            )}
            {hasPending && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <CloudUpload className="w-5 h-5 text-amber-400 shrink-0" />
                <p className="text-body-sm text-amber-300 flex-1">
                  <span className="font-semibold">{pendingUploads.length} file(s) pending upload.</span>{' '}
                  Fill in metadata, then click "Save to Firebase" to store them.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {assets.map((asset) => {
                const isPending = asset.id.startsWith('pending_');
                return (
                  <Card key={asset.id} hover className="overflow-hidden relative group">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-bg-elevated flex items-center justify-center relative overflow-hidden">
                        {asset.url && asset.url !== '#' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-text-tertiary" />
                        )}
                        {asset.status === 'missing-info' && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="warning">Missing info</Badge>
                          </div>
                        )}
                        {isPending && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="warning">Unsaved</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-2">
                        {assetType === 'product-flow' && asset.productFlowMetadata && (
                          <div className="flex items-center gap-2 text-body-sm">
                            <span className="font-semibold text-accent-gold">
                              Step {asset.productFlowMetadata.stepNumber}
                            </span>
                            {asset.productFlowMetadata.stepName && (
                              <span className="text-text-secondary truncate">
                                {asset.productFlowMetadata.stepName}
                              </span>
                            )}
                          </div>
                        )}
                        {assetType === 'ad-creative' && asset.adCreativeMetadata && (
                          <p className="text-body-sm text-text-tertiary line-clamp-2">
                            {asset.adCreativeMetadata.caption || 'No caption'}
                          </p>
                        )}
                        <p className="text-body-sm text-text-primary truncate" title={asset.name}>
                          {asset.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-1 p-2 border-t border-border-subtle">
                        <IconButton
                          icon={<Pencil className="w-4 h-4" />}
                          label="Edit metadata"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedAsset(asset);
                          }}
                          className="!w-8 !h-8 text-text-tertiary hover:text-accent-gold"
                        />
                        <IconButton
                          icon={<Trash2 className="w-4 h-4" />}
                          label="Delete asset"
                          onClick={handleDeleteAsset(asset.id, asset.name)}
                          className="!w-8 !h-8 text-text-tertiary hover:text-accent-red hover:bg-accent-red-bg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="fixed bottom-6 right-6 lg:right-10 z-30 flex items-center gap-3">
          {hasPending && (
            <Button
              size="lg"
              className="shadow-lg bg-emerald-600 hover:bg-emerald-500"
              onClick={handleSaveToFirebase}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Saving…' : `Save to Firebase (${pendingUploads.length})`}
            </Button>
          )}
          <Button size="lg" className="shadow-lg" onClick={handleUploadClick}>
            <Plus className="w-6 h-6" />
            {uploadCtaLabel}
          </Button>
        </div>
      </div>

      <AssetSidePanel
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onSave={handleSaveAsset}
      />
    </>
  );
}
