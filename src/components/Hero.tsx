"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PersonaField } from "./PersonaField";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 min-h-[85vh] flex items-center overflow-hidden">
      {/* Persona grid on the right - desktop only */}
      <PersonaField />

      <div className="relative z-10 max-w-[960px] mx-auto px-6 md:px-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6 max-w-[460px]"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-text-primary"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
            }}
          >
            Know why users drop off.
            <br />
            <span style={{ color: "#B8860B" }}>Before they do.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-[440px]"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.65,
              color: "#5C554A",
            }}
          >
            AI-powered simulations that show you which users convert, which drop off, and why. In hours, not weeks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-3 mt-2"
          >
            <a
              href="/demo/flent"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: "#B8860B" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9A7209")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            >
              See a Live Report
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:alpha@apriori.work"
              className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-medium text-sm text-text-primary hover:bg-[#F8F6F1] transition-colors duration-200"
              style={{ borderColor: "#D4C9B0" }}
            >
              Run It On Your Flow
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
