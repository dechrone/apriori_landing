"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const painPoints = [
  {
    title: "Rework eats your margin",
    description:
      "On fixed-bid projects, every “client wants it different” rebuild is pure margin loss. One prevented redo pays for Apriori across the whole project.",
  },
  {
    title: "Knowing what to build is the gap",
    description:
      "AI has made building 10x faster, but what to build still remains unsolved. Having your target audience at your fingertips solves that bottleneck.",
  },
  {
    title: "You win deals you’d otherwise lose",
    description:
      "“We validate flows against your audience before building” beats “we’ll build what you ask.” Apriori isn’t just a tool. It’s a line in your pitch that wins the project.",
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
            You&apos;re billing to build it <span style={{ color: "#F5D76E" }}>twice</span>.
          </h2>
          <p className="text-text-secondary max-w-[640px]" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            AI made building fast. Knowing <em>what</em> to build is still guesswork, and on fixed-bid work, every wrong guess comes out of your margin. You design the flow, the client second-guesses it, you rebuild, you defend it in review on gut feel. Apriori lets you test a flow against a replica of your client&apos;s target audience before engineering touches it, so you ship the right thing the first time, and win approval with evidence, not opinions.
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
              style={{ borderColor: "#1F1A12", backgroundColor: "#0B0907" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.35)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(245, 215, 110, 0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1F1A12";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-all duration-300"
                style={{ backgroundColor: "rgba(245, 215, 110, 0.3)" }}
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
