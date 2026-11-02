import { Link } from "react-router-dom";
import site from "../../data/site.json";

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
      <Link
        to={site.stickyCta.href}
        className="flex h-12 items-center justify-center rounded-full bg-teal text-[15px] font-semibold text-cream"
      >
        {site.stickyCta.label}
      </Link>
    </div>
  );
}
