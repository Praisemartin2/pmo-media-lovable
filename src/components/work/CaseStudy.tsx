import { useState } from "react";
import { Check, Pause, Play } from "lucide-react";
import { caseStudy } from "@/data/portfolio";
import { Reveal } from "@/components/shared/Reveal";
import { AutoVideo, prefersReducedMotion } from "@/components/shared/AutoVideo";
import { cn } from "@/lib/utils";

/** Three formats from the engagement, shown in phone frames. */
const FRAMES = [
  {
    label: "Series",
    src: "/portfolio/sya75_ep5.mp4",
    poster: "/portfolio/sya75_ep5.jpg",
    alt: "See You At 75, episode 5 — original animated series",
  },
  {
    label: "Clips",
    src: "/portfolio/ep169_clip1.mp4",
    poster: "/portfolio/ep169_clip1.jpg",
    alt: "Podcast clip — The Cost of Selling Too Soon",
  },
  {
    label: "Recaps",
    src: "/portfolio/victory_sundays.mp4",
    poster: "/portfolio/victory_sundays.jpg",
    alt: "Victory Sundays community recap",
  },
];

/**
 * Case study: the Ekabo Home engagement.
 * The one crimson accent in this section is the check mark on each outcome.
 */
export function CaseStudy() {
  const meta = [caseStudy.client, caseStudy.handle, caseStudy.market, caseStudy.window];
  // undefined = automatic (respects reduced motion); the visitor's toggle makes it explicit.
  const [paused, setPaused] = useState<boolean | undefined>(() => (prefersReducedMotion() ? true : undefined));

  return (
    <section id="results" aria-labelledby="results-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Case study</p>
          <h2 id="results-title" className="display mt-4 text-5xl sm:text-7xl">
            ONE CLIENT. FIFTY PIECES. EIGHT WEEKS.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: client chip + summary */}
          <Reveal>
            <ul
              aria-label="Client"
              className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-border bg-card px-4 py-2.5 font-label text-xs uppercase tracking-[0.18em] text-foreground"
            >
              {meta.map((value, i) => (
                <li key={value} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-muted-foreground">
                      ·
                    </span>
                  )}
                  <span className={cn(value === caseStudy.handle && "normal-case")}>{value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{caseStudy.summary}</p>
          </Reveal>

          {/* Right: outcomes */}
          <Reveal delay={120}>
            <h3 className="eyebrow">Outcomes</h3>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {caseStudy.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-4 py-4 text-base text-foreground sm:text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Phone-frame inserts */}
        <Reveal delay={80} className="mt-16 sm:mt-20">
          {/* One on-page stop control for the three auto-playing loops (WCAG 2.2.2). */}
          <div className="mx-auto flex max-w-3xl justify-end">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="btn-ghost px-4 py-2 text-xs"
            >
              {paused ? (
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              )}
              {paused ? "Play previews" : "Pause previews"}
            </button>
          </div>
          <ul aria-label="Three formats from the engagement" className="mx-auto mt-4 grid max-w-3xl grid-cols-3 gap-3 sm:gap-8">
            {FRAMES.map((frame) => (
              <li key={frame.label}>
                <figure>
                  <figcaption className="mb-3 text-center font-label text-xs uppercase tracking-widest text-foreground sm:text-sm">
                    {frame.label}
                  </figcaption>
                  <div className="aspect-[9/16] overflow-hidden rounded-[22px] border-2 border-foreground/90 bg-card">
                    <AutoVideo src={frame.src} poster={frame.poster} label={frame.alt} paused={paused} />
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
