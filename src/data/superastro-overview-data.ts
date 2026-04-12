import type { SimulationData } from "@/types/simulation";

/**
 * SuperAstro — AI Astrology Chatbot Onboarding (Overview Demo)
 * 30 synthetic Indian personas. 18 completers, 12 drop-offs. 60% completion rate.
 * Flow: intro → otp → name → gender → marital → dob → time_of_birth → place_of_birth → journey_purpose → ai_chat
 * Used as demo data for the simulation overview page.
 */
export const superastroOverviewData: SimulationData = {
  simulation_id: "superastro_demo_001",
  flow_id: "superastro_onboarding_v1",
  flow_name: "SuperAstro \u2014 AI Astrology Onboarding",
  generated_at: "2026-04-10T14:30:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 30,
    completed: 18,
    dropped_off: 12,
    completion_rate_pct: 60.0,
    avg_time_to_complete_seconds: 180,
    dominant_plan: "Career",
    dominant_plan_pct: 38.9,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 30,
    margin_of_error_pct: 14.6,
    confidence_level: "80%",
    note: "Directional \u2014 useful for identifying themes, not for precise rates",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {
    Marriage: { count: 8, pct: 44.4 },
    Career: { count: 7, pct: 38.9 },
    Relationship: { count: 3, pct: 16.7 },
  },

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 18, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "intro", drop_offs: 5, drop_off_pct: 16.7 },
    { screen_id: "otp", drop_offs: 2, drop_off_pct: 6.7 },
    { screen_id: "dob", drop_offs: 2, drop_off_pct: 6.7 },
    { screen_id: "time_of_birth", drop_offs: 1, drop_off_pct: 3.3 },
    { screen_id: "place_of_birth", drop_offs: 1, drop_off_pct: 3.3 },
    { screen_id: "journey_purpose", drop_offs: 1, drop_off_pct: 3.3 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "Phone number required on first screen \u2014 astrology carries social stigma, linking phone identity feels invasive before any value is delivered",
      frequency: 12,
    },
    {
      friction:
        "DOB scroll picker requires scrolling back 20\u201330 years with no direct year entry",
      frequency: 7,
    },
    {
      friction:
        "Time of birth field creates anxiety \u2014 users worry inaccurate input will produce wrong predictions",
      frequency: 5,
    },
    {
      friction:
        "Journey purpose options too narrow \u2014 miss health, education, and family concerns",
      frequency: 4,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    intro: {
      avg_trust: 5.1,
      avg_clarity: 7.2,
      avg_value: 5.4,
      avg_time_s: 12,
      sample_size: 30,
    },
    otp: {
      avg_trust: 5.4,
      avg_clarity: 8.1,
      avg_value: 4.8,
      avg_time_s: 18,
      sample_size: 25,
    },
    name: {
      avg_trust: 5.8,
      avg_clarity: 8.8,
      avg_value: 5.2,
      avg_time_s: 10,
      sample_size: 23,
    },
    gender: {
      avg_trust: 6.0,
      avg_clarity: 8.6,
      avg_value: 5.6,
      avg_time_s: 8,
      sample_size: 23,
    },
    marital: {
      avg_trust: 6.2,
      avg_clarity: 8.4,
      avg_value: 5.8,
      avg_time_s: 10,
      sample_size: 23,
    },
    dob: {
      avg_trust: 6.0,
      avg_clarity: 6.2,
      avg_value: 6.4,
      avg_time_s: 22,
      sample_size: 23,
    },
    time_of_birth: {
      avg_trust: 5.8,
      avg_clarity: 6.0,
      avg_value: 6.2,
      avg_time_s: 25,
      sample_size: 21,
    },
    place_of_birth: {
      avg_trust: 6.4,
      avg_clarity: 6.8,
      avg_value: 6.6,
      avg_time_s: 18,
      sample_size: 20,
    },
    journey_purpose: {
      avg_trust: 6.8,
      avg_clarity: 7.4,
      avg_value: 7.2,
      avg_time_s: 15,
      sample_size: 19,
    },
    ai_chat: {
      avg_trust: 7.2,
      avg_clarity: 7.8,
      avg_value: 7.8,
      avg_time_s: 45,
      sample_size: 18,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "SuperAstro\u2019s onboarding converts 60% of users who download the app to the AI chat screen \u2014 a strong result for a 10-step flow collecting sensitive personal data. The intro screen (phone number) is the biggest friction point at 16.7% drop-off, driven by privacy concerns around sharing phone numbers for astrology. Users who make it past OTP verification show strong commitment. The journey purpose screen (Marriage/Career/Relationship) creates meaningful engagement, with Career being the most selected path.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "trust_issue",
      screen: "intro",
      finding:
        "Phone number required on first screen creates a trust barrier \u2014 16.7% of users drop off before engaging with any content",
      evidence:
        "5 of 12 total drop-offs occur at the intro screen. Trust scores average 5.1, the lowest across all screens. Privacy-conscious users and younger demographics express concern about linking their phone identity to an astrology app, citing social stigma and spam anxiety.",
      affected_segments: ["The Privacy Seeker", "The Curious Skeptic"],
      recommendation:
        "Allow anonymous entry with one free AI chat question before requiring phone verification. Collect phone number only when the user wants to save their birth chart or continue chatting.",
    },
    {
      severity: "major",
      type: "friction_point",
      screen: "dob",
      finding:
        "DOB scroll picker is fiddly on small screens \u2014 requires scrolling back 20\u201330 years with no direct year entry",
      evidence:
        "2 of 12 drop-offs at the DOB screen. Average time on this screen is 22 seconds, disproportionately high for a date entry. Users aged 30+ must scroll through hundreds of months. Clarity score drops to 6.2, indicating UI confusion.",
      affected_segments: ["The Budget Constrained", "The Devoted Believer"],
      recommendation:
        "Replace the scroll picker with a year-first selector (year grid \u2192 month \u2192 day) or allow direct keyboard date input in DD/MM/YYYY format.",
    },
    {
      severity: "minor",
      type: "confusion",
      screen: "time_of_birth",
      finding:
        "Time of birth field is optional but creates anxiety about accuracy \u2014 users worry wrong input will produce inaccurate predictions",
      evidence:
        "1 drop-off at this screen. Multiple personas hesitate and express uncertainty. Average time is 25 seconds as users deliberate. Several personas mention not knowing their exact birth time and feeling anxious that guessing will invalidate their chart.",
      affected_segments: [
        "The Curious Skeptic",
        "The Budget Constrained",
      ],
      recommendation:
        "Add a clear \u201cI don\u2019t know my exact time\u201d option with an explanation that the AI will use a default (sunrise) and note where predictions may vary. Reduce anxiety with reassuring copy.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "journey_purpose",
      finding:
        "Three journey options (Marriage/Career/Relationship) are too narrow \u2014 miss common concerns like health, education, and finances",
      evidence:
        "1 drop-off at journey_purpose. Users with multi-domain concerns (e.g., health + career) feel forced to pick one. Clarity score is 7.4 but several personas note their real concern is not listed.",
      affected_segments: ["The Devoted Believer"],
      recommendation:
        "Expand to 6\u20138 options including Health, Education, Finance, and Family. Allow multi-select for users with intersecting concerns.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "The highest-converting segment is emotionally motivated women in urban areas navigating relationship or marriage decisions. The lowest-converting segment is rural, lower-income users who find astrology interesting but distrust sharing personal data with an AI app.",
    high_propensity_segment:
      "Urban women 25\u201335 with monthly income >\u20b930K who are going through relationship or marriage decisions",
    low_propensity_segment:
      "Rural users and students with income <\u20b915K who find the concept interesting but don\u2019t trust sharing personal data",
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 12,
    screens: {
      intro: {
        total_drop_offs: 5,
        clusters: [
          {
            cluster_id: 1,
            label: "Privacy concerns about sharing phone number",
            persona_count: 3,
            representative_reasoning:
              "I\u2019m not giving my phone number to an astrology app \u2014 what if they sell my data or send me spam? My colleagues might see notifications from an astrology app on my phone.",
            sample_reasonings: [
              "Why does an astrology chatbot need my phone number? I just want to try it, not sign up for life.",
              "Astrology already carries a stigma at work. If my number is linked to this app and it shows up somewhere, I\u2019ll be embarrassed.",
              "I\u2019ll check out free horoscope sites instead \u2014 they don\u2019t need my personal details.",
            ],
          },
          {
            cluster_id: 2,
            label: "Skepticism about AI astrology quality",
            persona_count: 2,
            representative_reasoning:
              "AI-generated astrology? My family pandit has been reading charts for 40 years. I doubt a chatbot can match that level of nuance and spiritual understanding.",
            sample_reasonings: [
              "Real astrology requires human intuition. An AI reading a chart formula is just pattern matching.",
              "I tried AstroSage before and the predictions were generic. This will probably be the same.",
            ],
          },
        ],
      },
      dob: {
        total_drop_offs: 2,
        clusters: [
          {
            cluster_id: 1,
            label: "Don\u2019t know exact birth details",
            persona_count: 2,
            representative_reasoning:
              "I\u2019m not sure of my exact date of birth \u2014 my parents always celebrated on a different date than what\u2019s on my Aadhaar card. If I enter the wrong date, the predictions will be useless.",
            sample_reasonings: [
              "My birth certificate says one date, my family says another. I don\u2019t want to enter wrong information and get misleading guidance.",
              "I was born in a village and the exact date wasn\u2019t recorded properly. This picker doesn\u2019t have an \u2018approximate\u2019 option.",
            ],
          },
        ],
      },
    },
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "SuperAstro\u2019s onboarding is effective at converting emotionally motivated users but loses privacy-conscious and cost-sensitive segments at the gate",
    usability_score: 7,
    what_works: [
      {
        element: "Emotional journey purpose selection",
        why: "Asking Marriage/Career/Relationship before the AI chat creates personal investment \u2014 users who reach this screen feel the app understands their need",
        for_whom: "The Devoted Believer and emotionally-driven segments",
      },
      {
        element: "Progressive data collection builds astrological credibility",
        why: "Collecting name, gender, DOB, time, and place of birth mirrors what a human astrologer would ask \u2014 completers report this builds trust in the AI\u2019s accuracy",
        for_whom: "Users familiar with Vedic astrology consultation process",
      },
      {
        element: "AI chat screen delivers immediate value",
        why: "The terminal screen showing personalized astrological insights based on collected data has the highest trust (7.2) and value (7.8) scores in the entire flow",
        for_whom: "All segments who reach the final screen",
      },
    ],
    fix_recommendations: [
      {
        root_cause: "Phone number gate creates privacy anxiety before any value is delivered",
        screen: "intro",
        recommendation:
          "Allow anonymous trial with one free question before requiring phone verification",
        estimated_impact: "high",
        feasibility: "high",
        impact_feasibility_score: 9,
        affected_segment: "The Privacy Seeker, The Curious Skeptic",
        expected_uplift: "+8\u201312% completion rate",
      },
      {
        root_cause: "DOB scroll picker is unusable on mobile for users 30+",
        screen: "dob",
        recommendation:
          "Replace scroll picker with year-first grid selector or direct keyboard input",
        estimated_impact: "medium",
        feasibility: "high",
        impact_feasibility_score: 7,
        affected_segment: "All segments aged 30+",
        expected_uplift: "+3\u20135% completion rate",
      },
      {
        root_cause:
          "Time of birth field creates decision paralysis for users who don\u2019t know their exact birth time",
        screen: "time_of_birth",
        recommendation:
          "Add an \u2018I don\u2019t know\u2019 option with an explanation that a default (sunrise) will be used, and note which predictions may vary",
        estimated_impact: "low",
        feasibility: "high",
        impact_feasibility_score: 5,
        affected_segment: "The Budget Constrained, The Curious Skeptic",
        expected_uplift: "+1\u20132% completion rate",
      },
    ],
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "The Privacy Seeker",
    "The Devoted Believer",
    "The Curious Skeptic",
    "The Budget Constrained",
  ],

  // ── Segment Completion Summary ──────────────────────────────────────────────
  segment_completion_summary: [
    {
      segment: "The Devoted Believer",
      total: 8,
      completed: 6,
      dropped: 2,
      completion_pct: 75.0,
      top_drop_off_screen: "dob",
      top_drop_off_reason:
        "Unsure of exact birth details \u2014 worried inaccurate input will produce wrong kundli",
    },
    {
      segment: "The Privacy Seeker",
      total: 8,
      completed: 5,
      dropped: 3,
      completion_pct: 62.5,
      top_drop_off_screen: "intro",
      top_drop_off_reason:
        "Refuses to share phone number with an astrology app due to social stigma and spam concerns",
    },
    {
      segment: "The Curious Skeptic",
      total: 7,
      completed: 4,
      dropped: 3,
      completion_pct: 57.1,
      top_drop_off_screen: "intro",
      top_drop_off_reason:
        "Doubts AI astrology quality and is unwilling to share personal data for something they\u2019re not sure works",
    },
    {
      segment: "The Budget Constrained",
      total: 7,
      completed: 3,
      dropped: 4,
      completion_pct: 42.9,
      top_drop_off_screen: "intro",
      top_drop_off_reason:
        "Data costs and phone number sharing feel risky when monthly income is limited and free alternatives exist",
    },
  ],

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    intro: [
      {
        persona_uuid: "sa-drop-intro-001",
        persona_label: "Neha, 24, Content Writer, Pune",
        behavioral_archetype: "The Privacy Seeker",
        internal_monologue:
          "An astrology chatbot wants my phone number? No way. My roommates already tease me about reading my horoscope. If this app sends me SMS notifications, everyone will know. I\u2019ll just use the free Co-Star app instead.",
        reasoning:
          "Privacy concern outweighs curiosity. Social stigma of astrology among her peer group makes phone verification a dealbreaker.",
        emotional_state: "Wary \u2192 Anxious \u2192 Abandoned",
        trust_score: 3,
        clarity_score: 7,
        value_score: 4,
      },
      {
        persona_uuid: "sa-drop-intro-002",
        persona_label: "Arjun, 31, Bank Manager, Lucknow",
        behavioral_archetype: "The Curious Skeptic",
        internal_monologue:
          "AI astrology \u2014 interesting concept. But phone number on the first screen? I don\u2019t even know if this thing is any good yet. Let me see what it offers before I hand over my number. Oh, there\u2019s no skip option. I\u2019m out.",
        reasoning:
          "Wants to evaluate the product before committing personal information. No way to preview the AI chat without phone verification.",
        emotional_state: "Curious \u2192 Frustrated \u2192 Dismissed",
        trust_score: 4,
        clarity_score: 7,
        value_score: 5,
      },
    ],
    dob: [
      {
        persona_uuid: "sa-drop-dob-001",
        persona_label: "Kamla Devi, 52, Homemaker, Varanasi",
        behavioral_archetype: "The Devoted Believer",
        internal_monologue:
          "I want to ask about my son\u2019s marriage prospects. But this date picker is confusing \u2014 I have to scroll back to 1974? I\u2019m not even sure if my birthday is June 15 or June 18, the calendar was different back then. My pandit ji never needed an exact date from this phone thing.",
        reasoning:
          "Combination of UI difficulty (scroll picker) and uncertainty about exact birth date. Prefers the human astrologer\u2019s flexibility.",
        emotional_state: "Hopeful \u2192 Confused \u2192 Defeated",
        trust_score: 6,
        clarity_score: 4,
        value_score: 6,
      },
      {
        persona_uuid: "sa-drop-dob-002",
        persona_label: "Ravi Kumar, 28, Delivery Executive, Patna",
        behavioral_archetype: "The Budget Constrained",
        internal_monologue:
          "I filled my name and gender but now this date thing is asking me to scroll through all these months. My date of birth on Aadhaar is different from what my mother says. If I put the wrong one, the prediction will be wrong and I\u2019ll have wasted my time and data.",
        reasoning:
          "Discrepancy between official and family-known birth date creates accuracy anxiety. Limited data plan makes trial-and-error costly.",
        emotional_state: "Engaged \u2192 Uncertain \u2192 Abandoned",
        trust_score: 5,
        clarity_score: 5,
        value_score: 5,
      },
    ],
    time_of_birth: [
      {
        persona_uuid: "sa-drop-tob-001",
        persona_label: "Priya Sharma, 26, BPO Executive, Noida",
        behavioral_archetype: "The Curious Skeptic",
        internal_monologue:
          "Birth time? I have no idea what time I was born. My mom might know but I can\u2019t call her right now. If I just guess, will the predictions be completely wrong? There\u2019s no \u2018I don\u2019t know\u2019 button. I\u2019ll come back later... probably never.",
        reasoning:
          "Lack of birth time knowledge combined with no fallback option creates decision paralysis. The app implies precision is essential without offering alternatives.",
        emotional_state: "Engaged \u2192 Anxious \u2192 Gave up",
        trust_score: 5,
        clarity_score: 5,
        value_score: 6,
      },
    ],
  },

  // ── Persona Details (6 representative personas) ─────────────────────────────
  persona_details: [
    // ── Completers ────────────────────────────────────────────────────────────
    {
      persona_uuid: "sa-comp-001",
      demographics: {
        first_language: "Hindi",
        age: 29,
        occupation: "Software Engineer",
        district: "Bengaluru Urban",
        behavioral_archetype: "The Privacy Seeker",
      },
      professional_background:
        "Works at a mid-size IT company. Earns \u20b975K/month. Uses apps like AstroTalk occasionally but prefers anonymous access.",
      cultural_background:
        "Grew up in a Tamil household where astrology was consulted for major decisions. Now lives independently in Bengaluru and balances modern skepticism with cultural familiarity.",
      outcome: "completed",
      key_selections: { journey_purpose: "Career" },
      final_price_inr: null,
      total_time_seconds: 165,
      overall_monologue:
        "I almost left at the phone number screen but curiosity won. The AI chat actually mentioned my Saturn return which is exactly what my aunt\u2019s astrologer told me last month. Impressive for an AI.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "Phone number for astrology? I really don\u2019t want this app showing up in my call logs. But I\u2019m curious about the AI aspect...",
          reasoning:
            "Curiosity about AI-powered astrology overrides initial privacy hesitation. Uses a secondary number.",
          emotional_state: "Hesitant but curious",
          friction_points: [
            "Phone number required upfront",
            "No preview of what the AI offers",
          ],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 18,
        },
        {
          screen_id: "dob",
          view_name: "Date of Birth",
          internal_monologue:
            "Okay, DOB \u2014 standard for astrology. But this scroll picker is annoying, I have to go back to 1997. Wish I could just type it in.",
          reasoning:
            "Expects DOB collection for kundli generation. Frustrated by UI but data request itself is reasonable.",
          emotional_state: "Mildly frustrated",
          friction_points: ["Scroll picker slow on mobile"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 6,
          time_seconds: 20,
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose Selection",
          internal_monologue:
            "Career \u2014 definitely. I\u2019ve been thinking about switching jobs and want to know if this is a good time. This is actually the question I downloaded the app for.",
          reasoning:
            "Direct match between her concern and the available options. Feels personally invested now.",
          emotional_state: "Engaged",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 8,
          selected_choice: "Career",
        },
        {
          screen_id: "ai_chat",
          view_name: "AI Astrology Chat",
          internal_monologue:
            "Wow, it mentioned Saturn return and career transitions in 2026. That\u2019s actually specific to my chart. Not generic at all. I\u2019m going to save this.",
          reasoning:
            "AI response references specific planetary positions relevant to her birth chart. Feels personalized and credible.",
          emotional_state: "Pleasantly surprised",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 9,
          time_seconds: 52,
        },
      ],
    },
    {
      persona_uuid: "sa-comp-002",
      demographics: {
        first_language: "Marathi",
        age: 34,
        occupation: "Government School Teacher",
        district: "Pune",
        behavioral_archetype: "The Devoted Believer",
      },
      professional_background:
        "Government school teacher earning \u20b945K/month. Husband works in a private firm. Regularly consults astrologers for family decisions.",
      cultural_background:
        "Deeply rooted in Maharashtrian traditions. Consults the family jyotishi before major decisions. Has a strong belief in kundli matching and planetary influence.",
      outcome: "completed",
      key_selections: { journey_purpose: "Marriage" },
      final_price_inr: null,
      total_time_seconds: 195,
      overall_monologue:
        "This is like having a pandit ji on my phone. I asked about my daughter\u2019s marriage timing and the AI gave very specific answers about her 7th house lord. Much cheaper than the astrologer who charges \u20b91100 per session.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "Phone number? Of course, how else will they send me my predictions? I give my number to every app. Let me proceed.",
          reasoning:
            "No privacy concern. Phone number is a standard requirement in her mental model of app sign-ups.",
          emotional_state: "Neutral, willing",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 8,
        },
        {
          screen_id: "time_of_birth",
          view_name: "Time of Birth",
          internal_monologue:
            "I know my daughter\u2019s birth time \u2014 4:35 AM, it\u2019s written on the hospital certificate. This is exactly what a real astrologer asks. Good sign.",
          reasoning:
            "Has birth time readily available. The data request validates the app\u2019s astrological credibility in her eyes.",
          emotional_state: "Confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 12,
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose Selection",
          internal_monologue:
            "Marriage \u2014 yes, that\u2019s exactly why I\u2019m here. My daughter is 26 and we\u2019re looking for a good match. I want to know the right muhurat.",
          reasoning:
            "Perfect alignment between her concern and the available option. Feels the app understands her need.",
          emotional_state: "Hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 9,
          value_score: 8,
          time_seconds: 6,
          selected_choice: "Marriage",
        },
        {
          screen_id: "ai_chat",
          view_name: "AI Astrology Chat",
          internal_monologue:
            "It mentioned the 7th house lord and Jupiter\u2019s transit in 2026\u201327 being favorable for marriage. This is exactly what my pandit ji would say. And it\u2019s much cheaper!",
          reasoning:
            "AI response uses familiar Vedic astrology terminology. Aligns with what she\u2019s heard from human astrologers. Perceives high value.",
          emotional_state: "Delighted",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 8,
          value_score: 9,
          time_seconds: 60,
        },
      ],
    },
    {
      persona_uuid: "sa-comp-003",
      demographics: {
        first_language: "Hindi",
        age: 41,
        occupation: "Small Business Owner",
        district: "Jaipur",
        behavioral_archetype: "The Devoted Believer",
      },
      professional_background:
        "Runs a textiles shop in Jaipur. Monthly income \u20b960K. Consults astrologers before major business decisions like opening new branches or hiring.",
      cultural_background:
        "Rajasthani Marwari family with strong astrological traditions. Checks shubh muhurat for business dealings. Family has a long-standing relationship with their village jyotishi.",
      outcome: "completed",
      key_selections: { journey_purpose: "Career" },
      final_price_inr: null,
      total_time_seconds: 210,
      overall_monologue:
        "Good app. It told me Rahu\u2019s transit is not favorable for expansion until March 2027. My pandit said something similar last month. I\u2019ll use this for quick checks between proper consultations.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "Phone number? No problem. I give it to every WhatsApp group and business contact anyway. Let me see what this AI astrologer has to say.",
          reasoning:
            "Phone sharing is normalized in his business context. No privacy hesitation.",
          emotional_state: "Casual, pragmatic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 10,
        },
        {
          screen_id: "dob",
          view_name: "Date of Birth",
          internal_monologue:
            "15th March 1985. I know my birth details perfectly \u2014 they\u2019re on my kundli that my parents got made when I was born. This scrolling is a bit tedious though.",
          reasoning:
            "Has exact birth details from childhood kundli. Minor UI friction with picker but no blocker.",
          emotional_state: "Patient",
          friction_points: ["Scroll picker slow"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 6,
          time_seconds: 18,
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose Selection",
          internal_monologue:
            "Career \u2014 well, it\u2019s business expansion I want to ask about. Close enough. I wish there was a \u2018Business\u2019 option specifically.",
          reasoning:
            "Closest available option to his actual concern. Notes the limitation but proceeds.",
          emotional_state: "Slightly compromising",
          friction_points: ["No specific \u2018Business\u2019 option"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 12,
          selected_choice: "Career",
        },
      ],
    },
    // ── Drop-offs ─────────────────────────────────────────────────────────────
    {
      persona_uuid: "sa-drop-001",
      demographics: {
        first_language: "English",
        age: 24,
        occupation: "Content Writer",
        district: "Pune",
        behavioral_archetype: "The Privacy Seeker",
      },
      professional_background:
        "Freelance content writer earning \u20b925K/month. Active on social media. Reads horoscopes casually but considers it entertainment, not guidance.",
      cultural_background:
        "Modern urban upbringing. Parents are not particularly religious. Considers astrology as fun pop culture content rather than serious decision-making tool.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 15,
      overall_monologue:
        "Nope. Phone number for astrology? My roommates already tease me about my Co-Star obsession. Not linking my identity to an astrology app.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "AI astrology chatbot? Cool concept. But... phone number? Absolutely not. What if they send me notifications my roommates see? Or sell my number to telemarketers?",
          reasoning:
            "Social stigma around astrology in her peer group combined with spam anxiety makes phone verification a non-starter for a casual interest.",
          emotional_state: "Intrigued \u2192 Alarmed",
          friction_points: [
            "Phone number required upfront",
            "No skip or preview option",
            "Social stigma concern",
          ],
          decision_outcome: "DROP_OFF",
          trust_score: 3,
          clarity_score: 7,
          value_score: 4,
          time_seconds: 15,
        },
      ],
    },
    {
      persona_uuid: "sa-drop-002",
      demographics: {
        first_language: "Hindi",
        age: 22,
        occupation: "BA Student",
        district: "Gorakhpur",
        behavioral_archetype: "The Budget Constrained",
      },
      professional_background:
        "Final year BA student. Monthly allowance \u20b98K from parents. Uses a basic Android phone with limited data plan.",
      cultural_background:
        "Small-town UP background. Family consults local pandit for major decisions. She is curious about modern astrology apps but is extremely cost-conscious.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 25,
      overall_monologue:
        "I entered my number but the OTP used my data and it still didn\u2019t come through on the first try. By the time it worked, I\u2019d already spent 2 minutes and I still haven\u2019t seen anything useful.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "Okay, phone number. Fine, everyone asks for it. Let me see what this AI pandit can do for free.",
          reasoning:
            "Phone number sharing is normalized for her. Enters it without hesitation.",
          emotional_state: "Willing",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 7,
          value_score: 5,
          time_seconds: 10,
        },
        {
          screen_id: "otp",
          view_name: "OTP Verification",
          internal_monologue:
            "OTP is taking too long. My network here in Gorakhpur is terrible. It used my data to load this screen and the OTP still hasn\u2019t come. I can\u2019t waste more data waiting.",
          reasoning:
            "Poor network connectivity and limited data plan make the OTP wait feel costly. No value has been delivered yet.",
          emotional_state: "Impatient \u2192 Frustrated",
          friction_points: [
            "OTP delay on poor network",
            "Data consumption with no value yet",
          ],
          decision_outcome: "DROP_OFF",
          trust_score: 4,
          clarity_score: 8,
          value_score: 3,
          time_seconds: 15,
        },
      ],
    },
    {
      persona_uuid: "sa-drop-003",
      demographics: {
        first_language: "Hindi",
        age: 52,
        occupation: "Homemaker",
        district: "Varanasi",
        behavioral_archetype: "The Devoted Believer",
      },
      professional_background:
        "Homemaker managing household. Husband is a retired government employee with pension of \u20b935K/month. Uses smartphone mainly for WhatsApp and YouTube.",
      cultural_background:
        "Deeply religious household in Varanasi. Has a family pandit consulted for all major decisions. Downloaded the app after her neighbor showed it to her.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 85,
      overall_monologue:
        "I tried to fill in my birthday but the scroll thing confused me. My birthdate on my Aadhaar might be wrong anyway. I\u2019ll just ask pandit ji next time he visits.",
      screen_monologues: [
        {
          screen_id: "intro",
          view_name: "Phone Number Entry",
          internal_monologue:
            "My neighbor Sunita showed me this app. Let me try. Phone number \u2014 okay, I\u2019ll put my number. Sunita said it\u2019s safe.",
          reasoning:
            "Social proof from neighbor overcomes any privacy hesitation. Trusts personal recommendation.",
          emotional_state: "Cautiously hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 6,
          time_seconds: 15,
        },
        {
          screen_id: "name",
          view_name: "Name Entry",
          internal_monologue:
            "My name? Okay. K-A-M-L-A D-E-V-I. The keyboard is small but I can manage.",
          reasoning:
            "Straightforward screen. Minor difficulty with keyboard but manageable.",
          emotional_state: "Focused",
          friction_points: ["Small keyboard"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 20,
        },
        {
          screen_id: "dob",
          view_name: "Date of Birth",
          internal_monologue:
            "Date of birth? I was born in 1974 but this thing makes me scroll through so many months. And I\u2019m not even sure if it\u2019s June 15 or June 18 \u2014 the calendar was different then. Pandit ji never needed this phone thing.",
          reasoning:
            "Combination of scroll picker difficulty and birth date uncertainty. The human astrologer is more flexible and forgiving.",
          emotional_state: "Confused \u2192 Overwhelmed",
          friction_points: [
            "Scroll picker too complex",
            "Uncertain birth date",
            "No approximate option",
          ],
          decision_outcome: "DROP_OFF",
          trust_score: 5,
          clarity_score: 4,
          value_score: 5,
          time_seconds: 35,
        },
      ],
    },
  ],

  // ── Question Analysis (Payment Intent) ──────────────────────────────────────
  question_analysis: [
    {
      question_id: "payment_intent",
      question_text:
        "SuperAstro\u2019s free trial has ended. A paywall appears: to continue chatting with Mahesh Ji, you must subscribe. What do you do?",
      total_responses: 30,
      would_pay_count: 4,
      would_pay_pct: 13.3,
      would_not_pay_count: 26,
      action_distribution: {
        SUBSCRIBE_WEEKLY: {
          count: 2,
          pct: 6.7,
          personas: [
            {
              persona_uuid: "sa-pay-weekly-001",
              reasoning:
                "The AI accurately identified my career anxiety and Saturn return timing. \u20b999/week feels like pocket change compared to the \u20b9800 I paid for one AstroTalk session last month. I\u2019m emotionally invested now and want to keep chatting about my job switch timing.",
              willingness_to_pay_score: 8,
              max_monthly_price_inr: 399,
              income: 75000,
              occupation: "Software Engineer",
              age: 29,
              zone: "Urban",
              completed_flow: true,
            },
            {
              persona_uuid: "sa-pay-weekly-002",
              reasoning:
                "I\u2019m going through a rough patch with my partner and the AI\u2019s relationship insights were surprisingly specific. \u20b999/week is affordable and I don\u2019t want to commit to a full month yet. If the advice stays this good, I\u2019ll switch to monthly.",
              willingness_to_pay_score: 7,
              max_monthly_price_inr: 349,
              income: 55000,
              occupation: "HR Executive",
              age: 27,
              zone: "Urban",
              completed_flow: true,
            },
          ],
        },
        SUBSCRIBE_MONTHLY: {
          count: 1,
          pct: 3.3,
          personas: [
            {
              persona_uuid: "sa-pay-monthly-001",
              reasoning:
                "My family astrologer charges \u20b91100 for one visit and I have to travel 30 km to see him. If this AI can give similar guidance for \u20b9299/month, that\u2019s a bargain. I\u2019ll subscribe monthly until my daughter\u2019s marriage is settled in early 2027.",
              willingness_to_pay_score: 7,
              max_monthly_price_inr: 299,
              income: 45000,
              occupation: "Government School Teacher",
              age: 34,
              zone: "Urban",
              completed_flow: true,
            },
          ],
        },
        SUBSCRIBE_YEARLY: {
          count: 1,
          pct: 3.3,
          personas: [
            {
              persona_uuid: "sa-pay-yearly-001",
              reasoning:
                "I consult astrologers 3\u20134 times a year for business decisions \u2014 new hires, expansion timing, stock purchases. At \u20b92,499/year that\u2019s less than two sessions with my current astrologer. The AI is available 24/7 which is better for quick checks before business meetings.",
              willingness_to_pay_score: 8,
              max_monthly_price_inr: 499,
              income: 120000,
              occupation: "Small Business Owner",
              age: 43,
              zone: "Urban",
              completed_flow: true,
            },
          ],
        },
        NOT_NOW_MAYBE_LATER: {
          count: 12,
          pct: 40.0,
          personas: [
            {
              persona_uuid: "sa-later-001",
              reasoning:
                "The AI gave good general guidance but I still need my pandit ji for specific muhurat calculations. I\u2019ll use the free version for now and subscribe if the predictions prove accurate over the next month.",
              willingness_to_pay_score: 4,
              max_monthly_price_inr: 199,
              income: 60000,
              occupation: "Small Business Owner",
              age: 41,
              zone: "Urban",
              completed_flow: true,
            },
            {
              persona_uuid: "sa-later-002",
              reasoning:
                "Interesting app but I need to see if the career prediction actually comes true. If the job change it predicted for Q3 2026 happens, I\u2019ll pay. Right now it\u2019s just another AI telling me things I want to hear.",
              willingness_to_pay_score: 3,
              max_monthly_price_inr: 149,
              income: 40000,
              occupation: "Bank Clerk",
              age: 32,
              zone: "Semi-urban",
              completed_flow: true,
            },
            {
              persona_uuid: "sa-later-003",
              reasoning:
                "I liked the relationship reading but \u20b9299/month adds up. Let me finish my semester exams first and think about it when I have fewer expenses. Maybe in July when my internship starts.",
              willingness_to_pay_score: 3,
              max_monthly_price_inr: 99,
              income: 12000,
              occupation: "Engineering Student",
              age: 21,
              zone: "Urban",
              completed_flow: true,
            },
            {
              persona_uuid: "sa-later-004",
              reasoning:
                "The marriage timing prediction was helpful but my husband makes financial decisions. I need to ask him if we can add another subscription. Maybe next month when we review expenses.",
              willingness_to_pay_score: 4,
              max_monthly_price_inr: 149,
              income: 35000,
              occupation: "Homemaker",
              age: 38,
              zone: "Semi-urban",
              completed_flow: true,
            },
          ],
        },
        WILL_NOT_PAY: {
          count: 14,
          pct: 46.7,
          personas: [
            {
              persona_uuid: "sa-nopay-001",
              reasoning:
                "I\u2019m a student with \u20b98K/month allowance. \u20b9299/month is nearly my entire discretionary budget. I already screenshot the free guidance. I\u2019ll ask my local pandit if I need more \u2014 he doesn\u2019t charge our family.",
              willingness_to_pay_score: 1,
              max_monthly_price_inr: 0,
              income: 8000,
              occupation: "BA Student",
              age: 22,
              zone: "Rural",
              completed_flow: false,
            },
            {
              persona_uuid: "sa-nopay-002",
              reasoning:
                "I didn\u2019t even get past the phone number screen. I\u2019m not paying for something I couldn\u2019t try. Free horoscope apps and Instagram astrology pages give me enough entertainment without requiring my personal data.",
              willingness_to_pay_score: 1,
              max_monthly_price_inr: 0,
              income: 25000,
              occupation: "Content Writer",
              age: 24,
              zone: "Urban",
              completed_flow: false,
            },
            {
              persona_uuid: "sa-nopay-003",
              reasoning:
                "AI astrology is not real astrology. My family\u2019s pandit reads the actual chart, considers your face, your voice, your family history. A chatbot doing \u2018pattern matching\u2019 on planetary positions is not worth paying for. Maybe if a real astrologer was on the other end.",
              willingness_to_pay_score: 1,
              max_monthly_price_inr: 0,
              income: 35000,
              occupation: "Retired Government Employee",
              age: 58,
              zone: "Semi-urban",
              completed_flow: false,
            },
            {
              persona_uuid: "sa-nopay-004",
              reasoning:
                "AstroTalk gives me access to real human astrologers starting at \u20b915/minute. For \u20b9299/month on SuperAstro I get unlimited AI chat, but I don\u2019t need unlimited \u2014 I just need one good answer about my daughter\u2019s marriage. I\u2019d rather pay \u20b9150 for a 10-minute human session.",
              willingness_to_pay_score: 2,
              max_monthly_price_inr: 49,
              income: 42000,
              occupation: "Accountant",
              age: 47,
              zone: "Urban",
              completed_flow: true,
            },
          ],
        },
      },
      avg_willingness_to_pay_score: 2.8,
      avg_max_monthly_price_inr: 89,
      top_reasons_against: [
        {
          reason:
            "Monthly income too low to justify \u20b9299/month for astrology",
          frequency: 14,
        },
        {
          reason:
            "AI-generated astrology doesn\u2019t feel trustworthy enough for personal decisions",
          frequency: 11,
        },
        {
          reason:
            "Free alternatives available \u2014 can ask family pandit or read online horoscopes",
          frequency: 9,
        },
        {
          reason:
            "Concerned about data privacy \u2014 already shared birth details, don\u2019t want payment info stored",
          frequency: 7,
        },
        {
          reason:
            "Need more than one session to judge if the AI is actually accurate",
          frequency: 6,
        },
        {
          reason:
            "AstroTalk offers real human astrologers for similar prices",
          frequency: 4,
        },
      ],
    },
  ],
} as const;
