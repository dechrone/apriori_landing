"use client";

import Link from "next/link";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { TopBar } from "@/components/app/TopBar";
import { Button } from "@/components/ui/Button";
import { useAppShell } from "@/components/app/AppShell";
import { FlowAnalysisView } from "@/components/flow-analysis/FlowAnalysisView";
import { flowAnalysisDummyData } from "@/data/flow-analysis-dummy";
import { ArrowLeft } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-flow-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-flow-body",
  display: "swap",
});

export default function ProductFlowSamplePage() {
  const { toggleMobileMenu } = useAppShell();
  const { meta } = flowAnalysisDummyData;

  return (
    <>
      <TopBar
        title={`${meta.product} · Sample Results`}
        breadcrumb="Product Flow · Sample"
        onMenuClick={toggleMobileMenu}
        actions={
          <Link href="/simulations">
            <Button variant="ghost" className="text-text-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to simulations
            </Button>
          </Link>
        }
      />
      <div className={`${playfair.variable} ${dmSans.variable}`}>
        <FlowAnalysisView data={flowAnalysisDummyData} />
      </div>
    </>
  );
}
