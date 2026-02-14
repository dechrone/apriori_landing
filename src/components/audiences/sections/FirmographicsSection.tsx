"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { Firmographics } from '@/types/audience';

interface FirmographicsSectionProps {
  data: Firmographics;
  onChange: (data: Firmographics) => void;
}

const COMPANY_STAGE_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'series-c', label: 'Series C' },
  { value: 'growth', label: 'Growth' },
  { value: 'enterprise', label: 'Enterprise' },
];

const TEAM_MATURITY_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'early', label: 'Early' },
  { value: 'scaling', label: 'Scaling' },
  { value: 'mature', label: 'Mature' },
];

const BUYING_MOTION_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'founder-led', label: 'Founder-led' },
  { value: 'committee-led', label: 'Committee-led' },
];

const PROCUREMENT_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export function FirmographicsSection({ data, onChange }: FirmographicsSectionProps) {
  return (
    <AudienceFormSection sectionId="firmographics" title="Firmographics" optional>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Company Size (Employees) – Min"
          type="number"
          placeholder="e.g., 10"
          value={data.companySizeMin ?? ''}
          onChange={(e) =>
            onChange({
              ...data,
              companySizeMin: e.target.value ? parseInt(e.target.value, 10) : undefined,
            })
          }
        />
        <Input
          label="Company Size (Employees) – Max"
          type="number"
          placeholder="e.g., 500"
          value={data.companySizeMax ?? ''}
          onChange={(e) =>
            onChange({
              ...data,
              companySizeMax: e.target.value ? parseInt(e.target.value, 10) : undefined,
            })
          }
        />
      </div>
      <Input
        label="Revenue Range"
        placeholder="e.g., $1M–$10M ARR"
        value={data.revenueRange ?? ''}
        onChange={(e) => onChange({ ...data, revenueRange: e.target.value || undefined })}
      />
      <Select
        label="Company Stage"
        value={data.companyStage ?? ''}
        onChange={(e) => onChange({ ...data, companyStage: (e.target.value || undefined) as Firmographics['companyStage'] })}
        options={COMPANY_STAGE_OPTIONS}
      />
      <Input
        label="Primary Industry"
        placeholder="e.g., SaaS, Fintech"
        value={data.industryPrimary ?? ''}
        onChange={(e) => onChange({ ...data, industryPrimary: e.target.value || undefined })}
      />
      <Input
        label="Secondary Industry (optional)"
        placeholder="e.g., Healthcare, Retail"
        value={data.industrySecondary ?? ''}
        onChange={(e) => onChange({ ...data, industrySecondary: e.target.value || undefined })}
      />
      <Input
        label="Geography (HQ)"
        placeholder="e.g., US, EMEA"
        value={data.geographyHQ ?? ''}
        onChange={(e) => onChange({ ...data, geographyHQ: e.target.value || undefined })}
      />
      <Input
        label="Operating Markets"
        placeholder="e.g., North America, Europe"
        value={data.geographyMarkets ?? ''}
        onChange={(e) => onChange({ ...data, geographyMarkets: e.target.value || undefined })}
      />
      <Select
        label="Team Maturity"
        value={data.teamMaturity ?? ''}
        onChange={(e) => onChange({ ...data, teamMaturity: (e.target.value || undefined) as Firmographics['teamMaturity'] })}
        options={TEAM_MATURITY_OPTIONS}
      />
      <Select
        label="Buying Motion (advanced)"
        value={data.buyingMotion ?? ''}
        onChange={(e) => onChange({ ...data, buyingMotion: (e.target.value || undefined) as Firmographics['buyingMotion'] })}
        options={BUYING_MOTION_OPTIONS}
      />
      <Select
        label="Procurement Complexity"
        value={data.procurementComplexity ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            procurementComplexity: (e.target.value || undefined) as Firmographics['procurementComplexity'],
          })
        }
        options={PROCUREMENT_OPTIONS}
      />
    </AudienceFormSection>
  );
}
