import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * 2px crimson bar fixed at the top of the viewport, sitting just under the 4rem sticky nav.
 * Width = document scroll progress. Driven by `transform: scaleX` in a rAF so it never causes layout.
 * Decorative: hidden from assistive tech.
 */
export function ScrollProgress({ className, top = "4rem" }: { className?: string; top?: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      style={{ top, transform: "scaleX(0)" }}
      className={cn(
        "pointer-events-none fixed left-0 z-40 h-[2px] w-full origin-left bg-primary shadow-[0_0_12px_hsl(var(--crimson)/0.7)]",
        className,
      )}
    />
  );
}
