/**
 * PMO Media — site copy and structured content.
 *
 * Positioning: a brand architecture and growth firm for real estate. Voice is "we" / "PMO Media" /
 * "our strategy team"; the founder's name appears only in `principal`.
 *
 * `proof` shape (count-up friendly — see components/motion/CountUp):
 *   { value: string;     // the number that animates, as displayed: "5.0", "50", "1,500". Thousands
 *                        //   separators and one decimal are fine; the animator parses the digits.
 *     prefix?: string;   // rendered instantly before the number, e.g. "100→"
 *     suffix?: string;   // rendered instantly after the number, e.g. "+"
 *     label: string;     // short noun phrase under the number
 *     detail?: string;   // one supporting line (source / window / platforms)
 *     star?: boolean }   // true only for the Google rating → render a star glyph beside the value
 *
 * Hard rule from the client: the five entries below are the ONLY proof points the site may show.
 */
export type ProofStat = {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
  star?: boolean;
};

export const site = {
  name: "PMO Media",
  legalName: "PMO Media LLC",
  tagline: "Real Estate Marketing, Done Right.",
  description:
    "PMO Media is a brand architecture and growth firm for real estate. We design the brand, build the content engine and install the lead system for top-producing realtors, brokerages, teams and property companies — then run it weekly and report on it.",
  url: "https://www.pmo-media.com",
  email: "marketwithpmo@gmail.com",
  phone: "+1 (202) 709-4554",
  phoneHref: "tel:+12027094554",
  city: "Washington, DC",
  serving: "Serving markets nationwide",

  /** Home hero. H1 and sub are client-approved verbatim — do not edit. */
  hero: {
    eyebrow: "Brand architecture & growth for real estate",
    h1: "Get More Real Estate Leads with PMO Media.",
    sub: "Your real estate growth starts here. We build the brand, content engine, and lead system that turns top-producing realtors and brokerages into the obvious choice in their market.",
    primary: { label: "Get a Free Strategy Call", href: "/brief" },
    secondary: { label: "See Our Packages", href: "#packages" },
  },

  /** Marquee band between the hero and the partner section. Rendered with crimson diamonds between words. */
  marquee: ["Brand architecture", "Content engine", "Lead systems", "Listing launches", "CRM", "Reporting"],

  /** "A real partner — not another vendor." pinned split section (#approach). */
  partner: {
    headline: "A real partner — not another vendor.",
    intro:
      "Most real estate marketing is bought by the deliverable: a logo here, a reel there, an ad budget nobody reads the report on. We treat growth as infrastructure. Brand, content and pipeline are designed as one system, built once, run every week. Then measured against the only number that matters: qualified conversations with people ready to transact.",
    pillars: [
      {
        title: "Brand architecture",
        text: "Category, promise, voice and identity decided before a single post is made. Every asset that follows inherits the same system, so the market sees one firm, not a feed.",
      },
      {
        title: "Growth systems",
        text: "A weekly content engine wired to landing pages, acquisition campaigns and a CRM that captures, nurtures and books. Attention is engineered into appointments, not left to the algorithm.",
      },
      {
        title: "Measured, weekly",
        text: "Production ships on a schedule. Performance is reviewed every week and reported every month. What compounds gets more budget; what stalls gets cut. No guessing, no vanity metrics.",
      },
    ],
  },

  /** Results band. The five allowed proof points — see the shape note at the top of this file. */
  proof: [
    { value: "5.0", label: "Google rating", detail: "Google Business Profile", star: true },
    { value: "50", label: "pieces of content", detail: "produced & published in 8 weeks" },
    { value: "1,500", prefix: "100→", suffix: "+", label: "followers", detail: "in under 12 months (client-reported)" },
    { value: "5", label: "episode original series", detail: "an animated show built for one brand" },
    { value: "4", label: "platforms", detail: "Instagram · TikTok · YouTube · LinkedIn" },
  ] as ProofStat[],

  /** The six capabilities (#services). `image` marks the one hero card. */
  services: [
    {
      slug: "brand-strategy",
      title: "Brand Strategy & Positioning",
      lead: "The category you own, the promise you make and the language that carries both — decided before anything is designed.",
      bullets: ["Brand audit & competitive positioning", "Category, promise & messaging architecture", "Voice, tone & narrative system"],
      image: "/images/home_dusk.jpg",
    },
    {
      slug: "identity",
      title: "Identity & Design Systems",
      lead: "A visual system built to be used every week by people who are not designers — and still look like a firm.",
      bullets: ["Logo & mark system", "Templates, type & colour system", "Brand book & photography direction"],
    },
    {
      slug: "content-engine",
      title: "Content Engine",
      lead: "Weekly production that runs whether or not you filmed this week. Short-form, clipping, carousels and original series — on a schedule.",
      bullets: ["Weekly short-form video", "Podcast clipping & carousels", "Original series, produced and published"],
    },
    {
      slug: "demand",
      title: "Demand & Lead Systems",
      lead: "Acquisition built on the brand, not bolted on. Every listing and every dollar is tracked to a conversation, not an impression.",
      bullets: ["Listing launch campaigns", "Meta + Google acquisition & retargeting", "Conversion landing pages"],
    },
    {
      slug: "web",
      title: "Web & Digital Experience",
      lead: "Editorial websites that read like a publication and convert like a landing page — with IDX where it earns its place.",
      bullets: ["Editorial brand websites", "IDX & listing integration", "Conversion architecture & speed"],
    },
    {
      slug: "intelligence",
      title: "Growth Intelligence",
      lead: "The CRM, the nurture and the numbers. If it cannot be measured, it does not get sold.",
      bullets: ["GoHighLevel CRM build & nurture", "KPI dashboards & monthly reporting", "Quarterly strategy reviews"],
    },
  ],

  /** "Ready to scale?" intro used in the contact section's left column. Client-approved copy. */
  readyToScale: {
    headline: "Ready to scale?",
    text: "Schedule your free 20-minute strategy call. No deck. No pitch. We diagnose your positioning, your market, and what we'd build if we partnered tomorrow.",
  },

  /** Final CTA headline. Client-approved verbatim. */
  finalCta: {
    headline: "Your market is deciding right now. Make them decide on you.",
  },

  /** Company-level About section (#about). */
  company: {
    headline: "Built like infrastructure. Run like a newsroom.",
    mission:
      "PMO Media builds the real estate brands the rest of the market is measured against. We are a strategy-led firm: brand architecture first, then a production system that publishes every week, then a lead system that turns attention into appointments. Based in Washington, DC, working with realtors, brokerages, teams and property companies nationwide.",
    values: [
      {
        title: "Systems over heroics",
        text: "A brand that depends on someone's free time fails on the first busy month. We build calendars, templates and pipelines so output is automatic and quality is repeatable.",
      },
      {
        title: "Senior on every account",
        text: "Strategy and creative direction are led by the principal. There is no hand-off to a junior team once the contract is signed.",
      },
      {
        title: "Reported, not reassured",
        text: "Every engagement carries KPIs, a monthly report and a quarterly strategy review. You will always know what is working, what is not, and what we are changing.",
      },
    ],
  },

  /** Founder sub-block inside About. The only place the founder's name is used in copy. */
  principal: {
    name: "Praise Martin-Oguike",
    title: "Founder & Principal",
    bio:
      "Praise Martin-Oguike was born in Abia State, Nigeria, raised in Woodbridge, New Jersey, and played linebacker at Temple University before a professional career that ran through the Miami Dolphins, the Arizona Cardinals, the XFL's Seattle Dragons and three seasons with the CFL's Ottawa Redblacks. He built PMO Media on what that career taught him: systems beat talent, preparation is a weekly discipline, and one small miss costs the whole team. A certified digital marketer with a background in digital strategy, content and analytics — and time inside real estate operations at Harbor Group Management — he leads strategy and creative direction on every PMO engagement.",
    linkedin: "https://www.linkedin.com/in/praise-martin-oguike/",
  },

  social: {
    instagram: "https://www.instagram.com/pmo.media",
    youtube: "https://www.youtube.com/@pmomedia",
    linkedin: "https://www.linkedin.com/company/pmo-media",
  },

  nav: [
    { label: "Capabilities", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "Results", href: "/#results" },
    { label: "Packages", href: "/#packages" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],

  packages: [
    {
      name: "Establish",
      tag: "Get the foundation right",
      blurb: "For agents who need a brand before they need volume.",
      features: ["Brand audit & positioning", "Logo + visual identity", "Editorial website (1-pager)", "Content pillars + voice guide", "Photography direction"],
      popular: false,
    },
    {
      name: "Grow",
      tag: "The weekly engine",
      blurb: "Everything in Establish, plus the content system that runs every week.",
      features: ["Multi-page website + IDX", "Weekly short-form content", "Editorial photography (monthly)", "GoHighLevel CRM build", "Lead nurture sequences", "Monthly reporting"],
      popular: true,
    },
    {
      name: "Expand",
      tag: "For top producers",
      blurb: "Everything in Grow, plus launches and paid traffic.",
      features: ["Listing launch system", "Paid acquisition (Meta + Google)", "YouTube Shorts engine", "Email & SMS campaigns", "Dedicated success lead"],
      popular: false,
    },
    {
      name: "Scale",
      tag: "Brokerages & teams",
      blurb: "Everything in Expand, built for multi-agent brands.",
      features: ["Brand retargeting system", "Recruitment marketing", "Multi-agent content engine", "Quarterly strategy sessions", "Priority creative production"],
      popular: false,
    },
  ],

  process: [
    { step: "01", title: "Diagnose", text: "A free 20-minute call. No deck, no pitch — we read your positioning, your market and your funnel, and tell you what we'd build." },
    { step: "02", title: "Build the system", text: "Brand tokens, content pillars, a production calendar and the pipelines that make weekly output automatic." },
    { step: "03", title: "Run it weekly", text: "Reels, carousels, series, launches — produced, QA'd and published on a schedule your market can't ignore." },
    { step: "04", title: "Measure & compound", text: "Every post tracked, every month reported. What works gets more; what doesn't gets cut." },
  ],

  faqs: [
    { q: "What does a retainer look like?", a: "Retainers run on a 90-day minimum, then month-to-month. Stay because it works." },
    { q: "Do I have to be on camera?", a: "No. Our client's most-watched work included podcast clips, archive footage and an original animated series built around their message." },
    { q: "How fast can we start?", a: "Most engagements kick off within two weeks of the strategy call; the first content ships in week one." },
    { q: "Who actually does the work?", a: "A principal-led strategy team with an AI-augmented production system. Senior people on every account, no hand-offs to juniors." },
  ],
};
