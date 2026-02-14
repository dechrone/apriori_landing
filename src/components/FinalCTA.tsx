"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield, Lock, Clock } from "lucide-react";
import { Button } from "./ui/Button";
import { CONTENT } from "@/config/content";
import { useAuditModal } from "@/contexts/AuditModalContext";

const iconMap: Record<string, typeof Shield> = {
  Shield,
  Lock,
  Clock,
};

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { openAuditModal } = useAuditModal();

  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)",
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-16 text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 md:text-hero text-text-primary max-w-[900px] mx-auto mb-6">
            {CONTENT.finalCTA.heading}
          </h2>
          
          <p className="text-large text-text-secondary max-w-[600px] mx-auto mb-10">
            {CONTENT.finalCTA.subheading}
          </p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
              className="min-w-[280px] text-lg px-10 py-5"
              onClick={openAuditModal}
            >
              {CONTENT.finalCTA.primaryCTA}
            </Button>
          </motion.div>

          {/* Secondary CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-sm text-text-tertiary hover:text-amber cursor-pointer transition-colors duration-200 underline-offset-4 hover:underline"
          >
            {CONTENT.finalCTA.secondaryCTA}
          </motion.p>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 pt-12 border-t border-border-subtle"
          >
            {CONTENT.finalCTA.trustElements.map((element, index) => {
              const Icon = iconMap[element.icon] || Shield;
              
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-text-tertiary"
                >
                  <Icon size={14} className="text-amber" />
                  <span className="text-tiny uppercase tracking-wider font-medium">
                    {element.text}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        >
          <div 
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

