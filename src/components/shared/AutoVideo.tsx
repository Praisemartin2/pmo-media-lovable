import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** True when the visitor has asked the OS for reduced motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );
}

/**
 * Muted, looped, inline video that plays only while it is on screen.
 * preload="none" keeps the page cheap; an IntersectionObserver starts and
 * stops playback.
 *
 * `paused` is tri-state so the page can offer its own stop control (WCAG 2.2.2):
 *   undefined → automatic: plays on screen, but leaves the poster in place when
 *               the visitor prefers reduced motion;
 *   true      → held on the poster regardless of visibility;
 *   false     → plays on screen even under reduced motion (the visitor asked for it).
 */
export function AutoVideo({
  src,
  poster,
  className,
  label,
  paused,
  preload = "none",
}: {
  src: string;
  poster?: string;
  className?: string;
  /** Accessible name. When omitted the video is treated as decorative. */
  label?: string;
  paused?: boolean;
  preload?: "none" | "metadata" | "auto";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hold = paused === undefined ? prefersReducedMotion() : paused;
    if (hold) {
      el.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.pause();
    };
  }, [paused]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={preload}
      disablePictureInPicture
      tabIndex={-1}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
