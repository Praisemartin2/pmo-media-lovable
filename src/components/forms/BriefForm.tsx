import { useEffect, useRef, useState, type FormEvent, type ReactNode, type SelectHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Four-step brief wizard. Plain React state, no form library.
 * Delivery: FormSubmit AJAX → marketwithpmo@gmail.com. On failure the visitor
 * gets a mailto fallback carrying the full summary so nothing is lost.
 * Crimson in this component: the primary button only; the progress bar stays ice.
 */

const TOTAL_STEPS = 4;
const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

const ROLES = ["Solo agent", "Team lead", "Broker-owner", "Property manager", "Other"];
const CLOSINGS = ["0–2 deals/mo", "3–5 deals/mo", "6–10 deals/mo", "11–20 deals/mo", "20+ deals/mo"];
/** The six services from site.ts plus the two package features that are not a service on their own. */
const SERVICES = [...site.services.map((s) => s.title), "Website build", "Editorial photography"];
const BUDGETS = ["Under $3k", "$3k–$6k", "$6k–$10k", "$10k–$20k", "$20k+ per month", "Not sure — advise me"];
const PACKAGES = site.packages.map((p) => p.name);
/** "Q4 2026" today, "Q1 2027" from October — never a stale hard-coded quarter. */
function nextQuarterLabel(now = new Date()): string {
  const q = Math.floor(now.getMonth() / 3) + 1;
  return q === 4 ? `Q1 ${now.getFullYear() + 1}` : `Q${q + 1} ${now.getFullYear()}`;
}
const STARTS = ["This month", "Next 30–60 days", nextQuarterLabel(), "Just exploring"];
const SOURCES = ["Referral", "Google search", "Instagram", "TikTok", "Podcast", "Saw our work at a listing", "Other"];

const STEP_TITLES = ["WHO ARE WE TALKING TO?", "TELL US ABOUT THE BUSINESS.", "WHAT DO YOU NEED FROM PMO MEDIA?", "CONTEXT & TIMING."];

type Values = {
  name: string;
  email: string;
  phone: string;
  website: string;
  business: string;
  role: string;
  market: string;
  closings: string;
  services: string[];
  budget: string;
  pkg: string;
  start: string;
  source: string;
  pain: string;
};

type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  website: "",
  business: "",
  role: "",
  market: "",
  closings: "",
  services: [],
  budget: "",
  pkg: "",
  start: "",
  source: "",
  pain: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Map "grow" / "Grow" / " GROW " → "Grow"; anything else → "". */
function matchPackage(preset?: string): string {
  if (!preset) return "";
  const wanted = preset.trim().toLowerCase();
  return PACKAGES.find((p) => p.toLowerCase() === wanted) ?? "";
}

function validateStep(step: number, v: Values): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!v.name.trim()) e.name = "Tell us your name.";
    if (!v.email.trim()) e.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right.";
    if (!v.phone.trim()) e.phone = "Add a phone number we can reach you on.";
    else if (v.phone.replace(/\D/g, "").length < 7) e.phone = "That phone number looks too short.";
  }
  if (step === 2) {
    if (!v.business.trim()) e.business = "What's the business called?";
    if (!v.role) e.role = "Pick the role closest to yours.";
    if (!v.market.trim()) e.market = "Which market do you work?";
  }
  if (step === 3) {
    if (v.services.length === 0) e.services = "Pick at least one service.";
  }
  if (step === 4) {
    if (!v.start) e.start = "Pick a rough start window.";
  }
  return e;
}

function summaryLines(v: Values): string[] {
  const or = (s: string) => (s.trim() ? s.trim() : "—");
  return [
    `Name: ${or(v.name)}`,
    `Email: ${or(v.email)}`,
    `Phone: ${or(v.phone)}`,
    `Website / handle: ${or(v.website)}`,
    `Business: ${or(v.business)}`,
    `Role: ${or(v.role)}`,
    `Market: ${or(v.market)}`,
    `Monthly closings: ${or(v.closings)}`,
    `Services needed: ${v.services.length ? v.services.join(", ") : "—"}`,
    `Budget: ${or(v.budget)}`,
    `Package of interest: ${or(v.pkg)}`,
    `Ideal start: ${or(v.start)}`,
    `Found PMO Media via: ${or(v.source)}`,
    `Biggest marketing pain: ${or(v.pain)}`,
  ];
}

