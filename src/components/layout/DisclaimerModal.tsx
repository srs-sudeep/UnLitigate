import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import site from "../../data/site.json";
import { getLenis } from "../../lib/lenis";
import { Button } from "../ui/Button";

const ACK_KEY = "ul-disclaimer-ack";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(ACK_KEY) === "1") return;
    } catch {
      // show modal if storage unavailable
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const copy = site.disclaimerModal;

  const acknowledge = () => {
    try {
      window.localStorage.setItem(ACK_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/45 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-heading"
    >
      <div className="w-full max-w-lg rounded-[2rem] border border-ink/8 bg-cream p-7 shadow-[0_24px_60px_rgba(31,42,46,0.28)] sm:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
          Important
        </p>
        <h2 id="disclaimer-heading" className="mt-3 font-serif text-3xl text-ink">
          {copy.heading}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{copy.body}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={acknowledge}>{copy.ack}</Button>
          <Link
            to={copy.more.href}
            onClick={acknowledge}
            className="text-sm font-semibold text-teal hover:underline"
          >
            {copy.more.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
