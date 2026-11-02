import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { isExternalHref, resolveHref } from "../../lib/links";

type Variant = "solid" | "outline" | "solidOnTeal" | "outlineOnTeal";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  solid:
    "bg-teal text-cream hover:bg-teal/90 shadow-[0_1px_0_rgba(31,42,46,0.08)]",
  outline:
    "border border-teal text-teal bg-transparent hover:bg-teal hover:text-cream",
  solidOnTeal:
    "bg-cream text-teal hover:bg-cream/90",
  outlineOnTeal:
    "border border-cream/70 text-cream bg-transparent hover:bg-cream hover:text-teal",
};

export function Button({
  href,
  onClick,
  children,
  variant = "solid",
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold tracking-wide transition-[color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${variants[variant]} ${className}`;

  if (!href) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  const resolved = resolveHref(href);

  if (isExternalHref(href)) {
    return (
      <a
        href={resolved}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={resolved} className={classes}>
      {children}
    </Link>
  );
}
