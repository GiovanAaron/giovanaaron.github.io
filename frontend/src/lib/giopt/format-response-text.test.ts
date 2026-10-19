import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { formatResponseText, getResponsePlainText, parseResponseText } from "./format-response-text";

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
  it("renders the escaped list of links supplied by the API", () => {
    const text = String.raw`- [Play the live demo]\(https\://giovanaaron.itch.io/dont-touch-my-gum-cv)\
\- [View the case study]\(https\://resisted-spoonbill-670.notion.site/Don-t-Touch-My-Gum-Python-PyGame-7a84af61ae4846b3a90336274cca2445)\
\- [View the GitHub repository]\(https\://github.com/GiovanAaron/dont-touch-my-gum)`;
    const html = renderToStaticMarkup(createElement("div", null, ...formatResponseText(text)));
    expect(html).toContain('<ul class="my-2 list-disc space-y-1 pl-5">');
    expect(html.match(/<li>/g)).toHaveLength(3);
    expect(html.match(/<a /g)).toHaveLength(3);
    expect(html).toContain('href="https://giovanaaron.itch.io/dont-touch-my-gum-cv"');
    expect(html).toContain('href="https://github.com/GiovanAaron/dont-touch-my-gum"');
    expect(getResponsePlainText(text)).toBe("Play the live demo\nView the case study\nView the GitHub repository");
    expect(html).not.toContain("\\");
  });
  it("supports mixed plain text, lists, and numbered lists", () => {
    const html = renderToStaticMarkup(createElement("div", null, ...formatResponseText("Explore my work:\n- **Demo**\n- *Case study*\n\n3. Read `README`\n4. Open repository")));
    expect(html).toContain('<span class="font-bold">Demo</span>');
    expect(html).toContain("<em>Case study</em>");
    expect(html).toContain('<ol start="3"');
    expect(html).toContain("<code ");
    expect(html.match(/<li>/g)).toHaveLength(4);
  });
  it("reveals formatted link labels, not the destination or Markdown syntax", () => {
    const html = render("Hi [**there**](https://example.com/path)", 5);
    expect(html).toContain('<span class="font-bold">th</span>');
    expect(html).toContain('tabindex="-1"');
    expect(getResponsePlainText("Hi [**there**](https://example.com/path)")).toBe("Hi there");
  });
  it.each(["javascript:alert(1)", "data:text/html,test", "vbscript:alert(1)"])("does not link unsafe destination %s", href => {
    const html = render(`[Click me](${href})`);
    expect(html).not.toContain("<a ");
    expect(html).toBe("<p>Click me</p>");
  });
  it("supports URLs with balanced parentheses and escapes text within links", () => {
    const html = render("[<b>Details</b>](https://example.com/a_(b))");
    expect(html).toContain('href="https://example.com/a_(b)"');
    expect(html).toContain("&lt;b&gt;Details&lt;/b&gt;");
    expect(html).not.toContain("<b>");
  });
  it("preserves malformed links as text", () => {
    expect(render("See [unfinished](https://example.com")).toBe("<p>See [unfinished](https://example.com</p>");
  });
});
