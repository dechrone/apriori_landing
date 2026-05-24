"use client";

import React, { useEffect, useRef } from "react";

interface SquarePatternBackgroundProps {
  /** Edge length of each square in CSS pixels */
  squareSize?: number;
  /** Distance between square centers in CSS pixels */
  spacing?: number;
  /** Square fill color */
  squareColor?: string;
  /** Optional solid background behind the squares */
  backgroundColor?: string;
  /** Base opacity applied to every square (gets modulated by the wave) */
  opacity?: number;
  /** When true, applies a radial fade mask just like the BackgroundPlus reference */
  fade?: boolean;
  /** Speed of the wave (counter increment per frame) */
  speed?: number;
  /** Vertical wave amplitude in CSS pixels */
  amplitude?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated grid of squares used as a hero background.
 *
 * - The visual layout (grid of marks + radial fade) mirrors the
 *   `BackgroundPlus` reference, but with squares instead of plus signs.
 * - The motion is taken from the Three.js `DottedSurface` reference:
 *   each square's vertical offset is driven by
 *     sin((ix + t) * 0.3) + sin((iy + t) * 0.5)
 *   so the grid ripples in waves that travel diagonally across it.
 *
 * Implemented with a 2D canvas so we can animate every square independently
 * while keeping the cost low (a few hundred fillRect calls per frame).
 */
export const BackgroundSquares: React.FC<SquarePatternBackgroundProps> = ({
  squareSize = 4,
  spacing = 60,
  squareColor = "#B8860B",
  backgroundColor = "transparent",
  opacity = 0.4,
  fade = true,
  speed = 0.05,
  amplitude = 10,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const countRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Pad the grid so wave displacement never reveals an empty edge before the mask
      const padCols = 2;
      const padRows = 2;
      const cols = Math.ceil(width / spacing) + padCols * 2;
      const rows = Math.ceil(height / spacing) + padRows * 2;

      // Center the grid horizontally/vertically
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      const half = squareSize / 2;
      const t = countRef.current;

      ctx.fillStyle = squareColor;

      for (let ix = 0; ix < cols; ix++) {
        const sx = Math.sin((ix + t) * 0.3);
        for (let iy = 0; iy < rows; iy++) {
          const sy = Math.sin((iy + t) * 0.5);

          // Wave displacement -- same formula as DottedSurface's Y animation
          const dy = sx * amplitude + sy * amplitude;

          // Modulate alpha on the same wave so the ripple reads visually,
          // even though squares stay roughly in their grid cells.
          const wave = (sx + sy) * 0.5; // -1..1
          const alpha = opacity * (0.45 + 0.55 * ((wave + 1) / 2));

          const cx = offsetX + ix * spacing;
          const cy = offsetY + iy * spacing + dy;

          ctx.globalAlpha = alpha;
          ctx.fillRect(cx - half, cy - half, squareSize, squareSize);
        }
      }

      ctx.globalAlpha = 1;
      countRef.current = t + speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [squareColor, opacity, spacing, squareSize, amplitude, speed]);

  const maskStyle: React.CSSProperties = fade
    ? {
        maskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 85%)",
      }
    : {};

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ backgroundColor, ...maskStyle, ...style }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default BackgroundSquares;
