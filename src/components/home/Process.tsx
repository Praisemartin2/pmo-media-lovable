import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Process timeline. Four steps from site.process, horizontal on lg.
 * The one crimson element in this section is the rule across the top of the grid.
 * Step numbers stay ice; dividers stay border-border.
 */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title" className="display mt-4 text-5xl sm:text-6xl">
            FOUR STEPS. NO FLUFF.
          </h2>
        </Reveal>

        <div className="mt-14">
          <span aria-hidden="true" className="block h-[3px] w-full bg-primary" />

          <ol className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {site.process.map((step, i) => (
              <li
                key={step.step}
                className="border-border lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <Reveal delay={i * 90} className="h-full">
                  <span className="display block text-6xl text-foreground">{step.step}</span>
                  <h3 className="mt-5 font-mark text-lg uppercase tracking-wide text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
