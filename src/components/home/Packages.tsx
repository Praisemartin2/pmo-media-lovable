import { Link } from "react-router-dom";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * Packages grid. Four tiers from site.packages.
 * The one crimson element in this section is the "Most popular" tag. The popular card
 * is otherwise set apart by a brighter ice border; every CTA stays ghost.
 */
export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Packages</p>
          <h2 id="packages-title" className="display mt-4 text-5xl sm:text-6xl">
            FIND YOUR FIT.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Every partnership is scoped to your market, pipeline and offer. Pick the package closest to your goals
            &mdash; it leads to a free 20-minute call, no deck, no pitch.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {site.packages.map((pkg, i) => {
            const href = "/brief?package=" + pkg.name.toLowerCase();
            return (
              <Reveal key={pkg.name} delay={(i % 4) * 90} className="h-full">
                <article
                  aria-labelledby={"package-" + pkg.name.toLowerCase()}
                  className={cn(
                    "relative flex h-full flex-col border bg-card p-7 transition-colors duration-300",
                    pkg.popular ? "border-foreground/60" : "border-border hover:border-foreground/40",
                  )}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-7 bg-primary px-2.5 py-1 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                      Most popular
                    </span>
                  )}

                  <h3 id={"package-" + pkg.name.toLowerCase()} className="display text-4xl">
                    {pkg.name}
                  </h3>
                  <p className="eyebrow mt-3">{pkg.tag}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pkg.blurb}</p>

                  <ul className="mt-6 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                        <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-foreground" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      to={href}
                      className="btn-ghost w-full whitespace-nowrap px-4 xl:text-xs"
                      aria-label={"Get a proposal for the " + pkg.name + " package"}
                    >
                      Get a proposal
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-sm text-muted-foreground">Retainers run on a 90-day minimum, then month-to-month.</p>
        </Reveal>
      </div>
    </section>
  );
}
