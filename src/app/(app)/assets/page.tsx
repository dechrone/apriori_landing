"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { CreateFolderModal } from '@/components/assets/CreateFolderModal';
import { UploadAssetModal } from '@/components/assets/UploadAssetModal';
import { DeleteFolderModal } from '@/components/assets/DeleteFolderModal';
import { EditFolderModal } from '@/components/assets/EditFolderModal';
import { FolderCardMenu } from '@/components/assets/FolderCardMenu';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { Plus, FolderPlus, FolderOpen } from 'lucide-react';
import type { AssetFolder } from '@/types/asset';
import { getAssetTypeLabel, getFolderStatusLabel } from '@/types/asset';

export default function AssetsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();

  const [folders, setFolders] = useState<AssetFolder[]>([
    {
      id: '1',
      name: 'Onboarding Flow',
      assetType: 'product-flow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assetCount: 3,
      usedInSimulations: 1,
      status: 'ready',
    },
    {
      id: '2',
      name: 'Pricing Page Screens',
      description: 'Screens for pricing page A/B test',
      assetType: 'product-flow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assetCount: 5,
      usedInSimulations: 0,
      status: 'missing-metadata',
    },
    {
      id: '3',
      name: 'Q1 Ad Creatives',
      assetType: 'ad-creative',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assetCount: 4,
      usedInSimulations: 2,
      status: 'ready',
    },
  ]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalFolder, setEditModalFolder] = useState<AssetFolder | null>(null);
  const [deleteModalFolder, setDeleteModalFolder] = useState<AssetFolder | null>(null);

  const handleCreateFolder = (name: string, assetType: AssetFolder['assetType'], description?: string) => {
    const now = new Date().toISOString();
    const newFolder: AssetFolder = {
      id: String(Date.now()),
      name,
      description,
      assetType,
      createdAt: now,
      updatedAt: now,
      assetCount: 0,
      usedInSimulations: 0,
      status: 'ready',
    };
    setFolders((prev) => [newFolder, ...prev]);
    showToast('success', 'Folder created', `"${name}" is ready for ${getAssetTypeLabel(assetType).toLowerCase()}.`);
  };

  const handleSaveFolder = (updates: { name: string; description?: string }) => {
    if (!editModalFolder) return;
    setFolders((prev) =>
      prev.map((f) =>
        f.id === editModalFolder.id
          ? { ...f, ...updates, updatedAt: new Date().toISOString() }
          : f
      )
    );
    showToast('success', 'Folder updated', 'Changes saved.');
    setEditModalFolder(null);
  };

  const handleDeleteFolder = () => {
    if (!deleteModalFolder) return;
    setFolders((prev) => prev.filter((f) => f.id !== deleteModalFolder.id));
    showToast('success', 'Folder deleted', `"${deleteModalFolder.name}" has been removed.`);
    setDeleteModalFolder(null);
  };

  const handleUpload = (folderId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const folder = folders.find((f) => f.id === folderId);
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, assetCount: f.assetCount + files.length } : f
      )
    );
    showToast('success', 'Assets uploaded', `${files.length} file(s) added to ${folder?.name ?? 'folder'}.`);
  };

  const openUploadModal = () => {
    if (folders.length === 0) {
      showToast('warning', 'Create a folder first', 'Create a folder to organize your uploads.');
      return;
    }
    setUploadModalOpen(true);
  };

  const statusBadgeVariant =
    (status: AssetFolder['status']) =>
    status === 'ready' ? 'success' : status === 'missing-metadata' ? 'warning' : 'error';

  return (
    <>
      <TopBar title="Assets" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h2 text-text-primary">Folders</h2>
          <Button variant="secondary" size="sm" onClick={() => setCreateModalOpen(true)}>
            <FolderPlus className="w-4 h-4" />
            Create folder
          </Button>
        </div>

        {folders.length === 0 ? (
          <EmptyState
            icon={<FolderOpen className="w-16 h-16" />}
            title="No folders yet"
            description="Create a folder and choose an asset type (Product Flow Screens or Ad Creatives). Then upload files and select this folder when running simulations."
            action={{
              label: 'Create folder',
              onClick: () => setCreateModalOpen(true),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <Card key={folder.id} hover className="border-l-4 border-l-accent-gold relative group">
                <CardContent className="flex items-center gap-4 py-5">
                  <Link
                    href={`/assets/${folder.id}?name=${encodeURIComponent(folder.name)}&type=${folder.assetType}`}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-bg-elevated flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-h4 text-text-primary truncate">{folder.name}</h3>
                      <p className="text-caption text-text-tertiary mt-0.5">
                        {getAssetTypeLabel(folder.assetType)} · {folder.assetCount} asset{folder.assetCount !== 1 ? 's' : ''}
                      </p>
                      <div className="mt-2">
                        <Badge variant={statusBadgeVariant(folder.status)}>
                          {folder.status === 'ready' && '✓ '}
                          {getFolderStatusLabel(folder.status)}
                        </Badge>
                      </div>
                      {folder.usedInSimulations > 0 && (
                        <p className="text-caption text-text-tertiary mt-1">
                          Used in {folder.usedInSimulations} simulation{folder.usedInSimulations !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <span className="text-text-tertiary shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                  <FolderCardMenu
                    folder={folder}
                    onRename={() => setEditModalFolder(folder)}
                    onEditDetails={() => setEditModalFolder(folder)}
                    onDelete={() => setDeleteModalFolder(folder)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          <Button size="lg" className="shadow-lg" onClick={openUploadModal}>
            <Plus className="w-6 h-6" />
            Upload Asset
          </Button>
        </div>
      </div>

      <CreateFolderModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateFolder}
      />
      <UploadAssetModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        folders={folders}
        onUpload={handleUpload}
      />
      <EditFolderModal
        isOpen={!!editModalFolder}
        onClose={() => setEditModalFolder(null)}
        folder={editModalFolder}
        onSave={handleSaveFolder}
      />
      <DeleteFolderModal
        isOpen={!!deleteModalFolder}
        onClose={() => setDeleteModalFolder(null)}
        folder={deleteModalFolder}
        onConfirm={handleDeleteFolder}
      />
    </>
  );
}
