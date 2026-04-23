'use client';

import { useState } from 'react';
import { useUser } from '@/lib/auth-stub';
import FigmaFileBrowser from './FigmaFileBrowser';
import ScreenPicker from './ScreenPicker';
import type { ConfirmPayload } from './ScreenPicker';
import { saveAssetFolder, addAssetDocument } from '@/lib/db';

type ModalStep = 'browse' | 'pick-screens' | 'saving';

interface PageInfo {
  fileKey:  string;
  fileName: string;
  pageId:   string;
  pageName: string;
}

interface Props {
  isOpen:     boolean;
  onClose:    () => void;
  onComplete: (folderId: string) => void;
}

export default function FigmaImportModal({ isOpen, onClose, onComplete }: Props) {
  const { user }                    = useUser();
  const [step,     setStep]         = useState<ModalStep>('browse');
  const [pageInfo, setPageInfo]     = useState<PageInfo | null>(null);
  const [progress, setProgress]     = useState('');
  const [error,    setError]        = useState<string | null>(null);

  if (!isOpen) return null;

  function handlePageSelected(info: PageInfo) {
    setPageInfo(info);
    setStep('pick-screens');
  }

  async function handleConfirm(payload: ConfirmPayload) {
    if (!user) return;
    setStep('saving');
    setError(null);

    try {
      const userId = user.id;

      // 1. Create folder in Supabase
      setProgress('Creating folder...');
      const folderId = await saveAssetFolder(userId, {
        name:              `${payload.fileName} — ${payload.pageName}`,
        assetType:         'product-flow',
        description:       `Imported from Figma: ${payload.fileName}`,
        parentId:          null,
        createdAt:         new Date().toISOString(),
        updatedAt:         new Date().toISOString(),
        assetCount:        payload.frames.length,
        usedInSimulations: 0,
        status:            'ready',
      });

      // 2. Save each frame as an asset document in Supabase
      //    The imageUrl from Figma export CDN is stored directly.
      setProgress(`Saving ${payload.frames.length} screens...`);
      await Promise.all(
        payload.frames.map((frame) =>
          addAssetDocument(
            userId,
            folderId,
            {
              url:       frame.imageUrl,
              name:      frame.name,
              order:     frame.order,
              width:     frame.width,
              height:    frame.height,
              assetType: 'product-flow',
              source:    'figma',
              status:    'complete',
              createdAt: new Date().toISOString(),
              productFlowMetadata: {
                stepNumber: frame.order,
                stepName:   frame.name,
                pageType:   'other' as const,
              },
            },
            `figma/${payload.fileKey}/${frame.id}` // storagePath
          )
        )
      );

      onComplete(folderId);
      onClose();

    } catch (err) {
      console.error('Figma import error:', err);
      setError('Something went wrong. Please try again.');
      setStep('pick-screens');
    }
  }

  function handleClose() {
    if (step === 'saving') return;
    setStep('browse');
    setPageInfo(null);
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-primary rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Import from Figma
            </h2>
            {step !== 'saving' && (
              <div className="flex items-center gap-2 mt-1">
                <StepCrumb label="Choose file"   active={step === 'browse'} />
                <span className="text-text-secondary text-xs">→</span>
                <StepCrumb label="Pick screens"  active={step === 'pick-screens'} />
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            disabled={step === 'saving'}
            className="text-text-secondary hover:text-text-primary transition-colors text-xl leading-none disabled:opacity-40"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">

          {step === 'saving' && (
            <div className="py-20 text-center space-y-4">
              <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-text-secondary">{progress}</p>
            </div>
          )}

          {step !== 'saving' && error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg mb-4">
              {error}
            </p>
          )}

          {step === 'browse' && (
            <FigmaFileBrowser onPageSelected={handlePageSelected} />
          )}

          {step === 'pick-screens' && pageInfo && (
            <ScreenPicker
              fileKey={pageInfo.fileKey}
              fileName={pageInfo.fileName}
              pageId={pageInfo.pageId}
              pageName={pageInfo.pageName}
              onConfirm={handleConfirm}
              onBack={() => setStep('browse')}
            />
          )}
        </div>

      </div>
    </div>
  );
}

function StepCrumb({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`text-xs ${active ? 'text-accent-gold font-medium' : 'text-text-secondary'}`}>
      {label}
    </span>
  );
}
