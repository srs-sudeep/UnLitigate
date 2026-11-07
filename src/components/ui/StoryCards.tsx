import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type Story = {
  id: string;
  name: string;
  role: string;
  quote: string;
  body: string;
  href: string;
  image: { src: string; alt: string };
};

export function StoryCards({ items }: { items: Story[] }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((story, index) => (
        <motion.div
          key={story.id}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
          className="h-full"
        >
          <Link
            to={story.href}
            className="hover-card group flex h-full flex-col overflow-hidden rounded-3xl bg-cream"
          >
            <img
              src={story.image.src}
              alt={story.image.alt}
              className="zoom-img h-56 w-full object-cover object-top"
            />
            <div className="flex flex-1 flex-col p-6">
              <p className="font-serif text-xl leading-snug text-ink">
                “{story.quote}”
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{story.body}</p>
              <p className="mt-4 text-sm font-semibold text-teal">
                {story.name}, {story.role}
              </p>
              <span className="meet-link mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-teal">
                Meet {story.name.split(" ")[0]} →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
