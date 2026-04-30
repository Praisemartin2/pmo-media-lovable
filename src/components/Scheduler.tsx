import { useEffect, useState } from "react";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const times = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];
const bookedIdx = [1, 5, 8];

export default function Scheduler({ open, onClose }: Props) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const close = () => {
    setSelected(null);
    setTime(null);
    setConfirmed(false);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isAvailable = (d: number | null): boolean => {
    if (!d) return false;
    const dt = new Date(year, month, d);
    const dow = dt.getDay();
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return dt >= now && dow !== 0 && dow !== 6;
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };
  const prevMonth = () => {
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    if (new Date(y, m + 1, 0) < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setMonth(m);
    if (month === 0) setYear(y);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] bg-ink-1000/[0.72] backdrop-blur-md flex items-center justify-center animate-fadein"
    >
      <div className="bg-bone-50 rounded-lg max-w-[1080px] w-[96vw] max-h-[94vh] overflow-hidden grid grid-cols-1 md:grid-cols-[360px_1fr] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] animate-fadeup">
        <aside className="hidden md:flex bg-gradient-to-b from-forest-700 to-forest-900 text-bone-100 p-9 px-8 flex-col justify-between">
          <div>
            <div className="caps text-forest-300">§ Discovery</div>
            <h3 className="font-display font-bold text-[32px] leading-[1.1] tracking-[-0.02em] text-white mt-4.5 mb-3.5">
              Twenty minutes. <span className="text-forest-300 italic font-normal">No deck.</span>
            </h3>
            <p className="text-sm text-bone-100/85 leading-[1.55]">
              Praise walks you through your positioning, your market, and what he'd build if you partnered tomorrow.
            </p>
            <div className="mt-8 pt-6 border-t border-bone-100/[0.18] flex flex-col gap-3.5">
              {(
                [
                  ["Host", "Praise Martin-Oguike"],
                  ["Duration", "20 minutes"],
                  ["Where", "Zoom · calendar invite"],
                  ["Timezone", "Eastern · convertible"],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3.5">
                  <span className="caps text-bone-100/55">{k}</span>
                  <span className="text-[13px] font-medium text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="caps text-bone-100/50 mb-2">Free · 20 min · Zoom</div>
            <div className="text-[13px] text-bone-100/75 leading-[1.55]">
              No pitch deck. No high-pressure sales. Just diagnostic and direction.
            </div>
          </div>
        </aside>
        <div className="p-7 px-9 flex flex-col overflow-hidden max-h-[94vh]">
          <div className="flex justify-between items-center mb-4.5">
            <div className="caps text-ink-600">
              {confirmed ? "Confirmed" : selected ? "Pick a time" : "Pick a day"}
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="bg-transparent border border-ink-900/[0.22] w-9 h-9 rounded flex items-center justify-center transition-colors hover:bg-ink-900 hover:text-bone-100 hover:border-ink-900"
            >
              <X size={16} />
            </button>
          </div>

          {confirmed ? (
            <div className="my-auto text-center py-10">
              <div className="w-18 h-18 rounded-full bg-forest-600 flex items-center justify-center mx-auto mb-5.5" style={{ width: 72, height: 72 }}>
                <Check size={32} strokeWidth={2.5} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-[32px] leading-[1.1] tracking-[-0.025em]">
                You're on the calendar.
              </h3>
              <p className="text-base text-ink-700 max-w-[480px] mx-auto mt-3.5 leading-[1.6]">
                <strong>
                  {new Date(year, month, selected!).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>{" "}
                at <strong>{time}</strong> Eastern.
              </p>
              <p className="text-sm text-ink-600 max-w-[460px] mx-auto leading-[1.55] mt-2">
                A calendar invite with the Zoom link is on its way. Bring your last 60 days of marketing numbers if you have them.
              </p>
              <div className="mt-7">
                <button className="btn btn-primary" onClick={close}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3.5">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] m-0">
                  {monthName}
                </h3>
                <div className="flex gap-1.5">
                  <button
                    onClick={prevMonth}
                    className="w-8.5 h-8.5 border border-ink-900/[0.22] rounded bg-transparent flex items-center justify-center"
                    style={{ width: 34, height: 34 }}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="w-8.5 h-8.5 border border-ink-900 rounded bg-ink-900 text-bone-100 flex items-center justify-center"
                    style={{ width: 34, height: 34 }}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 mb-1.5">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                  <div key={d} className="caps text-ink-600 px-2 py-1.5">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-ink-900/[0.22] border border-ink-900/[0.22] rounded overflow-hidden">
                {cells.map((d, i) => {
                  const available = isAvailable(d);
                  const sel = d === selected;
                  const disabled = !d || !available;
                  return (
                    <div
                      key={i}
                      onClick={() => available && d && setSelected(d)}
                      className={`p-3 px-2.5 min-h-[64px] text-sm flex flex-col justify-between transition-colors ${
                        disabled
                          ? "bg-bone-50 text-ink-400 cursor-not-allowed"
                          : "bg-white cursor-pointer hover:bg-bone-100"
                      } ${sel ? "!bg-ink-900 !text-bone-100" : ""}`}
                    >
                      <span className="font-medium">{d || ""}</span>
                      {available && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full self-end ${
                            sel ? "bg-forest-300" : "bg-forest-600"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {selected && (
                <div className="mt-5 animate-fadeup">
                  <div className="caps text-ink-600">
                    Times ·{" "}
                    {new Date(year, month, selected).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                    {times.map((t, i) => {
                      const booked = bookedIdx.includes(i);
                      const active = time === t;
                      return (
                        <button
                          key={t}
                          disabled={booked}
                          onClick={() => setTime(t)}
                          className={`px-3 py-2.5 rounded text-[13px] border transition-all ${
                            booked
                              ? "opacity-40 cursor-not-allowed line-through bg-white border-ink-900/[0.22] text-ink-900"
                              : active
                              ? "bg-forest-600 text-white border-forest-600"
                              : "bg-white text-ink-900 border-ink-900/[0.22] hover:border-ink-900"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex justify-end pt-4.5 mt-4 border-t border-ink-900/10">
                <button
                  className="btn btn-primary"
                  disabled={!time}
                  onClick={() => time && setConfirmed(true)}
                >
                  Confirm booking <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}