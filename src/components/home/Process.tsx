import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";

/**
 * Process — "Four steps, no fluff." Content from site.process (unchanged).
 * Navy band with angled edges; dominant colour cobalt (numerals, eyebrow, card glow).
 * Steps are tilt cards revealed in a stagger; the studio camera sits beside the header on lg.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="band-navy clip-angle-both relative overflow-hidden py-[calc(var(--angle)+4rem)] sm:py-[calc(var(--angle)+5.5rem)]"
    >
      <div className="container-pmo">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-cobalt">How it works</p>
            <h2 id="process-title" className="display mt-4 text-5xl sm:text-7xl">
              Four steps. <span className="text-gradient">No fluff.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              One system, installed in order. Strategy before production, production before spend, and a report every month.
            </p>
          </Reveal>

          {/* Studio camera in a cobalt duotone. Decorative; gradient alone survives a missing file. */}
          <Reveal variant="right" delay={120} className="hidden lg:block">
            <Parallax speed={0.1}>
              <div className="duotone relative ml-auto aspect-[4/5] w-full max-w-xs border border-cobalt/30 glow-cobalt">
                <img
                  src="/images/studio_camera.jpg"
                  srcSet="/images/studio_camera_960.jpg 960w, /images/studio_camera.jpg 896w"
                  sizes="320px"
                  alt=""
                  width={896}
                  height={1152}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full"
                />
                <span className="absolute bottom-4 left-4 z-10 bg-background/80 px-3 py-1.5 font-label text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
                  Produced weekly
                </span>
              </div>
            </Parallax>
          </Reveal>
        </div>

        <div className="mt-14">
          <span aria-hidden="true" className="block h-[3px] w-full bg-gradient-ice-cobalt" />

          <Reveal stagger={120} delay={60}>
            <ol className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {site.process.map((step) => (
                <li
                  key={step.step}
                  data-reveal-child=""
                  className="card-tilt card-tilt-cobalt group relative flex h-full flex-col border border-border bg-card/70 p-7 backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="display block text-7xl leading-none text-gradient transition-opacity duration-300 sm:text-8xl"
                  >
                    {step.step}
                  </span>
                  <span className="sr-only">Step {step.step}: </span>
                  <span aria-hidden="true" className="cobalt-rule mt-6 block w-8 transition-all duration-300 group-hover:w-14" />
                  <h3 className="mt-5 font-mark text-lg font-semibold uppercase tracking-wide text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
