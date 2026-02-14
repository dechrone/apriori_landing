"use client";

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { AssetFolder } from '@/types/asset';

interface DeleteFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: AssetFolder | null;
  onConfirm: () => void;
}

export function DeleteFolderModal({
  isOpen,
  onClose,
  folder,
  onConfirm,
}: DeleteFolderModalProps) {
  if (!folder) return null;

  const usedCount = folder.usedInSimulations ?? 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader onClose={onClose}>
        Delete folder
      </ModalHeader>
      <ModalBody>
        <p className="text-body text-text-secondary mb-4">
          Are you sure you want to delete &quot;{folder.name}&quot;? All assets in it will be removed.
        </p>
        {usedCount > 0 && (
          <div className="p-4 rounded-lg bg-accent-orange-bg border border-accent-orange/30">
            <p className="text-body text-text-primary font-medium">
              This folder is used in {usedCount} simulation{usedCount !== 1 ? 's' : ''}.
            </p>
            <p className="text-body-sm text-text-secondary mt-1">
              Deleting it will break {usedCount === 1 ? 'that simulation' : 'those simulations'}.
            </p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="bg-accent-red hover:bg-accent-red/90 text-white"
        >
          Delete folder
        </Button>
      </ModalFooter>
    </Modal>
  );
}
