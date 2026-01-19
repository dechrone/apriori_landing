import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/DemoSection";
import { TheProblem } from "@/components/TheProblem";
import { WorkflowSteps } from "@/components/WorkflowSteps";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-deep">
      {/* Hero Section */}
      <Hero />

      {/* Demo Section */}
      <DemoSection />

      {/* The Problem */}
      <TheProblem />

      {/* Workflow Steps - Three Steps to Bulletproof Decisions */}
      <WorkflowSteps />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <footer className="py-16 border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold text-text-primary">Apriori</span>
                <span className="text-tiny text-text-tertiary">The Simulation Layer</span>
              </div>
              <p className="text-sm text-text-tertiary mb-4">
                Preventing failure before you build. Join 200+ teams who've saved $50M+ in failed launches.
              </p>
              <div className="text-tiny text-text-tertiary">
                © {new Date().getFullYear()} Apriori. Building Pre-Build Conviction.
              </div>
            </div>

            {/* Free Tools */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Free Tools</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Belief Collapse Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Risk Assessment Quiz
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Persona Generator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Sample Simulation Report
                  </a>
                </li>
              </ul>
            </div>

            {/* Comparisons */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Comparisons</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    vs UserTesting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    vs Analytics Platforms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    vs A/B Testing Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    vs Traditional Consulting
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Legal & Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-text-tertiary hover:text-amber transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border-subtle">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-text-tertiary">
                <span>SOC 2 Compliant</span>
                <span>•</span>
                <span>GDPR Ready</span>
                <span>•</span>
                <span>Enterprise Security</span>
              </div>
              <div className="text-sm text-text-tertiary">
                Built for founders who refuse to fail
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
