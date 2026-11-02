type PageHeroProps = {
  eyebrow: string;
  heading: string;
  body: string;
};

export function PageHero({ eyebrow, heading, body }: PageHeroProps) {
  return (
    <header className="max-w-3xl pt-10 pb-12 sm:pt-16 sm:pb-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl md:text-[3.4rem]">
        {heading}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">{body}</p>
    </header>
  );
}
