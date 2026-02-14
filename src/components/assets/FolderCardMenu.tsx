"use client";

import { useState, useRef, useEffect } from 'react';
import { IconButton } from '@/components/ui/Button';
import { MoreVertical, Pencil, FileText, Trash2 } from 'lucide-react';
import type { AssetFolder } from '@/types/asset';

interface FolderCardMenuProps {
  folder: AssetFolder;
  onRename: () => void;
  onEditDetails: () => void;
  onDelete: () => void;
}

export function FolderCardMenu({
  folder,
  onRename,
  onEditDetails,
  onDelete,
}: FolderCardMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <IconButton
        icon={<MoreVertical className="w-5 h-5" />}
        label="Folder options"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="text-text-tertiary hover:text-text-primary"
      />
      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-50 min-w-[180px] py-1 rounded-lg bg-bg-elevated border border-border-medium shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onRename();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors text-left"
          >
            <Pencil className="w-4 h-4 shrink-0" />
            Rename folder
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEditDetails();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-body text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors text-left"
          >
            <FileText className="w-4 h-4 shrink-0" />
            Edit folder details
          </button>
          <div className="my-1 border-t border-border-subtle" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-body text-accent-red hover:bg-accent-red-bg transition-colors text-left"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
            Delete folder
          </button>
        </div>
      )}
    </div>
  );
}
