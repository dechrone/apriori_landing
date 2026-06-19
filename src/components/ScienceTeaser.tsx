"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GOLD = "#F5D76E";

export function ScienceTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-t py-20 md:py-28" style={{ borderColor: "#1F1A12" }}>
      <div className="mx-auto max-w-[960px] px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
            The science
          </span>
          <h2
            className="mb-4 mt-4 text-text-primary"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            Our model <span style={{ color: GOLD }}>out-simulates the frontier</span>.
          </h2>
          <p className="mb-8 max-w-[640px] text-text-secondary" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            On screen-conditioned action prediction, our fine-tuned 8B reaches{" "}
            <strong className="text-text-primary">0.783</strong> semantic similarity vs{" "}
            <strong className="text-text-primary">0.459</strong> (Claude Opus 4.7) and{" "}
            <strong className="text-text-primary">0.482</strong> (GPT-5.5).{" "}
            <strong className="text-text-primary">79%</strong> of held-out cases clear the bar,
            versus <strong className="text-text-primary">1–2%</strong> for frontier baselines. We
            published the benchmark, the method, and the limits.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium"
              style={{ backgroundColor: GOLD, color: "#0A0A0A" }}
            >
              Read the paper
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/science/benchmark"
              className="group inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: GOLD }}
            >
              See the benchmark
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
