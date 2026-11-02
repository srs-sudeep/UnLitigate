import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BenchThreadProps = {
  heading: string;
  body: string;
  fallbackImage: { src: string; alt: string };
  reducedMotion: boolean;
};

export function BenchThread({
  heading,
  body,
  fallbackImage,
  reducedMotion,
}: BenchThreadProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const leftRef = useRef<SVGCircleElement>(null);
  const rightRef = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root || !lineRef.current || !leftRef.current || !rightRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "center 40%",
          scrub: 0.8,
        },
      });
      tl.to(leftRef.current, { attr: { cx: 150 }, ease: "none" }, 0)
        .to(rightRef.current, { attr: { cx: 250 }, ease: "none" }, 0)
        .to(lineRef.current, { attr: { x1: 150, x2: 250 }, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="py-4">
      <div className="mx-auto hidden max-w-md md:block" aria-hidden="true">
        <svg viewBox="0 0 400 56" className="h-14 w-full">
          <line
            ref={lineRef}
            x1="40"
            y1="28"
            x2="360"
            y2="28"
            stroke="#F7F2EA"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="40" cy="28" r="9" fill="#F7F2EA" />
          <circle ref={leftRef} cx="90" cy="28" r="8" fill="#C9683F" />
          <circle cx="200" cy="28" r="9" fill="#F7F2EA" />
          <circle ref={rightRef} cx="310" cy="28" r="8" fill="#C9683F" />
          <circle cx="360" cy="28" r="9" fill="#F7F2EA" />
        </svg>
      </div>
      <div className="mx-auto mb-8 max-w-lg overflow-hidden rounded-2xl md:hidden">
        <img
          src={fallbackImage.src}
          alt={fallbackImage.alt}
          className="h-48 w-full object-cover"
        />
      </div>
      <h2 className="text-center font-serif text-3xl text-cream sm:text-5xl">
        {heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-cream/80">
        {body}
      </p>
    </div>
  );
}
