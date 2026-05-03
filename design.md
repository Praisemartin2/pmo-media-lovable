# PMO Media — Design System

A complete design system for **PMO Media LLC**, a digital brand partner for top-producing realtors, brokerages, and property teams. Aesthetic is editorial, mechanical, and confident — bone paper + ink black + forest green, with Archivo typography and JetBrains Mono for technical detail.

---

## 1. Brand Identity

**Name:** PMO Media LLC
**Tagline:** Real Estate Marketing, Done Right.
**Voice:** Direct, opinionated, technical. Treats marketing as infrastructure, not content. No jargon, no fluff, no agency theatre.
**Aesthetic:** Editorial magazine meets engineering doc. Light bone background, ink-black type, deep forest accent. Sharp typographic contrast. Generous whitespace. Mechanical detailing (mono captions, section numbering, thin rules).

---

## 2. Color System

### Bone (paper / surface)
Used for backgrounds, surfaces, and light containers. Warm off-white, never pure white.

| Token      | Hex      | Use                                  |
|------------|----------|--------------------------------------|
| `bone-50`  | #F4F2EC  | Lightest paper / card backgrounds    |
| `bone-100` | #ECE9E1  | Section backgrounds, inverse type    |
| `bone-200` | #E4E2DC  | Default page background              |
| `bone-300` | #D8D4C8  | Subtle dividers                      |
| `bone-400` | #BFBAAA  | Disabled / faded                     |

### Ink (text / dark surfaces)
Used for primary text, dark sections, and high-contrast surfaces.

| Token       | Hex      | Use                                |
|-------------|----------|------------------------------------|
| `ink-1000`  | #0C0C0C  | Deepest black (final CTA gradient) |
| `ink-900`   | #161616  | Primary text, dark sections        |
| `ink-800`   | #2A2926  | Secondary heading text             |
| `ink-700`   | #3F3D38  | Body text on light                 |
| `ink-600`   | #5B5852  | Muted / caption text               |
| `ink-500`   | #7A766E  | Subtle text                        |
| `ink-400`   | #9B968C  | Faded / disabled text              |

### Forest (accent / primary action)
The single accent color. Used for primary CTAs, italic emphasis, and brand moments. Never decorative — always meaningful.

| Token         | Hex      | Use                                  |
|---------------|----------|--------------------------------------|
| `forest-900`  | #0E2E1E  | Hero / dark gradient end             |
| `forest-800`  | #14422A  |                                      |
| `forest-700`  | #1A5134  | Hero / dark gradient start           |
| `forest-600`  | #1F5A3A  | **Primary brand color, all CTAs**    |
| `forest-500`  | #2A6E48  | Primary hover                        |
| `forest-400`  | #4A8D68  | Avatar gradient                      |
| `forest-300`  | #7FB296  | **Italic accent on dark backgrounds**|
| `forest-200`  | #B7D5C3  | Soft accent                          |
| `forest-100`  | #DEEAE2  | Hero eyebrow text                    |
| `forest-50`   | #EEF4F0  | Lightest tint, icon backgrounds      |

### Semantic mapping
- **Background (default):** `bone-200`
- **Surface (cards):** `bone-50` or white
- **Primary text:** `ink-900`
- **Muted text:** `ink-600`
- **Border (light):** `rgba(22,22,22,0.10)` (ink-900 at 10% alpha)
- **Border (strong):** `rgba(22,22,22,0.22)` (ink-900 at 22% alpha)
- **Accent / CTA:** `forest-600`

---

## 3. Typography

