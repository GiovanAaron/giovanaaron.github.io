import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_USAGE_KEY, API_WINDOW_MS, getActiveCalls, getUsageSnapshot, reserveApiCall } from "./api-usage";

let storage: Map<string, string>;
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-15T12:00:00Z"));
  storage = new Map();
  vi.stubGlobal("window", {
    localStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value) },
    dispatchEvent: vi.fn(),
  });
  vi.stubGlobal("navigator", {});
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("API allowance", () => {
  it("allows ten requests and blocks the eleventh", async () => {
    for (let i = 0; i < 10; i++) expect(await reserveApiCall()).toBe(true);
    expect(await reserveApiCall()).toBe(false);
    expect(getActiveCalls(getUsageSnapshot(), Date.now())).toHaveLength(10);
  });

  it("uses persisted usage and restores slots individually after 12 hours", async () => {
    const start = Date.now();
    storage.set(API_USAGE_KEY, JSON.stringify([start, ...Array(9).fill(start + 1000)]));
    vi.setSystemTime(start + 1000);
    expect(await reserveApiCall()).toBe(false);
    vi.setSystemTime(start + API_WINDOW_MS);
    expect(await reserveApiCall()).toBe(true);
    expect(await reserveApiCall()).toBe(false);
    vi.setSystemTime(start + API_WINDOW_MS + 1000);
    expect(getActiveCalls(getUsageSnapshot(), Date.now())).toHaveLength(1);
  });

  it("does not consume allowance for a cancelled request", async () => {
    const controller = new AbortController();
    controller.abort();
    expect(await reserveApiCall(controller.signal)).toBe(false);
    expect(storage.has(API_USAGE_KEY)).toBe(false);
  });

  it("ignores malformed, expired, and future timestamps", () => {
    const now = Date.now();
    expect(getActiveCalls("not json", now)).toEqual([]);
    expect(getActiveCalls(JSON.stringify([null, "bad", now - API_WINDOW_MS, now + 1000, now]), now)).toEqual([now]);
  });

  it("reserves under a cross-tab lock when available", async () => {
    const request = vi.fn((_key: string, action: () => boolean) => action());
    vi.stubGlobal("navigator", { locks: { request } });
    expect(await reserveApiCall()).toBe(true);
    expect(request).toHaveBeenCalledWith(API_USAGE_KEY, expect.any(Function));
  });
});
