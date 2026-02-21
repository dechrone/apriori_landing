"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      hover = false,
      glow = false,
      padding = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        className={`
          bg-bg-secondary
          rounded-[var(--radius-md)]
          shadow-[var(--shadow-card)]
          ${hover ? "cursor-pointer hover:shadow-[var(--shadow-lg)] transition-shadow duration-200" : ""}
          ${glow ? "shadow-[var(--shadow-glow-gold)]" : ""}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
