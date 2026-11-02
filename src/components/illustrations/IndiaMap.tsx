import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INDIA_OUTLINE } from "./indiaOutline";

gsap.registerPlugin(ScrollTrigger);

type Pin = {
  id: string;
  label: string;
  lat: number;
  lon: number;
};

type IndiaMapProps = {
  heading: string;
  body: string;
  caption: string;
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
  const step = 3.35;
  const rows = Math.ceil(HEIGHT / (step * 0.86));
  const cols = Math.ceil(WIDTH / step);

  for (let row = 0; row < rows; row += 1) {
    const offset = row % 2 === 1 ? step / 2 : 0;
    for (let col = 0; col < cols; col += 1) {
      const x = col * step + offset;
      const y = row * step * 0.86;
      if (pointInPoly(x, y, OUTLINE_SVG)) {
        dots.push([x, y]);
      }
    }
  }
  return dots;
}

const DOTS = buildDots();

export function IndiaMap({
  heading,
  body,
  caption,
  pins,
  reducedMotion,
}: IndiaMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const projectedPins = useMemo(
    () =>
      pins.map((pin) => {
        const [x, y] = project(pin.lon, pin.lat);
        return { ...pin, x, y, labelOnLeft: pin.lon < 80 };
      }),
    [pins],
  );

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
    <div ref={rootRef} id="map" className="scroll-mt-28">
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{heading}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/75">{body}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-teal/15 bg-mist/40 px-4 py-8 sm:px-10">
        <svg
          viewBox="-10 -8 250 242"
          className="mx-auto h-auto w-full max-w-xl"
          role="img"
          aria-label="Map of India with pins at Pune and Bhubaneswar"
        >
          <defs>
            <clipPath id="india-land">
              <path d={OUTLINE_PATH} />
            </clipPath>
          </defs>
          <path d={OUTLINE_PATH} fill="#1E5F5C" fillOpacity="0.07" />
          <g clipPath="url(#india-land)">
            {DOTS.map(([x, y], i) => (
              <circle
                key={`${x}-${y}-${i}`}
                className="map-dot"
                cx={x}
                cy={y}
                r="1.28"
                fill="#1E5F5C"
                opacity="0.38"
              />
            ))}
          </g>
          {projectedPins.map((pin) => (
            <g key={pin.id} className="map-pin">
              <circle
                className="pin-halo"
                cx={pin.x}
                cy={pin.y}
                r="11"
                fill="#C9683F"
                opacity="0"
              />
              <circle className="pin-core" cx={pin.x} cy={pin.y} r="3.6" fill="#C9683F" />
              <circle
                className="pin-ring"
                cx={pin.x}
                cy={pin.y}
                r="6.2"
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
      </div>
      <p className="mt-4 text-sm text-ink/55">{caption}</p>
    </div>
  );
}
