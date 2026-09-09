import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Services grid. Six cards from site.services.
 * The one crimson accent in this section is the short rule under the headline;
 * bullet markers stay ice, matching Packages and About.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="display mt-4 text-5xl sm:text-6xl">
            THE WHOLE SYSTEM. NOT A VENDOR.
          </h2>
          <span aria-hidden="true" className="crimson-rule mt-8 block" />
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Brand, content, launches, paid traffic, CRM and reporting — built to work as one system and run by one
            principal.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 90} className="h-full">
              <article className="flex h-full flex-col border border-border bg-card p-7 transition-colors duration-300 hover:border-foreground/40">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-mark text-lg uppercase tracking-wide text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.lead}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-foreground">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-foreground" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
