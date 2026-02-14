"use client";

import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';

export default function InsightsPage() {
  const { toggleMobileMenu } = useAppShell();

  return (
    <>
      <TopBar
        title="Insights"
        breadcrumb="Coming soon"
        onMenuClick={toggleMobileMenu}
      />

      <div className="max-w-[1600px] mx-auto flex items-center justify-center h-[60vh] px-4">
        <div className="text-center space-y-3 max-w-xl">
          <p className="text-h3 text-text-primary">Insights are coming soon</p>
          <p className="text-body text-text-tertiary">
            We&apos;ll surface AI-generated patterns across your simulations here – recurring friction
            points, persona behaviors, and optimization opportunities.
          </p>
        </div>
      </div>
    </>
  );
}
