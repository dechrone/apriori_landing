"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/app/TopBar';
import { Card, CardContent } from '@/components/ui/Card';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { IconButton } from '@/components/ui/Button';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { SortableAssetRow } from '@/components/assets/SortableAssetRow';
import {
  ChevronRight,
  FolderOpen,
  Plus,
  Image as ImageIcon,
  Trash2,
  Pencil,
  Loader2,
  UploadCloud,
  FileImage,
  AlertCircle,
  Check,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import type { Asset, AssetType } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import { AssetSidePanel } from '@/components/assets/AssetSidePanel';
import { DeleteAssetModal } from '@/components/assets/DeleteAssetModal';
import {
  getAssetFolders,
  saveAssetMetadata,
  updateAssetFolder,
} from '@/lib/firestore';
import {
  getAssets,
  uploadAssets,
  updateAssetMetadata,
  deleteAsset as deleteAssetFromBackend,
} from '@/lib/assets-api';

interface UploadingFile {
  id: string;
  file: File;
  name: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  savedId?: string;
}

export default function FolderDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useFirebaseUser();
  const { user } = useAuthContext();

  const folderId = params.folderId as string;
  const folderName = searchParams.get('name') ?? 'Folder';
  const assetType = (searchParams.get('type') as AssetType) ?? 'product-flow';

  const [assets, setAssets] = useState<Asset[]>([]);
  const [subfolders, setSubfolders] = useState<{ id: string; name: string; assetType: AssetType; assetCount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null); // kept for ad-creative only
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reorderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isComparator = assetType === 'product-flow-comparator';
  const isProductFlow = assetType === 'product-flow';

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const loadSubfolders = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const children = await getAssetFolders(userId, folderId);
      setSubfolders(children.map((f) => ({ id: f.id, name: f.name, assetType: f.assetType, assetCount: f.assetCount })));
    } catch (err) {
      console.error('loadSubfolders error:', err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      showToast('error', 'Failed to load flows', msg.includes('index') ? 'A Firestore index may be needed — check the console for a link.' : 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId, profileReady, folderId, showToast]);

  const loadAssets = useCallback(async () => {
    if (!userId || !profileReady || !user) return;
    try {
      const token = await user.getIdToken();
      const data = await getAssets(token, folderId);
      setAssets(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load assets', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId, profileReady, user, folderId, showToast]);

  useEffect(() => {
    if (isComparator) {
      loadSubfolders();
    } else {
      loadAssets();
    }
  }, [isComparator, loadSubfolders, loadAssets]);

  // ── Auto-save: persist asset metadata to backend ──
  const autoSaveAsset = useCallback(async (assetId: string, asset: Asset) => {
    if (!user || assetId.startsWith('pending_')) return;
    setAutoSaveStatus('saving');
    try {
      const token = await user.getIdToken();
      const metadata = asset.productFlowMetadata ?? asset.adCreativeMetadata ?? {};
      await updateAssetMetadata(token, assetId, folderId, metadata);
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Auto-save error:', err);
      // Fall back to Firestore save if backend fails
      if (userId) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _assetId, ...rest } = asset;
          await saveAssetMetadata(userId, folderId, assetId, rest);
          setAutoSaveStatus('saved');
          setTimeout(() => setAutoSaveStatus('idle'), 3000);
          return;
        } catch {
          // ignore fallback error
        }
      }
      setAutoSaveStatus('error');
    }
  }, [user, userId, folderId]);

  /** Inline field save — updates local state + fires Firebase auto-save */
  const handleSaveField = useCallback((assetId: string, updates: Partial<Asset>) => {
    const existing = assets.find((a) => a.id === assetId);
    if (!existing) return;

    // Compute whether asset is now "complete" (has step name)
    const mergedMeta = {
      ...existing.productFlowMetadata,
      ...updates.productFlowMetadata,
    };
    const isComplete = (mergedMeta.stepName?.trim().length ?? 0) > 0;

    const updatedAsset: Asset = {
      ...existing,
      ...updates,
      productFlowMetadata: mergedMeta as Asset['productFlowMetadata'],
      status: isComplete ? 'complete' : 'missing-info',
    };

    setAssets((prev) => prev.map((a) => (a.id === assetId ? updatedAsset : a)));
    autoSaveAsset(assetId, updatedAsset);
  }, [assets, autoSaveAsset]);

  /** Legacy save for ad-creative side panel (unchanged) */
  const handleSaveAsset = useCallback((assetId: string, updates: Partial<Asset>) => {
    const existing = assets.find((a) => a.id === assetId);
    if (!existing) return;
    const updatedAsset = { ...existing, ...updates, status: 'complete' as const };
    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId ? updatedAsset : a
      )
    );
    setSelectedAsset(null);
    autoSaveAsset(assetId, updatedAsset);
  }, [assets, autoSaveAsset]);

  /** Drag-end: reorder assets and debounce-save all step numbers to Firebase */
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setAssets((prev) => {
      const oldIndex = prev.findIndex((a) => a.id === active.id);
      const newIndex = prev.findIndex((a) => a.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const reordered = arrayMove(prev, oldIndex, newIndex);

      // Update step numbers based on new positions
      const updated = reordered.map((a, i) => ({
        ...a,
        productFlowMetadata: a.productFlowMetadata
          ? { ...a.productFlowMetadata, stepNumber: i + 1 }
          : a.productFlowMetadata,
      }));

      // Debounced save all to Firebase
      if (reorderTimerRef.current) clearTimeout(reorderTimerRef.current);
      reorderTimerRef.current = setTimeout(() => {
        updated.forEach((a) => {
          if (a.id && !a.id.startsWith('pending_')) {
            autoSaveAsset(a.id, a);
          }
        });
      }, 500);

      return updated;
    });
  }, [autoSaveAsset]);

  // ── Upload files via backend API ──
  const uploadFiles = useCallback(async (files: FileList, targetFolderId?: string) => {
    if (!user) return;
    const uploadFolderId = targetFolderId ?? folderId;

    const newUploading: UploadingFile[] = Array.from(files).map((file, i) => ({
      id: `upload_${Date.now()}_${i}`,
      file,
      name: file.name,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadingFiles((prev) => [...prev, ...newUploading]);
    // Show progress at 30% while uploading
    setUploadingFiles((prev) =>
      prev.map((u) => newUploading.some((n) => n.id === u.id) ? { ...u, progress: 30 } : u)
    );

    try {
      const token = await user.getIdToken();
      const fileArray = Array.from(files);
      const savedAssets = await uploadAssets(token, uploadFolderId, fileArray);

      setUploadingFiles((prev) =>
        prev.map((u) =>
          newUploading.some((n) => n.id === u.id)
            ? { ...u, progress: 100, status: 'done' as const }
            : u
        )
      );

      if (uploadFolderId === folderId) {
        setAssets((prev) => [...prev, ...savedAssets]);
      }

      // Update folder asset count in Firestore (for readiness badge)
      if (userId) {
        await updateAssetFolder(userId, uploadFolderId, {
          assetCount: assets.length + savedAssets.length,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadingFiles((prev) =>
        prev.map((u) =>
          newUploading.some((n) => n.id === u.id)
            ? { ...u, status: 'error' as const, progress: 0 }
            : u
        )
      );
      showToast('error', 'Upload failed', err instanceof Error ? err.message : 'Unknown error');
    }

    // Clear completed uploads after 3s
    setTimeout(() => {
      setUploadingFiles((prev) => prev.filter((u) => u.status !== 'done'));
    }, 3000);
  }, [user, userId, folderId, assets, showToast]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    // Filter to only image files
    const dt = new DataTransfer();
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        dt.items.add(file);
      }
    });
    if (dt.files.length === 0) return;
    if (!isComparator) {
      uploadFiles(dt.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    // Filter to only image files
    const dt = new DataTransfer();
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        dt.items.add(file);
      }
    });
    if (dt.files.length === 0) return;
    if (!isComparator) {
      uploadFiles(dt.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDeleteAsset = (assetId: string, assetName: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTarget({ id: assetId, name: assetName });
  };

  /** Inline delete for product-flow rows (called directly, not via modal) */
  const handleInlineDelete = useCallback(async (assetId: string, assetName: string) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await deleteAssetFromBackend(token, assetId, folderId);
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      showToast('success', 'Asset deleted', `"${assetName}" has been removed.`);
    } catch (err) {
      console.error('[DELETE] Error deleting asset:', err);
      showToast('error', 'Failed to delete asset', err instanceof Error ? err.message : 'Please try again.');
    }
  }, [user, folderId, showToast]);

  const confirmDeleteAsset = async () => {
    if (!deleteTarget || !user) return;
    const { id: assetId, name: assetName } = deleteTarget;
    try {
      const token = await user.getIdToken();
      await deleteAssetFromBackend(token, assetId, folderId);
      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      showToast('success', 'Asset deleted', `"${assetName}" has been removed.`);
      setDeleteTarget(null);
    } catch (err) {
      console.error('[DELETE] Error deleting asset:', err);
      showToast('error', 'Failed to delete asset', err instanceof Error ? err.message : 'Please try again.');
    }
  };

  const uploadCtaLabel = assetType === 'product-flow' ? 'Upload Flow Screens' : 'Upload Ad Creatives';

  return (
    <>
      <TopBar title={folderName} onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[1600px] mx-auto relative pb-28">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[13px] text-[#6B7280] mb-6">
          <Link href="/assets" className="hover:text-[#1A1A1A] transition-colors">
            Assets
          </Link>
          <span className="text-[#D1D5DB]">›</span>
          <span className="text-[#1A1A1A] font-medium">{folderName}</span>
          <span className="text-[#D1D5DB]">›</span>
          <span>{getAssetTypeLabel(assetType)}</span>
        </nav>

        <h1 className="text-[24px] font-bold text-[#1A1A1A] mb-2">{folderName}</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : isComparator ? (
          /* ── Comparator view — no upload here, upload inside each flow ── */
          <div className="space-y-6">
            <p className="text-[14px] text-[#4B5563] leading-[1.6] max-w-[640px]">
              Open a flow below to upload screens and set step metadata. Each flow holds its own assets for side-by-side comparison.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {subfolders.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/assets/${sub.id}?name=${encodeURIComponent(sub.name)}&type=${sub.assetType}`}
                  className="block"
                >
                  <Card hover className="border-l-[3px] border-l-accent-gold h-full">
                    <CardContent className="flex items-center gap-4 py-6">
                      <div className="w-12 h-12 shrink-0 rounded-[8px] bg-[#F59E0B]/10 flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-[#F59E0B]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] font-semibold text-[#1A1A1A]">{sub.name}</h3>
                        <p className="text-[13px] text-[#6B7280] mt-0.5">
                          {sub.assetCount} asset{sub.assetCount !== 1 ? 's' : ''} in this flow
                        </p>
                      </div>
                      <span className="text-[#9CA3AF] shrink-0">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* ── Regular folder view (Product Flow / Ad Creative) ── */
          <div className="space-y-5">
            {/* ── Ad Creative: keep old description ── */}
            {assetType === 'ad-creative' && (
              <p className="text-[14px] text-[#4B5563] leading-[1.6] max-w-[640px]">
                Upload creatives and add captions, platform, and hooks. Then use this folder when running ad simulations.
              </p>
            )}

            {/* ── DROP ZONE ── */}
            {isProductFlow && assets.length > 0 ? (
              /* Compact drop zone when assets exist */
              <div
                className={`
                  h-14 flex items-center justify-center gap-[10px] cursor-pointer
                  border-2 border-dashed rounded-[12px] transition-all duration-150 mb-4
                  ${dragOver
                    ? 'border-[#F59E0B] border-solid bg-[#FFFBEB]'
                    : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#D1D5DB]'}
                `}
                onClick={handleUploadClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <UploadCloud className={`w-4 h-4 ${dragOver ? 'text-[#92400E]' : 'text-[#9CA3AF]'}`} />
                <span className={`text-[13px] ${dragOver ? 'text-[#92400E]' : 'text-[#9CA3AF]'}`}>
                  Drop more screens here, or click to add
                </span>
              </div>
            ) : (
              /* Full drop zone */
              <div
                className={`
                  border-2 border-dashed rounded-[14px] p-7 text-center cursor-pointer transition-all duration-150
                  ${dragOver
                    ? 'border-[#F59E0B] border-solid bg-[#FFFBEB]'
                    : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#D1D5DB]'}
                `}
                onClick={handleUploadClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${dragOver ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'}`} />
                <p className={`text-[14px] font-medium ${dragOver ? 'text-[#92400E]' : 'text-[#6B7280]'}`}>
                  Drop screens here, or click to browse
                </p>
                <p className="text-[12px] text-[#9CA3AF] mt-1">
                  Images only (PNG, JPG, GIF, WebP, SVG) · Max 10MB per file · Multiple files supported
                </p>
              </div>
            )}

            {/* ── Upload progress inline ── */}
            {uploadingFiles.length > 0 && (
              <div className="space-y-2">
                {uploadingFiles.map((uf) => (
                  <div key={uf.id} className="bg-white border border-[#E8E4DE] rounded-[10px] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileImage className="w-4 h-4 text-[#9CA3AF]" />
                        <span className="text-[13px] font-medium text-[#1A1A1A]">{uf.name}</span>
                      </div>
                      <span className={`text-[12px] ${uf.status === 'done' ? 'text-[#065F46]' : uf.status === 'error' ? 'text-[#EF4444]' : 'text-[#6B7280]'}`}>
                        {uf.status === 'uploading' ? `Uploading... ${uf.progress}%` : uf.status === 'done' ? '✓ Uploaded' : '✕ Failed'}
                      </span>
                    </div>
                    <div className="mt-2 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${uf.status === 'done' ? 'bg-[#10B981]' : uf.status === 'error' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'}`}
                        style={{ width: `${uf.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ═══ PRODUCT FLOW — NEW SORTABLE LIST ═══ */}
            {isProductFlow && assets.length > 0 && (
                <>
                  {/* ── Instructional header ── */}
                  <div className="mb-5">
                    <h2 className="text-[17px] font-bold text-[#1A1A1A] mb-1">
                      Arrange your screens in order
                    </h2>
                    <p className="text-[14px] text-[#4B5563] leading-[1.6] max-w-[600px]">
                      Drag rows to set the step sequence. Position = step number.<br />
                      Optionally name each screen to help the simulator understand the context.
                    </p>
                  </div>

                  {/* ── Row container: constrained width ── */}
                  <div className="max-w-[780px]">
                    {/* ── Column header strip ── */}
                    <div
                      className="grid items-center bg-[#F9FAFB] border border-[#E8E4DE] rounded-[10px] px-[14px] py-2 mb-2"
                      style={{ gridTemplateColumns: '28px 44px 56px 1fr 150px 36px', gap: '10px' }}
                    >
                      <span /> {/* drag handle col */}
                      <span className="text-[11px] font-bold text-[#4B5563] uppercase" style={{ letterSpacing: '0.07em' }}>
                        Step
                      </span>
                      <span /> {/* thumbnail col */}
                      <span className="text-[11px] font-bold text-[#4B5563] uppercase" style={{ letterSpacing: '0.07em' }}>
                        Screen name
                      </span>
                      <span className="text-[11px] font-bold text-[#4B5563] uppercase" style={{ letterSpacing: '0.07em' }}>
                        Page type
                      </span>
                      <span /> {/* delete col */}
                    </div>

                    {/* ── Sortable list ── */}
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={assets.map((a) => a.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {assets.map((asset, index) => (
                          <SortableAssetRow
                            key={asset.id}
                            asset={asset}
                            stepNumber={index + 1}
                            onSaveField={handleSaveField}
                            onDelete={handleInlineDelete}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </>
            )}

            {/* ═══ AD CREATIVE — keep old card grid ═══ */}
            {!isProductFlow && assets.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {assets.map((asset) => {
                  const hasCaption = asset.adCreativeMetadata?.caption != null && asset.adCreativeMetadata.caption.trim() !== '';
                  return (
                    <div
                      key={asset.id}
                      className="bg-white border border-[#E8E4DE] rounded-[12px] overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200"
                    >
                      {/* Image preview */}
                      <div className="h-[160px] w-full bg-[#F3F4F6] border-b border-[#E8E4DE] flex items-center justify-center overflow-hidden">
                        {asset.url && asset.url !== '#' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-[#D1D5DB]" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="px-4 py-[14px]">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            {assetType === 'ad-creative' && asset.adCreativeMetadata && (
                              <p className="text-[13px] text-[#6B7280] line-clamp-2">
                                {asset.adCreativeMetadata.caption || 'No caption'}
                              </p>
                            )}
                            <p className="text-[12px] text-[#9CA3AF] truncate mt-0.5" title={asset.name}>
                              {asset.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedAsset(asset);
                              }}
                              className="inline-flex items-center gap-1 text-[12px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors px-1.5 py-1 rounded"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </button>
                            <IconButton
                              icon={<Trash2 className="w-3.5 h-3.5" />}
                              label="Delete asset"
                              onClick={handleDeleteAsset(asset.id, asset.name)}
                              className="!w-7 !h-7 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEE2E2]"
                            />
                          </div>
                        </div>
                        {/* Warning when caption missing for ad creative */}
                        {assetType === 'ad-creative' && !hasCaption && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedAsset(asset);
                            }}
                            className="flex items-center gap-1.5 bg-[#FEF3C7] rounded-[6px] px-[10px] py-1.5 mt-[10px] w-full text-left hover:bg-[#FDE68A] transition-colors"
                          >
                            <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                            <span className="text-[12px] font-medium text-[#92400E]">
                              Add caption
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {assets.length === 0 && uploadingFiles.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
                <p className="text-[14px] text-[#6B7280]">
                  No assets yet. Drop files above or click to browse.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif,.webp,.svg"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* ── New footer ── */}
        {!isComparator && (
          <div className="fixed bottom-0 left-0 lg:left-[240px] right-0 z-40 bg-white border-t border-[#E8E4DE] px-4 lg:px-7 py-3">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              {/* Left: readiness + auto-save status */}
              <div className="flex items-center gap-4">
                {isProductFlow && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[#10B981]">
                    <CheckCircle2 className="w-4 h-4" />
                    {assets.length} screen{assets.length !== 1 ? 's' : ''} ready
                  </span>
                )}

                {/* Auto-save indicator */}
                {autoSaveStatus === 'saving' && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving...
                  </span>
                )}
                {autoSaveStatus === 'saved' && (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#10B981]">
                    <Check className="w-3.5 h-3.5" />
                    All changes saved
                  </span>
                )}
                {autoSaveStatus === 'error' && (
                  <button
                    onClick={() => setAutoSaveStatus('idle')}
                    className="inline-flex items-center gap-1.5 text-[12px] text-[#EF4444] hover:underline"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Save failed — retry
                  </button>
                )}
              </div>

              {/* Right: Upload button */}
              <button
                className="inline-flex items-center gap-2 px-5 py-[10px] text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[10px] hover:bg-[#D97706] transition-colors shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
                onClick={handleUploadClick}
              >
                <Plus className="w-[18px] h-[18px]" />
                {uploadCtaLabel}
              </button>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Side panel — only for ad-creative folders */}
      {!isProductFlow && (
        <AssetSidePanel
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onSave={handleSaveAsset}
        />
      )}

      <DeleteAssetModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        assetName={deleteTarget?.name ?? null}
        onConfirm={confirmDeleteAsset}
      />
    </>
  );
}
