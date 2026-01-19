"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Users, MessageSquare, AlertTriangle, DollarSign, Code, Clock, TrendingDown } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

const decisionMethods = [
  {
    icon: Brain,
    title: "Intuition",
    description: "Gut feelings and hunches guide critical product decisions",
  },
  {
    icon: Users,
    title: "Experience",
    description: "Past successes applied to new contexts without validation",
  },
  {
    icon: MessageSquare,
    title: "Debates",
    description: "Endless discussions with no data to resolve disagreements",
  },
];

const costs = [
  {
    icon: DollarSign,
    title: "Wasted CAC",
    description: "Customer acquisition costs spent on features that fail to convert",
  },
  {
    icon: Code,
    title: "Engineering Burn",
    description: "Months of development time and resources invested in wrong solutions",
  },
  {
    icon: Clock,
    title: "Time Wasted",
    description: "Opportunity cost of delayed launches and missed market windows",
  },
];

export function TheProblem() {
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
          background: "radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.02) 0%, transparent 60%)",
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
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-[0.1em] mb-4 block">
            THE PROBLEM
          </span>
          <h2 className="text-h2 text-text-primary max-w-[800px] mx-auto mb-6">
            High-Stakes Decisions Made Without Data
          </h2>
          <p className="text-large text-text-secondary max-w-[700px] mx-auto">
            Companies rely on intuition, experience, and debates to make irreversible product decisions. The cost of being wrong can break startups.
          </p>
        </motion.div>

        {/* Decision Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-h3 text-text-primary mb-8 text-center">
            How Decisions Are Made Today
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {decisionMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard padding="lg" className="h-full text-center">
                    <div className="w-12 h-12 rounded-lg bg-amber-dim flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-amber" />
                    </div>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">
                      {method.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {method.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Irreversible Decisions Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <GlassCard padding="lg" className="border-amber/30 bg-amber-dim/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-amber" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Irreversible Decisions
                </h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Pricing models, onboarding flows, trust architecture—once implemented, these decisions are costly to reverse. 
                  Each wrong choice compounds, draining resources and eroding runway. For startups operating on limited capital, 
                  a single misstep can be fatal.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* The Cost of Being Wrong */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-h3 text-text-primary mb-8 text-center">
            The Cost of Being Wrong
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {costs.map((cost, index) => {
              const Icon = cost.icon;
              return (
                <motion.div
                  key={cost.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <GlassCard padding="lg" className="h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-text-primary mb-2">
                          {cost.title}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {cost.description}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border-subtle">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-tertiary uppercase tracking-wider">
                          Impact
                        </span>
                        <TrendingDown size={16} className="text-red-400" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <GlassCard padding="lg" className="bg-elevated/30 border-border-emphasis">
            <p className="text-lg text-text-primary font-medium">
              Startups break when irreversible decisions are made without validation. 
              The question isn't whether you'll make mistakes—it's whether you'll survive them.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
