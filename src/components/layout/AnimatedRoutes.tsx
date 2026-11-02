import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, type Location } from "react-router-dom";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import site from "../../data/site.json";
import { About } from "../../pages/About";
import { Contact } from "../../pages/Contact";
import { Home } from "../../pages/Home";
import { Mediation } from "../../pages/Mediation";
import { NotFound } from "../../pages/NotFound";
import { ServerError } from "../../pages/ServerError";
import { WhatWeDo } from "../../pages/WhatWeDo";
import { Layout } from "./Layout";
import { TransitionProvider } from "./TransitionContext";

function pageLabel(pathname: string) {
  if (pathname === "/") return "Home";
  const nav = site.nav.links.find((link) => link.href === pathname);
  if (nav) return nav.label;
  if (pathname === "/get-in-touch") return site.nav.cta.label;
  if (pathname === "/500") return "Something snagged";
  return site.name;
}

export function AnimatedRoutes() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState<Location>(location);
  const [transitioning, setTransitioning] = useState(false);
  const [label, setLabel] = useState(pageLabel(location.pathname));
  const [phase, setPhase] = useState<"off" | "closed" | "open">("off");
  const displayedRef = useRef(displayed);
  const firstRef = useRef(true);
  displayedRef.current = displayed;

  useEffect(() => {
    const current = displayedRef.current;
    if (location.pathname === current.pathname) {
      if (location.key !== current.key) setDisplayed(location);
      return;
    }

    if (reduced || firstRef.current) {
      firstRef.current = false;
      setDisplayed(location);
      setLabel(pageLabel(location.pathname));
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    setLabel(pageLabel(location.pathname));
    setTransitioning(true);
    setPhase("open");

    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setPhase("closed");
      }, 40),
    );

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setDisplayed(location);
        setPhase("open");
      }, 1450),
    );

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setPhase("off");
        setTransitioning(false);
      }, 2150),
    );

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [location, reduced]);

  const visible = phase !== "off";
  const closed = phase === "closed";

  return (
    <TransitionProvider value={{ transitioning }}>
      <div
        className={`page-doors fixed inset-0 z-[80] flex overflow-hidden ${
          visible ? "is-visible" : ""
        } ${closed ? "is-closed" : ""}`}
        aria-hidden="true"
      >
        <div className="door-left h-full w-1/2 bg-[#EFE8DC]" />
        <div className="door-right h-full w-1/2 bg-teal" />
        <div className="door-mark absolute inset-0 flex items-center justify-center">
          <div className="rounded-[2rem] bg-cream px-10 py-8 text-center shadow-[0_18px_50px_rgba(31,42,46,0.18)]">
            <img src={site.logo.icon.src} alt="" className="mx-auto h-12 w-12" />
            <p className="mt-3 font-serif text-2xl text-ink">{site.name}</p>
            <svg viewBox="0 0 140 16" className="mx-auto mt-3 h-4 w-28">
              <line
                className="door-thread"
                x1="10"
                y1="8"
                x2="130"
                y2="8"
                stroke="#1F2A2E"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.55"
              />
              <circle cx="10" cy="8" r="3.2" fill="#F7F2EA" stroke="#1F2A2E" strokeWidth="1" />
              <circle cx="52" cy="8" r="2.8" fill="#C9683F" />
              <circle cx="88" cy="8" r="2.8" fill="#C9683F" />
              <circle cx="130" cy="8" r="3.2" fill="#F7F2EA" stroke="#1F2A2E" strokeWidth="1" />
            </svg>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
              {label}
            </p>
          </div>
        </div>
      </div>
      <Routes location={displayed}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mediation-explained" element={<Mediation />} />
          <Route path="what-we-do" element={<WhatWeDo />} />
          <Route path="about" element={<About />} />
          <Route path="get-in-touch" element={<Contact />} />
          <Route path="500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TransitionProvider>
  );
}
