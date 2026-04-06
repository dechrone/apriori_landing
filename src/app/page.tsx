import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/DemoSection";
import { TheProblem } from "@/components/TheProblem";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { WhatYouGet } from "@/components/WhatYouGet";
import { FAQ } from "@/components/FAQ";
import { AboutUs } from "@/components/AboutUs";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="landing-light relative min-h-screen">
      <Hero />
      <TheProblem />
      <WorkflowSteps />
      <WhatYouGet />
      <DemoSection />
      <FAQ />
      <AboutUs />
      <FinalCTA />

      {/* Footer */}
      <footer className="py-16 border-t border-border-subtle">
        <div className="max-w-[960px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div
                className="text-sm font-semibold tracking-[0.15em] uppercase mb-3"
                style={{ color: "#B8860B" }}
              >
                APRIORI
              </div>
              <p className="text-sm text-text-tertiary max-w-[320px] mb-4">
                Built for product teams who ship with evidence.
              </p>
              <div className="text-xs text-text-tertiary">
                &copy; {new Date().getFullYear()} Apriori.
              </div>
            </div>

            <div className="flex gap-16">
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/demo/flent" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      Sample Report
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="mailto:alpha@apriori.work" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      alpha@apriori.work
                    </a>
                  </li>
                  <li>
                    <a href="https://apriori.work" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      apriori.work
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
