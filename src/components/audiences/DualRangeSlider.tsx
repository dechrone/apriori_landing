"use client";

import { useCallback, useRef, useState, useEffect } from "react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
  formatLabel?: (val: number) => string;
  prefix?: string;
}

export function DualRangeSlider({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
  formatLabel,
  prefix = "",
}: DualRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const pct = (val: number) => ((val - min) / (max - min)) * 100;

  const handlePointerDown = useCallback(
    (which: "min" | "max") => (e: React.PointerEvent) => {
      e.preventDefault();
      setDragging(which);
    },
    []
  );

  const resolveValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return null;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = min + ratio * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      const val = resolveValue(e.clientX);
      if (val === null) return;
      if (dragging === "min") {
        onChange(Math.min(val, valueMax - step), valueMax);
      } else {
        onChange(valueMin, Math.max(val, valueMin + step));
      }
    };
    const onUp = () => setDragging(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, valueMin, valueMax, onChange, resolveValue, step]);

  const fmt = formatLabel || ((v: number) => `${prefix}${v}`);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={fmt(valueMin)}
          readOnly
          className="w-[72px] text-center border border-[#E5E7EB] rounded-md px-2 py-1.5 text-[14px] text-[#1A1A1A] bg-white"
        />
        <div ref={trackRef} className="flex-1 relative h-[4px] bg-[#E5E7EB] rounded-full cursor-pointer">
          <div
            className="absolute top-0 h-full bg-[#F59E0B] rounded-full"
            style={{
              left: `${pct(valueMin)}%`,
              width: `${pct(valueMax) - pct(valueMin)}%`,
            }}
          />
          {/* Min handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#F59E0B] shadow-[0_1px_4px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing z-10"
            style={{ left: `${pct(valueMin)}%` }}
            onPointerDown={handlePointerDown("min")}
          />
          {/* Max handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#F59E0B] shadow-[0_1px_4px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing z-10"
            style={{ left: `${pct(valueMax)}%` }}
            onPointerDown={handlePointerDown("max")}
          />
        </div>
        <input
          type="text"
          value={fmt(valueMax)}
          readOnly
          className="w-[72px] text-center border border-[#E5E7EB] rounded-md px-2 py-1.5 text-[14px] text-[#1A1A1A] bg-white"
        />
      </div>
      <p className="text-[12px] text-[#6B7280] text-center">
        {fmt(valueMin)} – {fmt(valueMax)}
      </p>
    </div>
  );
}
