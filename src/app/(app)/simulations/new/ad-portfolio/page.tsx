"use client";

import { useState, useEffect, useCallback } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { StepProgressBar } from '@/components/simulations/StepProgressBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
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
import { triggerAdPortfolioSimulation } from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/firestore';
import type { AudienceDoc } from '@/lib/firestore';
import type { AdSimulationResponse } from '@/types/simulation-result';

type Step = 1 | 2;

const STEP_LABELS = ['Setup', 'Select ad folder'];

export default function AdPortfolioSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useFirebaseUser();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [running, setRunning] = useState(false);
  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [allFolders, setAllFolders] = useState<AssetFolder[]>([]);
  const [validationError, setValidationError] = useState('');
  const [shake, setShake] = useState(false);
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

  const adCreativeFolders = allFolders.filter((f) => f.assetType === 'ad-creative');
  const adCreativeReadyFolders = adCreativeFolders.filter((f) => f.status === 'ready');

  const [formData, setFormData] = useState({
    name: '',
    audience: '',
    selectedFolderId: '',
  });

  const canProceedStep1 = formData.name.trim().length >= 3 && formData.audience !== '';
  const canProceedStep2 = formData.selectedFolderId !== '';

  const handleDisabledClick = () => {
    let msg = '';
    if (currentStep === 1) {
      if (formData.name.trim().length < 3) msg = 'Please enter a simulation name (at least 3 characters).';
      else if (!formData.audience) msg = 'Please select an audience to continue.';
    } else {
      msg = 'Please select at least one folder to continue.';
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

    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    if (!userId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    // Resolve audience ID → natural language description (backend expects text, not Firestore ID)
    const selectedAudience = audiences.find((a) => a.id === formData.audience);
    const audienceText =
      selectedAudience?.audienceDescription ||
      selectedAudience?.description ||
      formData.audience;

    setRunning(true);
    try {
      const res = await triggerAdPortfolioSimulation(userId, {
        name: formData.name,
        audience: audienceText,
        selectedFolderId: formData.selectedFolderId,
      });
      if (!res.ok) {
        const text = await res.text();
        showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        return;
      }
      const data = (await res.json()) as AdSimulationResponse;
      const result = data?.result;
      const validation = result?.validation_summary;
      const meta = result?.metadata;
      const metric =
        validation != null
          ? `${validation.valid}/${validation.total} valid · ${meta?.num_personas ?? 0} personas`
          : meta != null
            ? `${meta.num_personas} personas · ${meta.num_ads} ads`
            : 'Ad portfolio run';
      const docId = await saveSimulation(userId, {
        type: 'Ad Portfolio',
        status: 'completed',
        name: meta?.simulation_name ?? (formData.name || 'Ad Portfolio Run'),
        metric,
        timestamp: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
        simulationId: data?.simulation_id,
        result: result ?? data,
      });
      showToast('success', 'Simulation complete', 'Redirecting to results.');
      router.push(`/simulations/ad-portfolio/${docId}`);
    } catch (err) {
      showToast('error', 'Failed to run simulation', err instanceof Error ? err.message : 'Check backend at localhost:8080.');
    } finally {
      setRunning(false);
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

  const canProceedCurrent = currentStep === 1 ? canProceedStep1 : canProceedStep2;

  return (
    <>
      <TopBar
        title="New Ad Portfolio Simulation"
        onMenuClick={toggleMobileMenu}
      />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[640px] mx-auto pb-24">
          <StepProgressBar currentStep={currentStep} totalSteps={2} labels={STEP_LABELS} />

          {currentStep === 1 && (
            <SetupStep formData={formData} setFormData={setFormData} audiences={audiences} />
          )}
          {currentStep === 2 && (
            <FolderSelectionStep
              formData={formData}
              setFormData={setFormData}
              allFolders={adCreativeFolders}
              readyFolders={adCreativeReadyFolders}
            />
          )}

          {/* Validation error */}
          {validationError && (
            <p
              className={`text-[13px] text-[#EF4444] text-center mt-6 ${shake ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}
            >
              {validationError}
            </p>
          )}

          {/* Footer Navigation */}
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
                ${currentStep === 2 && canProceedCurrent && !running ? 'hover:animate-[pulse-glow_2s_infinite]' : ''}
              `}
            >
              {running ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {currentStep === 2 ? 'Run Simulation' : 'Next Step'}
              {!running && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

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

interface FormData {
  name: string;
  audience: string;
  selectedFolderId: string;
}

interface SetupStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  audiences: AudienceDoc[];
}

function SetupStep({ formData, setFormData, audiences }: SetupStepProps) {
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Q1 Ad Audit · Metro Audience"
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
          Choose the audience set to run this ad audit against.
        </p>

        {audiences.length === 0 ? (
          <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
            <Users className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
            <p className="text-[14px] font-medium text-[#6B7280]">No audiences created yet</p>
            <p className="text-[13px] text-[#9CA3AF] mt-1">
              You need a target audience to run a simulation.
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
              const isSelected = formData.audience === aud.id;
              const summary = aud.audienceDescription
                ? aud.audienceDescription.slice(0, 60) + (aud.audienceDescription.length > 60 ? '…' : '')
                : aud.description
                  ? aud.description.slice(0, 60) + (aud.description.length > 60 ? '…' : '')
                  : '';

              return (
                <button
                  key={aud.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, audience: aud.id })}
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
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STEP 2 — SELECT AD FOLDER
   ──────────────────────────────────────────────────────────────── */

interface FolderSelectionStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  allFolders: AssetFolder[];
  readyFolders: AssetFolder[];
}

function FolderSelectionStep({ formData, setFormData, allFolders, readyFolders }: FolderSelectionStepProps) {
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const isReady = readyFolders.some((f) => f.id === id);
    if (!isReady) return;
    setFormData({ ...formData, selectedFolderId: id });
  };

  const hasAnyFolders = allFolders.length > 0;

  return (
    <div className="bg-white border border-[#E8E4DE] rounded-[14px] p-7 sm:px-8">
      <h2 className="text-[17px] font-bold text-[#1A1A1A] mb-1.5">Select ad creative folder</h2>
      <p className="text-[14px] text-[#4B5563] leading-[1.6] mb-5">
        Choose the asset folder that contains your ad creatives. Only completed ad creative folders are shown.
      </p>

      {!hasAnyFolders ? (
        <div className="bg-[#FAFAFA] border-[1.5px] border-dashed border-[#E5E7EB] rounded-xl p-6 text-center">
          <FolderOpen className="w-6 h-6 text-[#9CA3AF] mx-auto mb-2" />
          <p className="text-[14px] font-medium text-[#6B7280]">No folders ready for simulation</p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Create an ad creatives folder in Assets, upload creatives, and complete metadata first.
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
          {allFolders.map((folder) => {
            const isReady = folder.status === 'ready';
            const isSelected = formData.selectedFolderId === folder.id;

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
                    <FolderOpen className="w-5 h-5 text-[#F59E0B]" />
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
                        Needs metadata
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
