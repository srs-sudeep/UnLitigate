type StatusCardProps = {
  status: string;
  heading: string;
  body: string;
};

const statusStyles: Record<string, string> = {
  "Live now": "bg-teal text-cream",
  "Pilot starting": "bg-clay text-cream",
  "Being built": "border border-ink/20 text-ink/70 bg-cream",
};

export function StatusCard({ status, heading, body }: StatusCardProps) {
  const pill = statusStyles[status] ?? "bg-mist text-ink";

  return (
    <article className="rounded-3xl border border-ink/8 bg-white/50 p-6 sm:p-7">
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${pill}`}
      >
        {status}
      </span>
      <h3 className="mt-4 font-serif text-2xl text-ink">{heading}</h3>
      <p className="mt-3 leading-relaxed text-ink/75">{body}</p>
    </article>
  );
}
