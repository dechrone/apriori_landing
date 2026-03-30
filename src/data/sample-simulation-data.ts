import type { SimulationData } from "@/types/simulation";

/**
 * Sample simulation data extracted from the Blink Money insights JSON.
 * Used as mock data during development / demo.
 */
export const sampleSimulationData: SimulationData = {
  simulation_id: "cb3809c8fae6489b96e1e148214b56a3",
  flow_id: "blink_money_flow1",
  flow_name: "Blink Money – Loan Against Mutual Funds (Flow 1)",
  generated_at: "2026-03-08T09:59:40.783223+00:00",
  summary: {
    total_personas: 50,
    completed: 33,
    dropped_off: 17,
    completion_rate_pct: 66.0,
    avg_time_to_complete_seconds: 182.8,
    dominant_plan: "LAMF_ONLY",
    dominant_plan_pct: 100.0,
  },
  sample_quality: {
    sample_size: 50,
    margin_of_error_pct: 8.6,
    confidence_level: "80%",
    note: "Sample size of 50 is adequate for directional insights at 80% confidence (±8.6%).",
  },
  plan_distribution: {
    LAMF_ONLY: { count: 33, pct: 100.0 },
  },
  addon_adoption: {
    with_addon: { count: 0, pct: 0.0 },
    skipped: { count: 33, pct: 100.0 },
  },
  funnel_drop_off: [
    { screen_id: "1", drop_offs: 13, drop_off_pct: 26.0 },
    { screen_id: "3", drop_offs: 3, drop_off_pct: 6.0 },
    { screen_id: "3_result", drop_offs: 1, drop_off_pct: 2.0 },
  ],
  top_friction_points: [
    { friction: "24-hour waiting period for document verification", frequency: 3 },
    {
      friction:
        "technical jargon like 'encrypted' and 'central registries' causing fear",
      frequency: 2,
    },
    {
      friction:
        "hesitation regarding broad data access to the entire mutual fund portfolio.",
      frequency: 1,
    },
    {
      friction:
        "short 19-second resend window might be tight if the sms gateway is slow.",
      frequency: 1,
    },
    {
      friction:
        "lingering concern about the extent of data being fetched after this verification.",
      frequency: 1,
    },
    {
      friction: "logical discrepancy between 'eligibility' (2.85l) and slider maximum (5.70l).",
      frequency: 1,
    },
    {
      friction: "lack of clear breakdown on processing fees or lien-marking details for the specific funds.",
      frequency: 1,
    },
    {
      friction: "24-hour sla for document verification feels slightly slow for an 'instant' digital product.",
      frequency: 1,
    },
  ],
  screen_metrics: {
    "1": {
      avg_trust: 6.2,
      avg_clarity: 6.9,
      avg_value: 6.0,
      avg_time_s: 54.2,
      sample_size: 50,
    },
    "2": {
      avg_trust: 7.6,
      avg_clarity: 8.9,
      avg_value: 6.8,
      avg_time_s: 29.4,
      sample_size: 37,
    },
    "3": {
      avg_trust: 6.8,
      avg_clarity: 6.1,
      avg_value: 7.7,
      avg_time_s: 65.4,
      sample_size: 37,
    },
    "3_result": {
      avg_trust: 7.8,
      avg_clarity: 8.3,
      avg_value: 8.1,
      avg_time_s: 47.4,
      sample_size: 34,
    },
  },
  executive_summary:
    "Blink Money's LAMF flow achieved a solid 66% completion rate, driven by 'The Pragmatist' archetype who values the professional, 'CRED-esque' UI. However, a critical 26% drop-off at Screen 1 (KYC) indicates significant upfront friction related to data privacy and technical jargon. The primary risk is a 'trust gap' where users, particularly those with lower digital literacy, feel overwhelmed by the perceived breadth of data access and the 24-hour verification delay.",
  design_recommendations: [
    {
      priority: "P0",
      screen: "KYC – Secure Verification (Step 1/6)",
      issue:
        "High drop-off (26%) and fear regarding 'broad data access' and 'central registries' jargon.",
      recommendation:
        "Replace technical jargon with benefit-oriented microcopy (e.g., 'Bank-grade security' instead of 'Central Registries') and include a 'Why we need this' tooltip explaining that data access is read-only and limited to fund valuation.",
      expected_impact:
        "-15% drop-off at Screen 1; increased trust scores in qualitative feedback.",
    },
    {
      priority: "P1",
      screen: "Eligible Amount & Interest Rate",
      issue:
        "Logical discrepancy between stated eligibility (2.85L) and slider maximum (5.70L) causing cognitive dissonance.",
      recommendation:
        "Sync the UI slider maximum to match the calculated eligibility limit dynamically, or add a 'Boost Limit' CTA if the higher amount requires additional collateral.",
      expected_impact:
        "Reduced 'Calculating/Anxious' sentiment; faster time-to-complete on Screen 3.",
    },
    {
      priority: "P1",
      screen: "OTP Verification",
      issue:
        "Short 19-second resend window creates unnecessary anxiety for users on slower SMS gateways.",
      recommendation:
        "Extend the resend OTP timer to 45 or 60 seconds and add a 'Get OTP via WhatsApp' secondary option.",
      expected_impact:
        "Lower 'hurried/anxious' emotional states; reduced drop-off for users in 'Other' (non-Tier 1) locations.",
    },
  ],
  behavioral_insights: [
    "Users with digital_literacy scores < 5 accounted for the majority of drop-offs at Screen 1, citing 'confusion and worry' as the primary emotional driver.",
    "The 'Pragmatist' archetype (80% of the sample) shows high tolerance for the 24-hour wait period if the initial UI feels 'sturdy' and 'slick', prioritizing professional aesthetics over instant disbursement.",
    "Higher-income personas (₹125k+) expressed 'South Delhi/CRED-esque' expectations, indicating that premium UI design is a prerequisite for trust in this segment.",
    "A 'Relief-Anxiety' loop was observed: users feel relief at seeing the eligible amount but immediate anxiety regarding the 'extent of data being fetched'.",
  ],
  segment_analysis: {
    summary:
      "The flow strongly resonates with analytical, high-literacy urban professionals but creates significant friction for lower-literacy and lower-income segments.",
    high_propensity_segment:
      "The Pragmatist, Urban, Income ₹65k–₹225k, high digital literacy (7-9/10). These users are analytical and complete the flow despite minor technical frictions.",
    low_propensity_segment:
      "The Skeptic or Pragmatist with digital literacy ≤ 4 and income < ₹25k. This segment drops off early due to fear of the 'central registry' and confusion over the KYC process.",
  },
  ux_analysis: {
    highest_friction_screen: "1",
    trust_building_screens: ["3_result"],
    clarity_problem_screens: ["1", "3"],
    value_gap_screens: ["1"],
  },
  power_users: {
    power_user_archetypes: [
      {
        archetype_name: "High-Literacy Urban Pragmatist",
        defining_traits: {
          income_range: "₹65,000-₹2,25,000/mo",
          digital_literacy: "8-10/10",
          employer_type: "MNC / Tech / Self-Employed",
          zone: "Urban",
          behavioral_archetype: "The Pragmatist",
          age_range: "30-58",
        },
        why_they_convert:
          "These users possess the financial sophistication to recognize the 10.5% rate as a superior alternative to unsecured debt. Their high digital literacy allows them to interpret a multi-step flow as a sign of institutional security rather than a friction point. They are driven by a 'rational arbitrage' mindset, seeking to leverage existing assets to maintain liquidity without liquidating their portfolios.",
        what_resonates: [
          "10.5% Interest Rate Value Anchor",
          "Sequential Roadmap on Result Screen",
        ],
        conversion_rate_estimate:
          "80-90% estimated completion rate",
        persona_count_in_sample: 7,
      },
      {
        archetype_name: "Mature Self-Employed Asset Owner",
        defining_traits: {
          income_range: "₹35,000-₹65,000/mo",
          digital_literacy: "4-7/10",
          employer_type: "Self-Employed / Proprietor",
          zone: "Urban",
          behavioral_archetype: "The Pragmatist",
          age_range: "35-63",
        },
        why_they_convert:
          "This segment values the functional utility of the loan for business or personal cash flow management. Despite lower digital literacy in some cases, their 'Professional Pragmatism' keeps them in the flow because they view the structured steps as evidence of a robust and trustworthy financial process. They are willing to spend more time (150s+) to ensure the transaction is completed correctly.",
        what_resonates: [
          "Logical structure of the digital flow",
          "Lower cost of capital compared to personal loans",
        ],
        conversion_rate_estimate:
          "60-70% estimated completion rate",
        persona_count_in_sample: 10,
      },
    ],
    flow_strengths_for_power_users: [
      "Transparent pricing (10.5%) eliminates early-funnel skepticism.",
      "The 3_result screen roadmap mirrors the logical-analytical mindset of technical professionals.",
      "Process thoroughness is interpreted as security/reliability rather than friction.",
    ],
    acquisition_recommendation:
      "Focus on LinkedIn and Google Search ads targeting high-intent keywords like 'Personal Loan vs LAMF' or 'Low interest liquidity,' specifically filtering for professional cohorts in IT, Engineering, and SMEs in Tier-1/2 cities.",
  },
  drop_off_analysis: {
    screens: {
      view_3: {
        drop_off_count: 4,
        hotspot_rank: 1,
        clusters: [],
      },
      view_1: {
        drop_off_count: 1,
        hotspot_rank: 2,
        clusters: [],
      },
    },
  },
  flow_assessment: {
    overall_verdict:
      "A strong logic-driven flow that converts analytical users via rational arbitrage, but suffers from significant early-stage friction due to opaque verification timelines and technical jargon.",
    what_works: [
      {
        element: "Interest Rate Anchor (10.5%)",
        why: "Provides immediate value comparison against unsecured loans (13-18%), appealing to 'Rational Arbitrage' mindset.",
        for_whom:
          "Financial-savvy professionals and business owners",
      },
      {
        element: "Sequential Process Roadmap",
        why: "Reduces 'black box' anxiety by providing a predictable operational path.",
        for_whom:
          "Logical-analytical personas (Programmers/Technical Managers)",
      },
      {
        element: "Asset-Backed Value Prop",
        why: "Creates a sense of financial empowerment rather than debt-driven stress.",
        for_whom:
          "Tier 1/Tier 2 users with 5-7L portfolios",
      },
    ],
    what_needs_fixing: [
      {
        element: "Screen 1 - 24-hour verification",
        problem:
          "Massive drop-off (26%) due to the 'instant gratification' gap and lack of transparency on why it takes 24 hours.",
        for_whom: "Time-sensitive Tier 1 users",
        fix: "Implement a real-time 'Status Tracker' or offer a 'Preliminary Limit' instantly while verification runs in background.",
        priority: "P0",
      },
      {
        element: "Technical Jargon ('Encrypted', 'Central Registries')",
        problem:
          "Causes security-related fear and cognitive dissonance rather than building trust.",
        for_whom: "Non-technical business owners/Tier 2 users",
        fix: "Replace with benefit-led copy: 'Bank-grade security' and 'Official Government Records'.",
        priority: "P1",
      },
      {
        element: "Portfolio Data Access",
        problem:
          "Hesitation regarding broad access to the entire MF portfolio.",
        for_whom: "Privacy-conscious high-net-worth individuals",
        fix: "Explicitly state that data is 'Read-only' and used solely for limit calculation.",
        priority: "P1",
      },
      {
        element: "OTP Resend Window",
        problem:
          "19-second window is too tight for standard SMS gateway latencies.",
        for_whom: "All users, especially in Tier 2 areas with spotty network",
        fix: "Extend window to 45-60 seconds and add a WhatsApp fallback.",
        priority: "P2",
      },
    ],
    quick_wins: [
      {
        change: "Update Screen 1 copy to explain 'Why the 24-hour wait' (e.g., Manual Security Audit).",
        expected_uplift:
          "+10-12% completion",
      },
      {
        change: "Change 'Encrypted' to 'Your data is locked for your eyes only'.",
        expected_uplift:
          "+3-5% trust score",
      },
    ],
    ux_health_scores: {
      trust_journey: 7.1,
      clarity_journey: 7.5,
      value_communication: 7.2,
      cognitive_load: "medium",
      emotional_flow: "Skepticism → Validation → Calculated Commitment",
    },
    emotional_journey_map: {
      completers:
        "Intrigued by rate → Cautious during data fetch → Reassured by roadmap → Confident in arbitrage.",
      drop_offs:
        "Interested → Annoyed by 24h delay → Fearful of data privacy/jargon → Abandonment.",
    },
    cognitive_load_assessment: [
      {
        screen_id: "1",
        load_level: "high",
        reason:
          "Unexpected 24-hour wait time forces a mental context switch away from the task.",
      },
      {
        screen_id: "3",
        load_level: "medium",
        reason:
          "Processing financial terms and interest rates requires analytical effort.",
      },
    ],
    information_architecture_issues: [
      {
        screen_id: "1",
        issue: "Hidden friction: The 24-hour wait is presented as a dead-end rather than a milestone.",
        recommendation: "Use a 'Step 1 of 4' progress bar to show the wait is part of a structured journey.",
      },
    ],
    micro_interaction_gaps: [
      "Lack of 'Why we need this' tooltips on data access permissions",
      "No visual confirmation (haptic/animation) when portfolio is successfully fetched",
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
    completion_rate_pct: 0.0,
    conversion_drivers: {},
    dominant_completion_themes: [],
    llm_synthesis:
      "Based on the analysis of the Blink Money Loan Against Mutual Funds flow, the most critical finding is the 0% completion rate. This indicates a fundamental failure in the user journey, meaning no psychological or contextual factors successfully drove any user to completion.",
  },
  persona_details: [
    {
      persona_uuid: "372c4210734a450e96281a36fb19956b",
      demographics: {
        occupation: "No Occupation / Retired / Homemaker",
        age: 61,
        sex: "Female",
        zone: "Urban",
        state: "Uttar Pradesh",
        district: "Allahabad",
        monthly_income_inr: 28000,
        digital_literacy: 4,
        behavioral_archetype: "The Pragmatist",
        purchasing_power_tier: "Mid",
        employer_type: "government",
        primary_device: "Android",
        family_size: 4,
        existing_health_conditions: true,
        current_insurance: true,
        emi_comfort: "uncomfortable",
        marital_status: null,
        education_level: "Graduate & above",
        first_language: "Hindi",
      },
      professional_background:
        "Bineeta Devi, a retired community facilitator, leverages her budgeting expertise, event\u2011planning acumen and basic digital skills to guide families and women\u2019s self\u2011help groups, ensuring smooth cultural ceremonies and practical household management, and they are valued for their meticulous attention to detail and calm demeanor.",
      cultural_background:
        "Bineeta grew up in Allahabad, a historic urban centre in Uttar Pradesh known for its literary and musical heritage. She belongs to a middle\u2011class Hindu family that emphasizes customary festivals, communal gatherings, and observance of traditions such as daily puja, seasonal rites, and hospitality.",
      outcome: "dropped_off_at_view_3",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 240,
      overall_monologue:
        "The first thing they asked for was my PAN number, and right away I felt a knot in my stomach. This is how all those fraud stories begin, asking for your private details before anything else. But it said \u2018secure\u2019, so I thought, chalo, let\u2019s see. Then came the OTP, and a timer started running down so fast, making my hands shake as I fumbled with my phone to find the message. When the next screen opened, a huge number flashed\u2014two lakh eighty-five thousand! My head was spinning. And 10.5% interest... but for how long? What would be the monthly payment? It didn\u2019t say a single word about that, which is the only thing that matters to me. How can I plan my budget if I don\u2019t know the EMI? I can\u2019t agree to something when I don\u2019t know the full story. I just closed the app right there; it felt dishonest, like they were trying to trick me with a big, tempting number while hiding the real cost. I don\u2019t trust this Blink Money now; it feels like a trap.",
      screen_monologues: [
        {
          screen_id: "view_1",
          view_name: "KYC \u2013 Secure Verification (Step 1/6)",
          internal_monologue:
            "PAN number? Right at the start? This feels like how scams begin. Why do they need to see all my holdings? But it says it\u2019s secure... and I suppose they need to know what I have to give a loan against it, that makes some sense. I\u2019ll just see the next screen. If they ask for an OTP to take money, I will immediately close the app.",
          reasoning:
            "They are asking for my PAN card number, which makes me very nervous. But it says my information is secure and they need it to check my mutual funds for the loan. I will just see what the next step is, I am not committing to anything yet.",
          emotional_state: "Anxious, Cautious",
          trust_score: 3,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 70,
          friction_points: [
            "Asking for my PAN number is very risky.",
            "I don\u2019t know this company, and there is no bank name or government seal.",
            "Why do they need to see my entire investment portfolio so early?",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_2",
          view_name: "OTP Verification",
          internal_monologue:
            "Achha, now I have to find the message on my phone. Where did it go? Ah, here it is. The number is... oh, this timer is counting down so fast! It makes me feel hurried. I hope I am not making a mistake by giving all this information. Let me just type it in quickly and see what happens next.",
          reasoning:
            "I have already given my PAN number, so I might as well finish this one last step to see what loan they are offering. The progress bar says \u2018Eligibility\u2019 is next, so I am curious to see the result. This OTP is a common step, even if it makes me nervous.",
          emotional_state: "Anxious, Rushed",
          trust_score: 3,
          clarity_score: 8,
          value_score: 2,
          time_seconds: 75,
          friction_points: [
            "The countdown timer makes me feel pressured and rushed.",
            "Switching between this app and my SMS app is confusing.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_3",
          view_name: "Eligible Amount & Interest Rate",
          internal_monologue:
            "Two lakh eighty-five thousand! My head is spinning. And 10.5% interest... but for how long? And how much per month? They don\u2019t say. And what is this LAMF? I am afraid they will take my mutual fund money if I miss one payment. No, no, this is too risky. I can\u2019t click \u2018Continue\u2019 without knowing the full details. It\u2019s better to be safe.",
          reasoning:
            "They are showing me such a large loan amount but not telling me what the monthly kisht (EMI) will be. How can I decide without knowing how it will affect my monthly budget? This is not a small amount, I cannot take such a risk.",
          emotional_state: "Overwhelmed, Suspicious, Anxious",
          trust_score: 2,
          clarity_score: 2,
          value_score: 1,
          time_seconds: 95,
          friction_points: [
            "No EMI or loan tenure shown",
            "Confusing slider range (max is 2x eligibility)",
          ],
          selected_choice: "DROP_OFF",
          decision_outcome: "DROP_OFF",
        },
      ],
    },
    {
      persona_uuid: "71865daab8ee40518b69ef24428e45c2",
      demographics: {
        occupation: "No Occupation / Retired / Homemaker",
        age: 57,
        sex: "Male",
        zone: "Urban",
        state: "Maharashtra",
        district: "Pune",
        monthly_income_inr: 65000,
        digital_literacy: 6,
        behavioral_archetype: "The Pragmatist",
        purchasing_power_tier: "Mid",
        employer_type: "self_employed",
        primary_device: "Android",
        family_size: 3,
        existing_health_conditions: true,
        current_insurance: true,
        emi_comfort: "comfortable",
        marital_status: null,
        education_level: "Graduate & above",
        first_language: "Hindi",
      },
      professional_background:
        "Shankar Bhoju, a 57\u2011year\u2011old community organizer in Pune, they leverage meticulous budgeting and event\u2011coordination skills to run temple festivals and neighbourhood financial\u2011literacy workshops, while their competitive streak drives them to exceed fundraising targets.",
      cultural_background:
        "Shankar Bhoju hails from a Hindi\u2011speaking middle\u2011class family that settled in Pune several decades ago. While his cultural roots are anchored in the traditions of North\u2011Indian Hindu households\u2014celebrating festivals like Diwali, Holi and Navratri\u2014his daily life is shaped by the Marathi urban milieu.",
      outcome: "dropped_off_at_view_1",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue:
        "Loan against my mutual funds, huh? A clever idea, actually, much better than selling them off when you need some cash. So I opened this app, and before I could even see an interest rate or anything, the very first screen demands my PAN number. Arey, who are you people first? I looked all over, but there was no HDFC, no ICICI, no company name I knew. They write \u2018encrypted and secure\u2019 in big letters, but that\u2019s what all the fraudsters also say on WhatsApp these days. My PAN is linked to everything\u2014my bank, my Aadhaar, my entire financial life! I just sat there staring at the screen for a whole minute, thinking this feels completely wrong, like some new online trap. Asking for such a critical detail right at the start, without earning any trust, is just foolish. I closed the app immediately; it felt less like a proper company and more like a stranger asking for my wallet on the street. My money is safe where it is; I don\u2019t need this kind of headache.",
      screen_monologues: [
        {
          screen_id: "view_1",
          view_name: "KYC \u2013 Secure Verification (Step 1/6)",
          internal_monologue:
            "PAN number? Right at the start? Who are these people? There is no logo of a bank or any company I know. They say \u2018encrypted and secure\u2019, but these days anyone can write that. If I give my PAN, they can see all my investment details. What if this is a scam? I will not proceed until I know more about this company.",
          reasoning:
            "I am not comfortable sharing my PAN number with an app that I don\u2019t recognize. There is no company logo or name, so I don\u2019t know who is asking for my information. This feels risky, even if they say it\u2019s secure.",
          emotional_state: "Suspicious, Cautious",
          trust_score: 3,
          clarity_score: 8,
          value_score: 4,
          time_seconds: 65,
          friction_points: [
            "Asking for PAN number without establishing trust",
            "No company logo or brand identity visible",
            "Concern about data security and privacy",
          ],
          selected_choice: "DROP_OFF",
          decision_outcome: "DROP_OFF",
        },
      ],
    },
    {
      persona_uuid: "792f6dc0d20b454f9264087941c1808e",
      demographics: {
        occupation: "No Occupation / Retired / Homemaker",
        age: 64,
        sex: "Female",
        zone: "Urban",
        state: "Maharashtra",
        district: "Nashik",
        monthly_income_inr: 35000,
        digital_literacy: 3,
        behavioral_archetype: "The Pragmatist",
        purchasing_power_tier: "Mid",
        employer_type: "government",
        primary_device: "Android",
        family_size: 3,
        existing_health_conditions: true,
        current_insurance: true,
        emi_comfort: "uncomfortable",
        marital_status: null,
        education_level: "Matric/Secondary",
        first_language: "Urdu",
      },
      professional_background:
        "Monde Dalvi, a retired homemaker with a talent for meticulous budgeting and community event coordination, blends precise organization with a creative flair for decorating Ganesh Chaturthi pandals, and they gracefully adapt to last\u2011minute changes while keeping the household running smoothly.",
      cultural_background:
        "Monde Dalvi is a 64\u2011year\u2011old Hindu homemaker from the urban setting of Nashik, Maharashtra. Growing up in a Marathi\u2011dominant city, she absorbed the vibrant local customs.",
      outcome: "dropped_off_at_view_3",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 265,
      overall_monologue:
        "Arre deva, first they ask for my PAN number and I immediately thought of those fraud calls my son warns me about. I almost stopped right there, but it said \u2018secure\u2019 so I took a chance. Then that OTP screen with the clock counting down, aiyo, my heart was racing trying to find the message before the time ran out! But when the next screen opened\u2026 Aai ga! Two lakh eighty-five thousand rupees! Are they completely mad? My entire house runs on \u20b935,000 a month; this feels like a huge trap they are setting. They show this big, scary number but don\u2019t even tell you what the monthly payment will be. How can anyone, especially a budget-minded person like me, decide anything without knowing the EMI? And what is this \u2018LAMF\u2019 they kept writing everywhere? It was all too confusing and felt very dishonest. I closed the whole thing right away; this Blink Money is not for people like me, it feels dangerous.",
      screen_monologues: [
        {
          screen_id: "view_1",
          view_name: "KYC \u2013 Secure Verification (Step 1/6)",
          internal_monologue:
            "PAN number? Arre deva... why do they need this? It feels like those fraud calls people warn about. But it says \u2018secure\u2019 and it\u2019s to check my mutual funds... I haven\u2019t checked those papers in years. Maybe this is an easy way to see. Let me just see the next screen. I won\u2019t put any bank details.",
          reasoning:
            "I am very hesitant to give my PAN number to an app I don\u2019t know, it feels risky. But, I am also curious to see how much my mutual funds are worth and what kind of loan I can get. I will go to the next step, but if it asks for anything more, I will stop and ask my son.",
          emotional_state: "Cautious, Hesitant",
          trust_score: 3,
          clarity_score: 6,
          value_score: 5,
          time_seconds: 90,
          friction_points: [
            "Asking for PAN number is very scary for me.",
            "I don\u2019t understand what \u2018central registries\u2019 means.",
            "I don\u2019t see any bank name or government logo here.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_2",
          view_name: "OTP Verification",
          internal_monologue:
            "Aiyo, this countdown... 19 seconds, 18 seconds... it\u2019s going so fast! Where is the message? I have to go out of this screen... okay, found it. The number is... let me write it down. Now back to the app. I hope I can type it correctly before the time runs out. This feels like an exam.",
          reasoning:
            "I have seen this OTP thing before with my bank. Even though this timer is making me nervous, I have already given my PAN details, so I should at least see what they are offering. It is just one more step.",
          emotional_state: "Anxious, Pressured",
          trust_score: 4,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 80,
          friction_points: [
            "The countdown timer (\u2018Resend OTP in 19s\u2019) is creating a lot of pressure.",
            "Having to switch between this app and my SMS messages is difficult and confusing.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_3",
          view_name: "Eligible Amount & Interest Rate",
          internal_monologue:
            "Aai ga! Two lakh eighty-five thousand rupees! Are they mad? My entire household runs on \u20b935,000 a month. This feels like a trap. And what is this \u2018LAMF\u2019? Why is the slider going up to five lakhs when they say I can only get two? It\u2019s not clear at all. They don\u2019t even show the monthly installment... how can anyone take a loan without knowing that? I will close this app right now, before I make a mistake.",
          reasoning:
            "This amount of \u20b92,85,000 is far too much for me, it\u2019s very scary to see such a big number. They have automatically selected it for me, which feels very pushy. Also, they are not telling me how much I have to pay back each month, so I cannot decide if I can afford it.",
          emotional_state: "Alarmed, Suspicious, Overwhelmed",
          trust_score: 2,
          clarity_score: 2,
          value_score: 1,
          time_seconds: 95,
          friction_points: [
            "Pre-selected loan amount is too high and intimidating.",
            "Monthly payment (EMI) is not shown.",
            "Confusing UI - slider maximum doesn\u2019t match eligibility amount.",
            "Financial jargon \u2018LAMF\u2019 is not explained.",
          ],
          selected_choice: "DROP_OFF",
          decision_outcome: "DROP_OFF",
        },
      ],
    },
    {
      persona_uuid: "500bfc662f9743dd85739baa7bc88727",
      demographics: {
        occupation: "No Occupation / Retired / Homemaker",
        age: 55,
        sex: "Female",
        zone: "Urban",
        state: "Uttar Pradesh",
        district: "Firozabad",
        monthly_income_inr: 45000,
        digital_literacy: 1,
        behavioral_archetype: "The Confused Novice",
        purchasing_power_tier: "Mid",
        employer_type: "self_employed",
        primary_device: "Android",
        family_size: 5,
        existing_health_conditions: true,
        current_insurance: false,
        emi_comfort: "comfortable",
        marital_status: null,
        education_level: "Illiterate",
        first_language: "Hindi",
      },
      professional_background:
        "An experienced home\u2011management specialist, Lalti Devi, a 55\u2011year\u2011old adept at budgeting cash, bargaining in the local market, preparing traditional festive sweets, and mediating community disputes, blends practical curiosity with a competitive edge as she eyes a home\u2011based pickle venture.",
      cultural_background:
        "Lalti Devi belongs to a middle\u2011class Hindu family in Firozabad, Uttar Pradesh. She grew up in a joint household where festivals were celebrated with great enthusiasm and the bustling local markets shaped her practical yet curious outlook.",
      outcome: "dropped_off_at_view_3",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 350,
      overall_monologue:
        "My son\u2019s friend said I could get some money from the phone for an emergency, using my savings. I thought I would just look, but my head started spinning with all the English words; they wanted some card number, not like my passbook. I felt so helpless, but I just pressed the button that looked right. Then my phone made a \u2018ting\u2019 sound and a new screen came asking for numbers, with other numbers at the bottom counting down fast-fast, making my heart pound. When the next screen showed two lakh eighty-five thousand rupees, I almost dropped the phone. Hey Bhagwan, how can someone just give that much money on a phone? This has to be a dhokha, a scam to steal everything. I couldn\u2019t understand that line going up or the small numbers, and I was terrified that if I touched anything else, all my savings would disappear. I just closed it all; this phone business is not for me. My hands are still shaking a little, it felt like a trap from the start.",
      screen_monologues: [
        {
          screen_id: "view_1",
          view_name: "KYC \u2013 Secure Verification (Step 1/6)",
          internal_monologue:
            "What are all these English words? I only understand the picture of the phone. They are asking for some card number... is it like my bank passbook? My son says it\u2019s called a PAN card. Why do they need it? Will they take my money from the bank? I just want to see how much money they can give, maybe I can just look and then close it.",
          reasoning:
            "I don\u2019t know what this \u2018PAN\u2019 is, but my son is here and he says it\u2019s a card from the government. He will fill it for me. I am only doing this to see if I can get some money for my pickle business, but I am very scared.",
          emotional_state: "Confused, Anxious, Dependent",
          trust_score: 2,
          clarity_score: 1,
          value_score: 3,
          time_seconds: 110,
          friction_points: [
            "I cannot read anything on the screen.",
            "I don\u2019t know what a \u2018PAN\u2019 is or why it is needed.",
            "I don\u2019t understand what \u2018mutual fund holdings\u2019 means.",
            "I am very scared of putting my personal information into a phone.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_2",
          view_name: "OTP Verification",
          internal_monologue:
            "What is this new thing? My phone made a sound and now this screen is asking for numbers. I can\u2019t read it. The numbers at the bottom are counting down, it\u2019s making me nervous! I had to call my son to figure this out. He found some message and typed the numbers in. I hope this is not some trick to take my money.",
          reasoning:
            "My son came and helped me. He said a message came on my phone with some numbers, and he put them in these boxes for me. I don\u2019t understand this \u2018OTP\u2019 but he said it is needed to go forward.",
          emotional_state: "Anxious, Dependent, Confused",
          trust_score: 2,
          clarity_score: 1,
          value_score: 3,
          time_seconds: 120,
          friction_points: [
            "Cannot understand what \u2018OTP\u2019 means",
            "Cannot read the instructions",
            "I don\u2019t know how to leave this screen to check my messages",
            "The countdown timer is very stressful",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_3",
          view_name: "Eligible Amount & Interest Rate",
          internal_monologue:
            "Hey Bhagwan, two lakh eighty-five thousand rupees? Just like that on a phone? This is not possible. This must be a scam. Why does this line go up to five lakh? I don\u2019t understand any of this. If I press the button, will they take money from my account? I need to show this to my son later, but for now I am closing this dabba.",
          reasoning:
            "It is showing too much money, I am scared. I don\u2019t know what all these numbers mean, it must be some kind of trick. I am not going to touch anything else, I need to close this.",
          emotional_state: "Terrified, Suspicious, Overwhelmed",
          trust_score: 1,
          clarity_score: 1,
          value_score: 1,
          time_seconds: 120,
          friction_points: [
            "The loan amount is alarmingly large and feels like a scam.",
            "I cannot read or understand any of the text, and the numbers are confusing (e.g., why does the slider go up to \u20b95,70,000?).",
          ],
          selected_choice: "DROP_OFF",
          decision_outcome: "DROP_OFF",
        },
      ],
    },
    {
      persona_uuid: "8a2b94b11c11420aa100f14e2acd6f35",
      demographics: {
        occupation: "No Occupation / Retired / Homemaker",
        age: 50,
        sex: "Female",
        zone: "Urban",
        state: "Uttar Pradesh",
        district: "Bijnor",
        monthly_income_inr: 45000,
        digital_literacy: 6,
        behavioral_archetype: "The Pragmatist",
        purchasing_power_tier: "Mid",
        employer_type: "self_employed",
        primary_device: "Android",
        family_size: 4,
        existing_health_conditions: true,
        current_insurance: true,
        emi_comfort: "comfortable",
        marital_status: null,
        education_level: "Graduate & above",
        first_language: "Hindi",
      },
      professional_background:
        "Anjana Devi, a retired household manager turned community mentor, leverages decades of budgeting, meal\u2011planning and self\u2011help\u2011group coordination to organise women\u2019s skill\u2011building workshops and local charity drives, applying practical \u2018jugaad\u2019 and a warm, collaborative style.",
      cultural_background:
        "Anjana Devi was born and raised in Bijnor, a historic town in western Uttar Pradesh where the cultural tapestry blends Punjabi, Hindi-Urdu, and Awadhi influences. Growing up in a joint-family environment, she absorbed the rhythm of everyday life marked by seasonal festivals such as Holi, Diwali, and more.",
      outcome: "dropped_off_at_view_3",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 165,
      overall_monologue:
        "I heard you could get money against your mutual funds, which seemed like a good \u2018jugaad\u2019 for the new sewing machines for our women\u2019s group. The start was simple enough, asking for my PAN and phone number, and the page said it was all secure. Achha, I thought, this must be how they check my investments. The OTP part was also fine, just like when I pay the electricity bill online\u2014a bit of a nuisance, but I know how to do it. But then the next page completely confused me; at the top it clearly said my eligibility was for \u20b92,85,000, but the slider thing below went all the way up to \u20b95,70,000! Arre, what is this chakkar? For a moment I just stared, thinking my eyes were playing tricks on me, or maybe I was reading it wrong. My mind immediately screamed \u201cgadbad hai\u201d\u2014if the numbers don\u2019t even match on their own screen, how can I trust them with my money? I just closed the application right there. It felt like they were trying to be too clever and pull a fast one, and I have seen enough of that to be careful. Now I feel it was a waste of my time, and I\u2019m a little annoyed. I\u2019ll just go to my regular bank; at least there I can talk to the manager and know there are no hidden tricks.",
      screen_monologues: [
        {
          screen_id: "view_1",
          view_name: "KYC \u2013 Secure Verification (Step 1/6)",
          internal_monologue:
            "Achha, PAN number and mobile number. This is how they will check my investments, I suppose. The page looks clean and says my information is secure, which is good. Still, I feel a little nervous giving my PAN to a new feature, but since it\u2019s within this app, it should be fine. Let\u2019s just see what eligibility they show.",
          reasoning:
            "This seems to be a standard step for any financial service, they always ask for PAN. Since this is inside an app I am already using, I will proceed cautiously to see what they are offering. I can always decide later if I don\u2019t want the loan.",
          emotional_state: "Cautious, Curious",
          trust_score: 6,
          clarity_score: 9,
          value_score: 6,
          time_seconds: 45,
          friction_points: [
            "Giving my PAN number to an app feels risky.",
            "I don\u2019t know what \u2018central registries\u2019 means.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_2",
          view_name: "OTP Verification",
          internal_monologue:
            "Achha, OTP. I know how to do this. Let me check my messages... here it is. This is just like when I pay my electricity bill online. It\u2019s a bit of a hassle, but at least it shows they are checking it\u2019s really me. I am still not sure about this app, but I am curious to see what happens next. The next step says \u2018Eligibility\u2019, so maybe I will finally see the details.",
          reasoning:
            "This OTP step is something I have seen on other apps like my bank\u2019s app and Google Pay, so it feels like a normal security check. I have already given my PAN, so I might as well complete this step to see what loan amount and interest rate they offer me.",
          emotional_state: "Cautious, Compliant",
          trust_score: 6,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 45,
          friction_points: [
            "Have to switch between apps to find the SMS with the code.",
            "Still haven\u2019t been shown any loan details or interest rates.",
          ],
          selected_choice: "CONTINUE",
          decision_outcome: "CONTINUE",
        },
        {
          screen_id: "view_3",
          view_name: "Eligible Amount & Interest Rate",
          internal_monologue:
            "Arre! Upar likha hai 2,85,000 ki eligibility hai, aur neeche slider mein 5,70,000 dikha raha hai. Yeh kya chakkar hai? Kahin koi gadbad toh nahi? Itna bada amount bina EMI bataye... main aage nahi jaa sakti. It feels unsafe, like they are trying to confuse me.",
          reasoning:
            "Why are there two different numbers for the loan amount? It says I am eligible for \u20b92,85,000 but the slider goes up to \u20b95,70,000. This seems like a mistake or a trick, I don\u2019t trust it. Also, they have not told me what the monthly kist will be, so how can I decide?",
          emotional_state: "Confused, Suspicious",
          trust_score: 3,
          clarity_score: 2,
          value_score: 4,
          time_seconds: 75,
          friction_points: [
            "The eligible amount (\u20b92,85,000) contradicts the maximum amount on the slider (\u20b95,70,000).",
            "The monthly payment (EMI) is not shown, making it impossible to judge affordability.",
            "The default selected loan amount is very high without any context on repayments.",
          ],
          selected_choice: "DROP_OFF",
          decision_outcome: "DROP_OFF",
        },
      ],
    },
  ],
};
