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
import type { AbReport, DesignCombinerReadyData } from "@/types/ab-report";

// The combiner runs right after comparison_ready. If it hasn't reported a
// terminal state within this budget, flip the card out of its loading spinner.
const COMBINER_STALL_BUDGET_MS = 5 * 60 * 1000;
import { AbReportView } from "@/components/ab-report/AbReportView";
import { ArrowLeft } from "lucide-react";
import { SimulationChat } from "@/components/simulation-chat";

export default function ProductFlowComparatorResultsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId, profileReady } = useUser();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [simulation, setSimulation] = useState<SimulationDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [combinerStalled, setCombinerStalled] = useState(false);

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

  // Subscribe to row updates so the design combiner (which lands shortly
  // after the comparator finishes — often after the wizard redirected) reveals
  // automatically. The backend writes `design_combiner` server-side via
  // update_simulation_design_combiner on the terminal combiner event. Realtime
  // pushes the UPDATE to this open page; the WinningDesignCard in AbReportView
  // swaps out of "Synthesising" once `design_combiner` is non-null.
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

  // Polling safety net for `design_combiner`. Realtime alone isn't enough
  // here — design_combiner_ready arrives within seconds of comparison_ready
  // while the SSE stream is still open, BEFORE the wizard's INSERT. The
  // backend's UPDATE then no-ops on a non-existent row, so no UPDATE event
  // ever fires for Realtime to relay. The backend now retries the UPDATE
  // with backoff (see update_simulation_design_combiner) which usually
  // catches up; this poll is defense-in-depth for the case where the
  // backend retry window expires before the wizard finishes saving.
  //
  // Polls every 5s while design_combiner is null and the row is fresh
  // (created within the last 10 minutes). Stops as soon as the column
  // populates or the row ages out.
  useEffect(() => {
    if (!userId || !id || !simulation) return;
    if (simulation.designCombiner) return;
    if (simulation.createdAt) {
      const ageMs = Date.now() - new Date(simulation.createdAt).getTime();
      if (ageMs > 10 * 60 * 1000) return; // older than 10 min → give up
    }
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      try {
        const fresh = await getSimulation(userId, id);
        if (cancelled || !fresh) return;
        if (fresh.designCombiner) {
          setSimulation(fresh);
        }
      } catch {
        // best-effort — try again on next tick
      }
    };
    const interval = setInterval(tick, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [userId, id, simulation?.designCombiner, simulation?.createdAt, simulation]);

  // Client-side stall guard for the combiner. Arm a one-shot timer: if no
  // terminal `design_combiner` payload has arrived within the budget (measured
  // from row creation), flip the card out of "Synthesising" so it can never
  // hang forever. No reset needed — once any payload lands, WinningDesignCard
  // reads its status directly and ignores `combinerStalled`.
  useEffect(() => {
    if (!simulation || simulation.designCombiner) return;
    const created = simulation.createdAt
      ? new Date(simulation.createdAt).getTime()
      : Date.now();
    const remaining = Math.max(0, COMBINER_STALL_BUDGET_MS - (Date.now() - created));
    const t = setTimeout(() => setCombinerStalled(true), remaining);
    return () => clearTimeout(t);
  }, [simulation?.designCombiner, simulation?.createdAt, simulation]);

  const data = simulation?.result as AbReport | undefined;
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
    <>
      <AbReportView
        data={data}
        designCombiner={designCombiner ?? null}
        combinerStalled={combinerStalled}
      />
      <SimulationChat
        simulationId={data.meta?.simulation_id ?? simulation.simulationId ?? null}
        title={simulation.name || "A/B Comparison"}
        subtitle="A/B Comparator"
        suggestions={[
          "Which variant wins and why?",
          "Where do the variants diverge most?",
          "Which lever combos drove the biggest lift?",
        ]}
      />
    </>
  );
}
