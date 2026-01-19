"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileInput, Brain, Target } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { CONTENT } from "@/config/content";

const stepIcons = [FileInput, Brain, Target];

export function WorkflowSteps() {
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
          background: "radial-gradient(ellipse at 30% 30%, rgba(245, 158, 11, 0.02) 0%, transparent 50%)",
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
          <h2 className="text-h2 text-text-primary mb-4">
            {CONTENT.workflow.heading}
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full origin-left"
              style={{
                background: "linear-gradient(to right, rgba(245, 158, 11, 0.5) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(245, 158, 11, 0.5) 100%)",
              }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {CONTENT.workflow.steps.map((step, index) => {
              const Icon = stepIcons[index];
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative flex flex-col items-center h-full"
                >
                  {/* Step Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`
                      relative z-10 w-12 h-12 rounded-full
                      flex items-center justify-center
                      text-2xl font-semibold
                      transition-colors duration-300
                      ${index === CONTENT.workflow.steps.length - 1 
                        ? "bg-amber text-deep" 
                        : "bg-amber-dim border-2 border-amber text-amber"
                      }
                    `}
                  >
                    {step.number}
                  </motion.div>

                  {/* Card */}
                  <GlassCard 
                    padding="lg" 
                    className="mt-6 w-full text-center h-full flex flex-col"
                    hover
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-amber-dim flex items-center justify-center mx-auto mb-4">
                      <Icon size={20} className="text-amber" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary flex-1">
                      {step.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

