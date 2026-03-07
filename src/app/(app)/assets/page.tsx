"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { CreateFolderModal } from '@/components/assets/CreateFolderModal';
import { UploadAssetModal } from '@/components/assets/UploadAssetModal';
import { DeleteFolderModal } from '@/components/assets/DeleteFolderModal';
import { EditFolderModal } from '@/components/assets/EditFolderModal';
import { FolderCardMenu } from '@/components/assets/FolderCardMenu';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { Plus, FolderPlus, FolderOpen, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { AssetFolder, Asset } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import {
  getAssetFolders,
  saveAssetFolder,
  updateAssetFolder,
  deleteAssetFolder,
  getAssetsInFolder,
} from '@/lib/firestore';

export default function AssetsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { clerkId, profileReady } = useFirebaseUser();

  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const [subfoldersByParentId, setSubfoldersByParentId] = useState<Record<string, AssetFolder[]>>({});
  const [assetsByFolderId, setAssetsByFolderId] = useState<Record<string, Asset[]>>({});
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalFolder, setEditModalFolder] = useState<AssetFolder | null>(null);
  const [deleteModalFolder, setDeleteModalFolder] = useState<AssetFolder | null>(null);

  const loadFolders = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const roots = await getAssetFolders(clerkId);
      setFolders(roots);
      const comparatorIds = roots.filter((f) => f.assetType === 'product-flow-comparator').map((f) => f.id);
      const subfoldersMap: Record<string, AssetFolder[]> = {};
      await Promise.all(
        comparatorIds.map(async (parentId) => {
          const children = await getAssetFolders(clerkId, parentId);
          subfoldersMap[parentId] = children;
        })
      );
      setSubfoldersByParentId(subfoldersMap);

      // Load assets for each folder (including sub-folders) for readiness badge logic
      const allFolderIds = [
        ...roots.filter((f) => f.assetType !== 'product-flow-comparator').map((f) => f.id),
        ...Object.values(subfoldersMap).flat().map((f) => f.id),
      ];
      const assetsMap: Record<string, Asset[]> = {};
      await Promise.all(
        allFolderIds.map(async (id) => {
          try {
            assetsMap[id] = await getAssetsInFolder(clerkId, id);
          } catch {
            assetsMap[id] = [];
          }
        })
      );
      setAssetsByFolderId(assetsMap);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load folders', 'Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [clerkId, profileReady, showToast]);

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const handleCreateFolder = async (
    name: string,
    assetType: AssetFolder['assetType'],
    description?: string
  ) => {
    if (!clerkId) return;
    const now = new Date().toISOString();
    try {
      if (assetType === 'product-flow-comparator') {
        const parentData: Omit<AssetFolder, 'id'> = {
          name,
          description,
          assetType: 'product-flow-comparator',
          parentId: null,
          createdAt: now,
          updatedAt: now,
          assetCount: 0,
          usedInSimulations: 0,
          status: 'ready',
        };
        const parentId = await saveAssetFolder(clerkId, parentData);
        const childData: Omit<AssetFolder, 'id'> = {
          name: 'Flow 1',
          assetType: 'product-flow',
          parentId,
          createdAt: now,
          updatedAt: now,
          assetCount: 0,
          usedInSimulations: 0,
          status: 'ready',
        };
        const childData2: Omit<AssetFolder, 'id'> = {
          ...childData,
          name: 'Flow 2',
        };
        const flow1Id = await saveAssetFolder(clerkId, childData);
        const flow2Id = await saveAssetFolder(clerkId, childData2);
        const flow1 = { id: flow1Id, ...childData };
        const flow2 = { id: flow2Id, ...childData2 };
        setFolders((prev) => [{ id: parentId, ...parentData }, ...prev]);
        setSubfoldersByParentId((prev) => ({
          ...prev,
          [parentId]: [flow1, flow2],
        }));
        showToast('success', 'Comparator created', `"${name}" with Flow 1 and Flow 2 is ready. Open it to add screens to each flow.`);
      } else {
        const folderData: Omit<AssetFolder, 'id'> = {
          name,
          description,
          assetType,
          parentId: null,
          createdAt: now,
          updatedAt: now,
          assetCount: 0,
          usedInSimulations: 0,
          status: 'ready',
        };
        const newId = await saveAssetFolder(clerkId, folderData);
        setFolders((prev) => [{ id: newId, ...folderData }, ...prev]);
        showToast('success', 'Folder created', `"${name}" is ready for ${getAssetTypeLabel(assetType).toLowerCase()}.`);
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to create folder', 'Please try again.');
    }
  };

  const handleSaveFolder = async (updates: { name: string; description?: string }) => {
    if (!editModalFolder || !clerkId) return;
    try {
      await updateAssetFolder(clerkId, editModalFolder.id, updates);
      setFolders((prev) =>
        prev.map((f) =>
          f.id === editModalFolder.id
            ? { ...f, ...updates, updatedAt: new Date().toISOString() }
            : f
        )
      );
      showToast('success', 'Folder updated', 'Changes saved.');
      setEditModalFolder(null);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to update folder', 'Please try again.');
    }
  };

  const handleDeleteFolder = async () => {
    if (!deleteModalFolder || !clerkId) return;
    try {
      await deleteAssetFolder(clerkId, deleteModalFolder.id);
      setFolders((prev) => prev.filter((f) => f.id !== deleteModalFolder.id));
      showToast('success', 'Folder deleted', `"${deleteModalFolder.name}" has been removed.`);
      setDeleteModalFolder(null);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete folder', 'Please try again.');
    }
  };

  const uploadableFolders = [
    ...folders.filter((f) => f.assetType !== 'product-flow-comparator'),
    ...Object.values(subfoldersByParentId).flat(),
  ];

  const handleUpload = (folderId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const folder = uploadableFolders.find((f) => f.id === folderId);
    if (folder?.parentId) {
      setSubfoldersByParentId((prev) => ({
        ...prev,
        [folder.parentId as string]: (prev[folder.parentId as string] ?? []).map((f: AssetFolder) =>
          f.id === folderId ? { ...f, assetCount: f.assetCount + files.length } : f
        ),
      }));
    } else {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === folderId ? { ...f, assetCount: f.assetCount + files.length } : f
        )
      );
    }
    showToast('success', 'Assets uploaded', `${files.length} file(s) added to ${folder?.name ?? 'folder'}.`);
  };

  const openUploadModal = () => {
    if (folders.length === 0) {
      showToast('warning', 'Create a folder first', 'Create a folder to organize your uploads.');
      return;
    }
    setUploadModalOpen(true);
  };

  return (
    <>
      <TopBar title="Assets" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[1600px] mx-auto relative pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-bold text-[#1A1A1A]">Assets</h2>
          {folders.length > 0 && (
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#4B5563] bg-white border border-[#E5E7EB] rounded-lg hover:border-[#F59E0B] hover:text-[#92400E] transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              Create folder
            </button>
          )}
        </div>

        {folders.length > 0 && (
          <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-4">Folders</h3>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : folders.length === 0 ? (
          /* ── Change 1: Create-folder-focused empty state ── */
          <div className="flex flex-col items-center text-center py-16 px-6">
            <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1A1A1A] mt-4">
              Organise your assets into folders
            </h3>
            <p className="text-[15px] text-[#4B5563] leading-[1.7] max-w-[400px] text-center mt-2">
              Create a folder for each flow or ad set you want to simulate.
              <br />
              Assets are uploaded inside folders.
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[10px] hover:bg-[#D97706] transition-all duration-200 shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
            >
              <Plus className="w-4 h-4" />
              Create your first folder
            </button>
            {/* Ghost cards */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pointer-events-none select-none">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-[14px] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] opacity-30"
                >
                  <div className="h-3 bg-[#E5E7EB] rounded mb-2.5" style={{ width: '60%' }} />
                  <div className="h-3 bg-[#E5E7EB] rounded mb-2.5" style={{ width: '85%' }} />
                  <div className="h-3 bg-[#E5E7EB] rounded mb-2.5" style={{ width: '45%' }} />
                  <div className="h-5 w-20 bg-[#E5E7EB] rounded-full mt-3" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {folders.map((folder) => {
              const displayAssetCount = folder.assetType === 'product-flow-comparator'
                ? (subfoldersByParentId[folder.id] || []).reduce((sum, sub) => sum + sub.assetCount, 0)
                : folder.assetCount;
              const folderAssets = assetsByFolderId[folder.id] ?? [];
              const hasAssets = displayAssetCount > 0;
              const allHaveStepNumbers = hasAssets && folderAssets.length > 0 && folderAssets.every(
                (a) =>
                  a.productFlowMetadata?.stepNumber != null &&
                  a.productFlowMetadata.stepNumber !== 0
              );
              // For comparator, check both subfolders
              const isComparator = folder.assetType === 'product-flow-comparator';
              let comparatorReady = false;
              if (isComparator) {
                const subs = subfoldersByParentId[folder.id] || [];
                comparatorReady = subs.length >= 2 && subs.every((sub) => {
                  const subAssets = assetsByFolderId[sub.id] ?? [];
                  return subAssets.length > 0 && subAssets.every(
                    (a) =>
                      a.productFlowMetadata?.stepNumber != null &&
                      a.productFlowMetadata.stepNumber !== 0
                  );
                });
              }

              const isReady = isComparator ? comparatorReady : (hasAssets && allHaveStepNumbers);
              const needsStepNumbers = hasAssets && !isReady && !isComparator;
              const comparatorNeedsWork = isComparator && displayAssetCount > 0 && !comparatorReady;

              return (
              <div
                key={folder.id}
                className="bg-white rounded-[14px] border border-[#E8E4DE] p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[1px] transition-all duration-200 cursor-pointer relative group"
              >
                {/* Menu outside the Link so clicks don't navigate */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FolderCardMenu
                    folder={folder}
                    onRename={() => setEditModalFolder(folder)}
                    onEditDetails={() => setEditModalFolder(folder)}
                    onDelete={() => setDeleteModalFolder(folder)}
                  />
                </div>
                <Link
                  href={`/assets/${folder.id}?name=${encodeURIComponent(folder.name)}&type=${folder.assetType}`}
                  className="block"
                >
                  <div className="flex items-center justify-between">
                    <FolderOpen className="w-6 h-6 text-[#F59E0B]" />
                    {/* Spacer to keep layout balanced with the absolutely-positioned menu */}
                    <div className="w-8 h-8" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A] truncate mt-[10px]">{folder.name}</h3>
                  <p className="text-[13px] text-[#6B7280] mt-0.5">
                    {getAssetTypeLabel(folder.assetType)} · {displayAssetCount} asset{displayAssetCount !== 1 ? 's' : ''}
                  </p>
                  <div className="mt-3">
                    {isReady && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#065F46] bg-[#D1FAE5] rounded-full px-2.5 py-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Ready for Simulation
                      </span>
                    )}
                    {(needsStepNumbers || comparatorNeedsWork) && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] rounded-full px-2.5 py-0.5">
                        <AlertCircle className="w-3 h-3" />
                        Needs step numbers
                      </span>
                    )}
                    {!hasAssets && (
                      <span className="inline-flex items-center text-[11px] font-medium text-[#9CA3AF] bg-[#F3F4F6] rounded-full px-2.5 py-0.5">
                        No assets yet
                      </span>
                    )}
                  </div>
                </Link>
              </div>
              );
            })}
          </div>
        )}

        {/* Floating button: "Upload Asset" only when folders exist, "Create folder" when none */}
        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          {folders.length > 0 ? (
            <button
              onClick={openUploadModal}
              className="inline-flex items-center gap-2 h-12 px-5 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[24px] hover:bg-[#D97706] transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.45)]"
            >
              <Plus className="w-[18px] h-[18px]" />
              Upload Asset
            </button>
          ) : !loading && (
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 h-12 px-5 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[24px] hover:bg-[#D97706] transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.45)]"
            >
              <FolderPlus className="w-[18px] h-[18px]" />
              Create folder
            </button>
          )}
        </div>
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
        folders={uploadableFolders}
        parentFolders={folders}
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
