/**
 * HexaHealth — Piles Treatment Consultation Flow
 * India's leading surgical care platform for anorectal conditions.
 * 50 synthetic Indian personas from Mumbai/Delhi metro areas.
 * 27 completers, 23 drop-offs. 54% completion rate.
 * Flow: ad_landing → conditions_list → piles_detail → health_description → doctor_form → app_login → home_dashboard → submit_question
 * Used as sample/demo data for the simulation report UI.
 *
 * NOTE: intentionally untyped — see univest-sim-data.ts for rationale.
 */
export const hexahealthSimData = {
  simulation_id: "hexahealth-piles-sim-20260409-001",
  flow_id: "hexahealth_piles_treatment_v1",
  flow_name: "HexaHealth — Piles Treatment Consultation",
  generated_at: "2026-04-09T10:00:00.000000+00:00",

  // ── Summary ─────────────────────────────────────────────────────────────────
  summary: {
    total_personas: 50,
    completed: 27,
    dropped_off: 23,
    completion_rate_pct: 54.0,
    avg_time_to_complete_seconds: 72,
    dominant_plan: "N/A",
    dominant_plan_pct: 0,
  },

  // ── Sample Quality ──────────────────────────────────────────────────────────
  sample_quality: {
    sample_size: 50,
    margin_of_error_pct: 9.2,
    confidence_level: "80%",
    note: "Sample size of 50 provides adequate directional signal at 80% confidence (\u00b19.2%). Sub-segment sizes of 10 are directional only. Increase to 100+ for statistically significant sub-segment analysis.",
  },

  // ── Plan Distribution ───────────────────────────────────────────────────────
  plan_distribution: {},

  // ── Add-on Adoption ─────────────────────────────────────────────────────────
  addon_adoption: {
    with_addon: { count: 0, pct: 0 },
    skipped: { count: 27, pct: 100 },
  },

  // ── Funnel Drop-Off ─────────────────────────────────────────────────────────
  funnel_drop_off: [
    { screen_id: "doctor_form", drop_offs: 5, drop_off_pct: 10.0 },
    { screen_id: "app_login", drop_offs: 5, drop_off_pct: 10.0 },
    { screen_id: "ad_landing", drop_offs: 4, drop_off_pct: 8.0 },
    { screen_id: "health_description", drop_offs: 3, drop_off_pct: 6.0 },
    { screen_id: "piles_detail", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "home_dashboard", drop_offs: 2, drop_off_pct: 4.0 },
    { screen_id: "conditions_list", drop_offs: 1, drop_off_pct: 2.0 },
    { screen_id: "submit_question", drop_offs: 1, drop_off_pct: 2.0 },
  ],

  // ── Top Friction Points ─────────────────────────────────────────────────────
  top_friction_points: [
    {
      friction:
        "Doctor consultation form asks for full name, age, and phone number before any value is shown — feels like a lead-capture trap",
      frequency: 12,
    },
    {
      friction:
        "Mandatory app login/OTP gate after investing time browsing — users feel bait-and-switched into downloading the app",
      frequency: 10,
    },
    {
      friction:
        "Describing piles symptoms in a text box is embarrassing and unclear — users don't know medical terminology and feel shame typing details",
      frequency: 8,
    },
    {
      friction:
        "Ad landing page uses graphic clinical imagery that triggers anxiety rather than reassurance in first-time visitors",
      frequency: 7,
    },
    {
      friction:
        "No upfront pricing or insurance compatibility information — users fear hidden costs for surgical consultations",
      frequency: 6,
    },
    {
      friction:
        "Navigation from conditions list to piles-specific page adds unnecessary clicks for users who arrived via a piles-specific ad",
      frequency: 5,
    },
    {
      friction:
        "Home dashboard after login is generic — doesn't carry forward the piles context, making users feel lost",
      frequency: 4,
    },
  ],

  // ── Screen Metrics ──────────────────────────────────────────────────────────
  screen_metrics: {
    ad_landing: {
      avg_trust: 5.4,
      avg_clarity: 6.2,
      avg_value: 6.8,
      avg_time_s: 12,
      sample_size: 50,
    },
    conditions_list: {
      avg_trust: 5.8,
      avg_clarity: 7.4,
      avg_value: 6.2,
      avg_time_s: 8,
      sample_size: 46,
    },
    piles_detail: {
      avg_trust: 6.0,
      avg_clarity: 7.0,
      avg_value: 7.2,
      avg_time_s: 14,
      sample_size: 45,
    },
    health_description: {
      avg_trust: 5.2,
      avg_clarity: 4.8,
      avg_value: 5.6,
      avg_time_s: 22,
      sample_size: 43,
    },
    doctor_form: {
      avg_trust: 4.6,
      avg_clarity: 5.8,
      avg_value: 5.0,
      avg_time_s: 18,
      sample_size: 40,
    },
    app_login: {
      avg_trust: 4.8,
      avg_clarity: 6.4,
      avg_value: 4.4,
      avg_time_s: 10,
      sample_size: 35,
    },
    home_dashboard: {
      avg_trust: 5.6,
      avg_clarity: 5.2,
      avg_value: 5.4,
      avg_time_s: 8,
      sample_size: 30,
    },
    submit_question: {
      avg_trust: 6.2,
      avg_clarity: 6.8,
      avg_value: 6.6,
      avg_time_s: 10,
      sample_size: 28,
    },
  },

  // ── Executive Summary ───────────────────────────────────────────────────────
  executive_summary:
    "54% of users complete the HexaHealth piles consultation flow, but the doctor form and app login screens together cause 43% of all drop-offs. The core problem is a trust deficit specific to sensitive health conditions \u2014 users researching piles treatment are already embarrassed, and the flow compounds this with aggressive data collection (name + phone before any value), a mandatory app download gate, and a symptom description box that offers no guided input for a condition most users can't describe in medical terms. Users from lower-income segments in Mumbai and Delhi are particularly price-anxious, dropping when no cost transparency is provided upfront.",

  // ── Usability Findings ──────────────────────────────────────────────────────
  usability_findings: [
    {
      severity: "critical",
      type: "trust_issue",
      screen: "doctor_form",
      finding:
        "Doctor consultation form demands personal details (name, phone, age) before showing any doctor profiles, pricing, or consultation value \u2014 10% drop-off",
      evidence:
        "5 of 23 drop-offs occur at doctor_form. Personas across Cautious Self-Treaters and Price-Sensitive Blue Collar segments perceive this as a lead-capture form for sales calls. Trust scores drop to 4.6 avg. Multiple personas mention past experience with health platforms calling repeatedly after form submission.",
      affected_segments: ["Cautious Self-Treater", "Price-Sensitive Blue Collar Worker"],
      recommendation:
        "Show doctor profiles and consultation pricing before requesting personal details. Allow anonymous browsing of doctor credentials, reviews, and availability. Request contact info only at booking confirmation.",
    },
    {
      severity: "critical",
      type: "friction_point",
      screen: "app_login",
      finding:
        "Mandatory app login/OTP gate after browsing creates bait-and-switch perception \u2014 10% drop-off at this screen",
      evidence:
        "5 of 23 drop-offs occur at app_login. Users who navigated 4-5 screens of content on mobile web are suddenly told to download the app or enter OTP. Middle-aged users and those with older phones cite storage concerns. Emotional state shifts from 'engaged' to 'annoyed' or 'suspicious'.",
      affected_segments: ["Middle-Aged IT Professional", "Concerned Family Member"],
      recommendation:
        "Allow full consultation booking on mobile web without app download. If app is needed for follow-up, introduce it after booking confirmation as an optional convenience.",
    },
    {
      severity: "major",
      type: "confusion",
      screen: "health_description",
      finding:
        "Open-ended symptom description box causes embarrassment and confusion \u2014 users don't know medical terms for piles symptoms and feel shame typing details",
      evidence:
        "3 of 23 drop-offs at health_description. Trust score 5.2, clarity score 4.8 (lowest clarity in flow). Personas type hesitantly, delete text, and several mention not wanting a written record of their symptoms. One persona wrote 'bleeding' then deleted it fearing it would be stored.",
      affected_segments: ["Cautious Self-Treater", "Young Professional in Denial"],
      recommendation:
        "Replace open text box with guided symptom checklist (bleeding Y/N, pain level 1-5, duration selector). Pre-populate common symptoms so users tap rather than type embarrassing details.",
    },
    {
      severity: "major",
      type: "trust_issue",
      screen: "ad_landing",
      finding:
        "Clinical imagery and aggressive 'Book FREE Consultation' CTA on ad landing page triggers anxiety in first-time visitors researching a stigmatized condition",
      evidence:
        "4 of 23 drop-offs at ad_landing. Users arriving from Google ads expect educational content but encounter a sales-oriented page with clinical photos. Trust score 5.4 is low for a landing page. 7 personas flagged anxiety from imagery even among those who continued.",
      affected_segments: ["Young Professional in Denial", "Cautious Self-Treater"],
      recommendation:
        "Lead with educational content and patient testimonials rather than clinical imagery. Use reassuring language about privacy and discretion. Show 'FREE consultation' as secondary CTA after establishing trust.",
    },
    {
      severity: "minor",
      type: "friction_point",
      screen: "home_dashboard",
      finding:
        "Generic home dashboard after login doesn't preserve piles consultation context \u2014 users feel lost and need to re-navigate",
      evidence:
        "2 of 23 drop-offs at home_dashboard. After logging in, users land on a generic health dashboard with multiple condition categories instead of continuing their piles journey. 4 additional personas who completed flagged this as confusing.",
      affected_segments: ["Middle-Aged IT Professional", "Price-Sensitive Blue Collar Worker"],
      recommendation:
        "Deep-link post-login users directly to their piles consultation flow. Preserve browsing context through the login transition.",
    },
  ],

  // ── Segment Analysis ────────────────────────────────────────────────────────
  segment_analysis: {
    summary:
      "Sharp divide between health-literate professionals who have already decided to seek treatment and those still in early research or denial. Middle-Aged IT Professionals and Concerned Family Members convert at 70-80% \u2014 they have insurance, understand the condition, and are motivated by pain to complete the flow. Young Professionals in Denial (30%) and Cautious Self-Treaters (40%) drop due to embarrassment, distrust of data collection, and fear of being locked into surgical options.",
    high_propensity_segment:
      "Middle-Aged IT Professionals seeking discreet treatment \u2014 have health insurance, understand surgical options, motivated by recurring pain, and comfortable with digital health platforms.",
    low_propensity_segment:
      "Young Professionals in Denial (30% \u2014 embarrassment barrier) and Price-Sensitive Blue Collar Workers (40% \u2014 no insurance, fear of hidden costs, distrust of 'free consultation' promises).",
  },

  // ── Flow Assessment ─────────────────────────────────────────────────────────
  flow_assessment: {
    overall_verdict:
      "The doctor form kills 10% and the app login gate kills another 10% \u2014 together they account for 43% of all drop-offs. HexaHealth's flow treats a deeply stigmatized condition with the same aggressive lead-capture pattern used for elective cosmetic procedures, ignoring that piles patients are embarrassed, price-anxious, and need trust-building before data sharing.",
    what_works: [
      {
        element: "Piles detail page with treatment options breakdown",
        why: "Clear comparison of laser vs open surgery vs stapler gives users a sense of control and informed choice",
        for_whom: "Middle-Aged IT Professional, Concerned Family Member",
      },
      {
        element: "Conditions list showing specialization breadth",
        why: "Seeing HexaHealth treats multiple conditions builds credibility as a specialized surgical platform, not a generic clinic",
        for_whom: "All segments \u2014 clarity score 7.4 on this screen",
      },
      {
        element: "Free consultation positioning",
        why: "Removes initial cost barrier for price-sensitive segments \u2014 'free' is the primary driver for Blue Collar Workers who continue past the landing page",
        for_whom: "Price-Sensitive Blue Collar Worker, Concerned Family Member",
      },
      {
        element: "Doctor credentials display on form page",
        why: "Showing MBBS/MS qualifications and years of experience reassures users about surgical competence",
        for_whom: "Concerned Family Member, Middle-Aged IT Professional",
      },
    ],
    what_needs_fixing: [
      {
        element: "Doctor form \u2014 personal data before value",
        problem: "Name, phone, age collected before showing doctor profiles, pricing, or any consultation value",
        for_whom: "Cautious Self-Treater, Price-Sensitive Blue Collar Worker",
        fix: "Show doctor profiles and consultation details first. Request contact info only at booking confirmation step.",
        priority: "P0",
      },
      {
        element: "App login \u2014 mandatory download/OTP gate",
        problem: "Users who browsed 4-5 web pages are forced into app download or OTP to continue \u2014 feels like bait-and-switch",
        for_whom: "Middle-Aged IT Professional, Young Professional in Denial, Concerned Family Member",
        fix: "Allow full web-based consultation booking. Introduce app as optional post-booking for appointment tracking.",
        priority: "P0",
      },
      {
        element: "Health description \u2014 open text for embarrassing symptoms",
        problem: "Users don't know medical terminology and feel shame writing about piles symptoms in a text field",
        for_whom: "Young Professional in Denial, Cautious Self-Treater",
        fix: "Replace with guided symptom checklist (tap, don't type). Pre-populate common symptoms with simple language.",
        priority: "P1",
      },
      {
        element: "Ad landing \u2014 clinical imagery and aggressive CTA",
        problem: "Graphic medical imagery and 'Book FREE Consultation NOW' triggers anxiety for a stigmatized condition",
        for_whom: "Young Professional in Denial, Cautious Self-Treater",
        fix: "Lead with patient success stories and educational content. Use calming design language. Make CTA secondary to trust-building.",
        priority: "P1",
      },
    ],
    quick_wins: [
      {
        change: "Add 'Your information is 100% confidential' badge next to doctor form fields",
        expected_uplift: "Estimated 3-4% improvement in form completion by addressing privacy anxiety",
      },
      {
        change: "Replace open symptom text box with a 5-question guided checklist",
        expected_uplift: "Estimated 4-5% improvement by removing the embarrassment of typing symptoms",
      },
      {
        change: "Deep-link post-login users to piles consultation instead of generic dashboard",
        expected_uplift: "Estimated 2-3% improvement by preserving context through login transition",
      },
    ],
    fix_recommendations: [
      {
        root_cause: "Personal data collection before any value demonstration creates lead-capture perception",
        screen: "doctor_form",
        recommendation: "Show doctor profiles, pricing, and availability before requesting personal details",
        estimated_impact: "high",
        feasibility: "high",
        impact_feasibility_score: 9,
        affected_segment: "Cautious Self-Treater, Price-Sensitive Blue Collar Worker",
        expected_uplift: "Estimated 8-10% increase in completion rate by unblocking the 5 personas who drop at doctor_form",
      },
      {
        root_cause: "Mandatory app download/OTP gate disrupts web browsing flow and creates abandonment",
        screen: "app_login",
        recommendation: "Allow full consultation booking on mobile web without requiring app installation",
        estimated_impact: "high",
        feasibility: "medium",
        impact_feasibility_score: 8,
        affected_segment: "Middle-Aged IT Professional, Concerned Family Member",
        expected_uplift: "Estimated 8-10% increase in completion rate by removing the app download gate",
      },
      {
        root_cause: "Open-ended symptom input creates embarrassment and confusion for stigmatized condition",
        screen: "health_description",
        recommendation: "Replace text box with guided symptom checklist using simple non-medical language",
        estimated_impact: "medium",
        feasibility: "high",
        impact_feasibility_score: 7,
        affected_segment: "Young Professional in Denial, Cautious Self-Treater",
        expected_uplift: "Estimated 4-6% increase by reducing symptom description friction",
      },
      {
        root_cause: "Ad landing page uses clinical imagery that triggers anxiety instead of building trust",
        screen: "ad_landing",
        recommendation: "Lead with patient testimonials and educational content instead of clinical photos and aggressive CTAs",
        estimated_impact: "medium",
        feasibility: "high",
        impact_feasibility_score: 6,
        affected_segment: "Young Professional in Denial, Cautious Self-Treater",
        expected_uplift: "Estimated 4-6% increase by improving first-impression trust for stigmatized condition searches",
      },
      {
        root_cause: "Generic dashboard after login loses piles consultation context",
        screen: "home_dashboard",
        recommendation: "Deep-link post-login users to their piles consultation flow instead of generic home",
        estimated_impact: "low",
        feasibility: "high",
        impact_feasibility_score: 5,
        affected_segment: "Middle-Aged IT Professional, Price-Sensitive Blue Collar Worker",
        expected_uplift: "Estimated 2-3% increase by preserving navigation context through auth transition",
      },
    ],
    usability_score: 48,
    emotional_journey_map: {
      completers:
        "Anxious (ad_landing \u2014 'piles treatment... okay, let me read this discreetly') \u2192 Reassured (conditions_list \u2014 'they specialize in this, not just a random clinic') \u2192 Informed (piles_detail \u2014 'laser treatment sounds less scary than I thought') \u2192 Uncomfortable (health_description \u2014 'do I really have to type this out?') \u2192 Cautious (doctor_form \u2014 'fine, if the consultation is free...') \u2192 Annoyed (app_login \u2014 'another OTP? just let me book') \u2192 Confused (home_dashboard \u2014 'where did my piles consultation go?') \u2192 Relieved (submit_question \u2014 'finally, question submitted, now I wait')",
      drop_offs:
        "Anxious (ad_landing \u2014 'these clinical photos are making me more nervous, not less') \u2192 [EXIT] OR Overwhelmed (conditions_list \u2014 'too many conditions, I just want piles info') \u2192 [EXIT] OR Embarrassed (health_description \u2014 'I can't type this... what if someone sees my screen?') \u2192 [EXIT] OR Suspicious (doctor_form \u2014 'they want my phone number? they'll spam me with calls about surgery I can't afford') \u2192 [EXIT] OR Frustrated (app_login \u2014 'I was browsing fine on the web, why do I need to download an app now?') \u2192 [EXIT] OR Lost (home_dashboard \u2014 'I logged in and now I can't find where to submit my question') \u2192 [EXIT]",
    },
  },

  // ── Drop-Off Analysis ───────────────────────────────────────────────────────
  drop_off_analysis: {
    top_n_screens: 3,
    total_drop_offs_analyzed: 13,
    screens: {
      doctor_form: {
        total_drop_offs: 5,
        clusters: [
          {
            cluster_id: 1,
            label: "Fear of spam calls after sharing phone number",
            persona_count: 3,
            representative_reasoning:
              "I've been burned before by healthcare platforms. Last year I filled a form on Practo for a general checkup and got 15 calls in one week from different hospitals. Now this HexaHealth wants my phone number for a 'free consultation' about piles? Free means they'll sell my number to every proctologist in Mumbai. I'll just go to my local doctor instead of giving my details to an app.",
          },
          {
            cluster_id: 2,
            label: "No cost transparency before data collection",
            persona_count: 2,
            representative_reasoning:
              "The consultation is free, but what about the actual treatment? Laser surgery for piles costs \u20b940,000-80,000 from what I've read online. I have no insurance. Before I give my name and phone number, I need to know if this is something I can even afford. The form doesn't mention anything about treatment costs or EMI options. I feel like once I submit, they'll hard-sell me a ₹70K surgery.",
          },
        ],
      },
      app_login: {
        total_drop_offs: 5,
        clusters: [
          {
            cluster_id: 1,
            label: "Unwilling to download app for one-time consultation",
            persona_count: 3,
            representative_reasoning:
              "I was browsing piles treatment information on the website perfectly fine. Now suddenly it wants me to download the HexaHealth app? My phone has 2GB free storage. I'm not downloading a 150MB health app for one consultation about piles. If they can show me treatment information on the web, why can't they let me book on the web too? This feels like a trick to boost their app download numbers.",
          },
          {
            cluster_id: 2,
            label: "OTP fatigue and privacy concern for sensitive condition",
            persona_count: 2,
            representative_reasoning:
              "Another OTP? I already entered my phone number on the doctor form. Now they want me to verify via OTP to log into the app? That's my phone number linked to a piles treatment platform forever. What if someone checks my SMS and sees 'HexaHealth OTP'? I was researching this privately. The web was anonymous. The app makes it permanent and traceable.",
          },
        ],
      },
      ad_landing: {
        total_drop_offs: 4,
        clusters: [
          {
            cluster_id: 1,
            label: "Clinical imagery triggers anxiety rather than trust",
            persona_count: 2,
            representative_reasoning:
              "I Googled 'piles treatment without surgery Mumbai' and clicked on the HexaHealth ad. The landing page has these clinical photos and diagrams that are making me more anxious. I was hoping for something reassuring \u2014 patient stories, recovery timelines, maybe a video of someone saying 'it wasn't that bad.' Instead I feel like I'm on a medical textbook page. My anxiety just doubled.",
          },
          {
            cluster_id: 2,
            label: "Aggressive 'FREE consultation' CTA feels like a sales trap",
            persona_count: 2,
            representative_reasoning:
              "Everything is FREE FREE FREE in big letters. In my experience, when something medical is free, they'll upsell you into expensive procedures. My cousin went for a 'free dental checkup' and came out with a \u20b925,000 bill for procedures he didn't need. I don't trust free medical consultations. Show me your actual pricing and let me decide if it's worth it.",
          },
        ],
      },
    },
  },

  // ── Segments Used ───────────────────────────────────────────────────────────
  segments_used: [
    "Middle-Aged IT Professional Seeking Discreet Treatment",
    "Young Professional in Denial About Symptoms",
    "Price-Sensitive Blue Collar Worker",
    "Concerned Family Member Researching for Relative",
    "Cautious Self-Treater Exploring Options",
  ],

  // ── Segment Completion Summary ──────────────────────────────────────────────
  segment_completion_summary: [
    {
      segment: "Young Professional in Denial About Symptoms",
      total: 10,
      completed: 3,
      dropped: 7,
      completion_pct: 30,
      top_drop_off_screen: "health_description",
      top_drop_off_reason: "Embarrassment about typing piles symptoms in an open text field",
    },
    {
      segment: "Price-Sensitive Blue Collar Worker",
      total: 10,
      completed: 4,
      dropped: 6,
      completion_pct: 40,
      top_drop_off_screen: "doctor_form",
      top_drop_off_reason: "No cost transparency \u2014 fears hidden surgical costs with no insurance coverage",
    },
    {
      segment: "Cautious Self-Treater Exploring Options",
      total: 10,
      completed: 4,
      dropped: 6,
      completion_pct: 40,
      top_drop_off_screen: "doctor_form",
      top_drop_off_reason: "Unwilling to share phone number before seeing doctor profiles and consultation details",
    },
    {
      segment: "Concerned Family Member Researching for Relative",
      total: 10,
      completed: 8,
      dropped: 2,
      completion_pct: 80,
      top_drop_off_screen: "app_login",
      top_drop_off_reason: "Researching on behalf of elderly parent \u2014 can't download app on parent's phone remotely",
    },
    {
      segment: "Middle-Aged IT Professional Seeking Discreet Treatment",
      total: 10,
      completed: 8,
      dropped: 2,
      completion_pct: 80,
      top_drop_off_screen: "app_login",
      top_drop_off_reason: "Phone storage full \u2014 unwilling to install another health app for a single consultation",
    },
  ],

  // ── Segment-Screen Breakdown ────────────────────────────────────────────────
  segment_screen_breakdown: {
    ad_landing: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 10, dropped_off: 2, drop_off_pct: 20.0 },
      "Price-Sensitive Blue Collar Worker": { reached: 10, dropped_off: 1, drop_off_pct: 10.0 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 10, dropped_off: 1, drop_off_pct: 10.0 },
    },
    conditions_list: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "Price-Sensitive Blue Collar Worker": { reached: 9, dropped_off: 1, drop_off_pct: 11.1 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 9, dropped_off: 0, drop_off_pct: 0 },
    },
    piles_detail: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 8, dropped_off: 1, drop_off_pct: 12.5 },
      "Price-Sensitive Blue Collar Worker": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 9, dropped_off: 1, drop_off_pct: 11.1 },
    },
    health_description: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 7, dropped_off: 2, drop_off_pct: 28.6 },
      "Price-Sensitive Blue Collar Worker": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 8, dropped_off: 1, drop_off_pct: 12.5 },
    },
    doctor_form: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
      "Price-Sensitive Blue Collar Worker": { reached: 8, dropped_off: 3, drop_off_pct: 37.5 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 7, dropped_off: 2, drop_off_pct: 28.6 },
    },
    app_login: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 10, dropped_off: 2, drop_off_pct: 20.0 },
      "Young Professional in Denial About Symptoms": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Price-Sensitive Blue Collar Worker": { reached: 5, dropped_off: 1, drop_off_pct: 20.0 },
      "Concerned Family Member Researching for Relative": { reached: 10, dropped_off: 1, drop_off_pct: 10.0 },
      "Cautious Self-Treater Exploring Options": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    home_dashboard: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Price-Sensitive Blue Collar Worker": { reached: 4, dropped_off: 1, drop_off_pct: 25.0 },
      "Concerned Family Member Researching for Relative": { reached: 9, dropped_off: 0, drop_off_pct: 0 },
      "Cautious Self-Treater Exploring Options": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
    submit_question: {
      "Middle-Aged IT Professional Seeking Discreet Treatment": { reached: 8, dropped_off: 0, drop_off_pct: 0 },
      "Young Professional in Denial About Symptoms": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Price-Sensitive Blue Collar Worker": { reached: 3, dropped_off: 0, drop_off_pct: 0 },
      "Concerned Family Member Researching for Relative": { reached: 9, dropped_off: 1, drop_off_pct: 11.1 },
      "Cautious Self-Treater Exploring Options": { reached: 5, dropped_off: 0, drop_off_pct: 0 },
    },
  },

  // ── Drop-Off Monologues ─────────────────────────────────────────────────────
  drop_off_monologues: {
    doctor_form: [
      {
        persona_uuid: "hexa-persona-014",
        persona_label: "34yo Auto-Rickshaw Driver, Andheri East",
        behavioral_archetype: "Price-Sensitive Blue Collar Worker",
        internal_monologue:
          "Free consultation they say, but what after that? Piles surgery costs \u20b950,000-70,000 I've heard. I drive auto 12 hours a day, that's 3 months of income. They want my phone number but won't tell me what the treatment will cost. Last time I gave my number to a hospital website, they called me 8 times in two days asking me to come for a 'discounted check-up' that turned into a \u20b912,000 bill. I'll just keep using the Himalaya Pilex ointment from the medical shop.",
        reasoning:
          "No upfront pricing creates fear of unaffordable upsell. Past negative experience with healthcare lead generation reinforces distrust.",
        emotional_state: "distrustful",
        trust_score: 3,
        clarity_score: 5,
        value_score: 4,
      },
      {
        persona_uuid: "hexa-persona-031",
        persona_label: "41yo Homemaker, Dwarka",
        behavioral_archetype: "Cautious Self-Treater",
        internal_monologue:
          "I've been managing piles with home remedies \u2014 isabgol, warm water baths, avoiding spicy food. My neighbour told me about HexaHealth for when it gets worse. But this form wants my real name and phone number? My husband doesn't know I have piles. I told him it's just acidity. If HexaHealth calls me or sends an SMS about 'piles treatment,' he'll see it on my phone. I need a platform that understands this is a private matter.",
        reasoning:
          "Stigma around condition creates need for extreme privacy. Phone-based communication is a liability when condition is hidden from family.",
        emotional_state: "anxious",
        trust_score: 3,
        clarity_score: 6,
        value_score: 5,
      },
    ],
    app_login: [
      {
        persona_uuid: "hexa-persona-007",
        persona_label: "45yo IT Manager, Powai",
        behavioral_archetype: "Middle-Aged IT Professional",
        internal_monologue:
          "I've been reading about laser piles treatment for 20 minutes on this website. The information was good. Now it's asking me to download the HexaHealth app to continue? I have 64GB phone with 1.2GB free \u2014 mostly my daughter's photos. I'm not deleting family memories to install a piles app. Just let me book the consultation on the website. Why does every company in India think they need an app?",
        reasoning:
          "Phone storage constraints combined with low perceived value of installing a dedicated app for a one-time consultation.",
        emotional_state: "irritated",
        trust_score: 5,
        clarity_score: 7,
        value_score: 4,
      },
      {
        persona_uuid: "hexa-persona-042",
        persona_label: "55yo Retired Teacher, Vasant Kunj",
        behavioral_archetype: "Concerned Family Member",
        internal_monologue:
          "I'm looking into this for my 78-year-old father who has been suffering from piles for years. He lives alone in Patna. I was going to book a Delhi consultation for when he visits next month. But now it wants me to log into an app? I can't install apps on his phone remotely, and if I use my account, the consultation will be under my name, not his. This doesn't work for people booking on behalf of elderly parents.",
        reasoning:
          "Proxy booking scenario not supported by app-centric login flow. Common pattern for elderly patient care in Indian families.",
        emotional_state: "frustrated",
        trust_score: 5,
        clarity_score: 5,
        value_score: 6,
      },
    ],
    health_description: [
      {
        persona_uuid: "hexa-persona-019",
        persona_label: "26yo Sales Executive, Gurgaon",
        behavioral_archetype: "Young Professional in Denial",
        internal_monologue:
          "It's asking me to 'describe your condition in detail.' Describe what exactly? That I bleed when I go to the bathroom? That I can't sit for long meetings without pain? I started typing 'bleeding during...' and then deleted it. What if this gets stored somewhere? What if there's a data breach and my employer finds out? I know I need to see a doctor but I can't type these words into a form on my phone. This needs to be a private conversation, not a text submission.",
        reasoning:
          "Acute embarrassment about written documentation of stigmatized symptoms. Fear of data persistence and breach.",
        emotional_state: "mortified",
        trust_score: 4,
        clarity_score: 3,
        value_score: 5,
      },
    ],
    ad_landing: [
      {
        persona_uuid: "hexa-persona-023",
        persona_label: "29yo Graphic Designer, Bandra",
        behavioral_archetype: "Young Professional in Denial",
        internal_monologue:
          "I clicked the Google ad because it said 'painless piles treatment.' The landing page has this clinical diagram of... the area. I'm sitting in a cafe. I literally tilted my phone away from the person next to me. Why would you put graphic medical images on a landing page that people click from Google Search in public? I was looking for reassurance that treatment isn't scary, and instead I got a medical textbook. Closing this tab immediately.",
        reasoning:
          "Clinical imagery inappropriate for initial touchpoint. Users search for piles treatment in public contexts and need discreet content.",
        emotional_state: "embarrassed",
        trust_score: 4,
        clarity_score: 6,
        value_score: 5,
      },
    ],
  },

  // ── Fix Recommendations ─────────────────────────────────────────────────────
  fix_recommendations: [
    {
      root_cause:
        "Doctor form collects personal data (name, phone, age) before demonstrating any consultation value",
      screen: "doctor_form",
      recommendation:
        "Show doctor profiles, credentials, patient reviews, and consultation pricing before requesting personal details \u2014 request contact info only at booking confirmation",
      estimated_impact: "high",
      feasibility: "high",
      impact_feasibility_score: 9,
      affected_segment: "Cautious Self-Treater, Price-Sensitive Blue Collar Worker",
      expected_uplift:
        "Estimated 8-10% increase in completion rate by building trust before data collection",
    },
    {
      root_cause:
        "Mandatory app download/OTP gate disrupts mobile web browsing flow mid-journey",
      screen: "app_login",
      recommendation:
        "Allow complete consultation booking on mobile web without app installation \u2014 introduce app as optional post-booking convenience",
      estimated_impact: "high",
      feasibility: "medium",
      impact_feasibility_score: 8,
      affected_segment: "Middle-Aged IT Professional, Concerned Family Member",
      expected_uplift:
        "Estimated 8-10% increase by removing the app download gate that causes 10% drop-off",
    },
    {
      root_cause:
        "Open text box for symptom description creates embarrassment and confusion for stigmatized condition",
      screen: "health_description",
      recommendation:
        "Replace open text field with guided symptom checklist using simple non-medical language (tap-to-select symptoms, pain scale slider, duration dropdown)",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 7,
      affected_segment: "Young Professional in Denial, Cautious Self-Treater",
      expected_uplift:
        "Estimated 4-6% increase by eliminating the need to type embarrassing symptom details",
    },
    {
      root_cause:
        "Ad landing page uses clinical imagery that increases anxiety for users researching a stigmatized condition",
      screen: "ad_landing",
      recommendation:
        "Replace clinical diagrams with patient testimonials, recovery timelines, and reassuring imagery \u2014 lead with 'you're not alone' messaging before medical details",
      estimated_impact: "medium",
      feasibility: "high",
      impact_feasibility_score: 6,
      affected_segment: "Young Professional in Denial, Cautious Self-Treater",
      expected_uplift:
        "Estimated 4-6% increase in ad landing retention by reducing first-impression anxiety",
    },
    {
      root_cause:
        "Post-login dashboard is generic and loses piles consultation context, requiring users to re-navigate",
      screen: "home_dashboard",
      recommendation:
        "Deep-link post-login users directly to their in-progress piles consultation \u2014 preserve browsing context through authentication transition",
      estimated_impact: "low",
      feasibility: "high",
      impact_feasibility_score: 5,
      affected_segment: "Middle-Aged IT Professional, Price-Sensitive Blue Collar Worker",
      expected_uplift:
        "Estimated 2-3% increase by preventing context loss after login",
    },
  ],

  // ── Expected Completion Rate ────────────────────────────────────────────────
  expected_completion_rate_pct: undefined as unknown as number,

  // ── Persona Details ─────────────────────────────────────────────────────────
  persona_details: [
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 1: Middle-Aged IT Professional (8/10 complete)
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "hexa-persona-001",
      demographics: {
        first_language: "Hindi",
        age: 42,
        occupation: "Senior Engineering Manager",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "Middle-Aged IT Professional",
        marital_status: "Married",
      },
      professional_background:
        "Engineering Manager at a fintech company in BKC. \u20b938L CTC. Has company health insurance (HDFC Ergo) covering surgical procedures. Suffers from piles for 3 years, managed with ointments. Sitting all day at work worsens condition.",
      cultural_background:
        "Grew up in Lucknow, moved to Mumbai after IIT Bombay. Lives with wife and two kids in Powai. Hasn't told anyone at work about the condition. Researches treatment options privately on his phone after family sleeps.",
      outcome: "completed",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 65,
      overall_monologue:
        "I've been putting this off for 3 years. The piles have gone from occasional discomfort to daily pain during long meetings. My insurance covers surgical procedures so cost isn't the issue \u2014 it's the embarrassment. HexaHealth at least lets me research privately. The flow was mostly okay until the app download part, which was annoying, but I powered through because I genuinely need treatment. The symptom description box was awkward but I typed clinical terms since I've researched this enough. Free consultation is a good entry point. Let me see what the doctor says.",
      screen_monologues: [
        {
          screen_id: "ad_landing",
          view_name: "Ad Landing Page",
          internal_monologue: "Piles treatment with laser... okay, this is what I've been reading about. 'Painless, daycare procedure' \u2014 that's what I need. Can't take more than 1 day off work without questions.",
          reasoning: "Aligned with need for discreet, minimal-downtime treatment",
          emotional_state: "cautiously_interested",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 10,
        },
        {
          screen_id: "conditions_list",
          view_name: "Conditions List",
          internal_monologue: "They treat fistula, fissures, and piles all separately \u2014 good, this isn't a general hospital. Specialization matters for this kind of surgery.",
          reasoning: "Specialization signals competence for sensitive surgical procedures",
          emotional_state: "reassured",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 7,
          time_seconds: 6,
        },
        {
          screen_id: "piles_detail",
          view_name: "Piles Treatment Detail",
          internal_monologue: "Laser treatment, 30 minutes, same-day discharge. Insurance accepted. This is exactly what I need. Now show me the doctors.",
          reasoning: "Treatment details match requirements \u2014 fast, insured, modern technique",
          emotional_state: "optimistic",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 8,
          value_score: 8,
          time_seconds: 12,
        },
        {
          screen_id: "health_description",
          view_name: "Health Description",
          internal_monologue: "Describe my condition... okay. 'Grade 2 hemorrhoids, intermittent bleeding, 3 years duration.' I'll keep it clinical. Wish there was a checklist instead of a text box.",
          reasoning: "Health literacy allows clinical description but prefers structured input",
          emotional_state: "uncomfortable",
          friction_points: ["Open text box for sensitive symptoms"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 20,
        },
        {
          screen_id: "doctor_form",
          view_name: "Doctor Consultation Form",
          internal_monologue: "Name, age, phone. Standard. The consultation is free and I need this, so fine. But they should have shown me doctor profiles first.",
          reasoning: "Motivated enough to share data despite preference for value-first approach",
          emotional_state: "neutral",
          friction_points: ["Data collection before showing doctor profiles"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 5,
          time_seconds: 12,
        },
        {
          screen_id: "app_login",
          view_name: "App Login / OTP",
          internal_monologue: "Download the app? I was on the website. Fine, I'll do OTP login. But making me download an app just to book a consultation is unnecessary friction.",
          reasoning: "Annoyed by app gate but sufficiently motivated to continue via OTP path",
          emotional_state: "annoyed",
          friction_points: ["Forced app download/OTP to continue"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 4,
          time_seconds: 8,
        },
        {
          screen_id: "home_dashboard",
          view_name: "Home Dashboard",
          internal_monologue: "I logged in and... this is a generic dashboard? Where's my piles consultation? Let me look for... okay, found it under 'My Consultations.' But why didn't it take me there directly?",
          reasoning: "Context loss after login creates unnecessary navigation friction",
          emotional_state: "confused",
          friction_points: ["Lost consultation context after login"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 4,
          value_score: 5,
          time_seconds: 8,
        },
        {
          screen_id: "submit_question",
          view_name: "Submit Question",
          internal_monologue: "Okay, submitting my consultation request. 'A doctor will respond within 24 hours.' That's fine \u2014 I've waited 3 years, I can wait one more day. At least the process has started.",
          reasoning: "Relief at completing the journey despite friction points",
          emotional_state: "relieved",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 7,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 8,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 2: Young Professional in Denial — Drop-off at health_description
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "hexa-persona-019",
      demographics: {
        first_language: "Hindi",
        age: 26,
        occupation: "Sales Executive",
        district: "Gurgaon",
        zone: "North",
        sex: "Male",
        behavioral_archetype: "Young Professional in Denial",
        marital_status: "Unmarried",
      },
      professional_background:
        "B2B SaaS sales at a Gurgaon startup. \u20b98L CTC. No health insurance. Spends long hours sitting in client meetings and driving between offices. Started noticing symptoms 6 months ago but hasn't seen a doctor.",
      cultural_background:
        "From Jaipur, living alone in a 1RK in Sohna Road. Family doesn't know about his condition. Friends joke about piles being an 'uncle disease' so he can't discuss it with peers. Researches everything on phone in private browsing mode.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 38,
      overall_monologue:
        "I know I probably have piles but I can't bring myself to type that into a form. I was fine browsing the information \u2014 the treatment options page was actually helpful. But when it asked me to 'describe my condition in detail,' I froze. I started typing and then deleted everything. What if this gets hacked? What if my employer somehow finds out? My friends already call piles a budhon ki bimari (old people's disease). I'm 26. I'll try home remedies for another few months and see if it goes away on its own.",
      screen_monologues: [
        {
          screen_id: "ad_landing",
          view_name: "Ad Landing Page",
          internal_monologue: "Painless piles treatment... I need this but the clinical photos on this page are making me anxious. At least it says 'confidential consultation.'",
          reasoning: "Need for treatment overrides initial anxiety from clinical imagery",
          emotional_state: "anxious",
          friction_points: ["Clinical imagery triggers anxiety"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 6,
          time_seconds: 10,
        },
        {
          screen_id: "conditions_list",
          view_name: "Conditions List",
          internal_monologue: "Piles, fissure, fistula \u2014 I'm not even sure which one I have. The descriptions help. Let me click on piles.",
          reasoning: "Diagnostic uncertainty but willing to explore further",
          emotional_state: "uncertain",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 8,
        },
        {
          screen_id: "piles_detail",
          view_name: "Piles Treatment Detail",
          internal_monologue: "Grade 1 to Grade 4... I think I'm Grade 2 based on the description. Laser treatment sounds modern and less scary than surgery. 'Back to normal in 48 hours' \u2014 I could do this over a weekend without anyone knowing.",
          reasoning: "Treatment details reduce fear and provide hope for discreet resolution",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 14,
        },
        {
          screen_id: "health_description",
          view_name: "Health Description",
          internal_monologue: "Describe your condition in detail... I started typing 'bleeding during...' and then deleted it. What if this gets stored somewhere? What if there's a data breach? I can't have my name associated with piles treatment in any database. I know I need help but I can't type these words. I'm closing this.",
          reasoning: "Acute embarrassment about written documentation of stigmatized symptoms. Fear of data persistence.",
          emotional_state: "mortified",
          friction_points: ["Open text for embarrassing symptoms", "Data privacy fear for sensitive condition", "No guided input alternative"],
          decision_outcome: "DROP_OFF",
          trust_score: 4,
          clarity_score: 3,
          value_score: 5,
          time_seconds: 25,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 3: Price-Sensitive Blue Collar Worker — Drop-off at doctor_form
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "hexa-persona-014",
      demographics: {
        first_language: "Marathi",
        age: 34,
        occupation: "Auto-Rickshaw Driver",
        district: "Mumbai Suburban",
        zone: "West",
        sex: "Male",
        behavioral_archetype: "Price-Sensitive Blue Collar Worker",
        marital_status: "Married",
      },
      professional_background:
        "Drives auto-rickshaw in Andheri-Goregaon area. Monthly income \u20b925,000-30,000. No health insurance. Wife works as domestic help. Two school-going children. Has been suffering from piles for 2 years \u2014 long hours of sitting on the auto seat worsens it daily.",
      cultural_background:
        "From Kolhapur, living in a chawl in Andheri East for 10 years. Gets health advice from local chemist shop. Has never been to a private hospital. Used government hospital once for his son's fracture \u2014 waited 6 hours.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 42,
      overall_monologue:
        "The piles have gotten so bad I can barely sit on the auto seat for my full shift. My chemist dada gave me Pilex ointment but it stopped working. I saw the HexaHealth ad on YouTube and the 'free consultation' got my attention. But when the form asked for my phone number without telling me what the treatment costs, I got scared. My neighbour went for a 'free dental check-up' and came back with a \u20b925,000 bill. I earn \u20b930,000 a month. If piles surgery is \u20b960,000 like people say, that's 2 months of income. Tell me the cost first, then I'll give you my number.",
      screen_monologues: [
        {
          screen_id: "ad_landing",
          view_name: "Ad Landing Page",
          internal_monologue: "Free consultation for piles! Finally something I can afford. Let me see what they offer.",
          reasoning: "'Free' is the primary driver for engagement given severe budget constraints",
          emotional_state: "hopeful",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 10,
        },
        {
          screen_id: "conditions_list",
          view_name: "Conditions List",
          internal_monologue: "Bawaseer (piles) \u2014 yes, that's what I have. Let me click on it.",
          reasoning: "Recognizes condition, navigates without difficulty",
          emotional_state: "focused",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 6,
          time_seconds: 5,
        },
        {
          screen_id: "piles_detail",
          view_name: "Piles Treatment Detail",
          internal_monologue: "Laser treatment, 30 minutes, go home same day. That's good \u2014 I can't afford to miss more than one day of driving. But kitna paisa lagega (how much will it cost)? They mention 'starting from' but no actual number. EMI available... but how much EMI?",
          reasoning: "Treatment logistics are attractive but cost anxiety is dominant concern",
          emotional_state: "interested_but_anxious",
          friction_points: ["No clear pricing information"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 6,
          value_score: 7,
          time_seconds: 15,
        },
        {
          screen_id: "health_description",
          view_name: "Health Description",
          internal_monologue: "Describe condition... 'Bawaseer 2 saal se hai. Khoon aata hai. Auto chalate waqt bahut dard hota hai.' (Having piles for 2 years. Bleeding. Pain while driving auto.) Simple enough. I wrote it in Hinglish.",
          reasoning: "Less inhibited about description \u2014 pragmatic approach to health concern",
          emotional_state: "matter_of_fact",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 18,
        },
        {
          screen_id: "doctor_form",
          view_name: "Doctor Consultation Form",
          internal_monologue: "Name, age, phone number. Free consultation hai toh theek hai, par baad mein kitna lagega? (Free consultation is fine, but how much later?) No pricing shown anywhere. Last time I gave my number to a hospital website, they called 8 times. If piles surgery is \u20b960,000, I can't afford it. I'm not giving my number until I know the cost.",
          reasoning: "No cost transparency before data collection. Past negative experience with healthcare lead generation.",
          emotional_state: "distrustful",
          friction_points: ["No pricing before phone number collection", "Fear of sales spam calls", "Cannot afford surprise surgical costs"],
          decision_outcome: "DROP_OFF",
          trust_score: 3,
          clarity_score: 5,
          value_score: 4,
          time_seconds: 15,
        },
      ],
    },
    // ══════════════════════════════════════════════════════════════════════════
    // SEGMENT 4: Concerned Family Member — Drop-off at app_login
    // ══════════════════════════════════════════════════════════════════════════
    {
      persona_uuid: "hexa-persona-042",
      demographics: {
        first_language: "Hindi",
        age: 55,
        occupation: "Retired School Teacher",
        district: "South Delhi",
        zone: "North",
        sex: "Female",
        behavioral_archetype: "Concerned Family Member",
        marital_status: "Widowed",
      },
      professional_background:
        "Retired government school teacher, pension \u20b935,000/month. Lives in Vasant Kunj. Researching piles treatment for her 78-year-old father who lives alone in Patna. Father has been suffering for years but refuses to see a doctor out of embarrassment.",
      cultural_background:
        "From Patna, settled in Delhi after marriage. Father is a retired railway officer, very private about health issues. She manages his healthcare remotely \u2014 books doctor appointments, orders medicines via 1mg. Trying to convince him to get piles treatment when he visits Delhi next month.",
      outcome: "dropped_off",
      key_selections: {},
      final_price_inr: null,
      total_time_seconds: 55,
      overall_monologue:
        "I'm trying to book a piles consultation for my father who won't do it himself. The website was helpful \u2014 I showed him the treatment details on video call and he finally agreed to visit a doctor when he comes to Delhi next month. But now the flow wants me to log into an app. If I use my phone, the consultation will be under my name and details, not his. If I try to set it up on his phone, he doesn't know how to use apps and I'm not there in Patna. Why can't I just book an appointment on the website and give his details? This proxy booking for elderly parents should be basic functionality for a healthcare platform in India.",
      screen_monologues: [
        {
          screen_id: "ad_landing",
          view_name: "Ad Landing Page",
          internal_monologue: "Piles treatment with experienced doctors in Delhi. Good \u2014 I can book for Papa when he visits next month. Let me see the details.",
          reasoning: "Researching on behalf of elderly father \u2014 proxy healthcare decision-maker",
          emotional_state: "determined",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 8,
        },
        {
          screen_id: "conditions_list",
          view_name: "Conditions List",
          internal_monologue: "Piles \u2014 that's what Papa has. He calls it 'bawaseer' and won't discuss it further. Let me read the details.",
          reasoning: "Navigating on behalf of patient who won't engage directly",
          emotional_state: "focused",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 8,
          value_score: 6,
          time_seconds: 5,
        },
        {
          screen_id: "piles_detail",
          view_name: "Piles Treatment Detail",
          internal_monologue: "Laser treatment, 30 minutes, same-day. This is good for Papa \u2014 at 78, he can't handle long hospital stays. He has railway medical card, will that work for insurance? No mention of CGHS or railway insurance compatibility.",
          reasoning: "Evaluating treatment feasibility for elderly parent with government insurance",
          emotional_state: "encouraged",
          friction_points: ["No government insurance compatibility mentioned"],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 7,
          value_score: 7,
          time_seconds: 14,
        },
        {
          screen_id: "health_description",
          view_name: "Health Description",
          internal_monologue: "I'll describe Papa's condition as he told me on the phone \u2014 'Grade 3 piles, 5+ years, bleeding and prolapse. 78 year old male, diabetic.' Writing on his behalf is fine \u2014 I've done this at every hospital.",
          reasoning: "Experienced proxy healthcare navigator for elderly parent",
          emotional_state: "matter_of_fact",
          friction_points: [],
          decision_outcome: "CONTINUE",
          trust_score: 6,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 15,
        },
        {
          screen_id: "doctor_form",
          view_name: "Doctor Consultation Form",
          internal_monologue: "I'll enter Papa's name and age. For phone number... should I put mine or his? He doesn't check his phone. I'll put mine and explain the situation to the doctor.",
          reasoning: "Proxy booking creates confusion about whose contact details to enter",
          emotional_state: "slightly_confused",
          friction_points: ["No option to indicate booking on behalf of someone else"],
          decision_outcome: "CONTINUE",
          trust_score: 5,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 12,
        },
        {
          screen_id: "app_login",
          view_name: "App Login / OTP",
          internal_monologue: "Download the app or enter OTP? If I download on my phone, everything will be under my account \u2014 my name, my medical history. I can't create an account for Papa remotely. He can't install apps himself in Patna. Why can't I just book an appointment on the website with his details? Every other hospital lets me book for a family member on their website.",
          reasoning: "App-centric login doesn't support proxy booking for elderly family members in different cities",
          emotional_state: "frustrated",
          friction_points: ["No proxy booking for family members", "App login ties to personal account, not patient", "Can't set up remotely for elderly parent"],
          decision_outcome: "DROP_OFF",
          trust_score: 5,
          clarity_score: 5,
          value_score: 6,
          time_seconds: 12,
        },
      ],
    },
  ],

  // ── Persona Journeys ────────────────────────────────────────────────────────
  persona_journeys: [
    {
      persona_type: "Middle-Aged IT Professional (42yo, Mumbai)",
      plan_chosen: "N/A",
      key_decision_moment: "Piles detail page showing laser treatment with same-day discharge confirmed this was the right approach for discreet, minimal-disruption treatment",
      emotional_arc: "Cautiously interested \u2192 Reassured by specialization \u2192 Optimistic about treatment \u2192 Uncomfortable at symptom box \u2192 Annoyed at app gate \u2192 Confused by dashboard \u2192 Relieved at submission",
    },
    {
      persona_type: "Young Professional in Denial (26yo, Gurgaon)",
      plan_chosen: "N/A",
      key_decision_moment: "Dropped at health description \u2014 started typing symptoms then deleted everything due to embarrassment and data privacy fear",
      emotional_arc: "Anxious \u2192 Uncertain \u2192 Hopeful about discreet treatment \u2192 Mortified at typing symptoms \u2192 EXIT",
    },
    {
      persona_type: "Auto-Rickshaw Driver (34yo, Mumbai)",
      plan_chosen: "N/A",
      key_decision_moment: "Dropped at doctor form \u2014 no pricing shown before phone number collection, feared unaffordable surgical upsell based on past experience",
      emotional_arc: "Hopeful about free consultation \u2192 Interested in quick treatment \u2192 Pragmatic about symptoms \u2192 Distrustful at data collection without pricing \u2192 EXIT",
    },
    {
      persona_type: "Retired Teacher booking for father (55yo, Delhi)",
      plan_chosen: "N/A",
      key_decision_moment: "Dropped at app login \u2014 proxy booking for elderly father in another city not supported by app-centric flow",
      emotional_arc: "Determined \u2192 Focused \u2192 Encouraged by treatment options \u2192 Confused by form (whose details?) \u2192 Frustrated at app gate \u2192 EXIT",
    },
  ],

  // ── Behavioral Insights ─────────────────────────────────────────────────────
  behavioral_insights: [
    "Piles patients research treatment in private browsing mode \u2014 any friction that creates a permanent trace (app download, SMS OTP visible to others, account creation) triggers abandonment among younger users",
    "Proxy healthcare booking (family member researching for elderly parent) is a dominant pattern in Indian healthcare but HexaHealth's flow doesn't support it",
    "Price-sensitive users need treatment cost ranges before sharing contact information \u2014 'free consultation' paradoxically increases suspicion of hidden costs among those who've been burned by healthcare lead generation",
    "The stigma around piles creates a unique UX requirement: guided symptom input (tapping, not typing) and visual discretion (no clinical imagery on pages viewable in public) are not nice-to-haves but essential for this condition",
    "Users arriving from condition-specific Google ads expect to stay in that condition's context throughout the flow \u2014 any generic page (conditions list, home dashboard) feels like wasted clicks",
  ],

  // ── User Mental Models ──────────────────────────────────────────────────────
  user_mental_models: {
    expectations: [
      "See treatment details, doctor profiles, and pricing before sharing personal information",
      "Complete the entire consultation booking on the mobile web without downloading an app",
      "Be able to book on behalf of a family member (proxy healthcare is standard in India)",
      "Private, discreet experience appropriate for a stigmatized health condition",
    ],
    gaps_found: [
      "Flow collects data before value \u2014 users expect to see doctors and pricing first",
      "App download gate in mid-flow violates web browsing mental model",
      "No proxy booking option despite elderly-patient-care being a primary use case",
      "Open text symptom input assumes medical literacy and comfort with written disclosure",
    ],
    surprising_behaviors: [
      "26yo male started typing piles symptoms then deleted everything \u2014 typed and erased 3 times before abandoning",
      "55yo woman navigated entire flow confidently but abandoned at app login because proxy booking wasn't supported",
      "34yo auto driver was more comfortable describing symptoms in Hinglish than higher-income users who struggled with clinical terminology",
      "Multiple users tilted phone screens away from nearby people when clinical imagery appeared",
    ],
  },

  // ── Completion Analysis ─────────────────────────────────────────────────────
  completion_analysis: {
    total_completers: 27,
    completion_rate_pct: 54.0,
    conversion_drivers: {
      treatment_urgency: "Users with 2+ years of symptoms and increasing pain are most likely to complete despite friction",
      insurance_coverage: "Users with employer health insurance complete at 80% vs 40% for uninsured",
      prior_research: "Users who have already researched piles treatment online complete at higher rates \u2014 they know what to expect",
    },
    dominant_completion_themes: [
      "Genuine pain and urgency overcomes flow friction for motivated users",
      "Insurance coverage removes cost anxiety and makes data sharing feel lower-risk",
      "Specialization credibility (not a generic hospital) builds enough trust to continue",
      "Free consultation is the primary hook for price-sensitive users who complete",
    ],
    llm_synthesis:
      "The 54% completion rate masks a bifurcated user base. High-urgency, insured users (Middle-Aged IT Professionals, Concerned Family Members) complete at 70-80% because their pain and coverage outweigh the flow's friction. Low-urgency, uninsured, or embarrassment-blocked users (Young Professionals in Denial, Price-Sensitive Blue Collar, Cautious Self-Treaters) complete at 30-40%. The flow isn't failing equally for everyone \u2014 it's specifically failing users who need the most trust-building and privacy assurance before engaging with a stigmatized health condition.",
  },
};
