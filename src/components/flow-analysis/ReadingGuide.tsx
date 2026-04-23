"use client";

/**
 * Dismissible "How to read this report" strip.
 *
 * First-time PMs often don't know what trust/clarity/value scores mean, or why
 * completion rate differs from what they'd see in production analytics. This
 * strip unpacks the jargon in 8 lines. Dismissal is sticky per browser.
 */

import { useState, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";

const STORAGE_KEY = "apriori.readingGuide.dismissed.v1";

export function ReadingGuide() {
  // Default to hidden on SSR + initial render so we don't flash the banner
  // for returning users who've already dismissed it. The dismissal state
  // lives in localStorage, which is only readable on the client — we flip
  // `ready` to true on mount, then decide whether to show the banner.
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(!dismissed);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* localStorage disabled — dismissal just doesn't persist */
    }
  };

  const reopen = () => setOpen(true);

  if (!ready) return null;

  if (!open) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 pt-3 -mb-1">
        <button
          type="button"
          onClick={reopen}
          className="inline-flex items-center gap-1.5 text-[12px] text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          How to read this report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-3">
      <div className="bg-white border border-[#E8E4DE] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B8860B]" />
            <h3 className="text-[14px] font-semibold text-[#1A1A1A]">
              How to read this report
            </h3>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss reading guide"
            className="text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 text-[12.5px] leading-[1.55] text-[#4B5563]">
          <div>
            <p className="font-semibold text-[#1A1A1A] mb-1">Overview</p>
            <p>
              Top-line completion rate + drop-off cluster summary. This is the
              PM/PD tl;dr — start here.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#1A1A1A] mb-1">Drop-Off Funnel</p>
            <p>
              Screen-by-screen where personas quit, with the reasoning clusters
              we heard. Hover a bar to see direct quotes.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#1A1A1A] mb-1">Deep Dive</p>
            <p>
              Per-screen usability audit: trust, clarity and value scores plus
              friction points for each screen in the flow.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F3F4F6] grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 text-[12px] text-[#6B7280]">
          <p>
            <span className="font-semibold text-[#1A1A1A]">Trust</span> — does
            the screen feel credible / safe to act on?
          </p>
          <p>
            <span className="font-semibold text-[#1A1A1A]">Clarity</span> — can
            the persona tell what&apos;s happening and what to do next?
          </p>
          <p>
            <span className="font-semibold text-[#1A1A1A]">Value</span> — does
            this step move them toward their goal, or feel like a detour?
          </p>
        </div>

        <p className="mt-4 text-[11.5px] text-[#9CA3AF] leading-[1.5]">
          All numbers come from AI-simulated personas — they&apos;re directional,
          not ground truth. Use them to find friction hypotheses to test with
          real users, not as a replacement for production analytics.
        </p>
      </div>
    </div>
  );
}
