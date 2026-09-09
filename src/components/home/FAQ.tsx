import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

/**
 * FAQ. Heading column on the left, shadcn Accordion on the right (lg+).
 * The one crimson element in this section is the short rule under the headline.
 */
export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-pmo grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="display mt-4 text-5xl sm:text-6xl">
            STRAIGHT ANSWERS.
          </h2>
          <span aria-hidden="true" className="crimson-rule mt-8 block" />
          <p className="mt-8 max-w-sm text-base text-muted-foreground">
            {"Something we didn't cover? Email "}
            <a
              href={"mailto:" + site.email}
              className="text-foreground underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {site.email}
            </a>
            {" and you get a reply from the principal, not a bot."}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <Accordion type="single" collapsible className="border-t border-border">
            {site.faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={"faq-" + i} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg [&>svg]:text-muted-foreground">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
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
