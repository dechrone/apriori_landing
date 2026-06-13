import type { Metadata } from "next";

/**
 * Canonical override for the per-variant Univest deep-dive at /demo/univest6.
 * See /demo/univest1/layout.tsx for the full rationale — same pattern for all
 * six variants: canonical → /demo/univest so search engines consolidate
 * ranking signals on the main report instead of indexing six near-duplicates.
 *
 * Lives in a server-component layout because the sibling page.tsx is a
 * client component and cannot export `metadata` directly.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "https://apriori.work/demo/univest",
  },
};

export default function UnivestVariant6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
