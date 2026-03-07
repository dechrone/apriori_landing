"use client";

import { useState, useEffect } from 'react';
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
  const [stepError, setStepError] = useState('');
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    setStepNumber(meta.stepNumber);
    setStepName(meta.stepName);
    setPageType(meta.pageType);
    setUserIntent(meta.userIntent ?? '');
    setExpectedAction(meta.expectedAction ?? '');
    setNotes(meta.notes ?? '');
    setStepError('');
    setSaveState('idle');
  }, [asset.id, meta.stepNumber, meta.stepName, meta.pageType, meta.userIntent, meta.expectedAction, meta.notes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepNumber || stepNumber < 1) {
      setStepError('Step number is required to run simulations.');
      return;
    }
    setStepError('');
    onSave({
      stepNumber,
      stepName,
      pageType,
      userIntent: userIntent || undefined,
      expectedAction: expectedAction || undefined,
      notes: notes || undefined,
    });
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Step number — prominent */}
      <div>
        <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1.5">
          Step number <span className="text-[12px] text-[#F59E0B] font-medium ml-1">(required)</span>
        </label>
        <input
          type="number"
          min={1}
          required
          value={stepNumber}
          onChange={(e) => {
            setStepNumber(parseInt(e.target.value, 10) || 0);
            setStepError('');
          }}
          className="w-[80px] h-[48px] text-[20px] font-bold text-center border-2 border-[#E5E7EB] rounded-[10px] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
        />
        {stepError && (
          <p className="mt-1 text-[12px] text-[#EF4444]">{stepError}</p>
        )}
        <p className="mt-1.5 text-[12px] text-[#9CA3AF]">
          This is the order of this screen in the user journey.
        </p>
      </div>

      {/* Step name */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Step name <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Signup, Pricing, Dashboard"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
          className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
        />
      </div>

      {/* Page type */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Page type <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <select
          value={pageType}
          onChange={(e) => setPageType(e.target.value as ProductFlowPageType)}
          className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] bg-white focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
        >
          {PAGE_TYPES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* User intent */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          User intent at this step <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Compare plans"
          value={userIntent}
          onChange={(e) => setUserIntent(e.target.value)}
          className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
        />
      </div>

      {/* Expected action */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Expected user action <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <input
          placeholder="e.g., Click CTA"
          value={expectedAction}
          onChange={(e) => setExpectedAction(e.target.value)}
          className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[13px] font-medium text-[#374151] mb-1.5">
          Notes for simulation <span className="text-[12px] text-[#9CA3AF]">(optional)</span>
        </label>
        <textarea
          placeholder="e.g., Friction point to test"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full text-[14px] border border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F59E0B] focus:ring-[3px] focus:ring-[rgba(245,158,11,0.12)] transition-all resize-none"
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
