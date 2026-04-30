import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

interface Props {
  onOpenForm: () => void;
}

export default function Nav({ onOpenForm }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-bone-50 border-b border-ink-900/10 transition-shadow duration-200 ease-out-expo ${
        scrolled ? "shadow-[0_1px_0_rgba(22,22,22,0.22),0_8px_24px_-16px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="flex justify-between items-center max-w-[1320px] mx-auto px-8 py-3.5">
        <a href="#" className="flex items-center gap-3 text-ink-900 no-underline">
          <img src="/logo.png" alt="PMO Media LLC" className="h-[38px] w-auto" />
          <span className="font-display font-bold text-base tracking-[0.04em] text-ink-900">
            PMO MEDIA
          </span>
        </a>
        <div className="flex gap-3 items-center">
          <a
            href="tel:+12027094554"
            className="hidden md:inline-flex items-center gap-2 text-ink-900 font-semibold text-sm px-3.5 py-2.5 rounded hover:bg-bone-200 transition-colors"
          >
            <Phone size={16} strokeWidth={1.8} />
            <span>(202) 709-4554</span>
          </a>
          <button className="btn btn-primary btn-sm" onClick={onOpenForm}>
            Get a Free Strategy Call
          </button>
        </div>
      </div>
    </nav>
  );
}