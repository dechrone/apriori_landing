"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAppShell } from '@/components/app/AppShell';
import { ArrowLeft, ArrowRight, CheckCircle2, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AssetFolder } from '@/types/asset';
import { getAssetTypeLabel } from '@/types/asset';

type Step = 1 | 2;

const MOCK_FOLDERS: AssetFolder[] = [
  {
    id: '1',
    name: 'Onboarding Flow',
    assetType: 'product-flow',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assetCount: 5,
    usedInSimulations: 1,
    status: 'ready',
  },
  {
    id: '4',
    name: 'Q1 Ad Creatives',
    assetType: 'ad-creative',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assetCount: 8,
    usedInSimulations: 2,
    status: 'ready',
  },
  {
    id: '5',
    name: 'Summer Campaign Creatives',
    assetType: 'ad-creative',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assetCount: 12,
    usedInSimulations: 0,
    status: 'ready',
  },
  {
    id: '6',
    name: 'Draft Ad Set',
    assetType: 'ad-creative',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assetCount: 4,
    usedInSimulations: 0,
    status: 'missing-metadata',
  },
];

const READY_AD_CREATIVE_FOLDERS = MOCK_FOLDERS.filter(
  (folder) => folder.assetType === 'ad-creative' && folder.status === 'ready'
);

export default function AdPortfolioSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    audience: '',
    selectedFolderId: '',
  });

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(2);
    } else {
      router.push('/simulations/ad-portfolio/1'); // Mock ID for ad portfolio results
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
          <SetupStep formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 2 && (
          <FolderSelectionStep formData={formData} setFormData={setFormData} />
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
            disabled={!canProceed}
          >
            {currentStep === 2 ? 'Run Simulation' : 'Next Step'}
            <ArrowRight className="w-5 h-5" />
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
}

function SetupStep({ formData, setFormData }: SetupStepProps) {
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
          options={[
            { value: '', label: 'Select an audience' },
            { value: 'us-smb-founders', label: 'US SMB Founders' },
            { value: 'enterprise-buyers', label: 'Enterprise IT Buyers' },
            { value: 'tier1-metro', label: 'Tier 1 Metro · ₹50K–1L' },
          ]}
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
}

function FolderSelectionStep({ formData, setFormData }: FolderSelectionStepProps) {
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

        {READY_AD_CREATIVE_FOLDERS.length === 0 ? (
          <p className="text-body text-text-secondary">
            No completed ad creative folders available. Create an ad creatives folder in Assets,
            upload creatives, and complete metadata first.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {READY_AD_CREATIVE_FOLDERS.map((folder) => {
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
