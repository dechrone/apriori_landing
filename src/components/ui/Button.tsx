"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-accent-gold text-white font-semibold
    hover:bg-accent-gold-hover hover:shadow-[var(--shadow-glow-gold)]
  `,
  secondary: `
    bg-bg-secondary border border-border-medium text-text-primary
    hover:bg-bg-hover hover:border-border-strong
    shadow-[var(--shadow-sm)]
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:text-accent-gold hover:bg-accent-gold/5
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-3",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        className={`
          inline-flex items-center justify-center
          rounded-[var(--radius-sm)]
          font-medium
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          disabled:opacity-50 disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && (
          <motion.span
            className="shrink-0"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
          >
            {rightIcon}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// IconButton component
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          w-10 h-10 flex items-center justify-center
          rounded-[var(--radius-sm)] bg-transparent text-text-tertiary
          hover:bg-bg-hover hover:text-text-primary
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
          ${className}
        `}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { Button, IconButton };
export type { ButtonProps, IconButtonProps };
