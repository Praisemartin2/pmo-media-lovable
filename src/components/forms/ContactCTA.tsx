import { useEffect, useRef, useState, type FormEvent, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/shared/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const CTA_IMAGE = "/images/bokeh_lights.jpg";
const CTA_IMAGE_960 = "/images/bokeh_lights_960.jpg";

/** If the photo is missing the wine→ink→navy gradient behind it is the design — just drop the broken img. */
const hideBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

/**
 * Closing contact section (brief §11). Bokeh photo (parallax) over a wine→ink→navy gradient with a
 * dark scrim so the copy and the form card stay legible; two columns on lg.
 * Left: the two ways in (brief, or call/email). Right: a three-field note.
 * Headline and left-column intro come from site.finalCta / site.readyToScale.
 * Delivery: FormSubmit AJAX → marketwithpmo@gmail.com, with a mailto fallback on failure.
 */

const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "font-label text-[12px] font-medium uppercase tracking-[0.16em] text-foreground";
const inputClass = "h-11 rounded-none border-input bg-background";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Tell us your name.";
  if (!v.email.trim()) e.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
  if (!v.message.trim()) e.message = "Write a line or two about what you need.";
  return e;
}

function mailtoFallback(v: Values): string {
  const subject = `Website message from ${v.name.trim() || "the PMO Media site"}`;
  const body = [`Name: ${v.name.trim()}`, `Email: ${v.email.trim()}`, "", v.message.trim()].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** POST to FormSubmit's AJAX endpoint. Resolves true on a confirmed send, false otherwise. Never logs. */
async function deliver(payload: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const json: { success?: boolean | string; message?: string } = await res.json().catch(() => ({}));
    return json.success === true || json.success === "true" || /success/i.test(String(json.message ?? ""));
  } catch {
    return false;
  }
}

function a11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

