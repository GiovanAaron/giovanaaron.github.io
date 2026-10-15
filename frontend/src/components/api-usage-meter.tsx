"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { API_CALL_LIMIT, API_WINDOW_MS, API_USAGE_EVENT, API_USAGE_KEY, getActiveCalls, getUsageSnapshot } from "@/lib/giopt/api-usage";

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === API_USAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(API_USAGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(API_USAGE_EVENT, onChange);
  };
}

export function ApiUsageMeter() {
  const snapshot = useSyncExternalStore(subscribe, getUsageSnapshot, () => "[]");
  const [now, setNow] = useState(Date.now);
  const calls = getActiveCalls(snapshot, now);
  const remaining = Math.max(0, API_CALL_LIMIT - calls.length);
  const nextAvailableAt = calls.length ? calls[0] + API_WINDOW_MS : null;

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const immediate = window.setTimeout(refresh, 0);
    const expiry = nextAvailableAt ? window.setTimeout(refresh, Math.max(1, nextAvailableAt - Date.now())) : null;
    window.addEventListener("focus", refresh);
    return () => {
      window.clearTimeout(immediate);
      if (expiry !== null) window.clearTimeout(expiry);
      window.removeEventListener("focus", refresh);
    };
  }, [snapshot, nextAvailableAt]);

  return (
    <div className="border-border border-b px-5 py-3">
      <div className="text-muted-foreground mb-2 flex items-center justify-between gap-3 text-xs">
        <span>AI responses</span>
        <span aria-live="polite">{remaining} / {API_CALL_LIMIT} remaining</span>
      </div>
      <div role="progressbar" aria-label="AI responses remaining" aria-valuemin={0} aria-valuemax={API_CALL_LIMIT} aria-valuenow={remaining} className="bg-secondary h-1.5 overflow-hidden rounded-full">
        <div className="bg-primary h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${remaining / API_CALL_LIMIT * 100}%` }} />
      </div>
      {remaining === 0 ? (
        <p role="status" className="text-muted-foreground mt-2 text-xs">
          You’ve reached your AI response limit. Please try again later.
        </p>
      ) : null}
    </div>
  );
}
