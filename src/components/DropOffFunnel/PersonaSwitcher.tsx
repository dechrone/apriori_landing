"use client";

import React from "react";
import type { PersonaAtScreen } from "./utils/parsePersonaData";

interface Props {
  personas: PersonaAtScreen[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PersonaSwitcher({ personas, activeIndex, onSelect }: Props) {
  if (personas.length <= 1) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#9090A8",
          marginBottom: 8,
          fontFamily: "var(--font-plus-jakarta), sans-serif",
        }}
      >
        Switch Persona
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {personas.map((p, i) => {
          const isActive = i === activeIndex;
          const firstName = p.display_name.split(" ")[0];

          return (
            <button
              key={p.persona_uuid}
              onClick={() => onSelect(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 20,
                border: isActive
                  ? `2px solid ${p.avatar_color}`
                  : "1px solid #E2E2EA",
                background: isActive ? `${p.avatar_color}10` : "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: isActive ? p.avatar_color : "#E5E7EB",
                  color: isActive ? "#FFF" : "#6B7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  flexShrink: 0,
                }}
              >
                {p.short_label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0D0D14" : "#6B7280",
                  fontFamily: "var(--font-inter), sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {firstName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
