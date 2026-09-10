import { Star } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

/**
 * Results proof band. Renders exactly the five allowed proof points from site.proof — nothing else.
 * Wine band (dominant colour: crimson) with amber reserved for the Google star.
 * Numbers count up on entry (CountUp); prefix / suffix render instantly around the animated value.
 * On lg the five stats sit in one row.
 */
export function ProofBar() {
  return (
    <section
      id="proof"
      aria-label="Proof points"
      className="band-wine clip-angle-top relative overflow-hidden pt-[calc(var(--angle)+3.5rem)] pb-14 sm:pb-20"
    >
      {/* Ambient crimson bloom behind the numbers. Purely decorative. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--crimson)/0.28),transparent)] blur-2xl"
      />

      <div className="container-pmo relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <p className="eyebrow text-amber">Results</p>
            <h2 className="display mt-3 text-3xl text-foreground sm:text-4xl">Numbers we will put our name to.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Every figure below comes from one engagement and the client&rsquo;s own account of it. No industry averages, no borrowed logos.
          </p>
        </Reveal>

        <Reveal stagger={110} delay={80} className="mt-10 sm:mt-12">
          <dl className="grid grid-cols-1 gap-y-8 border-t border-foreground/10 pt-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[1fr_1fr_1.35fr_1fr_1fr] lg:gap-x-0 lg:pt-10">
            {site.proof.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal-child=""
                className={cn(
                  "relative flex min-w-0 flex-col lg:px-6 lg:first:pl-0 lg:last:pr-0",
                  "lg:border-l lg:border-foreground/10 lg:first:border-l-0",
                )}
              >
                {/* Thin crimson tick above each stat — the band's accent, repeated as a rhythm. */}
                <span aria-hidden="true" className={cn("mb-4 block h-[3px] w-8", stat.star ? "bg-amber" : "bg-primary")} />

                {/* dt precedes dd for semantics; the value is displayed first via CSS order. */}
                <dt className="eyebrow order-2 mt-3 text-foreground/80">{stat.label}</dt>

                <dd
                  className={cn(
                    "display order-1 flex flex-wrap items-baseline gap-1 text-foreground",
                    "text-5xl sm:text-6xl lg:text-[clamp(2.5rem,3.6vw,3.75rem)]",
                  )}
                >
                  {stat.prefix && (
                    <span className="text-[0.42em] leading-none text-muted-foreground" aria-hidden="true">
                      {stat.prefix}
                    </span>
                  )}
                  {/* Screen readers get the full "100→1,500+" from the sr-only copy below. */}
                  {stat.prefix && <span className="sr-only">{stat.prefix}</span>}
                  <CountUp value={stat.value} duration={1400} delay={i * 90} />
                  {stat.suffix && <span className="text-[0.7em] text-primary">{stat.suffix}</span>}
                  {stat.star && (
                    <span className="ml-1 inline-flex items-center self-center" aria-hidden="true">
                      <Star className="h-[0.55em] w-[0.55em] fill-amber text-amber drop-shadow-[0_0_10px_hsl(var(--amber)/0.6)]" />
                    </span>
                  )}
                  {stat.star && <span className="sr-only"> out of 5 stars</span>}
                </dd>

                {stat.detail && <dd className="order-3 mt-1.5 text-sm leading-snug text-muted-foreground">{stat.detail}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
