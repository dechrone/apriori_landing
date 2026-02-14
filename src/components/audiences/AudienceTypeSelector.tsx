"use client";

import { Card, CardContent } from '@/components/ui/Card';
import type { AudienceType } from '@/types/audience';
import { Briefcase, Users, User } from 'lucide-react';

const AUDIENCE_TYPES: {
  value: AudienceType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'b2b-decision-maker',
    label: 'B2B – Decision Maker',
    description: 'Primary buyer with budget and sign-off authority.',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    value: 'b2b-influencer',
    label: 'B2B – Influencer / Buyer Committee',
    description: 'Stakeholder who influences the decision but may not sign.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    value: 'b2c-end-user',
    label: 'B2C – End User',
    description: 'Individual consumer. (Coming soon)',
    icon: <User className="w-6 h-6" />,
  },
  {
    value: 'custom',
    label: 'Custom',
    description: 'Advanced: define your own structure.',
    icon: <Briefcase className="w-6 h-6" />,
  },
];

interface AudienceTypeSelectorProps {
  value: AudienceType;
  onChange: (type: AudienceType) => void;
}

export function AudienceTypeSelector({ value, onChange }: AudienceTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-body-sm text-text-tertiary mb-4">
        This determines which fields we show and how personas are modeled.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AUDIENCE_TYPES.map((type) => {
          const isSelected = value === type.value;
          const isDisabled = type.value === 'b2c-end-user';
          return (
            <button
              key={type.value}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(type.value)}
              className={`
                text-left rounded-lg border-2 p-4 transition-standard
                ${isSelected
                  ? 'border-accent-gold bg-bg-elevated text-text-primary'
                  : 'border-border-subtle text-text-secondary hover:border-border-medium hover:bg-bg-elevated'
                }
                ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 mt-0.5 ${isSelected ? 'text-accent-gold' : 'text-text-tertiary'}`}>
                  {type.icon}
                </span>
                <div>
                  <span className="text-body font-semibold block">{type.label}</span>
                  <span className="text-body-sm text-text-tertiary block mt-1">{type.description}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
