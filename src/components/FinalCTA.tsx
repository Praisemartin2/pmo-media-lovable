import { ArrowRight, Calendar } from "lucide-react";

interface Props {
  onOpenForm: () => void;
  onBookCall: () => void;
}

export default function FinalCTA({ onOpenForm, onBookCall }: Props) {
  return (
    <section
      className="bg-gradient-to-br from-ink-900 to-ink-1000 text-bone-100 text-center"
      style={{ padding: "96px 0" }}
    >
      <div className="container-x">
        <h2 className="font-display font-bold text-white text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mb-5">
          Your market is <span className="text-forest-300 italic font-normal">deciding</span> right now. Make them decide on you.
        </h2>
        <p className="text-[18px] text-bone-100/[0.78] max-w-[600px] mx-auto mb-9">
          Two ways in. Send us a brief — we respond in 24 hours with a real human reply. Or book a 20-minute discovery call.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="btn btn-primary" onClick={onOpenForm}>
            Start the Brief
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-outline-light" onClick={onBookCall}>
            <Calendar size={16} />
            Book 20 min
          </button>
        </div>
      </div>
    </section>
  );
}