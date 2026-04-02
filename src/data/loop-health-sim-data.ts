import type { SimulationData } from "@/types/simulation";

/**
 * Loop Health Healthflex — Insurance enrollment flow simulation data.
 * 5 synthetic Indian personas (3 completers, 2 drop-offs at plan_selection).
 * Used as sample/demo data for the simulation report UI.
 */
export const loopHealthSimData: SimulationData = {
  simulation_id: "lh-healthflex-sim-20260402-001",
  flow_id: "loop_health_healthflex_v1",
  flow_name: "Loop Health – Healthflex Insurance Enrollment",
  generated_at: "2026-04-02T11:30:00.000000+00:00",

  summary: {
    total_personas: 5,
    completed: 3,
    dropped_off: 2,
    completion_rate_pct: 60.0,
    avg_time_to_complete_seconds: 120,
    dominant_plan: "Gold",
    dominant_plan_pct: 66.7,
  },

  sample_quality: {
    sample_size: 5,
    margin_of_error_pct: 28.0,
    confidence_level: "80%",
    note: "Sample size of 5 is suitable only for early directional signal at 80% confidence (±28%). Increase to 30+ personas for actionable quantitative insights.",
  },

  plan_distribution: {
    Gold: { count: 2, pct: 66.7 },
    Silver: { count: 1, pct: 33.3 },
  },

  addon_adoption: {
    with_addon: { count: 1, pct: 33.3 },
    skipped: { count: 2, pct: 66.7 },
  },

  funnel_drop_off: [
    { screen_id: "plan_selection", drop_offs: 2, drop_off_pct: 40.0 },
  ],

  top_friction_points: [
    {
      friction:
        "4-plan comparison grid overwhelms users with low digital literacy — no clear default or recommendation highlighted",
      frequency: 2,
    },
    {
      friction:
        "Annual pricing displayed without monthly breakdown makes costs feel prohibitively large",
      frequency: 2,
    },
    {
      friction:
        "No employer-specific validation or co-pay information shown during plan selection",
      frequency: 1,
    },
    {
      friction:
        "Checkout page lacks a clear order summary — users unsure what exactly they are paying for",
      frequency: 1,
    },
  ],

  screen_metrics: {
    welcome: {
      avg_trust: 7.4,
      avg_clarity: 8.2,
      avg_value: 6.8,
      avg_time_s: 12,
      sample_size: 5,
    },
    features: {
      avg_trust: 7.0,
      avg_clarity: 7.6,
      avg_value: 7.2,
      avg_time_s: 18,
      sample_size: 5,
    },
    registration_intro: {
      avg_trust: 6.8,
      avg_clarity: 7.4,
      avg_value: 6.4,
      avg_time_s: 15,
      sample_size: 5,
    },
    plan_selection: {
      avg_trust: 5.2,
      avg_clarity: 4.6,
      avg_value: 5.8,
      avg_time_s: 45,
      sample_size: 5,
    },
    addon_gold: {
      avg_trust: 6.8,
      avg_clarity: 7.0,
      avg_value: 6.2,
      avg_time_s: 14,
      sample_size: 2,
    },
    addon_silver: {
      avg_trust: 6.5,
      avg_clarity: 6.8,
      avg_value: 6.0,
      avg_time_s: 16,
      sample_size: 1,
    },
    checkout_gold: {
      avg_trust: 7.2,
      avg_clarity: 6.8,
      avg_value: 7.0,
      avg_time_s: 20,
      sample_size: 2,
    },
    checkout_silver: {
      avg_trust: 7.0,
      avg_clarity: 6.5,
      avg_value: 6.8,
      avg_time_s: 22,
      sample_size: 1,
    },
  },

  executive_summary:
    "60% completion rate. The single biggest barrier is plan selection — users with digital literacy below 5 can't parse the 4-plan comparison grid, causing 100% drop-off from the low-literacy segment. Urban tech-savvy professionals breeze through, but the flow effectively locks out semi-urban, lower-income users who would benefit most from employer health coverage.",

  usability_findings: [
    {
      severity: "critical",
      type: "task_failure",
      screen: "plan_selection",
      finding:
        "4-way plan comparison grid causes complete task failure for low-literacy users",
      evidence:
        "Both semi-urban personas (digital_literacy 3–4) abandoned the flow at plan_selection. Neither could determine which plan their employer covers or parse the feature matrix.",
      affected_segments: ["The Skeptic", "The Confused Novice"],
      recommendation:
        "Replace the 4-plan grid with a 2-step flow: first ask employer name to pre-filter eligible plans, then show a maximum of 2 recommended options with a clear 'Best for you' badge.",
    },
    {
      severity: "major",
      type: "trust_issue",
      screen: "checkout_gold",
      finding:
        "Checkout page shows annual lump-sum price without monthly equivalent, triggering sticker shock",
      evidence:
        "Ankit paused for 8 seconds at checkout when seeing ₹19,894/year. He mentally divided to confirm it's ~₹1,658/month before proceeding. Users with lower numeracy may not do this calculation.",
      affected_segments: ["The Pragmatist", "The Enthusiast"],
      recommendation:
        "Display both ₹/year and ₹/month pricing prominently. Add a 'That's just ₹X/day' anchor to reduce perceived cost.",
    },
    {
      severity: "minor",
      type: "confusion",
      screen: "features",
      finding:
        "Features page lists 12 benefits in a dense bullet list without categorization",
      evidence:
        "Priya skimmed the features page in 14 seconds, admitting she 'didn't read most of them'. Ramesh spent 22 seconds but reported feeling overwhelmed.",
      affected_segments: [
        "The Enthusiast",
        "The Skeptic",
        "The Confused Novice",
      ],
      recommendation:
        "Group features into 3 categories (Coverage, Convenience, Savings) with icons and show top 3 by default with an expandable 'See all' section.",
    },
  ],

  segment_analysis: {
    summary:
      "Clear digital-literacy divide: all 3 urban professionals (digital literacy 7–8) completed enrollment, while both semi-urban users (digital literacy 3–4) dropped off at plan selection. Income is a secondary factor — even Vikram (₹95K/mo) needed plan comparison clarity, but his literacy carried him through.",
    high_propensity_segment:
      "Urban tech professionals (ages 28–35, digital literacy 7+, income ₹85K+) — 100% conversion. They parse comparison tables quickly, trust digital insurance platforms, and make fast plan decisions.",
    low_propensity_segment:
      "Semi-urban low-literacy users (ages 35–45, digital literacy 3–4, income ₹28–35K) — 0% conversion. They need guided plan selection, employer validation, and simplified pricing to engage.",
  },

  flow_assessment: {
    overall_verdict:
      "The Healthflex enrollment flow works well for digitally literate urban users but completely fails the semi-urban, lower-income segment that employer health insurance is designed to reach. Plan selection is the critical chokepoint — it presents 4 undifferentiated options without guidance, employer context, or simplified pricing. Fixing this single screen could lift completion from 60% to an estimated 80%+.",
    what_works: [
      {
        element: "Welcome screen trust signals",
        why: "Loop Health branding and 'trusted by X companies' badge immediately establishes credibility",
        for_whom: "All segments",
      },
      {
        element: "Clean registration intro",
        why: "Minimal fields and clear progress indicator reduce perceived effort",
        for_whom: "All segments, especially low-literacy users who passed this screen",
      },
      {
        element: "Add-on selection simplicity",
        why: "Binary yes/no choice with clear pricing delta is easy to process",
        for_whom: "All completers",
      },
    ],
    what_needs_fixing: [
      {
        element: "Plan comparison grid",
        problem:
          "4 plans presented in a dense feature matrix with no recommendation or employer context",
        for_whom: "The Skeptic, The Confused Novice",
        fix: "Pre-filter by employer, surface max 2 options with a 'Recommended' badge",
        priority: "P0",
      },
      {
        element: "Checkout pricing display",
        problem: "Annual-only pricing triggers sticker shock",
        for_whom: "All segments, especially lower-income personas",
        fix: "Show ₹/month alongside ₹/year; add daily cost anchor",
        priority: "P1",
      },
      {
        element: "Features page density",
        problem: "12 unstructured benefits cause information overload",
        for_whom: "The Enthusiast, The Confused Novice",
        fix: "Categorize into 3 groups, show top 3 by default",
        priority: "P2",
      },
    ],
    usability_score: 6,
    emotional_journey_map: {
      completers:
        "Curious → Interested → Briefly Overwhelmed (plan selection) → Confident (after choosing) → Satisfied (checkout). Trust builds linearly from welcome through registration, dips at plan selection, then recovers when a plan is chosen.",
      drop_offs:
        "Curious → Interested → Anxious (plan selection) → Confused → Frustrated → Abandoned. Trust collapses at plan selection when users can't determine which plan applies to them. Emotional state shifts from 'I want this' to 'I don't understand this' within 30 seconds.",
    },
    cognitive_load_assessment: [
      {
        screen_id: "welcome",
        load_level: "low",
        reason:
          "Single CTA, clean branding, minimal text. All personas processed it in under 15 seconds.",
      },
      {
        screen_id: "plan_selection",
        load_level: "very high",
        reason:
          "4-plan comparison with 8+ feature rows, no defaults, no employer filtering. Cognitive load exceeds capacity for users with digital literacy below 5.",
      },
      {
        screen_id: "checkout_gold",
        load_level: "moderate",
        reason:
          "Annual pricing requires mental math to evaluate monthly affordability. Missing order summary adds uncertainty.",
      },
    ],
  },

  drop_off_analysis: {
    top_n_screens: 1,
    total_drop_offs_analyzed: 2,
    screens: {
      plan_selection: {
        total_drop_offs: 2,
        clusters: [
          {
            cluster_id: 0,
            label: "Decision paralysis from too many plans",
            persona_count: 1,
            representative_reasoning:
              "I see Base, Silver, Gold, Platinum but I have no idea what the difference is in practical terms. The feature comparison table has too many rows and I can't figure out which plan is right for my family size and budget. I'll come back when someone explains this to me.",
            sample_reasonings: [
              "I see Base, Silver, Gold, Platinum but I have no idea what the difference is in practical terms. The feature comparison table has too many rows and I can't figure out which plan is right for my family size and budget.",
            ],
          },
          {
            cluster_id: 1,
            label: "Trust deficit — no employer validation",
            persona_count: 1,
            representative_reasoning:
              "I don't know which of these plans my employer will reimburse. Gold costs ₹19,894 per year — that's more than half my monthly salary. Without confirmation from HR that this is the right plan, I'm not committing my money. I'll ask my company first.",
            sample_reasonings: [
              "Without knowing what my company covers, I'm not going to commit to anything. I'll ask HR first and come back.",
            ],
          },
        ],
      },
    },
  },

  persona_details: [
    // ── Persona 1: Ankit Sharma (Completer — Gold) ──────────────────────────
    {
      persona_uuid: "lh-persona-ankit-sharma-001",
      demographics: {
        first_language: "Hindi",
        age: 32,
        occupation: "Software Engineer",
        district: "Bengaluru Urban",
        behavioral_archetype: "The Pragmatist",
        digital_literacy: 8,
        monthly_income_inr: 120000,
      },
      professional_background:
        "Senior backend engineer at a Series C startup. Manages a team of 4. Comfortable with SaaS products and digital payments. Has existing term insurance but no comprehensive health cover.",
      cultural_background:
        "Hindi-speaking North Indian settled in Bengaluru for 6 years. Nuclear family with wife and one child. Parents in Jaipur rely on government health scheme. Values efficiency and data-driven decisions.",
      outcome: "completed",
      key_selections: {
        plan: "Gold",
        addon: "Critical Illness Rider",
      },
      final_price_inr: 22480,
      total_time_seconds: 105,
      overall_monologue:
        "Straightforward flow. I compared Gold and Platinum, decided Gold gives me 90% of the coverage at 60% of the price. The critical illness rider is a no-brainer at ₹2,586 extra. Would have liked to see my employer's contribution breakdown upfront, but I know from HR that they cover 50% of Gold.",
      screen_monologues: [
        {
          screen_id: "welcome",
          view_name: "Welcome",
          internal_monologue:
            "Clean landing page. Loop Health — I've heard of them, they handle our company's group insurance. The 'trusted by 500+ companies' badge checks out. Let me get started.",
          reasoning:
            "Brand recognition and social proof established trust immediately. Clear single CTA reduces decision overhead.",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 7,
          time_seconds: 8,
        },
        {
          screen_id: "features",
          view_name: "Features Overview",
          internal_monologue:
            "Cashless hospitals, no waiting period for day-1 conditions, mental health coverage — these are the things I care about. The list is long but I'm scanning for what matters to me. Good enough, moving on.",
          reasoning:
            "Quickly identified 3 relevant features from the list. Dense content didn't slow him down due to high digital literacy and scanning skills.",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 14,
        },
        {
          screen_id: "registration_intro",
          view_name: "Registration Introduction",
          internal_monologue:
            "Name, email, employee ID — standard stuff. I like that they're not asking for Aadhaar or PAN at this stage. Progress bar shows I'm 40% done. Quick.",
          reasoning:
            "Minimal data collection at this stage builds trust. Clear progress indicator sets expectations.",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 12,
        },
        {
          screen_id: "plan_selection",
          view_name: "Plan Selection",
          internal_monologue:
            "Four plans: Base at ₹8,900, Silver at ₹14,200, Gold at ₹19,894, Platinum at ₹31,500. I'm comparing coverage limits and network hospitals. Gold gives ₹10L cover with 5,000+ hospitals — that's the sweet spot. Platinum's ₹20L cover is overkill for my age. Going with Gold.",
          reasoning:
            "Systematically compared price-to-coverage ratio across plans. High numeracy allowed quick mental calculation of value per rupee.",
          emotional_state: "focused",
          friction_points: [
            "Would prefer to see employer co-pay amount alongside each plan price",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 35,
          selected_choice: "Gold",
        },
        {
          screen_id: "addon_gold",
          view_name: "Add-on Selection (Gold)",
          internal_monologue:
            "Critical Illness Rider for ₹2,586/year covers cancer, heart attack, stroke — 25 conditions total. That's ₹215/month for catastrophic coverage. My father had a heart scare last year. Adding this.",
          reasoning:
            "Personal family health history made the critical illness rider emotionally resonant. Low incremental cost relative to perceived catastrophic protection value.",
          emotional_state: "decisive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 12,
          selected_choice: "Critical Illness Rider",
        },
        {
          screen_id: "checkout_gold",
          view_name: "Checkout (Gold)",
          internal_monologue:
            "Total: ₹22,480/year. That's about ₹1,873/month. My employer covers 50%, so I'm paying ₹937/month out of pocket. Worth it for the coverage. Payment options — UPI or card. Going with UPI. Done.",
          reasoning:
            "Quick mental math on monthly cost. Prior knowledge of employer contribution made the price acceptable. Familiar payment methods reduced checkout friction.",
          emotional_state: "satisfied",
          friction_points: [
            "Annual lump-sum price shown first — had to manually calculate monthly cost",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 24,
        },
      ],
    },

    // ── Persona 2: Priya Nair (Completer — Silver) ──────────────────────────
    {
      persona_uuid: "lh-persona-priya-nair-002",
      demographics: {
        first_language: "Malayalam",
        age: 28,
        occupation: "Marketing Manager",
        district: "Mumbai Urban",
        behavioral_archetype: "The Enthusiast",
        digital_literacy: 7,
        monthly_income_inr: 85000,
      },
      professional_background:
        "Brand marketing manager at a D2C beauty startup. Active on social media, comfortable with digital products. Currently on parents' family floater policy, wants independent cover.",
      cultural_background:
        "Malayali raised in Mumbai. Lives alone in Andheri. Health-conscious — does yoga, tracks calories. Parents in Kochi are both retired teachers with LIC Mediclaim.",
      outcome: "completed",
      key_selections: {
        plan: "Silver",
        addon: "none",
      },
      final_price_inr: 14200,
      total_time_seconds: 118,
      overall_monologue:
        "Loved the branding and the features page. Plan selection was a bit much — four options felt like two too many. I went with Silver because Gold felt like paying for coverage I won't use at 28. Skipped the add-on because I'm already healthy. The whole thing took about 2 minutes, which is fine.",
      screen_monologues: [
        {
          screen_id: "welcome",
          view_name: "Welcome",
          internal_monologue:
            "Oh this looks clean! The Loop Health branding feels modern and trustworthy. 'Healthflex' — nice name. The illustration of a family is a bit generic but the overall vibe is good. Let me explore.",
          reasoning:
            "Visual design and brand aesthetics resonate strongly with marketing-oriented persona. Positive first impression drives engagement.",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 7,
          time_seconds: 10,
        },
        {
          screen_id: "features",
          view_name: "Features Overview",
          internal_monologue:
            "Mental health coverage — yes! That's progressive. Teleconsultation included. Cashless at 5,000 hospitals. I'm not going to read all 12 points but the top ones matter to me. Moving on.",
          reasoning:
            "Selectively engaged with features that match personal values (mental health, telehealth). Comfortable skipping dense content.",
          emotional_state: "enthusiastic",
          friction_points: [
            "12 bullet points is too many — started skimming after the 4th",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 14,
        },
        {
          screen_id: "registration_intro",
          view_name: "Registration Introduction",
          internal_monologue:
            "Simple form. Name, email, company. I appreciate that they're not asking for my phone number yet — so many Indian apps demand OTP verification upfront. This feels respectful of my time.",
          reasoning:
            "Low-friction registration matches expectation for modern SaaS products. Absence of phone number request noted positively.",
          emotional_state: "pleased",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 14,
        },
        {
          screen_id: "plan_selection",
          view_name: "Plan Selection",
          internal_monologue:
            "Okay, four plans. Base seems too basic — ₹3L cover won't even cover a decent hospital stay in Mumbai. Silver at ₹14,200 gives ₹7L cover which should be fine for a single 28-year-old. Gold is tempting but ₹19,894 is a stretch this month. I'll go Silver.",
          reasoning:
            "Evaluated plans against personal health risk profile (young, single, healthy). Made a value-based trade-off favoring Silver's price-to-coverage ratio for her life stage.",
          emotional_state: "thoughtful",
          friction_points: [
            "Wished there was a 'Recommended for you' tag based on age and family size",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 40,
          selected_choice: "Silver",
        },
        {
          screen_id: "addon_silver",
          view_name: "Add-on Selection (Silver)",
          internal_monologue:
            "Critical Illness Rider for ₹2,100/year. I'm 28 and healthy. I do yoga 4 times a week. I'll skip this for now — can always add it later if needed. The option to add later is reassuring.",
          reasoning:
            "Low perceived risk at age 28 combined with active lifestyle made the add-on feel unnecessary. Availability of future enrollment reduced urgency.",
          emotional_state: "casual",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 16,
        },
        {
          screen_id: "checkout_silver",
          view_name: "Checkout (Silver)",
          internal_monologue:
            "₹14,200/year for Silver. That's about ₹1,183/month. My company pays part of this through the flex wallet, so my actual cost should be around ₹600/month. Totally doable. Paying via UPI.",
          reasoning:
            "Mental arithmetic on monthly cost plus employer subsidy made the price clearly affordable. UPI as default payment method matches daily payment habits.",
          emotional_state: "satisfied",
          friction_points: [
            "No clear breakdown showing employer vs. employee contribution split",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 24,
        },
      ],
    },

    // ── Persona 3: Ramesh Yadav (Drop-off at plan_selection) ────────────────
    {
      persona_uuid: "lh-persona-ramesh-yadav-003",
      demographics: {
        first_language: "Hindi",
        age: 45,
        occupation: "Government Clerk",
        district: "Lucknow Semi-Urban",
        behavioral_archetype: "The Skeptic",
        digital_literacy: 4,
        monthly_income_inr: 35000,
      },
      professional_background:
        "Senior clerk at a UP state government office for 18 years. Uses smartphone primarily for WhatsApp and YouTube. Wife manages the family UPI payments. Has CGHS (government health scheme) but employer is offering supplementary Healthflex cover.",
      cultural_background:
        "Conservative Hindi-speaking family in Lucknow. Joint family with parents, wife, and two school-age children. Highly risk-averse with money — prefers post office FDs over mutual funds. Trusts government schemes over private insurance.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 92,
      overall_monologue:
        "I was interested because my office is offering this, but when I reached the plan page I had no idea which one to pick. There are four options and the comparison table has tiny text and too many rows. I don't know if my department will pay for Gold or if I'm stuck with Base. ₹19,894 for Gold is more than half my monthly salary — I can't risk that without confirmation from the accounts section. I'll ask Sharma-ji in HR on Monday.",
      screen_monologues: [
        {
          screen_id: "welcome",
          view_name: "Welcome",
          internal_monologue:
            "My office sent this link on the WhatsApp group. 'Loop Health Healthflex' — never heard of this company. But if the department is recommending it, it must be legitimate. Let me see what this is about.",
          reasoning:
            "Employer endorsement provides initial trust despite unfamiliarity with the brand. WhatsApp as distribution channel is familiar and non-threatening.",
          emotional_state: "cautious",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 15,
        },
        {
          screen_id: "features",
          view_name: "Features Overview",
          internal_monologue:
            "Cashless hospitals, teleconsultation, mental health… there's a lot here. I already have CGHS so I'm not sure what extra benefit this gives me. Some of these terms I don't fully understand — what is 'OPD cover with sub-limits'? I'll keep going and see the cost.",
          reasoning:
            "Existing government health coverage reduces perceived incremental value. Technical insurance jargon creates confusion for a user with limited insurance literacy.",
          emotional_state: "confused",
          friction_points: [
            "Insurance jargon like 'OPD cover with sub-limits' not explained",
            "No comparison with existing CGHS benefits to show incremental value",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 5,
          value_score: 5,
          time_seconds: 22,
        },
        {
          screen_id: "registration_intro",
          view_name: "Registration Introduction",
          internal_monologue:
            "Name, email, employee ID. Okay, I can fill this. My employee ID is on my ID card. Email — I'll use my Gmail. This is simple enough.",
          reasoning:
            "Simple form with familiar fields. Employee ID requirement reinforces that this is employer-sanctioned, maintaining trust.",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 18,
        },
        {
          screen_id: "plan_selection",
          view_name: "Plan Selection",
          internal_monologue:
            "I'm looking at four plans but I have no idea which one my employer will reimburse. Gold costs ₹19,894 per year — that's almost half my monthly salary. Without knowing what my company covers, I'm not going to commit to anything. Base is ₹8,900 but the coverage seems very low. The comparison table has so many rows — room rent limit, co-pay percentage, sub-limits… I don't understand half of these terms. I'll ask HR first and come back.",
          reasoning:
            "Combination of financial risk (high cost relative to salary), information overload (4 plans × 8+ feature rows), and missing employer context (no visibility into what the department covers) created an insurmountable barrier.",
          emotional_state: "frustrated",
          friction_points: [
            "No indication of which plan the employer covers or co-pays",
            "4-plan comparison grid is too complex for low digital literacy",
            "Annual pricing feels enormous relative to monthly salary",
          ],
          decision_outcome: "DROP_OFF",
          trust_score: 4,
          clarity_score: 3,
          value_score: 4,
          time_seconds: 37,
        },
      ],
    },

    // ── Persona 4: Meena Devi (Drop-off at plan_selection) ──────────────────
    {
      persona_uuid: "lh-persona-meena-devi-004",
      demographics: {
        first_language: "Hindi",
        age: 38,
        occupation: "School Teacher",
        district: "Patna Semi-Urban",
        behavioral_archetype: "The Confused Novice",
        digital_literacy: 3,
        monthly_income_inr: 28000,
      },
      professional_background:
        "Primary school teacher at a private school in Patna for 12 years. Uses smartphone for WhatsApp, Paytm, and watching cooking videos. Has never purchased insurance independently — currently covered under husband's employer policy.",
      cultural_background:
        "Hindi-speaking, from a middle-class family in Patna. Husband is a bank clerk. Two children in school. Family medical decisions are made jointly with husband. Uncomfortable making large financial commitments alone.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue:
        "The school principal shared this link and said we should all enroll. The first few screens were fine, but when I reached the plan page I froze. Base, Silver, Gold, Platinum — what's the difference? The table is in English and the font is small. ₹19,894 for Gold? That's almost my full salary! Even Base at ₹8,900 is a lot. I need to discuss this with my husband tonight before I spend anything. Also, I'm not sure if the school is paying part of this or if it's all from my salary.",
      screen_monologues: [
        {
          screen_id: "welcome",
          view_name: "Welcome",
          internal_monologue:
            "Our principal madam shared this in the teachers' group. 'Health insurance for all staff' she said. The page looks nice — there's a family picture and the Loop Health logo. I'll see what it offers.",
          reasoning:
            "Authority figure (school principal) endorsement provides strong initial trust. Visual design and family imagery create a welcoming first impression.",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 14,
        },
        {
          screen_id: "features",
          view_name: "Features Overview",
          internal_monologue:
            "Cashless treatment — that sounds good, we spent ₹45,000 from savings when my mother-in-law was hospitalised last year. Teleconsultation — I can talk to a doctor on phone? That would be convenient. There are many points here, I can't read all of them but the important ones sound beneficial.",
          reasoning:
            "Connected features to personal medical expense experience, creating emotional relevance. Selectively absorbed accessible benefits while skipping technical ones.",
          emotional_state: "interested",
          friction_points: [
            "Too many features listed — felt overwhelming",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 20,
        },
        {
          screen_id: "registration_intro",
          view_name: "Registration Introduction",
          internal_monologue:
            "My name, email, school employee number. I know all of these. The form is simple — only 3 fields. I can do this. Let me continue to see the plans and pricing.",
          reasoning:
            "Simple form with minimal fields matched her comfort level. Anticipation of seeing pricing motivates continuation.",
          emotional_state: "comfortable",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 16,
        },
        {
          screen_id: "plan_selection",
          view_name: "Plan Selection",
          internal_monologue:
            "Base, Silver, Gold, Platinum — four plans. The comparison table has tiny English text and I'm trying to understand the difference. Room rent limit, co-pay, maternity cover… I don't know what co-pay means. Gold is ₹19,894 per year — that is almost my entire monthly salary! Even the cheapest Base plan is ₹8,900. I don't know if the school is paying anything. I need to show this to my husband and decide together. I'm closing this for now.",
          reasoning:
            "Multiple compounding barriers: (1) English-only content in dense table format, (2) unfamiliar insurance terminology, (3) sticker shock from annual pricing relative to salary, (4) no employer contribution clarity, (5) cultural preference for joint family financial decisions.",
          emotional_state: "overwhelmed",
          friction_points: [
            "Dense comparison table with small English text",
            "Insurance jargon like 'co-pay' not explained",
            "No indication of employer contribution or subsidy",
            "Prices shown only as annual lump sums",
          ],
          decision_outcome: "DROP_OFF",
          trust_score: 5,
          clarity_score: 2,
          value_score: 5,
          time_seconds: 38,
        },
      ],
    },

    // ── Persona 5: Vikram Singh (Completer — Gold) ──────────────────────────
    {
      persona_uuid: "lh-persona-vikram-singh-005",
      demographics: {
        first_language: "Marathi",
        age: 35,
        occupation: "Sales Manager",
        district: "Pune Urban",
        behavioral_archetype: "The Pragmatist",
        digital_literacy: 7,
        monthly_income_inr: 95000,
      },
      professional_background:
        "Regional sales manager at a pharmaceutical company covering Maharashtra. Manages 12 medical representatives. Travels extensively across Pune, Nashik, and Aurangabad. Currently has a basic company medical policy but wants comprehensive family cover.",
      cultural_background:
        "Marathi-speaking, from a middle-class Pune family. Married with a 3-year-old daughter. Wife is a dentist with her own clinic. Pragmatic about money — calculates ROI on everything. Trusts brands recommended by his HR department.",
      outcome: "completed",
      key_selections: {
        plan: "Gold",
        addon: "none",
      },
      final_price_inr: 19894,
      total_time_seconds: 98,
      overall_monologue:
        "Solid flow, got it done in under 2 minutes. Gold plan at ₹19,894 is reasonable for the coverage — ₹10L with 5,000+ cashless hospitals is exactly what I need given how much I travel. Skipped the add-on because my wife already has critical illness cover through her clinic's association. Plan selection page could use a 'Compare 2 plans' toggle instead of showing all four — I only seriously considered Gold and Platinum.",
      screen_monologues: [
        {
          screen_id: "welcome",
          view_name: "Welcome",
          internal_monologue:
            "HR sent this yesterday with a deadline to enroll by Friday. Loop Health — I've seen their stall at the Pune Health Expo. Decent brand. Let me get through this quickly, I have a client call at 3.",
          reasoning:
            "HR deadline creates urgency. Prior brand exposure from industry event provides baseline trust. Time pressure drives efficient navigation.",
          emotional_state: "purposeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 8,
        },
        {
          screen_id: "features",
          view_name: "Features Overview",
          internal_monologue:
            "5,000+ cashless hospitals across India — important for me since I'm in Nashik and Aurangabad every other week. Day-1 coverage with no waiting period — good. Maternity cover — we might have a second child. I've seen enough, let me pick a plan.",
          reasoning:
            "Mapped features directly to personal lifestyle needs (travel, family planning). High digital literacy enabled quick scanning and feature extraction.",
          emotional_state: "engaged",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 12,
        },
        {
          screen_id: "registration_intro",
          view_name: "Registration Introduction",
          internal_monologue:
            "Standard employee enrollment form. I've done this for PF, ESIC, and three other company portals. Name, email, employee code — done in 15 seconds.",
          reasoning:
            "Familiarity with corporate enrollment forms from previous HR processes. Zero cognitive overhead.",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 10,
        },
        {
          screen_id: "plan_selection",
          view_name: "Plan Selection",
          internal_monologue:
            "Four plans. Let me compare Gold and Platinum since those are the only two worth considering for my family. Gold: ₹10L cover, ₹19,894/year. Platinum: ₹20L, ₹31,500/year. The extra ₹11,606 for Platinum gets me double the cover and international emergency cover. Tempting, but ₹10L is sufficient for India and I'm not travelling abroad. Gold it is.",
          reasoning:
            "Immediately filtered to 2 relevant options, ignoring Base and Silver. Conducted a focused cost-benefit analysis between Gold and Platinum. Rational decision based on coverage needs vs. lifestyle.",
          emotional_state: "analytical",
          friction_points: [
            "Four plans shown simultaneously — a 'Compare 2' toggle would be faster",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 32,
          selected_choice: "Gold",
        },
        {
          screen_id: "addon_gold",
          view_name: "Add-on Selection (Gold)",
          internal_monologue:
            "Critical Illness Rider — ₹2,586/year. My wife already has this through the Maharashtra Dental Association's group policy. No point duplicating. Skipping.",
          reasoning:
            "Existing spouse coverage made the add-on redundant. Quick, rational decision based on household-level insurance portfolio view.",
          emotional_state: "decisive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 8,
        },
        {
          screen_id: "checkout_gold",
          view_name: "Checkout (Gold)",
          internal_monologue:
            "₹19,894/year for Gold. That's ₹1,658/month. My company reimburses ₹15,000/year through the flex account, so my out-of-pocket is about ₹4,894/year — ₹408/month. Done deal. Paying now.",
          reasoning:
            "Immediate mental math on net cost after employer reimbursement. Low net monthly cost made the decision effortless. Strong purchase intent from the start.",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 18,
        },
      ],
    },
  ],

  // ── New Report Sections ──────────────────────────────────────────────────────

  segments_used: [
    "The Confused Novice",
    "The Enthusiast",
    "The Pragmatist",
    "The Skeptic",
  ],

  segment_screen_breakdown: {
    welcome: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Skeptic": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Confused Novice": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
    features: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Skeptic": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Confused Novice": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
    registration_intro: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Skeptic": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Confused Novice": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
    plan_selection: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "The Skeptic": { reached: 1, dropped_off: 1, drop_off_pct: 100 },
      "The Confused Novice": { reached: 1, dropped_off: 1, drop_off_pct: 100 },
    },
    addon_gold: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
    },
    addon_silver: {
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
    checkout_gold: {
      "The Pragmatist": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
    },
    checkout_silver: {
      "The Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
  },

  drop_off_monologues: {
    plan_selection: [
      {
        persona_uuid: "lh-persona-ramesh-yadav-003",
        persona_label: "Ramesh Yadav, 45, Government Clerk, Lucknow",
        behavioral_archetype: "The Skeptic",
        internal_monologue:
          "I'm looking at four plans but I have no idea which one my employer will reimburse. Gold costs ₹19,894 per year — that's almost half my monthly salary. Without knowing what my company covers, I'm not going to commit to anything. I'll ask HR first and come back.",
        reasoning:
          "Financial risk too high without employer contribution clarity. The annual price framing makes the cost feel prohibitive relative to monthly income. Trust in the platform hasn't been established enough to override the need for HR validation.",
        emotional_state: "frustrated",
        trust_score: 4,
        clarity_score: 3,
        value_score: 4,
      },
      {
        persona_uuid: "lh-persona-meena-devi-004",
        persona_label: "Meena Devi, 38, School Teacher, Patna",
        behavioral_archetype: "The Confused Novice",
        internal_monologue:
          "There are four plans and I cannot understand the difference between them. The comparison table has small English text with words like 'co-pay' and 'sub-limit' that I don't know. Gold is ₹19,894 — that is almost my full month's salary! I need to show this to my husband and decide together. I'm closing this for now.",
        reasoning:
          "Multiple compounding barriers: English-only dense table, unfamiliar insurance terminology, sticker shock from annual pricing, no employer subsidy information, and cultural preference for joint family financial decisions. Any one barrier might have been surmountable; together they are not.",
        emotional_state: "overwhelmed",
        trust_score: 5,
        clarity_score: 2,
        value_score: 5,
      },
    ],
  },

  fix_recommendations: [
    {
      root_cause:
        "4-plan comparison grid overwhelms low-literacy users and provides no employer-specific guidance",
      screen: "plan_selection",
      recommendation:
        "Reduce plans from 4 to 2 recommended options by asking employer name upfront and pre-filtering eligible plans with a 'Best for you' badge",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 9,
      affected_segment: "The Confused Novice, The Skeptic",
      expected_uplift:
        "Estimated +20–30% completion rate from low-literacy segment; overall completion 60% → 75%+",
    },
    {
      root_cause:
        "No employer-specific plan validation or co-pay information shown during selection",
      screen: "plan_selection",
      recommendation:
        "Add employer-specific plan validation — show 'Your employer [X] covers [Y]% of [Plan]' based on employee ID lookup during registration",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 7,
      affected_segment: "The Skeptic",
      expected_uplift:
        "Eliminates trust-based drop-off; expected +15% completion from skeptical segment",
    },
    {
      root_cause:
        "Annual lump-sum pricing causes sticker shock for lower-income users",
      screen: "plan_selection",
      recommendation:
        "Show ₹/month pricing alongside annual total, with a '₹X/day' anchor to reduce perceived cost magnitude",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 5,
      affected_segment: "The Confused Novice, The Skeptic, The Enthusiast",
      expected_uplift:
        "Reduces price-related hesitation; expected +5–10% completion rate across all segments",
    },
  ],

  expected_completion_rate_pct: 45.0,
};
