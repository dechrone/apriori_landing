"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { IconButton } from '@/components/ui/Button';
import { ChevronRight, FolderOpen, Plus, Image as ImageIcon, Trash2, Pencil } from 'lucide-react';
import type { Asset, AssetType } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import { AssetSidePanel } from '@/components/assets/AssetSidePanel';

export default function FolderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const folderId = params.folderId as string;
  const folderName = searchParams.get('name') ?? 'Folder';
  const assetType = (searchParams.get('type') as AssetType) ?? 'product-flow';

  const [assets, setAssets] = useState<Asset[]>(() =>
    assetType === 'product-flow'
      ? [
          {
            id: '1',
            folderId,
            name: 'Step 1 - Sign up.png',
            url: '#',
            assetType: 'product-flow',
            createdAt: new Date().toISOString(),
            status: 'complete',
            productFlowMetadata: { stepNumber: 1, stepName: 'Signup', pageType: 'signup' },
          },
          {
            id: '2',
            folderId,
            name: 'Step 2 - Onboarding.png',
            url: '#',
            assetType: 'product-flow',
            createdAt: new Date().toISOString(),
            status: 'complete',
            productFlowMetadata: { stepNumber: 2, stepName: 'Onboarding', pageType: 'onboarding' },
          },
          {
            id: '3',
            folderId,
            name: 'Step 3 - Dashboard.png',
            url: '#',
            assetType: 'product-flow',
            createdAt: new Date().toISOString(),
            status: 'missing-info',
            productFlowMetadata: { stepNumber: 3, stepName: '', pageType: 'other' },
          },
        ]
      : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

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
        showToast(
          'error',
          'Duplicate step number',
          `Step ${newStep} is already used by another asset in this folder.`
        );
        return;
      }
    }

    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? { ...a, ...updates, status: 'complete' as const }
          : a
      )
    );
    showToast('success', 'Metadata saved', 'Asset is ready for simulation.');
    setSelectedAsset(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const nextStep = Math.max(0, ...assets.map((a) => a.productFlowMetadata?.stepNumber ?? 0)) + 1;
    const newAssets: Asset[] = Array.from(files).map((file, i) => ({
      id: String(Date.now() + i),
      folderId,
      name: file.name,
      url: URL.createObjectURL(file),
      assetType,
      createdAt: new Date().toISOString(),
      status: 'missing-info' as const,
      ...(assetType === 'product-flow'
        ? { productFlowMetadata: { stepNumber: nextStep + i, stepName: '', pageType: 'other' as const } }
        : { adCreativeMetadata: { caption: '', creativeFormat: 'image' as const, platform: 'generic' as const } }),
    }));
    setAssets((prev) => [...newAssets, ...prev]);
    showToast('success', 'Assets uploaded', `${files.length} file(s) added. Add metadata so this folder is ready for simulation.`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteAsset = (assetId: string, assetName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete "${assetName}"? This cannot be undone.`)) return;
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
    showToast('success', 'Asset deleted', `"${assetName}" has been removed.`);
  };

  const uploadCtaLabel = assetType === 'product-flow' ? 'Upload Flow Screens' : 'Upload Ad Creatives';

  return (
    <>
      <TopBar title={folderName} onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-20">
        <nav className="flex items-center gap-2 text-body-sm text-text-tertiary mb-6">
          <Link href="/assets" className="hover:text-text-primary transition-colors">
            Assets
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-text-primary">{folderName}</span>
          <span className="text-text-tertiary">·</span>
          <span>{getAssetTypeLabel(assetType)}</span>
        </nav>

        {assets.length === 0 ? (
          <EmptyState
            icon={<ImageIcon className="w-16 h-16" />}
            title={assetType === 'product-flow' ? 'No flow screens yet' : 'No ad creatives yet'}
            description={
              assetType === 'product-flow'
                ? 'Upload screens for each step of your flow. Add step names and page types so simulations know the journey.'
                : 'Upload creatives and add captions, platform, and hooks. Then use this folder when running ad simulations.'
            }
            action={{
              label: uploadCtaLabel,
              onClick: handleUploadClick,
            }}
          />
        ) : (
          <div className="space-y-4">
            {assetType === 'product-flow' && (
              <p className="text-body-sm text-text-tertiary">
                Ordered by step. Click an asset to edit metadata. Fill step name and page type so this folder is ready for simulation.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {assets.map((asset) => (
                <Card key={asset.id} hover className="overflow-hidden relative group">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-bg-elevated flex items-center justify-center relative">
                      <ImageIcon className="w-12 h-12 text-text-tertiary" />
                      {asset.status === 'missing-info' && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="warning">Missing info</Badge>
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
              ))}
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

        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
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
