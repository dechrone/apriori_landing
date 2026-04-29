"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu, LogOut, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CreditBadge } from "@/components/app/CreditBadge";

interface TopBarProps {
  title: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

export function TopBar({ title, breadcrumb, actions, onMenuClick }: TopBarProps) {
  const { user, signOut } = useAuthContext();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayName = user?.displayName || user?.email || "User";
  const email = user?.email || "";
  const photoURL = user?.photoURL;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.push("/sign-in");
  };

  return (
    <header
      className="sticky top-0 h-16 bg-white flex items-center justify-between px-4 lg:px-8 z-30"
      style={{ borderBottom: "1px solid #E8E4DE" }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          {breadcrumb && (
            <p className="text-sm text-[#6B7280] mb-0.5 hidden sm:block">{breadcrumb}</p>
          )}
          <h1 className="text-2xl font-bold text-[#1A1A1A] leading-snug truncate max-w-[200px] sm:max-w-none">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block">{actions}</div>
        <div className="flex items-center gap-3">
          <CreditBadge />
          <button className="relative p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#6B7280]" />
          </button>

          {/* ── Profile dropdown ── */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="w-[34px] h-[34px] rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center shrink-0 w-[34px] h-[34px] rounded-full bg-[#1F2937] text-white text-sm font-semibold">
                  {initials}
                </div>
              )}
              <ChevronDown
                className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-150 hidden sm:block ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-2 z-50 bg-white border border-[#E8E4DE] rounded-[12px] py-2 w-[260px]"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#F3F4F6]">
                  <div className="flex items-center gap-3">
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt={displayName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-[#1F2937] text-white text-sm font-semibold">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#1A1A1A] truncate">
                        {displayName}
                      </p>
                      {email && (
                        <p className="text-[12px] text-[#6B7280] truncate">{email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sign out */}
                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
