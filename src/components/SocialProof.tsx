import { Star } from "lucide-react";

const stats: [string, string][] = [
  ["600%", "Avg ROI"],
  ["$340M", "Volume Closed"],
  ["40+", "Active Brands"],
  ["1,160%", "Lead Lift"],
  ["4.9★", "Partner Rating"],
  ["94 days", "To First Close"],
];

interface Quote {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

const quotes: Quote[] = [
  {
    quote:
      "PMO stopped treating my business like a content problem and started treating it like an infrastructure problem. My calendar is full of showings, not marketing meetings.",
    name: "Marcus Ellison",
    title: "Principal · Ellison Real Estate Group · Atlanta",
    initials: "ME",
  },
  {
    quote:
      "We'd worked with three 'agencies' before PMO. Praise was the first who understood that we sell houses, not impressions. Four months in and we're drowning in qualified inbound.",
    name: "Lena Halcyon",
    title: "CEO · Halcyon Properties · Washington, DC",
    initials: "LH",
  },
  {
    quote:
      "The listing launch system paid for the retainer in 60 days. Every new listing hits the market with a film, a landing page, and paid traffic inside 72 hours.",
    name: "Omar Reyes",
    title: "Founder · Meridian & Co. · Charleston",
    initials: "OR",
  },
];

export default function SocialProof() {
  return (
    <section id="results" className="bg-bone-50" style={{ padding: "96px 0" }}>
      <div className="container-x">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="caps text-forest-600 mb-3.5">Real results, real success stories</div>
          <h2 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-4">
            Don't take our word for it.
          </h2>
          <p className="text-[18px] leading-[1.55] text-ink-700 max-w-[600px] mx-auto mt-3.5">
            Hear from realtors and brokerages we've empowered with brand, content, and a lead system that actually closes.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-18 py-10 border-y border-ink-900/[0.22]" style={{ marginBottom: 72 }}>
          {stats.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold text-[36px] tracking-[-0.025em] leading-none text-forest-600">
                {n}
              </div>
              <div className="font-mono text-[10px] font-medium tracking-caps uppercase text-ink-600 mt-2">
                {l}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="bg-bone-100 p-8 px-7 rounded-md border border-ink-900/10 flex flex-col gap-4.5"
              style={{ gap: 18 }}
            >
              <div className="text-forest-600 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-display text-[17px] leading-[1.5] text-ink-800 flex-1">"{q.quote}"</p>
              <div className="flex items-center gap-3 pt-3.5 border-t border-ink-900/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-400 to-forest-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {q.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink-900">{q.name}</div>
                  <div className="text-xs text-ink-600 mt-0.5">{q.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}