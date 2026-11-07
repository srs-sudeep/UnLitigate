import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INDIA_OUTLINE } from "./indiaOutline";

gsap.registerPlugin(ScrollTrigger);

type Pin = {
  id: string;
  label: string;
  lat: number;
  lon: number;
  lead?: string;
  role?: string;
  status?: string;
};

type IndiaMapProps = {
  eyebrow?: string;
  heading: string;
  body: string;
  caption: string;
  hint?: string;
  pins: Pin[];
  reducedMotion: boolean;
};

const LON_MIN = 67.5;
const LON_MAX = 97.7;
const LAT_MIN = 6.7;
const LAT_MAX = 37.4;
const WIDTH = 220;
const HEIGHT = 224;

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * WIDTH;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * HEIGHT;
  return [x, y];
}

function pointInPoly(x: number, y: number, poly: Array<[number, number]>) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

const OUTLINE_SVG = INDIA_OUTLINE.map(([lon, lat]) => project(lon, lat));
const OUTLINE_PATH =
  OUTLINE_SVG.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(
    " ",
  ) + " Z";

function buildDots() {
  const dots: Array<[number, number]> = [];
  const step = 3.2;
  const rows = Math.ceil(HEIGHT / (step * 0.86));
  const cols = Math.ceil(WIDTH / step);

  for (let row = 0; row < rows; row += 1) {
    const offset = row % 2 === 1 ? step / 2 : 0;
    for (let col = 0; col < cols; col += 1) {
      const x = col * step + offset;
      const y = row * step * 0.86;
      if (pointInPoly(x, y, OUTLINE_SVG)) dots.push([x, y]);
    }
  }
  return dots;
}

const DOTS = buildDots();

/** Soft illustrative marks — not real cases. */
const SOFT_MARKS: Array<[number, number]> = [
  [77.2, 28.6],
  [72.8, 19.1],
  [88.4, 22.6],
  [80.3, 13.1],
  [91.7, 26.1],
  [75.8, 26.9],
  [78.5, 17.4],
  [85.1, 25.6],
  [74.9, 15.3],
  [82.9, 21.2],
  [76.6, 30.7],
  [70.8, 22.3],
  [79.1, 10.8],
  [86.9, 23.8],
  [73.2, 25.4],
].map(([lon, lat]) => project(lon, lat));

export function IndiaMap({
  eyebrow,
  heading,
  body,
  caption,
  hint,
  pins,
  reducedMotion,
}: IndiaMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(pins[0]?.id ?? null);
  const projectedPins = useMemo(
    () =>
      pins.map((pin) => {
        const [x, y] = project(pin.lon, pin.lat);
        return { ...pin, x, y };
      }),
    [pins],
  );
  const active = projectedPins.find((pin) => pin.id === activeId) ?? projectedPins[0] ?? null;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Clear leftover transforms (deep-link / remount safety)
    gsap.set(root.querySelectorAll(".map-pin, .map-soft"), {
      clearProps: "transform,opacity,scale",
    });

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      // Scale the whole pin group (local origin is pin center via SVG translate)
      gsap.fromTo(
        ".map-pin",
        { scale: 0, opacity: 0, transformOrigin: "0px 0px" },
        {
          scale: 1,
          opacity: 1,
          immediateRender: false,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".map-soft",
        { opacity: 0 },
        {
          opacity: 0.35,
          immediateRender: false,
          stagger: 0.02,
          duration: 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, root);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} id="map" className="scroll-mt-28 text-cream">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-clay">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{heading}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/75">{body}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        <div className="rounded-[2rem] border border-cream/10 bg-teal/40 px-3 py-6 sm:px-6">
          <svg
            viewBox="-10 -8 250 242"
            className="mx-auto h-auto w-full max-w-xl"
            role="img"
            aria-label="Map of India with pilot pins at Bhubaneswar and Pune"
          >
            <defs>
              <clipPath id="india-land">
                <path d={OUTLINE_PATH} />
              </clipPath>
            </defs>
            <path d={OUTLINE_PATH} fill="#F7F2EA" fillOpacity="0.06" />
            <g clipPath="url(#india-land)" pointerEvents="none">
              {DOTS.map(([x, y], i) => (
                <circle
                  key={`${x}-${y}-${i}`}
                  cx={x}
                  cy={y}
                  r="1.35"
                  fill="#D5E4DF"
                  opacity="0.55"
                />
              ))}
            </g>
            {SOFT_MARKS.map(([x, y], i) => (
              <circle
                key={`soft-${i}`}
                className="map-soft"
                cx={x}
                cy={y}
                r="1.6"
                fill="#D5E4DF"
                opacity="0.35"
                pointerEvents="none"
              />
            ))}
            {projectedPins.map((pin) => {
              const selected = pin.id === active?.id;
              return (
                // Outer translate is sacred — GSAP must never touch it
                <g key={pin.id} transform={`translate(${pin.x} ${pin.y})`}>
                  <g
                    className="map-pin cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`${pin.label}${pin.status ? `, ${pin.status}` : ""}`}
                    aria-pressed={selected}
                    onClick={() => setActiveId(pin.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveId(pin.id);
                      }
                    }}
                  >
                    {/* Circles at local 0,0 so CSS/GSAP scale stays concentric */}
                    <circle r="16" fill="transparent" />
                    <circle
                      className="pin-halo"
                      r="11"
                      fill="#C9683F"
                      opacity={selected ? 0.3 : 0.12}
                      pointerEvents="none"
                    />
                    {!selected ? (
                      <circle
                        className="pin-pulse"
                        r="7"
                        fill="none"
                        stroke="#C9683F"
                        strokeWidth="1.2"
                        pointerEvents="none"
                      />
                    ) : null}
                    <circle
                      className="pin-ring"
                      r={selected ? 8.5 : 7}
                      fill="none"
                      stroke={selected ? "#F7F2EA" : "#C9683F"}
                      strokeWidth={selected ? 1.8 : 1.25}
                      pointerEvents="none"
                    />
                    <circle
                      className="pin-core"
                      r="4.5"
                      fill="#C9683F"
                      pointerEvents="none"
                    />
                  </g>
                </g>
              );
            })}
          </svg>
          <p className="mt-4 px-2 text-sm text-cream/55">{caption}</p>
        </div>

        <div>
          <div className="space-y-3">
            {projectedPins.map((pin) => {
              const selected = pin.id === active?.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActiveId(pin.id)}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
                    selected
                      ? "border-clay bg-cream/10 shadow-[0_0_0_1px_rgba(201,104,63,0.35)]"
                      : "border-cream/15 bg-cream/5 hover:border-cream/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-3 w-3 rounded-full bg-clay" />
                    <div>
                      <h3 className="font-serif text-2xl text-cream">{pin.label}</h3>
                      <p className="mt-1 text-sm text-cream/70">
                        Run by {pin.lead}
                        {pin.role ? `, ${pin.role}` : ""}
                      </p>
                      <span
                        className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          selected ? "bg-clay text-cream" : "bg-cream/10 text-cream/70"
                        }`}
                      >
                        {pin.status ?? "Pilot starting soon"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {hint ? <p className="mt-4 text-sm text-cream/55">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}
