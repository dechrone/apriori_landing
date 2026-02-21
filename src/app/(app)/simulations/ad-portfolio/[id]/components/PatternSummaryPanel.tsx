'use client';

import { ChevronRight, TrendingUp, ShieldCheck, Ban, AlertTriangle } from 'lucide-react';
import type { PatternInsight } from './types';

interface PatternSummaryPanelProps {
  insights: PatternInsight[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const TYPE_LABELS: Record<PatternInsight['type'], string> = {
  click_reason: 'Click Reason',
  rejection_cause: 'Rejection Cause',
  segment_mismatch: 'Segment Mismatch',
  risk_signal: 'Risk Signal',
  literacy_mismatch: 'Literacy Mismatch',
  claim_sensitivity: 'Claim Sensitivity',
};

function getIconForType(type: PatternInsight['type']) {
  switch (type) {
    case 'click_reason':
      return <TrendingUp className="w-4 h-4 text-accent-green" />;
    case 'rejection_cause':
      return <Ban className="w-4 h-4 text-accent-red" />;
    case 'risk_signal':
      return <AlertTriangle className="w-4 h-4 text-accent-orange" />;
    case 'segment_mismatch':
    case 'literacy_mismatch':
    case 'claim_sensitivity':
    default:
      return <ShieldCheck className="w-4 h-4 text-accent-blue" />;
  }
}

function getIconBgClass(type: PatternInsight['type']): string {
  switch (type) {
    case 'click_reason':
      return 'bg-accent-green/10';
    case 'rejection_cause':
      return 'bg-accent-red/10';
    case 'risk_signal':
      return 'bg-accent-orange/10';
    default:
      return 'bg-accent-blue/10';
  }
}

export function PatternSummaryPanel({ insights, isCollapsed, onToggleCollapse }: PatternSummaryPanelProps) {
  return (
    <aside className={`flex flex-col h-full border-l border-border-subtle bg-bg-secondary/50 overflow-hidden flex-shrink-0 ${isCollapsed ? 'w-12' : 'w-96'}`}>
      {isCollapsed ? (
        <div className="flex flex-col items-center py-4">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="text-text-tertiary hover:text-text-primary transition-colors p-1"
            title="Expand panel"
          >
            <ChevronRight className="w-4 h-4 -rotate-90" />
          </button>
        </div>
      ) : (
        <>
          <div className="p-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest">Pattern Summary</h3>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                title="Collapse panel"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-6 space-y-4">
          {insights.length === 0 ? (
            <p className="text-body-sm text-text-tertiary">No patterns for current filters.</p>
          ) : (
            insights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 bg-bg-secondary rounded-xl border border-border-subtle shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-1.5 rounded-lg shrink-0 ${getIconBgClass(insight.type)}`}>
                    {getIconForType(insight.type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-text-primary">{insight.label}</h4>
                    <p className="text-[10px] text-text-tertiary font-bold uppercase">{TYPE_LABELS[insight.type]}</p>
                  </div>
                </div>
                <p className="text-xs text-text-tertiary mb-4 leading-relaxed">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-text-tertiary">
                    {insight.persona_count} personas • {(insight.confidence * 100).toFixed(0)}% conf.
                  </span>
                  {insight.statistically_significant && (
                    <span className="text-[10px] font-bold text-accent-green uppercase tracking-tight">Significant</span>
                  )}
                </div>
              </div>
            ))
          )}
          </div>
        </>
      )}
    </aside>
  );
}
