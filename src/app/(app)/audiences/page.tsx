"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/app/TopBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useUser } from '@/contexts/UserContext';
import { Plus, Users, MoreVertical, Loader2, Trash2, Pencil } from 'lucide-react';
import { getAudiences, deleteAudience, type AudienceDoc } from '@/lib/db';
import { getActiveCategories } from '@/lib/audience-filter-utils';
import type { AdvancedFilters, FilterCategory } from '@/types/audience-filters';

/* ──── helpers ──── */

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  demographics: "Demographics",
  location: "Location",
  income: "Income & Spending",
  behaviour: "Behaviour",
  psychographics: "Psychographics",
  digital: "Digital Habits",
};

function formatRelativeDate(raw: unknown): string {
  if (!raw) return "";
  let ms: number;
  if (typeof raw === "object" && raw !== null && "seconds" in raw) {
    ms = (raw as { seconds: number }).seconds * 1000;
  } else if (typeof raw === "string") {
    ms = new Date(raw).getTime();
  } else if (typeof raw === "number") {
    ms = raw;
  } else {
    return "";
  }
  const diff = Date.now() - ms;
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Created today";
  if (days === 1) return "Created 1 day ago";
  if (days < 30) return `Created ${days} days ago`;
  return `Created on ${new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
}

function getDescriptionText(audience: AudienceDoc): { text: string; isEmpty: boolean } {
  if (audience.audienceDescription && audience.audienceDescription.trim().length > 0) {
    return { text: audience.audienceDescription.trim(), isEmpty: false };
  }
  // Fallback: summarize from active filter categories
  const filters = audience.filters as AdvancedFilters | null | undefined;
  if (filters) {
    const cats = getActiveCategories(filters);
    if (cats.length > 0) {
      const labels = cats.map((c) => CATEGORY_LABELS[c]);
      return { text: `Filtered by ${labels.join(" and ").toLowerCase()}.`, isEmpty: false };
    }
  }
  return { text: "No description added.", isEmpty: true };
}

/* ──── page ──── */

export default function AudiencesPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useUser();
  const router = useRouter();

  const [audiences, setAudiences] = useState<AudienceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const loadAudiences = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const data = await getAudiences(userId);
      setAudiences(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load audiences', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId, profileReady, showToast]);

  useEffect(() => {
    loadAudiences();
  }, [loadAudiences]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpenId) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpenId]);

  const handleDelete = async (id: string, name: string) => {
    if (!userId) return;
    setDeletingId(id);
    try {
      await deleteAudience(userId, id);
      // Animate out
      setRemovingId(id);
      setTimeout(() => {
        setAudiences((prev) => prev.filter((a) => a.id !== id));
        setRemovingId(null);
        setConfirmDeleteId(null);
        setDeletingId(null);
      }, 350);
      showToast('success', 'Audience deleted', `"${name}" has been removed.`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete audience', 'Please try again.');
      setDeletingId(null);
    }
  };

  return (
    <>
      <TopBar title="Audiences" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[1600px] mx-auto relative pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : audiences.length === 0 ? (
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="Build your first audience"
            description="Define who you're simulating for. Audiences power more accurate, persona-driven results."
            action={{
              label: 'Create Audience',
              onClick: () => window.location.assign('/audiences/new'),
            }}
            ghostCards={[
              { lines: [65, 85, 50], badge: true },
              { lines: [55, 90, 45], badge: true },
            ]}
          />
        ) : (
          <div className="flex flex-col gap-3 max-w-[800px]">
            {audiences.map((audience) => {
              const isConfirming = confirmDeleteId === audience.id;
              const isRemoving = removingId === audience.id;
              const filters = audience.filters as AdvancedFilters | null | undefined;
              const activeCategories = filters ? getActiveCategories(filters) : [];
              const { text: descText, isEmpty: descEmpty } = getDescriptionText(audience);

              return (
                <div
                  key={audience.id}
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isRemoving ? 0 : 1,
                    maxHeight: isRemoving ? "0px" : "500px",
                    overflow: "hidden",
                    marginBottom: isRemoving ? 0 : undefined,
                  }}
                >
                  <div
                    onClick={() => {
                      if (!isConfirming) router.push(`/audiences/${audience.id}/edit`);
                    }}
                    className="bg-white rounded-[14px] border border-[#E8E4DE] p-5 sm:px-6 cursor-pointer transition-all duration-200 ease-in-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]"
                    style={{
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* ── Confirmation state ── */}
                    {isConfirming ? (
                      <div className="flex items-center justify-between gap-4 py-2 animate-in fade-in duration-200">
                        <p className="text-[14px] text-[#1A1A1A]">
                          Delete <span className="font-semibold">&ldquo;{audience.name}&rdquo;</span>? This cannot be undone.
                        </p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                            className="text-[13px] text-[#6B7280] px-3 py-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(audience.id, audience.name); }}
                            disabled={deletingId === audience.id}
                            className="text-[13px] font-semibold text-white bg-[#EF4444] rounded-lg px-3.5 py-1.5 hover:bg-[#DC2626] transition-colors disabled:opacity-60 inline-flex items-center gap-1.5"
                          >
                            {deletingId === audience.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* ── ROW 1 — Header ── */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-[15px] font-semibold text-[#1A1A1A] truncate">
                              {audience.name}
                            </h3>
                            <span
                              className="inline-flex items-center text-[11px] font-semibold rounded-full px-2 py-[2px] flex-shrink-0"
                              style={
                                audience.status === "active"
                                  ? { background: "#D1FAE5", color: "#065F46" }
                                  : { background: "#F3F4F6", color: "#6B7280" }
                              }
                            >
                              {audience.status}
                            </span>
                          </div>

                          {/* Three-dot menu */}
                          <div className="relative" ref={menuOpenId === audience.id ? menuRef : undefined}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpenId(menuOpenId === audience.id ? null : audience.id);
                              }}
                              className="w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#374151] transition-colors"
                            >
                              <MoreVertical className="w-[18px] h-[18px]" />
                            </button>

                            {menuOpenId === audience.id && (
                              <div
                                className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E8E4DE] rounded-[10px] py-1 min-w-[160px]"
                                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                              >
                                <button
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-[14px] text-[#1A1A1A] rounded-[7px] mx-1 hover:bg-[#F9FAFB] transition-colors"
                                  style={{ width: "calc(100% - 8px)" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpenId(null);
                                    router.push(`/audiences/${audience.id}/edit`);
                                  }}
                                >
                                  <Pencil className="w-4 h-4 text-[#6B7280]" />
                                  Edit audience
                                </button>
                                <div className="h-px bg-[#F3F4F6] mx-1 my-1" />
                                <button
                                  className="flex items-center gap-2.5 w-full px-3 py-2 text-[14px] text-[#EF4444] rounded-[7px] mx-1 hover:bg-[#FEF2F2] transition-colors"
                                  style={{ width: "calc(100% - 8px)" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpenId(null);
                                    setConfirmDeleteId(audience.id);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 text-[#EF4444]" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* ── ROW 2 — Description / prose ── */}
                        <p
                          className={`text-[13px] leading-[1.6] mb-3.5 ${
                            descEmpty
                              ? "text-[#9CA3AF] italic"
                              : "text-[#4B5563]"
                          }`}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {descText}
                        </p>

                        {/* ── Divider ── */}
                        <div className="h-px bg-[#F3F4F6] mb-3" />

                        {/* ── ROW 3 — Footer ── */}
                        <div className="flex items-center justify-between">
                          {/* Filter category tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {activeCategories.map((cat) => (
                              <span
                                key={cat}
                                className="bg-[#F3F4F6] rounded-md px-2 py-[3px] text-[11px] font-medium text-[#6B7280]"
                              >
                                {CATEGORY_LABELS[cat]}
                              </span>
                            ))}
                          </div>

                          {/* Timestamp */}
                          <span className="text-[12px] text-[#9CA3AF] flex-shrink-0 ml-3">
                            {formatRelativeDate(audience.createdAt)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {audiences.length > 0 && (
          <div className="fixed bottom-6 right-6 lg:right-10 z-30">
            <Link href="/audiences/new">
              <span className="inline-flex items-center gap-2 h-12 px-5 text-[14px] font-semibold text-white bg-[#1F2937] rounded-[24px] hover:bg-[#111827] transition-all duration-200 shadow-[0_4px_12px_rgba(31, 41, 55,0.35)] hover:shadow-[0_6px_16px_rgba(31, 41, 55,0.45)]">
                <Plus className="w-[18px] h-[18px]" />
                Create Audience
              </span>
            </Link>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
