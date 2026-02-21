'use client';

import { BarChart3, Image as ImageIcon } from 'lucide-react';
import type { AdSummary } from './types';

interface AdSelectorProps {
  ads: AdSummary[];
  selectedAdId: string;
  onSelect: (adId: string) => void;
}

export function AdSelector({ ads, selectedAdId, onSelect }: AdSelectorProps) {
  const selected = ads.find((a) => a.id === selectedAdId);

  return (
    <header className="border-b border-border-subtle bg-bg-secondary px-6 py-4 sticky top-0 z-10">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-gold/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent-gold" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-primary">Persona Insights</h1>
          </div>
          <div className="h-8 w-px bg-border-subtle" />
          <div className="flex items-center gap-4 bg-bg-elevated/50 p-1.5 rounded-xl border border-border-subtle">
            <div className="w-12 h-12 bg-bg-elevated rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6 text-text-tertiary" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider">Active Creative</p>
              <select
                value={selectedAdId}
                onChange={(e) => onSelect(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-semibold text-text-primary focus:ring-0 cursor-pointer focus:outline-none"
              >
                {ads.map((ad) => (
                  <option key={ad.id} value={ad.id}>
                    {ad.name}: {ad.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8">
          {selected && (
            <>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider mb-0.5">CTR</p>
                <p className="text-lg font-bold text-text-primary">
                  {selected.ctr}% <span className="text-xs font-normal text-accent-green">±{selected.ctrCi}%</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider mb-0.5">High Intent</p>
                <p className="text-lg font-bold text-text-primary">{selected.highIntent}/10</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider mb-0.5">Avg Trust</p>
                <p className="text-lg font-bold text-text-primary">{selected.trust}/10</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider mb-0.5">Relevance</p>
                <p className="text-lg font-bold text-text-primary">{selected.relevance}/10</p>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
