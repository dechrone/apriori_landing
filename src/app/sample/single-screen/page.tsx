"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";
import reportJson from "../../../../public/single-screen-sample/report.json";
import type { AbReport } from "@/types/ab-report";
import { AbReportView } from "@/components/ab-report/AbReportView";

const data = reportJson as unknown as AbReport;

const playfair = Playfair_Display({
  variable: "--font-flow-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-flow-body",
  subsets: ["latin"],
  display: "swap",
});

export default function SingleScreenSamplePage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}>
      <AbReportView data={data} />
    </div>
  );
}
