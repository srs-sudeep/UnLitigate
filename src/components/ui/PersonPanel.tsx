import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export type Person = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  storyHeading: string;
  story: string;
  detailsHref?: string;
  image: { src: string; alt: string };
};

type PersonPanelProps = {
  person: Person | null;
  onClose: () => void;
};

export function PersonPanel({ person, onClose }: PersonPanelProps) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!person) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [person, onClose]);

  return (
    <AnimatePresence>
      {person ? (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            className="fixed inset-0 z-[70] bg-ink/40"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={`person-${person.id}`}
            className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col overflow-y-auto bg-cream shadow-[-18px_0_50px_rgba(31,42,46,0.18)]"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/8 bg-cream/95 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                Team
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-ink/10 px-3 py-1.5 text-sm font-semibold text-ink hover:bg-mist/50"
              >
                Close
              </button>
            </div>
            <img
              src={person.image.src}
              alt={person.image.alt}
              className="h-64 w-full object-cover object-top"
            />
            <div className="px-6 py-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                {person.role}
              </p>
              <h2 id={`person-${person.id}`} className="mt-2 font-serif text-3xl text-ink">
                {person.name}
              </h2>
              <h3 className="mt-6 font-serif text-2xl text-ink">{person.storyHeading}</h3>
              <div className="mt-4 space-y-3 leading-relaxed text-ink/75">
                {person.story.split("\n\n").map((para) => (
                  <p key={para.slice(0, 28)}>{para}</p>
                ))}
              </div>
              {person.detailsHref ? (
                <a
                  href={person.detailsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex text-sm font-semibold text-teal hover:underline"
                >
                  Read their full story →
                </a>
              ) : null}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
