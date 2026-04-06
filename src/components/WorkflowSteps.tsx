"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Share your flow",
    description: "Send us your product screens and tell us who your target users are.",
  },
  {
    number: 2,
    title: "We simulate",
    description: "We run diverse personas through your flow and capture what each one thinks, feels, and decides at every screen.",
  },
  {
    number: 3,
    title: "You decide with evidence",
    description: "Get cohort-level analysis: which user types convert, which drop off, and exactly why. Per segment, per screen.",
  },
];

export function WorkflowSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-20 md:py-28 border-t border-border-subtle scroll-mt-20"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2
            className="text-text-primary"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Three steps. Results in a day.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
              className="group flex flex-col p-6 rounded-lg border transition-all duration-300 cursor-default"
              style={{ borderColor: "transparent", backgroundColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E8E2D8";
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(184, 134, 11, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-4"
                style={{
                  backgroundColor: "rgba(184, 134, 11, 0.08)",
                  color: "#B8860B",
                }}
              >
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
