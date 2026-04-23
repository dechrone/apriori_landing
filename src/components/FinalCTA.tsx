"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 border-t border-border-subtle relative overflow-hidden"
    >
      {/* Subtle warm gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(184, 134, 11, 0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[960px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
            Run your first 50-user simulation. Free.
          </h2>
          <p className="text-text-secondary mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            Upload your screens, tell us the goal and audience, get a usability report in minutes. No card required.
          </p>

          <a
            href="/signup"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: "#B8860B" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#9A7209")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
          >
            Run a Free Simulation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <p className="mt-8 text-xs" style={{ color: "#9C9488" }}>
            Working with design partners in fintech and consumer apps.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
