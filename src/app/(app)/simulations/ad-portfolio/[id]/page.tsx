"use client";

import { useState, useCallback, useMemo } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppShell } from '@/components/app/AppShell';
import {
  MoreVertical,
  FileText,
  BarChart3,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  Download,
} from 'lucide-react';
import { PersonaReactionExplorer } from './components/PersonaReactionExplorer';

type TabId = 'results' | 'deep-dive';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'results', label: 'Simulation Results', icon: <FileText className="w-4 h-4" /> },
  { id: 'deep-dive', label: 'Deep Dive', icon: <BarChart3 className="w-4 h-4" /> },
];

// Mock data per PRD – with confidence intervals
const MOCK_META = {
  archetypeCount: 10,
  adCount: 4,
  iterationsPerArchetype: 10000,
  totalSimulations: 100000,
  validReactions: 37,
  flaggedCount: 3,
  runDate: 'February 14, 2026',
  confidenceLevel: 95,
};

const MOCK_ARCHETYPES = [
  { name: 'Trust-Driven Professionals', pct: 40, personas: 4, users: '~400K' },
  { name: 'Cautious Rural Workers', pct: 30, personas: 3, users: '~300K' },
  { name: 'Pragmatic Mid-Tier', pct: 30, personas: 3, users: '~300K' },
];

const MOCK_ADS = [
  { id: 'ad_1', name: 'Ad #1', desc: 'Trust Signals + Local Language', ctr: 71.4, ctrCi: 4.2, clicks: 5, highIntent: 5, trust: 7.4, trustCi: 0.6, relevance: 6.9, sims: 70000, rec: 'scale' as const, actions: [['Scale Budget +15%', 'scale'], ['View Segment Breakdown', 'view']] },
  { id: 'ad_2', name: 'Ad #2', desc: 'Standard Professional Layout', ctr: 60, ctrCi: 3.8, clicks: 6, highIntent: 6, trust: 4.2, trustCi: 0.7, relevance: 6.3, sims: 100000, rec: 'maintain' as const, actions: [['Maintain Budget', 'maintain'], ['Optimize Trust Signals', 'optimize']] },
  { id: 'ad_3', name: 'Ad #3', desc: 'Minimal Creative', ctr: 50, ctrCi: 4.1, clicks: 5, highIntent: 4, trust: 4.6, trustCi: 0.7, relevance: 5.8, sims: 100000, rec: 'optimize' as const, actions: [['Optimize Creative', 'optimize'], ['View Details', 'view']] },
  { id: 'ad_4', name: 'Ad #4', desc: 'Promotional Focus', ctr: 50, ctrCi: 4.0, clicks: 5, highIntent: 4, trust: 4.4, trustCi: 0.7, relevance: 5.7, sims: 100000, rec: 'replace' as const, actions: [['Review Messaging', 'review'], ['View Details', 'view']] },
];

// Recommended Meta (Facebook/Instagram) ad settings per creative – demographics & targeting to apply in Ads Manager
const MOCK_META_TARGETING: Record<string, { ageRange: string; gender: string; locations: string[]; interests: string[]; languages: string[]; placements: string[]; optimizationGoal?: string }> = {
  ad_1: {
    ageRange: '28–55',
    gender: 'All',
    locations: ['India (all regions)', 'Focus: North (Hindi belt), West (Gujarat, Maharashtra)'],
    interests: ['Small business', 'Export/Import', 'Freelancing', 'B2B services', 'Professional certifications'],
    languages: ['Hindi', 'English', 'Gujarati', 'Marathi'],
    placements: ['Feed (Facebook + Instagram)', 'Stories', 'Reels'],
    optimizationGoal: 'Conversions (Lead)',
  },
  ad_2: {
    ageRange: '25–54',
    gender: 'All',
    locations: ['India (all regions)', 'Urban + Tier 2 cities'],
    interests: ['Business and industry', 'Entrepreneurship', 'Office supplies', 'Professional development'],
    languages: ['English', 'Hindi'],
    placements: ['Feed (Facebook + Instagram)', 'Audience Network'],
    optimizationGoal: 'Link clicks',
  },
  ad_3: {
    ageRange: '30–50',
    gender: 'All',
    locations: ['India – Metro & Tier 1 only'],
    interests: ['Finance', 'Business news', 'Efficiency tools', 'SME'],
    languages: ['English'],
    placements: ['Feed (Facebook + Instagram)'],
    optimizationGoal: 'Link clicks',
  },
  ad_4: {
    ageRange: '28–45',
    gender: 'All',
    locations: ['India (all regions)'],
    interests: ['Deals and offers', 'Discounts', 'B2B software', 'Startups'],
    languages: ['English', 'Hindi'],
    placements: ['Feed', 'Stories'],
    optimizationGoal: 'Reach',
  },
};

