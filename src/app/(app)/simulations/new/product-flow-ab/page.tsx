"use client";

import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useUser } from '@/contexts/UserContext';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  ChevronRight,
  Columns2,
  ExternalLink,
  Loader2,
  Upload,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createFolder, uploadAssets, updateAssetMetadata } from '@/lib/assets-api';
import {
  triggerProductFlowComparatorSimulation,
  fetchAudienceTemplates,
} from '@/lib/backend-simulation';
import type { AudienceTemplate } from '@/lib/backend-simulation';
import { saveSimulation, getSimulations } from '@/lib/db';
import { consumeNDJSONStream } from '@/lib/stream-simulation';
import { OBJECTIVE_PRESETS, CUSTOM_OBJECTIVE_ID } from '@/data/objective-presets';
import type { AbReport } from '@/types/ab-report';

interface PendingVariant {
  file: File;
  previewUrl: string;
}

export default function ProductFlowABSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useUser();
  const { getAccessToken } = useAuthContext();
  const router = useRouter();

  const [running, setRunning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [shake, setShake] = useState(false);
  const [streamProgress, setStreamProgress] = useState<{
    flows: Record<string, { personasTotal: number; personasDone: number }>;
    phase: string;
  } | null>(null);

  // Demo hero visibility — show for zero-prior-sim users only
  const [hasPriorSims, setHasPriorSims] = useState<boolean | null>(null);
  useEffect(() => {
    if (!userId || !profileReady) return;
    getSimulations(userId)
      .then((sims) => setHasPriorSims(sims.length > 0))
      .catch(() => setHasPriorSims(true)); // fail closed — hide hero on error
  }, [userId, profileReady]);

  // Audience templates (curated, loaded from local pool JSON)
  const [templates, setTemplates] = useState<AudienceTemplate[]>([]);
  useEffect(() => {
    fetchAudienceTemplates('IN')
      .then(setTemplates)
      .catch((err) => console.warn('[templates] fetch failed:', err));
  }, []);

  // Form state — single page, no step machine
  const [name, setName] = useState('');
  const [variantA, setVariantA] = useState<PendingVariant | null>(null);
  const [variantB, setVariantB] = useState<PendingVariant | null>(null);
  const [objectivePresetId, setObjectivePresetId] = useState<string>(OBJECTIVE_PRESETS[0].id);
  const [customObjective, setCustomObjective] = useState('');
  const [audienceTemplateId, setAudienceTemplateId] = useState<string>('');

  const resolvedObjective =
    objectivePresetId === CUSTOM_OBJECTIVE_ID
      ? customObjective.trim()
      : OBJECTIVE_PRESETS.find((p) => p.id === objectivePresetId)?.objective ?? '';

  const canSubmit =
    !!variantA &&
    !!variantB &&
    resolvedObjective.length >= 10 &&
    !!audienceTemplateId &&
    !running &&
    !uploading;

  const handleFile = (variant: 'A' | 'B', file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('error', 'Not an image', 'Please upload a PNG, JPEG, or WebP.');
      return;
    }
    const pending: PendingVariant = {
      file,
      previewUrl: URL.createObjectURL(file),
    };
    if (variant === 'A') {
      if (variantA) URL.revokeObjectURL(variantA.previewUrl);
      setVariantA(pending);
    } else {
      if (variantB) URL.revokeObjectURL(variantB.previewUrl);
      setVariantB(pending);
    }
  };

  const clearVariant = (variant: 'A' | 'B') => {
    if (variant === 'A' && variantA) {
      URL.revokeObjectURL(variantA.previewUrl);
      setVariantA(null);
    }
    if (variant === 'B' && variantB) {
      URL.revokeObjectURL(variantB.previewUrl);
      setVariantB(null);
    }
  };

  // Revoke any leftover preview URLs on unmount only. Replacing or clearing a
  // variant already revokes the prior URL inline (see handleFile / clearVariant);
  // depending on [variantA, variantB] would revoke both URLs whenever either
  // changed, leaving the other slot's preview broken.
  const variantARef = useRef<PendingVariant | null>(null);
  const variantBRef = useRef<PendingVariant | null>(null);
  variantARef.current = variantA;
  variantBRef.current = variantB;
  useEffect(
    () => () => {
      if (variantARef.current) URL.revokeObjectURL(variantARef.current.previewUrl);
      if (variantBRef.current) URL.revokeObjectURL(variantBRef.current.previewUrl);
    },
    [],
  );

  const handleSubmit = async () => {
    setValidationError('');
    if (!canSubmit) {
      let msg = '';
      if (!variantA || !variantB) msg = 'Upload both Variant A and Variant B screens.';
      else if (resolvedObjective.length < 10)
        msg = 'Pick a preset or write at least 10 characters for the objective.';
      else if (!audienceTemplateId) msg = 'Pick an audience template to continue.';
      setValidationError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }

    const selectedTemplate = templates.find((t) => t.id === audienceTemplateId);
    const audienceText =
      selectedTemplate?.target_group_seed || selectedTemplate?.name || '';

    const runName = name.trim() || `A/B · ${new Date().toLocaleString()}`;

    setUploading(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Not signed in — please refresh and try again.');

      // Comparator endpoint treats each folder as a separate flow. For a
      // single-screen A/B, we create one folder per variant with a single
      // screen in each.
      let folderA, folderB;
      try {
        [folderA, folderB] = await Promise.all([
          createFolder(token, {
            name: `${runName} · Variant A`,
            assetType: 'product-flow',
            description: 'Variant A',
          }),
          createFolder(token, {
            name: `${runName} · Variant B`,
            assetType: 'product-flow',
            description: 'Variant B',
          }),
        ]);
      } catch (e) {
        throw new Error(`Couldn't create the variant folders: ${e instanceof Error ? e.message : 'unknown error'}`);
      }

      let assetsA, assetsB;
      try {
        [assetsA, assetsB] = await Promise.all([
          uploadAssets(token, folderA.id, [variantA!.file]),
          uploadAssets(token, folderB.id, [variantB!.file]),
        ]);
      } catch (e) {
        throw new Error(`Couldn't upload the variant screens: ${e instanceof Error ? e.message : 'unknown error'}`);
      }

      await Promise.all([
        updateAssetMetadata(token, assetsA[0].id, folderA.id, { stepNumber: 1 }).catch(
          () => {},
        ),
        updateAssetMetadata(token, assetsB[0].id, folderB.id, { stepNumber: 1 }).catch(
          () => {},
        ),
      ]);

      setUploading(false);
      setRunning(true);
      setStreamProgress({ flows: {}, phase: 'starting' });

      let res: Response;
      try {
        res = await triggerProductFlowComparatorSimulation(userId, {
          name: runName,
          audience: audienceText,
          // 20 personas × 2 single-screen variants = 40 credits — five free runs
          // fit inside the 200-credit monthly grant.
          personaDepth: 'medium',
          numPersonas: 20,
          optimizeMetric: 'activation',
          selectedFolderIds: [folderA.id, folderB.id],
          audienceTemplateId,
          poolId: audienceTemplateId,
          objective: resolvedObjective,
        });
      } catch (e) {
        throw new Error(`Couldn't start the simulation: ${e instanceof Error ? e.message : 'unknown error'}`);
      }

      if (!res.ok) {
        if (res.status === 402) {
          const data = await res.json().catch(() => ({}));
          const detail = (data as { detail?: { required?: number; available?: number; message?: string } })
            .detail;
          showToast(
            'error',
            'Out of credits',
            detail?.message ||
              `You need ${detail?.required ?? '?'} credits but have ${detail?.available ?? 0}. Visit /pricing to upgrade.`,
          );
          return;
        }
        const text = await res.text();
        showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        return;
      }

      let comparisonData: AbReport | null = null;
      let streamError: string | null = null;

      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'flow_started') {
          setStreamProgress((prev) => ({
            flows: {
              ...(prev?.flows ?? {}),
              [event.data.flow_id]: { personasTotal: 0, personasDone: 0 },
            },
            phase: 'simulating',
          }));
        } else if (event.type === 'started') {
          setStreamProgress((prev) => ({
            flows: {
              ...(prev?.flows ?? {}),
              [event.data.flow_id]: {
                personasTotal: event.data.num_personas,
                personasDone: 0,
              },
            },
            phase: 'simulating',
          }));
        } else if (event.type === 'persona_complete') {
          const fid = event.data.flow_id ?? '';
          setStreamProgress((prev) => {
            const existing = prev?.flows[fid] ?? { personasTotal: 0, personasDone: 0 };
            return {
              flows: {
                ...(prev?.flows ?? {}),
                [fid]: { ...existing, personasDone: existing.personasDone + 1 },
              },
              phase: 'simulating',
            };
          });
        } else if (event.type === 'comparison_ready') {
          comparisonData = event.data;
          setStreamProgress((prev) => (prev ? { ...prev, phase: 'saving' } : null));
        } else if (event.type === 'error') {
          streamError = event.data.message;
        }
      });

      if (streamError) {
        showToast('error', 'Simulation error', streamError);
        return;
      }
      if (!comparisonData) {
        showToast('error', 'Simulation incomplete', 'No comparison results received from backend.');
        return;
      }

      const data = comparisonData as AbReport;
      const metric = data.verdict.sentence.split('.')[0] || 'A/B comparison';
      const docId = await saveSimulation(userId, {
        type: 'Product Flow Comparator',
        status: 'completed',
        name: runName,
        metric,
        timestamp: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
        simulationId: data.meta.simulation_id,
        result: data,
      });
      showToast('success', 'A/B complete', 'Redirecting to results.');
      router.push(`/simulations/product-flow-comparator/${docId}`);
    } catch (err) {
      showToast(
        'error',
        'Failed to run simulation',
        err instanceof Error
          ? err.message
          : "We couldn't reach the simulation engine. Please try again in a minute.",
      );
    } finally {
      setRunning(false);
      setUploading(false);
      setStreamProgress(null);
    }
  };

  return (
    <>
      <TopBar title="New Single-Screen A/B" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[720px] mx-auto pb-24">
          {hasPriorSims === false && <DemoHero />}

          {(uploading || running) && (
            <ProgressPanel uploading={uploading} streamProgress={streamProgress} />
          )}

          {!uploading && !running && (
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 sm:px-8">
              {/* Run name (optional) */}
              <div>
                <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
                  Run name <span className="text-[#9CA3AF] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Onboarding CTA — red vs. green"
                  className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#4F46E5] focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)] focus:outline-none transition-all"
                />
              </div>

              <div className="border-t border-[#F3F4F6] my-6" />

              {/* Two uploaders side-by-side */}
              <div>
                <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
                  Upload the two screens to compare <span className="text-[#EF4444]">*</span>
                </label>
                <p className="text-[13px] text-[#6B7280] mb-4">
                  PNG, JPEG, or WebP. One image per variant.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <VariantUploader
                    label="Variant A (current)"
                    variant={variantA}
                    onFile={(f) => handleFile('A', f)}
                    onClear={() => clearVariant('A')}
                  />
                  <VariantUploader
                    label="Variant B (test)"
                    variant={variantB}
                    onFile={(f) => handleFile('B', f)}
                    onClear={() => clearVariant('B')}
                  />
                </div>
              </div>

              <div className="border-t border-[#F3F4F6] my-6" />

              {/* Objective picker (presets + custom fallback) */}
              <div>
                <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
                  What are you comparing? <span className="text-[#EF4444]">*</span>
                </label>
                <div className="space-y-2">
                  {OBJECTIVE_PRESETS.map((preset) => (
                    <ObjectiveOption
                      key={preset.id}
                      label={preset.label}
                      selected={objectivePresetId === preset.id}
                      onSelect={() => setObjectivePresetId(preset.id)}
                    />
                  ))}
                  <ObjectiveOption
                    label="Write my own"
                    selected={objectivePresetId === CUSTOM_OBJECTIVE_ID}
                    onSelect={() => setObjectivePresetId(CUSTOM_OBJECTIVE_ID)}
                  />
                </div>
                {objectivePresetId === CUSTOM_OBJECTIVE_ID && (
                  <textarea
                    value={customObjective}
                    onChange={(e) => setCustomObjective(e.target.value)}
                    placeholder="Describe what you're comparing and what to look for…"
                    className="w-full mt-3 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 min-h-[90px] focus:border-[#4F46E5] focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)] focus:outline-none transition-all resize-y"
                  />
                )}
              </div>

              <div className="border-t border-[#F3F4F6] my-6" />

              {/* Audience template picker (templates only — no free-text mode) */}
              <div>
                <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
                  Audience <span className="text-[#EF4444]">*</span>
                </label>
                <p className="text-[13px] text-[#6B7280] mb-4">
                  Pick a curated template — pre-cached for speed.
                </p>
                {templates.length === 0 ? (
                  <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
                    <Loader2 className="w-5 h-5 animate-spin text-[#9CA3AF] mx-auto" />
                    <p className="text-[13px] text-[#9CA3AF] mt-2">Loading templates…</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {templates.map((tpl) => {
                      const isSelected = audienceTemplateId === tpl.id;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => setAudienceTemplateId(tpl.id)}
                          className={`
                            text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3
                            ${
                              isSelected
                                ? 'border-[#4F46E5] bg-[#EEF2FF]'
                                : 'border-[#E5E7EB] bg-white hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
                            }
                          `}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                ${isSelected ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#D1D5DB] bg-white'}`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">
                              {tpl.name}
                            </p>
                            <p className="text-[12px] text-[#6B7280] mt-0.5 leading-[1.5] line-clamp-2">
                              {tpl.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {validationError && (
                <p
                  className={`text-[13px] text-[#EF4444] text-center mt-6 ${
                    shake ? 'animate-[shake_0.3s_ease-in-out]' : ''
                  }`}
                >
                  {validationError}
                </p>
              )}

              <div className="border-t border-[#F3F4F6] mt-6 pt-6 flex items-center justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-[14px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`
                    flex items-center gap-2 text-[15px] font-semibold rounded-xl px-7 py-[13px]
                    transition-all duration-200
                    ${
                      canSubmit
                        ? 'bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)] hover:bg-[#4338CA] hover:shadow-[0_4px_12px_rgba(79,70,229,0.35)]'
                        : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed shadow-none'
                    }
                  `}
                >
                  Run A/B
                  {canSubmit && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {!uploading && !running && (
            <p className="text-center text-[12px] text-[#9CA3AF] mt-4">
              Testing a multi-screen flow?{' '}
              <Link
                href="/simulations/new/product-flow-comparator"
                className="font-medium text-[#4F46E5] hover:underline"
              >
                Try the full Flow Comparator
              </Link>
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Demo hero — first-run only
   ──────────────────────────────────────────────────────────────── */

function DemoHero() {
  return (
    <a
      href="/demo/univest"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] border-[1.5px] border-[#C7D2FE] rounded-[14px] p-5 mb-6 hover:from-[#E0E7FF] hover:to-[#C7D2FE] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-[#C7D2FE]">
          <Columns2 className="w-5 h-5 text-indigo-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#3730A3] mb-0.5">
            See what an A/B report looks like — 30 seconds
          </p>
          <p className="text-[13px] text-[#312E81] leading-[1.5]">
            A finished Univest onboarding comparison. Opens in a new tab.
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-indigo-700 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </a>
  );
}

/* ────────────────────────────────────────────────────────────────
   Objective picker option row
   ──────────────────────────────────────────────────────────────── */

interface ObjectiveOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

function ObjectiveOption({ label, selected, onSelect }: ObjectiveOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        w-full text-left rounded-xl border-[1.5px] px-4 py-3 transition-all duration-150 cursor-pointer
        ${
          selected
            ? 'border-[#4F46E5] bg-[#EEF2FF]'
            : 'border-[#E5E7EB] bg-white hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
            ${selected ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#D1D5DB] bg-white'}`}
        >
          {selected && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
        </div>
        <span
          className={`text-[14px] ${selected ? 'font-semibold text-[#1A1A1A]' : 'text-[#374151]'}`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────
   Variant image uploader
   ──────────────────────────────────────────────────────────────── */

interface VariantUploaderProps {
  label: string;
  variant: PendingVariant | null;
  onFile: (file: File | null) => void;
  onClear: () => void;
}

function VariantUploader({ label, variant, onFile, onClear }: VariantUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    onFile(file);
  };

  return (
    <div>
      <p className="text-[13px] font-medium text-[#374151] mb-1.5">{label}</p>
      {variant ? (
        <div className="relative group rounded-xl overflow-hidden border-[1.5px] border-[#E5E7EB] bg-[#FAFAFA]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={variant.previewUrl}
            alt={label}
            className="w-full aspect-[3/4] object-contain bg-white"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] hover:bg-white transition-all"
            aria-label="Remove"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            w-full aspect-[3/4] rounded-xl border-[1.5px] border-dashed transition-all duration-150
            flex flex-col items-center justify-center gap-2 cursor-pointer
            ${
              dragOver
                ? 'border-[#4F46E5] bg-[#EEF2FF]'
                : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
            }
          `}
        >
          <Upload className="w-5 h-5 text-[#9CA3AF]" />
          <p className="text-[13px] font-medium text-[#6B7280]">Drop or click to upload</p>
          <p className="text-[11px] text-[#9CA3AF]">PNG, JPEG, WebP</p>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Progress panel (upload + simulation)
   ──────────────────────────────────────────────────────────────── */

interface ProgressPanelProps {
  uploading: boolean;
  streamProgress: {
    flows: Record<string, { personasTotal: number; personasDone: number }>;
    phase: string;
  } | null;
}

function ProgressPanel({ uploading, streamProgress }: ProgressPanelProps) {
  const phaseLabel = uploading
    ? 'Uploading your screens…'
    : streamProgress?.phase === 'saving'
      ? 'Saving comparison…'
      : streamProgress && Object.keys(streamProgress.flows).length > 0
        ? 'Running A/B simulation…'
        : 'Starting A/B simulation…';

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7">
      <div className="flex items-center gap-3 mb-5">
        <Loader2 className="w-5 h-5 animate-spin text-[#4F46E5]" />
        <p className="text-[15px] font-semibold text-[#1A1A1A]">{phaseLabel}</p>
      </div>
      {streamProgress && Object.keys(streamProgress.flows).length > 0 && (
        <div className="space-y-3">
          {Object.entries(streamProgress.flows).map(([flowId, flow]) => (
            <div key={flowId}>
              <div className="flex items-center justify-between text-[13px] mb-1">
                <span className="text-[#4B5563] font-medium">{flowId}</span>
                <span className="text-[#9CA3AF]">
                  {flow.personasTotal > 0
                    ? `${flow.personasDone} / ${flow.personasTotal} personas`
                    : `${flow.personasDone} personas`}
                </span>
              </div>
              {flow.personasTotal > 0 && (
                <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round((flow.personasDone / flow.personasTotal) * 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
