"use client";

import { FormEvent, useEffect, useEffectEvent, useRef, useState } from "react";
import { ArrowUp, LoaderCircle, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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
import { useVisitor } from "@/components/visitor-provider";
import { presetAnswers } from "@/data/giopt/answers";
import { resolveQuestion } from "@/lib/giopt/resolve-question";
import type { Industry, Role, VisitorType, VisitorProfile } from "@/types/visitor";

const visitorOptions: { label: string; value: VisitorType }[] = [
  { label: "Talent Partner/ Agency", value: "talent_partner_agency" },
  { label: "Internal Recruitment Specialist", value: "internal_recruitment_specialist" },
  { label: "Other", value: "other" },
];
const industryOptions: { label: string; value: Industry; description?: string }[] = [
  { label: "AI", value: "ai" },
  { label: "Healthtech", value: "healthtech" },
  { label: "Tech for good / Nonprofit", value: "tech_for_good_nonprofit" },
  { label: "Finance / Banking", value: "finance_banking" },
  { label: "Greentech / Renewable energy", value: "greentech_renewable_energy" },
  { label: "Energy", value: "energy" },
  { label: "Retail", value: "retail" },
  { label: "Media / Publishing", value: "media_publishing" },
  { label: "B2B", value: "b2b" },
  { label: "None of the above", value: "ai", 
    // description: "Use the default AI CV for your selected role." 
  },
];
const roleOptions: { label: string; value: Role }[] = [
  { label: "Full Stack Development", value: "full_stack" },
  { label: "Backend Development", value: "backend" },
  { label: "Frontend Development", value: "frontend" },
  { label: "Mobile Development", value: "mobile" },
];
const cornerControlPlacement: CornerIconButtonPlacement = "cascaded";

export function PortfolioCommandMenu() {
  const reduceMotion = useReducedMotion();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingAnswer, setIsClosingAnswer] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const isFixed = hasInteracted || pendingQuestion !== null || Boolean(answer);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasInteracted || pendingQuestion !== null || answer) return;

    function handleOutsidePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setHasInteracted(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
  }, [hasInteracted, pendingQuestion, answer]);

  const visitorContext = useVisitor();
  const { visitorType, requestedIndustry, role, setVisitorType, setIndustry, setRole } = visitorContext;
  const hasVisitorProfile = visitorType === "other" || Boolean(visitorType && requestedIndustry && role);
  const [queuedQuestion, setQueuedQuestion] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<"visitor" | "industry" | "role">("visitor");

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
    if (!submittedQuestion || isLoading || pendingQuestion !== null || queuedQuestion !== null) return;

    if (!hasVisitorProfile) {
      setOnboardingStep(!visitorType ? "visitor" : !requestedIndustry ? "industry" : "role");
      setPendingQuestion(submittedQuestion);
      return;
    }

    void processQuestion(submittedQuestion, visitorContext);
  }

  function selectRole(selectedRole: Role) {
    if (!visitorType || !requestedIndustry || pendingQuestion === null || isLoading) return;
    setRole(selectedRole);
    setPendingQuestion(null);
    setQueuedQuestion(pendingQuestion);
  }

  async function processQuestion(submittedQuestion: string, context: VisitorProfile) {
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

  // Wait for the provider to commit the completed visitor preferences.
  const processQueuedQuestion = useEffectEvent((submittedQuestion: string) => {
    setQueuedQuestion(null);
    void processQuestion(submittedQuestion, visitorContext);
  });
  useEffect(() => {
    if (!queuedQuestion || !hasVisitorProfile) return;
    const timer = window.setTimeout(() => processQueuedQuestion(queuedQuestion), 0);
    return () => window.clearTimeout(timer);
  }, [queuedQuestion, hasVisitorProfile]);

  return (
    <div className="lg:mx-auto lg:my-8 lg:min-h-14 lg:w-[calc(100%-2rem)] lg:max-w-xl">
    <motion.div
      ref={menuRef}
      layout="position"
      layoutDependency={isFixed}
      transition={{
        layout: reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 70, damping: 14, mass: 1.2 },
      }}
      onFocusCapture={() => setHasInteracted(true)}
      onPointerDownCapture={() => setHasInteracted(true)}
      className={`fixed bottom-11 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 ${
        isFixed
          ? ""
          : "lg:relative lg:bottom-auto lg:left-auto lg:w-full lg:translate-x-0"
      }`}
    >
      {pendingQuestion !== null ? (
        <section
          aria-label="Your background"
          className="bg-background/95 border-border mb-3 max-h-[65dvh] overflow-y-auto rounded-2xl border p-5 shadow-lg backdrop-blur-xl"
        >
          <p className="text-muted-foreground text-xs">Step {onboardingStep === "visitor" ? "1" : onboardingStep === "industry" ? "2" : "3"} of 3</p>
          <h2
            key={onboardingStep}
            ref={(node) => { node?.focus(); }}
            tabIndex={-1}
            className="mt-2 text-base font-semibold outline-none"
          >
            {onboardingStep === "visitor" ? "Are you a…?" : onboardingStep === "industry" ? "What industry do you belong to?" : "What role are you looking for?"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            A little context helps me answer your question.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {onboardingStep === "role"
              ? roleOptions.map((option) => (
                  <Button key={option.value} type="button" variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    onClick={() => selectRole(option.value)}>
                    {option.label}
                  </Button>
                ))
              : onboardingStep === "industry" ? industryOptions.map((option) => (
                  <Button key={option.label} type="button" variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    onClick={() => { setIndustry(option.value); setOnboardingStep("role"); }}>
                    <span>
                      {option.label}
                      {option.description ? (
                        <span className="text-muted-foreground mt-1 block text-xs font-normal">
                          {option.description}
                        </span>
                      ) : null}
                    </span>
                  </Button>
                ))
              : visitorOptions.map((option) => (
                  <Button key={option.value} type="button" variant="outline"
                    className="h-auto min-h-11 justify-start whitespace-normal px-3 py-2 text-left"
                    onClick={() => {
                      setVisitorType(option.value);
                      if (option.value === "other") {
                        setQueuedQuestion(pendingQuestion);
                        setPendingQuestion(null);
                      } else {
                        setOnboardingStep("industry");
                      }
                    }}>
                    {option.label}
                  </Button>
                ))}
          </div>
          <div className="mt-3 flex gap-2">
            {onboardingStep !== "visitor" ? (
              <Button type="button" variant="ghost" onClick={() => setOnboardingStep(onboardingStep === "role" ? "industry" : "visitor")}>Back</Button>
            ) : null}
            <Button type="button" variant="ghost" onClick={() => {
              setPendingQuestion(null);
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
                      if (!hasVisitorProfile || isLoading || isClosingAnswer) return;
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
            disabled={pendingQuestion !== null || queuedQuestion !== null || isLoading}
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
              disabled={!question.trim() || isLoading || pendingQuestion !== null || queuedQuestion !== null}
              aria-label="Ask question"
              placement={"inset"}
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : <ArrowUp />}
            </CornerIconButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </motion.div>
    </div>
  );
}
