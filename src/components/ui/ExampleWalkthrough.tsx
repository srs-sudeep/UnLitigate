import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "./Reveal";

type Step = {
  title: string;
  body: string;
};

export function ExampleWalkthrough({
  heading,
  label,
  steps,
}: {
  heading: string;
  label: string;
  steps: Step[];
}) {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const reduced = usePrefersReducedMotion();

  return (
    <Reveal>
      <div className="rounded-[2rem] border border-ink/8 bg-cream p-6 sm:p-8">
        <p className="inline-flex rounded-full border border-clay/30 bg-[#f3e6dc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-rust">
          {label}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-ink">{heading}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="rounded-3xl border border-teal/15 bg-mist/40 p-6" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <svg viewBox="0 0 240 160" className="mx-auto h-auto w-full max-w-xs">
                  <rect x="30" y="40" width="70" height="90" rx="8" fill="#EFE8DC" stroke="#1E5F5C" strokeWidth="1.4" />
                  <rect x="140" y="40" width="70" height="90" rx="8" fill="#D5E4DF" stroke="#1E5F5C" strokeWidth="1.4" />
                  <line
                    x1="100"
                    y1="50"
                    x2="140"
                    y2="50"
                    stroke="#1F2A2E"
                    strokeWidth="2"
                    opacity={0.25 + index * 0.12}
                  />
                  <circle cx="65" cy="118" r="7" fill="#C9683F" opacity={index === 0 ? 0.5 : 1} />
                  <circle cx="175" cy="118" r="7" fill="#C9683F" opacity={index <= 1 ? 0.5 : 1} />
                  <text x="120" y="28" textAnchor="middle" fontSize="11" fill="#1E5F5C" fontFamily="Source Sans 3, sans-serif">
                    Shared wall
                  </text>
                  <text x="65" y="150" textAnchor="middle" fontSize="10" fill="#1F2A2E" fontFamily="Source Sans 3, sans-serif">
                    Asha
                  </text>
                  <text x="175" y="150" textAnchor="middle" fontSize="10" fill="#1F2A2E" fontFamily="Source Sans 3, sans-serif">
                    Ravi
                  </text>
                </svg>
              </motion.div>
            </AnimatePresence>
            <p className="mt-3 text-center text-xs text-ink/55">
              Step {index + 1} of {steps.length}
            </p>
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
              >
                <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{step.body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
                className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() =>
                  setIndex((value) => (value >= steps.length - 1 ? 0 : value + 1))
                }
                className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-cream"
              >
                {index >= steps.length - 1 ? "Start again" : "Next step →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
