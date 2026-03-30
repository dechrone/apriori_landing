"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { useFirebaseUser } from "@/contexts/FirebaseUserContext";
import { getSimulation } from "@/lib/firestore";
import type { SimulationDoc } from "@/lib/firestore";
import type { SimulationData } from "@/types/simulation";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
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

  const result = simulation?.result as SimulationData | undefined;
  const isProductFlow = simulation?.type === "Product Flow";

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

  // Product Flow simulation: build FlowAnalysisData from real result and show FlowAnalysisView
  if (isProductFlow && result) {
    const completionRate = result.summary?.completion_rate_pct ?? 0;
    const totalPersonas = result.summary?.total_personas ?? 0;

    const flowData: FlowAnalysisData = {
      meta: {
        product: simulation.name || result.flow_name || "Product Flow",
        flow: result.flow_name || simulation.name || "Product Flow",
        date: simulation.timestamp || new Date().toLocaleDateString(),
        totalPersonas,
        completionRate,
      },
      screens: (result.funnel_drop_off ?? []).map((f, i) => ({
        id: f.screen_id,
        label: f.screen_id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        order: i,
      })),
      funnel: (result.funnel_drop_off ?? []).map((f) => ({
        screen: f.screen_id,
        entered: 0,
        dropped: f.drop_offs,
      })),
      rootCauses: [],
      oneBet: {
        title: result.flow_assessment?.overall_verdict ?? "",
        rationale: "",
        effort: "",
        impact: "",
        projectedCompletion: "",
        currentCompletion: completionRate,
        personas: [],
      },
      personas: [],
    };

    return (
      <>
        <TopBar
          title={simulation.name || result.flow_name || "Product Flow"}
          breadcrumb={`Product Flow · ${simulation.timestamp}`}
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
          <FlowAnalysisView data={flowData} simulationData={result} />
        </div>
      </>
    );
  }

  // Other simulation types (e.g. ad): minimal placeholder
  return (
    <>
      <TopBar
        title={simulation.name ?? "Simulation"}
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

