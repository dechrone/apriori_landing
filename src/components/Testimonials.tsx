"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Linkedin, Quote } from "lucide-react";

const GOLD = "#F5D76E";
const ACCENT = "#E5B84B";
const MUTED = "#A8A294";

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  linkedin?: string;
  caseStudy?: string;
  caseStudyLabel?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priyanshu Joshi",
    company: "Diginix Solutions",
    quote:
      "Apriori worked out great for us, helped us fasten up our product lifecycle in total, plus the founders are extremely professional. Looking ahead to invest in them.",
    linkedin: "https://www.linkedin.com/in/priyanshujoshi/",
    caseStudy: "/case-studies/diginix",
    caseStudyLabel: "Helped us deliver project much faster",
  },
  {
    name: "Chaitanya Srivastava",
    company: "Flipkart",
    quote:
      "I always use Apriori to stress test my flows before I ship them. It's quite accurate and so much faster to do it this way!",
  },
  {
    name: "Ashmith Singh",
    company: "Unify Apps",
    quote:
      "It's a focus group that runs in minutes. The persona reasoning maps quite close to how our real users actually decide.",
  },
  {
    name: "Yashvardhan Singh",
    company: "Slice",
    quote:
      "It brought interesting insights on our KYC screen we'd normally only find post-launch or after lots of ideation. The 'why' behind every drop-off is interesting.",
  },
  {
    name: "Dhruv Negi",
    company: "Dezerv",
    quote:
      "I A/B tested five paywall variants overnight and shipped the winner with conviction, its so fast and quite accurate.",
  },
  {
    name: "Gunjit Jindal",
    company: "Loop Health",
    quote:
      "Apriori is my first stop for any new flow now. I validate the idea before engineering ever touches it.",
  },
];

const CARD_W = 344;
const CARD_H = 248;
const GAP_X = 28;
const GAP_Y = 28;
const COLS = 3;

function computeTargets(n: number) {
  const rows = Math.ceil(n / COLS);
  return Array.from({ length: n }, (_, i) => {
    const row = Math.floor(i / COLS);
    const rowStart = row * COLS;
    const rowCount = Math.min(COLS, n - rowStart);
    const col = i - rowStart;
    const x = (col - (rowCount - 1) / 2) * (CARD_W + GAP_X);
    const y = (row - (rows - 1) / 2) * (CARD_H + GAP_Y);
    return { x, y };
  });
}

export function Testimonials() {
  const [fanOut, setFanOut] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1180px)");
    const update = () => setFanOut(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fanOut ? <FanOutTestimonials /> : <StaticTestimonials />;
}

function FanOutTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const n = TESTIMONIALS.length;
  const targets = computeTargets(n);

  return (
    <section ref={trackRef} className="relative bg-black" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center pt-24">
        <SectionHeader />
        <div className="relative w-full flex-1">
          {TESTIMONIALS.map((t, i) => (
            <ScrollCard
              key={t.name}
              progress={scrollYProgress}
              data={t}
              index={i}
              total={n}
              target={targets[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollCard({
  progress,
  data,
  index,
  total,
  target,
}: {
  progress: MotionValue<number>;
  data: Testimonial;
  index: number;
  total: number;
  target: { x: number; y: number };
}) {
  // index 0 sits on top of the pile and is the last to fan out.
  const start = ((total - 1 - index) * 0.08);
  const end = Math.min(start + 0.55, 0.98);
  const pile = index - (total - 1) / 2;

  const x = useTransform(progress, [start, end], [pile * 4, target.x]);
  const y = useTransform(progress, [start, end], [pile * 5, target.y]);
  const rotate = useTransform(progress, [start, end], [pile * 1.8, 0]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex: total - index,
        width: CARD_W,
        height: CARD_H,
        position: "absolute",
        left: "50%",
        top: "48%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
      }}
    >
      <CardContent data={data} />
    </motion.div>
  );
}

function CardContent({ data }: { data: Testimonial }) {
  return (
    <div
      className="h-full w-full rounded-2xl border p-6 flex flex-col"
      style={{
        borderColor: "rgba(245, 215, 110, 0.14)",
        background:
          "linear-gradient(180deg, rgba(26, 23, 16, 0.96), rgba(14, 13, 10, 0.96))",
        boxShadow: "0 26px 60px rgba(0, 0, 0, 0.55)",
      }}
    >
      <div className="flex items-start justify-between">
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: ACCENT }}
        >
          {data.company}
        </span>
        <Quote size={20} style={{ color: "rgba(245, 215, 110, 0.35)" }} />
      </div>

      <div className="mt-4 flex-1">
        <p
          className="text-[13.5px] leading-relaxed"
          style={{ color: "rgba(213, 208, 196, 0.92)" }}
        >
          &ldquo;{data.quote}&rdquo;
        </p>

        {data.caseStudy && (
          <Link
            href={data.caseStudy}
            className="group/cs mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium transition-opacity hover:opacity-80"
            style={{ color: ACCENT }}
          >
            {data.caseStudyLabel ?? "Read the case study"}
            <ArrowRight
              size={13}
              className="transition-transform group-hover/cs:translate-x-0.5"
            />
          </Link>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #F5D76E, #E5B84B)",
            color: "#1A1710",
          }}
          aria-hidden
        >
          {data.name[0]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold" style={{ color: GOLD }}>
            {data.name}
          </div>
          <div className="text-[12px]" style={{ color: MUTED }}>
            {data.company}
          </div>
        </div>
        {data.linkedin && (
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${data.name} on LinkedIn`}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: "rgba(245, 215, 110, 0.22)", color: ACCENT }}
          >
            <Linkedin size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      <div
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]"
        style={{ color: ACCENT }}
      >
        Testimonials
      </div>
      <h2
        className="font-semibold"
        style={{
          color: GOLD,
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        Trusted by PMs.
        <br />
        Backed by Results.
      </h2>
      <p className="mt-4 text-base" style={{ color: MUTED }}>
        What product teams say after running their flows through Apriori.
      </p>
    </div>
  );
}

function StaticTestimonials() {
  return (
    <section className="relative bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader />
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ minHeight: CARD_H }}>
              <CardContent data={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
