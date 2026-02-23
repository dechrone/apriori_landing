"use client";

import { useRef, useEffect } from "react";
import type { FlowPersona, JourneyStep } from "@/types/flow-analysis";

function ScoreBar({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className?: string;
}) {
  const pct = Math.min(10, Math.max(0, value)) * 10;
  const barColor =
    value < 5 ? "var(--fa-red-critical)" : value < 6 ? "var(--fa-amber)" : "var(--fa-green-light)";
  return (
    <div className={className}>
      <div className="flex justify-between text-caption text-[var(--fa-text-muted)] mb-1">
        <span>{label}</span>
        <span>{value}/10</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--fa-surface2)] overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-[600ms] ease-out"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export function PersonaCard({
  persona,
  step,
  screenLabel,
  isFiltering,
  isHighlighted,
}: {
  persona: FlowPersona;
  step: JourneyStep;
  screenLabel: string;
  isFiltering: boolean;
  isHighlighted: boolean;
}) {
  const dropped = step.decision === "drop";
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (dropped && cardRef.current) {
      cardRef.current.classList.add("animate-pulse");
      const t = setTimeout(() => {
        cardRef.current?.classList.remove("animate-pulse");
      }, 600);
      return () => clearTimeout(t);
    }
  }, [dropped]);

  const dimmed = isFiltering && !isHighlighted;

  return (
    <article
      ref={cardRef}
      className={`
        rounded-lg bg-[var(--fa-surface)] p-5 border transition-opacity
        ${dimmed ? "opacity-50" : ""}
        ${dropped
          ? "border-b-4 border-b-[var(--fa-red-critical)]"
          : "border-[var(--fa-divider)]"
        }
      `}
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <div>
          <h3 className="text-body font-semibold text-[var(--fa-text)]">
            {persona.name}
          </h3>
          <p className="text-caption text-[var(--fa-text-muted)]">
            {persona.role} · {persona.city}
          </p>
        </div>
        <span
          className={`
            shrink-0 px-2 py-0.5 rounded text-caption font-medium
            ${dropped
              ? "bg-[var(--fa-red-critical)]/20 text-[var(--fa-red-critical)]"
              : "bg-[var(--fa-green-continue)]/20 text-[var(--fa-green-light)]"
            }
          `}
        >
          {dropped ? "DROPPED" : "CONTINUED"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <ScoreBar label="Trust" value={step.trustScore} />
        <ScoreBar label="Clarity" value={step.clarityScore} />
      </div>
      <blockquote className="text-body-sm text-[var(--fa-text-body)] italic mb-3 border-l-2 border-[var(--fa-divider)] pl-3">
        "{step.gutReaction}"
      </blockquote>
      <p className="text-body-sm text-[var(--fa-text-body)] mb-3">
        {step.reasoning}
      </p>
      {step.frictionPoints && step.frictionPoints.length > 0 && (
        <ul className="list-none mb-3 space-y-1">
          {step.frictionPoints.map((fp, i) => (
            <li
              key={i}
              className="text-body-sm text-[var(--fa-red-high)] flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--fa-red-critical)] shrink-0 mt-1.5" />
              {fp}
            </li>
          ))}
        </ul>
      )}
      <p className="text-body-sm text-[var(--fa-gold)] italic">
        Missing: {step.missing}
      </p>
      {dropped && step.dropReason && (
        <div className="mt-4 -mx-5 -mb-5 px-5 py-4 bg-[var(--fa-red-critical)]/10 border-t border-[var(--fa-red-critical)]/30 rounded-b-lg">
          <p className="text-caption uppercase text-[var(--fa-red-critical)] font-medium mb-1">
            Drop reason
          </p>
          <p className="text-body-sm text-[var(--fa-text-body)]">
            {step.dropReason}
          </p>
        </div>
      )}
    </article>
  );
}
