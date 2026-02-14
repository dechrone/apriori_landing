"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Copy,
  Upload,
  ArrowLeft,
  Play,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Types
interface AdUnit {
  id: string;
  creative: File | null;
  creativePreview: string | null;
  caption: string;
  location: string;
  ageMin: string;
  ageMax: string;
  gender: string;
  detailedTargeting: string;
  budget: string;
}

const GENDER_OPTIONS = [
  { value: "", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "custom", label: "Custom" },
];

const createEmptyAdUnit = (): AdUnit => ({
  id: crypto.randomUUID(),
  creative: null,
  creativePreview: null,
  caption: "",
  location: "",
  ageMin: "18",
  ageMax: "65+",
  gender: "",
  detailedTargeting: "",
  budget: "",
});

export function AdPortfolioAuditConfig() {
  const [ads, setAds] = useState<AdUnit[]>(() => [createEmptyAdUnit()]);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Handlers
  const addAd = useCallback(() => {
    setAds((prev) => [...prev, createEmptyAdUnit()]);
  }, []);

  const removeAd = useCallback((id: string) => {
    setAds((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const duplicateAd = useCallback((id: string) => {
    const ad = ads.find((a) => a.id === id);
    if (!ad) return;
    const duplicated: AdUnit = {
      ...ad,
      id: crypto.randomUUID(),
      creative: null,
      creativePreview: null,
    };
    const index = ads.findIndex((a) => a.id === id);
    setAds((prev) => [
      ...prev.slice(0, index + 1),
      duplicated,
      ...prev.slice(index + 1),
    ]);
  }, [ads]);

  const updateAd = useCallback(
    (id: string, updates: Partial<AdUnit>) => {
      setAds((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
      );
    },
    []
  );

  const handleCreativeChange = useCallback(
    (adId: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        updateAd(adId, {
          creative: file,
          creativePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [updateAd]
  );

  const removeCreative = useCallback(
    (adId: string) => {
      updateAd(adId, { creative: null, creativePreview: null });
      const input = fileInputRefs.current[adId];
      if (input) input.value = "";
    },
    [updateAd]
  );

  const handleDrop = useCallback(
    (adId: string, e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        updateAd(adId, {
          creative: file,
          creativePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    },
    [updateAd]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Validation
  const allAdsValid = ads.every(
    (a) => a.creativePreview && a.caption.trim().length > 0
  );
  const canSubmit = allAdsValid;

  // Submit handler (mock)
  const handleSubmit = useCallback(() => {
    const payload = ads.map((a) => ({
      hasCreative: !!a.creative,
      creativeName: a.creative?.name,
      caption: a.caption,
      targeting: {
        location: a.location,
        ageRange: `${a.ageMin}-${a.ageMax}`,
        gender: a.gender || "all",
        detailedTargeting: a.detailedTargeting,
      },
      budget: a.budget ? `$${a.budget}` : null,
    }));
    console.log("[Ad Portfolio Audit] Submission payload:", payload);
    alert("Portfolio analysis submitted! (Mock)\n\nCheck the console for the payload.");
  }, [ads]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium shrink-0"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>
          <h1 className="text-lg font-semibold text-white truncate">
            Ad Portfolio Setup
          </h1>
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={18} />}
            onClick={addAd}
            className="shrink-0"
          >
            Add New Ad
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-16 py-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {ads.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                canDelete={ads.length > 1}
                onUpdate={(updates) => updateAd(ad.id, updates)}
                onDelete={() => removeAd(ad.id)}
                onDuplicate={() => duplicateAd(ad.id)}
                onCreativeChange={(e) => handleCreativeChange(ad.id, e)}
                onCreativeRemove={() => removeCreative(ad.id)}
                onCreativeDrop={(e) => handleDrop(ad.id, e)}
                onDragOver={handleDragOver}
                fileInputRef={(el) => {
                  fileInputRefs.current[ad.id] = el;
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
          <p className="text-sm text-slate-400 hidden sm:block">
            {!canSubmit &&
              "Each ad must have a creative and caption to run analysis."}
            {canSubmit && "Ready to run portfolio analysis."}
          </p>
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Play size={20} />}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="min-w-[220px]"
          >
            Run Portfolio Analysis
          </Button>
        </div>
      </footer>
    </div>
  );
}

// Ad Card Component
interface AdCardProps {
  ad: AdUnit;
  canDelete: boolean;
  onUpdate: (updates: Partial<AdUnit>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCreativeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreativeRemove: () => void;
  onCreativeDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  fileInputRef: (el: HTMLInputElement | null) => void;
}

function AdCard({
  ad,
  canDelete,
  onUpdate,
  onDelete,
  onDuplicate,
  onCreativeChange,
  onCreativeRemove,
  onCreativeDrop,
  onDragOver,
  fileInputRef,
}: AdCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative rounded-lg bg-slate-900 border border-slate-800 overflow-hidden"
    >
      {/* Action buttons - top right */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={onDuplicate}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-orange-500 hover:bg-slate-700/80 transition-colors"
          aria-label="Duplicate ad"
        >
          <Copy size={16} />
        </button>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            aria-label="Delete ad"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* 1. Creative Asset */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Creative Asset
          </label>
          <input
            ref={(el) => {
              inputRef.current = el;
              fileInputRef(el);
            }}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onCreativeChange}
          />
          {ad.creativePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800/50">
              <img
                src={ad.creativePreview}
                alt="Ad creative preview"
                className="w-full h-40 object-cover object-top"
              />
              <button
                type="button"
                onClick={onCreativeRemove}
                className="absolute bottom-2 right-2 px-3 py-1.5 rounded text-xs font-medium bg-slate-900/90 text-slate-300 hover:text-orange-500 hover:bg-slate-800 transition-colors"
              >
                Change / Remove
              </button>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={onCreativeDrop}
              onDragOver={onDragOver}
              className="flex flex-col items-center justify-center h-36 rounded-lg border-2 border-dashed border-slate-700 hover:border-orange-500/50 bg-slate-800/30 cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2 group-hover:bg-orange-500/20 transition-colors">
                <ImageIcon size={20} className="text-orange-500" />
              </div>
              <p className="text-sm text-slate-400">Upload Ad Creative</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Drag & drop or click
              </p>
            </div>
          )}
        </div>

        {/* 2. Ad Copy */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Primary Text / Caption
          </label>
          <textarea
            value={ad.caption}
            onChange={(e) => onUpdate({ caption: e.target.value })}
            placeholder="Enter the ad copy..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none transition-colors resize-none text-sm"
          />
        </div>

        {/* 3. Targeting Configuration */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <span className="text-xs font-medium text-slate-400">
            Targeting (Meta Style)
          </span>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={ad.location}
              onChange={(e) => onUpdate({ location: e.target.value })}
              placeholder="e.g., United States"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">
                Age Min
              </label>
              <input
                type="text"
                value={ad.ageMin}
                onChange={(e) => onUpdate({ ageMin: e.target.value })}
                placeholder="18"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">
                Age Max
              </label>
              <input
                type="text"
                value={ad.ageMax}
                onChange={(e) => onUpdate({ ageMax: e.target.value })}
                placeholder="65+"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">
              Gender
            </label>
            <select
              value={ad.gender}
              onChange={(e) => onUpdate({ gender: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
            >
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1.5">
              Detailed Targeting (Interests / Behaviors)
            </label>
            <input
              type="text"
              value={ad.detailedTargeting}
              onChange={(e) =>
                onUpdate({ detailedTargeting: e.target.value })
              }
              placeholder="e.g., SaaS, Marketing, Startup Founders"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
            />
          </div>
        </div>

        {/* 4. Budget (Optional) */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Budget (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              $
            </span>
            <input
              type="text"
              value={ad.budget}
              onChange={(e) => onUpdate({ budget: e.target.value })}
              placeholder="0"
              className="w-full pl-7 pr-3 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
