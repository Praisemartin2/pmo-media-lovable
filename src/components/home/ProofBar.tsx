import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Full-width proof band under the hero. Four stats from site.proof.
 * The one crimson accent in this frame is the vertical rule on the left (lg+).
 */
export function ProofBar() {
  return (
    <section id="proof" aria-label="Proof points" className="relative border-y border-border bg-card">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1 bg-primary lg:block" />

      <div className="container-pmo">
        <Reveal>
          <dl className="grid grid-cols-1 gap-y-10 py-12 sm:grid-cols-2 sm:gap-x-8 sm:py-14 lg:grid-cols-4 lg:gap-x-0">
            {site.proof.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col border-border lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                {/* dt precedes dd in source for semantics; value is shown first via CSS order. */}
                <dt className="eyebrow order-2 mt-3">{stat.label}</dt>
                {/* Kept on one line and capped at lg so "100→1,500" cannot overrun its column into the next stat. */}
                <dd className="display order-1 whitespace-nowrap text-5xl sm:text-6xl lg:text-[clamp(2.25rem,3.4vw,3.75rem)]">{stat.value}</dd>
                <dd className="order-3 mt-1 text-sm text-muted-foreground">{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
