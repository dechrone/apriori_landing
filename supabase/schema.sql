-- =============================================================================
-- Apriori — Supabase schema
--
-- Run this once per environment via the Supabase SQL editor (or `supabase db
-- push`). Idempotent — safe to re-run.
--
-- Conventions:
--   * Every table carrying user data has user_id (uuid) and RLS enabled.
--   * Credits are tracked on profiles + an append-only credit_transactions
--     ledger. Debits go through the debit_credits RPC so the balance check
--     and ledger insert happen atomically.
--   * New auth.users rows trigger handle_new_user(), which creates a profile
--     and grants the free-tier starting balance.
-- =============================================================================

create extension if not exists "pgcrypto";

-- --- Free-tier starting credits (edit here if you want to change the grant) ---
-- We keep it as a function call, not a constant, so it is easy to tweak.
create or replace function public.apriori_signup_bonus() returns int
language sql immutable as $$ select 200 $$;


-- =============================================================================
-- profiles
-- =============================================================================
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text not null,
  first_name         text,
  last_name          text,
  display_name       text,
  avatar_url         text,
  plan               text not null default 'free' check (plan in ('free','pro','custom')),
  credits_remaining  int  not null default 0,
  credits_total      int  not null default 0,
  credits_used       int  not null default 0,
  has_seen_welcome   boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own"   on public.profiles;
drop policy if exists "profiles_insert_own"   on public.profiles;
drop policy if exists "profiles_update_own"   on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);


-- =============================================================================
-- credit_transactions (append-only ledger)
-- =============================================================================
create table if not exists public.credit_transactions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  delta          int  not null,
  reason         text not null,
  simulation_id  uuid,
  balance_after  int  not null,
  metadata       jsonb,
  created_at     timestamptz not null default now()
);

create index if not exists credit_txn_user_idx on public.credit_transactions(user_id, created_at desc);

alter table public.credit_transactions enable row level security;

drop policy if exists "credit_txn_select_own" on public.credit_transactions;
create policy "credit_txn_select_own" on public.credit_transactions for select using (auth.uid() = user_id);
-- No INSERT/UPDATE/DELETE from client. The debit_credits / grant_credits
-- RPCs run with security definer and perform the writes server-side.


-- =============================================================================
-- product_context (1:1 with profile)
-- =============================================================================
create table if not exists public.product_context (
  user_id        uuid primary key references public.profiles(id) on delete cascade,
  product_type   text,
  pricing_model  text,
  sales_motion   text,
  kpis           jsonb not null default '[]'::jsonb,
  constraints    text,
  updated_at     timestamptz not null default now()
);

alter table public.product_context enable row level security;

drop policy if exists "product_context_select_own" on public.product_context;
drop policy if exists "product_context_insert_own" on public.product_context;
drop policy if exists "product_context_update_own" on public.product_context;
create policy "product_context_select_own" on public.product_context for select using (auth.uid() = user_id);
create policy "product_context_insert_own" on public.product_context for insert with check (auth.uid() = user_id);
create policy "product_context_update_own" on public.product_context for update using (auth.uid() = user_id) with check (auth.uid() = user_id);


