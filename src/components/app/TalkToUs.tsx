"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { useAuthContext } from "@/contexts/AuthContext";

type FeedbackKind = "issue" | "idea" | "question";

interface TalkToUsContextValue {
  open: () => void;
}

const TalkToUsContext = createContext<TalkToUsContextValue | undefined>(undefined);

export function useTalkToUs() {
  const ctx = useContext(TalkToUsContext);
  if (!ctx) {
    throw new Error("useTalkToUs must be used inside TalkToUsProvider");
  }
  return ctx;
}

export function TalkToUsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <TalkToUsContext.Provider value={{ open }}>
      {children}
      {isOpen && <TalkToUsModal onClose={close} />}
    </TalkToUsContext.Provider>
  );
}

const KINDS: { id: FeedbackKind; label: string; helper: string }[] = [
  { id: "issue", label: "Report an issue", helper: "Something broke or felt wrong." },
  { id: "idea", label: "Share an idea", helper: "What would make this better?" },
  { id: "question", label: "Ask a question", helper: "We usually reply within a day." },
];

function TalkToUsModal({ onClose }: { onClose: () => void }) {
  const { showToast } = useToast();
  const { user, getAccessToken } = useAuthContext();
  const [kind, setKind] = useState<FeedbackKind>("issue");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const trimmed = message.trim();
  const canSubmit = trimmed.length >= 10 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const token = await getAccessToken().catch(() => null);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          kind,
          message: trimmed,
          email: user?.email ?? null,
          path: typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }
      showToast(
        "success",
        "Thanks — message received",
        "We'll get back to you at your account email.",
      );
      onClose();
    } catch (err) {
      showToast(
        "error",
        "Couldn't send message",
        err instanceof Error ? err.message : "Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[fadeIn_0.18s_ease-out]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-[480px] bg-white rounded-t-[18px] sm:rounded-[18px] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.22)] animate-[slideUp_0.22s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-[#EEF0F4]">
          <div>
            <h2 className="text-[18px] font-semibold text-[#0F172A] leading-tight">
              Talk to us
            </h2>
            <p className="text-[13px] text-[#64748B] mt-1 leading-relaxed">
              Bug, idea, or question — it lands in our inbox. We read every message.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#94A3B8] hover:text-[#0F172A] transition-colors -mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="px-6 pt-5 pb-6 space-y-5">
          <div className="grid grid-cols-3 gap-2">
            {KINDS.map((k) => {
              const selected = kind === k.id;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setKind(k.id)}
                  className={`text-left rounded-[10px] border px-3 py-2.5 transition-colors ${
                    selected
                      ? "border-[var(--accent-gold)] bg-[var(--accent-amber-dim)]"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  <p
                    className={`text-[13px] font-semibold ${
                      selected ? "text-[#0F172A]" : "text-[#0F172A]"
                    }`}
                  >
                    {k.label}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    {k.helper}
                  </p>
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#334155] mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What happened, or what would you like to see?"
              rows={5}
              className="w-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] border border-[#E2E8F0] rounded-[10px] px-3.5 py-3 leading-relaxed focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-amber-glow)] focus:outline-none transition-all resize-y"
            />
            <p className="mt-2 text-[12px] text-[#94A3B8]">
              Min 10 characters. Replies go to {user?.email || "your account email"}.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="text-[13px] text-[#64748B] hover:text-[#0F172A] transition-colors px-3 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`inline-flex items-center gap-2 text-[14px] font-semibold rounded-[10px] px-4 py-2.5 transition-all ${
                canSubmit
                  ? "bg-[var(--accent-gold)] text-white hover:bg-[var(--accent-gold-hover)] shadow-[0_2px_8px_rgba(79,70,229,0.25)]"
                  : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TalkToUsButtonProps {
  variant?: "sidebar" | "compact";
}

export function TalkToUsButton({ variant = "sidebar" }: TalkToUsButtonProps) {
  const { open } = useTalkToUs();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Talk to us
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors"
    >
      <MessageCircle className="w-[18px] h-[18px] flex-shrink-0 text-[#94A3B8]" />
      <span className="flex flex-col items-start leading-tight">
        <span>Talk to us</span>
        <span className="text-[11px] font-normal text-[#94A3B8]">Issues · ideas · questions</span>
      </span>
    </button>
  );
}
