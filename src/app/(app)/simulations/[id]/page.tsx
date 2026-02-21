"use client";

import { TopBar } from '@/components/app/TopBar';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';
import { MoreVertical } from 'lucide-react';

export default function SimulationDetailsPage() {
  const { toggleMobileMenu } = useAppShell();
  
  return (
    <>
      <TopBar 
        title="Onboarding Flow Optimization"
        breadcrumb="Product Flow Simulation • Completed"
        onMenuClick={toggleMobileMenu}
        actions={
          <Button variant="ghost">
            <MoreVertical className="w-5 h-5" />
          </Button>
        }
      />

      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6">
          <p className="text-body-sm text-text-tertiary mb-2">Run on Feb 6, 2026</p>
          <div className="inline-flex items-center px-4 py-2 bg-accent-green-bg text-accent-green rounded-[var(--radius-sm)] text-h4 font-bold">
            +18% retention predicted
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border-subtle mb-8">
          <div className="flex gap-8">
            {['Summary', 'Step Analysis', 'Persona Breakdown', 'Recommendations'].map((tab) => (
              <button
                key={tab}
                className={`
                  px-6 py-4 text-body font-semibold border-b-3 transition-colors
                  ${tab === 'Summary' 
                    ? 'border-accent-gold text-text-primary' 
                    : 'border-transparent text-text-tertiary hover:text-text-primary'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Tab Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-h2 text-text-primary mb-6">Drop-off Funnel</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-body text-text-secondary">
                  Funnel visualization will be displayed here
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-h2 text-text-primary mb-6">Top Friction Points</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FrictionPointCard
                severity="high"
                step="Step 3"
                issue="Confusing pricing page layout"
                impact="32% drop-off rate"
              />
              <FrictionPointCard
                severity="medium"
                step="Step 2"
                issue="Unclear value proposition"
                impact="15% drop-off rate"
              />
              <FrictionPointCard
                severity="low"
                step="Step 5"
                issue="Too many form fields"
                impact="8% drop-off rate"
              />
            </div>
          </section>

          <section>
            <h2 className="text-h2 text-text-primary mb-6">Predicted Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard label="Completion Rate" value="68%" change="+12%" positive />
              <MetricCard label="Avg. Time" value="4.2 min" change="-0.8 min" positive />
              <MetricCard label="Drop-off Rate" value="32%" change="-8%" positive />
              <MetricCard label="User Satisfaction" value="7.8/10" change="+1.2" positive />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface FrictionPointCardProps {
  severity: 'high' | 'medium' | 'low';
  step: string;
  issue: string;
  impact: string;
}

function FrictionPointCard({ severity, step, issue, impact }: FrictionPointCardProps) {
  const severityColors = {
    high: 'border-l-accent-red bg-accent-red-bg',
    medium: 'border-l-accent-orange bg-accent-orange-bg',
    low: 'border-l-accent-blue bg-accent-blue-bg',
  };

  return (
    <Card className={`border-l-4 ${severityColors[severity]}`}>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <Badge variant={severity === 'high' ? 'error' : severity === 'medium' ? 'warning' : 'info'}>
            {severity}
          </Badge>
          <span className="text-caption text-text-tertiary uppercase">{step}</span>
        </div>
        <h3 className="text-body text-text-primary font-semibold mb-2">{issue}</h3>
        <p className="text-body-sm text-text-tertiary">{impact}</p>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

function MetricCard({ label, value, change, positive }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="text-center py-6">
        <p className="text-h2 text-text-primary mb-1">{value}</p>
        <p className="text-caption text-text-tertiary uppercase mb-2">{label}</p>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-body-sm font-semibold ${positive ? 'text-accent-green bg-accent-green-bg' : 'text-accent-red bg-accent-red-bg'}`}>
          {positive ? '↑' : '↓'} {change}
        </span>
      </CardContent>
    </Card>
  );
}
