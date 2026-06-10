"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const PRIMARY_YELLOW = "#F5D76E";
const ACCENT_GOLD = "#E5B84B";
const MUTED_TEXT = "#A8A294";

const PERSONA_POOL: Array<{ name: string; meta: string }> = [
  { name: "Priya", meta: "28, Bangalore" },
  { name: "Marcus", meta: "34, NYC" },
  { name: "Aarti", meta: "31, Mumbai" },
  { name: "Sam", meta: "29, Austin" },
  { name: "Rohan", meta: "26, Delhi" },
  { name: "Emma", meta: "37, Chicago" },
  { name: "Meera", meta: "33, Pune" },
  { name: "Devon", meta: "30, Boston" },
  { name: "Ananya", meta: "27, Chennai" },
  { name: "Tyler", meta: "32, SF" },
  { name: "Vikram", meta: "35, Hyderabad" },
  { name: "Sarah", meta: "28, Seattle" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};


export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center px-6">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={140}
          className="w-full h-full"
          particleColor="#FFD668"
          speed={1}
        />
      </div>

      <TaggedSparkle side="left" cycleSeconds={6} driftSeconds={28} startDelay={0.8} />
      <TaggedSparkle side="right" cycleSeconds={6} driftSeconds={32} startDelay={2.4} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center max-w-5xl"
      >
        <motion.h1
          variants={itemVariants}
          className="font-semibold max-w-4xl"
          style={{
            color: PRIMARY_YELLOW,
            fontSize: "clamp(2.1rem, 5.4vw, 4.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            textShadow: "0 0 70px rgba(245, 215, 110, 0.2)",
          }}
        >
          World&apos;s Most Advanced{" "}
          <span style={{ color: ACCENT_GOLD }}>Human Simulation Model</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-7 max-w-2xl"
          style={{
            color: MUTED_TEXT,
            fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
            lineHeight: 1.6,
          }}
        >
          A/B test 100s of product ideas against a replica of your target audience, before writing any code.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="/demo/univest"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: PRIMARY_YELLOW,
              color: "#0A0A0A",
              boxShadow: "0 0 40px rgba(245, 215, 110, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFE680";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = PRIMARY_YELLOW;
            }}
          >
            See a Live Report
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://calendly.com/rahul-bissa-apriori/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer border"
            style={{
              borderColor: "rgba(245, 215, 110, 0.35)",
              color: PRIMARY_YELLOW,
              backgroundColor: "rgba(245, 215, 110, 0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(245, 215, 110, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(245, 215, 110, 0.04)";
            }}
          >
            Contact Sales
          </a>
        </motion.div>

        <motion.div variants={itemVariants}>
          <CredibilityStrip />
        </motion.div>
      </motion.div>
    </section>
  );
}

type Brand = { name: string; domain: string; color: string };

const BACKERS: Brand[] = [
  { name: "Microsoft", domain: "microsoft.com", color: "#737373" },
  { name: "Y Combinator Startup School", domain: "ycombinator.com", color: "#FF6600" },
];

const GOOGLE: Brand = { name: "Google", domain: "google.com", color: "#4285F4" };
const ANTLER: Brand = { name: "Antler", domain: "antler.co", color: "#E8472B" };

