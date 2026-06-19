"use client";

/**
 * Dealshare — internal admin console.
 *
 * Whole-pipeline view for the Apriori team: every scout, every deal, totals,
 * and commission owed on Won deals. Admin-gated (profiles.is_admin); RLS also
 * enforces it server-side, so a non-admin sees nothing even if they reach the
 * route. Admins can invite scouts, tune commission terms, and advance any
 * deal's stage.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck, UserPlus, Users, Lock, PlusCircle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Spinner } from "@/components/ui/Spinner";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { StageBadge, StatTile } from "@/components/dealshare/DealshareUI";
import {
  isAdmin,
  getAllDeals,
  getAllScouts,
  inviteScout,
  updateScout,
  createDeal,
  type DealWithScout,
  type Scout,
} from "@/lib/dealshare";
import { formatMoney, formatDate } from "@/lib/dealshare-constants";

export default function DealshareAdminPage() {
  const { userId } = useUser();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [scouts, setScouts] = useState<Scout[]>([]);
  const [deals, setDeals] = useState<DealWithScout[]>([]);
  const [tab, setTab] = useState<"deals" | "scouts">("deals");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const adm = await isAdmin(userId);
      setAllowed(adm);
      if (adm) {
        const [s, d] = await Promise.all([getAllScouts(), getAllDeals()]);
        setScouts(s);
        setDeals(d);
      }
    } catch (e) {
      console.error("admin load:", e);
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const totals = useMemo(() => {
    const won = deals.filter((d) => d.stage === "won");
    const pipelineValue = deals
      .filter((d) => d.stage !== "lost")
      .reduce((s, d) => s + (d.dealValue ?? 0), 0);
    const wonValue = won.reduce((s, d) => s + (d.dealValue ?? 0), 0);
    const commissionOwed = won.reduce(
      (s, d) => s + (d.dealValue ?? 0) * (d.scout.commissionRate ?? 0),
      0
    );
    return {
      scouts: scouts.length,
      deals: deals.length,
      won: won.length,
      pipelineValue,
      wonValue,
      commissionOwed,
    };
  }, [deals, scouts]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="text-h4 font-semibold text-text-primary">Admin only</h2>
        <p className="mt-1 max-w-sm text-[14px] text-text-secondary">
          This console is restricted to the Apriori team.
        </p>
        <Link href="/dealshare" className="mt-4">
          <Button variant="secondary">Back to your dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-text-primary">
                <ShieldCheck className="h-6 w-6 text-[#16A34A]" /> Internal console
              </h1>
              <p className="mt-1 text-[14px] text-text-secondary">
                Every scout, every deal, and the commission owed across the program.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                leftIcon={<PlusCircle className="h-4 w-4" />}
                onClick={() => setLogOpen(true)}
              >
                Log referral
              </Button>
              <Button
                variant="secondary"
                leftIcon={<UserPlus className="h-4 w-4" />}
                onClick={() => setInviteOpen(true)}
              >
                Invite scout
              </Button>
            </div>
          </div>

          {/* Totals */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <StatTile label="Scouts" value={totals.scouts} />
            <StatTile label="Deals" value={totals.deals} />
            <StatTile label="Won" value={totals.won} tone="green" />
            <StatTile label="Pipeline value" value={formatMoney(totals.pipelineValue)} />
            <StatTile label="Won value" value={formatMoney(totals.wonValue)} tone="green" />
            <StatTile label="Commission owed" value={formatMoney(totals.commissionOwed)} tone="amber" />
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1.5">
            {(["deals", "scouts"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-[var(--radius-md)] border px-4 py-2 text-[13px] font-medium capitalize transition-standard ${
                  tab === t
                    ? "border-transparent bg-[#111827] text-white"
                    : "border-border-subtle bg-bg-secondary text-text-secondary hover:bg-bg-hover"
                }`}
              >
                {t} ({t === "deals" ? deals.length : scouts.length})
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tab === "deals" ? (
              <DealsTable deals={deals} />
            ) : (
              <ScoutsTable scouts={scouts} deals={deals} onChanged={() => void load()} />
            )}
          </div>
        </div>
      </div>

      {inviteOpen && (
        <InviteScoutModal onClose={() => setInviteOpen(false)} onInvited={() => void load()} />
      )}
      {logOpen && (
        <LogReferralModal
          scouts={scouts}
          onClose={() => setLogOpen(false)}
          onLogged={() => void load()}
        />
      )}
    </>
  );
}

// ─── Deals table ─────────────────────────────────────────────────────────────

function DealsTable({ deals }: { deals: DealWithScout[] }) {
  if (deals.length === 0) {
    return <p className="py-16 text-center text-[14px] text-text-tertiary">No deals yet.</p>;
  }
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-border-subtle bg-[#FAFAF8] text-[11px] uppercase tracking-wide text-text-tertiary">
            <tr>
              <th className="px-4 py-3 font-semibold">Company</th>
              <th className="px-4 py-3 font-semibold">Scout</th>
              <th className="px-4 py-3 font-semibold">Stage</th>
              <th className="px-4 py-3 text-right font-semibold">Value</th>
              <th className="px-4 py-3 text-right font-semibold">Commission</th>
              <th className="px-4 py-3 font-semibold">Referred</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => {
              const commission = d.stage === "won" ? (d.dealValue ?? 0) * d.scout.commissionRate : 0;
              return (
                <tr key={d.id} className="border-b border-border-subtle last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-4 py-3">
                    <Link href={`/dealshare/${d.id}`} className="font-semibold text-text-primary hover:text-accent-gold">
                      {d.companyName}
                    </Link>
                    {d.contactName && <p className="text-xs text-text-tertiary">{d.contactName}</p>}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {d.scout.name || d.scout.email}
                    <p className="text-xs text-text-tertiary">{Math.round(d.scout.commissionRate * 100)}%</p>
                  </td>
                  <td className="px-4 py-3">
                    <StageBadge stage={d.stage} />
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-primary">
                    {formatMoney(d.dealValue, d.currency)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium" style={{ color: commission ? "#B45309" : "#9CA3AF" }}>
                    {commission ? formatMoney(commission, d.currency) : "—"}
                  </td>
                  <td className="px-4 py-3 text-text-tertiary">{formatDate(d.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ─── Scouts table (with inline commission editing) ───────────────────────────

function ScoutsTable({
  scouts,
  deals,
  onChanged,
}: {
  scouts: Scout[];
  deals: DealWithScout[];
  onChanged: () => void;
}) {
  const { showToast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [rate, setRate] = useState("");

  const dealsByScout = useMemo(() => {
    const m = new Map<string, { count: number; won: number }>();
    for (const d of deals) {
      const e = m.get(d.scoutId) ?? { count: 0, won: 0 };
      e.count += 1;
      if (d.stage === "won") e.won += 1;
      m.set(d.scoutId, e);
    }
    return m;
  }, [deals]);

  async function saveRate(scout: Scout) {
    const pct = Number(rate);
    if (Number.isNaN(pct) || pct < 0 || pct > 100) {
      showToast("warning", "Enter a rate between 0 and 100.");
      return;
    }
    try {
      await updateScout(scout.id, { commissionRate: pct / 100 });
      showToast("success", "Commission updated.");
      setEditing(null);
      onChanged();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Could not update.");
    }
  }

  async function toggleStatus(scout: Scout) {
    const next = scout.status === "paused" ? "active" : "paused";
    try {
      await updateScout(scout.id, { status: next });
      showToast("success", `Scout ${next}.`);
      onChanged();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Could not update.");
    }
  }

  if (scouts.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <Users className="mb-3 h-8 w-8 text-text-tertiary" />
        <p className="text-[14px] text-text-secondary">No scouts yet — invite your first one.</p>
      </div>
    );
  }

  return (
    <Card className="!p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="border-b border-border-subtle bg-[#FAFAF8] text-[11px] uppercase tracking-wide text-text-tertiary">
            <tr>
              <th className="px-4 py-3 font-semibold">Scout</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Deals</th>
              <th className="px-4 py-3 text-center font-semibold">Won</th>
              <th className="px-4 py-3 font-semibold">Commission</th>
              <th className="px-4 py-3 font-semibold">T&amp;C</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {scouts.map((s) => {
              const stats = dealsByScout.get(s.id) ?? { count: 0, won: 0 };
              return (
                <tr key={s.id} className="border-b border-border-subtle last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-text-primary">{s.name || "—"}</p>
                    <p className="text-xs text-text-tertiary">{s.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                      style={
                        s.status === "active"
                          ? { background: "#DCFCE7", color: "#15803D" }
                          : s.status === "invited"
                            ? { background: "#EFF6FF", color: "#1D4ED8" }
                            : { background: "#F3F4F6", color: "#6B7280" }
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center tabular-nums">{stats.count}</td>
                  <td className="px-4 py-3 text-center tabular-nums text-[#15803D]">{stats.won}</td>
                  <td className="px-4 py-3">
                    {editing === s.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                          className="w-16 rounded border border-border-subtle px-2 py-1 text-[13px]"
                          inputMode="decimal"
                        />
                        <span className="text-text-tertiary">%</span>
                        <button onClick={() => saveRate(s)} className="text-[12px] font-semibold text-accent-gold">
                          Save
                        </button>
                        <button onClick={() => setEditing(null)} className="text-[12px] text-text-tertiary">
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditing(s.id);
                          setRate(String(Math.round(s.commissionRate * 100)));
                        }}
                        className="font-medium text-text-primary hover:text-accent-gold"
                      >
                        {Math.round(s.commissionRate * 100)}%
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-text-tertiary">
                    {s.tncAcceptedAt ? formatDate(s.tncAcceptedAt) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggleStatus(s)} className="text-[12px] font-medium text-text-secondary hover:text-text-primary">
                      {s.status === "paused" ? "Reactivate" : "Pause"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ─── Invite modal ────────────────────────────────────────────────────────────

function InviteScoutModal({ onClose, onInvited }: { onClose: () => void; onInvited: () => void }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", name: "", company: "", rate: "10" });
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!form.email.trim()) {
      showToast("warning", "Email is required.");
      return;
    }
    setSaving(true);
    try {
      await inviteScout({
        email: form.email.trim(),
        name: form.name.trim() || undefined,
        company: form.company.trim() || undefined,
        commissionRate: form.rate ? Number(form.rate) / 100 : undefined,
      });
      showToast("success", "Scout invited.");
      onInvited();
      onClose();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Could not invite scout.");
      setSaving(false);
    }
  }

  return (
    <Modal isOpen onClose={onClose} size="small">
      <ModalHeader onClose={onClose}>Invite a scout</ModalHeader>
      <ModalBody className="space-y-3">
        <p className="text-[13px] text-text-secondary">
          They&apos;ll claim this invite automatically when they sign in with the same email.
        </p>
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <Input
          label="Commission rate (%)"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
          inputMode="decimal"
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submit} disabled={saving}>
          {saving ? "Inviting…" : "Send invite"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

// ─── Log referral modal (confirm an incoming WhatsApp/email referral) ────────

function LogReferralModal({
  scouts,
  onClose,
  onLogged,
}: {
  scouts: Scout[];
  onClose: () => void;
  onLogged: () => void;
}) {
  const { showToast } = useToast();
  const activeScouts = scouts.filter((s) => s.status !== "paused");
  const [form, setForm] = useState({
    scoutId: activeScouts[0]?.id ?? "",
    companyName: "",
    contactName: "",
    contactEmail: "",
    dealValue: "",
    currency: "INR",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!form.scoutId) {
      showToast("warning", "Pick the scout who referred this.");
      return;
    }
    if (!form.companyName.trim()) {
      showToast("warning", "Company name is required.");
      return;
    }
    setSaving(true);
    try {
      const value = form.dealValue.trim() ? Number(form.dealValue.replace(/[^0-9.]/g, "")) : null;
      await createDeal(form.scoutId, {
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim() || undefined,
        contactEmail: form.contactEmail.trim() || undefined,
        dealValue: value && !Number.isNaN(value) ? value : null,
        currency: form.currency,
        description: form.description.trim() || undefined,
      });
      showToast("success", "Referral added to the pipeline.");
      onLogged();
      onClose();
    } catch (e) {
      showToast("error", e instanceof Error ? e.message : "Could not log the referral.");
      setSaving(false);
    }
  }

  return (
    <Modal isOpen onClose={onClose} size="small">
      <ModalHeader onClose={onClose}>Log a referral</ModalHeader>
      <ModalBody className="space-y-3">
        <p className="text-[13px] text-text-secondary">
          Confirm a deal a scout sent over WhatsApp or email into their pipeline.
        </p>
        {activeScouts.length === 0 ? (
          <p className="rounded-[var(--radius-md)] bg-[#FEF3C7] px-3 py-2 text-[13px] text-[#92400E]">
            No active scouts yet — invite one first.
          </p>
        ) : (
          <Select
            label="Referred by"
            value={form.scoutId}
            onChange={(e) => setForm({ ...form, scoutId: e.target.value })}
            options={activeScouts.map((s) => ({
              value: s.id,
              label: `${s.name || s.email}${s.company ? ` · ${s.company}` : ""}`,
            }))}
          />
        )}
        <Input label="Company / prospect" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input label="Contact name" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
          <Input label="Contact email" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Input label="Est. value" value={form.dealValue} onChange={(e) => setForm({ ...form, dealValue: e.target.value })} inputMode="numeric" />
          </div>
          <Select
            label="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
            options={[
              { value: "INR", label: "₹ INR" },
              { value: "USD", label: "$ USD" },
              { value: "EUR", label: "€ EUR" },
              { value: "GBP", label: "£ GBP" },
            ]}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submit} disabled={saving || activeScouts.length === 0}>
          {saving ? "Adding…" : "Add to pipeline"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
