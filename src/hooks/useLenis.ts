import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      setLenis(null);
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    setLenis(lenis);
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      setLenis(null);
      if (window.__lenis === lenis) delete window.__lenis;
      lenis.destroy();
    };
  }, [enabled]);
}
