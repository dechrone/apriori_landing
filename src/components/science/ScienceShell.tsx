import Link from "next/link";

/* Shared shell for the /science hub. Server component — the active tab is
   passed in by each page (no client hooks needed). landing-dark theme. */

const GOLD = "#F5D76E";

const TABS = [
  { label: "Overview", href: "/science" },
  { label: "Benchmark", href: "/science/benchmark" },
  { label: "Method", href: "/science/method" },
  { label: "Limits", href: "/science/limits" },
  { label: "Changelog", href: "/science/changelog" },
];

export function ScienceShell({
  active,
  title,
  intro,
  children,
}: {
  active: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="landing-dark" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <main className="mx-auto max-w-[860px] px-6 pb-28 pt-28 md:px-10 md:pt-32">
        <div
          className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: GOLD }}
        >
          Science
        </div>
        <h1
          className="mb-4 text-text-primary"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mb-8 max-w-[680px] text-[16px] leading-relaxed text-text-secondary">
            {intro}
          </p>
        )}

        {/* Subnav */}
        <nav className="mb-12 flex flex-wrap gap-x-1 gap-y-2 border-b" style={{ borderColor: "#1F1A12" }}>
          {TABS.map((t) => {
            const on = t.href === active;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="border-b-2 px-3 pb-3 text-[14px] font-medium transition-colors"
                style={{
                  color: on ? GOLD : "#B8B0A0",
                  borderColor: on ? GOLD : "transparent",
                  marginBottom: -1,
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </main>
    </div>
  );
}

/* Small shared building blocks for hub pages. */

export function SciSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-[19px] font-semibold text-text-primary">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export function PaperLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="https://arxiv.org/pdf/2605.29400"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md px-4 py-2 text-[13px] font-medium"
        style={{ backgroundColor: GOLD, color: "#0B0907" }}
      >
        Read the PDF ↗
      </a>
      <Link
        href="/research"
        className="rounded-md border px-4 py-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary"
        style={{ borderColor: "rgba(245, 215, 110, 0.3)" }}
      >
        Paper summary
      </Link>
    </div>
  );
}
