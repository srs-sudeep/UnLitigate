type EventName = "open_form" | string;

const COUNT_KEY = "ul-event-counts";

function bumpLocal(name: EventName) {
  try {
    const raw = window.localStorage.getItem(COUNT_KEY);
    const counts = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    counts[name] = (counts[name] ?? 0) + 1;
    window.localStorage.setItem(COUNT_KEY, JSON.stringify(counts));
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function trackEvent(name: EventName, payload: Record<string, unknown> = {}) {
  bumpLocal(name);
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...payload });
}

export function getEventCount(name: EventName): number {
  try {
    const raw = window.localStorage.getItem(COUNT_KEY);
    if (!raw) return 0;
    const counts = JSON.parse(raw) as Record<string, number>;
    return counts[name] ?? 0;
  } catch {
    return 0;
  }
}
