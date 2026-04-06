"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const painPoints = [
  {
    title: "Engineering waste",
    description: "Wrong fixes ship because the diagnosis was wrong. Each iteration costs 2-3 sprints.",
  },
  {
    title: "Slow feedback loops",
    description: "Weeks of interviews and replay analysis to build one hypothesis. Then you still ship on gut feel.",
  },
  {
    title: "No segment clarity",
    description: "Aggregate data hides the fact that different user types fail at different points for different reasons.",
  },
];

export function TheProblem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
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
            Product teams fly blind on the <span style={{ color: "#B8860B" }}>why</span>.
          </h2>
          <p className="text-text-secondary max-w-[600px]" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            Analytics tells you where users drop off. Session replays show you clicks. User interviews give you 5 opinions in 3 weeks. None of them tell you why different types of users behave differently in your flow. That gap costs you engineering cycles, lost users, and wrong bets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              className="group relative p-6 rounded-lg border bg-bg-secondary transition-all duration-300 cursor-default"
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
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-all duration-300"
                style={{ backgroundColor: "rgba(184, 134, 11, 0.2)" }}
              />
              <h3 className="text-sm font-semibold text-text-primary mb-2 pl-3">
                {point.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed pl-3">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
