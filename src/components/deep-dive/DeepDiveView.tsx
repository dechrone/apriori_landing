"use client";

// import { useState } from "react";
import type { PersonaDetail } from "@/types/flow-analysis";
import { PersonaView } from "./PersonaView";
// import { ScreenView } from "./ScreenView";
// import { Monitor, User } from "lucide-react";

// const ACCENT = "#E8583A";

// type ViewMode = "screen" | "persona";

interface Props {
  personas: PersonaDetail[];
}

export function DeepDiveView({ personas }: Props) {
  // const [mode, setMode] = useState<ViewMode>("screen");

  return (
    <div style={{ backgroundColor: "#F5F4F2" }}>
      {/* ── Mode Switcher — commented out, only Persona View for now ── */}
      {/*
      <div
        className="flex items-center justify-between"
        style={{ padding: "20px 24px 0" }}
      >
        <div
          className="inline-flex"
          style={{
            borderRadius: 8,
            backgroundColor: "#F3F4F6",
            padding: 3,
          }}
        >
          <button
            type="button"
            onClick={() => setMode("screen")}
            className="flex items-center gap-1.5 transition-colors"
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: mode === "screen" ? 600 : 500,
              backgroundColor: mode === "screen" ? ACCENT : "transparent",
              color: mode === "screen" ? "#FFFFFF" : "#6B7280",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Monitor size={15} />
            Screen View
          </button>
          <button
            type="button"
            onClick={() => setMode("persona")}
            className="flex items-center gap-1.5 transition-colors"
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: mode === "persona" ? 600 : 500,
              backgroundColor: mode === "persona" ? ACCENT : "transparent",
              color: mode === "persona" ? "#FFFFFF" : "#6B7280",
              border: "none",
              cursor: "pointer",
            }}
          >
            <User size={15} />
            Persona View
          </button>
        </div>

        <p style={{ fontSize: 13, fontWeight: 400, color: "#9CA3AF" }}>
          {personas.length} personas
        </p>
      </div>
      */}

      {/* ── View Content — Screen View commented out ── */}
      {/* {mode === "screen" ? (
        <ScreenView personas={personas} />
      ) : (
        <PersonaView personas={personas} />
      )} */}
      <PersonaView personas={personas} />
    </div>
  );
}
