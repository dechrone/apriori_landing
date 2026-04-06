"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is this different from user testing or analytics?",
    answer: "Analytics shows where users drop off. We show why. User testing gives you 5-10 opinions in weeks. We give you 50+ diverse perspectives in a day. We are not a replacement for either. We are a fast, cheap pre-filter that tells you where to focus your deeper research.",
  },
  {
    question: "How accurate are the simulations?",
    answer: "We do not claim to replicate full human behavior. Within a specific product context, we simulate how different user segments make decisions with high fidelity. The best way to test it: run a simulation on a flow where you already have real analytics, and compare. If we flag the same friction points your data shows, you know it works.",
  },
  {
    question: "What do you need from us to start?",
    answer: "Product flow screenshots and a brief on your target audience. That is it. First simulation results come back within 24 hours.",
  },
  {
    question: "What does it cost?",
    answer: "First simulation is free. After that, pay-per-simulation at 10K INR or a monthly retainer at 50K INR for unlimited runs.",
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
                    style={{ color: isOpen ? "#B8860B" : "#1A1714" }}
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
                      style={{ color: isOpen ? "#B8860B" : "#9C9488" }}
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
