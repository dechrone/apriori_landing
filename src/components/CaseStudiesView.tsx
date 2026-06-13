"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, type CaseStudy } from "@/data/case-studies";

const GOLD = "#F5D76E";
const CARD_BORDER = "#1F1A12";
const CARD_BG = "#0B0907";

function CaseStudyCard({
  study,
  index,
  isInView,
}: {
  study: CaseStudy;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300"
      style={{ borderColor: CARD_BORDER, backgroundColor: CARD_BG }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(245, 215, 110, 0.35)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(245, 215, 110, 0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = CARD_BORDER;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail (screenshot) or branded fallback tile */}
      <Link
        href={study.href}
        className="relative block h-48 w-full overflow-hidden"
        style={{ backgroundColor: "#000" }}
      >
        {study.thumbnail ? (
          <Image
            src={study.thumbnail}
            alt={`${study.client} — ${study.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 460px"
            className="object-cover object-top opacity-70 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              background: `radial-gradient(ellipse at 50% 35%, ${study.accent}26 0%, rgba(0,0,0,0) 70%), #000`,
            }}
          >
            <span
              className="text-[26px] font-semibold tracking-tight"
              style={{ color: study.accent }}
            >
              {study.client}
            </span>
            <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
              {study.category.replace(/\s*·\s*/, " · ")}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,9,7,0.1) 35%, rgba(11,9,7,0.95) 100%)",
          }}
        />
      </Link>

      {/* Gold accent bar */}
      <div
        className="absolute left-0 top-48 bottom-6 w-[2px] rounded-full transition-all duration-300"
        style={{ backgroundColor: "rgba(245, 215, 110, 0.3)" }}
      />

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pl-7">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
          <span style={{ color: GOLD }}>{study.client}</span>
          <span aria-hidden>·</span>
          <span>{study.category.replace(/^.*·\s*/, "")}</span>
        </div>

        <h3
          className="mb-3 text-[19px] leading-snug text-text-primary"
          style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          {study.title}
        </h3>

        <p className="mb-5 text-[14px] leading-relaxed text-text-secondary">
          {study.summary}
        </p>

        {/* Metric */}
        <div
          className="mb-5 flex items-baseline gap-3 rounded-md border px-4 py-3"
          style={{
            borderColor: "rgba(245, 215, 110, 0.18)",
            backgroundColor: "rgba(245, 215, 110, 0.05)",
          }}
        >
          <span
            className="text-[24px] font-bold leading-none"
            style={{ color: GOLD }}
          >
            {study.metric.value}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
            {study.metric.label}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded px-2.5 py-1 text-[11px] font-medium text-text-secondary"
              style={{ backgroundColor: "rgba(245, 215, 110, 0.06)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Variant deep-dives */}
        {study.variants && study.variants.length > 0 && (
          <div className="mb-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
              Per-variant deep dives
            </div>
            <div className="flex flex-wrap gap-2">
              {study.variants.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  title={v.note}
                  className="rounded border px-2.5 py-1 text-[12px] font-medium text-text-secondary transition-colors hover:text-text-primary"
                  style={{ borderColor: "#2F2718" }}
                >
                  {v.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Link
          href={study.href}
          className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-semibold transition-all"
          style={{ color: GOLD }}
        >
          {study.ctaLabel ?? "View full report"}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function CaseStudiesView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <div className="landing-dark" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <main ref={containerRef}>
        {/* Hero */}
        <section className="mx-auto max-w-[960px] px-6 pb-10 pt-28 md:px-16 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: GOLD }}
            >
              Case Studies
            </div>
            <h1
              className="mb-5 max-w-[720px] text-text-primary"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Simulations we&apos;ve run, and the{" "}
              <span style={{ color: GOLD }}>decisions</span> they drove.
            </h1>
            <p
              className="max-w-[620px] text-text-secondary"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              Every study below is real work — synthetic personas walking live
              product flows, and the outcomes teams shipped on the back of them.
              Open any one to see the full funnel, per-screen analysis, and the
              decision it drove.
            </p>
          </motion.div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-[960px] px-6 pb-28 md:px-16">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((study, i) => (
              <CaseStudyCard
                key={study.slug}
                study={study}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
