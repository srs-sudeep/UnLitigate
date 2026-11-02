import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

function dismissPreloader() {
  const el = document.getElementById("preloader");
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minMs = reduced ? 0 : 900;
  const started = performance.now();

  const hide = () => {
    const wait = Math.max(0, minMs - (performance.now() - started));
    window.setTimeout(() => {
      el.classList.add("is-done");
      window.setTimeout(() => el.remove(), 600);
    }, wait);
  };

  const fonts = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fonts, new Promise((resolve) => window.setTimeout(resolve, 1600))]).then(
    hide,
  );
}

dismissPreloader();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
