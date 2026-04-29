"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-flow-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-flow-body",
  display: "swap",
});

const T = {
  accent: "#E8583A",
  accentSoft: "#FCE9E2",
  pageBg: "#F2F0EC",
  flowBg: "#F5F4F2",
  card: "#FFFFFF",
  heroBg: "#1A1814",
  heroText: "#F5F4F2",
  ink: "#1A1A1A",
  text2: "#4B5563",
  text3: "#6B7280",
  text4: "#9CA3AF",
  border: "#E5E7EB",
  hairline: "#D1D5DB",
  good: "#16A34A",
  goodSoft: "#DCFCE7",
  bad: "#E85450",
  badSoft: "#FEE2E2",
  warn: "#D97706",
  warnSoft: "#FED7AA",
  cool: "#1F4E5F",
  coolSoft: "#E0F2F1",
};

type Outcome = "Pro" | "Elite" | "Private" | "DROP@4" | "DROP@3.1.1" | "DROP@3.2.1";
type VariantId = "v1" | "v2" | "v3" | "v4";

type Persona = {
  id: string;
  name: string;
  cohort: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
  age: number;
  gender: "M" | "F";
  city: string;
  role: string;
  income: string;
  cards: string;
  spend: string;
  vignette: string;
  branch: "3.1" | "3.2";
  outcomes: Record<VariantId, Outcome>;
  reasoning: string;
};

