import type { Metadata } from "next";

/**
 * Canonical override for the per-variant Univest deep-dive at /demo/univest1.
 *
 * This variant page is reachable from /case-studies for users, but it shares
 * substantial content/intent with the main /demo/univest report. Pointing the
 * canonical at /demo/univest tells search engines to consolidate ranking
 * signals on the main URL instead of treating the six variants as duplicates
 * that compete with each other (and with the canonical page).
 *
 * Lives in a server-component layout because the sibling page.tsx is a
 * client component and cannot export `metadata` directly.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://apriori.work/demo/univest",
  },
};

export default function UnivestVariant1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
