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

const cornerControlPlacement: CornerIconButtonPlacement = "cascaded";

function getLocalAnswer(question: string) {
  const normalizedQuestion = question.toLowerCase();

  if (normalizedQuestion.includes("experience")) {
    return "I combine UI/UX design, user research, prototyping, and usability testing.";
  }
  if (normalizedQuestion.includes("work") || normalizedQuestion.includes("project")) {
    return "My work focuses on clear, accessible interfaces that solve real user needs.";
  }
  if (normalizedQuestion.includes("contact") || normalizedQuestion.includes("hire")) {
    return "I’m available for selected UI/UX projects—use Let’s Work Together to start a conversation.";
  }
  return "Thanks for asking. This command bar is ready to connect to your portfolio assistant API.";
}

export function PortfolioCommandMenu() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClosingAnswer, setIsClosingAnswer] = useState(false);

  function dismissAnswer() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnswer("");
      return;
    }

    setIsClosingAnswer(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion || isLoading) return;

    setIsLoading(true);
    setIsClosingAnswer(false);
    setAnswer("");
    setAvatarThinking(true);
    await new Promise((resolve) => window.setTimeout(resolve, 7000));
    setAnswer(getLocalAnswer(submittedQuestion));
    setAvatarThinking(false);
    setIsLoading(false);
  }

  return (
    <div className="fixed bottom-11 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2">
      {answer ? (
        <div
          className={`${isClosingAnswer ? "animate-answer-out" : "animate-answer-in"} relative isolate mb-2`}
          role="status"
          onAnimationEnd={() => {
            if (isClosingAnswer) {
              setAnswer("");
              setIsClosingAnswer(false);
            }
          }}
        >
          <div className="border-border text-foreground relative isolate overflow-hidden rounded-2xl border bg-transparent py-3 pr-12 pl-4 text-sm leading-6 shadow-lg">
            <span
              aria-hidden="true"
              className="bg-background/45 pointer-events-none absolute inset-0 -z-10 rounded-[inherit] backdrop-blur-[500px] backdrop-saturate-[160%]"
            />
            {answer}
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
              disabled={!question.trim() || isLoading}
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
