"use client";

import { useState, useEffect } from 'react';
import type { Asset } from '@/types/asset';
import type { AdCreativeMetadata, AdPlatform, CreativeFormat, HookType } from '@/types/asset';

const PLATFORMS: { value: AdPlatform; label: string }[] = [
  { value: 'meta', label: 'Meta' },
  { value: 'google', label: 'Google' },
  { value: 'generic', label: 'Generic' },
];

const FORMATS: { value: CreativeFormat; label: string }[] = [
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
];

const HOOK_TYPES: { value: HookType; label: string }[] = [
  { value: 'pain-driven', label: 'Pain-driven' },
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'authority', label: 'Authority' },
  { value: 'offer-led', label: 'Offer-led' },
];

interface AdCreativeMetadataFormProps {
  asset: Asset;
  onSave: (data: AdCreativeMetadata) => void;
}

export function AdCreativeMetadataForm({ asset, onSave }: AdCreativeMetadataFormProps) {
  const meta = asset.adCreativeMetadata ?? {
    caption: '',
    creativeFormat: 'image',
    platform: 'generic',
  };
  const [caption, setCaption] = useState(meta.caption);
  const [creativeFormat, setCreativeFormat] = useState(meta.creativeFormat);
  const [platform, setPlatform] = useState(meta.platform);
  const [hookType, setHookType] = useState(meta.hookType ?? '');
  const [ctaType, setCtaType] = useState(meta.ctaType ?? '');
  const [angleTheme, setAngleTheme] = useState(meta.angleTheme ?? '');
  const [targetPersonaId, setTargetPersonaId] = useState(meta.targetPersonaId ?? '');
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    setCaption(meta.caption);
    setCreativeFormat(meta.creativeFormat);
    setPlatform(meta.platform);
    setHookType(meta.hookType ?? '');
    setCtaType(meta.ctaType ?? '');
    setAngleTheme(meta.angleTheme ?? '');
    setTargetPersonaId(meta.targetPersonaId ?? '');
    setSaveState('idle');
  }, [
    asset.id,
    meta.caption,
    meta.creativeFormat,
    meta.platform,
    meta.hookType,
    meta.ctaType,
    meta.angleTheme,
    meta.targetPersonaId,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      caption,
      creativeFormat,
      platform,
      hookType: (hookType || undefined) as HookType | undefined,
      ctaType: ctaType || undefined,
      angleTheme: angleTheme || undefined,
      targetPersonaId: targetPersonaId || undefined,
    });
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const inputClasses = "w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all";
  const selectClasses = "w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Primary caption / ad copy <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <textarea
          placeholder="e.g., Stop guessing. Start simulating."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Target group / audience <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Growth PMs at PLG SaaS companies"
          value={targetPersonaId}
          onChange={(e) => setTargetPersonaId(e.target.value)}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Creative format <span className="text-accent-red ml-0.5">*</span>
        </label>
        <select
          required
          value={creativeFormat}
          onChange={(e) => setCreativeFormat(e.target.value as CreativeFormat)}
          className={selectClasses}
        >
          {FORMATS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Platform <span className="text-accent-red ml-0.5">*</span>
        </label>
        <select
          required
          value={platform}
          onChange={(e) => setPlatform(e.target.value as AdPlatform)}
          className={selectClasses}
        >
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Hook type <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <select
          value={hookType}
          onChange={(e) => setHookType(e.target.value)}
          className={selectClasses}
        >
          <option value="">Select…</option>
          {HOOK_TYPES.map((h) => (
            <option key={h.value} value={h.value}>{h.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          CTA type <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Sign up, Learn more"
          value={ctaType}
          onChange={(e) => setCtaType(e.target.value)}
          className={inputClasses}
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Angle / theme tag <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Q1 launch"
          value={angleTheme}
          onChange={(e) => setAngleTheme(e.target.value)}
          className={inputClasses}
        />
      </div>
      <button
        type="submit"
        className={`w-full py-3 px-5 text-[14px] font-semibold rounded-[10px] transition-all duration-200
          ${saveState === 'saved'
            ? 'bg-[#10B981] text-white'
            : 'bg-[#F59E0B] text-white hover:bg-[#D97706]'
          }`}
      >
        {saveState === 'saved' ? '✓ Saved' : 'Save step details'}
      </button>
    </form>
  );
}