const PERSONAS: Persona[] = [
  {
    id: "P1.1", name: "Aakash Mehta", cohort: "C1", age: 31, gender: "M",
    city: "Mumbai (Powai)", role: "Senior PM at fintech", income: "₹38L base",
    cards: "HDFC Infinia, Axis Magnus Burgundy, AmEx MRCC, ICICI Emeralde", spend: "₹1.8L/mo",
    vignette: "Built 4 spreadsheets to track points. Gave up on all of them. \"Yaar, every month main sochta hoon optimize karunga but never have time.\"",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Pain is real, ROI is obvious. ₹399 = one Zomato order. Loses more in missed milestones. Pays Pro at every yearly price point; cashback narrative magnitude doesn't move him.",
  },
  {
    id: "P1.2", name: "Priya Iyer", cohort: "C1", age: 29, gender: "F",
    city: "Bangalore (Whitefield)", role: "Product Lead at SaaS firm", income: "₹32L base",
    cards: "HDFC Diners Black, SBI Cashback, Axis Atlas", spend: "₹95K/mo",
    vignette: "Tracks rewards in Notion. \"Cards are a side-hustle — I want compound, not effort.\"",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Pays at every variant — already spends more on Notion subscription. Indifferent to discount narrative size.",
  },
  {
    id: "P1.3", name: "Rohan Khanna", cohort: "C1", age: 35, gender: "M",
    city: "Gurgaon (Sector 56)", role: "Director at consulting firm", income: "₹50L+ base",
    cards: "AmEx Plat Charge, HDFC Infinia, Citi Prestige, ICICI Emeralde", spend: "₹2L/mo",
    vignette: "Wife also has 3 cards. \"Boss, calendar already nahi manage hota — points kya track karunga.\"",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Pays Pro across all variants. Family coverage interests him but Private (₹14,999) anchored against ₹399 Pro feels like a stretch in every variant — same gap regardless of yearly framing.",
  },
  {
    id: "P1.4", name: "Karthik Reddy", cohort: "C1", age: 33, gender: "M",
    city: "Hyderabad (Hi-Tec City)", role: "Engineering Manager at MNC", income: "₹40L base",
    cards: "HDFC Infinia, Axis Magnus, SBI Aurum", spend: "₹1.2L/mo",
    vignette: "Aware of milestones; misses them every quarter. Telugu-English.",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Pro at every yearly price. Cashback narrative is marketing noise to him — he just wants the tool.",
  },
  {
    id: "P1.5", name: "Sneha Bansal", cohort: "C1", age: 28, gender: "F",
    city: "Mumbai (Lower Parel)", role: "VP at PE firm", income: "₹45L base",
    cards: "AmEx Platinum Charge, HDFC Infinia, Yes Marquee", spend: "₹1.5L/mo",
    vignette: "Hyper-rational; runs the numbers herself. Marwari-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Computes effective price; pays Pro in all four. Doesn't upgrade to Elite — already optimizes her own cards. The discount narrative size is exactly the kind of framing-trick she ignores.",
  },
  {
    id: "P2.1", name: "Anjali Sharma", cohort: "C2", age: 25, gender: "F",
    city: "Mumbai (Andheri)", role: "BD at startup", income: "₹14L base",
    cards: "HDFC Millennia", spend: "₹35K/mo",
    vignette: "\"I think I'm leaving money on the table but I don't know how much.\"",
    branch: "3.1",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Curiosity wins at ₹399 sticker — pays Pro across V1/V3/V4. V2's ₹99 is no-brainer. Yearly outflow ₹399 is acceptable on her income.",
  },
  {
    id: "P2.2", name: "Vikram Joshi", cohort: "C2", age: 24, gender: "M",
    city: "Bangalore (Koramangala)", role: "Junior SDE at unicorn", income: "₹16L base",
    cards: "SBI SimplyCLICK", spend: "₹28K/mo",
    vignette: "Pays bill on time; rarely checks rewards. Marathi-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "Pro", v4: "DROP@4" },
    reasoning: "V1/V4 sticker ₹399 fails his \"is this worth it\" test (rare-engagement profile). V2 ₹99 = trivial. V3 effective ₹199 with cashback narrative crosses the trust threshold.",
  },
  {
    id: "P2.3", name: "Divya Nair", cohort: "C2", age: 27, gender: "F",
    city: "Delhi (Saket)", role: "Marketing Associate at FMCG", income: "₹12L base",
    cards: "ICICI Coral", spend: "₹22K/mo",
    vignette: "Curious about cashback; skeptical of \"5x\" claims. Malayalam-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "Pro", v4: "DROP@4" },
    reasoning: "Modest income — ₹399 outflow is friction. V3 cashback brings effective to ₹199 which she'll trust. V2 ₹99 trivial. V1/V4 ≈ same friction.",
  },
  {
    id: "P2.4", name: "Rishabh Agarwal", cohort: "C2", age: 26, gender: "M",
    city: "Bangalore (Indiranagar)", role: "Mid SDE at SaaS firm", income: "₹18L base",
    cards: "Axis Flipkart Co-branded", spend: "₹40K/mo",
    vignette: "\"My card already gives me 5% on Flipkart. What else can SaveSage give?\"",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "His objection is value-redundancy, not price. V2 ₹99 is the only variant cheap enough to trial. Cashback (V3) doesn't fix his redundancy concern.",
  },
  {
    id: "P2.5", name: "Shreya Pillai", cohort: "C2", age: 23, gender: "F",
    city: "Chennai (OMR)", role: "ASE at services firm", income: "₹8L base",
    cards: "HSBC Cashback", spend: "₹18K/mo",
    vignette: "Conservative spender; cashback is meaningful at her income. Tamil-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "₹399 outflow is meaningful on ₹8L income — V3's cashback doesn't fix the upfront friction. V2 ₹99 is one Swiggy meal.",
  },
  {
    id: "P3.1", name: "Arjun Kapoor", cohort: "C3", age: 34, gender: "M",
    city: "Mumbai (BKC)", role: "Sales Director at SaaS", income: "₹55L + travel",
    cards: "AmEx Plat Charge, HDFC Infinia, Axis Vistara Infinite", spend: "25 trips/yr",
    vignette: "\"I have 8 lakh Membership Rewards points sitting idle. Tell me what to do with them.\"",
    branch: "3.1",
    outcomes: { v1: "Elite", v2: "Pro", v3: "Elite", v4: "Elite" },
    reasoning: "Wants consultation. Elite (₹1,499 effective) is the right tier in V1/V3/V4. V2's ₹99 default makes him think the platform is amateur — defaults to Pro instead of upgrading. V2 actively suppresses his Elite purchase.",
  },
  {
    id: "P3.2", name: "Meera Subramaniam", cohort: "C3", age: 38, gender: "F",
    city: "Bangalore (Indiranagar)", role: "Founder of consultancy", income: "₹35L+ irregular",
    cards: "HDFC Diners Black, SBI Aurum", spend: "Wants Europe biz class",
    vignette: "Aspirational traveller; partner travels biz class. Tamil-English.",
    branch: "3.1",
    outcomes: { v1: "Elite", v2: "Pro", v3: "Elite", v4: "Elite" },
    reasoning: "Elite for redemption strategy. V2's low entry causes her to default to Pro and \"see if quality is real\" first.",
  },
  {
    id: "P3.3", name: "Aniket Deshmukh", cohort: "C3", age: 41, gender: "M",
    city: "Pune (Camp)", role: "GM at hospitality chain", income: "₹40L",
    cards: "AmEx Platinum, ICICI Emeralde, HDFC Infinia", spend: "Books award flights",
    vignette: "Wants better redemption strategy. Marathi-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "Elite", v2: "Pro", v3: "Elite", v4: "Elite" },
    reasoning: "Same V2 leak — upgrades to Elite at all yearly Pro ≥ ₹399 variants.",
  },
  {
    id: "P3.4", name: "Tara Mehta", cohort: "C3", age: 32, gender: "F",
    city: "Delhi (GK-2)", role: "Senior Associate at law firm", income: "₹50L+",
    cards: "AmEx Plat, HDFC Diners", spend: "Solo + family travel",
    vignette: "\"Last redemption I felt I was scammed.\" Hindi-Gujarati-English.",
    branch: "3.1",
    outcomes: { v1: "Elite", v2: "Pro", v3: "Elite", v4: "Elite" },
    reasoning: "Wants expert help to avoid another bad redemption. Same V2 leak.",
  },
  {
    id: "P3.5", name: "Sandeep Iyer", cohort: "C3", age: 44, gender: "M",
    city: "Hyderabad (Jubilee Hills)", role: "Cardiologist (private practice)", income: "₹1Cr+",
    cards: "AmEx Plat, HDFC Infinia, Axis Magnus Burgundy, Citi Prestige", spend: "Family of 5",
    vignette: "Wants to fly Bali in suite using points. Telugu-English.",
    branch: "3.1",
    outcomes: { v1: "Elite", v2: "Elite", v3: "Elite", v4: "Elite" },
    reasoning: "Senior, family-focused. Goes Elite in all variants. Doesn't bite Private — Pro tier feels too consumer-grade across all yearly anchors.",
  },
  {
    id: "P4.1", name: "Ramya Menon", cohort: "C4", age: 23, gender: "F",
    city: "Bangalore (Marathahalli)", role: "Fresh grad at services firm", income: "₹6.5L base",
    cards: "None — uses UPI", spend: "—",
    vignette: "\"Everyone says I should get a card but which one?\" Malayalam-English.",
    branch: "3.2",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "\"I can ask Reddit for free.\" Only V2 ₹99 is cheap enough to trial for a recommendation.",
  },
  {
    id: "P4.2", name: "Aryan Verma", cohort: "C4", age: 25, gender: "M",
    city: "Noida (Sector 62)", role: "Mid-junior SDE", income: "₹14L base, just started salary",
    cards: "None — UPI + debit", spend: "—",
    vignette: "\"I'm earning now, want to start credit history.\" UP-Hindi-English.",
    branch: "3.2",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "Pro", v4: "DROP@4" },
    reasoning: "V3 ₹199 effective tips him over the trust threshold for a card recommendation. V1/V4 ₹399 effective ₹349 — too high for an unproven service.",
  },
  {
    id: "P4.3", name: "Nikhil Bhatt", cohort: "C4", age: 22, gender: "M",
    city: "Ahmedabad (Vastrapur)", role: "Final-year MBA, ₹18L offer pending", income: "No salary yet",
    cards: "Parents' add-on", spend: "—",
    vignette: "\"I don't want a card I'll regret. Tell me what fits a consultant lifestyle.\" Gujarati-English.",
    branch: "3.2",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Values strategic advice; ₹399 acceptable for consultation-grade. Pays Pro across all variants.",
  },
  {
    id: "P4.4", name: "Aisha Khan", cohort: "C4", age: 26, gender: "F",
    city: "Kolkata (Salt Lake)", role: "Designer at startup", income: "₹9L base",
    cards: "None — UPI-only, debt-averse", spend: "—",
    vignette: "\"Cards lead to debt. Why should I get one?\" Bengali-Hindi-English.",
    branch: "3.2",
    outcomes: { v1: "DROP@3.2.1", v2: "DROP@3.2.1", v3: "DROP@3.2.1", v4: "DROP@3.2.1" },
    reasoning: "Bounces upstream at 3.2.1 — \"You are losing out by using UPI\" reads guilt-driven. Cohort-definition itself flagged this risk. Lost in all four variants.",
  },
  {
    id: "P4.5", name: "Pranav Goel", cohort: "C4", age: 24, gender: "M",
    city: "Chandigarh (Sector 17)", role: "Trainee at family business", income: "Family wealth",
    cards: "Parents' add-on", spend: "—",
    vignette: "\"I want a status card. Tell me which one impresses.\" Punjabi-Hindi-English.",
    branch: "3.2",
    outcomes: { v1: "Pro", v2: "Pro", v3: "Pro", v4: "Pro" },
    reasoning: "Curious-and-funded. Pays Pro across all variants for a status-card recommendation.",
  },
  {
    id: "P5.1", name: "Kunal Joshi", cohort: "C5", age: 27, gender: "M",
    city: "Pune (Wakad)", role: "SDE at MNC", income: "₹22L",
    cards: "SBI Unnati, HDFC Moneyback Plus", spend: "₹12K/mo",
    vignette: "Pays full balance always. Got cards purely for CIBIL. Marathi-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "Value-prop mismatch — \"5x more value\" doesn't fit minimal-use cards. Only V2 ₹99 is cheap enough to satisfy curiosity.",
  },
  {
    id: "P5.2", name: "Pooja Reddy", cohort: "C5", age: 24, gender: "F",
    city: "Hyderabad (Begumpet)", role: "Analyst at consulting firm", income: "₹16L",
    cards: "ICICI Platinum, Axis ACE", spend: "₹15K/mo",
    vignette: "\"I want to buy a flat in 5 years; CIBIL is the goal.\" Telugu-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "CIBIL focus, not rewards. Same as Kunal — V2 only.",
  },
  {
    id: "P5.3", name: "Mohit Singh", cohort: "C5", age: 30, gender: "M",
    city: "Lucknow (Gomti Nagar)", role: "Mid-level govt employee", income: "₹14L",
    cards: "SBI Cashback, secured Federal Bank", spend: "₹10K/mo",
    vignette: "Cautious; sees no relevance to rewards optimization. Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "DROP@4", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "Drops every variant — no fit at any price. The product simply isn't for him as currently positioned.",
  },
  {
    id: "P5.4", name: "Lakshmi Prasad", cohort: "C5", age: 26, gender: "F",
    city: "Chennai (Velachery)", role: "Software Engineer at MNC", income: "₹18L",
    cards: "HDFC Moneyback, secured Axis", spend: "₹13K/mo",
    vignette: "\"Cards are a financial tool, not entertainment.\" Tamil-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@3.1.1", v2: "DROP@3.1.1", v3: "DROP@3.1.1", v4: "DROP@3.1.1" },
    reasoning: "Bounces upstream at 3.1.1 — \"5x more value\" frame insults her usage model. Lost upstream of paywall in all variants.",
  },
  {
    id: "P5.5", name: "Saurabh Tiwari", cohort: "C5", age: 32, gender: "M",
    city: "Ghaziabad (Pratap Vihar)", role: "Sub-manager at PSU bank", income: "₹13L",
    cards: "SBI ELITE, PNB card", spend: "₹14K/mo",
    vignette: "Wants to upgrade home loan eligibility. UP-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "Pro", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "Same C5 pattern — only V2 ₹99 unlocks him.",
  },
  {
    id: "P6.1", name: "Rajesh Goel", cohort: "C6", age: 48, gender: "M",
    city: "Mumbai (Powai)", role: "MD at family business", income: "₹3Cr+/yr",
    cards: "AmEx Centurion, HDFC Infinia Reserve, Axis Magnus Burgundy", spend: "₹6L/mo",
    vignette: "Wife runs household on her cards. Marwari-Gujarati-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "Private", v2: "Private", v3: "Private", v4: "Private" },
    reasoning: "Buys Private (family coverage) regardless of Pro pricing — Pro tier is irrelevant noise to him.",
  },
  {
    id: "P6.2", name: "Sumita Krishnan", cohort: "C6", age: 45, gender: "F",
    city: "Bangalore (JP Nagar)", role: "Co-founder husband's business", income: "₹1.8Cr household",
    cards: "AmEx Platinum, HDFC Diners Black Metal, ICICI Emeralde Private", spend: "₹4L/mo",
    vignette: "Manages family finances. Tamil-English.",
    branch: "3.1",
    outcomes: { v1: "Private", v2: "Private", v3: "Private", v4: "Private" },
    reasoning: "Same — Private in all variants.",
  },
  {
    id: "P6.3", name: "Vinay Sethi", cohort: "C6", age: 52, gender: "M",
    city: "Delhi (Greater Kailash)", role: "Owner mid-sized export firm", income: "₹4Cr+/yr",
    cards: "AmEx Centurion, HDFC Infinia, ICICI Emeralde Private, Axis Magnus Burgundy", spend: "₹8L/mo",
    vignette: "\"I have a CA and a private banker — what does an app do for me?\" Punjabi-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "DROP@4", v2: "DROP@4", v3: "DROP@4", v4: "DROP@4" },
    reasoning: "Drops every variant. Yearly Pro ₹399 across V1/V3/V4 reads as a consumer app for college kids; V2 ₹99 confirms it. The platform's credibility threshold is unmet at any of the displayed yearly Pro prices. (Fixing this would take a different signal than pricing — visible pedigree, partnerships, or executive testimonials.)",
  },
  {
    id: "P6.4", name: "Anita Mathur", cohort: "C6", age: 51, gender: "F",
    city: "Hyderabad (Banjara Hills)", role: "Retired senior exec + portfolio investor", income: "₹2.5Cr/yr",
    cards: "HDFC Diners Black, AmEx Plat, IDFC Wealth", spend: "₹4.5L/mo",
    vignette: "Wants concierge for her parents' medical-travel. Marwari-Hindi-Telugu-English.",
    branch: "3.1",
    outcomes: { v1: "Private", v2: "Private", v3: "Private", v4: "Private" },
    reasoning: "Private in all variants.",
  },
  {
    id: "P6.5", name: "Pradeep Shah", cohort: "C6", age: 54, gender: "M",
    city: "Mumbai (Worli)", role: "Senior partner at Big-4 consulting", income: "₹3.5Cr/yr",
    cards: "AmEx Centurion, HDFC Infinia Reserve, Citi Prestige, ICICI Emeralde Private", spend: "₹6L/mo",
    vignette: "Family of 4; expat lifestyle. Gujarati-Hindi-English.",
    branch: "3.1",
    outcomes: { v1: "Private", v2: "Private", v3: "Private", v4: "Private" },
    reasoning: "Private in all variants.",
  },
];

