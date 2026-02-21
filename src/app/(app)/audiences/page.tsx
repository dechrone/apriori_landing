"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { Plus, Users, MoreVertical, Loader2, Trash2 } from 'lucide-react';
import type { AudienceStatus } from '@/types/audience';
import { getAudiences, deleteAudience, type AudienceDoc } from '@/lib/firestore';

export default function AudiencesPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { clerkId, profileReady } = useFirebaseUser();

  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const loadAudiences = useCallback(async () => {
    if (!clerkId || !profileReady) return;
    try {
      const data = await getAudiences(clerkId);
      setAudiences(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load audiences', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [clerkId, profileReady, showToast]);

  useEffect(() => {
    loadAudiences();
  }, [loadAudiences]);

  const handleDelete = async (id: string, name: string) => {
    if (!clerkId) return;
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteAudience(clerkId, id);
      setAudiences((prev) => prev.filter((a) => a.id !== id));
      showToast('success', 'Audience deleted', `"${name}" has been removed.`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete audience', 'Please try again.');
    }
    setMenuOpenId(null);
  };

  return (
    <>
      <TopBar title="Audiences" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[1600px] mx-auto relative pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : audiences.length === 0 ? (
          <EmptyState
            icon={<Users className="w-16 h-16" />}
            title="No audiences yet"
            description="Create your first target audience to run more accurate simulations with realistic persona modeling."
            action={{
              label: 'Create Audience',
              onClick: () => window.location.assign('/audiences/new'),
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
                      {audience.usedInSimulations > 0 && (
                        <p className="text-caption text-text-tertiary">
                          Used in {audience.usedInSimulations} simulation{audience.usedInSimulations !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <button
                        className="text-text-tertiary hover:text-text-primary transition-colors"
                        onClick={() => setMenuOpenId(menuOpenId === audience.id ? null : audience.id)}
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {menuOpenId === audience.id && (
                        <div className="absolute right-0 top-7 z-20 bg-bg-elevated border border-border-subtle rounded-lg shadow-lg py-1 min-w-[140px]">
                          <button
                            className="flex items-center gap-2 w-full px-4 py-2 text-body-sm text-accent-red hover:bg-accent-red-bg transition-colors"
                            onClick={() => handleDelete(audience.id, audience.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-label text-text-tertiary mb-2">Demographics</p>
                      <ul className="space-y-1">
                        {(audience.demographics ?? []).map((item, i) => (
                          <li key={i} className="text-body-sm text-text-secondary">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-label text-text-tertiary mb-2">Psychographics</p>
                      <ul className="space-y-1">
                        {(audience.psychographics ?? []).map((item, i) => (
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

        <div className="fixed bottom-6 right-6 lg:right-10 z-30">
          <Link href="/audiences/new">
            <Button size="lg" className="shadow-[var(--shadow-lg)]">
              <Plus className="w-6 h-6" />
              Create Audience
            </Button>
          </Link>
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {menuOpenId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setMenuOpenId(null)}
        />
      )}
    </>
  );
}
