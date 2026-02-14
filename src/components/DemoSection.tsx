"use client";

import { HeroVideo } from "./HeroVideo";

const DEMO_VIDEO_ID = "txmtrfhLERg";

export function DemoSection() {
  return (
    <section className="relative w-full py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-16 flex justify-center">
        <HeroVideo videoId={DEMO_VIDEO_ID} />
      </div>
    </section>
  );
}
