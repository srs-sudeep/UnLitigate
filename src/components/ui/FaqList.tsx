import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="group flex w-full items-start justify-between gap-4 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl text-ink transition-colors duration-200 group-hover:text-teal">
                {item.question}
              </span>
              <motion.span
                className="mt-1 inline-block text-teal"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-8 leading-relaxed text-ink/75">
                    {item.answer}
                    {item.link ? (
                      <>
                        {" "}
                        <Link
                          to={item.link.href}
                          className="font-semibold text-teal hover:underline"
                        >
                          {item.link.label}
                        </Link>
                      </>
                    ) : null}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
