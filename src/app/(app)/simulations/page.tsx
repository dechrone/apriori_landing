"use client";

import { useState } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { Plus, Search, Beaker } from 'lucide-react';
import Link from 'next/link';

export default function SimulationsPage() {
  const { toggleMobileMenu } = useAppShell();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data fetching
  const simulations = [
    {
      id: '1',
      type: 'Product Flow',
      status: 'completed' as const,
      name: 'Onboarding Flow Optimization',
      metric: '+18% retention predicted',
      timestamp: '2 days ago',
    },
    {
      id: '2',
      type: 'Ad Portfolio',
      status: 'running' as const,
      name: 'Q1 Campaign Performance',
      metric: 'Running 10 variants',
      timestamp: 'Started 3 hours ago',
    },
    {
      id: '3',
      type: 'Product Flow',
      status: 'completed' as const,
      name: 'Pricing Page A/B Test',
      metric: '+12% conversion predicted',
      timestamp: '5 days ago',
    },
    {
      id: '4',
      type: 'Product Flow',
      status: 'draft' as const,
      name: 'Checkout Flow Analysis',
      metric: 'Draft',
      timestamp: '1 week ago',
    },
  ];

  const statusVariantMap = (s: string) => s === 'completed' ? 'success' : s === 'running' ? 'warning' : s === 'failed' ? 'warning' : 'muted';

  return (
    <>
      <TopBar 
        title="Simulations"
        onMenuClick={toggleMobileMenu}
      />

      <div className="max-w-[1600px] mx-auto relative pb-20">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="flex flex-wrap gap-3">
            <div className="w-48">
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'product-flow', label: 'Product Flow' },
                  { value: 'ad-portfolio', label: 'Ad Portfolio' },
                ]}
              />
            </div>
            <div className="w-48">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'running', label: 'Running' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'failed', label: 'Failed' },
                ]}
              />
            </div>
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-quaternary" />
                <Input
                  placeholder="Search simulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulations List */}
        {simulations.length === 0 ? (
          <EmptyState
            icon={<Beaker className="w-16 h-16" />}
            title="No simulations yet"
            description="Create your first simulation to start testing product decisions and identifying potential issues before building."
            action={{
              label: 'Create Simulation',
              onClick: () => window.location.href = '/simulations/new'
            }}
          />
        ) : (
          <div className="space-y-4">
            {simulations.map((simulation) => (
              <Link
                key={simulation.id}
                href={simulation.type === 'Ad Portfolio' ? `/simulations/ad-portfolio/${simulation.id}` : `/simulations/${simulation.id}`}
              >
                <Card hover>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-caption text-text-tertiary uppercase tracking-wide">
                          {simulation.type}
                        </span>
                        <Badge variant={statusVariantMap(simulation.status)}>{simulation.status}</Badge>
                      </div>
                      <h3 className="text-h4 text-text-primary mb-2">
                        {simulation.name}
                      </h3>
                      <div className="flex items-center gap-4 text-body-sm text-text-tertiary">
                        <span>{simulation.metric}</span>
                        <span>•</span>
                        <span>{simulation.timestamp}</span>
                      </div>
                    </div>
                    <div className="text-text-tertiary">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* New Simulation - bottom right */}
        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          <Link href="/simulations/new">
            <Button size="lg" className="shadow-[var(--shadow-lg)]">
              <Plus className="w-6 h-6" />
              New Simulation
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
