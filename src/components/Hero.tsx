"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { CubeVisualization } from "./CubeVisualization";
import { CONTENT } from "@/config/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)",
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Cube Visualization - Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: "translateY(3%)" }}
      >
        <CubeVisualization className="w-full max-w-[1800px] lg:max-w-[2400px] xl:max-w-[2800px] opacity-50 scale-[1.8]" />
      </motion.div>

      {/* Centered Title Section */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center px-6"
        >
          {/* Headline - Apriori */}
          <motion.h1 
            variants={itemVariants}
            className="text-text-primary font-mono"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "0.1em",
              lineHeight: 1.05,
              fontFamily: "var(--font-mono)",
            }}
          >
            Apriori
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-large text-text-secondary"
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            }}
          >
            High-stakes product decisions made easy
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            variants={itemVariants}
            className="mt-4"
          >
            <a
              href="https://calendly.com/rahulbissa-credigo/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ChevronRight size={20} />}
              >
                {CONTENT.hero.primaryCTA}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-tiny text-text-tertiary uppercase tracking-wider">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-border-emphasis flex justify-center pt-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-amber"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

