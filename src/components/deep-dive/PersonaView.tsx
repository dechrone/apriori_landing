"use client";

import { useState } from "react";
import type { PersonaDetail } from "@/types/flow-analysis";
import { PersonaIdentityCard } from "./PersonaIdentityCard";
import { JourneyTimeline } from "./JourneyTimeline";
import {
  buildJourneyNodes,
  extractName,
  getAvatarColor,
} from "@/utils/deepDiveHelpers";

interface Props {
  personas: PersonaDetail[];
}

export function PersonaView({ personas }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const persona = personas[selectedIdx];

  if (!persona) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ padding: 48, color: "#9CA3AF" }}
      >
        <p style={{ fontSize: 15 }}>No personas available.</p>
      </div>
    );
  }

  const nodes = buildJourneyNodes(persona);

  return (
    <div className="flex justify-center" style={{ padding: "24px 24px 64px" }}>
      {/* Container with max width */}
      <div className="flex gap-6" style={{ maxWidth: "66.666%", width: "100%" }}>
        {/* ── Left rail — persona selector ── */}
        <div
          className="shrink-0 flex flex-col gap-1"
          style={{ width: 200 }}
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
          Personas ({personas.length})
        </p>
        {personas.map((p, i) => {
          const name = extractName(p);
          const firstName = name.split(" ")[0];
          const color = getAvatarColor(firstName);
          const active = i === selectedIdx;

          return (
            <button
              key={p.persona_uuid}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className="w-full text-left rounded-lg transition-colors"
              style={{
                padding: "8px 10px",
                backgroundColor: active ? "#FFFFFF" : "transparent",
                boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                cursor: "pointer",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {firstName.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#0F172A" : "#64748B",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {firstName}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "#94A3B8",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.demographics.age}y · {p.demographics.district}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Right panel — persona detail ── */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <PersonaIdentityCard persona={persona} />

        {/* Journey Timeline */}
        <div
          className="rounded-xl"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            padding: "20px 16px",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              marginBottom: 16,
            }}
          >
            Journey Timeline
          </p>
          <JourneyTimeline
            nodes={nodes}
            personaUuid={persona.persona_uuid}
          />
        </div>

        {/* Overall monologue */}
        {persona.overall_monologue && (
          <div
            className="rounded-xl"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
              padding: "16px",
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#94A3B8",
                marginBottom: 8,
              }}
            >
              Overall Reflection
            </p>
            <div
              style={{
                borderLeft: "3px solid #CBD5E1",
                padding: "8px 14px",
                backgroundColor: "#F8FAFC",
                borderRadius: "0 6px 6px 0",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{persona.overall_monologue}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
