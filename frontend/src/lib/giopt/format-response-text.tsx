import type { ReactNode } from "react";

type ResponseTextPart = {
  text: string;
  bold: boolean;
  italic?: boolean;
  code?: boolean;
  href?: string;
};
type ResponseBlock =
  | { kind: "paragraph"; parts: ResponseTextPart[] }
  | { kind: "list"; ordered: boolean; start: number; items: ResponseTextPart[][] };

function normalizeMarkup(text: string) {
  return text.replace(/\r\n?/g, "\n")
    .replace(/\\\n/g, "\n")
    .replace(/\\([()[\]:-])/g, "$1");
}

function safeHref(value: string): string | undefined {
  const href = value.trim();
  try {
    const url = new URL(href, "https://portfolio.invalid");
    if (!["https:", "http:", "mailto:"].includes(url.protocol)) return;
    return href;
  } catch { return; }
}

function parseInline(text: string, inherited: Omit<ResponseTextPart, "text"> = { bold: false }): ResponseTextPart[] {
  const parts: ResponseTextPart[] = [];
  const pattern = /\*\*([\s\S]+?)\*\*|`([^`\n]+)`|\[([^\]\n]+)\]\(((?:[^()\s]|\([^()\n]*\))+)\)|\*([^*\n]+)\*/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > cursor) parts.push({ text: text.slice(cursor, start), ...inherited });
    if (match[1] !== undefined) parts.push(...parseInline(match[1], { ...inherited, bold: true }));
    else if (match[2] !== undefined) parts.push({ text: match[2], ...inherited, code: true });
    else if (match[3] !== undefined) {
      const href = safeHref(match[4]);
      parts.push(...parseInline(match[3], href ? { ...inherited, href } : inherited));
    } else parts.push(...parseInline(match[5], { ...inherited, italic: true }));
    cursor = start + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), ...inherited });
  return parts;
}

export function parseResponseText(text: string): ResponseTextPart[] {
  return parseInline(normalizeMarkup(text));
}

function parseBlocks(text: string): ResponseBlock[] {
  const blocks: ResponseBlock[] = [];
  let paragraph: string[] = [];
  function flushParagraph() {
    if (paragraph.length) blocks.push({ kind: "paragraph", parts: parseInline(paragraph.join("\n")) });
    paragraph = [];
  }
  for (const line of normalizeMarkup(text).split("\n")) {
    const item = line.match(/^\s*(?:([-+*])\s+|(\d+)[.)]\s+)(.+)$/);
    if (item) {
      flushParagraph();
      const ordered = item[2] !== undefined;
      const previous = blocks.at(-1);
      if (previous?.kind === "list" && previous.ordered === ordered) previous.items.push(parseInline(item[3]));
      else blocks.push({ kind: "list", ordered, start: ordered ? Number(item[2]) : 1, items: [parseInline(item[3])] });
    } else if (!line.trim()) flushParagraph();
    else paragraph.push(line);
  }
  flushParagraph();
  return blocks;
}

// Shared with the typing effect: URLs and formatting markers do not count as visible characters.
export function getResponsePlainText(text: string): string {
  return parseBlocks(text).map(block => block.kind === "paragraph"
    ? block.parts.map(part => part.text).join("")
    : block.items.map(parts => parts.map(part => part.text).join("")).join("\n"),
  ).join("\n");
}

// A small Markdown subset rendered as React nodes, never injected HTML.
export function formatResponseText(text: string, visibleCharacters = Infinity): ReactNode[] {
  let remaining = Math.max(0, visibleCharacters);
  const blocks = parseBlocks(text);
  function renderParts(parts: ResponseTextPart[], prefix: string): ReactNode[] {
    return parts.map((part, index) => {
      const characters = Array.from(part.text);
      const visible = characters.slice(0, remaining).join("");
      remaining = Math.max(0, remaining - characters.length);
      if (!visible) return null;
      const key = `${prefix}-${index}`;
      let content: ReactNode = visible;
      if (part.code) content = <code className="bg-foreground/10 rounded px-1 py-0.5 font-mono text-[0.9em]">{content}</code>;
      if (part.italic) content = <em>{content}</em>;
      if (part.href) return <a key={key} href={part.href} target="_blank" rel="noopener noreferrer"
        tabIndex={visibleCharacters === Infinity ? undefined : -1}
        className="underline underline-offset-4 break-words hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">{part.bold ? <span className="font-bold">{content}</span> : content}</a>;
      if (part.bold || part.italic || part.code) return <span key={key} className={part.bold ? "font-bold" : undefined}>{content}</span>;
      return visible;
    });
  }
  if (blocks.length === 1 && blocks[0].kind === "paragraph") return renderParts(blocks[0].parts, "text");
  return blocks.map((block, index) => {
    if (index > 0) remaining = Math.max(0, remaining - 1);
    if (remaining === 0) return null;
    if (block.kind === "paragraph") return <div key={index} className={index > 0 ? "mt-3 whitespace-pre-wrap" : "whitespace-pre-wrap"}>{renderParts(block.parts, String(index))}</div>;
    const items = block.items.map((parts, itemIndex) => {
      if (itemIndex > 0) remaining = Math.max(0, remaining - 1);
      return remaining > 0 ? <li key={itemIndex}>{renderParts(parts, `${index}-${itemIndex}`)}</li> : null;
    });
    return block.ordered
      ? <ol key={index} start={block.start} className="my-2 list-decimal space-y-1 pl-5">{items}</ol>
      : <ul key={index} className="my-2 list-disc space-y-1 pl-5">{items}</ul>;
  });
}
