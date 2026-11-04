import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLenis } from "../../hooks/useLenis";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { scrollToTarget } from "../../lib/lenis";
import { DisclaimerModal } from "./DisclaimerModal";
import { ErrorBoundary } from "./ErrorBoundary";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { StickyCta } from "./StickyCta";
import { usePageTransition } from "./TransitionContext";

export function Layout() {
  const reduced = usePrefersReducedMotion();
  const { pathname, hash } = useLocation();
  const { transitioning } = usePageTransition();
  useLenis(!reduced);

  useEffect(() => {
    if (transitioning) return;
    const timer = window.setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          scrollToTarget(el, { offset: -96, immediate: reduced });
          return;
        }
      }
      scrollToTarget(0, { immediate: true });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, reduced, transitioning]);

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <Nav />
      <main className="pb-28 md:pb-0">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <StickyCta />
      <DisclaimerModal />
    </div>
  );
}
