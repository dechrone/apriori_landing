"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  streamSimulationChat,
  type ChatMessage,
} from "@/lib/simulation-chat";

export type ChatStatus = "idle" | "streaming" | "error";

export interface UseSimulationChatResult {
  messages: ChatMessage[];
  /** The in-flight assistant draft. Empty unless status === "streaming" and at
   * least one token has arrived. The UI renders it as a transient last bubble
   * while `messages` only contains completed turns. */
  streamingDraft: string;
  status: ChatStatus;
  error: string | null;
  send: (question: string) => void;
  stop: () => void;
  reset: () => void;
}

/**
 * Per-simulation chat state. Scoped to `simulationId` — when the id changes,
 * the conversation resets (we don't carry context across runs).
 *
 * The "in-flight" assistant message is held in a separate ref so each token
 * delta can append in O(1) without re-rendering the full message list, while
 * a coarse-grained tick (`streamingTick`) drives the React update for the
 * currently-streaming bubble.
 */
export function useSimulationChat(
  simulationId: string | null,
): UseSimulationChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  // Live assistant draft that mutates per delta. While streaming the UI
  // renders `streamingDraft` as a transient last bubble; on done/abort it
  // gets folded into `messages` and cleared.
  const [streamingDraft, setStreamingDraft] = useState<string>("");
  const draftRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);

  // Reset on simulationId change. Calls setState + touches refs because the
  // abort controller can't live in state and the chat history must clear when
  // the user navigates to a different sim. Lint flags the setState-in-effect
  // pattern here, matching the codebase-wide convention for prop-keyed resets.
  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    draftRef.current = "";
    setStreamingDraft("");
    setMessages([]);
    setStatus("idle");
    setError(null);
  }, [simulationId]);

  // Cleanup on unmount: cancel any in-flight stream.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const send = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || !simulationId) return;
      if (status === "streaming") return;

      const userMsg: ChatMessage = { role: "user", content: trimmed };
      const nextHistory: ChatMessage[] = [...messages, userMsg];
      setMessages(nextHistory);
      draftRef.current = "";
      setStreamingDraft("");
      setStatus("streaming");
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      void streamSimulationChat(
        simulationId,
        nextHistory,
        {
          onDelta: (text) => {
            draftRef.current += text;
            setStreamingDraft(draftRef.current);
          },
          onDone: () => {
            const final = draftRef.current;
            draftRef.current = "";
            setStreamingDraft("");
            setMessages((prev) =>
              final
                ? [...prev, { role: "assistant", content: final }]
                : prev,
            );
            setStatus("idle");
            abortRef.current = null;
          },
          onError: (message) => {
            const partial = draftRef.current;
            draftRef.current = "";
            setStreamingDraft("");
            // Preserve any partial output so the user sees what arrived
            // before the failure — keeps debugging easier than dropping it.
            if (partial) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: partial },
              ]);
            }
            setError(message);
            setStatus("error");
            abortRef.current = null;
          },
        },
        controller.signal,
      );
    },
    [messages, simulationId, status],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    const partial = draftRef.current;
    draftRef.current = "";
    setStreamingDraft("");
    if (partial) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: partial },
      ]);
    }
    setStatus("idle");
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    draftRef.current = "";
    setStreamingDraft("");
    setMessages([]);
    setStatus("idle");
    setError(null);
  }, []);

  // Surface the in-flight draft as a separate field. We don't merge it into
  // `messages` (so callers iterating completed turns don't see a half-baked
  // assistant entry) — the panel reads `streamingDraft` and renders it as a
  // transient last bubble.
  return {
    messages,
    streamingDraft,
    status,
    error,
    send,
    stop,
    reset,
  };
}
