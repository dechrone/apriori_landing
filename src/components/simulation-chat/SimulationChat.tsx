"use client";

import { useState } from "react";

import { MessageCircle, X } from "lucide-react";

import { ChatPanel } from "./ChatPanel";
import { useSimulationChat } from "./useSimulationChat";

interface SimulationChatProps {
  /** The simulation_id used by the backend's POST /simulations/{id}/chat route. */
  simulationId: string | null;
  /** Human-readable name (sim name or flow name) shown in the panel header. */
  title: string;
  /** Optional second line in the header (e.g. timestamp or kind). */
  subtitle?: string;
  /** Optional override of the 3 empty-state suggestion chips. */
  suggestions?: string[];
}

/**
 * Fixed bottom-right launcher + slide-in panel. Renders nothing until
 * `simulationId` is non-null — protects against showing the FAB during
 * the initial load when the page hasn't resolved its id yet.
 */
export function SimulationChat({
  simulationId,
  title,
  subtitle,
  suggestions,
}: SimulationChatProps) {
  const [open, setOpen] = useState(false);
  const chat = useSimulationChat(simulationId);

  if (!simulationId) return null;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold text-white shadow-lg transition-transform hover:scale-105 hover:bg-accent-gold-hover active:scale-95"
        title={open ? "Close chat" : "Ask about this simulation"}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <ChatPanel
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        subtitle={subtitle}
        chat={chat}
        suggestions={suggestions}
      />
    </>
  );
}
