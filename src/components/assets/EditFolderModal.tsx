"use client";

import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import type { AssetFolder } from '@/types/asset';

interface EditFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  folder: AssetFolder | null;
  onSave: (updates: { name: string; description?: string }) => void;
}

export function EditFolderModal({
  isOpen,
  onClose,
  folder,
  onSave,
}: EditFolderModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setDescription(folder.description ?? '');
    }
  }, [folder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), description: description.trim() || undefined });
    onClose();
  };

  if (!folder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <ModalHeader onClose={onClose}>
        Edit folder
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-5">
          <Input
            label="Folder name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            label="Description (optional)"
            placeholder="e.g., Screens for Q1 onboarding flow"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Save changes
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
