import { ScienceShell, SciSection, PaperLinks } from "@/components/science/ScienceShell";

export const metadata = {
  title: "How we measure accuracy | Apriori Science",
  description:
    "Plain-English method behind Apriori's accuracy numbers: screen-conditioned action prediction, semantic similarity, the 0.7 quality bar, held-out evaluation, and why task-specific fine-tuning beats zero-shot personas.",
};

export default function MethodPage() {
  return (
    <ScienceShell
      active="/science/method"
      title="How we measure accuracy"
      intro={
        <>
          A single number like 0.783 means nothing without knowing what it
          measures. Here is the whole method in plain English — no jargon walls —
          so you can decide for yourself whether the claim holds.
        </>
      }
    >
      <SciSection title="The task: screen-conditioned action prediction">
        <p>
          Every claim on this site comes from one task. We give a model two
          things: a description of a person (a persona — their demographics,
          context, and goals) and a single product screen they are looking at.
          The model has to predict the action that person takes next — tap this,
          scroll past that, abandon here.
        </p>
        <p>
          This is the atomic unit of a product simulation. If a model can predict
          the next action well across thousands of persona-and-screen pairs, it
          can walk a persona through a whole flow and tell you where real users
          would hesitate or drop off.
        </p>
      </SciSection>

      <SciSection title="The data: PiSAR">
        <p>
          We built a dataset called PiSAR — 12,929 persona-screen-action tuples
          drawn from real signal: app reviews, demographic data, and shopping
          traces. From it we hold out a 661-row test set that no model is trained
          on. Every accuracy number is computed on that held-out set, so a model
          can&apos;t score well just by memorising what it has already seen.
          &ldquo;Held-out&rdquo; is the part that makes the number honest.
        </p>
      </SciSection>

      <SciSection title="The metric: semantic similarity, not string match">
        <p>
          Real actions are described in words, and there are many right ways to
          say the same thing — &ldquo;taps Continue&rdquo; and &ldquo;proceeds to
          the next step&rdquo; are the same decision. So we don&apos;t check for
          an exact string match. We measure <strong className="text-text-primary">semantic
          similarity</strong>: how close the <em>meaning</em> of the predicted
          action is to the action the real user actually took, on a 0-to-1 scale.
          1.0 is the same decision; 0.0 is unrelated.
        </p>
      </SciSection>

      <SciSection title="The bar: why 0.7">
        <p>
          Average similarity is one view, but a single average can hide a model
          that is vaguely-right-on-average and decisively-wrong-in-practice. So we
          also report a pass rate: the share of predictions that clear a 0.7
          similarity bar — the point at which a prediction is close enough to count
          as the same decision a real user made. This is the stricter, more
          honest number, because it counts decisions, not vibes.
        </p>
        <p>
          A fine-tuned Qwen3-VL-8B clears 0.7 on 79% of held-out rows. The
          frontier zero-shot baselines clear it on 1–2%. That gap — not the raw
          average alone — is the result.
        </p>
      </SciSection>

      <SciSection title="Why fine-tuning beats zero-shot personas">
        <p>
          A frontier model asked to role-play a persona &ldquo;cold&rdquo; is
          guessing how a demographic behaves from its general training. A model
          fine-tuned on PiSAR has learned the actual mapping from
          persona-and-screen to action from real traces. For this narrow,
          repeated task, the specialised smaller model wins — decisively — over
          much larger general models.
        </p>
        <p>
          But fine-tuning is not automatic lift. Applying the same recipe to a
          larger reasoning-tuned model (Gemma-4-26B-A4B-IT) scores below the
          zero-shot frontier. The recipe and the architecture have to match. We
          report that openly on the{" "}
          <a href="/science/benchmark" style={{ color: "#F5D76E" }}>benchmark</a>{" "}
          and discuss where it doesn&apos;t transfer in{" "}
          <a href="/science/limits" style={{ color: "#F5D76E" }}>limits</a>.
        </p>
      </SciSection>

      <SciSection title="What this number is not">
        <p>
          Semantic similarity on next-action prediction is a strong proxy for
          behavioural fidelity — but it is a proxy, not a guarantee of real-world
          conversion. We treat simulations as directional evidence that finds
          where and why users hesitate, fast and cheaply, before you build. For
          how far that goes and where it stops, read{" "}
          <a href="/science/limits" style={{ color: "#F5D76E" }}>the limits</a>.
        </p>
      </SciSection>

      <PaperLinks />
    </ScienceShell>
  );
}
