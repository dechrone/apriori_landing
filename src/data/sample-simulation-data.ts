import type { SimulationData } from "@/types/simulation";

/**
 * Sample simulation data extracted from the Blink Money insights JSON.
 * Used as mock data during development / demo.
 */
export const sampleSimulationData: SimulationData = {
  simulation_id: "e5546db94bc046ce89c531da08da01a7",
  flow_id: "blink_money_flow1",
  flow_name: "Blink Money – Loan Against Mutual Funds (Flow 1)",
  generated_at: "2026-03-06T14:31:32.091120+00:00",
  summary: {
    total_personas: 5,
    completed: 0,
    dropped_off: 5,
    completion_rate_pct: 0.0,
    avg_time_to_complete_seconds: 0,
    dominant_plan: "N/A",
    dominant_plan_pct: 0,
  },
  sample_quality: {
    sample_size: 5,
    margin_of_error_pct: 0.0,
    confidence_level: "80%",
    note: "Results are directional. At n=5, completion rate has ±0.0% uncertainty. Run 30+ personas for ±8% error at 80% confidence.",
  },
  plan_distribution: {},
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 0, pct: 0 },
  },
  funnel_drop_off: [
    { screen_id: "view_3", drop_offs: 4, drop_off_pct: 80.0 },
    { screen_id: "view_1", drop_offs: 1, drop_off_pct: 20.0 },
  ],
  top_friction_points: [
    { friction: "Asking for my PAN number is very risky.", frequency: 1 },
    {
      friction:
        "I don't know this company, and there is no bank name or government seal.",
      frequency: 1,
    },
    {
      friction:
        "Why do they need to see my entire investment portfolio so early?",
      frequency: 1,
    },
    {
      friction:
        "The countdown timer makes me feel pressured and rushed.",
      frequency: 1,
    },
    {
      friction:
        "Switching between this app and my SMS app is confusing.",
      frequency: 1,
    },
    { friction: "No EMI or loan tenure shown", frequency: 1 },
    {
      friction: "Confusing slider range (max is 2x eligibility)",
      frequency: 1,
    },
    {
      friction: "Asking for PAN number without establishing trust",
      frequency: 1,
    },
  ],
  screen_metrics: {
    view_1: {
      avg_trust: 3.4,
      avg_clarity: 6.4,
      avg_value: 4.6,
      avg_time_s: 76.0,
      sample_size: 5,
    },
    view_2: {
      avg_trust: 3.8,
      avg_clarity: 6.2,
      avg_value: 3.8,
      avg_time_s: 80.0,
      sample_size: 4,
    },
    view_3: {
      avg_trust: 2.0,
      avg_clarity: 1.8,
      avg_value: 1.8,
      avg_time_s: 96.2,
      sample_size: 4,
    },
  },
  executive_summary:
    "Our initial user flow for 'Loan Against Mutual Funds' has a 0% completion rate with the tested segment, indicating a catastrophic failure in establishing trust and providing clarity. Users, primarily older and less digitally-native, are immediately alarmed by the upfront request for their PAN number without any brand credibility. The journey culminates in 80% of users dropping off at the loan offer screen, which lacks critical information like EMI and tenure, leaving them feeling overwhelmed and suspicious. The core risk is that our current flow is perceived as predatory and untrustworthy, alienating our target user base from the very first step.",
  design_recommendations: [
    {
      priority: "P0",
      screen: "KYC – Secure Verification (Step 1/6)",
      issue:
        "Asking for a PAN number on the very first screen, before establishing brand identity or showing value, creates immediate and intense user suspicion and fear of fraud.",
      recommendation:
        "Redesign the initial screen. Replace the PAN input field with a welcome screen that clearly states the value proposition, explains the 3-step process in simple terms, and displays prominent trust signals (e.g., 'Powered by [Partner Bank Name]', RBI/SEBI registration details, security certification logos). The call-to-action should be 'Check Your Eligibility' which then leads to the phone number/PAN input.",
      expected_impact:
        "-50% drop-off at this screen; decrease 'Suspicious' and 'Anxious' emotion flags by 70%",
      primary_affected_segment:
        "All tested personas (The Pragmatist, The Confused Novice), literacy ≤ 6/10",
    },
    {
      priority: "P0",
      screen: "Eligible Amount & Interest Rate",
      issue:
        "The screen displays a loan amount and interest rate but omits crucial decision-making information like EMI options and loan tenure, causing confusion and drop-offs.",
      recommendation:
        "Enhance the offer screen to be fully transparent. Below the eligible amount and interest rate, add interactive sliders for 'Loan Amount' and 'Repayment Tenure (in months)'. As the user adjusts these sliders, a calculated 'Monthly EMI' should update in real-time. Also include a simple, clickable FAQ link like 'How is this calculated?' or 'Is my data safe?'.",
      expected_impact:
        "-60% drop-off at this screen; increase user confidence",
      primary_affected_segment: "The Pragmatist archetype",
    },
    {
      priority: "P1",
      screen: "OTP Verification",
      issue:
        "The countdown timer induces anxiety and pressure, especially for users who are slow to navigate between the app and their SMS inbox.",
      recommendation:
        "Remove the visible, fast-paced countdown timer. Instead, provide a static message like 'Enter the OTP sent to your mobile.' and a 'Resend OTP' button that becomes clickable after 30-45 seconds. Implement the Android SMS Retriever API to enable one-tap or automatic OTP entry, eliminating the need for app switching.",
      expected_impact:
        "-50% 'Rushed' and 'Pressured' emotion flags; improved accessibility for low-literacy users",
      primary_affected_segment: "The Confused Novice, literacy ≤ 5/10",
    },
    {
      priority: "P2",
      screen: "KYC – Secure Verification (Step 1/6)",
      issue:
        "Users do not recognize the 'Blink Money' brand and cannot find any familiar trust marks (e.g., bank name, government seal), leading them to question the app's legitimacy.",
      recommendation:
        "Create a persistent header or footer visible on the first few screens that contains the logo of a well-known partner bank or NBFC, and a small, recognizable icon for 'RBI Approved' or a similar regulatory stamp.",
      expected_impact: "+20% trust score; reduction in initial hesitation",
      primary_affected_segment: "The Pragmatist, first-time users",
    },
  ],
  behavioral_insights: [
    "A 100% drop-off rate among the 50-64 age demographic with low-to-mid digital literacy indicates a fundamental misalignment between the product's onboarding and the segment's mental model, which prioritizes trust and clarity over speed.",
    "The 'Pragmatist' archetype, while intellectually grasping the product's value ('clever idea'), will not proceed without full transparency. The absence of EMI/tenure information was a deal-breaker for them, triggering suspicion and abandonment.",
    "The 'Confused Novice' archetype is highly susceptible to UI-induced anxiety. Elements like countdown timers and technical jargon ('PAN') without simple explainers caused them to feel 'helpless' and 'terrified', making completion impossible.",
    "The request for PAN on screen 1 is a universal trust-killer for this segment. Every single persona reacted with suspicion, caution, or anxiety, setting a negative emotional tone for the entire journey, even for those who proceeded.",
  ],
  segment_analysis: {
    summary:
      "The tested segment of older, urban, non-working individuals with low-to-medium literacy performed catastrophically, with a 100% drop-off rate. The flow's design assumptions—that users trust new fintech brands and prioritize speed—are the opposite of this segment's needs, which are trust, transparency, and a guided pace.",
    high_propensity_segment:
      "N/A - No user was able to complete the journey. A hypothetical high-propensity segment would likely be younger (25-40), salaried, digitally-native, and already familiar with using fintech apps for investments and credit.",
    low_propensity_segment:
      "No Occupation / Retired / Homemaker, 50-65yo, literacy ≤ 6/10. Key barriers are profound distrust of sharing sensitive data (PAN) with an unknown entity upfront, overwhelming confusion from missing loan details (EMI, tenure), and high anxiety caused by pressure-inducing UI like timers.",
  },
  ux_analysis: {
    highest_friction_screen: "view_3",
    trust_building_screens: [],
    clarity_problem_screens: ["view_1", "view_3"],
    value_gap_screens: ["view_1", "view_3"],
  },
  power_users: {
    power_user_archetypes: [
      {
        archetype_name: "The Cautious Urban Investor",
        defining_traits: {
          income_range: "\u20b980,000-\u20b91,50,000/mo",
          digital_literacy: "8-10/10",
          employer_type: "Private Sector / MNC / Tech",
          zone: "Urban",
          behavioral_archetype: "The Security-Conscious Planner",
          age_range: "32-45",
        },
        why_they_convert:
          "This user is the target persona that the flow failed to capture. They would only convert if the journey were redesigned to proactively address their primary concerns. The core value proposition of liquidity without liquidation is strong, but conversion is entirely dependent on the flow establishing overwhelming trust through transparent pricing, clear security reassurances, and a seamless, professional UX that makes them feel safe and in control.",
        what_resonates: [
          "Clear, upfront display of interest rates, all associated fees, and lien process",
          "Prominent trust signals: partner bank logos, RBI compliance, data security certifications",
          "Simple, jargon-free explainers on how the lien works and its impact",
          "A non-intrusive, seamless data import process (e.g., via CAMS/KFintech)",
        ],
        conversion_rate_estimate:
          "60-70% estimated completion rate (for a redesigned, trust-centric flow)",
        persona_count_in_sample: 0,
      },
    ],
    flow_strengths_for_power_users: [
      "The core value proposition of liquidity without selling long-term investments is compelling.",
      "Theoretically offers a faster, more integrated process than traditional bank loans against securities.",
      "Potential to offer lower interest rates than unsecured personal loans by leveraging assets.",
    ],
    acquisition_recommendation:
      "Focus on content marketing via financial literacy platforms (e.g., Moneycontrol, ET Money, Livemint) and targeted performance campaigns on professional networks like LinkedIn, emphasizing trust, security, and smart liquidity management.",
  },
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 5,
    screens: {
      view_3: {
        total_drop_offs: 4,
        clusters: [],
      },
      view_1: {
        total_drop_offs: 1,
        clusters: [],
      },
    },
  },
  flow_assessment: {
    overall_verdict:
      "The flow is fundamentally broken, failing to establish the basic trust required for users to engage with a high-consideration financial product, resulting in a 100% drop-off rate.",
    what_works: [
      {
        element: "Initial Value Proposition (Pre-funnel)",
        why: "The core concept of 'Loan Against Mutual Funds' was compelling enough to attract the target audience and get them to start the flow, indicating a valid market need.",
        for_whom:
          "Financially prudent individuals seeking liquidity without liquidating assets.",
      },
    ],
    what_needs_fixing: [
      {
        element: "view_3 (PAN & Portfolio Access Screen)",
        problem:
          "Asking for highly sensitive information (PAN, full portfolio access) prematurely, before establishing any trust or demonstrating clear value, causing a massive 80% drop-off.",
        for_whom: "All users, especially the cautious target persona.",
        fix: "Re-architect the flow to 'give before you get'. Introduce a loan eligibility calculator upfront based on a user-estimated portfolio value. Only after a user sees and accepts a provisional offer should the flow proceed to KYC (PAN) and portfolio verification.",
        priority: "P0",
      },
      {
        element: "view_1 & Overall Branding",
        problem:
          "Users do not recognize or trust the Blink Money brand. The absence of any familiar bank logo, NBFC name, or regulatory badge causes immediate suspicion.",
        for_whom: "All users, particularly those with low digital literacy.",
        fix: "Add prominent co-branding with a recognized financial partner (e.g., 'In partnership with ICICI Bank') and display RBI/SEBI registration numbers on the first screen.",
        priority: "P0",
      },
      {
        element: "OTP Verification Timer",
        problem:
          "The countdown timer creates unnecessary time pressure and anxiety, especially for older users or those less comfortable with app-switching.",
        for_whom: "The Confused Novice archetype, low-literacy users.",
        fix: "Replace the visible countdown with a static instruction and a delayed 'Resend OTP' button. Implement auto-read OTP where possible.",
        priority: "P1",
      },
      {
        element: "Loan Offer Screen — Missing Details",
        problem:
          "The loan offer screen shows a large eligible amount and interest rate, but completely omits EMI and tenure information, which is the primary decision-making factor for this audience.",
        for_whom: "The Pragmatist archetype.",
        fix: "Add interactive EMI and tenure sliders below the offer, with real-time monthly payment calculation.",
        priority: "P1",
      },
    ],
    quick_wins: [
      {
        change: "Add a partner bank logo and RBI registration number to the first screen header.",
        expected_uplift:
          "Establishes minimal credibility, potentially reducing view_1 drop-offs by 50% and improving progression to view_2.",
      },
      {
        change: "Replace the OTP countdown timer with a static message and a 'Resend' button.",
        expected_uplift:
          "Reduces anxiety for low-literacy users and improves OTP completion rate by an estimated 30%.",
      },
    ],
    ux_health_scores: {
      trust_journey: 1,
      clarity_journey: 2,
      value_communication: 2,
      cognitive_load: "high",
      emotional_flow: "curious → skeptical → anxious → abandon",
    },
    emotional_journey_map: {
      completers:
        "Not applicable, as there were zero completers in the simulation.",
      drop_offs:
        "Initial curiosity about the loan offering quickly soured into skepticism and anxiety upon encountering an unknown brand with no trust signals. The journey culminated in distrust and abandonment when faced with high-pressure tactics (timer) and premature requests for sensitive data.",
    },
    cognitive_load_assessment: [
      {
        reason:
          "Users must evaluate an unknown brand and a high-stakes value proposition with insufficient trust signals, creating high evaluative load.",
      },
      {
        reason:
          "The user friction 'switching between this app and my sms app is confusing' indicates a high extraneous load due to poor UX mechanics for OTP verification.",
      },
      {
        reason:
          "The loan offer screen presents a large number without context (no EMI, tenure), forcing users to perform complex mental calculations.",
      },
    ],
    information_architecture_issues: [
      {
        issue: "Trust signals are absent from early screens where they are most needed.",
        recommendation: "Move trust elements to screen 1.",
      },
    ],
    micro_interaction_gaps: [
      "Auto-reading OTPs to prevent app switching and reduce cognitive load.",
      "Informative tooltips or expandable info-icons next to fields like 'PAN' explaining why it's needed, how it's secured, and that it's a regulatory requirement.",
      "Real-time input validation and formatting for the PAN field.",
    ],
    three_month_roadmap: {
      month_1_P0: [
        "Re-architect the flow: Build and deploy an upfront loan estimator and move the full PAN/portfolio verification step to after a provisional offer is accepted.",
      ],
      month_2_P1: [
        "Implement contextual help tooltips for all sensitive data fields and financial jargon.",
      ],
      month_3_P2: [],
    },
  },
  persona_journeys: [
    {
      persona_type: "No Occupation / The Pragmatist",
      plan_chosen: "dropped off",
      key_decision_moment:
        "Eligible Amount & Interest Rate screen. After cautiously providing their PAN and OTP, they were met with an offer that lacked EMI and tenure details. This lack of transparency confirmed their initial suspicion, causing them to feel 'Alarmed' and immediately abandon the process.",
      emotional_arc: "cautious → hesitant → alarmed → suspicious",
    },
    {
      persona_type: "No Occupation / The Confused Novice",
      plan_chosen: "dropped off",
      key_decision_moment:
        "Eligible Amount & Interest Rate screen. The user was already confused and anxious from the PAN and OTP steps. Being presented with a large loan amount without any context or understandable terms was 'Terrifying' and 'Overwhelming,' leading to an immediate drop-off out of fear.",
      emotional_arc: "confused → anxious → dependent → terrified",
    },
    {
      persona_type: "No Occupation / The Pragmatist",
      plan_chosen: "dropped off",
      key_decision_moment:
        "KYC – Secure Verification (Step 1/6). The user immediately questioned the legitimacy of the app upon seeing the upfront PAN request. Searching for a familiar bank or government logo and finding none, they felt it was too risky and dropped off before providing any information.",
      emotional_arc: "curious → suspicious → cautious",
    },
  ],
  completion_analysis: {
    total_completers: 0,
    completion_rate_pct: 0.0,
    conversion_drivers: {},
    dominant_completion_themes: [],
    llm_synthesis:
      "Based on the analysis of the Blink Money Loan Against Mutual Funds flow, the most critical finding is the 0% completion rate. This indicates a fundamental failure in the user journey, meaning no psychological or contextual factors successfully drove any user to completion.",
  },
  persona_details: [],
};
