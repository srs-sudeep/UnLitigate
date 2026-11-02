import Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(
  target: number | HTMLElement,
  options?: { immediate?: boolean; offset?: number },
) {
  const offset = options?.offset ?? 0;
  const immediate = options?.immediate ?? false;
  if (instance) {
    instance.scrollTo(target, { offset, immediate, duration: 1.05 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}
