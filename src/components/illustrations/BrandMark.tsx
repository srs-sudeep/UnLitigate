import { Link } from "react-router-dom";
import site from "../../data/site.json";

type BrandMarkProps = {
  tone?: "ink" | "cream";
  size?: "nav" | "footer";
  to?: string;
  onClick?: () => void;
};

const sizes = {
  nav: {
    icon: "h-11 w-11 sm:h-12 sm:w-12",
    text: "text-xl sm:text-2xl",
    gap: "gap-2.5 sm:gap-3",
  },
  footer: {
    icon: "h-12 w-12",
    text: "text-2xl",
    gap: "gap-3",
  },
};

export function BrandMark({
  tone = "ink",
  size = "nav",
  to = "/",
  onClick,
}: BrandMarkProps) {
  const s = sizes[size];
  const textColor = tone === "cream" ? "text-cream" : "text-teal";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center ${s.gap} shrink-0`}
      aria-label={site.name}
    >
      <img
        src={site.logo.icon.src}
        alt=""
        className={`${s.icon} rounded-full`}
      />
      <span className={`font-serif font-semibold tracking-tight ${s.text} ${textColor}`}>
        {site.name}
      </span>
    </Link>
  );
}
