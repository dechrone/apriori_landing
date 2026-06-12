"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   CREDIBILITY BAND
   ─────────────────────────────────────────────────────────────────────────
   Four tiles directly under the hero CTA row, above the logo wall. Answers the
   buyer's first four objections — does it work, is it reliable, is it fast, is
   my data safe — and links each claim to its evidence.

   Every number is paired with the frontier comparison (a raw 0.783 means
   nothing alone — the legible claim is "beats GPT-5.5 and Claude"). Numbers are
   the arXiv:2605.29400 figures already published on /research. The Trust tile
   makes no SOC 2 claim (program not started) — it states only what is true:
   no shared-model training, DPA on request.
   ═══════════════════════════════════════════════════════════════════════════ */

const GOLD = "#F5D76E";
const MUTED = "#A8A294";

type Tile = {
  value: string;
  /** Render `value` at the larger numeric weight (true) or as a phrase (false). */
  numeric: boolean;
  caption: React.ReactNode;
  linkLabel: string;
  href: string;
};

const TILES: Tile[] = [
  {
    value: "0.783",
    numeric: true,
    caption: (
      <>
        Semantic similarity on screen-conditioned action prediction. Frontier
        zero-shot: <strong style={{ color: "#D5D0C4" }}>0.459</strong> (Claude
        Opus 4.7), <strong style={{ color: "#D5D0C4" }}>0.482</strong> (GPT-5.5).
      </>
    ),
    linkLabel: "Read the paper",
    href: "/research",
  },
  {
    value: "79%",
    numeric: true,
    caption: (
      <>
        Held-out cases clearing the 0.7 quality bar. Frontier baselines:{" "}
        <strong style={{ color: "#D5D0C4" }}>1–2%</strong>.
      </>
    ),
    linkLabel: "Methodology",
    href: "/research",
  },
  {
    value: "Same day",
    numeric: false,
    caption: (
      <>
        50 personas, multiple variants, a full report in hours — no recruiting,
        no scheduling.
      </>
    ),
    linkLabel: "See a live report",
    href: "/demo/univest",
  },
  {
    value: "Yours",
    numeric: false,
    caption: (
      <>
        Your screens stay yours. No shared-model training on your data. DPA
        available on request.
      </>
    ),
    linkLabel: "How we handle data",
    href: "/trust",
  },
];

export function CredibilityBand() {
  return (
    <div className="mt-12 w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border md:grid-cols-4"
        style={{ borderColor: "rgba(245, 215, 110, 0.14)", backgroundColor: "rgba(245, 215, 110, 0.08)" }}
      >
        {TILES.map((t) => (
          <div
            key={t.value}
            className="flex flex-col p-5 text-left"
            style={{ backgroundColor: "#070707" }}
          >
            <div
              className="font-bold leading-none"
              style={{
                color: GOLD,
                fontSize: t.numeric ? "clamp(2rem, 3.4vw, 3rem)" : "clamp(1.35rem, 2.4vw, 1.9rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {t.value}
            </div>
            <p
              className="mt-3 flex-1 text-[13px] leading-relaxed"
              style={{ color: MUTED }}
            >
              {t.caption}
            </p>
            <Link
              href={t.href}
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium transition-opacity hover:opacity-80"
              style={{ color: GOLD }}
            >
              {t.linkLabel}
              <ArrowUpRight size={13} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
