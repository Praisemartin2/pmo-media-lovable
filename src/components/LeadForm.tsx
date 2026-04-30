import { useEffect, useState } from "react";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  role: string;
  volume: string;
  market: string;
  services: string[];
  budget: string;
  timeline: string;
  handle: string;
  pain: string;
  source: string;
}

const emptyData: FormData = {
  name: "",
  business: "",
  email: "",
  phone: "",
  role: "",
  volume: "",
  market: "",
  services: [],
  budget: "",
  timeline: "",
  handle: "",
  pain: "",
  source: "",
};

const steps = [
  { k: "who", t: "Who are we talking to?", sub: "The basics. One minute." },
  { k: "biz", t: "Tell us about the business.", sub: "So we can size the opportunity." },
  { k: "need", t: "What do you need from PMO?", sub: "Pick what matters. We scope from here." },
  { k: "ctx", t: "Context & timing.", sub: "Last details, then we respond in 24 hours." },
] as const;

const services = [
  "Brand architecture",
  "Website build",
  "Listing launch system",
  "Short-form video",
  "Editorial photography",
  "Paid acquisition",
  "CRM / GoHighLevel",
  "SEO & local",
  "Email & SMS",
  "Advisory retainer",
];

const fieldInputCls =
  "w-full bg-white border border-ink-900/[0.22] rounded px-3.5 py-3 font-sans text-[15px] text-ink-900 transition-colors focus:outline-none focus:border-forest-600 focus:ring-[3px] focus:ring-forest-600/[0.12]";
const fieldLabelCls = "caps text-ink-600 mb-1.5 block";

