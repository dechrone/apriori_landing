"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const deliverables = [
  {
    title: "Drop-off funnel with reasoning",
    description: "See where users leave and the actual reason behind each drop-off, not just the screen.",
  },
  {
    title: "Persona monologues",
    description: "Read what each synthetic user thought and felt at every screen. The signal is psychological, not cosmetic.",
  },
  {
    title: "Segment-level patterns",
    description: "Which cohorts convert, which ones bounce, and what drives each. Broken down by user type.",
  },
  {
    title: "Design recommendations",
    description: "Prioritized fixes your design team can act on, tagged by effort and expected impact.",
  },
];

export function WhatYouGet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 border-t border-border-subtle"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            className="text-text-primary"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            What you get back.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
              className="group p-6 rounded-lg border bg-bg-secondary transition-all duration-300 cursor-default"
              style={{ borderColor: "#E8E2D8" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B8860B";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(184, 134, 11, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E2D8";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mb-4 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: "#B8860B" }}
              />
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
