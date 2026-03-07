"use client";

import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { AssetType } from '@/types/asset';
import { LayoutList, Megaphone, GitCompare, Info } from 'lucide-react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, assetType: AssetType, description?: string) => void;
}

const ASSET_TYPES: { value: AssetType; label: string; sublabel: string; icon: React.ReactNode }[] = [
  { value: 'product-flow', label: 'Product Flow Screens', sublabel: 'Steps in a single user journey', icon: <LayoutList className="w-5 h-5" /> },
  { value: 'ad-creative', label: 'Ad Creatives', sublabel: 'Images or videos for ad testing', icon: <Megaphone className="w-5 h-5" /> },
  { value: 'product-flow-comparator', label: 'Product Flow Comparator', sublabel: 'Compare two versions of a flow side by side', icon: <GitCompare className="w-5 h-5" /> },
];

export function CreateFolderModal({ isOpen, onClose, onCreate }: CreateFolderModalProps) {
  const [name, setName] = useState('');
  const [assetType, setAssetType] = useState<AssetType>('product-flow');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed, assetType, description.trim() || undefined);
    setName('');
    setDescription('');
    setAssetType('product-flow');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setAssetType('product-flow');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="medium">
      <ModalHeader onClose={handleClose}>
        <span className="text-[18px] font-bold text-[#1A1A1A]">Create folder</span>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-5">
          <p className="text-[13px] text-[#6B7280] leading-[1.6] mb-5">
            Asset type is locked after creation. Choose the type that matches how you&apos;ll use these assets in simulations.
          </p>
          <div>
            <label className="block text-[13px] font-medium text-[#374151] mb-3">
              Asset Type <span className="text-accent-red">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ASSET_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAssetType(type.value)}
                  className={`
                    flex flex-col items-start gap-1 p-4 rounded-[8px] border-2 text-left transition-all duration-150
                    ${assetType === type.value
                      ? 'border-[#F59E0B] bg-[#F59E0B]/5 text-[#1A1A1A] shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:bg-[#FAFAFA]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={assetType === type.value ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}>
                      {type.icon}
                    </span>
                    <span className="text-[14px] font-medium">{type.label}</span>
                  </div>
                  <span className="text-[12px] text-[#6B7280] ml-8">{type.sublabel}</span>
                </button>
              ))}
            </div>
            {/* Comparator info callout */}
            {assetType === 'product-flow-comparator' && (
              <div
                className="flex items-start gap-2 mt-3 p-[10px_14px] bg-[#EFF6FF] border border-[#BFDBFE] rounded-[8px] animate-in fade-in duration-200"
              >
                <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#1D4ED8] leading-[1.5]">
                  This creates two sub-folders (Flow 1 and Flow 2). Upload screens to each flow to compare them in the simulation.
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
              Folder name <span className="text-accent-red">*</span>
            </label>
            <input
              required
              placeholder="e.g., Onboarding Flow Screens"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-[14px] py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
              Description <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
            </label>
            <textarea
              placeholder="e.g., Screens for Q1 onboarding flow"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-[14px] py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all resize-none"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={handleClose} className="text-[14px] text-[#6B7280] bg-transparent border-none hover:text-[#1A1A1A] transition-colors px-4 py-2">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold rounded-[10px] transition-all duration-150
              ${name.trim()
                ? 'bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-sm'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }
            `}
          >
            Create folder
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
