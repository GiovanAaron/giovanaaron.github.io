import {
  MatchResult,
  PresetAnswer,
  VisitorContext,
} from "@/types/giopt"

import {
  hasWholePhrase,
  normalizeQuestion,
  tokenizeQuestion,
} from "./normalise-question"

const SCORE = {
  exactQuestion: 100,
  phrase: 8,
  keyword: 3,
  sector: 6,
  audience: 2,
} as const

export function scoreAnswer(
  question: string,
  preset: PresetAnswer,
  context?: VisitorContext,
): MatchResult {
  const normalizedQuestion = normalizeQuestion(question)
  const questionTokens = new Set(tokenizeQuestion(question))

  const exactQuestionMatch =
    normalizedQuestion === normalizeQuestion(preset.suggestedQuestion)

  const matchedKeywords = preset.keywords.filter(keyword => {
    const keywordTokens = tokenizeQuestion(keyword)

    return (
      keywordTokens.length > 0 &&
      keywordTokens.every(token => questionTokens.has(token))
    )
  })

  const matchedPhrases = preset.phrases.filter(phrase =>
    hasWholePhrase(normalizedQuestion, phrase),
  )

  const sectorMatch = Boolean(
    context?.targetSector &&
      preset.sectors?.includes(context.targetSector),
  )

  const audienceMatch = Boolean(
    context?.visitorType &&
      preset.audiences?.includes(context.visitorType),
  )

  const relevanceScore =
    (exactQuestionMatch ? SCORE.exactQuestion : 0) +
    matchedPhrases.length * SCORE.phrase +
    matchedKeywords.length * SCORE.keyword

  // Context can improve a relevant match, but cannot create one.
  const contextScore =
    relevanceScore > 0
      ? (sectorMatch ? SCORE.sector : 0) +
        (audienceMatch ? SCORE.audience : 0)
      : 0

  return {
    preset,
    score: relevanceScore + contextScore,
    matchedKeywords,
    matchedPhrases,
    exactQuestionMatch,
  }
}

export function rankAnswers(
  question: string,
  presets: PresetAnswer[],
  context?: VisitorContext,
): MatchResult[] {
  return presets
    .map(preset => scoreAnswer(question, preset, context))
    .filter(result => result.score > 0)
    .sort((first, second) => second.score - first.score)
}