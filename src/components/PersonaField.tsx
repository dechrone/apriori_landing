"use client";

import { motion } from "framer-motion";

/**
 * A grid of synthetic persona silhouettes in a contained box on the right.
 * All always visible but dim. Each lights up when their thought appears.
 * Represents target audience being simulated.
 */

const personas = [
  { id: 0, label: "Priya, 28", desc: "First-time renter", thought: "This pricing feels too enterprise for me.", row: 0, col: 0 },
  { id: 1, label: "Amit, 35", desc: "Salaried professional", thought: "Where do I upload my documents?", row: 0, col: 1 },
  { id: 2, label: "Sneha, 24", desc: "Gig worker", thought: "I don\u2019t trust this page yet.", row: 0, col: 2 },
  { id: 3, label: "Raj, 42", desc: "Small business owner", thought: "Why am I being asked for my PAN number here?", row: 1, col: 0 },
  { id: 4, label: "Meera, 31", desc: "Working mother", thought: "This is exactly what I need.", row: 1, col: 1 },
  { id: 5, label: "Karan, 22", desc: "College student", thought: "Too many steps. I will come back later.", row: 1, col: 2 },
];

const CYCLE = 4; // seconds each persona is highlighted
const TOTAL = personas.length * CYCLE; // full cycle duration

function PersonaSilhouette({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="8" r="4.5" fill="currentColor" />
      <path d="M5 25 C5 18 8.5 15 14 15 C19.5 15 23 18 23 25" fill="currentColor" />
    </svg>
  );
}

export function PersonaField() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[50%] hidden md:flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="relative w-full max-w-[420px] mr-8">
        {/* Container label */}
        <div className="text-[10px] font-medium tracking-[0.15em] uppercase mb-4" style={{ color: "#B8AE9C" }}>
          Simulating your target audience
        </div>

        {/* Persona grid */}
        <div className="grid grid-cols-3 gap-4">
          {personas.map((persona) => (
            <div key={persona.id} className="relative">
              {/* Card - always visible, highlighted when active */}
              <motion.div
                className="relative rounded-lg p-3 border transition-colors duration-500"
                style={{ borderColor: "transparent" }}
                animate={{
                  borderColor: [
                    "transparent",
                    "transparent",
                    "rgba(184, 134, 11, 0.3)",
                    "rgba(184, 134, 11, 0.3)",
                    "transparent",
                  ],
                  backgroundColor: [
                    "rgba(248, 246, 241, 0)",
                    "rgba(248, 246, 241, 0)",
                    "rgba(248, 246, 241, 0.8)",
                    "rgba(248, 246, 241, 0.8)",
                    "rgba(248, 246, 241, 0)",
                  ],
                }}
                transition={{
                  duration: CYCLE,
                  delay: persona.id * CYCLE,
                  repeat: Infinity,
                  repeatDelay: TOTAL - CYCLE,
                  ease: "easeInOut",
                }}
              >
                {/* Silhouette icon */}
                <motion.div
                  className="mb-2"
                  style={{ color: "#D4C9B0" }}
                  animate={{
                    color: [
                      "#D4C9B0",
                      "#D4C9B0",
                      "#B8860B",
                      "#B8860B",
                      "#D4C9B0",
                    ],
                  }}
                  transition={{
                    duration: CYCLE,
                    delay: persona.id * CYCLE,
                    repeat: Infinity,
                    repeatDelay: TOTAL - CYCLE,
                    ease: "easeInOut",
                  }}
                >
                  <PersonaSilhouette size={24} />
                </motion.div>

                {/* Name + descriptor */}
                <div className="text-[11px] font-medium text-text-primary leading-tight">
                  {persona.label}
                </div>
                <div className="text-[10px] text-text-tertiary leading-tight mt-0.5">
                  {persona.desc}
                </div>
              </motion.div>

              {/* Thought bubble - appears below the card when active */}
              <motion.div
                className="mt-1.5 px-2.5 py-1.5 rounded text-[10px] leading-[1.45] italic"
                style={{
                  color: "#8B7340",
                  backgroundColor: "rgba(184, 134, 11, 0.05)",
                }}
                animate={{
                  opacity: [0, 0, 0.9, 0.9, 0],
                  y: [4, 4, 0, 0, -2],
                }}
                transition={{
                  duration: CYCLE,
                  delay: persona.id * CYCLE,
                  repeat: Infinity,
                  repeatDelay: TOTAL - CYCLE,
                  ease: "easeInOut",
                }}
              >
                &ldquo;{persona.thought}&rdquo;
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
