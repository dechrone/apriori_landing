import type { SimulationData } from "@/types/simulation";

/**
 * Grip Invest — SEBI-registered corporate bond investment platform.
 * Up to 12.5% fixed returns on corporate bonds.
 * 50 synthetic Indian personas across 10 sub-segments.
 * 32 completers, 18 drop-offs. 64% completion rate.
 * Non-linear flow with branch at discover_dashboard.
 * Used as sample/demo data for the simulation report UI.
 */
export const gripInvestSimData: SimulationData = {
  simulation_id: "grip-invest-sim-20260402-001",
  flow_id: "grip_invest_onboarding_v1",
  flow_name: "Grip Invest — Corporate Bond Investment Onboarding",
  generated_at: "2026-04-02T14:00:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 50,
    completed: 32,
    dropped_off: 18,
    completion_rate_pct: 64.0,
    avg_time_to_complete_seconds: 140,
    dominant_plan: "Complete KYC",
    dominant_plan_pct: 68.8,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 50,
    margin_of_error_pct: 8.7,
    confidence_level: "80%",
    note: "Sample size of 50 provides adequate directional signal at 80% confidence (±8.7%). Sub-segment sizes of 5 are directional only. Increase to 100+ for statistically significant sub-segment analysis.",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {
    "Complete KYC": { count: 22, pct: 68.8 },
    "Browse Bonds": { count: 10, pct: 31.2 },
  },

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 32, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "kyc_pan_entry", drop_offs: 4, drop_off_pct: 8.0 },
    { screen_id: "phone_email", drop_offs: 3, drop_off_pct: 6.0 },
    { screen_id: "discover_dashboard", drop_offs: 3, drop_off_pct: 6.0 },
    { screen_id: "profile_setup", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "landing", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "kyc_pan_details", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "bond_listing", drop_offs: 1, drop_off_pct: 2.0 },
    { screen_id: "bond_detail", drop_offs: 1, drop_off_pct: 2.0 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "KYC requires PAN card sharing with unknown platform",
      frequency: 14,
    },
    {
      friction:
        "'Indian numbers only' blocks NRI investors with foreign SIM",
      frequency: 8,
    },
    {
      friction:
        "BBB-rated bonds feel risky for first-time fixed-income investors",
      frequency: 7,
    },
    {
      friction:
        "12.5% yield sounds too good to be true vs 7% FD",
      frequency: 6,
    },
    {
      friction:
        "'Indian citizen' declaration blocks NRI investment",
      frequency: 5,
    },
    {
      friction:
        "No option to invest small amounts to test the platform",
      frequency: 5,
    },
    {
      friction:
        "₹98,389 minimum for 10-unit bond purchase is steep entry",
      frequency: 4,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    landing: {
      avg_trust: 7.8,
      avg_clarity: 8.2,
      avg_value: 7.5,
      avg_time_s: 12,
      sample_size: 50,
    },
    phone_email: {
      avg_trust: 6.4,
      avg_clarity: 7.6,
      avg_value: 6.2,
      avg_time_s: 18,
      sample_size: 48,
    },
    otp_verify: {
      avg_trust: 6.8,
      avg_clarity: 8.4,
      avg_value: 6.4,
      avg_time_s: 10,
      sample_size: 45,
    },
    profile_setup: {
      avg_trust: 6.2,
      avg_clarity: 6.8,
      avg_value: 6.0,
      avg_time_s: 22,
      sample_size: 45,
    },
    discover_dashboard: {
      avg_trust: 7.4,
      avg_clarity: 7.0,
      avg_value: 7.8,
      avg_time_s: 20,
      sample_size: 43,
    },
    kyc_pan_entry: {
      avg_trust: 5.2,
      avg_clarity: 6.4,
      avg_value: 5.8,
      avg_time_s: 25,
      sample_size: 30,
    },
    kyc_pan_details: {
      avg_trust: 5.8,
      avg_clarity: 6.2,
      avg_value: 6.0,
      avg_time_s: 18,
      sample_size: 26,
    },
    bond_listing: {
      avg_trust: 7.2,
      avg_clarity: 6.6,
      avg_value: 7.6,
      avg_time_s: 22,
      sample_size: 13,
    },
    bond_detail: {
      avg_trust: 7.0,
      avg_clarity: 5.8,
      avg_value: 7.4,
      avg_time_s: 28,
      sample_size: 12,
    },
    otp_verify_passthrough: {
      avg_trust: 7.0,
      avg_clarity: 8.6,
      avg_value: 6.6,
      avg_time_s: 8,
      sample_size: 45,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "64% completion rate, but a stark segment divide: experienced investors (IT professionals, FIRE chasers, CAs) convert at 80-100%, while NRI users are completely blocked (0% completion) by the 'Indian numbers only' gate and 'Indian citizen' KYC declaration. The second biggest barrier is KYC intimidation — retired users and first-gen investors find PAN verification frightening on an unfamiliar fintech platform, dropping 80% at the KYC screen.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "task_failure",
      screen: "phone_email",
      finding:
        "NRI investors with foreign phone numbers are completely blocked from onboarding — 0% completion for this segment",
      evidence:
        "All 5 NRI personas dropped off: 3 at phone_email (Indian numbers only), 2 reached later but blocked at kyc_pan_details (Indian citizen declaration). NRE/NRO account holders with ₹20-50L in idle funds are structurally excluded.",
      affected_segments: ["The Blocked User"],
      recommendation:
        "Add international phone number support with country code selector, and create a dedicated NRI onboarding path supporting NRE/NRO account KYC.",
    },
    {
      severity: "critical",
      type: "trust_issue",
      screen: "kyc_pan_entry",
      finding:
        "KYC PAN entry screen causes 80% drop-off among retired users and 60% among first-gen investors due to trust deficit with sharing PAN on unknown fintech",
      evidence:
        "4 of 18 total drop-offs occur at kyc_pan_entry. Retired Officers (4/5 dropped before or at KYC) and First-Gen Women Investors (3/5 dropped) cite fear of PAN misuse. Trust scores drop to 3.2 avg for these segments vs 7.1 for tech-savvy segments.",
      affected_segments: ["The Digital Novice", "The Cautious Explorer"],
      recommendation:
        "Offer assisted KYC via video call for users who stall >60s on PAN entry. Show SEBI registration certificate and RBI compliance badges inline. Add 'Your PAN is encrypted and never stored' reassurance.",
    },
    {
      severity: "major",
      type: "confusion",
      screen: "bond_listing",
      finding:
        "BBB-rated bonds displayed alongside AAA bonds cause risk perception confusion — first-time investors equate BBB with 'bad'",
      evidence:
        "7 personas mentioned BBB rating concern in friction points. 1 dropped off at bond_listing specifically due to seeing a BBB-rated bond. First-Gen Women and Freelancers showed clarity scores of 4.8 on bond_listing vs 7.4 for CAs and IT workers.",
      affected_segments: ["The Cautious Explorer", "The Flexibility Seeker"],
      recommendation:
        "Default-filter to AA and above for new users. Add a rating explainer tooltip: 'What do CRISIL ratings mean?' with visual risk scale. Show BBB bonds only after user explicitly expands filters.",
    },
    {
      severity: "major",
      type: "trust_issue",
      screen: "landing",
      finding:
        "12.5% yield headline triggers 'too good to be true' skepticism — users compare to 7% FD and suspect fraud",
      evidence:
        "6 personas across segments flagged yield skepticism. 2 dropped off at landing itself. Even completers noted initial hesitation. Trust score for landing (7.8) masks segment variance: First-Gen Women scored 5.4, Retired Officers scored 4.8.",
      affected_segments: ["The Cautious Explorer", "The Digital Novice"],
      recommendation:
        "Add 'Why bonds yield more than FDs' educational module on landing. Show yield breakdown: coupon rate, credit spread, maturity premium. Compare to SBI FD rate explicitly with source citation.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "bond_detail",
      finding:
        "₹98,389 minimum investment (10-unit lot) is a steep entry barrier for testing the platform",
      evidence:
        "4 personas cited minimum investment as a friction point. 1 dropped off at bond_detail when they saw the lot size. Freelancers and First-Gen Women Investors noted wanting to 'start with ₹5,000 to test'.",
      affected_segments: ["The Cautious Explorer", "The Flexibility Seeker"],
      recommendation:
        "Introduce a ₹5,000 minimum starter bond or fractional bond units to lower the entry barrier for first-time users.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "Stark digital literacy and financial sophistication divide: FIRE-chasing tech workers and IT MF Maximizers (100% completion) are already comfortable with digital finance, understand credit ratings, and actively seek fixed-income diversification beyond FDs. NRI investors (0% completion) are structurally excluded despite being a high-value segment. Retired Officers (20% completion) face digital intimidation from KYC/demat language.",
    high_propensity_segment:
      "FIRE-chasing tech workers and IT MF Maximizers — already comfortable with digital finance, understand credit ratings, and actively seeking fixed-income diversification beyond FDs. 100% completion rate, avg time 110s, all chose KYC-first path.",
    low_propensity_segment:
      "NRI investors (0% completion — structurally blocked) and Retired Officers (80% drop-off at KYC — digital-first flow without phone-assisted option is a non-starter for this demographic).",
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "NRI investors are structurally excluded by the 'Indian numbers only' phone gate and 'Indian citizen' KYC declaration — this is leaving money on the table from a segment with ₹20-50L in idle NRE accounts. For domestic users, KYC completion is the gating bottleneck: 4 of 18 drop-offs happen at PAN entry.",
    what_works: [
      {
        element: "SEBI registration badge on landing page",
        why: "Immediately establishes regulatory credibility — trust scores 8+ for all segments on landing",
        for_whom: "All segments, especially First-Gen Women and Small-Town CAs who look for regulatory signals",
      },
      {
        element: "Discover dashboard with yield-sorted bond cards",
        why: "Visual yield comparison (12.5% vs 7% FD) creates immediate value perception for sophisticated investors",
        for_whom: "IT MF Maximizers, FIRE Tech Workers, HNI Wealth Managers",
      },
      {
        element: "Sell Anytime liquidity feature",
        why: "Addresses the biggest objection to bonds (lock-in) — especially resonates with crypto-burned millennials seeking predictability with flexibility",
        for_whom: "Crypto-Burned Millennials, Freelancers, Salaried Couples",
      },
      {
        element: "NSE settlement guarantee messaging",
        why: "Settlement via NSE platform adds institutional trust layer beyond just SEBI registration",
        for_whom: "Small-Town CAs, HNI Wealth Managers, First-Gen Women Investors",
      },
    ],
    what_needs_fixing: [
      {
        element: "Phone number entry — Indian numbers only",
        problem: "NRI investors with foreign SIMs cannot enter the flow at all",
        for_whom: "NRI Parking Idle Money segment (5/5 blocked)",
        fix: "Add country code selector with international number support and NRE/NRO-compatible KYC path",
        priority: "P0",
      },
      {
        element: "KYC PAN entry screen — trust deficit",
        problem: "Retired officers and first-gen investors fear PAN misuse on unknown fintech platform",
        for_whom: "Retired Government Officers, First-Gen Women Investors",
        fix: "Offer video-call assisted KYC for users 50+ or those stalling >60s. Show encryption + SEBI compliance inline.",
        priority: "P0",
      },
      {
        element: "Indian citizen declaration in KYC",
        problem: "NRI investors who make it past phone gate are blocked by citizen-only declaration",
        for_whom: "NRI Parking Idle Money segment",
        fix: "Add NRI/PIO/OCI options with corresponding NRE/NRO account KYC workflow",
        priority: "P1",
      },
      {
        element: "BBB-rated bonds in default listing",
        problem: "Lower-rated bonds displayed alongside AAA create risk confusion for novice investors",
        for_whom: "First-Gen Women Investors, Freelancers",
        fix: "Default to AA+ and above for new users; add CRISIL rating explainer tooltip",
        priority: "P2",
      },
    ],
    usability_score: 7,
    emotional_journey_map: {
      completers:
        "Curious (landing — 'SEBI registered, interesting') → Neutral (phone/OTP — standard) → Mildly tedious (profile setup) → Excited (discover dashboard — 'wow, 12.5% vs my 7% FD!') → Slightly anxious (KYC PAN entry — 'is this safe?') → Reassured (KYC details auto-filled — 'oh, it knows my name from PAN') → Confident (bond listing — 'AA+ CRISIL, NSE settled') → Resolved (bond detail — 'let me start with one bond')",
      drop_offs:
        "Skeptical (landing — '12.5% sounds like a scam') → [EXIT] OR Frustrated (phone_email — 'Indian numbers only? I'm in Dubai!') → [EXIT] OR Anxious (KYC PAN entry — 'they want my PAN? I don't trust this app with my tax details') → Fearful ('what if they access my bank account?') → [EXIT] OR Confused (bond listing — 'what does BBB mean? Is this risky?') → [EXIT]",
    },
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 10,
    screens: {
      kyc_pan_entry: {
        total_drop_offs: 4,
        clusters: [
          {
            cluster_id: 1,
            label: "PAN sharing trust deficit",
            persona_count: 2,
            representative_reasoning:
              "I don't trust sharing my PAN card with an app I just downloaded. PAN is linked to my income tax, bank accounts, everything. What if there's a data breach? I've read about fintech companies leaking data. I'll stick to my SBI FD where I don't need to share anything online.",
          },
          {
            cluster_id: 2,
            label: "KYC process too complex for non-digital users",
            persona_count: 2,
            representative_reasoning:
              "It's asking for PAN card and saying something about KYC registration agencies accessing my details. I don't understand what this means. My son set up my PhonePe — he can help me with this, but he's in Hyderabad and won't visit until Diwali. I'll wait.",
          },
        ],
      },
      phone_email: {
        total_drop_offs: 3,
        clusters: [
          {
            cluster_id: 1,
            label: "Indian number only blocks NRI",
            persona_count: 2,
            representative_reasoning:
              "I've been in Dubai for 8 years and my Indian SIM is disconnected. They only accept +91 numbers. I have ₹35 lakh sitting in an NRE FD earning 6.5% — I was ready to move ₹15 lakh into bonds. But I can't even create an account. Wint Wealth or IndiaBonds might accept my UAE number.",
          },
          {
            cluster_id: 2,
            label: "Privacy concern",
            persona_count: 1,
            representative_reasoning:
              "I want to see the bonds and yields first before giving my phone number. Every fintech app in India starts calling you 5 times a day once you register. Just let me browse the bond catalog first.",
          },
        ],
      },
      discover_dashboard: {
        total_drop_offs: 3,
        clusters: [
          {
            cluster_id: 1,
            label: "12.5% yield skepticism",
            persona_count: 2,
            representative_reasoning:
              "12.5% return on a bond? My FD gives 7% and that's from SBI — a government bank. How can some company I've never heard of give me almost double? This smells like those YouTube trading scam ads. I'll ask my CA cousin about this before putting any money in.",
          },
          {
            cluster_id: 2,
            label: "Not ready to commit",
            persona_count: 1,
            representative_reasoning:
              "The dashboard is showing me bonds and yields but I don't even understand the difference between YTM and coupon rate. I need to learn about bonds first before I invest. Let me watch some videos on this and come back when I understand what I'm looking at.",
          },
        ],
      },
    },
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "IT Salaried MF Maximizer",
    "Small-Town CA",
    "NRI Parking Idle Money",
    "First-Gen Woman Investor",
    "Retired Government Officer",
    "Crypto-Burned Millennial",
    "HNI Wealth Manager",
    "Salaried Couple Saving for House",
    "Freelancer with Lumpy Income",
    "FIRE-Chasing Tech Worker",
  ],

  segment_completion_summary: [
    {
      segment: "NRI Parking Idle Money",
      total: 5,
      completed: 0,
      dropped: 5,
      completion_pct: 0,
      top_drop_off_screen: "phone_email",
      top_drop_off_reason: "Indian number only blocks NRI",
    },
    {
      segment: "Retired Government Officer",
      total: 5,
      completed: 1,
      dropped: 4,
      completion_pct: 20,
      top_drop_off_screen: "kyc_pan_entry",
      top_drop_off_reason: "KYC process too complex for non-digital users",
    },
    {
      segment: "First-Gen Woman Investor",
      total: 5,
      completed: 2,
      dropped: 3,
      completion_pct: 40,
      top_drop_off_screen: "kyc_pan_entry",
      top_drop_off_reason: "PAN sharing trust deficit",
    },
    {
      segment: "Freelancer with Lumpy Income",
      total: 5,
      completed: 3,
      dropped: 2,
      completion_pct: 60,
      top_drop_off_screen: "kyc_pan_entry",
      top_drop_off_reason: "PAN sharing trust deficit",
    },
    {
      segment: "Small-Town CA",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "bond_listing",
      top_drop_off_reason: "12.5% yield skepticism",
    },
    {
      segment: "Crypto-Burned Millennial",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "profile_setup",
      top_drop_off_reason: "Not ready to commit",
    },
    {
      segment: "HNI Wealth Manager",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "discover_dashboard",
      top_drop_off_reason: "12.5% yield skepticism",
    },
    {
      segment: "Salaried Couple Saving for House",
      total: 5,
      completed: 4,
      dropped: 1,
      completion_pct: 80,
      top_drop_off_screen: "discover_dashboard",
      top_drop_off_reason: "12.5% yield skepticism",
    },
    {
      segment: "IT Salaried MF Maximizer",
      total: 5,
      completed: 5,
      dropped: 0,
      completion_pct: 100,
      top_drop_off_screen: "",
      top_drop_off_reason: "",
    },
    {
      segment: "FIRE-Chasing Tech Worker",
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
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Retired Government Officer": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Crypto-Burned Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    phone_email: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 5, dropped_off: 3, drop_off_pct: 60.0 },
      "First-Gen Woman Investor": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Retired Government Officer": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Crypto-Burned Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    otp_verify: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Retired Government Officer": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Crypto-Burned Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    profile_setup: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Retired Government Officer": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Crypto-Burned Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    discover_dashboard: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 3, dropped_off: 1, drop_off_pct: 33.3 },
      "Retired Government Officer": { reached: 3, dropped_off: 1, drop_off_pct: 33.3 },
      "Crypto-Burned Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    kyc_pan_entry: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
      "Retired Government Officer": { reached: 2, dropped_off: 2, drop_off_pct: 100.0 },
      "Crypto-Burned Millennial": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 3, dropped_off: 1, drop_off_pct: 33.3 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    kyc_pan_details: {
      "IT Salaried MF Maximizer": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 2, dropped_off: 2, drop_off_pct: 100.0 },
      "First-Gen Woman Investor": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Retired Government Officer": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Crypto-Burned Millennial": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    bond_listing: {
      "IT Salaried MF Maximizer": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
      "NRI Parking Idle Money": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Retired Government Officer": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Crypto-Burned Millennial": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
    },
    bond_detail: {
      "IT Salaried MF Maximizer": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Small-Town CA": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "NRI Parking Idle Money": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "First-Gen Woman Investor": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
      "Retired Government Officer": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
      "Crypto-Burned Millennial": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "HNI Wealth Manager": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Salaried Couple Saving for House": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Freelancer with Lumpy Income": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "FIRE-Chasing Tech Worker": { reached: 0, dropped_off: 0, drop_off_pct: 0 },
    },
  },

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    kyc_pan_entry: [
      {
        persona_uuid: "grip-persona-025",
        persona_label: "62yo Retired Block Development Officer, Varanasi",
        behavioral_archetype: "The Digital Novice",
        internal_monologue:
          "My son showed me this app that gives 12% — better than my SBI FD. But now it's asking for my PAN card and something about 'KYC registration agencies will access my bank details.' I don't understand — I thought I was just looking at bonds, not giving access to my bank account. The last time I shared my Aadhaar at a telecom shop, someone opened a fake loan in my name. Let me ask Raju to do this for me next weekend.",
        reasoning:
          "Past negative experience with identity document misuse. Unclear KYC language triggers fear of unauthorized bank access.",
        emotional_state: "fearful",
        trust_score: 2,
        clarity_score: 3,
        value_score: 6,
      },
      {
        persona_uuid: "grip-persona-026",
        persona_label: "58yo Retired Tehsildar, Lucknow",
        behavioral_archetype: "The Digital Novice",
        internal_monologue:
          "PAN card number? I know my PAN but I've never typed it into a phone app before. My wife's PPF and my pension — everything is at the post office and SBI branch. The manager there knows us by name. This app doesn't even have a phone number I can call if something goes wrong. What's a 'demat account'? I have a locker at SBI, not a demat account.",
        reasoning:
          "Complete unfamiliarity with digital KYC and demat concepts. Relies on relationship-based banking.",
        emotional_state: "confused",
        trust_score: 3,
        clarity_score: 2,
        value_score: 5,
      },
      {
        persona_uuid: "grip-persona-019",
        persona_label: "28yo Freelance Graphic Designer, Bhopal",
        behavioral_archetype: "The Flexibility Seeker",
        internal_monologue:
          "I got a ₹2.5 lakh payment from a client last week and wanted to park it somewhere better than my savings account. The yields looked good on the dashboard. But PAN verification? I file my taxes through a CA — I'm not sure about entering my PAN into every fintech app. What if they report something to the IT department that my CA hasn't filed yet? I'll ask my CA first and come back.",
        reasoning:
          "Tax compliance anxiety — fears PAN sharing could trigger unwanted IT department scrutiny on freelance income.",
        emotional_state: "anxious",
        trust_score: 4,
        clarity_score: 5,
        value_score: 7,
      },
      {
        persona_uuid: "grip-persona-020",
        persona_label: "27yo First-Time Investor, Pune",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "This is my first time trying to invest anywhere beyond my savings account. SEBI registered looks real. But now they want my PAN? I've heard PAN can be misused for loans. My salary is only ₹9 lakh and I don't want to get into any trouble. I'll ask Priya from accounts — she invests in mutual funds and she'll know if Grip is safe.",
        reasoning:
          "First-time investor anxiety. No personal reference point for PAN sharing with fintech platforms.",
        emotional_state: "nervous",
        trust_score: 3,
        clarity_score: 5,
        value_score: 6,
      },
    ],
    phone_email: [
      {
        persona_uuid: "grip-persona-011",
        persona_label: "38yo Senior Manager, Dubai (Indian NRI)",
        behavioral_archetype: "The Blocked User",
        internal_monologue:
          "I'm trying to park my NRE FD maturity amount — ₹35 lakh just sitting in HDFC earning 6.5%. But they only accept Indian numbers? I've been in Dubai for 8 years, my Indian SIM is disconnected. My wife has an Indian number but this is supposed to be my investment. I need it in my name for tax purposes. I'll check if Wint Wealth handles NRI accounts better.",
        reasoning:
          "Structurally blocked — foreign phone number not accepted. NRE FD maturity creating urgency to find alternative.",
        emotional_state: "frustrated",
        trust_score: 6,
        clarity_score: 7,
        value_score: 8,
      },
      {
        persona_uuid: "grip-persona-012",
        persona_label: "34yo Tech Lead, San Jose (Indian NRI)",
        behavioral_archetype: "The Blocked User",
        internal_monologue:
          "I was looking at Indian fixed-income options to diversify my US portfolio. 12.5% in INR bonds while USD earns 4.5% in T-bills — even after currency depreciation, the carry trade makes sense. But I can't even sign up with my US number? This is 2026 — even RazorpayX lets me use my US number. Disappointing. I'll stick with IndiaBonds.",
        reasoning:
          "Sophisticated investor doing cross-currency arbitrage calculation. Blocked by basic UX limitation.",
        emotional_state: "disappointed",
        trust_score: 5,
        clarity_score: 8,
        value_score: 9,
      },
      {
        persona_uuid: "grip-persona-013",
        persona_label: "42yo Business Owner, Singapore (Indian NRI)",
        behavioral_archetype: "The Blocked User",
        internal_monologue:
          "My CA in Mumbai recommended Grip for parking NRO account funds. I have about ₹20 lakh in my NRO savings earning 3.5%. Corporate bonds at 11-12% would be significantly better. But the very first step requires an Indian phone number. I moved to Singapore 12 years ago. I'll ask my CA to check if I can use my brother's number — but that creates compliance issues with FEMA.",
        reasoning:
          "CA-recommended platform but blocked at entry. FEMA compliance concern prevents workaround.",
        emotional_state: "exasperated",
        trust_score: 6,
        clarity_score: 7,
        value_score: 9,
      },
    ],
    discover_dashboard: [
      {
        persona_uuid: "grip-persona-021",
        persona_label: "29yo Junior Analyst, Gurgaon",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "SEBI registered, that's good. But 12.50% returns? My FD gives 7%. How can bonds give almost double? Is this like those YouTube ads for trading apps? My colleague lost ₹3 lakh in some P2P lending platform that also promised high returns. I'll ask my colleague Priya who does mutual funds — she'll know if Grip is legitimate.",
        reasoning:
          "Yield skepticism driven by awareness of P2P lending failures. Needs social proof from trusted peer.",
        emotional_state: "suspicious",
        trust_score: 4,
        clarity_score: 6,
        value_score: 5,
      },
      {
        persona_uuid: "grip-persona-027",
        persona_label: "60yo Retired Headmaster, Jaipur",
        behavioral_archetype: "The Digital Novice",
        internal_monologue:
          "I made it to this dashboard somehow. There are all these bonds with percentages — 12.5%, 11.8%, 10.2%. I don't know what 'YTM' means. 'CRISIL AA+' — is that good or bad? Back in my time we just went to the bank and the manager explained everything. This app assumes I already know what corporate bonds are. I need my nephew Amit to explain this to me.",
        reasoning:
          "Information overload — financial terminology (YTM, CRISIL ratings) is impenetrable for non-investor.",
        emotional_state: "overwhelmed",
        trust_score: 5,
        clarity_score: 2,
        value_score: 4,
      },
      {
        persona_uuid: "grip-persona-044",
        persona_label: "25yo Content Writer, Chandigarh",
        behavioral_archetype: "The Flexibility Seeker",
        internal_monologue:
          "The dashboard looks nice but I just got my first big freelance payment — ₹1.8 lakh. I don't even know if I should put this in bonds or a liquid fund. My friend says liquid funds give 7% and I can withdraw anytime. These bonds say 'Sell Anytime' but is it really anytime? What if I need the money next month for rent? I should research more before committing.",
        reasoning:
          "Financial literacy gap — cannot distinguish between bond liquidity and liquid fund liquidity.",
        emotional_state: "uncertain",
        trust_score: 6,
        clarity_score: 4,
        value_score: 6,
      },
    ],
    landing: [
      {
        persona_uuid: "grip-persona-018",
        persona_label: "31yo Homemaker, Noida",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "My husband said to check out this app for investing my PPF maturity money. '12.5% fixed returns' — this sounds exactly like that WhatsApp forward scam my mother-in-law fell for. She lost ₹50,000 in some chit fund that promised 15%. Even if Grip is SEBI registered, I've seen enough news about NBFCs shutting down. I'll tell my husband to ask his office colleagues first.",
        reasoning:
          "Chit fund and NBFC failure PTSD. Family experience with financial fraud makes any high-yield claim suspect.",
        emotional_state: "skeptical",
        trust_score: 3,
        clarity_score: 7,
        value_score: 3,
      },
      {
        persona_uuid: "grip-persona-024",
        persona_label: "65yo Retired PWD Engineer, Bareilly",
        behavioral_archetype: "The Digital Novice",
        internal_monologue:
          "Beta ne link bheja tha. Maine khola toh '12.5% returns' likh raha hai. Aaj kal sab fraud hai. Meri pension SBI mein safe hai — 7% milta hai FD pe, koi risk nahi. Ye bond-vond mujhe samajh nahi aata. Band karo ye app.",
        reasoning:
          "Deep distrust of digital financial products. Pension safety is paramount. Hindi-first user with minimal English digital literacy.",
        emotional_state: "dismissive",
        trust_score: 2,
        clarity_score: 4,
        value_score: 2,
      },
    ],
  },

  // ── Fix Recommendations ─────────────────────────────────────────────────────
  fix_recommendations: [
    {
      root_cause:
        "NRI investors with foreign phone numbers and non-Indian citizenship are structurally excluded from the entire onboarding flow",
      screen: "phone_email",
      recommendation:
        "Add NRI-compatible onboarding — international phone numbers + NRE/NRO account KYC path with FEMA-compliant documentation",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 9,
      affected_segment: "NRI Parking Idle Money",
      expected_uplift:
        "Estimated 10% increase in completion rate by unblocking the NRI segment entirely (5 of 50 personas, all high-value with ₹20-50L idle funds)",
    },
    {
      root_cause:
        "Retired and non-digital users find PAN sharing frightening on unknown fintech — no human-assisted alternative exists",
      screen: "kyc_pan_entry",
      recommendation:
        "Offer assisted KYC via video call for users 50+ or those who stall >60s on PAN entry screen",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 8,
      affected_segment: "Retired Government Officer, First-Gen Woman Investor",
      expected_uplift:
        "Estimated 6-8% increase in completion rate by converting KYC-fearful drop-offs through human assistance",
    },
    {
      root_cause:
        "₹98,389 minimum for 10-unit bond purchase is prohibitive for first-time investors who want to test the platform",
      screen: "bond_detail",
      recommendation:
        "Add a ₹5,000 minimum starter bond to lower entry barrier for first-time investors",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 7,
      affected_segment: "First-Gen Woman Investor, Freelancer with Lumpy Income",
      expected_uplift:
        "Estimated 4-6% increase from users willing to invest but not ₹98K on an untested platform",
    },
    {
      root_cause:
        "12.5% yield headline triggers fraud/scam association for users accustomed to 7% FD rates",
      screen: "landing",
      recommendation:
        "Show SEBI registration proof + NSE settlement guarantee prominently at every step, with a 'Why bonds yield more than FDs' educational section",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 6,
      affected_segment: "First-Gen Woman Investor, Retired Government Officer",
      expected_uplift:
        "Estimated 3-4% increase by converting yield-skeptical visitors through education and trust signals",
    },
    {
      root_cause:
        "New users land on discover_dashboard with no context on bond investing — financial terminology (YTM, CRISIL, coupon rate) is alienating",
      screen: "discover_dashboard",
      recommendation:
        "Add 'How Grip Works' 30-second explainer before dashboard for new users — explain bonds in FD-comparison terms",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 5,
      affected_segment: "Retired Government Officer, First-Gen Woman Investor, Freelancer with Lumpy Income",
      expected_uplift:
        "Estimated 2-4% increase by reducing information overload for first-time bond investors",
    },
  ],

  // ── Expected Completion Rate ────────────────────────────────────────────────
  expected_completion_rate_pct: undefined as unknown as number,

  // ── Persona Details ─────────────────────────────────────────────────────────
  persona_details: [
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 1: IT Salaried MF Maximizer (5/5 complete) — "The Pragmatist"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-001",
      demographics: {
        first_language: "Kannada",
        age: 29,
        occupation: "Senior Software Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Senior SDE at a product startup in Koramangala. ₹22L CTC. Runs 4 SIPs totaling ₹40K/month — 90% equity MFs, 10% liquid fund. Tracks portfolio XIRR weekly on Value Research.",
      cultural_background:
        "Grew up in Hubli, moved to Bangalore after engineering at RVCE. Kannada-speaking family. Lives in a 1BHK in HSR Layout.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 105,
      overall_monologue:
        "Finally, a platform that lets me add corporate bonds to my portfolio without going through a wealth manager. My equity MFs have done 15% XIRR over 3 years but I know I need fixed-income allocation. 12.5% on AA+ bonds is significantly better than the 7.2% my Parag Parikh Conservative Hybrid is giving me. SEBI registered, NSE settled — this checks out. KYC was smooth since my PAN is already linked to my Zerodha demat. I'll start with one 18-month CRISIL AA bond and see how the secondary market works before scaling up.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered, corporate bonds, up to 12.5% — looks legitimate. The NSE settlement mention is good. Let me check this out properly.",
          reasoning: "Regulatory credentials match expectations for a fixed-income platform",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 8,
          time_seconds: 10,
        },
        {
          screen_id: "phone_email",
          view_name: "Phone & Email",
          internal_monologue: "Standard sign-up. Using my primary number — same one on Zerodha and Groww.",
          reasoning: "Familiar fintech registration pattern",
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
          internal_monologue: "Auto-read OTP. Quick.",
          reasoning: "Smooth OTP flow",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 9,
          value_score: 7,
          time_seconds: 6,
        },
        {
          screen_id: "profile_setup",
          view_name: "Profile Setup",
          internal_monologue: "Name, email, DOB — standard stuff. Occupation and income range too. Fine, they need this for investment suitability.",
          reasoning: "Understands KYC/suitability requirements from mutual fund experience",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 20,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "Nice — I can see bonds sorted by yield. 12.5% YTM on an 18-month CRISIL AA+ bond from Muthoot Finance. That's a solid name. Let me complete KYC first so I can invest immediately when I'm ready.",
          reasoning: "Recognizes issuer names and CRISIL ratings from MF research. Wants KYC done to reduce future friction.",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 9,
          time_seconds: 18,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_entry",
          view_name: "KYC PAN Entry",
          internal_monologue: "PAN entry — same as Zerodha and Groww onboarding. ABCDE1234F. Done.",
          reasoning: "Has completed PAN-based KYC multiple times across platforms",
          emotional_state: "comfortable",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 15,
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "Auto-fetched my name and DOB from PAN. That's how NSDL verification works — I've seen this on every investment platform. All correct, confirming.",
          reasoning: "Familiar with NSDL-based PAN verification from demat account setup",
          emotional_state: "reassured",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 8,
          time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "grip-persona-002",
      demographics: {
        first_language: "Marathi",
        age: 31,
        occupation: "Product Manager",
        district: "Pune",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "PM at a SaaS company in Hinjewadi. ₹25L CTC. Portfolio: ₹18L in equity MFs, ₹3L in Kuvera debt funds. Wants to add direct bonds.",
      cultural_background:
        "Maharashtrian family from Kolhapur. Lives in Baner with wife who works at Infosys.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 112,
      overall_monologue:
        "I've been looking at Grip vs Wint Wealth for a month. The XIRR on my ICICI Pru Corporate Bond Fund is only 7.8% and the expense ratio eats into that. Direct corporate bonds at 11-12% with NSE settlement — I'll take that. KYC was instant since my PAN is CKYC-registered. Starting with ₹2L in a 12-month AA+ bond.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered — good. I've already read about Grip on Finshots. Let me sign up.",
          reasoning: "Pre-researched platform via financial newsletter",
          emotional_state: "purposeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 6,
        },
        {
          screen_id: "phone_email",
          view_name: "Phone & Email",
          internal_monologue: "Standard. Using my Jio number.",
          reasoning: "Routine fintech onboarding",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 10,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "OTP came fast. Auto-filled.",
          reasoning: "Smooth verification",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 9, value_score: 7, time_seconds: 5,
        },
        {
          screen_id: "profile_setup",
          view_name: "Profile Setup",
          internal_monologue: "Filling in details. Standard investment platform onboarding.",
          reasoning: "Familiar process",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 6, time_seconds: 18,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "12.5% on Muthoot, 11.8% on Shriram Transport. I know both companies from my MF portfolio holdings. Let me do KYC first.",
          reasoning: "Recognizes bond issuers as underlying holdings in his debt MFs",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 15,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_entry",
          view_name: "KYC PAN Entry",
          internal_monologue: "PAN entered. Same as Groww, Kuvera, Zerodha.",
          reasoning: "Multi-platform KYC veteran",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 12,
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "Name matches. DOB matches. CKYC done. Ready to invest.",
          reasoning: "Clean CKYC verification",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 8,
        },
      ],
    },
    // Remaining IT MF Maximizers (minimal monologues)
    {
      persona_uuid: "grip-persona-003",
      demographics: { first_language: "Telugu", age: 28, occupation: "Data Engineer", district: "Hyderabad", behavioral_archetype: "The Pragmatist" },
      professional_background: "Data Engineer at a FAANG satellite office. ₹20L CTC. SIPs of ₹35K/month.",
      cultural_background: "Telugu-speaking, from Vizag. Lives in Gachibowli.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 98,
      overall_monologue: "My Nifty 50 index fund has been flat for 6 months. Time to park some corpus in bonds while equity consolidates. 12% on a 12-month AA bond is perfect for my rebalancing window.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "All verified. PAN matches my Zerodha account name. Good to go.", reasoning: "Smooth KYC completion", emotional_state: "satisfied", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-004",
      demographics: { first_language: "Tamil", age: 34, occupation: "Engineering Manager", district: "Bangalore Urban", behavioral_archetype: "The Pragmatist" },
      professional_background: "EM at a unicorn. ₹24L CTC. ₹40L in equity MFs, zero fixed-income allocation.",
      cultural_background: "Tamil Brahmin family from Madurai. Lives in Whitefield with wife and toddler.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 115,
      overall_monologue: "My CA has been telling me to add fixed-income to my portfolio for a year. Grip's AA+ bonds at 12% beat any debt MF after tax. Starting with ₹5L allocation.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC done in 2 minutes. Faster than Coin by Zerodha. Impressed.", reasoning: "Fast KYC builds platform confidence", emotional_state: "impressed", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-005",
      demographics: { first_language: "Hindi", age: 30, occupation: "Backend Developer", district: "Pune", behavioral_archetype: "The Pragmatist" },
      professional_background: "SDE-2 at a product company in Kharadi. ₹18L CTC. ₹8L in Navi Nifty 50 index fund.",
      cultural_background: "UP family settled in Pune. Lives in Viman Nagar.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 108,
      overall_monologue: "Finally diversifying beyond equity. Will allocate 20% of my annual savings (₹3.6L) to bonds. The XIRR calculator on the bond detail page is exactly what I needed to compare with my MF returns.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Clean. PAN verified, name matches. Moving forward.", reasoning: "Efficient KYC", emotional_state: "neutral", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 9, value_score: 8, time_seconds: 9 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 2: Small-Town CA (4/5 complete) — "The Analyst"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-006",
      demographics: {
        first_language: "Hindi",
        age: 35,
        occupation: "Chartered Accountant",
        district: "Indore",
        zone: "Central",
        sex: "Male",
        behavioral_archetype: "The Analyst",
        marital_status: "Married",
      },
      professional_background:
        "Independent CA with 40+ clients. ₹14L annual practice income. Manages tax filing and investment advisory for SME owners. Deep understanding of CRISIL ratings, bond yields, and section 80C.",
      cultural_background:
        "Indori Marwari family. Lives in Vijay Nagar. Conservative with personal finances but analytical about investments.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 135,
      overall_monologue:
        "As a CA, I can immediately see the value proposition — corporate bonds yield 400-500bps over FDs because you're taking credit risk. CRISIL AA+ means investment-grade with low default probability. The NSE settlement adds a layer of safety. I'll invest personally and, if the platform is reliable, recommend to 3-4 HNI clients who park money in tax-free bonds. The KYC was thorough — exactly what I'd expect from a SEBI-registered entity.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered — I can verify this on the SEBI intermediary database. 12.5% on corporate bonds is within the expected range for AA-rated paper in current interest rate environment. RBI repo at 6.5%, so a 600bps spread is reasonable for corporate credit.",
          reasoning: "Professional knowledge of yield spreads validates the headline rate",
          emotional_state: "analytical",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 15,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "I can see the credit ratings clearly. AA+ from CRISIL on Muthoot — I know their balance sheet, healthy NPA ratios. The YTM is displayed properly. Let me complete KYC — I want to check the term sheet before investing.",
          reasoning: "Professional evaluation of credit quality and yield metrics",
          emotional_state: "engaged",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 9, time_seconds: 22,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "NSDL verification pulling my details — this is the standard CKYC process. Same as what my clients go through for MF investments. All good.",
          reasoning: "Professional familiarity with KYC infrastructure",
          emotional_state: "comfortable",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 10,
        },
      ],
    },
    // 3 more completing CAs (minimal)
    {
      persona_uuid: "grip-persona-007",
      demographics: { first_language: "Hindi", age: 38, occupation: "Chartered Accountant", district: "Jaipur", behavioral_archetype: "The Analyst" },
      professional_background: "CA in practice. ₹16L. Evaluating for self + 5 HNI clients with ₹50L+ each.",
      cultural_background: "Rajasthani family. Lives in Malviya Nagar, Jaipur.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 128,
      overall_monologue: "Solid platform. CRISIL ratings displayed upfront, NSE settlement — my clients currently buy bonds through HDFC Bank wealth desk at 1% commission. This is commission-free. I'll recommend to my top 3 clients after testing with my own ₹5L.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Clean KYC flow. Will be easy to guide clients through.", reasoning: "Evaluating for client recommendation", emotional_state: "satisfied", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-008",
      demographics: { first_language: "Hindi", age: 32, occupation: "Chartered Accountant", district: "Lucknow", behavioral_archetype: "The Analyst" },
      professional_background: "CA at a mid-size firm. ₹12L. Personal portfolio of ₹8L in PPF + ₹5L in equity MFs.",
      cultural_background: "Lucknawi family. Lives in Gomti Nagar.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 140,
      overall_monologue: "I've been recommending RBI tax-free bonds to clients but secondary market liquidity is terrible. Grip's 'Sell Anytime' on corporate bonds could solve that. The 12% yield is 500bps over my PPF. Completing KYC to start personal allocation.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC verified. Ready to invest.", reasoning: "Standard process", emotional_state: "neutral", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 12 },
      ],
    },
    {
      persona_uuid: "grip-persona-009",
      demographics: { first_language: "Hindi", age: 40, occupation: "Chartered Accountant", district: "Indore", behavioral_archetype: "The Analyst" },
      professional_background: "Senior CA partner. ₹18L. Manages HNI tax planning.",
      cultural_background: "Malwa region. Conservative investor personally.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 132,
      overall_monologue: "I see AA+ and AAA bonds available. For my conservative clients, the AAA bonds at 10.2% still beat their FDs by 300bps. I'll allocate my own ₹3L to test, then scale client recommendations.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "NSDL verified. Process is compliant.", reasoning: "Checks compliance", emotional_state: "satisfied", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 10 },
      ],
    },
    // 1 CA drops off at bond_listing (BBB rating scared them)
    {
      persona_uuid: "grip-persona-010",
      demographics: { first_language: "Hindi", age: 30, occupation: "Chartered Accountant", district: "Jaipur", behavioral_archetype: "The Analyst" },
      professional_background: "Junior CA, 2 years post-qualification. ₹10L. Conservative personal investments — only FDs and PPF.",
      cultural_background: "Rajasthani family from Sikar. First in family to become CA.",
      outcome: "dropped_off",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 95,
      overall_monologue: "I chose to browse bonds first before KYC. The AA+ bonds looked good, but then I noticed a BBB-rated bond listed at 14.2%. BBB is barely investment grade — I've seen CRISIL downgrade BBB companies to default within 18 months. If Grip is listing BBB paper alongside AAA, what does that say about their risk curation? A responsible platform should not show speculative-grade bonds to retail investors. I need to think about this.",
      screen_monologues: [
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "Interesting yields. Let me browse the full catalog first before committing to KYC — I want to see the credit quality distribution.",
          reasoning: "Analytical approach — evaluate product before process commitment",
          emotional_state: "curious",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 20,
          selected_choice: "Browse Bonds",
        },
        {
          screen_id: "bond_listing",
          view_name: "Bond Listing",
          internal_monologue: "AA+, AAA — good. But wait, there's a BBB-rated bond here at 14.2%? BBB is one notch above junk. I've seen three BBB-rated NBFCs default in the last 2 years — DHFL, IL&FS. If Grip curates BBB paper for retail investors, their risk governance is questionable. I expected only AA and above on a retail platform.",
          reasoning: "Professional risk assessment — BBB rating triggers concern about platform's credit curation standards",
          emotional_state: "alarmed",
          friction_points: ["BBB-rated bond listed alongside AAA", "No risk filter defaults for retail investors"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 7, value_score: 5, time_seconds: 30,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 3: NRI Parking Idle Money (0/5 complete) — "The Blocked User"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-011",
      demographics: {
        first_language: "Hindi",
        age: 38,
        occupation: "Senior Manager at Emirates NBD",
        district: "Dubai (India origin: Delhi)",
        zone: "NRI",
        sex: "Male",
        behavioral_archetype: "The Blocked User",
        marital_status: "Married",
      },
      professional_background:
        "Banking professional in Dubai for 8 years. ₹35L in NRE FD at HDFC earning 6.5%. Wife is homemaker with Indian SIM. Wants to deploy NRE maturity into higher-yielding INR instruments.",
      cultural_background:
        "Delhi Punjabi family. Parents in Greater Kailash. Visits India twice a year.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 28,
      overall_monologue:
        "I'm trying to park my NRE FD maturity amount — ₹35 lakh just sitting in HDFC earning 6.5%. But they only accept Indian numbers? I've been in Dubai for 8 years, my Indian SIM is disconnected. My wife has an Indian number but this is supposed to be my investment — I need it in my name for tax purposes under DTAA. I'll check if Wint Wealth handles NRI accounts better.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered, up to 12.5% on bonds. My NRE FD gives 6.5%. This could be a good parking spot for my maturity proceeds. Let me sign up.",
          reasoning: "NRE FD maturity creating urgency to find higher-yielding alternative",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 12,
        },
        {
          screen_id: "phone_email",
          view_name: "Phone & Email",
          internal_monologue: "It's asking for my phone number but the field only accepts +91. I have a UAE number — +971. My Indian Airtel SIM expired 3 years ago. Let me try entering my UAE number... it's not accepting it. There's no country code dropdown. This is ridiculous — I'm trying to invest ₹15 lakh and I can't even create an account because I don't have an Indian SIM card.",
          reasoning: "Structurally blocked — platform only accepts Indian phone numbers",
          emotional_state: "frustrated",
          friction_points: ["No international phone number support", "No country code selector", "NRI segment completely excluded"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 7, value_score: 8, time_seconds: 16,
        },
      ],
    },
    {
      persona_uuid: "grip-persona-012",
      demographics: { first_language: "Telugu", age: 34, occupation: "Tech Lead", district: "San Jose, CA (India origin: Hyderabad)", behavioral_archetype: "The Blocked User" },
      professional_background: "Tech Lead at a FAANG. ₹50L in India across NRE FDs and MFs via Vested/INDMoney.",
      cultural_background: "Telugu family from Secunderabad. Parents in Jubilee Hills.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 22,
      overall_monologue: "I was looking at Indian fixed-income options to diversify my US portfolio. 12.5% in INR bonds while USD earns 4.5% in T-bills — even after 3-4% annual INR depreciation, the carry trade nets positive. But I can't sign up with my US number. This is 2026 — even RazorpayX lets me use my US number. Disappointing.",
      screen_monologues: [
        { screen_id: "phone_email", view_name: "Phone & Email", internal_monologue: "Only +91? I have a US number. No country code option. Dead end.", reasoning: "Blocked by Indian-only phone requirement", emotional_state: "disappointed", friction_points: ["Indian numbers only"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 8, value_score: 9, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-013",
      demographics: { first_language: "Tamil", age: 42, occupation: "Business Owner", district: "Singapore (India origin: Chennai)", behavioral_archetype: "The Blocked User" },
      professional_background: "Runs a logistics company. ₹20L in NRO savings at 3.5%. CA in Mumbai recommended Grip.",
      cultural_background: "Tamil Iyer family. Parents in Mylapore, Chennai.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 25,
      overall_monologue: "My CA in Mumbai recommended Grip for parking NRO account funds. I have about ₹20 lakh in my NRO savings earning 3.5%. Corporate bonds at 11-12% would be significantly better. But the very first step requires an Indian phone number. I'll ask my CA to check if I can use my brother's number — but that creates compliance issues with FEMA.",
      screen_monologues: [
        { screen_id: "phone_email", view_name: "Phone & Email", internal_monologue: "Indian number only. I've been in Singapore 12 years. My Indian SIM is long gone. Can I use my brother's? No — FEMA won't allow investment under someone else's KYC.", reasoning: "Blocked + FEMA compliance prevents workaround", emotional_state: "exasperated", friction_points: ["Indian numbers only", "No NRI onboarding path"], decision_outcome: "DROP_OFF", trust_score: 6, clarity_score: 7, value_score: 9, time_seconds: 13 },
      ],
    },
    // 2 NRIs make it through phone (via spouse's number) but blocked at KYC
    {
      persona_uuid: "grip-persona-014",
      demographics: { first_language: "Gujarati", age: 45, occupation: "Chartered Accountant", district: "London (India origin: Ahmedabad)", behavioral_archetype: "The Blocked User" },
      professional_background: "CA at a Big Four in London. ₹30L in NRE FD. Used wife's Indian number to register.",
      cultural_background: "Gujarati family. Parents in Satellite, Ahmedabad.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 85,
      overall_monologue: "I used my wife's Indian Jio number to register — she's visiting her parents in Ahmedabad. Made it through to KYC. But the 'Indian citizen' declaration checkbox — I have British citizenship now, OCI card holder. There's no OCI or NRI option. I can't declare myself as an Indian citizen. Legally, NRI investment in corporate bonds is allowed under FEMA with NRE/NRO accounts. This platform hasn't built for NRIs at all.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "'I hereby declare that I am an Indian citizen' — but I'm not. I have OCI. Checking this box would be a false declaration. There's no NRI or OCI option. This platform is not built for NRIs.", reasoning: "Legal/compliance block — cannot make false citizenship declaration", emotional_state: "frustrated", friction_points: ["Indian citizen only declaration", "No OCI/NRI option"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 6, value_score: 8, time_seconds: 15 },
      ],
    },
    {
      persona_uuid: "grip-persona-015",
      demographics: { first_language: "Malayalam", age: 40, occupation: "Nurse Manager", district: "Abu Dhabi (India origin: Kottayam)", behavioral_archetype: "The Blocked User" },
      professional_background: "Head Nurse at Cleveland Clinic Abu Dhabi. ₹25L in NRE FD. Husband has Indian SIM.",
      cultural_background: "Malayali Christian family from Kottayam. In Gulf for 15 years.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 90,
      overall_monologue: "Used my husband's Indian number to register. Everything went fine until KYC — it asks for Indian citizen declaration. I'm an Indian citizen but the form seems designed for resident Indians only. It asks for a local address for communication — I don't have one. My parents' address? But the demat account linked to that address — I don't have a demat account in India. This feels like it's not built for people like me.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "I am an Indian citizen, yes. But then it asks for Indian address for demat account opening — I don't have one. My parents' address? Will I get regulatory mail there? And demat — I've never opened one. I need a broker in India first? This is too many steps for someone in Abu Dhabi.", reasoning: "Process assumes resident Indian with existing demat infrastructure", emotional_state: "overwhelmed", friction_points: ["No NRI-specific flow", "Demat account requirement unclear", "Indian address assumption"], decision_outcome: "DROP_OFF", trust_score: 4, clarity_score: 4, value_score: 7, time_seconds: 20 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 4: First-Gen Woman Investor (2/5 complete) — "The Cautious Explorer"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-016",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "HR Executive",
        district: "Gurgaon",
        zone: "North",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "HR at a D2C startup in Udyog Vihar. ₹9L CTC. Savings: ₹2L in SBI savings, ₹50K in Groww liquid fund. Zero investment experience beyond these.",
      cultural_background:
        "From a middle-class family in Meerut. Father is a school teacher. First generation in corporate job.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 175,
      overall_monologue:
        "I've been wanting to invest beyond my savings account but stocks scare me. 'Fixed returns' — that's what I want. Not market-linked, just predictable. SEBI registered gave me confidence. I browsed the bonds first because I wanted to understand what I'm getting into before sharing my PAN. The AAA bond at 10.2% — that's better than my FD. 'CRISIL AAA' must mean it's the safest? I asked Priya from accounts and she said Grip is legit. I'll start with the smallest amount possible.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered — that's the same regulator as mutual funds. 'Fixed returns, not market-linked' — this is exactly what I need. My father lost money in a chit fund and I've been scared of investments since. But SEBI registered is different from chit funds, right?",
          reasoning: "SEBI registration overcomes inherited financial trauma from father's chit fund loss",
          emotional_state: "cautiously hopeful",
          friction_points: ["12.5% feels high compared to known 7% FD"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 7, time_seconds: 18,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "So many bonds with different yields and ratings. I don't know what CRISIL AA+ means exactly. But AAA must be the best — like grades in school. The 10.2% AAA bond seems safest. Let me browse first before doing KYC.",
          reasoning: "Intuitive understanding of rating hierarchy (AAA = best) but wants to evaluate before committing PAN",
          emotional_state: "curious but cautious",
          friction_points: ["CRISIL rating system unclear", "YTM terminology unfamiliar"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 5, value_score: 7, time_seconds: 25,
          selected_choice: "Browse Bonds",
        },
        {
          screen_id: "bond_listing",
          view_name: "Bond Listing",
          internal_monologue: "Muthoot Finance — I know that name, the gold loan company. AAA rated, 10.2% for 24 months. That's ₹10,200 per lakh per year. Better than my SBI FD at 7%. And it says 'Sell Anytime' so I'm not stuck. Let me see more details.",
          reasoning: "Brand recognition (Muthoot) builds trust. Simple return calculation resonates.",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 8, time_seconds: 20,
        },
        {
          screen_id: "bond_detail",
          view_name: "Bond Detail",
          internal_monologue: "Minimum investment ₹10,000 for 1 unit. That's okay — I can start with ₹10,000 from my savings. NSE settled — Priya said NSE is the stock exchange, so that's safe. I'll complete KYC and invest ₹10,000 to try.",
          reasoning: "Acceptable entry point for first-time investor. Peer validation from colleague.",
          emotional_state: "ready",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 8, time_seconds: 22,
        },
      ],
    },
    // 1 more completing First-Gen Woman
    {
      persona_uuid: "grip-persona-017",
      demographics: { first_language: "Bengali", age: 26, occupation: "Content Strategist", district: "Kolkata", behavioral_archetype: "The Cautious Explorer" },
      professional_background: "Content Strategist at an edtech. ₹8L CTC. ₹1.5L in savings. Zero investments.",
      cultural_background: "Bengali middle-class family in Salt Lake. Mother is a teacher.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 180,
      overall_monologue: "My mother always said 'invest only in bank FDs.' But 7% FD vs 10% AAA bond — the math is clear. SEBI registered made me feel safe. I browsed first, liked what I saw, then did KYC. Starting with ₹10K.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "₹10,000 for 1 unit of a CRISIL AAA bond. I can afford that. Let me try.", reasoning: "Low entry point makes first investment accessible", emotional_state: "determined", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 6, value_score: 8, time_seconds: 18 },
      ],
    },
    // 3 First-Gen Women who drop off
    {
      persona_uuid: "grip-persona-018",
      demographics: { first_language: "Hindi", age: 31, occupation: "Homemaker (previously HR)", district: "Noida", behavioral_archetype: "The Cautious Explorer" },
      professional_background: "Left corporate job 2 years ago. Manages household finances. ₹3L PPF maturity sitting in savings.",
      cultural_background: "UP family in Noida. Husband works in IT.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 12,
      overall_monologue: "My husband said to check out this app for investing my PPF maturity money. '12.5% fixed returns' — this sounds exactly like that WhatsApp forward scam my mother-in-law fell for. She lost ₹50,000 in some chit fund that promised 15%. Even if Grip is SEBI registered, I've seen enough news about NBFCs shutting down. I'll tell my husband to ask his office colleagues first.",
      screen_monologues: [
        { screen_id: "landing", view_name: "Landing Page", internal_monologue: "12.5% fixed returns? My mother-in-law lost ₹50K in a chit fund promising 15%. This looks similar. SEBI registered — but DHFL was also listed on stock exchange and it collapsed. I'm not falling for this.", reasoning: "Financial fraud PTSD from family experience", emotional_state: "skeptical", friction_points: ["12.5% yield triggers fraud association"], decision_outcome: "DROP_OFF", trust_score: 3, clarity_score: 7, value_score: 3, time_seconds: 12 },
      ],
    },
    {
      persona_uuid: "grip-persona-019",
      demographics: { first_language: "Hindi", age: 28, occupation: "School Teacher", district: "Pune", behavioral_archetype: "The Cautious Explorer" },
      professional_background: "Primary school teacher. ₹4.5L salary. ₹80K in savings account. First time considering any investment.",
      cultural_background: "Marathi family from Satara. Lives in Kothrud, Pune.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue: "I got through the signup and even the dashboard looked interesting. But when it asked for PAN for KYC — I froze. PAN is linked to my salary, my income tax. What if this app reports something wrong? My school accountant handles my tax. I need to ask him before I share my PAN with any app.",
      screen_monologues: [
        { screen_id: "kyc_pan_entry", view_name: "KYC PAN Entry", internal_monologue: "They want my PAN card number. PAN is connected to everything — my salary, bank account, income tax. What if they file something wrong? Or what if there's a data leak and someone uses my PAN? I don't know enough about this to trust them with my PAN.", reasoning: "PAN = identity anchor — sharing with unknown app feels like maximum vulnerability", emotional_state: "nervous", friction_points: ["PAN sharing fear", "Unknown platform trust deficit"], decision_outcome: "DROP_OFF", trust_score: 3, clarity_score: 5, value_score: 6, time_seconds: 20 },
      ],
    },
    {
      persona_uuid: "grip-persona-020",
      demographics: { first_language: "Marathi", age: 29, occupation: "Junior Analyst", district: "Gurgaon", behavioral_archetype: "The Cautious Explorer" },
      professional_background: "Financial analyst at an MNC. ₹11L CTC. ₹1L in savings. Interested but not committed.",
      cultural_background: "From Nagpur. Lives in a PG in Sohna Road.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 55,
      overall_monologue: "I browse bonds and they showed a bond at 14.2% — BBB rated. ₹98,389 minimum for 10 units. That's almost a lakh — I only have ₹1L in savings. I can't put everything into one bond on an app I just downloaded. I wish there was a ₹5,000 option to test.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "₹98,389 minimum? That's my entire savings. For a BBB-rated bond? I don't even fully understand what BBB means but it doesn't sound like AAA. I wanted to start with ₹5,000 or ₹10,000. This minimum is for rich people, not for someone just starting.", reasoning: "Minimum investment exceeds comfort level for first-time investor", emotional_state: "discouraged", friction_points: ["₹98K minimum too high", "BBB rating unclear"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 4, value_score: 4, time_seconds: 22 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 5: Retired Government Officer (1/5 complete) — "The Digital Novice"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-021",
      demographics: {
        first_language: "Hindi",
        age: 63,
        occupation: "Retired Deputy Collector",
        district: "Bhopal",
        zone: "Central",
        sex: "Male",
        behavioral_archetype: "The Digital Novice",
        marital_status: "Married",
      },
      professional_background:
        "Retired from IAS (state cadre) 3 years ago. Pension ₹85K/month. ₹45L in SBI FDs, ₹10L in SCSS. Son (software engineer in Bangalore) manages his digital life.",
      cultural_background:
        "Traditional Hindi-speaking family from Bhopal. Wife manages household. Reads Dainik Bhaskar.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 210,
      overall_monologue:
        "My son helped me through the entire process on a video call. He said the SBI FD at 7% is losing money after inflation and tax — he's right, my 30% tax bracket eats into the interest. He found a AAA-rated bond at 10.2% and explained CRISIL AAA means it's as safe as an SBI FD. The KYC was confusing but my son walked me through it. I'll put ₹5L from my next FD maturity here — but only AAA bonds.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "Beta Rohit ne bheja hai ye link. 12.5% returns likhta hai. Bohot zyada lag raha hai — meri FD 7% deti hai. SEBI registered — Rohit ne kaha SEBI matlab government approved. Theek hai, aage dekhte hain.",
          reasoning: "Son's recommendation + SEBI registration provides initial trust",
          emotional_state: "cautious",
          friction_points: ["12.5% seems unrealistically high"],
          decision_outcome: "CONTINUE",
          trust_score: 5, clarity_score: 5, value_score: 5, time_seconds: 20,
        },
        {
          screen_id: "kyc_pan_entry",
          view_name: "KYC PAN Entry",
          internal_monologue: "PAN card dalna hai. Rohit ne kaha safe hai. Maine PAN number bola phone pe, usne type karwa diya. 'KYC verification' — Rohit keh raha hai ye normal hai, sab platforms pe hota hai.",
          reasoning: "Son providing real-time guidance overcomes digital KYC barrier",
          emotional_state: "dependent",
          friction_points: ["Cannot self-navigate KYC", "Relying entirely on son's guidance"],
          decision_outcome: "CONTINUE",
          trust_score: 5, clarity_score: 4, value_score: 6, time_seconds: 35,
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "Mera naam aa gaya — sahi hai. Rohit ne verify karwa diya. Ab ye confirm button dabana hai. Ho gaya.",
          reasoning: "Auto-populated name from PAN provides validation",
          emotional_state: "relieved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 5, value_score: 6, time_seconds: 15,
        },
      ],
    },
    // 4 Retired Officers who drop off
    {
      persona_uuid: "grip-persona-022",
      demographics: { first_language: "Hindi", age: 60, occupation: "Retired Superintendent of Police", district: "Varanasi", behavioral_archetype: "The Digital Novice" },
      professional_background: "Retired SP. Pension ₹95K/month. ₹60L in FDs across SBI and PNB.",
      cultural_background: "Traditional Varanasi family. Minimal digital literacy.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 45,
      overall_monologue: "Profile setup asked for too many details — occupation, income range, investment experience. Why does a bond app need to know my income? At my bank, the manager knows me and doesn't ask such questions. This feels like I'm applying for a loan.",
      screen_monologues: [
        { screen_id: "profile_setup", view_name: "Profile Setup", internal_monologue: "Occupation? Income range? Investment experience? Ye toh loan application jaisa lag raha hai. Bank mein manager se baat karke sab ho jata hai. Ye itna sab kyun pooch raha hai?", reasoning: "Unfamiliar with digital KYC information requirements", emotional_state: "irritated", friction_points: ["Too many personal questions", "No human assistance option"], decision_outcome: "DROP_OFF", trust_score: 4, clarity_score: 4, value_score: 5, time_seconds: 20 },
      ],
    },
    {
      persona_uuid: "grip-persona-023",
      demographics: { first_language: "Hindi", age: 58, occupation: "Retired Bank Manager", district: "Lucknow", behavioral_archetype: "The Digital Novice" },
      professional_background: "Retired from PNB. Pension ₹70K. Ironically understands banking but not fintech apps.",
      cultural_background: "Lucknawi. Lives in Alambagh. Wife is homemaker.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 70,
      overall_monologue: "As a retired banker, I understand corporate bonds conceptually. But this app — the dashboard shows so many numbers. In my time, we'd get a printed term sheet. Where's the maturity date? Where's the coupon schedule? I can't find the redemption terms. This interface is designed for youngsters. Let me tell my son to research and invest on my behalf.",
      screen_monologues: [
        { screen_id: "discover_dashboard", view_name: "Discover Dashboard", internal_monologue: "YTM, IRR, credit rating — I know these terms from my banking days. But this app interface is confusing. Where do I find the detailed term sheet? Where's the coupon payment schedule? In my bank, I'd get a 3-page printed document with all terms. This shows everything in small cards I have to scroll through.", reasoning: "Understands concepts but struggles with mobile-first interface design", emotional_state: "frustrated", friction_points: ["No printable term sheet", "Small mobile interface", "Information spread across multiple screens"], decision_outcome: "DROP_OFF", trust_score: 6, clarity_score: 3, value_score: 7, time_seconds: 25 },
      ],
    },
    {
      persona_uuid: "grip-persona-024",
      demographics: { first_language: "Hindi", age: 65, occupation: "Retired PWD Engineer", district: "Bareilly", behavioral_archetype: "The Digital Novice" },
      professional_background: "Retired Chief Engineer, PWD. Pension ₹65K. ₹35L in SBI FDs. Son sent him the app link.",
      cultural_background: "Small-town UP. Reads Amar Ujala. Uses phone only for WhatsApp and YouTube.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 8,
      overall_monologue: "Beta ne link bheja tha. Maine khola toh '12.5% returns' likh raha hai. Aaj kal sab fraud hai. Meri pension SBI mein safe hai — 7% milta hai FD pe, koi risk nahi. Ye bond-vond mujhe samajh nahi aata. Band karo ye app.",
      screen_monologues: [
        { screen_id: "landing", view_name: "Landing Page", internal_monologue: "12.5%? Sab fraud hai aaj kal. SBI mein 7% safe milta hai. Ye sab naye apps — pehle paisa lenge, phir gayab ho jayenge. Band karo.", reasoning: "Deep distrust of digital financial products. Zero context for yield premium over FDs.", emotional_state: "dismissive", friction_points: ["12.5% triggers fraud suspicion", "No financial literacy context"], decision_outcome: "DROP_OFF", trust_score: 2, clarity_score: 4, value_score: 2, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-025",
      demographics: { first_language: "Hindi", age: 62, occupation: "Retired Block Development Officer", district: "Varanasi", behavioral_archetype: "The Digital Novice" },
      professional_background: "Retired BDO. Pension ₹55K. ₹20L in post office FDs. Daughter-in-law suggested Grip.",
      cultural_background: "Banarasi. Traditional. Minimal smartphone usage.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 68,
      overall_monologue: "My son showed me this app that gives 12% — better than my SBI FD. But now it's asking for my PAN card and something about 'KYC registration agencies will access my bank details.' I don't understand — I thought I was just looking at bonds, not giving access to my bank account. The last time I shared my Aadhaar at a telecom shop, someone opened a fake loan in my name. Let me ask Raju to do this for me next weekend.",
      screen_monologues: [
        { screen_id: "kyc_pan_entry", view_name: "KYC PAN Entry", internal_monologue: "PAN card dena hai? 'KYC registration agencies will verify your identity and may access financial records.' Financial records? Matlab ye mere bank account mein dekh sakte hain? Pichli baar Aadhaar diya tha phone shop pe, kisi ne ₹2 lakh ka loan le liya mere naam pe. Ab PAN bhi de doon? Nahi, Raju aayega toh usse karwa lunga.", reasoning: "Past identity fraud experience makes digital PAN sharing terrifying", emotional_state: "fearful", friction_points: ["PAN sharing fear", "KYC language is intimidating", "No human assistance"], decision_outcome: "DROP_OFF", trust_score: 2, clarity_score: 3, value_score: 6, time_seconds: 22 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 6: Crypto-Burned Millennial (4/5 complete) — "The Risk-Averse Convert"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-026",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "UI/UX Designer",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Risk-Averse Convert",
        marital_status: "Unmarried",
      },
      professional_background:
        "Senior designer at a fintech startup in Lower Parel. ₹16L CTC. Lost ₹4L in Luna/UST crash. Now 100% risk-averse. ₹3L sitting in savings earning nothing.",
      cultural_background:
        "Grew up in Thane. Lives in Andheri West. Watches Pranjal Kamra and Akshat Shrivastava on YouTube.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 125,
      overall_monologue:
        "After losing ₹4 lakh in the Luna crash, I swore off anything volatile. 'Fixed returns' — these two words are therapeutic. 12.5% guaranteed? No IL (impermanent loss), no rug pulls, no 'number go up' hopium. Just a fixed coupon paid into my bank account. SEBI regulated means no CZ or SBF situation. 'Sell Anytime' is crucial — I never want to be stuck in an illiquid position again. I'm going all-in with ₹2L on the 18-month AA+ bond. Ironic — the 'boring' investment is exactly what I need.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered. Fixed returns. Not crypto, not volatile. After Luna, I need this. 'Up to 12.5%' — in crypto that's a bad day. In bonds, that's amazing. And it's government-regulated, not some DAO.",
          reasoning: "Crypto trauma makes regulated fixed-income deeply attractive",
          emotional_state: "relieved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 10,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "'Sell Anytime' — this is huge. My Luna was locked in staking when it crashed. I could literally watch my money evaporate and do nothing. With bonds, if something feels off, I can exit. Plus NSE settlement — the actual stock exchange handles the trades, not some random smart contract.",
          reasoning: "Liquidity feature directly addresses crypto lock-up PTSD",
          emotional_state: "grateful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 18,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "KYC with PAN — real identity verification. Not like crypto where you can be anonymous and get scammed by anonymous people. I appreciate that they verify who I am and who the bond issuer is. Transparency.",
          reasoning: "Regulatory KYC viewed positively — contrast to anonymous crypto scams",
          emotional_state: "reassured",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 12,
        },
      ],
    },
    // 3 more completing crypto-burned (minimal)
    {
      persona_uuid: "grip-persona-027",
      demographics: { first_language: "Hindi", age: 25, occupation: "Content Creator", district: "Delhi", behavioral_archetype: "The Risk-Averse Convert" },
      professional_background: "YouTube creator. Lost ₹2L in Solana memecoins. ₹5L in savings now, wants stability.",
      cultural_background: "Delhi boy from Rohini. Lives in a co-living space in Hauz Khas.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 130,
      overall_monologue: "After memecoins, I deserve boring. 12% fixed? No charts to watch at 3 AM? No Discord alpha calls? Just a coupon payment every 6 months? Sign me up. Browsed the bonds first — the Muthoot AAA at 10.2% is my speed. Safe, simple, boring. Perfect.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "Muthoot Finance, AAA rated, 10.2% for 24 months. No volatility, no 'up only' hopium. Just predictable returns. After losing sleep over Solana charts, this is peace.", reasoning: "Post-crypto, predictability is the primary value", emotional_state: "peaceful", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 7, value_score: 9, time_seconds: 18 },
      ],
    },
    {
      persona_uuid: "grip-persona-028",
      demographics: { first_language: "Marathi", age: 28, occupation: "DevOps Engineer", district: "Pune", behavioral_archetype: "The Risk-Averse Convert" },
      professional_background: "DevOps at a SaaS startup. Lost ₹3L in FTX collapse. Now ₹4L in savings, zero investments.",
      cultural_background: "Pune local. Lives in Kharadi.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 118,
      overall_monologue: "FTX taught me — if it's not regulated, it's not real. SEBI registered, NSE settled. My ₹3L isn't coming back from FTX but my next ₹3L is going into AA+ bonds. Fixed coupon, no counterparty risk via exchange settlement. This is how finance should work.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Real KYC, real regulation. Not a Bahamas-registered 'exchange'. Done.", reasoning: "Regulatory compliance is the feature", emotional_state: "confident", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-029",
      demographics: { first_language: "Bengali", age: 30, occupation: "Product Analyst", district: "Bangalore Urban", behavioral_archetype: "The Risk-Averse Convert" },
      professional_background: "Product analyst at a gaming startup. Lost ₹1.5L in WazirX hack. Risk tolerance at zero.",
      cultural_background: "Bengali from Kolkata. Lives in Indiranagar, Bangalore.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 120,
      overall_monologue: "After the WazirX hack, I don't trust any platform that holds my money. But Grip uses NSE settlement — the money goes through the stock exchange, not Grip's wallet. That's the key difference. 12% on CRISIL AA+ is predictable. No hacks, no rugs, no 'maintenance mode' during crashes.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC done. NSE settlement means my money isn't sitting in Grip's bank account. It's exchange-settled. That's the difference between this and WazirX.", reasoning: "NSE settlement architecture addresses custody risk concern", emotional_state: "reassured", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 10 },
      ],
    },
    // 1 crypto-burned who drops off
    {
      persona_uuid: "grip-persona-030",
      demographics: { first_language: "Hindi", age: 26, occupation: "Sales Executive", district: "Delhi", behavioral_archetype: "The Risk-Averse Convert" },
      professional_background: "B2B sales. Lost ₹80K in crypto. ₹1.2L in savings. Very cautious now.",
      cultural_background: "Delhi NCR. Lives in Dwarka with parents.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 52,
      overall_monologue: "Fixed returns sounded great after crypto losses. But the profile setup asked for my income range, investment experience, and risk appetite. That's a lot of personal info for an app I just opened. In crypto, I just connected my wallet — no personal info needed. I know that's not how regulated finance works, but... I'll come back when I've researched Grip more.",
      screen_monologues: [
        { screen_id: "profile_setup", view_name: "Profile Setup", internal_monologue: "Income range? Risk appetite? Investment experience? This is too much info before I've even seen a single bond. In crypto I just connected MetaMask. I know this is regulated but can't they show me the product first?", reasoning: "Privacy-conscious post-crypto. Wants to evaluate before sharing personal details.", emotional_state: "hesitant", friction_points: ["Too much personal info upfront", "No browse-first option before profile"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 6, value_score: 6, time_seconds: 18 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 7: HNI Wealth Manager (4/5 complete) — "The Professional Evaluator"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-031",
      demographics: {
        first_language: "Hindi",
        age: 42,
        occupation: "Independent Wealth Manager",
        district: "South Delhi",
        zone: "North",
        sex: "Male",
        behavioral_archetype: "The Professional Evaluator",
        marital_status: "Married",
      },
      professional_background:
        "AMFI-registered distributor managing ₹80Cr AUM across 45 HNI families. Currently places bond orders via HDFC and ICICI wealth desks at 50-75bps commission. Looking for a direct bond platform for clients.",
      cultural_background:
        "Punjabi family in Defence Colony. Harvard Executive Education alumnus. Member of the Delhi Investment Forum.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 155,
      overall_monologue:
        "I'm evaluating Grip for my clients, not personal use. Currently, I source bonds through HDFC's wealth desk — 50bps commission eats into my client's YTM. Grip shows direct bonds at face value. If I can get my 45 clients onto this platform, we're talking about ₹15-20Cr flowing through in the first quarter. The bond catalog is solid — Muthoot, Shriram, Bajaj Finance. I need to check: bulk order capability, consolidated reporting, and whether I can get distributor access. Browsing bonds first to evaluate the inventory depth.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered investment platform. I know Grip — they've been in this space for 3 years. The question is whether their bond inventory is deep enough for my HNI clients who want ₹50L-1Cr allocations. Let me check.",
          reasoning: "Professional evaluation mode — assessing for client deployment",
          emotional_state: "professional",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 7, time_seconds: 8,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "Good issuer names — Muthoot, Shriram, Bajaj Finance. These are names my clients know. Yields are competitive with what I get through the HDFC wealth desk. Let me browse the full catalog to check depth and rating distribution.",
          reasoning: "Evaluating inventory breadth for HNI deployment",
          emotional_state: "evaluative",
          friction_points: ["No bulk/distributor access visible"],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 20,
          selected_choice: "Browse Bonds",
        },
        {
          screen_id: "bond_listing",
          view_name: "Bond Listing",
          internal_monologue: "15 bonds across different issuers, maturities from 6 to 36 months, ratings from BBB to AAA. For my conservative clients, I'd recommend AA+ and above. For aggressive clients, the 14.2% BBB bond from the NBFC — they can take the credit risk. The maturity ladder options are good. I need to check lot sizes for ₹50L+ orders.",
          reasoning: "Professional analysis of catalog for different client risk profiles",
          emotional_state: "engaged",
          friction_points: ["No bulk order pricing visible", "No distributor/advisor portal"],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 25,
        },
        {
          screen_id: "bond_detail",
          view_name: "Bond Detail",
          internal_monologue: "Muthoot Finance AA+ — 12.5% YTM, 18-month maturity, ₹9,839 per unit, minimum 10 units = ₹98,390. For my client who wants ₹1Cr allocation, that's about 1,016 units. The term sheet is clean. NSE settlement. I'll sign up personally to test the execution flow, then onboard 3-4 clients as pilot.",
          reasoning: "Calculating unit requirements for HNI-scale deployment",
          emotional_state: "satisfied",
          friction_points: ["No advisor/bulk portal"],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 28,
        },
      ],
    },
    // 3 more completing HNI (minimal)
    {
      persona_uuid: "grip-persona-032",
      demographics: { first_language: "Hindi", age: 45, occupation: "Relationship Manager, Private Bank", district: "Mumbai", behavioral_archetype: "The Professional Evaluator" },
      professional_background: "VP at Kotak Private Banking. Evaluating for ultra-HNI clients. Manages ₹200Cr book.",
      cultural_background: "Gujarati. Lives in Powai.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 148,
      overall_monologue: "Our bond desk charges 75bps. Grip is zero commission. For a ₹1Cr allocation, that's ₹75K savings for my client. The catalog needs more AAA options but it's a start. I'll complete personal KYC and test with ₹5L.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "Clean term sheet. NSE settlement. Zero commission vs our 75bps. For ₹1Cr, that's ₹75K client saves. Compelling.", reasoning: "Commission arbitrage calculation", emotional_state: "impressed", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 22 },
      ],
    },
    {
      persona_uuid: "grip-persona-033",
      demographics: { first_language: "Hindi", age: 38, occupation: "Family Office Manager", district: "Delhi NCR", behavioral_archetype: "The Professional Evaluator" },
      professional_background: "Manages a single-family office. ₹50Cr AUM. Allocating 20% to fixed income.",
      cultural_background: "Marwari family. Based in Gurgaon Golf Course Road.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 160,
      overall_monologue: "We need ₹10Cr in fixed income. Currently in Bharat Bond ETF (7.2% YTM) and Franklin India Corporate Bond (8.1%). Direct bonds at 11-12% bypass fund management fees. If Grip execution is clean, we'll move ₹2Cr as initial allocation.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "Comparing with Bharat Bond ETF — 7.2% YTM vs 12.5% direct bond. After adjusting for liquidity premium and credit risk, the spread is ~400bps. That's meaningful on ₹2Cr.", reasoning: "Institutional-grade comparison", emotional_state: "analytical", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 25 },
      ],
    },
    {
      persona_uuid: "grip-persona-034",
      demographics: { first_language: "Gujarati", age: 50, occupation: "Wealth Advisor", district: "Mumbai", behavioral_archetype: "The Professional Evaluator" },
      professional_background: "Independent RIA. 30 clients with ₹40Cr total AUM. Wants direct bond access.",
      cultural_background: "Gujarati. Lives in Juhu. SEBI-registered RIA.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 142,
      overall_monologue: "As a SEBI-registered RIA, I can recommend Grip to clients for direct bond allocation. The platform is clean, inventory is decent. I need a referral/advisor dashboard to track client investments. Will sign up and test.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "Good execution flow. Need referral tracking for my advisory practice. Will complete KYC and request advisor access from Grip team.", reasoning: "Evaluating for professional recommendation", emotional_state: "practical", friction_points: ["No advisor/referral portal"], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 20 },
      ],
    },
    // 1 HNI who drops off at discover_dashboard
    {
      persona_uuid: "grip-persona-035",
      demographics: { first_language: "Hindi", age: 35, occupation: "Wealth Associate", district: "Gurgaon", behavioral_archetype: "The Professional Evaluator" },
      professional_background: "Junior RM at a private bank. Recently started. Exploring platforms for personal learning.",
      cultural_background: "From Rohtak, Haryana. New to wealth management.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 48,
      overall_monologue: "I was curious about direct bond platforms — my seniors at the bank mention them. But the dashboard shows yields like 12.5%, 14.2% — these seem very high. At our bank, we offer corporate bonds at 9-10% to clients. Is Grip showing yields before credit risk adjustment? I'm not confident enough in my understanding to invest. Let me study this more before putting my own money in.",
      screen_monologues: [
        { screen_id: "discover_dashboard", view_name: "Discover Dashboard", internal_monologue: "12.5% on AA+? Our bank offers 9-10% on similar ratings. Why is there such a gap? Am I missing something — platform risk? Liquidity premium? I don't understand enough to invest my own money here yet.", reasoning: "Knowledge gap between bank bond pricing and direct platform pricing creates doubt", emotional_state: "uncertain", friction_points: ["Yield gap vs bank pricing unexplained"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 5, value_score: 6, time_seconds: 22 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 8: Salaried Couple Saving for House (4/5 complete) — "The Goal-Driven Planner"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-036",
      demographics: {
        first_language: "Hindi",
        age: 30,
        occupation: "Engineering Manager + Product Designer (couple)",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Goal-Driven Planner",
        marital_status: "Married",
      },
      professional_background:
        "Combined CTC ₹38L. Saving ₹1.5L/month for a 2BHK down payment in Sarjapur Road. Target: ₹20L in 18 months. Currently: ₹8L in SBI FD (7%), ₹4L in Kuvera liquid fund (6.8%).",
      cultural_background:
        "He's from Patna, she's from Jaipur. Married 2 years ago. Living in a rented 1BHK in Whitefield.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 138,
      overall_monologue:
        "We calculated it — our ₹8L FD at 7% gives ₹84K interest in 18 months. The same ₹8L in a Grip bond at 12% gives ₹1.44L. That's ₹60K more towards our down payment. After tax at 30%, the bond still gives ₹1.01L vs FD's ₹59K after TDS. We need every rupee for the Sarjapur Road flat. The 18-month AA+ bond matches our horizon exactly. Both of us completing KYC so we can invest from both accounts.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "12.5% fixed returns. Priya and I have been spreadsheet-comparing FDs, debt MFs, and SGBs for our house fund. If this is real — SEBI registered, so it should be — the 18-month horizon matches our flat purchase timeline perfectly.",
          reasoning: "Goal-driven evaluation — 18-month bond matches house purchase timeline",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 12,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "18-month Muthoot Finance AA+ at 12.5% — that's our bond. Let me calculate: ₹8L × 12.5% × 1.5 years = ₹1.5L interest. After 30% tax = ₹1.05L net. SBI FD would give ₹59K net. Delta = ₹46K extra. That's half a month's EMI. Completing KYC now.",
          reasoning: "Precise calculation against house purchase goal with tax impact",
          emotional_state: "determined",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 22,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "PAN verified. Name matches. Now Priya needs to do hers too. We'll split ₹8L — ₹5L from my account, ₹3L from hers, to stay under the ₹10L threshold per PAN for lower tax reporting complexity.",
          reasoning: "Tax-optimized splitting between joint accounts",
          emotional_state: "organized",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 10,
        },
      ],
    },
    // 3 more completing couples (minimal)
    {
      persona_uuid: "grip-persona-037",
      demographics: { first_language: "Tamil", age: 32, occupation: "Data Scientist + CA (couple)", district: "Chennai", behavioral_archetype: "The Goal-Driven Planner" },
      professional_background: "Combined ₹30L CTC. Saving for a 3BHK in OMR. ₹12L in FDs.",
      cultural_background: "Tamil Brahmin couple. Parents in T. Nagar.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 130,
      overall_monologue: "Wife is a CA — she verified the SEBI registration and CRISIL ratings independently. We're moving ₹6L from our FD into an 18-month AA+ bond. The ₹48K extra interest pays for our modular kitchen upgrade.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Both KYC done. She verified on SEBI intermediary database — Grip is registered. We're deploying ₹6L.", reasoning: "CA wife provides professional validation", emotional_state: "confident", friction_points: [], decision_outcome: "CONTINUE", trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-038",
      demographics: { first_language: "Hindi", age: 28, occupation: "Consultant + Teacher (couple)", district: "Pune", behavioral_archetype: "The Goal-Driven Planner" },
      professional_background: "Combined ₹25L. Saving for a flat in Wakad. ₹5L accumulated.",
      cultural_background: "He's from Nagpur, she's from Pune. Renting in Baner.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 145,
      overall_monologue: "Our ₹5L in HDFC FD gives 7.1%. Same in an AA+ bond gives 12%. In 18 months, that's ₹40K extra. Not huge, but when you're saving every rupee for a down payment, ₹40K matters. It's one month of rent.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC verified. ₹5L going into the 18-month bond. Every ₹40K extra gets us closer to the flat.", reasoning: "Goal-driven precision", emotional_state: "focused", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 8, value_score: 9, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-039",
      demographics: { first_language: "Kannada", age: 35, occupation: "VP Engineering + Architect (couple)", district: "Bangalore Urban", behavioral_archetype: "The Goal-Driven Planner" },
      professional_background: "Combined ₹40L CTC. Buying in Sarjapur. ₹15L saved, need ₹25L total.",
      cultural_background: "Both Bangaloreans. Families in Jayanagar.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 150,
      overall_monologue: "We compared: SBI FD 7.1%, HDFC Short-Term Debt Fund 7.8%, Grip AA+ bond 12.5%. Bond wins after tax too. We browsed the catalog first — wanted to see maturity options that match our March 2028 flat registration date. The 24-month bond maturing Feb 2028 is perfect.",
      screen_monologues: [
        { screen_id: "bond_detail", view_name: "Bond Detail", internal_monologue: "24-month maturity, Feb 2028. Our flat registration is March 2028. ₹10L at 12% = ₹2.4L interest. After tax, ₹1.68L. FD would give ₹99K net. Delta ₹69K — that's the flooring budget sorted.", reasoning: "Maturity date matching with real estate timeline", emotional_state: "strategic", friction_points: [], decision_outcome: "CONTINUE", trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 22 },
      ],
    },
    // 1 couple drops off at discover_dashboard (yield skepticism, not ready)
    {
      persona_uuid: "grip-persona-040",
      demographics: { first_language: "Marathi", age: 29, occupation: "Analyst + Nurse (couple)", district: "Mumbai Suburban", behavioral_archetype: "The Goal-Driven Planner" },
      professional_background: "Combined ₹18L. Saving for a 1BHK in Navi Mumbai. ₹3L saved. Very conservative.",
      cultural_background: "Both from Nashik. Renting in Dombivli.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 50,
      overall_monologue: "We only have ₹3L saved and it took us 18 months to get here. 12.5% sounds amazing but Sonal's uncle lost his retirement money in a 'high return' scheme last year. We can't afford to lose even ₹10K from our flat fund. Let me check with the SBI branch manager first — if he confirms Grip is safe, we'll invest.",
      screen_monologues: [
        { screen_id: "discover_dashboard", view_name: "Discover Dashboard", internal_monologue: "12.5% return on our ₹3L would give ₹37,500 in 12 months. That's amazing — 2 months of rent. But Sonal's uncle lost ₹8L in some scheme. We can't take any risk with our flat fund. The SBI manager uncle will know if this is safe.", reasoning: "Cannot risk only savings. Need external validation from trusted authority figure.", emotional_state: "torn", friction_points: ["12.5% triggers 'too good to be true' fear", "Zero risk tolerance on house savings"], decision_outcome: "DROP_OFF", trust_score: 5, clarity_score: 7, value_score: 8, time_seconds: 18 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 9: Freelancer with Lumpy Income (3/5 complete) — "The Flexibility Seeker"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-041",
      demographics: {
        first_language: "Hindi",
        age: 29,
        occupation: "Freelance Full-Stack Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Flexibility Seeker",
        marital_status: "Unmarried",
      },
      professional_background:
        "Freelance developer on Toptal. Income: ₹6-12L/year (lumpy — big payments every 2-3 months). Currently ₹4L in savings, ₹2L in liquid fund. Wants to park lump sums between projects.",
      cultural_background:
        "From Jaipur. Lives in a co-living space in HSR Layout, Bangalore. Digital nomad lifestyle.",
      outcome: "completed",
      key_selections: { path: "Browse Bonds" },
      final_price_inr: null,
      total_time_seconds: 135,
      overall_monologue:
        "I get paid in chunks — ₹3-4L every 2-3 months. Between projects, the money just sits in my savings account at 3.5%. Liquid funds give 6.8% but bonds at 12%? That's a massive upgrade. 'Sell Anytime' is critical — I might need to pull ₹2L for rent if a project gets delayed. Browsed the bonds first, liked the 12-month AA+ option. I'll park ₹2L from my last Toptal payment and see how the secondary market liquidity actually works before going bigger.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "SEBI registered bonds. 'Sell Anytime' — that's the feature I need. My income is unpredictable. I can't lock money for 5 years like PPF. If I can park ₹3L in bonds and sell within a week if needed, this beats my liquid fund.",
          reasoning: "Liquidity feature is the primary hook for irregular-income earner",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 12,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "12-month bonds at 11.8% and 18-month at 12.5%. For my lumpy income, shorter maturity is better — I might need the money in 6 months. Let me browse and find the shortest maturity AA+ bond.",
          reasoning: "Matching investment horizon to uncertain income timeline",
          emotional_state: "practical",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 18,
          selected_choice: "Browse Bonds",
        },
        {
          screen_id: "bond_listing",
          view_name: "Bond Listing",
          internal_monologue: "6-month bond at 10.2% AA — that's perfect for parking my Toptal payment. If I need the money before 6 months, 'Sell Anytime'. Let me see the details.",
          reasoning: "Short maturity matches freelancer cash flow needs",
          emotional_state: "optimistic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 18,
        },
        {
          screen_id: "bond_detail",
          view_name: "Bond Detail",
          internal_monologue: "6-month, AA rated, 10.2% YTM, ₹10K per unit. I'll buy 20 units = ₹2L. If my next Toptal project comes through, I'll add more. The 'Sell Anytime' secondary market has a 2% exit load — acceptable for emergency liquidity.",
          reasoning: "Calculated entry with exit cost awareness",
          emotional_state: "decided",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 22,
        },
      ],
    },
    // 2 more completing freelancers (minimal)
    {
      persona_uuid: "grip-persona-042",
      demographics: { first_language: "Telugu", age: 32, occupation: "Freelance Digital Marketer", district: "Hyderabad", behavioral_archetype: "The Flexibility Seeker" },
      professional_background: "Freelance marketer. ₹8-15L annual. ₹5L in savings between projects.",
      cultural_background: "From Vizag. Lives in Madhapur, Hyderabad.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 128,
      overall_monologue: "Between client payments, my money just sits in Axis savings at 3.5%. Liquid funds are 6.8% but bonds at 11% for 12 months — no brainer. KYC was quick. Deploying ₹3L in a 12-month AA+ bond. 'Sell Anytime' gives me the safety net if a client delays payment.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC done. Deploying ₹3L. If Toptal payment comes early, I'll add more.", reasoning: "Simple execution", emotional_state: "efficient", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 8, value_score: 8, time_seconds: 10 },
      ],
    },
    {
      persona_uuid: "grip-persona-043",
      demographics: { first_language: "Hindi", age: 24, occupation: "Freelance Video Editor", district: "Delhi", behavioral_archetype: "The Flexibility Seeker" },
      professional_background: "YouTube video editor. ₹6-10L annual. ₹2L in savings. Wants better returns than savings account.",
      cultural_background: "From Kanpur. Lives in Laxmi Nagar, Delhi.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 132,
      overall_monologue: "My savings account gives me basically nothing. Even ₹2L at 10% is ₹20K/year — that's a new camera lens. KYC was standard. Investing ₹1L to start — keeping ₹1L liquid for rent emergencies.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Done. ₹1L going into a 12-month bond. ₹20K interest = new DaVinci Resolve license.", reasoning: "Converting idle savings into tangible goal", emotional_state: "motivated", friction_points: [], decision_outcome: "CONTINUE", trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 10 },
      ],
    },
    // 2 freelancers who drop off
    {
      persona_uuid: "grip-persona-044",
      demographics: { first_language: "Hindi", age: 25, occupation: "Freelance Content Writer", district: "Chandigarh", behavioral_archetype: "The Flexibility Seeker" },
      professional_background: "Content writer. ₹4-7L annual. ₹1.8L in savings. First time considering bonds.",
      cultural_background: "From Panchkula. Lives in Sector 17, Chandigarh.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 50,
      overall_monologue: "The dashboard looks nice but I just got my first big freelance payment — ₹1.8 lakh. I don't even know if I should put this in bonds or a liquid fund. My friend says liquid funds give 7% and I can withdraw anytime. These bonds say 'Sell Anytime' but is it really anytime? What if I need the money next month for rent? I should research more before committing.",
      screen_monologues: [
        { screen_id: "discover_dashboard", view_name: "Discover Dashboard", internal_monologue: "Bonds vs liquid funds — I don't even know the difference. My friend says liquid funds are safer. 'Sell Anytime' sounds good but what's the exit load? How long does it take to get the money? I need to understand this better before investing my rent money.", reasoning: "Financial literacy gap — cannot evaluate bond liquidity vs liquid fund liquidity", emotional_state: "uncertain", friction_points: ["Bond vs liquid fund confusion", "'Sell Anytime' lacks detail on exit process"], decision_outcome: "DROP_OFF", trust_score: 6, clarity_score: 4, value_score: 6, time_seconds: 18 },
      ],
    },
    {
      persona_uuid: "grip-persona-045",
      demographics: { first_language: "Hindi", age: 28, occupation: "Freelance Graphic Designer", district: "Bhopal", behavioral_archetype: "The Flexibility Seeker" },
      professional_background: "Graphic designer on Fiverr/Upwork. ₹5-9L annual. ₹2.5L from recent client payment.",
      cultural_background: "From Bhopal. Lives with parents in Arera Colony.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 62,
      overall_monologue: "I got a ₹2.5 lakh payment from a client last week and wanted to park it somewhere better than my savings account. The yields looked good on the dashboard. But PAN verification? I file my taxes through a CA — I'm not sure about entering my PAN into every fintech app. What if they report something to the IT department that my CA hasn't filed yet? I'll ask my CA first and come back.",
      screen_monologues: [
        { screen_id: "kyc_pan_entry", view_name: "KYC PAN Entry", internal_monologue: "They want my PAN. I file taxes through my CA — what if Grip reports my investment and it doesn't match what my CA has filed? Freelance income is complicated — my CA handles the advance tax calculations. I don't want to create any IT department issues by entering my PAN into random apps.", reasoning: "Tax compliance anxiety — freelance income reporting is complex", emotional_state: "anxious", friction_points: ["PAN sharing concerns", "Tax reporting fear"], decision_outcome: "DROP_OFF", trust_score: 4, clarity_score: 5, value_score: 7, time_seconds: 18 },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 10: FIRE-Chasing Tech Worker (5/5 complete) — "The Optimizer"
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "grip-persona-046",
      demographics: {
        first_language: "Telugu",
        age: 32,
        occupation: "Principal Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Optimizer",
        marital_status: "Married",
      },
      professional_background:
        "Principal Engineer at a unicorn. ₹48L CTC + ₹12L RSUs. FIRE target: ₹4Cr corpus by 40. Current portfolio: ₹1.2Cr equity (Nifty 50 + S&P 500), ₹30L debt (ICICI Pru All Seasons Bond, Axis Strategic Bond). Building a fixed-income ladder with staggered maturities.",
      cultural_background:
        "Telugu family from Guntur. Wife is a PM at another startup. Lives in Sarjapur Road.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 100,
      overall_monologue:
        "I've been building a fixed-income ladder: 6-month, 12-month, 18-month, 24-month bonds with staggered maturities so something matures every quarter. Currently doing this through my ICICI Direct demat, but the bond selection is limited. Grip has better inventory — AA+ issuers I recognize from my debt MF underlying holdings. The 12.5% YTM on 18-month Muthoot bonds beats my Axis Strategic Bond Fund's 8.4% YTM by 410bps. After tax arbitrage (bonds taxed at slab vs debt MFs at slab post-2023), direct bonds have zero expense ratio advantage. Deploying ₹10L across 4 maturities to complete my ladder. KYC was instant — my PAN is CKYC-linked from Zerodha.",
      screen_monologues: [
        {
          screen_id: "landing",
          view_name: "Landing Page",
          internal_monologue: "Grip — I've been tracking them since their Series A. SEBI registered, NSE settlement. The yields are competitive with what I see on ICICI Direct but with better UX. Time to diversify my bond sourcing beyond one broker.",
          reasoning: "Pre-informed investor evaluating execution quality",
          emotional_state: "purposeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 6,
        },
        {
          screen_id: "discover_dashboard",
          view_name: "Discover Dashboard",
          internal_monologue: "I see bonds across 6, 12, 18, and 24-month maturities. Perfect for my ladder strategy. Muthoot 18M at 12.5%, Shriram 12M at 11.8%, Bajaj 24M at 11.2%. All AA or above. The YTM display is clean — I don't need to calculate manually. Completing KYC to start deploying.",
          reasoning: "Bond ladder strategy mapping to available inventory",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 15,
          selected_choice: "Complete KYC",
        },
        {
          screen_id: "kyc_pan_entry",
          view_name: "KYC PAN Entry",
          internal_monologue: "PAN entry. CKYC-linked, should be instant.",
          reasoning: "Expects fast verification from existing CKYC",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 10,
        },
        {
          screen_id: "kyc_pan_details",
          view_name: "KYC PAN Details Confirmation",
          internal_monologue: "Instant verification — name, DOB, address all auto-populated from CKYC. This is how fintech KYC should work. Ready to deploy ₹10L across 4 bonds.",
          reasoning: "Seamless KYC validates platform quality",
          emotional_state: "impressed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
      ],
    },
    // 4 more completing FIRE chasers (minimal)
    {
      persona_uuid: "grip-persona-047",
      demographics: { first_language: "Hindi", age: 28, occupation: "Senior SDE", district: "Hyderabad", behavioral_archetype: "The Optimizer" },
      professional_background: "SDE-3 at a FAANG. ₹38L CTC. FIRE target ₹3Cr by 38. ₹60L invested, 80:20 equity:debt split.",
      cultural_background: "From Kanpur. Lives in Gachibowli. Reads r/FIREIndia religiously.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 95,
      overall_monologue: "My debt allocation is in Franklin India UST and HDFC Corporate Bond Fund — 7.5% and 8.1% respectively. Direct bonds at 11-12% with zero expense ratio? That's a no-brainer for my FIRE math. ₹12L going into staggered maturities. KYC was 90 seconds.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC done in 90 seconds. Deploying ₹12L across 6M, 12M, 18M bonds. My FIRE calculator just jumped ahead by 6 months.", reasoning: "FIRE timeline acceleration through yield optimization", emotional_state: "thrilled", friction_points: [], decision_outcome: "CONTINUE", trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-048",
      demographics: { first_language: "Kannada", age: 35, occupation: "VP Engineering", district: "Bangalore Urban", behavioral_archetype: "The Optimizer" },
      professional_background: "VP Eng at a Series C startup. ₹50L CTC + ESOPs. FIRE target ₹5Cr by 42. ₹1.5Cr invested.",
      cultural_background: "Bangalorean. Lives in Indiranagar. Runs a FIRE blog.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 92,
      overall_monologue: "I'm writing a blog post comparing direct bonds vs debt MFs for FIRE portfolios. Grip's 12.5% on AA+ vs Bharat Bond ETF's 7.2% — the spread is massive even after adjusting for credit risk and liquidity. Deploying ₹15L as my bond ladder base. Will write about the experience.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "Clean KYC. ₹15L across 5 bonds with staggered maturities. This is going in my FIRE blog post.", reasoning: "Research + investment combo", emotional_state: "excited", friction_points: [], decision_outcome: "CONTINUE", trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-049",
      demographics: { first_language: "Tamil", age: 30, occupation: "ML Engineer", district: "Bangalore Urban", behavioral_archetype: "The Optimizer" },
      professional_background: "ML Engineer at a FAANG. ₹42L CTC. FIRE target ₹3.5Cr by 40. ₹80L invested.",
      cultural_background: "From Coimbatore. Lives in Whitefield.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 98,
      overall_monologue: "I've optimized my equity allocation to near-zero expense ratios (Navi Nifty 50 at 0.05%). Now doing the same for debt — moving from Axis Strategic Bond (0.45% expense) to direct bonds (0% expense). The 12% YTM on AA+ minus 30% tax = 8.4% post-tax. Axis gives 8.4% pre-expense, so 7.95% post-expense. That's a clear 45bps alpha on bonds. Deploying ₹8L.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "KYC instant. ₹8L deploying into 3 bonds. Expense ratio arbitrage: direct bonds 0% vs debt MF 0.45%. On ₹8L that's ₹3,600/year saved.", reasoning: "Basis-point optimization across portfolio", emotional_state: "methodical", friction_points: [], decision_outcome: "CONTINUE", trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8 },
      ],
    },
    {
      persona_uuid: "grip-persona-050",
      demographics: { first_language: "Hindi", age: 38, occupation: "Engineering Director", district: "Hyderabad", behavioral_archetype: "The Optimizer" },
      professional_background: "Director at a FAANG. ₹65L CTC. FIRE target ₹6Cr by 45. ₹2.2Cr invested. Planning to coastFIRE in 3 years.",
      cultural_background: "From Lucknow. Lives in Jubilee Hills. Wife is a doctor.",
      outcome: "completed",
      key_selections: { path: "Complete KYC" },
      final_price_inr: null,
      total_time_seconds: 88,
      overall_monologue: "I'm 3 years from coastFIRE. Need to shift portfolio from 80:20 equity:debt to 60:40. That means adding ₹40L to fixed income over the next 12 months. Currently using RBI bonds (7.15%) and Bharat Bond ETF (7.2%). Grip's 11-12% AA+ bonds with NSE settlement are a significant upgrade. Deploying ₹20L in first tranche across 4 maturity buckets. KYC took 75 seconds.",
      screen_monologues: [
        { screen_id: "kyc_pan_details", view_name: "KYC PAN Details Confirmation", internal_monologue: "75 seconds. ₹20L going in. This accelerates my coastFIRE timeline by 8 months based on the yield upgrade from 7.2% to 11.5% blended.", reasoning: "Precise FIRE timeline recalculation", emotional_state: "strategic", friction_points: [], decision_outcome: "CONTINUE", trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 7 },
      ],
    },
  ],
};
