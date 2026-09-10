import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * FAQ. Heading column on the left, shadcn Accordion on the right (lg+). Content from site.faqs.
 * Black ground; dominant colour cobalt (eyebrow, rule, open-state numerals).
 */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-background py-20 sm:py-28">
      <div className="container-pmo grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-cobalt">Questions</p>
          <h2 id="faq-title" className="display mt-4 text-5xl sm:text-7xl">
            Straight answers.
          </h2>
          <span aria-hidden="true" className="cobalt-rule mt-8 block" />
          <p className="mt-8 max-w-sm text-base text-muted-foreground">
            {"Something we did not cover? Email "}
            <a
              href={"mailto:" + site.email}
              className="text-foreground underline-offset-4 transition hover:text-cobalt hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {site.email}
            </a>
            {" and a strategist replies, not an autoresponder."}
          </p>
        </Reveal>

        <Reveal delay={120} stagger={90}>
          <Accordion type="single" collapsible className="border-t border-border">
            {site.faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={"faq-" + i} data-reveal-child="" className="group border-border">
                <AccordionTrigger className="gap-6 py-6 text-left text-base font-medium text-foreground transition-colors hover:text-cobalt hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:text-foreground sm:text-lg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-muted-foreground [&[data-state=open]>svg]:text-cobalt">
                  <span className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="display w-8 shrink-0 text-2xl leading-none text-muted-foreground transition-colors group-data-[state=open]:text-cobalt"
                    >
                      0{i + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-7 pl-[3.25rem] text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
