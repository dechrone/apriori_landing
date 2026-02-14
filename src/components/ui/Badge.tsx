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

interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
}

function Tag({ children, onRemove, className = "" }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1.5
        bg-bg-elevated border border-border-subtle
        rounded-full text-body-sm text-text-secondary
        ${className}
      `}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-accent-red transition-colors"
          aria-label="Remove"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export { Badge, Tag };
export type { BadgeProps, TagProps };

