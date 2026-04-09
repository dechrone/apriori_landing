import type { SimulationData } from "@/types/simulation";

/**
 * SuperAstro — AI Astrology Chatbot Onboarding Flow
 * AI-powered Vedic astrology platform offering ₹1 chat access.
 * 100 synthetic Indian personas from metro + NRI segments.
 * 62 completers, 38 drop-offs. 62% completion rate.
 * Flow: intro_mobile → video_ad → otp_verify → name_entry → gender_select → dob_picker → time_of_birth → marital_status → journey_purpose → place_of_birth → ai_chat
 * Used as sample/demo data for the simulation report UI.
 */
export const superastroSimData: SimulationData = {
  simulation_id: "superastro-onboarding-sim-20260410-001",
  flow_id: "superastro_onboarding_v1",
  flow_name: "SuperAstro — AI Astrology Onboarding",
  generated_at: "2026-04-10T10:00:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 100,
    completed: 62,
    dropped_off: 38,
    completion_rate_pct: 62.0,
    avg_time_to_complete_seconds: 94,
    dominant_plan: "N/A",
    dominant_plan_pct: 0,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 100,
    margin_of_error_pct: 6.5,
    confidence_level: "90%",
    note: "Sample size of 100 provides strong directional signal at 90% confidence (\u00b16.5%). Sub-segment sizes of 14-15 are adequate for directional analysis. Increase to 200+ for statistically significant sub-segment comparisons.",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {},

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 62, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "intro_mobile", drop_offs: 8, drop_off_pct: 8.0 },
    { screen_id: "video_ad", drop_offs: 6, drop_off_pct: 6.0 },
    { screen_id: "ai_chat", drop_offs: 6, drop_off_pct: 6.0 },
    { screen_id: "journey_purpose", drop_offs: 4, drop_off_pct: 4.0 },
    { screen_id: "dob_picker", drop_offs: 3, drop_off_pct: 3.0 },
    { screen_id: "place_of_birth", drop_offs: 3, drop_off_pct: 3.0 },
    { screen_id: "marital_status", drop_offs: 2, drop_off_pct: 2.0 },
    { screen_id: "otp_verify", drop_offs: 2, drop_off_pct: 2.0 },
    { screen_id: "time_of_birth", drop_offs: 2, drop_off_pct: 2.0 },
    { screen_id: "name_entry", drop_offs: 1, drop_off_pct: 1.0 },
    { screen_id: "gender_select", drop_offs: 1, drop_off_pct: 1.0 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "Phone number gate for astrology app — astrology carries social stigma, linking phone identity feels risky for privacy-conscious users",
      frequency: 18,
    },
    {
      friction:
        "10-screen onboarding for a \u20b91 app — ad promises instant chat ('Chat NOW at \u20b91') but reality is a long intake form before any astrological value",
      frequency: 15,
    },
    {
      friction:
        "Generic AI response does not match ad-specific promise — users expect answers to their specific question, not generic planetary transits",
      frequency: 12,
    },
    {
      friction:
        "Journey purpose options too narrow — Marriage/Career/Relationship miss common needs like health, education, family disputes, and financial decisions",
      frequency: 9,
    },
    {
      friction:
        "City picker fails NRI users — no search functionality, smaller Indian cities and international locations missing from dropdown",
      frequency: 7,
    },
    {
      friction:
        "DOB picker is a calendar scroll — requires scrolling back 20-30 years, no direct year entry or keyboard input option",
      frequency: 6,
    },
    {
      friction:
        "Time of birth field is mandatory — many users don't know their exact birth time and there's no 'approximate' or 'don't know' option",
      frequency: 5,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    intro_mobile: {
      avg_trust: 5.2,
      avg_clarity: 7.4,
      avg_value: 5.8,
      avg_time_s: 8,
      sample_size: 100,
    },
    video_ad: {
      avg_trust: 5.8,
      avg_clarity: 7.0,
      avg_value: 6.4,
      avg_time_s: 15,
      sample_size: 92,
    },
    otp_verify: {
      avg_trust: 5.0,
      avg_clarity: 8.2,
      avg_value: 4.8,
      avg_time_s: 6,
      sample_size: 86,
    },
    name_entry: {
      avg_trust: 5.4,
      avg_clarity: 8.6,
      avg_value: 5.0,
      avg_time_s: 5,
      sample_size: 84,
    },
    gender_select: {
      avg_trust: 5.6,
      avg_clarity: 8.4,
      avg_value: 5.2,
      avg_time_s: 3,
      sample_size: 83,
    },
    dob_picker: {
      avg_trust: 5.6,
      avg_clarity: 6.0,
      avg_value: 5.6,
      avg_time_s: 14,
      sample_size: 82,
    },
    time_of_birth: {
      avg_trust: 5.4,
      avg_clarity: 6.2,
      avg_value: 5.8,
      avg_time_s: 12,
      sample_size: 79,
    },
    marital_status: {
      avg_trust: 5.8,
      avg_clarity: 7.8,
      avg_value: 5.4,
      avg_time_s: 4,
      sample_size: 77,
    },
    journey_purpose: {
      avg_trust: 5.6,
      avg_clarity: 6.0,
      avg_value: 5.8,
      avg_time_s: 8,
      sample_size: 75,
    },
    place_of_birth: {
      avg_trust: 5.8,
      avg_clarity: 5.8,
      avg_value: 5.6,
      avg_time_s: 10,
      sample_size: 71,
    },
    ai_chat: {
      avg_trust: 6.2,
      avg_clarity: 6.8,
      avg_value: 6.8,
      avg_time_s: 22,
      sample_size: 68,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "SuperAstro's onboarding collects the right data for accurate Vedic astrology but delivers it in the wrong order. Users arriving from video ads expecting instant chat access ('Chat NOW at \u20b91') encounter a 10-screen intake form before any astrological value. The phone number gate is the single biggest conversion killer because astrology carries social stigma \u2014 linking phone identity to an astrology app feels risky for privacy-conscious users. Completers tend to be devotees who expect data collection for kundli generation, while droppers are younger, privacy-sensitive users who wanted a quick, anonymous experience.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "trust_issue",
      screen: "intro_mobile",
      finding:
        "Phone number gate on first screen for an astrology app creates social-stigma-driven privacy anxiety \u2014 8% drop-off before onboarding begins",
      evidence:
        "8 of 38 drop-offs occur at intro_mobile. Privacy-Seeking Young Professionals and Gen Z astro-curious users refuse to link their phone number to an astrology platform. Trust scores drop to 5.2 avg. Multiple personas mention fear of SMS notifications visible to colleagues or family.",
      affected_segments: ["Privacy-Seeking Young Professionals", "Gen Z astro-curious"],
      recommendation:
        "Allow anonymous trial with one free question before requiring phone verification. Collect phone only when user wants to save their kundli or continue chatting.",
    },
    {
      severity: "critical",
      type: "friction_point",
      screen: "ai_chat",
      finding:
        "Generic planetary transit response fails to address the specific emotional question that drove the user to download \u2014 6% drop-off at the moment of truth",
      evidence:
        "6 of 38 drop-offs occur at ai_chat, the final screen. Users who filled 10 screens of personal data expect a personalized answer to their specific life question. Instead they receive generic Venus/Saturn transit analysis. Life Transition users seeking answers about specific people or events feel betrayed by the mismatch.",
      affected_segments: ["Life Transition users", "AstroTalk-priced-out users"],
      recommendation:
        "Use the journey_purpose selection and ad creative context to personalize the first AI response. Reference the user's specific concern before expanding into chart analysis.",
    },
    {
      severity: "major",
      type: "friction_point",
      screen: "journey_purpose",
      finding:
        "Three journey options (Marriage/Career/Relationship) are too narrow \u2014 miss health, education, financial, and family dispute concerns that drive astrology consultation",
      evidence:
        "4 of 38 drop-offs at journey_purpose. Users pause, re-read options, and several report feeling their concern doesn't fit. Women 30-50 managing household spiritual decisions often have multi-domain concerns. Clarity score 6.0 is lowest among selection screens.",
      affected_segments: ["Women 30-50 managing household spiritual decisions", "Sri Mandir devotees"],
      recommendation:
        "Expand to 6-8 journey options including Health, Education, Finance, Family, and an 'Other' free-text field. Allow multi-select for users with intersecting concerns.",
    },
    {
      severity: "major",
      type: "confusion",
      screen: "place_of_birth",
      finding:
        "City picker dropdown has no search functionality and misses smaller Indian cities and international locations \u2014 blocks NRI users entirely",
      evidence:
        "3 of 38 drop-offs at place_of_birth. NRI diaspora users born in Tier-2/3 cities like Jamnagar, Bhilai, or Rourkela cannot find their birthplace. No international city support for users born outside India. Vikram from Dubai couldn't complete because Jamnagar wasn't listed.",
      affected_segments: ["NRI diaspora", "Life Transition users from smaller cities"],
      recommendation:
        "Replace dropdown with autocomplete search field supporting all Indian cities (pin code database) and major international cities. Add manual lat/long entry as fallback for astrology accuracy.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "dob_picker",
      finding:
        "Calendar scroll DOB picker requires scrolling back 20-30 years \u2014 no direct year entry or keyboard input",
      evidence:
        "3 of 38 drop-offs at dob_picker. Users aged 30+ must scroll through 360+ months to reach their birth year. Average time on this screen (14s) is disproportionately high for a simple data entry. Several personas express frustration at the UX.",
      affected_segments: ["All segments aged 30+"],
      recommendation:
        "Add direct year/month selector or allow keyboard date entry (DD/MM/YYYY). Show a year grid first, then month, then day.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "Sharp divide between devotee-minded users who expect and accept data collection for accurate kundli generation (70-80% completion) and privacy-first younger users who wanted anonymous, instant astrological guidance (35-45% completion). Women 30-50 managing household spiritual decisions complete at 75% \u2014 they're familiar with providing birth details for jyotish. Gen Z and young professionals drop at the phone gate or generic AI response. NRI users face a unique UX blocker at the city picker.",
    high_propensity_segment:
      "Sri Mandir devotees with dosha concerns \u2014 already provide birth details to family pandits, expect data collection for kundli, value Vedic accuracy over speed, and are willing to pay for remedies.",
    low_propensity_segment:
      "Privacy-Seeking Young Professionals (40% completion \u2014 phone stigma barrier) and Gen Z astro-curious (42% \u2014 want instant gratification, not a 10-screen form).",
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "SuperAstro collects the right data but in the wrong order \u2014 move value delivery before data collection",
    what_works: [
      {
        element: "OTP verification flow (S3) is seamless and fast",
        why: "Standard Indian UX pattern \u2014 users expect OTP for phone-based apps and the auto-read works reliably",
        for_whom: "All segments \u2014 clarity score 8.2 on this screen",
      },
      {
        element: "Skip option on marital status (S8) reduces friction",
        why: "Respects that marital status is sensitive data \u2014 users who skip still complete at comparable rates",
        for_whom: "Gen Z astro-curious, Privacy-Seeking Young Professionals",
      },
      {
        element: "AI chat quality (S11) is strong for matched users",
        why: "When journey purpose aligns with ad creative and user expectation, the Vedic analysis with house-specific insights feels genuinely personalized and knowledgeable",
        for_whom: "Sri Mandir devotees, Women 30-50 household spiritual, completers who selected Marriage",
      },
    ],
    what_needs_fixing: [
      {
        element: "Phone number gate on intro screen (S1/S2)",
        problem: "Astrology carries social stigma \u2014 linking phone identity to an astrology app is the single biggest conversion killer at 8% drop-off",
        for_whom: "Privacy-Seeking Young Professionals, Gen Z astro-curious",
        fix: "Allow anonymous trial with one free question before requiring phone verification. Collect phone only for kundli save or continued chat.",
        priority: "P0",
      },
      {
        element: "10-screen onboarding length (S3-S10)",
        problem: "Ad promises 'Chat NOW at \u20b91' but users face 10 data screens before any astrological value \u2014 expectation mismatch drives cumulative attrition",
        for_whom: "AstroTalk-priced-out users, Gen Z astro-curious, Life Transition users",
        fix: "Implement skip-to-chat progressive profiling \u2014 show a teaser reading after phone verify, then collect remaining data inline during the chat experience.",
        priority: "P1",
      },
      {
        element: "Generic AI response at S11",
        problem: "First AI response gives generic planetary transit analysis instead of addressing the specific emotional question from the user's ad click and journey purpose selection",
        for_whom: "Life Transition users, AstroTalk-priced-out users, Relationship-focused users",
        fix: "Make first response ad-aware \u2014 reference the specific creative that drove acquisition and the journey purpose selection before expanding into chart analysis.",
        priority: "P1",
      },
      {
        element: "Journey purpose options too narrow (S9)",
        problem: "Only 3 options (Marriage/Career/Relationship) miss health, education, finance, and family concerns \u2014 4% drop-off from users who don't see their need reflected",
        for_whom: "Women 30-50 household spiritual, Sri Mandir devotees with multi-domain concerns",
        fix: "Expand to 6-8 options with multi-select support and an 'Other' free-text field. Add Health, Education, Finance, Family as standard options.",
        priority: "P2",
      },
    ],
    quick_wins: [
      {
        change: "Add 'Your data is encrypted and never shared' badge next to phone number field with lock icon",
        expected_uplift: "Estimated 2-3% improvement in intro_mobile completion by addressing privacy anxiety",
      },
      {
        change: "Replace calendar scroll DOB picker with year grid \u2192 month \u2192 day selector",
        expected_uplift: "Estimated 1-2% improvement and 6s reduction in avg screen time",
      },
      {
        change: "Add 'I don't know my exact time' option to time_of_birth with approximate range selector",
        expected_uplift: "Estimated 1-2% improvement by unblocking users without birth time records",
      },
    ],
    fix_recommendations: [
      {
        root_cause: "Phone number as first gate creates stigma-driven privacy barrier for astrology app",
        screen: "intro_mobile",
        recommendation: "Allow anonymous trial question before phone verification \u2014 collect phone only for saving kundli or continued chat",
        estimated_impact: "high",
        feasibility: "high",
        impact_feasibility_score: 9,
        affected_segment: "Privacy-Seeking Young Professionals, Gen Z astro-curious",
        expected_uplift: "Estimated 6-8% increase in completion rate by removing the upfront phone gate",
      },
      {
        root_cause: "Ad creative promises instant chat but onboarding delivers 10-screen data intake form",
        screen: "video_ad",
        recommendation: "Implement progressive profiling \u2014 show teaser reading after minimal data (name + DOB), collect remaining fields inline during chat",
        estimated_impact: "high",
        feasibility: "medium",
        impact_feasibility_score: 8,
        affected_segment: "AstroTalk-priced-out users, Gen Z astro-curious",
        expected_uplift: "Estimated 5-7% increase by reducing perceived onboarding length",
      },
      {
        root_cause: "First AI response is generic planetary analysis that ignores the specific emotional question driving the user's download",
        screen: "ai_chat",
        recommendation: "Make first AI response ad-aware and journey-purpose-aware \u2014 address the user's specific question before expanding into chart analysis",
        estimated_impact: "high",
        feasibility: "medium",
        impact_feasibility_score: 7,
        affected_segment: "Life Transition users, Relationship-focused users",
        expected_uplift: "Estimated 4-5% increase by matching AI output to user expectation at the moment of truth",
      },
      {
        root_cause: "Journey purpose options too narrow \u2014 only 3 categories miss major astrology consultation reasons",
        screen: "journey_purpose",
        recommendation: "Expand to 6-8 options (add Health, Education, Finance, Family, Other) with multi-select and free-text fallback",
        estimated_impact: "medium",
        feasibility: "high",
        impact_feasibility_score: 6,
        affected_segment: "Women 30-50 household spiritual, Sri Mandir devotees",
        expected_uplift: "Estimated 2-3% increase by ensuring all users find a matching purpose",
      },
      {
        root_cause: "City picker dropdown lacks search and omits Tier-2/3 Indian cities and international locations",
        screen: "place_of_birth",
        recommendation: "Replace dropdown with autocomplete search field supporting all Indian pin codes and major international cities",
        estimated_impact: "medium",
        feasibility: "high",
        impact_feasibility_score: 6,
        affected_segment: "NRI diaspora, users from smaller cities",
        expected_uplift: "Estimated 2-3% increase by unblocking NRI and Tier-2/3 city users",
      },
    ],
    usability_score: 54,
    emotional_journey_map: {
      completers:
        "Curious (intro_mobile \u2014 '\u20b91 mein kundli? Let me try') \u2192 Engaged (video_ad \u2014 'this feels scientific, not superstitious') \u2192 Cautious (otp_verify \u2014 'fine, OTP is standard') \u2192 Routine (name/gender/dob \u2014 'standard info, my pandit asks the same') \u2192 Invested (time_of_birth \u2014 'I called my mom to get this, I'm committed now') \u2192 Purposeful (journey_purpose \u2014 'Marriage \u2014 that's exactly why I'm here') \u2192 Hopeful (place_of_birth \u2014 'almost there, one more screen') \u2192 Satisfied (ai_chat \u2014 'Manglik status and 7th house analysis \u2014 this AI knows Vedic astrology')",
      drop_offs:
        "Impulsive (intro_mobile \u2014 'the ad was compelling but giving my phone number to an astrology app? What if someone sees?') \u2192 [EXIT] OR Skeptical (video_ad \u2014 'this feels like every other astrology scam ad on YouTube') \u2192 [EXIT] OR Fatigued (dob_picker \u2014 'I've filled 5 screens and still no astrology... how many more?') \u2192 [EXIT] OR Confused (journey_purpose \u2014 'health concern but only Marriage/Career/Relationship? None of these fit') \u2192 [EXIT] OR Blocked (place_of_birth \u2014 'my city isn't in the dropdown and there's no search') \u2192 [EXIT] OR Disappointed (ai_chat \u2014 'I told you about my breakup and you're talking about Venus transiting my 7th house? That's not what I asked') \u2192 [EXIT]",
    },
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 4,
    total_drop_offs_analyzed: 23,
    screens: {
      intro_mobile: {
        total_drop_offs: 8,
        clusters: [
          {
            cluster_id: 1,
            label: "Phone number stigma \u2014 social risk of linking identity to astrology app",
            persona_count: 5,
            representative_reasoning:
              "I tapped the Instagram ad because the career guidance angle spoke to me at 2 AM when I was stressed about a job decision. But the very first screen wants my phone number? For an astrology app? What if this shows up in my UPI payment history or my phone records? I'm a senior engineer at Amazon \u2014 if anyone at work found out I consulted an astrologer, my credibility as a rational, data-driven person would be destroyed. The ad was compelling but the social risk is too high to link my real phone number.",
          },
          {
            cluster_id: 2,
            label: "Spam fear \u2014 past experience with Indian app phone number collection",
            persona_count: 3,
            representative_reasoning:
              "Every Indian app that takes your phone number starts spamming you with WhatsApp messages, push notifications, and sometimes even calls. I gave my number to Astrotalk once and got 3 WhatsApp messages a day about 'today's rashifal' and 'special puja offers.' I had to block them. I'm not giving another astrology app my number. Let me try the app anonymously first, then I'll decide if it's worth sharing my details.",
          },
        ],
      },
      video_ad: {
        total_drop_offs: 6,
        clusters: [
          {
            cluster_id: 1,
            label: "Scam pattern recognition \u2014 video ad feels like typical astrology fraud",
            persona_count: 4,
            representative_reasoning:
              "The in-app video ad looks exactly like those Instagram astrology scam reels my cousin falls for. 'AI-powered' and 'scientific' are just buzzwords. My grandfather was a real jyotishi who studied for 20 years. You can't replace that with an app. The production quality of this video reminds me of those 'earn \u20b950,000 from home' ads. I don't trust this platform to give me real Vedic astrology.",
          },
          {
            cluster_id: 2,
            label: "Ad-to-experience mismatch \u2014 promised chat, got video instead",
            persona_count: 2,
            representative_reasoning:
              "The Instagram ad said 'Chat NOW at \u20b91' so I expected to be chatting with an astrologer by now. Instead I'm watching another ad inside the app? I already saw the ad on Instagram, I don't need to see it again in a different format. Just take me to the chat. Every extra screen between me and the chat reduces my confidence that this app will deliver.",
          },
        ],
      },
      journey_purpose: {
        total_drop_offs: 4,
        clusters: [
          {
            cluster_id: 1,
            label: "Options don't match actual consultation need",
            persona_count: 3,
            representative_reasoning:
              "I'm here because my mother-in-law is convinced there's a Kaal Sarp Dosh in our family kundli and it's causing my husband's business losses. None of these options fit \u2014 'Marriage' doesn't cover family dosha concerns, 'Career' is too individual, and 'Relationship' is about romantic issues. My concern is family spiritual wellness. If the app can't even categorize my problem correctly, how will it give me an accurate reading?",
          },
          {
            cluster_id: 2,
            label: "Multiple overlapping concerns \u2014 forced single choice feels reductive",
            persona_count: 1,
            representative_reasoning:
              "I want to ask about both career AND marriage timing. My parents want me married by 28 but I also want to know if this is the right year to switch jobs. Astrology should look at the whole chart, not one isolated topic. Making me pick one feels like the app is just going to give me a template response instead of a real chart reading.",
          },
        ],
      },
      ai_chat: {
        total_drop_offs: 6,
        clusters: [
          {
            cluster_id: 1,
            label: "Generic response fails to address specific emotional question",
            persona_count: 4,
            representative_reasoning:
              "I filled out TEN screens of personal data. Date of birth, exact time, place of birth. I selected 'Relationship' because I want to know if Kartik misses me after our breakup. The AI response talks about 'Venus transiting through your 7th house indicates relationship evolution' and 'Saturn's influence on your natal Venus suggests a period of emotional growth.' That's not what I asked. I wanted 'Does he miss you? Will he come back?' Not a planetary weather report. The app knows my specific concern but gave me a horoscope-column-level generic response. I feel cheated \u2014 10 screens for THIS?",
          },
          {
            cluster_id: 2,
            label: "AI accuracy doubt \u2014 response feels auto-generated, not Vedic",
            persona_count: 2,
            representative_reasoning:
              "I know enough about Vedic astrology to recognize that this AI response is surface-level. It mentioned my Manglik status (correct) but then talked about 'planetary alignments' in vague Western astrology terms. A real Vedic astrologer would reference specific dashas, antardashas, and transit relationships. This feels like ChatGPT with an astrology prompt, not a genuine Vedic engine. At \u20b91 you get what you pay for, I suppose. I'll go back to my regular astrologer.",
          },
        ],
      },
    },
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "Privacy-Seeking Young Professionals seeking discreet guidance",
    "AstroTalk-priced-out users attracted by \u20b91 entry point",
    "Sri Mandir devotees with dosha concerns",
    "NRI diaspora disconnected from family pandits",
    "Life transition users in acute decision-making moments",
    "Women 30-50 managing household spiritual decisions",
    "Gen Z astro-curious exploring identity through zodiac",
  ],

  // ── Segment Completion Summary ──────────────────────────────────────────────
  segment_completion_summary: [
    {
      segment: "Privacy-Seeking Young Professionals seeking discreet guidance",
      total: 15,
      completed: 6,
      dropped: 9,
      completion_pct: 40,
      top_drop_off_screen: "intro_mobile",
      top_drop_off_reason: "Phone number gate creates social stigma risk \u2014 linking identity to astrology app",
    },
    {
      segment: "AstroTalk-priced-out users attracted by \u20b91 entry point",
      total: 14,
      completed: 9,
      dropped: 5,
      completion_pct: 64.3,
      top_drop_off_screen: "ai_chat",
      top_drop_off_reason: "AI response quality doesn't match AstroTalk expectations despite 50x lower price",
    },
    {
      segment: "Sri Mandir devotees with dosha concerns",
      total: 14,
      completed: 11,
      dropped: 3,
      completion_pct: 78.6,
      top_drop_off_screen: "journey_purpose",
      top_drop_off_reason: "Dosha/puja concerns don't fit Marriage/Career/Relationship categories",
    },
    {
      segment: "NRI diaspora disconnected from family pandits",
      total: 14,
      completed: 8,
      dropped: 6,
      completion_pct: 57.1,
      top_drop_off_screen: "place_of_birth",
      top_drop_off_reason: "Birth city not available in dropdown \u2014 Tier-2/3 Indian cities missing from picker",
    },
    {
      segment: "Life transition users in acute decision-making moments",
      total: 14,
      completed: 8,
      dropped: 6,
      completion_pct: 57.1,
      top_drop_off_screen: "ai_chat",
      top_drop_off_reason: "Generic planetary response fails to address the specific life crisis that drove download",
    },
    {
      segment: "Women 30-50 managing household spiritual decisions",
      total: 15,
      completed: 12,
      dropped: 3,
      completion_pct: 80.0,
      top_drop_off_screen: "time_of_birth",
      top_drop_off_reason: "Don't know children's or own exact birth time \u2014 no approximate option available",
    },
    {
      segment: "Gen Z astro-curious exploring identity through zodiac",
      total: 14,
      completed: 8,
      dropped: 6,
      completion_pct: 42.9,
      top_drop_off_screen: "video_ad",
      top_drop_off_reason: "In-app video ad triggers scam-pattern recognition \u2014 feels like typical astrology fraud content",
    },
  ],

  // ── Segment-Screen Breakdown ────────────────────────────────────────────────
  segment_screen_breakdown: {
    intro_mobile: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 15, dropped_off: 4, drop_off_pct: 26.7 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 14, dropped_off: 1, drop_off_pct: 7.1 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 14, dropped_off: 3, drop_off_pct: 21.4 },
    },
    video_ad: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 11, dropped_off: 1, drop_off_pct: 9.1 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 14, dropped_off: 1, drop_off_pct: 7.1 },
      "Sri Mandir devotees with dosha concerns": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 13, dropped_off: 1, drop_off_pct: 7.7 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 11, dropped_off: 3, drop_off_pct: 27.3 },
    },
    otp_verify: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 10, dropped_off: 1, drop_off_pct: 10.0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 12, dropped_off: 1, drop_off_pct: 8.3 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    name_entry: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 9, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 14, dropped_off: 1, drop_off_pct: 7.1 },
      "NRI diaspora disconnected from family pandits": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    gender_select: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 9, dropped_off: 1, drop_off_pct: 11.1 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    dob_picker: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 13, dropped_off: 1, drop_off_pct: 7.7 },
      "Sri Mandir devotees with dosha concerns": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 11, dropped_off: 1, drop_off_pct: 9.1 },
      "Life transition users in acute decision-making moments": { reached: 14, dropped_off: 1, drop_off_pct: 7.1 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    time_of_birth: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 12, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Life transition users in acute decision-making moments": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 15, dropped_off: 2, drop_off_pct: 13.3 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    marital_status: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 12, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 10, dropped_off: 1, drop_off_pct: 10.0 },
      "Life transition users in acute decision-making moments": { reached: 13, dropped_off: 1, drop_off_pct: 7.7 },
      "Women 30-50 managing household spiritual decisions": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    journey_purpose: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 12, dropped_off: 1, drop_off_pct: 8.3 },
      "Sri Mandir devotees with dosha concerns": { reached: 13, dropped_off: 2, drop_off_pct: 15.4 },
      "NRI diaspora disconnected from family pandits": { reached: 9, dropped_off: 0, drop_off_pct: 0 },
      "Life transition users in acute decision-making moments": { reached: 12, dropped_off: 1, drop_off_pct: 8.3 },
      "Women 30-50 managing household spiritual decisions": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    place_of_birth: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "Sri Mandir devotees with dosha concerns": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 9, dropped_off: 3, drop_off_pct: 33.3 },
      "Life transition users in acute decision-making moments": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "Women 30-50 managing household spiritual decisions": { reached: 13, dropped_off: 0, drop_off_pct: 0 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
    ai_chat: {
      "Privacy-Seeking Young Professionals seeking discreet guidance": { reached: 8, dropped_off: 2, drop_off_pct: 25.0 },
      "AstroTalk-priced-out users attracted by \u20b91 entry point": { reached: 11, dropped_off: 2, drop_off_pct: 18.2 },
      "Sri Mandir devotees with dosha concerns": { reached: 11, dropped_off: 0, drop_off_pct: 0 },
      "NRI diaspora disconnected from family pandits": { reached: 6, dropped_off: 0, drop_off_pct: 0 },
      "Life transition users in acute decision-making moments": { reached: 11, dropped_off: 3, drop_off_pct: 27.3 },
      "Women 30-50 managing household spiritual decisions": { reached: 13, dropped_off: 1, drop_off_pct: 7.7 },
      "Gen Z astro-curious exploring identity through zodiac": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
    },
  },

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    intro_mobile: [
      {
        persona_uuid: "sa-persona-017",
        persona_label: "31yo Senior SDE, Bangalore",
        behavioral_archetype: "Privacy-Seeking Young Professional",
        internal_monologue:
          "It's 2 AM and I'm lying in bed stressed about whether to accept a startup CTO offer or stay at Amazon. The Instagram ad spoke directly to my 'career kab set hogi' anxiety. I tapped it. But the first thing this app wants is my phone number. For an astrology app. I'm a senior engineer \u2014 my entire professional identity is built on being rational and data-driven. If anyone at work found out I consulted an astrologer, my credibility would be destroyed. My phone number is linked to my LinkedIn, my Amazon Slack, everything. What if this app sends me a WhatsApp message about 'your daily rashifal' and a colleague sees it? The ad was compelling but the social risk of linking my real identity to this is way too high. I'm closing the app.",
        reasoning:
          "Social stigma of astrology among tech professionals creates identity-threat barrier. Phone number as persistent identity link amplifies the risk beyond a private browser session.",
        emotional_state: "conflicted",
        trust_score: 4,
        clarity_score: 7,
        value_score: 6,
      },
      {
        persona_uuid: "sa-persona-089",
        persona_label: "21yo College Student, Pune",
        behavioral_archetype: "Gen Z astro-curious",
        internal_monologue:
          "Saw this on my Instagram Reels at midnight. My friends and I share astrology memes all the time but giving my phone number to an app? Lol no. I don't even give my number to Swiggy delivery guys. My Co-Star app doesn't need my phone number \u2014 just my email. I wanted to try this for fun, not create a permanent record of me consulting an astrologer. What if my parents see an SMS from 'SuperAstro' on my phone? My dad would lecture me for an hour about superstition. Pass.",
        reasoning:
          "Gen Z privacy norms clash with phone-first Indian app patterns. Social media-native user expects email/social login, not phone gate.",
        emotional_state: "dismissive",
        trust_score: 3,
        clarity_score: 7,
        value_score: 5,
      },
    ],
    place_of_birth: [
      {
        persona_uuid: "sa-persona-052",
        persona_label: "35yo Software Architect, Dubai (NRI)",
        behavioral_archetype: "NRI diaspora",
        internal_monologue:
          "I'm born in Jamnagar, Gujarat. Lived there till I was 12, then Ahmedabad for college, now Dubai for 8 years. My family pandit in Jamnagar retired last year and his son doesn't do jyotish. I tried Co-Star but it's Western astrology \u2014 useless for Vedic readings. SuperAstro's 'scientific Vedic astrology' framing appealed to my engineering brain. I breezed through 8 screens. But now at Place of Birth, Jamnagar is not in the dropdown. I scrolled through J cities \u2014 Jaipur, Jabalpur, Jamshedpur, Jodhpur. No Jamnagar. It's not even a small town \u2014 it's a district headquarters with a population of 6 lakh! There's no search field, no way to type the name. Without accurate birth coordinates, the kundli will be wrong. The whole point of Vedic astrology is precision. I can't use this app.",
        reasoning:
          "City picker UX blocks users from Tier-2/3 cities. No search or manual entry. For Vedic astrology, birth place accuracy is non-negotiable \u2014 this is a hard blocker, not a preference.",
        emotional_state: "frustrated",
        trust_score: 5,
        clarity_score: 3,
        value_score: 5,
      },
    ],
    journey_purpose: [
      {
        persona_uuid: "sa-persona-038",
        persona_label: "44yo Homemaker, Indore",
        behavioral_archetype: "Women 30-50 managing household spiritual decisions",
        internal_monologue:
          "My mother-in-law is convinced there's a Kaal Sarp Dosh in our family kundli causing my husband's business losses and my son's poor health. I need a proper astrologer to confirm or deny this. Marriage? No, that's not the issue. Career? Not exactly. Relationship? That's for love problems. Where is 'Family dosha consultation'? Where is 'Spiritual remedy'? Where is 'Health'? My son has been getting recurring fevers and the doctors say nothing is wrong \u2014 my sasuma says it's nazar. I need an astrologer who can look at the family chart, not just my individual kundli for marriage or career. These 3 options show me this app doesn't understand why Indian families actually consult astrologers.",
        reasoning:
          "Journey purpose categories reflect individual Western astrology use cases, not the family/spiritual/dosha framework that drives Indian Vedic astrology consultation.",
        emotional_state: "disappointed",
        trust_score: 4,
        clarity_score: 4,
        value_score: 4,
      },
    ],
    ai_chat: [
      {
        persona_uuid: "sa-persona-063",
        persona_label: "24yo Marketing Executive, Delhi",
        behavioral_archetype: "Life transition user",
        internal_monologue:
          "I broke up with Kartik 2 weeks ago after 3 years together. I've been checking his Instagram stories \u2014 he posted a photo at a bar with some girl I don't recognize. The ad said 'Does he miss me?' and I thought finally, someone will tell me the truth. I filled ALL 10 screens. I called my mom at 11 PM to ask my exact birth time \u2014 she was worried, I lied and said it was for a job application. Selected 'Relationship.' And the AI says... 'Venus transiting through your 7th house indicates relationship evolution. Saturn's influence on your natal Venus suggests a period of emotional growth and self-discovery. This transit will bring clarity to matters of the heart by mid-2026.' WHAT? I don't want 'emotional growth and self-discovery.' I want to know if Kartik misses me. If he's coming back. If that girl at the bar is his new girlfriend. I gave you my EXACT birth time and you give me a generic horoscope column? I could get this from the Dainik Bhaskar astrology page for free. I feel cheated.",
        reasoning:
          "Acute emotional need meets generic astrological output. The 10-screen investment amplifies the disappointment \u2014 user expected the data collection to enable a specific, personal response.",
        emotional_state: "devastated",
        trust_score: 3,
        clarity_score: 6,
        value_score: 2,
      },
      {
        persona_uuid: "sa-persona-071",
        persona_label: "28yo Data Analyst, Hyderabad",
        behavioral_archetype: "AstroTalk-priced-out user",
        internal_monologue:
          "I used to spend \u20b9200-300 per session on AstroTalk for career guidance. SuperAstro at \u20b91 seemed too good to be true but I gave it a shot. The onboarding was long but I expected it \u2014 AstroTalk also asks for birth details. The AI response is... okay, technically. It mentions my Mahadasha and Antardasha correctly. But the analysis is shallow compared to what a \u20b9200 AstroTalk astrologer provides. There's no follow-up question capability, no nuance about my specific career situation. It reads like a well-written but generic monthly horoscope, not a consultation. I expected \u20b91 = basic but accurate. This is \u20b91 = automated and shallow. I'd rather save up for a proper AstroTalk session.",
        reasoning:
          "Experienced astrology consumer has benchmark expectations from paid platforms. AI response technically correct but lacks the depth and interactivity of human astrologer conversation.",
        emotional_state: "underwhelmed",
        trust_score: 5,
        clarity_score: 7,
        value_score: 3,
      },
    ],
  },

  // ── Fix Recommendations ─────────────────────────────────────────────────────
  fix_recommendations: [
    {
      root_cause:
        "Phone number as first gate creates stigma-driven privacy barrier for astrology app",
      screen: "intro_mobile",
      recommendation:
        "Allow anonymous trial with one free question before phone verification \u2014 collect phone only when user wants to save kundli or continue chatting",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 9,
      affected_segment: "Privacy-Seeking Young Professionals, Gen Z astro-curious",
      expected_uplift:
        "Estimated 6-8% increase in completion rate by removing the upfront phone gate",
    },
    {
      root_cause:
        "Ad creative promises instant chat but onboarding delivers 10-screen data intake form",
      screen: "video_ad",
      recommendation:
        "Implement progressive profiling \u2014 show teaser reading after minimal data (name + DOB), collect remaining fields inline during chat",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 8,
      affected_segment: "AstroTalk-priced-out users, Gen Z astro-curious",
      expected_uplift:
        "Estimated 5-7% increase by reducing perceived onboarding length and delivering value earlier",
    },
    {
      root_cause:
        "First AI response is generic planetary analysis ignoring the user's specific emotional question and ad context",
      screen: "ai_chat",
      recommendation:
        "Make first AI response ad-aware and journey-purpose-aware \u2014 address the specific user question before expanding into chart analysis",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 7,
      affected_segment: "Life Transition users, Relationship-focused users",
      expected_uplift:
        "Estimated 4-5% increase by matching AI output to user expectation at the moment of truth",
    },
    {
      root_cause:
        "Journey purpose options too narrow \u2014 only 3 categories miss major Indian astrology consultation reasons",
      screen: "journey_purpose",
      recommendation:
        "Expand to 6-8 options (add Health, Education, Finance, Family, Other) with multi-select and free-text fallback",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 6,
      affected_segment: "Women 30-50 household spiritual, Sri Mandir devotees",
      expected_uplift:
        "Estimated 2-3% increase by ensuring all users find a matching consultation purpose",
    },
    {
      root_cause:
        "City picker dropdown lacks search and omits Tier-2/3 Indian cities and international locations",
      screen: "place_of_birth",
      recommendation:
        "Replace dropdown with autocomplete search field supporting all Indian cities and major international locations",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 6,
      affected_segment: "NRI diaspora, users from smaller cities",
      expected_uplift:
        "Estimated 2-3% increase by unblocking NRI and Tier-2/3 city users at the place_of_birth screen",
    },
  ],

  // ── Expected Completion Rate ────────────────────────────────────────────────
  expected_completion_rate_pct: undefined as unknown as number,

  // ── Persona Details ─────────────────────────────────────────────────────────
  persona_details: [
    // ══════════════════════════════════════════════════════════════════════════
    // JOURNEY 1 — COMPLETER: Priyanka Mehta, 29yo UX Designer, Mumbai
    // Segment: Privacy-Seeking Young Professional
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "sa-persona-008",
      demographics: {
        first_language: "Hindi",
        age: 29,
        occupation: "UX Designer",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Female",
        behavioral_archetype: "Privacy-Seeking Young Professional",
        marital_status: "Unmarried",
      },
      professional_background:
        "Lead UX Designer at a fintech startup in Lower Parel. \u20b918L CTC. Works with a product team of 12 \u2014 they're the 'rational, data-driven' kind. She would never mention astrology at work. Uses Headspace for meditation but frames it as 'mindfulness' not spirituality.",
      cultural_background:
        "Grew up in Bhopal, moved to Mumbai after NID Ahmedabad. Her mother had her kundli made at birth by the family pandit \u2014 she knows her exact time of birth (5:42 AM). Family is pressuring her to decide about boyfriend Rohit by Diwali. She's astro-curious but treats it as a private guilty pleasure, like reading tarot Instagram accounts at midnight.",
      outcome: "completed",
      key_selections: { journey_purpose: "Marriage" },
      final_price_inr: 1,
      total_time_seconds: 88,
      overall_monologue:
        "I saw the ad at 11:30 PM while doom-scrolling. The 'science hai' framing gave me permission to try it \u2014 it's not superstition if there's an AI angle, right? I pushed through all 10 screens because I genuinely need clarity about Rohit. My mom keeps asking 'beta, Diwali tak bata do' and I don't know what to tell her. The onboarding was long but I know astrologers need birth details for kundli \u2014 my nani's pandit always asked the same questions. When the AI mentioned my Manglik status and did a 7th house analysis, I felt genuinely understood. It matched what my mom's pandit had told her years ago. The \u20b91 price made it feel low-risk enough to try. I'll probably come back tomorrow with Rohit's details too.",
      screen_monologues: [
        {
          screen_id: "intro_mobile",
          view_name: "Welcome / Phone Number",
          internal_monologue: "Astrology app at 11:30 PM... yeah, this is exactly when I do this kind of thing. Phone number though \u2014 hmm. It's just \u20b91 and I can always block them later. The 'science hai' tagline makes me feel less embarrassed about this.",
          reasoning: "Late-night emotional vulnerability + low price + scientific framing lowers barrier",
          emotional_state: "cautiously_curious",
          friction_points: ["Phone number for astrology app"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 10,
        },
        {
          screen_id: "video_ad",
          view_name: "Video Ad / Introduction",
          internal_monologue: "The video mentions 'Vedic AI' and shows actual chart analysis, not just zodiac signs. This isn't Co-Star-level surface stuff. They seem to know the difference between Vedic and Western astrology. Okay, I'm more interested now.",
          reasoning: "Vedic astrology specificity builds credibility beyond generic zodiac apps",
          emotional_state: "engaged",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 18,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "Standard OTP. Auto-read picked it up. 3 seconds. Fine.",
          reasoning: "Frictionless OTP auto-read \u2014 Indian users expect this pattern",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 4,
        },
        {
          screen_id: "name_entry",
          view_name: "Name Entry",
          internal_monologue: "Priyanka Mehta. Easy. Though I considered using a fake name for a second \u2014 but kundli needs the real name for accuracy, right? At least that's what Nani says.",
          reasoning: "Brief privacy hesitation overridden by belief in astrological accuracy requirements",
          emotional_state: "slightly_embarrassed",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 5,
        },
        {
          screen_id: "gender_select",
          view_name: "Gender Selection",
          internal_monologue: "Female. Simple. Standard for kundli.",
          reasoning: "Expected field for Vedic chart generation",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 2,
        },
        {
          screen_id: "dob_picker",
          view_name: "Date of Birth",
          internal_monologue: "15th March 1997. I know this obviously. But this calendar picker makes me scroll back to 1997? That's 29 years of scrolling. Come on, just let me type the year. As a UX designer, this is painful to use.",
          reasoning: "Calendar scroll is a poor UX pattern for DOB entry \u2014 professional UX awareness amplifies frustration",
          emotional_state: "mildly_frustrated",
          friction_points: ["Calendar scroll for 29 years of dates", "No direct year entry"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 5,
          value_score: 5,
          time_seconds: 16,
        },
        {
          screen_id: "time_of_birth",
          view_name: "Time of Birth",
          internal_monologue: "5:42 AM. I know this because mom has it written in the kundli book. She told me a thousand times \u2014 'subah 5:42 ko janm hua tha, Brahma Muhurta mein.' Not everyone would know this. They should add a 'don't know' option.",
          reasoning: "Has exact birth time from family kundli records \u2014 a cultural advantage, not universal",
          emotional_state: "confident",
          friction_points: ["No option for users who don't know birth time"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 6,
        },
        {
          screen_id: "marital_status",
          view_name: "Marital Status",
          internal_monologue: "Unmarried. Though 'It's complicated with Rohit' would be more accurate. Nice that there's a skip option here \u2014 shows they understand this is personal.",
          reasoning: "Skip option signals respect for privacy on sensitive personal data",
          emotional_state: "appreciative",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 3,
          selected_choice: "Unmarried",
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose",
          internal_monologue: "Marriage. That's exactly why I'm here. Is Rohit the one? Should I say yes before Diwali? My heart says yes but my overthinking brain says 'what if.' Marriage it is.",
          reasoning: "Direct match between journey purpose option and core emotional need",
          emotional_state: "purposeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 5,
          selected_choice: "Marriage",
        },
        {
          screen_id: "place_of_birth",
          view_name: "Place of Birth",
          internal_monologue: "Bhopal. It's in the dropdown, thankfully \u2014 it's a state capital. I can imagine people from smaller towns struggling here though.",
          reasoning: "Metro/capital city user passes through without friction \u2014 privilege of city size",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 6,
        },
        {
          screen_id: "ai_chat",
          view_name: "AI Astrology Chat",
          internal_monologue: "Okay here it is... 'Based on your Vedic birth chart, your Moon is in Scorpio with Mars aspecting the 7th house, confirming your Manglik status. However, your Venus-Jupiter conjunction in the 5th house creates a strong Gajakesari yoga that favors emotional intelligence in relationships. Regarding marriage timing, your Jupiter Mahadasha beginning in late 2026 is traditionally auspicious for commitment.' This is... actually really specific? It matches what Mom's pandit said about Manglik. The 7th house analysis makes sense. And the timing around late 2026 \u2014 that's after Diwali, so maybe I should tell Mom to wait a bit. I feel... genuinely understood. This wasn't generic at all.",
          reasoning: "AI response references specific Vedic concepts matching family pandit's previous reading \u2014 creates strong credibility and emotional resonance",
          emotional_state: "genuinely_moved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 8,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 28,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // JOURNEY 2 — DROPPER at S2: Arjun Krishnamurthy, 31yo Senior SDE, Bangalore
    // Segment: Privacy-Seeking Young Professional
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "sa-persona-017",
      demographics: {
        first_language: "Kannada",
        age: 31,
        occupation: "Senior Software Development Engineer",
        district: "Bangalore Urban",
        zone: "South",
        sex: "Male",
        behavioral_archetype: "Privacy-Seeking Young Professional",
        marital_status: "Unmarried",
      },
      professional_background:
        "Senior SDE at Amazon, Bangalore. \u20b942L CTC. On a team of 8 building distributed systems. Known as the 'most logical person in the room' \u2014 his Slack status is literally 'data > opinions.' Got a CTO offer from a Series A fintech startup at \u20b965L but it's risky. Can't discuss this with his Amazon manager obviously, and his friends all say 'bro, just do a pros/cons spreadsheet.'",
      cultural_background:
        "Tamil Brahmin family from Mylapore, Chennai. Mother consults the family jothidar (astrologer) for every major decision \u2014 job changes, house purchases, even his sister's wedding date. Arjun publicly mocks this but privately wonders if there's something to it. His grandfather was an amateur astrologer. Conflicted between his rational engineer identity and his cultural inheritance.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 18,
      overall_monologue:
        "It's 2 AM. I can't sleep because of this CTO offer decision. The Instagram ad caught me at my most vulnerable \u2014 'career kab set hogi?' is literally the question keeping me awake. My rational brain says 'this is ridiculous, you're an Amazon engineer considering astrology.' But my 2 AM brain says 'Thatha (grandfather) believed in this, maybe there's something to it.' I tapped the ad. The video was interesting \u2014 'Vedic AI' at least sounds more sophisticated than 'call our panditji.' But then it asked for my phone number. And reality hit. My phone number is my Amazon identity. It's on my LinkedIn. My entire professional network knows this number. If SuperAstro sends me a WhatsApp or an SMS and someone sees it \u2014 even accidentally \u2014 I'm 'the Amazon engineer who consults astrologers.' That's career-damaging. Not the astrology itself, but the perception. I closed the app.",
      screen_monologues: [
        {
          screen_id: "intro_mobile",
          view_name: "Welcome / Phone Number",
          internal_monologue: "The Instagram ad hit different at 2 AM. 'Career kab set hogi' \u2014 that's literally my question. Vedic AI sounds intriguing. But... phone number? For an astrology app? This number is linked to my Amazon account, my LinkedIn, my entire professional identity. What if they send me an SMS that says 'SuperAstro: Your daily rashifal' and my manager sees it during a screen share? What if it shows up in my UPI history? I'm known as the most rational person on my team. I can't risk this.",
          reasoning: "Social identity threat outweighs genuine curiosity. Phone number as permanent identity link is the core blocker \u2014 not the \u20b91 price or the astrology itself.",
          emotional_state: "deeply_conflicted",
          friction_points: ["Phone number links professional identity to astrology app", "Fear of social discovery by colleagues", "Identity conflict between rationality and cultural curiosity"],
          decision_outcome: "DROP_OFF",
          trust_score: 4,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 18,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // JOURNEY 3 — DROPPER at S11: Pooja Kumari, 24yo Marketing Executive, Delhi
    // Segment: Life Transition User
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "sa-persona-063",
      demographics: {
        first_language: "Hindi",
        age: 24,
        occupation: "Marketing Executive",
        district: "South Delhi",
        zone: "North",
        sex: "Female",
        behavioral_archetype: "Life transition user",
        marital_status: "Unmarried",
      },
      professional_background:
        "Junior Marketing Executive at a D2C skincare brand in Saket. \u20b96L CTC. Managing their Instagram content. Good at her job but emotionally scattered after the breakup. Her work quality has dipped in the last two weeks \u2014 her manager noticed.",
      cultural_background:
        "From Lucknow, living in a PG in Malviya Nagar with two roommates. Broke up with Kartik 2 weeks ago after a 3-year relationship. He was her first serious boyfriend. She's been checking his Instagram stories obsessively \u2014 he posted a photo at a bar with a girl she doesn't recognize. Her roommates are tired of hearing about it. Her mother says 'sab Bhagwan ki marzi hai' (it's God's will). The 'Does he miss me?' ad hit her at her most vulnerable moment.",
      outcome: "dropped_off",
      key_selections: { journey_purpose: "Relationship" },
      final_price_inr: null,
      total_time_seconds: 102,
      overall_monologue:
        "I filled ALL 10 screens. TEN. I even called my mom at 11 PM to ask my exact birth time \u2014 she was worried, I lied and said it was for a job application form. I entered everything \u2014 name, DOB (March 3, 2002, 2:15 PM), Lucknow as birth place, unmarried, Relationship. I did all of this because the ad said 'Does he miss me?' and I thought the AI would actually tell me about Kartik. Instead it says 'Venus transiting through your 7th house indicates relationship evolution' and 'Saturn's influence suggests emotional growth.' I don't want GROWTH. I want to know if Kartik is thinking about me right now. If that girl at the bar is his new girlfriend. If he'll come back if I text him. I gave this app my birth time and it gave me a planetary weather report. I feel cheated. I'm going back to checking his Instagram stories \u2014 at least that gives me actual information about his life.",
      screen_monologues: [
        {
          screen_id: "intro_mobile",
          view_name: "Welcome / Phone Number",
          internal_monologue: "'Does he miss me?' \u2014 that's EXACTLY what I need to know. If this app can tell me, I'll give it whatever it wants. Phone number? Fine. \u20b91? Take it. Just tell me about Kartik.",
          reasoning: "Acute emotional desperation overrides all privacy concerns \u2014 willing to pay any cost for specific answer",
          emotional_state: "desperate",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 8,
          time_seconds: 5,
        },
        {
          screen_id: "video_ad",
          view_name: "Video Ad / Introduction",
          internal_monologue: "The video shows a girl asking 'will he come back?' and the AI giving her an answer. That's what I need. Let me keep going.",
          reasoning: "Ad creative directly mirrors emotional state \u2014 reinforces hope",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 12,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "OTP. Okay, quickly. I need to get to the chat part.",
          reasoning: "Speed-driven \u2014 every screen is a delay between her and the answer about Kartik",
          emotional_state: "impatient",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 5,
        },
        {
          screen_id: "name_entry",
          view_name: "Name Entry",
          internal_monologue: "Pooja Kumari. Hurry up. Get me to the astrologer.",
          reasoning: "Low-friction screen but patience wearing thin",
          emotional_state: "anxious",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 4,
        },
        {
          screen_id: "gender_select",
          view_name: "Gender Selection",
          internal_monologue: "Female. Obviously. Next.",
          reasoning: "Trivial screen passed instantly",
          emotional_state: "impatient",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 2,
        },
        {
          screen_id: "dob_picker",
          view_name: "Date of Birth",
          internal_monologue: "March 3, 2002. I have to scroll through... okay this picker is annoying. 2002... 2002... there. March. 3. Done. So many screens just to get a chart reading.",
          reasoning: "Calendar scroll friction amplified by emotional urgency",
          emotional_state: "frustrated",
          friction_points: ["Calendar scroll for DOB"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 5,
          value_score: 5,
          time_seconds: 14,
        },
        {
          screen_id: "time_of_birth",
          view_name: "Time of Birth",
          internal_monologue: "Birth time... I don't know this. Wait, let me call Mom. 'Mom, mera janam kitne baje hua tha?' She's asking why. 'Job form ke liye chahiye.' She says 2:15 PM. Okay, entering 2:15 PM. I feel bad for lying to her.",
          reasoning: "Willing to call mother and lie about the reason \u2014 demonstrates how important the answer is to her",
          emotional_state: "guilty_but_determined",
          friction_points: ["Had to call family member for birth time", "Lied about reason for needing it"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 6,
          time_seconds: 15,
        },
        {
          screen_id: "marital_status",
          view_name: "Marital Status",
          internal_monologue: "Unmarried. Though two weeks ago I would have said 'in a relationship.' Selecting 'Unmarried' hurts more than I expected.",
          reasoning: "Emotional pain triggered by marital status selection reflecting breakup",
          emotional_state: "sad",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 4,
          selected_choice: "Unmarried",
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose",
          internal_monologue: "Relationship. Obviously. That's why I'm here. Does. Kartik. Miss. Me. Tell me.",
          reasoning: "Perfect category match but the actual need is hyper-specific, not general 'relationship guidance'",
          emotional_state: "intense",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 3,
          selected_choice: "Relationship",
        },
        {
          screen_id: "place_of_birth",
          view_name: "Place of Birth",
          internal_monologue: "Lucknow. It's in the list. Good. Almost there. Just one more screen and I'll finally know about Kartik.",
          reasoning: "Anticipation building \u2014 believes the AI response is imminent",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 5,
        },
        {
          screen_id: "ai_chat",
          view_name: "AI Astrology Chat",
          internal_monologue: "Finally! Okay let me read... 'Venus transiting through your 7th house indicates relationship evolution.' Evolution? What does that mean? 'Saturn's influence on your natal Venus suggests a period of emotional growth and self-discovery.' Emotional GROWTH? I don't want growth! 'This transit will bring clarity to matters of the heart by mid-2026.' CLARITY BY MID-2026?! It's April 2026! I need clarity NOW. About KARTIK. Specifically. Not about 'matters of the heart' generically. I told you I selected 'Relationship.' I gave you my exact birth time \u2014 I called my mom and LIED for this. And you're giving me a horoscope column from Dainik Bhaskar? Where is 'Does Kartik miss you \u2014 yes or no'? Where is 'Should you text him'? This app knows my exact concern and still gave me a generic response. Ten screens. For THIS. I feel so stupid. Going back to stalking his Instagram.",
          reasoning: "Devastating mismatch between hyper-specific emotional need and generic astrological output. The 10-screen data investment amplifies the sense of betrayal. User expected the extensive data collection to enable a personal, specific response.",
          emotional_state: "devastated",
          friction_points: ["Generic planetary response vs specific emotional question", "10-screen investment for horoscope-level output", "No reference to specific relationship situation", "Ad promised 'Does he miss me?' but AI delivered generic transit analysis"],
          decision_outcome: "DROP_OFF",
          trust_score: 3,
          clarity_score: 6,
          value_score: 2,
          time_seconds: 35,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // JOURNEY 4 — DROPPER at S10: Vikram Joshi, 35yo Software Architect, Dubai (NRI)
    // Segment: NRI Diaspora
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "sa-persona-052",
      demographics: {
        first_language: "Gujarati",
        age: 35,
        occupation: "Software Architect",
        district: "Dubai",
        zone: "International",
        sex: "Male",
        behavioral_archetype: "NRI diaspora",
        marital_status: "Married",
      },
      professional_background:
        "Software Architect at a multinational fintech in Dubai. \u20b985L CTC equivalent. Has been in Dubai for 8 years. Works with a multicultural team \u2014 Indian, Lebanese, Filipino colleagues. Technically sharp but deeply connected to Gujarati cultural roots.",
      cultural_background:
        "Born and raised in Jamnagar, Gujarat until age 12. Moved to Ahmedabad for schooling, then Pune for engineering (COEP), then Dubai for work. Family pandit in Jamnagar, Shastri-ji, retired last year \u2014 his son runs a furniture shop now, no interest in jyotish. Vikram's wife is from Rajkot. They do a Satyanarayan Puja every Purnima at home in Dubai. He tried Co-Star but Western astrology with 12 simplistic signs is useless for Vedic readings. Wants a proper kundli analysis for his son's Vidyarambha (education initiation) ceremony timing.",
      outcome: "dropped_off",
      key_selections: { journey_purpose: "Career" },
      final_price_inr: null,
      total_time_seconds: 76,
      overall_monologue:
        "I've been looking for a replacement for Shastri-ji ever since he retired. My wife and I need a proper Vedic astrologer for our son's Vidyarambha ceremony timing and my own career chart \u2014 I'm considering moving to Singapore. Co-Star is a joke for anyone who understands real jyotish. SuperAstro's 'scientific Vedic astrology' pitch appealed to me. The onboarding was fine \u2014 I expect birth detail collection for kundli, that's how it works. Breezed through 8 screens. But at Place of Birth, Jamnagar isn't in the dropdown. I scrolled through all the J cities \u2014 Jaipur, Jabalpur, Jamshedpur, Jodhpur, Junagadh even. No Jamnagar. It's not a village \u2014 it's a district headquarters, 6 lakh population, the city where the Jam Saheb hosted the Polish children during WWII. There's no search field, no way to type the name. Without accurate birth coordinates from Jamnagar, the kundli will calculate wrong planetary positions. Janma Kundli accuracy depends on exact longitude/latitude. This is a fundamental blocker, not a UX annoyance. I can't use this app.",
      screen_monologues: [
        {
          screen_id: "intro_mobile",
          view_name: "Welcome / Phone Number",
          internal_monologue: "Scientific Vedic astrology via AI. Interesting. My Indian number still works on WhatsApp so I'll use that. \u20b91 is nothing \u2014 I spend more on chai at the office.",
          reasoning: "Low price point and Vedic framing overcome initial skepticism. NRI retains Indian phone number.",
          emotional_state: "interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 8,
        },
        {
          screen_id: "video_ad",
          view_name: "Video Ad / Introduction",
          internal_monologue: "They mention Rahu-Ketu, dashas, and yogas in the video. Not just 'you're a Scorpio so you're mysterious' nonsense. This looks like they understand Vedic astrology. Let me continue.",
          reasoning: "Vedic terminology in video builds credibility with knowledgeable user",
          emotional_state: "encouraged",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 15,
        },
        {
          screen_id: "otp_verify",
          view_name: "OTP Verification",
          internal_monologue: "OTP on my Indian number. Auto-read worked even though I'm in Dubai. Good.",
          reasoning: "Technical reliability builds trust",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 5,
        },
        {
          screen_id: "name_entry",
          view_name: "Name Entry",
          internal_monologue: "Vikram Joshi. For kundli, my full name including gotra would be ideal, but this works.",
          reasoning: "Expects traditional astrology data collection standards",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 4,
        },
        {
          screen_id: "gender_select",
          view_name: "Gender Selection",
          internal_monologue: "Male. Standard.",
          reasoning: "Trivial screen",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 9,
          value_score: 5,
          time_seconds: 2,
        },
        {
          screen_id: "dob_picker",
          view_name: "Date of Birth",
          internal_monologue: "August 14, 1991. Independence Day eve baby \u2014 my father always said I was destined for great things because of the date. The calendar scroll is a bit tedious but manageable.",
          reasoning: "Has exact date, tolerates UX friction due to familiarity with astrology data collection",
          emotional_state: "patient",
          friction_points: ["Calendar scroll"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 6,
          value_score: 5,
          time_seconds: 12,
        },
        {
          screen_id: "time_of_birth",
          view_name: "Time of Birth",
          internal_monologue: "6:18 AM. I know this precisely because my father had it inscribed on the silver payal (anklet) made at my janma. Every Gujarati family records this.",
          reasoning: "Cultural practice ensures birth time availability \u2014 Gujarati tradition of recording birth details",
          emotional_state: "confident",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 5,
        },
        {
          screen_id: "marital_status",
          view_name: "Marital Status",
          internal_monologue: "Married. Since 2019. My wife Nisha would actually love this app if it works well.",
          reasoning: "Straightforward response, potential referral if experience is positive",
          emotional_state: "neutral",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 5,
          time_seconds: 3,
          selected_choice: "Married",
        },
        {
          screen_id: "journey_purpose",
          view_name: "Journey Purpose",
          internal_monologue: "I want career guidance about the Singapore move AND my son's Vidyarambha timing. But I can only pick one. Career is the more urgent one. I wish there was a 'Family/Children' option though. Selecting Career.",
          reasoning: "Forced single-select misses multi-domain consultation need. 'Career' is closest but incomplete.",
          emotional_state: "slightly_frustrated",
          friction_points: ["No family/children option", "Can't select multiple purposes"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 5,
          value_score: 5,
          time_seconds: 8,
          selected_choice: "Career",
        },
        {
          screen_id: "place_of_birth",
          view_name: "Place of Birth",
          internal_monologue: "Jamnagar, Gujarat. Let me scroll to J... Jaipur. Jabalpur. Jamshedpur. Jodhpur. Junagadh. Where is Jamnagar? It's not here. Let me scroll again... no. It's genuinely not in this list. Jamnagar has 6 lakh people! It's a district headquarters! The Nawanagar cricket ground is there! This isn't a village! And there's no search bar \u2014 I can't type the name, I can only scroll through this predefined list. Without Jamnagar's exact coordinates (22.4707\u00b0N, 70.0577\u00b0E), the entire kundli calculation will be wrong. Lagna, house cusps, everything depends on birth place latitude and longitude. This is a fundamental accuracy problem, not a minor UX issue. An astrology app that can't find Jamnagar shouldn't call itself 'Vedic.' I'm uninstalling.",
          reasoning: "City picker is a hard blocker for Tier-2/3 city users. For Vedic astrology, birth coordinates are non-negotiable \u2014 wrong coordinates = wrong chart = useless reading. No search or manual entry compounds the problem.",
          emotional_state: "angry",
          friction_points: ["Jamnagar not in city dropdown", "No search functionality", "No manual coordinate entry", "Accuracy of Vedic chart compromised"],
          decision_outcome: "DROP_OFF",
          trust_score: 3,
          clarity_score: 2,
          value_score: 3,
          time_seconds: 22,
        },
      ],
    },
  ],

  // ── Persona Journeys (Summary) ──────────────────────────────────────────────
  persona_journeys: [
    {
      persona_type: "Privacy-Seeking Young Professional (Completer)",
      plan_chosen: "Marriage",
      key_decision_moment: "The 'science hai' framing in the ad gave permission to try astrology without feeling superstitious. Pushed through 10 screens because genuine need for marriage clarity.",
      emotional_arc: "Cautious curiosity \u2192 Slight embarrassment at name entry \u2192 Growing engagement at Vedic-specific analysis \u2192 Genuine satisfaction when AI mentioned Manglik status matching family pandit's reading",
    },
    {
      persona_type: "Privacy-Seeking Young Professional (Dropper at S1)",
      plan_chosen: "N/A",
      key_decision_moment: "Phone number gate killed it. Professional identity as rational engineer is incompatible with being discoverable on an astrology app. Genuine interest but social risk too high.",
      emotional_arc: "2 AM vulnerability \u2192 Ad resonance with career anxiety \u2192 Reality check at phone number \u2192 Identity conflict \u2192 Risk aversion wins",
    },
    {
      persona_type: "Life Transition User (Dropper at S11)",
      plan_chosen: "Relationship",
      key_decision_moment: "Filled all 10 screens including calling her mom for birth time. AI response gave generic planetary transit analysis instead of addressing her specific question about ex-boyfriend. Devastating mismatch.",
      emotional_arc: "Desperate hope \u2192 Willingness to provide everything \u2192 Growing anticipation through 10 screens \u2192 Crushing disappointment at generic AI response \u2192 Feeling cheated",
    },
    {
      persona_type: "NRI Diaspora (Dropper at S10)",
      plan_chosen: "Career",
      key_decision_moment: "Jamnagar (birth city) not in the place of birth dropdown. No search field. Without accurate birth coordinates, Vedic chart is fundamentally wrong. Hard technical blocker.",
      emotional_arc: "Rational interest \u2192 Growing engagement with Vedic terminology \u2192 Patience through 8 screens \u2192 Frustration at city picker \u2192 Anger at app calling itself 'Vedic' while missing basic Indian cities",
    },
  ],

  // ── Behavioral Insights ─────────────────────────────────────────────────────
  behavioral_insights: [
    "Late-night usage (10 PM - 2 AM) accounts for 68% of installs \u2014 astrology app downloads are driven by emotional vulnerability during nighttime rumination, not daytime rational decision-making",
    "Users who know their exact birth time (from family kundli records) complete at 78% vs 41% for those who don't \u2014 birth time availability is a strong predictor of completion and correlates with traditional astrology familiarity",
    "The 'science hai' / AI framing attracts a specific segment of privacy-conscious, educated users who wouldn't use traditional astrology apps \u2014 but this segment is also the most sensitive to phone identity exposure",
    "Users who selected Marriage as journey purpose complete at 71% vs 54% for Career and 48% for Relationship \u2014 marriage decisions in Indian culture involve family pressure with deadlines, creating stronger motivation to complete",
    "NRI users are 3x more likely to drop at place_of_birth than domestic users \u2014 city picker assumes metro-only births and breaks for the diaspora segment that is actually the highest-paying potential audience",
    "Ad creative context shapes expectation at ai_chat screen \u2014 users who saw 'Does he miss me?' ads expect relationship-specific answers, while 'career kab set hogi' users expect career-specific guidance. Generic responses fail both.",
  ],

  // ── Completion Analysis ─────────────────────────────────────────────────────
  completion_analysis: {
    total_completers: 62,
    completion_rate_pct: 62.0,
    conversion_drivers: {
      "Genuine life need with deadline": "Marriage-focused users with family pressure timelines complete at 71% \u2014 the urgency creates follow-through motivation",
      "Traditional astrology familiarity": "Users from devotee backgrounds (Sri Mandir, family pandit tradition) expect and accept 10-screen data collection for kundli \u2014 it matches their mental model of how astrology works",
      "Known birth time": "Users with exact birth time from family records breeze through the time_of_birth screen that blocks others \u2014 78% completion vs 41%",
      "Low price anchoring": "\u20b91 price point makes the time investment feel proportionally low-risk \u2014 'it's only a rupee, let me finish'",
    },
    dominant_completion_themes: [
      "Devotee mindset users who expect kundli-level data collection and find the AI response genuinely knowledgeable",
      "Marriage-pressured users (mostly women 25-32) with imminent family deadlines who need any form of guidance",
      "Women 30-50 managing household spiritual decisions who are accustomed to providing birth details for puja and jyotish",
    ],
    llm_synthesis:
      "The 62% completion rate masks two fundamentally different user populations with incompatible expectations. Completers are predominantly devotee-minded users (Sri Mandir, Women 30-50) who accept long data collection as a prerequisite for accurate Vedic readings \u2014 the 10-screen form matches their mental model of consulting a pandit. Droppers are privacy-first, instant-gratification users (Young Professionals, Gen Z) who downloaded because the ad promised quick answers but encountered an identity-exposing data intake form instead. The phone number gate alone segments out the privacy-conscious audience before they even see the product. SuperAstro's core challenge is serving both populations: make value accessible quickly for the impatient/private cohort while maintaining the data depth that makes the devotee cohort trust the readings.",
  },

  // ── Power Users ─────────────────────────────────────────────────────────────
  power_users: {
    power_user_archetypes: [
      {
        archetype_name: "The Devotee Consulter",
        defining_traits: {
          "Age range": "35-55",
          "Astrology familiarity": "High \u2014 has family pandit or regular temple visits",
          "Birth time knowledge": "Exact \u2014 recorded in family kundli",
          "Cultural comfort": "Astrology is normal, not stigmatized",
          "Motivation": "Dosha remediation, ceremony timing, family chart matching",
        },
        why_they_convert: "The data collection process mirrors their offline jyotish experience. They expect to provide 10 fields of birth data \u2014 that's how kundli works. The AI response's Vedic specificity (dashas, yogas, house analysis) validates the platform's competence.",
        what_resonates: [
          "Vedic terminology and chart-specific analysis",
          "\u20b91 price as gateway to testing accuracy before committing to paid sessions",
          "Convenience of digital consultation vs physical pandit visits",
        ],
        conversion_rate_estimate: "78-80%",
        persona_count_in_sample: 29,
      },
      {
        archetype_name: "The Marriage-Pressured Decision Maker",
        defining_traits: {
          "Age range": "25-32",
          "Gender": "Predominantly female",
          "Life situation": "Family pressure for marriage decision with deadline",
          "Astrology stance": "Privately curious, publicly neutral",
          "Motivation": "Seeking external validation for a decision they can't make alone",
        },
        why_they_convert: "The emotional urgency of an imminent marriage decision creates follow-through motivation that overcomes onboarding friction. They're not astrology enthusiasts \u2014 they're people who need an answer and are willing to try any source.",
        what_resonates: [
          "Manglik status and 7th house analysis for marriage compatibility",
          "Late-night access when they can use the app privately",
          "AI feels less judgmental than asking family or friends",
        ],
        conversion_rate_estimate: "68-71%",
        persona_count_in_sample: 18,
      },
    ],
    flow_strengths_for_power_users: [
      "Vedic-specific AI analysis (dashas, yogas, house cusps) validates platform credibility for knowledgeable users",
      "Birth detail collection matches the mental model of offline jyotish consultation",
      "\u20b91 price removes financial barrier for trial without commitment",
      "Skip option on marital status respects privacy for sensitive segment",
    ],
    acquisition_recommendation:
      "Target the Devotee Consulter segment through Sri Mandir and temple app partnerships. For Marriage-Pressured Decision Makers, run Instagram ads specifically during the Indian wedding season (Oct-Feb) and around cultural pressure points (Diwali, Navratri). Both segments have high LTV potential \u2014 devotees for ongoing puja timing, marriage users for post-marriage family chart consultations.",
  },

  // ── User Mental Models ──────────────────────────────────────────────────────
  user_mental_models: {
    expectations: [
      "Ad promise of instant chat means I'll be talking to an AI astrologer within 1-2 screens",
      "An astrology app should let me ask a specific question and get a specific answer",
      "My birth data should make the response MORE personal, not generic",
      "A Vedic astrology app should cover all Indian cities, including Tier-2 and Tier-3",
      "\u20b91 means basic but useful \u2014 not 10 screens of effort for a horoscope column",
    ],
    gaps_found: [
      "Ad promises instant chat but reality is 10 screens of data collection before any value",
      "Specific emotional questions (Does he miss me?) receive generic planetary transit responses",
      "Phone number gate assumes all users are comfortable with identity exposure for astrology",
      "City picker built for metro cities \u2014 breaks for the Tier-2/3 and NRI users who are the most culturally connected to Vedic astrology",
      "Journey purpose categories reflect individual Western astrology framing, not Indian family/dosha consultation needs",
    ],
    surprising_behaviors: [
      "Users calling their mothers at 11 PM to get birth times, lying about the reason \u2014 shows how strong the need is but how stigmatized the channel",
      "NRI users who abandoned quoting the exact lat/long coordinates their city should have \u2014 this audience is more technically precise about astrology than expected",
      "Gen Z users who are comfortable sharing astrology memes but not their phone number \u2014 social sharing vs personal identity are completely different risk profiles",
      "35% of completers said they would come back with their partner's birth details \u2014 the initial session is a trial for the real use case of compatibility matching",
    ],
  },
};
