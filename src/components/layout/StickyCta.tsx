import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import site from "../../data/site.json";

export function StickyCta() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-teal/20 bg-cream p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(31,42,46,0.08)] transition-transform duration-300 md:hidden ${
        footerVisible ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      aria-hidden={footerVisible}
    >
      <Link
        to={site.stickyCta.href}
        tabIndex={footerVisible ? -1 : undefined}
        className="flex h-12 items-center justify-center rounded-full border border-teal/25 bg-cream text-[15px] font-semibold text-teal"
      >
        {site.stickyCta.label}
      </Link>
    </div>
  );
}
