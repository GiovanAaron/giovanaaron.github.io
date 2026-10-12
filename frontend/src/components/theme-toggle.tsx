"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import {
  triggerAvatarLightReaction,
  triggerAvatarSleeping,
} from "@/lib/avatar-state";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsDark(nextIsDark);
    if (nextIsDark) triggerAvatarSleeping();
    else triggerAvatarLightReaction();
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring relative flex size-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {isDark ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
