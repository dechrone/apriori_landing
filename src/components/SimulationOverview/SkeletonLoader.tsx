"use client";

import COLORS from "./utils/colorHelpers";

/** Skeleton placeholder block with shimmer animation */
function SkeletonBlock({
  width = "100%",
  height = 20,
  radius = 8,
  style,
}: {
  width?: string | number;
  height?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="sim-skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${COLORS.bgSurface} 25%, ${COLORS.bgElevated} 50%, ${COLORS.bgSurface} 75%)`,
        backgroundSize: "200% 100%",
        ...style,
      }}
    />
  );
}

/** Card-shaped skeleton */
function SkeletonCard({ height = 120 }: { height?: number }) {
  return (
    <div
      style={{
        background: COLORS.bgSurface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <SkeletonBlock width={120} height={14} />
      <SkeletonBlock width="60%" height={height > 100 ? 40 : 24} />
      <SkeletonBlock width="80%" height={14} />
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div
      style={{
        background: COLORS.bgBase,
        minHeight: "100vh",
        padding: "32px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Verdict banner skeleton */}
        <SkeletonBlock height={100} radius={16} style={{ marginBottom: 32 }} />

        {/* Hero metrics skeleton */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 80,
          }}
          className="sim-hero-grid"
        >
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Screen health skeleton */}
        <div style={{ marginBottom: 80 }}>
          <SkeletonBlock width={200} height={22} style={{ marginBottom: 20 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} height={80} />
            ))}
          </div>
        </div>

        {/* Emotional journey skeleton */}
        <div style={{ marginBottom: 80 }}>
          <SkeletonBlock width={240} height={22} style={{ marginBottom: 20 }} />
          <SkeletonCard height={140} />
        </div>

        {/* Friction points skeleton */}
        <div style={{ marginBottom: 80 }}>
          <SkeletonBlock width={220} height={22} style={{ marginBottom: 20 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} height={80} />
            ))}
          </div>
        </div>

        {/* Behavioral insights skeleton */}
        <div style={{ marginBottom: 80 }}>
          <SkeletonBlock width={260} height={22} style={{ marginBottom: 20 }} />
          {[1, 2, 3].map((i) => (
            <SkeletonBlock
              key={i}
              width="80%"
              height={18}
              style={{ marginBottom: 28 }}
            />
          ))}
        </div>

        {/* More skeletons */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ marginBottom: 80 }}>
            <SkeletonBlock width={200} height={22} style={{ marginBottom: 20 }} />
            <SkeletonCard height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
