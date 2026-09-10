import { type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Testimonial } from "@/components/work/Testimonial";
import { caseStudy } from "@/data/portfolio";
import { site } from "@/data/site";

const CTA_IMAGE = "/images/bokeh_lights.jpg";
const CTA_IMAGE_960 = "/images/bokeh_lights_960.jpg";

/** If the photo is missing the wine band behind it is the design — just drop the broken img. */
const hideBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

const DESCRIPTION = `How PMO Media built the brand system and weekly content engine for ${caseStudy.client} in ${caseStudy.market} — an original animated series, podcast clip reels and carousels across four platforms, with the client's own account of the results.`;

/**
 * /work — results page.
 * Page header → concise case study → testimonial → closing CTA. No clip grid: the client hand-picks clips later.
 * Mood alternates like the home page: navy header band → black case study / testimonial → wine + bokeh close.
 */
const Work = () => (
  <>
    <SEO title="Results — PMO Media" description={DESCRIPTION} path="/work" />

    {/* Page header on a navy band with an angled bottom edge; the case study below carries the accent. */}
    <section
      aria-labelledby="work-page-title"
      className="band-navy clip-angle-bottom relative pt-20 pb-[calc(5rem+var(--angle))] sm:pt-28 sm:pb-[calc(6rem+var(--angle))]"
    >
      <div className="container-pmo">
        <Reveal className="max-w-4xl">
          <p className="eyebrow text-cobalt">Results</p>
          <h1 id="work-page-title" className="display mt-4 text-5xl sm:text-7xl">
            BUILT FOR {caseStudy.client.toUpperCase()}.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            One brand system, one weekly engine, four platforms — and the client&rsquo;s own account of what changed in{" "}
            {caseStudy.market}.
          </p>
        </Reveal>
      </div>
    </section>

    <CaseStudy />
    <Testimonial />

    {/* Closing CTA: bokeh photo (parallax) over a wine→ink→navy gradient, angled top edge. The primary button carries the crimson. */}
    <section
      id="next"
      aria-labelledby="next-title"
      className="clip-angle-top relative overflow-hidden pt-[calc(var(--angle)+4rem)] pb-20 sm:pt-[calc(var(--angle)+6rem)] sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,hsl(var(--wine))_0%,hsl(var(--ink))_50%,hsl(var(--navy))_100%)]"
      >
        <Parallax speed={0.12} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
          <img
            src={CTA_IMAGE}
            srcSet={`${CTA_IMAGE_960} 960w, ${CTA_IMAGE} 1344w`}
            sizes="100vw"
            width={1344}
            height={768}
            alt=""
            loading="lazy"
            decoding="async"
            onError={hideBrokenImage}
            className="h-full w-full object-cover opacity-70"
          />
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--ink)/0.55)_0%,hsl(var(--ink)/0.8)_60%,hsl(var(--ink)/0.96)_100%)]" />
      </div>

      <div className="container-pmo relative">
        <Reveal>
          <p className="eyebrow text-amber">Next</p>
          <h2 id="next-title" className="display mt-4 text-5xl sm:text-7xl">
            NOW BUILD YOURS.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{site.readyToScale.text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to={site.hero.primary.href} className="btn-primary">
              {site.hero.primary.label}
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
