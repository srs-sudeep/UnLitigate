import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "./Reveal";

type Card = {
  heading: string;
  body: string;
  icon: "neutral" | "time" | "decision";
};

type Bullet = {
  emphasis?: string;
  text: string;
  tone?: "clay" | "teal";
};

type MediatorMattersProps = {
  eyebrow: string;
  heading: string;
  body: string;
  cards: Card[];
  bullets: Bullet[];
  footnote: string;
};

function CardIcon({ icon }: { icon: Card["icon"] }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-teal">
      {icon === "neutral" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="7" cy="12" r="2.2" fill="currentColor" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <circle cx="17" cy="12" r="2.2" fill="currentColor" />
        </svg>
      ) : null}
      {icon === "time" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ) : null}
      {icon === "decision" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.5 12.2l2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ) : null}
    </span>
  );
}

export function MediatorMatters({
  eyebrow,
  heading,
  body,
  cards,
  bullets,
  footnote,
}: MediatorMattersProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div id="why-mediator" className="scroll-mt-28 py-4">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-cream/75">{body}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.heading}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="hover-card group rounded-3xl bg-cream p-6 text-ink"
          >
            <span className="hover-card-icon inline-block">
              <CardIcon icon={card.icon} />
            </span>
            <h3 className="mt-4 font-serif text-2xl">{card.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{card.body}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.45 }}
        className="mt-8 flex flex-col gap-3 rounded-[2rem] bg-cream px-6 py-4 text-sm text-ink sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 sm:rounded-full"
      >
        {bullets.map((item) => (
          <span key={`${item.emphasis ?? ""}${item.text}`} className="inline-flex items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                item.tone === "clay" ? "bg-clay" : "bg-teal"
              }`}
            />
            <span>
              {item.emphasis ? (
                <strong className="font-semibold text-clay">{item.emphasis}</strong>
              ) : null}
              {item.emphasis ? ` ${item.text}` : item.text}
            </span>
          </span>
        ))}
      </motion.div>
      <p className="mt-5 text-center text-sm text-cream/55">{footnote}</p>
    </div>
  );
}
