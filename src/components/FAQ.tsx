"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Target, Zap } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";

const faqs = [
  {
    question: "How is this different from user testing or analytics?",
    answer: "Traditional testing shows you what users do. We simulate what they think. While analytics tells you the 'what' after failure, we predict the 'why' before you build. It's the difference between autopsy and prevention.",
    icon: Target,
  },
  {
    question: "What if my idea is completely wrong?",
    answer: "Then you'd rather know before spending 6 months of runway. Most founders discover their core assumptions are wrong at the validation stage. We accelerate that timeline from months to days.",
    icon: Cpu,
  },
  {
    question: "Do you guarantee results?",
    answer: "We guarantee you'll see risks you never considered. Results depend on execution, but every client uncovers at least 3 critical Belief Collapse points they would have discovered the expensive way.",
    icon: Zap,
  },
  {
    question: "What's your accuracy like?",
    answer: "94.2% detection accuracy across 200+ simulations. We're not psychic—we're systematic. Every recommendation is backed by behavioral data from 1M+ synthetic personas.",
    icon: Target,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, rgba(148, 163, 184, 0.02) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-[800px] mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-[0.1em] mb-4 block">
            COMMON OBJECTIONS
          </span>
          <h2 className="text-h2 text-text-primary max-w-[600px] mx-auto mb-4">
            The Questions Keeping You Up at Night
          </h2>
          <p className="text-large text-text-secondary max-w-[500px] mx-auto">
            We get it. This sounds too good to be true. Here are the real answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <GlassCard padding="none" className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-elevated/30 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isOpen ? 'bg-amber/20' : 'bg-border-emphasis/50 group-hover:bg-amber/10'
                      }`}>
                        <Icon
                          size={16}
                          className={`transition-colors duration-200 ${
                            isOpen ? 'text-amber' : 'text-text-tertiary group-hover:text-amber'
                          }`}
                        />
                      </div>
                      <h3 className={`text-lg font-medium transition-colors duration-200 ${
                        isOpen ? 'text-amber' : 'text-text-primary group-hover:text-amber'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-colors duration-200 ${
                          isOpen ? 'text-amber' : 'text-text-tertiary group-hover:text-amber'
                        }`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="w-px h-4 bg-border-emphasis mx-auto mb-4" />
                          <p className="text-text-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-amber/5 border border-amber/20">
            <div className="w-6 h-6 rounded-full bg-amber flex items-center justify-center">
              <span className="text-xs font-bold text-deep">?</span>
            </div>
            <span className="text-sm text-amber font-medium">
              Still have questions? <span className="underline hover:no-underline cursor-pointer">Let's chat</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
