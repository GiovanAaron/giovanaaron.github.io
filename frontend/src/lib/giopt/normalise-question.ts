const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "could",
  "does",
  "for",
  "has",
  "have",
  "he",
  "his",
  "i",
  "in",
  "is",
  "me",
  "of",
  "on",
  "please",
  "show",
  "tell",
  "that",
  "the",
  "to",
  "what",
  "which",
  "with",
  "you",
])

export function normalizeQuestion(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^\p{L}\p{N}+#.\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function tokenizeQuestion(value: string): string[] {
  return normalizeQuestion(value)
    .split(" ")
    .filter(token => token.length > 1 && !STOP_WORDS.has(token))
}

export function hasWholePhrase(
  normalizedQuestion: string,
  phrase: string,
): boolean {
  const normalizedPhrase = normalizeQuestion(phrase)

  return ` ${normalizedQuestion} `.includes(` ${normalizedPhrase} `)
}
