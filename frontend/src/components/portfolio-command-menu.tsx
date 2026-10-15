"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
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
import { VisitorOnboarding } from "@/components/visitor-onboarding";
import { useVisitor } from "@/components/visitor-provider";
import { presetAnswers } from "@/data/giopt/answers";
import { answerQuestion } from "@/lib/giopt/answer-question";
import { formatResponseText } from "@/lib/giopt/format-response-text";
import type { GioPTMessage } from "@/types/giopt";
import type { VisitorProfile } from "@/types/visitor";

const cornerControlPlacement: CornerIconButtonPlacement = "cascaded";
const LOCAL_ANSWER_DELAY_MS = 3000;

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
  const messagesRef = useRef<GioPTMessage[]>([]);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => {
    requestRef.current?.abort();
    setAvatarThinking(false);
  }, []);

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
  const { visitorType, requestedIndustry, role } = visitorContext;
  const hasVisitorProfile = visitorType === "other" || Boolean(visitorType && requestedIndustry && role);

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

    if (!hasVisitorProfile) {
      setPendingQuestion(submittedQuestion);
      return;
    }

    void processQuestion(submittedQuestion, visitorContext);
  }

  async function processQuestion(submittedQuestion: string, context: VisitorProfile) {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setIsLoading(true);
    setIsClosingAnswer(false);
    setAnswer("");
    setSuggestedQuestions([]);
    setAvatarThinking(true);
    // console.log("usercontext", context);
    try {
      const response = await answerQuestion(submittedQuestion, presetAnswers, context, {
        messages: messagesRef.current,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      if (response.source === "preset" || response.intent) {
        await new Promise<void>((resolve) => {
          const finish = () => {
            window.clearTimeout(timer);
            controller.signal.removeEventListener("abort", finish);
            resolve();
          };
          const timer = window.setTimeout(finish, LOCAL_ANSWER_DELAY_MS);
          controller.signal.addEventListener("abort", finish, { once: true });
        });
      }
      if (controller.signal.aborted) return;
      setAnswer(response.answer);
      setSuggestedQuestions(response.suggestedQuestions ?? []);
      if (!response.intent && response.source !== "fallback") {
        messagesRef.current = [
          ...messagesRef.current,
          { role: "user" as const, content: submittedQuestion },
          { role: "assistant" as const, content: response.answer },
        ].slice(-20);
      }
    } catch {
      if (!controller.signal.aborted) {
        setAnswer("I couldn’t get an answer right now. Please try again.");
      }
    } finally {
      if (requestRef.current === controller && !controller.signal.aborted) {
        setAvatarThinking(false);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="lg:mx-auto lg:my-8 lg:min-h-14 lg:w-[calc(100%-2rem)] lg:max-w-xl">
    <motion.div
      ref={menuRef}
      data-tour="portfolio-command"
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
        <div className="mb-3">
          <VisitorOnboarding
            onCancel={() => setPendingQuestion(null)}
            onComplete={(profile) => {
              setPendingQuestion(null);
              void processQuestion(pendingQuestion, profile);
            }}
          />
        </div>
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
            {formatResponseText(answer)}
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
    </motion.div>
    </div>
  );
}
