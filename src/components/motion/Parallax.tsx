import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/components/motion/useInView";

export type ParallaxProps = {
  children?: ReactNode;
  /** Fraction of scroll delta applied as translateY. 0.2 = moves at 20% of scroll (lags behind). Negative = leads. */
  speed?: number;
  className?: string;
  style?: CSSProperties;
  /** Turn the effect off (e.g. when a CSS scroll-driven animation already handles it). */
  disabled?: boolean;
};

/**
 * Translates its children on scroll (translate3d, rAF-throttled). Only listens/animates while
 * the wrapper is on screen (IntersectionObserver). No-op under prefers-reduced-motion.
 *
 *   <Parallax speed={0.2} className="absolute inset-0"><img … /></Parallax>
 *
 * Tip: give the wrapper a little extra height/scale (e.g. `scale-110` on the img) so edges never show.
 */
export function Parallax({ children, speed = 0.2, className, style, disabled = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (disabled || prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.style.transform = "";
      return;
    }

    let frame = 0;
    let active = false;

    const paint = () => {
      frame = 0;
      if (!active) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Distance of the element's centre from the viewport centre; positive speed lags the scroll.
      const centre = rect.top + rect.height / 2;
      const y = (vh / 2 - centre) * speed;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (active && !frame) frame = window.requestAnimationFrame(paint);
    };
    const start = () => {
      if (active) return;
      active = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
    };
    const stop = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // Generous margin so the transform is already correct as the element slides in.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "20% 0px 20% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [speed, disabled]);

  return (
    <div ref={ref} data-parallax="" className={cn("will-change-transform", className)} style={style}>
      {children}
    </div>
  );
}
