type Item = {
  status: string;
  heading: string;
  body: string;
};

const nodeClass: Record<string, string> = {
  "Live now": "bg-teal",
  "Pilot starting": "bg-clay",
  "Being built": "border-[1.5px] border-ink/35 bg-cream",
};

const kickerClass: Record<string, string> = {
  "Live now": "text-teal",
  "Pilot starting": "text-clay",
  "Being built": "text-ink/50",
};

export function StatusTrack({ items }: { items: Item[] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      <span
        className="pointer-events-none absolute top-[7px] right-[16.6%] left-[16.6%] hidden h-px bg-ink/15 md:block"
        aria-hidden="true"
      />
      {items.map((item, index) => (
        <li
          key={item.heading}
          className="relative border-l border-ink/15 pl-6 md:border-l-0 md:pl-0 md:text-center"
        >
          <span
            className={`absolute top-0.5 left-0 inline-block h-3.5 w-3.5 -translate-x-1/2 rounded-full md:static md:mx-auto md:mb-5 md:block md:translate-x-0 ${
              nodeClass[item.status] ?? "bg-mist"
            }`}
            aria-hidden="true"
          />
          <p className="font-serif text-sm text-ink/30 md:text-base">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p
            className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
              kickerClass[item.status] ?? "text-ink/50"
            }`}
          >
            {item.status}
          </p>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-ink">
            {item.heading}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
