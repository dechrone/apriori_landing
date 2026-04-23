# CLAUDE.md

Guidance for Claude Code working on the Apriori frontend.

## Commands

```bash
npm run dev        # dev server on localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

No test suite. ESLint 9 flat config (`eslint.config.mjs`) with Next.js core-web-vitals + TypeScript rules.

## Architecture

**Next.js 16 App Router SaaS** backed by Supabase (Postgres + Auth). Light-themed UI (warm paper background, gold accents).

### Routes

- `/` — Public landing (Hero, TheProblem, WorkflowSteps, WhatYouGet, DemoSection, FAQ, AboutUs, FinalCTA). Hero + FinalCTA CTAs route to `/signup`.
- `/r/[shareId]` — **Public** unauthenticated viewer for shared simulation reports. Hits `GET /api/v1/simulations/shared/{shareId}`, renders the usability report with a "Shared report" banner + a CTA to run your own.
- `/demo/*` — Frozen founder-demo reports (univest, flent, hexahealth, etc.).
- `/audit` — Public ad portfolio / product flow audit pages (still mock submissions).
- `/signup`, `/joinwaitlist` — Public signup / waitlist.
- `/sign-in`, `/sign-up` — Supabase Auth pages (Google OAuth).
- `/auth/callback` — OAuth redirect; exchanges `?code=` for a session cookie.
- `/(app)/*` — Protected (wrapped by `AuthGuard`):
  - `/dashboard`, `/simulations`, `/audiences`, `/assets`, `/insights`, `/product-context`, `/settings`, `/pricing`
  - `/simulations/new/[type]` — simulation wizards (product-flow, ad-portfolio, product-flow-comparator)
  - `/simulations/[id]`, `/simulations/ad-portfolio/[id]`, `/simulations/product-flow-comparator/[id]` — result views

### Key patterns

- **Auth** — Supabase `AuthContext` exposes `user`, `session`, `getAccessToken()`. `UserContext` loads the profile + credit snapshot once per session. Providers stack in `ClientAppLayout.tsx`: ToastProvider → AppShellProvider → AuthGuard → UserProvider.
- **Path alias** — `@/*` → `./src/*`.
- **State** — React Context only (no Redux/Zustand).
- **Data** — Supabase Postgres with RLS. Every row carries `user_id`; policies scope access to `auth.uid()`. Mutations via `src/lib/db.ts` or the Supabase RPCs in `supabase/schema.sql`.
- **Credits** — `profiles.credits_remaining` + `public.credit_transactions` ledger. Debits go through the `debit_credits` RPC (atomic balance check + ledger insert). New users get 200 credits via the `handle_new_user` trigger.
- **NDJSON streaming** — `src/lib/stream-simulation.ts::consumeNDJSONStream()` buffers partial lines and accepts an `AbortSignal`. The `personas_loaded` event carries `retrieval_mode` + `matched_count`; when retrieval falls back to `relaxed` or `random_fallback`, the product-flow wizard shows an amber notice in the progress panel.

### Free-PM product-flow wizard

`src/app/(app)/simulations/new/product-flow/page.tsx`, three steps:

1. **Setup** — simulation name, free-text "objective" (plumbed to `simulation_intent.intent_narrative`), audience (own or curated template).
2. **Select assets** — inline uploader (drag PNG/JPEG/WebP, reorder with up/down, remove) creates a folder + uploads on Next. No page-hop to `/assets`. Existing ready folders accessible via a collapsible fallback.
3. **Parameters** — single metric (Activation) + summary. Sends `numPersonas: 50` hardcoded; backend takes `numPersonas` over legacy `personaDepth`.

### Share + results

`src/app/(app)/simulations/[id]/page.tsx` has a "Share report" button that calls `POST /api/v1/simulations/{id}/share` and copies the `/r/{shareId}` URL to the clipboard. Helpers: `toggleSimulationShare`, `fetchSharedSimulation`, `fetchSimulationById` in `src/lib/backend-simulation.ts`.

`src/components/flow-analysis/ReadingGuide.tsx` renders a dismissible explainer strip above the tab bar on every flow-analysis view. Dismissal persists in `localStorage` under `apriori.readingGuide.dismissed.v1`.

### Key directories

| Path | Purpose |
|------|---------|
| `src/app/api/` | Route handlers (upload-asset, delete-asset via Cloudinary) |
| `src/components/ui/` | Reusable base components |
| `src/components/app/` | App shell (Sidebar, TopBar, AuthGuard, AppShell) |
| `src/components/flow-analysis/` | Flow analysis result views + reading guide |
| `src/components/comparator/`, `src/components/deep-dive/`, `src/components/SimulationOverview/` | Report sub-views |
| `src/lib/supabase/` | `browser.ts` / `server.ts` / `admin.ts` clients + row-type shapes |
| `src/lib/db.ts` | Supabase data layer (profile, audiences, simulations, assets, credits) |
| `src/lib/backend-simulation.ts` | Simulation triggers + share helpers |
| `src/lib/stream-simulation.ts` | NDJSON stream consumer |
| `src/contexts/` | `AuthContext`, `UserContext`, `AuditModalContext` |
| `src/config/content.ts` | UI copy for the landing page |

### Styling

Tailwind CSS 4 (PostCSS plugin) + CSS custom properties in `src/app/globals.css` and `src/styles/deepDiveTokens.css`. Use the existing CSS variables over hardcoded colors.

### Supabase

Schema + RLS policies + credit RPCs live in `supabase/schema.sql` — run once per environment via the SQL Editor. Required env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`. The FastAPI backend verifies the same Supabase JWTs — one identity source across frontend + backend.
