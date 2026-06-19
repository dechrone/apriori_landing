-- =============================================================================
-- Apriori — Dealshare Scout schema
--
-- A deal-share / scout-attribution platform: external scouts bring Apriori
-- deals in, every deal + meeting + stage change is recorded, and an internal
-- admin tracks the whole pipeline and the commission owed.
--
-- Run this once per environment via the Supabase SQL editor (or `supabase db
-- push`) AFTER schema.sql. Idempotent — safe to re-run.
--
-- Conventions (mirrors schema.sql):
--   * RLS on every table.
--   * Scouts see only their own deals/meetings; admins see everything.
--   * "admin" = profiles.is_admin = true. Flip it manually in SQL for the
--     internal team (there is intentionally no client path to grant admin).
-- =============================================================================

create extension if not exists "pgcrypto";

-- --- Admin flag on the existing profile -------------------------------------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- SECURITY DEFINER helper so RLS policies can ask "is the caller an admin?"
-- without recursing through profiles' own RLS.
create or replace function public.is_app_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;


-- =============================================================================
-- dealshare_scouts — one row per partner bringing deals in
--
-- A scout may be invited by email before they ever sign in (user_id null);
-- the row is "claimed" and linked to a user the first time a signed-in user
-- whose email matches visits the dealshare surface.
-- =============================================================================
create table if not exists public.dealshare_scouts (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references public.profiles(id) on delete set null,
  email             text not null,
  name              text,
  company           text,
  phone             text,
  status            text not null default 'active'
                      check (status in ('invited','active','paused')),
  -- Commission terms agreed with this scout.
  commission_rate   numeric(6,4) not null default 0.10,   -- 0.10 = 10%
  commission_notes  text,
  -- Terms & conditions acceptance.
  tnc_version       text,
  tnc_accepted_at   timestamptz,
  created_by        uuid references public.profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create unique index if not exists dealshare_scouts_email_key
  on public.dealshare_scouts (lower(email));
create index if not exists dealshare_scouts_user_idx
  on public.dealshare_scouts (user_id);

alter table public.dealshare_scouts enable row level security;

drop policy if exists "scouts_select" on public.dealshare_scouts;
drop policy if exists "scouts_insert_self" on public.dealshare_scouts;
drop policy if exists "scouts_update" on public.dealshare_scouts;
drop policy if exists "scouts_admin_all" on public.dealshare_scouts;

-- A scout sees their own row; an admin sees all.
create policy "scouts_select" on public.dealshare_scouts for select
  using (user_id = auth.uid() or public.is_app_admin());

-- Self-serve onboarding: a signed-in user may create their OWN scout row
-- (claiming the invite) as long as the email matches their auth email and
-- they bind user_id to themselves.
create policy "scouts_insert_self" on public.dealshare_scouts for insert
  with check (
    public.is_app_admin()
    or (user_id = auth.uid()
        and lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')))
  );

-- A scout may update their own row (claim it / accept T&C); admin may update any.
create policy "scouts_update" on public.dealshare_scouts for update
  using (user_id = auth.uid() or public.is_app_admin()
         or (user_id is null
             and lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
  with check (user_id = auth.uid() or public.is_app_admin());

create policy "scouts_admin_all" on public.dealshare_scouts for delete
  using (public.is_app_admin());


-- =============================================================================
-- dealshare_deals — a deal a scout has sourced
-- =============================================================================
create table if not exists public.dealshare_deals (
  id              uuid primary key default gen_random_uuid(),
  scout_id        uuid not null references public.dealshare_scouts(id) on delete cascade,
  company_name    text not null,
  contact_name    text,
  contact_email   text,
  contact_phone   text,
  website         text,
  description     text,
  -- Pipeline stage. Ordered set; 'lost' is the terminal off-track state.
  stage           text not null default 'submitted'
                    check (stage in ('submitted','intro_sent','meeting',
                                     'negotiation','won','lost')),
  -- Commercials.
  deal_value      numeric(14,2),                 -- expected/closed contract value
  currency        text not null default 'INR',
  -- Attribution timestamps (mirrors the scout dashboard reference).
  first_contact_at timestamptz,                  -- "first CC'd"
  won_at          timestamptz,
  lost_reason     text,
  created_by      uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists dealshare_deals_scout_idx
  on public.dealshare_deals (scout_id, created_at desc);
create index if not exists dealshare_deals_stage_idx
  on public.dealshare_deals (stage);

alter table public.dealshare_deals enable row level security;

-- True iff the calling user owns the scout that owns this deal.
create or replace function public.dealshare_owns_deal(p_scout_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.dealshare_scouts s
    where s.id = p_scout_id and s.user_id = auth.uid()
  );
$$;

drop policy if exists "deals_select" on public.dealshare_deals;
drop policy if exists "deals_insert" on public.dealshare_deals;
drop policy if exists "deals_update" on public.dealshare_deals;
drop policy if exists "deals_delete" on public.dealshare_deals;

create policy "deals_select" on public.dealshare_deals for select
  using (public.dealshare_owns_deal(scout_id) or public.is_app_admin());

create policy "deals_insert" on public.dealshare_deals for insert
  with check (public.dealshare_owns_deal(scout_id) or public.is_app_admin());

create policy "deals_update" on public.dealshare_deals for update
  using (public.dealshare_owns_deal(scout_id) or public.is_app_admin())
  with check (public.dealshare_owns_deal(scout_id) or public.is_app_admin());

create policy "deals_delete" on public.dealshare_deals for delete
  using (public.dealshare_owns_deal(scout_id) or public.is_app_admin());


-- =============================================================================
-- dealshare_stage_events — append-only audit trail of every stage change
-- =============================================================================
create table if not exists public.dealshare_stage_events (
  id          uuid primary key default gen_random_uuid(),
  deal_id     uuid not null references public.dealshare_deals(id) on delete cascade,
  from_stage  text,
  to_stage    text not null,
  note        text,
  changed_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists dealshare_stage_events_deal_idx
  on public.dealshare_stage_events (deal_id, created_at);

alter table public.dealshare_stage_events enable row level security;

create or replace function public.dealshare_can_access_deal(p_deal_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_app_admin() or exists (
    select 1
    from public.dealshare_deals d
    join public.dealshare_scouts s on s.id = d.scout_id
    where d.id = p_deal_id and s.user_id = auth.uid()
  );
$$;

drop policy if exists "stage_events_select" on public.dealshare_stage_events;
drop policy if exists "stage_events_insert" on public.dealshare_stage_events;

create policy "stage_events_select" on public.dealshare_stage_events for select
  using (public.dealshare_can_access_deal(deal_id));
create policy "stage_events_insert" on public.dealshare_stage_events for insert
  with check (public.dealshare_can_access_deal(deal_id));


-- =============================================================================
-- dealshare_meetings — every meeting logged against a deal
-- =============================================================================
create table if not exists public.dealshare_meetings (
  id           uuid primary key default gen_random_uuid(),
  deal_id      uuid not null references public.dealshare_deals(id) on delete cascade,
  title        text,
  meeting_at   timestamptz not null,
  attendees    text,
  channel      text,                              -- call / in-person / video
  notes        text,
  outcome      text,                              -- freeform: "positive", "follow-up", …
  logged_by    uuid references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now()
);

create index if not exists dealshare_meetings_deal_idx
  on public.dealshare_meetings (deal_id, meeting_at desc);

alter table public.dealshare_meetings enable row level security;

drop policy if exists "meetings_select" on public.dealshare_meetings;
drop policy if exists "meetings_insert" on public.dealshare_meetings;
drop policy if exists "meetings_update" on public.dealshare_meetings;
drop policy if exists "meetings_delete" on public.dealshare_meetings;

create policy "meetings_select" on public.dealshare_meetings for select
  using (public.dealshare_can_access_deal(deal_id));
create policy "meetings_insert" on public.dealshare_meetings for insert
  with check (public.dealshare_can_access_deal(deal_id));
create policy "meetings_update" on public.dealshare_meetings for update
  using (public.dealshare_can_access_deal(deal_id))
  with check (public.dealshare_can_access_deal(deal_id));
create policy "meetings_delete" on public.dealshare_meetings for delete
  using (public.dealshare_can_access_deal(deal_id));


-- =============================================================================
-- updated_at touch triggers
-- =============================================================================
create or replace function public.dealshare_touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists dealshare_scouts_touch on public.dealshare_scouts;
create trigger dealshare_scouts_touch before update on public.dealshare_scouts
  for each row execute function public.dealshare_touch_updated_at();

drop trigger if exists dealshare_deals_touch on public.dealshare_deals;
create trigger dealshare_deals_touch before update on public.dealshare_deals
  for each row execute function public.dealshare_touch_updated_at();

-- Record a stage_events row automatically whenever a deal's stage changes.
create or replace function public.dealshare_log_stage_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.stage is distinct from old.stage then
    insert into public.dealshare_stage_events(deal_id, from_stage, to_stage, changed_by)
    values (new.id, old.stage, new.stage, auth.uid());
    if new.stage = 'won' and new.won_at is null then new.won_at = now(); end if;
  end if;
  return new;
end; $$;

drop trigger if exists dealshare_deals_stage_log on public.dealshare_deals;
create trigger dealshare_deals_stage_log before update on public.dealshare_deals
  for each row execute function public.dealshare_log_stage_change();

-- Seed the initial stage event on insert.
create or replace function public.dealshare_seed_stage_event()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.dealshare_stage_events(deal_id, from_stage, to_stage, changed_by, note)
  values (new.id, null, new.stage, auth.uid(), 'Deal submitted');
  return new;
end; $$;

drop trigger if exists dealshare_deals_seed_stage on public.dealshare_deals;
create trigger dealshare_deals_seed_stage after insert on public.dealshare_deals
  for each row execute function public.dealshare_seed_stage_event();
