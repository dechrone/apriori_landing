"use client";

import { useCallback } from "react";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { Card, CardContent } from "@/components/ui/Card";

const BAR_HEIGHT = 48;
const MAX_WIDTH_PCT = 100;

function getScreenLabel(screens: FlowAnalysisData["screens"], screenId: string) {
  return screens.find((s) => s.id === screenId)?.label ?? screenId;
}

function getFrictionForScreen(
  rootCauses: FlowAnalysisData["rootCauses"],
  screenId: string
): string | null {
  const rc = rootCauses.find((r) => r.screen === screenId);
  return rc?.title ?? null;
}

export function FunnelChart({ data }: { data: FlowAnalysisData }) {
  const { meta, funnel, screens, rootCauses } = data;
  const total = meta.totalPersonas;

  const scrollToScreen = useCallback((screenId: string) => {
    const el = document.getElementById(`screen-section-${screenId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section>
      <h2 className="text-report-section mb-4">Funnel</h2>
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-wrap items-end gap-2 sm:gap-3">
            {funnel.map((entry, i) => {
              const entered = entry.entered;
              const dropped = entry.dropped;
              const widthPct = total > 0 ? (entered / total) * MAX_WIDTH_PCT : 0;
              const dropWidthPct = total > 0 && entered > 0 ? (dropped / entered) * widthPct : 0;
              const continueWidthPct = widthPct - dropWidthPct;
              const label = getScreenLabel(screens, entry.screen);
              const friction = getFrictionForScreen(rootCauses, entry.screen);
              const isLast = i === funnel.length - 1;

              return (
                <div key={entry.screen} className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-body-sm text-text-tertiary mb-2 w-full text-center truncate">
                    {entry.screen} · {label}
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToScreen(entry.screen)}
                    className="w-full flex flex-col items-stretch gap-0 group cursor-pointer"
                  >
                    <div
                      className="flex rounded-t-lg overflow-hidden transition-opacity group-hover:opacity-90"
                      style={{ height: BAR_HEIGHT }}
                    >
                      {continueWidthPct > 0 && (
                        <div
                          className="bg-accent-green shrink-0"
                          style={{ width: `${Math.max(continueWidthPct, 8)}%` }}
                          title={`${entered - dropped} continued`}
                        />
                      )}
                      {dropWidthPct > 0 && (
                        <div
                          className="bg-accent-red shrink-0"
                          style={{ width: `${Math.max(dropWidthPct, 8)}%` }}
                          title={`${dropped} dropped`}
                        />
                      )}
                    </div>
                  </button>
                  {dropped > 0 && (
                    <div className="mt-2 w-full text-center">
                      <span className="text-body-sm font-medium text-accent-red">
                        ↓{dropped}
                      </span>
                      {friction && (
                        <p className="text-caption text-text-tertiary mt-1 line-clamp-2">
                          {friction}
                        </p>
                      )}
                    </div>
                  )}
                  {!isLast && (
                    <div
                      className="w-px flex-shrink-0 bg-border-subtle mt-1"
                      style={{ height: 16 }}
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
