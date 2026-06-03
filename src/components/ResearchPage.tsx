"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PDF_URL = "https://arxiv.org/pdf/2605.29400";
const ABS_URL = "https://arxiv.org/abs/2605.29400";

const authors = ["Rahul Bissa", "Abhishek Vyas", "Yash Jain"];

const highlights = [
  {
    metric: "0.783",
    label: "Fine-tuned Qwen3-VL-8B-Instruct semantic similarity — up from 0.459 (Claude Opus 4.7) and 0.482 (GPT-5.5) zero-shot.",
  },
  {
    metric: "79%",
    label: "Share of test rows clearing the 0.7 similarity threshold after fine-tuning, versus 1–2% for frontier baselines.",
  },
  {
    metric: "12,929",
    label: "PiSAR tuples sourced from app reviews, demographic data, and shopping traces; a 661-row held-out test set.",
  },
];

export function ResearchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <main className="landing-dark relative min-h-screen bg-black">
      <section ref={containerRef} className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-[820px] mx-auto px-6 md:px-16">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "#F5D76E" }}
            >
              Research · arXiv:2605.29400
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-text-primary mb-6"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Architecture-Sensitive Supervised Fine-Tuning for Screen-Conditioned
            Action Prediction: A PiSAR Benchmark
          </motion.h1>

          {/* Authors + date */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <p className="text-sm text-text-secondary">
              {authors.join(" · ")}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Submitted May 28, 2026
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3 mb-12"
          >
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-4 py-2 rounded-md border transition-colors"
              style={{
                color: "#0B0907",
                backgroundColor: "#F5D76E",
                borderColor: "#F5D76E",
              }}
            >
              Read the PDF ↗
            </a>
            <a
              href={ABS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-4 py-2 rounded-md border transition-colors text-text-secondary hover:text-text-primary"
              style={{ borderColor: "rgba(245, 215, 110, 0.3)" }}
            >
              View on arXiv
            </a>
          </motion.div>

          {/* Abstract */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-4">
              Abstract
            </h2>
            <div className="space-y-5">
              <p className="text-text-secondary" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
                We study supervised fine-tuning for screen-conditioned action
                prediction — given a persona and a product screen, predicting the
                action a real user would take. We introduce <strong className="text-text-primary">PiSAR</strong>,
                a dataset of 12,929 tuples drawn from app reviews, demographic
                data, and shopping traces, and evaluate fine-tuned models against
                frontier zero-shot baselines on a 661-row held-out test set.
              </p>
              <p className="text-text-secondary" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
                Frontier baselines — Claude Opus 4.7 and GPT-5.5 — reach semantic
                similarity scores of 0.459 and 0.482. A fine-tuned
                Qwen3-VL-8B-Instruct reaches 0.783, with 79% of rows clearing the
                0.7 threshold versus 1–2% for the baselines. The same training
                recipe applied to Gemma-4-26B-A4B-IT yields only 0.441 — evidence
                of a <em>recipe-vs-model mismatch</em>: the reasoning-tuned,
                high-parameter model resists displacement and would need more data
                or a stronger fine-tuning method to move.
              </p>
            </div>
          </motion.div>

          {/* Key results */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-5">
              Key results
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.metric}
                  className="p-5 rounded-lg border"
                  style={{ borderColor: "#1F1A12", backgroundColor: "#0B0907" }}
                >
                  <div
                    className="text-2xl font-semibold mb-2"
                    style={{ color: "#F5D76E", letterSpacing: "-0.02em" }}
                  >
                    {h.metric}
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Citation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-border-subtle"
          >
            <p className="text-xs text-text-tertiary leading-relaxed">
              Bissa, R., Vyas, A., &amp; Jain, Y. (2026). Architecture-Sensitive
              Supervised Fine-Tuning for Screen-Conditioned Action Prediction: A
              PiSAR Benchmark. <em>arXiv:2605.29400</em>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
