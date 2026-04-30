import { ArrowRight } from "lucide-react";

interface Props {
  onOpenForm: () => void;
}

export default function Hero({ onOpenForm }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-forest-700 to-forest-900 text-bone-50 py-24 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(127,178,150,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(31,90,58,0.4) 0%, transparent 50%)",
        }}
      />
      <div className="container-x relative">
        <div className="max-w-[880px]">
          <span className="inline-block px-3.5 py-2 bg-white/[0.08] border border-white/[0.18] rounded-full text-forest-100 caps mb-7">
            Real estate marketing partner
          </span>
          <h1 className="font-display font-bold text-white text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.03em] mb-6">
            Get More Real Estate Leads{" "}
            <span className="text-forest-300 italic font-normal">with PMO Media.</span>
          </h1>
          <p className="text-[19px] leading-[1.55] text-bone-100/[0.88] max-w-[620px] mb-9">
            Your real estate growth starts here. We build the brand, content engine, and lead system
            that turns top-producing realtors and brokerages into the obvious choice in their market.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button className="btn btn-light" onClick={onOpenForm}>
              Get a Free Strategy Call
              <ArrowRight size={16} />
            </button>
            <a href="#packages" className="btn btn-outline-light">
              See Our Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}