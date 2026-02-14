"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import type { Asset } from '@/types/asset';
import type { ProductFlowMetadata, ProductFlowPageType } from '@/types/asset';

const PAGE_TYPES: { value: ProductFlowPageType; label: string }[] = [
  { value: 'signup', label: 'Signup' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'checkout', label: 'Checkout' },
  { value: 'other', label: 'Other' },
];

interface ProductFlowMetadataFormProps {
  asset: Asset;
  onSave: (data: ProductFlowMetadata) => void;
}

export function ProductFlowMetadataForm({ asset, onSave }: ProductFlowMetadataFormProps) {
  const meta = asset.productFlowMetadata ?? {
    stepNumber: 1,
    stepName: '',
    pageType: 'other' as ProductFlowPageType,
  };
  const [stepNumber, setStepNumber] = useState(meta.stepNumber);
  const [stepName, setStepName] = useState(meta.stepName);
  const [pageType, setPageType] = useState(meta.pageType);
  const [userIntent, setUserIntent] = useState(meta.userIntent ?? '');
  const [expectedAction, setExpectedAction] = useState(meta.expectedAction ?? '');
  const [notes, setNotes] = useState(meta.notes ?? '');

  useEffect(() => {
    setStepNumber(meta.stepNumber);
    setStepName(meta.stepName);
    setPageType(meta.pageType);
    setUserIntent(meta.userIntent ?? '');
    setExpectedAction(meta.expectedAction ?? '');
    setNotes(meta.notes ?? '');
  }, [asset.id, meta.stepNumber, meta.stepName, meta.pageType, meta.userIntent, meta.expectedAction, meta.notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      stepNumber,
      stepName,
      pageType,
      userIntent: userIntent || undefined,
      expectedAction: expectedAction || undefined,
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Step number"
        type="number"
        min={1}
        required
        value={stepNumber}
        onChange={(e) => setStepNumber(parseInt(e.target.value, 10) || 1)}
      />
      <Input
        label="Step name (optional)"
        placeholder="e.g., Signup, Pricing, Dashboard"
        value={stepName}
        onChange={(e) => setStepName(e.target.value)}
      />
      <Select
        label="Page type (optional)"
        value={pageType}
        onChange={(e) => setPageType(e.target.value as ProductFlowPageType)}
        options={PAGE_TYPES.map((p) => ({ value: p.value, label: p.label }))}
      />
      <Input
        label="User intent at this step (optional)"
        placeholder="e.g., Compare plans"
        value={userIntent}
        onChange={(e) => setUserIntent(e.target.value)}
      />
      <Input
        label="Expected user action (optional)"
        placeholder="e.g., Click CTA"
        value={expectedAction}
        onChange={(e) => setExpectedAction(e.target.value)}
      />
      <Textarea
        label="Notes for simulation (optional)"
        placeholder="e.g., Friction point to test"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
      />
      <Button type="submit">Save metadata</Button>
    </form>
  );
}
