import { ScienceShell, PaperLinks } from "@/components/science/ScienceShell";
import { GOLD } from "@/components/science/tokens";

export const metadata = {
  title: "Model changelog | Apriori Science",
  description:
    "Version history of Apriori's persona-simulation model and the PiSAR benchmark — what changed and when.",
};

type Entry = { date: string; tag: string; title: string; body: React.ReactNode };

const ENTRIES: Entry[] = [
  {
    date: "June 2026",
    tag: "benchmark",
    title: "PiSAR leaderboard published",
    body: (
      <>
        Opened the benchmark publicly — model, frontier baselines, metric
        definitions, and an invitation to submit your own model.
      </>
    ),
  },
  {
    date: "May 28, 2026",
    tag: "model · v1",
    title: "PiSAR benchmark + first fine-tune",
    body: (
      <>
        Submitted the PiSAR paper (arXiv:2605.29400). A fine-tuned
        Qwen3-VL-8B-Instruct reaches 0.783 semantic similarity on the held-out
        test set — 79% of rows clearing the 0.7 bar, versus 1–2% for frontier
        zero-shot baselines.
      </>
    ),
  },
];

export default function ChangelogPage() {
  return (
    <ScienceShell
      active="/science/changelog"
      title="Model changelog"
      intro={
        <>
          A public log of how the model and benchmark evolve. This is the start —
          we add an entry each time the eval moves.
        </>
      }
    >
      <div className="space-y-8">
        {ENTRIES.map((e) => (
          <div key={e.title} className="border-l-2 pl-5" style={{ borderColor: "rgba(245, 215, 110, 0.3)" }}>
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <span className="text-[13px] font-semibold text-text-tertiary">{e.date}</span>
              <span
                className="rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide"
                style={{ backgroundColor: "rgba(245, 215, 110, 0.08)", color: GOLD }}
              >
                {e.tag}
              </span>
            </div>
            <h3 className="mb-1 text-[16px] font-semibold text-text-primary">{e.title}</h3>
            <p className="text-[14px] leading-relaxed text-text-secondary">{e.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <PaperLinks />
      </div>
    </ScienceShell>
  );
}
