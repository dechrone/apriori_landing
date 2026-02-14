"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
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

  useEffect(() => {
    setCaption(meta.caption);
    setCreativeFormat(meta.creativeFormat);
    setPlatform(meta.platform);
    setHookType(meta.hookType ?? '');
    setCtaType(meta.ctaType ?? '');
    setAngleTheme(meta.angleTheme ?? '');
    setTargetPersonaId(meta.targetPersonaId ?? '');
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Textarea
        label="Primary caption / ad copy (optional)"
        placeholder="e.g., Stop guessing. Start simulating."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={4}
      />
      <Input
        label="Target group / audience (optional)"
        placeholder="e.g., Growth PMs at PLG SaaS companies"
        value={targetPersonaId}
        onChange={(e) => setTargetPersonaId(e.target.value)}
      />
      <Select
        label="Creative format"
        required
        value={creativeFormat}
        onChange={(e) => setCreativeFormat(e.target.value as CreativeFormat)}
        options={FORMATS.map((f) => ({ value: f.value, label: f.label }))}
      />
      <Select
        label="Platform"
        required
        value={platform}
        onChange={(e) => setPlatform(e.target.value as AdPlatform)}
        options={PLATFORMS.map((p) => ({ value: p.value, label: p.label }))}
      />
      <Select
        label="Hook type (optional)"
        value={hookType}
        onChange={(e) => setHookType(e.target.value)}
        options={[
          { value: '', label: 'Select…' },
          ...HOOK_TYPES.map((h) => ({ value: h.value, label: h.label })),
        ]}
      />
      <Input
        label="CTA type (optional)"
        placeholder="e.g., Sign up, Learn more"
        value={ctaType}
        onChange={(e) => setCtaType(e.target.value)}
      />
      <Input
        label="Angle / theme tag (optional)"
        placeholder="e.g., Q1 launch"
        value={angleTheme}
        onChange={(e) => setAngleTheme(e.target.value)}
      />
      <Button type="submit">Save metadata</Button>
    </form>
  );
}
