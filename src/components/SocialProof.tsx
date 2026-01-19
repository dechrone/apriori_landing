"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, TrendingUp } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { CONTENT } from "@/config/content";

const testimonials = [
  {
    quote: "We were 3 weeks from launch when Apriori flagged a 67% conversion risk in our pricing page. Fixed it, saved our quarter.",
    author: "Sarah Chen",
    role: "CEO, NexGen Finance",
    metric: "67% risk reduction",
    avatar: "SC",
  },
  {
    quote: "Traditional user testing missed our fatal flaw. Apriori caught it with 94.2% accuracy before we spent $200K on development.",
    author: "Marcus Rodriguez",
    role: "CTO, Velocity Pay",
    metric: "$200K saved",
    avatar: "MR",
  },
  {
    quote: "We ran 5 competing onboarding flows through their simulation. The winner outperformed our gut instinct by 40%.",
    author: "Jennifer Walsh",
    role: "Head of Product, Blink Money",
    metric: "40% better conversion",
    avatar: "JW",
  },
];

export function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 border-y border-border-subtle"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-[0.1em] mb-4">
            {CONTENT.socialProof.heading}
          </h3>
          <p className="text-large text-text-secondary max-w-[600px] mx-auto">
            Real founders, real results. Join the teams who've prevented failure before it happened.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <GlassCard padding="lg" className="h-full relative">
                {/* Quote Icon */}
                <Quote className="text-amber/30 w-8 h-8 mb-4" />

                {/* Quote */}
                <blockquote className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center text-amber font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-tiny text-text-tertiary">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Metric */}
                <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    {testimonial.metric}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8"
        >
          {CONTENT.socialProof.companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + 0.1 * index }}
              className="group flex flex-col items-center gap-1"
            >
              {/* Company Name as Logo Placeholder */}
              <div className="relative px-6 py-3 rounded-lg transition-all duration-300 group-hover:bg-elevated/30">
                <span className="text-lg md:text-xl font-semibold text-text-tertiary opacity-40 group-hover:opacity-70 group-hover:text-text-secondary transition-all duration-300 grayscale group-hover:grayscale-0">
                  {company.name}
                </span>
              </div>

              {/* Badge if exists */}
              {company.badge && (
                <span className="text-[10px] text-amber uppercase tracking-wider font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {company.badge}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8 border-t border-border-subtle"
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber mb-1">200+</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider">Teams Protected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber mb-1">$50M+</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider">Capital Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber mb-1">94.2%</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber mb-1">48hrs</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider">Average Turnaround</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

