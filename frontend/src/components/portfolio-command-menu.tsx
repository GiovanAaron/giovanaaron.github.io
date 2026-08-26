"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, LoaderCircle, Sparkles } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { setAvatarThinking } from "@/lib/avatar-state";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion || isLoading) return;

    setIsLoading(true);
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
          className="animate-answer-in border-border text-foreground relative isolate mb-2 overflow-hidden rounded-2xl border bg-transparent px-4 py-3 text-sm leading-6 shadow-lg"
          role="status"
        >
          <span
            aria-hidden="true"
            className="bg-background/45 pointer-events-none absolute inset-0 -z-10 rounded-[inherit] backdrop-blur-[500px] backdrop-saturate-[160%]"
          />
          {answer}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        style={{
          WebkitBackdropFilter: "blur(15px)",
          backdropFilter: "blur(15px)",
          borderRadius: "9999px",
        }}
      >
        <InputGroup
          className="relative isolate h-14 overflow-hidden rounded-full border bg-transparent px-2 shadow-lg dark:bg-transparent"
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
            placeholder="Ask about my work and experience..."
            aria-label="Ask about Giovan's experience"
            className="h-full light:placeholder:text-olive-800 placeholder:opacity-100"
            // style={{backgroundColor: "white", color: "inherit"}}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit" size="icon-sm" disabled={!question.trim() || isLoading} aria-label="Ask question" className="rounded-full">
              {isLoading ? <LoaderCircle className="animate-spin" /> : <ArrowUp />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
