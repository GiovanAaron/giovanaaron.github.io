export type VisitorType = "agency" | "internal" | "other"

export type Sector =
  | "healthcare"
  | "climate"
  | "ai-tech"
  | "fintech"
  | "public-impact"
  | "general"

export type VisitorContext = {
  visitorType: VisitorType
  targetSector?: Sector
}

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
  sectors?: Sector[]
  audiences?: VisitorType[]
  links?: PortfolioLink[]
  cvVariant?: Sector | "general"
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
  matchedKeywords: string[]
  matchedPhrases: string[]
  exactQuestionMatch: boolean
}

export type ChatGioPTResponse = {
  answer: string
  source: "preset" | "fallback"
  links: PortfolioLink[]
  matchedId?: string
  score?: number
  intent?: NonPortfolioIntent
  suggestedQuestions?: string[]
}