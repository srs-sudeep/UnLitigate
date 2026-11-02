type SituationIconProps = {
  id: string;
};

export function SituationIcon({ id }: SituationIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-teal transition-all duration-300 group-hover:scale-110 group-hover:bg-teal group-hover:text-cream">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        {id === "thinking-of-filing" ? (
          <g {...common}>
            <path d="M5 3.5h7l3 3V16.5H5z" />
            <path d="M12 3.5V7h3.5" />
            <path d="M7.5 10.5h5M7.5 13.5h3.5" />
          </g>
        ) : null}
        {id === "notice-received" ? (
          <g {...common}>
            <rect x="3.5" y="5" width="13" height="10" rx="1.5" />
            <path d="M4 6.5 10 11l6-4.5" />
          </g>
        ) : null}
        {id === "already-in-court" ? (
          <g {...common}>
            <path d="M3.5 16.5h13" />
            <path d="M5 16.5V8l5-3.5 5 3.5v8.5" />
            <path d="M10 8.5v8" />
          </g>
        ) : null}
        {id === "stuck-for-years" ? (
          <g {...common}>
            <circle cx="10" cy="10" r="6.5" />
            <path d="M10 6.5V10l2.5 2" />
          </g>
        ) : null}
      </svg>
    </span>
  );
}
