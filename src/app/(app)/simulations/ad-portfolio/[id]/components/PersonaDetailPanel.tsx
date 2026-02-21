'use client';

import { User, Briefcase, X, CheckCircle, XCircle, Meh } from 'lucide-react';
import type { PersonaReaction } from './types';

const DECISION_LABELS: Record<PersonaReaction['decision'], string> = {
  clicked_high_intent: 'Clicked (High Intent)',
  clicked_low_intent: 'Clicked (Low Intent)',
  viewed_no_click: 'Viewed but Did Not Click',
  rejected: 'Rejected',
  high_vulnerability: 'High Vulnerability',
};

interface PersonaDetailPanelProps {
  reaction: PersonaReaction | null;
}

export function PersonaDetailPanel({ reaction }: PersonaDetailPanelProps) {
  if (!reaction) {
    return (
      <div className="h-full flex items-center justify-center text-body text-text-tertiary bg-bg-elevated/30 rounded-2xl border border-border-subtle">
        Select a persona to view reaction details.
      </div>
    );
  }

  const isRejected = reaction.decision === 'rejected' || reaction.decision === 'high_vulnerability';
  const decisionBadgeClass = isRejected
    ? 'bg-accent-red text-white'
    : reaction.decision === 'clicked_high_intent' || reaction.decision === 'clicked_low_intent'
      ? 'bg-accent-green text-white'
      : 'bg-bg-elevated text-text-secondary';

  return (
    <div className="overflow-y-auto custom-scrollbar h-full">
      <div className="p-8 space-y-8">
        {/* Persona header card */}
        <div className="bg-bg-secondary rounded-2xl p-8 border border-border-subtle shadow-sm relative overflow-hidden">
          {reaction.vulnerability_level === 'high' && (
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-accent-red/10 text-accent-red text-[11px] font-bold px-3 py-1 rounded-full border border-accent-red/20">
                HIGH VULNERABILITY
              </span>
            </div>
          )}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-bg-elevated rounded-2xl flex items-center justify-center border border-border-subtle shrink-0">
              <User className="w-10 h-10 text-text-tertiary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-1">{reaction.persona_name}</h2>
              <p className="text-text-tertiary flex items-center gap-2 text-body">
                <Briefcase className="w-4 h-4 shrink-0" />
                {reaction.occupation}
              </p>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0" />
                  <span className="text-sm font-medium text-text-secondary">
                    Digital Literacy: <span className="text-text-primary">{reaction.digital_literacy}/10</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-orange shrink-0" />
                  <span className="text-sm font-medium text-text-secondary capitalize">{reaction.geography_type} Region</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-purple shrink-0" />
                  <span className="text-sm font-medium text-text-secondary capitalize">{reaction.device_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Summary + Structured Reaction grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-6">
            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-6">Decision Summary</h3>
            <div className="space-y-0">
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle/50">
                <span className="text-text-tertiary">Decision Status</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${decisionBadgeClass}`}>
                  {DECISION_LABELS[reaction.decision].toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle/50">
                <span className="text-text-tertiary">Trust Score</span>
                <span className="font-bold text-text-primary">{reaction.trust_score}/10</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle/50">
                <span className="text-text-tertiary">Relevance Score</span>
                <span className="font-bold text-text-primary">{reaction.relevance_score}/10</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle/50">
                <span className="text-text-tertiary">Confidence</span>
                <span className="font-bold text-text-primary">{(reaction.confidence_score * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-text-tertiary">Click Probability</span>
                <span className={`font-bold ${reaction.click_probability != null && reaction.click_probability < 0.2 ? 'text-accent-red' : 'text-text-primary'}`}>
                  {reaction.click_probability != null ? `${(reaction.click_probability * 100).toFixed(0)}%` : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-6">
            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-4">Structured Reaction</h3>
            <div className="mb-4 p-4 bg-bg-elevated/50 rounded-xl">
              <p className="text-[11px] font-bold text-text-tertiary uppercase mb-1">Initial Impression</p>
              <p className="text-sm font-medium text-text-primary">&quot;{reaction.initial_impression}&quot;</p>
            </div>
            {reaction.positive_triggers.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold text-text-tertiary uppercase mb-2">Positive Triggers</p>
                <ul className="space-y-2">
                  {reaction.positive_triggers.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reaction.negative_frictions.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-text-tertiary uppercase">Negative Frictions</p>
                <ul className="space-y-2">
                  {reaction.negative_frictions.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <X className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-4 mt-4 border-t border-border-subtle/50">
              <p className="text-xs text-text-tertiary italic">
                <span className="font-bold text-text-secondary">Decision Driver:</span> {reaction.decision_driver}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Drivers vs Trust Breakers */}
        <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-6">
          <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-6">Trust Drivers vs Trust Breakers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-accent-green" />
                <span className="font-bold text-sm uppercase text-text-primary">Drivers</span>
              </div>
              {reaction.trust_drivers.length > 0 ? (
                <ul className="space-y-3">
                  {reaction.trust_drivers.map((d, i) => (
                    <li key={i} className="p-3 bg-accent-green/5 rounded-xl border border-accent-green/10 text-sm text-text-secondary">
                      {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-text-tertiary border-2 border-dashed border-border-subtle rounded-xl">
                  <Meh className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-xs">None noted for this persona</p>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-accent-red" />
                <span className="font-bold text-sm uppercase text-text-primary">Breakers</span>
              </div>
              {reaction.trust_breakers.length > 0 ? (
                <ul className="space-y-3">
                  {reaction.trust_breakers.map((b, i) => (
                    <li key={i} className="p-3 bg-accent-red/5 rounded-xl border border-accent-red/10 text-sm text-text-secondary">
                      {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-text-tertiary border-2 border-dashed border-border-subtle rounded-xl">
                  <Meh className="w-10 h-10 mb-2 opacity-50" />
                  <p className="text-xs">None noted for this persona</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {reaction.counterfactual && (
          <div className="bg-bg-secondary rounded-2xl border border-border-subtle p-6">
            <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest mb-2">Counterfactual Insight</h3>
            <p className="text-body text-text-secondary">
              If {reaction.counterfactual.change}, predicted click probability increases from {(reaction.counterfactual.probability_before * 100).toFixed(0)}% to {(reaction.counterfactual.probability_after * 100).toFixed(0)}%.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
