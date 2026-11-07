import { useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "./Reveal";

type Card = {
  id: string;
  icon: string;
  heading: string;
  summary: string;
  detail: string;
};

type SafeguardsPanelProps = {
  heading: string;
  subheading: string;
  cards: Card[];
  take: { heading: string; items: string[] };
  leave: { heading: string; items: string[]; note: string };
};

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6 text-teal";
  if (name === "lock") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (name === "tick") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "document") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3.5h7l4 4V20.5H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3.5V8h4M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19 7v5.2c0 4.3-2.9 7.7-7 9.3-4.1-1.6-7-5-7-9.3V7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SafeguardsPanel({
  heading,
  subheading,
  cards,
  take,
  leave,
}: SafeguardsPanelProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <div id="safeguards" className="scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
            {subheading}
          </p>
        </Reveal>
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((card, index) => {
              const open = openId === card.id;
              return (
                <motion.button
                  key={card.id}
                  type="button"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  onClick={() => setOpenId(open ? null : card.id)}
                  aria-expanded={open}
                  aria-controls={`safeguard-detail-${card.id}`}
                  className={`hover-card rounded-3xl bg-cream p-5 text-left ${
                    open ? "border-clay shadow-[0_12px_28px_rgba(31,42,46,0.1)]" : ""
                  }`}
                >
                  <Icon name={card.icon} />
                  <h3 className="mt-3 font-serif text-xl text-ink">{card.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{card.summary}</p>
                  {open ? (
                    <p
                      id={`safeguard-detail-${card.id}`}
                      className="mt-3 text-sm leading-relaxed text-ink/75"
                    >
                      {card.detail}
                    </p>
                  ) : null}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl border border-ink/8 bg-mist/35 p-5 sm:p-6"
            >
              <h3 className="font-serif text-2xl text-ink">{take.heading}</h3>
              <ul className="mt-4 space-y-3">
                {take.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-start gap-3 text-sm text-ink/80"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal bg-teal text-[11px] text-cream"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="rounded-3xl border border-ink/8 bg-cream p-5 sm:p-6"
            >
              <h3 className="font-serif text-2xl text-ink">{leave.heading}</h3>
              <ul className="mt-4 space-y-3">
                {leave.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-start gap-3 text-sm text-ink/80"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-clay/40 text-[12px] font-semibold text-clay"
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink/60">{leave.note}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
