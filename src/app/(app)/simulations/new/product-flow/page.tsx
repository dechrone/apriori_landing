"use client";

import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';
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
import { triggerProductFlowSimulation } from '@/lib/backend-simulation';
import { getAudiences, getAssetFolders, saveSimulation } from '@/lib/firestore';
import type { AudienceDoc } from '@/lib/firestore';
import type { ProductFlowSimulationResponse } from '@/types/simulation-result';

type Step = 1 | 2 | 3;

export default function ProductFlowSimulationPage() {
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

  const productFlowReadyFolders = folders.filter(
    (f) => f.assetType === 'product-flow' && f.status === 'ready'
  );

  const [formData, setFormData] = useState({
    name: '',
    audience: '',
    personaDepth: 'medium' as 'low' | 'medium' | 'high',
    optimizeMetric: 'checkout-conversion',
    selectedFolderIds: [] as string[],
  });

  const handleNext = async () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
      return;
    }
    if (!clerkId) {
      showToast('error', 'Not signed in', 'Please sign in to run a simulation.');
      return;
    }
    setRunning(true);
    try {
      const res = await triggerProductFlowSimulation(clerkId, {
        name: formData.name,
        audience: formData.audience,
        personaDepth: formData.personaDepth,
        optimizeMetric: formData.optimizeMetric,
        selectedFolderIds: formData.selectedFolderIds,
      });
      if (!res.ok) {
        const text = await res.text();
        showToast('error', 'Backend error', text || `Request failed (${res.status}).`);
        return;
      }
      const data = (await res.json()) as ProductFlowSimulationResponse;
      const result = data?.result;
      const meta = result?.metadata;
      const metric =
        meta != null
          ? `${meta.completion_rate_pct ?? 0}% completion · ${meta.avg_time_seconds ?? 0}s avg`
          : 'Product flow run';
      const docId = await saveSimulation(clerkId, {
        type: 'Product Flow',
        status: 'completed',
        name: meta?.simulation_name ?? (formData.name || 'Product Flow Run'),
        metric,
        timestamp: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
        simulationId: data?.simulation_id,
        result: result ?? data,
      });
      showToast('success', 'Simulation complete', 'Redirecting to results.');
      router.push(`/simulations/${docId}`);
    } catch (err) {
      showToast('error', 'Failed to run simulation', err instanceof Error ? err.message : 'Check backend at localhost:8080.');
    } finally {
      setRunning(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      // Go back to where user came from (dashboard or simulations list)
      router.back();
    }
  };

  return (
    <>
      <TopBar 
        title="New Product Flow Simulation"
        breadcrumb={`Step ${currentStep} of 3: ${getStepTitle(currentStep)}`}
        onMenuClick={toggleMobileMenu}
      />

      <div className="max-w-[960px] mx-auto pt-16 pb-24 px-4">
        {currentStep === 1 && (
          <SetupStep formData={formData} setFormData={setFormData} audiences={audiences} />
        )}
        {currentStep === 2 && (
          <AssetSelectionStep formData={formData} setFormData={setFormData} folders={productFlowReadyFolders} />
        )}
        {currentStep === 3 && (
          <ParametersStep formData={formData} setFormData={setFormData} />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-14 gap-6">
          <Button variant="ghost" size="lg" onClick={handleBack} className="min-h-[48px] px-8">
            <ArrowLeft className="w-5 h-5" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button size="lg" onClick={handleNext} className="min-h-[48px] px-8" disabled={running}>
            {running ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {currentStep === 3 ? 'Run Simulation' : 'Next Step'}
            {!running && <ArrowRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </>
  );
}

function getStepTitle(step: Step): string {
  switch (step) {
    case 1: return 'Setup';
    case 2: return 'Select assets';
    case 3: return 'Parameters';
    default: return '';
  }
}

type ProductFlowFormData = {
  name: string;
  audience: string;
  personaDepth: 'low' | 'medium' | 'high';
  optimizeMetric: string;
  selectedFolderIds: string[];
};

interface SetupStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
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
          placeholder="e.g., Onboarding Flow Optimization"
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
            A target group (audience) is required to run this simulation. If you haven&apos;t created one yet,{' '}
            <Link
              href="/audiences/new"
              className="text-accent-gold hover:text-accent-gold-hover font-medium underline underline-offset-2"
            >
              create a target group
            </Link>
            {' '}in Audiences first, then come back and select it here.
          </p>
        </div>
      </div>
    </div>
  );
}

interface AssetSelectionStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
  folders: AssetFolder[];
}

