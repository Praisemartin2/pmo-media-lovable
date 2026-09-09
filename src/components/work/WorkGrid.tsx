import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { caseStudy, type WorkItem } from "@/data/portfolio";
import { Reveal } from "@/components/shared/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Kind = WorkItem["kind"];
type Filter = Kind | "all";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Series", value: "series" },
  { label: "Reels", value: "reel" },
  { label: "Carousels", value: "carousel" },
  { label: "Statics", value: "static" },
  { label: "Recaps", value: "recap" },
];

const KIND_LABEL: Record<Kind, string> = {
  series: "Series episode",
  reel: "Reel",
  carousel: "Carousel",
  static: "Static",
  recap: "Recap",
};

const CARD =
  "group relative block aspect-[9/16] w-full overflow-hidden border border-border bg-card text-left transition-colors duration-300 hover:border-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Bottom gradient caption shared by every card. */
function Caption({
  title,
  campaign,
  as: Tag = "div",
}: {
  title: string;
  campaign: string;
  /** Use "span" inside a <button>, which only permits phrasing content. */
  as?: "div" | "span" | "figcaption";
}) {
  return (
    <Tag className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent px-3 pb-3 pt-14">
      <span className="block text-sm font-medium leading-tight text-foreground">{title}</span>
      <span className="eyebrow mt-1.5 block">{campaign}</span>
    </Tag>
  );
}

/**
 * Video card: previews while a mouse hovers; a full-card play/pause button serves
 * keyboard and touch. Hover is gated on pointerType so a touch tap does not fire the
 * emulated mouseenter (play) and then the click (pause) in one go.
 */
function VideoCard({ item }: { item: WorkItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => ref.current?.play().catch(() => {});
  const pause = () => ref.current?.pause();
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) play();
    else pause();
  };
  const ifMouse = (fn: () => void) => (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") fn();
  };

  return (
    <figure onPointerEnter={ifMouse(play)} onPointerLeave={ifMouse(pause)} className={CARD}>
      <video
        ref={ref}
        src={item.video}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
        aria-label={`${item.title} — ${KIND_LABEL[item.kind]} preview`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} preview: ${item.title}`}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
      />
      <Caption as="figcaption" title={item.title} campaign={item.campaign} />
    </figure>
  );
}

/** Carousel or static card: opens the viewer dialog. */
function ImageCard({ item, onOpen }: { item: WorkItem; onOpen: (item: WorkItem) => void }) {
  const isCarousel = item.kind === "carousel";
  const src = isCarousel ? item.slides?.[0] : item.image;
  const count = item.slides?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={isCarousel ? `Open ${item.title}, ${count} slides` : `Open ${item.title}`}
      className={CARD}
    >
      {/* Covers are 4:5 inside a 9:16 frame: a blurred copy fills the band instead of a dark gap. */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-xl"
      />
      <img
        src={src}
        alt={isCarousel ? `${item.title} — slide 1 of ${count}` : item.title}
        loading="lazy"
        decoding="async"
        className="relative h-full w-full object-contain transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
      />
      {isCarousel && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm border border-foreground/30 bg-background/70 px-2 py-1 font-label text-[10px] font-medium uppercase tracking-widest text-foreground backdrop-blur-sm">
          <Layers className="h-3 w-3" aria-hidden="true" />
          {count} slides
        </span>
      )}
      <Caption as="span" title={item.title} campaign={item.campaign} />
    </button>
  );
}

/**
 * Selected work grid. Optional format filters; carousels and statics open
 * in a dialog viewer with prev / next and arrow-key navigation.
 * The one crimson accent in this section is the active filter chip.
 */
export function WorkGrid({
  items,
  showMoreHref,
  showFilters,
}: {
  items: WorkItem[];
  showMoreHref?: string;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<WorkItem | null>(null);
  // Only claim the whole set for the client when every item says so.
  const allFromClient = items.every((item) => item.client === caseStudy.client);
  const [slide, setSlide] = useState(0);

  const counts = useMemo(() => {
    const c: Record<Kind, number> = { series: 0, reel: 0, carousel: 0, static: 0, recap: 0 };
    for (const item of items) c[item.kind] += 1;
    return c;
  }, [items]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.kind === filter)),
    [items, filter],
  );

  const open = (item: WorkItem) => {
    setSlide(0);
    setActive(item);
  };

  const slides: string[] = !active
    ? []
    : active.kind === "carousel"
      ? active.slides ?? []
      : active.image
        ? [active.image]
        : [];
  const total = slides.length;
  const prev = () => setSlide((s) => (s - 1 + total) % total);
  const next = () => setSlide((s) => (s + 1) % total);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (total < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const navButton =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/30 bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:border-foreground/70 " +
    FOCUS;

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container-pmo">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="display mt-4 text-5xl sm:text-7xl">
            THE WORK.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {items.length} pieces{allFromClient ? "" : ", most"} from the {caseStudy.client} engagement. Hover a card, or
            press its play button, to preview it. Open a carousel or static to see it full size.
          </p>
        </Reveal>

        {showFilters && (
          <Reveal delay={60}>
            <div role="group" aria-label="Filter work by format" className="mt-10 flex flex-wrap gap-2">
              {FILTERS.filter((f) => f.value === "all" || counts[f.value] > 0).map((f) => {
                const on = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.value)}
                    className={cn(
                      "border px-4 py-2 font-label text-xs uppercase tracking-[0.18em] transition-colors",
                      FOCUS,
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground",
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        {visible.length === 0 ? (
          <p className="mt-12 text-muted-foreground">Nothing in this format yet.</p>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={(i % 4) * 70}>
                  {item.video ? <VideoCard item={item} /> : <ImageCard item={item} onOpen={open} />}
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {showMoreHref && (
          <Reveal className="mt-12">
            <Link to={showMoreHref} className="btn-ghost">
              See all work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActive(null);
        }}
      >
        <DialogContent
          onKeyDown={onKeyDown}
          className="w-[calc(100%-1.5rem)] max-w-3xl gap-0 overflow-hidden border-border bg-background p-0 sm:rounded-sm"
        >
          {active && (
            <>
              <div className="border-b border-border px-5 py-4 pr-14 sm:px-6">
                <p className="eyebrow">{active.campaign}</p>
                <DialogTitle className="mt-1.5 font-mark text-base font-semibold uppercase tracking-wide text-foreground">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="mt-1">{active.blurb}</DialogDescription>
              </div>

              <div className="relative bg-card">
                <img
                  src={slides[slide]}
                  alt={total > 1 ? `${active.title} — slide ${slide + 1} of ${total}` : active.title}
                  decoding="async"
                  className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
                />
                {total > 1 && (
                  <>
                    <button type="button" onClick={prev} aria-label="Previous slide" className={cn(navButton, "left-3")}>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={next} aria-label="Next slide" className={cn(navButton, "right-3")}>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {total > 1 && (
                <div className="flex items-center justify-between border-t border-border px-5 py-3 sm:px-6">
                  <p aria-live="polite" className="font-label text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="sr-only">Slide </span>
                    {slide + 1} / {total}
                  </p>
                  <p className="hidden text-xs text-muted-foreground sm:block">Arrow keys move between slides</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
