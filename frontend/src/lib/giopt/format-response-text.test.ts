import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { formatResponseText, parseResponseText } from "./format-response-text";

function render(text: string, limit?: number) {
  return renderToStaticMarkup(createElement("p", null, ...formatResponseText(text, limit)));
}

describe("response text formatting", () => {
  it("renders each paired double asterisk section as a bold span", () => {
    expect(render("Build **useful products** with **care**."))
      .toBe('<p>Build <span class="font-bold">useful products</span> with <span class="font-bold">care</span>.</p>');
  });
  it("preserves plain text, line breaks, and unmatched asterisks", () => {
    expect(parseResponseText("Plain\ntext **unfinished")).toEqual([{ text: "Plain\ntext **unfinished", bold: false }]);
    expect(render("")).toBe("<p></p>");
  });
  it("reveals bold text incrementally without revealing its delimiters", () => {
    expect(render("Hi **there**!", 5)).toBe('<p>Hi <span class="font-bold">th</span></p>');
    expect(render("Hi **there**!", 0)).toBe("<p></p>");
    expect(render("**😀hi**", 1)).toBe('<p><span class="font-bold">😀</span></p>');
  });
  it("escapes HTML from API responses", () => {
    expect(render('**<script>alert("x")</script>**'))
      .toBe('<p><span class="font-bold">&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</span></p>');
  });
});
