import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useLenis } from "../../hooks/useLenis";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { scrollToTarget } from "../../lib/lenis";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { StickyCta } from "./StickyCta";

export function Layout() {
  const reduced = usePrefersReducedMotion();
  const { pathname, hash } = useLocation();
  useLenis(!reduced);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          scrollToTarget(el, { offset: -96, immediate: reduced });
          return;
        }
      }
      scrollToTarget(0, { immediate: true });
    }, 160);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, reduced]);

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <Nav />
      <motion.main
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pb-20 md:pb-0"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <StickyCta />
    </div>
  );
}
