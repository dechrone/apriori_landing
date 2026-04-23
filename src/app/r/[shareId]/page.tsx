"use client";

/**
 * Public simulation viewer.
 *
 * Resolves /r/{shareId} → backend's unauthenticated GET /api/v1/simulations/shared/{shareId}
 * and renders the usability report with a visible "Shared report" banner. No auth.
 */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { fetchSharedSimulation } from "@/lib/backend-simulation";
import type { ServerSimulationRecord } from "@/lib/backend-simulation";
import type { SimulationData } from "@/types/simulation";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { ArrowRight, Loader2 } from "lucide-react";

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

export default function SharedSimulationPage() {
  const params = useParams();
  const shareId = typeof params?.shareId === "string" ? params.shareId : null;
  const [record, setRecord] = useState<ServerSimulationRecord<SimulationData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!shareId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchSharedSimulation<SimulationData>(shareId)
      .then((r) => {
        if (cancelled) return;
        if (!r) setNotFound(true);
        else setRecord(r);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-[#6B7280] text-[14px]">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading report…
        </div>
      </div>
    );
  }

  if (notFound || !record) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="max-w-[480px] text-center">
          <p className="text-[22px] font-semibold text-[#1A1A1A] mb-3">
            This shared report isn&apos;t available.
          </p>
          <p className="text-[14px] text-[#6B7280] mb-8 leading-[1.6]">
            The owner may have revoked the link, or it never existed. If you think
            this is a mistake, ask whoever sent you the URL to re-share it.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-colors"
            style={{ backgroundColor: "#B8860B" }}
          >
            Back to Apriori
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const result = record.result;
  const completionRate = result.summary?.completion_rate_pct ?? 0;
  const totalPersonas = result.summary?.total_personas ?? 0;

  const flowData: FlowAnalysisData = {
    meta: {
      product: record.name || result.flow_name || "Product Flow",
      flow: result.flow_name || record.name || "Product Flow",
      date: record.created_at
        ? new Date(record.created_at).toLocaleDateString()
        : new Date().toLocaleDateString(),
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
      {/* Public-share banner — makes it clear this is a shared view, and pitches Apriori. */}
      <div
        className="sticky top-0 z-40 border-b border-[#E8E4DE] bg-white/95 backdrop-blur px-4 sm:px-6 py-3"
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
          <div className="text-[12px] sm:text-[13px] text-[#6B7280]">
            <span className="font-semibold text-[#1A1A1A]">Shared report</span>
            <span className="hidden sm:inline">
              {" · "}
              {record.name || result.flow_name || "Product Flow"}
              {record.num_personas ? ` · ${record.num_personas} synthetic users` : ""}
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-white rounded-lg px-3 py-1.5 transition-colors"
            style={{ backgroundColor: "#B8860B" }}
          >
            Run your own simulation
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <div className={`${playfair.variable} ${dmSans.variable}`}>
        <FlowAnalysisView data={flowData} simulationData={result} />
      </div>
    </>
  );
}
