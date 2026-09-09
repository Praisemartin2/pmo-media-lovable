import { useSearchParams } from "react-router-dom";
import { Lock, Phone } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { BriefForm } from "@/components/forms/BriefForm";
import { site } from "@/data/site";

/**
 * /brief — the four-step intake. Reads ?package= (e.g. /brief?package=grow) and
 * hands it to the form as the default "package of interest".
 * Crimson on this page lives inside the form (the primary button).
 */
export default function Brief() {
  const [params] = useSearchParams();
  const presetPackage = params.get("package") ?? undefined;

  return (
    <>
      <SEO
        title="Start the brief — PMO Media"
        description="Four short steps. Tell PMO Media about your market, your business and what you need — Praise reads every brief personally."
        path="/brief"
      />

      <section id="brief" aria-labelledby="brief-title" className="py-20 sm:py-28">
        <div className="container-pmo">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Start a partnership</p>
            <h1 id="brief-title" className="display mt-4 text-5xl sm:text-7xl">
              FOUR SHORT STEPS. NO FLUFF.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              We read every brief personally. It leads to a free 20-minute call &mdash; no deck, no pitch.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <p className="flex max-w-2xl items-start gap-3 text-sm text-muted-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Your brief is private &mdash; routed directly to {site.email}. Nothing automated, nothing shared.
              </span>
            </p>

            <div className="mt-6 max-w-2xl border border-border bg-card p-6 sm:p-10">
              <BriefForm presetPackage={presetPackage} />
            </div>
          </Reveal>

          <Reveal delay={160} className="mt-10 max-w-2xl">
            <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mark text-sm uppercase tracking-wide text-foreground">Prefer to talk first?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  A free 20-minute call &mdash; no deck, no pitch. We read your positioning, your market and your
                  funnel, and tell you what we&rsquo;d build.
                </p>
              </div>
              <a href={site.phoneHref} className="btn-ghost shrink-0" aria-label={`Call PMO Media at ${site.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
