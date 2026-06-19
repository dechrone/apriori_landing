"use client";

/**
 * Dealshare — scout dashboard.
 *
 * The scout's operations room: every deal they've referred, its pipeline
 * stage, totals, and estimated commission. Gated behind onboarding + T&C
 * acceptance (TermsGate). Admins get a banner link into the internal console.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, ShieldCheck, Mail } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { DealCard, StatTile } from "@/components/dealshare/DealshareUI";
import { TermsGate } from "@/components/dealshare/TermsGate";
import { WhatsAppReferButton, WhatsAppReferCard } from "@/components/dealshare/WhatsAppRefer";
import {
  getMyScout,
  getDealsForScout,
  isAdmin,
  type Scout,
  type Deal,
} from "@/lib/dealshare";
import { TNC_VERSION, formatMoney } from "@/lib/dealshare-constants";

type Tab = "all" | "active" | "won" | "lost";

export default function DealshareDashboardPage() {
  const { userId, profile } = useUser();
  const { user } = useAuthContext();
  const email = profile?.email || user?.email || "";

  const [loading, setLoading] = useState(true);
  const [scout, setScout] = useState<Scout | null>(null);
  const [admin, setAdmin] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [s, isAdm] = await Promise.all([getMyScout(userId, email), isAdmin(userId)]);
      setScout(s);
      setAdmin(isAdm);
      if (s) setDeals(await getDealsForScout(s.id));
    } catch (e) {
      console.error("dealshare load:", e);
    } finally {
      setLoading(false);
    }
  }, [userId, email]);

  useEffect(() => {
    void load();
  }, [load]);

  const gated = !loading && userId && (!scout || scout.tncVersion !== TNC_VERSION);

  const stats = useMemo(() => {
    const won = deals.filter((d) => d.stage === "won");
    const active = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
    const commission = won.reduce(
      (sum, d) => sum + (d.dealValue ?? 0) * (scout?.commissionRate ?? 0),
      0
    );
    return { total: deals.length, won: won.length, active: active.length, commission };
  }, [deals, scout]);

  const filtered = useMemo(() => {
    let list = deals;
    if (tab === "active") list = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
    else if (tab === "won") list = deals.filter((d) => d.stage === "won");
    else if (tab === "lost") list = deals.filter((d) => d.stage === "lost");
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (d) =>
          d.companyName.toLowerCase().includes(q) ||
          (d.contactName ?? "").toLowerCase().includes(q) ||
          (d.contactEmail ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [deals, tab, query]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: stats.total },
    { key: "active", label: "Active", count: stats.active },
    { key: "won", label: "Won", count: stats.won },
    { key: "lost", label: "Lost", count: deals.filter((d) => d.stage === "lost").length },
  ];

  return (
    <>
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-[1100px]">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Your dashboard</h1>
              <p className="mt-1 max-w-xl text-[14px] text-text-secondary">
                Track every deal you&apos;ve referred — pipeline stage, meetings, and the
                commission you&apos;ve earned.
              </p>
            </div>
            {scout && scout.status === "active" && (
              <div className="flex flex-wrap items-center gap-2">
                <WhatsAppReferButton scout={scout} size="sm" />
                <Link href="/dealshare/new">
                  <Button variant="secondary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                    Refer with form
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {admin && (
            <Link
              href="/dealshare/admin"
              className="mt-5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[#FED7AA] bg-[#FFF7ED] px-4 py-2.5 text-[13px] font-medium text-[#9A3412] transition-standard hover:bg-[#FFEDD5]"
            >
              <ShieldCheck className="h-4 w-4" />
              You have admin access — open the internal Dealshare console →
            </Link>
          )}

          {scout && scout.status !== "active" && (
            <div className="mt-5 rounded-[var(--radius-md)] border border-[#FED7AA] bg-[#FFF7ED] px-4 py-3 text-[13px] text-[#9A3412]">
              Your scout account is <strong>paused</strong>. You can still view your pipeline, but
              referring and updating deals is disabled — contact the Apriori team to resume.
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner />
            </div>
          ) : (
            <>
              {scout && scout.status === "active" && (
                <div className="mt-5">
                  <WhatsAppReferCard scout={scout} />
                </div>
              )}

              {/* Stat tiles */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile label="Total deals" value={stats.total} />
                <StatTile label="Won" value={stats.won} tone="green" />
                <StatTile label="In progress" value={stats.active} />
                <StatTile
                  label="Est. commission"
                  value={formatMoney(stats.commission, deals[0]?.currency ?? "INR")}
                  tone="amber"
                />
              </div>

              {/* Search + tabs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by company, name or email…"
                    className="w-full rounded-[var(--radius-md)] border border-border-subtle bg-bg-secondary py-2.5 pl-9 pr-3 text-[14px] text-text-primary outline-none focus:border-border-strong"
                  />
                </div>
                <div className="flex gap-1.5">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`rounded-[var(--radius-md)] border px-3 py-2 text-[13px] font-medium transition-standard ${
                        tab === t.key
                          ? "border-transparent bg-[#111827] text-white"
                          : "border-border-subtle bg-bg-secondary text-text-secondary hover:bg-bg-hover"
                      }`}
                    >
                      {t.label}{" "}
                      <span className={tab === t.key ? "text-white/70" : "text-text-tertiary"}>
                        {t.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Deal list */}
              <div className="mt-5">
                {filtered.length === 0 ? (
                  <EmptyState
                    icon={<Mail className="h-6 w-6" />}
                    title={deals.length === 0 ? "No deals yet" : "No deals match"}
                    description={
                      deals.length === 0
                        ? "Refer your first deal to start tracking it through the pipeline."
                        : "Try a different filter or search term."
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {filtered.map((d) => (
                      <DealCard key={d.id} deal={d} href={`/dealshare/${d.id}`} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {gated && (
        <TermsGate scout={scout} userId={userId!} email={email} onDone={() => void load()} />
      )}
    </>
  );
}
