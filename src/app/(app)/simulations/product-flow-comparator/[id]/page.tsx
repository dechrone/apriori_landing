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
import type { AbReport } from "@/types/ab-report";
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

  const data = simulation?.result as AbReport | undefined;

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

  return <AbReportView data={data} />;
}
