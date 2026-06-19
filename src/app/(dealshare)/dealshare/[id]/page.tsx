"use client";

/**
 * Dealshare — deal detail.
 *
 * Everything recorded for one deal: the live pipeline rail, a stage-advance
 * control (auto-logged to the audit trail), the meeting log + a form to add
 * one, and the full stage history.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, Globe, Mail, Phone, Building2, History } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Spinner } from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/Toast";
import { useUser } from "@/contexts/UserContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { StageBadge } from "@/components/dealshare/DealshareUI";
import {
  getDeal,
  getMeetings,
  getStageEvents,
  getMyScout,
  isAdmin,
  logMeeting,
  updateDealStage,
  type Deal,
  type Meeting,
  type StageEvent,
} from "@/lib/dealshare";
import {
  PIPELINE,
  STAGE_TONE,
  stageIndex,
  stageMeta,
  formatMoney,
  formatDate,
  formatDateTime,
  type DealStage,
} from "@/lib/dealshare-constants";

export default function DealDetailPage() {
  const params = useParams();
  const dealId = String(params?.id ?? "");
  const { showToast } = useToast();
  const { userId, profile } = useUser();
  const { user } = useAuthContext();
  const email = profile?.email || user?.email || "";

  const [loading, setLoading] = useState(true);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [events, setEvents] = useState<StageEvent[]>([]);
  const [savingStage, setSavingStage] = useState(false);
  // Write access: admins always; otherwise the owning scout must be active.
  // Paused scouts keep read-only access — mirrors the RLS write helpers.
  const [canWrite, setCanWrite] = useState(false);
  const [writeBlock, setWriteBlock] = useState<"paused" | null>(null);

  const load = useCallback(async () => {
    if (!dealId) return;
    setLoading(true);
    try {
      const d = await getDeal(dealId);
      setDeal(d);
      if (d) {
        const [m, e, admin, myScout] = await Promise.all([
          getMeetings(dealId),
          getStageEvents(dealId),
          userId ? isAdmin(userId) : Promise.resolve(false),
          userId ? getMyScout(userId, email) : Promise.resolve(null),
        ]);
        setMeetings(m);
        setEvents(e);
        const ownsDeal = myScout?.id === d.scoutId;
        setCanWrite(admin || (ownsDeal && myScout?.status === "active"));
        setWriteBlock(ownsDeal && myScout?.status !== "active" ? "paused" : null);
      }
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Could not load the deal.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealId, userId, email]);

  useEffect(() => {
    void load();
  }, [load]);

  async function advance(stage: DealStage, lostReason?: string) {
    if (!deal) return;
    setSavingStage(true);
    try {
      await updateDealStage(deal.id, stage, { lostReason });
      showToast("success", `Moved to ${stageMeta(stage).label}.`);
      await load();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Could not update stage.");
    } finally {
      setSavingStage(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="p-10 text-center text-text-secondary">
        Deal not found.{" "}
        <Link href="/dealshare" className="text-accent-gold underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-[960px]">
          <Link
            href="/dealshare"
            className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>

          {/* Header card */}
          <Card className="!p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-text-primary">{deal.companyName}</h1>
                  <StageBadge stage={deal.stage} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-text-secondary">
                  {deal.contactName && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" /> {deal.contactName}
                    </span>
                  )}
                  {deal.contactEmail && (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> {deal.contactEmail}
                    </span>
                  )}
                  {deal.contactPhone && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> {deal.contactPhone}
                    </span>
                  )}
                  {deal.website && (
                    <a
                      href={deal.website.startsWith("http") ? deal.website : `https://${deal.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-gold hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" /> {deal.website}
                    </a>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text-primary tabular-nums">
                  {formatMoney(deal.dealValue, deal.currency)}
                </p>
                <p className="text-xs text-text-tertiary">Referred {formatDate(deal.createdAt)}</p>
              </div>
            </div>

            {deal.description && (
              <p className="mt-4 border-t border-border-subtle pt-4 text-[14px] leading-relaxed text-text-secondary">
                {deal.description}
              </p>
            )}
          </Card>

          {writeBlock === "paused" && (
            <div className="mt-6 rounded-[var(--radius-md)] border border-[#FED7AA] bg-[#FFF7ED] px-4 py-3 text-[13px] text-[#9A3412]">
              Your scout account is <strong>paused</strong>, so this deal is read-only. Contact the
              Apriori team to resume referring and updating deals.
            </div>
          )}

          {/* Pipeline rail + stage control */}
          <PipelineRail deal={deal} onAdvance={advance} saving={savingStage} canWrite={canWrite} />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Meetings */}
            <div className="lg:col-span-3">
              <MeetingSection
                dealId={deal.id}
                meetings={meetings}
                onLogged={() => void load()}
                canWrite={canWrite}
              />
            </div>
            {/* Stage history */}
            <div className="lg:col-span-2">
              <StageHistory events={events} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Pipeline rail (full labeled) ────────────────────────────────────────────

function PipelineRail({
  deal,
  onAdvance,
  saving,
  canWrite,
}: {
  deal: Deal;
  onAdvance: (stage: DealStage, lostReason?: string) => void;
  saving: boolean;
  canWrite: boolean;
}) {
  const isLost = deal.stage === "lost";
  const reached = stageIndex(deal.stage);
  const [showLost, setShowLost] = useState(false);
  const [lostReason, setLostReason] = useState("");

  const nextStage: DealStage | null = useMemo(() => {
    if (isLost || deal.stage === "won") return null;
    return PIPELINE[reached + 1]?.key ?? null;
  }, [deal.stage, isLost, reached]);

  return (
    <Card className="mt-6 !p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-h4 font-semibold text-text-primary">Pipeline</h2>
        {canWrite && (
          <div className="flex gap-2">
            {nextStage && (
              <Button variant="primary" size="sm" disabled={saving} onClick={() => onAdvance(nextStage)}>
                {saving ? "Saving…" : `Advance to ${stageMeta(nextStage).label}`}
              </Button>
            )}
            {!isLost && deal.stage !== "won" && (
              <Button variant="secondary" size="sm" disabled={saving} onClick={() => setShowLost((v) => !v)}>
                Mark lost
              </Button>
            )}
            {isLost && (
              <Button variant="secondary" size="sm" disabled={saving} onClick={() => onAdvance("submitted")}>
                Reopen
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Rail */}
      <div className="mt-6 flex items-center">
        {PIPELINE.map((s, i) => {
          const done = !isLost && i <= reached;
          const isCurrent = !isLost && i === reached;
          return (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{
                    backgroundColor: done ? STAGE_TONE[s.key].dot : "#E5E7EB",
                    color: done ? "#fff" : "#9CA3AF",
                    outline: isCurrent ? `4px solid ${STAGE_TONE[s.key].dot}22` : "none",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="whitespace-nowrap text-[11px] font-medium"
                  style={{ color: done ? STAGE_TONE[s.key].text : "#9CA3AF" }}
                >
                  {s.label}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <span
                  className="mx-1 mb-5 h-0.5 flex-1"
                  style={{ backgroundColor: !isLost && i < reached ? STAGE_TONE[deal.stage].dot : "#E5E7EB" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {isLost && (
        <p className="mt-4 rounded-[var(--radius-md)] bg-[#FEE2E2] px-3 py-2 text-[13px] text-[#B91C1C]">
          This deal is marked <strong>Lost</strong>
          {deal.lostReason ? ` — ${deal.lostReason}` : ""}.
        </p>
      )}

      {showLost && !isLost && (
        <div className="mt-4 space-y-3 rounded-[var(--radius-md)] border border-border-subtle bg-[#FAFAF8] p-4">
          <Input
            label="Reason for losing (optional)"
            value={lostReason}
            onChange={(e) => setLostReason(e.target.value)}
            placeholder="Went with a competitor, budget, timing…"
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setShowLost(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={saving}
              onClick={() => {
                onAdvance("lost", lostReason.trim() || undefined);
                setShowLost(false);
              }}
            >
              Confirm lost
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── Meetings ────────────────────────────────────────────────────────────────

function MeetingSection({
  dealId,
  meetings,
  onLogged,
  canWrite,
}: {
  dealId: string;
  meetings: Meeting[];
  onLogged: () => void;
  canWrite: boolean;
}) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    meetingAt: "",
    attendees: "",
    channel: "video",
    notes: "",
    outcome: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.meetingAt) {
      showToast("warning", "Pick a meeting date/time.");
      return;
    }
    setSaving(true);
    try {
      await logMeeting(dealId, {
        title: form.title.trim() || undefined,
        meetingAt: new Date(form.meetingAt).toISOString(),
        attendees: form.attendees.trim() || undefined,
        channel: form.channel,
        notes: form.notes.trim() || undefined,
        outcome: form.outcome.trim() || undefined,
      });
      showToast("success", "Meeting logged.");
      setForm({ title: "", meetingAt: "", attendees: "", channel: "video", notes: "", outcome: "" });
      setOpen(false);
      onLogged();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Could not log the meeting.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="!p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-h4 font-semibold text-text-primary">
          Meetings <span className="text-text-tertiary">({meetings.length})</span>
        </h2>
        {canWrite && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<CalendarPlus className="h-4 w-4" />}
            onClick={() => setOpen((v) => !v)}
          >
            Log meeting
          </Button>
        )}
      </div>

      {canWrite && open && (
        <form onSubmit={submit} className="mt-4 space-y-3 rounded-[var(--radius-md)] border border-border-subtle bg-[#FAFAF8] p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Intro call" />
            <Input
              label="When"
              type="datetime-local"
              value={form.meetingAt}
              onChange={(e) => setForm({ ...form, meetingAt: e.target.value })}
              required
            />
            <Input label="Attendees" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} placeholder="You, Atindra, Rahul" />
            <Select
              label="Channel"
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
              options={[
                { value: "video", label: "Video call" },
                { value: "call", label: "Phone call" },
                { value: "in_person", label: "In person" },
                { value: "email", label: "Email thread" },
              ]}
            />
          </div>
          <Textarea label="Notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="What was discussed, next steps…" />
          <Input label="Outcome" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} placeholder="Positive — wants a pilot" />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save meeting"}
            </Button>
          </div>
        </form>
      )}

      <div className="mt-4 space-y-3">
        {meetings.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-text-tertiary">No meetings logged yet.</p>
        ) : (
          meetings.map((m) => (
            <div key={m.id} className="rounded-[var(--radius-md)] border border-border-subtle p-3">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-text-primary">{m.title || "Meeting"}</p>
                <span className="text-xs text-text-tertiary">{formatDateTime(m.meetingAt)}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-text-secondary">
                {m.channel && <span className="capitalize">{m.channel.replace("_", " ")}</span>}
                {m.attendees && <span>· {m.attendees}</span>}
                {m.outcome && <span className="font-medium text-[#15803D]">· {m.outcome}</span>}
              </div>
              {m.notes && <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{m.notes}</p>}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

// ─── Stage history ───────────────────────────────────────────────────────────

function StageHistory({ events }: { events: StageEvent[] }) {
  return (
    <Card className="!p-5">
      <h2 className="flex items-center gap-2 text-h4 font-semibold text-text-primary">
        <History className="h-4 w-4 text-text-tertiary" /> Stage history
      </h2>
      <div className="mt-4 space-y-0">
        {events.length === 0 ? (
          <p className="py-4 text-[13px] text-text-tertiary">No history yet.</p>
        ) : (
          events.map((ev, i) => (
            <div key={ev.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: STAGE_TONE[ev.toStage].dot }}
                />
                {i < events.length - 1 && <span className="w-px flex-1 bg-border-subtle" />}
              </div>
              <div className="pb-4">
                <p className="text-[13px] font-medium text-text-primary">
                  {ev.fromStage ? `${stageMeta(ev.fromStage).label} → ` : ""}
                  {stageMeta(ev.toStage).label}
                </p>
                <p className="text-xs text-text-tertiary">{formatDateTime(ev.createdAt)}</p>
                {ev.note && <p className="mt-0.5 text-xs text-text-secondary">{ev.note}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
