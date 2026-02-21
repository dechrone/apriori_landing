"use client";

import { Sidebar } from '@/components/app/Sidebar';
import { ToastProvider } from '@/components/ui/Toast';
import { AppShellProvider, useAppShell } from '@/components/app/AppShell';

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const { mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed } = useAppShell();

  return (
    <div className="dashboard-theme min-h-screen bg-bg-primary">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <main
        className={`mt-[72px] p-5 sm:p-8 lg:p-10 min-h-[calc(100vh-72px)] transition-[margin-left] duration-200 ease-out ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AppShellProvider>
        <AppLayoutInner>{children}</AppLayoutInner>
      </AppShellProvider>
    </ToastProvider>
  );
}
