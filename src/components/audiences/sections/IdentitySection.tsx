"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { IdentityContext, ReportingStructure } from '@/types/audience';

interface IdentitySectionProps {
  data: IdentityContext;
  onChange: (data: IdentityContext) => void;
}

const AUDIENCE_TYPE_OPTIONS = [
  { value: 'b2b-decision-maker', label: 'B2B – Decision Maker' },
  { value: 'b2b-influencer', label: 'B2B – Influencer / Buyer Committee' },
  { value: 'b2c-end-user', label: 'B2C – End User' },
  { value: 'custom', label: 'Custom' },
];

const REPORTING_OPTIONS: { value: ReportingStructure; label: string }[] = [
  { value: 'ic', label: 'Individual Contributor' },
  { value: 'manager', label: 'Manager' },
  { value: 'exec', label: 'Executive' },
];

export function IdentitySection({ data, onChange }: IdentitySectionProps) {
  return (
    <AudienceFormSection sectionId="identity" title="Identity & Context" optional={false}>
      <Input
        label="Audience Name"
        required
        placeholder="e.g., Series B SaaS CTOs"
        value={data.audienceName}
        onChange={(e) => onChange({ ...data, audienceName: e.target.value })}
      />
      <Select
        label="Audience Type"
        required
        value={data.audienceType}
        onChange={(e) => onChange({ ...data, audienceType: e.target.value as IdentityContext['audienceType'] })}
        options={AUDIENCE_TYPE_OPTIONS}
      />
      <Input
        label="Primary Role / Job Title(s)"
        required
        placeholder="e.g., CTO, VP Engineering"
        value={data.primaryRole}
        onChange={(e) => onChange({ ...data, primaryRole: e.target.value })}
      />
      <Input
        label="Secondary Roles (optional)"
        placeholder="e.g., Head of Product, Technical Co-founder"
        value={data.secondaryRoles ?? ''}
        onChange={(e) => onChange({ ...data, secondaryRoles: e.target.value || undefined })}
      />
      <Select
        label="Reporting Structure (optional)"
        value={data.reportingStructure ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            reportingStructure: (e.target.value || undefined) as ReportingStructure | undefined,
          })
        }
        options={[{ value: '', label: 'Select…' }, ...REPORTING_OPTIONS]}
      />
    </AudienceFormSection>
  );
}
