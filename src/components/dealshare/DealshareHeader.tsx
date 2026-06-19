"use client";

/**
 * Standalone Dealshare portal header.
 *
 * Replaces the Apriori product TopBar for the scout-facing surface — no
 * product nav, no credit badge. Just the Dealshare brand, a slim nav (My
 * deals + an Admin link for admins), and a profile / sign-out menu.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, ShieldCheck, Handshake } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { isAdmin } from "@/lib/dealshare";

export function DealshareHeader() {
  const { user, signOut } = useAuthContext();
  const { userId } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;
    void isAdmin(userId).then(setAdmin).catch(() => setAdmin(false));
  }, [userId]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayName = user?.displayName || user?.email || "Scout";
  const email = user?.email || "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.push("/sign-in");
  }

  const isActive = (href: string) =>
    href === "/dealshare" ? pathname === "/dealshare" : pathname?.startsWith(href);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
        isActive(href) ? "bg-[#111827] text-white" : "text-[#374151] hover:bg-[#F5F5F5]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 lg:px-8"
      style={{ borderBottom: "1px solid #E8E4DE" }}
    >
      {/* Brand + nav */}
      <div className="flex items-center gap-5">
        <Link href="/dealshare" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827] text-white">
            <Handshake className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-[#1A1A1A]">Apriori Dealshare</p>
            <p className="text-[11px] text-[#9CA3AF]">Scout program</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {navLink("/dealshare", "My deals")}
          {admin && (
            <Link
              href="/dealshare/admin"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                pathname?.startsWith("/dealshare/admin")
                  ? "bg-[#111827] text-white"
                  : "text-[#9A3412] hover:bg-[#FFF7ED]"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
        </nav>
      </div>

      {/* Profile */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#F5F5F5]"
        >
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-sm font-semibold text-white">
            {initials}
          </div>
          <ChevronDown
            className={`hidden h-4 w-4 text-[#9CA3AF] transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`}
          />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-full z-50 mt-2 w-[260px] rounded-[12px] border border-[#E8E4DE] bg-white py-2"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
          >
            <div className="border-b border-[#F3F4F6] px-4 py-3">
              <p className="truncate text-[14px] font-semibold text-[#1A1A1A]">{displayName}</p>
              {email && <p className="truncate text-[12px] text-[#6B7280]">{email}</p>}
            </div>
            {admin && (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-[14px] text-[#374151] transition-colors hover:bg-[#F5F5F5]"
              >
                ← Back to Apriori app
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[14px] text-[#EF4444] transition-colors hover:bg-[#FEF2F2]"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
