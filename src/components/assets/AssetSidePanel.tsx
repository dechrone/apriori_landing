"use client";

import { X } from 'lucide-react';
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

  const stepLabel = asset.assetType === 'product-flow' && asset.productFlowMetadata?.stepNumber
    ? `Edit Step ${asset.productFlowMetadata.stepNumber}`
    : 'Edit asset';

  return (
    <>
      <div
        className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)] z-50 flex flex-col animate-slideInRight"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-panel-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E4DE] shrink-0">
          <div>
            <h2 id="asset-panel-title" className="text-[18px] font-bold text-[#1A1A1A]">
              {stepLabel}
            </h2>
            <p className="text-[13px] text-[#9CA3AF] mt-0.5">{asset.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[6px] text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {/* Image preview */}
          {asset.url && asset.url !== '#' && (
            <div className="w-full max-h-[180px] mb-5 rounded-[10px] border border-[#E8E4DE] bg-[#F9FAFB] overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full max-h-[180px] object-contain"
              />
            </div>
          )}
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
