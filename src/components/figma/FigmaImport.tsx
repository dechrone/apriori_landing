'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-stub';
import { apiFetch } from '@/lib/api';
import FigmaFilePicker, { type PageSelection } from './FigmaFilePicker';
import ScreenPicker, { type ConfirmPayload } from './ScreenPicker';
import { Loader2, ChevronRight, FileImage, LayoutGrid } from 'lucide-react';

type Step = 'pick-file' | 'pick-screens' | 'saving' | 'done';

interface FigmaImportProps {
  projectId?: string;
  onComplete: (payload?: ConfirmPayload) => void;
}

export default function FigmaImport({ projectId, onComplete }: FigmaImportProps) {
  const { getToken } = useAuth();
  const [step, setStep] = useState<Step>('pick-file');
  const [fileInfo, setFileInfo] = useState<PageSelection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePageSelected = (info: PageSelection) => {
    setFileInfo(info);
    setStep('pick-screens');
  };

  const handleConfirm = async ({ fileKey, fileName, pageId, pageName, frames }: ConfirmPayload) => {
    setStep('saving');
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');
      await apiFetch('/api/v1/figma/project-source', token, {
        method: 'POST',
        body: JSON.stringify({ projectId, fileKey, fileName, pageId, pageName, frames }),
      });
      setStep('done');
      onComplete({ fileKey, fileName, pageId, pageName, frames });
    } catch {
      setError('Something went wrong saving your screens. Try again.');
      setStep('pick-screens');
    }
  };

  const handleBack = () => {
    if (step === 'pick-screens') {
      setStep('pick-file');
      setFileInfo(null);
      setError(null);
    }
  };

  /* ── Saving state ──────────────────────────────────────────────── */
  if (step === 'saving') {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-10 h-10 border-[3px] border-accent-gold border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-[13px] text-text-secondary">
          Saving screens and starting simulation…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-1.5">
        <StepIndicator
          icon={<FileImage className="w-3.5 h-3.5" />}
          label="Select file"
          isActive={step === 'pick-file'}
          isComplete={step === 'pick-screens'}
        />
        <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />
        <StepIndicator
          icon={<LayoutGrid className="w-3.5 h-3.5" />}
          label="Pick screens"
          isActive={step === 'pick-screens'}
          isComplete={false}
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="text-[13px] text-[#EF4444] bg-[#EF4444]/5 border border-[#EF4444]/20 px-4 py-2.5 rounded-lg">
          {error}
        </div>
      )}

      {/* Back button on step 2 */}
      {step === 'pick-screens' && (
        <button
          onClick={handleBack}
          className="text-[12px] text-text-tertiary hover:text-text-primary transition-colors cursor-pointer flex items-center gap-1"
        >
          ← Back to file picker
        </button>
      )}

      {/* Steps */}
      {step === 'pick-file' && <FigmaFilePicker onPageSelected={handlePageSelected} />}

      {step === 'pick-screens' && fileInfo && (
        <ScreenPicker
          fileKey={fileInfo.fileKey}
          fileName={fileInfo.fileName}
          pageId={fileInfo.pageId}
          pageName={fileInfo.pageName}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

/* ─── Step indicator pill ─────────────────────────────────────────────── */

function StepIndicator({
  icon,
  label,
  isActive,
  isComplete,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isComplete: boolean;
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full transition-colors
        ${isActive ? 'text-accent-gold bg-accent-gold/10' : ''}
        ${isComplete ? 'text-[#10B981] bg-[#10B981]/10' : ''}
        ${!isActive && !isComplete ? 'text-text-tertiary' : ''}
      `}
    >
      {icon}
      {label}
    </span>
  );
}
