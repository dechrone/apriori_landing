"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { TopBar } from '@/components/app/TopBar';
import { StepProgressBar } from '@/components/simulations/StepProgressBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useUser } from '@/contexts/UserContext';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Users,
  CheckCircle,
  XCircle,
  HelpCircle,
  Upload,
  X,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AssetFolder } from '@/types/asset';
import {
  startProductFlow,
  runWithSegments,
  startFromSavedAudience,
} from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/db';
import type { AudienceDoc } from '@/lib/db';
import { consumeNDJSONStream } from '@/lib/stream-simulation';
import type { GeneratedSegmentSummary } from '@/lib/stream-simulation';
import type { SimulationData } from '@/types/simulation';
import { createFolder, uploadAssets, updateAssetMetadata } from '@/lib/assets-api';

type Step = 1 | 2 | 3;

/** Step 1 has 3 sub-states for the audience-segments wizard:
 *  - input:    user is typing their description; "Generate cohort segments" CTA
 *  - loading:  phase 1 NDJSON streaming; 9 skeleton tiles
 *  - picking:  9 tiles populated; user must select exactly 5
 *  - reusing:  picked a saved audience with cached uuids; skip to Step 2 directly
 */
type AudienceState = 'input' | 'loading' | 'picking' | 'reusing';

const STEP_LABELS = ['Setup', 'Select assets', 'Parameters'];

const METRICS = [
  { value: 'activation', label: 'Onboarding activation rate', desc: '% of users who complete the core activation step' },
];
const UPCOMING_METRICS = ['Signup completion', 'Checkout conversion', '7-day retention', '30-day retention'];

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

interface PendingFile {
  id: string;
  file: File;
  previewUrl: string;
}

type ProductFlowFormData = {
  name: string;
  objective: string;
  description: string;             // freeform audience description (drives phase 1)
  audienceState: AudienceState;
  simulationId?: string;           // populated after phase 1 emits awaiting_segment_selection
  poolName?: string;               // pool the segments live in (transparency on tile click)
  generatedSegments?: GeneratedSegmentSummary[];  // 9 from phase 1
  selectedSegmentIds: string[];    // 5 picks
  reuseAudienceId?: string;        // when reusing a saved audience, run via /start-from-saved-audience
  saveAudienceForReuse: boolean;
  optimizeMetric: string;
  selectedFolderIds: string[];
};

function HelpPopover({ label, body }: { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-[#9CA3AF] hover:text-[#1F2937] transition-colors focus:outline-none focus:text-[#1F2937]"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-72 bg-[#1C1917] text-white text-[12px] leading-snug rounded-lg px-3 py-2.5 shadow-xl z-50 pointer-events-none"
        >
          <span className="block font-semibold mb-1 text-gray-400">{label}</span>
          {body}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1C1917] rotate-45" />
        </span>
      )}
    </span>
  );
}

