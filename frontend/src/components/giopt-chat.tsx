"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp, LoaderCircle, RotateCcw, Sparkles } from "lucide-react";
import { VisitorOnboarding } from "@/components/visitor-onboarding";
import { TypingResponse } from "@/components/typing-response";
import { ApiUsageMeter } from "@/components/api-usage-meter";
import { reserveApiCall } from "@/lib/giopt/api-usage";
import { useVisitor } from "@/components/visitor-provider";
import { presetAnswers } from "@/data/giopt/answers";
import { answerQuestion } from "@/lib/giopt/answer-question";
import { formatResponseText } from "@/lib/giopt/format-response-text";
import { setAvatarThinking } from "@/lib/avatar-state";
import type { GioPTMessage, PortfolioLink } from "@/types/giopt";
import type { VisitorProfile } from "@/types/visitor";

type ChatMessage = GioPTMessage & { id: string; links?: PortfolioLink[] };
const welcome: ChatMessage = {
  id: "welcome", role: "assistant",
  content: "Hi, I’m ChatGioPT. Ask me about Giovan’s work, projects, or experience. How can I help?",
};
const initialSuggestions = [...new Set(presetAnswers.map(preset => preset.suggestedQuestion))].slice(0, 3);

export function GioPTChat() {
  const visitor = useVisitor();
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [draft, setDraft] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const historyRef = useRef<GioPTMessage[]>([]);
  const requestRef = useRef<AbortController | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const followLatestRef = useRef(true);

  function scrollToLatest() {
    const transcript = transcriptRef.current;
    if (transcript && followLatestRef.current) transcript.scrollTop = transcript.scrollHeight;
  }

  useEffect(() => () => { requestRef.current?.abort(); setAvatarThinking(false); }, []);
  useEffect(() => {
    const transcript = transcriptRef.current;
    if (transcript && followLatestRef.current) transcript.scrollTop = transcript.scrollHeight;
  }, [messages, isLoading]);

  async function sendQuestion(question: string, profile: VisitorProfile) {
    if (requestRef.current || typingMessageId) return;
    const controller = new AbortController();
    requestRef.current = controller;
    followLatestRef.current = true;
    setPendingQuestion(null);
    setDraft("");
    setMessages(current => [...current, { id: crypto.randomUUID(), role: "user", content: question }]);
    setSuggestions([]);
    setIsLoading(true);
    setAvatarThinking(true);
    try {
      const response = await answerQuestion(question, presetAnswers, profile, {
        messages: historyRef.current, signal: controller.signal,
        beforeApiRequest: () => reserveApiCall(controller.signal),
      });
      if (controller.signal.aborted) return;
      if (response.source === "preset" || response.intent) {
        await new Promise<void>(resolve => {
          const finish = () => { clearTimeout(timer); controller.signal.removeEventListener("abort", finish); resolve(); };
          const timer = setTimeout(finish, 3000);
          controller.signal.addEventListener("abort", finish, { once: true });
        });
      }
      if (controller.signal.aborted) return;
      const responseId = crypto.randomUUID();
      setTypingMessageId(responseId);
      setMessages(current => [...current, {
        id: responseId, role: "assistant", content: response.answer, links: response.links,
      }]);
      setSuggestions(response.suggestedQuestions ?? []);
      if (!response.intent && response.source !== "fallback") {
        historyRef.current = [...historyRef.current,
          { role: "user" as const, content: question },
          { role: "assistant" as const, content: response.answer },
        ].slice(-20);
      }
    } catch {
      if (!controller.signal.aborted) {
        setMessages(current => [...current, { id: crypto.randomUUID(), role: "assistant", content: "I couldn’t get an answer right now. Please try again." }]);
        setSuggestions(initialSuggestions);
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
        setAvatarThinking(false);
        inputRef.current?.focus({ preventScroll: true });
      }
    }
  }

  function submitQuestion(question: string) {
    const trimmed = question.trim();
    if (!trimmed || requestRef.current || typingMessageId || pendingQuestion !== null) return;
    if (visitor.visitorType !== "other" && !(visitor.visitorType && visitor.requestedIndustry && visitor.role)) {
      setDraft(trimmed);
      setPendingQuestion(trimmed);
      return;
    }
    void sendQuestion(trimmed, visitor);
  }

  function resetChat() {
    requestRef.current?.abort();
    requestRef.current = null;
    historyRef.current = [];
    setTypingMessageId(null);
    followLatestRef.current = true;
    setMessages([welcome]); setDraft(""); setSuggestions(initialSuggestions);
    setPendingQuestion(null); setIsLoading(false); setAvatarThinking(false);
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <section aria-label="Chat with ChatGioPT" className="bg-card border-border flex h-[min(740px,calc(100dvh-8rem))] min-h-[480px] w-full flex-col overflow-hidden rounded-2xl border shadow-sm lg:h-[650px]">
      <div className="border-border flex items-center justify-between gap-3 border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full"><Sparkles className="size-5" aria-hidden="true" /></span>
          <div><h1 className="text-lg font-semibold tracking-tight">ChatGioPT</h1><p className="text-muted-foreground text-xs">Giovan’s portfolio assistant</p></div>
        </div>
        <button type="button" onClick={resetChat} aria-label="Start a new chat" title="New chat" className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-primary"><RotateCcw className="size-4" /></button>
      </div>
      <ApiUsageMeter />
      <div ref={transcriptRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions"
        onScroll={event => {
          const transcript = event.currentTarget;
          followLatestRef.current = transcript.scrollHeight - transcript.scrollTop - transcript.clientHeight < 48;
        }}
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
        {messages.map(message => (
          <div key={message.id} className={`flex flex-col gap-1.5 ${message.role === "user" ? "items-end" : "items-start"}`}>
            <span className="text-muted-foreground px-1 text-[11px] font-medium">{message.role === "user" ? "You" : "ChatGioPT"}</span>
            <div className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
              {typingMessageId === message.id ? (
                <TypingResponse text={message.content} onProgress={scrollToLatest}
                  onComplete={() => {
                    setTypingMessageId(null);
                    inputRef.current?.focus({ preventScroll: true });
                  }} />
              ) : <div className="whitespace-pre-wrap break-words">{message.role === "assistant" ? formatResponseText(message.content) : message.content}</div>}
              {typingMessageId !== message.id && message.links?.length ? <ul className="mt-3 space-y-1">{message.links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{link.label}</a></li>)}</ul> : null}
            </div>
          </div>
        ))}
        {isLoading ? <p role="status" className="text-muted-foreground flex items-center gap-2 text-sm"><LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />ChatGioPT is thinking…</p> : null}
      </div>
      {pendingQuestion !== null ? (
        <div className="border-border max-h-[55dvh] shrink-0 overflow-y-auto border-t p-3">
          <VisitorOnboarding onCancel={() => { setPendingQuestion(null); inputRef.current?.focus(); }} onComplete={profile => void sendQuestion(pendingQuestion, profile)} />
        </div>
      ) : (
        <div className="border-border shrink-0 border-t p-4">
          {!typingMessageId && suggestions.length > 0 ? <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
            {suggestions.map(suggestion => <button key={suggestion} type="button" disabled={isLoading} onClick={() => submitQuestion(suggestion)} className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl border px-3 py-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-primary">{suggestion}</button>)}
          </div> : null}
          <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); submitQuestion(draft); }} className="bg-background border-border flex items-end gap-2 rounded-xl border p-2 focus-within:ring-2 focus-within:ring-ring/40">
            <textarea ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} disabled={isLoading} rows={2} aria-label="Your message to ChatGioPT" placeholder="Ask about my work and experience…"
              onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submitQuestion(draft); } }}
              className="placeholder:text-muted-foreground min-w-0 flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none disabled:opacity-60" />
            <button type="submit" disabled={!draft.trim() || isLoading || Boolean(typingMessageId)} aria-label="Send message" className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"><ArrowUp className="size-4" /></button>
          </form>
          <p className="text-muted-foreground mt-2 text-center text-[10px]">Enter to send · Shift + Enter for a new line</p>
        </div>
      )}
    </section>
  );
}
