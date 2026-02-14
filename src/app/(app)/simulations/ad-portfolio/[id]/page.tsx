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
  TrendingUp,
  Users,
  MapPin,
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
  { 
    id: 'ad_1', 
    name: 'Ad #1', 
    desc: 'Trust Signals + Local Language', 
    ctr: 71.4, 
    ctrCi: 4.2, 
    clicks: 5, 
    highIntent: 5, 
    trust: 7.4, 
    trustCi: 0.6, 
    relevance: 6.9, 
    sims: 70000, 
    rec: 'scale' as const, 
    actions: [['Scale Budget +15%', 'scale'], ['View Segment Breakdown', 'view']],
    performance: {
      impressions: 98000,
      clicks: 69972,
      conversions: 3498,
      conversionRate: 5.0,
      costPerClick: 8.5,
      costPerConversion: 170,
      roas: 8.8,
      topSegments: ['Trust-Driven Professionals (68% CTR)', 'Pragmatic Mid-Tier (45% CTR)']
    },
    targeting: {
      demographics: {
        age: '30-55',
        gender: 'All',
        locations: ['India - Hindi speaking regions', 'India - Marathi speaking regions'],
        languages: ['Hindi', 'Marathi', 'English']
      },
      interests: ['Export/Import Business', 'Small Business Management', 'Financial Services', 'Trade & Commerce'],
      behaviors: ['Small Business Owners', 'Frequent International Travelers', 'Online Banking Users'],
      customAudiences: ['High Trust Personas', 'Local Language Preferrers'],
      budgetRecommendation: '+15% (₹15,000 additional per ₹1L spend)',
      expectedLift: '+12% conversions, +18% high-intent leads'
    }
  },
  { 
    id: 'ad_2', 
    name: 'Ad #2', 
    desc: 'Standard Professional Layout', 
    ctr: 60, 
    ctrCi: 3.8, 
    clicks: 6, 
    highIntent: 6, 
    trust: 4.2, 
    trustCi: 0.7, 
    relevance: 6.3, 
    sims: 100000, 
    rec: 'maintain' as const, 
    actions: [['Maintain Budget', 'maintain'], ['Optimize Trust Signals', 'optimize']],
    performance: {
      impressions: 100000,
      clicks: 60000,
      conversions: 3600,
      conversionRate: 6.0,
      costPerClick: 8.3,
      costPerConversion: 138,
      roas: 7.2,
      topSegments: ['Trust-Driven Professionals (70% CTR)', 'Pragmatic Mid-Tier (38% CTR)']
    },
    targeting: {
      demographics: {
        age: '28-50',
        gender: 'All',
        locations: ['India - All regions'],
        languages: ['English', 'Hindi']
      },
      interests: ['Business & Finance', 'Professional Services', 'Management'],
      behaviors: ['Business Decision Makers', 'Professional Network Users'],
      customAudiences: ['Professional Personas'],
      budgetRecommendation: 'Maintain current (₹25,000 per ₹1L spend)',
      expectedLift: 'Stable performance, optimize trust signals for +8% improvement'
    }
  },
  { 
    id: 'ad_3', 
    name: 'Ad #3', 
    desc: 'Minimal Creative', 
    ctr: 50, 
    ctrCi: 4.1, 
    clicks: 5, 
    highIntent: 4, 
    trust: 4.6, 
    trustCi: 0.7, 
    relevance: 5.8, 
    sims: 100000, 
    rec: 'optimize' as const, 
    actions: [['Optimize Creative', 'optimize'], ['View Details', 'view']],
    performance: {
      impressions: 100000,
      clicks: 50000,
      conversions: 2000,
      conversionRate: 4.0,
      costPerClick: 8.0,
      costPerConversion: 200,
      roas: 5.0,
      topSegments: ['Pragmatic Mid-Tier (35% CTR)']
    },
    targeting: {
      demographics: {
        age: '25-45',
        gender: 'All',
        locations: ['India - Urban areas'],
        languages: ['English']
      },
      interests: ['Business', 'Finance', 'Technology'],
      behaviors: ['Online Shoppers', 'Mobile App Users'],
      customAudiences: ['Tech-Savvy Personas'],
      budgetRecommendation: '-10% (Reduce to ₹22,500 per ₹1L spend)',
      expectedLift: 'Optimize creative for +15% CTR potential'
    }
  },
  { 
    id: 'ad_4', 
    name: 'Ad #4', 
    desc: 'Promotional Focus', 
    ctr: 50, 
    ctrCi: 4.0, 
    clicks: 5, 
    highIntent: 4, 
    trust: 4.4, 
    trustCi: 0.7, 
    relevance: 5.7, 
    sims: 100000, 
    rec: 'replace' as const, 
    actions: [['Review Messaging', 'review'], ['View Details', 'view']],
    performance: {
      impressions: 100000,
      clicks: 50000,
      conversions: 1800,
      conversionRate: 3.6,
      costPerClick: 8.0,
      costPerConversion: 222,
      roas: 4.5,
      topSegments: ['Pragmatic Mid-Tier (32% CTR)']
    },
    targeting: {
      demographics: {
        age: '25-40',
        gender: 'All',
        locations: ['India - All regions'],
        languages: ['English', 'Hindi']
      },
      interests: ['Deals & Offers', 'Shopping', 'Business'],
      behaviors: ['Price-Conscious Shoppers', 'Deal Seekers'],
      customAudiences: ['Price-Sensitive Personas'],
      budgetRecommendation: '-20% (Reduce to ₹20,000 per ₹1L spend) or Replace',
      expectedLift: 'Replace with trust-focused variant for +25% improvement'
    }
  },
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
  const [expandedActionItems, setExpandedActionItems] = useState<string | null>(null);

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

      <div className="max-w-[1600px] mx-auto pb-24">
        {/* Tab Navigation */}
        <div className="border-b-2 border-border-subtle mb-16">
          <div className="flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-10 py-5 text-h4 font-semibold border-b-[3px] transition-colors
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
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Simulation Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[1.875rem] font-bold text-text-primary tracking-tight leading-none mb-2">{MOCK_META.archetypeCount}</p>
                    <p className="text-h4 font-semibold text-text-primary mb-3">Archetypes</p>
                    <p className="text-body text-text-tertiary max-w-[200px] mx-auto leading-relaxed">Each represents ~100K real users</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[1.875rem] font-bold text-text-primary tracking-tight leading-none mb-2">{MOCK_META.adCount}</p>
                    <p className="text-h4 font-semibold text-text-primary mb-3">Creatives</p>
                    <p className="text-body text-text-tertiary max-w-[200px] mx-auto leading-relaxed">Tested across all segments</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="py-8">
                    <p className="text-[1.875rem] font-bold text-text-primary tracking-tight leading-none mb-2">10,000</p>
                    <p className="text-h4 font-semibold text-text-primary mb-3">Runs</p>
                    <p className="text-body text-text-tertiary max-w-[200px] mx-auto leading-relaxed">Per persona combination</p>
                  </CardContent>
                </Card>
              </div>
              <h2 className="text-h1 text-text-primary font-bold mb-10 mt-20 tracking-tight">Target Group</h2>
              <Card className="mb-8">
                <CardContent className="py-8">
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-body font-semibold text-text-secondary mb-1">Target Audience</p>
                      <p className="text-body-lg text-text-primary">Exporters, Freelancers & SMEs</p>
                    </div>
                    <div>
                      <p className="text-body font-semibold text-text-secondary mb-1">Geography</p>
                      <p className="text-body-lg text-text-primary">India (Multi-region, Multi-language)</p>
                    </div>
                    <div>
                      <p className="text-body font-semibold text-text-secondary mb-1">Confidence Level</p>
                      <p className="text-body-lg text-text-primary">95% (p &lt; 0.05)</p>
                    </div>
                  </div>
                  <div className="border-t border-border-subtle pt-6">
                    <h3 className="text-h2 text-text-primary font-semibold mb-6">Persona Archetype Distribution</h3>
                  {MOCK_ARCHETYPES.map((arch) => (
                    <div key={arch.name} className="mb-6 last:mb-0">
                        <div className="flex items-center gap-6 mb-3">
                          <div className="w-64 h-3 bg-bg-elevated rounded-full overflow-hidden">
                          <div className="h-full bg-accent-gold rounded-full" style={{ width: `${arch.pct}%` }} />
                          </div>
                          <span className="text-h4 font-semibold text-text-primary">{arch.pct}% {arch.name}</span>
                        </div>
                        <p className="text-body text-text-tertiary ml-[280px]">({arch.personas} personas, {arch.users} represented users)</p>
                      </div>
                    ))}
                    </div>
                  <div className="mt-6 p-6 rounded-lg bg-bg-elevated border-l-[4px] border-accent-blue italic text-body text-text-tertiary leading-relaxed">
                    Methodology: Each archetype ran through 10,000 Monte Carlo simulations to generate statistically robust confidence intervals.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Executive Summary */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Key Findings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[2rem] font-bold text-text-primary tracking-tight leading-none">58%</p>
                    <p className="text-body text-text-tertiary mt-2">±3.2% (95% CI)</p>
                    <p className="text-h4 font-semibold text-text-secondary mt-4">Average CTR</p>
                    <p className="text-body text-text-tertiary mt-2">vs 2.1% industry</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[2rem] font-bold text-text-primary tracking-tight leading-none">22</p>
                    <p className="text-body text-text-tertiary mt-2">±4 leads (95% CI)</p>
                    <p className="text-h4 font-semibold text-text-secondary mt-4">High-Intent Leads</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[2rem] font-bold text-accent-green tracking-tight leading-none">+144%</p>
                    <p className="text-body text-text-tertiary mt-2">Revenue Lift</p>
                    <p className="text-h4 font-semibold text-text-secondary mt-4">Potential</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-l-4 border-l-accent-gold">
                <CardContent className="py-8">
                  <h3 className="text-h2 text-text-primary font-semibold mb-6">Synthesis</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed text-[1.125rem]">
                    Your portfolio demonstrates exceptional performance among high-income export managers (68% CTR ±4.1%) but reveals significant trust barriers with rural segments (33% CTR ±5.8%). Ad #1 outperforms by 43% through trust signals and localized language.
                  </p>
                  <p className="text-body-lg text-text-secondary mt-6 leading-relaxed">
                    Primary opportunity: Reallocating 15% of budget from underperforming ads to Ad #1 projects +₹4.2L ±₹0.8L incremental revenue per ₹1L spend.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Performance Hierarchy */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Creative Performance Ranking</h2>
              <div className="space-y-6">
                {MOCK_ADS.map((ad, i) => (
                  <Card key={ad.id} className="border border-border-subtle">
                    <CardContent className="py-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-h2 shrink-0 ${i === 0 ? 'bg-accent-gold/20 text-accent-gold' : 'bg-bg-elevated text-text-primary'}`}>
                          #{i + 1}
                        </div>
                        <div className="w-24 h-24 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0">
                          <ImageIcon className="w-12 h-12 text-text-tertiary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="text-h2 text-text-primary font-semibold mb-1">{ad.name}</p>
                              <p className="text-body-lg text-text-tertiary">&quot;{ad.desc}&quot;</p>
                            </div>
                            <p className="text-h2 font-bold text-accent-gold">{ad.ctr}% <span className="text-body-lg text-text-tertiary">±{ad.ctrCi}%</span></p>
                          </div>
                          <div className="mt-4 h-3 bg-bg-elevated rounded-full overflow-hidden max-w-md">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${ad.ctr}%` }} />
                          </div>
                          <p className="text-body text-text-tertiary mt-4">
                            High-Intent: {ad.highIntent} | Trust: {ad.trust}/10 ±{ad.trustCi} | Relevance: {ad.relevance}
                          </p>
                          <p className="text-body-sm text-text-tertiary mt-2">Sample: {ad.sims.toLocaleString()} simulations</p>
                          
                          {/* Performance Metrics */}
                          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-elevated rounded-lg">
                            <div>
                              <p className="text-caption text-text-tertiary mb-1">Impressions</p>
                              <p className="text-body font-semibold text-text-primary">{ad.performance.impressions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-caption text-text-tertiary mb-1">Clicks</p>
                              <p className="text-body font-semibold text-text-primary">{ad.performance.clicks.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-caption text-text-tertiary mb-1">Conversions</p>
                              <p className="text-body font-semibold text-accent-green">{ad.performance.conversions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-caption text-text-tertiary mb-1">ROAS</p>
                              <p className="text-body font-semibold text-accent-gold">{ad.performance.roas}x</p>
                            </div>
                          </div>

                          {/* Target Persona Breakdown Dropdown */}
                          <div className="mt-6 border-t border-border-subtle pt-6">
                            <button
                              onClick={() => setExpandedActionItems(expandedActionItems === ad.id ? null : ad.id)}
                              className="w-full flex items-center justify-between text-left"
                            >
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-accent-gold" />
                                <span className="text-h4 font-semibold text-text-primary">Target Persona Breakdown</span>
                              </div>
                              {expandedActionItems === ad.id ? (
                                <ChevronDown className="w-5 h-5 text-text-tertiary" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-text-tertiary" />
                              )}
                            </button>

                            {expandedActionItems === ad.id && (
                              <div className="mt-6 space-y-6">
                                {/* Targeting Recommendations */}
                                <div>
                                  <h4 className="text-h3 font-semibold text-text-primary mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-accent-blue" />
                                    Targeting Recommendations
                                  </h4>
                                  <div className="space-y-4">
                                    <div className="p-4 bg-bg-elevated rounded-lg">
                                      <p className="text-body font-semibold text-text-secondary mb-2">Demographics</p>
                                      <div className="space-y-1 text-body text-text-tertiary">
                                        <p><span className="font-medium text-text-primary">Age:</span> {ad.targeting.demographics.age}</p>
                                        <p><span className="font-medium text-text-primary">Gender:</span> {ad.targeting.demographics.gender}</p>
                                        <p className="flex items-start gap-2">
                                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" />
                                          <span><span className="font-medium text-text-primary">Locations:</span> {ad.targeting.demographics.locations.join(', ')}</span>
                                        </p>
                                        <p><span className="font-medium text-text-primary">Languages:</span> {ad.targeting.demographics.languages.join(', ')}</p>
                                      </div>
                                    </div>
                                    <div className="p-4 bg-bg-elevated rounded-lg">
                                      <p className="text-body font-semibold text-text-secondary mb-2">Interests</p>
                                      <div className="flex flex-wrap gap-2">
                                        {ad.targeting.interests.map((interest, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-accent-blue-bg text-accent-blue rounded-md text-body-sm">
                                            {interest}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="p-4 bg-bg-elevated rounded-lg">
                                      <p className="text-body font-semibold text-text-secondary mb-2">Behaviors</p>
                                      <div className="flex flex-wrap gap-2">
                                        {ad.targeting.behaviors.map((behavior, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-accent-purple-bg text-accent-purple rounded-md text-body-sm">
                                            {behavior}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="p-4 bg-bg-elevated rounded-lg">
                                      <p className="text-body font-semibold text-text-secondary mb-2">Custom Audiences</p>
                                      <div className="flex flex-wrap gap-2">
                                        {ad.targeting.customAudiences.map((audience, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-accent-green-bg text-accent-green rounded-md text-body-sm">
                                            {audience}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>


                                {/* Top Performing Segments */}
                                <div>
                                  <h4 className="text-h3 font-semibold text-text-primary mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-accent-green" />
                                    Top Performing Segments
                                  </h4>
                                  <div className="space-y-2">
                                    {ad.performance.topSegments.map((segment, idx) => (
                                      <div key={idx} className="p-3 bg-bg-elevated rounded-lg">
                                        <p className="text-body text-text-primary">{segment}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Budget Recommendation (Outcome, not action) */}
                          <div className="mt-6 p-4 bg-accent-gold/10 border-l-4 border-accent-gold rounded-lg">
                            <p className="text-body font-semibold text-text-secondary mb-1">Budget Recommendation</p>
                            <p className="text-h4 font-bold text-accent-gold">{ad.targeting.budgetRecommendation}</p>
                            <p className="text-body text-text-tertiary mt-2">{ad.targeting.expectedLift}</p>
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
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Data-Backed Insights</h2>
              <div className="space-y-8">
                {MOCK_INSIGHTS.map((insight) => (
                  <Card key={insight.num} className="border-l-4 border-l-accent-gold">
                    <CardContent className="py-8">
                      <p className="text-h2 text-text-primary font-semibold mb-4">{insight.num}. {insight.title}</p>
                      <p className="text-body-lg text-text-secondary leading-relaxed mt-4">{insight.description}</p>
                      <div className="flex flex-wrap items-center gap-6 mt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-bg-elevated rounded-full overflow-hidden">
                            <div className="h-full bg-accent-gold rounded-full" style={{ width: `${insight.confidence}%` }} />
                          </div>
                          <span className="text-body text-text-tertiary">Confidence: {insight.confidence}% (95% CI: {insight.ci[0]}-{insight.ci[1]}%)</span>
                        </div>
                        <span className="text-body text-text-tertiary">Sample: {insight.sample.toLocaleString()} simulations</span>
                        {insight.effectSize && <span className="text-body text-text-tertiary">Effect size: Cohen&apos;s d = {insight.effectSize} (Large)</span>}
                      </div>
                      <p className="text-body-lg font-semibold text-accent-gold mt-6">→ Recommendation: {insight.rec}</p>
                      <div className="flex gap-3 mt-6">
                        <Button size="md">{insight.actions[0][0]}</Button>
                        <Button variant="secondary" size="md">{insight.actions[1][0]}</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 5: Revenue Impact Model */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Projected Revenue Impact</h2>
              <Card className="mb-8">
                <CardContent className="py-8">
                  <h3 className="text-h2 text-text-primary font-semibold mb-6">Model Assumptions</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="py-8">
                    <h4 className="text-h3 text-text-primary font-semibold mb-6">Current Allocation</h4>
                    <p className="text-[2rem] font-bold text-text-primary leading-none">₹{(currentRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-body text-text-tertiary mt-2">±₹0.5L (95% CI) per ₹1L spend</p>
                    <div className="mt-6 space-y-3">
                      {MOCK_ADS.map((ad) => (
                        <p key={ad.id} className="text-body-lg text-text-secondary">{ad.name}: 25%</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-8">
                    <h4 className="text-h3 text-text-primary font-semibold mb-6">Recommended Allocation</h4>
                    <p className="text-[2rem] font-bold text-accent-green leading-none">₹{(projectedRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-body text-text-tertiary mt-2">±₹1.1L (95% CI) per ₹1L spend</p>
                    <div className="mt-6 space-y-3">
                      {MOCK_ADS.map((ad, i) => {
                        const pct = allocation[ad.id] ?? 25;
                        const diff = pct - 25;
                        return (
                          <p key={ad.id} className="text-body-lg text-text-secondary">{ad.name}: {pct}% ({diff >= 0 ? '+' : ''}{diff}%)</p>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-8">
                <CardContent className="py-8">
                  <h4 className="text-h2 text-text-primary font-semibold mb-6">Budget Allocation</h4>
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
              <Card className="mb-8">
                <CardContent className="py-8">
                  <h4 className="text-h2 text-text-primary font-semibold mb-8">Expected Outcomes</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[1.875rem] font-bold text-accent-green leading-none">+₹4.2L</p>
                      <p className="text-body text-text-tertiary mt-2">±₹0.8L</p>
                      <p className="text-body-lg text-text-secondary mt-4">Revenue Lift</p>
                    </div>
                    <div>
                      <p className="text-[1.875rem] font-bold text-accent-green leading-none">+18</p>
                      <p className="text-body text-text-tertiary mt-2">±4 leads</p>
                      <p className="text-body-lg text-text-secondary mt-4">High-Intent Leads</p>
                    </div>
                    <div>
                      <p className="text-[1.875rem] font-bold text-accent-green leading-none">-12%</p>
                      <p className="text-body text-text-tertiary mt-2">±3%</p>
                      <p className="text-body-lg text-text-secondary mt-4">Cost per Lead</p>
                    </div>
                    <div>
                      <p className="text-[1.875rem] font-bold text-accent-green leading-none">+144%</p>
                      <p className="text-body text-text-tertiary mt-2">±28%</p>
                      <p className="text-body-lg text-text-secondary mt-4">Revenue per Rupee</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button size="lg">Apply Recommended Allocation</Button>
                    <Button variant="secondary" size="lg" rightIcon={<Download className="w-5 h-5" />}>Download Financial Model</Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 6: Recommended Action Plan */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Prioritized Next Steps</h2>
              <div className="space-y-8">
                {(['immediate', 'short-term', 'long-term'] as const).map((priority) => {
                  const items = MOCK_ACTION_PLAN.filter((a) => a.priority === priority);
                  if (items.length === 0) return null;
                  return (
                    <div key={priority}>
                      <h3 className="text-h2 text-text-primary font-semibold mb-6 uppercase">{priority.replace('-', ' ')}</h3>
                      {items.map((item) => (
                        <Card key={item.num} className="mb-6 border-l-4 border-l-accent-gold">
                          <CardContent className="py-6">
                            <p className="text-h3 text-text-primary font-semibold mb-3">{item.num}. {item.title}</p>
                            <p className="text-body-lg text-text-secondary mt-2">Expected Impact: {item.impact}</p>
                            <p className="text-body text-text-tertiary mt-2">Effort: {item.effort} · Risk: {item.risk}</p>
                            {item.aiNote && (
                              <p className="text-body text-text-tertiary mt-3 italic">AI will auto-translate copy and generate preview. You can review and edit before publishing.</p>
                            )}
                            <div className="flex gap-3 mt-6">
                              <Button size="md">{item.actions[0][0]}</Button>
                              <Button variant="secondary" size="md">{item.actions[1][0]}</Button>
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
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Simulation Quality Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[2rem] font-bold text-text-primary leading-none">92.5</p>
                    <p className="text-h4 font-semibold text-text-secondary mt-3">Quality Score (Excellent)</p>
                    <p className="text-body text-text-tertiary mt-2">95% CI: 90.2–94.8</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-[2rem] font-bold text-accent-green leading-none">37/40</p>
                    <p className="text-h4 font-semibold text-text-secondary mt-3">Valid Reactions</p>
                    <p className="text-body text-text-tertiary mt-2">3 flagged & removed · Flagged rate: 7.5%</p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-8">
                <CardContent className="py-8">
                  <h3 className="text-h2 text-text-primary font-semibold mb-6">Validation Checks Performed</h3>
                  <ul className="space-y-3">
                    {VALIDATION_CHECKS.map((check, i) => (
                      <li key={i} className="flex items-center gap-3 text-body-lg text-text-secondary">
                        <span className="text-accent-green text-xl">✓</span> {check}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-8">
                  <h3 className="text-h2 text-text-primary font-semibold mb-6">Flagged Reactions (Removed from Analysis)</h3>
                  <p className="text-body-lg text-text-secondary leading-relaxed">
                    3 reactions showed unrealistic trust (&gt;8/10) with high-vulnerability personas (scam indicators: Yes).
                  </p>
                  <p className="text-body text-text-tertiary mt-4 leading-relaxed">
                    These reactions were automatically excluded to maintain result accuracy and prevent false positives.
                  </p>
                  <div className="flex gap-3 mt-6">
                    <Button variant="ghost" size="md">View Flagged Details</Button>
                    <Button variant="ghost" size="md">Download Validation Report</Button>
                  </div>
                </CardContent>
              </Card>
              <p className="text-body text-text-tertiary mt-8 leading-relaxed">
                Statistical Rigor: All insights include 95% confidence intervals and effect sizes. Minimum 10,000 simulations per archetype. P-values reported for all correlations.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'deep-dive' && (
          <div className="space-y-16">
            {/* Persona Matrix */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Reaction Matrix</h2>
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
                      <tr className="border-b-2 border-border-subtle">
                        <th className="text-left py-6 px-6 text-h4 text-text-primary font-semibold">Archetype</th>
                        <th className="text-center py-6 px-6 text-h4 text-text-primary font-semibold">Ad #1</th>
                        <th className="text-center py-6 px-6 text-h4 text-text-primary font-semibold">Ad #2</th>
                        <th className="text-center py-6 px-6 text-h4 text-text-primary font-semibold">Ad #3</th>
                        <th className="text-center py-6 px-6 text-h4 text-text-primary font-semibold">Ad #4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_MATRIX.map((row) => (
                        <tr key={row.archetype} className="border-b border-border-subtle">
                          <td className="py-5 px-6">
                            <button
                              onClick={() => setExpandedArchetype(expandedArchetype === row.archetype ? null : row.archetype)}
                              className="flex items-center gap-3 text-body-lg font-medium text-text-primary hover:text-accent-gold"
                            >
                              {expandedArchetype === row.archetype ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                              {row.archetype} ({row.personas} personas)
                            </button>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-block w-5 h-5 rounded-full ${row.ad1 === 'high' ? 'bg-accent-green' : row.ad1 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} title={row.ad1} />
                            <p className="text-body text-text-tertiary mt-2">{row.cr1}%</p>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-block w-5 h-5 rounded-full ${row.ad2 === 'high' ? 'bg-accent-green' : row.ad2 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-body text-text-tertiary mt-2">{row.cr2}%</p>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-block w-5 h-5 rounded-full ${row.ad3 === 'high' ? 'bg-accent-green' : row.ad3 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-body text-text-tertiary mt-2">{row.cr3}%</p>
                          </td>
                          <td className="py-5 px-6 text-center">
                            <span className={`inline-block w-5 h-5 rounded-full ${row.ad4 === 'high' ? 'bg-accent-green' : row.ad4 === 'mid' ? 'bg-accent-gold' : 'bg-border-medium'}`} />
                            <p className="text-body text-text-tertiary mt-2">{row.cr4}%</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CardContent className="border-t border-border-subtle py-6 px-6">
                  <p className="text-body text-text-tertiary mb-3">Legend: Green = Clicked + High Intent · Gold = Clicked + Mixed · Gray = Did Not Click</p>
                  <p className="text-body text-text-tertiary">Quick Insights: Trust-Driven Professionals show 5x engagement vs Rural · Ad #1 has highest cross-archetype performance (58% avg)</p>
                </CardContent>
              </Card>
            </section>

            {/* Ad-by-Ad Breakdown */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Ad-Level Persona Reactions</h2>
              {MOCK_ADS.map((ad) => (
                <Card key={ad.id} className="mb-6">
                  <button
                    onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
                    className="w-full py-6 px-8 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      {expandedAd === ad.id ? <ChevronDown className="w-6 h-6 text-text-tertiary" /> : <ChevronRight className="w-6 h-6 text-text-tertiary" />}
                      <span className="text-h3 font-semibold text-text-primary">{ad.name}: &quot;{ad.desc}&quot;</span>
                    </div>
                    <span className="text-body-lg text-text-tertiary">Performance: {ad.ctr}% ±{ad.ctrCi}% | Trust: {ad.trust}/10 ±{ad.trustCi}</span>
                  </button>
                  {expandedAd === ad.id && (
                    <CardContent className="pt-0 px-8 pb-8 border-t border-border-subtle">
                      <p className="text-body text-text-tertiary mb-6">Sample: {ad.sims.toLocaleString()} simulations across {ad.highIntent > 4 ? 7 : 6} personas</p>
                      <div className="p-6 rounded-lg bg-bg-elevated border border-border-subtle">
                        <p className="text-h4 font-semibold text-text-primary mb-2">Persona 1: Manager, Import & Export</p>
                        <p className="text-body text-text-tertiary mt-2">25F · Chandigarh · Hindi · ₹75K/month · High digital</p>
                        <p className="text-body-lg text-accent-green mt-4 font-semibold">Decision: Clicked (High Intent)</p>
                        <p className="text-body text-text-secondary mt-2">Trust: 8/10 ±0.4 | Relevance: 7/10 ±0.5</p>
                        <p className="text-body-lg text-text-secondary mt-4 italic leading-relaxed">&quot;The ad immediately caught my attention because it&apos;s in Hindi, which feels more trustworthy. The certification badge gives me confidence this is legitimate.&quot;</p>
                        <p className="text-body text-text-tertiary mt-4">Key Triggers: Local language (Hindi) · Trust signals (certification) · Relevant pain point addressed</p>
                      </div>
                      <Button variant="ghost" size="md" className="mt-6">Show 6 more personas</Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </section>

            {/* Export Options */}
            <section>
              <h2 className="text-h1 text-text-primary font-bold mb-10 tracking-tight">Export Options</h2>
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