export default function ProductFlowSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useUser();
  const { getAccessToken } = useAuthContext();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [running, setRunning] = useState(false);
  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [allFolders, setAllFolders] = useState<AssetFolder[]>([]);
  const [validationError, setValidationError] = useState('');
  const [shake, setShake] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [streamProgress, setStreamProgress] = useState<{
    personasTotal: number;
    personasDone: { name: string; completed: boolean }[];
    phase: string;
    retrievalNotice?: string;
  } | null>(null);
  const router = useRouter();

  const loadAudiences = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const list = await getAudiences(userId);
      setAudiences(list);
    } catch (err) {
      console.error(err);
    }
  }, [userId, profileReady]);

  const loadFolders = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const list = await getAssetFolders(userId);
      setAllFolders(list);
    } catch (err) {
      console.error(err);
    }
  }, [userId, profileReady]);

  useEffect(() => { loadAudiences(); }, [loadAudiences]);
  useEffect(() => { loadFolders(); }, [loadFolders]);

  const productFlowFolders = allFolders.filter((f) => f.assetType === 'product-flow');
  const productFlowReadyFolders = productFlowFolders.filter((f) => f.status === 'ready');
  const eligibleFolders = productFlowReadyFolders.filter((f) => f.assetCount > 0);

  const [formData, setFormData] = useState<ProductFlowFormData>({
    name: '',
    objective: '',
    description: '',
    audienceState: 'input',
    selectedSegmentIds: [],
    saveAudienceForReuse: false,
    optimizeMetric: 'activation',
    selectedFolderIds: [],
  });

  const canProceedStep1 =
    formData.name.trim().length >= 3 &&
    formData.objective.trim().length >= 10 &&
    (
      // Either reusing a saved audience...
      formData.audienceState === 'reusing' && formData.reuseAudienceId !== undefined ||
      // ...or finished picking 5 segments from the 9-tile matrix.
      (formData.audienceState === 'picking' && formData.selectedSegmentIds.length === 5)
    );

  const canProceedStep2 =
    pendingFiles.length >= 2 ||
    (formData.selectedFolderIds.length > 0 && eligibleFolders.length > 0);
  const canProceedStep3 = formData.optimizeMetric !== '';

  const handleDisabledClick = () => {
    let msg = '';
    if (currentStep === 1) {
      if (formData.name.trim().length < 3) msg = 'Please enter a simulation name (at least 3 characters).';
      else if (formData.objective.trim().length < 10)
        msg = 'Describe what this flow is trying to achieve (at least 10 characters).';
      else if (formData.audienceState === 'input')
        msg = 'Generate cohort segments and pick 5 to continue.';
      else if (formData.audienceState === 'loading')
        msg = 'Hold on a few seconds while we generate the cohorts.';
      else if (formData.audienceState === 'picking' && formData.selectedSegmentIds.length !== 5)
        msg = `Pick exactly 5 cohorts (currently selected ${formData.selectedSegmentIds.length}).`;
    } else if (currentStep === 2) {
      if (pendingFiles.length === 1) msg = 'Upload at least 2 screens, a flow needs more than one step.';
      else msg = 'Upload your screens or pick an existing folder to continue.';
    } else {
      msg = 'Please select a primary metric to continue.';
    }
    setValidationError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setTimeout(() => setValidationError(''), 4000);
  };

  /** Phase 1: POST /start-product-flow → stream segments back. */
  const generateSegments = useCallback(async (descriptionOverride?: string) => {
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    const description = (descriptionOverride ?? formData.description).trim();
    if (description.length < 10) {
      showToast('error', 'Add a target audience description', 'At least 10 characters.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      description,
      audienceState: 'loading',
      generatedSegments: undefined,
      selectedSegmentIds: [],
      simulationId: undefined,
      poolName: undefined,
      reuseAudienceId: undefined,
    }));

    try {
      const res = await startProductFlow(userId, {
        name: formData.name.trim() || 'Untitled product flow',
        description,
        country: 'IN',
        optimizeMetric: formData.optimizeMetric || 'activation',
        objective: formData.objective.trim() || undefined,
      });
      if (!res.ok) {
        const text = await res.text();
        showToast('error', 'Failed to generate cohorts', text || `Status ${res.status}`);
        setFormData((prev) => ({ ...prev, audienceState: 'input' }));
        return;
      }
      let streamErr: string | null = null;
      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'pool_routed') {
          setFormData((prev) => ({ ...prev, poolName: event.data.pool_name }));
        } else if (event.type === 'segments_ready') {
          setFormData((prev) => ({
            ...prev,
            generatedSegments: event.data.segments,
            poolName: event.data.pool_name,
          }));
        } else if (event.type === 'awaiting_segment_selection') {
          setFormData((prev) => ({
            ...prev,
            simulationId: event.data.simulation_id,
            audienceState: 'picking',
          }));
        } else if (event.type === 'error') {
          streamErr = event.data.message;
        }
      });
      if (streamErr) {
        showToast('error', 'Cohort generation failed', streamErr);
        setFormData((prev) => ({ ...prev, audienceState: 'input' }));
      }
    } catch (err) {
      console.error(err);
      showToast(
        'error',
        'Could not reach the simulation engine',
        err instanceof Error ? err.message : 'Try again in a moment.',
      );
      setFormData((prev) => ({ ...prev, audienceState: 'input' }));
    }
  }, [userId, formData.description, formData.name, formData.optimizeMetric, formData.objective, showToast]);

  /** Run-time submit: phase 2 (`/run-with-segments`) for the picker path,
   *  or `/start-from-saved-audience` when re-using a saved audience. */
  const submitSimulation = useCallback(async () => {
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }

    setRunning(true);
    setStreamProgress({ personasTotal: 0, personasDone: [], phase: 'starting' });

    try {
      let res: Response;
      if (formData.audienceState === 'reusing' && formData.reuseAudienceId) {
        res = await startFromSavedAudience(userId, {
          audienceId: formData.reuseAudienceId,
          name: formData.name.trim(),
          country: 'IN',
          optimizeMetric: formData.optimizeMetric,
          objective: formData.objective.trim() || undefined,
          selectedFolderIds: formData.selectedFolderIds,
        });
      } else if (formData.simulationId && formData.selectedSegmentIds.length === 5) {
        const audienceName = formData.saveAudienceForReuse
          ? (formData.generatedSegments
              ?.find((s) => s.id === formData.selectedSegmentIds[0])?.name ?? formData.name.trim().slice(0, 60))
          : null;
        res = await runWithSegments(formData.simulationId, {
          selectedSegmentIds: formData.selectedSegmentIds,
          selectedFolderIds: formData.selectedFolderIds,
          optimizeMetric: formData.optimizeMetric,
          saveAudience: formData.saveAudienceForReuse,
          audienceName,
        });
      } else {
        showToast('error', 'No audience selected', 'Pick 5 cohorts or a saved audience first.');
        setRunning(false); setStreamProgress(null); return;
      }

      if (!res.ok) {
        if (res.status === 402) {
          const data = await res.json().catch(() => ({}));
          const detail = (data as { detail?: { required?: number; available?: number; message?: string } }).detail;
          showToast(
            'error',
            'Out of credits',
            detail?.message || `You need ${detail?.required ?? '?'} credits but have ${detail?.available ?? 0}. Visit /pricing to upgrade.`,
          );
        } else if (res.status === 410) {
          showToast(
            'error',
            'Cohort selection expired',
            'Your 9-tile picker timed out. Regenerate the cohorts to continue.',
          );
          setFormData((prev) => ({ ...prev, audienceState: 'input', simulationId: undefined, generatedSegments: undefined, selectedSegmentIds: [] }));
          setCurrentStep(1);
        } else {
          const text = await res.text();
          showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        }
        return;
      }

      let insightsData: SimulationData | null = null;
      let streamError: string | null = null;
      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'started') {
          setStreamProgress({
            personasTotal: event.data.num_personas ?? 25,
            personasDone: [],
            phase: 'simulating',
          });
        } else if (event.type === 'personas_loaded') {
          const mode = event.data.retrieval_mode;
          let notice: string | undefined;
          if (mode === 'cached') {
            notice = 'Re-using your saved audience. Same 25 personas as before, refreshed for this product.';
          }
          setStreamProgress((prev) => ({
            personasTotal: event.data.count,
            personasDone: prev?.personasDone ?? [],
            phase: 'simulating',
            retrievalNotice: notice,
          }));
        } else if (event.type === 'persona_complete') {
          setStreamProgress((prev) => ({
            personasTotal: prev?.personasTotal ?? 0,
            personasDone: [
              ...(prev?.personasDone ?? []),
              { name: event.data.persona_name, completed: event.data.completed },
            ],
            phase: 'simulating',
          }));
        } else if (event.type === 'insights_ready') {
          insightsData = event.data;
          setStreamProgress((prev) => prev ? { ...prev, phase: 'saving' } : null);
        } else if (event.type === 'error') {
          streamError = event.data.message;
        }
      });

      if (streamError) {
        showToast('error', 'Simulation error', streamError);
        return;
      }
      if (!insightsData) {
        showToast('error', 'Simulation incomplete', 'No results received from backend.');
        return;
      }

      const data = insightsData as SimulationData;
      const metric = `${data.summary?.completion_rate_pct ?? 0}% completion`;
      const docId = await saveSimulation(userId, {
        type: 'Product Flow',
        status: 'completed',
        name: formData.name.trim() || 'Product Flow Run',
        metric,
        timestamp: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
        simulationId: data.simulation_id,
        result: data,
      });
      showToast('success', 'Simulation complete', 'Redirecting to results.');
      router.push(`/simulations/${docId}`);
    } catch (err) {
      showToast(
        'error',
        'Failed to run simulation',
        err instanceof Error ? err.message : "We couldn't reach the simulation engine. Please try again.",
      );
    } finally {
      setRunning(false);
      setStreamProgress(null);
    }
  }, [userId, formData, router, showToast]);

  const handleNext = async () => {
    setValidationError('');
    if (currentStep === 1 && !canProceedStep1) { handleDisabledClick(); return; }
    if (currentStep === 2 && !canProceedStep2) { handleDisabledClick(); return; }
    if (currentStep === 3 && !canProceedStep3) { handleDisabledClick(); return; }

    if (currentStep === 2 && pendingFiles.length > 0) {
      setUploading(true);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error('Not signed in, please refresh and try again.');
        const folderName =
          formData.name.trim() ||
          `Product flow screens · ${new Date().toLocaleString()}`;
        const folder = await createFolder(token, {
          name: folderName,
          assetType: 'product-flow',
          description: formData.objective.trim() || undefined,
        });
        const uploaded = await uploadAssets(
          token, folder.id, pendingFiles.map((p) => p.file),
        );
        await Promise.all(
          uploaded.map((asset, idx) =>
            updateAssetMetadata(token, asset.id, folder.id, {
              productFlowMetadata: { stepNumber: idx + 1 },
            }).catch(() => { /* fallback fine */ }),
          ),
        );
        setFormData((prev) => ({ ...prev, selectedFolderIds: [folder.id] }));
        pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
        setPendingFiles([]);
      } catch (err) {
        showToast(
          'error',
          'Upload failed',
          err instanceof Error ? err.message : 'Could not upload your screens. Try again.',
        );
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
      return;
    }
    await submitSimulation();
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      router.back();
    }
  };

  const canProceedCurrent = currentStep === 1 ? canProceedStep1 : currentStep === 2 ? canProceedStep2 : canProceedStep3;

  const audienceDisplayName = useMemo(() => {
    if (formData.audienceState === 'reusing' && formData.reuseAudienceId) {
      const aud = audiences.find((a) => a.id === formData.reuseAudienceId);
      return aud?.name ?? 'Saved audience';
    }
    if (formData.selectedSegmentIds.length === 5 && formData.generatedSegments) {
      const names = formData.selectedSegmentIds
        .map((id) => formData.generatedSegments?.find((s) => s.id === id)?.name)
        .filter(Boolean);
      return names.length ? `${names.length} cohorts under ${formData.poolName}` : undefined;
    }
    return undefined;
  }, [formData, audiences]);

  const selectedFolders = productFlowReadyFolders.filter((f) => formData.selectedFolderIds.includes(f.id));

  return (
    <>
      <TopBar title="New Product Flow Simulation" onMenuClick={toggleMobileMenu} />
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[640px] mx-auto pb-24">
          <StepProgressBar currentStep={currentStep} totalSteps={3} labels={STEP_LABELS} />

          {running && streamProgress && (
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7">
              <div className="flex items-center gap-3 mb-5">
                <Loader2 className="w-5 h-5 animate-spin text-[#1F2937]" />
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {streamProgress.phase === 'saving'
                    ? 'Saving results...'
                    : streamProgress.personasTotal > 0
                      ? `Simulating ${streamProgress.personasDone.length} / ${streamProgress.personasTotal} personas...`
                      : 'Initialising simulation...'}
                </p>
              </div>
              {streamProgress.retrievalNotice && (
                <div className="mb-4 flex items-start gap-2.5 rounded-[10px] border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[13px] text-emerald-900">
                  <CheckCircle2 className="mt-[1px] w-3.5 h-3.5 shrink-0" />
                  <span className="leading-[1.5]">{streamProgress.retrievalNotice}</span>
                </div>
              )}
              {streamProgress.personasDone.length > 0 && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {streamProgress.personasDone.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-[13px]">
                      {p.completed
                        ? <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        : <XCircle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />}
                      <span className="text-[#4B5563]">{p.name}</span>
                      <span className="text-[#9CA3AF] ml-auto">{p.completed ? 'Completed' : 'Dropped off'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!running && currentStep === 1 && (
            <SetupStep
              formData={formData}
              setFormData={setFormData}
              audiences={audiences}
              onGenerateSegments={generateSegments}
            />
          )}
          {!running && !uploading && currentStep === 2 && (
            <AssetSelectionStep
              formData={formData}
              setFormData={setFormData}
              allFolders={productFlowFolders}
              readyFolders={productFlowReadyFolders}
              pendingFiles={pendingFiles}
              setPendingFiles={setPendingFiles}
              showToast={showToast}
            />
          )}
          {!running && uploading && (
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#1F2937]" />
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  Uploading {pendingFiles.length} screen{pendingFiles.length !== 1 ? 's' : ''}...
                </p>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  Creating your folder and syncing images. This usually takes a few seconds.
                </p>
              </div>
            </div>
          )}
          {!running && currentStep === 3 && (
            <ParametersStep
              formData={formData}
              setFormData={setFormData}
              audienceName={audienceDisplayName}
              selectedFolders={selectedFolders}
              onBack={handleBack}
              onNext={handleNext}
              running={running}
              canProceed={canProceedStep3}
              validationError={validationError}
              shake={shake}
            />
          )}

          {!running && currentStep !== 3 && validationError && (
            <p
              className={`text-[13px] text-[#EF4444] text-center mt-6 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            >
              {validationError}
            </p>
          )}

          {!running && currentStep !== 3 && (
            <div className="flex items-center justify-between mt-6 px-1">
              <button
                onClick={handleBack}
                className="text-[14px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleNext}
                disabled={running}
                className={`
                  flex items-center gap-2 text-[15px] font-semibold rounded-xl px-7 py-[13px]
                  transition-all duration-200
                  ${canProceedCurrent && !running
                    ? 'bg-[#1F2937] text-white shadow-[0_2px_8px_rgba(31,41,55,0.3)] hover:bg-[#111827] hover:shadow-[0_4px_12px_rgba(31,41,55,0.35)]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed shadow-none'
                  }
                `}
              >
                {running ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Next Step
                {!running && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}

/* ─────────────────── STEP 1: Setup + audience picker ──────────────── */

interface SetupStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  audiences: AudienceDoc[];
  onGenerateSegments: (descriptionOverride?: string) => Promise<void>;
}

function SetupStep({ formData, setFormData, audiences, onGenerateSegments }: SetupStepProps) {
  const reusableAudiences = useMemo(
    () => audiences.filter((a) => Array.isArray(a.cachedPersonaUuids) && a.cachedPersonaUuids.length > 0),
    [audiences],
  );
  const legacyAudiences = useMemo(
    () => audiences.filter((a) => !a.cachedPersonaUuids || a.cachedPersonaUuids.length === 0),
    [audiences],
  );

  const [audienceTab, setAudienceTab] = useState<'describe' | 'saved'>('describe');
  const didInitAudienceTab = useRef(false);
  useEffect(() => {
    if (didInitAudienceTab.current) return;
    if (audiences.length > 0) {
      setAudienceTab('saved');
      didInitAudienceTab.current = true;
    }
  }, [audiences.length]);

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 sm:px-8">
      {/* Simulation name */}
      <div>
        <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-2">
          Simulation name <span className="text-[#EF4444]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Onboarding Flow Optimization"
          className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31,41,55,0.12)] focus:outline-none transition-all"
        />
      </div>

      <div className="border-t border-[#F3F4F6] my-6" />

      {/* Objective */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-[14px] font-semibold text-[#1A1A1A]">
            What is this flow trying to achieve? <span className="text-[#EF4444]">*</span>
          </label>
          <HelpPopover
            label="Why do we ask this?"
            body="This tells each synthetic persona what the product is trying to do for them. Concrete and outcome-focused works best ('get a first-time user from sign-up to making their first trade in under 3 minutes')."
          />
        </div>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Describe the outcome you&apos;re designing for, in one or two sentences.
        </p>
        <textarea
          value={formData.objective}
          onChange={(e) => setFormData((prev) => ({ ...prev, objective: e.target.value }))}
          placeholder="e.g., Help a first-time investor go from sign-up to buying their first mutual fund without stalling on KYC."
          rows={3}
          maxLength={1000}
          className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31,41,55,0.12)] focus:outline-none transition-all resize-none"
        />
        <p className="text-[11px] text-[#9CA3AF] mt-1.5 text-right">
          {formData.objective.length} / 1000
        </p>
      </div>

      <div className="border-t border-[#F3F4F6] my-6" />

      {/* Target audience */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-[14px] font-semibold text-[#1A1A1A]">
            Target audience <span className="text-[#EF4444]">*</span>
          </label>
          <HelpPopover
            label="What is an audience?"
            body="A group of synthetic personas we send through your flow. Describe your power users, pick 5 cohorts from the 9 we propose, and we'll match against ~10K real Nemotron personas inside the right pool."
          />
        </div>
        <p className="text-[13px] text-[#6B7280] mb-4">
          Describe your power users, pick 5 cohorts. Or re-use a saved audience for an instant run.
        </p>

        <div className="inline-flex items-center bg-[#F3F4F6] rounded-lg p-1 mb-4">
          <button
            type="button"
            onClick={() => setAudienceTab('describe')}
            className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all ${
              audienceTab === 'describe' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            Describe your power users
          </button>
          <button
            type="button"
            onClick={() => setAudienceTab('saved')}
            className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all ${
              audienceTab === 'saved' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            Your audiences {audiences.length > 0 && `(${audiences.length})`}
          </button>
        </div>

        {audienceTab === 'describe' ? (
          <DescribeAudiencePane
            formData={formData}
            setFormData={setFormData}
            onGenerateSegments={onGenerateSegments}
          />
        ) : (
          <SavedAudiencesPane
            reusableAudiences={reusableAudiences}
            legacyAudiences={legacyAudiences}
            formData={formData}
            setFormData={setFormData}
            onGenerateSegments={onGenerateSegments}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Sub-pane: Describe + 9-tile picker ─── */

function DescribeAudiencePane({
  formData,
  setFormData,
  onGenerateSegments,
}: {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  onGenerateSegments: (descriptionOverride?: string) => Promise<void>;
}) {
  const [expandedTileId, setExpandedTileId] = useState<string | null>(null);

  if (formData.audienceState === 'loading') {
    return (
      <div>
        <div className="mb-3 text-[13px] text-[#6B7280] flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Discovering 9 cohorts in your audience. This takes about 12 seconds.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-[88px] rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (formData.audienceState === 'picking' && formData.generatedSegments) {
    const selectedCount = formData.selectedSegmentIds.length;
    const segments = formData.generatedSegments;
    return (
      <div>
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <p className="text-[13px] text-[#6B7280]">
            Pick the 5 cohorts that match your real power users. Tap a tile for details.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                audienceState: 'input',
                generatedSegments: undefined,
                selectedSegmentIds: [],
                simulationId: undefined,
                poolName: undefined,
              }));
            }}
            className="text-[12px] font-medium text-[#6B7280] hover:text-[#1A1A1A] underline-offset-2 hover:underline"
          >
            Edit description
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {segments.map((seg) => {
            const isSelected = formData.selectedSegmentIds.includes(seg.id);
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
                      setFormData((prev) => ({
                        ...prev,
                        selectedSegmentIds: prev.selectedSegmentIds.filter((id) => id !== seg.id),
                      }));
                    } else if (!limitReached) {
                      setFormData((prev) => ({
                        ...prev,
                        selectedSegmentIds: [...prev.selectedSegmentIds, seg.id],
                      }));
                    } else {
                      // limit reached, surface the tile contents instead of selecting
                      setExpandedTileId((prev) => (prev === seg.id ? null : seg.id));
                    }
                  }}
                  disabled={limitReached && !isSelected}
                  className="w-full text-left px-3 py-2.5 flex items-start gap-2"
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-md border-[1.5px] flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'
                  }`}>
                    {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#1A1A1A] leading-[1.3]">{seg.name}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setExpandedTileId((prev) => (prev === seg.id ? null : seg.id)); }}
                  className="w-full px-3 pb-2 text-left text-[11px] text-[#6B7280] hover:text-[#1A1A1A] flex items-center gap-1"
                >
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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

        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
          <p className="text-[13px] font-medium text-[#1A1A1A]">
            Selected: <span className={selectedCount === 5 ? 'text-emerald-700' : 'text-[#1F2937]'}>{selectedCount}</span> / 5
          </p>
          <label className="flex items-center gap-2 text-[12px] text-[#4B5563] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.saveAudienceForReuse}
              onChange={(e) => setFormData((prev) => ({ ...prev, saveAudienceForReuse: e.target.checked }))}
              className="w-3.5 h-3.5 accent-[#1F2937]"
            />
            Save this audience to my profile for re-use
          </label>
        </div>
      </div>
    );
  }

  // Default state: input
  return (
    <div>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value, audienceState: 'input' }))}
        placeholder="Tech-savvy millennials in metro India who use UPI for everything and want to start investing in mutual funds without overwhelming research."
        rows={4}
        maxLength={800}
        className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#1F2937] focus:shadow-[0_0_0_3px_rgba(31,41,55,0.12)] focus:outline-none transition-all resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-[12px] text-[#6B7280]">
          Apriori will propose 9 candidate cohorts. You&apos;ll pick the 5 that match your real power users.
        </p>
        <p className="text-[11px] text-[#9CA3AF]">{formData.description.length} / 800</p>
      </div>
      <button
        type="button"
        onClick={() => onGenerateSegments()}
        disabled={formData.description.trim().length < 10}
        className={`mt-4 inline-flex items-center gap-2 text-[14px] font-semibold rounded-[10px] px-5 py-2.5 transition-all ${
          formData.description.trim().length >= 10
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

/* ─── Sub-pane: Saved audiences ─── */

function SavedAudiencesPane({
  reusableAudiences,
  legacyAudiences,
  formData,
  setFormData,
  onGenerateSegments,
}: {
  reusableAudiences: AudienceDoc[];
  legacyAudiences: AudienceDoc[];
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  onGenerateSegments: (descriptionOverride?: string) => Promise<void>;
}) {
  if (reusableAudiences.length === 0 && legacyAudiences.length === 0) {
    return (
      <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
        <Users className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
        <p className="text-[14px] font-medium text-[#6B7280]">No saved audiences yet</p>
        <p className="text-[13px] text-[#9CA3AF] mt-1">
          Switch to &quot;Describe your power users&quot; and run a simulation. Tick the save box to keep the audience for instant re-use later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reusableAudiences.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-[#9CA3AF] mb-2">Ready to re-use</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reusableAudiences.map((aud) => {
              const isSelected = formData.reuseAudienceId === aud.id && formData.audienceState === 'reusing';
              const summary = aud.description?.slice(0, 80) ?? '';
              return (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      audienceState: 'reusing',
                      reuseAudienceId: aud.id,
                      simulationId: undefined,
                      generatedSegments: undefined,
                      selectedSegmentIds: [],
                    }));
                  }}
                  className={`text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3 ${
                    isSelected ? 'border-[#1F2937] bg-[#F3F4F6]' : 'border-[#E5E7EB] bg-white hover:border-[#1F2937] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">{aud.name}</p>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 whitespace-nowrap">
                        Re-use, instant
                      </span>
                    </div>
                    {summary && (
                      <p className="text-[12px] text-[#6B7280] mt-0.5 leading-[1.5]">{summary}{aud.description && aud.description.length > 80 ? '...' : ''}</p>
                    )}
                    <p className="text-[10px] text-[#9CA3AF] mt-1">
                      {aud.cachedPersonaUuids?.length ?? 0} personas cached, {aud.cachedCountry ?? 'IN'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {legacyAudiences.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-[#9CA3AF] mb-2">Legacy audiences (regenerate to re-use)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {legacyAudiences.map((aud) => {
              const summary = aud.description?.slice(0, 80) ?? aud.audienceDescription?.slice(0, 80) ?? '';
              return (
                <div
                  key={aud.id}
                  className="text-left rounded-xl border-[1.5px] border-[#E5E7EB] bg-white px-[18px] py-4"
                >
                  <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">{aud.name}</p>
                  {summary && (
                    <p className="text-[12px] text-[#6B7280] mt-0.5 leading-[1.5]">{summary}{(aud.description?.length ?? aud.audienceDescription?.length ?? 0) > 80 ? '...' : ''}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const txt = (aud.description || aud.audienceDescription || '').trim();
                      if (txt.length < 10) return;
                      setFormData((prev) => ({ ...prev, description: txt }));
                      void onGenerateSegments(txt);
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1F2937] hover:text-[#111827]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Regenerate cohorts
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── STEP 2: Asset selection (unchanged) ──────────────── */

interface AssetSelectionStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  allFolders: AssetFolder[];
  readyFolders: AssetFolder[];
  pendingFiles: PendingFile[];
  setPendingFiles: Dispatch<SetStateAction<PendingFile[]>>;
  showToast: (kind: 'success' | 'error' | 'info', title: string, body?: string) => void;
}

function AssetSelectionStep({
  formData,
  setFormData,
  readyFolders,
  pendingFiles,
  setPendingFiles,
  showToast,
}: AssetSelectionStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showExistingFolders, setShowExistingFolders] = useState(false);

  const readyFoldersWithAssets = useMemo(
    () => readyFolders.filter((f) => f.assetCount > 0),
    [readyFolders],
  );

  const acceptFiles = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files);
      const accepted: PendingFile[] = [];
      const rejected: string[] = [];
      incoming.forEach((file) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) { rejected.push(`${file.name}, unsupported format`); return; }
        if (file.size > MAX_FILE_BYTES) { rejected.push(`${file.name}, over 10 MB`); return; }
        accepted.push({
          id: (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
          file,
          previewUrl: URL.createObjectURL(file),
        });
      });
      if (accepted.length > 0) {
        setPendingFiles((prev) => [...prev, ...accepted]);
        setFormData((prev) => ({ ...prev, selectedFolderIds: [] }));
      }
      if (rejected.length > 0) {
        showToast('error', 'Some files were skipped', rejected.slice(0, 4).join(' · '));
      }
    },
    [setPendingFiles, setFormData, showToast],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) acceptFiles(e.target.files);
    e.target.value = '';
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) acceptFiles(e.dataTransfer.files);
  };
  const move = (idx: number, delta: number) => {
    setPendingFiles((prev) => {
      const next = [...prev];
      const target = idx + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };
  const remove = (idx: number) => {
    setPendingFiles((prev) => {
      const next = [...prev];
      const [removed] = next.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return next;
    });
  };
  const pickExisting = (id: string) => {
    if (pendingFiles.length > 0) {
      pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPendingFiles([]);
    }
    const isAlreadySelected = formData.selectedFolderIds.includes(id);
    setFormData((prev) => ({
      ...prev,
      selectedFolderIds: isAlreadySelected ? [] : [id],
    }));
  };

  const hasExisting = readyFoldersWithAssets.length > 0;
  const usingExistingFolder = formData.selectedFolderIds.length > 0 && pendingFiles.length === 0;

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 sm:px-8">
      <div className="flex items-center gap-2 mb-1.5">
        <h2 className="text-[17px] font-bold text-[#1A1A1A]">Upload your screens</h2>
        <HelpPopover
          label="How does the simulator use these?"
          body="Upload each screen of the flow in the order a real user would see them. The first one is the entry point, the last is the success state. You'll see synthetic personas walk through these screens, decide whether to continue, and explain why."
        />
      </div>
      <p className="text-[14px] text-[#4B5563] leading-[1.6] mb-5">
        Drop PNGs or JPEGs in the order users encounter them. Step 1 is the entry, the last step is the success state. PNG / JPEG / WebP, up to 10 MB each.
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`flex flex-col items-center justify-center rounded-[12px] border-[1.5px] border-dashed cursor-pointer transition-colors py-10 px-6 text-center ${
          isDragging ? 'border-[#1F2937] bg-[#F3F4F6]' : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#1F2937] hover:bg-[#F3F4F6]'
        }`}
      >
        <input ref={fileInputRef} type="file" multiple accept={ALLOWED_IMAGE_TYPES.join(',')} onChange={onInputChange} className="hidden" />
        <Upload className="w-6 h-6 text-[#1F2937] mb-2" />
        <p className="text-[14px] font-semibold text-[#1A1A1A]">
          {pendingFiles.length > 0 ? 'Add more screens' : 'Drop screens here or click to pick'}
        </p>
        <p className="text-[12px] text-[#6B7280] mt-1">
          {pendingFiles.length > 0
            ? `${pendingFiles.length} screen${pendingFiles.length !== 1 ? 's' : ''} staged, reorder below`
            : 'Select multiple, they keep the order you pick them in'}
        </p>
      </div>

      {pendingFiles.length > 0 && (
        <div className="mt-5 space-y-2">
          {pendingFiles.map((pf, idx) => (
            <div key={pf.id} className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[10px] px-3 py-2.5">
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#F3F4F6] border-[1.5px] border-[#1F2937] flex items-center justify-center text-[12px] font-bold text-[#111827]">
                {idx + 1}
              </div>
              <div className="shrink-0 w-12 h-12 rounded-[6px] overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pf.previewUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1A1A1A] truncate">{pf.file.name}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                  {(pf.file.size / 1024).toFixed(0)} KB · {pf.file.type.split('/')[1]?.toUpperCase() ?? 'IMG'}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Move up" className="p-1.5 rounded-md text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === pendingFiles.length - 1} aria-label="Move down" className="p-1.5 rounded-md text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={() => remove(idx)} aria-label="Remove" className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-[#9CA3AF] mt-2">
            Tip: step 1 is what the persona sees first. Keep reordering until the flow reads the way a real user would encounter it.
          </p>
        </div>
      )}

      {hasExisting && (
        <div className="mt-6 pt-5 border-t border-[#F3F4F6]">
          <button type="button" onClick={() => setShowExistingFolders((v) => !v)} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A]">
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExistingFolders ? 'rotate-180' : ''}`} />
            Or reuse a folder you&apos;ve uploaded before ({readyFoldersWithAssets.length})
          </button>
          {showExistingFolders && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {readyFoldersWithAssets.map((folder) => {
                const isSelected = formData.selectedFolderIds.includes(folder.id) && !pendingFiles.length;
                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => pickExisting(folder.id)}
                    className={`text-left rounded-[10px] border-[1.5px] px-3 py-2.5 transition-all ${
                      isSelected ? 'border-[#1F2937] bg-[#F3F4F6]' : 'border-[#E5E7EB] bg-white hover:border-[#1F2937] hover:bg-[#F3F4F6]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{folder.name}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-px">
                          <ImageIcon className="inline w-3 h-3 mr-1 -mt-0.5" />
                          {folder.assetCount} screen{folder.assetCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {usingExistingFolder && (
        <p className="mt-4 text-[12px] text-[#065F46] bg-[#D1FAE5] rounded-md px-3 py-2">
          <CheckCircle2 className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
          Using your existing folder. Uploads are skipped.
        </p>
      )}
    </div>
  );
}

/* ─────────────────── STEP 3: Parameters ──────────────── */

interface ParametersStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  audienceName?: string;
  selectedFolders: AssetFolder[];
  onBack: () => void;
  onNext: () => void;
  running: boolean;
  canProceed: boolean;
  validationError: string;
  shake: boolean;
}

function ParametersStep({
  formData, setFormData, audienceName, selectedFolders, onBack, onNext, running, canProceed, validationError, shake,
}: ParametersStepProps) {
  const folderSummary = selectedFolders.length > 0
    ? selectedFolders.map((f) => `${f.name} · ${f.assetCount} screens`).join(', ')
    : '-';

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-6 sm:px-7">
      <div>
        <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-0.5">
          Primary metric to optimise for
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          The simulator optimises its recommendations around this outcome.
        </p>
        {METRICS.map((m) => {
          const isSelected = formData.optimizeMetric === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, optimizeMetric: m.value }))}
              className={`w-full flex items-center gap-2.5 border-[1.5px] rounded-[10px] px-3.5 py-3 transition-all duration-150 text-left cursor-pointer ${
                isSelected ? 'border-[#1F2937] bg-[#F3F4F6]' : 'border-[#E5E7EB] bg-white hover:border-[#1F2937] hover:bg-[#F3F4F6]'
              }`}
            >
              <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected ? 'border-[#1F2937] bg-[#1F2937]' : 'border-[#D1D5DB] bg-white'
              }`}>
                {isSelected && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold leading-tight text-[#1A1A1A]">{m.label}</p>
                <p className="text-[11px] text-[#9CA3AF] mt-px leading-tight">{m.desc}</p>
              </div>
            </button>
          );
        })}
        <p className="text-[11px] text-[#9CA3AF] mt-2">
          More metrics coming: {UPCOMING_METRICS.join(' · ')}.
        </p>
      </div>

      <div className="border-t border-[#F3F4F6] my-4" />

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3.5">
        <p className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">
          Simulation summary
        </p>
        <div className="space-y-0">
          {[
            { label: 'Name', value: formData.name.trim() || '-' },
            { label: 'Objective', value: formData.objective.trim() || '-' },
            { label: 'Audience', value: audienceName || '-' },
            { label: 'Assets', value: folderSummary },
            { label: 'Synthetic users', value: '25 personas' },
          ].map((row, idx, arr) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-[5px] ${idx < arr.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}
            >
              <span className="text-[13px] text-[#6B7280]">{row.label}</span>
              <span className={`text-[13px] font-medium ${row.value === '-' ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#F3F4F6] mt-4 pt-4">
        {validationError && (
          <p className={`text-[13px] text-[#EF4444] text-center mb-3 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}>
            {validationError}
          </p>
        )}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-[14px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onNext}
            disabled={running}
            className={`flex items-center gap-2 text-[15px] font-semibold rounded-xl px-6 py-3 transition-all duration-200 ${
              canProceed && !running
                ? 'bg-[#1F2937] text-white shadow-[0_2px_8px_rgba(31,41,55,0.3)] hover:bg-[#111827] hover:shadow-[0_4px_12px_rgba(31,41,55,0.35)]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed shadow-none'
            }`}
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Run Simulation
            {!running && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