function CredibilityStrip() {
  return (
    <div className="mt-16 flex flex-col items-center gap-7">
      {/* Pedigree on top */}
      <div className="flex flex-col items-center gap-4">
        <span
          className="font-medium"
          style={{
            color: MUTED_TEXT,
            fontSize: "clamp(1.25rem, 2.2vw, 1.85rem)",
          }}
        >
          Built by brains from{" "}
          <span className="font-semibold" style={{ color: PRIMARY_YELLOW }}>
            IIT Delhi
          </span>
        </span>
        <span
          className="h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245, 215, 110, 0.22), transparent)",
          }}
        />
      </div>

      {/* Two sections: programme (left) · startup programmes (right) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-x-10 md:gap-x-14 gap-y-7">
        {/* LEFT — Immersion Programme */}
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "rgba(168, 162, 148, 0.7)" }}
          >
            Part of Immersion Programme by
          </span>
          <div className="flex items-center gap-4">
            <TrustLogo brand={GOOGLE} />
            <span className="text-lg" style={{ color: "rgba(168, 162, 148, 0.45)" }}>
              &times;
            </span>
            <TrustLogo brand={ANTLER} />
          </div>
        </div>

        {/* vertical divider */}
        <span
          className="hidden sm:block w-px self-stretch"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(168, 162, 148, 0.22), transparent)",
          }}
        />

        {/* RIGHT — Startup Programmes */}
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "rgba(168, 162, 148, 0.7)" }}
          >
            Powered by Startup Programmes
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {BACKERS.map((b) => (
              <TrustLogo key={b.name} brand={b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center gap-2.5" title={brand.name}>
      <BrandFavicon brand={brand} size={22} />
      <span
        className="text-[14.5px] font-medium"
        style={{ color: "rgba(213, 208, 196, 0.82)" }}
      >
        {brand.name}
      </span>
    </div>
  );
}

function BrandFavicon({
  brand,
  size,
  className = "",
}: {
  brand: Brand;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className={`flex items-center justify-center rounded-[4px] font-bold text-white flex-shrink-0 ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.55,
          backgroundColor: brand.color,
        }}
        aria-label={brand.name}
      >
        {brand.name[0]}
      </span>
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
      alt={brand.name}
      width={size}
      height={size}
      className={`rounded-[4px] flex-shrink-0 ${className}`}
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={() => setFailed(true)}
    />
  );
}

type TaggedSparkleProps = {
  side: "left" | "right";
  cycleSeconds: number;
  driftSeconds: number;
  startDelay: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildDriftKeyframes(side: "left" | "right") {
  const xRange = side === "left" ? [4, 30] : [62, 92];
  const yRange = [14, 80];
  const points = 6;
  const lefts: string[] = [];
  const tops: string[] = [];
  for (let i = 0; i < points; i++) {
    lefts.push(`${randomBetween(xRange[0], xRange[1]).toFixed(2)}%`);
    tops.push(`${randomBetween(yRange[0], yRange[1]).toFixed(2)}%`);
  }
  lefts.push(lefts[0]);
  tops.push(tops[0]);
  return { lefts, tops };
}

function pickPersonaIndex(exclude: number, partnerIndex: number) {
  let next = exclude;
  while (next === exclude || next === partnerIndex) {
    next = Math.floor(Math.random() * PERSONA_POOL.length);
  }
  return next;
}

let sharedPartnerIndex = -1;

function TaggedSparkle({ side, cycleSeconds, driftSeconds, startDelay }: TaggedSparkleProps) {
  const [mounted, setMounted] = useState(false);
  const [personaIndex, setPersonaIndex] = useState(0);
  const [drift, setDrift] = useState<{ lefts: string[]; tops: string[] } | null>(null);

  useEffect(() => {
    const idx = pickPersonaIndex(-1, sharedPartnerIndex);
    sharedPartnerIndex = idx;
    setPersonaIndex(idx);
    setDrift(buildDriftKeyframes(side));
    setMounted(true);

    const id = setInterval(() => {
      setPersonaIndex((prev) => {
        const next = pickPersonaIndex(prev, sharedPartnerIndex);
        sharedPartnerIndex = next;
        return next;
      });
    }, cycleSeconds * 1000);
    return () => clearInterval(id);
  }, [side, cycleSeconds]);

  if (!mounted || !drift) return null;

  const persona = PERSONA_POOL[personaIndex];

  return (
    <motion.div
      initial={{ opacity: 0, left: drift.lefts[0], top: drift.tops[0] }}
      animate={{
        opacity: 1,
        left: drift.lefts,
        top: drift.tops,
      }}
      transition={{
        opacity: { duration: 1.2, delay: startDelay, ease: "easeOut" },
        left: {
          duration: driftSeconds,
          delay: startDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        top: {
          duration: driftSeconds,
          delay: startDelay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute z-10 hidden md:flex items-center gap-2 pointer-events-none"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
          style={{ backgroundColor: PRIMARY_YELLOW }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            backgroundColor: PRIMARY_YELLOW,
            boxShadow: "0 0 12px rgba(245, 215, 110, 0.9)",
          }}
        />
      </span>
      <AnimatePresence mode="wait">
        <motion.div
          key={persona.name}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-full border px-3 py-1 backdrop-blur-sm whitespace-nowrap"
          style={{
            borderColor: "rgba(245, 215, 110, 0.25)",
            backgroundColor: "rgba(10, 10, 10, 0.6)",
          }}
        >
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: PRIMARY_YELLOW }}
          >
            {persona.name}
          </span>
          <span className="text-[11px] ml-1.5" style={{ color: MUTED_TEXT }}>
            {persona.meta}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
