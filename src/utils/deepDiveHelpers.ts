import type {
  ScoreLevel,
  FrictionCategory,
  FrictionPattern,
  ScreenSummary,
  JourneyNode,
} from "@/types/deepDive";
import type { PersonaDetail } from "@/types/flow-analysis";

// ─── Score helpers ───────────────────────────────────────────────────────────

/** 1–4 → "low", 5–6 → "mid", 7–10 → "high" */
export function getScoreLevel(score: number): ScoreLevel {
  if (score <= 4) return "low";
  if (score <= 6) return "mid";
  return "high";
}

export const SCORE_STYLES: Record<
  ScoreLevel,
  { bar: string; text: string; label: string }
> = {
  low: { bar: "bg-red-500", text: "text-red-600", label: "Concerned" },
  mid: { bar: "bg-amber-400", text: "text-amber-600", label: "Cautious" },
  high: { bar: "bg-green-500", text: "text-green-600", label: "Confident" },
};

// ─── Persona helpers ─────────────────────────────────────────────────────────

/** Deterministic avatar color from name — same name always same color */
export function getAvatarColor(name: string): string {
  const colors = [
    "#2563eb",
    "#7c3aed",
    "#0d9488",
    "#d97706",
    "#db2777",
    "#059669",
    "#dc2626",
    "#0369a1",
  ];
  const hash = name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

/** "dropped_off_at_view_3" → { type: "dropoff", screen: "S3" } */
export function parseOutcome(outcome: string) {
  const match = outcome.match(/dropped_off_at_view_(\d+)/);
  if (match) return { type: "dropoff" as const, screen: `S${match[1]}` };
  return { type: "completed" as const };
}

/** 28000 → "₹28k" */
export function formatIncome(n: number): string {
  return `₹${Math.round(n / 1000)}k`;
}

/** Extract a first name from the professional_background (first word that looks like a name) */
export function getFirstName(fullName: string): string {
  return fullName.trim().split(" ")[0];
}

/** "Anxious, Cautious" → "Anxious" */
export function getTopEmotion(emotionalState: string): string {
  return emotionalState.split(",")[0].trim();
}

export function getArchetypeIcon(archetype: string): string {
  const map: Record<string, string> = {
    "The Pragmatist": "⚙️",
    "The Confused Novice": "🌱",
    "The Skeptic": "🔎",
    "The Early Adopter": "🚀",
    "The Cautious Planner": "📋",
  };
  return map[archetype] ?? "👤";
}

/** First 2 sentences of professional_background — used as behavioral summary */
export function getBehaviorSummary(background: string): string {
  return background
    .split(/(?<=[.!?])\s/)
    .slice(0, 2)
    .join(" ");
}

/** Extract name from professional_background — first capitalized word */
export function extractName(persona: PersonaDetail): string {
  // Try to extract name from the first sentence of professional_background
  const bg = persona.professional_background;
  const match = bg.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  if (match) return match[1];
  return persona.persona_uuid.slice(0, 8);
}

// ─── Friction helpers ─────────────────────────────────────────────────────────

const TRUST_KEYWORDS = [
  "scam",
  "fraud",
  "secure",
  "security",
  "trust",
  "sebi",
  "rbi",
  "bank",
  "logo",
  "brand",
  "identity",
  "company",
  "partner",
  "data",
  "privacy",
  "pan",
  "personal",
  "credential",
  "government seal",
  "government",
  "seal",
];
const CLARITY_KEYWORDS = [
  "jargon",
  "lamf",
  "emi",
  "interest",
  "rate",
  "tenure",
  "amount",
  "eligib",
  "explain",
  "understand",
  "unclear",
  "confus",
  "not shown",
  "missing",
  "no mention",
  "what is",
  "instalment",
  "monthly",
];

export function categorizeFriction(text: string): FrictionCategory {
  const t = text.toLowerCase();
  if (TRUST_KEYWORDS.some((k) => t.includes(k))) return "trust";
  if (CLARITY_KEYWORDS.some((k) => t.includes(k))) return "clarity";
  return "ux";
}

export const FRICTION_CONFIG: Record<
  FrictionCategory,
  {
    label: string;
    icon: string;
    borderClass: string;
    bgClass: string;
    textClass: string;
  }
> = {
  trust: {
    label: "Trust & Safety",
    icon: "🛡",
    borderClass: "border-l-2 border-red-400",
    bgClass: "bg-red-50",
    textClass: "text-red-800",
  },
  clarity: {
    label: "Clarity & Comprehension",
    icon: "🔍",
    borderClass: "border-l-2 border-amber-400",
    bgClass: "bg-amber-50",
    textClass: "text-amber-800",
  },
  ux: {
    label: "UX & Flow",
    icon: "🖱",
    borderClass: "border-l-2 border-blue-400",
    bgClass: "bg-blue-50",
    textClass: "text-blue-800",
  },
};

// ─── Screen label helpers ─────────────────────────────────────────────────────

/** Shorten a view_name to a compact label (max 10 chars) for timeline nodes */
export function getScreenShortLabel(viewName: string): string {
  const cleaned = viewName
    .replace(/\s*\(Step.*\)/, "")
    .replace(/–.*/, "")
    .trim();
  return cleaned.length > 10 ? cleaned.slice(0, 10).trim() + "…" : cleaned;
}

/** Emotion color for timeline node labels (plain text, not pill) */
export function getNodeEmotionColor(emotion: string): string {
  const e = emotion.toLowerCase();
  if (
    ["anxious", "terrified", "overwhelmed", "alarmed", "distrustful"].some(
      (k) => e.includes(k)
    )
  )
    return "text-red-500";
  if (
    ["cautious", "suspicious", "frustrated", "hesitant"].some((k) =>
      e.includes(k)
    )
  )
    return "text-amber-500";
  return "text-slate-400";
}

// ─── Screen summary ───────────────────────────────────────────────────────────

/**
 * Derives all unique screen IDs and labels from personas,
 * then computes drop-off counts and average scores per screen.
 */
export function buildScreenSummaries(
  personas: PersonaDetail[]
): ScreenSummary[] {
  // Collect all unique screens in order of first appearance
  const screenMap = new Map<string, string>();
  personas.forEach((p) =>
    p.screen_monologues.forEach((s) => {
      if (!screenMap.has(s.screen_id)) {
        // Build a short label: "view_1" → "S1 · KYC"
        const num = s.screen_id.replace("view_", "");
        const shortName = s.view_name
          .replace(/\s*\(Step.*\)/, "")
          .replace(/–.*/, "")
          .trim();
        screenMap.set(s.screen_id, `S${num} · ${shortName}`);
      }
    })
  );

  return Array.from(screenMap.entries()).map(([screenId, screenLabel]) => {
    const visits = personas
      .flatMap((p) => p.screen_monologues)
      .filter((s) => s.screen_id === screenId);

    const avg = (arr: number[]) =>
      arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    return {
      screenId,
      screenLabel,
      dropOffCount: visits.filter((v) => v.decision_outcome === "DROP_OFF")
        .length,
      totalPersonas: visits.length,
      avgTrust: avg(visits.map((v) => v.trust_score)),
      avgClarity: avg(visits.map((v) => v.clarity_score)),
    };
  });
}

// ─── Journey nodes ────────────────────────────────────────────────────────────

export function buildJourneyNodes(persona: PersonaDetail): JourneyNode[] {
  return persona.screen_monologues.map((sm) => ({
    screenId: sm.screen_id,
    screenLabel: sm.view_name.replace(/\s*\(Step.*\)/, ""),
    trustScore: sm.trust_score,
    clarityScore: sm.clarity_score,
    timeSeconds: sm.time_seconds,
    topEmotion: getTopEmotion(sm.emotional_state),
    outcome: sm.decision_outcome,
    monologue: sm,
  }));
}

// ─── Pattern aggregation ──────────────────────────────────────────────────────

const PATTERN_SEEDS = [
  {
    id: "no-brand",
    title: "No brand identity before data collection",
    keywords: ["logo", "brand", "company", "bank name", "who are"],
  },
  {
    id: "no-sebi",
    title: "No regulatory badge (SEBI/RBI)",
    keywords: ["sebi", "rbi", "regulated", "approval", "government seal"],
  },
  {
    id: "pan-early",
    title: "PAN requested before trust is established",
    keywords: ["pan", "personal detail", "private", "risky"],
  },
  {
    id: "no-emi",
    title: "EMI / monthly payment not shown",
    keywords: ["emi", "monthly", "installment", "payment", "kist"],
  },
  {
    id: "lamf-jargon",
    title: "LAMF jargon unexplained",
    keywords: ["lamf"],
  },
  {
    id: "otp-timer",
    title: "OTP countdown timer creates pressure",
    keywords: ["timer", "countdown", "otp", "pressure", "hurried"],
  },
  {
    id: "slider-mismatch",
    title: "Slider max contradicts eligibility amount",
    keywords: ["slider", "contradict", "mismatch", "different", "5,70"],
  },
  {
    id: "large-amount",
    title: "Loan amount shown is alarming / feels like a trap",
    keywords: ["trap", "too much", "scary", "lakh", "alarming"],
  },
];

export function aggregateFrictionPatterns(
  personasOnScreen: Array<{ uuid: string; frictionPoints: string[] }>
): FrictionPattern[] {
  const total = personasOnScreen.length;

  return PATTERN_SEEDS.map((seed) => {
    const matching = personasOnScreen.filter((p) =>
      p.frictionPoints.some((fp) =>
        seed.keywords.some((kw) => fp.toLowerCase().includes(kw))
      )
    );
    return {
      id: seed.id,
      title: seed.title,
      category: categorizeFriction(seed.title),
      count: matching.length,
      total,
      personaUuids: matching.map((p) => p.uuid),
      description: `Raised by ${matching.length} of ${total} personas on this screen.`,
    };
  })
    .filter((p) => p.count >= 2)
    .sort((a, b) => b.count - a.count);
}
