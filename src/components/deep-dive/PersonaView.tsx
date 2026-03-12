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

const PAGE_LIMIT = 10;

interface Props {
  personas: PersonaDetail[];
}

function PersonaListRow({
  p,
  idx,
  selectedIdx,
  onSelect,
  accentColor,
}: {
  p: PersonaDetail;
  idx: number;
  selectedIdx: number;
  onSelect: (i: number) => void;
  accentColor: string;
}) {
  const name = extractName(p);
  const firstName = name.split(" ")[0];
  const color = getAvatarColor(firstName);
  const active = idx === selectedIdx;

  return (
    <button
      type="button"
      onClick={() => onSelect(idx)}
      className="w-full text-left rounded-lg transition-all"
      style={{
        padding: "7px 9px",
        backgroundColor: active ? "#FFFFFF" : "transparent",
        boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        cursor: "pointer",
        border: active ? `1px solid ${accentColor}40` : "1px solid transparent",
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
          backgroundColor: active ? color : `${color}99`,
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {firstName.charAt(0).toUpperCase()}
      </div>
      <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
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
}

function PersonaColumn({
  label,
  accentColor,
  bgColor,
  borderColor,
  items,
  selectedIdx,
  onSelect,
}: {
  label: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  items: { p: PersonaDetail; idx: number }[];
  selectedIdx: number;
  onSelect: (i: number) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, PAGE_LIMIT);
  const remaining = items.length - PAGE_LIMIT;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        flex: 1,
        border: `1.5px solid ${borderColor}`,
        backgroundColor: bgColor,
        minWidth: 0,
      }}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-1.5 shrink-0"
        style={{
          padding: "8px 10px 7px",
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: accentColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.07em",
            color: accentColor,
            flex: 1,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: accentColor,
            background: `${accentColor}18`,
            borderRadius: 100,
            padding: "1px 6px",
            flexShrink: 0,
          }}
        >
          {items.length}
        </span>
      </div>

      {/* Persona rows */}
      <div style={{ padding: "6px 4px" }} className="flex flex-col gap-0.5">
        {visible.map(({ p, idx }) => (
          <PersonaListRow
            key={p.persona_uuid}
            p={p}
            idx={idx}
            selectedIdx={selectedIdx}
            onSelect={onSelect}
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Show more / less */}
      {items.length > PAGE_LIMIT && (
        <div style={{ padding: "0 4px 8px" }}>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="w-full transition-colors"
            style={{
              padding: "5px 6px",
              borderRadius: 7,
              fontSize: 10,
              fontWeight: 600,
              color: accentColor,
              backgroundColor: `${accentColor}10`,
              border: `1px dashed ${accentColor}50`,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {showAll ? "Show less" : `+ ${remaining} more`}
          </button>
        </div>
      )}
    </div>
  );
}

export function PersonaView({ personas }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const persona = personas[selectedIdx];

  const completedItems = personas
    .map((p, i) => ({ p, idx: i }))
    .filter(({ p }) => p.outcome === "completed");

  const droppedItems = personas
    .map((p, i) => ({ p, idx: i }))
    .filter(({ p }) => p.outcome !== "completed");

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
    <div className="flex" style={{ padding: "24px 24px 64px" }}>
      <div className="flex gap-6" style={{ width: "100%" }}>

        {/* ── Left rail — two always-open columns ── */}
        <div className="shrink-0 flex gap-2" style={{ width: 320 }}>
          <PersonaColumn
            label="Done"
            accentColor="#16A34A"
            bgColor="#F0FDF4"
            borderColor="#86EFAC"
            items={completedItems}
            selectedIdx={selectedIdx}
            onSelect={setSelectedIdx}
          />
          <PersonaColumn
            label="Dropped"
            accentColor="#DC2626"
            bgColor="#FFF5F5"
            borderColor="#FCA5A5"
            items={droppedItems}
            selectedIdx={selectedIdx}
            onSelect={setSelectedIdx}
          />
        </div>

        {/* ── Right panel ── */}
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

          {/* Overall Reflection */}
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
                  borderLeft: `3px solid ${persona.outcome === "completed" ? "#BBF7D0" : "#FECACA"}`,
                  padding: "8px 14px",
                  backgroundColor: persona.outcome === "completed" ? "#F0FDF4" : "#FFF5F5",
                  borderRadius: "0 6px 6px 0",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    color: "#374151",
                    lineHeight: 1.65,
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