const VARIANTS: Array<{
  id: VariantId;
  name: string;
  short: string;
  proSticker: number;
  proEffective: number;
  cashback: number;
  narrative: string;
  hint: string;
  imageSrc: string;
}> = [
  { id: "v1", name: "Variant 1", short: "V1", proSticker: 399, proEffective: 349, cashback: 50, narrative: "Save ₹1,400 off ₹1,799 (~78% off)", hint: "Big-discount framing", imageSrc: "/savesage/var1-pro.png" },
  { id: "v2", name: "Variant 2", short: "V2", proSticker: 99, proEffective: 99, cashback: 0, narrative: "Lowball entry off smaller anchor", hint: "Volume play / commodity-priced", imageSrc: "/savesage/var2-pro.png" },
  { id: "v3", name: "Variant 3", short: "V3", proSticker: 399, proEffective: 199, cashback: 200, narrative: "Save ₹1,400 + ₹200 cashback (~78% off)", hint: "Same sticker as V1, 4× the cashback", imageSrc: "/savesage/var3-pro.png" },
  { id: "v4", name: "Variant 4", short: "V4", proSticker: 399, proEffective: 349, cashback: 50, narrative: "Save ₹300 off smaller anchor (~43% off)", hint: "Credibility framing — same payable as V1", imageSrc: "/savesage/var4-pro.png" },
];

