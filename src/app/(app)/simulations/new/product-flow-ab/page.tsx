"use client";

import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useUser } from '@/contexts/UserContext';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Columns2,
  ExternalLink,
  Loader2,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createFolder, uploadAssets, updateAssetMetadata } from '@/lib/assets-api';
import {
  startProductFlow,
  runAbWithSegments,
} from '@/lib/backend-simulation';
import { saveSimulation, getSimulations } from '@/lib/db';
import { consumeNDJSONStream } from '@/lib/stream-simulation';
import type { GeneratedSegmentSummary } from '@/lib/stream-simulation';
import { OBJECTIVE_PRESETS, CUSTOM_OBJECTIVE_ID } from '@/data/objective-presets';
import type { AbReport } from '@/types/ab-report';
import {
  SimulationRunningView,
  type RunningFlow,
} from '@/components/simulations/SimulationRunningView';

// Hardcoded in the request below. Mirrored here so the running view can
// show a real "X of N" total before the backend's started event fires
// (in multiflow mode, the backend only emits flow_started which doesn't
// carry num_personas).
const NUM_PERSONAS_PER_VARIANT = 25;

interface PendingVariant {
  file: File;
  previewUrl: string;
}

/** Audience-segments wizard sub-state inside Step 1.
 *  - input:    user is typing the freeform description
 *  - loading:  phase 1 NDJSON streaming; 9 skeleton tiles
 *  - picking:  9 tiles populated; user must select exactly 5 */
