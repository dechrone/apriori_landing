"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { BudgetEconomics, BudgetFlexibility } from '@/types/audience';

interface BudgetSectionProps {
  data: BudgetEconomics;
  onChange: (data: BudgetEconomics) => void;
}

const BUDGET_FLEX_OPTIONS: { value: BudgetFlexibility; label: string }[] = [
  { value: 'fixed', label: 'Fixed' },
  { value: 'flexible', label: 'Flexible' },
  { value: 'expandable', label: 'Expandable' },
];

export function BudgetSection({ data, onChange }: BudgetSectionProps) {
  return (
    <AudienceFormSection sectionId="budget" title="Budget & Economics" optional>
      <Input
        label="Budget Range"
        placeholder="e.g., $10K–$50K annually"
        value={data.budgetRange ?? ''}
        onChange={(e) => onChange({ ...data, budgetRange: e.target.value || undefined })}
      />
      <Select
        label="Budget Flexibility"
        value={data.budgetFlexibility ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            budgetFlexibility: (e.target.value || undefined) as BudgetFlexibility | undefined,
          })
        }
        options={[{ value: '', label: 'Select…' }, ...BUDGET_FLEX_OPTIONS]}
      />
      <div className="space-y-3">
        <label className="block text-body-sm font-medium text-text-secondary">Approval Required?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="approvalRequired"
              checked={data.approvalRequired === true}
              onChange={() => onChange({ ...data, approvalRequired: true })}
              className="w-4 h-4 border-2 border-border-medium bg-bg-input text-accent-gold focus:ring-accent-gold"
            />
            <span className="text-body text-text-secondary">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="approvalRequired"
              checked={data.approvalRequired === false}
              onChange={() => onChange({ ...data, approvalRequired: false })}
              className="w-4 h-4 border-2 border-border-medium bg-bg-input text-accent-gold focus:ring-accent-gold"
            />
            <span className="text-body text-text-secondary">No</span>
          </label>
        </div>
      </div>
      <Input
        label="Willingness to Pay vs ROI Proof Needed"
        placeholder="e.g., Needs clear ROI before expanding"
        value={data.willingnessToPay ?? ''}
        onChange={(e) => onChange({ ...data, willingnessToPay: e.target.value || undefined })}
      />
    </AudienceFormSection>
  );
}
