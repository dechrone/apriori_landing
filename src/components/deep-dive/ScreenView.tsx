"use client";

import { useState, useMemo } from "react";
import type { PersonaDetail } from "@/types/flow-analysis";
import { ScreenNavigator } from "./ScreenNavigator";
import { PatternSummaryBanner } from "./PatternSummaryBanner";
import { PersonaScreenCard } from "./PersonaScreenCard";
import { PersonaIdentityCard } from "./PersonaIdentityCard";
import {
  buildScreenSummaries,
  aggregateFrictionPatterns,
  extractName,
  getAvatarColor,
} from "@/utils/deepDiveHelpers";

interface Props {
  personas: PersonaDetail[];
}

export function ScreenView({ personas }: Props) {
  const summaries = useMemo(
    () => buildScreenSummaries(personas),
    [personas]
  );

  const [activeScreenId, setActiveScreenId] = useState(
    summaries[0]?.screenId ?? ""
  );

  // Personas that have a monologue for the active screen
  const personasOnActiveScreen = useMemo(() => {
    return personas
      .map((p) => {
        const monologue = p.screen_monologues.find(
          (s) => s.screen_id === activeScreenId
        );
        return monologue ? { persona: p, monologue } : null;
      })
      .filter(Boolean) as Array<{
      persona: PersonaDetail;
      monologue: PersonaDetail["screen_monologues"][0];
    }>;
  }, [personas, activeScreenId]);

  // Friction patterns for the active screen
  const patterns = useMemo(() => {
    const input = personasOnActiveScreen.map((p) => ({
      uuid: p.persona.persona_uuid,
      frictionPoints: p.monologue.friction_points,
    }));
    return aggregateFrictionPatterns(input);
  }, [personasOnActiveScreen]);

  const activeSummary = summaries.find((s) => s.screenId === activeScreenId);

  return (
    <div className="flex gap-6" style={{ padding: "24px 24px 64px" }}>
      {/* ── Left rail — Screen Navigator ── */}
      <div
        className="shrink-0"
        style={{
          width: 220,
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#94A3B8",
            marginBottom: 8,
            paddingLeft: 4,
          }}
        >
          Screens ({summaries.length})
        </p>
        <ScreenNavigator
          summaries={summaries}
          activeScreenId={activeScreenId}
          onSelect={setActiveScreenId}
        />
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 min-w-0">
        {/* Screen header */}
        {activeSummary && (
          <div
            className="flex items-center justify-between mb-5"
            style={{
              padding: "10px 16px",
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0F172A",
                  margin: 0,
                }}
              >
                {activeSummary.screenLabel}
              </h2>
              <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
                {activeSummary.totalPersonas} personas reached this screen
                {activeSummary.dropOffCount > 0 && (
                  <span style={{ color: "#DC2626", fontWeight: 600 }}>
                    {" "}
                    · {activeSummary.dropOffCount} dropped off
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Pattern summary banner */}
        <PatternSummaryBanner
          patterns={patterns}
          allPersonas={personas}
        />

        {/* Persona cards */}
        <div className="flex flex-col gap-4">
          {personasOnActiveScreen.map(({ persona, monologue }) => {
            const name = extractName(persona);
            const firstName = name.split(" ")[0];
            const avatarColor = getAvatarColor(firstName);

            return (
              <div key={persona.persona_uuid}>
                {/* Mini persona identifier */}
                <div
                  className="flex items-center gap-2 mb-2"
                  style={{ paddingLeft: 2 }}
                >
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: avatarColor,
                      color: "#FFFFFF",
                      fontSize: 9,
                      fontWeight: 700,
                    }}
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    {name}
                  </span>
                  <span style={{ fontSize: 11, color: "#94A3B8" }}>
                    · {persona.demographics.age}y ·{" "}
                    {persona.demographics.district}
                  </span>
                </div>

                <PersonaScreenCard
                  monologue={monologue}
                  defaultCollapsed
                />
              </div>
            );
          })}

          {personasOnActiveScreen.length === 0 && (
            <div
              className="flex items-center justify-center"
              style={{ padding: 48, color: "#9CA3AF" }}
            >
              <p style={{ fontSize: 14 }}>
                No personas reached this screen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
