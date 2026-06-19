import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScienceShell, PaperLinks } from "@/components/science/ScienceShell";
import { GOLD } from "@/components/science/tokens";

export const metadata = {
  title: "Science | Apriori",
  description:
    "The research behind Apriori: a published PiSAR benchmark where a fine-tuned 8B model reaches 0.783 semantic similarity on screen-conditioned action prediction, beating frontier zero-shot baselines (0.459 Claude Opus 4.7, 0.482 GPT-5.5).",
};

const STATS = [
  { value: "0.783", caption: "Semantic similarity, fine-tuned Qwen3-VL-8B — vs 0.459 (Claude Opus 4.7), 0.482 (GPT-5.5) zero-shot." },
  { value: "79%", caption: "Held-out rows clearing the 0.7 quality bar, vs 1–2% for the frontier baselines." },
  { value: "12,929", caption: "PiSAR training tuples from app reviews, demographics, and shopping traces; 661-row held-out test set." },
];

const CARDS = [
  { href: "/science/benchmark", title: "Benchmark", body: "The PiSAR leaderboard — our model, the frontier baselines, and the metric definitions. Run your own model and we'll list it." },
  { href: "/science/method", title: "Method", body: "Plain-English: what semantic similarity measures, why 0.7 is the bar, what held-out means, and why task-specific fine-tuning beats zero-shot personas." },
  { href: "/science/limits", title: "Limits", body: "What simulations can and can't do — stated honestly, including what the paper itself shows doesn't transfer." },
  { href: "/science/changelog", title: "Changelog", body: "Model versions and evaluation deltas over time." },
];

export default function SciencePage() {
  return (
    <ScienceShell
      active="/science"
      title="Our model out-simulates the frontier."
      intro={
        <>
          Apriori predicts what a real user does on a real screen. We published
          the proof: on screen-conditioned action prediction, a fine-tuned 8B
          model beats frontier models used zero-shot — and we put the benchmark,
          method, and limits in the open so you can check every number.
        </>
      }
    >
      {/* Headline stats */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.value} className="rounded-lg border p-5" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-secondary)" }}>
            <div className="mb-2 text-[26px] font-bold" style={{ color: GOLD, letterSpacing: "-0.02em" }}>
              {s.value}
            </div>
            <p className="text-[13px] leading-relaxed text-text-secondary">{s.caption}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <PaperLinks />
      </div>

      {/* Hub cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-lg border p-6 transition-colors"
            style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-text-primary">{c.title}</h3>
              <ArrowUpRight size={16} style={{ color: GOLD }} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="text-[14px] leading-relaxed text-text-secondary">{c.body}</p>
          </Link>
        ))}
      </div>
    </ScienceShell>
  );
}
