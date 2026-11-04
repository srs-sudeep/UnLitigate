/// <reference types="vite/client" />

import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    dataLayer?: Record<string, unknown>[];
  }
}

export {};

