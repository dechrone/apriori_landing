"use client";

import { ArrowRight } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroVideo } from "./HeroVideo";

const DEMO_VIDEO_ID = "FaTOzN6DRQo";

export function DemoSection() {
  return (
    <section
      className="border-t border-border-subtle overflow-hidden"
      style={{ backgroundColor: "#0B0907" }}
    >
      <ContainerScroll
        titleComponent={
          <div className="px-6 md:px-12">
            <h2
              className="mb-5"
              style={{
                color: "#F5E6A8",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              See it in action.
            </h2>
            <p
              className="mx-auto max-w-[640px]"
              style={{
                color: "#A8A294",
                fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                lineHeight: 1.65,
              }}
            >
              We ran a simulation on Univest&apos;s post-signup activation flow with 50 personas. The result: users hesitated when the offer looked free but the ₹1 activation price was not visible upfront. Making price, proof, and the CTA clearer lifted conversion from 22% to 44%.
            </p>
          </div>
        }
      >
        <div className="h-full w-full">
          <HeroVideo videoId={DEMO_VIDEO_ID} className="h-full" />
        </div>
      </ContainerScroll>

      <div className="max-w-[960px] mx-auto px-6 md:px-16 pb-20 md:pb-24 -mt-24 md:-mt-40 text-center">
        <a
          href="/demo/univest"
          className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{ color: "#F5D76E" }}
        >
          View Full Report
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
