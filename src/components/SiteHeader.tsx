"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Research", href: "/research" },
  { label: "FAQs", href: "/#faqs" },
  { label: "About Us", href: "/#about" },
];

const GOLD = "#F5D76E";

export function SiteHeader() {
  const { user, loading, signOut } = useAuthContext();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDemo = pathname?.startsWith("/demo");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`${isDemo || isHome ? "fixed" : "sticky"} top-0 z-50 w-full ${
        isHome
          ? "border-b-0 bg-transparent backdrop-blur-0"
          : "border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md"
      }`}
    >
      <div
        className={`${
          isDemo
            ? "max-w-none px-6 md:px-8"
            : isHome
            ? "max-w-none px-6 md:px-10"
            : "max-w-[960px] px-6 md:px-16"
        } mx-auto py-3 flex items-center justify-between relative`}
      >
        <Link
          href="/"
          aria-label="Apriori — back to top"
          onClick={(e) => {
            setMenuOpen(false);
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-xl md:text-2xl font-semibold tracking-tight lowercase hover:opacity-70 transition-opacity shrink-0 cursor-pointer"
          style={{ color: GOLD }}
        >
          apr<span aria-hidden>i</span>or
          <span aria-hidden className="relative inline-block">
            {"ı"}
            <span
              className="absolute rounded-full"
              style={{
                top: "-0.1em",
                left: "50%",
                width: "0.22em",
                height: "0.22em",
                transform: "translateX(-50%)",
                backgroundColor: "#FF3B30",
                boxShadow: "0 0 6px rgba(255, 59, 48, 0.7)",
              }}
            />
          </span>
        </Link>

        {/* Desktop nav — centered, homepage only */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right cluster: desktop auth + mobile hamburger */}
        <div className="flex items-center gap-3">
          {!isDemo && (
            <div className="hidden md:flex items-center gap-4">
              <AuthActions
                user={user}
                loading={loading}
                onSignOut={signOut}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 transition-colors"
            style={{ color: GOLD }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-md"
          style={{ boxShadow: "0 24px 40px rgba(0,0,0,0.45)" }}
        >
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-[15px] text-text-secondary hover:text-text-primary transition-colors border-b border-border-subtle/60 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            {!isDemo && (
              <div className="flex flex-col gap-3 pt-4">
                <AuthActions
                  user={user}
                  loading={loading}
                  onSignOut={signOut}
                  mobile
                  onNavigate={() => setMenuOpen(false)}
                />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

type AuthUser = ReturnType<typeof useAuthContext>["user"];

function AuthActions({
  user,
  loading,
  onSignOut,
  mobile = false,
  onNavigate,
}: {
  user: AuthUser;
  loading: boolean;
  onSignOut: () => void;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  if (loading) return null;

  const outlineClass = `${
    mobile ? "w-full justify-center text-[15px]" : "text-[13px]"
  } inline-flex items-center font-medium px-4 py-2 rounded-md border transition-colors`;
  const outlineStyle = {
    color: GOLD,
    borderColor: "rgba(245, 215, 110, 0.3)",
    backgroundColor: "transparent",
  } as const;

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = "rgba(245, 215, 110, 0.08)";
    e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.5)";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.3)";
  };

  if (user) {
    return (
      <>
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className={outlineClass}
          style={outlineStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          Dashboard
        </Link>
        <button
          onClick={() => {
            onNavigate?.();
            onSignOut();
          }}
          className={`${
            mobile ? "w-full justify-center py-2 text-[15px]" : "text-[13px]"
          } inline-flex items-center text-text-tertiary hover:text-text-primary transition-colors cursor-pointer`}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <Link
      href="/sign-in"
      onClick={onNavigate}
      className={outlineClass}
      style={outlineStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      Sign In
    </Link>
  );
}
