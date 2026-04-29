import type { SimulationData } from "@/types/simulation";

/**
 * Flent Secured — India's first rent payment app that rewards reliable tenants.
 * 1% cashback, credit card float, and landlord insurance (₹1.5L coverage).
 * 50 synthetic Indian personas across 10 sub-segments.
 * 31 completers, 19 drop-offs. 62% completion rate.
 * Linear flow: landing → value_cashback → value_benefits → value_landlord → registration → otp_verify → rental_agreement → landlord_bank → application_status
 * Used as sample/demo data for the simulation report UI.
 */
export const flentSimData: SimulationData = {
  simulation_id: "flent-secured-sim-20260402-001",
  flow_id: "flent_secured_onboarding_v1",
  flow_name: "Flent Secured, Rent Payment Onboarding",
  generated_at: "2026-04-02T14:00:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 50,
    completed: 31,
    dropped_off: 19,
    completion_rate_pct: 62.0,
    avg_time_to_complete_seconds: 85,
    dominant_plan: "N/A",
    dominant_plan_pct: 0,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 50,
    margin_of_error_pct: 9.2,
    confidence_level: "80%",
    note: "Sample size of 50 provides adequate directional signal at 80% confidence (±9.2%). Sub-segment sizes of 5 are directional only. Increase to 100+ for statistically significant sub-segment analysis.",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {},

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 31, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "rental_agreement", drop_offs: 6, drop_off_pct: 12.0 },
    { screen_id: "landlord_bank", drop_offs: 5, drop_off_pct: 10.0 },
    { screen_id: "registration", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "landing", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "application_status", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "value_cashback", drop_offs: 1, drop_off_pct: 2.0 },
    { screen_id: "value_landlord", drop_offs: 1, drop_off_pct: 2.0 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "No formal rental agreement to upload, informal verbal arrangement with landlord",
      frequency: 11,
    },
    {
      friction:
        "Don't have landlord's PAN card number",
      frequency: 9,
    },
    {
      friction:
        "Landlord uses cash/UPI only, won't adopt a new rent platform",
      frequency: 7,
    },
    {
      friction:
        "1% cashback on ₹15K rent = ₹150/month, not worth the setup effort",
      frequency: 5,
    },
    {
      friction:
        "72-hour review wait + waitlist creates uncertainty after completing signup",
      frequency: 5,
    },
    {
      friction:
        "Indian phone number only, blocks NRI landlords managing from abroad",
      frequency: 4,
    },
    {
      friction:
        "Rental agreement is physical paper, need to scan/digitize first",
      frequency: 4,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    landing: {
      avg_trust: 7.4,
      avg_clarity: 8.0,
      avg_value: 7.8,
      avg_time_s: 14,
      sample_size: 50,
    },
    value_cashback: {
      avg_trust: 7.6,
      avg_clarity: 8.4,
      avg_value: 8.2,
      avg_time_s: 10,
      sample_size: 48,
    },
    value_benefits: {
      avg_trust: 7.8,
      avg_clarity: 8.2,
      avg_value: 8.0,
      avg_time_s: 10,
      sample_size: 47,
    },
    value_landlord: {
      avg_trust: 7.2,
      avg_clarity: 7.6,
      avg_value: 7.4,
      avg_time_s: 12,
      sample_size: 47,
    },
    registration: {
      avg_trust: 6.6,
      avg_clarity: 7.4,
      avg_value: 6.8,
      avg_time_s: 18,
      sample_size: 46,
    },
    otp_verify: {
      avg_trust: 7.0,
      avg_clarity: 8.6,
      avg_value: 7.0,
      avg_time_s: 8,
      sample_size: 44,
    },
    rental_agreement: {
      avg_trust: 5.8,
      avg_clarity: 5.2,
      avg_value: 6.0,
      avg_time_s: 25,
      sample_size: 44,
    },
    landlord_bank: {
      avg_trust: 5.0,
      avg_clarity: 5.4,
      avg_value: 5.6,
      avg_time_s: 22,
      sample_size: 38,
    },
    application_status: {
      avg_trust: 6.2,
      avg_clarity: 6.8,
      avg_value: 6.4,
      avg_time_s: 10,
      sample_size: 33,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "62% of users complete the Flent Secured onboarding, but the rental agreement upload and landlord bank details screens together cause 58% of all drop-offs. The core problem isn't tenant willingness, it's that Flent's flow assumes a formalized rental arrangement with a digitally-savvy landlord, which excludes a significant chunk of India's rental market. NRI landlords are completely blocked (0% completion) by the Indian-only phone requirement.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "task_failure",
      screen: "rental_agreement",
      finding:
        "Rental agreement upload screen causes 12% drop-off, users without formal PDF agreements are structurally blocked",
      evidence:
        "6 of 19 drop-offs occur at rental_agreement. Tier-2 Transplants (60% drop), Solo Founders (40% drop), and NRI Landlords (remaining personas blocked here) cite verbal arrangements, physical-only papers, and informal PG setups. No alternative verification path exists.",
      affected_segments: ["The First-Jobber", "The Bootstrapper", "The Blocked Landlord"],
      recommendation:
        "Allow self-declaration of rent amount with verification via 3 months of UPI/bank transaction history. Accept photos of physical agreements with OCR extraction.",
    },
    {
      severity: "critical",
      type: "trust_issue",
      screen: "landlord_bank",
      finding:
        "Landlord bank details screen causes 10% drop-off, tenants don't have landlord's PAN and are scared to ask",
      evidence:
        "5 of 19 drop-offs occur at landlord_bank. Tier-2 Transplants and Solo Founders cite elderly landlords who would be suspicious of sharing PAN with an unknown app. Trust scores drop to 4.2 avg on this screen for these segments.",
      affected_segments: ["The First-Jobber", "The Bootstrapper"],
      recommendation:
        "Make landlord bank details optional at signup, let tenant pay to Flent escrow, handle landlord payout via phone call from Flent team.",
    },
    {
      severity: "major",
      type: "task_failure",
      screen: "registration",
      finding:
        "NRI landlords with foreign phone numbers are completely blocked from registration, 0% completion for this segment",
      evidence:
        "2 NRI Landlord personas dropped at registration due to Indian-only phone requirement, 1 dropped at landing (no landlord-first path), and the remaining 2 were blocked at rental_agreement (no formal agreement accessible from abroad). NRI landlords control significant Bangalore rental inventory.",
      affected_segments: ["The Blocked Landlord"],
      recommendation:
        "Support international phone numbers for landlord accounts. Add async NRI verification flow with NRE/NRO bank statement as identity proof.",
    },
    {
      severity: "major",
      type: "friction_point",
      screen: "application_status",
      finding:
        "72-hour waitlist after completing full onboarding creates resentment, users feel baited into sharing personal data for uncertain outcome",
      evidence:
        "2 personas dropped at application_status after seeing waitlist. 5 additional completers flagged this as a major friction point. Emotional state shifts from 'accomplished' to 'suspicious' when users realize they aren't immediately approved.",
      affected_segments: ["The Property Optimizer", "The Hopeful Newcomer"],
      recommendation:
        "Remove waitlist gate for qualified applicants with verified rental agreements. Show clear timeline and status updates via WhatsApp.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "value_cashback",
      finding:
        "1% cashback on low rent (₹12-18K) yields ₹120-180/month, perceived as not worth the setup effort for budget-conscious users",
      evidence:
        "5 personas across Solo Founder and Tier-2 Transplant segments flagged cashback insufficiency. 1 dropped at value_cashback. Those who continued were motivated by credit card float rather than cashback.",
      affected_segments: ["The Bootstrapper", "The First-Jobber"],
      recommendation:
        "Emphasize credit card float benefit (30-45 day interest-free period) over cashback for users with rent under ₹25K. Show annual savings calculation upfront.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "Sharp divide between tenants with formal rental infrastructure (agreements, responsive landlords) and those in India's informal rental market. Credit Card Points Optimizers and Senior Managers renting by choice convert at 100%, they have formal agreements, tech-savvy landlords, and instantly grasp the cashback/float math. NRI Landlords are structurally excluded (0%), while Tier-2 Transplants and Solo Founders (40% each) are blocked by informal arrangements and non-digital landlords.",
    high_propensity_segment:
      "Credit Card Points Optimizers and Senior Managers renting by choice, already pay via cards, understand float and cashback math, have formal rental agreements with responsive landlords.",
    low_propensity_segment:
      "NRI Landlords (0%, structurally blocked) and Tier-2 Transplants (40%, informal rental arrangements without agreements, landlords who don't use apps).",
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "The rental agreement upload kills 12% of users and the landlord bank details screen kills another 10%, together they account for 58% of all drop-offs. Flent assumes every renter has a formal PDF agreement and their landlord's PAN number, which is a metro-premium-only assumption.",
    what_works: [
      {
        element: "1% cashback value proposition on landing",
        why: "Immediate, tangible value, users with ₹40K+ rent see ₹400+/month and ₹4,800+/year savings without effort",
        for_whom: "Credit Card Points Optimizers, Premium Couples, Senior Managers, Returning NRI Renters",
      },
      {
        element: "Credit card float benefit explanation",
        why: "30-45 day interest-free period resonates strongly with financially literate users who already optimize card rewards",
        for_whom: "Credit Card Points Optimizers, Senior Managers, Solo Founders (secondary motivation)",
      },
      {
        element: "₹1.5L landlord insurance pitch",
        why: "Unique value prop, no competitor offers this. Landlords see direct financial protection",
        for_whom: "Landlord-Investors, NRI Landlords (if they could access it), Premium Couples (landlord buy-in)",
      },
      {
        element: "Clean, progressive value prop screens (3-screen value sequence)",
        why: "Breaking benefits into cashback → float/credit → landlord insurance builds understanding layer by layer",
        for_whom: "All segments, clarity scores 8+ across value prop screens",
      },
    ],
    what_needs_fixing: [
      {
        element: "Rental agreement upload, PDF only",
        problem: "Majority of Indian rental arrangements are verbal or physical paper, no digital agreement exists",
        for_whom: "Tier-2 Transplants, Solo Founders, NRI Landlords, Female Professionals",
        fix: "Accept self-declaration + 3 months UPI payment history as proof. Accept photo of physical agreement with OCR.",
        priority: "P0",
      },
      {
        element: "Landlord bank details, PAN + account mandatory",
        problem: "Tenants don't have landlord's PAN; asking for it damages tenant-landlord trust",
        for_whom: "Tier-2 Transplants, Solo Founders",
        fix: "Make landlord details optional. Let tenant pay to Flent escrow; Flent handles landlord onboarding via phone call.",
        priority: "P0",
      },
      {
        element: "Registration, Indian phone numbers only",
        problem: "NRI landlords managing flats from Dubai/US cannot register",
        for_whom: "NRI Landlords (5/5 blocked by flow end)",
        fix: "Add international phone support with NRI-specific KYC (passport + NRE statement)",
        priority: "P1",
      },
      {
        element: "Application status, 72-hour waitlist",
        problem: "Users who completed full onboarding feel baited when told to wait 72 hours",
        for_whom: "Landlord-Investors, Freshly Relocated Tech Workers",
        fix: "Instant approval for verified users. Show progress tracker via WhatsApp for others.",
        priority: "P2",
      },
    ],
    usability_score: 6,
    emotional_journey_map: {
      completers:
        "Curious (landing, 'rent that rewards you?') → Excited (value_cashback, '1% back on ₹45K rent = ₹5,400/year!') → Impressed (value_benefits, 'credit card float on rent? genius') → Intrigued (value_landlord, '₹1.5L insurance might convince my landlord') → Neutral (registration, standard) → Quick (otp_verify, auto-read) → Slightly tedious (rental_agreement, 'let me find the PDF') → Mild friction (landlord_bank, 'need to WhatsApp landlord for PAN') → Accomplished → Deflated (application_status, '72-hour wait? really?')",
      drop_offs:
        "Confused (landing, 'I'm not a renter / don't get it') → [EXIT] OR Dismissive (value_cashback, '₹150/month? not worth it') → [EXIT] OR Frustrated (registration, 'Indian numbers only? I manage flats from Dubai!') → [EXIT] OR Stuck (rental_agreement, 'I don't have a formal agreement, it's all verbal with my landlord uncle') → [EXIT] OR Panicked (landlord_bank, 'If I ask my 62-year-old landlord for his PAN, he'll think I'm scamming him') → [EXIT] OR Resentful (application_status, 'I did ALL that and now I'm on a waitlist?') → [EXIT]",
    },
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 13,
    screens: {
      rental_agreement: {
        total_drop_offs: 6,
        clusters: [
          {
            cluster_id: 1,
            label: "No formal rental agreement exists",
            persona_count: 3,
            representative_reasoning:
              "I'm renting a room in a 3BHK in Majestic area, it's a verbal arrangement with the building owner. There's no rental agreement. He just said 'pay ₹12,000 by the 5th every month via GPay.' How am I supposed to upload a PDF that doesn't exist? This app seems made for people in Koramangala paying ₹40K with proper agreements.",
          },
          {
            cluster_id: 2,
            label: "Agreement is physical paper, not digitized",
            persona_count: 2,
            representative_reasoning:
              "We have a rental agreement but it's a physical stamped paper that the broker made when we moved into this 2BHK in JP Nagar. It's in a file folder somewhere. I'd need to find it, scan it somehow, I don't even have a scanner. CamScanner? That's another app to download. This is becoming a whole project just to sign up for cashback.",
          },
          {
            cluster_id: 3,
            label: "Informal PG/shared arrangement without individual agreement",
            persona_count: 1,
            representative_reasoning:
              "I'm in a PG in Electronic City, the PG owner has one master lease for the building, not individual agreements with each tenant. My name isn't on any agreement. I just pay ₹8,500/month to the PG warden. Flent assumes I have a one-to-one landlord relationship that simply doesn't exist in PG accommodation.",
          },
        ],
      },
      landlord_bank: {
        total_drop_offs: 5,
        clusters: [
          {
            cluster_id: 1,
            label: "Don't know landlord's PAN number",
            persona_count: 3,
            representative_reasoning:
              "I need my landlord's PAN card? My landlord is a 62-year-old retired uncle who lives in Jayanagar. He barely uses WhatsApp. If I ask him for his PAN card to register on some app he's never heard of, he'll think I'm trying to scam him. I can already hear him saying 'what is this Flent-Shent, just pay me on Google Pay like always.'",
          },
          {
            cluster_id: 2,
            label: "Landlord refuses to share bank details with unknown app",
            persona_count: 2,
            representative_reasoning:
              "I WhatsApped my landlord asking for his PAN and bank details for this rent app. He called back within 2 minutes, not to share details, but to ask if I'm in some kind of trouble. He said 'don't share my details with any app-shapp, I don't trust these things.' He's a retired government officer from Rajajinagar, his pension goes to SBI and that's the only bank he trusts.",
          },
        ],
      },
      registration: {
        total_drop_offs: 2,
        clusters: [
          {
            cluster_id: 1,
            label: "Indian phone number only, blocks NRI landlords",
            persona_count: 1,
            representative_reasoning:
              "I own two flats in Whitefield that I manage from Dubai. My tenants told me about Flent Secured and the ₹1.5 lakh insurance sounded great, that's real protection for my rental income. But I can't even register because I have a UAE number. I disconnected my Indian SIM years ago. Am I supposed to get an Indian number just for this app?",
          },
          {
            cluster_id: 2,
            label: "Privacy concern, too much data upfront",
            persona_count: 1,
            representative_reasoning:
              "They want my Aadhaar-linked phone number, PAN, and personal details before I've even seen how the product works? I just wanted to understand the cashback structure and maybe try it for one month. Every fintech app in India starts spamming you once you register. Show me the product first, then I'll decide if I trust you with my identity.",
          },
        ],
      },
    },
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "Credit Card Points Optimizer",
    "Freshly Relocated Tech Worker",
    "NRI Landlord",
    "Premium Couple",
    "Hustling Solo Founder",
    "Senior Manager Renting by Choice",
    "Female Professional Living Alone",
    "Tier-2 Transplant",
    "Returning NRI Renter",
    "Landlord-Turned-Investor",
  ],

  // ── Segment Completion Summary ──────────────────────────────────────────────
  segment_completion_summary: [
    {
      segment: "NRI Landlord",
      total: 5,
      completed: 0,
      dropped: 5,
      completion_pct: 0,
      top_drop_off_screen: "registration",
      top_drop_off_reason: "Indian phone number only, blocks NRI landlords managing from abroad",
    },
    {
      segment: "Hustling Solo Founder",
      total: 5,
      completed: 2,
      dropped: 3,
      completion_pct: 40,
      top_drop_off_screen: "landlord_bank",
      top_drop_off_reason: "Landlord is local uncle/auntie who doesn't use apps, can't get PAN",
    },
    {
      segment: "Tier-2 Transplant",
      total: 5,
      completed: 2,
      dropped: 3,
      completion_pct: 40,
      top_drop_off_screen: "landlord_bank",
      top_drop_off_reason: "Don't have landlord's PAN, landlord is non-tech older person",
    },
    {
      segment: "Female Professional Living Alone",
      total: 5,
      completed: 3,
      dropped: 2,
      completion_pct: 60,
      top_drop_off_screen: "rental_agreement",
      top_drop_off_reason: "Informal rental arrangement without digitized agreement",
    },
    {
      segment: "Freshly Relocated Tech Worker",
      total: 5,
      completed: 3,
      dropped: 2,
      completion_pct: 60,
      top_drop_off_screen: "rental_agreement",
      top_drop_off_reason: "No formal agreement yet, still in first month of new rental",
    },
    {
      segment: "Landlord-Turned-Investor",
      total: 5,
      completed: 3,
      dropped: 2,
      completion_pct: 60,
      top_drop_off_screen: "application_status",
      top_drop_off_reason: "72-hour waitlist, expected instant insurance activation",
    },
    {
      segment: "Premium Couple",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "value_landlord",
      top_drop_off_reason: "Skeptical about landlord adoption, corporate landlord already has own system",
    },
    {
      segment: "Returning NRI Renter",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "landing",
      top_drop_off_reason: "Not currently renting, still in temporary Airbnb while house-hunting",
    },
    {
      segment: "Credit Card Points Optimizer",
      total: 5,
      completed: 5,
      dropped: 0,
      completion_pct: 100,
      top_drop_off_screen: "",
      top_drop_off_reason: "",
    },
    {
      segment: "Senior Manager Renting by Choice",
      total: 5,
      completed: 5,
      dropped: 0,
      completion_pct: 100,
      top_drop_off_screen: "",
      top_drop_off_reason: "",
    },
  ],

  // ── Segment-Screen Breakdown ────────────────────────────────────────────────
  segment_screen_breakdown: {
    landing: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Premium Couple": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    value_cashback: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    value_benefits: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    value_landlord: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Hustling Solo Founder": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    registration: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 4, dropped_off: 2, drop_off_pct: 50.0 },
      "Premium Couple": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    otp_verify: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    rental_agreement: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 5, dropped_off: 2, drop_off_pct: 40.0 },
      "NRI Landlord": { reached: 2, dropped_off: 2, drop_off_pct: 100.0 },
      "Premium Couple": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    landlord_bank: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 3, dropped_off: 1, drop_off_pct: 33.3 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Tier-2 Transplant": { reached: 5, dropped_off: 3, drop_off_pct: 60.0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    application_status: {
      "Credit Card Points Optimizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freshly Relocated Tech Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "NRI Landlord": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Premium Couple": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Hustling Solo Founder": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Senior Manager Renting by Choice": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Female Professional Living Alone": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Tier-2 Transplant": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Returning NRI Renter": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Landlord-Turned-Investor": { reached: 5, dropped_off: 2, drop_off_pct: 40.0 },
    },
  },

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    rental_agreement: [
      {
        persona_uuid: "flent-persona-008",
        persona_label: "23yo First-Job Developer, Electronic City",
        behavioral_archetype: "The First-Jobber",
        internal_monologue:
          "I'm renting a room in a 3BHK in Majestic area, it's a verbal arrangement with the building owner. There's no rental agreement. He just said 'pay ₹12,000 by the 5th every month via GPay.' How am I supposed to upload a PDF that doesn't exist? This app seems made for people in Koramangala paying ₹40K with proper agreements.",
        reasoning:
          "No formal rental agreement exists, verbal arrangement with landlord is the norm in budget rental segments.",
        emotional_state: "frustrated",
        trust_score: 5,
        clarity_score: 3,
        value_score: 5,
      },
      {
        persona_uuid: "flent-persona-036",
        persona_label: "26yo Junior PM, JP Nagar",
        behavioral_archetype: "The Hopeful Newcomer",
        internal_monologue:
          "We have a rental agreement but it's a physical stamped paper that the broker made when we moved into this 2BHK in JP Nagar. It's in a file folder somewhere at my parents' house in Hubli. I'd need to find it, scan it somehow, I don't even have a scanner. CamScanner? That's another app to download and figure out. This is becoming a whole project just to sign up for cashback.",
        reasoning:
          "Physical-only agreement stored at parents' house. Multi-step digitization creates excessive friction for a rewards signup.",
        emotional_state: "exasperated",
        trust_score: 6,
        clarity_score: 4,
        value_score: 6,
      },
      {
        persona_uuid: "flent-persona-011",
        persona_label: "42yo NRI Landlord, Dubai (owns Whitefield flat)",
        behavioral_archetype: "The Blocked Landlord",
        internal_monologue:
          "I managed to get past registration using my brother's Indian number, but now it wants my rental agreement. My agreement is with my property manager in Bangalore, he has the papers. I'm in Dubai. Even if he scans it, the agreement is in the tenant's name, not mine. The whole flow assumes I'm sitting in India with all my papers. I own 3 flats in Whitefield, managing them from here is already a nightmare.",
        reasoning:
          "Remote landlord cannot access physical documents. Flow assumes in-person document availability.",
        emotional_state: "exasperated",
        trust_score: 5,
        clarity_score: 3,
        value_score: 7,
      },
      {
        persona_uuid: "flent-persona-025",
        persona_label: "24yo Startup Founder, HSR Layout",
        behavioral_archetype: "The Bootstrapper",
        internal_monologue:
          "I'm in a PG in Electronic City, the PG owner has one master lease for the building, not individual agreements with each tenant. My name isn't on any agreement. I just pay ₹8,500/month to the PG warden via PhonePe. Flent assumes I have a one-to-one landlord relationship that simply doesn't exist in PG accommodation. Maybe I'll revisit when I get my own apartment.",
        reasoning:
          "PG/shared accommodation model doesn't map to Flent's individual landlord-tenant assumption.",
        emotional_state: "resigned",
        trust_score: 5,
        clarity_score: 4,
        value_score: 4,
      },
      {
        persona_uuid: "flent-persona-034",
        persona_label: "27yo Content Writer, Indiranagar",
        behavioral_archetype: "The Safety-First Renter",
        internal_monologue:
          "My landlady is an elderly woman who lives downstairs. Our 'agreement' was a handshake and her saying 'pay ₹18,000 by the 3rd.' There's a one-page letter she gave me with the rent amount written on it, does that count? The upload form says 'registered rental agreement' specifically. This feels like it's designed for corporate-managed apartments, not regular Bangalore rentals.",
        reasoning:
          "Informal single-page letter doesn't qualify as registered rental agreement. Form language excludes common arrangements.",
        emotional_state: "disappointed",
        trust_score: 5,
        clarity_score: 3,
        value_score: 6,
      },
    ],
    landlord_bank: [
      {
        persona_uuid: "flent-persona-039",
        persona_label: "23yo QA Engineer, Whitefield",
        behavioral_archetype: "The First-Jobber",
        internal_monologue:
          "I need my landlord's PAN card? My landlord is a 62-year-old retired uncle who lives in Jayanagar. He barely uses WhatsApp. If I ask him for his PAN card to register on some app he's never heard of, he'll think I'm trying to scam him. I can already hear him saying 'what is this Flent-Shent, just pay me on Google Pay like always.'",
        reasoning:
          "Elderly non-tech landlord won't share PAN with unknown app. Tenant fears damaging relationship.",
        emotional_state: "anxious",
        trust_score: 4,
        clarity_score: 5,
        value_score: 5,
      },
      {
        persona_uuid: "flent-persona-040",
        persona_label: "24yo Data Analyst, Electronic City",
        behavioral_archetype: "The First-Jobber",
        internal_monologue:
          "I WhatsApped my landlord asking for his PAN and bank details for this rent app. He called back within 2 minutes, not to share details, but to ask if I'm in some kind of trouble. He said 'don't share my details with any app-shapp, I don't trust these things.' He's a retired government officer from Rajajinagar, his pension goes to SBI and that's the only bank he trusts.",
        reasoning:
          "Landlord actively hostile to sharing financial details with fintech platforms. Tenant cannot override.",
        emotional_state: "defeated",
        trust_score: 4,
        clarity_score: 6,
        value_score: 5,
      },
      {
        persona_uuid: "flent-persona-022",
        persona_label: "26yo Freelance Designer, Koramangala",
        behavioral_archetype: "The Bootstrapper",
        internal_monologue:
          "My rent is ₹16,000 to a local aunty in Jayanagar 4th Block. She collects rent in cash on the 1st, she literally comes to my door. She doesn't have a bank account that I know of, and asking for her PAN would be like asking for her Aadhaar-linked phone number. She'd ask my parents if I'm okay. This feature is for people with professional landlords, not for people renting from neighborhood aunties.",
        reasoning:
          "Cash-only landlord with no digital footprint. Flent's assumption of banked, PAN-holding landlords doesn't match reality.",
        emotional_state: "amused_but_stuck",
        trust_score: 4,
        clarity_score: 5,
        value_score: 4,
      },
      {
        persona_uuid: "flent-persona-033",
        persona_label: "25yo HR Executive, Marathahalli",
        behavioral_archetype: "The Safety-First Renter",
        internal_monologue:
          "I already feel awkward negotiating anything with my landlord because I'm a woman living alone and he's already suspicious about 'why a single girl needs a 1BHK.' If I now ask for his PAN card and bank details, it'll raise more questions. He might even ask me to vacate. The power dynamic in Indian landlord-tenant relationships doesn't allow tenants to make demands like this.",
        reasoning:
          "Gender-specific power dynamic makes requesting landlord financial details socially risky.",
        emotional_state: "uncomfortable",
        trust_score: 3,
        clarity_score: 5,
        value_score: 5,
      },
      {
        persona_uuid: "flent-persona-041",
        persona_label: "22yo Support Engineer, Hebbal",
        behavioral_archetype: "The First-Jobber",
        internal_monologue:
          "My parents are paying part of my rent. My landlord's son collected the deposit and gave us a receipt. I don't even know the actual landlord's name, it's the son who handles everything. Which person's PAN do I enter? The son said he'll 'ask his father' but that was 3 days ago. I'm not going to chase them for PAN just to get ₹140/month cashback.",
        reasoning:
          "Proxy landlord management, tenant doesn't have direct relationship with property owner.",
        emotional_state: "impatient",
        trust_score: 4,
        clarity_score: 4,
        value_score: 3,
      },
    ],
    registration: [
      {
        persona_uuid: "flent-persona-013",
        persona_label: "38yo NRI Landlord, Dubai (owns 2 BLR flats)",
        behavioral_archetype: "The Blocked Landlord",
        internal_monologue:
          "I own two flats in Whitefield that I manage from Dubai. My tenants told me about Flent Secured and the ₹1.5 lakh insurance sounded great, that's real protection for my rental income. But I can't even register because I have a UAE number. I disconnected my Indian SIM years ago. Am I supposed to get an Indian number just for this app?",
        reasoning:
          "Structurally blocked, foreign phone number not accepted. NRI landlords are a valuable but excluded segment.",
        emotional_state: "frustrated",
        trust_score: 6,
        clarity_score: 7,
        value_score: 8,
      },
      {
        persona_uuid: "flent-persona-014",
        persona_label: "45yo NRI Landlord, San Jose (owns BLR flat)",
        behavioral_archetype: "The Blocked Landlord",
        internal_monologue:
          "I've been looking for a proper rent management platform for my Indiranagar flat. My tenant pays via NEFT which is fine, but I have zero protection if he stops paying or damages the property. ₹1.5L insurance is exactly what I need. But Indian phone number only? I've been in the US for 15 years. Even my Indian bank (HDFC) accepts my US number for NRI services. This is a basic oversight.",
        reasoning:
          "Sophisticated NRI expecting global-standard fintech UX. Indian-only phone gate is perceived as amateurish.",
        emotional_state: "disappointed",
        trust_score: 5,
        clarity_score: 8,
        value_score: 9,
      },
    ],
    application_status: [
      {
        persona_uuid: "flent-persona-047",
        persona_label: "52yo Landlord-Investor, HSR Layout",
        behavioral_archetype: "The Property Optimizer",
        internal_monologue:
          "I spent 20 minutes filling out everything, my property details, tenant info, bank account, PAN. And now it says '72-hour review period' and I'm on a 'waitlist'? Waitlist for what? To insure MY property? I own 3 flats. I'm the customer here. If you want landlords to sign up, don't make them feel like they're applying for a job. I'll check back in a week but this better not be one of those 'exclusive launch' gimmicks.",
        reasoning:
          "High-value landlord perceives waitlist as disrespectful of their time and status. 72-hour gate after full data submission creates trust deficit.",
        emotional_state: "indignant",
        trust_score: 4,
        clarity_score: 6,
        value_score: 6,
      },
      {
        persona_uuid: "flent-persona-048",
        persona_label: "55yo Property Investor, Koramangala",
        behavioral_archetype: "The Property Optimizer",
        internal_monologue:
          "So I've given Flent my PAN, bank details, property documents, and tenant information. And now I wait 72 hours to find out if I 'qualify'? Qualify for what, paying for my own insurance? The ₹1.5L coverage sounded reasonable but if there's a 3-month activation period on top of this waitlist, I'm looking at 4+ months before any actual protection. My current insurance broker can set up a policy in 48 hours.",
        reasoning:
          "Comparing Flent's activation timeline unfavorably to traditional insurance channels. Combined delays erode value proposition.",
        emotional_state: "skeptical",
        trust_score: 3,
        clarity_score: 5,
        value_score: 4,
      },
    ],
  },

  // ── Fix Recommendations ─────────────────────────────────────────────────────
  fix_recommendations: [
    {
      root_cause:
        "Users without formal rental agreements are blocked, verbal and physical-only arrangements have no upload path",
      screen: "rental_agreement",
      recommendation:
        "Allow self-declaration for rent amount when formal agreement doesn't exist, verify via 3 months of UPI transaction history instead",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 9,
      affected_segment: "Tier-2 Transplant, Hustling Solo Founder, NRI Landlord",
      expected_uplift:
        "Estimated 10-12% increase in completion rate by unblocking the 6 personas (12%) who drop at rental_agreement",
    },
    {
      root_cause:
        "Tenants don't have landlord's PAN/bank details and requesting them damages the tenant-landlord relationship",
      screen: "landlord_bank",
      recommendation:
        "Make landlord bank details optional at signup, let tenant pay to Flent's escrow, handle landlord payout via phone call",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 8,
      affected_segment: "Tier-2 Transplant, Hustling Solo Founder, Female Professional Living Alone",
      expected_uplift:
        "Estimated 8-10% increase in completion rate by removing the landlord PAN gate for tenants with non-digital landlords",
    },
    {
      root_cause:
        "Tenants are uncomfortable asking landlords to join an unknown platform, landlord communication burden falls entirely on tenant",
      screen: "landlord_bank",
      recommendation:
        "Add WhatsApp-based landlord invite with pre-filled message, don't make tenant explain the product themselves",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 7,
      affected_segment: "Freshly Relocated Tech Worker, Female Professional Living Alone",
      expected_uplift:
        "Estimated 4-6% increase by reducing social friction of landlord onboarding",
    },
    {
      root_cause:
        "NRI landlords with foreign phone numbers are completely excluded from the platform despite controlling significant urban rental inventory",
      screen: "registration",
      recommendation:
        "Support NRI phone numbers for landlord accounts, they control significant Bangalore rental inventory",
      estimated_impact: "medium",
      feasibility: "medium",
      impact_feasibility_score: 6,
      affected_segment: "NRI Landlord",
      expected_uplift:
        "Estimated 6-8% increase by unblocking the NRI Landlord segment (5 of 50 personas, all high-value multi-property owners)",
    },
    {
      root_cause:
        "72-hour review waitlist after full onboarding creates resentment, users feel they shared personal data for uncertain outcome",
      screen: "application_status",
      recommendation:
        "Remove waitlist/72-hour gate for qualified applicants, the uncertainty after effort creates resentment",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 5,
      affected_segment: "Landlord-Turned-Investor",
      expected_uplift:
        "Estimated 3-4% increase by converting users who complete full flow but churn at final gate",
    },
  ],

  // ── Expected Completion Rate ────────────────────────────────────────────────
  expected_completion_rate_pct: undefined as unknown as number,

  // ── Persona Details ─────────────────────────────────────────────────────────
  persona_details: [
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 1: Credit Card Points Optimizer (5/5 complete) — "The Optimizer"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-001",
      demographics: {
        first_language: "Kannada",
        age: 28,
        occupation: "Senior Software Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Optimizer",
        marital_status: "Unmarried",
      },
      professional_background:
        "SDE-3 at a product startup in Koramangala. ₹24L CTC. Pays everything on HDFC Infinia, tracks reward points in a spreadsheet. Rent ₹35K for 1BHK in HSR Layout.",
      cultural_background:
        "Grew up in Mysuru, engineering from RVCE. Lives alone in HSR Layout. Active on r/IndianCreditCards.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 72,
      overall_monologue:
        "I've been paying rent via bank transfer like a caveman while earning 3.3X points on every other spend via my Infinia. ₹35K rent × 1% = ₹350/month cashback, plus I get to route through my credit card for 33 reward days float. That's an additional ₹35K sitting in my liquid fund earning for an extra month. Net yield: ₹350 cashback + ~₹200 liquid fund float = ₹550/month. CRED charges 1% processing. Flent is free. Math checks out. Signed up in 72 seconds.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "'Rent that rewards you', okay, let me see the math. 1% cashback on rent payments via credit card? This is exactly what's been missing.",
          reasoning: "Immediately frames value in reward-point optimization terms",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 9,
          time_seconds: 8,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "1% flat cashback. No cap mentioned. On ₹35K rent that's ₹350/month, ₹4,200/year. Plus credit card rewards on top? If this stacks with my Infinia 3.3X, I'm getting 4.3% effective return on rent spend. Need to verify stacking.",
          reasoning: "Calculating exact yield to the decimal, comparing against CRED and other options",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 9,
          time_seconds: 10,
        },
        {
          screen_id: "value_benefits",
          view_name: "Credit Card Float Benefits",
          internal_monologue: "Credit card float on rent, this is the real value. My rent due date is 1st, credit card due date is 5th of next month. That's 35 days of ₹35K sitting in my Zerodha liquid fund instead of landlord's account. At 6.5% liquid fund return, that's about ₹200/month. Small but it compounds.",
          reasoning: "Float arbitrage calculation, exactly the behavior this feature targets",
          emotional_state: "impressed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 9,
          time_seconds: 8,
        },
        {
          screen_id: "value_landlord",
          view_name: "Landlord Insurance Value",
          internal_monologue: "₹1.5L insurance for landlord, smart positioning. My landlord in HSR is a techie himself, he'll appreciate this. Makes the pitch easier when I tell him about Flent.",
          reasoning: "Sees landlord value prop as a tool to get landlord buy-in",
          emotional_state: "strategic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 6,
        },
        {
          screen_id: "registration",
          view_name: "Registration",
          internal_monologue: "Standard. Using my Jio number, same one on every fintech app.",
          reasoning: "Routine fintech registration",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 12,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "Auto-read OTP. 4 seconds.",
          reasoning: "Seamless OTP verification",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 9,
          value_score: 7,
          time_seconds: 4,
        },
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I have my agreement as a PDF from NoBroker, we signed digitally when I moved in 6 months ago. Uploading... done.",
          reasoning: "Digital-native renter with organized documents",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 15,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "I need landlord's PAN and bank details. He's a tech PM at Flipkart, let me WhatsApp him. He responded in 2 minutes with all details. Easy when your landlord is also a millennial.",
          reasoning: "Tech-savvy landlord enables frictionless completion",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 5,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review, 72-hour wait. That's fine, I'm not in a rush. As long as it's active before next month's rent. Already calculating my annual reward optimization.",
          reasoning: "Patient because value case is clear",
          emotional_state: "optimistic",
          friction_points: ["72-hour wait is unnecessary friction for verified users"],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-002",
      demographics: {
        first_language: "Hindi",
        age: 30,
        occupation: "Product Manager",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Optimizer",
        marital_status: "Unmarried",
      },
      professional_background:
        "PM at a fintech startup in Lower Parel. ₹32L CTC. Amex Platinum user, maximizes lounge access and cashback across 3 cards. Rent ₹45K for 2BHK in Bandra West.",
      cultural_background:
        "Delhi girl, moved to Mumbai for career. Lives with college friend. Tracks spend on Walnut app.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 68,
      overall_monologue:
        "₹45K rent is my single biggest monthly expense and the only one that doesn't earn me card rewards. Flent gives me 1% cashback (₹450/month = ₹5,400/year) PLUS I can route through Amex for MR points. That's like getting a free domestic flight every year just from rent. My landlord is a Bandra socialite who loves anything 'premium', she'll be thrilled about the insurance. Signed up, uploaded agreement from my Google Drive, done.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "Rent rewards? Finally. My ₹45K/month rent has been a dead expense on my optimization spreadsheet. Let me see this.",
          reasoning: "Immediately identifies the value gap this fills",
          emotional_state: "eager",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 6,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹450/month cashback. That's 2 Zomato Gold dinners. Or reinvested, ₹5,400/year compounding at 12% in equity = ₹8,500 in 5 years. Yes.",
          reasoning: "Compound interest calculation on cashback proceeds",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. Fine. I'll set a calendar reminder. Next month's rent goes through Flent.",
          reasoning: "Organized and patient, has already captured the value",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-003",
      demographics: {
        first_language: "Tamil",
        age: 32,
        occupation: "Engineering Manager",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Optimizer",
        marital_status: "Married",
      },
      professional_background:
        "EM at a FAANG in Bellandur. ₹35L CTC. Infinia + Amex Plat combo. Rent ₹52K for 3BHK in Indiranagar.",
      cultural_background:
        "From Chennai, IIT Madras grad. Wife works at SAP. Has a spreadsheet comparing CRED, CRED Mint, and rent payment apps.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 78,
      overall_monologue:
        "CRED charges 1% + GST for rent via credit card. Flent gives 1% back. The delta is massive, instead of paying ₹520 to CRED, I'm earning ₹520 from Flent. That's a ₹1,040/month swing on ₹52K rent. ₹12,480/year. Plus the credit card float is 35 days on ₹52K, that's real money in overnight TREPS. My landlord in Indiranagar is a startup founder, he was already asking about rent automation.",
      screen_monologues: [
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "Wait, CRED charges me 1% to pay rent via card, and Flent gives me 1% back? That's a 2% swing. On ₹52K that's ₹1,040/month I'm leaving on the table. Why didn't I find this sooner?",
          reasoning: "Direct comparison with CRED, calculates the opportunity cost of current setup",
          emotional_state: "eureka",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 10, time_seconds: 12,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Review period. Fine. Already texted my landlord about Flent. He said 'sounds interesting, send me the link.' This is going to work.",
          reasoning: "Proactive landlord engagement",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-004",
      demographics: {
        first_language: "Hindi",
        age: 26,
        occupation: "Management Consultant",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Optimizer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Associate at a Big 4. ₹18L CTC. HDFC Regalia user, obsessed with airport lounge access. Rent ₹28K for 1BHK in Powai.",
      cultural_background:
        "From Lucknow, XLRI grad. Travels weekly for work. Every spend is optimized for Regalia milestone benefits.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 75,
      overall_monologue:
        "₹28K rent through my Regalia = 4 reward points per ₹150, that's 747 points/month. Plus 1% Flent cashback = ₹280. Total monthly value: ₹747 (Regalia points) + ₹280 (Flent) = ₹1,027. This pushes me past the Regalia milestone bonus of 10,000 points. My landlord in Powai is a young CA, he was fine sharing PAN.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour wait. Fine, I'll hit my Regalia milestone this month regardless. Flent is gravy.",
          reasoning: "Already optimizing around existing card strategy",
          emotional_state: "pleased",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-005",
      demographics: {
        first_language: "Marathi",
        age: 29,
        occupation: "Data Scientist",
        district: "Pune",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Optimizer",
        marital_status: "Unmarried",
      },
      professional_background:
        "DS at a US startup (remote). ₹22L CTC. SBI Simply Click + HDFC Millennia combo. Rent ₹20K for 1BHK in Kothrud, Pune.",
      cultural_background:
        "Punekar. Lives in Kothrud near parents. Has a Python script that categorizes her card spends for tax optimization.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 80,
      overall_monologue:
        "₹20K rent × 1% = ₹200/month. Not huge, but it's money I was leaving on the table. The credit card float is more interesting, 35 days of ₹20K in my Parag Parikh Liquid Fund. But the real win is that my rent spend finally shows up on my credit card statement for higher credit limit eligibility. ₹2.4L annual rent spend on my HDFC Millennia should push me toward Infinia upgrade eligibility.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. I've added it to my credit card optimization tracker. If approved, my total card spend jumps by ₹2.4L/year, that's Infinia territory.",
          reasoning: "Sees Flent as credit limit optimization tool beyond cashback",
          emotional_state: "strategic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 5,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 2: Freshly Relocated Tech Worker (3/5 complete) — "The Hopeful Newcomer"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-006",
      demographics: {
        first_language: "Telugu",
        age: 25,
        occupation: "Software Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Hopeful Newcomer",
        marital_status: "Unmarried",
      },
      professional_background:
        "SDE-1 at a startup in HSR Layout. ₹14L CTC. First job, first apartment. Rent ₹18K for 1BHK in BTM Layout. Painful 10-month deposit of ₹1.8L wiped out savings.",
      cultural_background:
        "From Vijayawada, studied at NIT Warangal. Moved to Bangalore 3 months ago. Parents worried about the deposit amount.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 95,
      overall_monologue:
        "The 10-month deposit for my BTM Layout apartment almost broke me. ₹1.8 lakh, that's 2 months of salary before tax. 'Zero deposits' on the landing page got me excited, but that seems to be a different Flent product. The 1% cashback is ₹180/month, not life-changing. But the 'formalized rent receipts' feature means I can claim HRA tax benefit properly. That's ₹15K+ in tax savings per year. My landlord is a young working professional, he gave me his PAN over WhatsApp in 5 minutes.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "'Zero deposits', wait, is this about my ₹1.8L deposit? Oh, that's a different product. 'Rent that rewards', okay, let me see what Secured offers.",
          reasoning: "Initial hook is deposit-free living, but pivots to understanding Secured product",
          emotional_state: "slightly_disappointed_then_curious",
          friction_points: ["Zero deposit messaging creates expectation mismatch with Secured product"],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 14,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹180/month cashback. That's... one Swiggy order? Not amazing. But wait, formalized rent receipts for HRA? THAT's the value. My CA said I'm losing ₹15K/year in tax benefits because I don't have proper rent receipts.",
          reasoning: "Reframes value from cashback to HRA tax benefit, much higher impact for this income bracket",
          emotional_state: "recalculating",
          friction_points: ["1% on ₹18K feels small, HRA benefit should be highlighted for this segment"],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 12,
        },
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I have my agreement, the broker did it on NoBroker when I moved in. It's in my email. Let me find it... here, the PDF. Uploading.",
          reasoning: "Recent rental with digital agreement via platform",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 18,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "Need landlord's PAN. He's a 28-year-old working at Accenture. WhatsApped him, he shared it in 5 minutes. 'Sure bro, PAN is ABCDE1234F, account number is...' Easy.",
          reasoning: "Young, tech-savvy landlord with no friction in sharing details",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. My next rent is due on the 1st, that's 20 days away. Should be fine. Looking forward to the tax receipts more than the cashback honestly.",
          reasoning: "Timeline works for next rent cycle",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 5,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-007",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "Product Designer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Hopeful Newcomer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Product Designer at a D2C brand in Koramangala. ₹16L CTC. Relocated from Delhi 2 months ago. Rent ₹22K for 1BHK in Koramangala 4th Block.",
      cultural_background:
        "Delhi University grad. Parents in Dwarka. Adjusting to Bangalore after 25 years in Delhi.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 90,
      overall_monologue:
        "I moved to Bangalore 2 months ago and the rental system here is wild, 10 months deposit, no proper receipts, landlords who communicate only through brokers. Flent feels like the first organized thing about Bangalore renting. ₹220/month cashback plus proper receipts plus the credit card float, it all adds up. My landlord is a retired professor, very methodical, he actually appreciated the formal receipt structure.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. Honestly just happy to have a proper system for rent payments. Coming from Delhi where my landlord only accepted cash, this feels civilized.",
          reasoning: "Values structure and formalization over pure cashback",
          emotional_state: "relieved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },
    // Freshly Relocated — 2 drop-offs at rental_agreement
    {
      persona_uuid: "flent-persona-008",
      demographics: {
        first_language: "Tamil",
        age: 23,
        occupation: "Junior Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Hopeful Newcomer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Frontend dev at a service company in Electronic City. ₹6L CTC. First job out of Anna University. Rent ₹12K for shared room in Majestic area.",
      cultural_background:
        "From Thanjavur. Living in Bangalore for 1 month. Parents funded the deposit.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 55,
      overall_monologue:
        "I was excited about Flent until it asked me to upload a rental agreement. I don't have one. My room is a verbal arrangement with the building owner in Majestic, he said 'pay ₹12K by the 5th on GPay.' There's no paper, no PDF, nothing. This app is for people in nice apartments with proper leases. Not for someone sharing a room near the bus stand.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I'm renting a room in a 3BHK in Majestic area, it's a verbal arrangement with the building owner. There's no rental agreement. He just said 'pay ₹12,000 by the 5th every month via GPay.' How am I supposed to upload a PDF that doesn't exist? This app seems made for people in Koramangala paying ₹40K with proper agreements.",
          reasoning: "No formal rental agreement exists, verbal arrangement is standard in budget rentals",
          emotional_state: "frustrated",
          friction_points: ["No formal agreement to upload", "Verbal rent arrangement has no documentation"],
          decision_outcome: "DROP_OFF",
          trust_score: 5,
          clarity_score: 3,
          value_score: 5,
          time_seconds: 20,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-009",
      demographics: {
        first_language: "Kannada",
        age: 26,
        occupation: "QA Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Hopeful Newcomer",
        marital_status: "Unmarried",
      },
      professional_background:
        "QA at an IT services company in Whitefield. ₹9L CTC. Rent ₹15K for 1BHK in Marathahalli. Agreement is physical paper only.",
      cultural_background:
        "From Hubli. Moved to Bangalore 6 months ago. Still getting used to city life.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 58,
      overall_monologue:
        "The cashback was appealing, ₹150/month helps. But when it asked for rental agreement upload, I realized mine is on stamp paper in a file at home. I'd need to scan it and I don't have a scanner. I tried CamScanner but the pages were blurry. I'll come back when I figure out how to digitize this thing.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "My rental agreement is a physical stamped paper. I need to scan it? I don't own a scanner. CamScanner gives blurry results. This is too much effort for ₹150/month.",
          reasoning: "Physical-only agreement with no easy digitization path",
          emotional_state: "overwhelmed",
          friction_points: ["Physical agreement only", "No scanner access"],
          decision_outcome: "DROP_OFF",
          trust_score: 6,
          clarity_score: 4,
          value_score: 5,
          time_seconds: 22,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-010",
      demographics: {
        first_language: "Hindi",
        age: 28,
        occupation: "DevOps Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Hopeful Newcomer",
        marital_status: "Unmarried",
      },
      professional_background:
        "DevOps at a fintech in HSR Layout. ₹20L CTC. Rent ₹20K for 1BHK in HSR Layout. Moved from Bhopal 4 months ago.",
      cultural_background:
        "From Bhopal. Engineering from MANIT. Shares apartment info on housing groups.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue:
        "Solid product. 1% cashback on ₹20K = ₹200/month. Not huge, but the HRA tax receipts are the real win, my CA said proper rent receipts save me ₹12K/year in taxes. Landlord shared PAN quickly since he's also a techie. 72-hour wait is the only annoying part.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Done. 72-hour wait. Would prefer instant but I get it, they need to verify documents. Setting reminder.",
          reasoning: "Understands verification need but slightly impatient",
          emotional_state: "accepting",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 3: NRI Landlord (0/5 complete) — "The Blocked Landlord"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-011",
      demographics: {
        first_language: "Hindi",
        age: 42,
        occupation: "IT Director",
        district: "Dubai (owns Whitefield flat)",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "The Blocked Landlord",
        marital_status: "Married",
      },
      professional_background:
        "IT Director at a Dubai consultancy. Owns 2 flats in Whitefield, Bangalore, combined rental income ₹75K/month. Manages through a local property manager.",
      cultural_background:
        "From Lucknow originally. In Dubai 10 years. Wife and kids in Dubai. Indian SIM disconnected.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 45,
      overall_monologue:
        "My tenants mentioned Flent Secured and the ₹1.5L insurance per flat caught my attention, that's real protection. I pay ₹8K/year for a basic rental insurance policy that covers almost nothing. But I can't register, Indian phone number only. I disconnected my Airtel SIM 5 years ago. I'm not getting an Indian number just for this. I'll wait until they support international numbers.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "₹1.5L insurance coverage for landlords? This is exactly what I need for my Whitefield properties. Let me register.",
          reasoning: "Insurance value prop immediately resonates for multi-property NRI landlord",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 10,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "Cashback for tenants is fine. I care about the landlord protection. Let me skip ahead.",
          reasoning: "Tenant-facing benefit is irrelevant for landlord persona",
          emotional_state: "impatient",
          friction_points: ["Value screens are tenant-focused, no fast path for landlord sign-up"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 6, time_seconds: 6,
        },
        {
          screen_id: "value_benefits",
          view_name: "Credit Card Float Benefits",
          internal_monologue: "Credit card float, this is for tenants, not landlords. Where's the landlord sign-up?",
          reasoning: "Entire flow is tenant-oriented, no landlord-first path exists",
          emotional_state: "confused",
          friction_points: ["No dedicated landlord onboarding path"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 6, value_score: 5, time_seconds: 6,
        },
        {
          screen_id: "value_landlord",
          view_name: "Landlord Insurance Value",
          internal_monologue: "Finally, the landlord value prop. ₹1.5L coverage, automatic protection, claims process. This is what I want. Let me register now.",
          reasoning: "Insurance details are compelling for property investor",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 10,
        },
        {
          screen_id: "registration",
          view_name: "Registration",
          internal_monologue: "Indian phone number only? I've been in Dubai for 10 years. My Indian SIM is disconnected. Am I supposed to get an Indian number just to insure my own property? Even HDFC Bank lets me use my UAE number for NRI services.",
          reasoning: "Structurally blocked, foreign phone number not accepted",
          emotional_state: "frustrated",
          friction_points: ["Indian phone number only", "No NRI registration path"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 7, value_score: 8, time_seconds: 15,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-012",
      demographics: {
        first_language: "Kannada",
        age: 48,
        occupation: "VP Engineering",
        district: "San Francisco (owns Indiranagar flat)",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "The Blocked Landlord",
        marital_status: "Married",
      },
      professional_background:
        "VP Eng at a Bay Area startup. Owns a 3BHK in Indiranagar, rental income ₹55K/month. Also owns a 2BHK in JP Nagar.",
      cultural_background:
        "Bangalorean. In US 18 years. Parents still live in Jayanagar. Manages flats through father + NoBroker.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 40,
      overall_monologue:
        "I was searching for rental management platforms for my Bangalore flats. ₹1.5L insurance is great, my father handles tenant issues but he's 75. I need digital infrastructure. But Indian phone only. I have a US number. My Indian number expired in 2015. This is 2026, even RazorpayX handles NRI accounts. Disappointing.",
      screen_monologues: [
        {
          screen_id: "registration",
          view_name: "Registration",
          internal_monologue: "Indian phone number only? I'm managing rental properties worth ₹3Cr from San Francisco and you won't let me register with a US number? My Indian SIM expired a decade ago. Skip.",
          reasoning: "High-value NRI landlord blocked by basic UX limitation",
          emotional_state: "disappointed",
          friction_points: ["No international phone support", "No NRI landlord path"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 8, value_score: 9, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-013",
      demographics: {
        first_language: "Malayalam",
        age: 38,
        occupation: "Business Owner",
        district: "Dubai (owns HSR Layout flat)",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "The Blocked Landlord",
        marital_status: "Married",
      },
      professional_background:
        "Owns an import-export business in Dubai. Has a 2BHK in HSR Layout rented at ₹30K/month. Property managed by local agent.",
      cultural_background:
        "Keralite from Thrissur. In Dubai 12 years. Brother manages the flat's day-to-day.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 62,
      overall_monologue:
        "Used my brother's Indian number to register since mine is UAE. Got through to OTP and then rental agreement. But my agreement is with the property management company, not directly with the tenant. The format doesn't match what Flent expects. Plus my NRI status means the PAN verification might flag, I have an NRE account, not a regular savings account. The whole flow isn't built for NRI landlords.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "My agreement is between my property manager and the tenant, I'm not directly on it. The format Flent expects is a standard landlord-tenant agreement. Plus my NRI status creates complications with PAN and banking details. This isn't designed for people like me.",
          reasoning: "NRI ownership structure doesn't fit standard landlord-tenant agreement format",
          emotional_state: "resigned",
          friction_points: ["Property management company intermediary", "NRI PAN/banking complications"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 4, value_score: 7, time_seconds: 18,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-014",
      demographics: {
        first_language: "Hindi",
        age: 45,
        occupation: "Senior Architect",
        district: "San Jose (owns Whitefield flat)",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "The Blocked Landlord",
        marital_status: "Married",
      },
      professional_background:
        "Solutions Architect at a FAANG. Owns a 3BHK in Whitefield rented at ₹45K. Also owns a flat in Noida.",
      cultural_background:
        "From Jaipur. In US 15 years. Indian flat managed by cousin in Bangalore.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 55,
      overall_monologue:
        "The insurance pitch is compelling, ₹1.5L coverage would protect against the nightmare scenario where my Whitefield tenant stops paying. But I can't register with my US number, and the rental agreement is between my cousin (as my representative) and the tenant. Even if I got in, the bank details section would require my NRE account which probably isn't supported. I'll keep using NoBroker for now.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "The agreement is in my cousin's name as power of attorney holder. Flent wants the landlord's agreement but the actual ownership structure is more complex. POA-based rental arrangements aren't supported in this upload flow.",
          reasoning: "POA-based NRI rental structure doesn't fit upload requirements",
          emotional_state: "stuck",
          friction_points: ["POA arrangement not supported", "NRE account likely not accepted"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 4, value_score: 7, time_seconds: 16,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-015",
      demographics: {
        first_language: "Tamil",
        age: 50,
        occupation: "Real Estate Consultant",
        district: "Abu Dhabi (owns Electronic City flat)",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "The Blocked Landlord",
        marital_status: "Married",
      },
      professional_background:
        "Real estate consultant in Abu Dhabi. Owns 3 flats in Electronic City, Bangalore. Total rental income ₹90K/month.",
      cultural_background:
        "From Madurai. In UAE 20 years. Mother in Chennai manages some property affairs.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 22,
      overall_monologue:
        "Saw the Flent Secured ad on LinkedIn. ₹1.5L insurance sounded interesting but this entire flow is tenant-focused, cashback on rent, credit card float. I'm a landlord. Where's the landlord portal? I don't want to wade through a tenant onboarding flow to get insurance for my properties. I'll wait until they have a direct landlord sign-up path.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "This is all about tenants getting cashback and credit card float. I'm a landlord sitting in Abu Dhabi, I want the ₹1.5L insurance, not cashback. Where's the landlord-first flow? I'm not going to go through a tenant onboarding to access landlord benefits. This isn't built for me.",
          reasoning: "Landlord persona finds tenant-first flow alienating, no direct landlord entry point",
          emotional_state: "dismissive",
          friction_points: ["No landlord-first onboarding path", "Landing page entirely tenant-focused"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 6, value_score: 4, time_seconds: 22,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 4: Premium Couple (4/5 complete) — "The Premium Renter"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-016",
      demographics: {
        first_language: "Hindi",
        age: 30,
        occupation: "Senior PM & UX Designer (couple)",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Premium Renter",
        marital_status: "Married",
      },
      professional_background:
        "He's a Senior PM at a FAANG (₹28L), she's a UX Designer at a startup (₹18L). Combined ₹46L CTC. Rent ₹55K for 3BHK in Koramangala 5th Block.",
      cultural_background:
        "Both from Delhi. Married 2 years. Moved to Bangalore for his FAANG role. Gated community lifestyle.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 82,
      overall_monologue:
        "₹55K rent × 1% = ₹550/month = ₹6,600/year. Plus credit card float on ₹55K for 35 days, that's ₹300+ in liquid fund returns monthly. Combined value: ~₹850/month, ₹10,200/year. Our corporate landlord (a housing company) was already set up on Flent, they sent us a link to connect. The insurance benefit sealed it for them. Seamless experience. The 72-hour wait is the only hiccup.",
      screen_monologues: [
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹550/month cashback on ₹55K rent. That covers our Netflix + Spotify + YouTube Premium combined. 'Rent working for you', yes, exactly.",
          reasoning: "Maps cashback to tangible subscription costs",
          emotional_state: "delighted",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. Our landlord (housing company) is already on Flent so this should be fast. Looking forward to next month.",
          reasoning: "Corporate landlord presence reduces friction and wait anxiety",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-017",
      demographics: {
        first_language: "Marathi",
        age: 32,
        occupation: "Consultant & Doctor (couple)",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Premium Renter",
        marital_status: "Married",
      },
      professional_background:
        "She's a McKinsey Associate (₹30L), he's a resident doctor (₹12L). Combined ₹42L. Rent ₹60K for 2BHK in Bandra.",
      cultural_background:
        "She's Maharashtrian from Pune, he's Gujarati from Ahmedabad. Both value financial optimization.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 78,
      overall_monologue:
        "₹60K rent is our biggest line item. 1% = ₹600/month. On my Amex, that's additional MR points worth another ₹300. ₹900/month combined = ₹10,800/year. My Bandra landlord is a businessman, he appreciated the insurance angle. Uploaded our registered L&L agreement from the broker's email. Done.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour wait. Fine. Already calculated that Flent saves us more than our annual Hotstar subscription.",
          reasoning: "Anchoring savings to known expenses",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-018",
      demographics: {
        first_language: "Telugu",
        age: 29,
        occupation: "Tech Lead & Analyst (couple)",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Premium Renter",
        marital_status: "Married",
      },
      professional_background:
        "He's a Tech Lead (₹26L), she's a Business Analyst (₹16L). Combined ₹42L. Rent ₹48K for 3BHK in Whitefield.",
      cultural_background:
        "Both from Hyderabad. Moved to Bangalore together. Gated community in EPIP Zone.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 85,
      overall_monologue:
        "Our gated community already uses a property management app, so adding Flent for the payment layer was natural. ₹480/month cashback, credit card float, and our society manager shared the landlord's details since it's a corporate-managed property. Smooth.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. Our society management handles everything, so this should be straightforward.",
          reasoning: "Corporate property management removes all landlord friction",
          emotional_state: "calm",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 4,
        },
      ],
    },
    // Premium Couple — 1 drop at value_landlord
    {
      persona_uuid: "flent-persona-019",
      demographics: {
        first_language: "Hindi",
        age: 34,
        occupation: "VP Product & Architect (couple)",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Premium Renter",
        marital_status: "Married",
      },
      professional_background:
        "She's VP Product (₹40L), he's an architect (₹20L). Combined ₹60L. Rent ₹65K for 4BHK in Sarjapur Road. Corporate-managed villa.",
      cultural_background:
        "She's from Jaipur, he's Bangalorean. Both skeptical of new fintech, prefer established brands.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 38,
      overall_monologue:
        "The cashback was interesting, ₹650/month on our ₹65K rent. But when I saw the landlord insurance section, I realized our corporate landlord (a real estate company) already has their own insurance and payment infrastructure. They'd never switch to a new platform for a ₹1.5L policy when they have a ₹50Cr portfolio insurance. And we can't sign up without landlord participation. This product is for individual landlord-tenant arrangements, not corporate rentals.",
      screen_monologues: [
        {
          screen_id: "value_landlord",
          view_name: "Landlord Insurance Value",
          internal_monologue: "₹1.5L insurance? Our corporate landlord manages 200 apartments. They have enterprise-grade insurance. They'll never adopt a new platform for ₹1.5L coverage per unit. And if the landlord doesn't participate, the whole thing falls apart. This isn't for corporate-managed rentals.",
          reasoning: "Corporate landlord has existing infrastructure, won't adopt Flent for marginal benefit",
          emotional_state: "skeptical",
          friction_points: ["Corporate landlord won't adopt", "Product assumes individual landlord"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 7, value_score: 4, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-020",
      demographics: {
        first_language: "Kannada",
        age: 28,
        occupation: "EM & PM (couple)",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Premium Renter",
        marital_status: "Married",
      },
      professional_background:
        "He's an EM at a Series B (₹32L), she's a PM at a SaaS co (₹22L). Combined ₹54L. Rent ₹50K for 3BHK in HSR Layout.",
      cultural_background:
        "Both Bangaloreans. Renting in HSR near both workplaces. Landlord is a retired IAS officer.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue:
        "₹500/month cashback plus credit card float. Our landlord is a retired IAS officer, very process-oriented. When I explained Flent's structure and the insurance benefit, he actually said 'this is how rent should always work.' He shared his details within an hour. The 72-hour review is a bit much but our landlord's enthusiasm makes me confident this will go through.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "Called our landlord, retired IAS officer. Explained the insurance benefit. He said 'this is proper governance for rent, I'll share my details.' Got PAN and account number in 30 minutes. This is what happens when your landlord values structure.",
          reasoning: "Process-oriented landlord appreciates formalization",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 8,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 5: Hustling Solo Founder (2/5 complete) — "The Bootstrapper"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-021",
      demographics: {
        first_language: "Hindi",
        age: 26,
        occupation: "Startup Founder",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Bootstrapper",
        marital_status: "Unmarried",
      },
      professional_background:
        "Solo founder of a SaaS tool, pre-revenue. ₹0 salary, burns through savings. Rent ₹16K for 1BHK in HSR Layout.",
      cultural_background:
        "From Indore, IIT BHU dropout. Lives in HSR's startup hub. Pays rent from freelance gigs on the side.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 92,
      overall_monologue:
        "₹160/month cashback? That's barely a cutting chai at Third Wave. But the credit card float, now that's interesting. My cash flow is lumpy, some months I have ₹50K from freelance, some months ₹5K. If I can delay rent outflow by 35 days via credit card, that gives me breathing room during dry months. My landlord is a young architect, she was chill about sharing details. The value is in the float, not the cashback.",
      screen_monologues: [
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "1% on ₹16K = ₹160. That's one auto ride. But wait, credit card float? If I can pay rent on card and get 35 extra days... that's the real value for someone with my cash flow pattern.",
          reasoning: "Reframes from cashback to cash flow management tool",
          emotional_state: "recalculating",
          friction_points: ["1% on low rent is underwhelming"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 12,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour wait. Hope my irregular income doesn't disqualify me. This is genuinely useful for founders with lumpy cash flow.",
          reasoning: "Anxiety about income verification for non-salaried applicant",
          emotional_state: "hopeful_but_anxious",
          friction_points: ["No clarity on approval criteria for non-salaried users"],
          decision_outcome: "CONTINUE",
          trust_score: 5, clarity_score: 6, value_score: 7, time_seconds: 6,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-022",
      demographics: {
        first_language: "Kannada",
        age: 26,
        occupation: "Freelance Designer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Bootstrapper",
        marital_status: "Unmarried",
      },
      professional_background:
        "Freelance UI/UX designer. Income varies ₹20-80K/month. Rent ₹16K for 1BHK in Jayanagar 4th Block.",
      cultural_background:
        "Bangalorean. Lives near parents. Landlord is a neighborhood aunty who collects cash.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue:
        "The credit card float was appealing for my irregular income months. But then it asked for landlord's PAN and bank details. My landlord is a local aunty who collects rent in cash on the 1st, she literally comes to my door. She doesn't have a bank account that I know of, and asking for her PAN would be like asking for her Aadhaar. She'd call my parents asking if I'm okay.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My rent is ₹16,000 to a local aunty in Jayanagar 4th Block. She collects rent in cash on the 1st, she literally comes to my door. She doesn't have a bank account that I know of, and asking for her PAN would be like asking for her Aadhaar-linked phone number. She'd ask my parents if I'm okay. This feature is for people with professional landlords, not for people renting from neighborhood aunties.",
          reasoning: "Cash-only landlord with no digital footprint. Flent's assumptions don't match reality.",
          emotional_state: "amused_but_stuck",
          friction_points: ["Cash-only landlord", "No PAN/bank details available"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 5, value_score: 4, time_seconds: 15,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-023",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "Content Creator",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Bootstrapper",
        marital_status: "Unmarried",
      },
      professional_background:
        "YouTube tech reviewer. Income: ₹15-40K/month from AdSense + sponsorships. Rent ₹15K for room in shared apartment in BTM Layout.",
      cultural_background:
        "From Patna. Came to Bangalore for the 'startup scene.' Lives with 2 other creators.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 30,
      overall_monologue:
        "1% on ₹15K = ₹150/month. I spend more than that on cloud storage for my YouTube videos. The value prop just doesn't hit for someone paying ₹15K rent. Maybe when I'm paying ₹40-50K it'll make sense. Right now the ROI on my time filling out this form is negative.",
      screen_monologues: [
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹150/month cashback. I earn more from one Instagram reel. This isn't worth the 10-minute signup for me. Maybe when I'm paying higher rent.",
          reasoning: "Cashback amount too small relative to effort and income volatility",
          emotional_state: "dismissive",
          friction_points: ["₹150/month not worth setup effort"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 8, value_score: 3, time_seconds: 8,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-024",
      demographics: {
        first_language: "Marathi",
        age: 28,
        occupation: "Indie App Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Bootstrapper",
        marital_status: "Unmarried",
      },
      professional_background:
        "Solo app developer with 2 apps on Play Store. Revenue ₹8-25K/month. Rent ₹18K for 1BHK in Koramangala 8th Block.",
      cultural_background:
        "From Nagpur. Engineering from VNIT. Moved to Bangalore for the ecosystem.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 98,
      overall_monologue:
        "The cashback is small but the credit card float is a lifesaver. My app revenue comes in waves, sometimes I'm flush, sometimes scraping by. Paying rent on credit card and having 35 extra days means I can wait for the Google Play payout before the card bill hits. My landlord is a young professional who was fine sharing details. Win.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. Hoping my variable income doesn't flag anything. Genuinely need the float.",
          reasoning: "Cash flow timing more valuable than cashback amount",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-025",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "D2C Founder",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Bootstrapper",
        marital_status: "Unmarried",
      },
      professional_background:
        "Bootstrapping a D2C snack brand. Revenue ₹2L/month but zero salary. Rent ₹8,500 for PG in Electronic City.",
      cultural_background:
        "From Jaipur. BITS Pilani grad. Lives in a PG to minimize costs.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 50,
      overall_monologue:
        "I'm in a PG, I don't have a rental agreement with the building owner. The PG warden collects ₹8,500 from me and I don't even know the actual property owner's name. Flent assumes I have a direct landlord relationship. PG accommodation doesn't work that way. I'll revisit when I graduate to my own apartment.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I'm in a PG in Electronic City, the PG owner has one master lease for the building, not individual agreements with each tenant. My name isn't on any agreement. I just pay ₹8,500/month to the PG warden via PhonePe. Flent assumes I have a one-to-one landlord relationship that simply doesn't exist in PG accommodation. Maybe I'll revisit when I get my own apartment.",
          reasoning: "PG/shared accommodation model doesn't map to Flent's assumption",
          emotional_state: "resigned",
          friction_points: ["No individual rental agreement in PG", "No direct landlord relationship"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 4, value_score: 4, time_seconds: 14,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 6: Senior Manager Renting by Choice (5/5 complete) — "The Intentional Renter"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-026",
      demographics: {
        first_language: "Hindi",
        age: 36,
        occupation: "Director of Engineering",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Intentional Renter",
        marital_status: "Married",
      },
      professional_background:
        "Director of Eng at a unicorn. ₹55L CTC. Deliberately rents a 3BHK in Indiranagar (₹58K/month) while investing the EMI differential in index funds. Net worth ₹1.2Cr.",
      cultural_background:
        "From Allahabad. IIT Delhi + IIM Bangalore. 'Welcome to the right side of renting' is literally his LinkedIn bio tagline.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 70,
      overall_monologue:
        "'Welcome to the right side of renting', finally someone who gets it. Renting is a financial strategy, not a compromise. ₹58K rent × 1% = ₹580/month. But the real play is the credit card float, ₹58K sitting in my Nifty 50 index fund for 35 extra days per month compounds to ~₹4,000/year. My landlord is a doctor who lives abroad, very organized, shared details immediately. This product understands the intentional renter.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "'Rent that rewards you', finally, a product that doesn't treat renting as a failure. I deliberately rent to invest the EMI differential. Flent gets this.",
          reasoning: "Identity validation, product messaging aligns with deliberate-renter philosophy",
          emotional_state: "validated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹580/month. That's my monthly SIP in Parag Parikh Flexi Cap, funded entirely by rent cashback. Beautiful.",
          reasoning: "Maps cashback directly to investment contribution",
          emotional_state: "delighted",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "value_benefits",
          view_name: "Credit Card Float Benefits",
          internal_monologue: "35-day float on ₹58K. At my Nifty 50 XIRR of 14%, that's meaningful. Every day money stays invested is compounding in my favor. This is exactly how rent should work.",
          reasoning: "Float benefit amplified by high-return investment portfolio",
          emotional_state: "impressed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "value_landlord",
          view_name: "Landlord Insurance Value",
          internal_monologue: "₹1.5L insurance, my landlord lives in London, this gives him peace of mind. Good for building the relationship.",
          reasoning: "Landlord benefit as relationship management tool",
          emotional_state: "thoughtful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 8,
        },
        {
          screen_id: "registration",
          view_name: "Registration",
          internal_monologue: "Standard. Number, email, PAN.",
          reasoning: "Routine",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 10,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "Auto-read. Done.",
          reasoning: "Standard",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 9, value_score: 7, time_seconds: 4,
        },
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "Have my registered agreement as PDF, always keep a digital copy. Uploaded in seconds.",
          reasoning: "Organized, digitally-native user with proper documentation",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 10,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My landlord in London responded to my WhatsApp in 10 minutes. He's a doctor, organized. PAN, account number, IFSC. Done.",
          reasoning: "Professional, responsive landlord enables frictionless completion",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 6,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. Fine. This is the first rent product that validates my lifestyle choice. Can't wait to use it.",
          reasoning: "Emotional connection to brand positioning transcends minor friction",
          emotional_state: "enthusiastic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4,
        },
      ],
    },
    // 4 more completing Senior Managers (minimal)
    {
      persona_uuid: "flent-persona-027",
      demographics: { first_language: "Tamil", age: 38, occupation: "VP Product", district: "Bangalore Urban", behavioral_archetype: "The Intentional Renter" },
      professional_background: "VP Product at a SaaS unicorn. ₹60L CTC. Rent ₹62K for 3BHK in Koramangala. Invests ₹2L/month in index funds instead of EMI.",
      cultural_background: "From Chennai. IIM-A. 'Rent is leverage' is his investment thesis.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 68,
      overall_monologue: "₹620/month cashback + credit card float on ₹62K. My rent is my cheapest investment, I get to live in Koramangala AND earn returns on the money that would otherwise be locked in a house. Flent amplifies this strategy. Landlord is a startup founder, shared details instantly.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "72-hour wait. No rush. My rent-to-invest strategy just got a cashback multiplier.", reasoning: "Long-term financial strategy validation", emotional_state: "content", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-028",
      demographics: { first_language: "Hindi", age: 35, occupation: "Senior Engineering Manager", district: "Mumbai Suburban", behavioral_archetype: "The Intentional Renter" },
      professional_background: "Senior EM at a fintech. ₹48L CTC. Rent ₹55K for 2BHK in Andheri West. Could buy, chooses not to.",
      cultural_background: "From Varanasi. Wharton MBA. Views home ownership as a liability in Indian metros.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 75,
      overall_monologue: "₹550/month cashback on ₹55K Andheri rent. My landlord is a developer (builder, not software), he loved the insurance angle. 'Finally something that protects my rental income,' he said. Done in 75 seconds. The product gets that renting can be deliberate, not desperate.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "Review period. My landlord is more excited than me, he's already asking when the insurance activates.", reasoning: "Landlord enthusiasm validates product-market fit", emotional_state: "amused", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-029",
      demographics: { first_language: "Kannada", age: 40, occupation: "CTO", district: "Bangalore Urban", behavioral_archetype: "The Intentional Renter" },
      professional_background: "CTO at a healthtech startup. ₹50L CTC + ESOPs. Rent ₹52K for 3BHK in Whitefield. Net worth ₹2.5Cr in equity.",
      cultural_background: "Bangalorean. BITS Pilani. Writes about rent-vs-buy on Twitter.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 72,
      overall_monologue: "₹520/month cashback + float value. Writing a Twitter thread about Flent, 'Finally a product that monetizes the rent-vs-buy arbitrage.' My landlord in Whitefield is a retired IT professional, very systematic. Shared PAN before I even asked.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "72 hours. I'll write my Twitter thread while I wait. This product is content gold for the rent-vs-buy debate.", reasoning: "Content creation opportunity", emotional_state: "inspired", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-030",
      demographics: { first_language: "Marathi", age: 32, occupation: "Head of Growth", district: "Bangalore Urban", behavioral_archetype: "The Intentional Renter" },
      professional_background: "Head of Growth at a Series C startup. ₹42L CTC. Rent ₹45K for 2BHK in HSR Layout. Maximizes tax benefits + investment returns from renting.",
      cultural_background: "From Pune. ISB grad. Lives with wife (also in tech) in HSR.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 78,
      overall_monologue: "₹450/month cashback. Both my wife and I claim HRA, combined tax savings of ₹40K/year from renting. Flent adds another ₹5,400/year in cashback. Our landlord is a family friend, shared details over dinner. The whole setup took one evening.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "Done. Adding Flent cashback to our couple financial model. Every ₹450/month invested at 14% for 10 years = ₹1.2L. Rent literally compounds.", reasoning: "Long-term compounding calculation on cashback", emotional_state: "satisfied", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 7: Female Professional Living Alone (3/5 complete) — "The Safety-First Renter"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-031",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "UX Researcher",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Safety-First Renter",
        marital_status: "Unmarried",
      },
      professional_background:
        "UX Researcher at a product company in Koramangala. ₹16L CTC. Rent ₹20K for 1BHK in Indiranagar.",
      cultural_background:
        "From Lucknow. Parents worried about her living alone. Prioritizes safety and legitimacy in all services.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 95,
      overall_monologue:
        "I checked Flent's SEBI registration, their funding round on Crunchbase, and their LinkedIn team page before signing up. ₹200/month cashback is nice but the real value for me is formalized payment records, if anything goes wrong with my landlord, I have documented proof of every payment. My landlord is a retired school principal, she was actually happy that payments would be 'official.' I explained the insurance benefit and she said 'achha, chalo, ye toh acchi baat hai.'",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "First thing I check, who's behind this? Any SEBI or RBI registration? Let me Google 'Flent Secured funding' before I go further. Okay, Y Combinator backed, that's legitimate. Proceeding.",
          reasoning: "Trust verification behavior, researches company before engaging",
          emotional_state: "cautious_but_open",
          friction_points: ["Had to leave app to verify legitimacy"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 20,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My landlady is a retired principal. I explained it as 'madam, this makes rent payments official and you get ₹1.5 lakh insurance for free.' She asked her son to verify, he Googled it, confirmed it's legit, and she shared her details. Took a day but it worked.",
          reasoning: "Leveraged landlord's son as trust intermediary",
          emotional_state: "relieved",
          friction_points: ["Required landlord's family to verify before sharing details"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 10,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. I have screenshots of every step. If anything feels off during the 72 hours, I'm out. But so far so good.",
          reasoning: "Documentation behavior as safety net",
          emotional_state: "cautiously_optimistic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-032",
      demographics: {
        first_language: "Telugu",
        age: 25,
        occupation: "Data Analyst",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Safety-First Renter",
        marital_status: "Unmarried",
      },
      professional_background:
        "Data Analyst at an analytics firm in Whitefield. ₹12L CTC. Rent ₹18K for 1BHK in Marathahalli.",
      cultural_background:
        "From Vizag. Parents funded initial deposit. Very cautious about sharing personal information online.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 100,
      overall_monologue:
        "The formalized receipts are what sold me, I can show my parents documented proof that I'm paying rent properly, and claim HRA on taxes. The cashback is a bonus. My landlord is a working woman herself, she understood immediately. 'If they're handling the payment, at least I know it'll come on time every month,' she said.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. Will share the formalized receipt with Amma once it's set up. She'll feel better knowing rent is documented.",
          reasoning: "Parental reassurance through payment documentation",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },
    // Female Professional — 2 drop-offs at landlord_bank
    {
      persona_uuid: "flent-persona-033",
      demographics: {
        first_language: "Hindi",
        age: 25,
        occupation: "HR Executive",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Safety-First Renter",
        marital_status: "Unmarried",
      },
      professional_background:
        "HR Executive at an IT company in Marathahalli. ₹10L CTC. Rent ₹16K for 1BHK in Marathahalli.",
      cultural_background:
        "From Jaipur. Living alone in Bangalore for 1 year. Constantly navigating male landlord power dynamics.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 68,
      overall_monologue:
        "Everything was going well until landlord bank details. I already feel awkward negotiating anything with my landlord because I'm a woman living alone and he's already suspicious about 'why a single girl needs a 1BHK.' Asking for his PAN would make things worse. The power dynamic doesn't allow it. I wish Flent handled the landlord communication for me.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "I already feel awkward negotiating anything with my landlord because I'm a woman living alone and he's already suspicious about 'why a single girl needs a 1BHK.' If I now ask for his PAN card and bank details, it'll raise more questions. He might even ask me to vacate. The power dynamic in Indian landlord-tenant relationships doesn't allow tenants to make demands like this.",
          reasoning: "Gender-specific power dynamic makes requesting landlord details socially risky",
          emotional_state: "uncomfortable",
          friction_points: ["Gender power dynamic with landlord", "Fear of jeopardizing housing"],
          decision_outcome: "DROP_OFF",
          trust_score: 3, clarity_score: 5, value_score: 5, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-034",
      demographics: {
        first_language: "Kannada",
        age: 27,
        occupation: "Content Writer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Safety-First Renter",
        marital_status: "Unmarried",
      },
      professional_background:
        "Content Writer at a D2C brand in Indiranagar. ₹11L CTC. Rent ₹18K for 1BHK in Indiranagar.",
      cultural_background:
        "Bangalorean. Elderly landlady lives downstairs. Informal arrangement.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 58,
      overall_monologue:
        "My landlady is an elderly woman who lives downstairs. Our 'agreement' was a handshake and her saying 'pay ₹18,000 by the 3rd.' I have a one-page letter with the rent amount, but the form says 'registered rental agreement.' This is designed for corporate apartments, not regular Bangalore rentals.",
      screen_monologues: [
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "My landlady is an elderly woman who lives downstairs. Our 'agreement' was a handshake and her saying 'pay ₹18,000 by the 3rd.' There's a one-page letter she gave me with the rent amount written on it, does that count? The upload form says 'registered rental agreement' specifically. This feels like it's designed for corporate-managed apartments, not regular Bangalore rentals.",
          reasoning: "Informal letter doesn't meet 'registered agreement' requirement",
          emotional_state: "disappointed",
          friction_points: ["Informal arrangement", "Form requires registered agreement"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 3, value_score: 6, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-035",
      demographics: {
        first_language: "Tamil",
        age: 29,
        occupation: "Product Manager",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Safety-First Renter",
        marital_status: "Unmarried",
      },
      professional_background:
        "PM at a healthtech startup. ₹18L CTC. Rent ₹22K for 1BHK in HSR Layout.",
      cultural_background:
        "From Coimbatore. Independent. Meticulous about documentation and financial safety.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 90,
      overall_monologue:
        "I have a proper registered agreement and my landlord is a professional who was responsive. The whole point for me is documentation, I want a paper trail for every rent payment. ₹220/month cashback is nice, but the audit trail is priceless. If my landlord ever disputes anything, I have Flent's records.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. The documentation trail from here on will be invaluable. Every payment recorded, every receipt generated. That's worth more than the cashback.",
          reasoning: "Values documentation and legal protection over monetary benefit",
          emotional_state: "secure",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 5,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 8: Tier-2 Transplant (2/5 complete) — "The First-Jobber"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-036",
      demographics: {
        first_language: "Hindi",
        age: 23,
        occupation: "Junior PM",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The First-Jobber",
        marital_status: "Unmarried",
      },
      professional_background:
        "Junior PM at a startup in HSR Layout. ₹8L CTC. First job after college. Rent ₹14K for 1BHK in JP Nagar. Parents partially fund rent.",
      cultural_background:
        "From Hubli. Engineering from local college. Parents in Hubli contributing ₹5K/month to rent.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 98,
      overall_monologue:
        "₹140/month cashback is small but the formalized receipts are the real value, my parents keep asking 'are you paying rent properly? Do you have receipts?' Now I can show them documented proof. My landlord is a young techie, shared PAN easily. The HRA tax benefit alone saves me ₹10K/year.",
      screen_monologues: [
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹140/month. Not much. But wait, formalized rent receipts? My parents will love this. And my CA said I can claim HRA with proper receipts. That's ₹10K/year in tax savings.",
          reasoning: "Parental peace of mind + tax benefit outweighs small cashback",
          emotional_state: "interested",
          friction_points: ["Cashback too small to be the hook"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 10,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My landlord is 30, works in tech. WhatsApped him, he shared PAN and account number in 10 minutes. 'Flent? Yeah, I've heard of it. Go ahead.' Easy when landlord is young.",
          reasoning: "Young, tech-savvy landlord = zero friction",
          emotional_state: "relieved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "Under review. Will share the receipt feature with Appa once it's active. He'll finally stop asking 'do you have receipt?'",
          reasoning: "Parental reassurance through formal receipts",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 5,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-037",
      demographics: {
        first_language: "Kannada",
        age: 22,
        occupation: "Frontend Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The First-Jobber",
        marital_status: "Unmarried",
      },
      professional_background:
        "Frontend dev at a service company. ₹6L CTC. Rent ₹10K for shared 2BHK in Electronic City. First job out of engineering college.",
      cultural_background:
        "From Mysuru. Very first time living away from home. Parents call daily.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 102,
      overall_monologue:
        "₹100/month cashback is basically nothing but my mother said 'at least get rent receipts properly beta.' So here I am. The receipts and tax documentation will help when I file ITR for the first time. My flatmate's landlord is tech-savvy and shared details. More for my parents' peace of mind than the cashback.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72 hours. Will show Amma the receipt when it's ready. That's the real win.",
          reasoning: "Parental compliance motivation",
          emotional_state: "dutiful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 5,
        },
      ],
    },
    // Tier-2 Transplant — 3 drop-offs at landlord_bank
    {
      persona_uuid: "flent-persona-038",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "Testing Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The First-Jobber",
        marital_status: "Unmarried",
      },
      professional_background:
        "Testing engineer at an IT services company. ₹5.5L CTC. Rent ₹12K for shared room in Marathahalli.",
      cultural_background:
        "From Ranchi. First time in a big city. Landlord is elderly uncle from Rajajinagar.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 62,
      overall_monologue:
        "Everything was fine until landlord bank details. My landlord is a retired government officer from Rajajinagar. He barely uses WhatsApp. If I ask him for PAN and bank details for some app, he'll think it's a scam. He told the previous tenant off for asking about online rent transfer. I can't risk my housing situation for ₹120/month.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "I WhatsApped my landlord asking for his PAN and bank details for this rent app. He called back within 2 minutes, not to share details, but to ask if I'm in some kind of trouble. He said 'don't share my details with any app-shapp, I don't trust these things.' He's a retired government officer from Rajajinagar, his pension goes to SBI and that's the only bank he trusts.",
          reasoning: "Elderly landlord actively hostile to fintech. Tenant cannot override.",
          emotional_state: "defeated",
          friction_points: ["Landlord refuses to engage with fintech apps"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 6, value_score: 5, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-039",
      demographics: {
        first_language: "Odia",
        age: 23,
        occupation: "QA Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The First-Jobber",
        marital_status: "Unmarried",
      },
      professional_background:
        "QA at an IT services company in Whitefield. ₹5L CTC. Rent ₹11K for shared room in Whitefield.",
      cultural_background:
        "From Bhubaneswar. Moved to Bangalore 4 months ago. Very respectful of elders, won't push landlord.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 60,
      overall_monologue:
        "My landlord is a 62-year-old retired uncle in Jayanagar. He barely uses WhatsApp. If I ask him for his PAN card to register on some app he's never heard of, he'll think I'm trying to scam him. I can already hear him saying 'what is this Flent-Shent, just pay me on Google Pay like always.' I can't risk this.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "I need my landlord's PAN card? My landlord is a 62-year-old retired uncle who lives in Jayanagar. He barely uses WhatsApp. If I ask him for his PAN card to register on some app he's never heard of, he'll think I'm trying to scam him. I can already hear him saying 'what is this Flent-Shent, just pay me on Google Pay like always.'",
          reasoning: "Elderly landlord won't share PAN with unknown app. Cultural respect prevents pushing.",
          emotional_state: "anxious",
          friction_points: ["Elderly non-tech landlord", "Cultural barrier to requesting financial details"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 5, value_score: 5, time_seconds: 8,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-040",
      demographics: {
        first_language: "Bengali",
        age: 24,
        occupation: "Data Analyst",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The First-Jobber",
        marital_status: "Unmarried",
      },
      professional_background:
        "Data Analyst at an analytics firm in Electronic City. ₹7L CTC. Rent ₹13K for 1BHK in Electronic City.",
      cultural_background:
        "From Kolkata. IEM Kolkata grad. First time in South India. Parents fund ₹4K/month of rent.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue:
        "The formalized receipts would have been great, Baba keeps asking for rent receipts. But I don't know my landlord's PAN. He's the son of the property owner and I deal with him, but I don't even know the actual owner's name. He said he'll 'ask his father' about the PAN 3 days ago. I'm not going to chase them for ₹130/month cashback.",
      screen_monologues: [
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My parents are paying part of my rent. My landlord's son collected the deposit and gave us a receipt. I don't even know the actual landlord's name, it's the son who handles everything. Which person's PAN do I enter? The son said he'll 'ask his father' but that was 3 days ago. I'm not going to chase them for PAN just to get ₹130/month cashback.",
          reasoning: "Proxy landlord management, tenant lacks direct relationship with property owner",
          emotional_state: "impatient",
          friction_points: ["Don't know actual owner", "Proxy management creates PAN confusion"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 4, value_score: 3, time_seconds: 10,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 9: Returning NRI Renter (4/5 complete) — "The Structured Seeker"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-041",
      demographics: {
        first_language: "Hindi",
        age: 34,
        occupation: "Engineering Director",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Structured Seeker",
        marital_status: "Married",
      },
      professional_background:
        "Recently returned from Amazon Seattle. Now Director of Eng at a Bangalore unicorn. ₹60L CTC. Rent ₹70K for 3BHK in Indiranagar.",
      cultural_background:
        "From Delhi. Lived in US for 8 years. Finds Indian rental system 'shockingly informal.' Wife is a doctor setting up practice.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 75,
      overall_monologue:
        "In Seattle, every rent payment was automated through Zelle, receipts were instant, and my lease was a 45-page PDF covering every contingency. In Bangalore? My broker handed me a ₹200 stamp paper agreement, the landlord's 'receipt' is a WhatsApp message saying 'received', and I'm expected to pay via manual NEFT. Flent is the first thing that feels like proper rental infrastructure. ₹700/month cashback is real money, ₹8,400/year. Plus structured payments, formal receipts, and the insurance benefit for my landlord. This is how renting should work in 2026 India.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "Finally, someone building proper rental infrastructure for India. After 8 years in Seattle where Zillow and Zelle made renting seamless, coming back to manual NEFT and WhatsApp receipts was culture shock. Flent looks like what I've been looking for.",
          reasoning: "US rental experience creates strong demand for structured Indian alternative",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 10,
        },
        {
          screen_id: "value_cashback",
          view_name: "Cashback Value Proposition",
          internal_monologue: "₹700/month on ₹70K rent. In the US I was paying $3,500 for a 1-bed in Seattle with zero cashback. Getting paid to pay rent? This is better than the American system.",
          reasoning: "Favorable comparison to US rental experience",
          emotional_state: "impressed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I insisted on a proper registered agreement when I moved in, my US habits. Have the PDF ready. Uploading.",
          reasoning: "NRI-returnee habit of formalizing agreements",
          emotional_state: "prepared",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "My Indiranagar landlord is a retired professor. Called him, explained the structure, 'Sir, it's like Zelle for rent.' He didn't know Zelle but understood the insurance benefit. Shared PAN and bank details next day.",
          reasoning: "Articulate communication + insurance pitch converts educated landlord",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour wait. In the US, everything is instant. But I'll take it, this is still 10x better than the current Indian rental situation. Setting up auto-pay once approved.",
          reasoning: "Patience driven by comparison to worse status quo",
          emotional_state: "accepting",
          friction_points: ["72-hour wait feels anachronistic after US instant approvals"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 5,
        },
      ],
    },
    // Returning NRI — 1 drop at landing
    {
      persona_uuid: "flent-persona-042",
      demographics: {
        first_language: "Tamil",
        age: 38,
        occupation: "VP Engineering",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Structured Seeker",
        marital_status: "Married",
      },
      professional_background:
        "Returned from UK 2 weeks ago. Currently in Airbnb while house-hunting. Will rent in Koramangala. ₹55L CTC.",
      cultural_background:
        "From Madurai. 10 years in London. Just landed, overwhelmed with relocation logistics.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 20,
      overall_monologue:
        "I'm not even renting yet, still in an Airbnb. Someone shared Flent link on the NRI Bangalore WhatsApp group. I'll come back once I've signed a lease. Right now I'm dealing with getting my kids into school, wife's visa paperwork, and finding an apartment. Bookmarking for later.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "Interesting concept but I'm still in an Airbnb hunting for apartments. Don't have a rental yet. Bookmarking this for when I've signed a lease. Too many things going on right now.",
          reasoning: "Not yet a renter, premature in customer journey",
          emotional_state: "overwhelmed_by_relocation",
          friction_points: ["Not yet in rental, product timing mismatch"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 20,
        },
      ],
    },
    // 3 more completing Returning NRI (minimal)
    {
      persona_uuid: "flent-persona-043",
      demographics: { first_language: "Hindi", age: 36, occupation: "Senior PM", district: "Bangalore Urban", behavioral_archetype: "The Structured Seeker" },
      professional_background: "Returned from Google NYC. Senior PM at a Bangalore startup. ₹50L CTC. Rent ₹65K for 3BHK in Koramangala.",
      cultural_background: "From Delhi. 6 years in US. Misses US rental automation. Wife is a consultant.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 78,
      overall_monologue: "₹650/month cashback on Koramangala rent. In NYC I paid $4,200 for a studio, getting cashback on ₹65K feels like a steal. My landlord is a startup exit founder, very digital. Shared details in a Google Sheet. This is how Indian rental should work.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "Under review. Already told my NRI friend group about Flent. Everyone returning to India needs this.", reasoning: "Word-of-mouth advocacy among NRI returnee network", emotional_state: "evangelical", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-044",
      demographics: { first_language: "Marathi", age: 32, occupation: "Data Science Lead", district: "Mumbai Suburban", behavioral_archetype: "The Structured Seeker" },
      professional_background: "Returned from London. DS Lead at a fintech. ₹45L CTC. Rent ₹60K for 2BHK in Bandra.",
      cultural_background: "From Pune. 5 years in UK. Shocked by Mumbai rental practices.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 82,
      overall_monologue: "Bandra landlord wanted 11 months deposit, in London it's 5 weeks max. The Indian rental system is stuck in 1990. Flent is a start. ₹600/month cashback, formal receipts, and structure. My landlord is a doctor, he appreciated the insurance. 'Better than those agents promising insurance and disappearing,' he said.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "72 hours. In London everything was same-day. But Flent is already better than WhatsApp-based rent payments. Progress.", reasoning: "Measured optimism from international benchmark", emotional_state: "patient", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-045",
      demographics: { first_language: "Telugu", age: 40, occupation: "Engineering Director", district: "Bangalore Urban", behavioral_archetype: "The Structured Seeker" },
      professional_background: "Returned from Singapore. ED at a fintech. ₹58L CTC. Rent ₹80K for 4BHK villa in Whitefield.",
      cultural_background: "From Hyderabad. 12 years in Singapore. Family of 4. Needs structured household management.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 80,
      overall_monologue: "₹800/month cashback on ₹80K rent. In Singapore, rent was automated through PropertyGuru. Indian landlords still want manual transfers. Flent bridges that gap. My Whitefield villa landlord is a businessman, immediately saw the insurance value. 'Arey, free insurance? Why not,' he said. Done.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "Under review. ₹800/month × 12 = ₹9,600/year in cashback alone. Plus structured payments. This pays for itself.", reasoning: "Annual value calculation drives satisfaction", emotional_state: "satisfied", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 4 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 10: Landlord-Turned-Investor (3/5 complete) — "The Property Optimizer"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "flent-persona-046",
      demographics: {
        first_language: "Hindi",
        age: 48,
        occupation: "Retired IT Professional",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Property Optimizer",
        marital_status: "Married",
      },
      professional_background:
        "Retired from Infosys at 45 with ₹2Cr corpus. Owns 3 flats, Koramangala, JP Nagar, Whitefield. Total rental income ₹1.2L/month.",
      cultural_background:
        "Bangalorean. Engineering from BMS. Sees real estate as primary wealth vehicle. Evaluating Flent for all 3 properties.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 95,
      overall_monologue:
        "₹1.5L insurance per property × 3 = ₹4.5L total coverage. That's significant, my current insurance costs ₹20K/year and covers less. The tenant cashback doesn't affect me directly but it'll make my tenants more likely to pay on time and stay longer. Registered for my Koramangala flat first, will add JP Nagar and Whitefield once I see how it works. The 72-hour wait is annoying but understandable for a new platform.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "₹1.5L landlord insurance, this caught my eye immediately. I lost ₹2L when my Whitefield tenant absconded last year. If Flent can protect against that, I'm interested.",
          reasoning: "Personal loss experience makes insurance proposition immediately tangible",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 12,
        },
        {
          screen_id: "value_landlord",
          view_name: "Landlord Insurance Value",
          internal_monologue: "₹1.5L coverage, automatic claims, protection against non-payment. This is exactly what happened with my Whitefield tenant. If I'd had this, I'd have recovered ₹1.5L of the ₹2L loss. For free? What's the catch?",
          reasoning: "Insurance value prop directly maps to lived experience of rental default",
          emotional_state: "very_interested_but_cautious",
          friction_points: ["What's the catch? Free insurance feels too good"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 9, time_seconds: 14,
        },
        {
          screen_id: "rental_agreement",
          view_name: "Rental Agreement Upload",
          internal_monologue: "I have registered agreements for all 3 properties, my lawyer insists on it. Uploading the Koramangala one. Well-organized PDFs in my Google Drive.",
          reasoning: "Multi-property landlord with proper documentation habits",
          emotional_state: "organized",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 12,
        },
        {
          screen_id: "landlord_bank",
          view_name: "Landlord Bank Details",
          internal_monologue: "Entering my own bank details. PAN, HDFC account number, IFSC. Straightforward. I'm the landlord here.",
          reasoning: "Landlord entering own details, no dependency friction",
          emotional_state: "smooth",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 8,
        },
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "72-hour review. Acceptable for a first property. If this works, I'm adding 2 more. ₹4.5L total coverage across my portfolio. Better than my current ₹20K/year insurance policy.",
          reasoning: "Evaluating as pilot before full portfolio onboarding",
          emotional_state: "strategic",
          friction_points: ["72-hour wait is acceptable for first try but won't be for each additional property"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 8, time_seconds: 6,
        },
      ],
    },
    // Landlord-Investor — 2 drops at application_status
    {
      persona_uuid: "flent-persona-047",
      demographics: {
        first_language: "Kannada",
        age: 52,
        occupation: "Property Investor",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Property Optimizer",
        marital_status: "Married",
      },
      professional_background:
        "Retired ex-HCL. Owns 4 properties in HSR, Koramangala, JP Nagar, Electronic City. Rental income ₹1.6L/month.",
      cultural_background:
        "Bangalorean. Conservative investor. Treats rental income as pension supplement.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 85,
      overall_monologue:
        "I spent 20 minutes filling out everything, property details, tenant info, bank account, PAN. And now it says '72-hour review period' and I'm on a 'waitlist'? I own 3 flats. I'm the customer. If you want landlords, don't make them feel like they're applying for a job. I'll check back but this better not be a gimmick.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "I spent 20 minutes filling out everything, my property details, tenant info, bank account, PAN. And now it says '72-hour review period' and I'm on a 'waitlist'? Waitlist for what? To insure MY property? I own 3 flats. I'm the customer here. If you want landlords to sign up, don't make them feel like they're applying for a job. I'll check back in a week but this better not be one of those 'exclusive launch' gimmicks.",
          reasoning: "High-value landlord perceives waitlist as disrespectful",
          emotional_state: "indignant",
          friction_points: ["72-hour waitlist after full data submission", "Feels like applying for permission to use own money"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 6, value_score: 6, time_seconds: 8,
        },
      ],
    },
    {
      persona_uuid: "flent-persona-048",
      demographics: {
        first_language: "Tamil",
        age: 55,
        occupation: "Real Estate Investor",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Property Optimizer",
        marital_status: "Married",
      },
      professional_background:
        "Serial property investor. Owns 3 properties in Koramangala, Indiranagar, Whitefield. Rental income ₹1.8L/month.",
      cultural_background:
        "From Thanjavur. Retired banker. Very process-oriented. Evaluates all platforms rigorously.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue:
        "₹1.5L insurance sounded reasonable but the 72-hour wait plus the unclear activation timeline puts me off. My insurance broker sets up policies in 48 hours. If Flent requires a 3-month active subscription before insurance kicks in, combined with this waitlist, I'm looking at 4+ months before actual protection. Not competitive.",
      screen_monologues: [
        {
          screen_id: "application_status",
          view_name: "Application Status",
          internal_monologue: "So I've given Flent my PAN, bank details, property documents, and tenant information. And now I wait 72 hours to find out if I 'qualify'? Qualify for what, paying for my own insurance? The ₹1.5L coverage sounded reasonable but if there's a 3-month activation period on top of this waitlist, I'm looking at 4+ months before any actual protection. My current insurance broker can set up a policy in 48 hours.",
          reasoning: "Comparing Flent's activation timeline unfavorably to traditional channels",
          emotional_state: "skeptical",
          friction_points: ["Combined waitlist + activation period makes timeline uncompetitive"],
          decision_outcome: "DROP_OFF",
          trust_score: 3, clarity_score: 5, value_score: 4, time_seconds: 8,
        },
      ],
    },
    // 2 more completing Landlord-Investors (minimal)
    {
      persona_uuid: "flent-persona-049",
      demographics: { first_language: "Hindi", age: 50, occupation: "Retired Army Officer", district: "Bangalore Urban", behavioral_archetype: "The Property Optimizer" },
      professional_background: "Retired Colonel. Owns 2 flats in Whitefield. Rental income ₹55K/month. Pension ₹80K/month.",
      cultural_background: "From Jaipur. Settled in Bangalore after retirement. Very disciplined and document-oriented.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 92,
      overall_monologue: "₹1.5L insurance per flat = ₹3L coverage. My last tenant in Whitefield caused ₹80K in damages before vacating. This would have covered it. The 72-hour wait is fine, in the army we waited months for postings. Patience is a virtue. Registered my first flat, will add the second once approved.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "72-hour review. I've filed applications that took 6 months. This is nothing. Insurance coverage is the priority.", reasoning: "Military patience and long-term thinking", emotional_state: "disciplined", friction_points: [], decision_outcome: "CONTINUE", trust_score: 6, clarity_score: 7, value_score: 8, time_seconds: 4 },
      ],
    },
    {
      persona_uuid: "flent-persona-050",
      demographics: { first_language: "Marathi", age: 58, occupation: "Chartered Accountant", district: "Bangalore Urban", behavioral_archetype: "The Property Optimizer" },
      professional_background: "Practicing CA with own firm. Owns 2 flats in JP Nagar. Rental income ₹40K/month. Evaluating Flent for tax documentation benefits.",
      cultural_background: "From Belgaum. Settled in Bangalore 30 years ago. Meticulous about financial records.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue: "As a CA, I see the dual benefit, insurance protection AND automated rent receipts for my tenant (which means fewer HRA queries from their employers calling me to verify). ₹1.5L coverage is reasonable for the property risk. My agreement is registered and PAN is always handy. Clean process.",
      screen_monologues: [
        { screen_id: "application_status", view_name: "Application Status", internal_monologue: "72 hours. As a CA I understand verification processes. The documentation benefit alone makes this worthwhile for my tax records.", reasoning: "Professional expertise validates process requirement", emotional_state: "understanding", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 4 },
      ],
    },

  ],
};
