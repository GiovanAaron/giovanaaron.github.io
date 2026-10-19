"use client";

import { useSyncExternalStore } from "react";
import { parseRootHash, rootHash, type PortfolioView, type RootProjectId } from "./root-navigation";

const NAVIGATION_EVENT = "portfolio-root-navigation";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATION_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATION_EVENT, onChange);
  };
}

export function navigateRoot(view: PortfolioView, project?: RootProjectId) {
  const hash = rootHash(view, project);
  if (window.location.hash === hash) return;
  // pushState updates the shareable URL without native anchor scrolling.
  window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}

export function useRootNavigation() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  return parseRootHash(hash);
}
