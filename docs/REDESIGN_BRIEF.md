# PMO Media website — Redesign brief (round 2)

Project root: `/home/user/pmo-site` (Vite + React 18 + TS + Tailwind + shadcn/ui, `@/` alias = `src/`).
Build check: `cd /home/user/pmo-site && npm run build` (must pass; also `npx tsc -p tsconfig.app.json --noEmit`).
Do NOT touch `node_modules`, `dist`, `public/portfolio/**`, `public/brand/**`.

## Client feedback (verbatim intent, honour all of it)
1. Keep black ground and the red / white / black contrast and the sharp shapes — but make the site
   **brighter, with more colour, and more creative scroll effects**. Imagery currently reads bland and
   lifeless → put life into it.
2. Keep the social icons (footer) as they are.
3. The Ekabo Home portfolio has too much unneeded information → make the case study **concise**.
4. **Remove the 6 social clips grid** under Work (WorkGrid). The client will hand-pick clips later.
5. Testimonial section: keep as is. "Four steps, no fluff" process: keep. "Find your fit" packages: keep.
6. **Remove the "Built by a marketer who ships" About section completely.** Replace About with a
   company-level section (see §About). A short **Founder** sub-block with the bio below is fine.
7. This must read as a **professional, enterprise-grade brand-architecture firm**, not a solopreneur
   social-media-management shop. Say "we" / "PMO Media" / "our strategy team" — do not lean on the
   founder's first name across the site (only inside the Founder block and the brief-form privacy note).
