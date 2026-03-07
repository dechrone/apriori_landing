"use client";

import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';

export default function InsightsPage() {
  const { toggleMobileMenu } = useAppShell();

  return (
    <>
      <TopBar
        title="Insights"
        onMenuClick={toggleMobileMenu}
      />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[1600px] mx-auto flex items-center justify-center h-[60vh] px-4">
        <div className="text-center space-y-3 max-w-xl">
          <p className="text-h3 text-text-primary">Insights are coming soon</p>
          <p className="text-[15px] text-[#4B5563] leading-[1.6]">
            We&apos;ll surface AI-generated patterns across your simulations here – recurring friction
            points, persona behaviors, and optimization opportunities.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
