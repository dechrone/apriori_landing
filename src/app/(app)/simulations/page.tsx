"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { useAppShell } from '@/components/app/AppShell';
import { useToast } from '@/components/ui/Toast';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import {
  Plus,
  Search,
  Loader2,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  MoreVertical,
  PlayCircle,
  Trash2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSimulations, deleteSimulation, type SimulationDoc } from '@/lib/firestore';

/* ── Sample simulations (always shown) ──────────────────────────────────── */

const SAMPLE_SIMULATIONS: SimulationDoc[] = [
  {
    id: 'sample',
    name: 'Sample: LAMF Onboarding — Flow 1',
    type: 'Product Flow',
    status: 'completed',
    metric: 'Completion rate · 40%',
    timestamp: 'February 2026',
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 'sample-ad',
    name: 'Sample: Export Credit — Ad Portfolio',
    type: 'Ad Portfolio',
    status: 'completed',
    metric: '11/12 valid reactions · 3 ads',
    timestamp: 'February 2026',
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 'sample-comparator',
    name: 'Sample: Flow A vs Flow B — Comparator',
    type: 'Product Flow Comparator',
    status: 'completed',
    metric: '62% vs 44% · 50 personas',
    timestamp: 'March 2026',
    createdAt: null,
    updatedAt: null,
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

function getSimulationHref(sim: SimulationDoc) {
  if (sim.id === 'sample') return '/simulations/product-flow/sample';
  if (sim.id === 'sample-ad') return '/simulations/ad-portfolio/sample';
  if (sim.id === 'sample-comparator') return '/simulations/product-flow-comparator/sample';
  if (sim.type === 'Ad Portfolio') return `/simulations/ad-portfolio/${sim.id}`;
  if (sim.type === 'Product Flow Comparator') return `/simulations/product-flow-comparator/${sim.id}`;
  return `/simulations/${sim.id}`;
}

function relativeTime(date: Date | null): string {
  if (!date) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
}

function extractCreatedAt(sim: SimulationDoc): Date | null {
  const ca = sim.createdAt as { toDate?: () => Date; seconds?: number } | null;
  if (!ca) return null;
  if (typeof ca.toDate === 'function') return ca.toDate();
  if (typeof ca.seconds === 'number') return new Date(ca.seconds * 1000);
  return null;
}

function extractPersonaCount(sim: SimulationDoc): number | null {
  const r = sim.result as Record<string, unknown> | undefined;
  if (!r) return null;
  // Try common paths
  const meta = r.metadata as Record<string, unknown> | undefined;
  if (meta?.persona_count != null) return Number(meta.persona_count);
  if (meta?.personaCount != null) return Number(meta.personaCount);
  const personas = r.personas as unknown[] | undefined;
  if (Array.isArray(personas)) return personas.length;
  const personaReactions = r.persona_reactions as unknown[] | undefined;
  if (Array.isArray(personaReactions)) return personaReactions.length;
  return null;
}

function extractStats(sim: SimulationDoc): { label: string; value: string; sub?: string }[] {
  const r = sim.result as Record<string, unknown> | undefined;

  if (sim.type === 'Ad Portfolio') {
    const metric = sim.metric || '';
    const validMatch = metric.match(/(\d+\/\d+)\s*valid/i);
    const adsMatch = metric.match(/(\d+)\s*ads?/i);
    return [
      { label: 'Valid Reactions', value: validMatch?.[1] || '—', sub: validMatch ? 'valid responses' : undefined },
      { label: 'Ads tested', value: adsMatch ? `${adsMatch[1]} ads` : '—' },
      { label: 'Audience', value: '—', sub: 'targeted' },
    ];
  }

  // Product Flow Comparator
  if (sim.type === 'Product Flow Comparator') {
    const meta = r?.metadata as Record<string, unknown> | undefined;
    const completionRate = meta?.completion_rate_pct;
    const personas = extractPersonaCount(sim);
    const assetCount = meta?.total_screens || meta?.asset_count;
    return [
      {
        label: 'Completion Rate',
        value: completionRate != null ? `${completionRate}%` : '—',
        sub: completionRate != null ? 'across both flows' : undefined,
      },
      {
        label: 'Personas',
        value: personas != null ? `${personas} personas` : '—',
        sub: personas != null ? 'simulated' : undefined,
      },
      {
        label: 'Flows Compared',
        value: assetCount != null ? `${assetCount} screens` : '2 flows',
        sub: 'side-by-side',
      },
    ];
  }

  // Product Flow / default
  const meta = r?.metadata as Record<string, unknown> | undefined;
  const completionRate = meta?.completion_rate_pct;
  const personas = extractPersonaCount(sim);
  const assetCount = meta?.total_screens || meta?.asset_count;
  return [
    {
      label: 'Completion Rate',
      value: completionRate != null ? `${completionRate}%` : '—',
      sub: completionRate != null ? 'of simulated users' : undefined,
    },
    {
      label: 'Personas',
      value: personas != null ? `${personas} personas` : '—',
      sub: personas != null ? 'simulated' : undefined,
    },
    {
      label: 'Assets',
      value: assetCount != null ? `${assetCount} screens` : '—',
    },
  ];
}

/* ── Type tag colours ───────────────────────────────────────────────────── */
const TYPE_TAG_STYLES: Record<string, string> = {
  'Product Flow': 'bg-[#EDE9FE] text-[#5B21B6]',
  'Ad Portfolio': 'bg-[#DBEAFE] text-[#1D4ED8]',
  'Product Flow Comparator': 'bg-[#F3E8FF] text-[#7C3AED]',
};

const STATUS_TAG_STYLES: Record<string, string> = {
  completed: 'bg-[#D1FAE5] text-[#065F46]',
  running: 'bg-[#FEF3C7] text-[#92400E]',
  draft: 'bg-[#F3F4F6] text-[#6B7280]',
  failed: 'bg-[#FEE2E2] text-[#991B1B]',
};

/* ── Custom Dropdown Component ──────────────────────────────────────────── */

interface DropdownOption {
  value: string;
  label: string;
}

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 border-[1.5px] rounded-[10px] px-3.5 py-[10px] bg-white
          text-[14px] text-[#374151] cursor-pointer whitespace-nowrap min-w-[130px]
          transition-colors duration-150
          ${open ? 'border-[#F59E0B]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}
        `}
      >
        <span className="flex-1 text-left">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-[#E8E4DE] rounded-[10px] py-1 min-w-full"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`
                block w-full text-left px-3.5 py-2 text-[14px] transition-colors
                ${opt.value === value ? 'text-[#F59E0B] font-semibold bg-[#FFFBEB]' : 'text-[#374151] hover:bg-[#F9FAFB]'}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════════════ */

export default function SimulationsPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useFirebaseUser();
  const router = useRouter();

  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulations, setSimulations] = useState<SimulationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  // Menu & delete state
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpenId]);

  const loadSimulations = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const data = await getSimulations(userId);
      setSimulations(data);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to load simulations', 'Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [userId, profileReady, showToast]);

  useEffect(() => { loadSimulations(); }, [loadSimulations]);

  /* ── Filtering ──────────────────────────────────────────────────────── */

  const filtered = simulations.filter((s) => {
    const matchType =
      typeFilter === 'all' ||
      (typeFilter === 'product-flow' && s.type === 'Product Flow') ||
      (typeFilter === 'ad-portfolio' && s.type === 'Ad Portfolio') ||
      (typeFilter === 'comparator' && s.type === 'Product Flow Comparator');
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchSearch =
      !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const samplesToShow = SAMPLE_SIMULATIONS.filter((s) => {
    const typeMatch =
      typeFilter === 'all' ||
      (typeFilter === 'product-flow' && s.type === 'Product Flow') ||
      (typeFilter === 'ad-portfolio' && s.type === 'Ad Portfolio');
    const statusMatch = statusFilter === 'all' || s.status === statusFilter;
    const searchMatch =
      !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });

  const listToShow = [...samplesToShow, ...filtered];
  const totalCount = SAMPLE_SIMULATIONS.length + simulations.length;
  const hasFilters = typeFilter !== 'all' || statusFilter !== 'all' || searchQuery.trim() !== '';

  /* ── Delete handler ─────────────────────────────────────────────────── */

  const handleDelete = async (id: string, name: string) => {
    if (!userId) return;
    setDeletingId(id);
    try {
      await deleteSimulation(userId, id);
      setConfirmDeleteId(null);
      setRemovingId(id);
      setTimeout(() => {
        setSimulations((prev) => prev.filter((s) => s.id !== id));
        setRemovingId(null);
      }, 300);
      showToast('success', 'Simulation deleted', `"${name}" has been removed.`);
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to delete', 'Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  /* ── Render ─────────────────────────────────────────────────────────── */

  return (
    <>
      <TopBar title="Simulations" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
        <div className="max-w-[900px] mx-auto relative pb-24">

          {/* ═══ FILTER & SEARCH BAR ═══ */}
          <div
            className="bg-white border border-[#E8E4DE] rounded-[14px] px-5 py-[14px] mb-5 flex items-center gap-3 flex-wrap"
          >
            {/* Search input */}
            <div
              className={`
                flex items-center gap-2.5 flex-1 min-w-[200px] border-[1.5px] rounded-[10px] px-3.5 py-[10px] bg-[#FAFAFA]
                transition-all duration-150
                ${searchFocused ? 'border-[#F59E0B] shadow-[0_0_0_3px_rgba(245,158,11,0.1)]' : 'border-[#E5E7EB]'}
              `}
            >
              <Search className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search simulations by name..."
                className="flex-1 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] bg-transparent border-none outline-none"
              />
            </div>

            {/* Vertical divider */}
            <div className="w-px h-6 bg-[#E5E7EB] flex-shrink-0 hidden sm:block" />

            {/* Type filter */}
            <FilterDropdown
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'product-flow', label: 'Product Flow' },
                { value: 'ad-portfolio', label: 'Ad Portfolio' },
                { value: 'comparator', label: 'Comparator' },
              ]}
            />

            {/* Status filter */}
            <FilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'completed', label: 'Completed' },
                { value: 'running', label: 'Running' },
                { value: 'draft', label: 'Draft' },
                { value: 'failed', label: 'Failed' },
              ]}
            />
          </div>

          {/* ═══ RESULT COUNT ═══ */}
          {!loading && listToShow.length > 0 && (
            <p className="text-[13px] text-[#6B7280] mt-4 mb-3 px-1">
              Showing {listToShow.length} of {totalCount} simulation{totalCount !== 1 ? 's' : ''}
            </p>
          )}

          {/* ═══ LOADING ═══ */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#F59E0B]" />
            </div>
          ) : listToShow.length === 0 ? (
            /* ═══ EMPTY STATES ═══ */
            hasFilters ? (
              /* Filtered empty */
              <div className="flex flex-col items-center justify-center mt-[60px]">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#F59E0B]" />
                </div>
                <h2 className="text-[20px] font-semibold text-[#1A1A1A] mt-4">
                  No simulations match your filters
                </h2>
                <p className="text-[15px] text-[#4B5563] mt-2 max-w-[360px] text-center">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[14px] font-semibold text-[#F59E0B] hover:text-[#D97706] mt-6 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              /* Fully empty */
              <div className="flex flex-col items-center justify-center mt-[60px]">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-[#F59E0B]" />
                </div>
                <h2 className="text-[20px] font-semibold text-[#1A1A1A] mt-4">
                  No simulations yet
                </h2>
                <p className="text-[15px] text-[#4B5563] mt-2 max-w-[360px] text-center">
                  Run your first simulation to see how users experience your product.
                </p>
                <Link
                  href="/simulations/new"
                  className="inline-flex items-center gap-2 mt-6 h-11 px-5 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[24px] hover:bg-[#D97706] transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
                >
                  <Plus className="w-[18px] h-[18px]" />
                  New Simulation
                </Link>
              </div>
            )
          ) : (
            /* ═══ SIMULATION CARDS ═══ */
            <div className="flex flex-col gap-[14px]">
              {listToShow.map((simulation) => {
                const href = getSimulationHref(simulation);
                const createdAt = extractCreatedAt(simulation);
                const relative = relativeTime(createdAt);
                const personaCount = extractPersonaCount(simulation);
                const stats = extractStats(simulation);
                const isRunning = simulation.status === 'running';
                const isSample = simulation.id === 'sample' || simulation.id === 'sample-ad';
                const isConfirming = confirmDeleteId === simulation.id;
                const isRemoving = removingId === simulation.id;

                return (
                  <div
                    key={simulation.id}
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      opacity: isRemoving ? 0 : 1,
                      maxHeight: isRemoving ? '0px' : '600px',
                      overflow: 'hidden',
                      marginBottom: isRemoving ? 0 : undefined,
                    }}
                  >
                    <div
                      onClick={() => { if (!isConfirming) router.push(href); }}
                      className={`
                        bg-white rounded-[16px] p-6 cursor-pointer
                        transition-all duration-200 ease-in-out
                        hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-[1px]
                        ${isRunning
                          ? 'border-[1.5px] border-[#FDE68A]'
                          : 'border border-[#E8E4DE] hover:border-[#E0DCD6]'
                        }
                      `}
                      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)' }}
                    >
                      {/* Confirmation overlay */}
                      {isConfirming ? (
                        <div className="flex items-center justify-between gap-4 py-2 animate-in fade-in duration-200">
                          <p className="text-[14px] text-[#1A1A1A]">
                            Delete <span className="font-semibold">&ldquo;{simulation.name}&rdquo;</span>? This cannot be undone.
                          </p>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(null); }}
                              className="text-[13px] text-[#6B7280] px-3 py-1.5 rounded-lg hover:bg-[#F3F4F6] transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(simulation.id, simulation.name); }}
                              disabled={deletingId === simulation.id}
                              className="text-[13px] font-semibold text-white bg-[#EF4444] rounded-lg px-3.5 py-1.5 hover:bg-[#DC2626] transition-colors disabled:opacity-60 inline-flex items-center gap-1.5"
                            >
                              {deletingId === simulation.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* ROW 1 — Tags + Menu */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {/* Type tag */}
                              <span
                                className={`text-[12px] font-semibold rounded-full px-3 py-1 ${TYPE_TAG_STYLES[simulation.type] || 'bg-[#F3F4F6] text-[#6B7280]'}`}
                              >
                                {simulation.type}
                              </span>
                              {/* Status tag */}
                              <span
                                className={`inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-3 py-1 ${STATUS_TAG_STYLES[simulation.status] || 'bg-[#F3F4F6] text-[#6B7280]'}`}
                              >
                                {isRunning && (
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                  </span>
                                )}
                                {simulation.status}
                              </span>
                            </div>

                            {/* ··· menu */}
                            <div
                              className="relative"
                              ref={menuOpenId === simulation.id ? menuRef : undefined}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpenId(menuOpenId === simulation.id ? null : simulation.id);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#374151] transition-colors"
                              >
                                <MoreVertical className="w-[18px] h-[18px]" />
                              </button>

                              {menuOpenId === simulation.id && (
                                <div
                                  className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E8E4DE] rounded-[10px] py-1 min-w-[180px]"
                                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                >
                                  <button
                                    className="flex items-center gap-2.5 w-full px-3 py-2 text-[14px] text-[#1A1A1A] rounded-[7px] mx-1 hover:bg-[#F9FAFB] transition-colors"
                                    style={{ width: 'calc(100% - 8px)' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMenuOpenId(null);
                                      router.push(href);
                                    }}
                                  >
                                    <Eye className="w-4 h-4 text-[#6B7280]" />
                                    View results
                                  </button>
                                  {!isSample && (
                                    <>
                                      <div className="h-px bg-[#F3F4F6] mx-1 my-1" />
                                      <button
                                        className="flex items-center gap-2.5 w-full px-3 py-2 text-[14px] text-[#EF4444] rounded-[7px] mx-1 hover:bg-[#FEF2F2] transition-colors"
                                        style={{ width: 'calc(100% - 8px)' }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setMenuOpenId(null);
                                          setConfirmDeleteId(simulation.id);
                                        }}
                                      >
                                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                                        Delete simulation
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* ROW 2 — Title */}
                          <h3 className="text-[18px] font-bold text-[#1A1A1A] mt-3 mb-[10px] leading-[1.3]">
                            {simulation.name}
                          </h3>

                          {/* ROW 3 — Metadata strip */}
                          <div className="flex items-center gap-4 flex-wrap text-[13px] text-[#6B7280]">
                            {simulation.timestamp && (
                              <>
                                <span className="inline-flex items-center gap-[5px]">
                                  <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                  {simulation.timestamp}
                                </span>
                                <span className="text-[#D1D5DB]">·</span>
                              </>
                            )}
                            {relative && (
                              <>
                                <span className="inline-flex items-center gap-[5px]">
                                  <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                  {relative}
                                </span>
                                <span className="text-[#D1D5DB]">·</span>
                              </>
                            )}
                            {personaCount != null && (
                              <span className="inline-flex items-center gap-[5px]">
                                <Users className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                {personaCount} persona{personaCount !== 1 ? 's' : ''}
                              </span>
                            )}
                            {isRunning && (
                              <>
                                <span className="text-[#D1D5DB]">·</span>
                                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-amber-600">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                  </span>
                                  Running...
                                </span>
                              </>
                            )}
                          </div>

                          {/* Running state progress bar */}
                          {isRunning && (
                            <div className="bg-[#FEF3C7] rounded-lg px-3.5 py-[10px] mt-3 flex items-center gap-2.5">
                              <div className="w-4 h-4 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                              <span className="text-[13px] font-medium text-[#92400E]">
                                Simulation in progress…
                              </span>
                              {relative && (
                                <span className="text-[12px] text-[#D97706] ml-auto">
                                  Started {relative.toLowerCase()}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Divider */}
                          <div className="h-px bg-[#F3F4F6] my-4" />

                          {/* ROW 4 — Stats grid */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            {stats.map((stat) => (
                              <div key={stat.label}>
                                <p className="text-[12px] font-medium text-[#9CA3AF] mb-1">{stat.label}</p>
                                <p className={`text-[16px] font-bold ${stat.value === '—' ? 'text-[#9CA3AF]' : 'text-[#1A1A1A]'}`}>
                                  {stat.value}
                                </p>
                                {stat.sub && (
                                  <p className="text-[12px] text-[#6B7280] mt-0.5">{stat.sub}</p>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* ROW 5 — View Details CTA */}
                          <div className="flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(href);
                              }}
                              className="inline-flex items-center gap-[5px] text-[13px] font-semibold text-[#F59E0B] hover:text-[#D97706] transition-colors duration-150 p-0 bg-transparent border-none cursor-pointer"
                            >
                              View Details
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ FAB ═══ */}
          <div className="fixed bottom-6 right-6 lg:right-10 z-30">
            <Link href="/simulations/new">
              <span className="inline-flex items-center gap-2 h-12 px-5 text-[14px] font-semibold text-white bg-[#F59E0B] rounded-[24px] hover:bg-[#D97706] transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_16px_rgba(245,158,11,0.45)]">
                <Plus className="w-[18px] h-[18px]" />
                New Simulation
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
