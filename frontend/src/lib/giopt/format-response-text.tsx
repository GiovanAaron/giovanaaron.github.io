import type { ReactNode } from "react";

type ResponseTextPart = { text: string; bold: boolean };

export function parseResponseText(text: string): ResponseTextPart[] {
  const parts: ResponseTextPart[] = [];
  const pattern = /\*\*([\s\S]+?)\*\*/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > cursor) parts.push({ text: text.slice(cursor, start), bold: false });
    parts.push({ text: match[1], bold: true });
    cursor = start + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), bold: false });
  return parts;
}

// React escapes all content; response markup is never injected as HTML.
// The optional limit counts visible characters, excluding the ** delimiters.
export function formatResponseText(text: string, visibleCharacters = Infinity): ReactNode[] {
  let remaining = Math.max(0, visibleCharacters);
  return parseResponseText(text).map((part, index) => {
    const characters = Array.from(part.text);
    const visible = characters.slice(0, remaining).join("");
    remaining = Math.max(0, remaining - characters.length);
    if (!visible) return null;
    return part.bold ? <span key={index} className="font-bold">{visible}</span> : visible;
  });
}
