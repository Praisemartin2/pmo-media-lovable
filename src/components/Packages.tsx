import { Check } from "lucide-react";

interface Pkg {
  name: string;
  tagline: string;
  features: string[];
  featured: boolean;
}

const pkgs: Pkg[] = [
  {
    name: "Establish",
    tagline: "Get the foundation right",
    features: [
      "Brand audit & positioning",
      "Logo + visual identity",
      "Editorial website (1-pager)",
      "Content pillars + voice guide",
      "Photography direction",
      "90-day strategy roadmap",
    ],
    featured: false,
  },
  {
    name: "Grow",
    tagline: "Most popular",
    features: [
      "Everything in Establish",
      "Multi-page website + IDX",
      "Weekly short-form content",
      "Editorial photography (monthly)",
      "GoHighLevel CRM build",
      "Lead nurture sequences",
      "Monthly reporting",
    ],
    featured: true,
  },
  {
    name: "Expand",
    tagline: "For top producers",
    features: [
      "Everything in Grow",
      "Listing launch system",
      "Paid acquisition (Meta + Google)",
      "YouTube Shorts engine",
      "Email & SMS campaigns",
      "Dedicated success lead",
    ],
    featured: false,
  },
  {
    name: "Conquer",
    tagline: "Brokerages & teams",
    features: [
      "Everything in Expand",
      "Brand retargeting system",
      "Recruitment marketing",
      "Multi-agent content engine",
      "Quarterly strategy sessions",
      "Priority creative production",
    ],
    featured: false,
  },
];

interface Props {
  onOpenForm: () => void;
}

export default function Packages({ onOpenForm }: Props) {
  return (
    <section id="packages" className="bg-bone-50" style={{ padding: "88px 0" }}>
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-14">
          <div className="caps text-forest-600 mb-3.5">Packages</div>
          <h2 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-4">
            Find your fit.
          </h2>
          <p className="text-[18px] leading-[1.55] text-ink-700 max-w-[620px] mx-auto mt-3.5">
            Every partnership is scoped to your market, pipeline, and offer. Pick the package closest to your goals — we'll send a custom proposal within 24 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pkgs.map((p) => {
            const featured = p.featured;
            return (
              <div
                key={p.name}
                className={`relative rounded-lg p-8 px-6 flex flex-col transition-all duration-200 ease-out-expo border ${
                  featured
                    ? "bg-ink-900 text-bone-100 border-ink-900 -translate-y-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-3"
                    : "bg-white border-ink-900/10 hover:-translate-y-1 hover:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.2)]"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-forest-600 text-white caps px-3.5 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="font-display font-bold text-2xl tracking-[-0.01em] mb-1.5">{p.name}</div>
                <div className={`caps mb-5 ${featured ? "text-forest-300" : "text-forest-600"}`}>
                  {p.tagline}
                </div>
                <div className={`h-px mb-5 ${featured ? "bg-bone-100/[0.18]" : "bg-ink-900/10"}`} />
                <ul className="list-none flex-1 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 items-start py-2 text-sm leading-[1.5]">
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        className={`flex-shrink-0 mt-1 ${featured ? "text-forest-300" : "text-forest-600"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full btn ${featured ? "btn-light" : "btn-secondary"}`}
                  onClick={onOpenForm}
                >
                  Request a Proposal
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}