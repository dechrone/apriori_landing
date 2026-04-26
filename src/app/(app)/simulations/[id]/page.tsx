"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { useUser } from "@/contexts/UserContext";
import { getSimulation } from "@/lib/db";
import type { SimulationDoc } from "@/lib/db";
import type { SimulationData } from "@/types/simulation";
import type { FlowAnalysisData } from "@/types/flow-analysis";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { ArrowLeft, Link2, Check } from "lucide-react";
import {
  toggleSimulationShare,
  fetchSimulationById,
} from "@/lib/backend-simulation";
import { useToast } from "@/components/ui/Toast";

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
  const { userId, profileReady } = useUser();
  const { showToast } = useToast();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [simulation, setSimulation] = useState<SimulationDoc | null>(null);
  const [loading, setLoading] = useState(true);
  // Public-share state — hydrated from the backend's ServerSimulationRecord if present.
  const [shareId, setShareId] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [shareBusy, setShareBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!userId || !profileReady || !id) {
      setLoading(!profileReady || !id);
      return;
    }
    let cancelled = false;
    getSimulation(userId, id)
      .then((doc) => {
        if (!cancelled) setSimulation(doc ?? null);
        // Try to hydrate share state from the server-persisted record. Non-blocking
        // and silent — if the server never saved this sim, users just don't see
        // the share toggle populated, which is fine.
        const sid = (doc?.result as SimulationData | undefined)?.simulation_id;
        if (sid) {
          fetchSimulationById(sid)
            .then((record) => {
              if (!cancelled && record) {
                setIsPublic(!!record.public);
                setShareId(record.public_share_id ?? null);
              }
            })
            .catch(() => {
              /* server hasn't stored this sim — toggle still works, just lazily creates on first toggle */
            });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, profileReady, id]);

  const handleToggleShare = async () => {
    const sid = (simulation?.result as SimulationData | undefined)?.simulation_id;
    if (!sid) {
      showToast(
        "error",
        "Can't share this run",
        "This simulation wasn't persisted on the server. Re-run it to share.",
      );
      return;
    }
    setShareBusy(true);
    try {
      const res = await toggleSimulationShare(sid, !isPublic);
      setIsPublic(res.public);
      setShareId(res.public_share_id);
      if (res.public && res.public_share_id) {
        const url = `${window.location.origin}/r/${res.public_share_id}`;
        await navigator.clipboard.writeText(url).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        showToast("success", "Shareable link copied", url);
      } else {
        showToast("success", "Link revoked", "Anyone with the old link can no longer view this report.");
      }
    } catch (err) {
      showToast(
        "error",
        "Couldn't update sharing",
        err instanceof Error ? err.message : "Please try again.",
      );
    } finally {
      setShareBusy(false);
    }
  };

  const shareUrl =
    isPublic && shareId && typeof window !== "undefined"
      ? `${window.location.origin}/r/${shareId}`
      : null;

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
              <button
                onClick={handleToggleShare}
                disabled={shareBusy}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-body-sm font-semibold border transition-colors ${
                  isPublic
                    ? "bg-accent-gold text-white border-accent-gold hover:bg-accent-gold-hover"
                    : "bg-white text-text-primary border-border-subtle hover:bg-[#F8F6F1]"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
                title={isPublic ? "Click to revoke the public link" : "Click to create a public link"}
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied
                  ? "Link copied"
                  : isPublic
                    ? "Shared — click to revoke"
                    : "Share report"}
              </button>
              <div className="inline-flex items-center px-4 py-2 bg-accent-green-bg text-accent-green rounded-xl text-body-sm font-semibold">
                Complete ({completionRate}% completion · {totalPersonas} personas)
              </div>
            </div>
          }
        />
        {shareUrl && (
          <div className="max-w-[1280px] mx-auto px-6 pt-3">
            <div className="flex items-center gap-2.5 bg-[#EEF2FF] border border-[#FCD34D] rounded-[10px] px-4 py-2.5 text-[13px] text-[#312E81]">
              <Link2 className="w-3.5 h-3.5 shrink-0" />
              <span className="flex-1 truncate">
                Public link:{" "}
                <a href={shareUrl} className="font-mono underline" target="_blank" rel="noreferrer">
                  {shareUrl}
                </a>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                }}
                className="text-[12px] font-semibold hover:underline shrink-0"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
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

