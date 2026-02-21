"use client";

import type { AudienceSectionId } from '@/lib/audience-sections';
import { AUDIENCE_SECTIONS } from '@/lib/audience-sections';
import { ChevronRight } from 'lucide-react';

interface AudienceSectionNavProps {
  activeSection: AudienceSectionId;
  onSelect: (id: AudienceSectionId) => void;
  completedSections?: Set<AudienceSectionId>;
}

export function AudienceSectionNav({
  activeSection,
  onSelect,
  completedSections = new Set(),
}: AudienceSectionNavProps) {
  return (
    <nav className="space-y-1" aria-label="Audience sections">
      {AUDIENCE_SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isCompleted = completedSections.has(section.id);
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className={`
              w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[var(--radius-sm)] text-left
              text-body font-medium transition-standard
              ${isActive
                ? 'bg-accent-gold/10 text-accent-gold border-l-[3px] border-accent-gold font-semibold'
                : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {isCompleted && !isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden />
              )}
              {section.shortLabel ?? section.label}
            </span>
            <ChevronRight
              className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-accent-gold' : 'text-text-tertiary'}`}
            />
          </button>
        );
      })}
    </nav>
  );
}
