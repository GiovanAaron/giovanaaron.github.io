"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, LoaderCircle, Sparkles, X } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  CornerIconButton,
  type CornerIconButtonPlacement,
} from "@/components/ui/corner-icon-button";
import { setAvatarThinking } from "@/lib/avatar-state";

import { Button } from "@/components/ui/button";
import { presetAnswers } from "@/data/giopt/answers";
import { resolveQuestion } from "@/lib/giopt/resolve-question";
import type { Sector, VisitorContext, VisitorType } from "@/types/giopt";

const visitorOptions: { label: string; value: VisitorType }[] = [
  { label: "Talent Partner/Agency", value: "agency" },
  { label: "Internal Talent Acquisition", value: "internal" },
  { label: "Other", value: "other" },
];
const sectorOptions: { label: string; value: Sector }[] = [
  { label: "Healthcare/Medicine", value: "healthcare" },
  { label: "Finance", value: "fintech" },
  { label: "Renewable Energy/Envirotech", value: "climate" },
  { label: "Other", value: "general" },
];

const cornerControlPlacement: CornerIconButtonPlacement = "cascaded";

export function PortfolioCommandMenu() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingAnswer, setIsClosingAnswer] = useState(false);

  const [visitorContext, setVisitorContext] = useState<VisitorContext | null>(null);
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  function dismissAnswer() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnswer("");
      return;
    }

    setIsClosingAnswer(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion || isLoading || pendingQuestion !== null) return;

    if (!visitorContext) {
      setPendingQuestion(submittedQuestion);
      return;
    }

    void processQuestion(submittedQuestion, visitorContext);
  }

  function selectSector(targetSector: Sector) {
    if (!visitorType || pendingQuestion === null || isLoading) return;
    const context: VisitorContext = { visitorType, targetSector };
    setVisitorContext(context);
    setPendingQuestion(null);
    void processQuestion(pendingQuestion, context);
  }

  async function processQuestion(submittedQuestion: string, context: VisitorContext) {
    setIsLoading(true);
    setIsClosingAnswer(false);
    setAnswer("");
    setSuggestedQuestions([]);
    setAvatarThinking(true);
    await new Promise((resolve) => window.setTimeout(resolve, 7000));
    const response = resolveQuestion(submittedQuestion, presetAnswers, context);
    setAnswer(response.answer);
    setSuggestedQuestions(response.suggestedQuestions ?? []);
    setAvatarThinking(false);
    setIsLoading(false);
  }

  return (
    <div className="fixed bottom-11 left-1/2 z-50
w-[calc(100%-2rem)] max-w-xl -translate-x-1/2
lg:relative lg:bottom-auto lg:left-auto lg:mx-auto lg:mb-8 lg:mt-8 lg:translate-x-0
    "
    >
      {pendingQuestion !== null ? (
        <section
          aria-label="Your background"
          className="bg-background/95 border-border mb-3 max-h-[65dvh] overflow-y-auto rounded-2xl border p-5 shadow-lg backdrop-blur-xl"
        >
          <p className="text-muted-foreground text-xs">Step {visitorType ? "2" : "1"} of 2</p>
          <h2
            key={visitorType ? "sector" : "visitor"}
            ref={(node) => { node?.focus(); }}
            tabIndex={-1}
            className="mt-2 text-base font-semibold outline-none"
          >
            {visitorType ? "What sector do you belong to?" : "Are you a…?"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            A little context helps me answer your question.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {visitorType
              ? sectorOptions.map((option) => (
                  <Button key={option.value} type="button" variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    onClick={() => selectSector(option.value)}>
                    {option.label}
                  </Button>
                ))
              : visitorOptions.map((option) => (
                  <Button key={option.value} type="button" variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    onClick={() => setVisitorType(option.value)}>
                    {option.label}
                  </Button>
                ))}
          </div>
          <div className="mt-3 flex gap-2">
            {visitorType ? (
              <Button type="button" variant="ghost" onClick={() => setVisitorType(null)}>Back</Button>
            ) : null}
            <Button type="button" variant="ghost" onClick={() => {
              setPendingQuestion(null);
              setVisitorType(null);
            }}>Cancel</Button>
          </div>
        </section>
      ) : null}
      {answer ? (
        <div  style={{
              WebkitBackdropFilter: "blur(15px) saturate(180%)",
              backdropFilter: "blur(15px) saturate(180%)",
              backgroundColor: "color-mix(in oklch, var(--background) 50%, transparent)",
              borderRadius: "var(--radius-2xl)",
            }}
          className={`${isClosingAnswer ? "animate-answer-out" : "animate-answer-in"} relative isolate mb-2`}
          role="status"
          onAnimationEnd={() => {
            if (isClosingAnswer) {
              setAnswer("");
              setIsClosingAnswer(false);
            }
          }
        }
        >
          <div
            className="border-border text-foreground relative max-h-[65dvh] overflow-y-auto rounded-2xl border py-3 pr-12 pl-4 text-sm leading-6 shadow-lg"
            // style={{
            //   WebkitBackdropFilter: "blur(15px) saturate(180%)",
            //   backdropFilter: "blur(15px) saturate(180%)",
            //   backgroundColor: "color-mix(in oklch, var(--background) 70%, transparent)",
            // }}
          >
            {answer}
            {suggestedQuestions.length > 0 ? (
              <div className="mt-3 flex flex-col gap-2" role="group" aria-label="Suggested questions">
                {suggestedQuestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    disabled={isLoading || isClosingAnswer}
                    onClick={() => {
                      if (!visitorContext || isLoading || isClosingAnswer) return;
                      setQuestion(suggestion);
                      void processQuestion(suggestion, visitorContext);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
          <CornerIconButton
          
            type="button"
            onClick={dismissAnswer}
            aria-label="Dismiss answer"
            // "inset" for corner placement to place the button in the corner of the answer box, "cascaded" for a more visually appealing placement
            placement={cornerControlPlacement}
            disabled={isClosingAnswer}
          >
            <X className="size-4" aria-hidden="true" />
          </CornerIconButton>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="relative"
        style={{
          WebkitBackdropFilter: "blur(15px)",
          backdropFilter: "blur(15px)",
          borderRadius: "9999px",
        }}
      >
        <InputGroup
          className="relative isolate h-14 overflow-visible rounded-full border bg-transparent px-2 shadow-lg dark:bg-transparent"
        >
          <span
            aria-hidden="true"
            className="bg-background/45 pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
          />
          <InputGroupAddon>
            <Sparkles className="text-primary size-4" />
          </InputGroupAddon>
          <InputGroupInput
            disabled={pendingQuestion !== null || isLoading}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            name="portfolio-question"
            autoComplete="on"
            placeholder="Ask about my work and experience..."
            aria-label="Ask about Giovan's experience"
            className="portfolio-question-input h-full pr-12 light:placeholder:text-olive-800 placeholder:opacity-100"
            // style={{backgroundColor: "white", color: "inherit"}}
          />
          <InputGroupAddon align="inline-end" className="contents">
            <CornerIconButton
              type="submit"
              disabled={!question.trim() || isLoading || pendingQuestion !== null}
              aria-label="Ask question"
              placement={"inset"}
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : <ArrowUp />}
            </CornerIconButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
