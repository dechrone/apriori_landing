"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";

const APP_ROUTES_PREFIXES = [
  "/dashboard",
  "/simulations",
  "/audiences",
  "/product-context",
  "/insights",
  "/assets",
  "/settings",
  "/pricing",
  "/signup",
];

export function ConditionalSiteHeader() {
  const pathname = usePathname();

  const isAppRoute = APP_ROUTES_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix)
  );

  if (isAppRoute || pathname === "/joinwaitlist") {
    return null;
  }

  // The header only renders on dark, landing-style routes (app routes return
  // null above), so keep its theme tokens dark everywhere for a consistent,
  // premium look — otherwise non-home pages fall back to the light theme.
  return (
    <div className="landing-dark">
      <SiteHeader />
    </div>
  );
}
