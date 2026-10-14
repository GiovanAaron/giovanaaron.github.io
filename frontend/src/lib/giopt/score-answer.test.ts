import { describe, expect, it } from "vitest";
import type { PresetAnswer } from "@/types/giopt";
import type { VisitorProfile } from "@/types/visitor";
import { scoreAnswer } from "./score-answer";

const preset: PresetAnswer = {
  id: "healthtech",
  suggestedQuestion: "What healthtech experience does Giovan have?",
  answer: "Healthtech experience",
  keywords: ["healthtech"],
  phrases: [],
  industries: ["healthtech"],
  audiences: ["internal_recruitment_specialist"],
};
const context: VisitorProfile = {
  visitorType: "internal_recruitment_specialist",
  requestedIndustry: "healthtech",
  role: "backend",
  resolution: null,
};

describe("visitor-aware scoring", () => {
  it("boosts relevant answers using the canonical industry and visitor type", () => {
    expect(scoreAnswer("healthtech", preset, context).score)
      .toBe(scoreAnswer("healthtech", preset).score + 8);
    expect(scoreAnswer("healthtech", preset, {
      ...context, requestedIndustry: "retail", visitorType: "other",
    }).score).toBe(scoreAnswer("healthtech", preset).score);
  });

  it("does not create a match from visitor preferences alone", () => {
    expect(scoreAnswer("photography", preset, context).score).toBe(0);
  });
});
