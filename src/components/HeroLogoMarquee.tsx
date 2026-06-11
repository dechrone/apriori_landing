"use client";

import { useState } from "react";

type Logo = { name: string; domain: string; color: string };

const LOGOS: Logo[] = [
  { name: "SaveSage", domain: "savesage.club", color: "#16A34A" },
  { name: "Microsoft", domain: "microsoft.com", color: "#737373" },
  { name: "Salesforce", domain: "salesforce.com", color: "#00A1E0" },
  { name: "Slice", domain: "sliceit.com", color: "#6C5CE7" },
  { name: "Cred", domain: "cred.club", color: "#0A0A0A" },
  { name: "Snitch", domain: "snitch.co.in", color: "#111111" },
  { name: "Ambak", domain: "ambak.com", color: "#2563EB" },
  { name: "Unify Apps", domain: "unifyapps.com", color: "#6D28D9" },
  { name: "Flipkart", domain: "flipkart.com", color: "#2874F0" },
  { name: "Snapdeal", domain: "snapdeal.com", color: "#E40046" },
  { name: "Jar", domain: "myjar.app", color: "#1A1A1A" },
  { name: "Snapmint", domain: "snapmint.com", color: "#5E2CA5" },
  { name: "Apps For Bharat", domain: "appsforbharat.com", color: "#FF6B35" },
  { name: "Apollo", domain: "apollo.io", color: "#0E1B4D" },
  { name: "Earnin", domain: "earnin.com", color: "#00C389" },
  { name: "Univest", domain: "univest.in", color: "#111827" },
  { name: "GoodScore", domain: "goodscore.app", color: "#16A34A" },
  { name: "Blink Money", domain: "blinkmoney.in", color: "#374151" },
  { name: "PoP", domain: "pop.in", color: "#EC4899" },
];

export function HeroLogoMarquee() {
  const row = [...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full py-5 md:py-6 bg-transparent">
      <div className="flex flex-col gap-3">
        <div
          className="pl-8 md:pl-12 whitespace-nowrap text-[10px] font-semibold tracking-[0.24em] uppercase"
          style={{ color: "rgba(245, 215, 110, 0.55)" }}
        >
          Used by PMs at
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)",
          }}
        >
          <div
            className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14"
            style={{
              width: "max-content",
              animation: "apriori-hero-marquee 42s linear infinite",
            }}
          >
            {row.map((logo, i) => (
              <LogoMark key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes apriori-hero-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function LogoMark({ logo }: { logo: Logo }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex items-center flex-shrink-0" title={logo.name}>
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`}
          alt={logo.name}
          width={32}
          height={32}
          className="rounded-md flex-shrink-0"
          style={{ objectFit: "contain" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ backgroundColor: logo.color, letterSpacing: "-0.02em" }}
          aria-label={logo.name}
        >
          {logo.name[0]}
        </span>
      )}
    </div>
  );
}
