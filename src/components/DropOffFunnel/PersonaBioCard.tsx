"use client";

import React from "react";

interface Props {
  display_name: string;
  short_label: string;
  avatar_color: string;
  occupation: string;
  age: number | null;
  district: string;
  archetype?: string;
}

export function PersonaBioCard({
  display_name,
  short_label,
  avatar_color,
  occupation,
  age,
  district,
  archetype,
}: Props) {
  const subtextParts = [occupation, age ? `${age}` : null, district].filter(Boolean);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: avatar_color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
          }}
        >
          {short_label}
        </span>
      </div>

      {/* Text */}
      <div>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#0D0D14",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            lineHeight: 1.3,
          }}
        >
          {display_name}
        </p>
        {subtextParts.length > 0 && (
          <p
            style={{
              fontSize: 13,
              color: "#9090A8",
              fontFamily: "var(--font-inter), sans-serif",
              lineHeight: 1.3,
              marginTop: 2,
            }}
          >
            {subtextParts.join(" · ")}
          </p>
        )}
        {archetype && (
          <span
            style={{
              display: "inline-block",
              marginTop: 4,
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              background: "#F3F4F6",
              border: "1px solid #D1D5DB",
              borderRadius: 12,
              padding: "2px 8px",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            {archetype}
          </span>
        )}
      </div>
    </div>
  );
}
