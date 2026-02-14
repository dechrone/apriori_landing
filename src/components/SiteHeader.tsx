"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
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
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
                variables: {
                  colorPrimary: "#F59E0B",
                  colorBackground: "#1E293B",
                  colorText: "#FAFAFA",
                  colorInputBackground: "#1E293B",
                  colorInputText: "#FAFAFA",
                  borderRadius: "4px",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
