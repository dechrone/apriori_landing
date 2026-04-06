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
  title: "Apriori - Know Why Users Drop Off. Before They Do.",
  description: "AI-powered simulations that show you which users convert, which drop off, and why. In hours, not weeks.",
  keywords: [
    "product simulation",
    "user research",
    "synthetic personas",
    "product analytics",
    "conversion optimization",
    "UX research",
  ],
  openGraph: {
    title: "Apriori - Know Why Users Drop Off. Before They Do.",
    description: "AI-powered simulations that show you which users convert, which drop off, and why. In hours, not weeks.",
    type: "website",
    siteName: "Apriori",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apriori - The Simulation Layer",
    description: "AI-powered simulations that show you which users convert, which drop off, and why. In hours, not weeks.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased bg-bg-primary text-text-primary`}
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
