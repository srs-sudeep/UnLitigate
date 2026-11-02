import { Link } from "react-router-dom";

type Item = { label: string; href: string };

export function TrustRibbon({ items }: { items: Item[] }) {
  return (
    <ul className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-ink/10 pt-8 text-sm text-ink/70 sm:justify-center">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-4">
          {index > 0 ? (
            <span className="hidden h-1.5 w-1.5 rounded-full bg-clay sm:block" aria-hidden="true" />
          ) : null}
          <Link to={item.href} className="transition-colors hover:text-teal">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
