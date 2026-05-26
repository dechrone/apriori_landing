"use client";

import {
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Send, Square, X, RefreshCw } from "lucide-react";

import { Spinner } from "@/components/ui/Spinner";
import type { ChatMessage as ChatMessageData } from "@/lib/simulation-chat";

import { ChatMessage } from "./ChatMessage";
import type { UseSimulationChatResult } from "./useSimulationChat";

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  chat: UseSimulationChatResult;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "What's the biggest drop-off in this flow?",
  "Which cohort liked the result most?",
  "Top 3 fixes by impact?",
];

export function ChatPanel({
  open,
  onClose,
  title,
  subtitle,
  chat,
  suggestions = DEFAULT_SUGGESTIONS,
}: ChatPanelProps) {
  const { messages, streamingDraft, status, error, send, stop, reset } = chat;

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom whenever messages or draft change. Use layout effect
  // so the scroll happens before paint and the user never sees a jitter.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingDraft, status]);

  // Focus the textarea when the panel opens.
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => textareaRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || status === "streaming") return;
    send(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0 && status !== "streaming";
  const showFirstTokenSpinner =
    status === "streaming" && !streamingDraft && messages[messages.length - 1]?.role === "user";

  return (
    <>
      {/* Backdrop on mobile — desktop keeps content visible behind the panel. */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-white shadow-2xl transition-transform duration-200 ease-out md:w-[420px] md:border-l md:border-border-subtle ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Simulation chat"
        aria-hidden={!open}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-3 border-b border-border-subtle px-4 py-3">
          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold text-text-primary">
              Ask about this run
            </h2>
            {subtitle ? (
              <p className="mt-0.5 truncate text-[12px] text-text-tertiary">
                {title} · {subtitle}
              </p>
            ) : (
              <p className="mt-0.5 truncate text-[12px] text-text-tertiary">{title}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={reset}
                className="rounded-md p-1.5 text-text-tertiary hover:bg-[#F8F6F1] hover:text-text-primary"
                title="Start over"
                aria-label="Start over"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-text-tertiary hover:bg-[#F8F6F1] hover:text-text-primary"
              title="Close"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-[#FAF7F0] px-4 py-4"
        >
          {isEmpty ? (
            <EmptyState
              suggestions={suggestions}
              onPick={(s) => {
                send(s);
              }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} />
              ))}
              {streamingDraft && (
                <ChatMessage
                  message={{ role: "assistant", content: streamingDraft } as ChatMessageData}
                  isStreaming
                />
              )}
              {showFirstTokenSpinner && (
                <div className="flex items-center gap-2 pl-10 text-[13px] text-text-tertiary">
                  <Spinner size="small" />
                  <span>Reading the report…</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error */}
        {error && status === "error" && (
          <div className="border-t border-[#FCD34D] bg-[#FFFBEB] px-4 py-2 text-[12.5px] text-[#92400E]">
            {error}
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-border-subtle bg-white px-3 py-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about drop-off, cohorts, fixes…"
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none rounded-xl border border-border-subtle bg-white px-3 py-2 text-[14px] text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
              disabled={status === "streaming"}
            />
            {status === "streaming" ? (
              <button
                onClick={stop}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F1EEE6] text-text-primary hover:bg-[#E7E3DB]"
                title="Stop"
                aria-label="Stop generation"
              >
                <Square className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold text-white hover:bg-accent-gold-hover disabled:cursor-not-allowed disabled:opacity-50"
                title="Send"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-1.5 px-1 text-[11px] text-text-tertiary">
            Answers are grounded in this simulation only. Enter to send · Shift+Enter for newline.
          </p>
        </div>
      </aside>
    </>
  );
}

interface EmptyStateProps {
  suggestions: string[];
  onPick: (s: string) => void;
}

function EmptyState({ suggestions, onPick }: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-2 text-[15px] font-semibold text-text-primary">
        Interrogate this simulation
      </div>
      <p className="mb-5 max-w-[260px] text-[13px] text-text-secondary">
        Ask anything about cohort behavior, drop-offs, or what to fix first.
      </p>
      <div className="flex w-full max-w-[320px] flex-col gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="rounded-xl border border-border-subtle bg-white px-3 py-2 text-left text-[13px] text-text-primary transition-colors hover:border-accent-gold hover:bg-[#FFFBEB]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
