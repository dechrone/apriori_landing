"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Linkedin,
  MapPin,
  MessagesSquare,
  Quote,
  Repeat,
  Rocket,
  Sparkles,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const GOLD = "#F5D76E";
const ACCENT = "#E5B84B";
const MUTED = "#B8B0A0";
const DIM = "#7A7368";
const LINE = "rgba(245, 215, 110, 0.20)";

type Metric = { value: string; label: string };

const METRICS: Metric[] = [
  { value: "25%", label: "faster time-to-delivery" },
  { value: "< 3 mo", label: "shipped vs. a 4-month obligation" },
  { value: "$66K", label: "PM salary saved" },
  { value: "3", label: "more projects now adopting Apriori" },
];

type Milestone = {
  phase: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  highlight?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    phase: "Before Apriori",
    title: "A four-month clock, and a job posting",
    body: "Diginix Solutions — a Dubai-based AI product studio — had a client project running on a four-month delivery commitment. To keep pace, they did what most studios do: they opened a role for another Product Manager in Dubai, budgeted at roughly $66,000 a year.",
    Icon: Briefcase,
  },
  {
    phase: "The pitch",
    title: "Do more with the PMs you already have",
    body: "We sat down with Diginix's founder, Priyanshu Joshi, with a different proposal. Before adding headcount, get more out of the team you already have. The real bottleneck wasn't manpower — it was the speed of learning what users actually wanted.",
    Icon: MessagesSquare,
  },
  {
    phase: "Week 1 · Pilot",
    title: "Apriori, dropped into one live project",
    body: "Diginix integrated Apriori into a single active project as a pilot. No process overhaul, no new hire — just Apriori slotted into the team's existing workflow.",
    Icon: Rocket,
  },
  {
    phase: "The unlock",
    title: "Their target audience, on tap",
    body: "Suddenly every PM had a replica of the product's target audience at their fingertips. Ideating on a feature, validating a design, or testing a build no longer meant recruiting a panel, scheduling research, or shipping blind to find out. They could do it in minutes — not weeks or months.",
    Icon: Sparkles,
  },
  {
    phase: "Months 1–3",
    title: "Saved cycles, compounding",
    body: "Each decision that used to cost a research cycle now cost a coffee break. Those saved cycles stacked across the entire product lifecycle, pulling the delivery timeline forward week after week.",
    Icon: Repeat,
  },
  {
    phase: "Month 3 · Shipped",
    title: "A month early, and a hire never made",
    body: "Diginix shipped the project in under three months — against a four-month obligation. A 25% cut in time-to-delivery, the cost of a $66,000 PM hire saved, and a client delivered to ahead of schedule — all without expanding the team.",
    Icon: Trophy,
    highlight: true,
  },
  {
    phase: "Now",
    title: "Rolling out to three more projects",
    body: "On the strength of the pilot, Diginix is integrating Apriori into three more projects — making audience simulation a standing part of how their PMs build.",
    Icon: TrendingUp,
    highlight: true,
  },
];

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl border p-5"
      style={{
        borderColor: "rgba(245, 215, 110, 0.16)",
        background:
          "linear-gradient(180deg, rgba(26, 23, 16, 0.9), rgba(11, 9, 7, 0.9))",
      }}
    >
      <div
        className="text-[28px] font-bold leading-none md:text-[32px]"
        style={{ color: GOLD, letterSpacing: "-0.02em" }}
      >
        {metric.value}
      </div>
      <div className="mt-2 text-[12px] leading-snug" style={{ color: DIM }}>
        {metric.label}
      </div>
    </motion.div>
  );
}

function TimelineNode({ milestone }: { milestone: Milestone }) {
  const { Icon } = milestone;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="relative pl-16 pb-12 last:pb-0"
    >
      {/* Node marker on the run-through line */}
      <span
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: milestone.highlight
            ? "linear-gradient(135deg, #F5D76E, #E5B84B)"
            : "#0B0907",
          border: milestone.highlight
            ? "none"
            : "1px solid rgba(245, 215, 110, 0.3)",
          boxShadow: milestone.highlight
            ? "0 0 24px rgba(245, 215, 110, 0.3)"
            : "none",
        }}
      >
        <Icon size={19} style={{ color: milestone.highlight ? "#1A1710" : ACCENT }} />
      </span>

      <div
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: ACCENT }}
      >
        {milestone.phase}
      </div>
      <h3
        className="mb-3 text-[20px] leading-snug md:text-[22px]"
        style={{ color: "#F5E6A8", fontWeight: 600, letterSpacing: "-0.01em" }}
      >
        {milestone.title}
      </h3>
      <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
        {milestone.body}
      </p>
    </motion.div>
  );
}

