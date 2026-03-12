'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-stub';
import { apiFetch } from '@/lib/api';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { GripVertical, X, Plus, Loader2 } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Frame {
  id: string;
  name: string;
  width: number;
  height: number;
}

export interface ConfirmedFrameData {
  id: string;
  name: string;
  order: number;
  imageUrl: string;
  width: number;
  height: number;
}

export interface ConfirmPayload {
  fileKey: string;
  fileName: string;
  pageId: string;
  pageName: string;
  frames: ConfirmedFrameData[];
}

interface ScreenPickerProps {
  fileKey: string;
  fileName: string;
  pageId: string;
  pageName: string;
  onConfirm: (payload: ConfirmPayload) => void;
  onBack?: () => void;
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function ScreenPicker({
  fileKey,
  fileName,
  pageId,
  pageName,
  onConfirm,
  onBack,
}: ScreenPickerProps) {
  const { getToken } = useAuth();
  const [frames, setFrames] = useState<Frame[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [loadingFrames, setLoadingFrames] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);

  /* Step 1 — fetch frame metadata */
  useEffect(() => {
    const load = async () => {
      const token = await getToken();
      if (!token) return;
      const data = await apiFetch<{ frames: Frame[] }>(
        `/api/v1/figma/files/${fileKey}/pages/${pageId}`,
        token,
      );
      setFrames(data.frames);
      setSelected(data.frames.map((f) => f.id)); // pre-select all
      setLoadingFrames(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey, pageId]);

  /* Step 2 — export thumbnails once frames are loaded */
  useEffect(() => {
    if (!frames.length) return;
    setLoadingImages(true);
    const load = async () => {
      const token = await getToken();
      if (!token) return;
      const data = await apiFetch<{ images: Record<string, string> }>(
        '/api/v1/figma/export',
        token,
        {
          method: 'POST',
          body: JSON.stringify({ fileKey, frameIds: frames.map((f) => f.id) }),
        },
      );
      setImages(data.images);
      setLoadingImages(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frames]);

  const toggleSelect = (frameId: string) => {
    setSelected((prev) =>
      prev.includes(frameId)
        ? prev.filter((id) => id !== frameId)
        : [...prev, frameId],
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setSelected((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over!.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleConfirm = () => {
    const orderedFrames: ConfirmedFrameData[] = selected.map((id, index) => {
      const frame = frames.find((f) => f.id === id)!;
      return {
        id: frame.id,
        name: frame.name,
        order: index + 1,
        imageUrl: images[id] ?? '',
        width: frame.width,
        height: frame.height,
      };
    });
    onConfirm({ fileKey, fileName, pageId, pageName, frames: orderedFrames });
  };

  /* Loading state */
  if (loadingFrames) {
    return (
      <div className="py-16 text-center flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-accent-gold" />
        <p className="text-[13px] text-text-secondary">Loading screens…</p>
      </div>
    );
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const unselected = frames.filter((f) => !selected.includes(f.id));

  return (
    <div className="space-y-6">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
        >
          ← Back to files
        </button>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-text-secondary">
          <span className="font-semibold text-text-primary">{selected.length}</span> of{' '}
          {frames.length} screens selected
          {loadingImages && (
            <span className="ml-2 inline-flex items-center gap-1 text-text-tertiary">
              <Loader2 className="w-3 h-3 animate-spin" />
              loading thumbnails…
            </span>
          )}
        </p>
        <button
          onClick={handleConfirm}
          disabled={selected.length === 0}
          className="bg-accent-gold text-white px-5 py-2 rounded-lg text-[13px] font-semibold
            disabled:opacity-40 hover:bg-accent-gold-hover hover:shadow-[var(--shadow-glow-gold)]
            transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
        >
          Confirm & Simulate →
        </button>
      </div>

      {/* Selected — drag to reorder */}
      <div>
        <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">
          Selected — drag to reorder
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={selected} strategy={rectSortingStrategy}>
            <div className="flex flex-wrap gap-3">
              {selected.map((id, index) => {
                const frame = frames.find((f) => f.id === id)!;
                return (
                  <SortableFrameCard
                    key={id}
                    frame={frame}
                    imageUrl={images[id]}
                    stepNumber={index + 1}
                    onRemove={() => toggleSelect(id)}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Excluded */}
      {unselected.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">
            Excluded — click to add back
          </p>
          <div className="flex flex-wrap gap-3">
            {unselected.map((frame) => (
              <FrameCard
                key={frame.id}
                frame={frame}
                imageUrl={images[frame.id]}
                stepNumber={null}
                isSelected={false}
                onToggle={() => toggleSelect(frame.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

interface SortableFrameCardProps {
  frame: Frame;
  imageUrl?: string;
  stepNumber: number;
  onRemove: () => void;
}

function SortableFrameCard({ frame, imageUrl, stepNumber, onRemove }: SortableFrameCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: frame.id });

  const style: React.CSSProperties = {
    transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <FrameCard
        frame={frame}
        imageUrl={imageUrl}
        stepNumber={stepNumber}
        isSelected
        onToggle={onRemove}
      />
    </div>
  );
}

interface FrameCardProps {
  frame: Frame;
  imageUrl?: string;
  stepNumber: number | null;
  isSelected: boolean;
  onToggle: () => void;
}

function FrameCard({ frame, imageUrl, stepNumber, isSelected, onToggle }: FrameCardProps) {
  return (
    <div
      className={`
        relative rounded-xl border-2 overflow-hidden transition-all group
        ${isSelected
          ? 'border-accent-gold shadow-[0_0_0_1px_var(--accent-gold)]'
          : 'border-border-subtle opacity-50 hover:opacity-70'
        }
      `}
      style={{ width: 120, flexShrink: 0 }}
    >
      {/* Thumbnail area */}
      <div
        className="bg-bg-hover relative"
        style={{ aspectRatio: `${frame.width}/${frame.height}` }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={frame.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-border-subtle" />
        )}

        {/* Step badge */}
        {stepNumber && (
          <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-accent-gold text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
            {stepNumber}
          </div>
        )}

        {/* Action button */}
        {isSelected ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#1C1917]/70 text-white rounded-full
              flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="absolute top-1.5 right-1.5 w-5 h-5 bg-accent-gold/80 text-white rounded-full
              flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        )}

        {/* Drag handle (selected only) */}
        {isSelected && (
          <div className="absolute bottom-1.5 right-1.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Label */}
      <p className="text-[11px] px-1.5 py-1.5 truncate text-center text-text-secondary bg-bg-secondary border-t border-border-subtle">
        {frame.name}
      </p>
    </div>
  );
}
