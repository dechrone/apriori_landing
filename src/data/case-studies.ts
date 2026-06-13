/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES MANIFEST
   ─────────────────────────────────────────────────────────────────────────
   Static manifest powering the public `/case-studies` gallery. Each entry
   points at an existing frozen founder-demo report page (under `/demo/*` or
   `/simulations/*`). Curated — only presentable studies live here.

   Recovered from git history (the `landing-page` branch held the full set of
   real-company demos that had been trimmed from main). Excluded on purpose:
   GoodScore (n=2, incomplete run) and Blink (dummy data) — their pages still
   exist under /demo/* but are not featured until they have real, complete runs.

   To add a study: ensure its report page renders, drop any assets in `public/`,
   append an entry below. No DB query; these reports are hand-frozen, not user
   runs.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CaseStudyVariant {
  /** Short label shown in the variant strip, e.g. "Variant 2". */
  label: string;
  /** Route to the per-variant deep-dive report. */
  href: string;
  /** One-line description of what this variant changed. */
  note: string;
}

export interface CaseStudy {
  /** URL-safe id (not currently routed, but stable for keys/anchors). */
  slug: string;
  /** Customer / product name. */
  client: string;
  /** Sector framing, e.g. "Fintech · Bond investing". */
  category: string;
  /** Headline of the study. */
  title: string;
  /** 1–2 sentence summary of the problem and what the simulation surfaced. */
  summary: string;
  /** Primary report route the card links to. */
  href: string;
  /** Hero result, kept honest — derived from the underlying report. */
  metric: { value: string; label: string };
  /** Scannable chips: method, surface, scale. */
  tags: string[];
  /** Optional thumbnail from `public/`. Falls back to a branded tile. */
  thumbnail?: string;
  /** Card accent (hex). */
  accent: string;
  /** Optional per-variant deep-dive links surfaced under the card. */
  variants?: CaseStudyVariant[];
  /** Optional CTA label override (defaults to "View full report"). */
  ctaLabel?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "diginix-velocity",
    client: "Diginix Solutions",
    category: "Customer Story · Dubai",
    title: "Shipping 25% faster — without hiring another PM",
    summary:
      "Diginix, a Dubai AI product studio, was about to hire a $66K PM to hit a four-month delivery. We gave their existing PMs a replica of their target audience instead — they shipped in under three months and saved the hire. Now they're rolling Apriori into three more projects.",
    href: "/case-studies/diginix",
    metric: { value: "25%", label: "faster time-to-delivery" },
    tags: ["Customer story", "Dubai", "$66K saved", "0 new hires"],
    accent: "#38BDF8",
    ctaLabel: "Read the full story",
  },
  {
    slug: "univest-activation",
    client: "Univest",
    category: "Fintech · Stock investing",
    title: "Untangling a stalled post-signup activation flow",
    summary:
      "We simulated Univest's post-signup activation with 50 personas across four design variants. Users hesitated when the ₹1 activation price stayed hidden behind a “free” framing — surfacing price, proof, and the CTA upfront nearly doubled projected conversion.",
    href: "/demo/univest",
    metric: { value: "22% → 44%", label: "projected activation conversion" },
    tags: ["A/B test", "Activation", "50 personas", "4 variants"],
    thumbnail: "/screens/univest/1.1.png",
    accent: "#E8583A",
    variants: [
      { label: "Control", href: "/demo/univest1", note: "Trades Modal → Plan Picker (1.1 → 1.2)" },
      { label: "Variant 2", href: "/demo/univest2", note: "Trusted Advisory + Live Trades + sticky “Start Trial @ ₹1”" },
      { label: "Variant 3", href: "/demo/univest3", note: "Trusted Advisory compact + “Unlock FREE trade”" },
      { label: "Variant 4", href: "/demo/univest4", note: "Crown + Trust Pillars + “Unlock FREE trade”" },
      { label: "Variant 5", href: "/demo/univest5", note: "Trust Pillars + Dual CTA (Unlock + Start Trial @ ₹1)" },
      { label: "Variant 6", href: "/demo/univest6", note: "Dual CTA → Loss-Aversion recover (6.1 → 6.2)" },
    ],
  },
  {
    slug: "superastro-onboarding",
    client: "SuperAstro",
    category: "Consumer · AI astrology",
    title: "Getting users to the ₹1 AI-astrology chat",
    summary:
      "100 personas — metro and NRI — onboarded into SuperAstro's ₹1 AI Vedic-astrology chat. The phone-number gate was the single biggest drop-off: users balked at handing over their number before seeing any value.",
    href: "/demo/superastro",
    metric: { value: "62%", label: "flow completion · 100 personas" },
    tags: ["Onboarding", "100 personas", "AI astrology"],
    thumbnail: "/screens/superastro/1.jpeg",
    accent: "#A855F7",
  },
  {
    slug: "gripinvest-onboarding",
    client: "Grip Invest",
    category: "Fintech · Bond investing",
    title: "Reading a non-linear bond-investing funnel",
    summary:
      "50 personas through Grip Invest's SEBI-registered corporate-bond flow (up to 12.5% fixed returns). 64% reached invest-ready — the non-linear discovery dashboard held attention, with only a small KYC/PAN dip.",
    href: "/demo/gripinvest",
    metric: { value: "64%", label: "flow completion · 50 personas" },
    tags: ["Onboarding", "50 personas", "Bond investing"],
    accent: "#14B8A6",
  },
  {
    slug: "flent-onboarding",
    client: "Flent",
    category: "Fintech · Rent payments",
    title: "Where rent-payment onboarding leaks",
    summary:
      "50 personas through Flent's rent-payment onboarding (1% cashback, card float, ₹1.5L landlord insurance). 62% completed — the rental-agreement step was the main friction, costing a 12% drop.",
    href: "/demo/flent",
    metric: { value: "62%", label: "flow completion · 50 personas" },
    tags: ["Onboarding", "50 personas", "Rent payments"],
    accent: "#3B82F6",
  },
  {
    slug: "fitsquare-onboarding",
    client: "Fit Square",
    category: "Consumer · Fitness",
    title: "What sells a pay-per-session gym pass",
    summary:
      "50 personas evaluating Fit Square's pay-per-session gym aggregator. Nearby-gym inventory was the strongest pull; plan selection was where price-sensitive users hesitated, a 10% drop.",
    href: "/demo/fitsquare",
    metric: { value: "60%", label: "flow completion · 50 personas" },
    tags: ["Onboarding", "50 personas", "Fitness"],
    accent: "#22C55E",
  },
  {
    slug: "dailymantra-onboarding",
    client: "Daily Mantra",
    category: "Consumer · Devotional",
    title: "Converting belief into a devotional subscription",
    summary:
      "50 personas — devout, skeptical, and curious — onboarding into Daily Mantra's Vedic app. 58% reached the paywall; conversion ran on spiritual trust, and the early phone-number ask cost 8%.",
    href: "/demo/dailymantra",
    metric: { value: "58%", label: "flow completion · 50 personas" },
    tags: ["Onboarding", "50 personas", "Devotional"],
    accent: "#F59E0B",
  },
  {
    slug: "savesage-pricing",
    client: "SaveSage",
    category: "Fintech · Credit-card advisory",
    title: "Pricing a new advisory subscription",
    summary:
      "Four price-and-framing variants for SaveSage Pro — from a ₹99 lowball to a ₹399 sticker with cashback — tested against credit-card-savvy personas to isolate the tier that maximizes revenue per signup without crushing conversion.",
    href: "/simulations/savesage/1ef345g7hjklo9",
    metric: { value: "4×", label: "price points stress-tested" },
    tags: ["A/B test", "Pricing", "Revenue / signup"],
    accent: "#0D9488",
  },
  {
    slug: "loophealth-enrollment",
    client: "Loop Health",
    category: "Insurtech · Health insurance",
    title: "A clarity gap at insurance checkout",
    summary:
      "A directional 5-persona read on Loop Health's Healthflex enrollment. 40% dropped at plan selection — the checkout lacked a clear order summary, so users were unsure what they were actually paying for.",
    href: "/demo/loop",
    metric: { value: "40%", label: "drop-off at plan selection · directional (5)" },
    tags: ["Enrollment", "Directional", "Health insurance"],
    accent: "#EF4444",
  },
];
