"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getSectionConfig, type AudienceSectionId } from '@/lib/audience-sections';

interface AudienceFormSectionProps {
  sectionId: AudienceSectionId;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  optional?: boolean;
}

export function AudienceFormSection({
  sectionId,
  title,
  children,
  defaultOpen = true,
  optional = false,
}: AudienceFormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = getSectionConfig(sectionId);

  return (
    <section
      className="rounded-[var(--radius-md)] bg-bg-secondary shadow-[var(--shadow-card)] overflow-hidden"
      aria-labelledby={`section-${sectionId}-heading`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-bg-hover transition-standard"
        aria-expanded={isOpen}
        aria-controls={`section-${sectionId}-content`}
      >
        <h2 id={`section-${sectionId}-heading`} className="text-h4 text-text-primary font-semibold">
          {title}
        </h2>
        {optional && (
          <span className="text-caption text-text-tertiary uppercase font-medium">Optional</span>
        )}
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-text-tertiary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-tertiary flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div
          id={`section-${sectionId}-content`}
          className="px-5 pb-5 pt-0 border-t border-border-subtle"
        >
          <div className="pt-5 space-y-5">{children}</div>
          {config?.whyWeAsk && (
            <div className="mt-6 p-4 rounded-[var(--radius-sm)] bg-bg-elevated">
              <p className="text-label text-text-quaternary uppercase tracking-wide mb-2">
                Why we ask this
              </p>
              <p className="text-body-sm text-text-tertiary leading-relaxed">{config.whyWeAsk}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
