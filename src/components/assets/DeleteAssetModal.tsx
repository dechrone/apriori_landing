"use client";

import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface DeleteAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetName: string | null;
  onConfirm: () => Promise<void>;
}

export function DeleteAssetModal({
  isOpen,
  onClose,
  assetName,
  onConfirm,
}: DeleteAssetModalProps) {
  const [deleting, setDeleting] = useState(false);

  if (!assetName) return null;

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader onClose={onClose}>
        Delete asset
      </ModalHeader>
      <ModalBody>
        <p className="text-body text-text-secondary">
          Are you sure you want to delete &quot;{assetName}&quot;? This action cannot be undone.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={deleting}
          className="bg-accent-red hover:bg-accent-red/90 text-white"
        >
          {deleting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Deleting…
            </span>
          ) : (
            'Delete asset'
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
