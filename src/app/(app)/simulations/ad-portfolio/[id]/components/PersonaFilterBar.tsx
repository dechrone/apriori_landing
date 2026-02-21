'use client';

import { Search } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import type { PersonaFilters as PersonaFiltersType } from './types';

interface PersonaFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: PersonaFiltersType;
  onChange: (filters: PersonaFiltersType) => void;
}

const incomeOptions = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'mid', label: 'Mid' },
  { value: 'low', label: 'Low' },
];

const vulnerabilityOptions = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
];

export function PersonaFilterBar({ searchQuery, onSearchChange, filters, onChange }: PersonaFilterBarProps) {
  const update = (key: keyof PersonaFiltersType, value: string | number) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="p-4 border-b border-border-subtle">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search personas..."
          className="w-full pl-9 pr-4 py-2 bg-bg-elevated border-none text-sm text-text-primary rounded-xl focus:ring-2 focus:ring-accent-gold/20 focus:outline-none placeholder:text-text-tertiary"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex-1 min-w-[100px]">
          <label className="text-[10px] font-bold text-text-tertiary uppercase px-1 block mb-1">Income</label>
          <Dropdown
            value={filters.income_tier}
            onChange={(value) => update('income_tier', value as PersonaFiltersType['income_tier'])}
            options={incomeOptions}
            size="sm"
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="text-[10px] font-bold text-text-tertiary uppercase px-1 block mb-1">Vulnerability</label>
          <Dropdown
            value={filters.vulnerability}
            onChange={(value) => update('vulnerability', value as PersonaFiltersType['vulnerability'])}
            options={vulnerabilityOptions}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
