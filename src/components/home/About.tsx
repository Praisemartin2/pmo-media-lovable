import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { LogoMark } from "@/components/shared/Logo";
import { Reveal } from "@/components/shared/Reveal";

/** Four working principles, each grounded in site.process / site.faqs so nothing here outruns the data. */
const principles = [
  {
    title: site.process[0].title,
    text: "A free 20-minute call — we read your positioning, your market and your funnel.",
  },
  {
    title: site.process[1].title,
    text: site.process[1].text,
  },
  {
    title: "No long-term lock-in",
    text: "90-day minimum, then month-to-month.",
  },
  {
    title: "AI-augmented production",
    text: "One person, a system, fifty pieces in eight weeks.",
  },
];

const linkClass =
  "inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * About. Two columns on lg: a typographic panel (no photo available) and the principal's story.
 * The one crimson element in this section is the crimson arc inside the LogoMark.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container-pmo grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: typographic panel */}
        <Reveal>
          <div className="flex min-h-[380px] flex-col justify-between border border-border bg-card p-8 sm:min-h-[460px] sm:p-10">
            <div className="flex items-start justify-between gap-6">
              <LogoMark size={72} className="text-foreground" />
              <p className="eyebrow text-right">{site.city}</p>
            </div>

            <div>
              <p className="display text-4xl sm:text-5xl">
                <span className="block">ONE PRINCIPAL.</span>
                <span className="block">EVERY ACCOUNT.</span>
              </p>
              <p className="eyebrow mt-6">{site.serving}</p>
            </div>
          </div>
        </Reveal>

        {/* Right: story */}
        <Reveal delay={120}>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="display mt-4 text-5xl sm:text-6xl">
            BUILT BY A MARKETER WHO SHIPS.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{site.principal.bio}</p>

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {principles.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-foreground" />
                <div>
                  <h3 className="font-mark text-sm uppercase tracking-wide text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mark text-base font-semibold uppercase tracking-wide text-foreground">
              {site.principal.name}
            </p>
            <p className="eyebrow mt-1.5">{site.principal.title}</p>

            <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <li>
                <a href={"mailto:" + site.email} className={linkClass}>
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={linkClass}>
                  <Phone className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span>{site.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
