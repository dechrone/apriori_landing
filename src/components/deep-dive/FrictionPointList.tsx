"use client";

import {
  categorizeFriction,
  FRICTION_CONFIG,
} from "@/utils/deepDiveHelpers";
import type { FrictionCategory } from "@/types/deepDive";

interface Props {
  frictionPoints: string[];
  missingElement?: string;
}

export function FrictionPointList({ frictionPoints, missingElement }: Props) {
  if (frictionPoints.length === 0 && !missingElement) return null;

  // Categorize and group
  const grouped: Record<FrictionCategory, string[]> = {
    trust: [],
    clarity: [],
    ux: [],
  };

  frictionPoints.forEach((fp) => {
    const cat = categorizeFriction(fp);
    grouped[cat].push(fp);
  });

  const order: FrictionCategory[] = ["trust", "clarity", "ux"];

  return (
    <div className="flex flex-col gap-3">
      {order.map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        const config = FRICTION_CONFIG[cat];

        return (
          <div key={cat}>
            {/* Category header */}
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 6,
              }}
              className={config.textClass}
            >
              {config.icon} {config.label}
            </p>

            {/* Items */}
            <ul className="flex flex-col gap-1.5" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {items.map((item, i) => (
                <li
                  key={i}
                  className={`${config.borderClass} ${config.bgClass}`}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "0 6px 6px 0",
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "#374151",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {/* Missing element callout */}
      {missingElement && (
        <div
          style={{
            border: "1px dashed #CBD5E1",
            borderRadius: 8,
            backgroundColor: "#F8FAFC",
            padding: "10px 12px",
            marginTop: 4,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94A3B8",
              marginBottom: 4,
            }}
          >
            💡 What would have helped
          </p>
          <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
            {missingElement}
          </p>
        </div>
      )}
    </div>
  );
}
