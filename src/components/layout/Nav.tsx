import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/shared/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Primary links (brief §Page composition), read from the site data. */
const NAV_LINKS: { label: string; href: string }[] = site.nav;

const CTA = { label: "Free Strategy Call", short: "Book a call", href: "/brief" };

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const current = location.pathname + location.hash;
  const close = () => setOpen(false);

  // Header gains a heavier ground once the hero starts scrolling under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        scrolled ? "border-border bg-background/[0.92]" : "border-white/10 bg-background/55",
      )}
    >
      {/* Colour hairline: crimson → cobalt, fading out to the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px bg-gradient-to-r from-primary via-cobalt to-transparent opacity-80"
      />

      <nav aria-label="Primary" className="container-pmo flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" aria-label="PMO Media — home" onClick={close} className={cn("inline-flex items-center", focusRing)}>
          <Wordmark />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:gap-7 md:flex">
          {NAV_LINKS.map((item) => {
            const active = current === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "group relative inline-flex items-center py-1 font-label text-[13px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-foreground",
                    active ? "text-foreground" : "text-foreground/70",
                    focusRing,
                  )}
                >
                  {item.label}
                  {/* Underline grows on hover; stays lit + crimson when active. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-cobalt transition-transform duration-300 ease-smooth group-hover:scale-x-100",
                      active && "scale-x-100",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to={CTA.href} aria-label={CTA.label} className="btn-primary whitespace-nowrap px-3 py-2.5 text-[11px] tracking-[0.08em] sm:px-5 sm:text-xs sm:tracking-[0.12em]"
          >
            <span className="hidden sm:inline">{CTA.label}</span>
            <span className="sm:hidden">{CTA.short}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn("inline-flex h-10 w-10 items-center justify-center text-foreground md:hidden", focusRing)}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>

            {/* [&>button]:hidden suppresses the sheet's built-in close so we can ship a larger, labelled one. */}
            <SheetContent
              side="right"
              className="band-navy flex w-full flex-col border-l border-border p-0 sm:max-w-sm [&>button]:hidden"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and contact</SheetDescription>

              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <Link to="/" aria-label="PMO Media — home" onClick={close} className={cn("inline-flex items-center", focusRing)}>
                  <Wordmark />
                </Link>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className={cn("inline-flex h-10 w-10 items-center justify-center text-foreground", focusRing)}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </SheetClose>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
                <ul className="space-y-1">
                  {NAV_LINKS.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={close}
                        className={cn(
                          "display flex items-baseline gap-3 py-2 text-4xl text-foreground transition hover:text-cobalt",
                          focusRing,
                        )}
                      >
                        <span className="font-label text-xs font-medium tracking-[0.2em] text-amber" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-5 border-t border-white/10 px-5 py-6">
                <Link to={CTA.href} onClick={close} className="btn-primary w-full">
                  {CTA.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <ul className="space-y-2">
                  <li>
                    <a
                      href={site.phoneHref}
                      className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground", focusRing)}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground", focusRing)}
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
