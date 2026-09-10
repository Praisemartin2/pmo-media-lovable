import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { Marquee } from "@/components/motion/Marquee";

export type MarqueeBandProps = {
  className?: string;
  /** Seconds per loop. Default 32. */
  duration?: number;
};

/**
 * Capability marquee between the hero and the partner section.
 * Navy band (cobalt glow) with crimson→cobalt hairlines top and bottom; words from site.marquee
 * separated by the Marquee's default crimson diamonds. Pauses on hover, static under reduced motion.
 */
export function MarqueeBand({ className, duration = 32 }: MarqueeBandProps) {
  const words = site.marquee.map((w) => w.toUpperCase());

  return (
    <div className={cn("band-navy relative overflow-hidden py-6 sm:py-8", className)}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-crimson-cobalt opacity-80" />
      <Marquee items={words} duration={duration} ariaLabel="What we build" itemClassName="text-foreground/90" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-crimson-cobalt opacity-40" />
    </div>
  );
}
