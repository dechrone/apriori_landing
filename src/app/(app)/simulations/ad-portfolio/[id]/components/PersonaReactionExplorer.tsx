'use client';

import { useState, useMemo, useCallback } from 'react';
import { AdSelector } from './AdSelector';
import { PersonaFilterBar } from './PersonaFilterBar';
import { PersonaList } from './PersonaList';
import { PersonaDetailPanel } from './PersonaDetailPanel';
import { getReactionsForAd } from './mockReactions';
import type { AdSummary, PersonaReaction, PersonaFilters } from './types';

const DEFAULT_FILTERS: PersonaFilters = {
  income_tier: 'all',
  digital_literacy_min: 0,
  digital_literacy_max: 10,
  vulnerability: 'all',
  geography: 'all',
  device_type: 'all',
};

function applyFiltersAndSearch(
  reactions: PersonaReaction[],
  filters: PersonaFilters,
  searchQuery: string,
): PersonaReaction[] {
  const q = searchQuery.trim().toLowerCase();
  return reactions.filter((r) => {
    if (filters.income_tier !== 'all' && r.income_tier !== filters.income_tier) return false;
    if (r.digital_literacy < filters.digital_literacy_min || r.digital_literacy > filters.digital_literacy_max) return false;
    if (filters.vulnerability !== 'all' && r.vulnerability_level !== filters.vulnerability) return false;
    if (filters.geography !== 'all' && r.geography_type !== filters.geography) return false;
    if (filters.device_type !== 'all' && r.device_type !== filters.device_type) return false;
    if (q && !r.persona_name.toLowerCase().includes(q) && !r.occupation.toLowerCase().includes(q)) return false;
    return true;
  });
}

interface PersonaReactionExplorerProps {
  ads: AdSummary[];
}

export function PersonaReactionExplorer({ ads }: PersonaReactionExplorerProps) {
  const [selectedAdId, setSelectedAdId] = useState(ads[0]?.id ?? '');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<PersonaFilters>(DEFAULT_FILTERS);

  const allReactionsForAd = useMemo(() => getReactionsForAd(selectedAdId), [selectedAdId]);
  const filteredReactions = useMemo(
    () => applyFiltersAndSearch(allReactionsForAd, filters, searchQuery),
    [allReactionsForAd, filters, searchQuery],
  );
  const selectedReaction = useMemo(
    () => (selectedPersonaId ? filteredReactions.find((r) => r.persona_id === selectedPersonaId) ?? null : null),
    [filteredReactions, selectedPersonaId],
  );

  const handleSelectAd = useCallback((adId: string) => {
    setSelectedAdId(adId);
    const nextReactions = getReactionsForAd(adId);
    const stillPresent = selectedPersonaId && nextReactions.some((r) => r.persona_id === selectedPersonaId);
    if (!stillPresent) setSelectedPersonaId(null);
  }, [selectedPersonaId]);

  return (
    <div className="flex flex-col h-full min-h-[640px] bg-bg-primary">
      <AdSelector ads={ads} selectedAdId={selectedAdId} onSelect={handleSelectAd} />

      <main className="flex-1 flex overflow-hidden min-h-0">
        <aside className="w-96 flex-shrink-0 border-r border-border-subtle flex flex-col bg-bg-secondary overflow-hidden">
          <PersonaFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onChange={setFilters}
          />
          <PersonaList
            reactions={filteredReactions}
            selectedPersonaId={selectedPersonaId}
            onSelectPersona={setSelectedPersonaId}
          />
        </aside>

        <section className="flex-1 min-w-0 bg-bg-primary overflow-hidden">
          <PersonaDetailPanel reaction={selectedReaction} />
        </section>
      </main>
    </div>
  );
}
