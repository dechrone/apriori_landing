"use client";

import { useState, useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { UploadCloud } from 'lucide-react';
import type { AssetFolder } from '@/types/asset';

interface UploadAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: AssetFolder[];
  onUpload: (folderId: string, files: FileList | null) => void;
  parentFolders?: AssetFolder[];
}

export function UploadAssetModal({
  isOpen,
  onClose,
  folders,
  onUpload,
  parentFolders = [],
}: UploadAssetModalProps) {
  const [folderId, setFolderId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files && files.length > 0 ? files : null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Filter to only image files
      const dt = new DataTransfer();
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          dt.items.add(file);
        }
      });
      if (dt.files.length > 0) {
        setSelectedFiles(dt.files);
      }
    }
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

  // Build folder options: show sub-folder names with parent prefix for comparators
  const folderOptions = [
    { value: '', label: 'Select a folder…' },
    ...folders.map((f) => {
      const parent = parentFolders.find(p => p.id === f.parentId);
      const label = parent
        ? `${parent.name}, ${f.name}`
        : f.name;
      return { value: f.id, label };
    }),
  ];

  const isDisabled = !folderId || !selectedFiles || selectedFiles.length === 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="medium">
      <ModalHeader onClose={handleClose}>
        <span className="text-[18px] font-bold text-[#1A1A1A]">Upload asset</span>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
              Folder <span className="text-accent-red">*</span>
            </label>
            <select
              required
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
            >
              {folderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
              Files
            </label>
            <div
              className={`
                border-2 border-dashed rounded-[14px] p-8 text-center cursor-pointer transition-all duration-150
                ${dragOver
                  ? 'border-[#F59E0B] border-solid bg-[#FFFBEB]'
                  : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#D1D5DB]'}
              `}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.svg"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className={`w-10 h-10 mx-auto mb-3 ${dragOver ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}`} />
              <p className={`text-[14px] font-medium ${dragOver ? 'text-[#92400E]' : 'text-[#6B7280]'} mb-1`}>
                Drag & drop or click to browse
              </p>
              <p className="text-[12px] text-[#9CA3AF]">
                Images only (PNG, JPG, GIF, WebP, SVG). Max 10MB per file.
              </p>
              {selectedFiles && selectedFiles.length > 0 && (
                <p className="text-[13px] text-[#F59E0B] mt-3 font-medium">
                  {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={handleClose} className="text-[14px] text-[#6B7280] bg-transparent border-none hover:text-[#1A1A1A] transition-colors px-4 py-2">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className={`
              inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold rounded-[10px] transition-all duration-150
              ${!isDisabled
                ? 'bg-[#F59E0B] text-white hover:bg-[#D97706] shadow-sm'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }
            `}
          >
            Upload
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
