export const API_CALL_LIMIT = 10;
export const API_WINDOW_MS = 12 * 60 * 60 * 1000;
export const API_USAGE_KEY = "giopt_api_usage_v1";
export const API_USAGE_EVENT = "giopt-api-usage-changed";
let memorySnapshot = "[]";

export function getUsageSnapshot(): string {
  try { return window.localStorage.getItem(API_USAGE_KEY) ?? "[]"; }
  catch { return memorySnapshot; }
}

export function getActiveCalls(snapshot: string, now: number): number[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((time): time is number =>
      typeof time === "number" && Number.isFinite(time) && time <= now && time > now - API_WINDOW_MS,
    ).sort((a, b) => a - b);
  } catch { return []; }
}

// Reserve before dispatch: failed requests also count as API calls.
export async function reserveApiCall(signal?: AbortSignal): Promise<boolean> {
  function reserve() {
    if (signal?.aborted) return false;
    const now = Date.now();
    const calls = getActiveCalls(getUsageSnapshot(), now);
    if (calls.length >= API_CALL_LIMIT) return false;
    memorySnapshot = JSON.stringify([...calls, now]);
    try { window.localStorage.setItem(API_USAGE_KEY, memorySnapshot); } catch { /* Fall back to memory. */ }
    window.dispatchEvent(new Event(API_USAGE_EVENT));
    return true;
  }
  if (navigator.locks) return navigator.locks.request(API_USAGE_KEY, reserve);
  return reserve();
}
