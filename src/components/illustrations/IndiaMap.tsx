import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Pin = { id: string; label: string; x: number; y: number };

type IndiaMapProps = {
  heading: string;
  body: string;
  caption: string;
  pins: Pin[];
  reducedMotion: boolean;
};

const DOTS: Array<[number, number]> = [
  [48, 8], [52, 10], [56, 12], [50, 14], [54, 16], [58, 18],
  [46, 18], [44, 22], [50, 22], [56, 22], [60, 24], [42, 26],
  [48, 28], [54, 28], [62, 28], [40, 32], [46, 32], [52, 32],
  [58, 32], [64, 34], [38, 38], [44, 38], [50, 38], [56, 38],
  [62, 40], [36, 44], [42, 44], [48, 44], [54, 44], [60, 46],
  [34, 50], [40, 50], [46, 50], [52, 50], [58, 52], [64, 52],
  [38, 56], [44, 56], [50, 56], [56, 56], [62, 58], [42, 62],
  [48, 62], [54, 62], [46, 66], [52, 66], [50, 70], [48, 74],
  [46, 78], [44, 82], [70, 48], [72, 52], [68, 56], [32, 42],
  [30, 46], [28, 50],
];

export function IndiaMap({
  heading,
  body,
  caption,
  pins,
  reducedMotion,
}: IndiaMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".map-pin", {
        scale: 0,
        transformOrigin: "center",
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} id="map">
      <h2 className="font-serif text-3xl sm:text-4xl text-ink">{heading}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{body}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-teal/15 bg-mist/40 px-4 py-8 sm:px-10">
        <svg viewBox="0 0 100 90" className="mx-auto h-auto w-full max-w-lg">
          {DOTS.map(([x, y], i) => (
            <circle
              key={`${x}-${y}-${i}`}
              cx={x}
              cy={y}
              r="1.15"
              fill="#1E5F5C"
              opacity="0.28"
            />
          ))}
          {pins.map((pin) => (
            <g key={pin.id} className="map-pin">
              <circle cx={pin.x} cy={pin.y} r="3.2" fill="#C9683F" />
              <circle
                cx={pin.x}
                cy={pin.y}
                r="5.4"
                fill="none"
                stroke="#C9683F"
                strokeWidth="0.7"
                opacity="0.7"
              />
              <text
                x={pin.x + 6.5}
                y={pin.y + 1.4}
                fontSize="4.2"
                fill="#1F2A2E"
                fontFamily="Source Sans 3, sans-serif"
              >
                {pin.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="mt-4 text-sm text-ink/55">{caption}</p>
    </div>
  );
}
