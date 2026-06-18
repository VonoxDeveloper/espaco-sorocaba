/**
 * Module-level Lenis singleton so any component can call scrollTo()
 * without prop-drilling or context.
 */
import type Lenis from "lenis";

let _instance: Lenis | null = null;

export function setLenis(l: Lenis) {
  _instance = l;
}

export function getLenis(): Lenis | null {
  return _instance;
}
