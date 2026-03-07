"use client";

import { TopBar } from '@/components/app/TopBar';
import { Beaker, Target, GitCompare, Users, Package, ChevronRight, Check } from 'lucide-react';
import { useAppShell } from '@/components/app/AppShell';
import Link from 'next/link';

export default function DashboardPage() {
  const { toggleMobileMenu } = useAppShell();

  return (
    <>
      <TopBar
        title="Dashboard"
        onMenuClick={toggleMobileMenu}
      />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[1600px] mx-auto space-y-10">
          {/* Recent Simulations */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SimulationCard
                type="Product Flow"
                status="completed"
                title="Onboarding Flow Optimization"
                metric="+18% retention predicted"
                timestamp="2 days ago"
              />
              <SimulationCard
                type="Ad Portfolio"
                status="running"
                title="Q1 Campaign Performance"
                metric="Running 10 variants"
                timestamp="Started 3 hours ago"
              />
              <SimulationCard
                type="Product Flow Comparator"
                status="completed"
                title="Checkout V1 vs V2 Comparison"
                metric="+9% conversion for V2"
                timestamp="4 days ago"
              />
              <SimulationCard
                type="Product Flow"
                status="completed"
                title="Pricing Page A/B Test"
                metric="+12% conversion predicted"
                timestamp="6 days ago"
              />
            </div>
          </section>

          {/* Quick Actions */}
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
                href="/simulations/new/ad-portfolio"
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

          {/* Getting Started Checklist */}
          <section>
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-6">Getting started</h2>

            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{ border: '1px solid #E8E4DE' }}
            >
              {[
                { label: 'Create your workspace', done: true },
                { label: 'Upload your first assets', done: false, href: '/assets' },
                { label: 'Define your target audience', done: false, href: '/audiences' },
                { label: 'Run your first simulation', done: false, href: '/simulations/new' },
                { label: 'Review simulation results', done: false },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 px-6 py-4"
                  style={{
                    borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none',
                  }}
                >
                  {/* Status circle */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.done ? 'bg-emerald-500' : 'border-2 border-[#E5E7EB]'
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3 text-white" />}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-sm flex-1 ${
                      item.done
                        ? 'text-[#9CA3AF] line-through'
                        : 'text-[#1A1A1A] font-medium'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* CTA for incomplete items */}
                  {!item.done && item.href && (
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      Start →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
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
  href: string;
}

function QuickActionCard({ icon, title, description, href }: QuickActionCardProps) {
  return (
    <Link href={href} className="group">
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
    </Link>
  );
}
