import Link from "next/link";

export const metadata = {
  title: "Trust & data handling | Apriori",
  description:
    "How Apriori handles your data: no shared-model training on your screens, encryption in transit, a named subprocessor list, and a DPA available on request.",
};

const GOLD = "#F5D76E";

/* NOTE (internal): this page states only what is true today. SOC 2 is not
   claimed because the program has not started. Before relying on it in a
   procurement context, confirm the subprocessor list and encryption details
   against current infrastructure. */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t pt-8" style={{ borderColor: "#1F1A12" }}>
      <h2 className="mb-3 text-[18px] font-semibold text-text-primary">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  );
}

export default function TrustPage() {
  return (
    <div className="landing-dark" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <main className="mx-auto max-w-[760px] px-6 pb-28 pt-28 md:px-10 md:pt-32">
        <div
          className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: GOLD }}
        >
          Trust
        </div>
        <h1
          className="mb-5 text-text-primary"
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          Your data stays yours.
        </h1>
        <p className="mb-12 max-w-[620px] text-[16px] leading-relaxed text-text-secondary">
          Apriori simulates your product with synthetic personas. The screens and
          flows you upload are inputs to your own runs — not training data for a
          shared model. Here is exactly how we handle them.
        </p>

        <div className="space-y-10">
          <Section title="No shared-model training on your data">
            <p>
              We do not train shared or public models on your uploaded screens,
              flows, or simulation results. Your assets are used to run the
              simulations you request and to render your reports — nothing else.
            </p>
          </Section>

          <Section title="Encryption">
            <p>
              All traffic to and from Apriori is served over HTTPS/TLS. Your
              account data and assets are stored on managed cloud infrastructure
              (Supabase Postgres + object storage).
            </p>
          </Section>

          <Section title="Subprocessors">
            <p>
              We rely on a small set of infrastructure and model providers to run
              the product. The core subprocessors are:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Supabase — database, auth, and asset storage</li>
              <li>Model providers used to run simulations (e.g. OpenRouter, OpenAI, Anthropic)</li>
            </ul>
            <p>The full, current subprocessor list is available on request.</p>
          </Section>

          <Section title="Data processing agreement (DPA)">
            <p>
              A DPA is available on request for teams that need one for
              procurement. Reach us at{" "}
              <a href="mailto:rahul.bissa@apriori.work" className="transition-colors hover:text-text-primary" style={{ color: GOLD }}>
                rahul.bissa@apriori.work
              </a>
              .
            </p>
          </Section>

          <Section title="Compliance">
            <p>
              We are an early-stage company and are transparent about where we
              are: we have not begun a formal SOC 2 program, and we do not claim
              certifications we do not hold. We will update this page as that
              changes.
            </p>
          </Section>

          <Section title="Questions">
            <p>
              For anything not covered here, email{" "}
              <a href="mailto:rahul.bissa@apriori.work" className="transition-colors hover:text-text-primary" style={{ color: GOLD }}>
                rahul.bissa@apriori.work
              </a>{" "}
              or read the{" "}
              <Link href="/research" className="transition-colors hover:text-text-primary" style={{ color: GOLD }}>
                research behind the model
              </Link>
              .
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}
