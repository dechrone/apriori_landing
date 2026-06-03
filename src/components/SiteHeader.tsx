"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { useAuthContext } from "@/contexts/AuthContext";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Demo", href: "/demo/univest" },
  { label: "Research", href: "/research" },
  { label: "FAQs", href: "/#faqs" },
  { label: "About Us", href: "/#about" },
];

export function SiteHeader() {
  const { user, loading, signOut } = useAuthContext();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDemo = pathname?.startsWith("/demo");

  return (
    <header
      className={`${isDemo || isHome ? "fixed" : "sticky"} top-0 z-50 w-full ${
        isHome
          ? "border-b-0 bg-transparent backdrop-blur-0"
          : "border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md"
      }`}
    >
      <div className={`${isDemo ? "max-w-none px-8" : "max-w-[960px] px-6 md:px-16"} mx-auto py-3 flex items-center justify-between`}>
        <Link
          href="/"
          aria-label="Apriori"
          className="text-base font-semibold tracking-tight lowercase hover:opacity-70 transition-opacity shrink-0"
          style={{ color: isHome ? "#F5D76E" : "#B8860B" }}
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

        {/* Nav links - only show on homepage */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-6 ml-12">
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

        {/* Hide auth buttons on demo pages */}
        {!isDemo && (
          <div className="flex items-center gap-4">
            {loading ? null : user ? (
              <>
                {isHome ? (
                  <Link
                    href="/dashboard"
                    className="text-[13px] font-medium px-4 py-1.5 rounded-md border transition-colors"
                    style={{
                      color: "#F5D76E",
                      borderColor: "rgba(245, 215, 110, 0.3)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(245, 215, 110, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.3)";
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="secondary" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </>
            ) : isHome ? (
              <Link
                href="/sign-in"
                className="text-[13px] font-medium px-4 py-1.5 rounded-md border transition-colors"
                style={{
                  color: "#F5D76E",
                  borderColor: "rgba(245, 215, 110, 0.3)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(245, 215, 110, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.3)";
                }}
              >
                Sign In
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
