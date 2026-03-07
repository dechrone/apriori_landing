"use client";

import { useState } from "react";
import type { FrictionPattern } from "@/types/deepDive";
import type { PersonaDetail } from "@/types/flow-analysis";
import {
  FRICTION_CONFIG,
  getAvatarColor,
  extractName,
} from "@/utils/deepDiveHelpers";

interface Props {
  patterns: FrictionPattern[];
  allPersonas: PersonaDetail[];
}

export function PatternSummaryBanner({ patterns, allPersonas }: Props) {
  const [showAll, setShowAll] = useState(false);

  if (patterns.length === 0) return null;

  // Build uuid→name lookup
  const nameMap = new Map<string, string>();
  allPersonas.forEach((p) => {
    nameMap.set(p.persona_uuid, extractName(p));
  });

  const visiblePatterns = showAll ? patterns : patterns.slice(0, 2);

  return (
    <div style={{ marginBottom: 20 }}>
      {/* ── Signal chips row ── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {patterns.map((pattern) => {
          const config = FRICTION_CONFIG[pattern.category];
          const isHighFrequency = pattern.count / pattern.total >= 0.5;

          return (
            <span
              key={pattern.id}
              className={`inline-flex items-center gap-1 ${config.bgClass} ${config.textClass}`}
              style={{
                padding: "4px 10px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: isHighFrequency ? 700 : 500,
                border: isHighFrequency
                  ? `1.5px solid currentColor`
                  : "1px solid transparent",
              }}
            >
              {config.icon} {pattern.title} · {pattern.count} of{" "}
              {pattern.total}
            </span>
          );
        })}
      </div>

      {/* ── Top pattern cards ── */}
      <div className="flex flex-col gap-3">
        {visiblePatterns.map((pattern) => {
          const config = FRICTION_CONFIG[pattern.category];
          const avatarUuids = pattern.personaUuids.slice(0, 4);
          const overflow = pattern.personaUuids.length - 4;

          return (
            <div
              key={pattern.id}
              className="rounded-lg"
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid #E2E8F0",
                padding: 12,
              }}
            >
              {/* Category */}
              <p
                className={config.textClass}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                {config.icon} {config.label}
              </p>

              {/* Title */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1E293B",
                  marginBottom: 2,
                }}
              >
                {pattern.title}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  marginBottom: 8,
                }}
              >
                {pattern.description}
              </p>

              {/* Avatar stack */}
              <div className="flex items-center gap-0">
                {avatarUuids.map((uuid, i) => {
                  const name = nameMap.get(uuid) ?? "?";
                  const color = getAvatarColor(name.split(" ")[0]);
                  return (
                    <div
                      key={uuid}
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: color,
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: 700,
                        border: "2px solid #F8FAFC",
                        marginLeft: i > 0 ? -6 : 0,
                        zIndex: 10 - i,
                      }}
                      title={name}
                    >
                      {name.charAt(0).toUpperCase()}
                    </div>
                  );
                })}
                {overflow > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      marginLeft: 4,
                    }}
                  >
                    +{overflow} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show all / collapse */}
      {patterns.length > 2 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#6366F1",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: 8,
            padding: 0,
          }}
        >
          {showAll
            ? "Show less"
            : `Show all ${patterns.length} patterns`}
        </button>
      )}
    </div>
  );
}
