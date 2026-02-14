"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { PainPoints, Severity } from '@/types/audience';

interface PainPointsSectionProps {
  data: PainPoints;
  onChange: (data: PainPoints) => void;
}

const SEVERITY_OPTIONS: { value: Severity; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'existential', label: 'Existential' },
];

export function PainPointsSection({ data, onChange }: PainPointsSectionProps) {
  return (
    <AudienceFormSection sectionId="pain-points" title="Pain Points & Frictions" optional>
      <Textarea
        label="Top Problems"
        placeholder="e.g., Manual reporting, siloed data, slow onboarding"
        value={data.topProblems ?? ''}
        onChange={(e) => onChange({ ...data, topProblems: e.target.value || undefined })}
        rows={3}
      />
      <Select
        label="Severity"
        value={data.problemSeverity ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            problemSeverity: (e.target.value || undefined) as Severity | undefined,
          })
        }
        options={[{ value: '', label: 'Select…' }, ...SEVERITY_OPTIONS]}
      />
      <Textarea
        label="Current Workarounds"
        placeholder="What they do today to cope"
        value={data.currentWorkarounds ?? ''}
        onChange={(e) => onChange({ ...data, currentWorkarounds: e.target.value || undefined })}
        rows={2}
      />
      <Textarea
        label="What They've Tried Before (and failed)"
        placeholder="Previous solutions or vendors that didn't stick"
        value={data.triedBefore ?? ''}
        onChange={(e) => onChange({ ...data, triedBefore: e.target.value || undefined })}
        rows={2}
      />
    </AudienceFormSection>
  );
}
