# PMO Media — brand tokens v1 (proposed, from logo refinement)

## Palette
- INK      #0C0C0E  (near-black — grounds, dark lockup text is ICE)
- ICE      #DCE7F2  (cool white — all content type on black)
- CRIMSON  #C0261C  (THE red — ring accent, one emphasis element max per frame)
- DIM      #96A2AF  (secondary text, sublines, wordmark chip)
- WHITE    #FFFFFF  (light-ground docs only)

## Type
- Logo wordmark: Montserrat SemiBold caps, tracked
- Content display: Anton (condensed caps, ice) — from thebranding.ai study
- Content body: Inter Regular / Bold / Italic
- Labels/chips: Oswald SemiBold caps, letterspaced

## Logo system (pmo/brand/logo/)
- pmo_horizontal_light.png / pmo_horizontal_dark.png — primary lockups
- pmo_stacked_light.png / pmo_stacked_dark.png — square-ish placements
- pmo_avatar_1024.png — profile picture / app mark (device only)

## Usage rules
- Content ground is BLACK; type is ICE. Crimson appears once per frame at most
  (the differentiator vs thebranding.ai's colorless system).
- On footage: white type with soft shadow; no crimson over busy footage.
- Small sizes: use the avatar device, never the full lockup below 140px wide.
- Tagline "CREATIVE MARKETING. REAL ESTATE GROWTH." lives on documents and
  profile bio — not inside content frames.

## v2 (web) — additions from the site redesign, Sept 2026
The website ships a v2 of this system. Flag for the brand owner: the rules below supersede
the v1 "one crimson element per frame" rule **for the web only**; content frames keep v1 until decided.

### Palette additions (HSL, as used in `src/index.css`)
- COBALT  217 91% 60%  — secondary accent: eyebrows, rules, `.text-gradient` end stop, hover states
- AMBER   38 92% 55%   — secondary accent: eyebrows, the Google star, small tags
- NAVY    222 47% 9%   — section band (cool ground)
- WINE    4 45% 10%    — section band (warm ground)
- Ground lifts slightly on the web: INK 0 0% 4%, card 0 0% 8%, border 0 0% 16%; ICE brightens to 210 40% 96%.
- CRIMSON stays primary (4 78% 46%). Buttons stay crimson.

### Rules
- **One dominant colour per section** replaces "one crimson element per frame". Sections alternate mood
  (black / navy / wine / black …); crimson, cobalt or amber leads a section, never all three at once.
- `.text-gradient` (ice → cobalt) is allowed on **one word** per hero-scale headline.
- Imagery: dark gradient overlays, duotone / colour-grade treatments; every image sits on a
  gradient ground so a missing file still reads as designed.
- Shapes: 0.25rem radius, thick rules, big numerals, angled (clip-path) section edges on 2–3 bands.

### Tagline
- Web tagline: **"Real Estate Marketing, Done Right."** (site title, meta, footer).
- "CREATIVE MARKETING. REAL ESTATE GROWTH." remains the document / profile-bio tagline per v1 until the
  brand owner reconciles the two.