function mailtoFallback(v: Values): string {
  const subject = `Brief from ${v.name.trim() || "a new lead"}${v.business.trim() ? ` — ${v.business.trim()}` : ""}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryLines(v).join("\n"))}`;
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

/* ---------- small presentational helpers ---------- */

const labelClass = "font-label text-[12px] font-medium uppercase tracking-[0.16em] text-foreground";
const inputClass = "h-11 rounded-none border-input bg-background";
const selectClass =
  "flex h-11 w-full appearance-none rounded-none border border-input bg-background px-3 py-2 pr-10 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

/** Build id + aria wiring for one field. */
function a11y(id: string, error?: string, hint?: string) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": ids.length ? ids.join(" ") : undefined,
  } as const;
}

function Req() {
  return (
    <span aria-hidden="true" className="ml-1 text-muted-foreground">
      *
    </span>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className={labelClass}>
        {label}
        {required && <Req />}
      </Label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function NativeSelect({
  className,
  children,
  value,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { value: string }) {
  const invalid = props["aria-invalid"] === true;
  return (
    <div className="relative">
      <select
        value={value}
        className={cn(selectClass, !value && "text-muted-foreground", invalid && "border-destructive", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

/* ---------- component ---------- */

export function BriefForm({ presetPackage }: { presetPackage?: string }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(() => ({ ...EMPTY, pkg: matchPackage(presetPackage) }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState("");
  /** One polite summary per failed validation; individual messages are read via aria-describedby on focus. */
  const [announce, setAnnounce] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);

  // Keep the preselected package in sync if the query string changes while mounted.
  useEffect(() => {
    const matched = matchPackage(presetPackage);
    if (matched) setValues((v) => ({ ...v, pkg: matched }));
  }, [presetPackage]);

  // Move focus to the step heading on every step change (not on mount).
  useEffect(() => {
    if (prevStep.current !== step) {
      prevStep.current = step;
      headingRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const toggleService = (service: string, on: boolean) => {
    set(
      "services",
      on ? Array.from(new Set([...values.services, service])) : values.services.filter((s) => s !== service),
    );
  };

  const focusFirstInvalid = () => {
    window.requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] [role="checkbox"]');
      el?.focus();
    });
  };

  const back = () => {
    if (step > 1) {
      setErrors({});
      setAnnounce("");
      setStep(step - 1);
    }
  };

  const send = async () => {
    setStatus("submitting");

    // Honeypot filled → a bot. Show success, send nothing.
    if (honey.trim()) {
      setStatus("success");
      return;
    }

    const v = values;
    const payload: Record<string, string> = {
      _subject: `New brief from ${v.name.trim()} — ${v.business.trim()}`,
      _template: "table",
      _captcha: "false",
      _honey: honey,
      _replyto: v.email.trim(),
      Name: v.name.trim(),
      Email: v.email.trim(),
      Phone: v.phone.trim(),
      "Website / handle": v.website.trim() || "—",
      Business: v.business.trim(),
      Role: v.role,
      Market: v.market.trim(),
      "Monthly closings": v.closings || "—",
      "Services needed": v.services.join(", "),
      Budget: v.budget || "—",
      "Package of interest": v.pkg || "—",
      "Ideal start": v.start,
      "Found PMO Media via": v.source || "—",
      "Biggest marketing pain": v.pain.trim() || "—",
    };

    const ok = await deliver(payload);
    setStatus(ok ? "success" : "error");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const errs = validateStep(step, values);
    const count = Object.keys(errs).length;
    if (count) {
      setErrors(errs);
      setAnnounce(count === 1 ? "1 field needs attention." : `${count} fields need attention.`);
      focusFirstInvalid();
      return;
    }
    setAnnounce("");
    if (step < TOTAL_STEPS) {
      setErrors({});
      setStep(step + 1);
      return;
    }
    void send();
  };

  /* ---------- success state ---------- */
  if (status === "success") {
    return (
      <div role="status" className="py-2">
        <p className="eyebrow">Received</p>
        <h2 ref={successRef} tabIndex={-1} className="display mt-4 text-4xl outline-none sm:text-5xl">
          YOUR BRIEF IS IN.
        </h2>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Received. Your brief is with our strategy team and is read personally by the founder. Replies within 24 hours.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/work" className="btn-primary">
            See the results
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const sending = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="brief-step-title" className="space-y-8">
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      {/* Progress */}
      <div>
        <p className="eyebrow" aria-hidden="true">
          Step {step} of {TOTAL_STEPS}
        </p>
        <ol className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
            <li
              key={n}
              className={cn(
                "h-1 transition-colors duration-300",
                n === step ? "bg-foreground" : n < step ? "bg-foreground/50" : "bg-border",
              )}
            />
          ))}
        </ol>
      </div>

      {/* Step title */}
      <div>
        <h2
          id="brief-step-title"
          ref={headingRef}
          tabIndex={-1}
          className="display scroll-mt-20 text-3xl outline-none sm:text-4xl"
        >
          <span className="sr-only">
            Step {step} of {TOTAL_STEPS}:{" "}
          </span>
          {STEP_TITLES[step - 1]}
        </h2>
        <p className="mt-3 text-xs text-muted-foreground">
          <span aria-hidden="true">* </span>Required
        </p>
      </div>

      {/* Honeypot — must stay empty. Hidden from people and assistive tech. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="brief-honey">Leave this field empty</label>
        <input
          id="brief-honey"
          name="_honey"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honey}
          onChange={(e) => setHoney(e.target.value)}
        />
      </div>

      {/* ---------- Step 1 ---------- */}
      {step === 1 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="brief-name" label="Name" required error={errors.name}>
            <Input
              {...a11y("brief-name", errors.name)}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={cn(inputClass, errors.name && "border-destructive")}
            />
          </Field>
          <Field id="brief-email" label="Work email" required error={errors.email}>
            <Input
              {...a11y("brief-email", errors.email)}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              className={cn(inputClass, errors.email && "border-destructive")}
            />
          </Field>
          <Field id="brief-phone" label="Phone" required error={errors.phone}>
            <Input
              {...a11y("brief-phone", errors.phone)}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={cn(inputClass, errors.phone && "border-destructive")}
            />
          </Field>
          <Field id="brief-website" label="Website or @handle" hint="Optional. Where can we see you right now?">
            <Input
              {...a11y("brief-website", undefined, "Optional. Where can we see you right now?")}
              name="website"
              type="text"
              autoComplete="url"
              placeholder="yoursite.com or @handle"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {/* ---------- Step 2 ---------- */}
      {step === 2 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="brief-business" label="Business name" required error={errors.business}>
            <Input
              {...a11y("brief-business", errors.business)}
              name="business"
              type="text"
              autoComplete="organization"
              required
              value={values.business}
              onChange={(e) => set("business", e.target.value)}
              className={cn(inputClass, errors.business && "border-destructive")}
            />
          </Field>
          <Field id="brief-role" label="Your role" required error={errors.role}>
            <NativeSelect
              {...a11y("brief-role", errors.role)}
              name="role"
              required
              value={values.role}
              onChange={(e) => set("role", e.target.value)}
            >
              <option value="">Select a role</option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field id="brief-market" label="Market / city" required error={errors.market}>
            <Input
              {...a11y("brief-market", errors.market)}
              name="market"
              type="text"
              autoComplete="address-level2"
              placeholder="e.g. Washington, DC"
              required
              value={values.market}
              onChange={(e) => set("market", e.target.value)}
              className={cn(inputClass, errors.market && "border-destructive")}
            />
          </Field>
          <Field id="brief-closings" label="Monthly closings" hint="Optional. A rough average is fine.">
            <NativeSelect
              {...a11y("brief-closings", undefined, "Optional. A rough average is fine.")}
              name="closings"
              value={values.closings}
              onChange={(e) => set("closings", e.target.value)}
            >
              <option value="">Select a range</option>
              {CLOSINGS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </NativeSelect>
          </Field>
        </div>
      )}

      {/* ---------- Step 3 ---------- */}
      {step === 3 && (
        <div className="space-y-8">
          <fieldset
            className="space-y-3"
            data-invalid={errors.services ? "true" : undefined}
            aria-describedby={errors.services ? "brief-services-error" : "brief-services-hint"}
          >
            <legend className={labelClass}>
              Services needed
              <Req />
            </legend>
            <p id="brief-services-hint" className="text-xs text-muted-foreground">
              Pick everything that applies.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const id = `brief-service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                const checked = values.services.includes(service);
                return (
                  <label
                    key={service}
                    htmlFor={id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 border bg-background px-3 py-3 text-sm transition-colors",
                      checked ? "border-foreground text-foreground" : "border-border text-foreground hover:border-foreground/40",
                    )}
                  >
                    <Checkbox
                      id={id}
                      name="services"
                      value={service}
                      checked={checked}
                      onCheckedChange={(c) => toggleService(service, c === true)}
                      className="rounded-none border-foreground/50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background"
                    />
                    <span>{service}</span>
                  </label>
                );
              })}
            </div>
            {errors.services && (
              <p id="brief-services-error" className="text-xs text-destructive">
                {errors.services}
              </p>
            )}
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="brief-budget" label="Monthly budget" hint="Optional. Helps us scope honestly.">
              <NativeSelect
                {...a11y("brief-budget", undefined, "Optional. Helps us scope honestly.")}
                name="budget"
                value={values.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                <option value="">Select a range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field id="brief-package" label="Package of interest" hint="Optional. Leave blank if you're not sure.">
              <NativeSelect
                {...a11y("brief-package", undefined, "Optional. Leave blank if you're not sure.")}
                name="package"
                value={values.pkg}
                onChange={(e) => set("pkg", e.target.value)}
              >
                <option value="">Not sure yet</option>
                {PACKAGES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          </div>
        </div>
      )}

      {/* ---------- Step 4 ---------- */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="brief-start" label="Ideal start" required error={errors.start}>
              <NativeSelect
                {...a11y("brief-start", errors.start)}
                name="start"
                required
                value={values.start}
                onChange={(e) => set("start", e.target.value)}
              >
                <option value="">Select a window</option>
                {STARTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field id="brief-source" label="How did you find PMO Media?">
              <NativeSelect
                {...a11y("brief-source")}
                name="source"
                value={values.source}
                onChange={(e) => set("source", e.target.value)}
              >
                <option value="">Select one</option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          </div>
          <Field id="brief-pain" label="Biggest marketing pain right now">
            <Textarea
              {...a11y("brief-pain")}
              name="pain"
              rows={5}
              placeholder="What is not working, and what it is costing you."
              value={values.pain}
              onChange={(e) => set("pain", e.target.value)}
              className="min-h-[140px] rounded-none border-input bg-background text-base md:text-sm"
            />
          </Field>

          {status === "error" && (
            <div role="alert" className="border border-destructive/60 bg-background p-4 text-sm">
              <p className="font-medium text-foreground">The brief didn&rsquo;t send.</p>
              <p className="mt-1 text-muted-foreground">
                Your answers are still here. Try again, or send the same brief straight from your email client:
              </p>
              <a
                href={mailtoFallback(values)}
                className="mt-3 inline-block underline underline-offset-4 transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Email the brief to {site.email}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <button type="button" onClick={back} disabled={sending} className="btn-ghost disabled:cursor-not-allowed disabled:opacity-60">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending || undefined}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {step < TOTAL_STEPS ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          ) : sending ? (
            "Sending…"
          ) : (
            "Submit brief"
          )}
        </button>
      </div>
    </form>
  );
}
