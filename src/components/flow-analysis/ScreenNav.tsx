"use client";

import { useEffect, useState } from "react";
import type { FlowScreen } from "@/types/flow-analysis";

export function ScreenNav({ screens }: { screens: FlowScreen[] }) {
  const [activeId, setActiveId] = useState<string | null>(screens[0]?.id ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id")?.replace("screen-section-", "") ?? null;
            if (id) setActiveId(id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    screens.forEach((s) => {
      const el = document.getElementById(`screen-section-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [screens]);

  const scrollTo = (screenId: string) => {
    document.getElementById(`screen-section-${screenId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="sticky top-[72px] z-30 py-3 px-4 -mx-4 rounded-lg bg-[var(--fa-surface)]/95 backdrop-blur border border-[var(--fa-divider)]"
      style={{ fontFamily: "var(--font-flow-body)" }}
    >
      <div className="flex flex-wrap gap-2">
        {screens.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`
                px-4 py-2 rounded-lg text-body-sm font-medium transition-colors
                ${isActive
                  ? "bg-[var(--fa-gold)] text-[var(--fa-bg)]"
                  : "text-[var(--fa-text-body)] hover:bg-[var(--fa-surface2)] hover:text-[var(--fa-text)]"
                }
              `}
            >
              {s.id} · {s.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
