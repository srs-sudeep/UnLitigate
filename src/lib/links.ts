import site from "../data/site.json";

export function resolveHref(href: string): string {
  if (href === "form") return site.form.url;
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
