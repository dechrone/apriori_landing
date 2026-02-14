"use client";

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { AudienceFormSection } from '@/components/audiences/AudienceFormSection';
import type { DecisionBehavior } from '@/types/audience';

interface DecisionBehaviorSectionProps {
  data: DecisionBehavior;
  onChange: (data: DecisionBehavior) => void;
}

const DATA_DEPENDENCY_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'gut-driven', label: 'Gut-driven' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'metrics-driven', label: 'Metrics-driven' },
];

const DECISION_SPEED_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'immediate', label: 'Immediate' },
  { value: 'considered', label: 'Considered' },
  { value: 'slow', label: 'Slow' },
];

const CHANGE_RESISTANCE_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-2 border-border-medium bg-bg-input checked:bg-accent-gold checked:border-accent-gold transition-standard cursor-pointer"
      />
      <span className="text-body text-text-secondary">{label}</span>
    </label>
  );
}

export function DecisionBehaviorSection({ data, onChange }: DecisionBehaviorSectionProps) {
  return (
    <AudienceFormSection sectionId="decision-behavior" title="Decision-Making Behavior" optional={false}>
      <div>
        <label className="block text-body-sm font-medium text-text-secondary mb-2">
          Risk Appetite <span className="text-accent-red">*</span>
        </label>
        <div className="pt-2">
          <input
            type="range"
            min={0}
            max={100}
            value={data.riskAppetite}
            onChange={(e) => onChange({ ...data, riskAppetite: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-border-medium rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-gold
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bg-primary
              [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing"
          />
          <div className="flex justify-between mt-2 text-body-sm text-text-tertiary">
            <span>Conservative</span>
            <span className="font-medium text-text-secondary">{data.riskAppetite}%</span>
            <span>Aggressive</span>
          </div>
        </div>
      </div>
      <Select
        label="Data Dependency"
        value={data.dataDependency ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            dataDependency: (e.target.value || undefined) as DecisionBehavior['dataDependency'],
          })
        }
        options={DATA_DEPENDENCY_OPTIONS}
      />
      <Select
        label="Decision Speed"
        value={data.decisionSpeed ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            decisionSpeed: (e.target.value || undefined) as DecisionBehavior['decisionSpeed'],
          })
        }
        options={DECISION_SPEED_OPTIONS}
      />
      <Input
        label="Trust Threshold"
        placeholder="e.g., Needs proof, social validation, authority"
        value={data.trustThreshold ?? ''}
        onChange={(e) => onChange({ ...data, trustThreshold: e.target.value || undefined })}
      />
      <Select
        label="Change Resistance"
        value={data.changeResistance ?? ''}
        onChange={(e) =>
          onChange({
            ...data,
            changeResistance: (e.target.value || undefined) as DecisionBehavior['changeResistance'],
          })
        }
        options={CHANGE_RESISTANCE_OPTIONS}
      />
      <div className="space-y-3 pt-2 border-t border-border-subtle">
        <p className="text-label text-text-quaternary uppercase tracking-wide">Advanced</p>
        <CheckboxRow
          label="Open to new tools"
          checked={data.openToNewTools ?? false}
          onChange={(v) => onChange({ ...data, openToNewTools: v })}
        />
        <CheckboxRow
          label="Prefers best-in-class vs all-in-one"
          checked={data.prefersBestInClass ?? false}
          onChange={(v) => onChange({ ...data, prefersBestInClass: v })}
        />
        <CheckboxRow
          label="Vendor lock-in sensitive"
          checked={data.vendorLockInSensitive ?? false}
          onChange={(v) => onChange({ ...data, vendorLockInSensitive: v })}
        />
      </div>
    </AudienceFormSection>
  );
}
