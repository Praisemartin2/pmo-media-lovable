import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * Packages — "Find your fit." Four tiers from site.packages (content unchanged).
 * Black ground; dominant colour crimson, carried by the popular card only: its "Most popular" tag,
 * crimson border glow and the one crimson CTA. Every other tier stays ghost. Cards tilt on hover.
 */
export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="relative overflow-hidden bg-background py-20 sm:py-28">
      {/* Faint ambient glow so the black band is not flat. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 glow-ambient opacity-40" />

      <div className="container-pmo relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-amber">Packages</p>
          <h2 id="packages-title" className="display mt-4 text-5xl sm:text-7xl">
            Find your fit.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Every engagement is scoped to your market, pipeline and offer. Pick the closest fit; the strategy call
            sets the final scope.
          </p>
        </Reveal>

        <Reveal stagger={100} delay={60} className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {site.packages.map((pkg, i) => {
              const id = "package-" + pkg.name.toLowerCase();
              const href = "/brief?package=" + pkg.name.toLowerCase();
              return (
                <article
                  key={pkg.name}
                  data-reveal-child=""
                  aria-labelledby={id}
                  className={cn(
                    "card-tilt relative flex h-full flex-col border bg-card p-7",
                    pkg.popular ? "border-primary/60 glow-crimson" : "border-border",
                  )}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-7 bg-primary px-2.5 py-1 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                      Most popular
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <h3 id={id} className="display text-4xl">
                      {pkg.name}
                    </h3>
                    <span aria-hidden="true" className="font-label text-xs tracking-[0.2em] text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <p className={cn("eyebrow mt-3", pkg.popular && "text-amber")}>{pkg.tag}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pkg.blurb}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                        <span
                          aria-hidden="true"
                          className={cn("mt-[7px] h-1.5 w-1.5 shrink-0", pkg.popular ? "bg-primary" : "bg-foreground")}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      to={href}
                      className={cn("w-full whitespace-nowrap px-4 xl:text-xs", pkg.popular ? "btn-primary" : "btn-ghost")}
                      aria-label={"Get a proposal for the " + pkg.name + " package"}
                    >
                      Get a proposal
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-sm text-muted-foreground">Retainers run on a 90-day minimum, then month-to-month.</p>
        </Reveal>
      </div>
    </section>
  );
}
