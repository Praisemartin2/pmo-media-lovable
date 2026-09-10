import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/shared/SEO";
import { Reveal } from "@/components/shared/Reveal";
import { site } from "@/data/site";

/**
 * /privacy — plain-English policy for PMO Media LLC.
 * Only describes what this site actually does: two forms, one inbox, no tracking cookies.
 * Crimson on this page: the rule under the header.
 */

const LAST_UPDATED = "September 8, 2026";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const inlineLink = `underline underline-offset-4 transition hover:text-foreground ${focusRing}`;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section aria-labelledby={`${id}-title`} className="border-t border-border py-10 first:border-t-0 first:pt-0">
        <h2 id={`${id}-title`} className="font-mark text-lg uppercase tracking-wide text-foreground">
          {title}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  );
}

export default function Privacy() {
  const email = site.email;

  return (
    <>
      <SEO
        title="Privacy — PMO Media"
        description="What the PMO Media website collects, where it goes, and how to reach us about it. Plain English, no fine print."
        path="/privacy"
      />

      <section id="privacy" aria-labelledby="privacy-title" className="py-20 sm:py-28">
        <div className="container-pmo">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Privacy</p>
            <h1 id="privacy-title" className="display mt-4 text-5xl sm:text-7xl">
              WHAT WE COLLECT. WHAT WE DON&rsquo;T.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              This site does one thing with your information: it gets your message to a person. Here is exactly how.
            </p>
            <div className="crimson-rule mt-8" aria-hidden="true" />
            <p className="mt-6 text-sm text-muted-foreground">
              {site.legalName} &middot; Last updated {LAST_UPDATED}
            </p>
          </Reveal>

          <div className="mt-14 max-w-3xl">
            <Section id="collect" title="What the forms collect">
              <p>
                The site has two forms: the{" "}
                <Link to="/brief" className={inlineLink}>
                  brief
                </Link>{" "}
                and the short contact note on the home page. You fill them in by choice; nothing is collected in the
                background.
              </p>
              <p>
                The brief asks for your name, work email, phone number, an optional website or social handle, your
                business name, role, market, monthly closings, the services you need, a budget range, a package of
                interest, your ideal start window, how you found PMO Media, and a free-text answer about your biggest
                marketing pain. The contact note asks for your name, email and message.
              </p>
              <p>
                Fields marked with an asterisk are required to send. Everything else is optional and you can leave it
                blank.
              </p>
            </Section>

            <Section id="delivery" title="Where it goes">
              <p>
                Every submission is emailed to{" "}
                <a href={`mailto:${email}`} className={inlineLink}>
                  {email}
                </a>{" "}
                using FormSubmit (formsubmit.co), a third-party form-to-email relay. FormSubmit receives what you
                typed in order to deliver it and is governed by its own privacy policy. We do not run our own server,
                database or CRM behind these forms.
              </p>
              <p>
                If a submission fails, the site offers a fallback link that opens your own email client with the same
                summary pre-filled. In that case the message travels through your email provider, not FormSubmit.
              </p>
            </Section>

            <Section id="use" title="How we use it">
              <p>
                To read your brief, reply to you, and scope a proposal. That is the whole list. We do not sell your
                information, add you to a marketing list, or share it with anyone outside {site.legalName} except the
                delivery relay described above.
              </p>
              <p>
                If we go on to work together, anything you share after that is covered by the agreement we sign, not
                by this page.
              </p>
            </Section>

            <Section id="cookies" title="Cookies and analytics">
              <p>
                The site sets no tracking cookies and runs no advertising pixels. If we add standard, privacy-respecting
                analytics in future, this page will say so and describe what it measures.
              </p>
              <p>
                Typefaces load from Google Fonts. When a page loads, your browser requests those font files from
                Google&rsquo;s servers, which see your IP address as part of that request. The portfolio videos and
                images are served from this site directly.
              </p>
            </Section>

            <Section id="links" title="Links to other sites">
              <p>
                The footer links to our Instagram, YouTube and LinkedIn profiles. Those platforms have their own
                policies; this page only covers what happens on {site.url.replace(/^https?:\/\//, "")}.
              </p>
            </Section>

            <Section id="retention" title="Keeping it, and deleting it">
              <p>
                Submissions live in the inbox above for as long as they are useful to the conversation. Email{" "}
                <a href={`mailto:${email}`} className={inlineLink}>
                  {email}
                </a>{" "}
                from the address you used and ask, and we will delete what we hold on you or send you a copy of it.
              </p>
            </Section>

            <Section id="contact" title="Questions">
              <p>
                Write to{" "}
                <a href={`mailto:${email}`} className={inlineLink}>
                  {email}
                </a>{" "}
                or call{" "}
                <a href={site.phoneHref} className={inlineLink}>
                  {site.phone}
                </a>
                . {site.legalName}, {site.city}.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
