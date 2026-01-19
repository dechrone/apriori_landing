"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Target } from "lucide-react";
import { Badge } from "./ui/Badge";
import { CONTENT } from "@/config/content";

const quadrantVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function MatrixQuadrant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Reorder quadrants for correct visual grid layout (top-left, top-right, bottom-left, bottom-right)
  const orderedQuadrants = [
    CONTENT.matrix.quadrants.find(q => q.position === "top-left"),
    CONTENT.matrix.quadrants.find(q => q.position === "top-right"),
    CONTENT.matrix.quadrants.find(q => q.position === "bottom-left"),
    CONTENT.matrix.quadrants.find(q => q.position === "bottom-right"),
  ].filter(Boolean);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 70%, rgba(245, 158, 11, 0.03) 0%, transparent 60%)",
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
          <h2 className="text-h2 text-text-primary max-w-[800px] mx-auto mb-4">
            {CONTENT.matrix.heading}
          </h2>
          <p className="text-large text-text-secondary max-w-[700px] mx-auto">
            {CONTENT.matrix.subheading}
          </p>
        </motion.div>

        {/* Matrix Grid */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Axis Labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center"
          >
            <div className="flex items-center gap-2 text-text-tertiary">
              <span className="text-tiny uppercase tracking-[0.05em] font-medium whitespace-nowrap">
                Low Impact
              </span>
              <div className="w-16 h-px bg-border-emphasis" />
              <span className="text-tiny uppercase tracking-[0.05em] font-medium whitespace-nowrap">
                High Impact
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-8 md:-bottom-12"
          >
            <div className="flex items-center gap-2 text-text-tertiary">
              <span className="text-tiny uppercase tracking-[0.05em] font-medium whitespace-nowrap">
                Reversible
              </span>
              <div className="w-16 h-px bg-border-emphasis" />
              <span className="text-tiny uppercase tracking-[0.05em] font-medium whitespace-nowrap">
                Irreversible
              </span>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-border-subtle rounded-lg overflow-hidden">
            {orderedQuadrants.map((quadrant, index) => {
              if (!quadrant) return null;
              const isApriori = quadrant.isAprioriZone;
              
              return (
                <motion.div
                  key={quadrant.position}
                  custom={index}
                  variants={quadrantVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className={`
                    relative p-6 md:p-8 min-h-[200px] md:min-h-[260px]
                    flex flex-col justify-between
                    transition-all duration-200 cursor-pointer
                    ${isApriori 
                      ? "bg-amber/[0.08] border-2 border-amber shadow-[0_0_40px_rgba(245,158,11,0.15)]" 
                      : "bg-elevated/30 hover:bg-elevated/50 border border-transparent"
                    }
                  `}
                >
                  {/* Apriori Zone Icon */}
                  {isApriori && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ rotate: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <AlertTriangle className="text-amber" size={24} />
                    </motion.div>
                  )}

                  {/* Quadrant Label */}
                  <div className="space-y-1">
                    <span className="text-tiny text-text-tertiary uppercase tracking-wider font-medium">
                      {quadrant.impact} / {quadrant.reversibility}
                    </span>
                    <h3 className={`text-lg font-semibold ${isApriori ? "text-amber" : "text-text-primary"}`}>
                      {quadrant.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary mt-3 flex-grow">
                    {quadrant.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-tiny text-text-tertiary">
                      Tools: {quadrant.tools}
                    </span>
                    
                    {isApriori && (
                      <Badge variant="amber" icon={<Target size={12} />}>
                        Apriori Coverage
                      </Badge>
                    )}
                  </div>

                  {/* Apriori Zone Glow Effect */}
                  {isApriori && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        boxShadow: "inset 0 0 60px rgba(245, 158, 11, 0.1)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Pre-Build Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-8"
          >
            <Badge variant="amber" className="text-sm py-2 px-4">
              Pre-Build Conviction Required for High-Impact Irreversible Decisions
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

