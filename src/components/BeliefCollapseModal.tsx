"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { Badge } from "./ui/Badge";
import { Persona } from "@/config/content";

interface BeliefCollapseModalProps {
  persona: Persona;
  onClose: () => void;
}

const terminalLines = (persona: Persona): string[] => [
  `> Initializing scenario: ${persona.scenario.location}`,
  `> Loading persona: ${persona.name}`,
  `> Analyzing 247 behavioral heuristics...`,
  `> Evaluating trust signals...`,
  `> Processing commitment friction...`,
  `>`,
  `> CRITICAL THRESHOLD DETECTED`,
  `> Belief Collapse at: ${persona.scenario.location}`,
  `>`,
  `> CONFIDENCE: ${(90 + Math.random() * 8).toFixed(1)}% | SEVERITY: HIGH`,
];

export function BeliefCollapseModal({ persona, onClose }: BeliefCollapseModalProps) {
  const [phase, setPhase] = useState<"terminal" | "flash" | "breakdown">("terminal");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  const lines = terminalLines(persona);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (phase === "terminal") {
      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < lines.length) {
          setVisibleLines((prev) => [...prev, lines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowCursor(false);
            setPhase("flash");
          }, 500);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [phase, lines]);

  useEffect(() => {
    if (phase === "flash") {
      setTimeout(() => setPhase("breakdown"), 200);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Flash Effect */}
        <AnimatePresence>
          {phase === "flash" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 bg-amber pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <GlassCard padding="none" className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-dim flex items-center justify-center">
                  <persona.icon size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">{persona.name}</h3>
                  <p className="text-tiny text-text-tertiary">{persona.descriptor}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-elevated/50 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Terminal Phase */}
            {phase === "terminal" && (
              <div className="p-4 bg-[#0d0d0d] font-mono text-sm">
                <div className="space-y-1">
                  {visibleLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`${
                        line.includes("CRITICAL") || line.includes("Belief Collapse")
                          ? "text-amber"
                          : line.includes("CONFIDENCE")
                          ? "text-amber font-semibold"
                          : "text-text-secondary"
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                  {showCursor && (
                    <span className="inline-block w-2 h-4 bg-amber animate-cursor" />
                  )}
                </div>
              </div>
            )}

            {/* Breakdown Phase */}
            {phase === "breakdown" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Alert Banner */}
                <div className="p-4 bg-amber/10 border-b border-amber/20 flex items-center gap-3">
                  <AlertTriangle className="text-amber shrink-0" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold text-amber">BELIEF COLLAPSE DETECTED</h4>
                    <p className="text-sm text-text-secondary">
                      Severity: HIGH | Confidence: {(90 + Math.random() * 8).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Breakdown Content */}
                <div className="p-6 space-y-6">
                  {/* Location & Trigger */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-elevated/30 border border-border-subtle">
                      <span className="text-tiny text-text-tertiary uppercase tracking-wider block mb-1">
                        Location
                      </span>
                      <span className="text-sm text-text-primary font-medium">
                        {persona.scenario.location}
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-elevated/30 border border-border-subtle">
                      <span className="text-tiny text-text-tertiary uppercase tracking-wider block mb-1">
                        Trigger
                      </span>
                      <span className="text-sm text-amber font-medium">
                        &quot;{persona.scenario.trigger}&quot;
                      </span>
                    </div>
                  </div>

                  {/* Persona Response */}
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-amber rounded-full" />
                      Persona Response
                    </h5>
                    <blockquote className="pl-4 border-l-2 border-border-emphasis text-text-secondary italic">
                      &quot;{persona.scenario.response}&quot;
                    </blockquote>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-400" />
                      Recommended Changes
                    </h5>
                    <ul className="space-y-2">
                      {persona.scenario.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Reduction */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-emerald-400" size={20} />
                      <span className="text-sm text-text-secondary">Risk Reduction</span>
                    </div>
                    <Badge variant="success" className="text-lg font-semibold">
                      -{persona.scenario.riskReduction}%
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

