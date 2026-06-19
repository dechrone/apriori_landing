"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Preserve where the user was headed so sign-in returns them there
      // (e.g. a scout who opened a shared /dealshare link).
      const next =
        pathname && pathname !== "/dashboard" ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/sign-in${next}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ background: "#F2F0EC" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1F2937]" />
          <p className="text-[14px] text-[#6B7280]">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
