import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type DoorCopy = {
  heading: string;
  body: string;
};

type DoorsProps = {
  court: DoorCopy;
  mediation: DoorCopy;
  caption: string;
  reducedMotion: boolean;
};

function CourtDoorArt() {
  return (
    <svg
      viewBox="0 0 200 220"
      className="h-[120px] w-full sm:h-[180px]"
      aria-hidden="true"
    >
      <path
        d="M28 218 V108 C28 48 72 18 100 18 C128 18 172 48 172 108 V218"
        fill="#E7E0D4"
        stroke="#1F2A2E"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <path
        d="M48 210 V118 C48 68 74 40 100 40 C126 40 152 68 152 118 V210"
        fill="#F3EDE3"
        stroke="#1F2A2E"
        strokeOpacity="0.1"
        strokeWidth="1.4"
      />
      <rect x="62" y="58" width="32" height="52" rx="4" fill="#DDD5C6" />
      <rect x="106" y="58" width="32" height="52" rx="4" fill="#DDD5C6" />
      <rect x="62" y="122" width="32" height="58" rx="4" fill="#DDD5C6" />
      <rect x="106" y="122" width="32" height="58" rx="4" fill="#DDD5C6" />
      <circle cx="148" cy="128" r="5" fill="#C4B8A6" />
      <circle cx="148" cy="128" r="2.2" fill="#E7E0D4" />
    </svg>
  );
}

function MediationDoorArt() {
  return (
    <svg
      viewBox="0 0 200 220"
      className="h-[120px] w-full sm:h-[180px]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="doorLight" cx="28%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#F7F2EA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E5F5C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M28 218 V108 C28 48 72 18 100 18 C128 18 172 48 172 108 V218"
        fill="#174B49"
        stroke="#F7F2EA"
        strokeOpacity="0.18"
        strokeWidth="2"
      />
      <ellipse cx="72" cy="96" rx="48" ry="70" fill="url(#doorLight)" />
      <g className="mediation-leaf">
        <path
          d="M64 210 V118 C64 70 90 42 116 42 C142 42 168 70 168 118 V210"
          fill="#1E5F5C"
          stroke="#F7F2EA"
          strokeOpacity="0.2"
          strokeWidth="1.4"
        />
        <rect x="80" y="60" width="30" height="50" rx="4" fill="#2A6E6A" />
        <rect x="122" y="60" width="30" height="50" rx="4" fill="#2A6E6A" />
        <rect x="80" y="122" width="30" height="56" rx="4" fill="#2A6E6A" />
        <rect x="122" y="122" width="30" height="56" rx="4" fill="#2A6E6A" />
        <circle cx="164" cy="128" r="5" fill="#F7F2EA" />
      </g>
      <g fill="#F7F2EA" opacity="0.92">
        <ellipse cx="58" cy="196" rx="11" ry="7" />
        <circle cx="52" cy="182" r="6" />
        <ellipse cx="86" cy="196" rx="11" ry="7" />
        <circle cx="92" cy="182" r="6" />
      </g>
    </svg>
  );
}

export function Doors({ court, mediation, caption, reducedMotion }: DoorsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mediation-leaf",
        { x: -14 },
        {
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        ".mediation-glow",
        { opacity: 0.2 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <article className="door-card flex flex-col rounded-t-[9rem] rounded-b-3xl border border-ink/10 bg-[#EFE8DC] px-3 pb-8 pt-5 text-center sm:px-5">
          <CourtDoorArt />
          <h3 className="mt-1 font-serif text-xl text-ink sm:text-2xl">
            {court.heading}
          </h3>
          <p className="mt-2 px-1 text-[13px] leading-relaxed text-ink/70 sm:text-sm">{court.body}</p>
        </article>

        <article className="door-card door-mediation relative flex flex-col rounded-t-[9rem] rounded-b-3xl border border-teal/25 bg-teal px-3 pb-8 pt-5 text-center text-cream sm:px-5">
          <div className="mediation-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(247,242,234,0.28),transparent_55%)]" />
          <div className="relative">
            <MediationDoorArt />
          </div>
          <h3 className="relative mt-1 font-serif text-xl sm:text-2xl">
            {mediation.heading}
          </h3>
          <p className="relative mt-2 px-1 text-[13px] leading-relaxed text-cream/85 sm:text-sm">
            {mediation.body}
          </p>
        </article>
      </div>
      <p className="mt-4 text-center text-sm text-ink/55">{caption}</p>
    </div>
  );
}
