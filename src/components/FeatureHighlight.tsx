import { Check, ArrowRight } from "lucide-react";

interface Props {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  ctaText: string;
  onCta: () => void;
  reverse?: boolean;
  visualTitle: string;
  visualMeta: [string, string][];
  altBg?: boolean;
}

export default function FeatureHighlight({
  eyebrow,
  title,
  desc,
  bullets,
  ctaText,
  onCta,
  reverse = false,
  visualTitle,
  visualMeta,
  altBg = false,
}: Props) {
  return (
    <section className={altBg ? "bg-bone-50" : "bg-bone-200"} style={{ padding: "96px 0" }}>
      <div className="container-x">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-18 items-center ${
            reverse ? "" : ""
          }`}
          style={{ gap: 72 }}
        >
          <div className={reverse ? "md:order-2" : ""}>
            <div className="caps text-forest-600 mb-4.5" style={{ marginBottom: 18 }}>{eyebrow}</div>
            <h2 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-5">
              {title}
            </h2>
            <p className="text-ink-700 text-[17px] leading-[1.6] mb-7">{desc}</p>
            <ul className="list-none mb-8 flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3 items-start text-[15px] text-ink-800">
                  <Check size={18} strokeWidth={2.5} className="flex-shrink-0 text-forest-600 mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary" onClick={onCta}>
              {ctaText}
              <ArrowRight size={16} />
            </button>
          </div>
          <div
            className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-forest-700 to-forest-900 shadow-[0_24px_48px_-24px_rgba(14,46,30,0.4)] ${
              reverse ? "md:order-1" : ""
            }`}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(127,178,150,0.3), transparent 60%), repeating-linear-gradient(90deg, transparent 0 60px, rgba(255,255,255,0.04) 60px 61px), repeating-linear-gradient(0deg, transparent 0 60px, rgba(255,255,255,0.04) 60px 61px)",
              }}
            />
            <div className="absolute inset-0 p-9 flex flex-col justify-between text-bone-100 z-[2]">
              <span className="self-start px-3 py-1.5 bg-white/[0.12] border border-white/[0.22] rounded-full font-mono text-[10px] font-medium tracking-caps uppercase">
                Live partner
              </span>
              <div>
                <div className="font-display font-bold text-[32px] tracking-[-0.02em] leading-[1.1]">
                  {visualTitle}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-5 mt-5 border-t border-white/[0.18]">
                  {visualMeta.map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display font-bold text-[28px] tracking-[-0.02em] leading-none text-forest-300">
                        {n}
                      </div>
                      <div className="font-mono text-[10px] font-medium tracking-caps uppercase text-bone-100/70 mt-1.5">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}