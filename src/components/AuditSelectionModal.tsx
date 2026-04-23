"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Route } from "lucide-react";

interface AuditSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const simulationOptions = [
  {
    id: "product-flow",
    title: "Product Flow Simulation",
    description:
      "Simulate user journeys through your product screens. See where different personas drop off and why.",
    icon: Route,
    href: "/audit/product-flow",
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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl border border-[#E8E8E8]">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-[#111] mb-1">
                    Choose Simulation Type
                  </h2>
                  <p className="text-sm text-[#555]">
                    Select what you want to simulate.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#888] hover:text-[#111] hover:bg-[#F0F0F0] transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Option Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {simulationOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleCardClick(option.href)}
                      className="group text-left p-5 rounded-lg border border-[#E8E8E8] hover:border-[#D4D4D4] hover:bg-[#FAFAFA] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111]"
                    >
                      <div className="w-10 h-10 rounded bg-[#F5F5F5] flex items-center justify-center mb-3 group-hover:bg-[#EEEEEE] transition-colors">
                        <Icon size={20} className="text-[#555]" />
                      </div>
                      <h3 className="text-sm font-semibold text-[#111] mb-1">
                        {option.title}
                      </h3>
                      <p className="text-xs text-[#555] leading-relaxed">
                        {option.description}
                      </p>
                    </button>
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
