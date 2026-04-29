"use client";

import { TopBar } from '@/components/app/TopBar';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Columns2,
  GitCompare,
  Loader2,
  PlayCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useAppShell } from '@/components/app/AppShell';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { WelcomeModal } from '@/components/app/WelcomeModal';
import { useCreditProfile } from '@/lib/credits';
import { useTalkToUs } from '@/components/app/TalkToUs';
import {
  getSimulations,
  getAssetFolders,
  getAudiences,
  getUserProfile,
  markWelcomeSeen,
  type SimulationDoc,
} from '@/lib/db';

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
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

function getSimulationHref(sim: SimulationDoc) {
  if (sim.type === 'Ad Portfolio') return `/simulations/ad-portfolio/${sim.id}`;
  if (sim.type === 'Product Flow Comparator')
    return `/simulations/product-flow-comparator/${sim.id}`;
  return `/simulations/${sim.id}`;
}

interface OnboardingStep {
  key: string;
  label: string;
  href?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  { key: 'workspace', label: 'Workspace ready' },
  { key: 'audience', label: 'Pick or define your audience', href: '/audiences' },
  { key: 'simulation', label: 'Run your first A/B', href: '/simulations/new/product-flow-ab' },
  { key: 'review', label: 'Read the verdict' },
];

export default function DashboardPage() {
  const { toggleMobileMenu } = useAppShell();
  const { userId, profileReady } = useUser();
  const { user } = useAuthContext();
  const { profile: creditProfile } = useCreditProfile();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!userId || !profileReady) return;
    let cancelled = false;
    (async () => {
      try {
        const profile = await getUserProfile(userId);
        if (!cancelled && profile && !profile.hasSeenWelcome) {
          setShowWelcome(true);
        }
      } catch (err) {
        console.error('Error checking welcome flag:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, profileReady]);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    if (userId) {
      markWelcomeSeen(userId).catch((err) =>
        console.error('Error marking welcome seen:', err),
      );
    }
  }, [userId]);

  const [simulations, setSimulations] = useState<SimulationDoc[]>([]);
  const [simsLoading, setSimsLoading] = useState(true);

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    workspace: true,
    audience: false,
    simulation: false,
    review: false,
  });

  const allDone = Object.values(completedSteps).every(Boolean);
  const isNewUser = !simsLoading && simulations.length === 0;
  const showOnboarding = !allDone && !simsLoading;

  useEffect(() => {
    if (!userId || !profileReady) return;
    let cancelled = false;
    (async () => {
      try {
        const [sims, folders, audiences] = await Promise.all([
          getSimulations(userId),
          getAssetFolders(userId),
          getAudiences(userId),
        ]);
        if (cancelled) return;
        setSimulations(sims.slice(0, 5));
        setSimsLoading(false);
        setCompletedSteps({
          workspace: true,
          audience: audiences.length > 0 || folders.length > 0,
          simulation: sims.length > 0,
          review: sims.some((s) => s.status === 'completed'),
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (!cancelled) setSimsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, profileReady]);

  const firstName = user?.displayName?.split(' ')[0];
  const completedCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <>
      <TopBar title="Dashboard" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <HeroBanner firstName={firstName} creditProfile={creditProfile} />

          <PrimaryActions />

          {showOnboarding && (
            <OnboardingChecklist
              steps={ONBOARDING_STEPS}
              completed={completedSteps}
              completedCount={completedCount}
              total={ONBOARDING_STEPS.length}
              isNewUser={isNewUser}
            />
          )}

          {!isNewUser && (
            <RecentSimulations
              simulations={simulations}
              loading={simsLoading}
            />
          )}

          {allDone && !isNewUser && simulations.length > 0 && (
            <AllSetCard />
          )}

          <TalkToUsFooter />
        </div>
      </div>

      {showWelcome && (
        <WelcomeModal firstName={firstName} onDismiss={dismissWelcome} />
      )}
    </>
  );
}

function HeroBanner({
  firstName,
  creditProfile,
}: {
  firstName?: string;
  creditProfile: { credits_remaining: number; credits_total: number; plan: string } | null;
}) {
  const remaining = creditProfile?.credits_remaining ?? 0;
  const total = creditProfile?.credits_total ?? 200;
  const used = Math.max(0, total - remaining);
  const usedPct = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  const runsLeft = Math.floor(remaining / 40);

  return (
    <section
      className="relative overflow-hidden rounded-[18px] bg-white border border-[#E8E4DE] px-6 sm:px-8 py-6"
      style={{
        boxShadow: '0 1px 4px rgba(15,23,42,0.04), 0 8px 28px rgba(15,23,42,0.05)',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
            Welcome back{firstName ? `,` : ''}
          </p>
          <h1 className="mt-1 text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-tight">
            {firstName ? `Hey ${firstName}, ready to ship?` : 'Ready to ship something better?'}
          </h1>
          <p className="mt-2 text-[14px] text-[#64748B] max-w-[520px] leading-relaxed">
            Run a synthetic-user A/B in under two minutes. Upload screens, pick an
            audience, and see what real users would say.
          </p>
        </div>

        <div className="flex items-stretch gap-3 sm:gap-4">
          <CreditTile
            label="Credits left"
            value={remaining}
            sublabel={`${runsLeft} A/B run${runsLeft === 1 ? '' : 's'} available`}
          />
          <CreditTile
            label="This cycle"
            value={used}
            sublabel={`${usedPct}% of ${total} used`}
            barPct={usedPct}
            tone="muted"
          />
        </div>
      </div>
    </section>
  );
}

function CreditTile({
  label,
  value,
  sublabel,
  barPct,
  tone = 'primary',
}: {
  label: string;
  value: number;
  sublabel: string;
  barPct?: number;
  tone?: 'primary' | 'muted';
}) {
  return (
    <div
      className={`min-w-[160px] rounded-[12px] px-4 py-3 ${
        tone === 'primary'
          ? 'bg-[var(--accent-amber-dim)] border border-[var(--accent-gold)]/20'
          : 'bg-[#F8FAFC] border border-[#E2E8F0]'
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-[26px] font-bold text-[#0F172A] leading-none tabular-nums">
          {value}
        </span>
        {tone === 'primary' && (
          <Zap className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
        )}
      </div>
      <p className="text-[12px] text-[#64748B] mt-1.5 leading-snug">{sublabel}</p>
      {typeof barPct === 'number' && (
        <div className="mt-2 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent-gold)] rounded-full transition-all"
            style={{ width: `${barPct}%` }}
          />
        </div>
      )}
    </div>
  );
}

function PrimaryActions() {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#0F172A]">Run a simulation</h2>
        <Link
          href="/demo/univest"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          See a sample first
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          icon={<Columns2 className="w-5 h-5 text-[var(--accent-gold)]" />}
          title="Single-Screen A/B"
          subtitle="Upload two variants. Get a verdict in under 2 minutes."
          credits="40 credits · 20 personas × 2 screens"
          recommended
          href="/simulations/new/product-flow-ab"
        />
        <ActionCard
          icon={<GitCompare className="w-5 h-5 text-[var(--accent-gold)]" />}
          title="Full-Flow A/B"
          subtitle="Compare two end-to-end journeys. See where each loses users."
          credits="From 80 credits · scales with screens"
          href="/simulations/new/product-flow-comparator"
        />
      </div>
    </section>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  credits,
  href,
  recommended,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  credits: string;
  href: string;
  recommended?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-[14px] bg-white p-5 transition-all hover:-translate-y-[1px] ${
        recommended
          ? 'border-[1.5px] border-[var(--accent-gold)] shadow-[0_8px_24px_rgba(31, 41, 55,0.10)]'
          : 'border border-[#E8E4DE] hover:border-[#CBD5E1] hover:shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
      }`}
    >
      {recommended && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-white bg-[var(--accent-gold)] rounded-full px-2.5 py-1">
          <Sparkles className="w-3 h-3" />
          Start here
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-[10px] bg-[var(--accent-amber-dim)] flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold text-[#0F172A] leading-tight">
              {title}
            </h3>
            <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
              {subtitle}
            </p>
            <p className="text-[12px] text-[#94A3B8] mt-2 font-medium">{credits}</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-[#94A3B8] flex-shrink-0 mt-1.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-gold)] transition-all" />
      </div>
    </Link>
  );
}

function OnboardingChecklist({
  steps,
  completed,
  completedCount,
  total,
  isNewUser,
}: {
  steps: OnboardingStep[];
  completed: Record<string, boolean>;
  completedCount: number;
  total: number;
  isNewUser: boolean;
}) {
  if (!isNewUser && completedCount === total) return null;
  const nextStepIndex = steps.findIndex((s) => !completed[s.key]);

  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[18px] font-semibold text-[#0F172A]">
          {isNewUser ? 'Get started in 4 steps' : 'Finish setup'}
        </h2>
        <span className="text-[12px] font-medium text-[#64748B]">
          {completedCount} of {total}
        </span>
      </div>
      <div className="bg-white rounded-[14px] border border-[#E8E4DE] overflow-hidden">
        {steps.map((step, i) => {
          const isDone = completed[step.key];
          const isNext = i === nextStepIndex;
          return (
            <div
              key={step.key}
              className={`flex items-center gap-3 px-5 py-3.5 ${
                i < steps.length - 1 ? 'border-b border-[#F1F5F9]' : ''
              } ${isNext ? 'bg-[var(--accent-amber-dim)]/30' : ''}`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isDone
                    ? 'bg-emerald-500'
                    : isNext
                      ? 'border-[2px] border-[var(--accent-gold)]'
                      : 'border-[2px] border-[#E2E8F0]'
                }`}
              >
                {isDone && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-[14px] flex-1 ${
                  isDone
                    ? 'text-[#94A3B8] line-through'
                    : isNext
                      ? 'text-[#0F172A] font-semibold'
                      : 'text-[#334155] font-medium'
                }`}
              >
                {step.label}
              </span>
              {!isDone && step.href && (
                <Link
                  href={step.href}
                  className={`text-[12px] font-semibold transition-colors ${
                    isNext
                      ? 'text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)]'
                      : 'text-[#94A3B8] hover:text-[var(--accent-gold)]'
                  }`}
                >
                  {isNext ? 'Start →' : 'Open →'}
                </Link>
              )}
            </div>
          );
        })}
        <div className="px-5 py-2.5 bg-[#FAFAF8] border-t border-[#F1F5F9]">
          <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentSimulations({
  simulations,
  loading,
}: {
  simulations: SimulationDoc[];
  loading: boolean;
}) {
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[18px] font-semibold text-[#0F172A]">Recent runs</h2>
        <Link
          href="/simulations"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] transition-colors"
        >
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      {loading ? (
        <div className="bg-white rounded-[14px] border border-[#E8E4DE] py-12 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[#94A3B8]" />
        </div>
      ) : simulations.length === 0 ? null : (
        <div className="bg-white rounded-[14px] border border-[#E8E4DE] overflow-hidden">
          {simulations.map((sim, i) => {
            const createdDate = extractCreatedAt(sim);
            return (
              <Link
                key={sim.id}
                href={getSimulationHref(sim)}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#FAFAF8] transition-colors ${
                  i < simulations.length - 1 ? 'border-b border-[#F1F5F9]' : ''
                }`}
              >
                <StatusDot status={sim.status} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-[#0F172A] truncate leading-tight">
                    {sim.name}
                  </p>
                  <p className="text-[12px] text-[#64748B] mt-0.5 truncate">
                    {sim.type} · {sim.metric}
                  </p>
                </div>
                <span className="text-[12px] text-[#94A3B8] flex-shrink-0 hidden sm:inline">
                  {createdDate ? relativeTime(createdDate) : sim.timestamp || ''}
                </span>
                <ChevronRight className="w-4 h-4 text-[#CBD5E1] flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

function StatusDot({ status }: { status: SimulationDoc['status'] }) {
  const styles: Record<string, { dot: string; ring: string }> = {
    completed: { dot: 'bg-[#1F2937]', ring: 'bg-[#F3F4F6]' },
    running: { dot: 'bg-[var(--accent-gold)]', ring: 'bg-[var(--accent-amber-dim)]' },
    draft: { dot: 'bg-[#94A3B8]', ring: 'bg-[#F1F5F9]' },
    failed: { dot: 'bg-[#B91C1C]', ring: 'bg-[#FEE2E2]' },
  };
  const s = styles[status] || styles.draft;
  return (
    <span className={`relative inline-flex w-7 h-7 rounded-full ${s.ring} items-center justify-center flex-shrink-0`}>
      <span className={`w-2 h-2 rounded-full ${s.dot}`} />
      {status === 'running' && (
        <span className={`absolute inline-flex w-2 h-2 rounded-full ${s.dot} animate-ping opacity-60`} />
      )}
    </span>
  );
}

function AllSetCard() {
  return (
    <section>
      <div className="bg-white rounded-[14px] border border-[#E8E4DE] p-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#F3F4F6] flex items-center justify-center mb-3">
          <Check className="w-6 h-6 text-[#1F2937]" />
        </div>
        <h3 className="text-[16px] font-semibold text-[#0F172A]">You&apos;re all set</h3>
        <p className="text-[13px] text-[#64748B] mt-1">
          Keep iterating, every run sharpens the verdict.
        </p>
      </div>
    </section>
  );
}

function TalkToUsFooter() {
  const { open } = useTalkToUs();
  return (
    <section>
      <div className="flex items-center justify-between gap-4 rounded-[14px] border border-dashed border-[#CBD5E1] bg-white px-5 py-4">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#0F172A]">
            Hit a wall? Have a half-formed idea?
          </p>
          <p className="text-[12px] text-[#64748B] mt-0.5">
            We read every message, and we&apos;re fast.
          </p>
        </div>
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-[10px] px-4 py-2.5 text-white bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] transition-colors flex-shrink-0"
        >
          Talk to us
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
