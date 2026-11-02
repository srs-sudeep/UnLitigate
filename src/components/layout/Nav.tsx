import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import site from "../../data/site.json";
import { Button } from "../ui/Button";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <img
            src={site.logo.nav.src}
            alt={site.logo.nav.alt}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-4 text-sm text-ink/80 lg:flex xl:gap-7 xl:text-[15px]">
          {site.nav.links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `relative whitespace-nowrap py-1 transition-colors hover:text-teal ${
                  isActive ? "text-teal" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive ? (
                    <span className="absolute inset-x-0 -bottom-0.5 h-px bg-clay" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
          <span
            className="hidden cursor-default whitespace-nowrap text-ink/35 xl:inline"
            title={site.nav.language.note}
          >
            {site.nav.language.en}
            <span className="mx-1 text-ink/20">/</span>
            {site.nav.language.hi}
          </span>
        </nav>

        <div className="hidden lg:block">
          <Button href={site.nav.cta.href}>{site.nav.cta.label}</Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h12M3 9h12M3 13h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/8 lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {site.nav.links.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base ${
                      isActive ? "bg-mist text-teal" : "text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 px-1 pb-2">
                <Button href={site.nav.cta.href} className="w-full">
                  {site.nav.cta.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