-- =============================================================================
-- audiences
-- =============================================================================
create table if not exists public.audiences (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.profiles(id) on delete cascade,
  name                  text not null,
  description           text,
  audience_description  text,
  filters               jsonb,
  status                text not null default 'draft' check (status in ('draft','active','archived')),
  used_in_simulations   int  not null default 0,
  demographics          jsonb not null default '[]'::jsonb,
  psychographics        jsonb not null default '[]'::jsonb,
  budget                text,
  risk                  text,
  identity              jsonb,
  firmographics         jsonb,
  goals                 jsonb,
  pain_points           jsonb,
  decision_behavior     jsonb,
  budget_details        jsonb,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists audiences_user_idx on public.audiences(user_id, created_at desc);

alter table public.audiences enable row level security;

drop policy if exists "audiences_select_own" on public.audiences;
drop policy if exists "audiences_insert_own" on public.audiences;
drop policy if exists "audiences_update_own" on public.audiences;
drop policy if exists "audiences_delete_own" on public.audiences;
create policy "audiences_select_own" on public.audiences for select using (auth.uid() = user_id);
create policy "audiences_insert_own" on public.audiences for insert with check (auth.uid() = user_id);
create policy "audiences_update_own" on public.audiences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "audiences_delete_own" on public.audiences for delete using (auth.uid() = user_id);


-- =============================================================================
-- simulations
-- =============================================================================
create table if not exists public.simulations (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  type             text not null,
  status           text not null default 'draft' check (status in ('draft','running','completed','failed')),
  name             text not null,
  metric           text,
  timestamp_label  text,
  simulation_id    text,          -- backend-issued id (from the FastAPI engine)
  result           jsonb,
  credits_spent    int  not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists simulations_user_idx   on public.simulations(user_id, created_at desc);
create index if not exists simulations_status_idx on public.simulations(user_id, status);

alter table public.simulations enable row level security;

drop policy if exists "simulations_select_own" on public.simulations;
drop policy if exists "simulations_insert_own" on public.simulations;
drop policy if exists "simulations_update_own" on public.simulations;
drop policy if exists "simulations_delete_own" on public.simulations;
create policy "simulations_select_own" on public.simulations for select using (auth.uid() = user_id);
create policy "simulations_insert_own" on public.simulations for insert with check (auth.uid() = user_id);
create policy "simulations_update_own" on public.simulations for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "simulations_delete_own" on public.simulations for delete using (auth.uid() = user_id);


-- =============================================================================
-- asset_folders (self-referential hierarchy)
-- =============================================================================
create table if not exists public.asset_folders (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null references public.profiles(id) on delete cascade,
  name                 text not null,
  description          text,
  asset_type           text not null,
  parent_id            uuid references public.asset_folders(id) on delete cascade,
  asset_count          int  not null default 0,
  used_in_simulations  int  not null default 0,
  status               text not null default 'ready',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists asset_folders_user_idx   on public.asset_folders(user_id, created_at desc);
create index if not exists asset_folders_parent_idx on public.asset_folders(parent_id);

alter table public.asset_folders enable row level security;

drop policy if exists "asset_folders_select_own" on public.asset_folders;
drop policy if exists "asset_folders_insert_own" on public.asset_folders;
drop policy if exists "asset_folders_update_own" on public.asset_folders;
drop policy if exists "asset_folders_delete_own" on public.asset_folders;
create policy "asset_folders_select_own" on public.asset_folders for select using (auth.uid() = user_id);
create policy "asset_folders_insert_own" on public.asset_folders for insert with check (auth.uid() = user_id);
create policy "asset_folders_update_own" on public.asset_folders for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "asset_folders_delete_own" on public.asset_folders for delete using (auth.uid() = user_id);


-- =============================================================================
-- assets (image + metadata)
-- =============================================================================
create table if not exists public.assets (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references public.profiles(id) on delete cascade,
  folder_id              uuid not null references public.asset_folders(id) on delete cascade,
  name                   text not null,
  url                    text,
  storage_path           text,
  asset_type             text not null,
  status                 text not null default 'missing-info',
  source                 text,
  product_flow_metadata  jsonb,
  ad_creative_metadata   jsonb,
  linked_simulation_ids  jsonb not null default '[]'::jsonb,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists assets_user_idx   on public.assets(user_id, created_at desc);
create index if not exists assets_folder_idx on public.assets(folder_id, created_at asc);

alter table public.assets enable row level security;

drop policy if exists "assets_select_own" on public.assets;
drop policy if exists "assets_insert_own" on public.assets;
drop policy if exists "assets_update_own" on public.assets;
drop policy if exists "assets_delete_own" on public.assets;
create policy "assets_select_own" on public.assets for select using (auth.uid() = user_id);
create policy "assets_insert_own" on public.assets for insert with check (auth.uid() = user_id);
create policy "assets_update_own" on public.assets for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "assets_delete_own" on public.assets for delete using (auth.uid() = user_id);


-- =============================================================================
-- signups / waitlist (public write, admin-only read)
-- =============================================================================
create table if not exists public.signups (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  email        text not null,
  company      text,
  role         text,
  building     text,
  source       text,
  user_agent   text,
  created_at   timestamptz not null default now()
);

create unique index if not exists signups_email_source_idx on public.signups (lower(email), coalesce(source, ''));

alter table public.signups enable row level security;

drop policy if exists "signups_insert_anon" on public.signups;
create policy "signups_insert_anon" on public.signups for insert with check (true);
-- No SELECT/UPDATE/DELETE from client. Service role bypasses RLS.


-- =============================================================================
-- feedback (in-app "Talk to us" submissions — issues, ideas, questions)
--   * Inserted by /api/feedback route via the service-role client. No RLS
--     policy exposes rows to clients; team reads via the Supabase dashboard
--     or SQL.
-- =============================================================================
create table if not exists public.feedback (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete set null,
  email       text,
  kind        text not null check (kind in ('issue', 'idea', 'question')),
  message     text not null,
  path        text,
  status      text not null default 'open' check (status in ('open', 'triaged', 'resolved')),
  created_at  timestamptz not null default now()
);

create index if not exists feedback_user_idx    on public.feedback(user_id, created_at desc);
create index if not exists feedback_status_idx  on public.feedback(status, created_at desc);

alter table public.feedback enable row level security;
-- No client policies — only the service role (used by the API route) can read
-- or insert. This keeps user reports private to the Apriori team.


-- =============================================================================
-- touch_updated_at() — generic trigger to bump updated_at
-- =============================================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists t_profiles_updated_at        on public.profiles;
drop trigger if exists t_audiences_updated_at       on public.audiences;
drop trigger if exists t_simulations_updated_at     on public.simulations;
drop trigger if exists t_asset_folders_updated_at   on public.asset_folders;
drop trigger if exists t_assets_updated_at          on public.assets;
drop trigger if exists t_product_context_updated_at on public.product_context;

create trigger t_profiles_updated_at        before update on public.profiles        for each row execute function public.touch_updated_at();
create trigger t_audiences_updated_at       before update on public.audiences       for each row execute function public.touch_updated_at();
create trigger t_simulations_updated_at     before update on public.simulations     for each row execute function public.touch_updated_at();
create trigger t_asset_folders_updated_at   before update on public.asset_folders   for each row execute function public.touch_updated_at();
create trigger t_assets_updated_at          before update on public.assets          for each row execute function public.touch_updated_at();
create trigger t_product_context_updated_at before update on public.product_context for each row execute function public.touch_updated_at();


-- =============================================================================
-- handle_new_user() — create profile + grant signup bonus on auth.users insert
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  _bonus     int  := public.apriori_signup_bonus();
  _full      text := coalesce(new.raw_user_meta_data->>'full_name',
                              new.raw_user_meta_data->>'name',
                              '');
  _first     text := coalesce(new.raw_user_meta_data->>'given_name',
                              nullif(split_part(_full, ' ', 1), ''));
  _last      text := coalesce(new.raw_user_meta_data->>'family_name',
                              nullif(btrim(regexp_replace(_full, '^\S+\s*', '')), ''));
  _display   text := nullif(_full, '');
  _avatar    text := coalesce(new.raw_user_meta_data->>'avatar_url',
                              new.raw_user_meta_data->>'picture');
begin
  insert into public.profiles (
    id, email, first_name, last_name, display_name, avatar_url,
    plan, credits_remaining, credits_total, credits_used
  )
  values (
    new.id, new.email, _first, _last, _display, _avatar,
    'free', _bonus, _bonus, 0
  )
  on conflict (id) do nothing;

  insert into public.credit_transactions (user_id, delta, reason, balance_after)
  values (new.id, _bonus, 'signup_bonus', _bonus);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- =============================================================================
-- debit_credits(amount, reason, simulation_id) — atomic debit + ledger entry
--   * Returns the new balance.
--   * Raises 'insufficient_credits' if the balance would go negative — callers
--     should catch that and surface a 402-style "out of credits" error.
-- =============================================================================
create or replace function public.debit_credits(
  _amount        int,
  _reason        text,
  _simulation_id uuid default null
)
returns table (remaining int)
language plpgsql
security definer
set search_path = public
as $$
declare
  _user_id     uuid := auth.uid();
  _new_balance int;
begin
  if _user_id is null then
    raise exception 'not_authenticated';
  end if;
  if _amount is null or _amount <= 0 then
    raise exception 'amount_must_be_positive';
  end if;

  update public.profiles
     set credits_remaining = credits_remaining - _amount,
         credits_used      = credits_used      + _amount
   where id = _user_id
     and credits_remaining >= _amount
   returning credits_remaining into _new_balance;

  if _new_balance is null then
    raise exception 'insufficient_credits';
  end if;

  insert into public.credit_transactions (user_id, delta, reason, simulation_id, balance_after)
  values (_user_id, -_amount, _reason, _simulation_id, _new_balance);

  return query select _new_balance;
end;
$$;


-- =============================================================================
-- refund_credits(amount, reason, simulation_id) — reverses a debit (e.g. on
-- simulation failure). Bounded by credits_used so you can't over-refund.
-- =============================================================================
create or replace function public.refund_credits(
  _amount        int,
  _reason        text,
  _simulation_id uuid default null
)
returns table (remaining int)
language plpgsql
security definer
set search_path = public
as $$
declare
  _user_id     uuid := auth.uid();
  _new_balance int;
  _refund      int;
begin
  if _user_id is null then
    raise exception 'not_authenticated';
  end if;
  if _amount is null or _amount <= 0 then
    raise exception 'amount_must_be_positive';
  end if;

  update public.profiles
     set credits_used      = greatest(credits_used - _amount, 0),
         credits_remaining = credits_remaining + least(_amount, credits_used)
   where id = _user_id
   returning credits_remaining, least(_amount, credits_used + _amount) into _new_balance, _refund;

  insert into public.credit_transactions (user_id, delta, reason, simulation_id, balance_after)
  values (_user_id, coalesce(_refund, _amount), _reason, _simulation_id, _new_balance);

  return query select _new_balance;
end;
$$;


-- =============================================================================
-- grant_credits(user_id, amount, reason) — admin-only (service role) credit
-- top-up. Clients cannot invoke this through the public API; the function is
-- security definer, but the normal anon/auth roles should have EXECUTE
-- revoked if you expose this outside the service role.
-- =============================================================================
create or replace function public.grant_credits(
  _user_id uuid,
  _amount  int,
  _reason  text
)
returns table (remaining int)
language plpgsql
security definer
set search_path = public
as $$
declare
  _new_balance int;
begin
  update public.profiles
     set credits_remaining = credits_remaining + _amount,
         credits_total     = credits_total     + _amount
   where id = _user_id
   returning credits_remaining into _new_balance;

  if _new_balance is null then
    raise exception 'user_not_found';
  end if;

  insert into public.credit_transactions (user_id, delta, reason, balance_after)
  values (_user_id, _amount, _reason, _new_balance);

  return query select _new_balance;
end;
$$;

revoke execute on function public.grant_credits(uuid, int, text) from public, anon, authenticated;


-- =============================================================================
-- 2026-04-23 — Firebase removal: add columns the backend now persists directly
-- =============================================================================
-- The backend used to keep these fields in Firestore. Now both writers (the
-- Next.js frontend and the FastAPI backend) hit the same Postgres tables, so
-- every column the backend writes has to live here.
--
-- All additions are nullable / defaulted, so existing frontend writes keep
-- working without code changes.
-- =============================================================================

-- Backend-issued simulation_id (text uuid hex from FastAPI) needs a unique
-- (user_id, simulation_id) index so the engine can UPSERT the result blob.
alter table public.simulations
  add column if not exists kind             text,
  add column if not exists audience         text,
  add column if not exists objective        text,
  add column if not exists num_personas     int,
  add column if not exists retrieval_mode   text,
  add column if not exists public           boolean not null default false,
  add column if not exists public_share_id  text;

create unique index if not exists simulations_user_sim_id_idx on public.simulations(user_id, simulation_id) where simulation_id is not null;
create unique index if not exists simulations_public_share_idx on public.simulations(public_share_id) where public_share_id is not null;

-- The backend UPSERTs simulation rows from the engine via simulation_id. Frontend
-- writes use the uuid `id` instead, so the two writers don't collide.

-- Allow the public-share endpoint to read shared rows without auth. The /r/{id}
-- route uses an anonymous client; without this, RLS hides the row.
drop policy if exists "simulations_select_public" on public.simulations;
create policy "simulations_select_public" on public.simulations
  for select using (public is true and public_share_id is not null);

-- Asset metadata the backend writes alongside Cloudinary uploads.
alter table public.assets
  add column if not exists cloudinary_public_id text,
  add column if not exists step_number          int not null default 0;
