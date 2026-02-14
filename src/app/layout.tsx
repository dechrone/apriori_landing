import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AuditModalProvider } from "@/contexts/AuditModalContext";
import { ConditionalSiteHeader } from "@/components/ConditionalSiteHeader";
import { HideClerkKeylessIndicator } from "@/components/HideClerkKeylessIndicator";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apriori - The Simulation Layer for Pre-Build Conviction",
  description: "Identify Belief Collapse before you build. The first Simulation Layer for high-stakes product decisions. Stress-test pricing, onboarding, and commitment flows against 1M+ synthetic personas.",
  keywords: [
    "product simulation",
    "pre-build testing",
    "user research",
    "decision infrastructure",
    "synthetic personas",
    "belief collapse",
    "product conviction"
  ],
  openGraph: {
    title: "Apriori - Stop Guessing. Start Simulating.",
    description: "Prevent product failures before you write code. High-stakes decision infrastructure for irreversible choices.",
    type: 'website',
    siteName: 'Apriori',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Apriori - The Simulation Layer",
    description: "Identify Belief Collapse before building. Infrastructure for Pre-Build Conviction.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      disableKeyless
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${geistMono.variable} antialiased bg-deep text-text-primary`}
        >
          <HideClerkKeylessIndicator />
          <AuditModalProvider>
            <ConditionalSiteHeader />
            {children}
          </AuditModalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
