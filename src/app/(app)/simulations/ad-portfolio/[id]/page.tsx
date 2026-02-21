"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TopBar } from "@/components/app/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { useFirebaseUser } from "@/contexts/FirebaseUserContext";
import { getSimulation } from "@/lib/firestore";
import type { SimulationDoc } from "@/lib/firestore";
import type {
  AdSimulationResult,
  SimulationPersona,
  AdReaction,
  AdPerformanceEntry,
} from "@/types/simulation-result";
import {
  ArrowLeft,
  MoreVertical,
  Users,
  BarChart3,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function AdPortfolioResultsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { clerkId, profileReady } = useFirebaseUser();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const [simulation, setSimulation] = useState<SimulationDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clerkId || !profileReady || !id) {
      setLoading(!profileReady || !id);
      return;
    }
    let cancelled = false;
    getSimulation(clerkId, id)
      .then((doc) => {
        if (!cancelled) setSimulation(doc ?? null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [clerkId, profileReady, id]);

  const result = simulation?.result as AdSimulationResult | undefined;
  const meta = result?.metadata;
  const hasResult = result?.simulation_type === "ad" && meta;

  if (loading) {
    return (
      <>
        <TopBar title="Ad Portfolio Results" breadcrumb="Loading…" onMenuClick={toggleMobileMenu} />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <p className="text-body text-text-tertiary">Loading simulation…</p>
        </div>
      </>
    );
  }

  if (!simulation || !hasResult) {
    return (
      <>
        <TopBar title="Ad Portfolio Results" breadcrumb="Not found" onMenuClick={toggleMobileMenu} />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-body text-text-secondary mb-4">Simulation not found or no result data.</p>
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

  const validation = result.validation_summary ?? { total: 0, valid: 0, flagged: 0, flagged_percentage: 0 };
  const performance = result.performance ?? {};
  const reactions = result.reactions ?? [];
  const personas = result.personas ?? [];
  const heatmap = result.visual_heatmap;

  return (
    <>
      <TopBar
        title={meta.simulation_name || simulation.name || "Ad Portfolio Results"}
        breadcrumb={`Ad Portfolio · ${simulation.timestamp}`}
        onMenuClick={toggleMobileMenu}
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-accent-green-bg text-accent-green rounded-lg text-body-sm font-semibold">
              Complete ({validation.valid}/{validation.total} valid reactions)
            </div>
            <Button variant="ghost">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        }
      />

      <div className="max-w-[1280px] mx-auto pb-24 px-6">
        {/* Overview metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent-green-bg text-accent-green">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-h3 text-text-primary">
                  {validation.valid}/{validation.total}
                </p>
                <p className="text-caption text-text-tertiary uppercase">Valid reactions</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-bg-elevated text-text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-h3 text-text-primary">{meta.num_personas}</p>
                <p className="text-caption text-text-tertiary uppercase">Personas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-bg-elevated text-text-secondary">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-h3 text-text-primary">{meta.num_ads}</p>
                <p className="text-caption text-text-tertiary uppercase">Ads tested</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-bg-elevated text-text-secondary">
                <span className="text-2xl font-bold text-text-primary">{validation.flagged}%</span>
              </div>
              <div>
                <p className="text-h3 text-text-primary">{validation.flagged_percentage}%</p>
                <p className="text-caption text-text-tertiary uppercase">Flagged</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target & context */}
        <section className="mb-10">
          <h2 className="text-report-section mb-4">Target & context</h2>
          <Card>
            <CardContent className="py-6">
              <p className="text-body text-text-secondary">
                <span className="font-semibold text-text-primary">Target:</span> {meta.target_group}
              </p>
              {meta.optimize_metric && (
                <p className="text-body-sm text-text-tertiary mt-2">
                  Optimize metric: {meta.optimize_metric}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Performance by ad */}
        {Object.keys(performance).length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Creative performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(performance).map(([adId, entry]) => (
                <PerformanceCard key={adId} adId={adId} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {/* Visual heatmap */}
        {heatmap && heatmap.matrix?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Visual heatmap</h2>
            <Card>
              <CardContent className="py-6 overflow-x-auto">
                <table className="w-full border-collapse text-body-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-text-tertiary font-medium" />
                      {heatmap.cols.map((col) => (
                        <th key={col} className="text-center p-2 text-text-tertiary font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmap.rows.map((row, i) => (
                      <tr key={row + i}>
                        <td className="p-2 text-text-secondary font-medium">{row}</td>
                        {heatmap.matrix[i]?.map((cell, j) => (
                          <td key={j} className="text-center p-2 text-2xl">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Wasted spend alerts */}
        {result.wasted_spend_alerts && result.wasted_spend_alerts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Wasted spend alerts</h2>
            <div className="space-y-3">
              {result.wasted_spend_alerts.map((alert: unknown, idx: number) => (
                <Card key={idx} className="border-l-4 border-l-accent-orange">
                  <CardContent className="py-4">
                    <p className="text-body text-text-secondary">{JSON.stringify(alert)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Personas */}
        {personas.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Personas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personas.map((p) => (
                <PersonaCard key={p.uuid} persona={p} />
              ))}
            </div>
          </section>
        )}

        {/* Reactions */}
        {reactions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Reactions</h2>
            <div className="space-y-4">
              {reactions.map((r, idx) => (
                <ReactionCard key={r.persona.uuid + r.ad_id + idx} reaction={r} />
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-start">
          <Link href="/simulations">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to simulations
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

function PerformanceCard({ adId, entry }: { adId: string; entry: AdPerformanceEntry }) {
  return (
    <Card>
      <CardContent className="py-6">
        <h3 className="text-body-lg font-semibold text-text-primary mb-3">{entry.ad_id}</h3>
        <div className="grid grid-cols-2 gap-3 text-body-sm">
          <div>
            <span className="text-text-tertiary">Impressions</span>
            <p className="font-semibold text-text-primary">{entry.total_impressions}</p>
          </div>
          <div>
            <span className="text-text-tertiary">Clicks</span>
            <p className="font-semibold text-text-primary">{entry.clicks}</p>
          </div>
          <div>
            <span className="text-text-tertiary">Click rate</span>
            <p className="font-semibold text-text-primary">{entry.click_rate}%</p>
          </div>
          <div>
            <span className="text-text-tertiary">High-intent leads</span>
            <p className="font-semibold text-text-primary">{entry.high_intent_leads}</p>
          </div>
          <div>
            <span className="text-text-tertiary">Conversion rate</span>
            <p className="font-semibold text-text-primary">{entry.conversion_rate}%</p>
          </div>
          <div>
            <span className="text-text-tertiary">Unique reach</span>
            <p className="font-semibold text-text-primary">{entry.unique_reach}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PersonaCard({ persona }: { persona: SimulationPersona }) {
  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{persona.occupation}</Badge>
          <span className="text-body-sm text-text-tertiary">
            {persona.age}y · {persona.sex} · {persona.location}
          </span>
        </div>
        <p className="text-body-sm text-text-secondary">
          {persona.zone} · ₹{persona.monthly_income_inr.toLocaleString()} · {persona.primary_device}
        </p>
        <p className="text-body-sm text-text-tertiary mt-1">
          Tier: {persona.purchasing_power_tier} · Vulnerability: {persona.scam_vulnerability}
        </p>
      </CardContent>
    </Card>
  );
}

function ReactionCard({ reaction }: { reaction: AdReaction }) {
  const p = reaction.persona;
  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary">{reaction.ad_id}</Badge>
          <Badge variant={reaction.action === "CLICK" ? "success" : "default"}>{reaction.action}</Badge>
          <span className="text-body-sm text-text-tertiary">
            Trust {reaction.trust_score} · Relevance {reaction.relevance_score} · {p.occupation}
          </span>
        </div>
        {reaction.internal_monologue && (
          <p className="text-body-sm text-text-secondary italic flex items-start gap-2">
            <MessageSquare className="w-4 h-4 shrink-0 mt-0.5 text-text-tertiary" />
            "{reaction.internal_monologue}"
          </p>
        )}
        {reaction.reasoning && (
          <p className="text-body-sm text-text-tertiary mt-2">Reasoning: {reaction.reasoning}</p>
        )}
        {reaction.emotional_response && (
          <p className="text-body-sm text-text-tertiary mt-1">
            Emotional: {reaction.emotional_response}
            {reaction.intent_level && ` · Intent: ${reaction.intent_level}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
