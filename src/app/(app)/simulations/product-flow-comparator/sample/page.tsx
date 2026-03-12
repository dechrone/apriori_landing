"use client";

import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { ComparatorResultView } from "@/components/comparator";
import { SAMPLE_COMPARATOR_DATA } from "@/data/sample-comparator-data";

export default function ProductFlowComparatorSamplePage() {
  const { toggleMobileMenu } = useAppShell();
  const data = SAMPLE_COMPARATOR_DATA;

  const title = `${data.flows_compared[0].flow_name} vs ${data.flows_compared[1].flow_name}`;

  return (
    <>
      <TopBar
        title={title}
        breadcrumb="Product Flow · Comparator · Sample"
        onMenuClick={toggleMobileMenu}
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-[#F3E8FF] text-[#7C3AED] rounded-xl text-sm font-semibold">
              Comparator ({data.scorecards.flow_0.completion_rate_pct}% vs {data.scorecards.flow_1.completion_rate_pct}% · 50 personas)
            </div>
          </div>
        }
      />
      <ComparatorResultView data={data} />
    </>
  );
}
