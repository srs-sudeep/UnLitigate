type Row = { label: string; court: string; mediation: string };

type PathsTableProps = {
  heading?: string;
  courtLabel: string;
  mediationLabel: string;
  rows: Row[];
  footnote?: string;
};

export function PathsTable({
  heading,
  courtLabel,
  mediationLabel,
  rows,
  footnote,
}: PathsTableProps) {
  return (
    <div>
      {heading ? (
        <h2 className="font-serif text-3xl sm:text-4xl text-ink">{heading}</h2>
      ) : null}
      <div className="mt-8 hidden gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink/50 md:grid md:grid-cols-[8rem_1fr_1fr]">
        <span />
        <span>{courtLabel}</span>
        <span className="text-teal">{mediationLabel}</span>
      </div>
      <div className="mt-3 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-3 md:grid-cols-[8rem_1fr_1fr]"
          >
            <div className="flex items-center rounded-2xl border border-ink/10 bg-cream px-4 py-4 text-sm font-semibold tracking-wide text-ink">
              {row.label}
            </div>
            <div className="rounded-2xl border border-ink/8 bg-white/50 px-5 py-4 text-[15px] leading-relaxed text-ink/80">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-ink/40 md:hidden">
                {courtLabel}
              </span>
              {row.court}
            </div>
            <div className="rounded-2xl border border-teal/20 bg-mist/70 px-5 py-4 text-[15px] leading-relaxed text-teal">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-teal/70 md:hidden">
                {mediationLabel}
              </span>
              {row.mediation}
            </div>
          </div>
        ))}
      </div>
      {footnote ? (
        <p className="mt-6 text-sm leading-relaxed text-ink/60">{footnote}</p>
      ) : null}
    </div>
  );
}
