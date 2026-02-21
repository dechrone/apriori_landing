"use client";

import { TopBar } from '@/components/app/TopBar';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Beaker, Target, Users, Package } from 'lucide-react';
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

      <div className="max-w-[1600px] mx-auto space-y-12">
        {/* Recent Simulations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h2 text-text-primary">Recent Simulations</h2>
            <Link href="/simulations" className="text-body text-accent-gold hover:text-accent-gold-hover transition-colors font-medium">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              type="Product Flow"
              status="completed"
              title="Pricing Page A/B Test"
              metric="+12% conversion predicted"
              timestamp="5 days ago"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-h2 text-text-primary mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickActionCard
              icon={<Beaker className="w-8 h-8" />}
              title="Run Product Flow Simulation"
              description="Simulate user journeys and identify friction points"
              href="/simulations/new/product-flow"
            />
            <QuickActionCard
              icon={<Target className="w-8 h-8" />}
              title="Run Ad Portfolio Simulation"
              description="Forecast ad performance and creative fatigue"
              href="/simulations/new/ad-portfolio"
            />
            <QuickActionCard
              icon={<Users className="w-8 h-8" />}
              title="Update Target Audience"
              description="Refine your audience segments and personas"
              href="/audiences"
            />
            <QuickActionCard
              icon={<Package className="w-8 h-8" />}
              title="Add Product Context"
              description="Update your product information and constraints"
              href="/product-context"
            />
          </div>
        </section>
      </div>
    </>
  );
}

interface SimulationCardProps {
  type: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  title: string;
  metric: string;
  timestamp: string;
}

function SimulationCard({ type, status, title, metric, timestamp }: SimulationCardProps) {
  const statusVariant = status === 'completed' ? 'success' : status === 'running' ? 'warning' : status === 'failed' ? 'warning' : 'muted';
  return (
    <Card hover className="min-h-[160px] flex flex-col">
      <CardContent className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-caption text-text-tertiary uppercase tracking-wide">{type}</span>
          <Badge variant={statusVariant}>{status}</Badge>
        </div>
        
        <h3 className="text-h4 text-text-primary mb-4 line-clamp-2 flex-grow">
          {title}
        </h3>
        
        <div className="mt-auto">
          <div className="inline-flex items-center px-3 py-1.5 bg-accent-green-bg text-accent-green rounded-[var(--radius-sm)] text-body-sm font-semibold mb-3">
            {metric}
          </div>
          <p className="text-caption text-text-tertiary">{timestamp}</p>
        </div>
      </CardContent>
    </Card>
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
    <Link href={href}>
      <Card hover className="text-center">
        <CardContent className="py-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-[var(--radius-sm)] bg-accent-gold/10 text-accent-gold flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-h4 text-text-primary mb-2">{title}</h3>
          <p className="text-body-sm text-text-tertiary">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