const COHORTS: Array<{
  id: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
  name: string;
  desc: string;
  branch: "3.1" | "3.2";
}> = [
  { id: "C1", name: "Active Multi-Card Optimizer", desc: "3-4 cards · ₹50K-2L/mo · urban professional 26-38", branch: "3.1" },
  { id: "C2", name: "Single-Card Reward Seeker", desc: "1 entry/mid-tier card · ₹15K-50K/mo · salaried 23-27", branch: "3.1" },
  { id: "C3", name: "Travel Points Chaser", desc: "Premium cards · ₹1L+ travel/yr · 28-45", branch: "3.1" },
  { id: "C4", name: "Credit-Card Curious", desc: "No card yet · UPI/debit · 22-27", branch: "3.2" },
  { id: "C5", name: "Credit Score Builder", desc: "Basic card for CIBIL · minimal use · 22-32", branch: "3.1" },
  { id: "C6", name: "HNI / Family Spender", desc: "Premium cards · ₹4L+/mo · 40-55", branch: "3.1" },
];

const ELITE_EFFECTIVE = 1499;
const PRIVATE_EFFECTIVE = 13999;

function priceFor(variant: VariantId, outcome: Outcome): number {
  if (outcome === "Pro") return VARIANTS.find((v) => v.id === variant)!.proEffective;
  if (outcome === "Elite") return ELITE_EFFECTIVE;
  if (outcome === "Private") return PRIVATE_EFFECTIVE;
  return 0;
}

function isPaid(o: Outcome): boolean {
  return o === "Pro" || o === "Elite" || o === "Private";
}

function fmtINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

function outcomeColor(o: Outcome): { bg: string; ink: string; label: string } {
  switch (o) {
    case "Pro": return { bg: "#EEF2FF", ink: "#3730A3", label: "Pro" };
    case "Elite": return { bg: "#ECFDF5", ink: "#065F46", label: "Elite" };
    case "Private": return { bg: "#FDF4FF", ink: "#86198F", label: "Private" };
    case "DROP@4": return { bg: T.badSoft, ink: T.bad, label: "Drop · paywall" };
    case "DROP@3.1.1": return { bg: T.warnSoft, ink: T.warn, label: "Drop · 3.1.1" };
    case "DROP@3.2.1": return { bg: T.warnSoft, ink: T.warn, label: "Drop · 3.2.1" };
  }
}

const variantStats = VARIANTS.map((v) => {
  let paid = 0, dropPaywall = 0, dropEarly = 0;
  let pro = 0, elite = 0, priv = 0;
  let revenue = 0;
  for (const p of PERSONAS) {
    const o = p.outcomes[v.id];
    if (isPaid(o)) {
      paid++;
      if (o === "Pro") pro++;
      if (o === "Elite") elite++;
      if (o === "Private") priv++;
      revenue += priceFor(v.id, o);
    } else if (o === "DROP@4") dropPaywall++;
    else dropEarly++;
  }
  return {
    ...v,
    paid, dropPaywall, dropEarly,
    pro, elite, priv,
    revenue,
    conversionPct: Math.round((paid / PERSONAS.length) * 100),
    arpu: paid > 0 ? Math.round(revenue / paid) : 0,
    revPerSignup: Math.round(revenue / PERSONAS.length),
  };
});

