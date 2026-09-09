/**
 * "Skip to content". First focusable element on every page, including the 404
 * that renders outside <Layout/>. Targets <main id="main" tabIndex={-1}>.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:font-mark focus:text-sm focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:text-background focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
    >
      Skip to content
    </a>
  );
}
