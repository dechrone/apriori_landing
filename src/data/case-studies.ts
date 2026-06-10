/* ═══════════════════════════════════════════════════════════════════════════
   CASE STUDIES MANIFEST
   ─────────────────────────────────────────────────────────────────────────
   Static manifest powering the public `/case-studies` gallery. Each entry
   points at an existing frozen founder-demo report page (under `/demo/*` or
   `/simulations/*`). Curated — only polished, presentable studies live here.
   To add a study: build its report page, drop assets in `public/`, append an
   entry below. No DB query; these reports are hand-frozen, not user runs.
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
  /** Sector framing, e.g. "Fintech · Stock investing". */
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
  /** Optional thumbnail from `public/`. */
  thumbnail?: string;
  /** Card accent (hex). */
  accent: string;
  /** Optional per-variant deep-dive links surfaced under the card. */
  variants?: CaseStudyVariant[];
}

export const CASE_STUDIES: CaseStudy[] = [
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
    slug: "savesage-pricing",
    client: "SaveSage",
    category: "Fintech · Credit-card advisory",
    title: "Pricing a new advisory subscription",
    summary:
      "Four price-and-framing variants for SaveSage Pro — from a ₹99 lowball to a ₹399 sticker with cashback — tested against credit-card-savvy personas to isolate the tier that maximizes revenue per signup without crushing conversion.",
    href: "/simulations/savesage/1ef345g7hjklo9",
    metric: { value: "4×", label: "price points stress-tested" },
    tags: ["A/B test", "Pricing", "Revenue / signup"],
    thumbnail: "/savesage/var1-pro.png",
    accent: "#0D9488",
  },
];
