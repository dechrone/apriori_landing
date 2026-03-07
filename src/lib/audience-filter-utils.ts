import type {
  AdvancedFilters,
  FilterCategory,
  DemographicsFilter,
  LocationFilter,
  IncomeFilter,
  BehaviourFilter,
  PsychographicsFilter,
  DigitalFilter,
} from "@/types/audience-filters";

/** Count total active filter values across all categories */
export function countActiveFilters(filters: AdvancedFilters | null): number {
  if (!filters) return 0;
  let count = 0;
  if (filters.demographics) count += countDemographics(filters.demographics);
  if (filters.location) count += countLocation(filters.location);
  if (filters.income) count += countIncome(filters.income);
  if (filters.behaviour) count += countBehaviour(filters.behaviour);
  if (filters.psychographics) count += countPsychographics(filters.psychographics);
  if (filters.digital) count += countDigital(filters.digital);
  return count;
}

function countDemographics(d: DemographicsFilter): number {
  let c = 0;
  if (d.ageMin !== undefined || d.ageMax !== undefined) c++;
  if (d.gender) c++;
  if (d.education?.length) c += d.education.length;
  if (d.occupation?.length) c += d.occupation.length;
  if (d.maritalStatus?.length) c += d.maritalStatus.length;
  return c;
}

function countLocation(l: LocationFilter): number {
  let c = 0;
  if (l.cityTiers?.length) c += l.cityTiers.length;
  if (l.states?.length) c += l.states.length;
  if (l.cities?.length) c += l.cities.length;
  return c;
}

function countIncome(i: IncomeFilter): number {
  let c = 0;
  if (i.monthlyMin !== undefined || i.monthlyMax !== undefined) c++;
  if (i.annualMin !== undefined || i.annualMax !== undefined) c++;
  if (i.incomeBracket) c++;
  if (i.householdSizeMin !== undefined || i.householdSizeMax !== undefined) c++;
  return c;
}

function countBehaviour(b: BehaviourFilter): number {
  let c = 0;
  if (b.purchaseFrequency) c++;
  if (b.highCartAbandonment) c++;
  if (b.churnRisk) c++;
  if (b.avgOrderValueMin !== undefined || b.avgOrderValueMax !== undefined) c++;
  if (b.lifetimeValue) c++;
  return c;
}

function countPsychographics(p: PsychographicsFilter): number {
  let c = 0;
  if (p.brandLoyalty) c++;
  if (p.priceSensitivity) c++;
  if (p.riskAppetite) c++;
  return c;
}

function countDigital(d: DigitalFilter): number {
  let c = 0;
  if (d.primaryDevice?.length) c += d.primaryDevice.length;
  if (d.paymentApps?.length) c += d.paymentApps.length;
  if (d.ecommercePlatforms?.length) c += d.ecommercePlatforms.length;
  if (d.internetConnection) c++;
  return c;
}

/** Which categories have at least one filter set */
export function getActiveCategories(filters: AdvancedFilters | null): FilterCategory[] {
  if (!filters) return [];
  const active: FilterCategory[] = [];
  if (filters.demographics && countDemographics(filters.demographics) > 0) active.push("demographics");
  if (filters.location && countLocation(filters.location) > 0) active.push("location");
  if (filters.income && countIncome(filters.income) > 0) active.push("income");
  if (filters.behaviour && countBehaviour(filters.behaviour) > 0) active.push("behaviour");
  if (filters.psychographics && countPsychographics(filters.psychographics) > 0) active.push("psychographics");
  if (filters.digital && countDigital(filters.digital) > 0) active.push("digital");
  return active;
}

