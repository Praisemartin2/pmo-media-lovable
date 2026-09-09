# pmo-media.com

PMO Media — real estate marketing agency website. Vite + React + TypeScript + Tailwind (shadcn/ui).
Design system: black ground · ice-white type · one crimson accent per section (see `src/index.css`).

## Run
- `npm ci` then `npm run dev` (port 8080) · `npm run build` → `dist/`

## Deploy (Vercel — the domain already lives there)
- Vercel → Add New Project → Import this GitHub repo → Framework: Vite (auto) → Deploy.
- Project → Settings → Domains → add `pmo-media.com` and `www.pmo-media.com` (move them from the old project if prompted).
- `vercel.json` already handles SPA rewrites + cache headers. Every push to `main` redeploys.

A GitHub Pages preview also deploys from `main` (`.github/workflows/deploy-pages.yml`).

## Forms → marketwithpmo@gmail.com
Both forms (Contact + the 4-step Brief) post to FormSubmit's AJAX endpoint for marketwithpmo@gmail.com.
One-time: FormSubmit emails an **Activate** link to that inbox on the first submission — click it once and every
submission after that lands in the inbox with a table layout. No accounts, no keys.

## Content
- Company data, services, packages, FAQ: `src/data/site.ts`
- Portfolio + case study + testimonial: `src/data/portfolio.ts`, media in `public/portfolio/`
- Brand assets: `public/brand/` (logo lockups, avatar, OG image, favicons)
