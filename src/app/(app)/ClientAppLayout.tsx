"use client";

import { Sidebar } from '@/components/app/Sidebar';
import { ToastProvider } from '@/components/ui/Toast';
import { AppShellProvider, useAppShell } from '@/components/app/AppShell';
import { FirebaseUserProvider } from '@/contexts/FirebaseUserContext';

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const { mobileMenuOpen, setMobileMenuOpen } = useAppShell();

  return (
    <div className="dashboard-theme h-screen flex" style={{ background: '#F2F0EC' }}>
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ClientAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AppShellProvider>
        <FirebaseUserProvider>
          <AppLayoutInner>{children}</AppLayoutInner>
        </FirebaseUserProvider>
      </AppShellProvider>
    </ToastProvider>
  );
}
