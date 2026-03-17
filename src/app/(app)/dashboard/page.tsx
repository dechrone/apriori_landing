"use client";

import { TopBar } from '@/components/app/TopBar';
import { Beaker, Target, GitCompare, Users, Package, ChevronRight, Check, Loader2, PartyPopper } from 'lucide-react';
import { useAppShell } from '@/components/app/AppShell';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import {
  getSimulations,
  getAssetFolders,
  getAudiences,
  type SimulationDoc,
} from '@/lib/firestore';

/* ── Helpers ──────────────────────────────────────────────────────────── */

function extractCreatedAt(sim: SimulationDoc): Date | null {
  const ca = sim.createdAt as { toDate?: () => Date; seconds?: number } | null;
  if (!ca) return null;
  if (typeof ca.toDate === 'function') return ca.toDate();
  if (typeof ca.seconds === 'number') return new Date(ca.seconds * 1000);
  return null;
}

function relativeTime(date: Date | null): string {
  if (!date) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
}

function getSimulationHref(sim: SimulationDoc) {
  if (sim.type === 'Ad Portfolio') return `/simulations/ad-portfolio/${sim.id}`;
  if (sim.type === 'Product Flow Comparator') return `/simulations/product-flow-comparator/${sim.id}`;
  return `/simulations/${sim.id}`;
}

/* ── Onboarding step definition ───────────────────────────────────────── */

interface OnboardingStep {
  key: string;
  label: string;
  doneLabel: string;
  href?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    key: 'workspace',
    label: 'Create your workspace',
    doneLabel: 'Workspace created',
  },
  {
    key: 'assets',
    label: 'Upload your first assets',
    doneLabel: 'Assets uploaded — nice!',
    href: '/assets',
  },
  {
    key: 'audience',
    label: 'Define your target audience',
    doneLabel: 'Audience defined — great!',
    href: '/audiences',
  },
  {
    key: 'simulation',
    label: 'Run your first simulation',
    doneLabel: 'Simulation launched!',
    href: '/simulations/new',
  },
  {
    key: 'review',
    label: 'Review simulation results',
    doneLabel: "Results reviewed — you're all set!",
  },
];

/* ── Main page component ──────────────────────────────────────────────── */

