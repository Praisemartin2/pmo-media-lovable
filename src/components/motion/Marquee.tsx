import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MarqueeProps = {
  /** Words/phrases to loop. Each is separated by `separator`. */
  items?: ReactNode[];
  /** Custom content instead of `items` (rendered twice; the copy is aria-hidden). */
  children?: ReactNode;
  /** Separator between items. Default: crimson diamond. */
  separator?: ReactNode;
  /** Seconds per loop. Default 28. */
  duration?: number;
  /** Reverse direction. */
  reverse?: boolean;
  className?: string;
  /** Classes for each item span (font/size/colour). */
  itemClassName?: string;
  /** Accessible name for the band (it is a `region` by default so the content is readable once). */
  ariaLabel?: string;
};

/**
 * Infinite horizontal band. Pure CSS keyframes (`.marquee-track` → `marquee` keyframe translates -50%
 * of a doubled track). Pauses on hover / focus; static under prefers-reduced-motion (index.css).
 *
 *   <Marquee items={["BRAND ARCHITECTURE", "CONTENT ENGINE", …]} />
 */
export function Marquee({
  items,
  children,
  separator,
  duration = 28,
  reverse = false,
  className,
  itemClassName,
  ariaLabel = "Capabilities",
}: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden="true" className="mx-6 inline-block text-[0.55em] text-primary sm:mx-8" style={{ verticalAlign: "0.25em" }}>
      ◆
    </span>
  );

  const content = (hidden: boolean) => (
    <div className="flex shrink-0 items-center whitespace-nowrap" aria-hidden={hidden || undefined}>
      {children
        ? children
        : (items ?? []).map((item, i) => (
            <Fragment key={i}>
              <span className={cn("display inline-block text-2xl text-foreground sm:text-3xl md:text-4xl", itemClassName)}>{item}</span>
              {sep}
            </Fragment>
          ))}
    </div>
  );

  const style: CSSProperties = {
    ["--marquee-duration" as string]: `${duration}s`,
    animationDirection: reverse ? "reverse" : undefined,
  };

  return (
    <div role="region" aria-label={ariaLabel} className={cn("marquee w-full select-none", className)}>
      <div className="marquee-track" style={style}>
        {content(false)}
        {content(true)}
      </div>
    </div>
  );
}