type AudienceState = 'input' | 'loading' | 'picking';

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
    flows: Record<string, RunningFlow>;
    phase: string;
  } | null>(null);

  // Demo hero visibility — show for zero-prior-sim users only
  const [hasPriorSims, setHasPriorSims] = useState<boolean | null>(null);
  useEffect(() => {
    if (!userId || !profileReady) return;
    getSimulations(userId)
      .then((sims) => setHasPriorSims(sims.length > 0))
      .catch(() => setHasPriorSims(true)); // fail closed, hide hero on error
  }, [userId, profileReady]);

  // Form state — single page, no step machine
  const [name, setName] = useState('');
  const [variantA, setVariantA] = useState<PendingVariant | null>(null);
  const [variantB, setVariantB] = useState<PendingVariant | null>(null);
  const [objectivePresetId, setObjectivePresetId] = useState<string>(OBJECTIVE_PRESETS[0].id);
  const [customObjective, setCustomObjective] = useState('');

  // Audience-segments state — mirrors product-flow's freeform → 9-tile picker.
  // Phase 1 (`startProductFlow`) generates 9 segment tiles from `description`;
  // user picks 5; phase 2 (`runAbWithSegments`) runs the comparator.
  const [description, setDescription] = useState('');
  const [audienceState, setAudienceState] = useState<AudienceState>('input');
  const [simulationId, setSimulationId] = useState<string | undefined>();
  const [poolName, setPoolName] = useState<string | undefined>();
  const [generatedSegments, setGeneratedSegments] = useState<GeneratedSegmentSummary[]>([]);
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<string[]>([]);

  const resolvedObjective =
    objectivePresetId === CUSTOM_OBJECTIVE_ID
      ? customObjective.trim()
      : OBJECTIVE_PRESETS.find((p) => p.id === objectivePresetId)?.objective ?? '';

  const canSubmit =
    !!variantA &&
    !!variantB &&
    resolvedObjective.length >= 10 &&
    audienceState === 'picking' &&
    selectedSegmentIds.length === 5 &&
    !!simulationId &&
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

  /** Phase 1: POST /start-product-flow → 9 segment tiles. */
  const generateSegments = async () => {
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    const desc = description.trim();
    if (desc.length < 10) {
      showToast('error', 'Add a target audience description', 'At least 10 characters.');
      return;
    }
    setAudienceState('loading');
    setGeneratedSegments([]);
    setSelectedSegmentIds([]);
    setSimulationId(undefined);
    setPoolName(undefined);

    try {
      const res = await startProductFlow(userId, {
        name: name.trim() || 'Untitled A/B run',
        description: desc,
        country: 'IN',
        optimizeMetric: 'activation',
        objective: resolvedObjective || undefined,
      });
      if (!res.ok) {
        const text = await res.text();
        showToast('error', 'Failed to generate cohorts', text || `Status ${res.status}`);
        setAudienceState('input');
        return;
      }
      let streamErr: string | null = null;
      let gotTerminal = false;
      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'pool_routed') {
          setPoolName(event.data.pool_name);
        } else if (event.type === 'segments_ready') {
          setGeneratedSegments(event.data.segments);
          setPoolName(event.data.pool_name);
        } else if (event.type === 'awaiting_segment_selection') {
          setSimulationId(event.data.simulation_id);
          setAudienceState('picking');
          gotTerminal = true;
        } else if (event.type === 'error') {
          streamErr = event.data.message;
          gotTerminal = true;
        }
      });
      if (streamErr) {
        showToast('error', 'Cohort generation failed', streamErr);
        setAudienceState('input');
      } else if (!gotTerminal) {
        // Stream closed without emitting `awaiting_segment_selection` OR
        // an `error` event (network truncation, backend crash, proxy close).
        // Without this, audienceState stays at 'loading' and the 9-tile
        // skeleton renders forever — only escape would be a page refresh.
        showToast(
          'error',
          'Cohort generation interrupted',
          'The backend connection closed before cohorts were ready. Try again.',
        );
        setAudienceState('input');
      }
    } catch (err) {
      console.error(err);
      showToast(
        'error',
        'Could not reach the simulation engine',
        err instanceof Error ? err.message : 'Try again in a moment.',
      );
      setAudienceState('input');
    }
  };

  const handleSubmit = async () => {
    setValidationError('');
    if (!canSubmit) {
      let msg = '';
      if (!variantA || !variantB) msg = 'Upload both Variant A and Variant B screens.';
      else if (resolvedObjective.length < 10)
        msg = 'Pick a preset or write at least 10 characters for the objective.';
      else if (audienceState === 'input')
        msg = 'Generate cohort segments and pick 5 to continue.';
      else if (audienceState === 'loading')
        msg = 'Hold on a few seconds while we generate the cohorts.';
      else if (selectedSegmentIds.length !== 5)
        msg = `Pick exactly 5 cohorts (currently selected ${selectedSegmentIds.length}).`;
      setValidationError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    if (!simulationId) {
      showToast('error', 'Audience missing', 'Generate cohort segments and pick 5 to continue.');
      return;
    }

    const runName = name.trim() || `A/B · ${new Date().toLocaleString()}`;

    setUploading(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Not signed in, please refresh and try again.');

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
        updateAssetMetadata(token, assetsA[0].id, folderA.id, {
          productFlowMetadata: { stepNumber: 1 },
        }).catch(() => {}),
        updateAssetMetadata(token, assetsB[0].id, folderB.id, {
          productFlowMetadata: { stepNumber: 1 },
        }).catch(() => {}),
      ]);

      setUploading(false);
      setRunning(true);
      setStreamProgress({ flows: {}, phase: 'starting' });

      let res: Response;
      try {
        res = await runAbWithSegments(simulationId, {
          selectedSegmentIds,
          selectedFolderIds: [folderA.id, folderB.id],
          optimizeMetric: 'activation',
          name: runName,
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
        if (res.status === 410) {
          showToast(
            'error',
            'Cohort selection expired',
            'Your 9-tile picker timed out. Regenerate cohorts to continue.',
          );
          setAudienceState('input');
          setSimulationId(undefined);
          setGeneratedSegments([]);
          setSelectedSegmentIds([]);
          return;
        }
        const text = await res.text();
        showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        return;
      }

      let comparisonData: AbReport | null = null;
      let streamError: string | null = null;

      // For the single-screen A/B page, flow_index 0 always maps to the
      // "Variant A" upload and flow_index 1 to "Variant B" (we created the
      // folders in that order above), so we override any backend-supplied
      // flow_name with the user-facing variant label.
      const labelForIndex = (idx: number) => `Variant ${String.fromCharCode(65 + idx)}`;

      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'flow_started') {
          const displayName = labelForIndex(event.data.flow_index);
          setStreamProgress((prev) => ({
            flows: {
              ...(prev?.flows ?? {}),
              [event.data.flow_id]: {
                displayName,
                personasTotal:
                  prev?.flows[event.data.flow_id]?.personasTotal || NUM_PERSONAS_PER_VARIANT,
                personasDone: prev?.flows[event.data.flow_id]?.personasDone ?? 0,
              },
            },
            phase: 'simulating',
          }));
        } else if (event.type === 'started') {
          const fid = event.data.flow_id;
          if (!fid) return;
          setStreamProgress((prev) => {
            const existing = prev?.flows[fid];
            return {
              flows: {
                ...(prev?.flows ?? {}),
                [fid]: {
                  displayName: existing?.displayName ?? event.data.flow_name ?? fid,
                  personasTotal: event.data.num_personas ?? 25,
                  personasDone: existing?.personasDone ?? 0,
                },
              },
              phase: 'simulating',
            };
          });
        } else if (event.type === 'persona_complete') {
          const fid = event.data.flow_id ?? '';
          setStreamProgress((prev) => {
            const existing =
              prev?.flows[fid] ?? {
                displayName: fid,
                personasTotal: NUM_PERSONAS_PER_VARIANT,
                personasDone: 0,
              };
            return {
              flows: {
                ...(prev?.flows ?? {}),
                [fid]: {
                  ...existing,
                  personasTotal: existing.personasTotal || NUM_PERSONAS_PER_VARIANT,
                  personasDone: existing.personasDone + 1,
                },
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
            <SimulationRunningView
              uploading={uploading}
              phase={streamProgress?.phase}
              flows={streamProgress?.flows ?? {}}
              eyebrow="Running A/B simulation"
            />
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
                  placeholder="e.g., Onboarding CTA, red vs. green"
                  className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31, 41, 55,0.12)] focus:outline-none transition-all"
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
                    className="w-full mt-3 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 min-h-[90px] focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31, 41, 55,0.12)] focus:outline-none transition-all resize-y"
                  />
                )}
              </div>

              <div className="border-t border-[#F3F4F6] my-6" />

              {/* Audience: freeform description → 9-tile picker → pick 5. Same
                  pattern as the single-flow wizard, hits POST /start-product-flow
                  for phase 1 and runAbWithSegments for phase 2. */}
              <div>
                <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
                  Target audience <span className="text-[#EF4444]">*</span>
                </label>
                <p className="text-[13px] text-[#6B7280] mb-4">
                  Describe your power users. Apriori proposes 9 candidate cohorts under one matched pool, you pick 5 to drive the A/B.
                </p>

                <AudiencePicker
                  description={description}
                  setDescription={setDescription}
                  audienceState={audienceState}
                  setAudienceState={setAudienceState}
                  generatedSegments={generatedSegments}
                  setGeneratedSegments={setGeneratedSegments}
                  selectedSegmentIds={selectedSegmentIds}
                  setSelectedSegmentIds={setSelectedSegmentIds}
                  poolName={poolName}
                  setSimulationId={setSimulationId}
                  onGenerate={generateSegments}
                />
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
                        ? 'bg-[#1F2937] text-white shadow-[0_2px_8px_rgba(31, 41, 55,0.3)] hover:bg-[#111827] hover:shadow-[0_4px_12px_rgba(31, 41, 55,0.35)]'
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
                className="font-medium text-[#1F2937] hover:underline"
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
   Demo hero, first-run only
   ──────────────────────────────────────────────────────────────── */

function DemoHero() {
  return (
    <a
      href="/demo/univest"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gradient-to-br from-[#F3F4F6] to-[#F3F4F6] border-[1.5px] border-[#D1D5DB] rounded-[14px] p-5 mb-6 hover:from-[#F3F4F6] hover:to-[#D1D5DB] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-[#D1D5DB]">
          <Columns2 className="w-5 h-5 text-gray-900" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#111827] mb-0.5">
            See what an A/B report looks like, 30 seconds
          </p>
          <p className="text-[13px] text-[#111827] leading-[1.5]">
            A finished Univest onboarding comparison. Opens in a new tab.
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-900 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
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
            ? 'border-[#1F2937] bg-[#F3F4F6]'
            : 'border-[#E5E7EB] bg-white hover:border-[#1F2937] hover:bg-[#F3F4F6]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
            ${selected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'}`}
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
   Audience picker — freeform input + 9-tile matrix
   ──────────────────────────────────────────────────────────────── */

interface AudiencePickerProps {
  description: string;
  setDescription: (v: string) => void;
  audienceState: 'input' | 'loading' | 'picking';
  setAudienceState: (s: 'input' | 'loading' | 'picking') => void;
  generatedSegments: GeneratedSegmentSummary[];
  setGeneratedSegments: (segs: GeneratedSegmentSummary[]) => void;
  selectedSegmentIds: string[];
  setSelectedSegmentIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  poolName?: string;
  setSimulationId: (id: string | undefined) => void;
  onGenerate: () => Promise<void>;
}

function AudiencePicker({
  description,
  setDescription,
  audienceState,
  setAudienceState,
  generatedSegments,
  setGeneratedSegments,
  selectedSegmentIds,
  setSelectedSegmentIds,
  poolName,
  setSimulationId,
  onGenerate,
}: AudiencePickerProps) {
  const [expandedTileId, setExpandedTileId] = useState<string | null>(null);

  if (audienceState === 'loading') {
    return (
      <div>
        <div className="mb-3 text-[13px] text-[#6B7280] flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Discovering 9 cohorts in your audience. This takes about 12 seconds.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-[88px] rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (audienceState === 'picking' && generatedSegments.length > 0) {
    const selectedCount = selectedSegmentIds.length;
    return (
      <div>
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <p className="text-[13px] text-[#6B7280]">
            Pick the 5 cohorts that match your real power users. Tap a tile for details.
            {poolName && (
              <span className="text-[#9CA3AF]"> All within: {poolName}.</span>
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setAudienceState('input');
              setGeneratedSegments([]);
              setSelectedSegmentIds([]);
              setSimulationId(undefined);
            }}
            className="text-[12px] font-medium text-[#6B7280] hover:text-[#1A1A1A] underline-offset-2 hover:underline"
          >
            Edit description
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {generatedSegments.map((seg) => {
            const isSelected = selectedSegmentIds.includes(seg.id);
            const isExpanded = expandedTileId === seg.id;
            const limitReached = selectedCount >= 5 && !isSelected;
            return (
              <div
                key={seg.id}
                className={`rounded-[10px] border-[1.5px] transition-all overflow-hidden ${
                  isSelected
                    ? 'border-[#1F2937] bg-[#F3F4F6]'
                    : limitReached
                      ? 'border-[#E5E7EB] bg-[#FAFAFA] opacity-60'
                      : 'border-[#E5E7EB] bg-white hover:border-[#1F2937]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setSelectedSegmentIds((prev) => prev.filter((id) => id !== seg.id));
                    } else if (!limitReached) {
                      setSelectedSegmentIds((prev) => [...prev, seg.id]);
                    } else {
                      setExpandedTileId((prev) => (prev === seg.id ? null : seg.id));
                    }
                  }}
                  disabled={limitReached && !isSelected}
                  className="w-full text-left px-3 py-2.5 flex items-start gap-2"
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-md border-[1.5px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#1A1A1A] leading-[1.3]">
                      {seg.name}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTileId((prev) => (prev === seg.id ? null : seg.id));
                  }}
                  className="w-full px-3 pb-2 text-left text-[11px] text-[#6B7280] hover:text-[#1A1A1A] flex items-center gap-1"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                  {isExpanded ? 'Hide details' : 'Show details'}
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-[#F3F4F6]">
                    <p className="text-[12px] text-[#4B5563] mt-2 leading-[1.55]">{seg.description}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-[#9CA3AF]">
                      Pool: <span className="font-medium text-[#6B7280]">{seg.pool_name}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-[13px] font-medium text-[#1A1A1A]">
          Selected:{' '}
          <span className={selectedCount === 5 ? 'text-emerald-700' : 'text-[#1F2937]'}>
            {selectedCount}
          </span>{' '}
          / 5
        </p>
      </div>
    );
  }

  // Default: input
  return (
    <div>
      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (audienceState !== 'input') setAudienceState('input');
        }}
        placeholder="Tech-savvy millennials in metro India who use UPI for everything and want to start investing in mutual funds without overwhelming research."
        rows={4}
        maxLength={800}
        className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31,41,55,0.12)] focus:outline-none transition-all resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-[12px] text-[#6B7280]">
          Apriori will propose 9 candidate cohorts. You&apos;ll pick the 5 that match your real power users.
        </p>
        <p className="text-[11px] text-[#9CA3AF]">{description.length} / 800</p>
      </div>
      <button
        type="button"
        onClick={() => void onGenerate()}
        disabled={description.trim().length < 10}
        className={`mt-4 inline-flex items-center gap-2 text-[14px] font-semibold rounded-[10px] px-5 py-2.5 transition-all ${
          description.trim().length >= 10
            ? 'bg-[#1F2937] text-white hover:bg-[#111827]'
            : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        Generate cohort segments
      </button>
    </div>
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
                ? 'border-[#1F2937] bg-[#F3F4F6]'
                : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#1F2937] hover:bg-[#F3F4F6]'
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