export default function DashboardPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId, profileReady } = useFirebaseUser();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Recent simulations state
  const [simulations, setSimulations] = useState<SimulationDoc[]>([]);
  const [simsLoading, setSimsLoading] = useState(true);

  // Onboarding checklist state
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    workspace: true,
    assets: false,
    audience: false,
    simulation: false,
    review: false,
  });
  const [onboardingLoading, setOnboardingLoading] = useState(true);

  const allDone = Object.values(completedSteps).every(Boolean);

  // A user is "new" until they've run at least one simulation
  const isNewUser = !simsLoading && simulations.length === 0;
  // Show onboarding only for new users (no simulations)
  const showOnboarding = isNewUser && !simsLoading;

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!userId || !profileReady) return;

    try {
      const [sims, folders, audiences] = await Promise.all([
        getSimulations(userId),
        getAssetFolders(userId),
        getAudiences(userId),
      ]);

      // Recent simulations — take top 4
      setSimulations(sims.slice(0, 4));
      setSimsLoading(false);

      // Onboarding progress
      const hasAssets = folders.length > 0;
      const hasAudience = audiences.length > 0;
      const hasSimulation = sims.length > 0;
      const hasCompletedSim = sims.some((s) => s.status === 'completed');

      setCompletedSteps({
        workspace: true,
        assets: hasAssets,
        audience: hasAudience,
        simulation: hasSimulation,
        review: hasCompletedSim,
      });
      setOnboardingLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setSimsLoading(false);
      setOnboardingLoading(false);
    }
  }, [userId, profileReady]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Find next suggested step (first incomplete)
  const nextStepIndex = ONBOARDING_STEPS.findIndex((s) => !completedSteps[s.key]);

  return (
    <>
      <TopBar title="Dashboard" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1600px] mx-auto space-y-10">

          {/* ─── Getting Started (top for new users, hidden once they have sims) ─── */}
          {showOnboarding && (
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1A1A1A]">Getting started</h2>
              </div>

              {onboardingLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#9CA3AF]" />
                </div>
              ) : allDone ? (
                <div
                  className="bg-white rounded-xl p-8 text-center"
                  style={{ border: '1px solid #E8E4DE' }}
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PartyPopper className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">All set! 🎉</h3>
                  <p className="text-sm text-[#6B7280]">
                    You&apos;ve completed all the setup steps. You&apos;re ready to simulate at full power.
                  </p>
                </div>
              ) : (
                <div
                  className="bg-white rounded-xl overflow-hidden"
                  style={{ border: '1px solid #E8E4DE' }}
                >
                  {ONBOARDING_STEPS.map((step, i, arr) => {
                    const isDone = completedSteps[step.key];
                    const isNext = i === nextStepIndex;

                    return (
                      <div
                        key={step.key}
                        className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                          isNext ? 'bg-amber-50/40' : ''
                        }`}
                        style={{
                          borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
                        }}
                      >
                        {/* Status circle */}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                            isDone
                              ? 'bg-emerald-500'
                              : isNext
                              ? 'border-2 border-amber-400'
                              : 'border-2 border-[#E5E7EB]'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3 text-white" />}
                        </div>

                        {/* Label */}
                        <span
                          className={`text-sm flex-1 ${
                            isDone
                              ? 'text-[#9CA3AF] line-through'
                              : isNext
                              ? 'text-[#1A1A1A] font-semibold'
                              : 'text-[#1A1A1A] font-medium'
                          }`}
                        >
                          {isDone ? step.doneLabel : step.label}
                        </span>

                        {/* CTA — for incomplete steps with href */}
                        {!isDone && step.href && (
                          <Link
                            href={step.href}
                            className={`text-xs font-semibold transition-colors ${
                              isNext
                                ? 'text-amber-600 hover:text-amber-700'
                                : 'text-amber-600/60 hover:text-amber-600'
                            }`}
                          >
                            Start →
                          </Link>
                        )}

                        {/* For "Review simulation results" — link to latest completed sim */}
                        {!isDone && step.key === 'review' && simulations.length > 0 && (
                          <Link
                            href={getSimulationHref(
                              simulations.find((s) => s.status === 'completed') || simulations[0]
                            )}
                            className="text-xs font-semibold text-amber-600/60 hover:text-amber-600 transition-colors"
                          >
                            View results →
                          </Link>
                        )}
                      </div>
                    );
                  })}

                  {/* Progress bar */}
                  <div className="px-6 py-3 bg-[#FAFAF8]" style={{ borderTop: '1px solid #F3F4F6' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(Object.values(completedSteps).filter(Boolean).length / ONBOARDING_STEPS.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#9CA3AF] font-medium whitespace-nowrap">
                        {Object.values(completedSteps).filter(Boolean).length} of {ONBOARDING_STEPS.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ─── Recent Simulations (shown only when user has sims) ─── */}
          {!isNewUser && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1A1A1A]">Recent Simulations</h2>
                <Link
                  href="/simulations"
                  className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {simsLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-[#9CA3AF]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {simulations.map((sim) => {
                    const createdDate = extractCreatedAt(sim);
                    return (
                      <Link key={sim.id} href={getSimulationHref(sim)}>
                        <SimulationCard
                          type={sim.type}
                          status={sim.status}
                          title={sim.name}
                          metric={sim.metric}
                          timestamp={createdDate ? relativeTime(createdDate) : sim.timestamp || ''}
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* ─── Quick Actions ─── */}
          <section>
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Quick Actions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                icon={<Beaker className="w-6 h-6 text-amber-600" />}
                title="Run Product Flow Simulation"
                description="Simulate user journeys and identify friction points"
                href="/simulations/new/product-flow"
              />
              <QuickActionCard
                icon={<Target className="w-6 h-6 text-amber-600" />}
                title="Run Ad Portfolio Simulation"
                description="Forecast ad performance and creative fatigue"
                onClick={() => setShowComingSoonModal(true)}
              />
              <QuickActionCard
                icon={<GitCompare className="w-6 h-6 text-amber-600" />}
                title="Run Flow Comparator"
                description="Compare two product flow variants side-by-side"
                href="/simulations/new/product-flow-comparator"
              />
              <QuickActionCard
                icon={<Users className="w-6 h-6 text-amber-600" />}
                title="Update Target Audience"
                description="Refine your audience segments and personas"
                href="/audiences"
              />
              <QuickActionCard
                icon={<Package className="w-6 h-6 text-amber-600" />}
                title="Add Product Context"
                description="Update your product information and constraints"
                href="/product-context"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowComingSoonModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚪</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                This door opens soon
              </h3>
              <p className="text-[#6B7280] mb-6">
                Ad Portfolio Simulation is coming soon. Stay tuned for updates!
              </p>
              <button
                onClick={() => setShowComingSoonModal(false)}
                className="w-full px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Sub-components ─── */

interface SimulationCardProps {
  type: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  title: string;
  metric: string;
  timestamp: string;
}

function SimulationCard({ type, status, title, metric, timestamp }: SimulationCardProps) {
  const statusStyles: Record<string, { badge: string; metric: string }> = {
    completed: {
      badge: 'bg-emerald-50 text-emerald-700',
      metric: 'text-emerald-700 bg-emerald-50',
    },
    running: {
      badge: 'bg-amber-50 text-amber-700',
      metric: 'text-[#374151] bg-[#F3F4F6]',
    },
    draft: {
      badge: 'bg-[#F3F4F6] text-[#6B7280]',
      metric: 'text-[#6B7280] bg-[#F3F4F6]',
    },
    failed: {
      badge: 'bg-red-50 text-red-700',
      metric: 'text-red-700 bg-red-50',
    },
  };

  const styles = statusStyles[status] || statusStyles.draft;

  return (
    <div
      className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
      style={{ border: '1px solid #E8E4DE' }}
    >
      {/* Top row: type label + status badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">
          {type}
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles.badge}`}
        >
          {status}
        </span>
      </div>

      {/* Simulation name */}
      <h3
        className="font-semibold text-[#1A1A1A] mb-3"
        style={{ fontSize: '15px' }}
      >
        {title}
      </h3>

      {/* Prediction / status badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-lg ${styles.metric}`}
        >
          {metric}
        </span>
      </div>

      {/* Timestamp */}
      <p className="text-xs text-[#9CA3AF]">{timestamp}</p>
    </div>
  );
}

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

function QuickActionCard({ icon, title, description, href, onClick }: QuickActionCardProps) {
  const content = (
    <div
      className="bg-white rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
      style={{ border: '1px solid #E8E4DE' }}
    >
      <div className="flex items-start gap-4">
        {/* Icon container — all cards use amber */}
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
          {icon}
        </div>

        {/* Text — right of icon */}
        <div className="flex-1">
          <h3
            className="font-semibold text-[#1A1A1A] mb-1"
            style={{ fontSize: '15px' }}
          >
            {title}
          </h3>
          <p className="text-sm text-[#4B5563]">{description}</p>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="group">
        {content}
      </div>
    );
  }

  return (
    <Link href={href || '#'} className="group">
      {content}
    </Link>
  );
}
