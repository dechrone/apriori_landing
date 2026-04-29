"use client";

import { Check, Sparkles, Zap } from "lucide-react";
import { TopBar } from "@/components/app/TopBar";
import { useAppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/Button";
import { useCreditProfile } from "@/lib/credits";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "alpha@apriori.work";

interface Tier {
  id: "free" | "pro" | "custom";
  name: string;
  price: string;
  cadence: string;
  description: string;
  credits: string;
  personas: string;
  highlight?: boolean;
  features: string[];
  cta: string;
}

const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    cadence: "forever",
    description:
      "Run 5 single-screen A/B tests every month. No card required.",
    credits: "200 credits / month",
    personas: "5 free A/B runs · 20 personas each",
    features: [
      "200 credits every month",
      "5 single-screen A/B runs (20 personas × 2 screens)",
      "Full friction + segment analysis",
      "Curated audience templates (IN + US)",
    ],
    cta: "Current plan",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    cadence: "per month",
    description:
      "For product teams shipping weekly. Headroom for full-flow A/B and bigger cohorts.",
    credits: "2,500 credits / month",
    personas: "~60 single-screen A/Bs or ~12 full-flow runs",
    highlight: true,
    features: [
      "2,500 credits every month",
      "Full-flow A/B with business-impact translation",
      "Priority LLM queue during load",
      "Email support",
    ],
    cta: "Contact sales to upgrade",
  },
  {
    id: "custom",
    name: "Custom",
    price: "Let's talk",
    cadence: "annual",
    description:
      "For orgs running landmark studies or integrating Apriori into their own tooling.",
    credits: "Custom credit pool",
    personas: "Landmark runs (100+ personas) / unlimited comparators",
    features: [
      "Everything in Pro",
      "Dedicated persona cohorts, cached and versioned",
      "Figma → simulation automation",
      "SSO, custom data residency, SLA",
      "Dedicated onboarding",
    ],
    cta: "Talk to us",
  },
];

function TierCard({ tier, activePlan }: { tier: Tier; activePlan: string }) {
  const isCurrent = activePlan === tier.id;
  const subject = encodeURIComponent(`Apriori ${tier.name} plan enquiry`);
  const body = encodeURIComponent(
    `Hi Apriori team,\n\nI'd like to know more about the ${tier.name} plan.\n\nSent from the pricing page`,
  );

  const ctaHref =
    tier.id === "free"
      ? undefined
      : `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <div
      className={`relative flex flex-col rounded-[20px] border bg-white p-7 ${
        tier.highlight
          ? "border-[#1F2937] shadow-[0_12px_32px_rgba(31, 41, 55,0.18)]"
          : "border-[#E8E4DE]"
      }`}
    >
      {tier.highlight && (
        <div className="absolute -top-3 left-7 flex items-center gap-1.5 rounded-full bg-[#1F2937] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          <Sparkles className="w-3 h-3" />
          Most popular
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-[20px] font-bold text-[#1A1A1A]">{tier.name}</h3>
        <p className="mt-1 text-[13px] text-[#6B7280]">{tier.description}</p>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-bold text-[#1A1A1A] leading-none">
            {tier.price}
          </span>
          <span className="text-[13px] text-[#9CA3AF]">/ {tier.cadence}</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#374151]">
          <Zap className="w-3.5 h-3.5 text-[#1F2937]" />
          <span className="font-medium">{tier.credits}</span>
          <span className="text-[#9CA3AF]">·</span>
          <span className="text-[#6B7280]">{tier.personas}</span>
        </div>
      </div>

      <ul className="mb-6 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-[#374151]">
            <Check className="w-4 h-4 flex-shrink-0 text-[#10B981] mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Button variant="secondary" disabled className="w-full">
          Current plan
        </Button>
      ) : ctaHref ? (
        <a href={ctaHref}>
          <Button
            className="w-full"
            variant={tier.highlight ? "primary" : "secondary"}
          >
            {tier.cta}
          </Button>
        </a>
      ) : (
        <Button variant="secondary" disabled className="w-full">
          {tier.cta}
        </Button>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { toggleMobileMenu } = useAppShell();
  const { profile } = useCreditProfile();
  const activePlan = profile?.plan ?? "free";

  return (
    <>
      <TopBar
        title="Pricing"
        breadcrumb="Account"
        onMenuClick={toggleMobileMenu}
      />
      <div className="p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-8 max-w-[640px]">
            <h2 className="text-[28px] font-bold text-[#1A1A1A] leading-tight">
              Simple, usage-based pricing.
            </h2>
            <p className="mt-2 text-[15px] text-[#6B7280]">
              1 credit = 1 persona on 1 screen. A single-screen A/B with 20
              personas across two variants is 40 credits, and the free tier
              gives you 200 credits a month, enough for five A/B runs.
            </p>
          </div>

          {profile && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8E4DE] bg-white px-4 py-2 text-[13px] text-[#374151]">
              <Zap className="w-3.5 h-3.5 text-[#1F2937]" />
              <span className="font-medium">
                {profile.credits_remaining} / {profile.credits_total}
              </span>
              <span className="text-[#9CA3AF]">
                credits remaining on the {profile.plan} plan
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <TierCard key={tier.id} tier={tier} activePlan={activePlan} />
            ))}
          </div>

          <div className="mt-10 rounded-[16px] border border-[#E8E4DE] bg-[#FDFBF7] p-6">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">
              How credits work
            </h3>
            <ul className="mt-3 space-y-2 text-[13px] text-[#374151]">
              <li>
                <span className="font-medium">1 credit = 1 persona × 1 screen.</span>{" "}
                Charge scales with the work you actually run.
              </li>
              <li>
                <span className="font-medium">Single-screen A/B</span> on 20
                personas across two variants is 20 × 2 = 40 credits.
              </li>
              <li>
                <span className="font-medium">Full-flow A/B</span> charges per
                screen in each flow, 20 personas across two 5-screen flows is
                20 × 10 = 200 credits.
              </li>
              <li>
                <span className="font-medium">Refunds</span> are automatic if a
                run fails before any persona finishes simulating.
              </li>
              <li>
                Need something different?{" "}
                <a
                  className="font-medium text-[#1F2937] hover:underline"
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Apriori custom plan",
                  )}`}
                >
                  Email us
                </a>{" "}
                and we&apos;ll put together a volume quote within a day.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
