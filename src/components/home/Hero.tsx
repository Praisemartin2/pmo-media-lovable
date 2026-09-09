import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Pause, Play } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { AutoVideo, prefersReducedMotion } from "@/components/shared/AutoVideo";

/**
 * Home hero. Full-bleed black, two columns on lg.
 * The one crimson accent in this frame is the "DONE RIGHT." line — both CTAs stay ghost
 * because the sticky nav already shows the crimson "Start the brief" in the same viewport.
 */
export function Hero() {
  // undefined = automatic (respects reduced motion); the visitor's toggle makes it explicit.
  const [paused, setPaused] = useState<boolean | undefined>(() => (prefersReducedMotion() ? true : undefined));

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-background"
    >
      {/* Faint ice glow — keeps the black from reading flat. Not crimson. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--ice)/0.05),transparent_55%)]"
      />

      <div className="container-pmo relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        {/* Left: message */}
        <Reveal>
          <p className="eyebrow">Real estate marketing partner</p>

          <h1 id="hero-title" className="display mt-6 text-6xl sm:text-7xl lg:text-8xl">
            REAL ESTATE MARKETING,
            <span className="block text-primary">DONE RIGHT.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">{site.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/brief" className="btn-ghost border-foreground/60">
              Start the brief
            </Link>
            <a href="#work" className="btn-ghost">
              See the work
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">Free 20-min strategy call · no deck, no pitch</p>
        </Reveal>

        {/* Right: phone-frame device (lg and up only) */}
        <Reveal delay={150} className="hidden lg:block lg:justify-self-end">
          <figure className="flex flex-col items-center">
            <div className="relative aspect-[9/16] w-[300px] overflow-hidden rounded-[28px] border-2 border-foreground/90 bg-card xl:w-[340px]">
              <AutoVideo
                src="/portfolio/hero_loop.mp4"
                poster="/portfolio/sya75_ep5.jpg"
                preload="metadata"
                label="Looping preview from the client feed"
                paused={paused}
              />
              {/* On-page stop mechanism for the auto-playing loop (WCAG 2.2.2). */}
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play hero video" : "Pause hero video"}
                className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/40 bg-background/70 text-foreground backdrop-blur-sm transition hover:border-foreground/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {paused ? (
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                )}
              </button>
            </div>
            <figcaption className="eyebrow mt-5 text-center">From the client feed · 50 pieces in 8 weeks</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#proof"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
