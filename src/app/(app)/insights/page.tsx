"use client";

import { useState, useCallback } from "react";
import { SimulationOverview } from "@/components/SimulationOverview";
import type { SimulationData } from "@/types/simulation";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";

export default function InsightsPage() {
  const { toggleMobileMenu } = useAppShell();
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target?.result as string);
        // Support both root-level data and wrapped { type, data } format
        const data = json.data ?? json;
        setSimulationData(data as SimulationData);
      } catch {
        setError("Failed to parse JSON file. Please check the file format.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setIsLoading(false);
    };
    reader.readAsText(file);
  }, []);

  return (
    <>
      <TopBar
        title="Insights"
        onMenuClick={toggleMobileMenu}
      />

      {!simulationData && !isLoading && !error ? (
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="max-w-[1600px] mx-auto flex items-center justify-center h-[60vh] px-4">
            <div className="text-center space-y-4 max-w-xl">
              <p className="text-h3 text-text-primary">Simulation Overview</p>
              <p className="text-[15px] text-[#4B5563] leading-[1.6]">
                Upload an insights JSON file to view the full simulation analysis — friction points,
                behavioral patterns, design recommendations, and more.
              </p>
              <label
                htmlFor="json-upload"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  background: "#F59E0B",
                  color: "#0A0E1A",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  marginTop: 16,
                }}
              >
                Upload Insights JSON
                <input
                  id="json-upload"
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Reset button */}
          {simulationData && (
            <div style={{ padding: "12px 24px", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => {
                  setSimulationData(null);
                  setError(null);
                }}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#8A8AA0",
                  background: "transparent",
                  border: "1px solid #2A2A38",
                  borderRadius: 8,
                  padding: "6px 16px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                ← Load Different File
              </button>
            </div>
          )}
          <SimulationOverview
            simulationData={simulationData!}
            isLoading={isLoading}
            error={error}
          />
        </div>
      )}
    </>
  );
}
