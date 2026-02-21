"use client";

import { useState, useEffect, useCallback } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { Plus, Search, Beaker, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getSimulations, type SimulationDoc } from '@/lib/firestore';

export default function SimulationsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { clerkId, profileReady } = useFirebaseUser();

  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulations, setSimulations] = useState<SimulationDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSimulations = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const data = await getSimulations(clerkId);
      setSimulations(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load simulations', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [clerkId, profileReady, showToast]);

  useEffect(() => {
    loadSimulations();
  }, [loadSimulations]);

  const filtered = simulations.filter((s) => {
    const matchType =
      typeFilter === 'all' ||
      (typeFilter === 'product-flow' && s.type === 'Product Flow') ||
      (typeFilter === 'ad-portfolio' && s.type === 'Ad Portfolio');
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchSearch =
      !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  return (
    <>
      <TopBar title="Simulations" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-20">
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Beaker className="w-16 h-16" />}
            title={simulations.length === 0 ? 'No simulations yet' : 'No results'}
            description={
              simulations.length === 0
                ? 'Create your first simulation to start testing product decisions and identifying potential issues before building.'
                : 'Try adjusting your filters or search query.'
            }
            action={
              simulations.length === 0
                ? { label: 'Create Simulation', onClick: () => (window.location.href = '/simulations/new') }
                : undefined
            }
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((simulation) => (
              <Link
                key={simulation.id}
                href={
                  simulation.type === 'Ad Portfolio'
                    ? `/simulations/ad-portfolio/${simulation.id}`
                    : `/simulations/${simulation.id}`
                }
              >
                <Card hover>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-caption text-text-tertiary uppercase">
                          {simulation.type}
                        </span>
                        <Badge
                          variant={
                            simulation.status === 'completed'
                              ? 'success'
                              : simulation.status === 'running'
                                ? 'amber'
                                : simulation.status === 'failed'
                                  ? 'muted'
                                  : 'muted'
                          }
                        >
                          {simulation.status}
                        </Badge>
                      </div>
                      <h3 className="text-h4 text-text-primary mb-2">{simulation.name}</h3>
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

        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          <Link href="/simulations/new">
            <Button size="lg" className="shadow-lg">
              <Plus className="w-6 h-6" />
              New Simulation
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
