"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { useUser } from "@/contexts/UserContext";
import { getSimulation } from "@/lib/db";
import type { SimulationDoc } from "@/lib/db";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { AbReport, SynthesisReadyData, DesignCombinerReadyData } from "@/types/ab-report";
import { AbReportView } from "@/components/ab-report/AbReportView";
import { ArrowLeft } from "lucide-react";

export default function ProductFlowComparatorResultsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId, profileReady } = useUser();
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

  // Subscribe to row updates so the simul2design synthesis (which arrives
  // ~5 min AFTER the comparator finishes — long after the wizard redirected)
  // reveals automatically. The backend writes `synthesis` server-side via
  // update_simulation_synthesis on the synthesis_ready event. Realtime
  // pushes the UPDATE to this open page; the V(N+1) section in
  // AbReportView fades in once `synthesis` is non-null.
  useEffect(() => {
    if (!userId || !id) return;
    const sb = getSupabaseBrowserClient();
    const channel = sb
      .channel(`simulation-${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "simulations",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          const next = payload.new as Record<string, unknown> | null;
          if (!next) return;
          setSimulation((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              synthesis: next.synthesis ?? prev.synthesis,
              designCombiner: next.design_combiner ?? prev.designCombiner,
              revalidation: next.revalidation ?? prev.revalidation,
              result: (next.result as unknown) ?? prev.result,
              status: ((next.status as SimulationDoc["status"]) ?? prev.status),
              updatedAt: (next.updated_at as string | null) ?? prev.updatedAt,
            };
          });
        },
      )
      .subscribe();
    return () => {
      sb.removeChannel(channel);
    };
  }, [userId, id]);

  const data = simulation?.result as AbReport | undefined;
  const synthesis = simulation?.synthesis as SynthesisReadyData | undefined;
  const designCombiner = simulation?.designCombiner as DesignCombinerReadyData | undefined;

  if (loading) {
    return (
      <>
        <TopBar
          title="A/B Comparison"
          breadcrumb="Loading…"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <p className="text-body text-text-tertiary">Loading simulation…</p>
        </div>
      </>
    );
  }

  if (!simulation || !data || !data.meta || !data.annotated_screens?.screens) {
    return (
      <>
        <TopBar
          title="A/B Comparison"
          breadcrumb="Not found"
          onMenuClick={toggleMobileMenu}
        />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-body text-text-secondary mb-4">
                A/B report not found or saved in an old format.
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

  return (
    <AbReportView
      data={data}
      synthesis={synthesis ?? null}
      designCombiner={designCombiner ?? null}
    />
  );
}
