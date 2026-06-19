import { ScienceShell, SciSection, PaperLinks } from "@/components/science/ScienceShell";

export const metadata = {
  title: "PiSAR Benchmark | Apriori",
  description:
    "The PiSAR leaderboard for screen-conditioned action prediction. Apriori's fine-tuned Qwen3-VL-8B reaches 0.783 semantic similarity vs 0.482 (GPT-5.5) and 0.459 (Claude Opus 4.7) zero-shot. Run your model and we'll list it.",
};

const GOLD = "#F5D76E";

type Row = {
  model: string;
  kind: string;
  score: string;
  clears: string;
  ours?: boolean;
};

const ROWS: Row[] = [
  { model: "Apriori — fine-tuned Qwen3-VL-8B-Instruct", kind: "Fine-tuned", score: "0.783", clears: "79%", ours: true },
  { model: "GPT-5.5", kind: "Zero-shot", score: "0.482", clears: "1–2%" },
  { model: "Claude Opus 4.7", kind: "Zero-shot", score: "0.459", clears: "1–2%" },
  { model: "Gemma-4-26B-A4B-IT (same recipe)", kind: "Fine-tuned", score: "0.441", clears: "—" },
];

export default function BenchmarkPage() {
  return (
    <ScienceShell
      active="/science/benchmark"
      title="The PiSAR benchmark"
      intro={
        <>
          PiSAR evaluates screen-conditioned action prediction: given a persona
          and a product screen, predict the action a real user would take. Scores
          are semantic similarity between the predicted action and the action the
          real user actually took, on a 661-row held-out test set. Higher is
          better.
        </>
      }
    >
      {/* Leaderboard */}
      <div className="mb-4 overflow-hidden rounded-lg border" style={{ borderColor: "#1F1A12" }}>
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="text-text-tertiary" style={{ backgroundColor: "#0B0907" }}>
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Semantic similarity</th>
              <th className="px-4 py-3 font-semibold">% ≥ 0.7</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr
                key={r.model}
                className="border-t"
                style={{
                  borderColor: "#1F1A12",
                  backgroundColor: r.ours ? "rgba(245, 215, 110, 0.06)" : "transparent",
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: r.ours ? GOLD : "#D5D0C4" }}>
                  {r.model}
                </td>
                <td className="px-4 py-3 text-text-secondary">{r.kind}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: r.ours ? GOLD : "#D5D0C4" }}>
                  {r.score}
                </td>
                <td className="px-4 py-3 text-text-secondary">{r.clears}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-12 text-[12.5px] text-text-tertiary">
        Eval set: 661-row PiSAR held-out split · baselines evaluated zero-shot ·
        “% ≥ 0.7” is the share of rows clearing the quality bar (1–2% is the
        combined baseline figure). Submitted May 28, 2026.
      </p>

      <SciSection title="What the table shows">
        <p>
          A task-specific fine-tune of an 8B vision-language model beats far
          larger frontier models used zero-shot — by a wide margin on both
          average similarity and the share of predictions that actually clear the
          quality bar.
        </p>
        <p>
          The last row is the honest part. The <em>same</em> training recipe
          applied to a larger reasoning-tuned model (Gemma-4-26B-A4B-IT) reaches
          only 0.441 — below the zero-shot frontier. We call this a
          recipe-vs-model mismatch: the bigger reasoning-tuned model resists
          displacement and would need more data or a stronger method to move.
          Fine-tuning is not free lift; the architecture and recipe have to match.
        </p>
      </SciSection>

      <SciSection title="Run your model on PiSAR">
        <p>
          The benchmark is meant to be contested. If you have a model — frontier,
          open, or fine-tuned — evaluate it on the PiSAR held-out split and send
          us the number; we&apos;ll add it to this table with a link to your
          method. Email{" "}
          <a href="mailto:rahul.bissa@apriori.work" className="transition-colors hover:text-text-primary" style={{ color: GOLD }}>
            rahul.bissa@apriori.work
          </a>
          .
        </p>
      </SciSection>

      <PaperLinks />
    </ScienceShell>
  );
}
