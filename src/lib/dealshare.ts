/**
 * Dealshare data layer.
 *
 * Every read/write runs as the currently-authenticated user; Postgres RLS
 * (supabase/dealshare_schema.sql) guarantees scouts only touch their own
 * deals while admins (`profiles.is_admin`) see everything. No service-role
 * key client-side.
 *
 * Mirrors the style of src/lib/db.ts.
 */

"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { DealStage } from "@/lib/dealshare-constants";
import { TNC_VERSION } from "@/lib/dealshare-constants";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Scout {
  id: string;
  userId: string | null;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  status: "invited" | "active" | "paused";
  commissionRate: number;
  commissionNotes: string | null;
  tncVersion: string | null;
  tncAcceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  scoutId: string;
  companyName: string;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  description: string | null;
  stage: DealStage;
  dealValue: number | null;
  currency: string;
  firstContactAt: string | null;
  wonAt: string | null;
  lostReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StageEvent {
  id: string;
  dealId: string;
  fromStage: DealStage | null;
  toStage: DealStage;
  note: string | null;
  createdAt: string;
}

export interface Meeting {
  id: string;
  dealId: string;
  title: string | null;
  meetingAt: string;
  attendees: string | null;
  channel: string | null;
  notes: string | null;
  outcome: string | null;
  createdAt: string;
}

/** A deal joined with its scout — used by the admin overview. */
export interface DealWithScout extends Deal {
  scout: Pick<Scout, "id" | "name" | "email" | "company" | "commissionRate">;
}

// ─── Row mappers ─────────────────────────────────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

function clean<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

function rowToScout(r: any): Scout {
  return {
    id: r.id,
    userId: r.user_id ?? null,
    email: r.email,
    name: r.name ?? null,
    company: r.company ?? null,
    phone: r.phone ?? null,
    status: r.status,
    commissionRate: Number(r.commission_rate ?? 0),
    commissionNotes: r.commission_notes ?? null,
    tncVersion: r.tnc_version ?? null,
    tncAcceptedAt: r.tnc_accepted_at ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function rowToDeal(r: any): Deal {
  return {
    id: r.id,
    scoutId: r.scout_id,
    companyName: r.company_name,
    contactName: r.contact_name ?? null,
    contactEmail: r.contact_email ?? null,
    contactPhone: r.contact_phone ?? null,
    website: r.website ?? null,
    description: r.description ?? null,
    stage: r.stage,
    dealValue: r.deal_value != null ? Number(r.deal_value) : null,
    currency: r.currency ?? "INR",
    firstContactAt: r.first_contact_at ?? null,
    wonAt: r.won_at ?? null,
    lostReason: r.lost_reason ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function rowToMeeting(r: any): Meeting {
  return {
    id: r.id,
    dealId: r.deal_id,
    title: r.title ?? null,
    meetingAt: r.meeting_at,
    attendees: r.attendees ?? null,
    channel: r.channel ?? null,
    notes: r.notes ?? null,
    outcome: r.outcome ?? null,
    createdAt: r.created_at,
  };
}

function rowToStageEvent(r: any): StageEvent {
  return {
    id: r.id,
    dealId: r.deal_id,
    fromStage: r.from_stage ?? null,
    toStage: r.to_stage,
    note: r.note ?? null,
    createdAt: r.created_at,
  };
}

// ─── Admin check ─────────────────────────────────────────────────────────────

export async function isAdmin(userId: string): Promise<boolean> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();
  if (error) return false;
  return Boolean(data?.is_admin);
}

// ─── Scouts ──────────────────────────────────────────────────────────────────

/**
 * Resolve the scout row for the current user, claiming an invite-by-email if
 * one exists. Returns null if the user has no scout row yet (not onboarded).
 */
export async function getMyScout(userId: string, email: string): Promise<Scout | null> {
  const sb = getSupabaseBrowserClient();

  // 1. Already linked to this user?
  const linked = await sb
    .from("dealshare_scouts")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (linked.error) throw new Error(`getMyScout: ${linked.error.message}`);
  if (linked.data) return rowToScout(linked.data);

  // 2. An invite by email waiting to be claimed?
  const invited = await sb
    .from("dealshare_scouts")
    .select("*")
    .ilike("email", email)
    .is("user_id", null)
    .maybeSingle();
  if (invited.error) throw new Error(`getMyScout(invite): ${invited.error.message}`);
  if (invited.data) {
    const claimed = await sb
      .from("dealshare_scouts")
      .update({ user_id: userId, status: "active" })
      .eq("id", invited.data.id)
      .select("*")
      .single();
    if (claimed.error) throw new Error(`getMyScout(claim): ${claimed.error.message}`);
    return rowToScout(claimed.data);
  }

  return null;
}

/** Self-serve onboarding: create a scout row for the current user. */
export async function createMyScout(
  userId: string,
  email: string,
  fields: { name?: string; company?: string; phone?: string }
): Promise<Scout> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_scouts")
    .insert(
      clean({
        user_id: userId,
        email,
        name: fields.name,
        company: fields.company,
        phone: fields.phone,
        status: "active",
      })
    )
    .select("*")
    .single();
  return rowToScout(orThrow("createMyScout", { data, error }));
}

export async function acceptTerms(scoutId: string): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("dealshare_scouts")
    .update({ tnc_version: TNC_VERSION, tnc_accepted_at: new Date().toISOString() })
    .eq("id", scoutId);
  if (error) throw new Error(`acceptTerms: ${error.message}`);
}

export async function getScout(scoutId: string): Promise<Scout | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_scouts")
    .select("*")
    .eq("id", scoutId)
    .maybeSingle();
  if (error) throw new Error(`getScout: ${error.message}`);
  return data ? rowToScout(data) : null;
}

/** Admin: every scout. */
export async function getAllScouts(): Promise<Scout[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_scouts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getAllScouts: ${error.message}`);
  return (data ?? []).map(rowToScout);
}

/** Admin: invite a scout by email (no linked user yet). */
export async function inviteScout(fields: {
  email: string;
  name?: string;
  company?: string;
  commissionRate?: number;
  commissionNotes?: string;
}): Promise<Scout> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_scouts")
    .insert(
      clean({
        email: fields.email,
        name: fields.name,
        company: fields.company,
        commission_rate: fields.commissionRate,
        commission_notes: fields.commissionNotes,
        status: "invited",
      })
    )
    .select("*")
    .single();
  return rowToScout(orThrow("inviteScout", { data, error }));
}

/** Admin: update a scout's terms / status. */
export async function updateScout(
  scoutId: string,
  updates: { status?: Scout["status"]; commissionRate?: number; commissionNotes?: string }
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("dealshare_scouts")
    .update(
      clean({
        status: updates.status,
        commission_rate: updates.commissionRate,
        commission_notes: updates.commissionNotes,
      })
    )
    .eq("id", scoutId);
  if (error) throw new Error(`updateScout: ${error.message}`);
}

// ─── Deals ───────────────────────────────────────────────────────────────────

export async function getDealsForScout(scoutId: string): Promise<Deal[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_deals")
    .select("*")
    .eq("scout_id", scoutId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getDealsForScout: ${error.message}`);
  return (data ?? []).map(rowToDeal);
}

