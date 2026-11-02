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

      <div className="mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-cream">
        <div className="grid grid-cols-2 border-b border-ink/10 text-xs font-semibold uppercase tracking-[0.16em] sm:grid-cols-[7.5rem_1fr_1fr] sm:text-sm">
          <div className="hidden sm:block" />
          <div className="border-r border-ink/10 px-4 py-3 text-ink/50">{courtLabel}</div>
          <div className="bg-mist/60 px-4 py-3 text-teal">{mediationLabel}</div>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-1 transition-colors duration-200 hover:bg-mist/30 sm:grid-cols-[7.5rem_1fr_1fr] ${
              index !== rows.length - 1 ? "border-b border-ink/10" : ""
            }`}
          >
            <div className="bg-cream px-4 py-3 text-sm font-semibold text-ink sm:flex sm:items-center sm:border-r sm:border-ink/10">
              {row.label}
            </div>
            <div className="grid grid-cols-2 sm:contents">
              <div className="border-t border-ink/8 px-4 py-4 text-[15px] leading-relaxed text-ink/75 sm:border-t-0 sm:border-r sm:border-ink/10">
                {row.court}
              </div>
              <div className="border-t border-ink/8 bg-mist/50 px-4 py-4 text-[15px] leading-relaxed text-teal sm:border-t-0">
                {row.mediation}
              </div>
            </div>
          </div>
        ))}
      </div>

      {footnote ? (
        <p className="mt-5 text-sm leading-relaxed text-ink/60">{footnote}</p>
      ) : null}
    </div>
  );
}
