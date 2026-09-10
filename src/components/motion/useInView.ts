import { useEffect, useRef, useState, type RefObject } from "react";

export type UseInViewOptions = {
  /** IntersectionObserver threshold. Default 0.15. */
  threshold?: number | number[];
  /** IntersectionObserver rootMargin, e.g. "0px 0px -10% 0px". */
  rootMargin?: string;
  /** Stop observing after the first intersection. Default true. */
  once?: boolean;
};

/**
 * Tracks whether an element is in the viewport.
 * Returns a ref to attach and a boolean. With `once` (default) it latches to true.
 * SSR / no-IO environments (old browsers, jsdom without IO) resolve to `true` so content is never hidden.
 */
export function useInView<T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}): [RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, rootMargin, Array.isArray(threshold) ? threshold.join(",") : threshold]);

  return [ref, inView];
}

const RM_QUERY = "(prefers-reduced-motion: reduce)";

/** Synchronous read of the reduced-motion preference (safe on the server → false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia(RM_QUERY).matches;
  } catch {
    return false;
  }
}

/** Reactive reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia(RM_QUERY);
    } catch {
      return;
    }
    const onChange = () => setReduced(mq.matches);
    onChange();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    // Safari < 14
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);
  return reduced;
}

/** True when the browser supports CSS scroll-driven animations (`animation-timeline: scroll()`). */
export function supportsScrollTimeline(): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return false;
  try {
    return CSS.supports("animation-timeline: scroll()");
  } catch {
    return false;
  }
}
