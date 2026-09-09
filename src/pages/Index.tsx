import { SEO } from "@/components/shared/SEO";
import { Hero } from "@/components/home/Hero";
import { ProofBar } from "@/components/home/ProofBar";
import { Services } from "@/components/home/Services";
import { CaseStudy } from "@/components/work/CaseStudy";
import { WorkGrid } from "@/components/work/WorkGrid";
import { Testimonial } from "@/components/work/Testimonial";
import { Process } from "@/components/home/Process";
import { Packages } from "@/components/home/Packages";
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/forms/ContactCTA";
import { site } from "@/data/site";
import { work } from "@/data/portfolio";

const Index = () => (
  <>
    <SEO title="PMO Media — Real Estate Marketing, Done Right" description={site.description} path="/" />
    <Hero />
    <ProofBar />
    <Services />
    <CaseStudy />
    <WorkGrid items={work.slice(0, 6)} showMoreHref="/work" />
    <Testimonial />
    <Process />
    <Packages />
    <About />
    <FAQ />
    <ContactCTA />
  </>
);

export default Index;
