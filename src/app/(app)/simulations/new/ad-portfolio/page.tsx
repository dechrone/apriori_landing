"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { ArrowLeft, ArrowRight, CheckCircle2, FolderOpen, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AssetFolder } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';
import { triggerAdPortfolioSimulation } from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/firestore';
import type { AudienceDoc } from '@/lib/firestore';
import type { AdSimulationResponse } from '@/types/simulation-result';

type Step = 1 | 2;

export default function AdPortfolioSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { clerkId, profileReady } = useFirebaseUser();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [running, setRunning] = useState(false);
  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [folders, setFolders] = useState<AssetFolder[]>([]);
  const router = useRouter();

  const loadAudiences = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const list = await getAudiences(clerkId);
      setAudiences(list);
    } catch (err) {
      console.error(err);
    }
  }, [clerkId, profileReady]);

  const loadFolders = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const list = await getAssetFolders(clerkId);
      setFolders(list);
    } catch (err) {
      console.error(err);
    }
  }, [clerkId, profileReady]);

  useEffect(() => {
    loadAudiences();
  }, [loadAudiences]);

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const adCreativeReadyFolders = folders.filter(
    (f) => f.assetType === 'ad-creative' && f.status === 'ready'
  );

  const [formData, setFormData] = useState({
    name: '',
    audience: '',
    selectedFolderId: '',
  });

  const handleNext = async () => {
    if (currentStep < 2) {
      setCurrentStep(2);
      return;
    }
    if (!clerkId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    setRunning(true);
    try {
      const res = await triggerAdPortfolioSimulation(clerkId, {
        name: formData.name,
        audience: formData.audience,
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
      const docId = await saveSimulation(clerkId, {
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
    if (currentStep > 1) {
      setCurrentStep(1);
    } else {
      router.back();
    }
  };

  const canProceed =
    currentStep === 1
      ? formData.name.trim() && formData.audience
      : formData.selectedFolderId;

  return (
    <>
      <TopBar
        title="New Ad Portfolio Simulation"
        breadcrumb={`Step ${currentStep} of 2: ${getStepTitle(currentStep)}`}
        onMenuClick={toggleMobileMenu}
      />

      <div className="max-w-[960px] mx-auto pt-16 pb-24 px-4">
        {currentStep === 1 && (
          <SetupStep formData={formData} setFormData={setFormData} audiences={audiences} />
        )}
        {currentStep === 2 && (
          <FolderSelectionStep formData={formData} setFormData={setFormData} folders={adCreativeReadyFolders} />
        )}

        <div className="flex items-center justify-between mt-14 gap-6">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            className="min-h-[48px] px-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            className="min-h-[48px] px-8"
            disabled={!canProceed || running}
          >
            {running ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {currentStep === 2 ? 'Run Simulation' : 'Next Step'}
            {!running && <ArrowRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </>
  );
}

function getStepTitle(step: Step): string {
  switch (step) {
    case 1:
      return 'Setup';
    case 2:
      return 'Select ad folder';
    default:
      return '';
  }
}

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
  const audienceOptions = [
    { value: '', label: 'Select an audience' },
    ...audiences.map((a) => ({ value: a.id, label: a.name })),
  ];

  return (
    <div className="space-y-12 [&_label]:text-body [&_label]:mb-3">
      <div>
        <Input
          label="Simulation Name"
          required
          placeholder="e.g., Q1 Ad Audit · Metro Audience"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="py-4 px-5 text-body-lg min-h-[52px]"
        />
      </div>

      <div>
        <Select
          label="Target Audience"
          required
          value={formData.audience}
          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
          options={audienceOptions}
          className="py-4 px-5 text-body-lg min-h-[52px]"
        />
        <div className="mt-4 p-5 rounded-[var(--radius-sm)] bg-bg-elevated">
          <p className="text-body text-text-secondary leading-relaxed">
            Choose the audience set to run this ad audit against. If you haven&apos;t created one
            yet,{' '}
            <Link
              href="/audiences/new"
              className="text-accent-gold hover:text-accent-gold-hover font-medium underline underline-offset-2"
            >
              create an audience
            </Link>
            {' '}first, then come back and select it here.
          </p>
        </div>
      </div>
    </div>
  );
}

interface FolderSelectionStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  folders: AssetFolder[];
}

function FolderSelectionStep({ formData, setFormData, folders }: FolderSelectionStepProps) {
  return (
    <Card>
      <CardContent className="py-8">
        <div className="mb-6">
          <h2 className="text-h3 text-text-primary mb-1">Select ad creative folder</h2>
          <p className="text-body-sm text-text-tertiary">
            Choose the asset folder that contains your ad creatives. Only completed ad creative
            folders are shown.
          </p>
        </div>

        {folders.length === 0 ? (
          <p className="text-body text-text-secondary">
            No completed ad creative folders available. Create an ad creatives folder in Assets,
            upload creatives, and complete metadata first.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {folders.map((folder) => {
              const isSelected = formData.selectedFolderId === folder.id;
              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, selectedFolderId: folder.id })
                  }
                  className={`
                    text-left rounded-[var(--radius-sm)] border-2 px-4 py-4 transition-standard w-full
                    ${isSelected
                      ? 'border-accent-gold bg-accent-gold/5 shadow-[var(--shadow-sm)]'
                      : 'border-border-subtle hover:border-border-medium bg-bg-secondary'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-accent-gold bg-accent-gold/20'
                            : 'border-border-medium bg-bg-primary'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FolderOpen className="w-4 h-4 text-accent-gold flex-shrink-0" />
                        <p className="text-body font-semibold text-text-primary truncate">
                          {folder.name}
                        </p>
                      </div>
                      <p className="text-caption text-text-tertiary">
                        {getAssetTypeLabel(folder.assetType)} · {folder.assetCount} asset
                        {folder.assetCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
