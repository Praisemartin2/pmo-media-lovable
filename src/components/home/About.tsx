import { ArrowUpRight, Linkedin } from "lucide-react";
import { site } from "@/data/site";
import { LogoMark } from "@/components/shared/Logo";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

export type AboutProps = {
  /** Founder photo (e.g. "/images/founder.jpg"). Optional — no headshot exists yet; a typographic panel renders instead. */
  image?: string;
  className?: string;
};

const linkClass =
  "inline-flex items-center gap-2 font-mark text-sm font-semibold uppercase tracking-[0.14em] text-foreground underline-offset-4 transition hover:text-cobalt hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * About (#about). Company-level section: headline, mission, three values, DC rowhouses in a crimson
 * duotone. Then a short Founder sub-block from site.principal (name, title, bio, LinkedIn).
 * Wine band — dominant colour crimson; amber only on the value numerals.
 */
export function About({ image, className }: AboutProps) {
  const { company, principal } = site;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={cn("band-wine clip-angle-top-rev relative overflow-hidden pt-[calc(var(--angle)+4rem)] pb-20 sm:pb-28", className)}
    >
      <div className="container-pmo">
        {/* Header */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-amber">About PMO Media</p>
          <h2 id="about-title" className="display mt-4 text-[clamp(2.25rem,9.2vw,4.5rem)] sm:text-7xl">
            {company.headline}
          </h2>
        </Reveal>

        {/* Company: image + mission / values */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-16">
          <Reveal variant="left" className="lg:self-stretch">
            <Parallax speed={0.08} className="h-full">
              <div className="duotone duotone-crimson scrim relative aspect-[16/9] w-full border border-border lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <img
                  src="/images/dc_rowhouses.jpg"
                  srcSet="/images/dc_rowhouses_960.jpg 960w, /images/dc_rowhouses.jpg 1344w"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  alt="A row of Washington, DC rowhouses at golden hour — PMO Media's home market."
                  width={1344}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
                  <p className="font-label text-xs uppercase tracking-[0.2em] text-foreground">
                    {site.city} <span aria-hidden="true" className="mx-2 text-primary">◆</span> {site.serving}
                  </p>
                  <LogoMark size={36} className="text-foreground" />
                </div>
              </div>
            </Parallax>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">{company.mission}</p>
            </Reveal>

            <Reveal delay={160} stagger={110} className="mt-10">
              <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
                {company.values.map((value, i) => (
                  <li key={value.title} data-reveal-child="" className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                    <span aria-hidden="true" className="display text-4xl leading-none text-amber">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-mark text-base font-semibold uppercase tracking-wide text-foreground">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{value.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        {/* Founder sub-block */}
        <Reveal variant="up" delay={80} className="mt-16 lg:mt-24">
          <article
            aria-labelledby="founder-name"
            className="card-tilt grid overflow-hidden border border-border bg-card/70 backdrop-blur-sm lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            {/* Portrait panel: photo when provided, otherwise a typographic / logo-mark panel. */}
            <div className="duotone duotone-ink relative min-h-[300px] border-b border-border lg:min-h-0 lg:border-b-0 lg:border-r">
              {image ? (
                <img
                  src={image}
                  alt={`${principal.name}, ${principal.title} of ${site.name}.`}
                  width={960}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,hsl(var(--crimson)/0.35),transparent)] blur-2xl"
                  />
                  <div className="relative flex items-start justify-between gap-6">
                    <LogoMark size={64} className="text-foreground" />
                    <p className="eyebrow text-right">{site.city}</p>
                  </div>
                  <div className="relative">
                    <p className="display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.85] text-foreground">
                      <span className="block">PMO</span>
                      <span className="block text-gradient-crimson">Media</span>
                    </p>
                    <p className="eyebrow mt-5 text-foreground/70">{site.tagline}</p>
                  </div>
                </div>
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-10 bg-primary px-3 py-1.5 font-label text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
              >
                Founder
              </span>
            </div>

            {/* Bio */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="eyebrow text-amber">Leadership</p>
              <h3 id="founder-name" className="display mt-3 text-4xl sm:text-5xl">
                {principal.name}
              </h3>
              <p className="mt-2 font-mark text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {principal.title} <span aria-hidden="true" className="mx-1.5 text-primary">·</span> {site.city}
              </p>
              <span aria-hidden="true" className="crimson-rule mt-6 block" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{principal.bio}</p>
              <div className="mt-8">
                <a href={principal.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
