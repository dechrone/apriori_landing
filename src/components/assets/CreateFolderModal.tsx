"use client";

import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { AssetType } from '@/types/asset';
import { LayoutList, Megaphone } from 'lucide-react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, assetType: AssetType, description?: string) => void;
}

const ASSET_TYPES: { value: AssetType; label: string; icon: React.ReactNode }[] = [
  { value: 'product-flow', label: 'Product Flow Screens', icon: <LayoutList className="w-5 h-5" /> },
  { value: 'ad-creative', label: 'Ad Creatives', icon: <Megaphone className="w-5 h-5" /> },
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
        Create folder
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-5">
          <p className="text-body-sm text-text-tertiary">
            Asset type is locked after creation. Choose the type that matches how you&apos;ll use these assets in simulations.
          </p>
          <div>
            <label className="block text-body-sm font-medium text-text-secondary mb-3">
              Asset Type <span className="text-accent-red">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ASSET_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAssetType(type.value)}
                  className={`
                    flex items-center gap-3 p-4 rounded-[var(--radius-sm)] border-2 text-left transition-standard
                    ${assetType === type.value
                      ? 'border-accent-gold bg-accent-gold/5 text-text-primary shadow-[var(--shadow-sm)]'
                      : 'border-border-subtle text-text-secondary hover:border-border-medium hover:bg-bg-hover'
                    }
                  `}
                >
                  <span className={assetType === type.value ? 'text-accent-gold' : 'text-text-tertiary'}>
                    {type.icon}
                  </span>
                  <span className="text-body font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Folder name"
            required
            placeholder="e.g., Onboarding Flow Screens"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            label="Description (optional)"
            placeholder="e.g., Screens for Q1 onboarding flow"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Create folder
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
