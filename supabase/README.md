# Supabase — Apriori frontend

This directory holds the SQL for the Supabase project that backs the Next.js
app. The frontend talks to Postgres directly (RLS-gated) and to Supabase
Auth for Google OAuth. The FastAPI simulation engine verifies the same
Supabase JWTs, so there's one identity source across the stack.

## One-time setup

1. Create a Supabase project (Pro plan for prod).
2. In **Authentication → Providers**, enable **Google** and add your OAuth
   client ID/secret. Set the redirect URL to
   `https://YOUR-DOMAIN/auth/callback` (plus `http://localhost:3000/auth/callback`
   for local dev).
3. In **SQL Editor**, run [`schema.sql`](./schema.sql) once. It creates
   tables, RLS policies, the new-user trigger, and the credit RPC functions.
   The script is idempotent — re-run it whenever you pull a schema change.
4. Copy the URL + anon key + service-role key into `.env.local`
   (see `.env.example`).

## What lives where

| Table | Purpose |
|-------|---------|
| `profiles` | Mirrors `auth.users`. Holds plan + credit counters + `has_seen_welcome`. |
| `credit_transactions` | Append-only ledger. Every debit/refund/grant writes one row. |
| `product_context` | Per-user product-flow settings. 1:1 with `profiles`. |
| `audiences` | User-defined audiences + the full filter tree. |
| `simulations` | One row per completed run. `result` holds the full backend payload. |
| `asset_folders` | Folder tree (supports sub-folders via `parent_id`). |
| `assets` | Individual screens + ad creatives, metadata + CDN URLs. |
| `signups` | Landing-page waitlist. Public-insert, admin-only read. |

Row-Level Security is enabled on every table. Policies scope each query to
`auth.uid() = user_id`, so a compromised anon key can't read other users'
data.

## Credits

* Every new auth user gets `apriori_signup_bonus()` credits (default **200**)
  via the `handle_new_user` trigger. Edit the function body to change the
  grant. Existing users are unaffected.
* Client code debits credits with `supabase.rpc('debit_credits', ...)`
  (wrapped in `debitCredits` in `src/lib/db.ts`). The RPC is `security
  definer` — it checks the balance and writes the ledger row in a single
  transaction. `insufficient_credits` is raised (and surfaced as
  `ok: false`) when the user would go negative.
* `refund_credits` reverses a debit when a simulation fails server-side.
* `grant_credits(user_id, amount, reason)` is admin-only: `EXECUTE` is
  revoked from `anon` / `authenticated`. Run it from the SQL Editor or
  the service-role admin client for manual top-ups.

## Where the frontend hooks in

* `src/lib/supabase/browser.ts` — client-side singleton.
* `src/lib/supabase/server.ts` — cookie-bound client for route handlers / RSCs.
* `src/lib/supabase/admin.ts` — service-role client (bypasses RLS).
* `src/lib/db.ts` — data-layer helpers for every table.
* `src/contexts/AuthContext.tsx` — Google OAuth + session state.
* `src/contexts/UserContext.tsx` — profile + credits snapshot per session.
* `src/app/auth/callback/route.ts` — OAuth redirect target.

## Local smoke test

```bash
# After running schema.sql in the SQL Editor and setting .env.local:
npm install
npm run dev
# → Sign in with Google → dashboard should load with 200 credits.
```

Check `public.profiles` in Supabase to verify the row was created.
Check `public.credit_transactions` to verify the signup bonus was
recorded.

## Regenerating types (optional)

If you want strict typed queries, install the Supabase CLI and run:

```bash
supabase gen types typescript --project-id YOUR-REF --schema public \
  > src/lib/supabase/types.generated.ts
```

Then swap `types.ts` imports to the generated file. The current hand-written
shape in `types.ts` is enough for the row-conversion helpers in `db.ts`.
