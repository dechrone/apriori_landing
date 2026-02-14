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
  ExternalLink,
} from 'lucide-react';

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

// Reaction matrix mock
const MOCK_MATRIX = [
  { archetype: 'Trust-Driven Professionals', personas: 4, ad1: 'high', ad2: 'high', ad3: 'mid', ad4: 'mid', cr1: 75, cr2: 70, cr3: 50, cr4: 45 },
  { archetype: 'Cautious Rural Workers', personas: 3, ad1: 'none', ad2: 'none', ad3: 'none', ad4: 'none', cr1: 0, cr2: 0, cr3: 0, cr4: 0 },
  { archetype: 'Pragmatic Mid-Tier', personas: 3, ad1: 'mid', ad2: 'mid', ad3: 'mid', ad4: 'mid', cr1: 40, cr2: 38, cr3: 35, cr4: 32 },
];

export default function AdPortfolioResultsPage() {
  const { toggleMobileMenu } = useAppShell();
  const [activeTab, setActiveTab] = useState<TabId>('results');
  const [expandedArchetype, setExpandedArchetype] = useState<string | null>(null);
  const [expandedAd, setExpandedAd] = useState<string | null>(MOCK_ADS[0]?.id ?? null);

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

      <div className="max-w-[1200px] mx-auto pb-24">
        {/* Tab Navigation */}
        <div className="border-b-2 border-border-subtle mb-10">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-8 py-4 text-body font-semibold border-b-[3px] transition-colors
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
          <div className="space-y-12">
            {/* Section 1: Simulation Context */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Simulation Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.25rem] font-bold text-text-primary tracking-tight">{MOCK_META.archetypeCount} Archetypes</p>
                    <p className="text-caption text-text-tertiary mt-2 max-w-[140px] mx-auto leading-relaxed">Each represents ~100K real users</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.25rem] font-bold text-text-primary tracking-tight">{MOCK_META.adCount} Creatives</p>
                    <p className="text-caption text-text-tertiary mt-2 max-w-[140px] mx-auto leading-relaxed">Tested across all segments</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[2.25rem] font-bold text-text-primary tracking-tight">10,000 Runs</p>
                    <p className="text-caption text-text-tertiary mt-2 max-w-[140px] mx-auto leading-relaxed">Per persona combination</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-body-sm text-text-secondary mb-4">
                Target Audience: Exporters, Freelancers & SMEs · Geography: India (Multi-region, Multi-language) · Confidence Level: 95% (p &lt; 0.05)
              </p>
              <Card>
                <CardContent className="py-6">
                  <h3 className="text-label text-text-tertiary uppercase tracking-wider mb-4">Persona Archetype Distribution</h3>
                  {MOCK_ARCHETYPES.map((arch) => (
                    <div key={arch.name} className="mb-6 last:mb-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-48 h-2 bg-bg-elevated rounded-full overflow-hidden">
                          <div className="h-full bg-accent-gold rounded-full" style={{ width: `${arch.pct}%` }} />
                        </div>
                        <span className="text-body font-semibold text-text-primary">{arch.pct}% {arch.name}</span>
                      </div>
                      <p className="text-caption text-text-tertiary ml-52">({arch.personas} personas, {arch.users} represented users)</p>
                    </div>
                  ))}
                  <div className="mt-6 p-4 rounded-lg bg-bg-elevated border-l-[3px] border-accent-blue italic text-caption text-text-tertiary">
                    Methodology: Each archetype ran through 10,000 Monte Carlo simulations to generate statistically robust confidence intervals.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Executive Summary */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Key Findings</h2>
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
                    <p className="text-caption text-text-tertiary mt-1">±4 leads (95% CI)</p>
                    <p className="text-body font-semibold text-text-secondary mt-3">High-Intent Leads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-[2.25rem] font-bold text-accent-green tracking-tight">+144%</p>
                    <p className="text-caption text-text-tertiary mt-1">Revenue Lift</p>
                    <p className="text-body font-semibold text-text-secondary mt-3">Potential</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-l-4 border-l-accent-gold">
                <CardContent className="py-6">
                  <h3 className="text-h4 text-text-primary font-semibold mb-3">Synthesis</h3>
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
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Creative Performance Ranking</h2>
              <div className="space-y-4">
                {MOCK_ADS.map((ad, i) => (
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
                            <p className="text-h4 font-bold text-accent-gold">{ad.ctr}% ±{ad.ctrCi}%</p>
                          </div>
                          <div className="mt-3 h-2 bg-bg-elevated rounded-full overflow-hidden max-w-xs">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${ad.ctr}%` }} />
                          </div>
                          <p className="text-body-sm text-text-tertiary mt-2">
                            High-Intent: {ad.highIntent} | Trust: {ad.trust}/10 ±{ad.trustCi} | Relevance: {ad.relevance}
                          </p>
                          <p className="text-caption text-text-tertiary mt-1">Sample: {ad.sims.toLocaleString()} simulations</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button size="sm">{ad.actions[0][0]}</Button>
                            <Button variant="secondary" size="sm">{ad.actions[1][0]}</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 4: Strategic Insights */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Data-Backed Insights</h2>
              <div className="space-y-6">
                {MOCK_INSIGHTS.map((insight) => (
                  <Card key={insight.num} className="border-l-4 border-l-accent-gold">
                    <CardContent className="py-6">
                      <p className="text-h4 text-text-primary font-semibold">{insight.num}. {insight.title}</p>
                      <p className="text-body text-text-secondary leading-relaxed mt-3">{insight.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${insight.confidence}%` }} />
                          </div>
                          <span className="text-caption text-text-tertiary">Confidence: {insight.confidence}% (95% CI: {insight.ci[0]}-{insight.ci[1]}%)</span>
                        </div>
                        <span className="text-caption text-text-tertiary">Sample: {insight.sample.toLocaleString()} simulations</span>
                        {insight.effectSize && <span className="text-caption text-text-tertiary">Effect size: Cohen&apos;s d = {insight.effectSize} (Large)</span>}
                      </div>
                      <p className="text-body-sm font-semibold text-accent-gold mt-4">→ Recommendation: {insight.rec}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">{insight.actions[0][0]}</Button>
                        <Button variant="secondary" size="sm">{insight.actions[1][0]}</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 5: Revenue Impact Model */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Projected Revenue Impact</h2>
              <Card className="mb-6">
                <CardContent className="py-6">
                  <h3 className="text-h4 text-text-primary font-semibold mb-4">Model Assumptions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input label="Average Order Value (₹)" type="number" value={String(aov)} onChange={(e) => setAov(Number(e.target.value) || 0)} />
                    <Input label="Lead-to-Sale Rate (%)" type="number" value={String(conversionRate)} onChange={(e) => setConversionRate(Number(e.target.value) || 0)} />
                    <Input label="Cost per Impression (₹)" type="number" value={String(costPerImpression)} onChange={(e) => setCostPerImpression(Number(e.target.value) || 0)} />
                    <Input label="Total Budget (₹)" type="number" value={String(budget)} onChange={(e) => setBudget(Number(e.target.value) || 0)} />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="ghost" size="sm">Reset to Defaults</Button>
                    <Button variant="secondary" size="sm">Save My Assumptions</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardContent className="py-6">
                    <h4 className="text-label text-text-tertiary uppercase tracking-wider mb-4">Current Allocation</h4>
                    <p className="text-[2rem] font-bold text-text-primary">₹{(currentRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-caption text-text-tertiary">±₹0.5L (95% CI) per ₹1L spend</p>
                    <div className="mt-4 space-y-2">
                      {MOCK_ADS.map((ad) => (
                        <p key={ad.id} className="text-body-sm text-text-secondary">{ad.name}: 25%</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-6">
                    <h4 className="text-label text-text-tertiary uppercase tracking-wider mb-4">Recommended Allocation</h4>
                    <p className="text-[2rem] font-bold text-accent-green">₹{(projectedRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-caption text-text-tertiary">±₹1.1L (95% CI) per ₹1L spend</p>
                    <div className="mt-4 space-y-2">
                      {MOCK_ADS.map((ad, i) => {
                        const pct = allocation[ad.id] ?? 25;
                        const diff = pct - 25;
                        return (
                          <p key={ad.id} className="text-body-sm text-text-secondary">{ad.name}: {pct}% ({diff >= 0 ? '+' : ''}{diff}%)</p>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-6">
                <CardContent className="py-6">
                  <h4 className="text-h4 text-text-primary font-semibold mb-4">Budget Allocation</h4>
                  {MOCK_ADS.map((ad) => (
                    <div key={ad.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between mb-2">
                        <span className="text-body text-text-secondary">{ad.name}</span>
                        <span className="text-body font-semibold text-text-primary">{allocation[ad.id] ?? 25}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={allocation[ad.id] ?? 25}
                        onChange={(e) => handleAllocationChange(ad.id, Number(e.target.value))}
                        className="w-full h-1.5 bg-bg-elevated rounded-full appearance-none cursor-pointer accent-accent-gold"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="mb-6">
                <CardContent className="py-6">
                  <h4 className="text-label text-text-tertiary uppercase tracking-wider mb-4">Expected Outcomes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-h3 font-bold text-accent-green">+₹4.2L</p>
                      <p className="text-caption text-text-tertiary">±₹0.8L</p>
                      <p className="text-body-sm text-text-secondary">Revenue Lift</p>
                    </div>
                    <div>
                      <p className="text-h3 font-bold text-accent-green">+18</p>
                      <p className="text-caption text-text-tertiary">±4 leads</p>
                      <p className="text-body-sm text-text-secondary">High-Intent Leads</p>
                    </div>
                    <div>
                      <p className="text-h3 font-bold text-accent-green">-12%</p>
                      <p className="text-caption text-text-tertiary">±3%</p>
                      <p className="text-body-sm text-text-secondary">Cost per Lead</p>
                    </div>
                    <div>
                      <p className="text-h3 font-bold text-accent-green">+144%</p>
                      <p className="text-caption text-text-tertiary">±28%</p>
                      <p className="text-body-sm text-text-secondary">Revenue per Rupee</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button>Apply Recommended Allocation</Button>
                    <Button variant="secondary" rightIcon={<Download className="w-4 h-4" />}>Download Financial Model</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 6: Recommended Action Plan */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Prioritized Next Steps</h2>
              <div className="space-y-4">
                {(['immediate', 'short-term', 'long-term'] as const).map((priority) => {
                  const items = MOCK_ACTION_PLAN.filter((a) => a.priority === priority);
                  if (items.length === 0) return null;
                  return (
                    <div key={priority}>
                      <h3 className="text-h4 text-text-primary font-semibold mb-3 uppercase">{priority.replace('-', ' ')}</h3>
                      {items.map((item) => (
                        <Card key={item.num} className="mb-4 border-l-4 border-l-accent-gold">
                          <CardContent className="py-5">
                            <p className="text-h4 text-text-primary font-semibold">{item.num}. {item.title}</p>
                            <p className="text-body-sm text-text-secondary mt-1">Expected Impact: {item.impact}</p>
                            <p className="text-caption text-text-tertiary mt-1">Effort: {item.effort} · Risk: {item.risk}</p>
                            {item.aiNote && (
                              <p className="text-caption text-text-tertiary mt-2 italic">AI will auto-translate copy and generate preview. You can review and edit before publishing.</p>
                            )}
                            <div className="flex gap-2 mt-4">
                              <Button size="sm">{item.actions[0][0]}</Button>
                              <Button variant="secondary" size="sm">{item.actions[1][0]}</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 7: Risk Assessment */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Simulation Quality Report</h2>
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
                  <h3 className="text-h4 text-text-primary font-semibold mb-4">Validation Checks Performed</h3>
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
                  <h3 className="text-h4 text-text-primary font-semibold mb-4">Flagged Reactions (Removed from Analysis)</h3>
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
              <p className="text-caption text-text-tertiary mt-6">
                Statistical Rigor: All insights include 95% confidence intervals and effect sizes. Minimum 10,000 simulations per archetype. P-values reported for all correlations.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <div className="space-y-10">
            {/* Persona Matrix */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Reaction Matrix</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <input type="radio" id="arch" name="view" defaultChecked className="accent-accent-gold" />
                  <label htmlFor="arch" className="text-body-sm text-text-secondary">Archetypes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="ind" name="view" className="accent-accent-gold" />
                  <label htmlFor="ind" className="text-body-sm text-text-secondary">Individual Personas</label>
                </div>
                <select className="bg-bg-input border border-border-subtle rounded px-3 py-2 text-body-sm text-text-primary">
                  <option>All Segments</option>
                </select>
                <select className="bg-bg-input border border-border-subtle rounded px-3 py-2 text-body-sm text-text-primary">
                  <option>All Ads</option>
                </select>
              </div>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-subtle">
                        <th className="text-left py-4 px-4 text-label text-text-tertiary">Archetype</th>
                        <th className="text-center py-4 px-4 text-label text-text-tertiary">Ad #1</th>
                        <th className="text-center py-4 px-4 text-label text-text-tertiary">Ad #2</th>
                        <th className="text-center py-4 px-4 text-label text-text-tertiary">Ad #3</th>
                        <th className="text-center py-4 px-4 text-label text-text-tertiary">Ad #4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_MATRIX.map((row) => (
                        <tr key={row.archetype} className="border-b border-border-subtle">
                          <td className="py-4 px-4">
                            <button
                              onClick={() => setExpandedArchetype(expandedArchetype === row.archetype ? null : row.archetype)}
                              className="flex items-center gap-2 text-body font-medium text-text-primary hover:text-accent-gold"
                            >
                              {expandedArchetype === row.archetype ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                              {row.archetype} ({row.personas} personas)
                            </button>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block w-4 h-4 rounded-full ${row.ad1 === 'high' ? 'bg-accent-green' : row.ad1 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} title={row.ad1} />
                            <p className="text-caption text-text-tertiary mt-1">{row.cr1}%</p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block w-4 h-4 rounded-full ${row.ad2 === 'high' ? 'bg-accent-green' : row.ad2 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-caption text-text-tertiary mt-1">{row.cr2}%</p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block w-4 h-4 rounded-full ${row.ad3 === 'high' ? 'bg-accent-green' : row.ad3 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-caption text-text-tertiary mt-1">{row.cr3}%</p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block w-4 h-4 rounded-full ${row.ad4 === 'high' ? 'bg-accent-green' : row.ad4 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-caption text-text-tertiary mt-1">{row.cr4}%</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CardContent className="border-t border-border-subtle">
                  <p className="text-caption text-text-tertiary mb-2">Legend: Green = Clicked + High Intent · Gold = Clicked + Mixed · Gray = Did Not Click</p>
                  <p className="text-caption text-text-tertiary">Quick Insights: Trust-Driven Professionals show 5x engagement vs Rural · Ad #1 has highest cross-archetype performance (58% avg)</p>
                </CardContent>
              </Card>
            </section>

            {/* Ad-by-Ad Breakdown */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Ad-Level Persona Reactions</h2>
              {MOCK_ADS.map((ad) => (
                <Card key={ad.id} className="mb-4">
                  <button
                    onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {expandedAd === ad.id ? <ChevronDown className="w-5 h-5 text-text-tertiary" /> : <ChevronRight className="w-5 h-5 text-text-tertiary" />}
                      <span className="text-h4 font-semibold text-text-primary">{ad.name}: &quot;{ad.desc}&quot;</span>
                    </div>
                    <span className="text-body-sm text-text-tertiary">Performance: {ad.ctr}% ±{ad.ctrCi}% | Trust: {ad.trust}/10 ±{ad.trustCi}</span>
                  </button>
                  {expandedAd === ad.id && (
                    <CardContent className="pt-0 px-6 pb-6 border-t border-border-subtle">
                      <p className="text-caption text-text-tertiary mb-4">Sample: {ad.sims.toLocaleString()} simulations across {ad.highIntent > 4 ? 7 : 6} personas</p>
                      <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
                        <p className="text-body font-semibold text-text-primary">Persona 1: Manager, Import & Export</p>
                        <p className="text-caption text-text-tertiary mt-1">25F · Chandigarh · Hindi · ₹75K/month · High digital</p>
                        <p className="text-body-sm text-accent-green mt-2">Decision: Clicked (High Intent)</p>
                        <p className="text-body-sm text-text-secondary mt-1">Trust: 8/10 ±0.4 | Relevance: 7/10 ±0.5</p>
                        <p className="text-body-sm text-text-secondary mt-3 italic">&quot;The ad immediately caught my attention because it&apos;s in Hindi, which feels more trustworthy. The certification badge gives me confidence this is legitimate.&quot;</p>
                        <p className="text-caption text-text-tertiary mt-2">Key Triggers: Local language (Hindi) · Trust signals (certification) · Relevant pain point addressed</p>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-4">Show 6 more personas</Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </section>

            {/* Export Options */}
            <section>
              <h2 className="text-label text-text-tertiary uppercase tracking-wider mb-6">Export Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover className="cursor-pointer">
                  <CardContent className="py-8 text-center">
                    <Download className="w-12 h-12 mx-auto text-accent-gold mb-4" />
                    <p className="text-h4 font-semibold text-text-primary">Full Dataset</p>
                    <p className="text-caption text-text-tertiary mt-2">All reactions, personas, ads (CSV, 2.4MB)</p>
                    <Button size="sm" className="mt-4">Download</Button>
                  </CardContent>
                </Card>
                <Card hover className="cursor-pointer">
                  <CardContent className="py-8 text-center">
                    <FileText className="w-12 h-12 mx-auto text-accent-gold mb-4" />
                    <p className="text-h4 font-semibold text-text-primary">Financial Model</p>
                    <p className="text-caption text-text-tertiary mt-2">Revenue calc with formulas (XLSX)</p>
                    <Button size="sm" className="mt-4">Download</Button>
                  </CardContent>
                </Card>
                <Card hover className="cursor-pointer">
                  <CardContent className="py-8 text-center">
                    <ExternalLink className="w-12 h-12 mx-auto text-accent-gold mb-4" />
                    <p className="text-h4 font-semibold text-text-primary">Presentation Deck</p>
                    <p className="text-caption text-text-tertiary mt-2">Executive summary slides (PPTX)</p>
                    <Button size="sm" className="mt-4">Download</Button>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6">
                <CardContent className="py-6">
                  <h3 className="text-h4 font-semibold text-text-primary mb-2">API Access</h3>
                  <p className="text-body-sm text-text-secondary">GET /api/v1/simulations/&#123;id&#125;/results — Returns JSON with full simulation data</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="secondary" size="sm">View API Docs</Button>
                    <Button variant="ghost" size="sm">Generate API Key</Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
