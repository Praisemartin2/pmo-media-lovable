import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { CaseStudy } from "@/components/work/CaseStudy";
import { WorkGrid } from "@/components/work/WorkGrid";
import { Testimonial } from "@/components/work/Testimonial";
import { work, caseStudy } from "@/data/portfolio";
import { site } from "@/data/site";

const DESCRIPTION = `Selected work PMO Media shipped for ${caseStudy.client}: ${work.length} of the 50 pieces produced in 8 weeks across four platforms — an original animated series, podcast clip reels, carousels, statics and community recaps.`;

/**
 * /work — the full portfolio page.
 * Page header → case study → filterable grid → testimonial → closing CTA.
 */
const Work = () => (
  <>
    <SEO title="Work — PMO Media" description={DESCRIPTION} path="/work" />

    {/* Compact page header. Crimson-free; the case study below carries its own accent. */}
    <section aria-labelledby="work-page-title" className="pt-20 sm:pt-28">
      <div className="container-pmo">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">Portfolio</p>
          <h1 id="work-page-title" className="display mt-4 text-5xl sm:text-7xl">
            SELECTED WORK FOR {caseStudy.client.toUpperCase()}.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {work.length} selected pieces — series, reels, carousels, statics and recaps — from a 50-piece, 8-week
            engagement in {caseStudy.market}.
          </p>
        </Reveal>
      </div>
    </section>

    <CaseStudy />
    <WorkGrid items={work} showFilters />
    <Testimonial />

    {/* Closing CTA. The one crimson accent is the primary button. */}
    <section id="next" aria-labelledby="next-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="border-t border-border pt-16 sm:pt-20">
          <p className="eyebrow">Next</p>
          <h2 id="next-title" className="display mt-4 text-5xl sm:text-7xl">
            NOW BUILD YOURS.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Start with the brief. It leads to a free 20-minute call with {site.principal.name} — no deck, no pitch, one
            principal on every call.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/brief" className="btn-primary">
              Start the brief
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`mailto:${site.email}`} className="btn-ghost">
              Email us
            </a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            {site.email} · {site.city} · {site.serving}
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default Work;
