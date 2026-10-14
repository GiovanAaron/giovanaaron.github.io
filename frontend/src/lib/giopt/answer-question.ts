import type { ChatGioPTResponse, GioPTApiRequest, GioPTMessage, PresetAnswer } from "@/types/giopt"
import type { VisitorProfile } from "@/types/visitor"
import { resolveQuestion } from "./resolve-question"

type AnswerOptions = {
  endpoint?: string
  messages?: GioPTMessage[]
  signal?: AbortSignal
}

// The backend owns OpenAI integration; the browser only knows this API contract.
export async function answerQuestion(
  question: string,
  presets: PresetAnswer[],
  context: VisitorProfile,
  options: AnswerOptions = {},
): Promise<ChatGioPTResponse> {
  const local = resolveQuestion(question, presets, context)
  if (local.intent || local.source === "preset") return local

  console.log("answerQuestion: sending request to backend API")
  const body: GioPTApiRequest = {
    visitor: {
      type: context.visitorType,
      industry: context.requestedIndustry,
      role: context.role,
    },
    messages: [...(options.messages ?? []).slice(-11), { role: "user", content: question.trim() }],
  }
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (options.signal?.aborted) abort()
  options.signal?.addEventListener("abort", abort, { once: true })
  const timer = setTimeout(abort, 30_000)

  try {
    const response = await fetch(
      options.endpoint ?? (process.env.NEXT_PUBLIC_GIOPT_API_URL?.trim() || "/api/chat"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    )
    if (!response.ok) throw new Error("GioPT API request failed")
    const payload: unknown = await response.json()
    if (!payload || typeof payload !== "object" || !("answer" in payload) ||
        typeof payload.answer !== "string" || !payload.answer.trim()) {
      throw new Error("Invalid GioPT API response")
    }
    return {
      answer: payload.answer.trim(),
      source: "api",
      links: [],
      // Suggestions remain locally sourced, regardless of backend response fields.
      suggestedQuestions: local.suggestedQuestions,
    }
  } catch (error) {
    if (options.signal?.aborted) throw error
    return {
      ...local,
      answer: "I couldn’t get an answer right now. Please try again or choose a suggested question below.",
    }
  } finally {
    clearTimeout(timer)
    options.signal?.removeEventListener("abort", abort)
  }
}