export default function LeadForm({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyData);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));
  const toggle = (v: string) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(v) ? d.services.filter((x) => x !== v) : [...d.services, v],
    }));
  const reset = () => {
    setStep(0);
    setSubmitted(false);
    setData(emptyData);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && reset();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const canAdvance = () => {
    if (step === 0) return !!(data.name && data.email && data.phone);
    if (step === 1) return !!(data.business && data.role && data.market);
    if (step === 2) return data.services.length > 0;
    if (step === 3) return !!data.timeline;
    return true;
  };
  const submit = () => setSubmitted(true);
  const progress = submitted ? 1 : (step + 1) / steps.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] bg-ink-1000/[0.72] backdrop-blur-md flex items-center justify-center animate-fadein"
    >
      <div className="bg-bone-50 rounded-lg max-w-[1080px] w-[96vw] max-h-[94vh] overflow-hidden grid grid-cols-1 md:grid-cols-[360px_1fr] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] animate-fadeup">
        <aside className="hidden md:flex bg-gradient-to-b from-forest-700 to-forest-900 text-bone-100 p-9 px-8 flex-col justify-between">
          <div>
            <div className="caps text-forest-300">§ Start a partnership</div>
            <h3 className="font-display font-bold text-[32px] leading-[1.1] tracking-[-0.02em] text-white mt-4.5 mb-3.5">
              Four short steps. <span className="text-forest-300 italic font-normal">No fluff.</span>
            </h3>
            <p className="text-sm text-bone-100/85 leading-[1.55]">
              We read every brief personally. Expect a written reply from Praise within 24 hours — often same day.
            </p>
            <div className="mt-8 pt-6 border-t border-bone-100/[0.18]">
              {steps.map((s, i) => (
                <div
                  key={s.k}
                  className="flex items-center gap-3.5 py-2.5"
                  style={{ opacity: submitted ? 0.4 : i === step ? 1 : i < step ? 0.7 : 0.45 }}
                >
                  <div
                    className={`w-6.5 h-6.5 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold ${
                      i <= step ? "border border-forest-300" : "border border-bone-100/30"
                    } ${i < step ? "bg-forest-300 text-forest-900" : "text-bone-100"}`}
                    style={{ width: 26, height: 26 }}
                  >
                    {i < step ? (
                      <Check size={12} strokeWidth={2.5} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </div>
                  <div className="text-sm font-medium text-bone-100">
                    {s.t.replace("?", "").split(" ").slice(0, 3).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="caps text-bone-100/50 mb-2">Your brief is private</div>
            <div className="text-[13px] text-bone-100/75 leading-[1.55]">
              Routed directly to praise@pmo-media.com. Nothing automated. Nothing shared.
            </div>
          </div>
        </aside>
        <div className="p-7 px-9 flex flex-col overflow-hidden max-h-[94vh]">
          <div className="flex justify-between items-center mb-3.5">
            <div className="caps text-ink-600">
              {submitted ? "Submitted" : `Step ${step + 1} of ${steps.length}`}
            </div>
            <button
              onClick={reset}
              aria-label="Close"
              className="bg-transparent border border-ink-900/[0.22] w-9 h-9 rounded flex items-center justify-center transition-colors hover:bg-ink-900 hover:text-bone-100 hover:border-ink-900"
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-1 bg-ink-900/10 rounded mb-6 overflow-hidden">
            <div
              className="h-full bg-forest-600 transition-[width] duration-300 ease-out-expo"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex-1 overflow-auto pr-1.5">
            {submitted ? (
              <div className="pt-5 animate-fadeup">
                <div className="inline-block px-3.5 py-1.5 bg-forest-50 text-forest-700 rounded-full caps">
                  Received
                </div>
                <h3 className="font-display font-bold text-[clamp(32px,4.2vw,48px)] leading-[1.1] tracking-[-0.025em] mt-4.5">
                  We've got it, {data.name.split(" ")[0] || "friend"}.
                </h3>
                <p className="text-base leading-[1.6] text-ink-700 mt-4 max-w-[580px]">
                  Your brief is in Praise's inbox. You'll hear back — with a real human response — inside 24 hours. Usually sooner.
                </p>
                <div className="mt-7 p-6 bg-bone-100 rounded-md">
                  <div className="caps text-forest-600">Next step</div>
                  <div className="font-display text-xl font-semibold mt-2">
                    A 20-minute discovery call.
                  </div>
                  <p className="text-sm text-ink-700 mt-2 leading-[1.55]">
                    If it's a fit, we'll send a calendar link with our reply. If it's not, we'll tell you who we'd recommend instead.
                  </p>
                </div>
                <div className="mt-6">
                  <button className="btn btn-primary" onClick={reset}>
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div key={step} className="animate-fadeup">
                <h3 className="font-display font-bold text-[clamp(24px,3vw,32px)] leading-[1.04] tracking-[-0.025em] mb-1.5">
                  {steps[step].t}
                </h3>
                <p className="text-[15px] text-ink-600 mb-6">{steps[step].sub}</p>

                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4.5">
                    <label className="block">
                      <div className={fieldLabelCls}>Your name *</div>
                      <input
                        className={fieldInputCls}
                        placeholder="Marcus Ellison"
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Work email *</div>
                      <input
                        className={fieldInputCls}
                        type="email"
                        placeholder="you@business.com"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Phone *</div>
                      <input
                        className={fieldInputCls}
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Website or @handle</div>
                      <input
                        className={fieldInputCls}
                        placeholder="ellisonre.com · @ellisonre"
                        value={data.handle}
                        onChange={(e) => set("handle", e.target.value)}
                      />
                    </label>
                  </div>
                )}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4.5">
                    <label className="block">
                      <div className={fieldLabelCls}>Business name *</div>
                      <input
                        className={fieldInputCls}
                        placeholder="Ellison Real Estate Group"
                        value={data.business}
                        onChange={(e) => set("business", e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Your role *</div>
                      <select
                        className={fieldInputCls}
                        value={data.role}
                        onChange={(e) => set("role", e.target.value)}
                      >
                        <option value="">Select a role</option>
                        <option value="agent">Solo agent</option>
                        <option value="team">Team lead</option>
                        <option value="broker">Broker / owner</option>
                        <option value="pm">Property manager</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Market / city *</div>
                      <input
                        className={fieldInputCls}
                        placeholder="Atlanta, GA"
                        value={data.market}
                        onChange={(e) => set("market", e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>Monthly closings</div>
                      <select
                        className={fieldInputCls}
                        value={data.volume}
                        onChange={(e) => set("volume", e.target.value)}
                      >
                        <option value="">Select a range</option>
                        <option>0 - 2 deals / mo</option>
                        <option>3 - 5 deals / mo</option>
                        <option>6 - 10 deals / mo</option>
                        <option>11 - 20 deals / mo</option>
                        <option>20+ deals / mo</option>
                      </select>
                    </label>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className={fieldLabelCls + " mb-3"}>Services needed *</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {services.map((s) => {
                        const active = data.services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggle(s)}
                            className={`font-sans text-[13px] font-medium px-3.5 py-2 rounded-full border transition-all ${
                              active
                                ? "bg-forest-600 text-white border-forest-600"
                                : "bg-white text-ink-900 border-ink-900/[0.22] hover:border-ink-900"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <label className="block">
                      <div className={fieldLabelCls}>Budget range</div>
                      <select
                        className={fieldInputCls}
                        value={data.budget}
                        onChange={(e) => set("budget", e.target.value)}
                      >
                        <option value="">Select a range</option>
                        <option>Under $3k / mo</option>
                        <option>$3k - $6k / mo</option>
                        <option>$6k - $10k / mo</option>
                        <option>$10k - $20k / mo</option>
                        <option>$20k+ / mo</option>
                        <option>Not sure — advise me</option>
                      </select>
                    </label>
                  </div>
                )}
                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4.5">
                    <label className="block">
                      <div className={fieldLabelCls}>Ideal start *</div>
                      <select
                        className={fieldInputCls}
                        value={data.timeline}
                        onChange={(e) => set("timeline", e.target.value)}
                      >
                        <option value="">Select a window</option>
                        <option>This month</option>
                        <option>Next 30-60 days</option>
                        <option>Q3 / Q4 2026</option>
                        <option>Just exploring</option>
                      </select>
                    </label>
                    <label className="block">
                      <div className={fieldLabelCls}>How did you find PMO?</div>
                      <select
                        className={fieldInputCls}
                        value={data.source}
                        onChange={(e) => set("source", e.target.value)}
                      >
                        <option value="">Select a source</option>
                        <option>Referral</option>
                        <option>Instagram</option>
                        <option>Google search</option>
                        <option>Podcast / interview</option>
                        <option>Saw our work at a listing</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <div className="md:col-span-2">
                      <label className="block">
                        <div className={fieldLabelCls}>Biggest marketing pain right now?</div>
                        <textarea
                          className={fieldInputCls + " resize-none min-h-[90px]"}
                          placeholder="Be honest. We've heard worse."
                          value={data.pain}
                          onChange={(e) => set("pain", e.target.value)}
                          rows={3}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {!submitted && (
            <div className="flex justify-between items-center pt-4.5 border-t border-ink-900/10 mt-3.5">
              <div>
                {step > 0 && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
              </div>
              <div>
                {step < steps.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    disabled={!canAdvance()}
                    onClick={() => canAdvance() && setStep((s) => s + 1)}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    disabled={!canAdvance()}
                    onClick={() => canAdvance() && submit()}
                  >
                    Submit brief <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}