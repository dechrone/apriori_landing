"use client";

import { useState, useEffect, useCallback, useMemo, useRef, type Dispatch, type SetStateAction } from 'react';
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
  Image as ImageIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AssetFolder } from '@/types/asset';
import { triggerProductFlowSimulation, fetchAudienceTemplates } from '@/lib/backend-simulation';
import type { AudienceTemplate } from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/db';
import type { AudienceDoc } from '@/lib/db';
import { consumeNDJSONStream } from '@/lib/stream-simulation';
import type { SimulationData } from '@/types/simulation';
import { createFolder, uploadAssets, updateAssetMetadata } from '@/lib/assets-api';

type Step = 1 | 2 | 3;

/* ── Inline help popover (hover/focus tooltip for jargon) ─────────── */
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
        className="text-[#9CA3AF] hover:text-[#4F46E5] transition-colors focus:outline-none focus:text-[#4F46E5]"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-72 bg-[#1C1917] text-white text-[12px] leading-snug rounded-lg px-3 py-2.5 shadow-xl z-50 pointer-events-none"
        >
          <span className="block font-semibold mb-1 text-indigo-300">{label}</span>
          {body}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1C1917] rotate-45" />
        </span>
      )}
    </span>
  );
}

const STEP_LABELS = ['Setup', 'Select assets', 'Parameters'];

const METRICS = [
  { value: 'activation', label: 'Onboarding activation rate', desc: '% of users who complete the core activation step' },
];

const UPCOMING_METRICS = ['Signup completion', 'Checkout conversion', '7-day retention', '30-day retention'];

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
const MAX_FILE_BYTES = 10 * 1024 * 1024; // matches backend assets.py

/** An in-memory staged upload — the file hasn't touched the backend yet. */
interface PendingFile {
  id: string;          // client-side uuid for React keys
  file: File;
  previewUrl: string;  // object URL for thumbnail rendering
}


