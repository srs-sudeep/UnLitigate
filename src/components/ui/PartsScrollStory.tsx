import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type Part = {
  id: string;
  status: string;
  heading: string;
  body: string;
  detail: string;
};

function PartIllustration({ active }: { active: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-teal/15 bg-mist/50 p-8">
      <svg viewBox="0 0 280 280" className="mx-auto h-auto w-full max-w-sm" aria-hidden="true">
        <rect x="24" y="210" width="232" height="10" rx="5" fill="#1E5F5C" opacity="0.15" />
        <line
          x1="40"
          y1="140"
          x2="240"
          y2="140"
          stroke="#1F2A2E"
          strokeWidth="1.6"
          opacity="0.45"
          strokeLinecap="round"
        />
        <circle
          cx={active === 0 ? 70 : active === 1 ? 110 : 130}
          cy="140"
          r="9"
          fill="#C9683F"
          className="transition-all duration-500"
        />
        <circle
          cx={active === 0 ? 210 : active === 1 ? 170 : 150}
          cy="140"
          r="9"
          fill="#C9683F"
          className="transition-all duration-500"
        />
        {active === 0 ? (
          <>
            <circle cx="140" cy="72" r="28" fill="#1E5F5C" opacity="0.12" />
            <path
              d="M126 72h28M140 58v28"
              stroke="#1E5F5C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </>
        ) : null}
        {active === 1 ? (
          <>
            <rect x="118" y="48" width="44" height="54" rx="10" fill="#1E5F5C" opacity="0.12" />
            <circle cx="140" cy="68" r="10" fill="#1E5F5C" opacity="0.35" />
          </>
        ) : null}
        {active === 2 ? (
          <>
            <path
              d="M90 70h100M190 70l-14-10M190 70l-14 10"
              stroke="#1E5F5C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
            <circle cx="96" cy="70" r="6" fill="#C9683F" />
          </>
        ) : null}
      </svg>
      <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-teal">
        Part {String(active + 1).padStart(2, "0")}
      </p>
    </div>
  );
}

export function PartsScrollStory({ items }: { items: Part[] }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reduced) return;
    const observers = items.map((_, index) => {
      const el = refs.current[index];
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(index);
        },
        { threshold: 0.55, rootMargin: "-20% 0px -35% 0px" },
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [items, reduced]);

  return (
    <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <PartIllustration active={active} />
          <div className="pointer-events-none absolute top-8 bottom-8 -right-7 w-px bg-ink/10" />
          <svg
            className="pointer-events-none absolute top-8 -right-8 h-[calc(100%-4rem)] w-4"
            viewBox="0 0 16 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              className="parts-thread"
              x1="8"
              y1="0"
              x2="8"
              y2="400"
              stroke="#C9683F"
              strokeWidth="2"
              strokeDasharray="400"
              strokeDashoffset={400 - (active + 1) * (400 / items.length)}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <circle cx="8" cy="12" r="4" fill="#F7F2EA" stroke="#1F2A2E" strokeWidth="1" />
            <circle
              cx="8"
              cy={12 + ((active + 1) / items.length) * 376}
              r="4.5"
              fill="#C9683F"
              className="transition-all duration-500"
            />
            <circle cx="8" cy="388" r="4" fill="#F7F2EA" stroke="#1F2A2E" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="space-y-8 lg:space-y-24">
        {items.map((part, index) => (
          <article
            key={part.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            className={`react-card hover-card group rounded-[2rem] bg-cream p-6 sm:p-8 ${
              active === index ? "border-clay shadow-[0_14px_36px_rgba(31,42,46,0.08)]" : ""
            }`}
          >
            <div className="mb-5 lg:hidden">
              <PartIllustration active={index} />
            </div>
            <p
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                part.status === "Live now"
                  ? "bg-teal text-cream"
                  : part.status === "Pilot starting"
                    ? "bg-clay text-cream"
                    : "border border-ink/15 text-ink/70"
              }`}
            >
              {part.status}
            </p>
            <h3 className="mt-4 font-serif text-3xl text-ink">{part.heading}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{part.body}</p>
            <p
              className={`react-card-detail mt-4 text-sm font-medium text-teal/90 transition-opacity duration-300 max-lg:opacity-100 ${
                active === index ? "opacity-100" : "lg:opacity-0"
              }`}
            >
              {part.detail}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