const winnerByConv = [...variantStats].sort((a, b) => b.conversionPct - a.conversionPct)[0];
const winnerByPerSignup = [...variantStats].sort((a, b) => b.revPerSignup - a.revPerSignup)[0];

const cohortGrid = COHORTS.map((c) => {
  const personasInCohort = PERSONAS.filter((p) => p.cohort === c.id);
  const cells = VARIANTS.map((v) => {
    let paid = 0, revenue = 0;
    for (const p of personasInCohort) {
      const o = p.outcomes[v.id];
      if (isPaid(o)) {
        paid++;
        revenue += priceFor(v.id, o);
      }
    }
    return { variantId: v.id, paid, revenue, total: personasInCohort.length };
  });
  const bestRev = Math.max(...cells.map((x) => x.revenue));
  return {
    ...c,
    size: personasInCohort.length,
    cells: cells.map((cell) => ({ ...cell, isBest: cell.revenue === bestRev && bestRev > 0 })),
  };
});

export default function SaveSageReportPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [signupVolume, setSignupVolume] = useState(1000);

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable}`}
      style={{ backgroundColor: T.pageBg, minHeight: "100vh", color: T.ink, fontFamily: "var(--font-flow-body), system-ui, sans-serif" }}
    >
      {/* Sticky Top Bar */}
      <div
        style={{
          backgroundColor: T.card, borderBottom: `1px solid ${T.border}`,
          padding: "0 24px", height: 52, display: "flex", alignItems: "center",
          justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>Apriori</span>
          <span style={{ color: T.hairline, fontSize: 14 }}>/</span>
          <span style={{ fontSize: 13, color: T.text3, fontWeight: 500 }}>SaveSage · Onboarding Paywall A/B/C/D</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.text4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Public Preview
        </span>
      </div>

      {/* Hero */}
      <section style={{ backgroundColor: T.heroBg, color: T.heroText, padding: "72px 24px 80px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: T.accent, marginBottom: 16 }}>
            Apriori Simulation · Run 2026-04-30
          </div>
          <h1
            style={{
              fontFamily: "var(--font-flow-display), Georgia, serif",
              fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, fontWeight: 600,
              letterSpacing: "-0.025em", margin: 0, marginBottom: 20, color: T.heroText,
            }}
          >
            Ship <span style={{ color: T.accent }}>Variant 3</span>. The variants are <br />
            tighter than they look.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#D1CFC9", maxWidth: 720, margin: 0, marginBottom: 28 }}>
            30 hand-built Indian personas across 6 cohorts × 4 paywall variants × full onboarding flow ={" "}
            <strong style={{ color: T.heroText }}>120 simulated journeys</strong>.
            V1, V3, V4 land within ~₹1,000 of each other on net revenue per 30 users. V2 is the trap.
            V3 wins on the only mechanically-distinct lever in the experiment: cashback magnitude.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, color: "#A8A6A0", fontSize: 13 }}>
            <span><strong style={{ color: T.heroText }}>30</strong> personas</span>
            <span><strong style={{ color: T.heroText }}>6</strong> cohorts (founder-defined)</span>
            <span><strong style={{ color: T.heroText }}>4</strong> variants tested</span>
            <span><strong style={{ color: T.heroText }}>120</strong> outcomes</span>
            <span><strong style={{ color: T.heroText }}>1</strong> verdict</span>
          </div>
        </div>
      </section>

      {/* Pricing matrix */}
      <Section title="01 · Pricing matrix" subtitle="What actually differs across variants. Elite (₹1,499 effective) and Private (₹13,999 effective) are constant — only the Pro tier moves.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 8 }}>
          {VARIANTS.map((v) => (
            <div key={v.id} style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.text3, marginBottom: 8 }}>
                {v.name}
              </div>
              <div style={{ fontFamily: "var(--font-flow-display), Georgia, serif", fontSize: 36, fontWeight: 600, color: T.ink, lineHeight: 1, marginBottom: 4 }}>
                {fmtINR(v.proSticker)}
              </div>
              <div style={{ fontSize: 13, color: T.text2, marginBottom: 14 }}>
                Pro sticker · effective <strong style={{ color: T.ink }}>{fmtINR(v.proEffective)}</strong>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: T.text3 }}>
                <div>Cashback: <strong style={{ color: T.ink }}>{v.cashback === 0 ? "—" : fmtINR(v.cashback)}</strong></div>
                <div>Narrative: {v.narrative}</div>
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: T.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {v.hint}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 16px", backgroundColor: T.flowBg, border: `1px dashed ${T.hairline}`, borderRadius: 8, fontSize: 13, color: T.text2 }}>
          <strong style={{ color: T.ink }}>V1 ≡ V4 for yearly buyers.</strong> Same payable, same effective price, same Pro→Elite gap (₹1,300). The only difference is the displayed discount narrative — V1 reads as &ldquo;huge savings&rdquo;, V4 reads as &ldquo;credible savings&rdquo;. Driven by different monthly anchors not visible in yearly-default screenshots.
        </div>
      </Section>

      {/* Headline numbers */}
      <Section title="02 · Headline numbers" subtitle="Across all 30 personas, per variant.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {variantStats.map((s) => {
            const isWinner = s.id === winnerByPerSignup.id;
            return (
              <div key={s.id} style={{
                backgroundColor: T.card,
                border: isWinner ? `2px solid ${T.accent}` : `1px solid ${T.border}`,
                borderRadius: 8, padding: 20,
                position: "relative",
              }}>
                {isWinner && (
                  <div style={{
                    position: "absolute", top: -10, left: 16,
                    backgroundColor: T.accent, color: "#fff",
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "3px 10px", borderRadius: 999,
                  }}>
                    Best per signup
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.text3, marginBottom: 12 }}>
                  {s.name}
                </div>
                <Stat label="Conversion" value={`${s.paid}/${PERSONAS.length}`} sub={`${s.conversionPct}%`} />
                <Stat label="ARPU (paid)" value={fmtINR(s.arpu)} />
                <Stat label="Net rev (30 users)" value={fmtINR(s.revenue)} />
                <Stat label="Per signup" value={fmtINR(s.revPerSignup)} />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          <Callout tone="good" title={`Highest revenue / signup: ${winnerByPerSignup.name}`} body={`${fmtINR(winnerByPerSignup.revPerSignup)} per signup. Marginal lift over V1/V4 from cashback (~3 incremental buyers).`} />
          <Callout tone="warn" title={`Highest conversion: ${winnerByConv.name}`} body={`${winnerByConv.conversionPct}% conversion at ARPU of just ${fmtINR(winnerByConv.arpu)}. Volume comes at the cost of upsell — see plan-mix.`} />
          <Callout tone="cool" title="V1 ≈ V4 for yearly buyers" body="Identical effective price, identical Pro→Elite gap. Differ only in displayed savings narrative — within noise floor at n=30." />
        </div>
      </Section>

      {/* Screenshots */}
      <Section title="03 · The four paywalls" subtitle="Pro tier selected (default state). Click to compare side-by-side.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {VARIANTS.map((v) => (
            <div key={v.id} style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "428/952", backgroundColor: T.flowBg, borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
                <Image
                  src={v.imageSrc}
                  alt={`${v.name} paywall — Pro selected`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 12, color: T.text3 }}>
                {fmtINR(v.proSticker)} CTA · {fmtINR(v.proEffective)} effective
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cohort heatmap */}
      <Section title="04 · Cohort × Variant heatmap" subtitle="Paid count and revenue per cohort (n=5 each). Highlighted cells = best variant for that cohort.">
        <div style={{ overflowX: "auto", marginTop: 8 }}>
          <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>Cohort</th>
                {VARIANTS.map((v) => (
                  <th key={v.id} style={{ textAlign: "center", padding: "12px 16px", fontWeight: 600, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>
                    {v.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortGrid.map((c) => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "16px", verticalAlign: "top" }}>
                    <div style={{ fontWeight: 600, color: T.ink, marginBottom: 2 }}>
                      <span style={{ color: T.accent, fontFamily: "var(--font-flow-display), Georgia, serif" }}>{c.id}</span>{" — "}{c.name}
                    </div>
                    <div style={{ fontSize: 12, color: T.text3 }}>{c.desc}</div>
                    <div style={{ fontSize: 11, color: T.text4, marginTop: 4 }}>Branch · {c.branch}</div>
                  </td>
                  {c.cells.map((cell) => (
                    <td key={cell.variantId} style={{
                      padding: "16px", textAlign: "center", verticalAlign: "top",
                      backgroundColor: cell.isBest ? T.accentSoft : "transparent",
                      borderLeft: cell.isBest ? `2px solid ${T.accent}` : "none",
                      borderRight: cell.isBest ? `2px solid ${T.accent}` : "none",
                    }}>
                      <div style={{ fontFamily: "var(--font-flow-display), Georgia, serif", fontSize: 22, fontWeight: 600, color: cell.isBest ? T.accent : T.ink, lineHeight: 1 }}>
                        {cell.paid}/{cell.total}
                      </div>
                      <div style={{ fontSize: 12, color: T.text3, marginTop: 4 }}>
                        {fmtINR(cell.revenue)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${T.border}`, backgroundColor: T.flowBg }}>
                <td style={{ padding: "16px", fontWeight: 700, color: T.ink }}>Totals (30 users)</td>
                {variantStats.map((s) => (
                  <td key={s.id} style={{ padding: "16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-flow-display), Georgia, serif", fontSize: 22, fontWeight: 700, color: T.ink }}>
                      {s.paid}/{PERSONAS.length}
                    </div>
                    <div style={{ fontSize: 12, color: T.text2, fontWeight: 600 }}>
                      {fmtINR(s.revenue)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Plan mix */}
      <Section title="05 · Plan mix" subtitle="Why V2's high conversion is misleading: 80% of its buyers sit at the ₹99 Pro tier.">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {variantStats.map((s) => {
            const total = s.pro + s.elite + s.priv;
            const proPct = total > 0 ? (s.pro / total) * 100 : 0;
            const elitePct = total > 0 ? (s.elite / total) * 100 : 0;
            const privPct = total > 0 ? (s.priv / total) * 100 : 0;
            return (
              <div key={s.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, color: T.ink }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: T.text3 }}>
                    {s.pro} Pro · {s.elite} Elite · {s.priv} Private
                  </div>
                </div>
                <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", backgroundColor: T.flowBg, border: `1px solid ${T.border}` }}>
                  {s.pro > 0 && <div style={{ width: `${proPct}%`, backgroundColor: "#A5B4FC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#1E1B4B", fontWeight: 600 }}>{proPct >= 12 ? `Pro ${Math.round(proPct)}%` : ""}</div>}
                  {s.elite > 0 && <div style={{ width: `${elitePct}%`, backgroundColor: "#6EE7B7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#064E3B", fontWeight: 600 }}>{elitePct >= 12 ? `Elite ${Math.round(elitePct)}%` : ""}</div>}
                  {s.priv > 0 && <div style={{ width: `${privPct}%`, backgroundColor: "#F0ABFC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#581C87", fontWeight: 600 }}>{privPct >= 12 ? `Private ${Math.round(privPct)}%` : ""}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Money on table */}
      <Section title="06 · Money on the table" subtitle="At your signup volume, what does picking the wrong variant cost?">
        <div style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: T.text2 }}>Monthly signup volume:</label>
            <input
              type="range" min={100} max={10000} step={100}
              value={signupVolume}
              onChange={(e) => setSignupVolume(Number(e.target.value))}
              style={{ flex: "1 1 240px", accentColor: T.accent }}
            />
            <div style={{ fontFamily: "var(--font-flow-display), Georgia, serif", fontSize: 24, fontWeight: 600, color: T.ink, minWidth: 100 }}>
              {signupVolume.toLocaleString("en-IN")}/mo
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Choice</th>
                <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Per signup</th>
                <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Per month</th>
                <th style={{ textAlign: "right", padding: "8px 12px", fontWeight: 600, fontSize: 12, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Per year</th>
              </tr>
            </thead>
            <tbody>
              {variantStats.map((s) => {
                const delta = s.revPerSignup - winnerByPerSignup.revPerSignup;
                const monthly = delta * signupVolume;
                const yearly = monthly * 12;
                const isWinner = s.id === winnerByPerSignup.id;
                return (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "12px", fontWeight: 600, color: isWinner ? T.accent : T.ink }}>
                      {isWinner ? `${s.name} (winner)` : `Ship ${s.name} instead`}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: isWinner ? T.text3 : delta < 0 ? T.bad : T.text2 }}>
                      {isWinner ? "—" : (delta >= 0 ? "+" : "") + fmtINR(delta)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: isWinner ? T.text3 : delta < 0 ? T.bad : T.text2 }}>
                      {isWinner ? "—" : (monthly >= 0 ? "+" : "") + fmtINR(monthly)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: isWinner ? T.text3 : delta < 0 ? T.bad : T.text2, fontWeight: isWinner ? 400 : 600 }}>
                      {isWinner ? "—" : (yearly >= 0 ? "+" : "") + fmtINR(yearly)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: 16, fontSize: 13, color: T.text2 }}>
            <strong style={{ color: T.ink }}>Honest read:</strong> the deltas are tighter than they look. V1, V3, and V4 cluster within ₹20 per signup. V2 is the only meaningful loss. The simulation isn&apos;t telling you to stress-pick between V1/V3/V4 — it&apos;s telling you not to ship V2.
          </div>
        </div>
      </Section>

      {/* Persona table */}
      <Section title="07 · The 30 personas, per variant" subtitle="Click a row to see the full vignette and reasoning.">
        <div style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}`, backgroundColor: T.flowBg }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 11, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Persona</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 11, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Cohort</th>
                  <th style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, fontSize: 11, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Branch</th>
                  {VARIANTS.map((v) => (
                    <th key={v.id} style={{ textAlign: "center", padding: "10px 14px", fontWeight: 600, fontSize: 11, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {v.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERSONAS.map((p) => {
                  const isOpen = expanded === p.id;
                  return (
                    <Fragment key={p.id}>
                      <tr
                        onClick={() => setExpanded(isOpen ? null : p.id)}
                        style={{ borderBottom: `1px solid ${T.border}`, cursor: "pointer", backgroundColor: isOpen ? T.flowBg : "transparent" }}
                      >
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontWeight: 600, color: T.ink }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: T.text3 }}>{p.id} · {p.age}{p.gender} · {p.city}</div>
                        </td>
                        <td style={{ padding: "12px 14px", color: T.text2 }}>
                          <span style={{ fontFamily: "var(--font-flow-display), Georgia, serif", color: T.accent, fontWeight: 600 }}>{p.cohort}</span>
                        </td>
                        <td style={{ padding: "12px 14px", textAlign: "center", color: T.text3, fontFamily: "ui-monospace, monospace" }}>{p.branch}</td>
                        {VARIANTS.map((v) => {
                          const o = p.outcomes[v.id];
                          const oc = outcomeColor(o);
                          return (
                            <td key={v.id} style={{ padding: "12px 6px", textAlign: "center" }}>
                              <span style={{
                                display: "inline-block", padding: "3px 8px", borderRadius: 999,
                                backgroundColor: oc.bg, color: oc.ink,
                                fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
                              }}>
                                {oc.label}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                      {isOpen && (
                        <tr style={{ backgroundColor: T.flowBg, borderBottom: `1px solid ${T.border}` }}>
                          <td colSpan={3 + VARIANTS.length} style={{ padding: "16px 18px 22px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 12 }}>
                              <KV label="Role" value={p.role} />
                              <KV label="Income" value={p.income} />
                              <KV label="Cards" value={p.cards} />
                              <KV label="Spend" value={p.spend} />
                            </div>
                            <div style={{ fontSize: 13, color: T.text2, marginBottom: 12, lineHeight: 1.55, fontStyle: "italic" }}>
                              {p.vignette}
                            </div>
                            <div style={{ fontSize: 13, color: T.ink, lineHeight: 1.6, padding: "12px 14px", backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 6 }}>
                              <strong style={{ color: T.accent, textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em", display: "block", marginBottom: 4 }}>Decision rationale</strong>
                              {p.reasoning}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Recommendations */}
      <Section title="08 · What to ship" subtitle="Six concrete moves, ranked.">
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <Reco n={1} title="Make Variant 3 the default paywall." body="Same ₹399 sticker as V1/V4, but ₹200 cashback brings effective to ₹199 — picks up Vikram (C2) and Aryan (C4) without sacrificing the high-LTV cohorts. Marginal lift, low risk." />
          <Reco n={2} title="Add screen 3.5 — spend bracket fork." body="Single question between 3.1 and the paywall: &quot;What's your average monthly card spend?&quot; Three buckets (<₹50K / ₹50K-2L / ₹2L+). Route &lt;₹50K to V2 (₹99 entry) and ₹50K+ to V3. Recovers price-sensitive C2/C4/C5 buyers as low-tier conversions while keeping V3's revenue intact for spenders." />
          <Reco n={3} title="Fix 3.1.1 copy for credit-score builders (C5)." body={`Current: "SaveSage users get 5x more value from their credit cards." This insults C5's usage model — they don't earn 5×, they barely earn anything. Add a sub-line: "Even on a basic card, you're earning ₹X/year that's never being redeemed." Concrete number > abstract multiplier. C5 is currently a graveyard cohort — only V2 picks up 3 buyers at ₹99 each.`} />
          <Reco n={4} title="Fix 3.2.1 copy — it's currently guilt-driven." body={`Your own C4 cohort definition flags this: "must feel empowering, not guilt-driven." The current orange "You are losing out by using UPI / Cash / Debit Card" violates that — Aisha Khan (debt-averse C4) bounces here in all 4 variants. Try: "₹X is the average UPI user's annual reward gap. Here's how to claim yours." Same fact, opposite emotional valence.`} />
          <Reco n={5} title="Move &quot;2X ROI Guarantee&quot; above the price ladder." body="Currently buried below &quot;Choose Your Plan.&quot; For any variant, the guarantee badge is the de-risker that closes the deal — especially for skeptical C5 builders and trust-needing C6 HNIs. Promote it." />
          <Reco n={6} title="Add testimonials beyond Aditya Sharma." body="Current testimonial (&quot;saved ₹45,000 across 4 cards&quot;) is clearly C1-tuned. It does not speak to a C3 traveller, a C6 HNI, or a C4 first-time-card user. Add one per archetype. C6 social proof is the highest-leverage add — Vinay Sethi-style HNIs need peer validation, and they drop every variant in this simulation." />
        </ol>
      </Section>

      {/* What changed (corrigendum) */}
      <Section title="09 · What changed since the first run" subtitle="Transparency on the correction.">
        <div style={{ backgroundColor: T.card, border: `1px solid ${T.warnSoft}`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.warn, marginBottom: 8 }}>
            Corrigendum
          </div>
          <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
            The first version of this report misread Variant 4&apos;s Pro CTA as <strong>₹1,499</strong> with ₹1,150 cashback, and concluded &quot;Ship V4 — anchor pricing decoy collapses the Pro→Elite gap to ₹200.&quot;
          </p>
          <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
            <strong>Correct reading:</strong> V4&apos;s Pro CTA is <strong>₹399</strong> with <strong>₹50 cashback</strong> — yearly Pro pricing identical to V1. The variant difference lives in the monthly tier (different anchors → different displayed yearly-discount magnitudes), invisible from yearly-default screenshots.
          </p>
          <p style={{ fontSize: 14, color: T.ink, lineHeight: 1.6, margin: 0 }}>
            The decoy-pricing thesis is dead. V4 ≈ V1 for yearly buyers. The marginal winner is V3, not V4. The earlier report&apos;s <em>direction</em> (avoid V2) holds; its <em>magnitude</em> claim (+66% revenue from V4) does not.
          </p>
        </div>
      </Section>

      {/* Methodology */}
      <Section title="10 · Methodology &amp; caveats" subtitle="What this simulation is, and what it isn't.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Caveat label="Sample size" body="n = 30 personas × 4 variants = 120 simulated journeys. Directional, not statistical. Production A/B should target ≥1,000 users per cell." />
          <Caveat label="Decision model" body="Single LLM-reasoned outcome per (persona, variant) pair, grounded in cohort archetype, income tolerance, value-prop fit, and price psychology. Apriori production would use self-consistency sampling (N=3, temp 0.85) for BRANCH/TERMINAL nodes — expect ±10% noise per cell." />
          <Caveat label="Persona basis" body="Hand-built by founder against the 6 cohort definitions (instead of the semantic loader's 83K-pool retrieval). Names, cities, cards, spends, and Hinglish vignettes are constructed for cohort-fidelity. See the persona table for full detail." />
          <Caveat label="Yearly toggle only" body="The Yearly default was simulated. Monthly-tier conversion was not evaluated — monthly screenshots were not provided. Variants V1 and V4 likely differ for monthly buyers (different monthly anchors), but yearly outcomes are identical. Report this gap before locking the variant choice." />
          <Caveat label="Guarantee assumed creditable" body={"All four variants display a \"2X ROI Guarantee\" (refund 100% if you don't save 2× in year 1). The simulation assumes users trust this. If actual refund rate runs >5%, all variants' economics weaken — V3's cashback compounding makes it most vulnerable. Verify the guarantee unit-economics before scaling."} />
          <Caveat label="No copy / brand effects" body="Pricing was the only experimental variable. The 6 recommended copy fixes (sections 08.3-08.6) are inferred from drop-points but not tested in this run. Real lift may come from copy compounding with V3 pricing." />
        </div>
      </Section>

      {/* Footer */}
      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: `1px solid ${T.border}`, color: T.text4, fontSize: 12 }}>
        Generated with <strong style={{ color: T.text3 }}>Apriori</strong> — synthetic consumer simulation, run on 2026-04-30.
        <br />
        SaveSage paywall A/B/C/D · {PERSONAS.length} personas × {VARIANTS.length} variants · {PERSONAS.length * VARIANTS.length} outcomes.
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "56px 24px", borderTop: `1px solid ${T.border}`, backgroundColor: T.pageBg }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-flow-display), Georgia, serif",
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.015em",
            margin: 0, marginBottom: subtitle ? 6 : 24, color: T.ink,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 15, color: T.text2, margin: 0, marginBottom: 24, maxWidth: 680, lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-flow-display), Georgia, serif", fontSize: 22, fontWeight: 600, color: T.ink, lineHeight: 1 }}>
          {value}
        </span>
        {sub && <span style={{ fontSize: 12, color: T.text3 }}>{sub}</span>}
      </div>
    </div>
  );
}

function Callout({ tone, title, body }: { tone: "good" | "warn" | "cool"; title: string; body: string }) {
  const palette = tone === "good" ? { bg: T.goodSoft, ink: T.good }
    : tone === "warn" ? { bg: T.warnSoft, ink: T.warn }
    : { bg: T.coolSoft, ink: T.cool };
  return (
    <div style={{ backgroundColor: palette.bg, border: `1px solid ${palette.ink}33`, borderRadius: 8, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: palette.ink, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}

function Reco({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, padding: 18, backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 999, backgroundColor: T.accentSoft,
        color: T.accent, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-flow-display), Georgia, serif", fontWeight: 700, fontSize: 16,
      }}>
        {n}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: T.ink, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.55 }}>{body}</div>
      </div>
    </li>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: T.text3, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: T.ink, fontWeight: 500, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

function Caveat({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}
