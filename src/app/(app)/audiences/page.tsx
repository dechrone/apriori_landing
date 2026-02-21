"use client";

import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { Plus, Users, MoreVertical } from 'lucide-react';
import type { AudienceStatus } from '@/types/audience';

export default function AudiencesPage() {
  const { toggleMobileMenu } = useAppShell();
  
  // Mock data - replace with actual data fetching
  const audiences = [
    {
      id: '1',
      name: 'US SMB Founders',
      status: 'active' as AudienceStatus,
      usedInSimulations: 5,
      demographics: ['Age: 25-45', 'Location: US'],
      psychographics: ['Value-driven', 'Cost-conscious'],
      budget: 'Medium',
      risk: 'Low',
    },
    {
      id: '2',
      name: 'Enterprise IT Buyers',
      status: 'active' as AudienceStatus,
      usedInSimulations: 3,
      demographics: ['Age: 35-55', 'Location: Global'],
      psychographics: ['Security-focused', 'ROI-driven'],
      budget: 'High',
      risk: 'Very Low',
    },
    {
      id: '3',
      name: 'Series B SaaS CTOs',
      status: 'draft' as AudienceStatus,
      usedInSimulations: 0,
      demographics: ['Seed–Series C', 'US'],
      psychographics: ['Metrics-driven', 'Risk-averse'],
      budget: 'Medium',
      risk: 'Low',
    },
  ];

  return (
    <>
      <TopBar 
        title="Audiences"
        onMenuClick={toggleMobileMenu}
      />

      <div className="max-w-[1600px] mx-auto relative pb-20">
        {audiences.length === 0 ? (
          <EmptyState
            icon={<Users className="w-16 h-16" />}
            title="No audiences yet"
            description="Create your first target audience to run more accurate simulations with realistic persona modeling."
            action={{
              label: 'Create Audience',
              onClick: () => window.location.assign('/audiences/new')
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((audience) => (
              <Card
                key={audience.id}
                hover
                className="border-l-[3px] border-l-accent-blue"
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-h4 text-text-primary">{audience.name}</h3>
                        <Badge
                          variant={
                            audience.status === 'active'
                              ? 'success'
                              : audience.status === 'draft'
                                ? 'muted'
                                : 'default'
                          }
                        >
                          {audience.status}
                        </Badge>
                      </div>
                      {audience.usedInSimulations != null && audience.usedInSimulations > 0 && (
                        <p className="text-caption text-text-tertiary">
                          Used in {audience.usedInSimulations} simulation{audience.usedInSimulations !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <button className="text-text-tertiary hover:text-text-primary transition-colors rounded-[var(--radius-sm)] hover:bg-bg-hover p-1">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-label text-text-tertiary mb-2">Demographics</p>
                      <ul className="space-y-1">
                        {audience.demographics.map((item, i) => (
                          <li key={i} className="text-body-sm text-text-secondary">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-label text-text-tertiary mb-2">Psychographics</p>
                      <ul className="space-y-1">
                        {audience.psychographics.map((item, i) => (
                          <li key={i} className="text-body-sm text-text-secondary">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border-subtle text-body-sm text-text-tertiary">
                    <span>Budget: <span className="text-text-secondary font-medium">{audience.budget}</span></span>
                    <span>•</span>
                    <span>Risk: <span className="text-text-secondary font-medium">{audience.risk}</span></span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Audience - bottom right */}
        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          <Link href="/audiences/new">
            <Button size="lg" className="shadow-[var(--shadow-lg)]">
              <Plus className="w-6 h-6" />
              Create Audience
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