export default function ProductFlowSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useUser();
  const { getAccessToken } = useAuthContext();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [running, setRunning] = useState(false);
  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [templates, setTemplates] = useState<AudienceTemplate[]>([]);
  const [allFolders, setAllFolders] = useState<AssetFolder[]>([]);
  const [validationError, setValidationError] = useState('');
  const [shake, setShake] = useState(false);
  const [uploading, setUploading] = useState(false);
  // Inline uploader state. `pendingFiles` is the ordered list of screens
  // dropped into Step 2; persisted only in memory until the PM hits Next, at
  // which point we create a folder + upload and roll it into selectedFolderIds.
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
  useEffect(() => {
    // Load curated audience templates once. Non-blocking: if the backend is
    // unreachable we just fall back to showing only user-created audiences.
    fetchAudienceTemplates("IN")
      .then(setTemplates)
      .catch((err) => console.warn("[templates] fetch failed:", err));
  }, []);

  const productFlowFolders = allFolders.filter((f) => f.assetType === 'product-flow');
  const productFlowReadyFolders = productFlowFolders.filter((f) => f.status === 'ready');
  const eligibleFolders = productFlowReadyFolders.filter((f) => f.assetCount > 0);

  const [formData, setFormData] = useState<ProductFlowFormData>({
    name: '',
    objective: '',             // free-text "what is this flow trying to achieve?"
    audience: '',              // selected user-created audience id (mutually exclusive with templateId)
    audienceTemplateId: '',    // selected curated template id
    personaDepth: 'medium',
    optimizeMetric: 'activation',
    selectedFolderIds: [],
  });

  const canProceedStep1 =
    formData.name.trim().length >= 3 &&
    formData.objective.trim().length >= 10 &&
    (formData.audience !== '' || formData.audienceTemplateId !== '');
  // Step 2 passes when either: (a) the PM staged >=2 files inline, OR (b) they
  // picked an existing ready folder. Two screens is the practical minimum for
  // a flow (entry + at least one transition).
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
      else if (!formData.audience && !formData.audienceTemplateId)
        msg = 'Please select an audience or template to continue.';
    } else if (currentStep === 2) {
      if (pendingFiles.length === 1) msg = 'Upload at least 2 screens — a flow needs more than one step.';
      else msg = 'Upload your screens or pick an existing folder to continue.';
    } else {
      msg = 'Please select a primary metric to continue.';
    }
    setValidationError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setTimeout(() => setValidationError(''), 4000);
  };

  const handleNext = async () => {
    setValidationError('');
    if (currentStep === 1 && !canProceedStep1) { handleDisabledClick(); return; }
    if (currentStep === 2 && !canProceedStep2) { handleDisabledClick(); return; }
    if (currentStep === 3 && !canProceedStep3) { handleDisabledClick(); return; }

    // Step 2 → 3 transition: if the PM has staged files inline, materialize
    // them into a real folder + uploaded assets before advancing. All happens
    // in-page — no navigation to /assets.
    if (currentStep === 2 && pendingFiles.length > 0) {
      setUploading(true);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error('Not signed in — please refresh and try again.');
        const folderName =
          formData.name.trim() ||
          `Product flow screens · ${new Date().toLocaleString()}`;
        const folder = await createFolder(token, {
          name: folderName,
          assetType: 'product-flow',
          description: formData.objective.trim() || undefined,
        });
        // Upload in PM-chosen order so the backend assigns sequential stepNumbers.
        const uploaded = await uploadAssets(
          token,
          folder.id,
          pendingFiles.map((p) => p.file),
        );
        // Reinforce step numbers explicitly — belt-and-suspenders, ensures the
        // order is 1..N no matter what the upload endpoint defaulted to.
        await Promise.all(
          uploaded.map((asset, idx) =>
            updateAssetMetadata(token, asset.id, folder.id, { stepNumber: idx + 1 })
              .catch(() => { /* order fallback is fine — backend already ordered */ }),
          ),
        );
        setFormData((prev) => ({
          ...prev,
          selectedFolderIds: [folder.id],
        }));
        // Release object URLs now that the files are uploaded.
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
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    // Resolve audience source: template > user audience > raw text.
    // Backend always needs free-text `audience` for fallback/logging, even when a
    // template or audience_id is passed (it becomes the semantic ranking query).
    const selectedTemplate = formData.audienceTemplateId
      ? templates.find((t) => t.id === formData.audienceTemplateId)
      : undefined;
    const selectedAudience = formData.audience
      ? audiences.find((a) => a.id === formData.audience)
      : undefined;

    const audienceText =
      selectedTemplate?.target_group_seed ||
      selectedAudience?.audienceDescription ||
      selectedAudience?.description ||
      formData.audience;

    setRunning(true);
    setStreamProgress({ personasTotal: 0, personasDone: [], phase: 'starting' });
    try {
      const res = await triggerProductFlowSimulation(userId, {
        name: formData.name,
        objective: formData.objective.trim(),
        audience: audienceText,
        // Free PM tool: always a 50-persona run. numPersonas beats personaDepth on the backend.
        numPersonas: 50,
        optimizeMetric: formData.optimizeMetric,
        selectedFolderIds: formData.selectedFolderIds,
        // Persona-retrieval routing hints — backend uses these to skip the
        // LLM filter extraction step (template) or reuse a cached cohort
        // (audienceId). All optional.
        audienceId: formData.audience || undefined,
        audienceTemplateId: formData.audienceTemplateId || undefined,
        // Template IDs map 1:1 to backend pool_ids. Passing poolId lets the
        // audience router skip its pool-picking LLM call and only sub-segment
        // within the picked pool.
        poolId: formData.audienceTemplateId || undefined,
      });
      if (!res.ok) {
        if (res.status === 402) {
          const data = await res.json().catch(() => ({}));
          const detail = (data as { detail?: { required?: number; available?: number; message?: string } }).detail;
          showToast(
            'error',
            'Out of credits',
            detail?.message || `You need ${detail?.required ?? '?'} credits but have ${detail?.available ?? 0}. Visit /pricing to upgrade.`,
          );
          return;
        }
        const text = await res.text();
        showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        return;
      }

      let insightsData: SimulationData | null = null;
      let streamError: string | null = null;

      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'started') {
          setStreamProgress({
            personasTotal: event.data.num_personas,
            personasDone: [],
            phase: 'simulating',
          });
        } else if (event.type === 'personas_loaded') {
          const mode = event.data.retrieval_mode as string | undefined;
          const matched = event.data.matched_count as number | undefined;
          let notice: string | undefined;
          if (mode === 'relaxed') {
            notice =
              matched !== undefined
                ? `Only ${matched} personas strictly matched your audience — we widened the search semantically to reach ${event.data.count}.`
                : "Your audience description was broadened semantically to reach enough personas.";
          } else if (mode === 'random_fallback') {
            notice =
              "We couldn't confidently match your audience, so this run uses a random persona sample. Consider refining the description for a more accurate result.";
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
        name: formData.name || 'Product Flow Run',
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
        err instanceof Error
          ? err.message
          : "We couldn't reach the simulation engine. Please try again in a minute.",
      );
    } finally {
      setRunning(false);
      setStreamProgress(null);
    }
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

  const selectedAudience = audiences.find((a) => a.id === formData.audience);
  const selectedTemplateForSummary = templates.find((t) => t.id === formData.audienceTemplateId);
  const audienceDisplayName =
    selectedTemplateForSummary?.name || selectedAudience?.name || undefined;
  const selectedFolders = productFlowReadyFolders.filter((f) => formData.selectedFolderIds.includes(f.id));


  return (
    <>
      <TopBar
        title="New Product Flow Simulation"
        onMenuClick={toggleMobileMenu}
      />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[640px] mx-auto pb-24">
          <StepProgressBar currentStep={currentStep} totalSteps={3} labels={STEP_LABELS} />

          {/* Running progress panel */}
          {running && streamProgress && (
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7">
              <div className="flex items-center gap-3 mb-5">
                <Loader2 className="w-5 h-5 animate-spin text-[#4F46E5]" />
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {streamProgress.phase === 'saving'
                    ? 'Saving results…'
                    : streamProgress.personasTotal > 0
                      ? `Simulating ${streamProgress.personasDone.length} / ${streamProgress.personasTotal} personas…`
                      : 'Initialising simulation…'}
                </p>
              </div>
              {streamProgress.retrievalNotice && (
                <div className="mb-4 flex items-start gap-2.5 rounded-[10px] border border-[#FCD34D] bg-[#EEF2FF] px-3.5 py-2.5 text-[13px] text-[#312E81]">
                  <span aria-hidden className="mt-[1px]">⚠</span>
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
              templates={templates}
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
              <Loader2 className="w-5 h-5 animate-spin text-[#4F46E5]" />
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  Uploading {pendingFiles.length} screen{pendingFiles.length !== 1 ? 's' : ''}…
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

          {/* Validation error — Steps 1 & 2 only */}
          {!running && currentStep !== 3 && validationError && (
            <p
              className={`text-[13px] text-[#EF4444] text-center mt-6 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            >
              {validationError}
            </p>
          )}

          {/* Footer Navigation — Steps 1 & 2 only */}
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
                  ? 'bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)] hover:bg-[#4338CA] hover:shadow-[0_4px_12px_rgba(79,70,229,0.35)]'
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

      {/* Keyframes for shake + pulse-glow */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(79,70,229,0); }
        }
      `}</style>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 1 — SETUP
   ──────────────────────────────────────────────────────────────── */

type ProductFlowFormData = {
  name: string;
  objective: string;
  audience: string;
  audienceTemplateId: string;
  personaDepth: 'low' | 'medium' | 'high';
  optimizeMetric: string;
  selectedFolderIds: string[];
};

interface SetupStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  audiences: AudienceDoc[];
  templates: AudienceTemplate[];
}

function SetupStep({ formData, setFormData, audiences, templates }: SetupStepProps) {
  const [audienceTab, setAudienceTab] = useState<'mine' | 'templates'>(
    formData.audienceTemplateId
      ? 'templates'
      : audiences.length === 0
        ? 'templates'
        : 'mine'
  );
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
          className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#4F46E5] focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)] focus:outline-none transition-all"
        />
      </div>

      <div className="border-t border-[#F3F4F6] my-6" />

      {/* Product-flow objective */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-[14px] font-semibold text-[#1A1A1A]">
            What is this flow trying to achieve? <span className="text-[#EF4444]">*</span>
          </label>
          <HelpPopover
            label="Why do we ask this?"
            body="This tells each synthetic persona what the product is trying to do for them. Good objectives are concrete and outcome-focused ('get a first-time user from sign-up to making their first trade in under 3 minutes') rather than vague ('improve onboarding')."
          />
        </div>
        <p className="text-[13px] text-[#6B7280] mb-3">
          Describe the outcome you&apos;re designing for, in one or two sentences.
          The simulator grounds every persona&apos;s decisions against this goal.
        </p>
        <textarea
          value={formData.objective}
          onChange={(e) => setFormData((prev) => ({ ...prev, objective: e.target.value }))}
          placeholder="e.g., Help a first-time investor go from sign-up to buying their first mutual fund without stalling on KYC."
          rows={3}
          maxLength={1000}
          className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#4F46E5] focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)] focus:outline-none transition-all resize-none"
        />
        <p className="text-[11px] text-[#9CA3AF] mt-1.5 text-right">
          {formData.objective.length} / 1000
        </p>
      </div>

      <div className="border-t border-[#F3F4F6] my-6" />

      {/* Target Audience */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="block text-[14px] font-semibold text-[#1A1A1A]">
            Target audience <span className="text-[#EF4444]">*</span>
          </label>
          <HelpPopover
            label="What is an audience?"
            body="A group of synthetic personas (e.g. 'first-time car loan borrowers in Tier-2 cities') we'll send through your flow. Templates are pre-built and run fastest. Saved audiences are ones you've defined yourself."
          />
        </div>
        <p className="text-[13px] text-[#6B7280] mb-4">
          Pick from your saved audiences or start from a curated template.
        </p>

        {/* Tab switcher: your audiences | curated templates */}
        <div className="inline-flex items-center bg-[#F3F4F6] rounded-lg p-1 mb-4">
          <button
            type="button"
            onClick={() => setAudienceTab('mine')}
            className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all ${
              audienceTab === 'mine'
                ? 'bg-white text-[#1A1A1A] shadow-sm'
                : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            Your audiences {audiences.length > 0 && `(${audiences.length})`}
          </button>
          <button
            type="button"
            onClick={() => setAudienceTab('templates')}
            className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              audienceTab === 'templates'
                ? 'bg-white text-[#1A1A1A] shadow-sm'
                : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            Curated templates {templates.length > 0 && `(${templates.length})`}
            {audiences.length === 0 && (
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 rounded-full px-1.5 py-0.5 uppercase tracking-wider">
                Fastest
              </span>
            )}
          </button>
        </div>

        {audienceTab === 'mine' ? (
          audiences.length === 0 ? (
            <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
              <Users className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-[14px] font-medium text-[#6B7280]">No audiences created yet</p>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                Create one — or switch to &quot;Curated templates&quot; for a fast start.
              </p>
              <a
                href="/audiences"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[13px] font-semibold text-[#4F46E5] hover:text-[#4338CA] hover:underline mt-3"
              >
                → Create an audience
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audiences.map((aud) => {
                const isSelected = formData.audience === aud.id && !formData.audienceTemplateId;
                const summary = aud.audienceDescription
                  ? aud.audienceDescription.slice(0, 60) + (aud.audienceDescription.length > 60 ? '…' : '')
                  : aud.description
                    ? aud.description.slice(0, 60) + (aud.description.length > 60 ? '…' : '')
                    : '';

                return (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() =>
                      // Selecting a user audience clears any previously-selected template
                      // so the two selection modes stay mutually exclusive.
                      setFormData((prev) => ({ ...prev, audience: aud.id, audienceTemplateId: '' }))
                    }
                    className={`
                      text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3
                      ${isSelected
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
                      <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">{aud.name}</p>
                      {summary && (
                        <p className="text-[12px] text-[#6B7280] mt-0.5 leading-[1.5]">{summary}</p>
                      )}
                      {aud.status === 'active' && (
                        <span className="inline-block text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded-full px-1.5 py-0.5 mt-1.5">
                          active
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )
        ) : (
          // ── Curated templates tab ────────────────────────────────────
          templates.length === 0 ? (
            <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
              <Users className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
              <p className="text-[14px] font-medium text-[#6B7280]">No templates available</p>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                The shared pool catalog is empty. Check <code>shared/pool_templates.json</code>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((tpl) => {
                const isSelected = formData.audienceTemplateId === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() =>
                      // Selecting a template clears any user-audience selection
                      setFormData((prev) => ({ ...prev, audienceTemplateId: tpl.id, audience: '' }))
                    }
                    className={`
                      text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3
                      ${isSelected
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
                      <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">{tpl.name}</p>
                      <p className="text-[12px] text-[#6B7280] mt-0.5 leading-[1.5] line-clamp-2">
                        {tpl.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                        {tpl.category && (
                          <span className="text-[10px] font-medium text-[#6B7280] bg-[#F3F4F6] rounded-full px-1.5 py-0.5 uppercase tracking-wider">
                            {tpl.category}
                          </span>
                        )}
                        {tpl.pre_cached_uuids_count > 0 && (
                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 rounded-full px-1.5 py-0.5">
                            {tpl.pre_cached_uuids_count} pre-cached
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 2 — SELECT ASSETS
   ──────────────────────────────────────────────────────────────── */

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
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          rejected.push(`${file.name} — unsupported format`);
          return;
        }
        if (file.size > MAX_FILE_BYTES) {
          rejected.push(`${file.name} — over 10 MB`);
          return;
        }
        accepted.push({
          id:
            (typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : Math.random().toString(36).slice(2)),
          file,
          previewUrl: URL.createObjectURL(file),
        });
      });
      if (accepted.length > 0) {
        setPendingFiles((prev) => [...prev, ...accepted]);
        // Picking files takes precedence over picking an existing folder.
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
    // Reset the input so picking the same file again still fires the change event.
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
    // Picking an existing folder discards any staged uploads (mutually exclusive).
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
        Drop PNGs or JPEGs in the order users encounter them. You can reorder
        before running — step 1 is the entry, the last step is the success
        state. PNG / JPEG / WebP, up to 10 MB each.
      </p>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        className={`
          flex flex-col items-center justify-center rounded-[12px] border-[1.5px] border-dashed cursor-pointer
          transition-colors py-10 px-6 text-center
          ${isDragging
            ? 'border-[#4F46E5] bg-[#EEF2FF]'
            : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_IMAGE_TYPES.join(',')}
          onChange={onInputChange}
          className="hidden"
        />
        <Upload className="w-6 h-6 text-[#4F46E5] mb-2" />
        <p className="text-[14px] font-semibold text-[#1A1A1A]">
          {pendingFiles.length > 0 ? 'Add more screens' : 'Drop screens here or click to pick'}
        </p>
        <p className="text-[12px] text-[#6B7280] mt-1">
          {pendingFiles.length > 0
            ? `${pendingFiles.length} screen${pendingFiles.length !== 1 ? 's' : ''} staged · reorder below`
            : 'Select multiple — they keep the order you pick them in'}
        </p>
      </div>

      {/* Staged thumbnails */}
      {pendingFiles.length > 0 && (
        <div className="mt-5 space-y-2">
          {pendingFiles.map((pf, idx) => (
            <div
              key={pf.id}
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[10px] px-3 py-2.5"
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#EEF2FF] border-[1.5px] border-[#4F46E5] flex items-center justify-center text-[12px] font-bold text-[#3730A3]">
                {idx + 1}
              </div>
              <div className="shrink-0 w-12 h-12 rounded-[6px] overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pf.previewUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#1A1A1A] truncate">
                  {pf.file.name}
                </p>
                <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                  {(pf.file.size / 1024).toFixed(0)} KB · {pf.file.type.split('/')[1]?.toUpperCase() ?? 'IMG'}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  aria-label="Move up"
                  className="p-1.5 rounded-md text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, 1)}
                  disabled={idx === pendingFiles.length - 1}
                  aria-label="Move down"
                  className="p-1.5 rounded-md text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  aria-label="Remove"
                  className="p-1.5 rounded-md text-[#EF4444] hover:bg-[#FEF2F2]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-[#9CA3AF] mt-2">
            Tip: step 1 is what the persona sees first. Keep reordering until the
            flow reads the way a real user would encounter it.
          </p>
        </div>
      )}

      {/* Existing folder fallback */}
      {hasExisting && (
        <div className="mt-6 pt-5 border-t border-[#F3F4F6]">
          <button
            type="button"
            onClick={() => setShowExistingFolders((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#1A1A1A]"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showExistingFolders ? 'rotate-180' : ''}`}
            />
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
                    className={`
                      text-left rounded-[10px] border-[1.5px] px-3 py-2.5 transition-all
                      ${isSelected
                        ? 'border-[#4F46E5] bg-[#EEF2FF]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
                      }
                    `}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0
                          ${isSelected ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#D1D5DB] bg-white'}`}
                      >
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

/* ────────────────────────────────────────────────────────────────
   STEP 3 — PARAMETERS
   ──────────────────────────────────────────────────────────────── */

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

function ParametersStep({ formData, setFormData, audienceName, selectedFolders, onBack, onNext, running, canProceed, validationError, shake }: ParametersStepProps) {
  const folderSummary = selectedFolders.length > 0
    ? selectedFolders.map((f) => `${f.name} · ${f.assetCount} screens`).join(', ')
    : '—';

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-6 sm:px-7">
      {/* Section: Primary Metric */}
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
              className={`
                w-full flex items-center gap-2.5 border-[1.5px] rounded-[10px] px-3.5 py-3 transition-all duration-150 text-left cursor-pointer
                ${isSelected
                  ? 'border-[#4F46E5] bg-[#EEF2FF]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#4F46E5] hover:bg-[#EEF2FF]'
                }
              `}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                  ${isSelected ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-[#D1D5DB] bg-white'}`}
              >
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

      {/* Section 3: Simulation Summary — compact */}
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3.5">
        <p className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">
          Simulation summary
        </p>
        <div className="space-y-0">
          {[
            { label: 'Name', value: formData.name.trim() || '—' },
            { label: 'Objective', value: formData.objective.trim() || '—' },
            { label: 'Audience', value: audienceName || '—' },
            { label: 'Assets', value: folderSummary },
            { label: 'Synthetic users', value: '50 personas' },
          ].map((row, idx, arr) => (
            <div
              key={row.label}
              className={`flex items-center justify-between py-[5px] ${idx < arr.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}
            >
              <span className="text-[13px] text-[#6B7280]">{row.label}</span>
              <span className={`text-[13px] font-medium ${row.value === '—' ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider + In-card footer navigation */}
      <div className="border-t border-[#F3F4F6] mt-4 pt-4">
        {/* Validation error inside card */}
        {validationError && (
          <p
            className={`text-[13px] text-[#EF4444] text-center mb-3 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
          >
            {validationError}
          </p>
        )}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[14px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={onNext}
            disabled={running}
            className={`
              flex items-center gap-2 text-[15px] font-semibold rounded-xl px-6 py-3
              transition-all duration-200
              ${canProceed && !running
                ? 'bg-[#4F46E5] text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)] hover:bg-[#4338CA] hover:shadow-[0_4px_12px_rgba(79,70,229,0.35)]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed shadow-none'
              }
            `}
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
