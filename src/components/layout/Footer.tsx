import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Wordmark } from "@/components/shared/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const linkClass = cn("inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground", focusRing);

const socials = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "YouTube", href: site.social.youtube, Icon: Youtube },
  { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-pmo py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* The wordmark already carries the O-device, so the mark is not repeated above it. */}
            <Wordmark />
            <div className="crimson-rule mt-6" aria-hidden="true" />
            <p className="mt-6 text-sm text-foreground">{site.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {site.city} · {site.serving}
            </p>
          </div>

          {/* Navigate */}
          <nav aria-labelledby="footer-navigate">
            <h2 id="footer-navigate" className="eyebrow">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={linkClass}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {site.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h2 className="eyebrow">Connect</h2>
            <ul className="mt-5 space-y-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.legalName}</p>
          <Link to="/privacy" className={cn("transition hover:text-foreground", focusRing)}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
