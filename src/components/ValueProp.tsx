import { Check, ArrowRight } from "lucide-react";

interface Props {
  onOpenForm: () => void;
}

const benefits: [string, string][] = [
  ["Free brand & marketing audit", "We review your current funnel, content, and conversion gaps in real time."],
  ["Custom growth plan", "A written 30-60-90 day roadmap, scoped to your market and pipeline goals."],
  ["No long-term lock-in", "Retainers run on a 90-day minimum, then month-to-month. Stay because it works."],
  ["One principal on every account", "Praise on every call. No agency layers, no account-manager telephone game."],
];

export default function ValueProp({ onOpenForm }: Props) {
  return (
    <section className="py-22 md:py-16 bg-bone-50" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-9 md:gap-16 items-center">
          <div>
            <div className="caps text-forest-600 mb-3.5">Ready to scale?</div>
            <h2 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-4">
              Schedule your free 20-minute strategy call.
            </h2>
            <p className="text-[18px] leading-[1.55] text-ink-700 mt-4 mb-7">
              No deck. No pitch. We diagnose your positioning, your market, and what we'd build if we
              partnered tomorrow.
            </p>
            <button className="btn btn-primary" onClick={onOpenForm}>
              Get Your Free Strategy Call
              <ArrowRight size={16} />
            </button>
          </div>
          <ul className="list-none flex flex-col gap-4">
            {benefits.map(([h, s]) => (
              <li key={h} className="flex gap-3.5 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-600 text-white flex items-center justify-center">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <div className="text-base leading-[1.5] text-ink-800">
                  <strong className="text-ink-900 font-semibold">{h}</strong> — {s}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}