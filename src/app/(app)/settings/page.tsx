"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopBar } from '@/components/app/TopBar';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import FigmaConnectionCard from '@/components/figma/FigmaConnectionCard';

export default function SettingsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const figmaStatus = searchParams.get('figma');

  // After OAuth redirect, we need to:
  // 1. Show the toast
  // 2. Tell the card to delay its fetch (so the DB write is visible)
  // 3. Force a remount so it re-fetches fresh
  const isPostOAuth = figmaStatus === 'connected';
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    if (figmaStatus === 'connected') {
      showToast('success', 'Figma connected successfully!');
      // Force remount after 1s so the card re-fetches with a delay
      setTimeout(() => setCardKey((k) => k + 1), 1000);
    }
    if (figmaStatus === 'denied')    showToast('warning', 'Figma connection was cancelled.');
    if (figmaStatus === 'error')     showToast('error', 'Could not connect Figma. Try again.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figmaStatus]);
  
  return (
    <>
      <TopBar title="Settings" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[800px] mx-auto space-y-8">

        <section className="space-y-4">
          <div>
            <h2 className="text-h4 text-text-primary font-semibold">Integrations</h2>
            <p className="text-[13px] text-text-secondary mt-1">
              Connect external tools to import your designs directly.
            </p>
          </div>
          <FigmaConnectionCard key={cardKey} fetchDelay={isPostOAuth ? 800 : 0} />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Workspace Name"
              placeholder="My Workspace"
              defaultValue="My Workspace"
            />
            <Input
              label="Company Name"
              placeholder="Acme Inc."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded-[6px] border-2 border-border-medium bg-bg-input
                  checked:bg-accent-gold checked:border-accent-gold
                  transition-standard cursor-pointer accent-accent-gold"
              />
              <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">Email me when simulations complete</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded-[6px] border-2 border-border-medium bg-bg-input
                  checked:bg-accent-gold checked:border-accent-gold
                  transition-standard cursor-pointer accent-accent-gold"
              />
              <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">Weekly insights summary</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
      </div>
    </>
  );
}
