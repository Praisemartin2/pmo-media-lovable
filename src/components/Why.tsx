import { Sparkles, Layers, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Card {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const cards: Card[] = [
  {
    Icon: Sparkles,
    title: "Editorial-grade brand",
    desc: "Positioning, voice, and visual identity that reads like a luxury magazine — not a yard sign. Your brand becomes the reason buyers and sellers pick you.",
  },
  {
    Icon: Layers,
    title: "Done-for-you content engine",
    desc: "Weekly short-form video, listing films, editorial photography, and narrative founder content. We produce, you show up. The system runs.",
  },
  {
    Icon: Target,
    title: "Results, measured & guaranteed",
    desc: "CRM-tracked leads, appointment-rate KPIs, weekly reporting. If we can't measure it, we don't sell it. Real dashboards, real numbers.",
  },
];

export default function Why() {
  return (
    <section id="why" className="bg-bone-200" style={{ padding: "88px 0" }}>
      <div className="container-x">
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <div className="caps text-forest-600 mb-3.5">Why PMO Media</div>
          <h2 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-4">
            A real partner — not another vendor.
          </h2>
          <p className="text-[18px] leading-[1.55] text-ink-700 max-w-[600px] mx-auto mt-3.5">
            We treat real estate as an infrastructure problem, not a content problem. Brand, system, and pipeline — built once, run weekly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group bg-bone-50 p-10 px-8 border border-ink-900/10 rounded-md transition-all duration-200 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] hover:border-forest-600"
            >
              <div className="w-14 h-14 rounded-lg bg-forest-50 text-forest-600 flex items-center justify-center mb-5">
                <c.Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-semibold text-[clamp(22px,2.4vw,28px)] leading-[1.2] tracking-[-0.015em] mb-3">
                {c.title}
              </h3>
              <p className="text-ink-700 leading-[1.55]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}