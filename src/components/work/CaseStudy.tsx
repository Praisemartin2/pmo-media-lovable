import { ArrowDown, Check } from "lucide-react";
import { caseStudy } from "@/data/portfolio";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

/**
 * Concise case study: the Ekabo Home engagement.
 * Meta chips → one paragraph → exactly three outcomes → "Watch the testimonial" (anchors #testimonial).
 * One still from the series on the right, duotone at rest and full colour on hover, drifting on Parallax.
 * The wrapping `#results` anchor lives in the page (Index.tsx), so this section is `#case-study`.
 * Dominant colour: crimson (checks, chip, image grade).
 */
export function CaseStudy() {
  const meta = [
    { label: "Client", value: caseStudy.client },
    { label: "Market", value: caseStudy.market },
    { label: "Window", value: caseStudy.window },
  ];

  return (
    <section id="case-study" aria-labelledby="results-title" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="container-pmo grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
        {/* Left: copy */}
        <div>
          <Reveal>
            <p className="eyebrow text-cobalt">Case study</p>
            <h2 id="results-title" className="display mt-4 text-5xl sm:text-7xl">
              One client. Fifty pieces. Eight weeks.
            </h2>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <ul aria-label="Engagement" className="flex flex-wrap gap-2">
              {meta.map((m) => (
                <li
                  key={m.label}
                  className="inline-flex items-baseline gap-2 border border-border bg-card px-3.5 py-2 font-label text-xs uppercase tracking-[0.18em] text-foreground"
                >
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                  <span>{m.value}</span>
                </li>
              ))}
              <li className="inline-flex items-center border border-primary/40 bg-primary/10 px-3.5 py-2 font-label text-xs normal-case tracking-[0.12em] text-foreground">
                {caseStudy.handle}
              </li>
            </ul>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">{caseStudy.summary}</p>
          </Reveal>

          <Reveal delay={140} stagger={100} className="mt-9">
            <h3 className="eyebrow">Outcomes</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {caseStudy.outcomes.slice(0, 3).map((outcome, i) => (
                <li key={outcome} data-reveal-child="" className="flex items-start gap-4 py-4 text-base text-foreground sm:text-lg">
                  <span className="display mt-0.5 w-7 shrink-0 text-xl leading-none text-muted-foreground" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-9">
            <a href="#testimonial" className="btn-ghost">
              Watch the testimonial
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Right: one still from the series. Portrait frame; the gradient shows if the file is missing. */}
        <Reveal variant="scale" delay={120} className="lg:justify-self-end">
          <Parallax speed={0.1} className="mx-auto w-full max-w-sm lg:max-w-none">
            <figure className="group relative">
              <div
                className={cn(
                  "duotone duotone-crimson relative aspect-[4/5] w-full border border-border shadow-[0_40px_80px_-40px_hsl(var(--crimson)/0.6)]",
                  "transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-30px_hsl(var(--crimson)/0.75)]",
                )}
              >
                <img
                  src={caseStudy.image}
                  alt={caseStudy.imageAlt}
                  width={720}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="transition-[filter,transform] duration-700 ease-smooth group-hover:scale-[1.03] group-hover:mix-blend-normal group-hover:[filter:none]"
                />
                {/* Corner label */}
                <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 bg-background/80 px-3 py-1.5 font-label text-[11px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-primary" />
                  Original series
                </span>
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>See You At 75 · Episode 5</span>
                <span className="font-label uppercase tracking-[0.18em]">{caseStudy.client}</span>
              </figcaption>
            </figure>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
