import { type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

const PARTNER_IMAGE = "/images/blueprint_desk.jpg";
const PARTNER_IMAGE_960 = "/images/blueprint_desk_960.jpg";
const ACCENT_WORD = "partner";

/** If the photo is missing the duotone gradient behind it is the design — just drop the broken img. */
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
 * "A real partner — not another vendor." (#approach). Wine band, crimson dominant, angled bottom edge.
 * Pinned split on lg+: the left column (eyebrow, headline, intro, CTA, duotone blueprint) is sticky
 * while the three pillar cards scroll past on the right. Stacks on mobile.
 * NOTE: no `overflow-hidden` on the section — it would turn it into a scroll container and break
 * the sticky column; the clip-path already clips the band.
 */
export function Partner() {
  const { headline, intro, pillars } = site.partner;

  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="band-wine clip-angle-bottom relative pt-20 pb-[calc(5rem+var(--angle))] sm:pt-28 sm:pb-[calc(7rem+var(--angle))]"
    >
      {/* Soft crimson bloom behind the cards (right side). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_45%,hsl(var(--crimson)/0.18),transparent_65%)]"
      />

      <div className="container-pmo relative grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* ---- left: pinned message ---- */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Reveal variant="left">
            <p className="eyebrow text-amber">Approach</p>
            <h2 id="approach-title" className="display mt-4 text-5xl sm:text-6xl">
              {highlight(headline, ACCENT_WORD, "text-gradient-crimson")}
            </h2>
            <span aria-hidden="true" className="crimson-rule mt-8 block" />
            <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
            <div className="mt-8">
              <Link to={site.hero.primary.href} className="btn-primary">
                {site.hero.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal variant="clip" delay={140} className="mt-10">
            <figure className="duotone duotone-crimson relative aspect-[4/3] w-full border border-primary/30 lg:aspect-[16/10]">
              <img
                src={PARTNER_IMAGE}
                srcSet={`${PARTNER_IMAGE_960} 960w, ${PARTNER_IMAGE} 1216w`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                width={1216}
                height={896}
                alt="Architect's desk with a blueprint, scale rule and pencils — the plan before the build"
                // Eager: Chromium's lazy-load uses the same clipped-intersection logic as IO, so a lazy
                // image inside a clip reveal would only start fetching after the reveal finished.
                loading="eager"
                decoding="async"
                onError={hideBrokenImage}
              />
              <figcaption className="eyebrow absolute bottom-4 left-5 text-foreground/85">Blueprint before build</figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ---- right: pillars scrolling past ---- */}
        <ol className="space-y-6 lg:space-y-8 lg:pt-4">
          {pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <Reveal variant="up" delay={i * 60}>
                <article className="card-tilt relative border border-border bg-card/85 p-8 backdrop-blur-sm sm:p-10">
                  <span aria-hidden="true" className="display block text-7xl leading-none text-primary sm:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="crimson-rule mt-6 block w-8" />
                  <h3 className="mt-5 font-mark text-xl uppercase tracking-wide text-foreground">{pillar.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{pillar.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
