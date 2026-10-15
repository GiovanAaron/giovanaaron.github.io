"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHARACTER_INTERVAL_MS = 12;

export function TypingResponse({ text, onComplete, onProgress }: {
  text: string;
  onComplete: () => void;
  onProgress: () => void;
}) {
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();
  const complete = useEffectEvent(onComplete);
  const progress = useEffectEvent(onProgress);

  useEffect(() => {
    if (reduceMotion || characters.length === 0) {
      const timer = setTimeout(() => complete(), 0);
      return () => clearTimeout(timer);
    }
    let count = 0;
    timerRef.current = setInterval(() => {
      count = Math.min(count + 1, characters.length);
      setVisibleCount(count);
      if (count === characters.length) {
        if (timerRef.current !== null) clearInterval(timerRef.current);
        timerRef.current = null;
        complete();
      }
    }, CHARACTER_INTERVAL_MS);
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [characters, reduceMotion]);

  useEffect(() => { progress(); }, [visibleCount]);

  function showFullAnswer() {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = null;
    onComplete();
  }

  return (
    <>
      {/* Announce the full response once, instead of each animated character. */}
      <p className="sr-only">{text}</p>
      <p aria-hidden="true" className="whitespace-pre-wrap break-words">
        {reduceMotion ? text : characters.slice(0, visibleCount).join("")}
        <span className="bg-current ml-0.5 inline-block h-4 w-0.5 animate-pulse align-middle motion-reduce:animate-none" />
      </p>
      <button type="button" onClick={showFullAnswer}
        className="mt-2 rounded text-xs underline underline-offset-4 opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        Show full answer
      </button>
    </>
  );
}
