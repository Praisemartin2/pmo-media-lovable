import { cn } from "@/lib/utils";

/** PMO O-device: aperture ring + skyline bars. Inline SVG so it scales crisply and can recolor. */
export function LogoMark({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={cn("shrink-0", className)}>
      <path d="M 50 8 A 42 42 0 1 1 20 21" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="butt" transform="rotate(20 50 50)" />
      <path d="M 12 60 A 42 42 0 0 0 46 92" fill="none" stroke="hsl(var(--crimson))" strokeWidth="8" strokeLinecap="butt" />
      <rect x="31" y="52" width="10" height="24" fill="currentColor" />
      <rect x="45" y="40" width="10" height="36" fill="currentColor" />
      <rect x="59" y="26" width="10" height="50" fill="currentColor" />
    </svg>
  );
}

/**
 * Wordmark: "PM" + the O-device + "Media". The visual parts are hidden from
 * assistive tech and the whole thing is named "PMO Media" so it is never read as "PM Media".
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="PMO Media"
      className={cn("inline-flex items-center gap-2 font-mark text-[15px] font-semibold uppercase tracking-[0.18em] text-foreground", className)}
    >
      <span aria-hidden="true">PM</span>
      <LogoMark size={26} className="-mx-0.5" />
      <span aria-hidden="true">Media</span>
    </span>
  );
}
