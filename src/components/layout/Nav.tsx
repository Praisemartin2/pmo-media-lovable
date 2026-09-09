import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/shared/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const current = location.pathname + location.hash;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav aria-label="Primary" className="container-pmo flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" aria-label="PMO Media — home" onClick={close} className={cn("inline-flex items-center", focusRing)}>
          <Wordmark />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => {
            const active = current === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "font-label text-[13px] font-medium uppercase tracking-[0.16em] transition hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground",
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/brief" aria-label="Start the brief" className="btn-primary px-3.5 py-2.5 text-xs sm:px-5">
            <span className="hidden sm:inline">Start the brief</span>
            <span className="sm:hidden">Brief</span>
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
              className="flex w-full flex-col border-l border-border bg-background p-0 sm:max-w-sm [&>button]:hidden"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and contact</SheetDescription>

              <div className="flex h-16 items-center justify-between border-b border-border px-5">
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
                  {site.nav.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={close}
                        className={cn(
                          "display flex items-baseline gap-3 py-2 text-4xl text-foreground transition hover:text-muted-foreground",
                          focusRing,
                        )}
                      >
                        <span className="font-label text-xs font-medium tracking-[0.2em] text-muted-foreground" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-5 border-t border-border px-5 py-6">
                <Link to="/brief" onClick={close} className="btn-primary w-full">
                  Start the brief
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
