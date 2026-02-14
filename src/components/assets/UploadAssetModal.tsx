"use client";

import { useState, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { FolderOpen, Upload } from 'lucide-react';
import type { AssetFolder } from '@/types/asset';

interface UploadAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: AssetFolder[];
  onUpload: (folderId: string, files: FileList | null) => void;
}

export function UploadAssetModal({
  isOpen,
  onClose,
  folders,
  onUpload,
}: UploadAssetModalProps) {
  const [folderId, setFolderId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files && files.length > 0 ? files : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderId) return;
    onUpload(folderId, selectedFiles);
    setFolderId('');
    setSelectedFiles(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  const handleClose = () => {
    setFolderId('');
    setSelectedFiles(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  const folderOptions = [
    { value: '', label: 'Select a folder…' },
    ...folders.map((f) => ({ value: f.id, label: f.name })),
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="medium">
      <ModalHeader onClose={handleClose}>
        Upload asset
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-5">
          <Select
            label="Folder"
            required
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            options={folderOptions}
          />
          <div>
            <label className="block text-body-sm font-medium text-text-secondary mb-2">
              Files
            </label>
            <div
              className="border-2 border-dashed border-border-medium rounded-lg p-8 bg-bg-input/50 text-center cursor-pointer hover:border-accent-gold/50 hover:bg-bg-input transition-standard"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-10 h-10 mx-auto text-text-tertiary mb-3" />
              <p className="text-body text-text-secondary mb-1">
                Drag & drop or click to browse
              </p>
              <p className="text-body-sm text-text-tertiary">
                Images, PDFs. Max 10MB per file.
              </p>
              {selectedFiles && selectedFiles.length > 0 && (
                <p className="text-body-sm text-accent-gold mt-3 font-medium">
                  {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!folderId || !selectedFiles || selectedFiles.length === 0}
          >
            Upload
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
