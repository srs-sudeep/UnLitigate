import site from "../data/site.json";
import { hasPublishedForm } from "./contact";

export function resolveHref(href: string): string {
  if (href === "form") return hasPublishedForm() ? site.form.url : "/get-in-touch";
  return href;
}

export function isExternalHref(href: string): boolean {
  const resolved = resolveHref(href);
  return (
    resolved.startsWith("http://") ||
    resolved.startsWith("https://") ||
    resolved.startsWith("mailto:")
  );
}
