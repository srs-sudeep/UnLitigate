import site from "../data/site.json";

/** Single source for the public email — swap in site.json → email only. */
export const contactEmail = {
  label: site.email.label,
  href: site.email.href,
};

export function publishedSocialLinks() {
  return Object.values(site.social).filter((item) => Boolean(item.href));
}

export function hasPublishedForm() {
  const url = site.form.url?.trim() ?? "";
  return url.length > 0 && !url.includes("REPLACE");
}
