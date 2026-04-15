"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "./HeroVideo";

const DEMO_VIDEO_ID = "txmtrfhLERg";

export function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 border-t border-border-subtle"
      style={{ backgroundColor: "#F8F6F1" }}
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
            className="text-text-primary mb-4"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            See it in action.
          </h2>
          <p className="text-text-secondary max-w-[600px]" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            We ran a simulation on a rent payment app with 50 personas. The result: their onboarding assumes every tenant has a formal rental agreement. Outside metro premium apartments, that does not exist. 12% of users drop off at that single step.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <HeroVideo videoId={DEMO_VIDEO_ID} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="/demo/univest"
            className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
            style={{ color: "#B8860B" }}
          >
            View Full Report
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