const MOCK_INSIGHTS = [
  { num: 1, title: 'Local Language Drives Trust', description: 'Ads featuring regional languages (Hindi, Marathi) scored 40% higher (±8%) on trust compared to English-only creatives across 6 archetypes representing ~600K users.', confidence: 92, ci: [89, 95], sample: 60000, effectSize: 1.2, rec: 'Create language variants for top-performing ads targeting each region', actions: [['Generate Hindi Variant', 'primary'], ['See Detailed Analysis', 'secondary']] },
  { num: 2, title: 'Trust Signals Correlate with High Intent', description: 'R² = 0.74 (95% CI: 0.69–0.79) correlation between trust scores and high-intent behavior. Personas rating trust >7 converted to high-intent at 3.2x baseline (p < 0.001).', confidence: 91, ci: [88, 94], sample: 100000, rec: 'Audit ad copy for trust signals (certifications, guarantees, social proof)', actions: [['Trust Signal Audit Tool', 'primary'], ['View Correlation Plot', 'secondary']] },
];

const MOCK_ACTION_PLAN = [
  { priority: 'immediate' as const, num: 1, title: 'Reallocate budget to Ad #1', impact: '+₹4.2L revenue ±₹0.8L', effort: 'Low (15 minutes)', risk: 'Minimal', actions: [['Apply Budget Change', 'primary'], ['Export for Ads Manager', 'secondary']] },
  { priority: 'immediate' as const, num: 2, title: 'Create Hindi variant of Ad #1', impact: '+12 high-intent leads ±3', effort: 'Low (AI-generated)', risk: 'Low', aiNote: true, actions: [['Generate Hindi Variant Now', 'primary'], ['Preview Variants', 'secondary']] },
  { priority: 'short-term' as const, num: 3, title: 'Audit trust signals across all creatives', impact: '+15% trust scores ±4%', effort: 'Medium (30 min with AI audit tool)', risk: 'Low', actions: [['Run Trust Signal Audit', 'primary'], ['View Best Practices', 'secondary']] },
  { priority: 'short-term' as const, num: 4, title: 'A/B test messaging simplification', impact: '+8% CTR improvement ±2%', effort: 'Medium (AI draft + review)', risk: 'Medium', actions: [['Generate Simplified Variants', 'primary'], ['Setup A/B Test', 'secondary']] },
  { priority: 'long-term' as const, num: 5, title: 'Develop segment-specific landing pages', impact: '+20% conversion rate ±5%', effort: 'Very High (requires engineering)', risk: 'Medium', actions: [['View Landing Page Templates', 'primary'], ['Contact Support', 'secondary']] },
];

const VALIDATION_CHECKS = [
  'Cross-checked trust scores with vulnerability',
  'Verified behavioral consistency across ads',
  'Validated click intent against persona profile',
  'Checked for unrealistic confidence patterns',
  'Ran 10,000 Monte Carlo iterations per persona',
];

