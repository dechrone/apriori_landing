"use client";

import { X } from 'lucide-react';
import { IconButton } from '@/components/ui/Button';
import { ProductFlowMetadataForm } from './ProductFlowMetadataForm';
import { AdCreativeMetadataForm } from './AdCreativeMetadataForm';
import type { Asset } from '@/types/asset';

interface AssetSidePanelProps {
  asset: Asset | null;
  onClose: () => void;
  onSave: (assetId: string, updates: Partial<Asset>) => void;
}

export function AssetSidePanel({ asset, onClose, onSave }: AssetSidePanelProps) {
  if (!asset) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-bg-primary/60 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-bg-secondary border-l border-border-subtle shadow-xl z-50 flex flex-col animate-slideInRight"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-panel-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-border-subtle shrink-0">
          <h2 id="asset-panel-title" className="text-h3 text-text-primary">
            Edit asset
          </h2>
          <IconButton icon={<X className="w-5 h-5" />} label="Close" onClick={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {asset.assetType === 'product-flow' && (
            <ProductFlowMetadataForm
              asset={asset}
              onSave={(updates) => onSave(asset.id, { productFlowMetadata: updates })}
            />
          )}
          {asset.assetType === 'ad-creative' && (
            <AdCreativeMetadataForm
              asset={asset}
              onSave={(updates) => onSave(asset.id, { adCreativeMetadata: updates })}
            />
          )}
        </div>
      </aside>
    </>
  );
}
