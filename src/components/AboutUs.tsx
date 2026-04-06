"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 md:py-28 border-t border-border-subtle scroll-mt-20"
    >
      <div className="max-w-[960px] mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2
            className="text-text-primary mb-6"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            About us.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-text-secondary" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
              We built Apriori because we kept watching the same thing happen. A team spends months building an onboarding flow. They launch. Half the users drop off at step three. Nobody knows why. The data says <em>where</em>, not <em>why</em>. The team guesses, ships a fix, waits another month. Repeat.
            </p>
            <p className="text-text-secondary" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
              We thought: what if you could sit 50 different people in front of your product screens and listen to what each of them is actually thinking? Not aggregate heatmaps. Not five user interviews. Fifty distinct perspectives, each with their own context, biases, and decision logic. And what if you could do that before you write a single line of code?
            </p>
            <p className="text-text-primary font-medium" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
              That is what Apriori does. We simulate the humans your product will meet, so you can build for how they actually think.
            </p>
          </motion.div>

          {/* Team & credentials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: "#E8E2D8", backgroundColor: "#FDFCFA" }}
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3">The team</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                Founded by IIT Delhi alumni with backgrounds in product engineering at Microsoft and consumer fintech. We have spent years watching product teams make decisions in the dark. Apriori is our answer.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                We are based in India, building for product teams globally.
              </p>
            </div>

            <div
              className="p-6 rounded-lg border"
              style={{ borderColor: "#E8E2D8", backgroundColor: "#FDFCFA" }}
            >
              <h3 className="text-sm font-semibold text-text-primary mb-3">What we believe</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: "#B8860B" }}
                  />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Every product decision should be backed by evidence, not authority.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: "#B8860B" }}
                  />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Understanding users is not a luxury for funded teams. It should be fast, cheap, and available to anyone who ships product.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: "#B8860B" }}
                  />
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Honesty compounds. We will always tell you what our simulations can and cannot do.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