export function DiginixStory() {
  return (
    <div className="landing-dark" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(245, 215, 110, 0.08) 0%, transparent 70%)",
        }}
      />

      <main className="relative mx-auto max-w-[760px] px-6 pb-28 pt-24 md:pt-28">
        {/* Back link */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
          style={{ color: DIM }}
        >
          <ArrowLeft size={15} />
          Case Studies
        </Link>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em]">
            <span
              className="rounded-full px-3 py-1"
              style={{
                color: GOLD,
                background: "rgba(245, 215, 110, 0.08)",
                border: "1px solid rgba(245, 215, 110, 0.18)",
              }}
            >
              Customer Story
            </span>
            <span className="inline-flex items-center gap-1.5" style={{ color: DIM }}>
              <MapPin size={13} />
              Dubai, UAE
            </span>
          </div>

          <h1
            className="text-text-primary"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.1rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
            }}
          >
            Diginix shipped <span style={{ color: GOLD }}>25% faster</span> — and
            never made the hire.
          </h1>

          <p
            className="mt-6 max-w-[640px]"
            style={{ color: MUTED, fontSize: "1.0625rem", lineHeight: 1.7 }}
          >
            A Dubai AI product studio was one job posting away from a $66,000 PM
            hire. Apriori gave the PMs they already had a replica of their users
            instead — and the project landed a full month early.
          </p>

          <a
            href="https://www.diginixai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
            style={{ color: ACCENT }}
          >
            diginixai.com
            <ArrowUpRight size={15} />
          </a>
        </motion.header>

        {/* Metric band */}
        <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} metric={m} index={i} />
          ))}
        </section>

        {/* Timeline */}
        <section className="mt-20">
          <div
            className="mb-10 text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: ACCENT }}
          >
            How it played out
          </div>

          <div className="relative">
            {/* The run-through line */}
            <div
              className="absolute left-6 top-3 bottom-3 w-px"
              style={{
                background: `linear-gradient(180deg, ${LINE} 0%, ${LINE} 85%, transparent 100%)`,
              }}
              aria-hidden
            />
            {MILESTONES.map((m) => (
              <TimelineNode key={m.phase} milestone={m} />
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl border p-8 md:p-10"
          style={{
            borderColor: "rgba(245, 215, 110, 0.16)",
            background:
              "linear-gradient(180deg, rgba(26, 23, 16, 0.95), rgba(14, 13, 10, 0.95))",
            boxShadow: "0 26px 60px rgba(0, 0, 0, 0.55)",
          }}
        >
          <Quote size={28} style={{ color: "rgba(245, 215, 110, 0.4)" }} />
          <p
            className="mt-4 text-[19px] leading-relaxed md:text-[21px]"
            style={{ color: "#E8DFC8", fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            &ldquo;Apriori worked out great for us, helped us fasten up our product
            lifecycle in total, plus the founders are extremely professional.
            Looking ahead to invest in them.&rdquo;
          </p>

          <div className="mt-7 flex items-center gap-3.5">
            <span
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[16px] font-bold"
              style={{
                background: "linear-gradient(135deg, #F5D76E, #E5B84B)",
                color: "#1A1710",
              }}
              aria-hidden
            >
              P
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-semibold" style={{ color: GOLD }}>
                Priyanshu Joshi
              </div>
              <div className="text-[12.5px]" style={{ color: DIM }}>
                Founder, Diginix Solutions
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/priyanshujoshi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Priyanshu Joshi on LinkedIn"
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors"
              style={{ borderColor: "rgba(245, 215, 110, 0.22)", color: ACCENT }}
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2
            className="text-text-primary"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Give your PMs the same edge.
          </h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px]" style={{ color: MUTED }}>
            A replica of your target audience, ready in minutes — so your team can
            validate before they build, not after.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #F5D76E, #E5B84B)",
                color: "#1A1710",
              }}
            >
              Start free
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 rounded-full border px-6 py-3 text-[14px] font-semibold transition-colors"
              style={{ borderColor: "rgba(245, 215, 110, 0.22)", color: GOLD }}
            >
              More case studies
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
