"use client";

import sampleReport from "../../../../../../public/single-screen-sample/report.json";
import type { AbReport } from "@/types/ab-report";
import { AbReportView } from "@/components/ab-report/AbReportView";

const data = sampleReport as unknown as AbReport;

export default function ProductFlowComparatorSamplePage() {
  return <AbReportView data={data} />;
}
