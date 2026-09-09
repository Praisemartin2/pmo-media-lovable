import { useEffect } from "react";
import { site } from "@/data/site";

/** Find a <head> element by selector, creating it when missing so every page sets a full, fresh set of tags. */
function upsert(sel: string, make: () => HTMLElement): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(sel);
  if (!el) {
    el = make();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  }).setAttribute("content", content);
}

/**
 * Per-route document metadata for the SPA. Falls back to site.description so a
 * page that omits `description` never inherits the previous route's copy.
 * `noindex` (the 404) drops the canonical + og:url instead of pointing them at a URL that does not exist.
 */
export function SEO({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    const desc = description ?? site.description;
    const url = site.url + path;

    document.title = title;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "robots", noindex ? "noindex" : "index, follow");

    if (noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    } else {
      setMeta("property", "og:url", url);
      upsert('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }).setAttribute("href", url);
    }
  }, [title, description, path, noindex]);
  return null;
}
