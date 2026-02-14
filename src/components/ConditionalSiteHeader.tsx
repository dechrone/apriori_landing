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
];

export function ConditionalSiteHeader() {
  const pathname = usePathname();

  const isAppRoute = APP_ROUTES_PREFIXES.some((prefix) =>
    pathname?.startsWith(prefix)
  );

  if (isAppRoute) {
    return null;
  }

  return <SiteHeader />;
}
