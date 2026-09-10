import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/components/motion/useInView";

export type RevealVariant = "up" | "left" | "right" | "scale" | "clip";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** ms before the transition starts. */
  delay?: number;
  /** Entrance style. Default "up" (fade + 24px rise — the original behaviour). */
  variant?: RevealVariant;
  /**
   * ms between children marked `data-reveal-child`. When set, the wrapper reveals immediately
   * and each marked descendant fades/rises in sequence (CSS in index.css → .reveal-stagger).
   */
  stagger?: number;
  /** IntersectionObserver threshold. Default 0.15. */
  threshold?: number;
};

const HIDDEN: Record<RevealVariant, string> = {
  up: "translate-y-6 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  scale: "scale-95 opacity-0",
  clip: "",
};
const SHOWN: Record<RevealVariant, string> = {
  up: "translate-y-0 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "translate-x-0 opacity-100",
  scale: "scale-100 opacity-100",
  clip: "",
};

/**
 * Reveal on scroll. Default = fade-up (unchanged from v1).
 * Variants: up | left | right | scale | clip. `stagger` sequences `[data-reveal-child]` descendants.
 * Under prefers-reduced-motion everything is shown instantly (no observer wait).
 *
 * The observed element is the OUTER div, which never carries opacity/clip-path. Chromium's
 * IntersectionObserver (and native lazy-loading) apply the target's own clip-path when computing the
 * intersection rect, so a wrapper that starts at `inset(0 0 100% 0)` reports ratio 0 forever. The
 * "clip" variant therefore animates an inner div instead.
 */
export function Reveal({ children, className, delay = 0, variant = "up", stagger, threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // Index each stagger child so CSS can compute its delay (--reveal-i * --reveal-stagger).
  useEffect(() => {
    const el = ref.current;
    if (!el || !stagger) return;
    const kids = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
    kids.forEach((k, i) => k.style.setProperty("--reveal-i", String(i)));
  }, [stagger, children]);

  const isStagger = !!stagger && stagger > 0;
  const isClip = variant === "clip" && !isStagger;

  const style: CSSProperties & Record<`--${string}`, string> = { transitionDelay: `${delay}ms` };
  if (isStagger) {
    style["--reveal-stagger"] = `${stagger}ms`;
    style["--reveal-delay"] = `${delay}ms`;
  }

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        !isClip && "transition-all duration-700 ease-smooth will-change-transform",
        // In stagger mode the wrapper itself stays visible; the children animate.
        isStagger ? "reveal-stagger" : !isClip && (on ? SHOWN[variant] : HIDDEN[variant]),
        isStagger && on && "is-on",
        className,
      )}
    >
      {isClip ? (
        <div
          className="transition-all duration-700 ease-smooth will-change-transform"
          style={{
            transitionDelay: `${delay}ms`,
            clipPath: on ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
            opacity: on ? 1 : 0,
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
