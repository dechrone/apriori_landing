"use client";

import type { FlowAnalysisData } from "@/types/flow-analysis";
import type { FlowScreen, FlowPersona, JourneyStep } from "@/types/flow-analysis";
import { PersonaCard } from "./PersonaCard";

function getPersonasForScreen(
  screenId: string,
  personas: FlowPersona[]
): { persona: FlowPersona; step: JourneyStep }[] {
  const result: { persona: FlowPersona; step: JourneyStep }[] = [];
  for (const p of personas) {
    const step = p.journey.find((s) => s.screen === screenId);
    if (step) result.push({ persona: p, step });
  }
  return result;
}

function getDropCountForScreen(data: FlowAnalysisData, screenId: string): number {
  const entry = data.funnel.find((f) => f.screen === screenId);
  return entry?.dropped ?? 0;
}

function getTopFrictionForScreen(
  data: FlowAnalysisData,
  screenId: string
): string | null {
  const rc = data.rootCauses.find((r) => r.screen === screenId);
  return rc?.title ?? null;
}

export function ScreenSection({
  screen,
  data,
  selectedPersonaIds,
  isFiltering,
}: {
  screen: FlowScreen;
  data: FlowAnalysisData;
  selectedPersonaIds: Set<string>;
  isFiltering: boolean;
}) {
  const personasWithSteps = getPersonasForScreen(screen.id, data.personas);
  const dropCount = getDropCountForScreen(data, screen.id);
  const topFriction = getTopFrictionForScreen(data, screen.id);

  const filtered =
    isFiltering && selectedPersonaIds.size > 0
      ? personasWithSteps.filter(({ persona }) => selectedPersonaIds.has(persona.id))
      : personasWithSteps;

  return (
    <section
      id={`screen-section-${screen.id}`}
      className="scroll-mt-32"
    >
      <div className="mb-4">
        <h2 className="text-h2 font-flow-display text-[var(--fa-text)]">
          {screen.id} · {screen.label}
        </h2>
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {data.personas.map((p) => {
            const step = p.journey.find((s) => s.screen === screen.id);
            let status: "continued" | "dropped" | "not-reached" = "not-reached";
            if (step) {
              status = step.decision === "drop" ? "dropped" : "continued";
            }
            const shortName = p.name.split(" ").length >= 2
              ? `${p.name.split(" ")[0]} ${(p.name.split(" ")[1] ?? "").charAt(0)}.`
              : p.name;
            const dimmed = isFiltering && selectedPersonaIds.size > 0 && !selectedPersonaIds.has(p.id);
            return (
              <span
                key={p.id}
                className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-medium
                  ${dimmed ? "opacity-40" : ""}
                  ${status === "continued"
                    ? "bg-[var(--fa-green-continue)]/20 text-[var(--fa-green-light)]"
                    : status === "dropped"
                      ? "bg-[var(--fa-red-critical)]/20 text-[var(--fa-red-critical)]"
                      : "bg-[var(--fa-surface2)] text-[var(--fa-text-muted)]"
                  }
                `}
                title={shortName}
              >
                <span
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold
                    ${status === "continued"
                      ? "bg-[var(--fa-green-light)]/30"
                      : status === "dropped"
                        ? "bg-[var(--fa-red-critical)]/30"
                        : "bg-[var(--fa-surface2)]"
                    }
                  `}
                >
                  {p.name.charAt(0)}
                </span>
                {shortName}
              </span>
            );
          })}
        </div>
        {(dropCount > 0 || topFriction) && (
          <p className="text-body-sm text-[var(--fa-text-muted)] mt-2">
            {dropCount > 0 && (
              <span>{dropCount} user{dropCount !== 1 ? "s" : ""} dropped here</span>
            )}
            {dropCount > 0 && topFriction && " · "}
            {topFriction && (
              <span>Top friction: {topFriction}</span>
            )}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ persona, step }) => (
          <PersonaCard
            key={`${screen.id}-${persona.id}`}
            persona={persona}
            step={step}
            screenLabel={screen.label}
            isFiltering={isFiltering}
            isHighlighted={!isFiltering || selectedPersonaIds.has(persona.id)}
          />
        ))}
      </div>
    </section>
  );
}
