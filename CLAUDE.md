# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build
npm run lint       # Run ESLint
npm run start      # Run production server
```

No test suite is configured. Linting uses ESLint 9 flat config (`eslint.config.mjs`) with Next.js core-web-vitals and TypeScript rules.

## Architecture

**Next.js 16 App Router SaaS** — a product simulation/testing platform (CrediGo Apriori). Dark-themed UI with Firebase backend.

### Route Structure

- `/` — Public landing page (Hero, Demo, Features, FAQ)
- `/audit` — Public ad portfolio and product flow audit pages
- `/(app)/*` — Protected app (requires Firebase auth via `AuthGuard`)
  - `/dashboard`, `/simulations`, `/audiences`, `/assets`, `/insights`, `/product-context`, `/settings`
  - `/simulations/new/[type]` — Simulation creation wizard (product-flow, ad-portfolio, comparator)
  - `/simulations/product-flow/[id]`, `/ad-portfolio/[id]` — Detailed result views

### Key Patterns

**Authentication:** Firebase Auth (Google OAuth) via `AuthContext`. `AuthGuard` wraps all `(app)` routes. User metadata lives in `FirebaseUserContext`.

**Layout Nesting:** `(app)/layout.tsx` → `ClientAppLayout.tsx` stacks providers in order: ToastProvider → AppShellProvider → AuthGuard → FirebaseUserProvider.

**Path Alias:** `@/*` maps to `./src/*`.

**State:** React Context only (no Redux/Zustand). Key contexts: `AuthContext`, `FirebaseUserContext`, `AuditModalContext`.

**Data:** Firestore for persistence; `/src/data/` has mock/sample data used for demos and development.

### Key Directories

| Path | Purpose |
|------|---------|
| `src/app/api/` | Route handlers (upload-asset, delete-asset via Cloudinary) |
| `src/components/ui/` | Reusable base components |
| `src/components/app/` | App shell (Sidebar, TopBar, AuthGuard, AppShell) |
| `src/lib/` | Firebase init, Firestore ops, API client, simulation logic |
| `src/types/` | TypeScript interfaces for simulation, audience, asset, comparator, etc. |
| `src/contexts/` | React Context providers |
| `src/data/` | Mock/sample data for demos |
| `src/config/content.ts` | UI copy/content management |

### Styling

Tailwind CSS 4 (PostCSS plugin) + extensive CSS custom properties defined in `src/app/globals.css` and `src/styles/deepDiveTokens.css`. Color tokens follow a dark theme: `--bg-primary` (#0A0E1A) with gold accents (#F59E0B). Use existing CSS variables rather than hardcoded colors.

### Firebase

Project: `credigo-bc4c7`. Client config in `src/lib/firebase.ts`, server-side admin in `src/lib/firebase-admin.ts`. Storage CORS configured via `npm run storage:cors`.
