import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { testimonial } from "@/data/portfolio";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Client testimonial: video on the left, quote on the right. Content and player logic unchanged.
 * v2 styling: card on a navy-tinted surface with a crimson→cobalt hairline; the oversized opening
 * quotation mark carries the crimson.
 */
export function Testimonial() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    ref.current?.play().catch(() => {});
  };

  // The overlay button unmounts once playback starts; hand focus to the (now controllable)
  // player so a keyboard user's next Tab continues from the native control bar, not <body>.
  useEffect(() => {
    if (started) ref.current?.focus();
  }, [started]);

  return (
    <section id="testimonial" aria-labelledby="testimonial-title" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--cobalt)/0.18),transparent)] blur-3xl"
      />

      <div className="container-pmo relative">
        <Reveal>
          <h2 id="testimonial-title" className="eyebrow text-cobalt">
            Client testimonial
          </h2>

          <div className="mt-6 grid overflow-hidden border border-border bg-card lg:grid-cols-2 lg:items-stretch">
            <span aria-hidden="true" className="col-span-full block h-[3px] w-full bg-gradient-crimson-cobalt" />

            {/* Left: video player */}
            <div className="relative aspect-video bg-background lg:aspect-auto lg:h-full lg:min-h-[420px]">
              {/* Native controls appear only after the custom play button starts playback, so the poster shows one affordance. */}
              <video
                ref={ref}
                controls={started}
                preload="metadata"
                playsInline
                poster={testimonial.poster}
                src={testimonial.video}
                onPlay={() => setStarted(true)}
                aria-label={`Video testimonial from ${testimonial.name}, ${testimonial.role}`}
                className="h-full w-full bg-background object-cover"
              >
                <track kind="captions" src="/portfolio/testimonial_niyi.vtt" srcLang="en" label="English" default />
              </video>
              {!started && (
                <button
                  type="button"
                  onClick={start}
                  aria-label={`Play video testimonial from ${testimonial.name}`}
                  className="group absolute inset-0 flex items-center justify-center bg-background/30 transition-colors hover:bg-background/15 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-foreground/90 bg-background/70 text-foreground shadow-[0_0_0_0_hsl(var(--crimson)/0)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ease-smooth group-hover:scale-105 group-hover:border-primary group-hover:shadow-[0_0_40px_-4px_hsl(var(--crimson)/0.6)]">
                    <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
                  </span>
                </button>
              )}
            </div>

            {/* Right: quote */}
            <figure className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <span aria-hidden="true" className="display block text-8xl leading-[0.6] text-primary sm:text-9xl">
                “
              </span>
              <blockquote className="mt-4">
                <p className="text-xl leading-snug text-foreground sm:text-2xl">{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-6">
                <p className="font-mark text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
