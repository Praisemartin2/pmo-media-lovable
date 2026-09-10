import { useEffect, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, useInView } from "@/components/motion/useInView";

export type CountUpProps = {
  /** "50", "1,500+", "5.0", "$2.4M", 1500 … Strings with digits outside one leading number render instantly. */
  value: string | number;
  /** ms. Default 1400. */
  duration?: number;
  /** Delay before starting, ms. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

type Parsed = { prefix: string; target: number; decimals: number; grouped: boolean; suffix: string } | null;

/** Accepts: optional non-digit prefix, ONE number (commas/decimals ok), optional non-digit suffix. */
function parse(value: string | number): Parsed {
  if (typeof value === "number") return { prefix: "", target: value, decimals: 0, grouped: false, suffix: "" };
  const m = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/.exec(value.trim());
  if (!m) return null;
  const [, prefix, num, suffix] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, target: parseFloat(num.replace(/,/g, "")), decimals, grouped: num.includes(","), suffix };
}

function format(n: number, p: NonNullable<Parsed>) {
  const fixed = n.toFixed(p.decimals);
  if (!p.grouped) return fixed;
  const [int, dec] = fixed.split(".");
  const g = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${g}.${dec}` : g;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animates a number from 0 to its value when it enters the viewport.
 * Handles "1,500+" and "5.0". Non-numeric / multi-number strings ("100→1,500") render instantly.
 * The animated text is aria-hidden; a visually-hidden copy carries the final value for screen readers.
 */
export function CountUp({ value, duration = 1400, delay = 0, className, as: Tag = "span" }: CountUpProps) {
  const parsed = parse(value);
  const final = String(value);
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.4 });
  // Reduced motion (or no animation) starts at the final value, so the number never depends on the observer firing.
  const [text, setText] = useState(() =>
    !parsed || prefersReducedMotion() || duration <= 0 ? final : `${parsed.prefix}${format(0, parsed)}${parsed.suffix}`,
  );

  useEffect(() => {
    if (!parsed) return;
    if (!inView) return;
    if (prefersReducedMotion() || duration <= 0) {
      setText(final);
      return;
    }
    let frame = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / duration);
        const n = parsed.target * easeOutCubic(t);
        setText(`${parsed.prefix}${format(t >= 1 ? parsed.target : n, parsed)}${parsed.suffix}`);
        if (t < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, final, duration, delay]);

  if (!parsed) {
    return (
      <Tag ref={ref} className={cn("tabular-nums", className)}>
        {final}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} className={cn("tabular-nums", className)}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{final}</span>
    </Tag>
  );
}