/** Get flat list of filter tags for summary panel */
export function getFilterTags(filters: AdvancedFilters | null): { category: string; label: string; key: string }[] {
  if (!filters) return [];
  const tags: { category: string; label: string; key: string }[] = [];

  if (filters.demographics) {
    const d = filters.demographics;
    if (d.ageMin !== undefined && d.ageMax !== undefined) {
      tags.push({ category: "Demographics", label: `Age ${d.ageMin}–${d.ageMax}`, key: "demo-age" });
    }
    if (d.gender) tags.push({ category: "Demographics", label: d.gender, key: "demo-gender" });
    d.education?.forEach((e) => tags.push({ category: "Demographics", label: e, key: `demo-edu-${e}` }));
    d.occupation?.forEach((o) => tags.push({ category: "Demographics", label: o, key: `demo-occ-${o}` }));
    d.maritalStatus?.forEach((m) => tags.push({ category: "Demographics", label: m, key: `demo-mar-${m}` }));
  }

  if (filters.location) {
    const l = filters.location;
    l.cityTiers?.forEach((t) => tags.push({ category: "Location", label: t, key: `loc-tier-${t}` }));
    l.states?.forEach((s) => tags.push({ category: "Location", label: s, key: `loc-state-${s}` }));
    l.cities?.forEach((c) => tags.push({ category: "Location", label: c, key: `loc-city-${c}` }));
  }

  if (filters.income) {
    const i = filters.income;
    if (i.monthlyMin !== undefined && i.monthlyMax !== undefined) {
      tags.push({ category: "Income & Spending", label: `₹${formatCurrency(i.monthlyMin)}–${formatCurrency(i.monthlyMax)}/mo`, key: "inc-monthly" });
    }
    if (i.incomeBracket) tags.push({ category: "Income & Spending", label: i.incomeBracket, key: "inc-bracket" });
    if (i.householdSizeMin !== undefined && i.householdSizeMax !== undefined) {
      tags.push({ category: "Income & Spending", label: `${i.householdSizeMin}–${i.householdSizeMax} people`, key: "inc-household" });
    }
  }

  if (filters.behaviour) {
    const b = filters.behaviour;
    if (b.purchaseFrequency) tags.push({ category: "Behaviour", label: b.purchaseFrequency, key: "beh-freq" });
    if (b.highCartAbandonment) tags.push({ category: "Behaviour", label: "High cart abandonment", key: "beh-cart" });
    if (b.churnRisk) tags.push({ category: "Behaviour", label: `${b.churnRisk} churn`, key: "beh-churn" });
    if (b.lifetimeValue) tags.push({ category: "Behaviour", label: `${b.lifetimeValue} LTV`, key: "beh-ltv" });
  }

  if (filters.psychographics) {
    const p = filters.psychographics;
    if (p.brandLoyalty) tags.push({ category: "Psychographics", label: `${p.brandLoyalty} loyalty`, key: "psych-loyalty" });
    if (p.priceSensitivity) tags.push({ category: "Psychographics", label: `${p.priceSensitivity} price sensitivity`, key: "psych-price" });
    if (p.riskAppetite) tags.push({ category: "Psychographics", label: `${p.riskAppetite} risk appetite`, key: "psych-risk" });
  }

  if (filters.digital) {
    const dig = filters.digital;
    dig.primaryDevice?.forEach((d) => tags.push({ category: "Digital Habits", label: d, key: `dig-dev-${d}` }));
    dig.paymentApps?.forEach((p) => tags.push({ category: "Digital Habits", label: p, key: `dig-pay-${p}` }));
    dig.ecommercePlatforms?.forEach((e) => tags.push({ category: "Digital Habits", label: e, key: `dig-ecom-${e}` }));
    if (dig.internetConnection) tags.push({ category: "Digital Habits", label: dig.internetConnection, key: "dig-internet" });
  }

  return tags;
}

export function formatCurrency(val: number): string {
  if (val >= 10000000) return `${(val / 10000000).toFixed(val % 10000000 === 0 ? 0 : 1)}Cr`;
  if (val >= 100000) return `${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
  return val.toString();
}

/** Check if any category has filters */
export function hasAnyAdvancedFilter(filters: AdvancedFilters | null): boolean {
  return countActiveFilters(filters) > 0;
}

/** Build a plain-English summary from advanced filters only */
export function generateFilterSummary(filters: AdvancedFilters | null): string {
  if (!filters) return "";
  const parts: string[] = [];
  const d = filters.demographics;
  if (d) {
    if (d.ageMin !== undefined && d.ageMax !== undefined) parts.push(`aged ${d.ageMin}–${d.ageMax}`);
    if (d.gender) parts.push(d.gender.toLowerCase());
    if (d.education?.length) parts.push(`education: ${d.education.join(", ")}`);
    if (d.occupation?.length) parts.push(`occupation: ${d.occupation.join(", ")}`);
  }
  const l = filters.location;
  if (l) {
    if (l.cityTiers?.length) parts.push(`in ${l.cityTiers.join(", ")} cities`);
    if (l.cities?.length) parts.push(`cities: ${l.cities.join(", ")}`);
    if (l.states?.length) parts.push(`states: ${l.states.join(", ")}`);
  }
  const i = filters.income;
  if (i) {
    if (i.monthlyMin !== undefined && i.monthlyMax !== undefined) {
      parts.push(`monthly income ₹${formatCurrency(i.monthlyMin)}–₹${formatCurrency(i.monthlyMax)}`);
    }
  }
  const b = filters.behaviour;
  if (b) {
    if (b.purchaseFrequency) parts.push(`${b.purchaseFrequency.toLowerCase()} purchasers`);
    if (b.churnRisk) parts.push(`${b.churnRisk.toLowerCase()} churn risk`);
  }
  return parts.length ? `Audience: ${parts.join(", ")}.` : "";
}
