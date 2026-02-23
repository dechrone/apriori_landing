"use client";

import type { FlowAnalysisData } from "@/types/flow-analysis";
import { AlertCircle, Users, Layers, AlertTriangle, ShieldAlert } from "lucide-react";
import { OneBetPanel } from "./OneBetPanel";
import { DropOffFunnel } from "./DropOffFunnel";

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.05)";
const ACCENT = "#E8583A";

/** Parse "5/10" → 5 for friction bar. */
function parseStatScore(stat: string): number {
  const n = parseInt(stat.split("/")[0], 10);
  return Number.isNaN(n) ? 5 : Math.min(10, Math.max(0, n));
}

const FRICTION_CARD_COLORS = [
  "#DC2626",
  "#EA580C",
  "#CA8A04",
  "#2563EB",
  "#7C3AED",
  "#0D9488",
];

function countFirstTimers(personas: FlowAnalysisData["personas"]): number {
  return personas.filter(
    (p) =>
      p.lamfExp === "First-time" || p.lamfExp === "Never heard of LAMF"
  ).length;
}

export function OverviewTab({ data }: { data: FlowAnalysisData }) {
  const { meta, screens, rootCauses, personas, patterns, quotes } = data;
  const completed = Math.round((meta.completionRate / 100) * meta.totalPersonas);
  const firstTimers = countFirstTimers(personas);
  const experienced = meta.totalPersonas - firstTimers;
  const firstScreen = screens[0];
  const lastScreen = screens[screens.length - 1];
  const screenRange =
    firstScreen && lastScreen
      ? `${firstScreen.label} → ${lastScreen.label}`
      : `${screens.length} screens`;

  return (
    <div
      className="py-0"
      style={{ backgroundColor: "#F5F4F2" }}
    >
      <div
        className="pb-16"
        style={{ padding: "0 24px 64px" }}
      >
        {/* Section 1 — Page Header */}
        <header
          className="pt-8 pb-6"
          style={{ marginBottom: 32 }}
        >
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.3,
            }}
          >
            What {meta.totalPersonas} personas revealed about your onboarding
          </h1>
        </header>

        {/* Section 2 — Metric Strip */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ marginBottom: 48 }}
        >
          {[
            {
              label: "Completion Rate",
              value: `${meta.completionRate}%`,
              sub: `${completed} of ${meta.totalPersonas} completed`,
              icon: AlertCircle,
            },
            {
              label: "Personas Tested",
              value: meta.totalPersonas,
              sub: `${firstTimers} first-timers · ${experienced} experienced`,
              icon: Users,
            },
            {
              label: "Screens Mapped",
              value: screens.length,
              sub: screenRange,
              icon: Layers,
            },
            {
              label: "Root Causes",
              value: rootCauses.length,
              sub: "All fixable · One bet",
              icon: AlertTriangle,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[14px] p-5"
              style={{ backgroundColor: "#FFFFFF", boxShadow: CARD_SHADOW }}
            >
              <div className="flex items-center gap-2 mb-3">
                <item.icon size={16} style={{ color: "#6B7280", flexShrink: 0 }} />
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#6B7280",
                  }}
                >
                  {item.label}
                </p>
              </div>
              <p
                className="tabular-nums"
                style={{ fontSize: 36, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.1 }}
              >
                {item.value}
              </p>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Section 3 — Drop-off Funnel */}
        <div style={{ marginBottom: 64 }}>
          <DropOffFunnel data={data} />
        </div>

        {/* Section 4 — The One Bet */}
        <div
          style={{
            marginBottom: 64,
            paddingTop: 48,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          {/* Section heading */}
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.01em",
              marginBottom: 24,
            }}
          >
            The One Bet
          </h2>
          <OneBetPanel oneBet={data.oneBet} />
        </div>

        {/* Section 5 — What We Noticed */}
        {patterns && patterns.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
                marginBottom: 24,
              }}
            >
              What we noticed across all {meta.totalPersonas} personas
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto"
              style={{ maxWidth: "80%" }}
            >
              {patterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="rounded-[16px]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: CARD_SHADOW,
                    padding: "28px 32px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 24,
                  }}
                >
                  {/* Main: Title + Description (left) */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#1A1A1A",
                        lineHeight: 1.35,
                        marginBottom: 10,
                      }}
                    >
                      {pattern.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {pattern.description}
                    </p>
                  </div>
                  {/* Number on the right */}
                  <div className="flex-shrink-0" style={{ alignSelf: "flex-start" }}>
                    <p
                      className="tabular-nums"
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: ACCENT,
                        lineHeight: 1,
                      }}
                    >
                      {pattern.stat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6 — Persona Quotes */}
        {quotes && quotes.length > 0 && (
          <section style={{ marginBottom: 48, paddingTop: 48 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
                marginBottom: 24,
              }}
            >
              What personas said
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((item, idx) => {
                const dropScreen =
                  item.dropScreen ??
                  (item.attribution.match(/Dropped at (S\d+)/i)?.[1] ?? "");
                return (
                  <div
                    key={idx}
                    className="rounded-[14px] p-6 relative"
                    style={{ backgroundColor: "#FFFFFF", boxShadow: CARD_SHADOW }}
                  >
                    {dropScreen && (
                      <span
                        className="absolute top-6 right-6"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#DC2626",
                          backgroundColor: "#FEF2F2",
                          padding: "4px 10px",
                          borderRadius: 100,
                        }}
                      >
                        Dropped · {dropScreen}
                      </span>
                    )}
                    <p
                      className="italic"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1A1A1A",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.quote}
                    </p>
                    <div
                      className="mt-4 pt-4"
                      style={{ borderTop: "1px solid #F3F4F6" }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1A1A1A",
                        }}
                      >
                        {item.attribution.split(" · ")[0]}
                      </span>
                      <span style={{ fontSize: 12, color: "#9CA3AF", margin: "0 6px" }}>
                        ·
                      </span>
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                        {item.attribution.split(" · ").slice(1).join(" · ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 7 — Footer */}
        <footer
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid #E5E7EB", marginTop: 48 }}
        >
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>
            {meta.product} · {meta.flow} · AI Persona Simulation · {meta.date}
          </p>
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>
            {meta.totalPersonas} personas · {screens.length} screens ·{" "}
            {meta.completionRate}% completion
          </p>
        </footer>
      </div>
    </div>
  );
}
