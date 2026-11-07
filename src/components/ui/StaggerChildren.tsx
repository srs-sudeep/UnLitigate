import { Children, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child in seconds */
  stagger?: number;
  /** Vertical offset in px */
  y?: number;
  amount?: number;
};

/**
 * Once-in-view staggered fade-rise for card grids and numbered lists.
 */
export function StaggerChildren({
  children,
  className = "",
  stagger = 0.07,
  y = 16,
  amount = 0.35,
}: StaggerChildrenProps) {
  const reduced = usePrefersReducedMotion();
  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <motion.div
          key={index}
          className="h-full"
          initial={reduced ? false : { opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount }}
          transition={{ delay: index * stagger, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