export function ContactCTA() {
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState("");
  /** One polite summary per failed validation; individual messages are read via aria-describedby on focus. */
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const errs = validate(values);
    const count = Object.keys(errs).length;
    if (count) {
      setErrors(errs);
      setAnnounce(count === 1 ? "1 field needs attention." : `${count} fields need attention.`);
      window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    setAnnounce("");
    setStatus("submitting");

    // Honeypot filled → a bot. Show success, send nothing.
    if (honey.trim()) {
      setStatus("success");
      return;
    }

    const ok = await deliver({
      _subject: `Website message from ${values.name.trim()}`,
      _template: "table",
      _captcha: "false",
      _honey: honey,
      _replyto: values.email.trim(),
      Name: values.name.trim(),
      Email: values.email.trim(),
      Message: values.message.trim(),
    });
    setStatus(ok ? "success" : "error");
  };

  const sending = status === "submitting";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-28"
    >
      {/* ---- background stack: gradient ground → bokeh photo → legibility scrim ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,hsl(var(--wine))_0%,hsl(var(--ink))_50%,hsl(var(--navy))_100%)]"
      >
        <Parallax speed={0.12} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
          <img
            src={CTA_IMAGE}
            srcSet={`${CTA_IMAGE_960} 960w, ${CTA_IMAGE} 1344w`}
            sizes="100vw"
            width={1344}
            height={768}
            alt=""
            loading="lazy"
            decoding="async"
            onError={hideBrokenImage}
            className="h-full w-full object-cover opacity-70"
          />
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--ink)/0.55)_0%,hsl(var(--ink)/0.8)_60%,hsl(var(--ink)/0.96)_100%)]" />
      </div>

      <div className="container-pmo relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow text-amber">Contact</p>
          <h2 id="contact-title" className="display mt-4 text-5xl sm:text-7xl">
            {site.finalCta.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: two ways in */}
          <Reveal delay={80}>
            <h3 className="font-mark text-2xl uppercase tracking-wide text-foreground">{site.readyToScale.headline}</h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">{site.readyToScale.text}</p>

            <p className="eyebrow mt-10">Two ways in</p>

            <ol className="mt-8 space-y-10">
              <li className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-5">
                <span aria-hidden="true" className="display text-5xl leading-none text-foreground">
                  01
                </span>
                <div>
                  <h4 className="font-mark text-lg uppercase tracking-wide text-foreground">Start the brief</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Four short steps. It lands with our strategy team, not a sales queue. Replies within 24 hours.
                  </p>
                  <Link to="/brief" className="btn-primary mt-5">
                    Start the brief
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>

              <li className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-5">
                <span aria-hidden="true" className="display text-5xl leading-none text-foreground">
                  02
                </span>
                <div>
                  <h4 className="font-mark text-lg uppercase tracking-wide text-foreground">Call or email</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Prefer to talk it through first? Twenty minutes, on the phone, with a strategist.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={site.phoneHref} className="btn-ghost" aria-label={`Call PMO Media at ${site.phone}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call us
                    </a>
                    <a href={`mailto:${site.email}`} className="btn-ghost" aria-label={`Email PMO Media at ${site.email}`}>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Email us
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {site.phone} &middot; {site.email}
                  </p>
                </div>
              </li>
            </ol>
          </Reveal>

          {/* Right: short note */}
          <Reveal delay={160}>
            <div className="border border-border bg-card/85 p-6 backdrop-blur-sm sm:p-8">
              {status === "success" ? (
                <div role="status">
                  <p className="eyebrow">Sent</p>
                  <h3 ref={successRef} tabIndex={-1} className="display mt-4 text-3xl outline-none sm:text-4xl">
                    MESSAGE RECEIVED.
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    It&rsquo;s with our strategy team. You&rsquo;ll hear from PMO Media within 24 hours.
                  </p>
                  <Link to="/work" className="btn-ghost mt-6">
                    See the results
                  </Link>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title" className="space-y-5">
                  <p aria-live="polite" className="sr-only">
                    {announce}
                  </p>
                  <div>
                    <h3 id="contact-form-title" className="font-mark text-lg uppercase tracking-wide text-foreground">
                      Or send a note
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">Three fields. Straight to {site.email}.</p>
                  </div>

                  {/* Honeypot — must stay empty. Hidden from people and assistive tech. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-honey">Leave this field empty</label>
                    <input
                      id="contact-honey"
                      name="_honey"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className={labelClass}>
                        Name
                        <span aria-hidden="true" className="ml-1 text-muted-foreground">
                          *
                        </span>
                      </Label>
                      <Input
                        {...a11y("contact-name", errors.name)}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={cn(inputClass, errors.name && "border-destructive")}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className={labelClass}>
                        Email
                        <span aria-hidden="true" className="ml-1 text-muted-foreground">
                          *
                        </span>
                      </Label>
                      <Input
                        {...a11y("contact-email", errors.email)}
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={cn(inputClass, errors.email && "border-destructive")}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className={labelClass}>
                      Message
                      <span aria-hidden="true" className="ml-1 text-muted-foreground">
                        *
                      </span>
                    </Label>
                    <Textarea
                      {...a11y("contact-message", errors.message)}
                      name="message"
                      rows={5}
                      required
                      placeholder="Your market, your goal, your timeline."
                      value={values.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={cn(
                        "min-h-[130px] rounded-none border-input bg-background text-base md:text-sm",
                        errors.message && "border-destructive",
                      )}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div role="alert" className="border border-destructive/60 bg-background p-4 text-sm">
                      <p className="font-medium text-foreground">The message didn&rsquo;t send.</p>
                      <p className="mt-1 text-muted-foreground">
                        Your note is still here. Try again, or send it straight from your email client:
                      </p>
                      <a
                        href={mailtoFallback(values)}
                        className="mt-3 inline-block underline underline-offset-4 transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Email {site.email}
                      </a>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending || undefined}
                      className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? "Sending…" : "Send message"}
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Private.{" "}
                      <Link
                        to="/privacy"
                        className="underline underline-offset-4 transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        How we handle it
                      </Link>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