8. Bring back the copy the client liked from the previous site:
   - Hero H1 (exact): **"Get More Real Estate Leads with PMO Media."**
   - Hero sub (exact): "Your real estate growth starts here. We build the brand, content engine, and lead
     system that turns top-producing realtors and brokerages into the obvious choice in their market."
   - Hero primary CTA: **"Get a Free Strategy Call"** → `/brief`. Secondary: "See Our Packages" → `#packages`.
   - A section built on **"A real partner — not another vendor."** (improve the messaging; old sub-copy:
     "We treat real estate as an infrastructure problem, not a content problem. Brand, system, and
     pipeline — built once, run weekly.")
   - Old "Ready to scale?" block: "Schedule your free 20-minute strategy call. No deck. No pitch. We
     diagnose your positioning, your market, and what we'd build if we partnered tomorrow."
   - Final CTA headline (old): "Your market is deciding right now. Make them decide on you."
9. Copy quality: the current copy is "just okay". Rewrite tighter, more confident, premium. Voice:
   direct, opinionated, technical; treats marketing as infrastructure. No "let us help you", no
   "partner with us today", no agency clichés, no exclamation marks.
10. **Numbers — hard rules.** Do NOT show: average ROI / 600%, volume closed / $340M, active brands /
    40+ brands, brand lift, partner rating, "94 days to first close", "Top Marketer", "Inman", "Forbes",
    "Entrepreneur", "Yahoo Finance", or ANY "featured in" claim (they have not been featured anywhere).
    The ONLY allowed proof points:
    - **5.0 Google rating** (real; show as "5.0" with a star and "Google rating")
    - 50 pieces of content produced & published in 8 weeks (Ekabo Home)
    - Followers ~100 → 1,500+ in under 12 months (client-reported)
    - 5-episode original animated series; 4 platforms (Instagram · TikTok · YouTube · LinkedIn)
    - 1 client video testimonial (Niyi Adewole, Ekabo Home). No other testimonials — the old site's
      "Marcus Ellison / Lena Halcyon / Meridian & Co." quotes are NOT real; never reuse them.

## Positioning (use everywhere)
PMO Media is a **brand architecture and growth firm for real estate** — top-producing realtors,
brokerages, teams and property companies. We design the brand, build the content engine and install the
lead system, then run it weekly and report on it. Tagline stays: **Real Estate Marketing, Done Right.**
Frame services as *capabilities* of a firm:
1. Brand Strategy & Positioning — audit, category, promise, voice, messaging architecture.
2. Identity & Design Systems — logo, visual system, templates, brand book, photography direction.
3. Content Engine — weekly short-form video, podcast clipping, carousels, original series; produced and published on a schedule.
4. Demand & Lead Systems — listing launches, Meta + Google acquisition, landing pages, retargeting.
5. Web & Digital Experience — editorial websites, IDX, conversion architecture.
6. Growth Intelligence — CRM (GoHighLevel) build, nurture, KPIs, monthly reporting, quarterly strategy.

## Founder bio (for the About → Founder block; factual, do not embellish)
Name: Praise Martin-Oguike · Title: Founder & Principal · Base: Washington, DC
Bio (use this, light edits OK):
"Praise Martin-Oguike was born in Abia State, Nigeria, raised in Woodbridge, New Jersey, and played
linebacker at Temple University before a professional career that ran through the Miami Dolphins, the
Arizona Cardinals, the XFL's Seattle Dragons and three seasons with the CFL's Ottawa Redblacks. He built
PMO Media on what that career taught him: systems beat talent, preparation is a weekly discipline, and
one small miss costs the whole team. A certified digital marketer with a background in digital strategy,
content and analytics — and time inside real estate operations at Harbor Group Management — he leads
strategy and creative direction on every PMO engagement."
Links: LinkedIn https://www.linkedin.com/in/praise-martin-oguike/
No headshot exists yet — design the block to work without one (typographic / logo-mark panel), with an
`image?: string` prop so a photo can be dropped in later.

## Visual system v2 (brighter, more colour, same DNA)
Tokens live in `src/index.css` (HSL only) and are surfaced in `tailwind.config.ts`.
- Ground stays near-black but lifts slightly: `--background: 0 0% 4%`, `--card: 0 0% 8%`,
  `--border: 0 0% 16%`. Foreground brightens to `--foreground: 210 40% 96%`.
- Crimson stays primary: `--primary/--crimson: 4 78% 46%`. Buttons stay crimson.
- NEW secondary colours (add tokens + Tailwind colours): `--cobalt: 217 91% 60%`, `--amber: 38 92% 55%`,
  `--navy: 222 47% 9%` (section band), `--wine: 4 45% 10%` (section band).
- Colour is allowed to be generous now: gradient glows (crimson→cobalt), amber/cobalt eyebrows, duotone
  image treatments, tinted section bands. Drop the old "one crimson element per section" rule — replace it
  with: **one dominant colour per section**, so sections alternate mood (black / navy / wine / black…).
- Type unchanged: Anton display caps, Inter body, Montserrat SemiBold (`font-mark`), Oswald (`font-label`).
  Add a `.text-gradient` utility (ice → cobalt) for one headline word per hero-scale headline.
- Shapes: keep the sharp 0.25rem radius, thick rules, big numerals; add angled/clipped section edges
  (`clip-path` polygon) on 2–3 bands for more energy.
- Imagery: six editorial photos will exist at `public/images/*.jpg` (see list). Use them with dark
  gradient overlays and colour grades (`mix-blend`, duotone via CSS). **Every image must degrade
  gracefully** — if the file is missing, the section must still look designed (gradient background), so
  always set a background colour/gradient behind `<img>` and never rely on the image for layout.
  - `/images/hero_neighborhood.jpg` (16:9, aerial suburb at blue hour) — hero background
  - `/images/blueprint_desk.jpg` (4:3, architect's desk) — "real partner" section
  - `/images/home_dusk.jpg` (3:2, luxury home at dusk) — capabilities / brand strategy
  - `/images/studio_camera.jpg` (4:5, cinema camera) — content engine / process
  - `/images/dc_rowhouses.jpg` (16:9, DC rowhouses) — About (company) section
  - `/images/bokeh_lights.jpg` (16:9, crimson/amber/cobalt bokeh) — final CTA / contact background

## Scroll & motion (must respect `prefers-reduced-motion`: reduce → no parallax, no marquee motion, instant reveals)
Create in `src/components/motion/`:
- `ScrollProgress.tsx` — 2px crimson bar fixed at top under the nav, width = scroll progress.
- `Parallax.tsx` — `<Parallax speed={0.2} className>` wraps children; translates on scroll via rAF +
  IntersectionObserver (only animates while on screen). Use `transform: translate3d`.
- `Marquee.tsx` — infinite horizontal band (CSS keyframes, duplicated content, `aria-hidden` duplicate,
  pause on hover). Used once between hero and the partner section with capability words separated by
  crimson diamonds: BRAND ARCHITECTURE ◆ CONTENT ENGINE ◆ LEAD SYSTEMS ◆ LISTING LAUNCHES ◆ CRM ◆ REPORTING.
- `CountUp.tsx` — animates a number from 0 when it enters view (handles "1,500+" and "5.0"; strings
  with non-numeric parts render instantly).
- `Reveal.tsx` (existing in shared/) — extend with `variant?: "up" | "left" | "right" | "scale" | "clip"`
  and `stagger` for children (`data-reveal-child`), keep the current default behaviour.
- `useInView.ts` hook shared by the above.
- Pinned split section: in the partner section the left headline column is `position: sticky` while three
  pillar cards scroll past on the right (lg+ only; stacked on mobile).
- Hover: cards get a subtle 3D tilt/lift + border glow; buttons get an arrow slide.
- Also use CSS scroll-driven animations where supported (`@supports (animation-timeline: view())`) for the
  hero image scale/fade; JS fallback = Parallax.

## Page composition (home, `src/pages/Index.tsx`, in order)
1. Nav (sticky, brighter, CTA "Free Strategy Call" → /brief). Links: Capabilities · Approach · Results · Packages · About · Contact.
2. Hero — full-bleed image background (parallax + gradient), H1/sub/CTAs above. No phone frame.
   Below the CTAs: a slim "5.0 ★ Google rating · Washington, DC · Serving markets nationwide" line.
3. Marquee band.
4. Partner section (`#approach`) — "A real partner — not another vendor." pinned split with 3 pillars:
   Brand architecture / Growth systems / Measured, weekly. Blueprint image with duotone.
5. Capabilities (`#services`) — 6 capability cards (3 bullets each), one hero card uses `home_dusk.jpg`.
6. Results (`#results`) — proof band (CountUp) with the 4 allowed numbers + the 5.0 Google rating,
   then the concise Ekabo case study (one paragraph, 3 outcomes, one still image from
   `/portfolio/sya75_ep5.jpg` or the carousel cover, no clip grid), then the Testimonial (unchanged).
7. Process — "Four steps, no fluff." (keep content; restyle with new tokens).
8. Packages — "Find your fit." (keep content; restyle).
9. About (`#about`) — company section: "Built like infrastructure. Run like a newsroom." style headline,
   mission paragraph, 3 values, `dc_rowhouses.jpg` treatment, then the **Founder** sub-block (bio above).
10. FAQ — keep; rewrite "Who actually does the work?" answer → "A principal-led strategy team with an
    AI-augmented production system. Senior people on every account, no hand-offs to juniors."
11. Contact CTA — keep the form; headline "Your market is deciding right now. Make them decide on you."
    with `bokeh_lights.jpg` background; the "Ready to scale?" copy as the left column intro.
12. Footer — keep social icons; capability links; "PMO Media LLC · Washington, DC · Serving markets nationwide".

`/work` page: keep the route but compose it as page header → concise case study → testimonial → CTA
(no grid). Delete `src/components/work/WorkGrid.tsx` and the `work` array export from
`src/data/portfolio.ts` (keep `caseStudy` and `testimonial`). Nav "Work" link is replaced by "Results".

## Forms / contact (unchanged behaviour)
FormSubmit AJAX to marketwithpmo@gmail.com stays exactly as implemented. Copy inside BriefForm /
ContactCTA should say "our strategy team" / "PMO Media" rather than the founder's first name, except the
privacy note may say "Read personally by the founder."
