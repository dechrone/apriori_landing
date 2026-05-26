"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  streamSimulationChat,
  type ChatMessage,
} from "@/lib/simulation-chat";

export type ChatStatus = "idle" | "streaming" | "error";

export interface UseSimulationChatResult {
  messages: ChatMessage[];
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

  // Live assistant draft that mutates per delta, surfaced to the UI by the
  // `messages` list when streaming finishes (or is aborted). While streaming,
  // we drive renders via `streamingDraft` + the tick.
  const [streamingDraft, setStreamingDraft] = useState<string>("");
  const draftRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);

  // Reset everything when the simulation id changes.
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

  // Surface the in-flight draft as a transient last message for the UI.
  // We don't write it into `messages` proper (so callers iterating
  // messages don't see a half-baked assistant turn) — the panel reads
  // `streamingDraft` separately and renders it after the message list.
  const result: UseSimulationChatResult = {
    messages,
    status,
    error,
    send,
    stop,
    reset,
  };

  // Expose the streaming draft as a synthetic last "message" when active.
  // The UI knows status === "streaming" implies draft is the live bubble.
  return Object.assign(result, { _streamingDraft: streamingDraft }) as UseSimulationChatResult;
}
