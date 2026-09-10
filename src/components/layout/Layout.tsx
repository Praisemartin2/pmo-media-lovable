import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/shared/SkipLink";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

/**
 * App shell: skip link → sticky nav → routed page → footer.
 * Handles in-page hash navigation ("/#services") and scroll-to-top on route change,
 * and moves focus with each navigation so keyboard and screen-reader users land
 * where the page did: the hash target, or the main landmark on a new route.
 */
export function Layout() {
  const { pathname, hash, key } = useLocation();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNavigation = lastKey.current !== null && lastKey.current !== key;
    lastKey.current = key;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let cancelled = false;
      const scrollTo = (behavior: ScrollBehavior) => {
        const el = document.getElementById(id);
        if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior, block: "start" });
        return el;
      };

      // Wait one frame so the destination page has painted before we measure it.
      const frame = window.requestAnimationFrame(() => {
        const el = scrollTo(reduceMotion ? "instant" : "smooth");
        if (!el) return;

        // Put the sequential-focus start point on the target so the next Tab continues from here.
        if (!el.hasAttribute("tabindex")) {
          el.setAttribute("tabindex", "-1");
          el.classList.add("outline-none");
        }
        el.focus({ preventScroll: true });

        // On a hard load the webfont swap can shrink everything above the target after we
        // have already scrolled; re-run once the fonts settle. No-op when they are loaded.
        const fonts = document.fonts;
        if (fonts && fonts.status !== "loaded") {
          fonts.ready.then(() => {
            if (!cancelled) scrollTo("instant");
          });
        }
      });
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
      };
    }

    // New route, no anchor: start at the top without animating across the old page,
    // then hand focus to the main landmark so the new page is announced.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (isNavigation) document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash, key]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollProgress />
      <SkipLink />
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