export default function AdPortfolioResultsPage() {
  const { toggleMobileMenu } = useAppShell();
  const [activeTab, setActiveTab] = useState<TabId>('results');
  const [expandedMetaAd, setExpandedMetaAd] = useState<string | null>(null);

  // Interactive revenue model
  const [aov, setAov] = useState(15000);
  const [conversionRate, setConversionRate] = useState(12);
  const [costPerImpression, setCostPerImpression] = useState(8);
  const [budget, setBudget] = useState(100000);

  const [allocation, setAllocation] = useState<Record<string, number>>({
    ad_1: 40,
    ad_2: 30,
    ad_3: 20,
    ad_4: 10,
  });

  const projectedRevenue = useMemo(() => {
    const avgCtr = MOCK_ADS.reduce((s, a, i) => s + (a.ctr / 100) * (allocation[`ad_${i + 1}`] ?? 25) / 100, 0) * 4;
    const impressions = budget / costPerImpression;
    const clicks = impressions * (avgCtr / 100);
    const leads = clicks * 0.6; // assume 60% high-intent
    const sales = leads * (conversionRate / 100);
    return Math.round(sales * aov);
  }, [aov, conversionRate, costPerImpression, budget, allocation]);

  const currentRevenue = useMemo(() => {
    const avgCtr = MOCK_ADS.reduce((s, a) => s + a.ctr, 0) / 4 / 100;
    const impressions = budget / costPerImpression;
    const clicks = impressions * avgCtr;
    const leads = clicks * 0.5;
    const sales = leads * (conversionRate / 100);
    return Math.round(sales * aov);
  }, [aov, conversionRate, costPerImpression, budget]);

  const revenueLift = Math.round(((projectedRevenue - currentRevenue) / currentRevenue) * 100);

  const handleAllocationChange = useCallback((adId: string, value: number) => {
    const others = MOCK_ADS.filter((a) => a.id !== adId);
    const othersTotal = others.reduce((s, a) => s + (allocation[a.id] ?? 25), 0);
    const remaining = 100 - value;
    if (remaining < 0) return;
    const factor = remaining / othersTotal;
    const next: Record<string, number> = { [adId]: value };
    others.forEach((a) => {
      next[a.id] = Math.round((allocation[a.id] ?? 25) * factor);
    });
    const sum = Object.values(next).reduce((a, b) => a + b, 0);
    if (sum !== 100 && others.length > 0) {
      next[others[0].id] = (next[others[0].id] ?? 0) + (100 - sum);
    }
    setAllocation(next);
  }, [allocation]);

  const avgCtr = MOCK_ADS.reduce((s, a) => s + a.ctr, 0) / MOCK_ADS.length;
  const highIntentLeads = MOCK_ADS.reduce((s, a) => s + a.highIntent, 0);

  return (
    <>
      <TopBar
        title="Ad Portfolio Simulation Results"
        breadcrumb={`Run on ${MOCK_META.runDate} · ${MOCK_META.archetypeCount} archetypes · ${MOCK_META.adCount} creatives`}
        onMenuClick={toggleMobileMenu}
        actions={
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-accent-green-bg text-accent-green rounded-lg text-body-sm font-semibold">
              Complete ({MOCK_META.validReactions}/{MOCK_META.validReactions + MOCK_META.flaggedCount} valid reactions)
            </div>
            <Button variant="ghost">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        }
      />

      <div className="max-w-[1280px] mx-auto pb-24 px-6">
        {/* Tab Navigation */}
        <div className="border-b-2 border-border-subtle mb-12">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-8 py-5 text-lg font-semibold border-b-[3px] transition-colors
                  ${activeTab === tab.id ? 'border-accent-gold text-text-primary' : 'border-transparent text-text-tertiary hover:text-text-primary'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'results' && (
          <div className="space-y-20">
            {/* Section 1: Simulation Context */}
            <section className="border-t border-border-subtle pt-10 first:border-t-0 first:pt-0">
              <h2 className="text-report-section mb-8">Simulation Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.5rem] font-bold text-text-primary tracking-tight">{MOCK_META.archetypeCount} Archetypes</p>
                    <p className="text-body text-text-secondary mt-2 max-w-[160px] mx-auto leading-relaxed">Each represents ~100K real users</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.5rem] font-bold text-text-primary tracking-tight">{MOCK_META.adCount} Creatives</p>
                    <p className="text-body text-text-secondary mt-2 max-w-[160px] mx-auto leading-relaxed">Tested across all segments</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.5rem] font-bold text-text-primary tracking-tight">10,000 Runs</p>
                    <p className="text-body text-text-secondary mt-2 max-w-[160px] mx-auto leading-relaxed">Per persona combination</p>
                  </CardContent>
                </Card>
              </div>
              <h2 className="text-report-section mb-6">Target Audience</h2>
              <Card>
                <CardContent className="py-8">
                  <p className="text-body text-text-secondary mb-6">
                    Exporters, Freelancers & SMEs · Geography: India (Multi-region, Multi-language) · Confidence Level: 95% (p &lt; 0.05)
                  </p>
                  <h3 className="text-report-subsection mb-6">Persona Archetype Distribution</h3>
                  {MOCK_ARCHETYPES.map((arch) => (
                    <div key={arch.name} className="mb-6 last:mb-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-48 h-2 bg-bg-elevated rounded-full overflow-hidden">
                          <div className="h-full bg-accent-gold rounded-full" style={{ width: `${arch.pct}%` }} />
                        </div>
                        <span className="text-body-lg font-semibold text-text-primary">{arch.pct}% {arch.name}</span>
                      </div>
                      <p className="text-body-sm text-text-tertiary ml-52">({arch.personas} personas, {arch.users} represented users)</p>
                    </div>
                  ))}
                  <div className="mt-6 p-5 rounded-lg bg-bg-elevated border-l-[3px] border-accent-blue italic text-body-sm text-text-secondary">
                    Methodology: Each archetype ran through 10,000 Monte Carlo simulations to generate statistically robust confidence intervals.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Executive Summary */}
            <section className="border-t border-border-subtle pt-10">
              <h2 className="text-report-section mb-8">Key Findings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[2.25rem] font-bold text-text-primary tracking-tight">58%</p>
                    <p className="text-caption text-text-tertiary mt-1">±3.2% (95% CI)</p>
                    <p className="text-body font-semibold text-text-secondary mt-3">Average CTR</p>
                    <p className="text-caption text-text-tertiary">vs 2.1% industry</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[2.25rem] font-bold text-text-primary tracking-tight">22</p>
                    <p className="text-body-sm text-text-secondary mt-1">±4 leads (95% CI)</p>
                    <p className="text-body font-semibold text-text-secondary mt-3">High-Intent Leads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[2.25rem] font-bold text-accent-green tracking-tight">+144%</p>
                    <p className="text-body-sm text-text-secondary mt-1">Revenue Lift</p>
                    <p className="text-body font-semibold text-text-secondary mt-3">Potential</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-l-4 border-l-accent-gold">
                <CardContent className="py-6">
                  <h3 className="text-report-subsection mb-3">Synthesis</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    Your portfolio demonstrates exceptional performance among high-income export managers (68% CTR ±4.1%) but reveals significant trust barriers with rural segments (33% CTR ±5.8%). Ad #1 outperforms by 43% through trust signals and localized language.
                  </p>
                  <p className="text-body text-text-secondary mt-4">
                    Primary opportunity: Reallocating 15% of budget from underperforming ads to Ad #1 projects +₹4.2L ±₹0.8L incremental revenue per ₹1L spend.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Performance Hierarchy */}
            <section className="border-t border-border-subtle pt-10">
              <h2 className="text-report-section mb-8">Creative Performance Ranking</h2>

              {/* Recommended budget – highlighted, not a CTA */}
              <div className="mb-10 p-6 rounded-xl border-2 border-accent-gold/40 bg-accent-gold/5">
                <p className="text-report-label text-accent-gold mb-2">Recommended budget (from simulation)</p>
                <p className="text-[2rem] font-bold text-text-primary tracking-tight">
                  ₹{((budget / 1000) | 0).toLocaleString()}K total
                </p>
                <p className="text-body text-text-secondary mt-1 mb-4">Apply this split in Meta Ads Manager for best projected results.</p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {MOCK_ADS.map((ad) => {
                    const pct = allocation[ad.id] ?? 25;
                    const amount = Math.round((budget * pct) / 100);
                    return (
                      <span key={ad.id} className="text-body font-medium text-text-primary">
                        {ad.name}: <span className="text-accent-gold font-semibold">₹{(amount / 1000).toFixed(0)}K</span> ({pct}%)
                      </span>
                    );
                  })}
                </div>
              </div>

              <h3 className="text-report-subsection mb-4">Recommended Meta Ad Settings</h3>
              <p className="text-body text-text-secondary mb-6">
                Demographics and targeting to select in Meta Ads Manager for each creative. Use these settings when creating or editing your ad sets.
              </p>

              <div className="space-y-4">
                {MOCK_ADS.map((ad, i) => {
                  const meta = MOCK_META_TARGETING[ad.id];
                  const isMetaOpen = expandedMetaAd === ad.id;
                  const pct = allocation[ad.id] ?? 25;
                  const allocatedAmount = Math.round((budget * pct) / 100);
                  return (
                    <Card key={ad.id} className="border border-border-subtle">
                      <CardContent className="py-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-h4 shrink-0 ${i === 0 ? 'bg-accent-gold/20 text-accent-gold' : 'bg-bg-elevated text-text-primary'}`}>
                            #{i + 1}
                          </div>
                          <div className="w-20 h-20 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
                            <ImageIcon className="w-10 h-10 text-text-tertiary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <p className="text-h4 text-text-primary font-semibold">{ad.name}</p>
                                <p className="text-body-sm text-text-tertiary">&quot;{ad.desc}&quot;</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-h4 font-bold text-text-primary">₹{(allocatedAmount / 1000).toFixed(0)}K</p>
                                <p className="text-body-sm text-text-secondary">{pct}% of budget</p>
                                <p className="text-body-sm text-text-tertiary mt-0.5">{ad.ctr}% ±{ad.ctrCi}% CTR</p>
                              </div>
                            </div>
                            <div className="mt-3 h-2 bg-bg-elevated rounded-full overflow-hidden max-w-xs">
                              <div className="h-full bg-accent-gold rounded-full" style={{ width: `${ad.ctr}%` }} />
                            </div>
                            <p className="text-body-sm text-text-tertiary mt-2">
                              High-Intent: {ad.highIntent} | Trust: {ad.trust}/10 ±{ad.trustCi} | Relevance: {ad.relevance}
                            </p>
                            <p className="text-body-sm text-text-tertiary mt-1">Sample: {ad.sims.toLocaleString()} simulations</p>

                            {/* Dropdown: Meta targeting for this creative */}
                            {meta && (
                              <div className="mt-4 border border-border-subtle rounded-lg overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => setExpandedMetaAd(isMetaOpen ? null : ad.id)}
                                  className="w-full flex items-center justify-between py-3 px-4 text-left text-body font-semibold text-text-primary bg-bg-elevated/50 hover:bg-bg-elevated transition-colors"
                                >
                                  <span>Meta demographics &amp; targeting for this creative</span>
                                  {isMetaOpen ? <ChevronDown className="w-5 h-5 shrink-0" /> : <ChevronRight className="w-5 h-5 shrink-0" />}
                                </button>
                                {isMetaOpen && (
                                  <div className="p-4 pt-0 space-y-3 text-body-sm text-text-secondary border-t border-border-subtle bg-bg-base">
                                    <div><span className="font-semibold text-text-primary">Age:</span> {meta.ageRange}</div>
                                    <div><span className="font-semibold text-text-primary">Gender:</span> {meta.gender}</div>
                                    <div>
                                      <span className="font-semibold text-text-primary">Locations:</span>
                                      <ul className="list-disc list-inside mt-1">{meta.locations.map((loc, j) => <li key={j}>{loc}</li>)}</ul>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-text-primary">Interests:</span> {meta.interests.join(', ')}
                                    </div>
                                    <div><span className="font-semibold text-text-primary">Languages:</span> {meta.languages.join(', ')}</div>
                                    <div><span className="font-semibold text-text-primary">Placements:</span> {meta.placements.join(', ')}</div>
                                    {meta.optimizationGoal && <div><span className="font-semibold text-text-primary">Optimization goal:</span> {meta.optimizationGoal}</div>}
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="mt-4 pt-3 border-t border-border-subtle">
                              <p className="text-body font-semibold text-text-primary">
                                Recommendation: <span className="text-accent-gold">{ad.actions[0][0]}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Section 4: Strategic Insights */}
            <section className="border-t border-border-subtle pt-10">
              <h2 className="text-report-section mb-8">Data-Backed Insights</h2>
              <div className="space-y-8">
                {MOCK_INSIGHTS.map((insight) => (
                  <Card key={insight.num} className="border-l-4 border-l-accent-gold">
                    <CardContent className="py-8">
                      <p className="text-report-subsection text-text-primary font-semibold">{insight.num}. {insight.title}</p>
                      <p className="text-body-lg text-text-secondary leading-relaxed mt-4">{insight.description}</p>
                      <div className="flex flex-wrap items-center gap-6 mt-5">
                        <div className="flex items-center gap-3">
                          <div className="w-28 h-2 bg-bg-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${insight.confidence}%` }} />
                          </div>
                          <span className="text-body text-text-secondary">Confidence: {insight.confidence}% (95% CI: {insight.ci[0]}-{insight.ci[1]}%)</span>
                        </div>
                        <span className="text-body text-text-secondary">Sample: {insight.sample.toLocaleString()} simulations</span>
                        {insight.effectSize && <span className="text-body text-text-secondary">Effect size: Cohen&apos;s d = {insight.effectSize} (Large)</span>}
                      </div>
                      <div className="mt-6 p-5 rounded-lg bg-accent-gold/10 border-l-4 border-accent-gold">
                        <p className="text-report-label text-text-tertiary mb-1">Recommendation</p>
                        <p className="text-lg font-semibold text-text-primary leading-snug">{insight.rec}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 6: Recommended Action Plan */}
            <section className="border-t border-border-subtle pt-10">
              <h2 className="text-report-section mb-8">Prioritized Next Steps</h2>
              <div className="space-y-10">
                {(['immediate', 'short-term', 'long-term'] as const).map((priority) => {
                  const items = MOCK_ACTION_PLAN.filter((a) => a.priority === priority);
                  if (items.length === 0) return null;
                  const priorityLabel = priority.replace('-', ' ');
                  const isImmediate = priority === 'immediate';
                  return (
                    <div key={priority} className="relative">
                      <div className={`inline-block px-4 py-1.5 rounded-full text-body font-semibold uppercase tracking-wider mb-6 ${isImmediate ? 'bg-accent-gold/20 text-accent-gold' : 'bg-bg-elevated text-text-secondary'}`}>
                        {priorityLabel}
                      </div>
                      <div className="relative border-l-2 border-border-subtle pl-[4.5rem] ml-5 space-y-0">
                        {items.map((item) => (
                          <div key={item.num} className="relative pb-8 last:pb-0">
                            <div className={`absolute left-0 top-0 w-10 h-10 -translate-x-1/2 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border-2 border-bg-base ${isImmediate ? 'bg-accent-gold text-bg-base' : 'bg-bg-elevated text-text-primary'}`}>
                              {item.num}
                            </div>
                            <div className="pt-0.5 pl-8">
                              <p className="text-report-subsection text-text-primary font-semibold">{item.title}</p>
                              <p className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-accent-green/15 text-accent-green text-body font-semibold">
                                {item.impact}
                              </p>
                              <p className="text-body text-text-secondary mt-3">Effort: {item.effort} · Risk: {item.risk}</p>
                              {item.aiNote && (
                                <p className="text-body-sm text-text-tertiary mt-2 italic">AI will auto-translate copy and generate preview. You can review and edit before publishing.</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 7: Risk Assessment */}
            <section className="border-t border-border-subtle pt-10">
              <h2 className="text-report-section mb-8">Simulation Quality Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[3rem] font-bold text-text-primary">92.5</p>
                    <p className="text-body font-semibold text-text-secondary mt-1">Quality Score (Excellent)</p>
                    <p className="text-caption text-text-tertiary">95% CI: 90.2–94.8</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[3rem] font-bold text-accent-green">37/40</p>
                    <p className="text-body font-semibold text-text-secondary mt-1">Valid Reactions</p>
                    <p className="text-caption text-text-tertiary">3 flagged & removed · Flagged rate: 7.5%</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-6">
                <CardContent className="py-6">
                  <h3 className="text-report-subsection mb-4">Validation Checks Performed</h3>
                  <ul className="space-y-2">
                    {VALIDATION_CHECKS.map((check, i) => (
                      <li key={i} className="flex items-center gap-2 text-body text-text-secondary">
                        <span className="text-accent-green">✓</span> {check}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-report-subsection mb-4">Flagged Reactions (Removed from Analysis)</h3>
                  <p className="text-body text-text-secondary">
                    3 reactions showed unrealistic trust (&gt;8/10) with high-vulnerability personas (scam indicators: Yes).
                  </p>
                  <p className="text-body-sm text-text-tertiary mt-2">
                    These reactions were automatically excluded to maintain result accuracy and prevent false positives.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm">View Flagged Details</Button>
                    <Button variant="ghost" size="sm">Download Validation Report</Button>
                  </div>
                </CardContent>
              </Card>
              <p className="text-body-sm text-text-secondary mt-6">
                Statistical Rigor: All insights include 95% confidence intervals and effect sizes. Minimum 10,000 simulations per archetype. P-values reported for all correlations.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <section className="border-t border-border-subtle pt-10 first:border-t-0 first:pt-0 -mx-6 px-0">
            <div className="px-6 mb-6">
              <h2 className="text-report-section">Persona Reaction Explorer</h2>
            </div>
            <PersonaReactionExplorer ads={MOCK_ADS} />
          </section>
        )}
      </div>
    </>
  );
}
