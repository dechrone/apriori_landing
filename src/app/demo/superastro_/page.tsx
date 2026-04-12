"use client";

import { SimulationOverview } from "@/components/SimulationOverview";
import { superastroOverviewData } from "@/data/superastro-overview-data";
import type { SimulationData } from "@/types/simulation";

export default function SuperAstroDemoPage() {
  return (
    <SimulationOverview
      simulationData={superastroOverviewData as unknown as SimulationData}
    />
  );
}