export async function getDeal(dealId: string): Promise<Deal | null> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_deals")
    .select("*")
    .eq("id", dealId)
    .maybeSingle();
  if (error) throw new Error(`getDeal: ${error.message}`);
  return data ? rowToDeal(data) : null;
}

export interface NewDealInput {
  companyName: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  description?: string;
  dealValue?: number | null;
  currency?: string;
}

export async function createDeal(scoutId: string, input: NewDealInput): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_deals")
    .insert(
      clean({
        scout_id: scoutId,
        company_name: input.companyName,
        contact_name: input.contactName,
        contact_email: input.contactEmail,
        contact_phone: input.contactPhone,
        website: input.website,
        description: input.description,
        deal_value: input.dealValue ?? undefined,
        currency: input.currency,
      })
    )
    .select("id")
    .single();
  const row = orThrow("createDeal", { data, error });
  return row.id;
}

export async function updateDealStage(
  dealId: string,
  stage: DealStage,
  extra?: { lostReason?: string; firstContactAt?: string }
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  // The DB trigger logs the stage_events row + stamps won_at automatically.
  const { error } = await sb
    .from("dealshare_deals")
    .update(
      clean({
        stage,
        lost_reason: extra?.lostReason,
        first_contact_at: extra?.firstContactAt,
      })
    )
    .eq("id", dealId);
  if (error) throw new Error(`updateDealStage: ${error.message}`);
}

export async function updateDeal(
  dealId: string,
  updates: Partial<NewDealInput>
): Promise<void> {
  const sb = getSupabaseBrowserClient();
  const { error } = await sb
    .from("dealshare_deals")
    .update(
      clean({
        company_name: updates.companyName,
        contact_name: updates.contactName,
        contact_email: updates.contactEmail,
        contact_phone: updates.contactPhone,
        website: updates.website,
        description: updates.description,
        deal_value: updates.dealValue,
        currency: updates.currency,
      })
    )
    .eq("id", dealId);
  if (error) throw new Error(`updateDeal: ${error.message}`);
}

/** Admin: all deals joined with their scout. */
export async function getAllDeals(): Promise<DealWithScout[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_deals")
    .select("*, scout:dealshare_scouts(id,name,email,company,commission_rate)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getAllDeals: ${error.message}`);
  return (data ?? []).map((r: any) => ({
    ...rowToDeal(r),
    scout: {
      id: r.scout?.id,
      name: r.scout?.name ?? null,
      email: r.scout?.email,
      company: r.scout?.company ?? null,
      commissionRate: Number(r.scout?.commission_rate ?? 0),
    },
  }));
}

// ─── Stage history ───────────────────────────────────────────────────────────

export async function getStageEvents(dealId: string): Promise<StageEvent[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_stage_events")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`getStageEvents: ${error.message}`);
  return (data ?? []).map(rowToStageEvent);
}

// ─── Meetings ────────────────────────────────────────────────────────────────

export async function getMeetings(dealId: string): Promise<Meeting[]> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_meetings")
    .select("*")
    .eq("deal_id", dealId)
    .order("meeting_at", { ascending: false });
  if (error) throw new Error(`getMeetings: ${error.message}`);
  return (data ?? []).map(rowToMeeting);
}

export interface NewMeetingInput {
  title?: string;
  meetingAt: string;
  attendees?: string;
  channel?: string;
  notes?: string;
  outcome?: string;
}

export async function logMeeting(dealId: string, input: NewMeetingInput): Promise<string> {
  const sb = getSupabaseBrowserClient();
  const { data, error } = await sb
    .from("dealshare_meetings")
    .insert(
      clean({
        deal_id: dealId,
        title: input.title,
        meeting_at: input.meetingAt,
        attendees: input.attendees,
        channel: input.channel,
        notes: input.notes,
        outcome: input.outcome,
      })
    )
    .select("id")
    .single();
  const row = orThrow("logMeeting", { data, error });
  return row.id;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function orThrow<T>(label: string, { data, error }: { data: T | null; error: unknown }): T {
  if (error) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`${label}: ${msg}`);
  }
  if (data === null || data === undefined) throw new Error(`${label}: empty response`);
  return data;
}
