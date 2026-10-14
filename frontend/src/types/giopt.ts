import type { Industry, Role, VisitorType } from "@/types/visitor"

export type PortfolioLink = {
  label: string
  href: string
}

export type PresetAnswer = {
  id: string
  suggestedQuestion: string
  answer: string
  keywords: string[]
  phrases: string[]
  industries?: Industry[]
  audiences?: VisitorType[]
  links?: PortfolioLink[]
}

export type NonPortfolioIntent =
  | "greeting"
  | "small-talk"
  | "acknowledgement"
  | "meaningless"
  | "general-knowledge"
  | "prompt-injection"
  | "abusive"

export type MatchResult = {
  preset: PresetAnswer
  score: number
  relevanceScore: number
  matchedKeywords: string[]
  matchedPhrases: string[]
  exactQuestionMatch: boolean
}

export type ChatGioPTResponse = {
  answer: string
  source: "preset" | "fallback" | "api"
  links: PortfolioLink[]
  matchedId?: string
  score?: number
  intent?: NonPortfolioIntent
  suggestedQuestions?: string[]
}

export type GioPTMessage = {
  role: "user" | "assistant"
  content: string
}

export type GioPTApiRequest = {
  visitor: {
    type: VisitorType | null
    industry: Industry | null
    role: Role | null
  }
  messages: GioPTMessage[]
}

export type GioPTApiResponse = { answer: string }
