import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ValueProp from "./components/ValueProp";
import Why from "./components/Why";
import Packages from "./components/Packages";
import Recognition from "./components/Recognition";
import SocialProof from "./components/SocialProof";
import FeatureHighlight from "./components/FeatureHighlight";
import FeaturedIn from "./components/FeaturedIn";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import LeadForm from "./components/LeadForm";
import Scheduler from "./components/Scheduler";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const openCal = () => setCalOpen(true);

  return (
    <div>
      <Nav onOpenForm={openForm} />
      <Hero onOpenForm={openForm} />
      <ValueProp onOpenForm={openForm} />
      <Why />
      <Packages onOpenForm={openForm} />
      <Recognition />
      <SocialProof />
      <FeatureHighlight
        eyebrow="Capture more leads"
        title="A high-converting website that does the selling for you."
        desc="Editorial design, mobile-first, conversion-tuned. We build sites that read like a luxury magazine and convert like a sales page."
        bullets={[
          "IDX integration for active listings",
          "Lead capture forms wired to your CRM",
          "On-brand photography & editorial layout",
          "Local SEO baked into every page",
        ]}
        ctaText="Build my website"
        onCta={openForm}
        visualTitle="Editorial real estate site"
        visualMeta={[
          ["+1,160%", "Lead lift"],
          ["94 days", "To first close"],
        ]}
      />
      <FeatureHighlight
        reverse
        altBg
        eyebrow="Convert more leads, faster"
        title="A CRM & content engine that runs without you."
        desc="GoHighLevel build, automated nurture, weekly content production, and reporting. The system shows up every week — you show up to the closings."
        bullets={[
          "GoHighLevel CRM build & automation",
          "Weekly short-form video + editorial photo",
          "SMS + email nurture sequences",
          "Monthly performance dashboard",
        ]}
        ctaText="See the system"
        onCta={openForm}
        visualTitle="The PMO Engine"
        visualMeta={[
          ["$340M", "Closed in 2024"],
          ["4.9★", "Partner rating"],
        ]}
      />
      <FeaturedIn />
      <FinalCTA onOpenForm={openForm} onBookCall={openCal} />
      <Footer />
      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} />
      <Scheduler open={calOpen} onClose={() => setCalOpen(false)} />
    </div>
  );
}