"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAppShell } from "@/components/app/AppShell";
import { useFirebaseUser } from "@/contexts/FirebaseUserContext";
import { getSimulation } from "@/lib/firestore";
import type { SimulationDoc } from "@/lib/firestore";
import type { ProductFlowSimulationResult, SimulationPersona, ProductFlowJourney } from "@/types/simulation-result";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flowAnalysisDummyData } from "@/data/flow-analysis-dummy";
import { sampleSimulationData } from "@/data/sample-simulation-data";
import { ArrowLeft } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-flow-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-flow-body",
  display: "swap",
});

export default function SimulationDetailsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId, profileReady } = useFirebaseUser();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [simulation, setSimulation] = useState<SimulationDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !profileReady || !id) {
      setLoading(!profileReady || !id);
      return;
    }
    let cancelled = false;
    getSimulation(userId, id)
      .then((doc) => {
        if (!cancelled) setSimulation(doc ?? null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, profileReady, id]);

  const result = simulation?.result as ProductFlowSimulationResult | undefined;
  const meta = result?.metadata;
  const isProductFlow = result?.simulation_type === "product_flow";

  if (loading) {
    return (
      <>
        <TopBar
          title="Flow Analysis"
          breadcrumb="Loading…"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <p className="text-body text-text-tertiary">Loading simulation…</p>
        </div>
      </>
    );
  }

  if (!simulation) {
    return (
      <>
        <TopBar
          title="Flow Analysis"
          breadcrumb="Not found"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-body text-text-secondary mb-4">
                Simulation not found.
              </p>
              <Link href="/simulations">
                <Button variant="secondary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to simulations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Product Flow simulation: show Flow Analysis (same structure as Ad simulation)
  if (isProductFlow) {
    const flowData = flowAnalysisDummyData;
    const completionRate = flowData.meta.completionRate ?? 0;
    const totalPersonas = flowData.meta.totalPersonas ?? 0;
    return (
      <>
        <TopBar
          title={meta?.simulation_name ?? flowData.meta.product}
          breadcrumb={`Product Flow · ${simulation.timestamp ?? flowData.meta.date}`}
          onMenuClick={toggleMobileMenu}
          actions={
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center px-4 py-2 bg-accent-green-bg text-accent-green rounded-xl text-body-sm font-semibold">
                Complete ({completionRate}% completion · {totalPersonas} personas)
              </div>
            </div>
          }
        />
        <div className={`${playfair.variable} ${dmSans.variable}`}>
          <FlowAnalysisView data={flowData} simulationData={sampleSimulationData} />
        </div>
      </>
    );
  }

  // Other simulation types (e.g. ad): minimal placeholder
  return (
    <>
      <TopBar
        title={meta?.simulation_name ?? "Simulation"}
        breadcrumb={`Simulation · ${simulation.timestamp}`}
        onMenuClick={toggleMobileMenu}
      />
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-body text-text-secondary mb-4">
              This simulation type does not have a Flow Analysis view yet.
            </p>
            <Link href="/simulations">
              <Button variant="secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to simulations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

