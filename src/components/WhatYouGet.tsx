"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, MessageSquareQuote, Users, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const deliverables = [
  {
    id: 1,
    title: "Drop-off funnel",
    date: "PER SCREEN",
    content:
      "See where users leave and the actual reason behind each drop-off, not just the screen.",
    category: "Funnel",
    icon: TrendingDown,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Persona monologues",
    date: "PER USER",
    content:
      "Read what each synthetic user thought and felt at every screen. The signal is psychological, not cosmetic.",
    category: "Voice",
    icon: MessageSquareQuote,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Segment patterns",
    date: "PER COHORT",
    content:
      "Which cohorts convert, which ones bounce, and what drives each. Broken down by user type.",
    category: "Cohorts",
    icon: Users,
    relatedIds: [1, 2, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Design fixes",
    date: "PRIORITIZED",
    content:
      "Prioritized fixes your design team can act on, tagged by effort and expected impact.",
    category: "Recommendations",
    icon: Sparkles,
    relatedIds: [3],
    status: "completed" as const,
    energy: 80,
  },
];

export function WhatYouGet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-24 border-t border-border-subtle"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <RadialOrbitalTimeline
          timelineData={deliverables}
          centerLabel="what you get back"
        />
      </motion.div>
    </section>
  );
}
