# CLAUDE.md

Guidance for Claude Code on the Apriori frontend.

## Commands

```bash
npm run dev        # localhost:3000
npm run build      # production build
npm run lint       # ESLint 9 flat config (Next.js core-web-vitals + TypeScript)
```

No test suite.

## Architecture

**Next.js 16 App Router SaaS** backed by Supabase (Postgres + Auth). Light-themed UI (warm paper background, gold accents). Tailwind 4 (PostCSS plugin) + CSS custom properties in `src/app/globals.css` and `src/styles/deepDiveTokens.css`. Prefer existing CSS variables over hardcoded colors.

### Routes

- `/` — public landing (Hero, TheProblem, WorkflowSteps, WhatYouGet, DemoSection, FAQ, AboutUs, FinalCTA). CTAs route to `/signup`.
- `/r/[shareId]` — **public** unauthenticated viewer for shared simulation reports.
- `/demo/univest` — frozen founder-demo report linked from the public landing.
- `/signup`, `/joinwaitlist` — public signup / waitlist.
- `/sign-in`, `/sign-up` — Supabase Auth pages (Google OAuth).
- `/auth/callback` — OAuth redirect; exchanges `?code=` for a session cookie.
- `/(app)/*` — protected (wrapped by `AuthGuard`):
  - `/dashboard`, `/simulations`, `/audiences`, `/assets`, `/product-context`, `/settings`, `/pricing`
  - `/simulations/new/{product-flow,product-flow-ab,product-flow-comparator}` — wizards
  - `/simulations/[id]`, `/simulations/product-flow-comparator/[id]` — result views

### Key patterns

- **Auth** — Supabase `AuthContext` exposes `user`, `session`, `getAccessToken()`. `UserContext` loads profile + credit snapshot once per session. Provider stack in `ClientAppLayout.tsx`: ToastProvider → AppShellProvider → AuthGuard → UserProvider → TalkToUsProvider.
- **Path alias** — `@/*` → `./src/*`.
- **State** — React Context only (no Redux/Zustand).
- **Data** — Supabase Postgres with RLS. Every row carries `user_id`; policies scope access to `auth.uid()`. Mutations via `src/lib/db.ts` or the Supabase RPCs in `supabase/schema.sql`.
- **Credits** — `profiles.credits_remaining` + `public.credit_transactions` ledger. Debits go through the `debit_credits` RPC. New users get 200 credits via the `handle_new_user` trigger.
- **NDJSON streaming** — `src/lib/stream-simulation.ts::consumeNDJSONStream()` buffers partial lines and accepts an `AbortSignal`.

### Free-PM product-flow wizard

`src/app/(app)/simulations/new/product-flow/page.tsx` is the two-phase audience-segments wizard. Phase 1 (`startProductFlow`) generates 9 segment tiles + runs `analyze_product` in parallel; user picks 5; phase 2 (`runWithSegments`) runs the sim. Saved audiences (`startFromSavedAudience`) skip both phases. 25 personas hardcoded.

### Share + results

`src/app/(app)/simulations/[id]/page.tsx` has a "Share report" button that calls `POST /api/v1/simulations/{id}/share` and copies the `/r/{shareId}` URL. Helpers in `src/lib/backend-simulation.ts`: `toggleSimulationShare`, `fetchSharedSimulation`, `fetchSimulationById`.

### A/B comparator: lever attribution

The comparator results page (`/simulations/product-flow-comparator/[id]`) renders `AbReportView` which includes Section 02b "Winning lever combinations" between the per-screen overlay (02) and persona split (03). Section is hidden when the report's `lever_attribution` is null (legacy reports or runs where lever extraction couldn't produce an inventory). Schema: `LeverAttribution { top_combinations[], by_segment{}, notes }` with each `LeverCombination` carrying `levers[]` (lever_ids), `variant`, `persona_count`, `convert_rate`, `delta_vs_baseline`, optional `cohort`, and an LLM-written `interpretation`. The "How the screen landed" overlay (Section 02) reads the same `ScreenElement[]` shape it always did — backend produces principled per-element verdicts when an inventory is present, falls back to vision-LLM inference when not.

Image hosts: `next.config.ts::remotePatterns` whitelists `*.supabase.co` so user-uploaded variant screenshots render via `next/image` in the AB overlay. Assets live in the `apriori-assets` Supabase Storage bucket.

### Key directories

| Path | Purpose |
|---|---|
| `src/app/api/` | Route handlers: `upload-asset`, `delete-asset` (proxied to backend → Supabase Storage), `feedback`, `signup` |
| `src/components/ui/` | Reusable base components |
| `src/components/app/` | App shell (Sidebar, TopBar, AuthGuard, AppShell, ClientAppLayout) |
| `src/components/flow-analysis/` | Flow analysis result views + reading guide |
| `src/components/comparator/`, `deep-dive/`, `SimulationOverview/`, `ab-report/` | Report sub-views |
| `src/lib/supabase/` | `browser.ts` / `server.ts` / `admin.ts` clients + row types |
| `src/lib/db.ts` | Supabase data layer (profile, audiences, simulations, assets, credits) |
| `src/lib/backend-simulation.ts` | Simulation triggers + share helpers |
| `src/lib/stream-simulation.ts` | NDJSON stream consumer |
| `src/contexts/` | `AuthContext`, `UserContext` |
| `src/config/content.ts` | UI copy for the landing page |

### Supabase

Schema + RLS policies + credit RPCs live in `supabase/schema.sql` — run once per environment via the SQL Editor. Required env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_BACKEND_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`. The FastAPI backend verifies the same Supabase JWTs.
