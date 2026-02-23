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
  ProductFlowSimulationResult,
  SimulationPersona,
  ProductFlowJourney,
  FlowInsight,
} from "@/types/simulation-result";
import { ArrowLeft, MoreVertical, Users, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function SimulationDetailsPage() {
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

  const result = simulation?.result as ProductFlowSimulationResult | undefined;
  const meta = result?.metadata;
  const hasResult = result?.simulation_type === "product_flow" && meta;

  if (loading) {
    return (
      <>
        <TopBar title="Product Flow Results" breadcrumb="Loading…" onMenuClick={toggleMobileMenu} />
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <p className="text-body text-text-tertiary">Loading simulation…</p>
        </div>
      </>
    );
  }

  if (!simulation || !hasResult) {
    return (
      <>
        <TopBar title="Product Flow Results" breadcrumb="Not found" onMenuClick={toggleMobileMenu} />
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

  const completionRate = meta.completion_rate_pct ?? 0;
  const avgTime = meta.avg_time_seconds ?? 0;
  const flowInsights = result.flow_insights ?? [];
  const journeys = result.journeys ?? [];
  const personas = result.personas ?? [];

  return (
    <>
      <TopBar
        title={meta.simulation_name || simulation.name || "Product Flow Results"}
        breadcrumb={`Product Flow · ${simulation.timestamp}`}
        onMenuClick={toggleMobileMenu}
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="success">Completed</Badge>
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
                <p className="text-h3 text-text-primary">{completionRate}%</p>
                <p className="text-caption text-text-tertiary uppercase">Completion rate</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-bg-elevated text-text-secondary">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-h3 text-text-primary">{avgTime}s</p>
                <p className="text-caption text-text-tertiary uppercase">Avg. time</p>
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
                <span className="text-2xl font-bold text-text-primary">{meta.num_screens}</span>
              </div>
              <div>
                <p className="text-h3 text-text-primary">{meta.num_screens}</p>
                <p className="text-caption text-text-tertiary uppercase">Screens</p>
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

        {/* Flow insights */}
        {flowInsights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Flow insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flowInsights.map((insight) => (
                <Card key={insight.flow_id}>
                  <CardContent className="py-6">
                    <h3 className="text-body-lg font-semibold text-text-primary mb-3">
                      {insight.flow_name}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <Badge variant="default">{insight.completion_rate}% completion</Badge>
                      <span className="text-body-sm text-text-tertiary">
                        Avg. {insight.avg_time_seconds}s
                      </span>
                    </div>
                    {insight.top_drop_off_screen && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-orange-bg border-l-2 border-accent-orange">
                        <AlertCircle className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                        <div>
                          <p className="text-body-sm font-medium text-text-primary">
                            Top drop-off: {insight.top_drop_off_screen}
                          </p>
                          {insight.top_drop_off_reason && (
                            <p className="text-body-sm text-text-tertiary mt-1">
                              {insight.top_drop_off_reason}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {insight.friction_points && insight.friction_points.length > 0 && (
                      <p className="text-body-sm text-text-tertiary mt-2">
                        Friction points: {String(insight.friction_points.length)}
                      </p>
                    )}
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

        {/* Journeys */}
        {journeys.length > 0 && (
          <section className="mb-10">
            <h2 className="text-report-section mb-4">Journeys</h2>
            <div className="space-y-6">
              {journeys.map((journey, idx) => (
                <JourneyCard key={journey.persona.uuid + journey.flow_id + idx} journey={journey} />
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

function PersonaCard({ persona }: { persona: SimulationPersona }) {
  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="default">{persona.occupation}</Badge>
          <span className="text-body-sm text-text-tertiary">
            {persona.age}y · {persona.sex} · {persona.location}
          </span>
        </div>
        <p className="text-body-sm text-text-secondary">
          {persona.zone} · ₹{persona.monthly_income_inr.toLocaleString()} · {persona.primary_device}
        </p>
        <p className="text-body-sm text-text-tertiary mt-1">
          Tier: {persona.purchasing_power_tier} · Literacy: {persona.digital_literacy}
        </p>
      </CardContent>
    </Card>
  );
}

function JourneyCard({ journey }: { journey: ProductFlowJourney }) {
  const p = journey.persona;
  return (
    <Card>
      <CardContent className="py-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={journey.completed_flow ? "success" : "warning"}>
            {journey.completed_flow ? "Completed" : "Dropped off"}
          </Badge>
          <span className="text-body-sm text-text-tertiary">
            {p.occupation} · {journey.total_screens_seen} screens · {journey.total_time_seconds}s
          </span>
        </div>
        {journey.monologue && (
          <p className="text-body-sm text-text-secondary italic mb-4">"{journey.monologue}"</p>
        )}
        {journey.steps && journey.steps.length > 0 && (
          <div className="space-y-2">
            <p className="text-caption text-text-tertiary uppercase">Steps</p>
            {journey.steps.map((step) => (
              <div
                key={step.view_id + step.view_number}
                className="flex items-center gap-3 py-2 px-3 rounded-lg bg-bg-elevated"
              >
                <span className="text-body-sm font-medium text-text-primary w-24">
                  {step.view_name}
                </span>
                <Badge variant="default">{step.decision}</Badge>
                <span className="text-body-sm text-text-tertiary">
                  Trust {step.trust_score} · Clarity {step.clarity_score} · {step.time_spent_seconds}s
                </span>
                {step.reasoning && (
                  <span className="text-body-sm text-text-secondary truncate max-w-[200px]">
                    {step.reasoning}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {journey.dropped_off_at_view && (
          <p className="text-body-sm text-accent-orange mt-2">
            Dropped at: {journey.dropped_off_at_view}
            {journey.drop_off_reason && ` — ${journey.drop_off_reason}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
