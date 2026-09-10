import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/shared/SEO";
import { Wordmark } from "@/components/shared/Logo";
import { SkipLink } from "@/components/shared/SkipLink";
import { site } from "@/data/site";

/**
 * 404. Rendered outside <Layout/> (see App.tsx), so it carries its own
 * header / main / footer landmarks. Crimson on this page: the primary link home.
 */

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SEO title="Page not found — PMO Media" description="The page you asked for moved or never existed." noindex />
      <SkipLink />

      <header className="border-b border-border">
        <div className="container-pmo flex h-16 items-center">
          <Link to="/" aria-label="PMO Media — home" className={`inline-flex items-center ${focusRing}`}>
            <Wordmark />
          </Link>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="flex flex-1 items-center py-20 outline-none sm:py-28">
        <div className="container-pmo">
          <p className="eyebrow">Error 404</p>
          <h1 className="display mt-4 max-w-4xl text-6xl sm:text-8xl">NOTHING LISTED AT THIS ADDRESS.</h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            The page you asked for moved or never existed. Head back to the front page, or go straight to the results.
          </p>
          <p className="mt-3 break-all font-mono text-xs text-muted-foreground">
            <span className="sr-only">Requested path: </span>
            <span aria-hidden="true">Requested: </span>
            {pathname}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/" className="btn-primary">
              Back to home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/work" className="btn-ghost">
              See the results
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="container-pmo flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {site.legalName}</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className={`transition hover:text-foreground ${focusRing}`}>
              {site.email}
            </a>
            <Link to="/privacy" className={`transition hover:text-foreground ${focusRing}`}>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
