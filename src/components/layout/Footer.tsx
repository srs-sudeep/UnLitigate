import { Link } from "react-router-dom";
import site from "../../data/site.json";
import { BrandMark } from "../illustrations/BrandMark";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-lg">
          <BrandMark tone="cream" size="footer" />
          <p className="mt-5 text-sm leading-relaxed text-cream/70">
            {site.footer.disclaimer}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {site.footer.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-cream/85 underline-offset-4 hover:text-cream hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm md:items-end">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a
              href={site.social.instagram.href}
              className="text-cream/85 hover:text-cream"
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.social.instagram.label}
            </a>
            <a
              href={site.social.linkedin.href}
              className="text-cream/85 hover:text-cream"
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.social.linkedin.label}
            </a>
            <a
              href={site.social.email.href}
              className="text-cream/85 hover:text-cream"
            >
              {site.social.email.label}
            </a>
          </div>
          <svg
            viewBox="0 0 120 20"
            className="mt-2 h-5 w-28"
            aria-hidden="true"
          >
            <line
              x1="8"
              y1="10"
              x2="112"
              y2="10"
              stroke="#F7F2EA"
              strokeWidth="1.4"
              opacity="0.7"
            />
            <circle cx="8" cy="10" r="3.5" fill="#F7F2EA" />
            <circle cx="40" cy="10" r="3" fill="#C9683F" />
            <circle cx="80" cy="10" r="3" fill="#C9683F" />
            <circle cx="112" cy="10" r="3.5" fill="#F7F2EA" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
