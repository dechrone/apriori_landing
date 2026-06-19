"use client";

/**
 * Standalone Dealshare shell.
 *
 * Parallel to ClientAppLayout, but deliberately slim: scouts authenticate via
 * the same Supabase login yet only ever see the Dealshare portal — no Apriori
 * product sidebar, no credit badge, no product nav. Provider stack:
 *   ToastProvider → AuthGuard → UserProvider → DealshareHeader + content.
 */

import { ToastProvider } from "@/components/ui/Toast";
import { AuthGuard } from "@/components/app/AuthGuard";
import { UserProvider } from "@/contexts/UserContext";
import { DealshareHeader } from "@/components/dealshare/DealshareHeader";

export default function ClientDealshareLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthGuard>
        <UserProvider>
          <div className="dashboard-theme flex h-screen flex-col" style={{ background: "#F2F0EC" }}>
            <DealshareHeader />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </UserProvider>
      </AuthGuard>
    </ToastProvider>
  );
}
