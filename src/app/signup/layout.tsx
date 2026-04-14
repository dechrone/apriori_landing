import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apriori — Synthetic User Research for Product Teams",
  description:
    "AI-generated personas navigate your product flows and surface the friction you'd never find in analytics alone. Get early access with 200 free credits.",
  openGraph: {
    title: "Apriori — Synthetic User Research for Product Teams",
    description:
      "Stop guessing. Start watching synthetic users break your product. Get early access with 200 free credits.",
    type: "website",
    siteName: "Apriori",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apriori — Synthetic User Research for Product Teams",
    description:
      "Stop guessing. Start watching synthetic users break your product. Get early access with 200 free credits.",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
