type SectionHeaderProps = {
  kicker?: string;
  heading: string;
  subheading?: string;
  invert?: boolean;
};

export function SectionHeader({
  kicker,
  heading,
  subheading,
  invert = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-2xl">
      {kicker ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            invert ? "text-cream/70" : "text-teal"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={`mt-2 font-serif text-3xl leading-tight sm:text-4xl ${
          invert ? "text-cream" : "text-ink"
        }`}
      >
        {heading}
      </h2>
      {subheading ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-cream/80" : "text-ink/70"
          }`}
        >
          {subheading}
        </p>
      ) : null}
    </div>
  );
}
