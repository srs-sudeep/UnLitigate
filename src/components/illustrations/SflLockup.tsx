type SflLockupProps = {
  label: string;
  href: string;
  onTeal?: boolean;
};

export function SflLockup({ label, href, onTeal = false }: SflLockupProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center gap-2 text-sm transition-transform duration-300 hover:-translate-y-0.5 ${
        onTeal ? "text-cream/90" : "text-ink/70 hover:text-teal"
      }`}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: "#F9C70F" }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </a>
  );
}
