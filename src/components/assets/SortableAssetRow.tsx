"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Trash2,
  SlidersHorizontal,
  X,
  Loader2,
  FileImage,
  Check,
} from 'lucide-react';
import type { Asset, ProductFlowPageType, ProductFlowMetadata } from '@/types/asset';

const PAGE_TYPE_OPTIONS: { value: ProductFlowPageType; label: string }[] = [
  { value: 'landing', label: 'Landing' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'signup', label: 'Signup' },
  { value: 'login', label: 'Login' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'checkout', label: 'Checkout' },
  { value: 'confirmation', label: 'Confirmation' },
  { value: 'settings', label: 'Settings' },
  { value: 'other', label: 'Other' },
];

/** Derive a human-friendly default name from a filename */
function deriveNameFromFilename(filename: string): string {
  // Strip extension
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  // Replace underscores, hyphens with spaces
  const spaced = withoutExt.replace(/[_-]+/g, ' ').trim();
  // Title-case each word
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}

interface SortableAssetRowProps {
  asset: Asset;
  stepNumber: number;
  isUploading?: boolean;
  onSaveField: (assetId: string, updates: Partial<Asset>) => void;
  onDelete: (assetId: string, assetName: string) => void;
}

export function SortableAssetRow({
  asset,
  stepNumber,
  isUploading,
  onSaveField,
  onDelete,
}: SortableAssetRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: asset.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
    zIndex: isDragging ? 999 : 'auto' as const,
    rotate: isDragging ? '1deg' : '0deg',
  };

  const meta = asset.productFlowMetadata;
  const stepName = meta?.stepName ?? '';
  const pageType = meta?.pageType ?? 'other';

  // ── Change 4: derive default name from filename if stepName is empty ──
  const derivedName = useMemo(() => deriveNameFromFilename(asset.name), [asset.name]);
  const displayName = stepName.trim().length > 0 ? stepName : derivedName;
  const hasName = displayName.trim().length > 0;

  // ── Local state ──
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(displayName);
  const [showSaved, setShowSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [userIntent, setUserIntent] = useState(meta?.userIntent ?? '');
  const [expectedAction, setExpectedAction] = useState(meta?.expectedAction ?? '');
  const [notes, setNotes] = useState(meta?.notes ?? '');
  const [imgError, setImgError] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const hasSavedDerivedRef = useRef(false);

  // Auto-save derived name on first render if stepName is empty
  useEffect(() => {
    if (
      !hasSavedDerivedRef.current &&
      !isUploading &&
      asset.id &&
      !asset.id.startsWith('pending_') &&
      (meta?.stepName ?? '').trim().length === 0 &&
      derivedName.trim().length > 0
    ) {
      hasSavedDerivedRef.current = true;
      onSaveField(asset.id, {
        productFlowMetadata: {
          stepNumber: meta?.stepNumber ?? stepNumber,
          stepName: derivedName,
          pageType: meta?.pageType ?? 'other',
          userIntent: meta?.userIntent,
          expectedAction: meta?.expectedAction,
          notes: meta?.notes,
        },
      });
    }
  }, [asset.id, isUploading, meta, stepNumber, derivedName, onSaveField]);

  // Sync from props when asset changes externally
  useEffect(() => {
    const name = (meta?.stepName ?? '').trim().length > 0 ? meta!.stepName : derivedName;
    setNameValue(name);
    setUserIntent(meta?.userIntent ?? '');
    setExpectedAction(meta?.expectedAction ?? '');
    setNotes(meta?.notes ?? '');
  }, [asset.id, meta?.stepName, meta?.userIntent, meta?.expectedAction, meta?.notes, derivedName]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditing]);

  const buildMetadata = useCallback(
    (overrides: Partial<ProductFlowMetadata>): ProductFlowMetadata => ({
      stepNumber: meta?.stepNumber ?? stepNumber,
      stepName: meta?.stepName ?? '',
      pageType: meta?.pageType ?? 'other',
      userIntent: meta?.userIntent,
      expectedAction: meta?.expectedAction,
      notes: meta?.notes,
      ...overrides,
    }),
    [meta, stepNumber]
  );

  // ── Save helpers ──
  const saveName = useCallback(() => {
    const trimmed = nameValue.trim();
    if (trimmed === stepName) {
      setIsEditing(false);
      return;
    }
    onSaveField(asset.id, {
      productFlowMetadata: buildMetadata({ stepName: trimmed }),
    });
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1200);
  }, [nameValue, stepName, asset.id, onSaveField, buildMetadata]);

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveName();
    }
    if (e.key === 'Escape') {
      setNameValue(displayName);
      setIsEditing(false);
    }
  };

  const handlePageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as ProductFlowPageType;
    onSaveField(asset.id, {
      productFlowMetadata: buildMetadata({ pageType: val }),
    });
  };

  const handleOptionalBlur = (field: 'userIntent' | 'expectedAction' | 'notes', value: string) => {
    const trimmed = value.trim();
    const currentVal =
      field === 'userIntent'
        ? meta?.userIntent ?? ''
        : field === 'expectedAction'
        ? meta?.expectedAction ?? ''
        : meta?.notes ?? '';
    if (trimmed === currentVal) return;
    onSaveField(asset.id, {
      productFlowMetadata: buildMetadata({
        [field]: trimmed || undefined,
      }),
    });
  };

  const isIncomplete = !hasName;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative
        ${isDragging ? 'shadow-[0_8px_24px_rgba(0,0,0,0.12)]' : ''}
        ${deleteConfirm ? 'bg-[#FEF2F2]' : 'bg-white'}
        ${isIncomplete && !deleteConfirm ? 'border-l-2 border-l-[#D1D5DB] border-dashed rounded-r-[10px] rounded-l-none' : 'rounded-[10px]'}
        border border-[#E8E4DE]
        ${isDragging ? 'border-[#F59E0B]' : 'hover:border-[#D1D5DB] hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]'}
        transition-all duration-300
        mb-[6px]
      `}
    >
      {/* ── Delete confirmation overlay ── */}
      {deleteConfirm && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-[10px] z-10">
          <span className="text-[13px] font-medium text-[#991B1B]">Delete this screen?</span>
          <button
            onClick={() => setDeleteConfirm(false)}
            className="text-[13px] text-[#6B7280] hover:text-[#1A1A1A] underline"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(asset.id, asset.name);
              setDeleteConfirm(false);
            }}
            className="text-[13px] font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] px-3 py-1 rounded-[6px] transition-colors"
          >
            Delete
          </button>
        </div>
      )}

      {/* ── Main row — 6-column grid ── */}
      <div
        className={`
          grid items-center
          ${deleteConfirm ? 'opacity-0 pointer-events-none' : ''}
        `}
        style={{
          gridTemplateColumns: '28px 44px 56px 1fr 150px 36px',
          gap: '10px',
          padding: '10px 14px',
          minHeight: '60px',
        }}
      >
        {/* COL 1 — Drag handle */}
        <div className="flex items-center justify-center self-center">
          <button
            className="flex items-center justify-center cursor-grab active:cursor-grabbing text-[#D1D5DB] group-hover:text-[#9CA3AF] transition-colors"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>
        </div>

        {/* COL 2 — Step badge */}
        <div className="flex items-center justify-center self-center">
          <div
            className="w-[32px] h-[32px] rounded-full bg-[#F59E0B] text-white text-[13px] font-[800] flex items-center justify-center shrink-0"
            style={{ boxShadow: '0 1px 4px rgba(245,158,11,0.35)' }}
          >
            {isUploading ? '?' : stepNumber}
          </div>
        </div>

        {/* COL 3 — Thumbnail (56×44) */}
        <div className="flex items-center justify-center self-center">
          {isUploading ? (
            <div className="w-[56px] h-[44px] rounded-[6px] border border-[#E8E4DE] bg-[#F3F4F6] flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 animate-spin text-[#F59E0B]" />
            </div>
          ) : asset.url && asset.url !== '#' && !imgError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={asset.url}
              alt={asset.name}
              onError={() => setImgError(true)}
              className="w-[56px] h-[44px] object-cover rounded-[6px] border border-[#E8E4DE] block shrink-0"
            />
          ) : (
            <div className="w-[56px] h-[44px] rounded-[6px] border border-[#E8E4DE] bg-[#F3F4F6] flex items-center justify-center shrink-0">
              <FileImage className="w-5 h-5 text-[#D1D5DB]" />
            </div>
          )}
        </div>

        {/* COL 4 — Screen name */}
        <div className="flex flex-col justify-center self-center min-w-0">
          {isEditing ? (
            <div>
              <input
                ref={nameInputRef}
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={saveName}
                onKeyDown={handleNameKeyDown}
                className="w-full max-w-[320px] text-[13px] text-[#1A1A1A] border-[1.5px] border-[#FDE68A] rounded-[7px] px-[10px] py-[7px] bg-white focus:border-[#F59E0B] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:outline-none transition-all"
              />
              <p className="text-[11px] text-[#9CA3AF] mt-[2px] truncate">{asset.name}</p>
            </div>
          ) : !hasName ? (
            /* Empty state — amber-tinted input */
            <div>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Name this screen..."
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onFocus={() => setIsEditing(true)}
                onBlur={saveName}
                onKeyDown={handleNameKeyDown}
                className="w-full max-w-[320px] text-[13px] text-[#1A1A1A] italic placeholder:text-[#B45309] placeholder:italic border-[1.5px] border-[#FDE68A] rounded-[7px] px-[10px] py-[7px] bg-[#FFFBEB] focus:bg-white focus:border-[#F59E0B] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:outline-none transition-all"
              />
              <p className="text-[11px] text-[#9CA3AF] mt-[2px] truncate">{asset.name}</p>
            </div>
          ) : (
            /* Named state — click to edit */
            <div
              className="cursor-text group/name rounded-[7px] border border-transparent hover:border-[#E5E7EB] hover:bg-[#FAFAFA] px-[10px] py-[5px] -mx-[10px] transition-all"
              onClick={() => setIsEditing(true)}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-medium text-[#1A1A1A] truncate">
                  {displayName}
                </span>
                {showSaved && (
                  <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 animate-pulse" />
                )}
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-[2px] truncate">{asset.name}</p>
            </div>
          )}
        </div>

        {/* COL 5 — Page type dropdown */}
        <div className="flex items-center self-center">
          <select
            value={pageType}
            onChange={handlePageTypeChange}
            className={`
              border border-[#E5E7EB] rounded-[7px] px-[10px] py-[6px] text-[13px] bg-white w-full
              focus:outline-none focus:border-[#F59E0B] focus:ring-[2px] focus:ring-[rgba(245,158,11,0.1)]
              transition-all
              ${pageType === 'other' ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'}
            `}
          >
            {PAGE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* COL 6 — Delete + Details */}
        <div className="flex items-center justify-center gap-1 self-center">
          <button
            onClick={() => setDeleteConfirm(true)}
            className="flex items-center justify-center w-7 h-7 rounded-[6px] text-[#D1D5DB] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Details toggle button — always visible ── */}
      {!deleteConfirm && (
        <div className="px-[14px] pb-[10px] -mt-[2px]">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`
              inline-flex items-center gap-[4px] border rounded-[6px] px-2 py-[3px] text-[11px] cursor-pointer transition-all duration-150
              ${expanded
                ? 'border-[#F59E0B] bg-[#FEF3C7] text-[#92400E]'
                : 'border-[#E5E7EB] bg-white text-[#9CA3AF] hover:border-[#F59E0B] hover:bg-[#FFFBEB] hover:text-[#92400E]'
              }
            `}
          >
            <SlidersHorizontal className={`w-3.5 h-3.5 ${expanded ? 'text-[#92400E]' : 'text-[#9CA3AF] group-hover:text-[#F59E0B]'}`} />
            Details
          </button>
        </div>
      )}

      {/* ── Expanded detail panel ── */}
      {expanded && !deleteConfirm && (
        <div className="border-t border-[#E8E4DE] bg-[#FAFAFA] rounded-b-[10px] px-4 py-[14px]">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-[#374151]">Simulator context</span>
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] text-[#9CA3AF] hover:text-[#6B7280] hover:underline cursor-pointer"
                title="These fields help the AI understand what users are trying to do on this screen, leading to more accurate simulation results."
              >
                Why fill this?
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3-column fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* User intent */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6B7280] mb-[2px]">User intent</label>
              <p className="text-[10px] text-[#9CA3AF] mb-1">What the user is trying to do</p>
              <input
                type="text"
                placeholder="e.g., Compare subscription plans"
                value={userIntent}
                onChange={(e) => setUserIntent(e.target.value)}
                onBlur={() => handleOptionalBlur('userIntent', userIntent)}
                className="w-full text-[13px] text-[#1A1A1A] border border-[#E5E7EB] rounded-[7px] px-[10px] py-[7px] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.12)] transition-all"
              />
            </div>
            {/* Expected action */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6B7280] mb-[2px]">Expected action</label>
              <p className="text-[10px] text-[#9CA3AF] mb-1">The next step the user should take</p>
              <input
                type="text"
                placeholder="e.g., Click the Sign Up button"
                value={expectedAction}
                onChange={(e) => setExpectedAction(e.target.value)}
                onBlur={() => handleOptionalBlur('expectedAction', expectedAction)}
                className="w-full text-[13px] text-[#1A1A1A] border border-[#E5E7EB] rounded-[7px] px-[10px] py-[7px] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.12)] transition-all"
              />
            </div>
            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#6B7280] mb-[2px]">Simulator notes</label>
              <p className="text-[10px] text-[#9CA3AF] mb-1">Anything the AI should watch for</p>
              <input
                type="text"
                placeholder="e.g., Test whether the pricing is confusing"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => handleOptionalBlur('notes', notes)}
                className="w-full text-[13px] text-[#1A1A1A] border border-[#E5E7EB] rounded-[7px] px-[10px] py-[7px] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_0_2px_rgba(245,158,11,0.12)] transition-all"
              />
            </div>
          </div>

          {/* Bottom hint */}
          <p className="text-[11px] text-[#9CA3AF] mt-[10px] text-right">
            These hints improve AI accuracy — fill what you know, skip what you don&apos;t.
          </p>
        </div>
      )}
    </div>
  );
}
