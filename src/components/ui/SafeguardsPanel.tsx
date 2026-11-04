import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

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
  take: { heading: string; body: string };
  leave: { heading: string; body: string };
  checklist: string[];
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
  checklist,
}: SafeguardsPanelProps) {
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mode, setMode] = useState<"take" | "leave">("take");
  const [checked, setChecked] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reduced) {
      setChecked(checklist.length);
      return;
    }
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        let i = 0;
        const tick = window.setInterval(() => {
          i += 1;
          setChecked(i);
          if (i >= checklist.length) window.clearInterval(tick);
        }, 220);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [checklist.length, reduced]);

  const active = mode === "take" ? take : leave;

  return (
    <div id="safeguards" className="scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
            {subheading}
          </p>
        </div>
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((card) => {
              const open = openId === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setOpenId(open ? null : card.id)}
                  className={`rounded-3xl border border-ink/8 bg-cream p-5 text-left transition-shadow ${
                    open ? "shadow-[0_12px_28px_rgba(31,42,46,0.1)]" : "hover:shadow-md"
                  }`}
                >
                  <Icon name={card.icon} />
                  <h3 className="mt-3 font-serif text-xl text-ink">{card.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{card.summary}</p>
                  <p
                    className={`mt-3 text-sm leading-relaxed text-ink/75 transition-all ${
                      open ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {card.detail}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-ink/8 bg-mist/40 p-5 sm:p-6">
            <div className="inline-flex rounded-full border border-ink/10 bg-cream p-1">
              <button
                type="button"
                onClick={() => setMode("take")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  mode === "take" ? "bg-teal text-cream" : "text-ink/70"
                }`}
              >
                We take
              </button>
              <button
                type="button"
                onClick={() => setMode("leave")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  mode === "leave" ? "bg-clay text-cream" : "text-ink/70"
                }`}
              >
                We don't take
              </button>
            </div>
            <h3 className="mt-4 font-serif text-2xl text-ink">{active.heading}</h3>
            <p className="mt-2 leading-relaxed text-ink/75">{active.body}</p>
          </div>

          <ul ref={listRef} className="mt-6 space-y-3">
            {checklist.map((item, index) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                    index < checked
                      ? "border-teal bg-teal text-cream"
                      : "border-ink/20 text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
