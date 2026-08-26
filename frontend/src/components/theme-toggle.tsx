"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { triggerAvatarSleeping } from "@/lib/avatar-state";

const themeStorageKey = "portfolio-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = requestAnimationFrame(() => setIsDark(shouldUseDark));

    return () => cancelAnimationFrame(frame);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem(themeStorageKey, nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
    if (nextIsDark) triggerAvatarSleeping();
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
