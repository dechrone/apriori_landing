"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Route, BarChart3 } from "lucide-react";

interface AuditSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const auditOptions = [
  {
    id: "product-flow",
    title: "Product Flow Audit",
    description:
      "Analyze user journeys, retention loops, and UX friction points using persona simulation.",
    icon: Route,
    href: "/audit/product-flow",
  },
  {
    id: "ad-portfolio",
    title: "Ad Portfolio Audit",
    description:
      "Evaluate creative fatigue, targeting efficiency, and ROAS potential.",
    icon: BarChart3,
    href: "/audit/ad-portfolio",
  },
];

export function AuditSelectionModal({ isOpen, onClose }: AuditSelectionModalProps) {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleCardClick = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-bg-secondary rounded-[var(--radius-lg)] p-6 md:p-8 shadow-[var(--shadow-xl)]">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-h3 md:text-2xl text-text-primary mb-2">
                    Choose Your Simulation
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Select the specific simulation engine for your product needs.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-bg-hover transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Audit Type Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {auditOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleCardClick(option.href)}
                      className="group relative text-left p-6 rounded-[var(--radius-md)] bg-bg-elevated hover:bg-bg-hover shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
                      whileHover={{
                        scale: 1.02,
                        y: -4,
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-accent-gold/10 flex items-center justify-center mb-4 group-hover:bg-accent-gold/15 transition-colors">
                          <Icon size={24} className="text-accent-gold" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                          {option.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {option.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity">
                          Select →
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
