import { SEO } from "@/components/shared/SEO";
import { Hero } from "@/components/home/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { Partner } from "@/components/home/Partner";
import { Services } from "@/components/home/Services";
import { ProofBar } from "@/components/home/ProofBar";
import { CaseStudy } from "@/components/work/CaseStudy";
import { Testimonial } from "@/components/work/Testimonial";
import { Process } from "@/components/home/Process";
import { Packages } from "@/components/home/Packages";
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/forms/ContactCTA";
import { site } from "@/data/site";

/**
 * Home. Section order follows the redesign brief:
 * Hero → Marquee → Partner (#approach) → Capabilities (#services) → Results (#results: proof band,
 * concise case study, testimonial) → Process → Packages → About (#about) → FAQ → Contact (#contact).
 */
const Index = () => (
  <>
    <SEO title="PMO Media — Real Estate Marketing, Done Right" description={site.description} path="/" />
    <Hero />
    <MarqueeBand />
    <Partner />
    <Services />
    {/* #results wraps the three proof sections so the nav anchor lands on the proof band. */}
    <div id="results">
      <ProofBar />
      <CaseStudy />
      <Testimonial />
    </div>
    <Process />
    <Packages />
    <About />
    <FAQ />
    <ContactCTA />
  </>
);

export default Index;
