"use client";

import { Bot, User } from "lucide-react";

import type { ChatMessage as ChatMessageData } from "@/lib/simulation-chat";

import { LightMarkdown } from "./markdown";

interface ChatMessageProps {
  message: ChatMessageData;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-accent-gold/15 text-accent-gold"
            : "bg-[#F1EEE6] text-text-secondary"
        }`}
        aria-hidden
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
          isUser
            ? "bg-accent-gold text-white"
            : "bg-white border border-border-subtle text-text-primary"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed">
            {message.content}
          </p>
        ) : (
          <>
            <LightMarkdown text={message.content} className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
            {isStreaming && (
              <span
                className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-text-secondary align-baseline"
                aria-hidden
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