function AssetSelectionStep({ formData, setFormData, folders }: AssetSelectionStepProps) {
  const handleToggle = (id: string) => {
    const exists = formData.selectedFolderIds.includes(id);
    setFormData({
      ...formData,
      selectedFolderIds: exists
        ? formData.selectedFolderIds.filter((folderId) => folderId !== id)
        : [...formData.selectedFolderIds, id],
    });
  };

  return (
    <Card>
      <CardContent className="py-8">
        <div className="mb-6">
          <h2 className="text-h3 text-text-primary mb-1">Select asset folders</h2>
          <p className="text-body-sm text-text-tertiary">
            Choose which completed product flow folders to include in this simulation. Only folders
            marked as ready with product flow assets are shown here.
          </p>
        </div>

        {folders.length === 0 ? (
          <p className="text-body text-text-secondary">
            No completed product flow folders available yet. Create folders in the Assets section,
            upload product flow screens, and mark them as ready first.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {folders.map((folder) => {
              const isSelected = formData.selectedFolderIds.includes(folder.id);
              return (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => handleToggle(folder.id)}
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
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-accent-gold" />}
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
                        {getAssetTypeLabel(folder.assetType)} · {folder.assetCount} asset{folder.assetCount !== 1 ? 's' : ''}
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

interface ParametersStepProps {
  formData: ProductFlowFormData;
  setFormData: Dispatch<SetStateAction<ProductFlowFormData>>;
}

function ParametersStep({ formData, setFormData }: ParametersStepProps) {
  return (
    <div className="space-y-12">
      <div>
        <label className="block text-body font-medium text-text-secondary mb-4">
          Persona Variation Depth
        </label>
        <div className="flex gap-4">
          {['low', 'medium', 'high'].map((depth) => (
            <button
              key={depth}
              type="button"
              onClick={() => setFormData({ ...formData, personaDepth: depth as 'low' | 'medium' | 'high' })}
              className={`
                flex-1 px-6 py-5 rounded-[var(--radius-sm)] border-2 transition-standard capitalize text-body
                ${formData.personaDepth === depth 
                  ? 'border-accent-gold bg-accent-gold/5 text-text-primary shadow-[var(--shadow-sm)]' 
                  : 'border-border-subtle text-text-secondary hover:border-border-medium hover:bg-bg-hover'
                }
              `}
            >
              {depth}
            </button>
          ))}
        </div>
        <p className="mt-3 text-body text-text-tertiary">
          More personas = more comprehensive analysis
        </p>
      </div>

      <div>
        <Select
          label="Primary metric to optimize for"
          required
          value={formData.optimizeMetric}
          onChange={(e) => setFormData({ ...formData, optimizeMetric: e.target.value })}
          options={[
            { value: 'signup-completion', label: 'Signup completion rate' },
            { value: 'activation', label: 'Onboarding activation rate' },
            { value: 'checkout-conversion', label: 'Checkout conversion rate' },
            { value: 'retention-7d', label: '7-day retention' },
            { value: 'retention-30d', label: '30-day retention' },
          ]}
        />
        <p className="mt-3 text-body text-text-tertiary">
          This tells the simulator which outcome to optimize its recommendations for.
        </p>
      </div>
    </div>
  );
}
