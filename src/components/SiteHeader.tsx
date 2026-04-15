"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { useAuthContext } from "@/contexts/AuthContext";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Demo", href: "/demo/univest" },
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
      className={`${isDemo ? "fixed" : "sticky"} top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md`}
    >
      <div className={`${isDemo ? "max-w-none px-8" : "max-w-[960px] px-6 md:px-16"} mx-auto py-3 flex items-center justify-between`}>
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity shrink-0"
          style={{ color: "#B8860B" }}
        >
          APRIORI
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
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </>
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
