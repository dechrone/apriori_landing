"use client";

/**
 * Dealshare — small presentational building blocks shared across the scout
 * dashboard, deal detail, and admin views. Pure UI; data comes from props.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PIPELINE,
  STAGE_TONE,
  stageIndex,
  stageMeta,
  formatMoney,
  formatDate,
  type DealStage,
} from "@/lib/dealshare-constants";
import type { Deal } from "@/lib/dealshare";

// ─── Stage badge ─────────────────────────────────────────────────────────────

export function StageBadge({ stage, className = "" }: { stage: DealStage; className?: string }) {
  const tone = STAGE_TONE[stage];
  const meta = stageMeta(stage);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
      style={{ backgroundColor: tone.bg, color: tone.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tone.dot }} />
      {meta.label}
    </span>
  );
}

// ─── Compact dot timeline (the 5-dot rail from the reference) ────────────────

export function PipelineDots({ stage }: { stage: DealStage }) {
  const reached = stageIndex(stage); // -1 when lost
  const isLost = stage === "lost";
  return (
    <div className="flex items-center gap-1.5" aria-label={`Stage: ${stageMeta(stage).label}`}>
      {PIPELINE.map((s, i) => {
        const done = !isLost && i <= reached;
        const isCurrent = !isLost && i === reached;
        return (
          <div key={s.key} className="flex items-center gap-1.5">
            <span
              className="rounded-full transition-colors"
              style={{
                width: isCurrent ? 11 : 9,
                height: isCurrent ? 11 : 9,
                backgroundColor: done ? STAGE_TONE[s.key].dot : "#D1D5DB",
                outline: isCurrent ? `3px solid ${STAGE_TONE[s.key].dot}22` : "none",
              }}
              title={s.label}
            />
            {i < PIPELINE.length - 1 && (
              <span
                className="h-px w-5"
                style={{ backgroundColor: !isLost && i < reached ? STAGE_TONE[stage].dot : "#E5E7EB" }}
              />
            )}
          </div>
        );
      })}
      {isLost && (
        <span className="ml-2 text-xs font-semibold" style={{ color: STAGE_TONE.lost.text }}>
          Lost
        </span>
      )}
    </div>
  );
}

// ─── Deal card (scout dashboard list item) ───────────────────────────────────

export function DealCard({ deal, href }: { deal: Deal; href: string }) {
  return (
    <Link
      href={href}
      className="block rounded-[var(--radius-md)] border border-border-subtle bg-bg-secondary p-4 transition-standard hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-text-primary">{deal.companyName}</h3>
          {deal.contactName && (
            <p className="truncate text-[13px] text-text-secondary">
              {deal.contactName}
              {deal.contactEmail ? ` · ${deal.contactEmail}` : ""}
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <StageBadge stage={deal.stage} />
          <ArrowUpRight className="h-4 w-4 text-text-tertiary" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <PipelineDots stage={deal.stage} />
        <span className="text-[13px] font-medium text-text-secondary">
          {deal.dealValue != null ? formatMoney(deal.dealValue, deal.currency) : ""}
        </span>
      </div>
      <p className="mt-2 text-xs text-text-tertiary">
        Submitted {formatDate(deal.createdAt)}
        {deal.wonAt ? ` · Won ${formatDate(deal.wonAt)}` : ""}
      </p>
    </Link>
  );
}

// ─── Stat tile ───────────────────────────────────────────────────────────────

export function StatTile({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "green" | "amber";
}) {
  const color = tone === "green" ? "#15803D" : tone === "amber" ? "#B45309" : "#111827";
  return (
    <div className="rounded-[var(--radius-md)] border border-border-subtle bg-bg-secondary px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
