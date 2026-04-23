"use client";

import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { StepProgressBar } from '@/components/simulations/StepProgressBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useUser } from '@/contexts/UserContext';
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Loader2,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AssetFolder } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import { triggerProductFlowComparatorSimulation, fetchAudienceTemplates } from '@/lib/backend-simulation';
import type { AudienceTemplate } from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/db';
import type { AudienceDoc } from '@/lib/db';
import { consumeNDJSONStream } from '@/lib/stream-simulation';
import type { ComparatorData } from '@/types/comparator';

type Step = 1 | 2 | 3;

const STEP_LABELS = ['Setup', 'Select assets', 'Parameters'];

const METRICS = [
  { value: 'signup-completion', label: 'Signup completion rate', desc: '% of users who complete the sign-up flow' },
  { value: 'activation', label: 'Onboarding activation rate', desc: '% of users who complete the core activation step' },
  { value: 'checkout-conversion', label: 'Checkout conversion rate', desc: '% of users who complete a purchase' },
  { value: 'retention-7d', label: '7-day retention', desc: '% of users still active 7 days after first visit' },
  { value: 'retention-30d', label: '30-day retention', desc: '% of users still active 30 days after first visit' },
];


export default function ProductFlowComparatorSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useUser();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [running, setRunning] = useState(false);
  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [templates, setTemplates] = useState<AudienceTemplate[]>([]);
  const [allFolders, setAllFolders] = useState<AssetFolder[]>([]);
  const [validationError, setValidationError] = useState('');
  const [shake, setShake] = useState(false);
  const [streamProgress, setStreamProgress] = useState<{
    flows: Record<string, { personasTotal: number; personasDone: number }>;
    phase: string;
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
    fetchAudienceTemplates("IN")
      .then(setTemplates)
      .catch((err) => console.warn("[templates] fetch failed:", err));
  }, []);

  const comparatorFolders = allFolders.filter((f) => f.assetType === 'product-flow-comparator');
  const comparatorReadyFolders = comparatorFolders.filter((f) => f.status === 'ready');
  const eligibleFolders = comparatorReadyFolders.filter((f) => f.assetCount > 0);

  const [formData, setFormData] = useState({
    name: '',
    audience: '',
    audienceTemplateId: '',
    personaDepth: 'medium' as 'low' | 'medium' | 'high',
    optimizeMetric: 'activation',
    selectedFolderIds: [] as string[],
  });

  const canProceedStep1 =
    formData.name.trim().length >= 3 &&
    (formData.audience !== '' || formData.audienceTemplateId !== '');
  const canProceedStep2 = formData.selectedFolderIds.length > 0 && eligibleFolders.length > 0;
  const canProceedStep3 = formData.optimizeMetric !== '';

  const handleDisabledClick = () => {
    let msg = '';
    if (currentStep === 1) {
      if (formData.name.trim().length < 3) msg = 'Please enter a simulation name (at least 3 characters).';
      else if (!formData.audience && !formData.audienceTemplateId)
        msg = 'Please select an audience or template to continue.';
    } else if (currentStep === 2) {
      if (eligibleFolders.length === 0) msg = 'No eligible folders with assets found. Please upload assets first.';
      else msg = 'Please select a comparator folder to continue.';
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

    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
      return;
    }
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    // Resolve audience source: template > user audience > raw text.
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

    // Resolve sub-folder IDs (backend expects Flow 1 & Flow 2 folder IDs, not the parent)
    const parentFolderId = formData.selectedFolderIds[0];
    if (!parentFolderId) {
      showToast('error', 'No folder selected', 'Please select a comparator folder.');
      return;
    }
    const subFolders = await getAssetFolders(userId, parentFolderId);
    if (subFolders.length < 2) {
      showToast('error', 'Incomplete comparator folder', 'Need at least 2 flow sub-folders (Flow 1 and Flow 2).');
      return;
    }
    const subFolderIds = subFolders.map((f) => f.id);

    setRunning(true);
    setStreamProgress({ flows: {}, phase: 'starting' });
    try {
      const res = await triggerProductFlowComparatorSimulation(userId, {
        name: formData.name,
        audience: audienceText,
        personaDepth: 'medium',
        optimizeMetric: formData.optimizeMetric,
        selectedFolderIds: subFolderIds,
        // Persona-retrieval routing hints — same semantics as single-flow page.
        // Both are optional; the backend uses them to skip filter extraction
        // (template) or reuse a cached cohort (audienceId).
        audienceId: formData.audience || undefined,
        audienceTemplateId: formData.audienceTemplateId || undefined,
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

      let comparisonData: ComparatorData | null = null;
      let streamError: string | null = null;
      const flowNames: Record<string, string> = {};

      await consumeNDJSONStream(res, (event) => {
        if (event.type === 'flow_started') {
          flowNames[event.data.flow_id] = event.data.flow_name;
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
              [event.data.flow_id]: { personasTotal: event.data.num_personas, personasDone: 0 },
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
          setStreamProgress((prev) => prev ? { ...prev, phase: 'saving' } : null);
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

      const data = comparisonData as ComparatorData;
      const metric = `${data.winner?.flow_name ?? 'Winner'} leads`;
      const docId = await saveSimulation(userId, {
        type: 'Product Flow Comparator',
        status: 'completed',
        name: formData.name || 'Product Flow Comparator Run',
        metric,
        timestamp: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
        simulationId: data.comparison_id,
        result: data,
      });
      showToast('success', 'Comparison complete', 'Redirecting to results.');
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
  const selectedFolders = comparatorReadyFolders.filter((f) => formData.selectedFolderIds.includes(f.id));

  return (
    <>
      <TopBar
        title="New Product Flow Comparator"
        onMenuClick={toggleMobileMenu}
      />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[640px] mx-auto pb-24">
          <StepProgressBar currentStep={currentStep} totalSteps={3} labels={STEP_LABELS} />

          {/* Running progress panel */}
          {running && streamProgress && (
            <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7">
              <div className="flex items-center gap-3 mb-5">
                <Loader2 className="w-5 h-5 animate-spin text-[#F59E0B]" />
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {streamProgress.phase === 'saving'
                    ? 'Saving comparison results…'
                    : Object.keys(streamProgress.flows).length > 0
                      ? 'Simulating flows in parallel…'
                      : 'Initialising comparison…'}
                </p>
              </div>
              {Object.keys(streamProgress.flows).length > 0 && (
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
                            className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                            style={{ width: `${Math.round((flow.personasDone / flow.personasTotal) * 100)}%` }}
                          />
                        </div>
                      )}
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
          {!running && currentStep === 2 && (
            <AssetSelectionStep
              formData={formData}
              setFormData={setFormData}
              allFolders={comparatorFolders}
              readyFolders={comparatorReadyFolders}
            />
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
                  ? 'bg-[#F59E0B] text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:bg-[#D97706] hover:shadow-[0_4px_12px_rgba(245,158,11,0.35)]'
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
        }
      `}</style>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 1 — SETUP
   ──────────────────────────────────────────────────────────────── */

type ComparatorFormData = {
  name: string;
  audience: string;
  audienceTemplateId: string;
  personaDepth: 'low' | 'medium' | 'high';
  optimizeMetric: string;
  selectedFolderIds: string[];
};

interface SetupStepProps {
  formData: ComparatorFormData;
  setFormData: Dispatch<SetStateAction<ComparatorFormData>>;
  audiences: AudienceDoc[];
  templates: AudienceTemplate[];
}

function SetupStep({ formData, setFormData, audiences, templates }: SetupStepProps) {
  const [audienceTab, setAudienceTab] = useState<'mine' | 'templates'>(
    formData.audienceTemplateId ? 'templates' : 'mine'
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
          placeholder="e.g., Onboarding V1 vs V2 Comparison"
          className="w-full text-[15px] text-[#1A1A1A] placeholder:text-[#9CA3AF] border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 py-3 focus:border-[#F59E0B] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:outline-none transition-all"
        />
      </div>

      <div className="border-t border-[#F3F4F6] my-6" />

      {/* Target Audience */}
      <div>
        <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-1">
          Target audience <span className="text-[#EF4444]">*</span>
        </label>
        <p className="text-[13px] text-[#6B7280] mb-4">
          Pick from your saved audiences or start from a curated template.
        </p>

        {/* Tab switcher */}
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
            className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-all ${
              audienceTab === 'templates'
                ? 'bg-white text-[#1A1A1A] shadow-sm'
                : 'text-[#6B7280] hover:text-[#1A1A1A]'
            }`}
          >
            Curated templates {templates.length > 0 && `(${templates.length})`}
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
                className="inline-block text-[13px] font-semibold text-[#F59E0B] hover:text-[#D97706] hover:underline mt-3"
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
                      setFormData((prev) => ({ ...prev, audience: aud.id, audienceTemplateId: '' }))
                    }
                    className={`
                      text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3
                      ${isSelected
                        ? 'border-[#F59E0B] bg-[#FFFBEB]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#F59E0B] hover:bg-[#FFFBEB]'
                      }
                    `}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${isSelected ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-[#D1D5DB] bg-white'}`}
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
        ) : templates.length === 0 ? (
          <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
            <Users className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
            <p className="text-[14px] font-medium text-[#6B7280]">No templates available</p>
            <p className="text-[13px] text-[#9CA3AF] mt-1">
              Check that the backend is running and has audience templates configured.
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
                    setFormData((prev) => ({ ...prev, audienceTemplateId: tpl.id, audience: '' }))
                  }
                  className={`
                    text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150 cursor-pointer flex items-start gap-3
                    ${isSelected
                      ? 'border-[#F59E0B] bg-[#FFFBEB]'
                      : 'border-[#E5E7EB] bg-white hover:border-[#F59E0B] hover:bg-[#FFFBEB]'
                    }
                  `}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-[#D1D5DB] bg-white'}`}
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
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 2 — SELECT ASSETS (Product Flow Comparator folders)
   ──────────────────────────────────────────────────────────────── */

interface AssetSelectionStepProps {
  formData: ComparatorFormData;
  setFormData: Dispatch<SetStateAction<ComparatorFormData>>;
  allFolders: AssetFolder[];
  readyFolders: AssetFolder[];
}

function AssetSelectionStep({ formData, setFormData, allFolders, readyFolders }: AssetSelectionStepProps) {
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  // Only show folders that have at least one asset
  const foldersWithAssets = allFolders.filter((f) => f.assetCount > 0);
  const readyFoldersWithAssets = readyFolders.filter((f) => f.assetCount > 0);

  const handleSelect = (id: string) => {
    const isReady = readyFoldersWithAssets.some((f) => f.id === id);
    if (!isReady) return;

    // Single-select: toggle off if already selected, otherwise select only this one
    const isAlreadySelected = formData.selectedFolderIds.includes(id);
    setFormData((prev) => ({
      ...prev,
      selectedFolderIds: isAlreadySelected ? [] : [id],
    }));
  };

  const hasAnyFolders = foldersWithAssets.length > 0;

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 sm:px-8">
      <h2 className="text-[17px] font-bold text-[#1A1A1A] mb-1.5">Select comparator folder</h2>
      <p className="text-[14px] text-[#4B5563] leading-[1.6] mb-5">
        Choose a Product Flow Comparator folder to include. Each comparator contains two flow
        variants (Flow 1 &amp; Flow 2) that will be simulated and compared side-by-side.
      </p>

      {!hasAnyFolders ? (
        <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
          <FolderOpen className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
          <p className="text-[14px] font-medium text-[#6B7280]">No comparator folders found</p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Create a Product Flow Comparator folder in the Assets section with Flow 1 and Flow 2 screens.
          </p>
          <a
            href="/assets"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[13px] font-semibold text-[#F59E0B] hover:text-[#D97706] hover:underline mt-3"
          >
            → Go to Assets
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {foldersWithAssets.map((folder) => {
            const isReady = folder.status === 'ready';
            const isSelected = formData.selectedFolderIds.includes(folder.id);

            return (
              <div key={folder.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleSelect(folder.id)}
                  onMouseEnter={() => !isReady && setTooltipId(folder.id)}
                  onMouseLeave={() => setTooltipId(null)}
                  className={`
                    w-full text-left rounded-xl border-[1.5px] px-[18px] py-4 transition-all duration-150
                    ${!isReady
                      ? 'opacity-50 cursor-not-allowed border-[#E5E7EB] bg-[#FAFAFA]'
                      : isSelected
                        ? 'border-[#F59E0B] bg-[#FFFBEB] cursor-pointer'
                        : 'border-[#E5E7EB] bg-[#FAFAFA] hover:border-[#F59E0B] hover:bg-[#FFFBEB] cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-[#D1D5DB] bg-white'}`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <FolderOpen className="w-5 h-5 text-[#7C3AED]" />
                  </div>

                  <p className="text-[14px] font-semibold text-[#1A1A1A] truncate mt-2.5">
                    {folder.name}
                  </p>

                  <p className="text-[12px] text-[#6B7280] mt-0.5">
                    {getAssetTypeLabel(folder.assetType)} · {folder.assetCount} asset{folder.assetCount !== 1 ? 's' : ''}
                  </p>

                  <div className="mt-2.5">
                    {isReady ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#065F46] bg-[#D1FAE5] rounded-full px-2.5 py-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Ready for Simulation
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] rounded-full px-2.5 py-0.5">
                        <AlertCircle className="w-3 h-3" />
                        Needs step numbers
                      </span>
                    )}
                  </div>
                </button>

                {tooltipId === folder.id && !isReady && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1C1917] text-white text-[12px] rounded-md px-2.5 py-1.5 whitespace-nowrap z-50 pointer-events-none">
                    Complete metadata in Assets before selecting
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1C1917]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 3 — PARAMETERS
   ──────────────────────────────────────────────────────────────── */

interface ParametersStepProps {
  formData: ComparatorFormData;
  setFormData: Dispatch<SetStateAction<ComparatorFormData>>;
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
      {/* Section: Primary Metric — 2-column compact grid */}
      <div>
        <label className="block text-[14px] font-semibold text-[#1A1A1A] mb-0.5">
          Primary metric to optimise for <span className="text-[#EF4444]">*</span>
        </label>
        <p className="text-[13px] text-[#6B7280] mb-3">
          The simulator optimises its comparison around this outcome.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {METRICS.map((m, idx) => {
            const isSelected = formData.optimizeMetric === m.value;
            const isLast = idx === METRICS.length - 1;
            const isComingSoon = m.value !== 'activation';
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => {
                  if (!isComingSoon) {
                    setFormData((prev) => ({ ...prev, optimizeMetric: m.value }));
                  }
                }}
                className={`
                  flex items-center gap-2.5 border-[1.5px] rounded-[10px] px-3.5 py-3 transition-all duration-150 text-left
                  ${isLast ? 'col-span-2' : ''}
                  ${isComingSoon
                    ? 'border-[#E5E7EB] bg-[#F9FAFB] opacity-50 cursor-not-allowed'
                    : isSelected
                      ? 'border-[#F59E0B] bg-[#FFFBEB] cursor-pointer'
                      : 'border-[#E5E7EB] bg-white hover:border-[#F59E0B] hover:bg-[#FFFBEB] cursor-pointer'
                  }
                `}
                disabled={isComingSoon}
              >
                <div
                  className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${isComingSoon ? 'border-[#D1D5DB] bg-[#F3F4F6]' : isSelected ? 'border-[#F59E0B] bg-[#F59E0B]' : 'border-[#D1D5DB] bg-white'}`}
                >
                  {isSelected && !isComingSoon && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-[13px] font-semibold leading-tight ${isComingSoon ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'}`}>{m.label}</p>
                    {isComingSoon && (
                      <span className="text-[10px] font-semibold text-[#9CA3AF] bg-[#F3F4F6] rounded-full px-2 py-0.5 whitespace-nowrap">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] mt-px leading-tight">{m.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
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
            { label: 'Audience', value: audienceName || '—' },
            { label: 'Comparator Folders', value: folderSummary },
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
                ? 'bg-[#F59E0B] text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:bg-[#D97706] hover:shadow-[0_4px_12px_rgba(245,158,11,0.35)]'
                : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed shadow-none'
              }
            `}
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Run Comparison
            {!running && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
