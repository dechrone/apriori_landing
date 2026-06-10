"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "How is this different from user testing or analytics?",
    answer: "Analytics shows where users drop off. We show why. User testing gives you 5-10 opinions in weeks. We give you 50+ diverse perspectives in a day. We are not a replacement for either. We are a fast, cheap pre-filter that tells you where to focus your deeper research.",
  },
  {
    question: "How accurately can Apriori simulate my target audience?",
    answer: "Very. You describe your target audience and Apriori builds a panel of distinct personas drawn from real demographic and behavioral data — not one averaged-out user. Each persona reasons through your flow the way that segment actually would, so the predicted convert/drop-off patterns line up closely with real analytics for the same product.",
  },
  {
    question: "How does Apriori compare to frontier AI models?",
    answer: (
      <>
        In our published research, Apriori predicted real-world user behavior up
        to <strong style={{ color: "#F5D76E", fontWeight: 600 }}>40&times; more accurately</strong>{" "}
        than frontier models prompted to role-play the same users. General LLMs
        collapse toward a single &ldquo;average&rdquo; persona and miss the
        segment-level friction that drives drop-off &mdash; our simulation engine
        preserves that variance. Read the full methodology and benchmarks in our{" "}
        <a
          href="/research"
          className="underline underline-offset-2 transition-colors"
          style={{ color: "#F5D76E" }}
        >
          research
        </a>
        .
      </>
    ),
  },
  {
    question: "What is lever analysis, and why does it matter?",
    answer:
      "When you A/B test variants, most tools only tell you that B beat A. Lever analysis goes deeper: Apriori breaks each screen into its underlying levers — the individual design and copy choices like the headline, CTA wording, social proof, pricing layout, or trust badges — and isolates which specific lever (or combination of levers) actually moved conversion, and for which segment. Instead of a black-box winner, you learn the exact why behind the lift, so you can carry the winning lever into your other flows with confidence.",
  },
  {
    question: "What do you need from us to start?",
    answer: "Product flow screenshots and a brief on your target audience. That is it. First simulation results come back within 24 hours.",
  },
];

export function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      ref={containerRef}
      className="py-20 md:py-28 border-t border-border-subtle scroll-mt-20"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
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
            Common questions.
          </h2>
        </motion.div>

        {/* FAQ Items - collapsible with arrows */}
        <div className="divide-y divide-border-subtle border-t border-b border-border-subtle">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left group cursor-pointer"
                >
                  <h3
                    className="text-[15px] font-medium transition-colors duration-200"
                    style={{ color: isOpen ? "#F5D76E" : "#F5E6A8" }}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown
                      size={18}
                      className="transition-colors duration-200"
                      style={{ color: isOpen ? "#F5D76E" : "#7A7368" }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-text-secondary leading-relaxed max-w-[600px] pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
