"use client";

import Link from "next/link";
import { Button } from "./ui/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-deep/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-text-primary hover:text-amber transition-colors"
        >
          Apriori
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
