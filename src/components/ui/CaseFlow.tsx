import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "./Reveal";

type Step = {
  id: string;
  heading: string;
  body: string;
};

export function CaseFlow({
  heading,
  subheading,
  items,
}: {
  heading: string;
  subheading: string;
  items: Step[];
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div>
      <Reveal>
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{heading}</h2>
        <p className="mt-3 max-w-2xl text-ink/70">{subheading}</p>
      </Reveal>
      <ol className="mt-10 grid gap-4 md:grid-cols-4">
        {items.map((step, index) => (
          <motion.li
            key={step.id}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="relative rounded-3xl border border-ink/8 bg-mist/35 p-5"
          >
            <p className="font-serif text-3xl text-clay/70">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{step.heading}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.body}</p>
            {index < items.length - 1 ? (
              <motion.span
                className="pointer-events-none absolute top-1/2 -right-3 hidden text-teal md:block"
                aria-hidden="true"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.25, duration: 0.35 }}
              >
                →
              </motion.span>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
