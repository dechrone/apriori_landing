"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { GoalsMetrics } from '@/types/audience';

interface GoalsSectionProps {
  data: GoalsMetrics;
  onChange: (data: GoalsMetrics) => void;
}

const TIME_HORIZON_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'short', label: 'Short-term wins (0–6 months)' },
  { value: 'medium', label: 'Medium-term (6–18 months)' },
  { value: 'long', label: 'Long-term bets (18+ months)' },
];

export function GoalsSection({ data, onChange }: GoalsSectionProps) {
  return (
    <AudienceFormSection sectionId="goals" title="Goals & Success Metrics" optional>
      <Input
        label="Top Business Goal #1 (ranked)"
        placeholder="e.g., Reduce churn"
        value={data.businessGoal1 ?? ''}
        onChange={(e) => onChange({ ...data, businessGoal1: e.target.value || undefined })}
      />
      <Input
        label="Top Business Goal #2"
        placeholder="e.g., Increase ARR"
        value={data.businessGoal2 ?? ''}
        onChange={(e) => onChange({ ...data, businessGoal2: e.target.value || undefined })}
      />
      <Input
        label="Top Business Goal #3"
        placeholder="e.g., Cut costs"
        value={data.businessGoal3 ?? ''}
        onChange={(e) => onChange({ ...data, businessGoal3: e.target.value || undefined })}
      />
      <Input
        label="Personal Success Metrics"
        placeholder="What they get rewarded for (e.g., NPS, retention, revenue)"
        value={data.personalSuccessMetrics ?? ''}
        onChange={(e) => onChange({ ...data, personalSuccessMetrics: e.target.value || undefined })}
      />
      <Select
        label="Time Horizon"
        value={data.timeHorizon ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            timeHorizon: (e.target.value || undefined) as GoalsMetrics['timeHorizon'],
          })
        }
        options={TIME_HORIZON_OPTIONS}
      />
    </AudienceFormSection>
  );
}
