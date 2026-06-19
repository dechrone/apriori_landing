import { ScienceShell, SciSection, PaperLinks } from "@/components/science/ScienceShell";

export const metadata = {
  title: "What simulations can and can't do | Apriori Science",
  description:
    "An honest account of where Apriori's simulations are strong, where they are directional, and where they should not replace live research — including what our own paper shows doesn't transfer.",
};

export default function LimitsPage() {
  return (
    <ScienceShell
      active="/science/limits"
      title="What simulations can and can't do"
      intro={
        <>
          The fastest way to lose a product team&apos;s trust is to oversell.
          Here is the honest version: what to use Apriori for, what to read as
          directional, and what it should not replace.
        </>
      }
    >
      <SciSection title="What it does well">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="text-text-primary">Finds where and why users hesitate.</strong>{" "}
            Across a flow, it surfaces the screens and steps that lose
            specific persona types, with the reasoning behind each drop-off — the
            &ldquo;why&rdquo; that analytics and session replay can&apos;t give you.
          </li>
          <li>
            <strong className="text-text-primary">Compares variants before you build.</strong>{" "}
            Directional A/B reads on copy, layout, pricing, and flow order in
            hours, against a consistent synthetic audience.
          </li>
          <li>
            <strong className="text-text-primary">Segments the result.</strong>{" "}
            Which cohorts convert, which bounce, and what drives each — instead of
            an aggregate that hides the disagreement.
          </li>
        </ul>
      </SciSection>

      <SciSection title="Where it is directional, not deterministic">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="text-text-primary">Predicted, not measured.</strong>{" "}
            Our accuracy is semantic similarity on next-action prediction — a
            strong proxy for behaviour, not a guarantee of your live conversion
            rate. Treat outputs as evidence and hypotheses, not a forecast to
            bank revenue on.
          </li>
          <li>
            <strong className="text-text-primary">As good as the persona inputs.</strong>{" "}
            Simulations reflect the audience you describe. A misjudged audience
            produces a confident, wrong answer.
          </li>
          <li>
            <strong className="text-text-primary">Sample size matters.</strong>{" "}
            A 5-persona run is an early directional signal; quantitative claims
            need larger runs. We label small samples as directional in the reports
            themselves.
          </li>
        </ul>
      </SciSection>

      <SciSection title="What our own paper shows doesn't transfer">
        <p>
          We benchmark this in the open. The fine-tuning recipe that takes
          Qwen3-VL-8B to 0.783 does <em>not</em> transfer to every model — applied
          to a larger reasoning-tuned model (Gemma-4-26B-A4B-IT) it reaches only
          0.441, below the zero-shot frontier. Gains are tied to the
          architecture-and-recipe match, not guaranteed by scale. The benchmark is
          one task on one held-out test set; other tasks and audiences may behave
          differently.
        </p>
      </SciSection>

      <SciSection title="What it should not replace">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="text-text-primary">High-stakes, irreversible calls.</strong>{" "}
            For decisions where being wrong is expensive — pricing you can&apos;t
            walk back, regulatory or safety-critical flows — use simulation to
            narrow the options, then confirm with live users.
          </li>
          <li>
            <strong className="text-text-primary">The final word on a launch.</strong>{" "}
            Simulation tells you where to look and what to fix first. Real-world
            measurement still settles the question.
          </li>
        </ul>
        <p>
          Used this way — fast directional evidence that focuses expensive live
          research — simulation earns its place in the loop. Overused as an oracle,
          it doesn&apos;t. We would rather you trust the numbers you can check.
        </p>
      </SciSection>

      <PaperLinks />
    </ScienceShell>
  );
}
