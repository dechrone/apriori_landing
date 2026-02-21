'use client';

import { useMemo } from 'react';
import type { PersonaReaction, Decision } from './types';

const DECISION_ORDER: Decision[] = [
  'clicked_high_intent',
  'clicked_low_intent',
  'viewed_no_click',
  'rejected',
  'high_vulnerability',
];

const DECISION_LABELS: Record<Decision, string> = {
  clicked_high_intent: 'Clicked (High Intent)',
  clicked_low_intent: 'Clicked (Low Intent)',
  viewed_no_click: 'Viewed but Did Not Click',
  rejected: 'Rejected',
  high_vulnerability: 'High Vulnerability',
};

function isPositiveGroup(decision: Decision): boolean {
  return decision === 'clicked_high_intent' || decision === 'clicked_low_intent';
}

function isNegativeGroup(decision: Decision): boolean {
  return decision === 'rejected' || decision === 'high_vulnerability';
}

interface PersonaListProps {
  reactions: PersonaReaction[];
  selectedPersonaId: string | null;
  onSelectPersona: (personaId: string) => void;
}

function groupByDecision(reactions: PersonaReaction[]): Map<Decision, PersonaReaction[]> {
  const map = new Map<Decision, PersonaReaction[]>();
  for (const d of DECISION_ORDER) map.set(d, []);
  for (const r of reactions) {
    const list = map.get(r.decision);
    if (list) list.push(r);
  }
  return map;
}

export function PersonaList({ reactions, selectedPersonaId, onSelectPersona }: PersonaListProps) {
  const grouped = useMemo(() => groupByDecision(reactions), [reactions]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-6">
      {DECISION_ORDER.map((decision) => {
        const list = grouped.get(decision) ?? [];
        if (list.length === 0) return null;
        const positive = isPositiveGroup(decision);
        const negative = isNegativeGroup(decision);
        const badgeBg = positive ? 'bg-accent-green/10 text-accent-green' : negative ? 'bg-accent-red/10 text-accent-red' : 'bg-bg-elevated text-text-tertiary';
        const barColor = positive ? 'bg-accent-green' : negative ? 'bg-accent-red' : 'bg-accent-gold';
        return (
          <div key={decision}>
            <h3 className="px-3 text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-2 flex items-center justify-between">
              {DECISION_LABELS[decision]}
              <span className={`${badgeBg} px-1.5 py-0.5 rounded text-[10px]`}>{list.length}</span>
            </h3>
            <div className="space-y-1">
              {list.map((r) => {
                const isSelected = selectedPersonaId === r.persona_id;
                return (
                  <button
                    key={r.persona_id}
                    type="button"
                    onClick={() => onSelectPersona(r.persona_id)}
                    className={`
                      w-full p-3 rounded-xl text-left transition-all
                      ${isSelected ? 'bg-accent-gold/10 border border-accent-gold/20' : 'hover:bg-bg-elevated border border-transparent'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-text-primary">{r.persona_name}</span>
                      <span className={`text-xs font-bold shrink-0 ${isSelected ? 'text-accent-gold' : 'text-text-tertiary'}`}>
                        {r.trust_score}/10
                      </span>
                    </div>
                    <p className="text-xs text-text-tertiary mb-2 truncate">{r.occupation}</p>
                    <div className="h-1 w-full bg-bg-base rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full`}
                        style={{ width: `${r.trust_score * 10}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
