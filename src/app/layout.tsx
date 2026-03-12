import type { Metadata } from "next";
import { Inter, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { AuditModalProvider } from "@/contexts/AuditModalContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConditionalSiteHeader } from "@/components/ConditionalSiteHeader";
import "./globals.css";
import "@/styles/deepDiveTokens.css";

export const dynamic = "force-dynamic";

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

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased bg-deep text-text-primary`}
      >
        <AuthProvider>
          <AuditModalProvider>
            <ConditionalSiteHeader />
            {children}
          </AuditModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
