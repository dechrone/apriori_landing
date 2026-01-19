"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { BeliefCollapseModal } from "./BeliefCollapseModal";
import { PERSONAS, Persona } from "@/config/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function PersonaGrid() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
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
          background: "radial-gradient(ellipse at 30% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 50%)",
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
          <span className="text-xs font-semibold text-amber uppercase tracking-[0.1em] mb-4 block">
            PERSONA SIMULATION
          </span>
          <h2 className="text-h2 text-text-primary max-w-[700px] mx-auto mb-4">
            1 Million Synthetic Minds, Testing Your Every Decision
          </h2>
          <p className="text-large text-text-secondary max-w-[600px] mx-auto">
            Each persona represents a distinct decision-making heuristic. Click any card to witness Belief Collapse in action.
          </p>
        </motion.div>

        {/* Persona Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {PERSONAS.map((persona) => (
            <motion.div key={persona.id} variants={itemVariants}>
              <GlassCard
                hover
                padding="md"
                className="h-full flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setSelectedPersona(persona)}
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-amber-dim flex items-center justify-center mb-3 group-hover:bg-amber/20 transition-colors duration-200">
                  <persona.icon size={24} className="text-amber" />
                </div>
                
                {/* Persona Name */}
                <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2">
                  {persona.name}
                </h3>
                
                {/* Descriptor */}
                <p className="text-tiny text-text-tertiary mb-3">
                  {persona.descriptor}
                </p>
                
                {/* Hover Indicator */}
                <motion.span 
                  className="text-tiny text-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1"
                  whileHover={{ x: 2 }}
                >
                  Simulate
                  <span className="text-amber">→</span>
                </motion.span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border-subtle"
        >
          <div className="text-center">
            <div className="text-3xl font-semibold text-text-primary">20+</div>
            <div className="text-tiny text-text-tertiary uppercase tracking-wider mt-1">Core Personas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-text-primary">247</div>
            <div className="text-tiny text-text-tertiary uppercase tracking-wider mt-1">Behavioral Heuristics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-amber">1M+</div>
            <div className="text-tiny text-text-tertiary uppercase tracking-wider mt-1">Variations Simulated</div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedPersona && (
        <BeliefCollapseModal
          persona={selectedPersona}
          onClose={() => setSelectedPersona(null)}
        />
      )}
    </section>
  );
}

