import type { SimulationData } from "@/types/simulation";

/**
 * Fit Square — Pay-per-session gym aggregator app (Bangalore/Mumbai).
 * 50 synthetic Indian personas across 10 sub-segments.
 * 30 completers, 20 drop-offs. 60% completion rate.
 * Used as sample/demo data for the simulation report UI.
 */
export const fitSquareSimData: SimulationData = {
  simulation_id: "fs-gym-sim-20260402-001",
  flow_id: "fitsquare_onboarding_v1",
  flow_name: "Fit Square — Pay-Per-Session Gym Aggregator Onboarding",
  generated_at: "2026-04-02T14:00:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 50,
    completed: 30,
    dropped_off: 20,
    completion_rate_pct: 60.0,
    avg_time_to_complete_seconds: 95,
    dominant_plan: "Basic 30",
    dominant_plan_pct: 60.0,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 50,
    margin_of_error_pct: 9.1,
    confidence_level: "80%",
    note: "Sample size of 50 provides adequate directional signal at 80% confidence (±9.1%). Sub-segment sizes of 5 are directional only. Increase to 100+ for statistically significant sub-segment analysis.",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {
    "Basic 30": { count: 18, pct: 60.0 },
    "Premium 30": { count: 8, pct: 26.7 },
    "Elite 30": { count: 4, pct: 13.3 },
  },

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 30, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "plan_selection", drop_offs: 5, drop_off_pct: 10.0 },
    { screen_id: "phone_number", drop_offs: 4, drop_off_pct: 8.0 },
    { screen_id: "gym_browse", drop_offs: 3, drop_off_pct: 6.0 },
    { screen_id: "create_profile", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "location_permission", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "gym_detail", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "checkout_basic", drop_offs: 1, drop_off_pct: 2.0 },
    { screen_id: "checkout_premium", drop_offs: 1, drop_off_pct: 2.0 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "₹1,599 minimum commitment for untested gym sessions — no way to try a single session first",
      frequency: 12,
    },
    {
      friction:
        "No single-session trial option before buying 30-pack",
      frequency: 9,
    },
    {
      friction:
        "Phone number required before seeing gym inventory — users want to browse first",
      frequency: 7,
    },
    {
      friction:
        "Unfamiliar per-session model — unclear if sessions expire or can be shared",
      frequency: 6,
    },
    {
      friction:
        "Nearest quality gym is 3+ km away from user's locality",
      frequency: 5,
    },
    {
      friction:
        "Too many permission requests (location + notifications) back-to-back without clear value explanation",
      frequency: 4,
    },
    {
      friction:
        "No gym walkthrough photos or equipment lists on detail page — users unsure of gym quality",
      frequency: 3,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    onboarding_1: {
      avg_trust: 7.6,
      avg_clarity: 8.4,
      avg_value: 7.2,
      avg_time_s: 8,
      sample_size: 50,
    },
    onboarding_2: {
      avg_trust: 7.4,
      avg_clarity: 8.1,
      avg_value: 7.5,
      avg_time_s: 10,
      sample_size: 50,
    },
    onboarding_3: {
      avg_trust: 7.5,
      avg_clarity: 8.0,
      avg_value: 7.8,
      avg_time_s: 9,
      sample_size: 50,
    },
    phone_number: {
      avg_trust: 5.8,
      avg_clarity: 7.2,
      avg_value: 5.4,
      avg_time_s: 15,
      sample_size: 50,
    },
    otp_verification: {
      avg_trust: 6.2,
      avg_clarity: 8.0,
      avg_value: 5.6,
      avg_time_s: 12,
      sample_size: 46,
    },
    create_profile: {
      avg_trust: 6.4,
      avg_clarity: 6.8,
      avg_value: 5.8,
      avg_time_s: 25,
      sample_size: 46,
    },
    location_permission: {
      avg_trust: 5.6,
      avg_clarity: 6.5,
      avg_value: 6.2,
      avg_time_s: 8,
      sample_size: 44,
    },
    notification_permission: {
      avg_trust: 5.8,
      avg_clarity: 6.4,
      avg_value: 5.0,
      avg_time_s: 6,
      sample_size: 42,
    },
    gym_browse: {
      avg_trust: 7.0,
      avg_clarity: 7.4,
      avg_value: 7.2,
      avg_time_s: 20,
      sample_size: 42,
    },
    gym_detail: {
      avg_trust: 6.8,
      avg_clarity: 7.0,
      avg_value: 7.0,
      avg_time_s: 18,
      sample_size: 39,
    },
    plan_selection: {
      avg_trust: 5.4,
      avg_clarity: 4.8,
      avg_value: 5.2,
      avg_time_s: 30,
      sample_size: 37,
    },
    checkout_basic: {
      avg_trust: 6.6,
      avg_clarity: 7.0,
      avg_value: 6.8,
      avg_time_s: 18,
      sample_size: 19,
    },
    checkout_premium: {
      avg_trust: 6.8,
      avg_clarity: 7.2,
      avg_value: 7.0,
      avg_time_s: 16,
      sample_size: 8,
    },
    checkout_elite: {
      avg_trust: 7.2,
      avg_clarity: 7.4,
      avg_value: 7.4,
      avg_time_s: 14,
      sample_size: 4,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "60% of users complete the Fit Square onboarding-to-payment flow, but there's a stark income divide: fitness enthusiasts and young professionals convert at 80-100%, while budget-conscious workers drop off at 80%. The ₹1,599 minimum 30-session pack is the single biggest barrier — users who've never tried per-session gym access won't commit ₹1,599 sight unseen. The phone number gate before showing gym inventory costs 8% of users who want to browse first, decide later.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "task_failure",
      screen: "plan_selection",
      finding:
        "₹1,599 minimum 30-session pack causes price shock and task abandonment for budget-conscious segments",
      evidence:
        "5 of 37 personas reaching plan_selection dropped off (13.5%). All 5 cited the minimum commitment price. Budget-Conscious Workers showed 60% drop-off at this screen. Personas earning below ₹25K/month universally rejected the pricing.",
      affected_segments: ["The Skeptic", "The Cautious Explorer"],
      recommendation:
        "Introduce a 10-session starter pack at ₹499 (₹50/session) or a free single-session trial to lower the commitment barrier for first-time users.",
    },
    {
      severity: "major",
      type: "trust_issue",
      screen: "phone_number",
      finding:
        "Phone number gate before gym browsing creates trust barrier — users want to see inventory before registering",
      evidence:
        "4 personas dropped off at phone_number (8%). Three explicitly stated they wanted to browse gyms before sharing personal information. Privacy-conscious Budget Workers and Mumbai Migrants over-indexed on this drop-off.",
      affected_segments: ["The Skeptic", "The Cautious Explorer"],
      recommendation:
        "Move phone number collection to after gym_browse. Let users see available gyms in their area before requiring registration.",
    },
    {
      severity: "major",
      type: "friction_point",
      screen: "plan_selection",
      finding:
        "No single-session trial option — users unfamiliar with per-session model won't commit to 30 sessions",
      evidence:
        "9 personas across segments mentioned wanting to try a single session before committing. Even some completers expressed hesitation and noted they would have preferred a trial.",
      affected_segments: [
        "The Skeptic",
        "The Cautious Explorer",
        "The Pragmatist",
      ],
      recommendation:
        "Add a ₹0 first-session trial prominently on the plan selection screen with a clear CTA: 'Try your first session free'.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "location_permission",
      finding:
        "Back-to-back permission requests (location + notifications) feel intrusive without clear value explanation",
      evidence:
        "2 personas dropped off at location_permission and 4 personas noted feeling 'bombarded by permissions'. Trust scores dropped 1.5 points on average between create_profile and notification_permission.",
      affected_segments: [
        "The Skeptic",
        "The Cautious Explorer",
        "The Pragmatist",
      ],
      recommendation:
        "Combine into a single permission screen explaining: 'We need your location to show nearby gyms' with notifications as an optional toggle, not a separate blocking step.",
    },
    {
      severity: "minor",
      type: "confusion",
      screen: "gym_detail",
      finding:
        "Gym detail page lacks walkthrough photos, equipment lists, and crowd-time data — users unsure of quality",
      evidence:
        "2 personas dropped off at gym_detail citing inability to assess gym quality. 5 additional completers noted they wished they could see equipment and peak-hour data.",
      affected_segments: ["The Enthusiast", "The Pragmatist"],
      recommendation:
        "Add 360° gym walkthrough photos, equipment inventory, and real-time crowd indicators to the gym detail page.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "Clear income and familiarity divide: fitness-active users and young urban professionals (digital literacy 7+, income ₹40K+/mo) convert at 80-100%, while budget-conscious workers (income ₹15-25K/mo) and city migrants unfamiliar with local gyms convert at 20-40%. The per-session model resonates strongly with existing gym-goers but confuses first-timers.",
    high_propensity_segment:
      "Fitness Enthusiasts and Young Bangalore Natives — already active, familiar with local gyms, understand the per-session value proposition. Digital literacy 7+, income ₹40K+/mo. 100% and 80% conversion respectively.",
    low_propensity_segment:
      "Budget-Conscious Workers — ₹1,599 represents 5-10% of monthly income with no way to test the service first. Phone number requirement before browsing creates trust barrier. Only 20% conversion rate.",
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "The ₹1,599 minimum commitment kills conversion for price-sensitive segments. Users who already go to gyms love the per-session flexibility, but new-to-gym users see ₹1,599 as a gamble on an unfamiliar model. The flow's biggest structural flaw is gating gym browsing behind phone registration — the product's strongest selling point (nearby gym inventory) is hidden until after users have committed personal data.",
    what_works: [
      {
        element: "Onboarding carousel (screens 1-3)",
        why: "Clean visual explanation of the per-session model builds understanding quickly",
        for_whom: "All segments — even drop-offs rated onboarding screens 7+ on clarity",
      },
      {
        element: "Gym browse and detail screens",
        why: "Map-based discovery and gym cards with ratings feel familiar and trustworthy",
        for_whom: "All segments who reached these screens",
      },
      {
        element: "Per-session pricing concept",
        why: "Fitness enthusiasts immediately grasp the value — pay only when you go, no wasted monthly fees",
        for_whom: "Fitness Enthusiasts, Young Bangalore/Mumbai Natives",
      },
    ],
    what_needs_fixing: [
      {
        element: "Plan selection minimum commitment",
        problem: "₹1,599 for 30 sessions is the only entry point — no trial or smaller pack",
        for_whom: "Budget-Conscious Workers, Mumbai Migrants, first-time gym users",
        fix: "Add a 10-session starter pack at ₹499 and a free first-session trial",
        priority: "P0",
      },
      {
        element: "Phone number gate placement",
        problem: "Users must register before seeing any gym inventory",
        for_whom: "Privacy-conscious users across all segments",
        fix: "Move phone collection to after gym_browse",
        priority: "P0",
      },
      {
        element: "Permission request flow",
        problem: "Back-to-back location + notification permissions feel invasive",
        for_whom: "All segments, especially lower-trust migrants and budget workers",
        fix: "Combine into single screen with clear value explanation",
        priority: "P2",
      },
    ],
    usability_score: 6,
    emotional_journey_map: {
      completers:
        "Curious (onboarding) → Mildly annoyed (phone gate) → Reassured (OTP works smoothly) → Neutral (profile) → Slightly wary (permissions) → Excited (gym browse — 'oh there's one near me!') → Interested (gym detail) → Hesitant (plan pricing) → Resolved (checkout — 'let me try this out') → Hopeful (payment complete)",
      drop_offs:
        "Curious (onboarding) → Suspicious (phone gate — 'why do they need this?') → [EXIT] OR Interested (gym browse) → Disappointed (no good gyms nearby) → [EXIT] OR Hopeful (gym detail) → Shocked (plan pricing — '₹1,599?!') → Frustrated ('no smaller pack?') → [EXIT]",
    },
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 12,
    screens: {
      plan_selection: {
        total_drop_offs: 5,
        clusters: [
          {
            cluster_id: 1,
            label: "Minimum 30-session commitment too high for trial",
            persona_count: 3,
            representative_reasoning:
              "₹1,599 for 30 sessions is too much for something I've never tried. I want to test one session first before committing to a 30-pack. What if the gym near me isn't good? That's money wasted.",
          },
          {
            cluster_id: 2,
            label: "Per-session model unfamiliar — want monthly subscription option",
            persona_count: 2,
            representative_reasoning:
              "I don't understand this per-session thing. Every gym I know charges monthly. Why can't I just pay ₹800/month like my old gym? 30 sessions sounds complicated — do they expire? Can I share with my wife?",
          },
        ],
      },
      phone_number: {
        total_drop_offs: 4,
        clusters: [
          {
            cluster_id: 1,
            label: "Want to browse gyms before registering personal details",
            persona_count: 3,
            representative_reasoning:
              "Why should I give my phone number before I even know if there are good gyms near me? Let me see what's available first. I don't want spam calls from another fitness app.",
          },
          {
            cluster_id: 2,
            label: "Privacy concern with phone number collection",
            persona_count: 1,
            representative_reasoning:
              "Every app in India wants my number and then I get 10 marketing messages a day. I already get enough spam. I'll come back if a friend tells me this app is worth it.",
          },
        ],
      },
      gym_browse: {
        total_drop_offs: 3,
        clusters: [
          {
            cluster_id: 1,
            label: "No quality gyms within acceptable distance",
            persona_count: 2,
            representative_reasoning:
              "The nearest gym is 4.2 km from my PG. I'm not going to auto-rickshaw to the gym every day. I was hoping there'd be something within walking distance in Koramangala.",
          },
          {
            cluster_id: 2,
            label: "Available gyms don't match expectations",
            persona_count: 1,
            representative_reasoning:
              "These gyms look like small neighborhood places. I was expecting premium gyms like Cult or Gold's. If I'm paying per session, I want quality equipment and AC.",
          },
        ],
      },
    },
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "Young Bangalore Native",
    "Young Mumbai Native",
    "Bangalore Migrant Professional",
    "Mumbai Migrant Professional",
    "Fitness Enthusiast",
    "Young Women Professional",
    "Budget-Conscious Worker",
    "Settled Professional 35+",
    "Young Single Millennial",
    "Married Family Person",
  ],

  // ── Segment-Screen Breakdown ────────────────────────────────────────────────
  segment_screen_breakdown: {
    onboarding_1: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    onboarding_2: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    onboarding_3: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    phone_number: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 5, dropped_off: 2, drop_off_pct: 40.0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    otp_verification: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    create_profile: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    location_permission: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Mumbai Migrant Professional": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    notification_permission: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    gym_browse: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Bangalore Migrant Professional": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Mumbai Migrant Professional": { reached: 3, dropped_off: 1, drop_off_pct: 33.3 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    gym_detail: {
      "Young Bangalore Native": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Young Single Millennial": { reached: 4, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    plan_selection: {
      "Young Bangalore Native": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Young Mumbai Native": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 3, dropped_off: 2, drop_off_pct: 66.7 },
      "Settled Professional 35+": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Young Single Millennial": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Married Family Person": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    checkout_basic: {
      "Young Bangalore Native": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Fitness Enthusiast": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Budget-Conscious Worker": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
      "Settled Professional 35+": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Young Single Millennial": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
    },
    checkout_premium: {
      "Young Bangalore Native": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Young Mumbai Native": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Bangalore Migrant Professional": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Mumbai Migrant Professional": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
      "Fitness Enthusiast": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Young Women Professional": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Married Family Person": { reached: 1, dropped_off: 1, drop_off_pct: 100.0 },
    },
    checkout_elite: {
      "Fitness Enthusiast": { reached: 2, dropped_off: 0, drop_off_pct: 0 },
      "Young Bangalore Native": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
      "Settled Professional 35+": { reached: 1, dropped_off: 0, drop_off_pct: 0 },
    },
  },

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    plan_selection: [
      {
        persona_uuid: "fs-persona-032",
        persona_label: "23yo Shop Assistant, Jayanagar, Bangalore",
        behavioral_archetype: "The Skeptic",
        internal_monologue:
          "₹1,599 for 30 sessions? That's more than my weekly grocery budget. I earn ₹18,000 a month and I was hoping this would be cheaper than a regular gym. My friend said 'pay per session' so I thought maybe ₹50-100 per visit, walk in when I want. But ₹1,599 upfront for a pack? I'll just continue doing push-ups at the park near Jayanagar 4th Block.",
        reasoning:
          "Minimum commitment of ₹1,599 is 8.9% of monthly income — unacceptable for an untested service",
        emotional_state: "frustrated",
        trust_score: 4,
        clarity_score: 5,
        value_score: 2,
      },
      {
        persona_uuid: "fs-persona-038",
        persona_label: "35yo Government Clerk, Thane, Mumbai",
        behavioral_archetype: "The Pragmatist",
        internal_monologue:
          "I was interested in the concept — pay only when you go, no wasted monthly fees. But ₹1,599 for the cheapest pack? My gym near Thane station charges ₹700/month. Yes it's basic, but I know the trainer and I go 4 times a week. This per-session thing works out to ₹53 per session but I need to commit to 30 sessions upfront. What if I only go 15 times? Then it's ₹107 per session — worse than my current gym.",
        reasoning:
          "Unfamiliar pricing model with unclear value compared to existing monthly gym membership",
        emotional_state: "skeptical",
        trust_score: 5,
        clarity_score: 4,
        value_score: 3,
      },
      {
        persona_uuid: "fs-persona-045",
        persona_label: "27yo Delivery Executive, Electronic City, Bangalore",
        behavioral_archetype: "The Skeptic",
        internal_monologue:
          "₹1,599? Bro, I deliver food for Swiggy and my daily earning is ₹600-800. I can't spend two days of earnings on gym sessions. I thought this was a cheap pay-as-you-go thing. The gym they're showing near Electronic City looked decent but this price is for rich IT people, not for me.",
        reasoning:
          "Price point completely mismatched with income level — ₹1,599 represents 2+ days of earnings",
        emotional_state: "disappointed",
        trust_score: 5,
        clarity_score: 6,
        value_score: 1,
      },
      {
        persona_uuid: "fs-persona-041",
        persona_label: "26yo Content Writer, HSR Layout, Bangalore",
        behavioral_archetype: "The Pragmatist",
        internal_monologue:
          "I like the idea and the gym near HSR Layout BDA Complex looks clean. But I'm not sure about committing to 30 sessions. I've downloaded 3 fitness apps before and used each for about 2 weeks. ₹1,599 is not a lot for me but I know myself — I might use 10 sessions and waste the rest. Wish there was a 10-session trial pack.",
        reasoning:
          "Self-aware about fitness commitment patterns — minimum 30-session pack feels too large for trial",
        emotional_state: "hesitant",
        trust_score: 6,
        clarity_score: 5,
        value_score: 4,
      },
    ],
    phone_number: [
      {
        persona_uuid: "fs-persona-033",
        persona_label: "29yo Electrician, Bommanahalli, Bangalore",
        behavioral_archetype: "The Skeptic",
        internal_monologue:
          "Why does a gym app need my phone number before I can even see which gyms are there? I installed this because someone at work said there's a gym near Bommanahalli for cheap. But now they want my number first? Last time I gave my number to an app, I got calls from insurance agents for 3 months. Just show me the gyms and I'll register if I find something good.",
        reasoning:
          "Past negative experience with phone number sharing — wants to validate value before providing personal data",
        emotional_state: "suspicious",
        trust_score: 3,
        clarity_score: 6,
        value_score: 4,
      },
      {
        persona_uuid: "fs-persona-034",
        persona_label: "22yo Construction Helper, Whitefield, Bangalore",
        behavioral_archetype: "The Skeptic",
        internal_monologue:
          "I don't give my number to apps. My friend showed me this app and it looked nice but I only have one phone and one number. If they start sending SMS and calls, I can't block them easily. I'll ask my friend to show me the gyms on his phone first.",
        reasoning:
          "Single phone number — protective of it, low trust in app-based services",
        emotional_state: "wary",
        trust_score: 2,
        clarity_score: 7,
        value_score: 3,
      },
      {
        persona_uuid: "fs-persona-020",
        persona_label: "32yo Logistics Coordinator, Andheri East, Mumbai",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "I'm new to Mumbai — moved from Lucknow 8 months ago. I was hoping to see if there's a decent gym near my office in Andheri East. But they want my phone number before showing me anything? I'm already getting 20 spam calls a day on my new Mumbai number. Let me check Google Maps for gyms near me instead.",
        reasoning:
          "Recent city migrant already overwhelmed with spam — phone gate is the last straw",
        emotional_state: "annoyed",
        trust_score: 3,
        clarity_score: 7,
        value_score: 5,
      },
      {
        persona_uuid: "fs-persona-044",
        persona_label: "24yo College Student, Koramangala, Bangalore",
        behavioral_archetype: "The Pragmatist",
        internal_monologue:
          "I saw this on Instagram reels — 'pay per session gym in Bangalore'. Cool concept. But I just want to check if there's something near my PG in Koramangala 6th Block. Why do I need to register before browsing? Even Zomato lets me see restaurants without logging in. I'll come back when I actually want to go to the gym.",
        reasoning:
          "Compares UX to well-known apps that allow browsing without registration",
        emotional_state: "mildly frustrated",
        trust_score: 5,
        clarity_score: 7,
        value_score: 5,
      },
    ],
    gym_browse: [
      {
        persona_uuid: "fs-persona-015",
        persona_label: "28yo HR Executive, Yelahanka, Bangalore",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "I went through the whole registration process and now I see the gym list. The nearest one is 4.2 km away in Sahakara Nagar. That's a 20-minute auto ride — ₹80 each way. So my 'per-session' cost is actually ₹53 + ₹160 transport = ₹213. For that I might as well join the small gym in my apartment complex. This app is useless for Yelahanka.",
        reasoning:
          "No gyms within acceptable distance — total cost including transport defeats the value proposition",
        emotional_state: "disappointed",
        trust_score: 5,
        clarity_score: 7,
        value_score: 2,
      },
      {
        persona_uuid: "fs-persona-022",
        persona_label: "26yo BPO Associate, Malad, Mumbai",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "The gyms showing up near Malad are all small places I've seen from outside — Muscle Factory, Fitness Zone. They look like they have 2 treadmills and some dumbbells. I was expecting this to list gyms like Cult Fit or Anytime Fitness. For ₹53 per session I want air conditioning at least. These look like ₹500/month gyms charging premium through an app.",
        reasoning:
          "Gym quality on platform doesn't match expectation set by app's premium branding",
        emotional_state: "underwhelmed",
        trust_score: 4,
        clarity_score: 6,
        value_score: 3,
      },
      {
        persona_uuid: "fs-persona-019",
        persona_label: "34yo Accountant, Hebbal, Bangalore",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "Only 3 gyms showing in Hebbal area and two of them have 3.2 star ratings. The one decent-looking gym is near Manyata Tech Park — opposite direction from my home. I'd need a specific gym near Kempapura main road. Maybe this app hasn't launched properly in North Bangalore yet. I'll check back in a few months.",
        reasoning:
          "Insufficient gym coverage in user's specific locality — low confidence in platform maturity",
        emotional_state: "unimpressed",
        trust_score: 4,
        clarity_score: 7,
        value_score: 3,
      },
    ],
    gym_detail: [
      {
        persona_uuid: "fs-persona-029",
        persona_label: "25yo Marketing Executive, Bandra West, Mumbai",
        behavioral_archetype: "The Cautious Explorer",
        internal_monologue:
          "I clicked on this gym near Bandra station. The photos look okay but there's no information about women's batches, trainer qualifications, or peak hours. As a woman, I need to know if this place is safe and comfortable at the time I'd go — 7 PM after work. I'm not walking into an unknown gym based on 3 photos and a 4.1 rating.",
        reasoning:
          "Insufficient safety/comfort information for female user — gym detail page lacks critical trust signals",
        emotional_state: "cautious",
        trust_score: 4,
        clarity_score: 5,
        value_score: 5,
      },
      {
        persona_uuid: "fs-persona-039",
        persona_label: "38yo Operations Manager, Whitefield, Bangalore",
        behavioral_archetype: "The Pragmatist",
        internal_monologue:
          "The gym in ITPL Road looks like a decent mid-range place. But ₹53 per session for this? I can see from the photos it's not a premium gym — no swimming pool, no sauna, basic equipment. At my age I need proper machines for my knee rehab exercises. The trainer shown is some 22-year-old kid. I need a physiotherapy-trained trainer. This isn't for someone like me.",
        reasoning:
          "Gym quality and trainer credentials insufficient for specific health/age requirements",
        emotional_state: "dismissive",
        trust_score: 4,
        clarity_score: 6,
        value_score: 3,
      },
    ],
  },

  // ── Fix Recommendations ─────────────────────────────────────────────────────
  fix_recommendations: [
    {
      root_cause:
        "₹1,599 minimum 30-session commitment is prohibitive for first-time and budget users",
      screen: "plan_selection",
      recommendation:
        "Add a free single-session trial (₹0 first visit) — lets users try before committing to any pack",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 9,
      affected_segment: "Budget-Conscious Worker, Mumbai Migrant Professional",
      expected_uplift:
        "Estimated 12-15% increase in completion rate by converting price-shocked drop-offs",
    },
    {
      root_cause:
        "Phone number gate blocks users from seeing gym inventory — value prop hidden behind registration",
      screen: "phone_number",
      recommendation:
        "Let users browse gyms before phone registration — move phone gate after gym_browse screen",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 8,
      affected_segment: "All segments, especially privacy-conscious Budget Workers",
      expected_uplift:
        "Estimated 6-8% increase in completion rate by letting users validate value before committing data",
    },
    {
      root_cause:
        "No entry-level pricing option for users who want to test the service",
      screen: "plan_selection",
      recommendation:
        "Introduce a 10-session starter pack at ₹499 (₹50/session) — lower commitment entry point",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 7,
      affected_segment: "Young Single Millennial, Married Family Person, Budget-Conscious Worker",
      expected_uplift:
        "Estimated 8-10% increase in completion rate from users willing to pay but not ₹1,599",
    },
    {
      root_cause:
        "Back-to-back permission requests (location + notifications) create permission fatigue",
      screen: "location_permission",
      recommendation:
        "Combine location + notification permissions into one step with clear value explanation for each",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 6,
      affected_segment: "Bangalore Migrant Professional, Young Women Professional",
      expected_uplift:
        "Estimated 3-4% increase by reducing permission-related drop-offs",
    },
    {
      root_cause:
        "Gym detail page lacks walkthrough content — users can't assess quality before commitment",
      screen: "gym_detail",
      recommendation:
        "Show gym walkthrough videos, equipment inventory, and real-time crowd data on detail page",
      estimated_impact: "medium",
      feasibility: "medium",
      impact_feasibility_score: 5,
      affected_segment: "Settled Professional 35+, Young Women Professional, Fitness Enthusiast",
      expected_uplift:
        "Estimated 2-4% increase from users who need visual proof of gym quality before paying",
    },
  ],

  // ── Expected Completion Rate ────────────────────────────────────────────────
  expected_completion_rate_pct: undefined as unknown as number,

  // ── Persona Details ─────────────────────────────────────────────────────────
  persona_details: [
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 1: Young Bangalore Native (4/5 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-001",
      demographics: {
        first_language: "Kannada",
        age: 24,
        occupation: "Software Developer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Junior frontend developer at a mid-size startup in Koramangala. Earns ₹55,000/month. Comfortable with apps and digital payments.",
      cultural_background:
        "Born and raised in Bangalore. Kannada-speaking family from Basavanagudi. Plays cricket on weekends at Cubbon Park.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 82,
      overall_monologue:
        "This is perfect for me. I know the gym near Koramangala 5th Block — I've walked past it many times. ₹83 per session for a premium pack means I get access to better equipment. I hate being locked into monthly gym memberships because I travel home to Mysore some weekends.",
      screen_monologues: [
        {
          screen_id: "onboarding_1",
          view_name: "Welcome",
          internal_monologue: "Pay per session gym? That's exactly what I was looking for. Monthly memberships waste money when I skip weekends.",
          reasoning: "Value proposition immediately resonates with personal pain point",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 8,
          time_seconds: 6,
        },
        {
          screen_id: "onboarding_2",
          view_name: "How It Works",
          internal_monologue: "Browse gyms, pick a session, pay — simple enough. Like Zomato for gyms.",
          reasoning: "Familiar UX pattern from food delivery apps",
          emotional_state: "comfortable",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 9,
          value_score: 8,
          time_seconds: 7,
        },
        {
          screen_id: "onboarding_3",
          view_name: "Benefits",
          internal_monologue: "No commitment, flexible schedule — ya this is built for people like me.",
          reasoning: "Benefits align perfectly with freelance-style work schedule",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 9,
          time_seconds: 5,
        },
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "Fine, they need my number for OTP. Standard. Hope they don't spam me.",
          reasoning: "Accepts phone registration as normal Indian app flow",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 10,
        },
        {
          screen_id: "otp_verification",
          view_name: "OTP Verification",
          internal_monologue: "OTP came in 3 seconds. Auto-filled. Good.",
          reasoning: "Smooth OTP flow builds confidence",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 9,
          value_score: 7,
          time_seconds: 8,
        },
        {
          screen_id: "create_profile",
          view_name: "Create Profile",
          internal_monologue: "Name, email, fitness goal — that's reasonable. Not too many fields.",
          reasoning: "Profile creation is lightweight",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 18,
        },
        {
          screen_id: "location_permission",
          view_name: "Location Permission",
          internal_monologue: "They need my location to show nearby gyms. Makes sense for this kind of app.",
          reasoning: "Location permission has clear utility for gym discovery",
          emotional_state: "accepting",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 4,
        },
        {
          screen_id: "notification_permission",
          view_name: "Notification Permission",
          internal_monologue: "Notifications for deals and session reminders? Sure, I can always turn them off.",
          reasoning: "Low-friction permission with easy reversal",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 3,
        },
        {
          screen_id: "gym_browse",
          view_name: "Browse Gyms",
          internal_monologue: "Oh nice, FitZone Koramangala is listed! That's the one near my office. 800 meters away. 4.3 stars. Let me check it out.",
          reasoning: "Recognized a gym from daily commute — instant trust boost",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 12,
        },
        {
          screen_id: "gym_detail",
          view_name: "Gym Detail",
          internal_monologue: "Decent equipment list, AC, open till 10 PM. Photos look like what I've seen from outside. Works for me.",
          reasoning: "Gym detail matches real-world observation",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 10,
        },
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599 (₹53/session), Premium at ₹2,499 (₹83/session), Elite at ₹3,999 (₹133/session). Premium gets me access to better equipment and peak hours. I'll go Premium — I can afford it.",
          reasoning: "Income supports Premium tier; values better equipment access",
          emotional_state: "deliberating",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 22,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499 payment via UPI. That's less than one fancy dinner in Koramangala. Done.",
          reasoning: "Price anchored against social spending — feels affordable",
          emotional_state: "resolved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-002",
      demographics: {
        first_language: "Kannada",
        age: 26,
        occupation: "Graphic Designer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Freelance graphic designer working from cafes in Indiranagar. Monthly income ₹45,000. Uses UPI for everything.",
      cultural_background:
        "Kannadiga from Bangalore. Lives with parents in Indiranagar. Active on Instagram fitness communities.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 88,
      overall_monologue:
        "I liked the concept. ₹53 per session at the Basic tier is fair for a gym near Indiranagar. I went Basic because I'm not sure how often I'll actually go. If I use at least 20 of the 30 sessions, it's still cheaper than my friend's monthly membership.",
      screen_monologues: [
        {
          screen_id: "onboarding_1",
          view_name: "Welcome",
          internal_monologue: "Pay per session — interesting. I hate paying monthly and going twice.",
          reasoning: "Resonates with irregular workout pattern",
          emotional_state: "curious",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 8, value_score: 7, time_seconds: 7,
        },
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599 is fair. I'll start there and upgrade if I like it.",
          reasoning: "Conservative entry — wants to validate before upgrading",
          emotional_state: "pragmatic",
          friction_points: ["Wish there was a smaller trial pack"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 25,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 via UPI. Let's see if this works out.",
          reasoning: "Acceptable risk for the price point",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-003",
      demographics: {
        first_language: "Kannada",
        age: 23,
        occupation: "Bank Clerk",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a nationalized bank branch in Whitefield. Earns ₹32,000/month. Regular cricket player.",
      cultural_background:
        "From a middle-class Kannadiga family in Mahadevapura. Fitness-aware but never had a gym membership.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 105,
      overall_monologue:
        "₹1,599 is a bit steep for me but the gym near Whitefield ITPL Road looked decent. I figured ₹53 per session is fair if I actually go regularly. The per-session model means I won't waste money on months I'm lazy.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 is ₹53 per session. That's like one chai and samosa at the office canteen. I'll do Basic.",
          reasoning: "Anchored price per session against daily spending",
          emotional_state: "calculating",
          friction_points: ["Would prefer a 15-session pack"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 6, value_score: 6, time_seconds: 28,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "Okay, paying now. Hope this gym is actually good.",
          reasoning: "Taking a calculated risk",
          emotional_state: "slightly nervous",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 16,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-004",
      demographics: {
        first_language: "Kannada",
        age: 28,
        occupation: "Sales Executive",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works in pharma sales covering South Bangalore territory. Earns ₹48,000/month. Drives a bike across the city daily.",
      cultural_background:
        "Bangalorean from JP Nagar. Played kabaddi in college. Wants to get back in shape.",
      outcome: "completed",
      key_selections: { plan: "Elite 30" },
      final_price_inr: 3999,
      total_time_seconds: 78,
      overall_monologue:
        "I went Elite because the gym near JP Nagar in the Elite tier has a swimming pool and sauna. ₹133 per session for a premium gym with all facilities — that's a steal compared to those ₹5,000/month premium gyms.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Elite at ₹3,999 gets me access to premium gyms with pool. That's what I want.",
          reasoning: "Prioritizes gym quality over price savings",
          emotional_state: "decisive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 18,
          selected_choice: "Elite 30",
        },
        {
          screen_id: "checkout_elite",
          view_name: "Checkout Elite",
          internal_monologue: "₹3,999 is worth it for premium gym access. Paying via UPI.",
          reasoning: "Clear value perception at Elite tier",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-005",
      demographics: {
        first_language: "Kannada",
        age: 25,
        occupation: "Retail Store Manager",
        district: "Bangalore Urban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Manages a clothing store in Rajajinagar. Earns ₹28,000/month. Long hours on feet but sedentary otherwise.",
      cultural_background:
        "Kannadiga from Rajajinagar. Watches IPL religiously. Wants to build muscle but finds gyms expensive.",
      outcome: "dropped_off_at_plan_selection",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 72,
      overall_monologue:
        "I loved the concept and the gym near Rajajinagar looked okay. But ₹1,599 for the cheapest pack? That's almost 6% of my salary. I was expecting something like ₹500 for 10 sessions. I'll keep using the free outdoor gym in Sankey Tank park.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 minimum? That's way more than I expected. I thought per-session meant I pay ₹50-100 each time I go. Not ₹1,599 upfront for 30 sessions. What if I only go 10 times?",
          reasoning: "Price exceeds budget allocation for fitness",
          emotional_state: "disappointed",
          friction_points: ["No smaller pack available", "₹1,599 is 6% of monthly salary"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 5, value_score: 3, time_seconds: 30,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 2: Young Mumbai Native (3/5 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-006",
      demographics: {
        first_language: "Marathi",
        age: 25,
        occupation: "Junior Accountant",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a CA firm in Andheri West. Earns ₹38,000/month. Takes the local train daily.",
      cultural_background:
        "Marathi-speaking, from Dadar. Grew up playing gully cricket. Wants to join a gym but finds monthly commitments wasteful.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 92,
      overall_monologue:
        "The gym near Andheri station is 700m from my office. ₹53 per session for Basic — I can go during lunch break. Better than paying ₹1,200/month for a gym I'd visit 8 times. This way I only pay for what I use.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 for 30 sessions. If I go 4 times a week that's about 2 months. Reasonable.",
          reasoning: "Calculated value based on expected usage",
          emotional_state: "analytical",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 20,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 via UPI. Less than what I spend on Zomato in a month. Done.",
          reasoning: "Favorable comparison to existing spending",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-007",
      demographics: {
        first_language: "Marathi",
        age: 27,
        occupation: "Digital Marketing Executive",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a digital agency in Bandra. Earns ₹52,000/month. Active on fitness Instagram.",
      cultural_background:
        "From a Marathi family in Bandra East. Runs on Carter Road on weekends. Has tried multiple fitness apps.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 75,
      overall_monologue:
        "Love this concept. There's a nice gym near Bandra Linking Road that I've been curious about. Premium pack gives me peak-hour access and the gym has good reviews. ₹83/session is a fair deal for Bandra gym prices.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499 — I want peak hour access since I go after work at 7 PM.",
          reasoning: "Peak-hour access is must-have for post-work schedule",
          emotional_state: "decisive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 15,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499 is less than my monthly Carter Road cafe budget. Easy decision.",
          reasoning: "Affordable relative to lifestyle spending",
          emotional_state: "happy",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-008",
      demographics: {
        first_language: "Hindi",
        age: 22,
        occupation: "BBA Student (Part-time Tutor)",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Final year BBA student, earns ₹12,000/month from tutoring. Stays in a shared flat in Goregaon.",
      cultural_background:
        "Hindi-Marathi bilingual, grew up in Mumbai. Price-sensitive but fitness-aware through YouTube.",
      outcome: "dropped_off_at_create_profile",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 38,
      overall_monologue:
        "The concept sounded good but after entering my phone number and OTP, the profile form asked for too much — email, fitness goals, weight, height. I just wanted to browse. I'll check Google Maps for gyms near Goregaon instead.",
      screen_monologues: [
        {
          screen_id: "create_profile",
          view_name: "Create Profile",
          internal_monologue: "Why do they need my email, weight, height, and fitness goals just to browse gyms? I haven't even decided if I want to use this app. Too many fields for someone who just wants to look around.",
          reasoning: "Profile form feels excessive for browsing intent",
          emotional_state: "annoyed",
          friction_points: ["Too many required fields", "Personal data collection before value delivery"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 6, value_score: 4, time_seconds: 25,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-009",
      demographics: {
        first_language: "Marathi",
        age: 29,
        occupation: "Bank Relationship Manager",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at HDFC Bank Malad branch. Earns ₹55,000/month. Gym-curious but irregular.",
      cultural_background:
        "Marathi from Malad West. Plays football on Sundays at Inorbit Mall ground.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 98,
      overall_monologue:
        "There's a gym near Malad station I've been eyeing. ₹53/session is reasonable for someone like me who goes 3-4 times a week in bursts and then skips for 2 weeks. At least I'm not wasting a monthly membership during my lazy weeks.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. I'll go 3-4 times a week when motivated. Even 20 sessions at ₹80 each isn't bad.",
          reasoning: "Realistic self-assessment of usage pattern",
          emotional_state: "pragmatic",
          friction_points: ["Unsure if sessions expire"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 5, value_score: 6, time_seconds: 28,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "Let's try this. ₹1,599 — not a big deal if it doesn't work out.",
          reasoning: "Acceptable risk at income level",
          emotional_state: "willing",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 6, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-010",
      demographics: {
        first_language: "Marathi",
        age: 24,
        occupation: "Pharmacy Assistant",
        district: "Mumbai City",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a medical store in Dadar. Earns ₹22,000/month. Long standing hours at work.",
      cultural_background:
        "From a traditional Marathi family in Parel. Interested in bodybuilding through Instagram reels.",
      outcome: "dropped_off_at_gym_browse",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 55,
      overall_monologue:
        "I went through the registration and profile. But when I saw the gym list near Dadar/Parel — the nearest decent one is 2.8 km away in Lower Parel. The ones near me are tiny neighborhood places with old equipment. Not worth the effort for ₹53/session when I can just do free workout videos at home.",
      screen_monologues: [
        {
          screen_id: "gym_browse",
          view_name: "Browse Gyms",
          internal_monologue: "The gyms near Dadar/Parel are small 500-sqft places. I want something with proper equipment and mirrors, not someone's garage converted into a gym. The one good gym is in Lower Parel — too far from my shop.",
          reasoning: "Available gyms don't meet quality expectations in user's locality",
          emotional_state: "disappointed",
          friction_points: ["No quality gyms nearby", "Gym quality gap between app branding and reality"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 7, value_score: 3, time_seconds: 18,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 3: Bangalore Migrant Professional (3/5 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-011",
      demographics: {
        first_language: "Telugu",
        age: 29,
        occupation: "Data Analyst",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at Manyata Tech Park. Earns ₹65,000/month. Moved from Hyderabad 2 years ago.",
      cultural_background:
        "Telugu-speaking, from Secunderabad. Misses his old gym in Ameerpet. Adjusting to Bangalore's gym culture.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 110,
      overall_monologue:
        "I was cautious but the gym near Manyata Tech Park in Thanisandra looked okay. ₹53/session is cheaper than my old Gold's Gym membership in Hyderabad. I went Basic to test it out — if the gym is good, I'll upgrade to Premium next month.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 for 30 sessions. Not bad. Let me start with Basic and see the gym quality first.",
          reasoning: "Conservative approach — test before committing more",
          emotional_state: "cautious",
          friction_points: ["Wish I could try one session first"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 6, value_score: 6, time_seconds: 30,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 — let's give it a shot. If it's bad, lesson learned.",
          reasoning: "Willing to take a small financial risk",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 16,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-012",
      demographics: {
        first_language: "Tamil",
        age: 32,
        occupation: "Product Manager",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Married",
      },
      professional_background:
        "Senior PM at a fintech company in HSR Layout. Earns ₹1,50,000/month. Moved from Chennai 4 years ago.",
      cultural_background:
        "Tamil Brahmin from Chennai. Health-conscious after a recent health scare. Wife encourages exercise.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 95,
      overall_monologue:
        "Premium tier gives me access to the gym near HSR Layout BDA Complex — I drive past it daily. ₹83/session is nothing compared to my gym back in Chennai which was ₹3,500/month. Per-session model is smarter for my unpredictable PM schedule.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499 — I want peak hours and better equipment. My schedule is unpredictable so per-session is perfect.",
          reasoning: "Premium aligns with lifestyle and schedule needs",
          emotional_state: "decided",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 18,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499 — my wife will approve. She's been asking me to exercise after my cholesterol report.",
          reasoning: "Health motivation + spousal support",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-013",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "HR Coordinator",
        district: "Bangalore Urban",
        zone: "North",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at an IT services company in Manyata Tech Park. Earns ₹40,000/month. From Lucknow, 1 year in Bangalore.",
      cultural_background:
        "Hindi-speaking UP background. Lives in a PG in Hebbal. Misses home food and routines. Looking for community activities.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 108,
      overall_monologue:
        "I've been wanting to join a gym since I moved to Bangalore but didn't want to commit monthly in case I relocate. This per-session model is perfect for someone on a transferable job. The gym near Hebbal Outer Ring Road has a women's section — that was the deciding factor.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. That's affordable even on my ₹40K salary. If I go 3 times a week, 30 sessions last about 2.5 months.",
          reasoning: "Good value for flexible usage pattern",
          emotional_state: "positive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 24,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 — I'll pay via PhonePe. Time to stop procrastinating on fitness.",
          reasoning: "Self-motivation overcoming hesitation",
          emotional_state: "determined",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-014",
      demographics: {
        first_language: "Malayalam",
        age: 35,
        occupation: "Technical Lead",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Married",
      },
      professional_background:
        "Works at a product company in Whitefield. Earns ₹1,80,000/month. From Kochi, 7 years in Bangalore.",
      cultural_background:
        "Malayali Christian from Ernakulam. Settled in Bangalore with family. Wife and kid in Whitefield.",
      outcome: "dropped_off_at_location_permission",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 42,
      overall_monologue:
        "I was going along fine until it asked for location permission right after I just gave them my phone number and profile. Too many permissions in a row. I already have a gym in my apartment complex — this would need to be really compelling for me to share my location with yet another app. I'll think about it.",
      screen_monologues: [
        {
          screen_id: "location_permission",
          view_name: "Location Permission",
          internal_monologue: "First phone number, then profile, now location? How many permissions does this app need? I already have a gym in my apartment. If I'm going to switch, I need to know it's worth it before giving away my location data.",
          reasoning: "Permission fatigue — too many data collection steps in succession",
          emotional_state: "frustrated",
          friction_points: ["Third permission request in sequence", "No value demonstrated yet"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 6, value_score: 4, time_seconds: 8,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-015",
      demographics: {
        first_language: "Hindi",
        age: 28,
        occupation: "HR Executive",
        district: "Bangalore Urban",
        zone: "North",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at an IT company in Yelahanka. Earns ₹42,000/month. From Jaipur, 2 years in Bangalore.",
      cultural_background:
        "Rajasthani Hindi speaker. Lives in a flat in Yelahanka New Town. Missing the active lifestyle she had in Jaipur.",
      outcome: "dropped_off_at_gym_browse",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 58,
      overall_monologue:
        "I went through the whole registration process and now I see the gym list. The nearest one is 4.2 km away in Sahakara Nagar. That's a 20-minute auto ride — ₹80 each way. So my 'per-session' cost is actually ₹53 + ₹160 transport = ₹213. For that I might as well join the small gym in my apartment complex. This app is useless for Yelahanka.",
      screen_monologues: [
        {
          screen_id: "gym_browse",
          view_name: "Browse Gyms",
          internal_monologue: "4.2 km to the nearest gym? In Yelahanka? That's an auto ride each way. My effective cost per session becomes ₹213. Not worth it.",
          reasoning: "Total cost including transport defeats value proposition",
          emotional_state: "disappointed",
          friction_points: ["No gyms within walking distance", "Transport cost not factored into value prop"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 7, value_score: 2, time_seconds: 18,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 4: Mumbai Migrant Professional (2/5 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-016",
      demographics: {
        first_language: "Hindi",
        age: 30,
        occupation: "UI/UX Designer",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a startup in Powai. Earns ₹75,000/month. Moved from Delhi 1 year ago.",
      cultural_background:
        "Hindi-speaking Delhiite. Misses his Cult Fit membership. Finds Mumbai gyms expensive.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 100,
      overall_monologue:
        "I've been looking for a gym near Powai since I moved. The gym on Hiranandani Powai road looks decent — 4.2 stars. Premium pack at ₹83/session is better than the ₹4,000/month gyms in Powai. Per-session is smart because I travel to Delhi every other weekend.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499. Reasonable for Powai prices. I'll get peak-hour access for after-work sessions.",
          reasoning: "Premium pricing competitive vs local alternatives",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 22,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499 via GPay. Done. Time to check out this gym tomorrow.",
          reasoning: "Confident purchase decision",
          emotional_state: "optimistic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-017",
      demographics: {
        first_language: "Bengali",
        age: 34,
        occupation: "Backend Developer",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Married",
      },
      professional_background:
        "Works remotely for a Pune-based company. Lives in Thane. Earns ₹90,000/month. From Kolkata.",
      cultural_background:
        "Bengali, from Kolkata. Wife also works in IT. Both sedentary lifestyles.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 112,
      overall_monologue:
        "There's a gym near Thane station that I've walked past. Basic pack at ₹53/session — not bad for a trial. My wife might also want to try this. I went Basic because I want to validate the gym quality first.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. Let me test this before committing more. If it's good, my wife might join too.",
          reasoning: "Cautious entry — validating for potential family usage",
          emotional_state: "cautious",
          friction_points: ["Do sessions expire?"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 5, value_score: 6, time_seconds: 32,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599. Small amount. If it works, we both benefit.",
          reasoning: "Low-risk investment for potential family benefit",
          emotional_state: "pragmatic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 15,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-018",
      demographics: {
        first_language: "Hindi",
        age: 31,
        occupation: "Sales Manager",
        district: "Mumbai Suburban",
        zone: "Central",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works in pharmaceutical sales. Covers central Mumbai territory. Earns ₹60,000/month. From Patna.",
      cultural_background:
        "Bihari, from Patna. Lives in a shared flat in Ghatkopar. Vegetarian. Plays badminton occasionally.",
      outcome: "dropped_off_at_create_profile",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 35,
      overall_monologue:
        "After giving my phone number and OTP, the profile form wanted email, fitness goals, height, weight, and activity level. That's a lot of personal info for an app I'm just checking out. Back in Patna I'd just walk into a gym and ask the rate. Why does this need so much data?",
      screen_monologues: [
        {
          screen_id: "create_profile",
          view_name: "Create Profile",
          internal_monologue: "Email, height, weight, fitness goals, activity level? I just want to see if there's a gym near Ghatkopar. This feels like a health insurance form, not a gym app.",
          reasoning: "Data collection disproportionate to perceived value at this stage",
          emotional_state: "overwhelmed",
          friction_points: ["Too many profile fields", "Personal health data requested too early"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 5, value_score: 4, time_seconds: 25,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-019",
      demographics: {
        first_language: "Hindi",
        age: 36,
        occupation: "Accountant",
        district: "Bangalore Urban",
        zone: "North",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Married",
      },
      professional_background:
        "Works at a manufacturing company in Peenya. Earns ₹55,000/month. From Indore, 5 years in Bangalore.",
      cultural_background:
        "MP Hindi speaker. Lives in Hebbal with wife and 2 kids. Conservative with finances.",
      outcome: "dropped_off_at_gym_browse",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 60,
      overall_monologue:
        "Only 3 gyms showing in Hebbal area and two of them have 3.2 star ratings. The one decent-looking gym is near Manyata Tech Park — opposite direction from my home. I'd need a specific gym near Kempapura main road. Maybe this app hasn't launched properly in North Bangalore yet. I'll check back in a few months.",
      screen_monologues: [
        {
          screen_id: "gym_browse",
          view_name: "Browse Gyms",
          internal_monologue: "Only 3 gyms in Hebbal? Two rated 3.2 stars. The app clearly doesn't have good coverage in this area yet.",
          reasoning: "Insufficient gym supply in user's locality",
          emotional_state: "unimpressed",
          friction_points: ["Low gym count in area", "Poor ratings on available gyms"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 7, value_score: 3, time_seconds: 20,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-020",
      demographics: {
        first_language: "Hindi",
        age: 32,
        occupation: "Logistics Coordinator",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a logistics company in Andheri East. Earns ₹45,000/month. Moved from Lucknow 8 months ago.",
      cultural_background:
        "UP Hindi speaker. New to Mumbai. Still figuring out the city. Gets 20+ spam calls daily.",
      outcome: "dropped_off_at_phone_number",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 28,
      overall_monologue:
        "I'm new to Mumbai and was hoping to see if there's a decent gym near my office in Andheri East. But they want my phone number before showing me anything? I'm already getting 20 spam calls a day on my new Mumbai number. Let me check Google Maps instead.",
      screen_monologues: [
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "Why do they need my phone number before I can even see which gyms are near me? I just want to check if there's anything decent near Andheri East. Every app asks for OTP and then the spam starts.",
          reasoning: "Recent city migrant overwhelmed with spam — phone gate is the last straw",
          emotional_state: "annoyed",
          friction_points: ["Phone required before browsing", "Spam concern from past experience"],
          decision_outcome: "DROP_OFF",
          trust_score: 3, clarity_score: 7, value_score: 5, time_seconds: 15,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 5: Fitness Enthusiast (5/5 complete — 100%)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-021",
      demographics: {
        first_language: "Hindi",
        age: 28,
        occupation: "Personal Fitness Trainer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Freelance personal trainer in Koramangala/Indiranagar. Earns ₹50,000/month. Certified ACE trainer.",
      cultural_background:
        "From Dehradun, 5 years in Bangalore. Lives and breathes fitness. Active on YouTube fitness community.",
      outcome: "completed",
      key_selections: { plan: "Elite 30" },
      final_price_inr: 3999,
      total_time_seconds: 65,
      overall_monologue:
        "This is brilliant. As a trainer, I work at different gyms across South Bangalore. Elite pack gives me access to premium gyms — I can train clients at different locations. ₹133/session for premium gym access is a steal. I'm probably the ideal user for this app.",
      screen_monologues: [
        {
          screen_id: "onboarding_1",
          view_name: "Welcome",
          internal_monologue: "Pay per session gym access — finally! This is exactly what I've been wanting. I work at 3 different gyms across the week.",
          reasoning: "Product perfectly matches professional need",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 4,
        },
        {
          screen_id: "onboarding_2",
          view_name: "How It Works",
          internal_monologue: "Browse, book, go. Clean. I already know most gyms in Koramangala.",
          reasoning: "Simple UX for an already-educated user",
          emotional_state: "approving",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 5,
        },
        {
          screen_id: "onboarding_3",
          view_name: "Benefits",
          internal_monologue: "No monthly lock-in, flexible timing — speaks my language.",
          reasoning: "Benefits match professional lifestyle perfectly",
          emotional_state: "enthusiastic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 4,
        },
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "Standard registration. No issues.",
          reasoning: "Trusts the app based on strong onboarding",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 8,
        },
        {
          screen_id: "otp_verification",
          view_name: "OTP Verification",
          internal_monologue: "Quick OTP. Good.",
          reasoning: "Smooth flow",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 9, value_score: 8, time_seconds: 6,
        },
        {
          screen_id: "create_profile",
          view_name: "Create Profile",
          internal_monologue: "Fitness goal: muscle building. Activity level: very active. I know exactly what I want.",
          reasoning: "Easy profile completion for fitness-literate user",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 15,
        },
        {
          screen_id: "location_permission",
          view_name: "Location Permission",
          internal_monologue: "Location for nearby gyms — obvious. Allowed.",
          reasoning: "Clear utility for a location-based service",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 3,
        },
        {
          screen_id: "notification_permission",
          view_name: "Notification Permission",
          internal_monologue: "Notifications for new gym listings? Yes please.",
          reasoning: "Notifications have direct professional value",
          emotional_state: "positive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 3,
        },
        {
          screen_id: "gym_browse",
          view_name: "Browse Gyms",
          internal_monologue: "I see FitZone, Iron Paradise, and Muscle Factory — I know all these. FitZone has the best squat racks. Let me check Iron Paradise too.",
          reasoning: "Pre-existing knowledge of local gyms validates the platform",
          emotional_state: "excited",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 10,
        },
        {
          screen_id: "gym_detail",
          view_name: "Gym Detail",
          internal_monologue: "Iron Paradise — 4.5 stars, full equipment list, photos match what I remember. Good. They have a new cable crossover machine too.",
          reasoning: "Gym detail confirms real-world knowledge — high trust",
          emotional_state: "impressed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Elite at ₹3,999 for 30 sessions = ₹133/session at premium gyms. That's a no-brainer. I'd pay ₹200+ per session at these gyms if I walked in.",
          reasoning: "Expert-level price comparison — knows walk-in rates",
          emotional_state: "decisive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 8, value_score: 9, time_seconds: 12,
          selected_choice: "Elite 30",
        },
        {
          screen_id: "checkout_elite",
          view_name: "Checkout Elite",
          internal_monologue: "₹3,999 via UPI. This is going to change how I train clients. Done.",
          reasoning: "Professional investment with clear ROI",
          emotional_state: "thrilled",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 9, clarity_score: 9, value_score: 9, time_seconds: 8,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-022",
      demographics: {
        first_language: "Hindi",
        age: 26,
        occupation: "BPO Associate",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works night shifts at a BPO in Malad. Earns ₹30,000/month. Gym is his stress relief.",
      cultural_background:
        "From Varanasi, 3 years in Mumbai. Serious about bodybuilding. Follows Indian bodybuilders on Instagram.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 85,
      overall_monologue:
        "I work night shifts so I need a gym that's open at odd hours. The gym near Malad station opens at 5 AM — perfect for my post-shift workout. ₹53/session for Basic is cheaper than my current ₹1,200/month membership and more flexible.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599 for 30 sessions. My current gym is ₹1,200/month and I go about 20 times. This works out cheaper if I use all 30.",
          reasoning: "Direct cost comparison with current gym — favorable",
          emotional_state: "calculating",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 18,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599. Switching from my monthly gym to this. More flexibility for my shift schedule.",
          reasoning: "Better fit for rotating shift schedule",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-023",
      demographics: {
        first_language: "Kannada",
        age: 31,
        occupation: "Crossfit Coach",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Runs crossfit classes in HSR Layout. Earns ₹60,000/month. Former national-level swimmer.",
      cultural_background:
        "Kannadiga from Mysore. Settled in Bangalore for 8 years. Active in Bangalore fitness community.",
      outcome: "completed",
      key_selections: { plan: "Elite 30" },
      final_price_inr: 3999,
      total_time_seconds: 70,
      overall_monologue:
        "Elite tier gives me access to gyms with proper Olympic lifting platforms and swimming pools. I need to cross-train at different facilities. ₹133/session for premium access across multiple gyms? My clients will love hearing about this.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Elite — I need premium equipment access. Olympic bars, plyometric boxes, pull-up rigs. Only Elite tier gyms have these.",
          reasoning: "Professional requirement for specialized equipment",
          emotional_state: "focused",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 9, time_seconds: 15,
          selected_choice: "Elite 30",
        },
        {
          screen_id: "checkout_elite",
          view_name: "Checkout Elite",
          internal_monologue: "₹3,999 is a business expense basically. Paying now.",
          reasoning: "Professional investment",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 9, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-024",
      demographics: {
        first_language: "Tamil",
        age: 33,
        occupation: "Software Architect",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Married",
      },
      professional_background:
        "Works at a FAANG company in Bellandur. Earns ₹2,50,000/month. Runs marathons.",
      cultural_background:
        "Tamil from Chennai. 10 years in Bangalore. Active in Bangalore Runners Club.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 72,
      overall_monologue:
        "Premium gives me peak-hour access at the gym near Bellandur — I go at 6 AM before work. The per-session model is great because I travel for races 6-8 weekends a year. No more wasting monthly gym fees when I'm at a marathon in Goa.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499. I want the 6 AM peak-hour access. 30 sessions will last me 2-3 months with my travel schedule.",
          reasoning: "Premium aligns with early-morning workout routine",
          emotional_state: "satisfied",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 7, value_score: 8, time_seconds: 16,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499. Less than one race entry fee. Easy.",
          reasoning: "Anchored against higher hobby spending",
          emotional_state: "happy",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-025",
      demographics: {
        first_language: "Marathi",
        age: 42,
        occupation: "Gym Owner",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Married",
      },
      professional_background:
        "Owns a small gym in Borivali. Earns ₹80,000/month. Competing bodybuilder in his 30s.",
      cultural_background:
        "Marathi from Mumbai. Fitness is his life. Checking out the app from a competitive/business angle too.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 80,
      overall_monologue:
        "Interesting app. I want to try gyms in other parts of Mumbai to see how they operate — competitive research plus I need equipment variety for my own training. Premium at ₹83/session gets me access to gyms I'd never join monthly. Smart business model.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499 — I want to try different gyms across Mumbai. Business research meets personal training. Win-win.",
          reasoning: "Dual professional and personal motivation",
          emotional_state: "strategic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 14,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499 to visit competitors' gyms. This is tax-deductible for me.",
          reasoning: "Business expense rationalization",
          emotional_state: "amused",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 6: Young Women Professional (3/5 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-026",
      demographics: {
        first_language: "Hindi",
        age: 25,
        occupation: "Content Writer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a media company in Koramangala. Earns ₹35,000/month. Into yoga and light weights.",
      cultural_background:
        "From Delhi, 2 years in Bangalore. Active on wellness Instagram. Health-conscious.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 95,
      overall_monologue:
        "The gym near Koramangala 4th Block has a women's section and group fitness classes. ₹53/session for Basic is fair. I mainly want the yoga and light weights area. Per-session works for me because I go to yoga studios some weeks and gym other weeks.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. I'll use it for gym days and keep my yoga studio membership separate.",
          reasoning: "Complements existing fitness routine",
          emotional_state: "positive",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 22,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 — about 4 fancy coffees in Koramangala. Let me try this.",
          reasoning: "Lifestyle spending anchor makes price palatable",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-027",
      demographics: {
        first_language: "Telugu",
        age: 27,
        occupation: "HR Manager",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a consulting firm in BKC. Earns ₹65,000/month. From Hyderabad.",
      cultural_background:
        "Telugu-speaking, from Hyderabad. 3 years in Mumbai. Safety-conscious about new environments.",
      outcome: "completed",
      key_selections: { plan: "Premium 30" },
      final_price_inr: 2499,
      total_time_seconds: 105,
      overall_monologue:
        "I chose Premium because it includes peak-hour access — I go at 7 PM after work in BKC and I need a gym that's well-lit, clean, and has other women working out at that time. The gym detail page could have shown more about safety features but the reviews mentioned it's women-friendly.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium for peak hours. I need to go when it's busy so I'm not alone in the gym. ₹83/session is fine.",
          reasoning: "Peak-hour access = safety through crowd presence",
          emotional_state: "calculated",
          friction_points: ["Wish I could see women-only timing info"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 6, value_score: 7, time_seconds: 26,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499. If this gym is good, it saves me from the ₹5,000/month BKC gyms.",
          reasoning: "Significant savings vs local alternatives",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-028",
      demographics: {
        first_language: "Kannada",
        age: 24,
        occupation: "UI Designer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Enthusiast",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a design studio in Indiranagar. Earns ₹42,000/month. Active in Bangalore cycling community.",
      cultural_background:
        "Bangalorean. Lives with parents in Jayanagar. Cycles to work. Health-conscious.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 82,
      overall_monologue:
        "I cycle to work and want to add weight training. The gym near Jayanagar 4th Block has a small but clean weight section. ₹53/session for Basic — I'll go 3 times a week for upper body work. This complements my cycling perfectly.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. I just need access to dumbbells and a bench. Don't need Premium.",
          reasoning: "Minimal requirements match lowest tier",
          emotional_state: "pragmatic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 18,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 via UPI. Time to build some arm strength for uphill cycling.",
          reasoning: "Fitness goal-oriented purchase",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-029",
      demographics: {
        first_language: "Marathi",
        age: 25,
        occupation: "Marketing Executive",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a fashion brand in Bandra West. Earns ₹48,000/month. From a Marathi family in Pune.",
      cultural_background:
        "Maharashtrian from Pune. 2 years in Mumbai. Safety-conscious, prefers women-friendly spaces.",
      outcome: "dropped_off_at_gym_detail",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 62,
      overall_monologue:
        "I clicked on the gym near Bandra station. The photos look okay but there's no information about women's batches, trainer qualifications, or peak hours. As a woman, I need to know if this place is safe and comfortable at 7 PM after work. I'm not walking into an unknown gym based on 3 photos and a 4.1 rating.",
      screen_monologues: [
        {
          screen_id: "gym_detail",
          view_name: "Gym Detail",
          internal_monologue: "No women's section info, no trainer details, no safety info. As a woman going alone to a new gym at 7 PM, I need more reassurance than 3 photos and a star rating. Hard pass.",
          reasoning: "Insufficient safety/comfort information for solo female user",
          emotional_state: "cautious",
          friction_points: ["No women's batch timing", "No trainer credentials", "No safety/crowd info"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 5, value_score: 5, time_seconds: 18,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-030",
      demographics: {
        first_language: "Hindi",
        age: 23,
        occupation: "Analyst",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Female",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a consulting firm in Whitefield. Earns ₹50,000/month. From Noida.",
      cultural_background:
        "North Indian. Lives in a PG in Marathahalli. New to Bangalore. Privacy-conscious.",
      outcome: "dropped_off_at_location_permission",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 40,
      overall_monologue:
        "After phone number, OTP, and profile — now they want my location? I already gave them so much data. I live alone in a PG in Marathahalli and I'm careful about which apps know my location. Let me think about this and maybe come back later.",
      screen_monologues: [
        {
          screen_id: "location_permission",
          view_name: "Location Permission",
          internal_monologue: "I've already given phone number and personal details. Now location too? As a woman living alone in a new city, I'm careful about who knows where I am. This is too many permissions for a gym app.",
          reasoning: "Privacy concern amplified by gender and solo-living situation",
          emotional_state: "uncomfortable",
          friction_points: ["Too many sequential permissions", "Location sharing concern as solo woman"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 6, value_score: 5, time_seconds: 8,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 7: Budget-Conscious Worker (1/5 complete — 20%)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-031",
      demographics: {
        first_language: "Kannada",
        age: 25,
        occupation: "Auto-Rickshaw Driver",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Skeptic",
        marital_status: "Married",
      },
      professional_background:
        "Drives an auto-rickshaw in Koramangala/BTM Layout area. Earns ₹20,000/month on good months.",
      cultural_background:
        "Kannadiga from a village near Mandya. Strong build from physical work. Curious about gym culture through passengers.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 130,
      overall_monologue:
        "₹1,599 is a lot for me but a passenger once told me about this app. The gym near BTM Layout 2nd Stage is walking distance from my auto stand. ₹53 per session — I'll try to go every day and use all 30 sessions in a month. If I do that, it's cheaper than the ₹2,000/month gym my friend goes to. My wife said okay as long as I actually go.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 — that's 8% of my income. But if I go every day for 30 days, it's only ₹53 per session. I need to be disciplined about this. Basic is the only option I can afford.",
          reasoning: "High-commitment mental model — plans to maximize sessions to justify cost",
          emotional_state: "determined but nervous",
          friction_points: ["₹1,599 is significant portion of income"],
          decision_outcome: "CONTINUE",
          trust_score: 5, clarity_score: 5, value_score: 5, time_seconds: 40,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "I'm doing this. ₹1,599 via PhonePe. I told my wife and she said I better go every day for this price.",
          reasoning: "Spousal accountability as motivation",
          emotional_state: "anxious but committed",
          friction_points: ["Large expense relative to income"],
          decision_outcome: "CONTINUE",
          trust_score: 5, clarity_score: 6, value_score: 5, time_seconds: 22,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-032",
      demographics: {
        first_language: "Kannada",
        age: 23,
        occupation: "Shop Assistant",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Skeptic",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a clothing shop in Jayanagar. Earns ₹18,000/month. Lives in a shared room.",
      cultural_background:
        "Kannadiga from Tumkur. Moved to Bangalore for work. Watches fitness YouTube but never been to a gym.",
      outcome: "dropped_off_at_plan_selection",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 68,
      overall_monologue:
        "₹1,599 for 30 sessions? That's more than my weekly grocery budget. I earn ₹18,000 a month and I was hoping this would be cheaper than a regular gym. My friend said 'pay per session' so I thought maybe ₹50-100 per visit, walk in when I want. But ₹1,599 upfront? I'll just continue doing push-ups at the park near Jayanagar 4th Block.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 for the cheapest pack? That's almost 9% of my salary. I was expecting ₹50-100 per visit, not ₹1,599 upfront. This is for rich people.",
          reasoning: "Minimum commitment far exceeds budget allocation for fitness",
          emotional_state: "frustrated",
          friction_points: ["₹1,599 is 9% of monthly income", "No pay-per-visit option"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 5, value_score: 2, time_seconds: 30,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-033",
      demographics: {
        first_language: "Kannada",
        age: 29,
        occupation: "Electrician",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Skeptic",
        marital_status: "Married",
      },
      professional_background:
        "Self-employed electrician in Bommanahalli area. Earns ₹22,000-25,000/month depending on jobs.",
      cultural_background:
        "Kannadiga from Hassan. 6 years in Bangalore. Strong from physical work but wants structured exercise.",
      outcome: "dropped_off_at_phone_number",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 25,
      overall_monologue:
        "Why does a gym app need my phone number before I can even see which gyms are there? Someone at work said there's a gym near Bommanahalli for cheap. But they want my number first? Last time I gave my number to an app, I got calls from insurance agents for 3 months.",
      screen_monologues: [
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "Phone number? No. Last time I registered on some app, I got insurance calls for 3 months. Just show me the gyms and prices first.",
          reasoning: "Past negative experience with data sharing — won't provide phone before seeing value",
          emotional_state: "suspicious",
          friction_points: ["Phone required before browsing", "Past spam experience"],
          decision_outcome: "DROP_OFF",
          trust_score: 2, clarity_score: 7, value_score: 4, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-034",
      demographics: {
        first_language: "Hindi",
        age: 22,
        occupation: "Construction Helper",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Skeptic",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works on construction sites near Whitefield. Earns ₹15,000/month. Limited smartphone experience.",
      cultural_background:
        "From Bihar. Migrant worker in Bangalore for 2 years. Shares a phone sometimes. Limited digital literacy.",
      outcome: "dropped_off_at_phone_number",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 22,
      overall_monologue:
        "I don't give my number to apps. My friend showed me this app and it looked nice but I only have one phone and one number. If they start sending SMS and calls, I can't block them easily. I'll ask my friend to show me the gyms on his phone first.",
      screen_monologues: [
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "They want my number. I don't trust apps with my number. My friend showed this to me — let him check what gyms are there and tell me.",
          reasoning: "Low digital trust — single phone number is precious resource",
          emotional_state: "wary",
          friction_points: ["Phone number is only communication lifeline", "Low app trust"],
          decision_outcome: "DROP_OFF",
          trust_score: 2, clarity_score: 7, value_score: 3, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-035",
      demographics: {
        first_language: "Tamil",
        age: 27,
        occupation: "Security Guard",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Skeptic",
        marital_status: "Married",
      },
      professional_background:
        "Security guard at a tech park in Marathahalli. Earns ₹16,000/month. 12-hour shifts.",
      cultural_background:
        "Tamil from Vellore. 4 years in Bangalore. Physical job but wants gym for upper body development.",
      outcome: "dropped_off_at_plan_selection",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 72,
      overall_monologue:
        "I made it through all the registration steps. The gym near Marathahalli junction looked decent. But ₹1,599 for 30 sessions? I send ₹8,000 home every month. After rent, food, and family remittance, I have maybe ₹2,000 for everything else. ₹1,599 is almost all my discretionary spending. Not possible.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599... After rent, food, and money to family, I have ₹2,000 left. This would eat almost all of it. I want to but I simply can't afford it.",
          reasoning: "After essential expenses and family remittance, ₹1,599 exceeds entire discretionary budget",
          emotional_state: "sad",
          friction_points: ["Price exceeds discretionary budget", "No smaller affordable pack"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 6, value_score: 2, time_seconds: 25,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 8: Settled Professional 35+ (3/5 complete — 60%)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-036",
      demographics: {
        first_language: "Hindi",
        age: 38,
        occupation: "Engineering Manager",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Engineering Manager at a SaaS company in HSR Layout. Earns ₹2,20,000/month. From Patna originally.",
      cultural_background:
        "North Indian settled in Bangalore 12 years. Two kids. Health-conscious after turning 35. Wife is a doctor.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 90,
      overall_monologue:
        "Interesting concept. I have a gym in my apartment but it's overcrowded at 6 AM when I like to go. This gives me an alternative. Basic pack to try — if it's good, I'll upgrade. ₹1,599 is negligible for me. The gym near HSR has good reviews.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599 to try. If the gym is better than my apartment one, I'll upgrade to Premium or Elite.",
          reasoning: "Low-risk trial at income level — testing the concept",
          emotional_state: "curious",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 20,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 to test. Cheaper than my wife's one facial appointment.",
          reasoning: "Trivial amount at income level",
          emotional_state: "amused",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-037",
      demographics: {
        first_language: "Telugu",
        age: 40,
        occupation: "General Manager",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "GM at a manufacturing company in Andheri. Earns ₹1,80,000/month. From Vizag.",
      cultural_background:
        "Telugu from Andhra. 15 years in Mumbai. Two kids in school. Wife homemaker. Sedentary lifestyle.",
      outcome: "completed",
      key_selections: { plan: "Elite 30" },
      final_price_inr: 3999,
      total_time_seconds: 85,
      overall_monologue:
        "My doctor said I need to exercise after my last checkup. Elite tier gets me access to a premium gym in Andheri with a swimming pool — I used to swim in college. ₹133/session is nothing compared to the ₹8,000/month premium gym memberships in Andheri. My wife approved.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Elite for the pool. Doctor's orders. ₹133/session at premium gyms — that's cheaper than ₹8,000/month memberships I've been avoiding.",
          reasoning: "Health mandate + clear price advantage at Elite tier",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 8, time_seconds: 18,
          selected_choice: "Elite 30",
        },
        {
          screen_id: "checkout_elite",
          view_name: "Checkout Elite",
          internal_monologue: "₹3,999 for health. My family depends on me being healthy. Easy decision.",
          reasoning: "Health investment for family responsibility",
          emotional_state: "resolved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8, clarity_score: 8, value_score: 8, time_seconds: 10,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-038",
      demographics: {
        first_language: "Hindi",
        age: 35,
        occupation: "Government Clerk",
        district: "Mumbai Suburban",
        zone: "Central",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Works at a government office in Thane. Earns ₹42,000/month. Stable but modest income.",
      cultural_background:
        "Hindi-speaking from MP. 10 years in Mumbai. Conservative with spending. Wife teaches at a school.",
      outcome: "dropped_off_at_plan_selection",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 78,
      overall_monologue:
        "I was interested in the concept — pay only when you go. But ₹1,599 for the cheapest pack? My gym near Thane station charges ₹700/month. Yes it's basic, but I know the trainer and I go 4 times a week. This per-session thing works out to ₹53 per session but I need 30 sessions upfront. I'll stick with my current gym.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 minimum. My current gym is ₹700/month. This is more than double. The per-session concept is nice but the minimum pack size is too big for me to try.",
          reasoning: "Existing cheaper alternative — no compelling reason to switch",
          emotional_state: "skeptical",
          friction_points: ["More expensive than current gym", "30-session minimum too large"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 4, value_score: 3, time_seconds: 30,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-039",
      demographics: {
        first_language: "Kannada",
        age: 38,
        occupation: "Operations Manager",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Works at a logistics company in Whitefield. Earns ₹95,000/month. Knee issues from old cricket injury.",
      cultural_background:
        "Kannadiga from Hubli. 12 years in Bangalore. Family-oriented. Wife and two kids.",
      outcome: "dropped_off_at_gym_detail",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue:
        "The gym on ITPL Road looks decent but ₹53/session for this? I can see from the photos it's not a premium gym — no swimming pool, no sauna, basic equipment. At my age I need proper machines for my knee rehab exercises. The trainer shown is some 22-year-old kid. I need a physiotherapy-trained trainer.",
      screen_monologues: [
        {
          screen_id: "gym_detail",
          view_name: "Gym Detail",
          internal_monologue: "Basic equipment, young trainer, no specialized rehab machines. At 38 with a bad knee, I need more than dumbbells and a treadmill. This isn't for someone with specific health needs.",
          reasoning: "Gym facilities insufficient for age-specific and medical requirements",
          emotional_state: "dismissive",
          friction_points: ["No specialized equipment for rehab", "Trainer lacks medical/physio credentials"],
          decision_outcome: "DROP_OFF",
          trust_score: 4, clarity_score: 6, value_score: 3, time_seconds: 18,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-040",
      demographics: {
        first_language: "Tamil",
        age: 42,
        occupation: "Senior Architect",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Senior software architect at a product company in Koramangala. Earns ₹3,00,000/month. From Chennai.",
      cultural_background:
        "Tamil Brahmin. Vegetarian. Does morning walks. Wife does yoga. Looking for variety in fitness routine.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 88,
      overall_monologue:
        "I have a gym membership at my apartment but it gets boring. Basic pack at ₹1,599 gives me a change of scenery — I'll try different gyms on different days. The price is irrelevant for me; I just want variety without multiple monthly memberships.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. I don't need Premium or Elite — I have my apartment gym for regular days. This is for variety days.",
          reasoning: "Supplementary usage — variety-seeking rather than primary gym",
          emotional_state: "relaxed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 16,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 for gym variety. Less than my daily coffee spend.",
          reasoning: "Trivial expense for discretionary use case",
          emotional_state: "casual",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 10,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 9: Young Single Millennial (4/5 complete — 80%)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-041",
      demographics: {
        first_language: "Hindi",
        age: 26,
        occupation: "Content Writer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Freelance content writer. Earns ₹35,000/month. Works from cafes in HSR Layout.",
      cultural_background:
        "From Jaipur, 3 years in Bangalore. Social, price-sensitive. Active on dating apps.",
      outcome: "dropped_off_at_plan_selection",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 70,
      overall_monologue:
        "I like the idea and the gym near HSR Layout BDA Complex looks clean. But I'm not sure about committing to 30 sessions. I've downloaded 3 fitness apps before and used each for about 2 weeks. ₹1,599 is not a lot for me but I know myself — I might use 10 sessions and waste the rest.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 for 30 sessions. I know myself — I'll go enthusiastically for 2 weeks, then find excuses. A 10-session pack at ₹600 would be perfect for my attention span.",
          reasoning: "Self-awareness about commitment patterns — 30 sessions feels too optimistic",
          emotional_state: "hesitant",
          friction_points: ["30-session minimum too large for trial", "No smaller pack option"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 5, value_score: 4, time_seconds: 28,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-042",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "Product Analyst",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Works at a D2C startup in Koramangala. Earns ₹60,000/month. Gym-curious.",
      cultural_background:
        "From Delhi. 1.5 years in Bangalore. Social butterfly. Goes out 4-5 nights a week.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 80,
      overall_monologue:
        "Basic at ₹1,599 — that's like 2.5 nights out in Koramangala. If I replace 2.5 bar nights with gym nights, I'm healthier AND saving money long-term. The gym near Koramangala 1st Block has a great vibe from the photos.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599 Basic. My bar tab last Saturday was ₹1,200. If this gets me to the gym even 15 times, it's worth it.",
          reasoning: "Lifestyle spending comparison makes gym investment feel small",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 18,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "Paying. Time to get that gym selfie for my Hinge profile.",
          reasoning: "Social/dating motivation for fitness",
          emotional_state: "enthusiastic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-043",
      demographics: {
        first_language: "Kannada",
        age: 22,
        occupation: "Dental Intern",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Dental intern at a private hospital in Jayanagar. Stipend ₹25,000/month.",
      cultural_background:
        "Bangalorean from Basavanagudi. Health-aware from medical background. Budget-conscious student.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 95,
      overall_monologue:
        "₹53 per session at the gym near Jayanagar is fair. As a dental intern, I sit in the same position for hours and my back hurts. I need strength training. 30 sessions at my pace of 3 times a week will last me 2.5 months. Better than a monthly membership I won't fully use.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. On my stipend this is significant but my back pain is worse. 30 sessions over 2.5 months — ₹640/month effectively. That's reasonable.",
          reasoning: "Health need justifies the expense despite tight budget",
          emotional_state: "determined",
          friction_points: ["Significant on intern stipend"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 25,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 for my back health. My senior said gym fixed her posture too.",
          reasoning: "Peer recommendation + health need",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-044",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "College Student",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "MBA student at a Bangalore B-school. Pocket money ₹20,000/month from parents.",
      cultural_background:
        "From Lucknow. Instagram-savvy. Discovered Fit Square through a reel.",
      outcome: "dropped_off_at_phone_number",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 26,
      overall_monologue:
        "I saw this on Instagram reels — 'pay per session gym in Bangalore'. Cool concept. But I just want to check if there's something near my PG in Koramangala 6th Block. Why do I need to register before browsing? Even Zomato lets me see restaurants without logging in.",
      screen_monologues: [
        {
          screen_id: "phone_number",
          view_name: "Phone Registration",
          internal_monologue: "Register before browsing? Zomato doesn't do this. Swiggy doesn't do this. I just want to see gyms near Koramangala. I'll come back if a friend confirms it's good.",
          reasoning: "UX comparison with established apps — registration before value is unusual",
          emotional_state: "mildly frustrated",
          friction_points: ["Registration before browsing", "UX inferior to known apps"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 7, value_score: 5, time_seconds: 12,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-045",
      demographics: {
        first_language: "Hindi",
        age: 27,
        occupation: "Delivery Executive",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Unmarried",
      },
      professional_background:
        "Swiggy delivery partner in Electronic City. Earns ₹600-800/day. Variable income.",
      cultural_background:
        "From Bihar. 2 years in Bangalore. Fit from cycling but wants gym for upper body.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 115,
      overall_monologue:
        "₹1,599 is 2 good days of deliveries. But the gym near Electronic City Phase 1 is right next to my room. I can go early morning before my shift. ₹53/session — if I go 25+ times, it's better than any monthly gym. I'll eat home food for a week to compensate.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "₹1,599... that's 2 days of work. But it's 30 sessions. If I'm disciplined, that's the best gym deal in Electronic City.",
          reasoning: "Tight calculation but gym proximity makes it worth the stretch",
          emotional_state: "conflicted but leaning yes",
          friction_points: ["Significant expense on variable income"],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 6, value_score: 6, time_seconds: 35,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "Paying ₹1,599. I'll skip ordering food on Swiggy for a week to make up for this.",
          reasoning: "Budget adjustment to accommodate fitness spending",
          emotional_state: "resolute",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6, clarity_score: 7, value_score: 6, time_seconds: 18,
        },
      ],
    },

    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 10: Married Family Person (3/5 complete — 60%)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "fs-persona-046",
      demographics: {
        first_language: "Hindi",
        age: 32,
        occupation: "Project Manager",
        district: "Bangalore Urban",
        zone: "East",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "IT Project Manager in Whitefield. Earns ₹1,10,000/month. Wife works in HR.",
      cultural_background:
        "From Jaipur, 8 years in Bangalore. Two young kids. Dual-income household. Health-aware.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 92,
      overall_monologue:
        "With two kids, my schedule is unpredictable. Per-session means I don't waste money when I can't go. The gym near Whitefield Brookefields is 10 minutes from home. Basic at ₹1,599 — I'll try going on weekday mornings before the kids wake up.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. With kids, I might go 15-20 times realistically. Even at 20 sessions, ₹80 per visit isn't bad for schedule flexibility.",
          reasoning: "Realistic parenting-adjusted usage estimate — still acceptable value",
          emotional_state: "pragmatic",
          friction_points: ["Might not use all 30 sessions"],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 6, time_seconds: 22,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599 from the household gym budget. Wife said it's fine as long as I actually go.",
          reasoning: "Household budget approval + spousal accountability",
          emotional_state: "committed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 6, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-047",
      demographics: {
        first_language: "Kannada",
        age: 30,
        occupation: "School Teacher",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Female",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Teaches science at a private school in BTM Layout. Earns ₹35,000/month. Husband is an accountant.",
      cultural_background:
        "Kannadiga from Bangalore. Married 3 years. Health-conscious after pregnancy weight gain.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 100,
      overall_monologue:
        "I need to get back in shape after having my baby. The gym near BTM 2nd Stage has a women's section with morning batches. ₹53/session for Basic — I can go after dropping my daughter at the creche. Per-session is perfect because some weeks I might not make it.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. I'll go mornings when my daughter is at creche. 30 sessions should last me 3 months at my pace.",
          reasoning: "Flexible model matches new-mother schedule",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 22,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599. This is my investment in myself. My husband supports it.",
          reasoning: "Self-care motivation with family support",
          emotional_state: "motivated",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-049",
      demographics: {
        first_language: "Hindi",
        age: 34,
        occupation: "Bank Manager",
        district: "Mumbai Suburban",
        zone: "Central",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "Branch Manager at SBI in Mulund. Earns ₹75,000/month. Two kids.",
      cultural_background:
        "From Lucknow. 8 years in Mumbai. Family-first. Health-aware after father's heart surgery.",
      outcome: "completed",
      key_selections: { plan: "Basic 30" },
      final_price_inr: 1599,
      total_time_seconds: 98,
      overall_monologue:
        "After my father's heart surgery, I promised myself I'd take fitness seriously. The gym near Mulund station has decent reviews. Basic at ₹1,599 — I'll try going before bank hours at 8 AM. If it works, I'll continue. Per-session is practical for a banker with unpredictable late nights during audits.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. Family health history means I need this. Per-session is smart — during audit season I might skip 2 weeks but won't waste money.",
          reasoning: "Health motivation from family history + practical value of per-session model",
          emotional_state: "determined",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 22,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "₹1,599. For my health and my family's peace of mind. Paying now.",
          reasoning: "Emotional health motivation",
          emotional_state: "resolved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 7, value_score: 7, time_seconds: 14,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-050",
      demographics: {
        first_language: "Telugu",
        age: 36,
        occupation: "Freelance Consultant",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "The Pragmatist",
        marital_status: "Married",
      },
      professional_background:
        "IT consultant. Variable income averaging ₹1,20,000/month. Works from home in HSR Layout.",
      cultural_background:
        "Telugu from Vijayawada. 9 years in Bangalore. Wife is a dentist. One toddler.",
      outcome: "dropped_off_at_checkout_basic",
      key_selections: { plan: "Basic 30" },
      final_price_inr: null,
      total_time_seconds: 85,
      overall_monologue:
        "I went all the way to checkout for Basic at ₹1,599. But at the payment screen I hesitated — the payment page doesn't show a refund policy. What if I hate the gym? What if the sessions expire before I use them? No clarity on these terms. I closed the app to think about it. Might come back tomorrow.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Basic at ₹1,599. Fair price. Let me proceed to checkout.",
          reasoning: "Price acceptable — proceeding to payment",
          emotional_state: "ready",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 18,
          selected_choice: "Basic 30",
        },
        {
          screen_id: "checkout_basic",
          view_name: "Checkout Basic",
          internal_monologue: "Wait — what's the refund policy? Do sessions expire? What if the gym closes or changes its listing? I don't see any terms. ₹1,599 isn't much but I hate paying for unclear terms. I'll think about this.",
          reasoning: "Absence of refund/expiry terms creates last-minute doubt",
          emotional_state: "hesitant",
          friction_points: ["No refund policy visible", "Session expiry terms unclear", "No T&C summary"],
          decision_outcome: "DROP_OFF",
          trust_score: 5, clarity_score: 4, value_score: 6, time_seconds: 22,
        },
      ],
    },
    {
      persona_uuid: "fs-persona-051",
      demographics: {
        first_language: "Hindi",
        age: 33,
        occupation: "Advertising Agent",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "The Cautious Explorer",
        marital_status: "Married",
      },
      professional_background:
        "Works at an ad agency in Andheri West. Earns ₹70,000/month. Long hours, sedentary.",
      cultural_background:
        "From Bhopal. 5 years in Mumbai. Wife expecting first child. Wants to get healthier before baby arrives.",
      outcome: "dropped_off_at_checkout_premium",
      key_selections: { plan: "Premium 30" },
      final_price_inr: null,
      total_time_seconds: 90,
      overall_monologue:
        "I selected Premium at ₹2,499 for the gym near Andheri Versova. But at checkout, I realized ₹2,499 is what I spend on my wife's prenatal supplements. With the baby coming, every expense needs justification. The app didn't convince me this is better than the ₹1,000/month gym near my office. I'll revisit after the baby is born.",
      screen_monologues: [
        {
          screen_id: "plan_selection",
          view_name: "Select Plan",
          internal_monologue: "Premium at ₹2,499. The Versova gym has a pool. I want to swim for cardio.",
          reasoning: "Pool access motivated Premium selection",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7, clarity_score: 6, value_score: 7, time_seconds: 22,
          selected_choice: "Premium 30",
        },
        {
          screen_id: "checkout_premium",
          view_name: "Checkout Premium",
          internal_monologue: "₹2,499... that's exactly what my wife's prenatal vitamins cost this month. With the baby coming in 3 months, I should be more careful. The ₹1,000/month gym near office will do for now.",
          reasoning: "Life-stage priority shift — baby expenses take precedence",
          emotional_state: "guilty",
          friction_points: ["Competing household expenses", "No urgency to switch from existing option"],
          decision_outcome: "DROP_OFF",
          trust_score: 6, clarity_score: 7, value_score: 5, time_seconds: 20,
        },
      ],
    },
  ],
};
