'use client';

import { Search } from 'lucide-react';
import type { PersonaFilters as PersonaFiltersType } from './types';

interface PersonaFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filters: PersonaFiltersType;
  onChange: (filters: PersonaFiltersType) => void;
}

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
          <label className="text-[10px] font-bold text-text-tertiary uppercase px-1 block">Income</label>
          <select
            value={filters.income_tier}
            onChange={(e) => update('income_tier', e.target.value as PersonaFiltersType['income_tier'])}
            className="w-full mt-1 text-xs bg-bg-elevated border-none rounded-lg py-1.5 px-2 text-text-primary focus:ring-2 focus:ring-accent-gold/20 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="mid">Mid</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex-1 min-w-[100px]">
          <label className="text-[10px] font-bold text-text-tertiary uppercase px-1 block">Vulnerability</label>
          <select
            value={filters.vulnerability}
            onChange={(e) => update('vulnerability', e.target.value as PersonaFiltersType['vulnerability'])}
            className="w-full mt-1 text-xs bg-bg-elevated border-none rounded-lg py-1.5 px-2 text-text-primary focus:ring-2 focus:ring-accent-gold/20 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
