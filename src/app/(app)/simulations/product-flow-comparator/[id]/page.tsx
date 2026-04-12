"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { useFirebaseUser } from "@/contexts/FirebaseUserContext";
import { getSimulation } from "@/lib/firestore";
import type { SimulationDoc } from "@/lib/firestore";
import type { ComparatorData } from "@/types/comparator";
import { ComparatorResultView } from "@/components/comparator";
import { ArrowLeft } from "lucide-react";

export default function ProductFlowComparatorResultsPage() {
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

  const data = simulation?.result as ComparatorData | undefined;

  if (loading) {
    return (
      <>
        <TopBar
          title="Flow Comparison"
          breadcrumb="Loading…"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <p className="text-body text-text-tertiary">Loading simulation…</p>
        </div>
      </>
    );
  }

  if (!simulation || !data || !data.flows_compared || data.flows_compared.length < 2) {
    return (
      <>
        <TopBar
          title="Flow Comparison"
          breadcrumb="Not found"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-body text-text-secondary mb-4">
                Comparator result not found or missing per-flow data.
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

  const title = `${data.flows_compared[0].flow_name} vs ${data.flows_compared[1].flow_name}`;
  const flow0Rate = data.scorecards.flow_0?.completion_rate_pct ?? 0;
  const flow1Rate = data.scorecards.flow_1?.completion_rate_pct ?? 0;

  return (
    <>
      <TopBar
        title={simulation.name || title}
        breadcrumb={`Product Flow · Comparator · ${simulation.timestamp}`}
        onMenuClick={toggleMobileMenu}
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-[#F3E8FF] text-[#7C3AED] rounded-xl text-sm font-semibold">
              Comparator ({flow0Rate}% vs {flow1Rate}%)
            </div>
          </div>
        }
      />
      <ComparatorResultView data={data} />
    </>
  );
}
