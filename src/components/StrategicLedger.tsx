"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, CheckCircle, Clock, Archive, Zap } from "lucide-react";
import { Badge } from "./ui/Badge";
import { GlassCard } from "./ui/GlassCard";
import { CONTENT } from "@/config/content";

const statusConfig: Record<string, { variant: "success" | "amber" | "warning" | "muted"; icon: typeof CheckCircle }> = {
  LIVE: { variant: "success", icon: Zap },
  IMPLEMENTED: { variant: "amber", icon: CheckCircle },
  ACTIVE: { variant: "amber", icon: Clock },
  VALIDATED: { variant: "success", icon: CheckCircle },
  ARCHIVED: { variant: "muted", icon: Archive },
};

export function StrategicLedger() {
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
          background: "radial-gradient(ellipse at 20% 50%, rgba(245, 158, 11, 0.03) 0%, transparent 60%)",
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
          <h2 className="text-h2 text-text-primary max-w-[700px] mx-auto mb-4">
            {CONTENT.ledger.heading}
          </h2>
          <p className="text-large text-text-secondary max-w-[700px] mx-auto">
            {CONTENT.ledger.subheading}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Timeline Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute left-4 md:left-10 top-0 bottom-0 w-1 origin-top"
            style={{
              background: "linear-gradient(to bottom, rgba(245, 158, 11, 0.6) 0%, rgba(245, 158, 11, 0.2) 100%)",
              borderRadius: "2px",
            }}
          />

          {/* Timeline Entries */}
          <div className="space-y-8">
            {CONTENT.ledger.entries.map((entry, index) => {
              const status = statusConfig[entry.status] || statusConfig.ARCHIVED;
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={entry.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-2 md:left-8 top-6 w-4 h-4 rounded-full bg-amber border-4 border-deep z-10" />

                  {/* Entry Card */}
                  <GlassCard 
                    hover 
                    padding="lg"
                    className="border-l-[3px] border-l-amber/50"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <span className="text-tiny text-text-tertiary uppercase tracking-wider font-medium">
                        {entry.date}
                      </span>
                      <Badge 
                        variant={status.variant} 
                        icon={<StatusIcon size={12} />}
                      >
                        {entry.status}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {entry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-4">
                      {entry.description}
                    </p>

                    {/* Metric */}
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp size={16} className="text-amber shrink-0" />
                      <span className="text-amber font-medium">{entry.metric}</span>
                    </div>
                  </GlassCard>

                  {/* Connector Text (between entries) */}
                  {index === 0 && CONTENT.ledger.entries.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute -bottom-6 left-12 md:left-20 text-tiny text-text-tertiary italic"
                    >
                      {Math.abs(
                        parseInt(CONTENT.ledger.entries[0].date.match(/\d+/)?.[0] || "0") -
                        parseInt(CONTENT.ledger.entries[1].date.match(/\d+/)?.[0] || "0")
                      )} weeks of compounding strategic clarity
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 ml-12 md:ml-20 p-4 rounded-lg bg-amber-dim border border-amber/20 text-center"
          >
            <p className="text-sm text-amber font-medium">
              Your Strategic Moat Compounds Over Time
            </p>
            <p className="text-tiny text-text-tertiary mt-1">
              Every simulation adds to your institutional decision memory
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

