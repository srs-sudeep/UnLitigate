import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "cream" | "mist" | "teal" | "ink";
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  cream: "bg-cream text-ink",
  mist: "bg-mist/40 text-ink",
  teal: "bg-teal text-cream",
  ink: "bg-ink text-cream",
};

export function Section({
  id,
  className = "",
  children,
  tone = "cream",
}: SectionProps) {
  return (
    <section id={id} className={`px-5 sm:px-8 ${tones[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
