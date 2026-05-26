"use client";

import React from "react";

/**
 * Lightweight chat-markdown renderer. We don't want to ship react-markdown
 * just for assistant bubbles — chats use a small subset (bold, code spans,
 * bullets, line breaks, headings). The output is sanitized by virtue of
 * never using dangerouslySetInnerHTML — we build a React tree from the
 * tokens directly.
 *
 * Supports:
 *   **bold**
 *   `inline code`
 *   - bullet lists (lines starting with `- `, `* `, or `• `)
 *   1. ordered lists (lines starting with `<digits>. `)
 *   ### headings (only at the start of a line)
 *   blank line → paragraph break
 */

interface LightMarkdownProps {
  text: string;
  className?: string;
}

export function LightMarkdown({ text, className }: LightMarkdownProps) {
  const blocks = parseBlocks(text);
  return (
    <div className={className}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

type Block =
  | { kind: "paragraph"; lines: string[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "ordered"; items: string[] }
  | { kind: "heading"; level: 2 | 3; text: string };

function parseBlocks(input: string): Block[] {
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let buf: string[] = [];
  const flushParagraph = () => {
    if (buf.length) {
      blocks.push({ kind: "paragraph", lines: buf });
      buf = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      i++;
      continue;
    }

    const headingMatch = /^(#{2,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        kind: "heading",
        level: headingMatch[1].length === 2 ? 2 : 3,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    if (/^\s*[-*•]\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*•]\s+/, ""));
        i++;
      }
      blocks.push({ kind: "bullets", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ordered", items });
      continue;
    }

    buf.push(line);
    i++;
  }
  flushParagraph();
  return blocks;
}

function renderBlock(block: Block, key: number): React.ReactNode {
  switch (block.kind) {
    case "heading":
      if (block.level === 2) {
        return (
          <h4 key={key} className="text-[15px] font-semibold mt-3 mb-1 text-text-primary">
            {renderInline(block.text)}
          </h4>
        );
      }
      return (
        <h5 key={key} className="text-[14px] font-semibold mt-3 mb-1 text-text-primary">
          {renderInline(block.text)}
        </h5>
      );
    case "bullets":
      return (
        <ul key={key} className="list-disc pl-5 my-2 space-y-1">
          {block.items.map((it, j) => (
            <li key={j} className="text-[14px] leading-relaxed text-text-primary">
              {renderInline(it)}
            </li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol key={key} className="list-decimal pl-5 my-2 space-y-1">
          {block.items.map((it, j) => (
            <li key={j} className="text-[14px] leading-relaxed text-text-primary">
              {renderInline(it)}
            </li>
          ))}
        </ol>
      );
    case "paragraph":
      return (
        <p key={key} className="text-[14px] leading-relaxed text-text-primary my-2 whitespace-pre-wrap">
          {block.lines.map((ln, j) => (
            <React.Fragment key={j}>
              {j > 0 && <br />}
              {renderInline(ln)}
            </React.Fragment>
          ))}
        </p>
      );
  }
}

/**
 * Render inline tokens: **bold**, `code`. Walks the string with a single
 * regex and emits a React node array. No dangerouslySetInnerHTML — everything
 * is text or wrapped in styled elements.
 */
function renderInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    if (match[2] !== undefined) {
      tokens.push(
        <strong key={key++} className="font-semibold">
          {match[2]}
        </strong>,
      );
    } else if (match[4] !== undefined) {
      tokens.push(
        <code
          key={key++}
          className="rounded bg-[#F1EEE6] px-1 py-0.5 font-mono text-[12.5px] text-text-primary"
        >
          {match[4]}
        </code>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }
  return tokens;
}
