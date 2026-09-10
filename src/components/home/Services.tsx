import { type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/** If the photo is missing the gradient behind it is the design — just drop the broken img. */
const hideBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

/** `/images/x.jpg` → `/images/x_960.jpg 960w, /images/x.jpg <w>w` (the 960 variants ship alongside). */
const srcSetFor = (src: string, fullWidth: number) => `${src.replace(/\.jpg$/, "_960.jpg")} 960w, ${src} ${fullWidth}w`;

/**
 * Capabilities (#services). Black ground, cobalt dominant. Six capability cards from site.services in a
 * bento grid: the card that carries `image` (Brand Strategy) spans 2 columns × 2 rows on lg and shows the
 * photo under a colour grade + scrim; the rest are standard cards. Every card carries `id={slug}` so the
 * footer's capability links land on it. Cards tilt on hover; the grid reveals with a stagger.
 */
export function Services() {
  const services = site.services;
  const last = services.length - 1;

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-background py-20 sm:py-28">
      {/* Cobalt bloom top-right, faint amber bottom-left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_100%_0%,hsl(var(--cobalt)/0.16),transparent_60%),radial-gradient(40%_35%_at_0%_100%,hsl(var(--amber)/0.08),transparent_60%)]"
      />

      <div className="container-pmo relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-cobalt">Capabilities</p>
          <h2 id="services-title" className="display mt-4 text-5xl sm:text-6xl">
            Six capabilities. <span className="text-gradient">One system.</span>
          </h2>
          <span aria-hidden="true" className="cobalt-rule mt-8 block" />
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Brand, identity, content, demand, web and intelligence. Each stands on its own. Together they compound
            &mdash; one system, one team, one report.
          </p>
        </Reveal>

        <Reveal stagger={80} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {services.map((service, i) => {
            const hero = !!service.image;
            const numeral = String(i + 1).padStart(2, "0");
            return (
              <div
                key={service.slug}
                data-reveal-child
                className={cn(
                  "h-full",
                  hero && "sm:col-span-2 lg:row-span-2",
                  // keeps the 2-col layout from ending on an orphan
                  !hero && i === last && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <article
                  id={service.slug}
                  className={cn(
                    "card-tilt relative flex h-full flex-col overflow-hidden border border-border bg-card p-7 sm:p-8",
                    hero ? "min-h-[26rem] justify-end sm:min-h-[30rem]" : "card-tilt-cobalt",
                  )}
                >
                  {hero && service.image && (
                    <div
                      aria-hidden="true"
                      className="scrim grade-crimson-cobalt absolute inset-0 isolate bg-[linear-gradient(150deg,hsl(var(--navy))_0%,hsl(var(--ink-2))_55%,hsl(var(--wine))_100%)]"
                    >
                      <img
                        src={service.image}
                        srcSet={srcSetFor(service.image, 1280)}
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        width={1280}
                        height={832}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={hideBrokenImage}
                        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <span className={cn("eyebrow", hero ? "text-amber" : "text-cobalt")}>{numeral}</span>
                    <h3 className={cn("mt-3 font-mark uppercase tracking-wide text-foreground", hero ? "text-2xl sm:text-3xl" : "text-lg")}>
                      {service.title}
                    </h3>
                    <p className={cn("mt-3 leading-relaxed", hero ? "max-w-lg text-base text-foreground/85" : "text-sm text-muted-foreground")}>
                      {service.lead}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className={cn("mt-0.5 h-4 w-4 shrink-0", hero ? "text-amber" : "text-cobalt")} aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">Not sure which capabilities you need first? That is what the strategy call is for.</p>
          <Link to={site.hero.primary.href} className="btn-ghost border-cobalt/50 px-5 py-3 text-xs hover:border-cobalt">
            {site.hero.primary.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
