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
  status?: string;
};

type IndiaMapProps = {
  heading: string;
  body: string;
  caption: string;
  pins: Pin[];
  reducedMotion: boolean;
};

const LON_MIN = 60;
const LON_MAX = 100;
const LAT_MIN = 2;
const LAT_MAX = 40;
const WIDTH = 260;
const HEIGHT = 250;

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

function buildDots(insideOnly: boolean, step: number, opacityBase = 0.38) {
  const dots: Array<[number, number, number]> = [];
  const rows = Math.ceil(HEIGHT / (step * 0.86));
  const cols = Math.ceil(WIDTH / step);

  for (let row = 0; row < rows; row += 1) {
    const offset = row % 2 === 1 ? step / 2 : 0;
    for (let col = 0; col < cols; col += 1) {
      const x = col * step + offset;
      const y = row * step * 0.86;
      const inside = pointInPoly(x, y, OUTLINE_SVG);
      if (insideOnly && !inside) continue;
      if (!insideOnly && inside) continue;
      if (x < 4 || y < 4 || x > WIDTH - 4 || y > HEIGHT - 4) continue;
      dots.push([x, y, inside ? opacityBase : opacityBase * 0.35]);
    }
  }
  return dots;
}

const INDIA_DOTS = buildDots(true, 3.2, 0.5);
const WORLD_DOTS = buildDots(false, 5.2, 0.14);

export function IndiaMap({
  heading,
  body,
  caption,
  pins,
  reducedMotion,
}: IndiaMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const projectedPins = useMemo(
    () =>
      pins.map((pin) => {
        const [x, y] = project(pin.lon, pin.lat);
        return { ...pin, x, y, labelOnLeft: pin.lon < 80 };
      }),
    [pins],
  );

  const thread = useMemo(() => {
    if (projectedPins.length < 2) return null;
    const a = projectedPins[0];
    const b = projectedPins[1];
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }, [projectedPins]);

  const active = projectedPins.find((pin) => pin.id === activeId) ?? null;

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
      gsap.fromTo(
        ".map-city-thread",
        { strokeDashoffset: 180 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 65%",
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} id="map" className="scroll-mt-28">
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{heading}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{body}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-teal/15 bg-mist/40 px-4 py-8 sm:px-10">
        <svg
          viewBox="-8 -6 276 262"
          className="mx-auto h-auto w-full max-w-xl"
          role="img"
          aria-label="Map of India with pins at Pune and Bhubaneswar"
        >
          <defs>
            <clipPath id="india-land">
              <path d={OUTLINE_PATH} />
            </clipPath>
          </defs>
          {WORLD_DOTS.map(([x, y, opacity], i) => (
            <circle
              key={`w-${x}-${y}-${i}`}
              cx={x}
              cy={y}
              r="1.05"
              fill="#1E5F5C"
              opacity={opacity}
            />
          ))}
          <path d={OUTLINE_PATH} fill="#1E5F5C" fillOpacity="0.1" />
          <g clipPath="url(#india-land)">
            {INDIA_DOTS.map(([x, y, opacity], i) => (
              <circle
                key={`i-${x}-${y}-${i}`}
                className="map-dot"
                cx={x}
                cy={y}
                r="1.35"
                fill="#1E5F5C"
                opacity={opacity}
              />
            ))}
          </g>
          {thread ? (
            <line
              className="map-city-thread"
              x1={thread.x1}
              y1={thread.y1}
              x2={thread.x2}
              y2={thread.y2}
              stroke="#C9683F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="180"
              strokeDashoffset={reducedMotion ? 0 : 180}
              opacity="0.85"
            />
          ) : null}
          {projectedPins.map((pin) => (
            <g
              key={pin.id}
              className="map-pin cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(pin.id === activeId ? null : pin.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(pin.id === activeId ? null : pin.id);
                }
              }}
            >
              <circle
                className="pin-halo"
                cx={pin.x}
                cy={pin.y}
                r="11"
                fill="#C9683F"
                opacity="0"
              />
              <circle className="pin-core" cx={pin.x} cy={pin.y} r="3.8" fill="#C9683F" />
              <circle
                className="pin-ring"
                cx={pin.x}
                cy={pin.y}
                r="6.4"
                fill="none"
                stroke="#C9683F"
                strokeWidth="0.85"
                opacity="0.75"
              />
              <text
                className="pin-label"
                x={pin.labelOnLeft ? pin.x - 9 : pin.x + 9}
                y={pin.y + 1.6}
                textAnchor={pin.labelOnLeft ? "end" : "start"}
                fontSize="9"
                fill="#1F2A2E"
                fontFamily="Source Sans 3, sans-serif"
              >
                {pin.label}
              </text>
            </g>
          ))}
        </svg>
        {active ? (
          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-ink/8 bg-cream p-5 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              {active.status ?? "Pilot starting"}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{active.label}</h3>
            {active.lead ? (
              <p className="mt-2 text-sm text-ink/70">Led by {active.lead}</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-5 text-center text-sm text-ink/55">Tap a pin to see who runs that city.</p>
        )}
      </div>
      <p className="mt-4 text-sm text-ink/55">{caption}</p>
    </div>
  );
}
