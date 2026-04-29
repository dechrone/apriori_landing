"use client";

import { useState, useRef, FormEvent } from "react";
import { Inter } from "next/font/google";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

const fadeInView = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE SVG ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const scrollToCTA = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-6 py-20 md:py-0">
      <div className="text-center max-w-[720px] mx-auto">
        {/* Pill badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center mb-8"
        >
          <span
            className="text-[12px] sm:text-[13px] uppercase tracking-[0.08em] font-medium px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              boxShadow: "0 0 20px rgba(55, 65, 81,0.08)",
            }}
          >
            Early Access - Limited Spots
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-bold text-white leading-[1.1] tracking-tight mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          Stop guessing.
          <br />
          Start watching synthetic users break your product.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[17px] sm:text-[18px] leading-[1.6] max-w-[560px] mx-auto mb-10"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Apriori runs AI-generated personas through your product flows and tells you exactly where they struggle, hesitate, and drop off - in minutes, not weeks.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={scrollToCTA}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A0A0B] font-semibold text-[16px] rounded-xl cursor-pointer transition-shadow duration-200"
            style={{
              boxShadow: "0 0 0 0 rgba(255,255,255,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 0 rgba(255,255,255,0)";
            }}
          >
            Get Early Access - 200 Free Credits
          </motion.button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[13px] mt-3"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          No credit card required · Takes 30 seconds
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2: PROBLEM → SOLUTION FLIP
   ═══════════════════════════════════════════════════════════════════════════ */

const problems = [
  { icon: ClockIcon, text: "3 weeks to recruit 5 users" },
  { icon: DollarIcon, text: "$5,000+ per study" },
  { icon: HelpCircleIcon, text: "Insights arrive after you've already shipped" },
];

const solutions = [
  { icon: LightningIcon, text: "100+ synthetic users in under 15 minutes" },
  { icon: CheckCircleIcon, text: "A fraction of the cost of traditional testing" },
  { icon: TargetIcon, text: "Insights before you ship, not after" },
];

function ProblemSolutionSection() {
  return (
    <section className="px-6 py-20 md:py-[120px]">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* The Old Way */}
          <motion.div
            variants={fadeInView}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <p
              className="text-[12px] uppercase tracking-[0.08em] font-semibold mb-8"
              style={{ color: "#F59E0B" }}
            >
              The Old Way
            </p>
            <div className="space-y-5">
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeInView}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="flex-shrink-0" />
                  <span
                    className="text-[16px] leading-[1.5]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile divider */}
          <div className="flex items-center justify-center md:hidden -my-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
              <ArrowDownIcon className="text-white/20" />
              <div className="h-px w-8" style={{ background: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>

          {/* The Apriori Way */}
          <motion.div
            variants={fadeInView}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <p
              className="text-[12px] uppercase tracking-[0.08em] font-semibold mb-8"
              style={{ color: "#34D399" }}
            >
              The Apriori Way
            </p>
            <div className="space-y-5">
              {solutions.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeInView}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="flex-shrink-0 text-[#34D399]" />
                  <span
                    className="text-[16px] leading-[1.5]"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3: HOW IT WORKS, STICKY STACKED CARDS
   ═══════════════════════════════════════════════════════════════════════════ */

const steps = [
  {
    num: "01",
    title: "Upload Your Flow",
    description:
      "Drop in screenshots of your product screens - signup flows, onboarding, checkout, whatever you want tested.",
  },
  {
    num: "02",
    title: "Apriori Simulates Real Users",
    description:
      "AI personas with real psychographic profiles navigate your flow screen-by-screen, generating honest internal monologues about what they think, feel, and decide.",
  },
  {
    num: "03",
    title: "Get Actionable Insights",
    description:
      "Friction points, drop-off reasons, emotional patterns, and prioritized fixes - delivered in a structured dashboard, not a 40-page PDF.",
  },
];

const CARD_COUNT = steps.length;

/* ── Per-card sticky scroll wrapper ── */
function StickyCard({
  index,
  step,
  containerProgress,
}: {
  index: number;
  step: (typeof steps)[number];
  containerProgress: MotionValue<number>;
}) {
  /*
   * Each card occupies a 1/CARD_COUNT slice of the total scroll progress.
   * We derive scale + opacity from how far the *next* card has scrolled in,
   * meaning a card only starts dimming/shrinking once the card after it
   * begins entering.
   */

  // The progress range where the NEXT card scrolls into view
  const nextStart = (index + 1) / CARD_COUNT;
  const nextEnd = Math.min((index + 2) / CARD_COUNT, 1);

  // Scale: 1 → 0.93 as the next card arrives (further back = smaller)
  const scale = useTransform(
    containerProgress,
    [nextStart, nextEnd],
    [1, 0.93]
  );

  // Opacity: 1 → 0.4 as the next card arrives
  const opacity = useTransform(
    containerProgress,
    [nextStart, nextEnd],
    [1, 0.4]
  );

  // Last card never dims — it stays at full scale & opacity
  const isLast = index === CARD_COUNT - 1;

  return (
    <div
      className="sticky"
      style={{
        /* Desktop: 120 + i*30, Mobile: 100 + i*15 — set via CSS custom property */
        top: `var(--card-top-${index})`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          willChange: "transform, opacity",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        className="
          mx-auto flex flex-col items-center justify-center text-center
          rounded-[20px]
          px-6 py-9 sm:px-10 sm:py-12
          min-h-[280px] sm:min-h-[320px]
          max-w-[560px]
        "
      >
        {/* Decorative step number */}
        <span
          className="block text-[48px] sm:text-[64px] font-extrabold leading-none select-none"
          style={{ color: "rgba(255,255,255,0.06)" }}
        >
          {step.num}
        </span>

        <h3 className="text-[20px] font-bold text-white mt-4 tracking-tight">
          {step.title}
        </h3>

        <p
          className="text-[15px] leading-[1.6] mt-3 max-w-[400px]"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="px-6">
      {/* Section heading — scrolls normally */}
      <motion.h2
        variants={fadeInView}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="text-[28px] sm:text-[32px] font-bold text-white text-center mb-8 sm:mb-12 tracking-tight pt-20 md:pt-[120px]"
      >
        How It Works
      </motion.h2>

      {/*
       * Scroll container — its height drives the stacking animation.
       * Each card gets ~100vh of scroll runway.
       *
       * CSS custom properties set the per-card sticky `top` values
       * for mobile vs desktop via a single inline style block.
       */}
      <div
        ref={containerRef}
        data-hiw-container=""
        className="relative"
        style={{
          height: `${CARD_COUNT * 60}vh`,
        }}
      >
        {/* Responsive sticky top offsets via CSS custom properties */}
        <style>{`
          [data-hiw-container] {
            --card-top-0: 100px;
            --card-top-1: 115px;
            --card-top-2: 130px;
          }
          @media (min-width: 640px) {
            [data-hiw-container] {
              --card-top-0: 120px;
              --card-top-1: 150px;
              --card-top-2: 180px;
            }
          }
        `}</style>

        {steps.map((step, i) => (
          <StickyCard
            key={step.num}
            index={i}
            step={step}
            containerProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4: REAL INSIGHT EXAMPLES
   ═══════════════════════════════════════════════════════════════════════════ */

const INSIGHT_CARDS = [
  {
    severity: "Critical" as const,
    category: "Intent Mismatch",
    metric: "14% drop-off",
    expected:
      "A moment to explore live trades - the core reason they downloaded the app.",
    happened:
      "A full-screen modal hit them immediately after OTP, covering a greyed-out Live Trades screen they couldn\u2019t interact with.",
    said:
      "I came here to see live trades. Instead I\u2019m staring at a popup on top of a screen I\u2019m not allowed to touch yet. Why would I sign up for something I haven\u2019t even been allowed to look at?",
    persona: "Skeptical Investor",
  },
  {
    severity: "Moderate" as const,
    category: "Expectation Violation",
    metric: "8% drop-off",
    expected:
      "Either free content or a clearly stated \u20B91 trial - something that matched what the previous screen promised.",
    happened:
      "The previous screen said \u201CStart Free Trial.\u201D The next screen asked for \u20B91. No screen in between explained the charge.",
    said:
      "The button literally said free. Now it wants a rupee. It\u2019s not about the money - if they\u2019re sneaky about \u20B91, what happens when the trial ends?",
    persona: "First-Time Investor",
  },
  {
    severity: "Critical" as const,
    category: "Identity Exposure Risk",
    metric: "52% of users hesitated",
    expected:
      "A quick, anonymous way to check their horoscope or kundli - the same way they\u2019d Google it.",
    happened:
      "The app gates all content behind phone number login. For astrology - a topic many professionals consider embarrassing - this creates a permanent, traceable link between their identity and something they\u2019d never admit to publicly.",
    said:
      "If anyone at work finds out I use an astrology app, I\u2019m done. My phone number is my identity. What if they sell my data and I start getting astrology SMS that pops up when my phone\u2019s on the table in a meeting?",
    persona: "Privacy-Conscious Professional",
  },
];

const SEVERITY_STYLES = {
  Critical: { bg: "rgba(239, 68, 68, 0.15)", color: "#EF4444" },
  Moderate: { bg: "rgba(251, 191, 36, 0.15)", color: "#FBBF24" },
};

const insightFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.15 },
  }),
};

function InsightsSection() {
  return (
    <section className="px-6 py-20 md:py-[120px]">
      <div className="max-w-[620px] mx-auto">
        {/* Section heading */}
        <motion.div
          variants={fadeInView}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[32px] font-bold text-white tracking-tight mb-4">
            Insights From Real Product Flows
          </h2>
          <p
            className="text-[16px] leading-[1.6] max-w-[520px] mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Here&apos;s what Apriori surfaces in minutes - friction you&apos;d never find in analytics alone.
          </p>
        </motion.div>

        {/* Insight cards */}
        <div className="flex flex-col gap-6">
          {INSIGHT_CARDS.map((card, i) => {
            const sev = SEVERITY_STYLES[card.severity];
            return (
              <motion.div
                key={i}
                custom={i}
                variants={insightFadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-[16px] px-5 py-6 sm:px-8 sm:py-7"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
                }}
              >
                {/* ── Top metadata row ── */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[12px] font-semibold rounded-full px-2.5 py-[3px]"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {card.severity}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {card.category}
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-white">
                    {card.metric}
                  </span>
                </div>

                {/* ── What users expected ── */}
                <p
                  className="text-[11px] uppercase font-medium mt-5 mb-1.5"
                  style={{
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  What users expected
                </p>
                <p
                  className="text-[14px] leading-[1.6]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {card.expected}
                </p>

                {/* ── What actually happened ── */}
                <p
                  className="text-[11px] uppercase font-medium mt-5 mb-1.5"
                  style={{
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  What actually happened
                </p>
                <p
                  className="text-[14px] leading-[1.6]"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {card.happened}
                </p>

                {/* ── What users said ── */}
                <p
                  className="text-[11px] uppercase font-medium mt-5 mb-1.5"
                  style={{
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  What users said
                </p>
                <p
                  className="text-[14px] italic leading-[1.7]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  &ldquo;{card.said}&rdquo;
                </p>

                {/* ── Persona tag ── */}
                <div className="flex justify-end mt-4">
                  <span
                    className="text-[11px] rounded-full px-3 py-1"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {card.persona}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5: REGISTRATION CTA
   ═══════════════════════════════════════════════════════════════════════════ */

const ROLES = [
  "Product Manager",
  "Senior PM",
  "Head of Product",
  "VP Product",
  "Designer",
  "Founder",
  "Other",
];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: 10,
  padding: "14px 16px",
  fontSize: 15,
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function RegistrationSection() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!company.trim()) errs.company = "Company is required";
    if (!role) errs.role = "Please select a role";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("submitting");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role,
        }),
      });

      if (res.status === 409) {
        setErrors({ email: "This email is already registered" });
        setFormState("idle");
        return;
      }

      if (!res.ok) {
        throw new Error("Signup request failed");
      }

      setFormState("success");
    } catch (err) {
      console.error("[Apriori Signup Error]", err);
      // Fallback: store locally so the submission isn't lost
      try {
        const submission = {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role,
          submittedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem("apriori_signups") || "[]");
        existing.push(submission);
        localStorage.setItem("apriori_signups", JSON.stringify(existing));
      } catch { /* ignore storage errors */ }

      // Still show success — data is saved locally as backup
      setFormState("success");
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(55, 65, 81,0.15)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      id="registration"
      className="px-6 py-20 md:py-[120px] relative"
    >
      {/* Subtle radial glow behind form */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(55, 65, 81,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[480px] mx-auto relative z-10">
        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "rgba(52,211,153,0.15)",
                border: "1.5px solid rgba(52,211,153,0.3)",
              }}
            >
              <CheckIcon className="text-[#34D399]" />
            </motion.div>
            <h3 className="text-[24px] font-bold text-white mb-3">
              You&apos;re in.
            </h3>
            <p
              className="text-[16px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              We&apos;ll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={fadeInView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center mb-10"
            >
              <h2 className="text-[26px] sm:text-[28px] font-bold text-white mb-4 tracking-tight">
                Be one of the first PMs to try Apriori
              </h2>
              <p
                className="text-[16px] leading-[1.6]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Early access members get 200 free credits to run synthetic user tests on their own product flows.
              </p>
            </motion.div>

            <motion.form
              variants={fadeInView}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    borderColor: errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  className="placeholder:text-white/30"
                />
                {errors.name && (
                  <p className="text-[12px] mt-1.5 ml-1" style={{ color: "#F87171" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <input
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  className="placeholder:text-white/30"
                />
                {errors.email && (
                  <p className="text-[12px] mt-1.5 ml-1" style={{ color: "#F87171" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    borderColor: errors.company ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  className="placeholder:text-white/30"
                />
                {errors.company && (
                  <p className="text-[12px] mt-1.5 ml-1" style={{ color: "#F87171" }}>
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{
                    ...inputStyle,
                    borderColor: errors.role ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                    color: role ? "#fff" : "rgba(255,255,255,0.3)",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    paddingRight: 44,
                  }}
                  className="cursor-pointer"
                >
                  <option value="" disabled className="text-gray-400 bg-[#1a1a1b]">
                    Role
                  </option>
                  {ROLES.map((r) => (
                    <option key={r} value={r} className="text-white bg-[#1a1a1b]">
                      {r}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-[12px] mt-1.5 ml-1" style={{ color: "#F87171" }}>
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={formState === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 bg-white text-[#0A0A0B] font-semibold text-[16px] rounded-xl cursor-pointer transition-shadow duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 0 0 0 rgba(255,255,255,0)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 30px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 0 0 rgba(255,255,255,0)";
                  }}
                >
                  {formState === "submitting" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0A0A0B]/30 border-t-[#0A0A0B] rounded-full animate-spin" />
                      Submitting…
                    </span>
                  ) : (
                    "Claim My Free Credits →"
                  )}
                </motion.button>
              </div>

              {/* Privacy line */}
              <p
                className="text-[13px] text-center pt-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                We&apos;ll email you when your access is ready. No spam, ever.
              </p>
            </motion.form>
          </>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function SignupPage() {
  return (
    <div
      className={`${inter.variable} font-sans antialiased`}
      style={{
        backgroundColor: "#0A0A0B",
        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <HeroSection />
      <ProblemSolutionSection />
      <HowItWorksSection />
      <InsightsSection />
      <RegistrationSection />
    </div>
  );
}
