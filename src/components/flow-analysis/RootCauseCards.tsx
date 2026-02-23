"use client";

import type { RootCause } from "@/types/flow-analysis";
import type { FlowScreen } from "@/types/flow-analysis";
import { Card, CardContent } from "@/components/ui/Card";

export function RootCauseCards({
  rootCauses,
  screens,
}: {
  rootCauses: RootCause[];
  screens: FlowScreen[];
}) {
  return (
    <section>
      <h2 className="text-report-section mb-4">Root causes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rootCauses.map((rc) => (
          <Card
            key={rc.id}
            className={
              rc.severity === "critical"
                ? "border-l-4 border-l-accent-red"
                : "border-l-4 border-l-accent-orange"
            }
          >
            <CardContent className="py-5">
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-body-lg font-semibold text-text-primary">
                  {rc.title}
                </h3>
                <span className="shrink-0 px-2 py-0.5 rounded-lg text-caption font-medium bg-bg-elevated text-text-tertiary">
                  {rc.screen}
                </span>
              </div>
              <p className="text-body-sm text-text-secondary mb-4">
                {rc.detail}
              </p>
              <p className="text-caption uppercase tracking-wider text-accent-amber">
                Affected: {rc.affectedPersonas.join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
