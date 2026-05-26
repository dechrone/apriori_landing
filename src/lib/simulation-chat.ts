/**
 * Per-simulation chatbot client. Streams NDJSON from
 * POST /api/v1/simulations/{simulation_id}/chat. The backend stuffs the
 * full insights JSON server-side; the client only sends conversation
 * history (last message must be role="user").
 *
 * Event shape (matches src/core/simulation_chat.py):
 *   {"type": "delta", "data": {"text": "..."}}
 *   {"type": "done",  "data": {"finish_reason": "stop"}}
 *   {"type": "error", "data": {"code": "...", "message": "..."}}
 */

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
    : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ChatStreamEvent =
  | { type: "delta"; data: { text: string } }
  | { type: "done"; data: { finish_reason: string } }
  | { type: "error"; data: { code: string; message: string } };

export interface StreamCallbacks {
  onDelta: (text: string) => void;
  onDone: (finishReason: string) => void;
  onError: (message: string) => void;
}

async function authHeader(): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data } = await sb.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Not signed in");
  return `Bearer ${token}`;
}

/**
 * Open a streaming chat against a simulation. Returns when the stream
 * terminates (delta+done, error, or AbortSignal). Never throws after the
 * first byte — terminal failures arrive via `onError`.
 */
export async function streamSimulationChat(
  simulationId: string,
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const { onDelta, onDone, onError } = callbacks;

  let response: Response;
  try {
    response = await fetch(
      `${BASE_URL}/api/v1/simulations/${encodeURIComponent(simulationId)}/chat`,
      {
        method: "POST",
        headers: {
          Authorization: await authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
        signal,
      },
    );
  } catch (err) {
    if (signal?.aborted) return;
    onError(err instanceof Error ? err.message : "Network error");
    return;
  }

  if (!response.ok) {
    const detail = await safeReadError(response);
    onError(detail);
    return;
  }
  if (!response.body) {
    onError("Empty response body from server");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const cleanup = () => {
    try {
      void reader.cancel();
    } catch {
      /* already closed */
    }
  };

  if (signal) {
    if (signal.aborted) {
      cleanup();
      return;
    }
    signal.addEventListener("abort", cleanup, { once: true });
  }

  try {
    while (true) {
      if (signal?.aborted) return;
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const event = tryParseEvent(trimmed);
        if (!event) continue;
        if (event.type === "delta") onDelta(event.data.text);
        else if (event.type === "done") {
          onDone(event.data.finish_reason);
          return;
        } else if (event.type === "error") {
          onError(event.data.message);
          return;
        }
      }
    }

    if (buffer.trim()) {
      const event = tryParseEvent(buffer.trim());
      if (event?.type === "delta") onDelta(event.data.text);
      else if (event?.type === "done") onDone(event.data.finish_reason);
      else if (event?.type === "error") onError(event.data.message);
    }
  } finally {
    if (signal) signal.removeEventListener("abort", cleanup);
  }
}

function tryParseEvent(raw: string): ChatStreamEvent | null {
  try {
    return JSON.parse(raw) as ChatStreamEvent;
  } catch {
    console.warn("[simulation-chat] failed to parse line:", raw);
    return null;
  }
}

async function safeReadError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    if (typeof body?.detail === "string") return body.detail;
    if (typeof body?.detail?.message === "string") return body.detail.message;
    return `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}
