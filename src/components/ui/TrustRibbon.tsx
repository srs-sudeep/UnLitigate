import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type Item = { label: string; href: string };

export function TrustRibbon({ items }: { items: Item[] }) {
  const reduced = usePrefersReducedMotion();

  return (
    <ul className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-ink/10 pt-8 text-sm text-ink/70 sm:justify-center">
      {items.map((item, index) => (
        <motion.li
          key={item.label}
          className="flex items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: index * 0.08, duration: 0.35 }}
        >
          {index > 0 ? (
            <span className="hidden h-1.5 w-1.5 rounded-full bg-clay sm:block" aria-hidden="true" />
          ) : null}
          <Link to={item.href} className="transition-colors hover:text-teal">
            {item.label}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