### Font families
- **Display + Sans:** [Archivo](https://fonts.google.com/specimen/Archivo) — weights 300, 400, 500, 600, 700, 800. Used for everything except technical labels.
- **Mono:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — weights 400, 500. Used **only** for: small caps labels, section numbers, technical metadata, eyebrow text.

### Type scale

| Style       | Size                         | Weight | Tracking  | Line-height | Use                           |
|-------------|------------------------------|--------|-----------|-------------|-------------------------------|
| `h1`        | clamp(40px, 6vw, 72px)       | 700    | -0.03em   | 1.05        | Hero headline                 |
| `h2`        | clamp(32px, 4.2vw, 48px)     | 700    | -0.025em  | 1.1         | Section headlines             |
| `h3`        | clamp(22px, 2.4vw, 28px)     | 600    | -0.015em  | 1.2         | Card titles                   |
| `lead`      | 18px                         | 400    | normal    | 1.55        | Sub-heading body              |
| `body`      | 16px                         | 400    | normal    | 1.55        | Default paragraph             |
| `body-sm`   | 14px                         | 400    | normal    | 1.5         | Card body, secondary          |
| `body-xs`   | 13px                         | 400    | normal    | 1.5         | Footer body                   |
| `caps`      | 11px                         | 500    | 0.14em    | normal      | Eyebrows, labels (mono, UPPERCASE) |
| `caps-xs`   | 10px                         | 500    | 0.14em    | normal      | Tiny stat labels (mono, UPPERCASE) |

### Italic accent treatment
Selected words are styled as italic + lighter weight + accent color. Used to add lyrical contrast inside otherwise-bold heads.

- On light bg: `font-style: italic; font-weight: 400; color: forest-600;`
- On dark bg: `font-style: italic; font-weight: 400; color: forest-300;`

Examples:
- `Get More Real Estate Leads with PMO Media.` → "with PMO Media." is italic accent
- `Your market is deciding right now.` → "deciding" is italic accent
- `Twenty minutes. No deck.` → "No deck." is italic accent

### Caps treatment
All small uppercase labels use:
```
font-family: JetBrains Mono;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.14em;
text-transform: uppercase;
```
Often paired with the **`§`** symbol for "section" markers (e.g. `§ Discovery`, `§ Start a partnership`).

---

## 4. Spacing & Layout

### Container
- Max width: **1200px**
- Horizontal padding: **32px** desktop, **20px** mobile
- Centered (`margin: 0 auto`)

### Section padding (vertical)
- Standard sections: **88px** top/bottom
- Hero / featured: **96px** top/bottom
- Compact bands (Recognition, Featured In): **56-64px**
- Mobile reduces all to **64px**

### Common spacing scale
2px, 4px, 6px, 8px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 56px, 64px, 72px, 88px, 96px, 120px

### Grid systems
- **2-column split:** equal halves with `gap: 72px` (Feature highlights)
- **2-column asym:** `1fr 1.2fr` with `gap: 64px` (Value Prop)
- **3-column:** equal `gap: 28px` (Why cards, Testimonials)
- **4-column:** equal `gap: 20px` (Packages)
- **6-column:** equal `gap: 24px` (Recognition row, stats strip)
- All collapse to single column at < 960px

### Border radius
- **Small:** 4px (buttons, fields, recognition cards)
- **Medium:** 6px (testimonial cards, info cards)
- **Large:** 8px (modal cards, package cards)
- **XL:** 12px (feature visual blocks)
- **Full:** 999px (pills, avatars, check circles)

### Shadows
- **Card hover:** `0 12px 32px -16px rgba(0,0,0,0.18)`
- **Featured card:** `0 20px 40px -20px rgba(0,0,0,0.3)`
- **Visual block:** `0 24px 48px -24px rgba(14,46,30,0.4)`
- **Modal:** `0 30px 60px -20px rgba(0,0,0,0.5)`
- **Nav scrolled:** `0 1px 0 rgba(22,22,22,0.22), 0 8px 24px -16px rgba(0,0,0,0.08)`

---

## 5. Motion

### Easing
- **Default:** `cubic-bezier(0.22, 1, 0.36, 1)` — "out-expo", quick start, smooth settle
- Used for hover transitions, fades, and most state changes

### Duration
- **Fast:** 140ms — color/background hover
- **Medium:** 240ms — transform hover, accordion
- **Slow:** 320-420ms — modal entrance, fadeup

### Keyframes
```css
@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fadeup {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Hover patterns
- **Cards:** `translateY(-4px)` + shadow + border color shift to `forest-600`
- **Featured card:** sits at `translateY(-8px)` baseline, hovers to `translateY(-12px)`
- **Buttons:** background/border color shift only (no transform)

---

## 6. Components

### Buttons

Four variants, three sizes. All have `border-radius: 4px`, `font-weight: 600`, `font-size: 15px`, gap between icon and text of `10px`.

| Variant            | Default                                          | Hover                              |
|--------------------|--------------------------------------------------|------------------------------------|
| `primary`          | bg `forest-600`, text white, border `forest-600` | bg `forest-500`                    |
| `secondary`        | bg transparent, text `ink-900`, border `ink-900` | bg `ink-900`, text `bone-100`      |
| `light`            | bg `bone-100`, text `ink-900`, border `bone-100` | bg white, border white             |
| `outline-light`    | bg transparent, text white, border `white/45`    | bg `white/10`, border white        |

Sizes:
- `sm`: padding `10px 18px`, font `13px`
- `md` (default): padding `14px 26px`, font `15px`
- `lg`: padding `18px 32px`, font `15px`

Disabled state: `opacity: 0.5; cursor: not-allowed;`

### Nav bar
- Sticky to top, `z-index: 50`
- Background `bone-50`, bottom border `1px solid ink-900/10`
- Padding `14px 32px`, max width 1320px
- On scroll past 16px: adds shadow
- Left: logo image (38px tall) + brand text "PMO MEDIA" in display 700
- Right: phone link (icon + number, hides on mobile) + primary CTA button

### Hero
- Background: linear gradient `135deg, forest-700 0%, forest-900 100%`
- Plus radial gradient overlays at 20%/20% (forest-300 at 18% alpha) and 80%/80% (forest-600 at 40% alpha)
- Content max-width 880px
- Eyebrow pill: `bg-white/8`, `border-white/18`, `text-forest-100`, mono caps
- Headline H1 in white with italic accent in `forest-300`
- Body in `bone-100/88` at 19px
- CTA row: light button + outline-light button

### Cards (Why / Feature cards)
- Surface `bone-50`, border `1px solid ink-900/10`, radius 6px
- Padding `40px 32px`
- Hover: `translateY(-4px)`, shadow, border `forest-600`
- Icon container: 56×56, radius 8px, bg `forest-50`, icon `forest-600` at 26px stroke 1.8

### Package cards
- Standard: white bg, `ink-900/10` border, radius 8px, padding `32px 24px`
- Featured: `ink-900` bg, `bone-100` text, `-translate-y-2` baseline, larger shadow
- "Most Popular" badge: pill positioned at top center, `forest-600` bg, white text, mono caps
- Feature list: check icon (`forest-600` on light, `forest-300` on featured) + body-sm text

### Form fields
- Input: white bg, border `ink-900/22`, radius 4px, padding `12px 14px`, font 15px
- Focus: border `forest-600`, ring `forest-600/12` at 3px
- Label: caps style, `ink-600`, margin-bottom 6px
- Required marker: ` *` after label text in default color (or `forest-600`)

### Chips (multi-select)
- Default: white bg, `ink-900/22` border, radius 999px, padding `9px 14px`, font 13px
- Hover: border `ink-900`
- Active: `forest-600` bg, white text, `forest-600` border

### Modal
- Backdrop: `ink-1000/72` with `backdrop-blur-md`
- Card: `bone-50` bg, radius 8px, max 1080px × 96vw, max 94vh
- Grid: `360px 1fr` (aside + body), single column on mobile
- **Aside:** linear gradient `forest-700` → `forest-900`, `bone-100` text, padding `36px 32px`
- **Body:** `bone-50` bg, padding `28px 36px`
- Close button: 36×36, `ink-900/22` border, radius 4px, hover `ink-900`/`bone-100`
- Animation: backdrop `fadein 280ms`, card `fadeup 320ms`

### Calendar
- Grid `repeat(7, 1fr)` with 1px gap, dark border
- Day cells: white bg, padding `12px 10px`, min-height 64px
- Available: small `forest-600` dot in lower right
- Selected: `ink-900` bg, `bone-100` text, dot becomes `forest-300`
- Disabled: `bone-50` bg, `ink-400` text

### Time slots
- White bg, `ink-900/22` border, radius 4px, padding `10px 12px`, font 13px
- Hover: border `ink-900`
- Active: `forest-600` bg, white text
- Booked: opacity 0.4, line-through, disabled

### Footer
- Background `ink-900`, text `bone-200`, padding `64px 0 32px`
- Grid `2fr 1fr 1fr 1fr` for brand + 3 link columns
- Logo inverted to white via `filter: brightness(0) invert(1)`
- Section headings: caps style, `forest-300`
- Links: `bone-100/78`, hover white
- Bottom row: copyright + location, `bone-100/55`, top border `white/8`

### Avatar (testimonial)
- 40×40 round
- Background: linear gradient `135deg, forest-400, forest-700`
- White initials, font-bold, 14px

### Star rating
- Lucide `Star` icon, size 16, fill `forest-600`
- 5 stars in a row, gap 2px

### Stat block
- Number: display font, weight 700, size 36px, tracking `-0.025em`, color `forest-600`
- Label: caps, size 10px, `ink-600`, margin-top 8px

### Visual block (feature highlight)
- Aspect 4:3, radius 12px
- Background: linear gradient `135deg, forest-700, forest-900`
- Overlaid with grid pattern + radial highlight (decorative)
- Content: padding 36px, `bone-100` text, justify-between
- Tag pill at top, title + meta grid at bottom (2 cols, 16px gap)
- Meta number: display 700, 28px, `forest-300`
- Meta label: mono caps, `bone-100/70`

---

## 7. Iconography

- Library: **lucide-react** (or matched SVG library)
- Default size: 16px (in buttons), 20-26px (feature icons)
- Default stroke: 1.8 - 2.0 (slightly heavier than lucide default)
- Linecap/join: round
- Icons used: `Phone`, `ArrowRight`, `ArrowLeft`, `Check`, `X`, `Calendar`, `Star`, `Sparkles`, `Layers`, `Target`

---

## 8. Page Structure (sections, in order)

1. **Nav** — sticky, logo + phone + primary CTA
2. **Hero** — forest gradient, headline with italic accent, sub-copy, two CTAs
3. **Value Prop** — 2-col, headline + 4 checkmark benefits + CTA
4. **Why** — 3 feature cards on bone-200 bg
5. **Packages** — 4 tier cards (3rd is "Most Popular" featured), no prices, "Request a Proposal" CTAs
6. **Recognition** — 6 trust badges in a row
7. **Social Proof** — eyebrow + headline, 6-stat strip, 3 testimonial cards
8. **Feature Highlight 1** — text left, visual right
9. **Feature Highlight 2** — visual left, text right (reversed)
10. **Featured In** — publication logos in a row
11. **Final CTA** — `ink-900`/`ink-1000` gradient, headline + 2 CTAs
12. **Footer** — `ink-900`, brand + 3 link columns + copyright

### Modals (overlays, not in scroll flow)
- **Lead Form Wizard** — 4-step modal: Who → Business → Needs → Context → Submitted
- **Scheduler** — calendar grid + time slots → confirmed

---

## 9. Voice & Copy

### Tone rules
- Direct, not corporate. "We don't post. We position."
- Technical when it earns it. Numbers always specific (`$340M`, `94 days`, `+1,160%`).
- Anti-agency. Reject jargon: no "synergy," "ecosystem," "transform your business."
- Editorial confidence. The brand has a point of view.

### Headline patterns
- Outcome statement + italic accent twist:
  - "Get More Real Estate Leads *with PMO Media*."
  - "Your market is *deciding* right now. Make them decide on you."
- Short declaratives:
  - "Find your fit."
  - "Don't take our word for it."
- Anti-promise:
  - "If we can't measure it, we don't sell it."
  - "We don't post. We position."

### Caps eyebrow patterns
- `§ DISCOVERY`
- `§ START A PARTNERSHIP`
- `WHY PMO MEDIA`
- `READY TO SCALE?`
- `REAL RESULTS, REAL SUCCESS STORIES`

### Don'ts
- No exclamation points.
- No emojis.
- No phrases like "let us help you" or "partner with us today."
- No pricing on any landing page surface.

---

## 10. Brand Story (for context)

**Founder:** Praise Martin-Oguike
**Studio:** PMO Media LLC, Washington DC, est. 2021
**Pitch:** *"I started PMO Media because real estate marketing is broken — agents either shout into the void or hire 'content creators' who can't close a lead to save their life. I build marketing systems that act like a second producer on your team — one that shows up every week, holds a point of view, and moves leads through a funnel instead of a feed."*
**Differentiator:** One principal on every account. No agency layers. No account-manager telephone game.
**Engagement model:** 90-day minimum retainer, then month-to-month. Custom proposal within 24 hours of inbound.

---

## 11. Reference Implementation

A working React + Vite + TypeScript + Tailwind implementation of this design system lives at:
**https://github.com/Praisemartin2/pmo-media-lovable**

The Tailwind config (`tailwind.config.js`) contains the full color and font token mapping. Each section is a single component in `src/components/`.