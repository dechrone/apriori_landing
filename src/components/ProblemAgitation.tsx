"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, TrendingDown, DollarSign, Clock, ArrowRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

const painPoints = [
  {
    icon: AlertTriangle,
    before: "Months of development wasted on features nobody wants",
    after: "Data-driven decisions before writing a single line of code",
    metric: "67% fewer failed features",
  },
  {
    icon: TrendingDown,
    before: "Users abandon at first friction point, you never know why",
    after: "Predict Belief Collapse before it destroys your conversion",
    metric: "89% drop-off prevention",
  },
  {
    icon: DollarSign,
    before: "Expensive post-launch fixes when trust signals fail",
    after: "Bulletproof onboarding flows validated at scale",
    metric: "$2.3M saved in failed launches",
  },
  {
    icon: Clock,
    before: "Stakeholders argue endlessly about 'gut feelings'",
    after: "Quantified risk scores end decision paralysis",
    metric: "48-hour audit turnaround",
  },
];

export function ProblemAgitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(239, 68, 68, 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-red-400 uppercase tracking-[0.1em] mb-4 block">
            THE COST OF GUESSING
          </span>
          <h2 className="text-h2 text-text-primary max-w-[700px] mx-auto mb-4">
            Every Failed Launch Costs You 6 Months of Runway
          </h2>
          <p className="text-large text-text-secondary max-w-[600px] mx-auto">
            Traditional analytics show you what failed after the damage is done. Apriori prevents failure before you build.
          </p>
        </motion.div>

        {/* Before/After Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {painPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GlassCard padding="lg" className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-red-400" size={20} />
                    </div>
                    <div className="flex-1 space-y-4">
                      {/* Before */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <span className="text-tiny text-red-400 uppercase tracking-wider font-medium">BEFORE</span>
                        </div>
                        <p className="text-sm text-text-secondary line-through opacity-75">
                          {point.before}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex justify-center">
                        <ArrowRight className="text-amber" size={16} />
                      </div>

                      {/* After */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber" />
                          <span className="text-tiny text-amber uppercase tracking-wider font-medium">AFTER</span>
                        </div>
                        <p className="text-sm text-amber font-medium">
                          {point.after}
                        </p>
                      </div>

                      {/* Metric */}
                      <div className="pt-2 border-t border-border-subtle">
                        <div className="text-lg font-semibold text-text-primary">
                          {point.metric}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-text-tertiary mb-6">
            Join the teams that stopped guessing and started simulating
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GlassCard padding="md" className="inline-block bg-amber/5 border-amber/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center">
                  <ArrowRight size={16} className="text-deep" />
                </div>
                <span className="text-amber font-medium">See your risk profile →</span>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
