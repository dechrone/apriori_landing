"use client";

import { ReactNode } from "react";

type BadgeVariant = "default" | "amber" | "success" | "warning" | "muted";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-border-subtle text-text-secondary",
  amber: "bg-amber-dim text-amber border border-amber/20",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  muted: "bg-elevated/50 text-text-tertiary",
};

function Badge({ children, variant = "default", icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        text-xs font-medium
        rounded-[var(--radius-sm)]
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };

