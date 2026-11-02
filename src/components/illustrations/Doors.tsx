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

export function Doors({ court, mediation, caption, reducedMotion }: DoorsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { rotateY: -18, transformOrigin: "left center" },
        {
          rotateY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        lightRef.current,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 35%",
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
        <article className="relative flex min-h-[300px] flex-col justify-end rounded-t-[999px] rounded-b-3xl border border-ink/10 bg-[#eee8df] px-4 pb-10 pt-20 text-center sm:min-h-[360px] sm:px-7">
          <h3 className="font-serif text-2xl text-ink">{court.heading}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{court.body}</p>
        </article>

        <article
          className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-t-[999px] rounded-b-3xl border border-teal/30 bg-teal px-4 pb-10 pt-20 text-center text-cream sm:min-h-[360px] sm:px-7"
          style={{ perspective: "900px" }}
        >
          <div
            ref={lightRef}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(247,242,234,0.28),transparent_58%)]"
          />
          <div ref={panelRef} className="relative">
            <h3 className="font-serif text-2xl">{mediation.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/85">
              {mediation.body}
            </p>
          </div>
        </article>
      </div>
      <p className="mt-4 text-center text-sm text-ink/55">{caption}</p>
    </div>
  );
}
