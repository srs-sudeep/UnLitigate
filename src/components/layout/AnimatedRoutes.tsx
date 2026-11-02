import { useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, type Location } from "react-router-dom";
import gsap from "gsap";
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

export function AnimatedRoutes() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState<Location>(location);
  const [transitioning, setTransitioning] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const displayedRef = useRef(displayed);
  const firstRef = useRef(true);
  displayedRef.current = displayed;

  useLayoutEffect(() => {
    const current = displayedRef.current;
    if (location.pathname === current.pathname) {
      if (location.key !== current.key) setDisplayed(location);
      return;
    }

    if (reduced || firstRef.current) {
      firstRef.current = false;
      setDisplayed(location);
      return;
    }

    const panel = panelRef.current;
    const mark = markRef.current;
    if (!panel) {
      setDisplayed(location);
      return;
    }

    setTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => setTransitioning(false),
    });

    tl.set(panel, { scaleX: 0, transformOrigin: "left center", pointerEvents: "auto" })
      .set(mark, { opacity: 0 })
      .to(panel, { scaleX: 1, duration: 0.32, ease: "power3.inOut" })
      .to(mark, { opacity: 1, duration: 0.16 }, "<0.12")
      .add(() => setDisplayed(location))
      .set(panel, { transformOrigin: "right center" })
      .to(mark, { opacity: 0, duration: 0.12 })
      .to(panel, { scaleX: 0, duration: 0.36, ease: "power3.inOut" }, "<")
      .set(panel, { pointerEvents: "none" });

    return () => {
      tl.kill();
    };
  }, [location, reduced]);

  return (
    <TransitionProvider value={{ transitioning }}>
      <div
        ref={panelRef}
        className="pointer-events-none fixed inset-0 z-[80] bg-teal"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        aria-hidden="true"
      />
      <div
        ref={markRef}
        className="pointer-events-none fixed inset-0 z-[81] flex items-center justify-center"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <img src={site.logo.icon.src} alt="" className="h-14 w-14" />
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
