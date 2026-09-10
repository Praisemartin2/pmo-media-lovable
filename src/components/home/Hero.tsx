import { type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Star } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { supportsScrollTimeline } from "@/components/motion/useInView";

const HERO_IMAGE = "/images/hero_neighborhood.jpg";
const HERO_IMAGE_960 = "/images/hero_neighborhood_960.jpg";
const GRADIENT_WORD = "PMO Media.";

/** If the photo is missing the gradient ground behind it is the design — just drop the broken img. */
const hideBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

/** Wraps the first occurrence of `word` in `text` with a styled span (falls back to plain text). */
function highlight(text: string, word: string, className: string) {
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{text.slice(i, i + word.length)}</span>
      {text.slice(i + word.length)}
    </>
  );
}

/**
 * Home hero. Full-bleed aerial photo behind the message: CSS scroll-driven scale/fade (.hero-media)
 * where the browser supports it, <Parallax> as the JS fallback, dark gradient + colour glow on top.
 * The image sits on a navy→ink gradient so the frame still reads as designed if the file is missing.
 * Copy (H1 / sub / CTAs) is client-approved verbatim from site.hero.
 */
export function Hero() {
  const cssZoom = supportsScrollTimeline();
  const rating = site.proof.find((p) => p.star);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[92vh] items-center overflow-hidden bg-background">
      {/* ---- background stack ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,hsl(var(--navy))_0%,hsl(var(--ink))_55%,hsl(var(--wine))_100%)]"
      >
        {/* Oversized so neither the parallax translate nor the zoom exposes an edge. */}
        <Parallax speed={0.18} disabled={cssZoom} className="absolute inset-x-0 -top-[12%] -bottom-[12%]">
          <img
            src={HERO_IMAGE}
            srcSet={`${HERO_IMAGE_960} 960w, ${HERO_IMAGE} 1344w`}
            sizes="100vw"
            width={1344}
            height={768}
            alt="Aerial view of a suburban neighbourhood at blue hour"
            loading="eager"
            decoding="async"
            onError={hideBrokenImage}
            className={cssZoom ? "hero-media h-full w-full object-cover" : "h-full w-full scale-105 object-cover"}
          />
        </Parallax>
        {/* Colour grade: crimson → cobalt blended into the photo so it reads alive, not flat. */}
        <div className="absolute inset-0 bg-gradient-crimson-cobalt opacity-40 mix-blend-color" />
        {/* Legibility scrim: heavier at the bottom and on the left where the copy sits. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--ink)/0.45)_0%,hsl(var(--ink)/0.35)_45%,hsl(var(--ink)/0.96)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--ink)/0.85)_0%,hsl(var(--ink)/0.35)_55%,transparent_100%)]" />
        {/* Ambient glow — brighter, more colour. */}
        <div className="glow-ambient absolute inset-0 opacity-80" />
      </div>

      {/* ---- message ---- */}
      <div className="container-pmo relative py-28 sm:py-36 lg:py-40">
        <Reveal stagger={110} className="max-w-4xl">
          <p data-reveal-child className="eyebrow text-cobalt">
            {site.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            data-reveal-child
            className="display mt-6 text-[clamp(3rem,9vw,6.75rem)] text-foreground drop-shadow-[0_2px_24px_hsl(var(--ink)/0.8)]"
          >
            {highlight(site.hero.h1, GRADIENT_WORD, "text-gradient")}
          </h1>

          <p data-reveal-child className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {site.hero.sub}
          </p>

          <div data-reveal-child className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={site.hero.primary.href} className="btn-primary">
              {site.hero.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.hero.secondary.href} className="btn-ghost border-foreground/40 backdrop-blur-sm">
              {site.hero.secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Slim trust line: the only allowed rating, the base, the reach. */}
          <p data-reveal-child className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-xs uppercase tracking-[0.18em] text-foreground/75">
            {rating && (
              <span className="inline-flex items-center gap-1.5 text-foreground">
                <span className="font-semibold tabular-nums">{rating.value}</span>
                <Star className="h-3.5 w-3.5 fill-amber text-amber" aria-hidden="true" />
                <span>{rating.label}</span>
              </span>
            )}
            <span aria-hidden="true" className="text-primary">
              ·
            </span>
            <span>{site.city}</span>
            <span aria-hidden="true" className="text-primary">
              ·
            </span>
            <span>{site.serving}</span>
          </p>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <a
        href="#approach"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/60 transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
      >
        <span className="eyebrow text-inherit">Scroll</span>
        <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
