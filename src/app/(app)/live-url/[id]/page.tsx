"use client";

/**
 * Saved Live URL run viewer. Loads a persisted run by id and renders the same
 * LiveUrlReport the wizard shows live — minus the realtime cam (screenshots are
 * not persisted). Mirrors the design-sim detail loader (getSimulation).
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { useUser } from "@/contexts/UserContext";
import { getSimulation } from "@/lib/db";
import type { SimulationDoc } from "@/lib/db";
import { LiveUrlReport, type Insights } from "@/components/live-url/LiveUrlReport";

export default function LiveUrlRunPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId } = useUser();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const [sim, setSim] = useState<SimulationDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !id) return;
    let cancelled = false;
    getSimulation(userId, id)
      .then((s) => { if (!cancelled) setSim(s); })
      .catch(() => { if (!cancelled) setSim(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [userId, id]);

  const insights = (sim?.result ?? null) as Insights | null;

  return (
    <>
      <TopBar title="Live URL run" onMenuClick={toggleMobileMenu} />
      <div className="p-5 sm:p-8 lg:p-10 space-y-6">
        <Link href="/simulations" className="inline-flex items-center gap-1.5 text-body-sm text-text-secondary hover:text-text-primary">
          <ArrowLeft className="w-4 h-4" /> Simulations
        </Link>

        {loading ? (
          <div className="flex items-center gap-2 text-body-sm text-text-secondary">
            <Loader2 className="w-4 h-4 animate-spin text-accent-gold" /> Loading run…
          </div>
        ) : !insights ? (
          <div className="rounded-lg border border-border px-4 py-6 text-body-sm text-text-tertiary">
            This run could not be found, or it has no saved result yet.
          </div>
        ) : (
          <>
            {sim?.name && <h2 className="text-h3 text-text-primary break-all">{sim.name}</h2>}
            <LiveUrlReport insights={insights} />
          </>
        )}
      </div>
    </>
  );
}
