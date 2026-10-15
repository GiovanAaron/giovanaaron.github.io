"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Moon, Sparkles, Sun } from "lucide-react";

const COMPLETION_COOKIE = "giovan_portfolio_tour_completed_v1";

function hasCompletedTour() {
  try {
    return document.cookie.split(";").some(cookie => cookie.trim() === `${COMPLETION_COOKIE}=1`);
  } catch {
    return false;
  }
}

function rememberTourCompletion() {
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COMPLETION_COOKIE}=1; Max-Age=3600; Path=/; SameSite=Lax${secure}`;
  } catch {
    // The tour remains dismissible when browser storage is blocked.
  }
}

type TourStep = "idle" | "command" | "waiting" | "theme" | "done";
type Spotlight = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  dimTop: number;
  width: number;
  height: number;
};

export function PortfolioFeatureTour() {
  const [step, setStep] = useState<TourStep>("idle");
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isShowing = step === "command" || step === "theme";

  function dismissStep() {
    if (step === "theme") rememberTourCompletion();
    if (bubbleRef.current?.contains(document.activeElement)) {
      previousFocusRef.current?.focus({ preventScroll: true });
    }
    setSpotlight(null);
    setStep(step === "command" ? "waiting" : "done");
  }

  // Skip completed tours until the one-hour cookie expires.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches || hasCompletedTour()) return;
    const timer = window.setTimeout(() => {
      const target = document.querySelector('[data-tour="portfolio-command"]');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 24 || rect.top < 100) {
        target.scrollIntoView({ block: "center", behavior: "instant" });
      }
      setStep("command");
    }, 800);
    function handleBreakpointChange() {
      if (!desktop.matches) {
        window.clearTimeout(timer);
        setStep("done");
        setSpotlight(null);
      }
    }
    desktop.addEventListener("change", handleBreakpointChange);
    return () => {
      window.clearTimeout(timer);
      desktop.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (step !== "waiting") return;
    const timer = window.setTimeout(() => {
      const target = document.querySelector('[data-tour="theme-toggle"]');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      setStep("theme");
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [step]);

  // Track the actual target, including scrolling and the command menu's motion.
  useEffect(() => {
    if (!isShowing) return;
    const target = document.querySelector(`[data-tour="${step === "command" ? "portfolio-command" : "theme-toggle"}"]`);
    if (!target) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let frame: number;
    let previous = "";
    function measure() {
      if (!target?.isConnected) {
        setStep("done");
        setSpotlight(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      const nav = document.querySelector('[data-tour="navigation"]')?.getBoundingClientRect();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dimTop = step === "command" ? Math.max(0, Math.min(height, nav?.bottom ?? 0)) : 0;
      const next: Spotlight = {
        top: Math.max(dimTop, rect.top - 10),
        left: Math.max(0, rect.left - 10),
        right: Math.min(width, rect.right + 10),
        bottom: Math.min(height, rect.bottom + 10),
        dimTop, width, height,
      };
      const signature = JSON.stringify(next);
      if (signature !== previous) { previous = signature; setSpotlight(next); }
      frame = window.requestAnimationFrame(measure);
    }
    frame = window.requestAnimationFrame(measure);
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isShowing, step]);

  useEffect(() => {
    if (!isShowing) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !bubbleRef.current?.contains(event.target)) {
        if (step === "theme") rememberTourCompletion();
        setSpotlight(null);
        setStep(step === "command" ? "waiting" : "done");
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (step === "theme") rememberTourCompletion();
        if (bubbleRef.current?.contains(document.activeElement)) {
          previousFocusRef.current?.focus({ preventScroll: true });
        }
        setSpotlight(null);
        setStep(step === "command" ? "waiting" : "done");
      }
    }
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isShowing, step]);

  if (step === "idle") return null;
  const bubbleWidth = 360;
  const bubbleHeight = 220;
  const below = step === "theme" || Boolean(spotlight && spotlight.top < bubbleHeight + 24);
  const left = spotlight ? Math.max(24, Math.min(
    spotlight.width - bubbleWidth - 24,
    step === "theme" ? spotlight.right - bubbleWidth : (spotlight.left + spotlight.right - bubbleWidth) / 2,
  )) : 0;
  const top = spotlight ? Math.max(16, Math.min(
    spotlight.height - bubbleHeight - 16,
    below ? spotlight.bottom + 18 : spotlight.top - bubbleHeight - 18,
  )) : 0;
  const arrowLeft = spotlight ? Math.max(24, Math.min(bubbleWidth - 24, (spotlight.left + spotlight.right) / 2 - left)) : bubbleWidth / 2;

  return createPortal(
    <AnimatePresence>
      {isShowing && spotlight ? (
        <motion.div key={step} className="fixed inset-0 z-[100] hidden pointer-events-none lg:block"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}>
          {[
            { top: spotlight.dimTop, left: 0, width: "100%", height: Math.max(0, spotlight.top - spotlight.dimTop) },
            { top: spotlight.top, left: 0, width: spotlight.left, height: Math.max(0, spotlight.bottom - spotlight.top) },
            { top: spotlight.top, left: spotlight.right, right: 0, height: Math.max(0, spotlight.bottom - spotlight.top) },
            { top: spotlight.bottom, left: 0, width: "100%", bottom: 0 },
          ].map((style, index) => (
            <div key={index} className="pointer-events-auto absolute bg-black/40 backdrop-blur-sm" style={style as CSSProperties} />
          ))}
          <div className="border-primary/60 absolute rounded-2xl border-2 shadow-[0_0_0_4px_var(--background)]"
            style={{ left: spotlight.left, top: spotlight.top, width: spotlight.right - spotlight.left, height: Math.max(0, spotlight.bottom - spotlight.top) }} />
          <motion.div ref={bubbleRef} role="dialog" aria-label={step === "command" ? "Meet ChatGioPT" : "Choose your theme"}
            aria-describedby="portfolio-tour-description"
            className="bg-card text-card-foreground border-border pointer-events-auto absolute flex h-[220px] w-[360px] flex-col rounded-2xl border p-5 shadow-2xl"
            style={{ left, top, transformOrigin: `${arrowLeft}px ${below ? "0%" : "100%"}` }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: step === "command" ? -5 : 5, y: below ? -12 : 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 150, damping: 18 }}
            onAnimationComplete={() => continueRef.current?.focus({ preventScroll: true })}>
            <span aria-hidden="true" className={`bg-card border-border absolute size-4 rotate-45 ${below ? "-top-2 border-l border-t" : "-bottom-2 border-b border-r"}`} style={{ left: arrowLeft - 8 }} />
            <div className="text-primary mb-3 flex items-center gap-2 text-xs font-semibold  tracking-wider">
              {step === "command" ? <Sparkles className="size-4" /> : <span className="flex items-center gap-1"><Sun className="size-4" /><Moon className="size-3" /></span>}
              {step === "command" ? "Meet ChatGioPT" : "MAKE YOURSELF COMFORTABLE"}
            </div>
            <p id="portfolio-tour-description" className="text-sm leading-6">
              {step === "command"
                ? "Have questions about me and my work? Submit them here and get a fast response from my AI assistant."
                : "Prefer a different look? Use this toggle to switch between light and dark mode."}
            </p>
            <div className="mt-auto flex items-center justify-end gap-3">
              {/* <span className="text-muted-foreground text-xs">Or click anywhere else to continue.</span> */}
              <button ref={continueRef} type="button" onClick={dismissStep}
                className="bg-primary text-primary-foreground min-h-10 rounded-lg px-4 text-sm font-semibold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Okay</button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>, document.body,
  );
}
