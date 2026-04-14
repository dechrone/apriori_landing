import type { StudyData } from "@/types/study";

/**
 * SuperAstro v01 (April 2026) - onboarding flow study.
 * Ad click through AI chat (Mahesh Ji) to subscription paywall, 100 synthetic Indian users.
 * Ad-creative cohorts are first-class; the simulation surfaces segment divergence,
 * ad-to-AI-response gaps, and the Devotional Completer paradox.
 */
export const afbSuperastroStudyData: StudyData = {
  study: {
    study_id: "super_astro_20260413",
    study_name: "Super Astro Onboarding Simulation",
    flow_name:
      "Welcome → Phone → OTP → Personal Details → Topic → ₹1 Conversion",
    flow_version: "v01",
    date_run: "2026-04-13",
    total_users: 100,
    completed_users: 17,
    dropped_users: 83,
    failed_users: 0,
    completion_rate: 17,
    acquisition_channels: [
      "instagram_reels",
      "google_search",
      "google_app_install",
      "youtube_preroll",
      "word_of_mouth",
    ],
    personas_used: [
      "Anxious Decider",
      "Habitual Check-in",
      "Matchmaking Seeker",
      "Career Pragmatist",
      "Diaspora",
      "Curious Skeptic",
    ],
    persona_distribution: {
      "Anxious Decider": 20,
      "Habitual Check-in": 20,
      "Matchmaking Seeker": 20,
      "Career Pragmatist": 14,
      "Diaspora": 14,
      "Curious Skeptic": 12,
    },
    analysis_status: "complete",
  },

  executive_summary: {
    completion_rate: 17,
    sus_score: 43.5,
    sus_grade: "F",
    sus_label: "Not Acceptable",
    avg_seq: 2.8,
    critical_drop_point: "Welcome + Enter Mobile Number",
    critical_drop_pct: 27,
    top_findings: [
      {
        rank: 1,
        finding:
          "Phone number barrier at Screen 1 causes 27.0% of all drop-offs. Asking for personal data upfront kills conversion before showing value.",
      },
      {
        rank: 2,
        finding:
          "Only 17.0% completion rate. This is realistic for ad-driven Indian traffic with low intent. Skeptics and curious scrollers never intended to pay.",
      },
      {
        rank: 3,
        finding:
          "₹1 payment friction is real: 48 users made it through data collection but ~50% refuse final ₹1 payment.",
      },
    ],
    top_recommendation: {
      headline:
        "Pass ad context to the AI so the first response answers the ad's promise (career, relationship, marriage) instead of a generic kundli",
      linked_rec_id: "DR_001",
      effort: "medium",
      routing: "this_sprint",
    },
    open_insights_count: 6,
    this_sprint_count: 3,
    next_sprint_count: 2,
    backlog_count: 1,
  },

  scores: {
    completion_rate: {
      overall: 58,
      ci_lower: 48.1,
      ci_upper: 67.4,
      by_persona: {
        "Devotional Completer": 83,
        "Stigma Guardian": 50,
        "Career Anxiety Seeker": 65,
        "Relationship Crisis User": 61,
        "Gen-Z Explorer": 47,
        "NRI Nostalgic": 31,
      },
    },
    sus: {
      mean: 54.6,
      grade: "D",
      label: "Poor",
      benchmark: 68,
      delta_from_benchmark: -13.4,
      questions: [
        { q_id: 1, type: "positive", text: "I think that I would like to use this product frequently" },
        { q_id: 2, type: "negative", text: "I found the product unnecessarily complex" },
        { q_id: 3, type: "positive", text: "I thought the product was easy to use" },
        { q_id: 4, type: "negative", text: "I think that I would need the support of a technical person to be able to use this product" },
        { q_id: 5, type: "positive", text: "I found the various functions in this product were well integrated" },
        { q_id: 6, type: "negative", text: "I thought there was too much inconsistency in this product" },
        { q_id: 7, type: "positive", text: "I would imagine that most people would learn to use this product very quickly" },
        { q_id: 8, type: "negative", text: "I found the product very cumbersome to use" },
        { q_id: 9, type: "positive", text: "I felt very confident using the product" },
        { q_id: 10, type: "negative", text: "I needed to learn a lot of things before I could get going with this product" },
      ],
      distribution: { F: 18, D: 28, C: 22, B: 24, A: 8, "A+": 0 },
      by_persona: {
        "Devotional Completer": 72.4,
        "Stigma Guardian": 41.8,
        "Career Anxiety Seeker": 52.6,
        "Relationship Crisis User": 49.2,
        "Gen-Z Explorer": 38.4,
        "NRI Nostalgic": 46.8,
      },
    },
    seq_by_task: {
      first_purchase_journey: {
        avg: 3.4,
        benchmark: 5.5,
        delta: -2.1,
        flag: "very_difficult",
        by_persona: {
          "Devotional Completer": 5.8,
          "Stigma Guardian": 2.1,
          "Career Anxiety Seeker": 3.2,
          "Relationship Crisis User": 2.9,
          "Gen-Z Explorer": 2.0,
          "NRI Nostalgic": 2.6,
        },
      },
    },
  },

  emotional_fingerprint: {
    top_positive_tags: [
      { tag: "HOPEFUL", frequency_pct: 44 },
      { tag: "REVERENT", frequency_pct: 18 },
      { tag: "CURIOUS", frequency_pct: 22 },
    ],
    top_negative_tags: [
      { tag: "BETRAYED", frequency_pct: 46 },
      { tag: "EMBARRASSED", frequency_pct: 52 },
      { tag: "FRUSTRATED", frequency_pct: 38 },
      { tag: "EXCLUDED", frequency_pct: 28 },
      { tag: "HURT", frequency_pct: 34 },
    ],
    overall_sentiment: "mixed_negative",
    sentiment_score: -0.24,
    most_emotional_step: "AI Chat - First Response (Mahesh Ji)",
    smoothest_step: "Name Entry",
    by_persona: {
      "Devotional Completer": { dominant_tag: "REVERENT", sentiment: "positive" },
      "Stigma Guardian": { dominant_tag: "EMBARRASSED", sentiment: "negative" },
      "Career Anxiety Seeker": { dominant_tag: "BETRAYED", sentiment: "negative" },
      "Relationship Crisis User": { dominant_tag: "HURT", sentiment: "negative" },
      "Gen-Z Explorer": { dominant_tag: "BORED", sentiment: "negative" },
      "NRI Nostalgic": { dominant_tag: "EXCLUDED", sentiment: "negative" },
    },
  },

  themes: [
    {
      theme_id: "T_001",
      rank: 1,
      theme_name: "You are paying for intent and destroying it at the moment of truth",
      description:
        "SuperAstro runs hook-specific ads that promise answers to specific life questions. Users click because the hook matches their burning question, they endure 10 screens of data entry anchored to that question, and then the AI ignores the question entirely and delivers a generic kundli reading. The personalisation promise that acquired the user is broken at the single most expensive moment in the funnel, after maximum effort and before any value is delivered.",
      frequency_pct: 46,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User", "Stigma Guardian"],
      not_affected_personas: ["Devotional Completer"],
      supporting_codes: [
        { code_name: "Ad_Hook_Ignored_By_AI", frequency_pct: 46 },
        { code_name: "Generic_Kundli_Instead_Of_Answer", frequency_pct: 41 },
        { code_name: "Sunk_Cost_Resentment", frequency_pct: 38 },
      ],
      key_monologues: [
        {
          session_id: "SA_U014_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "I clicked 'Career kab set hogi?' and I filled everything. The AI said 'Rahu in your 7th house.' My CAREER is the 10th house. Either this AI does not know astrology or it does not know why I am here.",
        },
        {
          session_id: "SA_U041_20260413",
          persona_type: "Relationship Crisis User",
          text: "The ad promised 'Does he miss me?' I expected the AI to say something about my love life. Instead I got a general horoscope. I could have gotten that from any newspaper.",
        },
        {
          session_id: "SA_U029_20260413",
          persona_type: "Stigma Guardian",
          text: "I came for one question. The AI answered a different one. That is not a bad experience, it is a broken promise.",
        },
      ],
      counter_evidence: {
        summary:
          "Devotional Completers did not mind the generic kundli. They expected a full chart reading first and planned to ask specific questions later. For them, the generic response was the correct response.",
        frequency_pct: 24,
      },
      quantitative_support: { completion_rate: 0.46, avg_seq: 2.4 },
      root_causes:
        "The AI system prompt has no access to the user's acquisition context. It does not know which ad brought them, which UTM source they came from, or what question they carried through onboarding. It treats every user as a blank-slate kundli request.",
      connected_friction_point_ids: ["FP_001"],
    },
    {
      theme_id: "T_002",
      rank: 2,
      theme_name: "Astrology stigma is an identity threat, not a privacy concern",
      description:
        "Stigma Guardians are not worried about hackers or data breaches. They are worried about a colleague seeing a push notification, a UPI transaction log mentioning 'SuperAstro', or an SMS that says 'Your horoscope is ready.' Their phone number is the connective tissue of professional identity (UPI, WhatsApp Business, LinkedIn, work groups). Linking it to an astrology app risks social identity collapse, not a data leak. 'Better privacy policy' will not fix it. A sign-in path that does not touch their phone number will.",
      frequency_pct: 52,
      affected_personas: ["Stigma Guardian", "Gen-Z Explorer"],
      not_affected_personas: ["Devotional Completer", "Relationship Crisis User"],
      supporting_codes: [
        { code_name: "Phone_Links_To_Professional_Identity", frequency_pct: 52 },
        { code_name: "Notification_Fear", frequency_pct: 34 },
        { code_name: "UPI_Transaction_Visibility", frequency_pct: 28 },
      ],
      key_monologues: [
        {
          session_id: "SA_U078_20260413",
          persona_type: "Stigma Guardian",
          text: "I am a data scientist at a Big 4 firm. I read tarot privately. If my team found out I use astrology apps, I would become a joke. This phone number connects to everything professional in my life.",
        },
        {
          session_id: "SA_U022_20260413",
          persona_type: "Stigma Guardian",
          text: "I checked if they send SMS after registration. They do. If my roommate sees 'SuperAstro: Your daily prediction is ready', I will never hear the end of it.",
        },
      ],
      counter_evidence: {
        summary:
          "Devotional Completers and Relationship Crisis Users have no stigma. Consulting an astrologer is normal for them. The stigma is concentrated in Tier-1 professional environments.",
        frequency_pct: 42,
      },
      quantitative_support: { completion_rate: 0.5, avg_seq: 2.1 },
      root_causes:
        "Indian professional culture, especially in IT, consulting, and finance, actively mocks astrology. Believers do so privately. The phone number is the bridge between private belief and public identity, and the app forces users to cross it at screen 2.",
      connected_friction_point_ids: ["FP_002"],
    },
    {
      theme_id: "T_003",
      rank: 3,
      theme_name: "Your highest-LTV segment wants MORE friction. Optimising for speed will lose them.",
      description:
        "Devotional Completers are 18% of users but an estimated 38% of subscription revenue. They complete onboarding at 83%, subscribe at 61%, and retain at 3.2x the average. They WANT the 10-screen kundli form. They WANT mandatory birth time. They read detailed data collection as a sign the astrologer takes Vedic methods seriously. If SuperAstro ships a 'skip to chat' option, Devotional Completers will interpret it as 'this app does not really do astrology, it is just ChatGPT with a kundli skin' and leave for an app that respects the tradition.",
      frequency_pct: 18,
      affected_personas: ["Devotional Completer"],
      not_affected_personas: [
        "Career Anxiety Seeker",
        "Gen-Z Explorer",
        "Stigma Guardian",
        "Relationship Crisis User",
        "NRI Nostalgic",
      ],
      supporting_codes: [
        { code_name: "Onboarding_As_Sacred_Ritual", frequency_pct: 18 },
        { code_name: "Skip_Signals_Inauthenticity", frequency_pct: 16 },
        { code_name: "Janampatri_Referenced", frequency_pct: 14 },
      ],
      key_monologues: [
        {
          session_id: "SA_U003_20260413",
          persona_type: "Devotional Completer",
          text: "Date, time, and place are the three pillars of Vedic astrology. If the app let people skip this, the whole prediction becomes unreliable. I would not trust any app that makes birth time optional.",
        },
        {
          session_id: "SA_U006_20260413",
          persona_type: "Devotional Completer",
          text: "I called my mother before I started. She read my janampatri over the phone. 5:42 AM, Ujjain. This is not data entry, this is the foundation of my chart.",
        },
      ],
      counter_evidence: {
        summary:
          "Every other segment experienced the 10-screen onboarding as unnecessary friction. The majority view is 'too many screens', but the majority view would destroy the minority that pays.",
        frequency_pct: 82,
      },
      quantitative_support: { completion_rate: 0.83, avg_seq: 5.8 },
      root_causes:
        "Devotional Completers hold a mental model rooted in traditional Vedic astrology, where the precision of birth data directly determines the accuracy of predictions. For them, data collection IS the product, not a barrier to it.",
      connected_friction_point_ids: ["FP_003"],
    },
    {
      theme_id: "T_004",
      rank: 4,
      theme_name: "Tier-2 users drop at AI chat because the AI speaks in Sanskrit they do not understand",
      description:
        "Tier-2 first-time astrology users complete the kundli screens at 74%, only 4 points below Tier-1. But they drop at the AI chat screen at 2.8x the rate of Tier-1. The AI uses astrological jargon ('Rahu in your 7th house', 'Saturn's transit through your 10th bhav', 'Mangal dosha in your navamsa') without explanation. Tier-1 users from professional backgrounds either know these terms or Google them. Tier-2 users from non-English, non-digital-native backgrounds read the response and feel excluded from their own consultation.",
      frequency_pct: 31,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User", "Gen-Z Explorer"],
      not_affected_personas: ["Devotional Completer"],
      supporting_codes: [
        { code_name: "Sanskrit_Jargon_Not_Understood", frequency_pct: 31 },
        { code_name: "Tier2_AI_Chat_Drop", frequency_pct: 22 },
        { code_name: "Diagnosis_Without_Meaning", frequency_pct: 27 },
      ],
      key_monologues: [
        {
          session_id: "SA_U047_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "Rahu? Saat-vaan ghar? Main toh bas jaanna chahti thi ki meri naukri kab lagegi. Ye toh angrezi mein Sanskrit bol raha hai.",
        },
        {
          session_id: "SA_U062_20260413",
          persona_type: "Relationship Crisis User",
          text: "The AI said 'strong Mangal dosha'. My heart sank. I do not know what Mangal dosha means but it sounds terrible. Is my marriage over? Is it a disease? It should have explained.",
        },
      ],
      counter_evidence: {
        summary:
          "Devotional Completers and some Tier-1 users treated the Sanskrit terminology as a sign of authenticity, 'a real pandit speaks this way'.",
        frequency_pct: 24,
      },
      quantitative_support: { completion_rate: 0.44, avg_seq: 2.3 },
      root_causes:
        "The AI system prompt is calibrated for users who understand Vedic astrology terminology. It optimises for sounding authoritative rather than being understood. The language level is appropriate for Devotional Completers but alienating for everyone else.",
      connected_friction_point_ids: ["FP_001"],
    },
    {
      theme_id: "T_005",
      rank: 5,
      theme_name: "The people who need astrology most are the ones the form excludes",
      description:
        "SuperAstro's marketing targets people in life crises: relationship breakdowns, career uncertainty, health anxiety. These users are in transitional states by definition. The onboarding form assumes life fits into binary categories: Married/Unmarried, Male/Female, one fixed city, one clear purpose. The result is a product that markets to mess and onboards for order.",
      frequency_pct: 34,
      affected_personas: ["Relationship Crisis User", "Gen-Z Explorer"],
      not_affected_personas: ["Devotional Completer", "Career Anxiety Seeker"],
      supporting_codes: [
        { code_name: "Marital_Status_Mismatch", frequency_pct: 34 },
        { code_name: "Binary_Options_Exclude", frequency_pct: 22 },
        { code_name: "Purpose_Too_Narrow", frequency_pct: 18 },
      ],
      key_monologues: [
        {
          session_id: "SA_U037_20260413",
          persona_type: "Relationship Crisis User",
          text: "I am going through a divorce and the options are 'Married' and 'Unmarried'. The reason I am here is because my marriage is falling apart, and this app cannot even name my situation.",
        },
        {
          session_id: "SA_U019_20260413",
          persona_type: "Relationship Crisis User",
          text: "The 'purpose' dropdown has 'Career', 'Marriage', 'Health'. I want to ask about all three. My life is falling apart in every direction. There is no 'Everything' option.",
        },
      ],
      counter_evidence: {
        summary:
          "The majority of users fit the binary options and were not affected. Devotional Completers specifically expected these categories as they match traditional kundli formats.",
        frequency_pct: 66,
      },
      quantitative_support: { completion_rate: 0.54, avg_seq: 2.6 },
      root_causes:
        "The form was designed for the 'standard' user: a clear gender, a clear marital status, a clear city, and one clear question. But the users who pay for astrology guidance are disproportionately people whose lives do NOT fit standard categories.",
      connected_friction_point_ids: ["FP_004"],
    },
  ],

  screens: [],

  friction_points: [
    {
      friction_point_id: "FP_001",
      rank: 1,
      step_id: 11,
      step_name: "AI Chat - First Response (Mahesh Ji)",
      friction_type: "promise_violation",
      friction_score: 9.6,
      severity: "critical",
      drop_off_pct: 9,
      frequency_pct: 46,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User", "Stigma Guardian"],
      top_emotional_tags: ["BETRAYED", "FRUSTRATED", "WASTED_EFFORT"],
      top_behavioral_tags: ["CLOSED_APP", "SCREENSHOT_AND_LEFT"],
      avg_seq: 2.4,
      problem_narrative:
        "This is the most expensive friction point in the entire flow, not because of the 9% drop rate but because of WHEN it happens. Users have already invested 3 to 5 minutes of intimate personal data entry. They endured the phone number, the birth time lookup, the marital status question. They did all of this anchored to ONE specific question from the ad. When the AI ignores that question, the sunk cost flips from motivation ('I have come this far') to resentment ('I gave you everything and you gave me nothing'). The betrayal is proportional to the investment.",
      user_expectation:
        "Users who arrived from hook-specific ads expected the AI's first response to directly address the hook's promise: career timing, relationship status, marriage prediction.",
      actual_experience:
        "100% of AI first responses are generic kundli readings. The system has no awareness of which ad brought the user or what question they carried through 10 screens of data entry. Every user gets the same Rahu / Saturn / Mangal analysis regardless of specific intent.",
      business_impact:
        "Highest revenue impact of any screen in the flow. The 9% who drop here are the highest-intent users who survived every previous screen. By ad cohort: 'Career kab set hogi?' users drop at 14% here, 'Does he miss me?' users drop at 12%. These are your most expensive acquired users and you lose them at the moment of truth.",
      related_theme_ids: ["T_001", "T_004"],
      key_monologues: [
        {
          session_id: "SA_U014_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "I clicked because the ad asked 'Career kab set hogi?', that is exactly my question. I filled 10 screens of personal data for this. And the AI started talking about Rahu in my 7th house and Saturn's transit. My 7th house? I asked about my CAREER. That is the 10th house. Either this AI does not know astrology or it does not know why I am here.",
        },
        {
          session_id: "SA_U041_20260413",
          persona_type: "Relationship Crisis User",
          text: "The ad said 'Does he miss me?' I filled everything: my birth time, my city, my marital status which hurt to select. And then Mahesh Ji gave me a general life prediction. Not one word about my relationship. I gave you my pain and you gave me a horoscope printout.",
        },
        {
          session_id: "SA_U029_20260413",
          persona_type: "Stigma Guardian",
          text: "I risked giving this app my phone number. I filled in details I would not tell my therapist. And the first thing it says is 'Your kundli shows strong Mangal dosha.' I do not even know what that means and I do not care. I came here to ask if I should take the Bangalore offer or stay in Pune.",
        },
      ],
    },
    {
      friction_point_id: "FP_002",
      rank: 2,
      step_id: 2,
      step_name: "Mobile Number Entry + OTP",
      friction_type: "identity_threat",
      friction_score: 8.8,
      severity: "critical",
      drop_off_pct: 11,
      frequency_pct: 52,
      affected_personas: ["Stigma Guardian", "Gen-Z Explorer", "NRI Nostalgic"],
      top_emotional_tags: ["EMBARRASSED", "FEARFUL", "EXPOSED"],
      top_behavioral_tags: ["HOVERED_THEN_LEFT", "GOOGLED_PRIVACY_POLICY"],
      avg_seq: 2.1,
      problem_narrative:
        "The phone-number screen is not a UX friction point. It is an identity gate. Stigma Guardians have carefully managed professional identities (LinkedIn, work WhatsApp groups, UPI-linked bank accounts) all tied to this number. Linking it to an astrology app does not just risk a data leak; it risks a social identity collapse. They are not worried about hackers. They are worried about their manager seeing a notification. This distinction matters because 'better privacy policy' will not fix it. Only 'a way in that does not touch my phone number' will.",
      user_expectation:
        "Stigma-sensitive users expected anonymous access or a sign-in method (Google / Apple) that does not create an SMS paper trail. Gen-Z expected to browse before committing identity. NRI users expected international phone support.",
      actual_experience:
        "Phone number is mandatory on screen 2. No Google / Apple alternative. No country code selector. No way to experience the product before handing over identity.",
      business_impact:
        "11% total drop, the largest single-screen drop in the flow. The real cost is who you are losing: Stigma Guardians are 25 to 35, Tier-1, high income, high digital literacy. They are willing to pay ₹999/month for astrology guidance. They just will not pay if you force them to connect their professional phone number to get it.",
      related_theme_ids: ["T_002"],
      key_monologues: [
        {
          session_id: "SA_U022_20260413",
          persona_type: "Stigma Guardian",
          text: "This number is linked to my UPI, my office WhatsApp, my LinkedIn. My manager is in my WhatsApp contacts. If this app sends even ONE notification that says 'Your horoscope is ready', he will see it. I cannot risk that. It is not about data privacy, it is about what people will think of me.",
        },
        {
          session_id: "SA_U088_20260413",
          persona_type: "NRI Nostalgic",
          text: "I am in New Jersey. My US number does not even work here. There is no country code selector. Am I supposed to have an Indian number to check my kundli?",
        },
        {
          session_id: "SA_U065_20260413",
          persona_type: "Gen-Z Explorer",
          text: "Phone number on the second screen? I literally just opened this app from a reel. I have not even seen what it does yet. No app gets my number before I have seen the product.",
        },
      ],
    },
    {
      friction_point_id: "FP_003",
      rank: 3,
      step_id: 7,
      step_name: "Time of Birth",
      friction_type: "knowledge_gap",
      friction_score: 7.2,
      severity: "high",
      drop_off_pct: 5,
      frequency_pct: 38,
      affected_personas: ["Gen-Z Explorer", "Career Anxiety Seeker"],
      top_emotional_tags: ["STUCK", "ANXIOUS", "INADEQUATE"],
      top_behavioral_tags: ["CALLED_PARENT", "GUESSED", "ABANDONED"],
      avg_seq: 3.6,
      problem_narrative:
        "This screen reveals the deepest segment divergence in the entire flow. Devotional Completers experience it as the most important screen and pull out physical janampatris, entering data with reverence. Gen-Z Explorers experience it as an impossible question that makes them feel inadequate. The same screen is simultaneously too important to skip and too demanding to complete, depending on who is looking at it. Any single design choice (skip button vs mandatory) will help one segment and hurt another.",
      user_expectation:
        "Users who do not know their birth time expected an 'I do not know' option or an explanation that approximate time still works. Devotional Completers expected this screen to be mandatory, they WANT it.",
      actual_experience:
        "The time picker requires a specific hour and minute. There is no 'approximate' toggle, no 'I do not know' option, and no explanation of what happens if the time is imprecise.",
      business_impact:
        "5% drop concentrated in Gen-Z and Career Anxiety Seekers. The hidden cost is worse: an estimated 12% of completers GUESSED their birth time, which means their kundli is inaccurate, which means the AI's predictions will feel wrong, which means they will not subscribe. The real drop-off from this screen is 5% visible plus ~7% delayed (churn within 48 hours from users who guessed).",
      related_theme_ids: ["T_003"],
      key_monologues: [
        {
          session_id: "SA_U051_20260413",
          persona_type: "Gen-Z Explorer",
          text: "Birth time? I have no idea. My mom is at work, I cannot call her right now. There is no 'I do not know' option. Am I supposed to guess? If I guess wrong, does the whole kundli become wrong?",
        },
        {
          session_id: "SA_U009_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "I actually called my mother for this. She said 'morning time', not a specific hour. The app wants hours and minutes. I put 8:00 AM as a guess but now I do not trust anything it tells me because I know the input is wrong.",
        },
        {
          session_id: "SA_U003_20260413",
          persona_type: "Devotional Completer",
          text: "I pulled out my janampatri from the steel almirah. 5:42 AM, Ujjain. This is the most important screen. Date, time, and place are the three pillars of Vedic astrology. If the app let people skip this, I would trust it less.",
        },
      ],
    },
    {
      friction_point_id: "FP_004",
      rank: 4,
      step_id: 9,
      step_name: "Marital Status",
      friction_type: "emotional_trigger",
      friction_score: 7.8,
      severity: "high",
      drop_off_pct: 3,
      frequency_pct: 34,
      affected_personas: ["Relationship Crisis User"],
      top_emotional_tags: ["HURT", "INVALIDATED", "TRIGGERED"],
      top_behavioral_tags: ["PAUSED_LONG", "CLOSED_APP"],
      avg_seq: 2.8,
      problem_narrative:
        "The cruelty of this friction point is that it self-selects for the most vulnerable users. People who arrive from relationship-crisis ads ('Does he miss me?', 'Shaadi kab hogi?') are disproportionately in transitional states. The very audience the marketing targets is the audience the product form excludes. It is a two-option dropdown that tells your most emotionally invested users: 'we did not think about people like you.'",
      user_expectation:
        "Users in life transitions expected the app, which markets itself as a guide for life's difficult moments, to acknowledge that life is messy. They expected options that matched their reality.",
      actual_experience:
        "Two options: 'Married' and 'Unmarried'. No 'Separated', 'Divorced', 'Widowed', 'It is complicated', or 'Prefer not to say'.",
      business_impact:
        "3% visible drop. The qualitative damage is worse than the number suggests: 34% of all users paused for more than 8 seconds on this screen, the longest average dwell time of any screen except AI Chat. Users who continue carry forward a trust deficit that lowers their subscription conversion by an estimated 15%.",
      related_theme_ids: ["T_005"],
      key_monologues: [
        {
          session_id: "SA_U037_20260413",
          persona_type: "Relationship Crisis User",
          text: "I am going through a divorce and the options are 'Married' and 'Unmarried'. What am I? The reason I am here, the reason I downloaded this app at 2 AM, is because my marriage is falling apart. And this screen cannot even name my situation.",
        },
        {
          session_id: "SA_U044_20260413",
          persona_type: "Relationship Crisis User",
          text: "I selected 'Married' because technically I still am. But it felt like a lie. And now everything the AI tells me about my married life will be based on a status that is about to change. What is the point?",
        },
        {
          session_id: "SA_U019_20260413",
          persona_type: "Relationship Crisis User",
          text: "There should be 'It is complicated' or 'Separated' or even just 'Prefer not to say'. The people who need astrology the most are the ones whose lives do not fit into two checkboxes.",
        },
      ],
    },
    {
      friction_point_id: "FP_005",
      rank: 5,
      step_id: 8,
      step_name: "Place of Birth - City Dropdown",
      friction_type: "structural_exclusion",
      friction_score: 6.4,
      severity: "moderate",
      drop_off_pct: 4,
      frequency_pct: 28,
      affected_personas: ["NRI Nostalgic", "Gen-Z Explorer"],
      top_emotional_tags: ["EXCLUDED", "FRUSTRATED"],
      top_behavioral_tags: ["SEARCHED_CITY", "TYPED_MANUALLY", "ABANDONED"],
      avg_seq: 3.4,
      problem_narrative:
        "NRI users are the highest willingness-to-pay segment per user: they are paying in USD, nostalgic for Indian cultural practices, and have disposable income. But they cannot get past a dropdown. This is not a UX problem; it is a market-size problem disguised as a form field.",
      user_expectation:
        "NRI users expected global city search or a manual text entry field. Indian users in smaller towns expected their town to appear.",
      actual_experience:
        "Dropdown limited to Indian cities. No international cities. No free-text fallback. Some smaller Indian towns are also missing.",
      business_impact:
        "4% drop concentrated in NRI Nostalgics (5 of 13 NRI users drop here). At an estimated $15/month subscription willingness, each lost NRI user represents ~$180/year, the highest per-user revenue loss of any friction point.",
      related_theme_ids: ["T_004"],
      key_monologues: [
        {
          session_id: "SA_U091_20260413",
          persona_type: "NRI Nostalgic",
          text: "I was born in Edison, New Jersey. The dropdown only has Indian cities. I tried typing 'Edison', nothing. I tried 'New Jersey', nothing. I cannot even lie and pick a random Indian city because that would make my kundli wrong.",
        },
        {
          session_id: "SA_U096_20260413",
          persona_type: "NRI Nostalgic",
          text: "My parents are from Lucknow but I was born in Fremont, California. For kundli purposes, the birth city is what matters, not my parents' city. The app does not understand this.",
        },
      ],
    },
  ],

  behavioral_patterns: [
    {
      pattern_id: "BP_001",
      pattern_type: "identity_protector",
      pattern_name: "Refuses to link professional identity to astrology, exits at phone number",
      frequency_pct: 16,
      affected_personas: ["Stigma Guardian"],
      trigger_step_id: 2,
      trigger_step_name: "Mobile Number Entry + OTP",
      trigger_tags: ["EMBARRASSED", "FEARFUL"],
      implication:
        "These users have the highest willingness-to-pay in the entire funnel. They are senior professionals with disposable income who use astrology privately. You are selecting them OUT of your funnel at screen 2.",
      session_ids: ["SA_U022_20260413", "SA_U078_20260413", "SA_U065_20260413"],
      behavior_narrative:
        "These users open the app with genuine interest after an ad that resonated. They see the splash screen and feel curious. Then the phone-number field appears. They hover over it for 4 to 8 seconds, sometimes type the first few digits, then delete and close the app. Some google 'SuperAstro privacy policy' before deciding. They never return. Their interest has not died; their risk calculation killed it. They wanted astrology. They did not want their professional network to know.",
      key_monologues: [
        {
          session_id: "SA_U022_20260413",
          persona_type: "Stigma Guardian",
          text: "I typed my number. Then I imagined the SMS my colleague would see. I deleted it.",
        },
        {
          session_id: "SA_U078_20260413",
          persona_type: "Stigma Guardian",
          text: "If there was Google sign-in I would be in. But this phone number connects to my work WhatsApp group with 200 people.",
        },
      ],
      actionable_insight:
        "Offer Google / Apple sign-in as primary, phone number as optional. Disable all SMS notifications by default. Add 'Your data is private, we never send astrology-related SMS' on the number entry screen.",
      related_theme_ids: ["T_002"],
      related_friction_point_ids: ["FP_002"],
    },
    {
      pattern_id: "BP_002",
      pattern_type: "devotional_completer",
      pattern_name: "Treats onboarding as sacred data entry, and is your highest-LTV user",
      frequency_pct: 18,
      affected_personas: ["Devotional Completer"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["REVERENT", "METHODICAL"],
      implication:
        "18% of users, 38% of estimated subscription revenue, 3.2x 90-day retention. This segment subsidises your entire freemium model.",
      session_ids: ["SA_U003_20260413", "SA_U006_20260413"],
      behavior_narrative:
        "These users open the app and settle in. They do not rush. They call their mother for birth time. They pull out a physical janampatri. They enter data with the precision of someone filling a temple register. Each screen is not a hurdle; it is a step in a ritual. They experience the onboarding as respectful, thorough, and authentically Vedic. When they reach the AI chat, they read the full kundli analysis with attention, even if it is generic, because a proper kundli reading SHOULD be comprehensive before answering specific questions.",
      key_monologues: [
        {
          session_id: "SA_U003_20260413",
          persona_type: "Devotional Completer",
          text: "Good. It is asking everything a real pandit would ask. Date, time, place, gotra. This means the readings will be proper.",
        },
        {
          session_id: "SA_U006_20260413",
          persona_type: "Devotional Completer",
          text: "I spent 12 minutes on onboarding. I do not mind. Getting your kundli right is worth 12 minutes.",
        },
      ],
      actionable_insight:
        "Do NOT remove screens for this segment. Instead, bifurcate: detect intent signal in the first 2 screens and route Devotional Completers to the full form, everyone else to a fast track. The cost of losing this segment is disproportionate to their headcount.",
      related_theme_ids: ["T_003"],
      related_friction_point_ids: [],
    },
    {
      pattern_id: "BP_003",
      pattern_type: "specific_answer_hunter",
      pattern_name: "Endured 10 screens for ONE question, AI failed to answer it",
      frequency_pct: 22,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User"],
      trigger_step_id: 11,
      trigger_step_name: "AI Chat - First Response",
      trigger_tags: ["BETRAYED", "FRUSTRATED"],
      implication:
        "These are your most expensive acquired users. You paid for the click, they survived 10 screens, and you lost them at the moment you should have been collecting their credit card.",
      session_ids: ["SA_U014_20260413", "SA_U041_20260413"],
      behavior_narrative:
        "These users arrived with a specific question from a specific ad. They tolerated the 10-screen onboarding because the question was important enough. With each screen they mentally told themselves 'this data is needed to answer my question.' When the AI's first response ignored that question entirely, the sunk cost did not create loyalty. It created resentment proportional to the effort invested. They closed the app within 30 seconds of reading the first AI response.",
      key_monologues: [
        {
          session_id: "SA_U014_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "10 screens. My birth time, my city, my marital status. And the AI gives me a generic prediction about 'planetary alignments'. I asked about my CAREER. Give me my career answer.",
        },
        {
          session_id: "SA_U041_20260413",
          persona_type: "Relationship Crisis User",
          text: "I gave you my pain and you gave me a horoscope printout.",
        },
      ],
      actionable_insight:
        "Pass the UTM source / ad creative ID as context to the AI system prompt. Map each ad hook to an astrological domain: 'Career kab set hogi?' leads with 10th house and Dashamsha; 'Does he miss me?' leads with 7th house and relationship transit. The AI should OPEN with the answer to the question that brought the user here.",
      related_theme_ids: ["T_001"],
      related_friction_point_ids: ["FP_001"],
    },
    {
      pattern_id: "BP_004",
      pattern_type: "impatient_browser",
      pattern_name: "Expected chat in 30 seconds, did not survive screen 4",
      frequency_pct: 14,
      affected_personas: ["Gen-Z Explorer"],
      trigger_step_id: 6,
      trigger_step_name: "Date of Birth",
      trigger_tags: ["BORED", "IMPATIENT"],
      implication:
        "Gen-Z users have the lowest conversion but the highest virality potential. If the AI gives them one entertaining, shareable response, they screenshot it and post it, which is how SuperAstro grows organically on Instagram.",
      session_ids: ["SA_U051_20260413"],
      behavior_narrative:
        "These users arrived from Instagram reels. They expected a chat-first experience: type a question, get an answer, maybe pay ₹1 if it is good. Instead they hit a 10-screen form. Their tolerance for friction is near zero because their investment in the product is near zero. Most exit by screen 4 to 5; some make it to birth time and leave when they realise they need to call their parents.",
      key_monologues: [
        {
          session_id: "SA_U051_20260413",
          persona_type: "Gen-Z Explorer",
          text: "Bro this app is asking for my birth time. I came from a reel. I just wanted to see if it is real.",
        },
        {
          session_id: "SA_U053_20260413",
          persona_type: "Gen-Z Explorer",
          text: "The ad said 'Chat 24/7 at just ₹1'. I have been filling forms for 3 minutes. That is not chatting.",
        },
      ],
      actionable_insight:
        "For users arriving from Instagram organic / reels, offer a 'Quick question' path: skip kundli, let them ask one free question, deliver a teaser answer, THEN ask for details to go deeper. Convert curiosity to engagement before asking for data.",
      related_theme_ids: ["T_001"],
      related_friction_point_ids: ["FP_003"],
    },
    {
      pattern_id: "BP_005",
      pattern_type: "structurally_blocked",
      pattern_name: "Willing to pay the most but cannot get past the form",
      frequency_pct: 13,
      affected_personas: ["NRI Nostalgic"],
      trigger_step_id: 2,
      trigger_step_name: "Mobile Number + City Dropdown",
      trigger_tags: ["EXCLUDED", "FRUSTRATED"],
      implication:
        "13% of your audience, potentially 30% of your revenue if unblocked. Highest per-user LTV in the entire simulation.",
      session_ids: ["SA_U088_20260413", "SA_U091_20260413", "SA_U096_20260413"],
      behavior_narrative:
        "NRI users face structural blockers at multiple screens: non-Indian phone numbers rejected, no international cities in the dropdown, time-zone confusion on birth time, and sometimes even language (the app defaults to Hindi which some NRIs do not read well). These are not preference issues; they are hard blocks. The form literally cannot accept their data.",
      key_monologues: [
        {
          session_id: "SA_U088_20260413",
          persona_type: "NRI Nostalgic",
          text: "My US number does not work. My birth city (Edison, NJ) is not in the dropdown. Even if I got past these screens, would the app know my timezone?",
        },
        {
          session_id: "SA_U096_20260413",
          persona_type: "NRI Nostalgic",
          text: "I am paying in USD, I am willing to subscribe, and I cannot even create an account.",
        },
      ],
      actionable_insight:
        "NRI market requires three changes: international phone support (or Google sign-in), global city search, and birth time in local timezone with auto-conversion. Engineering effort: ~1 sprint. Revenue per NRI user: estimated $15/month (10x Indian user).",
      related_theme_ids: ["T_004"],
      related_friction_point_ids: ["FP_002", "FP_005"],
    },
  ],

  segment_analysis: {
    segments: [
      {
        segment_id: "SEG_001",
        dimension: "persona_archetype",
        label: "Devotional Completer",
        n: 18,
        conversion_rate: 83,
        avg_sus: 72.4,
        top_friction_point_ids: [],
        primary_pattern: "devotional_completer",
        top_emotional_tags: ["REVERENT", "SATISFIED", "TRUSTING"],
        summary:
          "Your best users. 83% completion, 61% subscribe, 3.2x 90-day retention. They want the full kundli form and would trust the app LESS if you shortened it.",
        persona_profile:
          "35 to 55 years old, Tier-2 dominant, traditional Vedic astrology believers. Many have physical janampatris. Arrived from 'free janam kundli' or '₹1 mein bhavishya' ads, or family referral. They consult astrologers regularly. This app is a more convenient version of what they already do.",
        journey_narrative:
          "Devotional Completers entered the app with reverence. They treated the splash screen as an arrival, not a loading page. At the phone-number screen, they entered it without hesitation (they give their number to pandits regularly). Through the kundli screens (name, gender, DOB, time, place), they were meticulous; several called parents or referenced paper janampatris. At marital status, they selected calmly. At the AI chat, they read the full generic kundli with attention and approval, then asked a follow-up question. At the paywall, 61% subscribed, the highest rate of any segment by a factor of 2.",
        monologues: [
          { text: "Good. It is asking everything a proper pandit would ask. This means the AI will give a real reading, not a newspaper horoscope." },
          { text: "I do not mind paying. A good pandit charges ₹500 to 2000 per session. ₹1 is nothing and ₹299/month is fair." },
          { text: "The onboarding felt respectful. Like sitting down with an astrologer who takes the time to know you." },
        ],
        positive_experience:
          "Every onboarding screen reinforced their trust. The length of the form was a feature, not a bug.",
        emotional_arc: ["REVERENT", "METHODICAL", "SATISFIED", "TRUSTING", "SUBSCRIBED"],
        segment_recommendation:
          "PROTECT this segment at all costs. Any change to the onboarding must be tested against them first. If 'skip to chat' reduces their completion or subscription rate, the headline conversion gain is a net revenue loss.",
      },
      {
        segment_id: "SEG_002",
        dimension: "persona_archetype",
        label: "Stigma Guardian",
        n: 16,
        conversion_rate: 50,
        avg_sus: 41.8,
        top_friction_point_ids: ["FP_002"],
        primary_pattern: "identity_protector",
        top_emotional_tags: ["EMBARRASSED", "FEARFUL", "INTERESTED"],
        summary:
          "High-income professionals who use astrology secretly. Blocked by the phone-number gate, not because of privacy, but because of professional identity risk.",
        persona_profile:
          "25 to 35, Tier-1 (Mumbai, Bengaluru, Delhi, Pune), IT / consulting / finance professionals. Believe in astrology privately but inhabit social circles that mock it. Arrived from Instagram career or relationship ads. Willing to pay ₹999/month if they can use the app without a social paper trail.",
        journey_narrative:
          "Stigma Guardians opened the app with genuine interest; the ad resonated. At the phone-number screen, everything stopped. They typed digits, deleted them, typed again. Some googled 'SuperAstro privacy policy' in a separate tab. The 9 who got past the number did so by rationalising ('it is just an OTP'). They moved through kundli screens quickly, as they are digitally fluent. At the AI chat, the 7 who remained were disappointed by the generic response but not surprised. Only 4 subscribed. The 7 who never got past the phone number are still interested in astrology; they just cannot let this app touch their identity.",
        monologues: [
          { text: "I work at McKinsey. I read my horoscope every morning. If anyone at work found out, I would lose credibility I spent 5 years building." },
          { text: "Give me Apple sign-in. That is all I need. One button and I am in. But you want my phone number and that connects to my entire professional world." },
        ],
        emotional_arc: ["INTERESTED", "FEARFUL", "TYPED_THEN_DELETED", "EXIT"],
        segment_recommendation:
          "Add Google / Apple sign-in as primary auth. Make phone number optional. Disable all astrology-related notifications by default. Add 'Private mode: no astrology-related notifications or SMS' toggle at signup. This segment alone could increase revenue per user by 3 to 5x if unblocked.",
      },
      {
        segment_id: "SEG_003",
        dimension: "persona_archetype",
        label: "Career Anxiety Seeker",
        n: 20,
        conversion_rate: 65,
        avg_sus: 52.6,
        top_friction_point_ids: ["FP_001", "FP_003"],
        primary_pattern: "specific_answer_hunter",
        top_emotional_tags: ["ANXIOUS", "HOPEFUL", "BETRAYED"],
        summary:
          "Arrived from 'Career kab set hogi?' ads. 65% complete onboarding but only 22% subscribe, because the AI does not answer their career question.",
        persona_profile:
          "22 to 30, mix Tier-1 / Tier-2, often early career or between jobs. Arrived specifically from career-hook ads. Has one burning question: 'When will my career improve?' Willing to tolerate friction IF the AI answers that question.",
        journey_narrative:
          "Career Anxiety Seekers entered with high intent anchored to one question. They tolerated the phone number (most are not in stigma-sensitive professions). They moved through kundli screens with moderate patience, though birth time was a blocker for some (they do not know it and see it as a real accuracy barrier). At the AI chat, everything hinged on one moment: does the first response mention their career? When it did not, when the AI opened with generic Rahu / Saturn analysis, 38% of the surviving users closed the app. The betrayal was proportional to the investment.",
        monologues: [
          { text: "I filled 10 forms because the ad promised career guidance. The AI gave me a horoscope. Those are two different products." },
          { text: "If the AI had said 'Your 10th house shows a job change in 6 months' as its FIRST line, I would have subscribed immediately." },
          { text: "My birth time was approximate and now I do not trust anything the AI says. It is like going to a doctor with a wrong blood report." },
        ],
        emotional_arc: ["HOPEFUL", "PATIENT", "ANXIOUS", "BETRAYED", "EXIT"],
        segment_recommendation:
          "Two fixes: (1) Pass ad context to the AI so career ads produce a career-specific first response. (2) Add an 'approximate time' toggle on the birth-time screen with explainer: 'Even approximate time gives 85% accurate career predictions.' The first fix recovers subscription conversion; the second reduces delayed churn from inaccurate input.",
      },
      {
        segment_id: "SEG_004",
        dimension: "persona_archetype",
        label: "Relationship Crisis User",
        n: 18,
        conversion_rate: 61,
        avg_sus: 49.2,
        top_friction_point_ids: ["FP_001", "FP_004"],
        primary_pattern: "specific_answer_hunter",
        top_emotional_tags: ["HURT", "HOPEFUL", "BETRAYED"],
        summary:
          "Arrived from relationship ads. Emotionally invested, but the marital status field invalidates them and the AI ignores their relationship question.",
        persona_profile:
          "25 to 40, majority women, mix tiers. In active relationship crises: separations, divorces, unrequited love, marriage-timing anxiety. Arrived from 'Does he miss me?' or 'Shaadi kab hogi?' ads. Emotionally vulnerable and looking for guidance.",
        journey_narrative:
          "Relationship Crisis Users entered the app at their most emotionally raw. They filled kundli screens patiently because they believe astrology can give them answers. The marital status screen was a gut punch for many: 'Married' or 'Unmarried' forced them to flatten a complex situation into a binary. Those who continued reached the AI chat hoping for relationship-specific guidance. When the AI delivered generic kundli instead, 28% of survivors left. The double betrayal, first by the form that could not name their situation and then by the AI that ignored their question, converted hope into resentment.",
        monologues: [
          { text: "I gave you my pain and you gave me a horoscope printout." },
          { text: "I downloaded this app at 2 AM because I could not sleep. I needed someone to tell me it is going to be okay. The AI told me about Saturn's transit." },
          { text: "If the first thing Mahesh Ji said was 'I can see your 7th house is going through a difficult transit, let me explain what that means for your relationship', I would have cried and subscribed." },
        ],
        emotional_arc: ["VULNERABLE", "HOPEFUL", "HURT_BY_FORM", "BETRAYED_BY_AI", "EXIT"],
        segment_recommendation:
          "Three fixes: (1) Add 'Separated', 'Divorced', 'It is complicated', 'Prefer not to say' to marital status, tiny effort with huge empathy signal. (2) The AI's first response for relationship-ad users must open with 7th house and relationship transit. (3) Add 'I am going through a difficult time' as a purpose option, which acknowledges vulnerability and routes to a gentler AI tone.",
      },
      {
        segment_id: "SEG_005",
        dimension: "persona_archetype",
        label: "Gen-Z Explorer",
        n: 15,
        conversion_rate: 47,
        avg_sus: 38.4,
        top_friction_point_ids: ["FP_002", "FP_003"],
        primary_pattern: "impatient_browser",
        top_emotional_tags: ["BORED", "CURIOUS", "ABANDONED"],
        summary:
          "Lowest commitment, lowest conversion, but highest virality potential if the AI gives them something shareable.",
        persona_profile:
          "18 to 24, Tier-1, Instagram / YouTube native. Arrived from reels or organic content. Zero intent to pay. Treating this like a personality quiz. Will share results on Instagram stories if the content is entertaining.",
        journey_narrative:
          "Gen-Z Explorers lasted an average of 2.5 screens before losing interest. The phone number was the first wall (they do not give numbers to apps they have not used). Birth time was the second (they have no idea and do not care enough to find out). The few who made it to AI chat found the response too serious and too jargon-heavy. None of the 6 who completed the flow subscribed. But 3 of them took screenshots of the AI response to share with friends.",
        monologues: [
          { text: "I came from a reel. I just wanted to see if the AI is real. I did not sign up to fill a government form." },
          { text: "The AI said I have 'Mangal dosha'. I screenshotted it and sent it to my group chat. Everyone laughed. But two of them downloaded the app." },
          { text: "If this app had a 'just ask a question' mode without all the forms, I would use it every week." },
        ],
        positive_experience:
          "When Gen-Z users DID reach the AI, they found the content entertaining and shareable, even if they did not subscribe.",
        emotional_arc: ["CURIOUS", "BORED", "IMPATIENT", "EXIT"],
        segment_recommendation:
          "Create a 'Quick question' mode for Instagram-sourced traffic: no kundli, no forms, just ask, get a teaser answer, then 'Want a deeper reading? Enter your birth details.' This converts the zero-commitment browse into a lead funnel. Even if they do not pay, their screenshots are free marketing.",
      },
      {
        segment_id: "SEG_006",
        dimension: "persona_archetype",
        label: "NRI Nostalgic",
        n: 13,
        conversion_rate: 31,
        avg_sus: 46.8,
        top_friction_point_ids: ["FP_002", "FP_005"],
        primary_pattern: "structurally_blocked",
        top_emotional_tags: ["EXCLUDED", "FRUSTRATED", "NOSTALGIC"],
        summary:
          "Willing to pay 10x Indian users but structurally blocked at phone number, city dropdown, and language.",
        persona_profile:
          "28 to 45, US / UK / Canada / UAE based. Indian-origin, second-gen or first-gen immigrants. Want to connect with Vedic astrology as a cultural practice. Many were referred by family in India. Willing to pay $10 to 20/month, 10x the Indian subscriber rate.",
        journey_narrative:
          "NRI users hit hard blocks at three screens. Screen 2: phone number field does not accept non-Indian numbers (no country code selector). Screen 8: city dropdown has no international cities. Screen 7: birth time entered in IST but user is thinking in local timezone. The 4 who somehow navigated past these screens (using Indian family members' numbers, picking the nearest Indian city to their birth region) were rewarded with an AI experience that worked well; they appreciated the traditional approach. But 9 of 13 never got that far.",
        monologues: [
          { text: "I am in Houston. I was born in Sugar Land, Texas. My parents are from Jaipur. The app will not let me enter my actual birth city. For kundli, birth city matters. I cannot just pick Jaipur." },
          { text: "My dad in Delhi uses SuperAstro daily. He told me to download it. I cannot even sign up." },
          { text: "I would happily pay $20/month. But the app thinks every user is in India." },
        ],
        emotional_arc: ["NOSTALGIC", "EAGER", "EXCLUDED", "FRUSTRATED", "EXIT"],
        segment_recommendation:
          "NRI support requires: (1) international phone or Google / Apple sign-in, (2) global city search with lat / long for accurate kundli, (3) birth-time timezone auto-detection. Engineering: 1 to 2 sprints. Revenue per NRI: ~$15/month vs ₹299/month Indian. ROI is immediate.",
      },
    ],
    converter_profile: {
      label: "Who Converts",
      dominant_personas: [
        "Devotional Completer",
        "Career Anxiety Seeker (when AI matches)",
        "Relationship Crisis User (when not triggered)",
      ],
      dominant_channels: ["facebook_generic_kundli_ad", "family_referral"],
      common_patterns: ["devotional_completer", "answer_found"],
      shared_emotional_signals: ["HOPEFUL", "REVERENT", "RELIEVED"],
    },
    dropper_profile: {
      label: "Who Drops Off",
      dominant_personas: ["Stigma Guardian", "Gen-Z Explorer", "NRI Nostalgic"],
      dominant_channels: [
        "instagram_career_ad",
        "instagram_relationship_ad",
        "instagram_reels_organic",
      ],
      common_patterns: ["identity_protector", "impatient_browser", "structurally_blocked"],
      shared_emotional_signals: ["EMBARRASSED", "BETRAYED", "EXCLUDED"],
    },
    critical_splits: [
      {
        dimension: "ad_creative_cohort",
        label: "Career-ad users with matched AI response vs generic AI response",
        value_a: "career_specific_response",
        rate_a: 68,
        value_b: "generic_kundli_response",
        rate_b: 22,
        delta: 46,
        implication:
          "A 46-point subscription-conversion gap driven entirely by whether the AI's first response matched the ad hook that acquired the user. Currently 100% of users get the generic response. This is the single highest-leverage fix in the entire flow.",
      },
      {
        dimension: "persona_archetype",
        label: "Devotional Completer vs NRI Nostalgic",
        value_a: "Devotional Completer",
        rate_a: 83,
        value_b: "NRI Nostalgic",
        rate_b: 31,
        delta: 52,
        implication:
          "52-point gap. Devotional Completers are perfectly served; NRI Nostalgics are structurally excluded at the phone number and city-dropdown screens. The gap is not about intent. NRI Nostalgics are willing to pay 10x. The gap is that the form literally cannot accept their data.",
      },
    ],
  },

  power_users: {
    count: 15,
    pct_of_total: 15,
    pct_of_converters: 26,
    why_they_convert: [
      "Arrived with a settled belief in Vedic astrology and a mental model that matches the 10-screen kundli form.",
      "Treat data entry as a ritual, not a hurdle. Birth detail precision is interpreted as product seriousness.",
      "Read the generic kundli as the correct opener, then drive the AI toward their specific question on their own.",
    ],
    what_resonates: [
      {
        step_id: 7,
        step_name: "Time of Birth",
        signal: "Physical janampatri referenced, multiple callers confirmed time to the minute.",
        tag: "REVERENT",
        frequency_pct: 61,
      },
      {
        step_id: 11,
        step_name: "AI Chat - First Response",
        signal: "Generic kundli read as 'comprehensive' rather than 'impersonal'.",
        tag: "TRUSTING",
        frequency_pct: 72,
      },
    ],
    flow_strengths: [
      {
        step_id: 4,
        step_name: "Name Entry",
        strength: "Neutral, fast, no emotional load.",
        evidence: "98% completion with near-zero dwell.",
      },
      {
        step_id: 3,
        step_name: "OTP Verification",
        strength: "Auto-read OTP keeps momentum.",
        evidence: "97% completion, no measurable friction.",
      },
    ],
    persona_breakdown: {
      "Devotional Completer": { count: 11, pct: 73 },
      "Career Anxiety Seeker": { count: 2, pct: 13 },
      "Relationship Crisis User": { count: 2, pct: 14 },
    },
    acquisition_strategy: {
      highest_yield_channel: "facebook_generic_kundli_ad",
      highest_yield_persona: "Devotional Completer",
      recommendation:
        "Devotional Completers acquired via 'free janam kundli' and '₹1 mein bhavishya' ads convert at 83% and subscribe at 61%. Increase spend on kundli-centric Facebook ads targeting 35 to 55 Tier-2 Hindi-preferred users. These users subsidise the freemium model.",
      channel_persona_matrix: [
        { channel: "facebook_generic_kundli_ad", persona: "Devotional Completer", conversion_rate: 86 },
        { channel: "facebook_kundli_ad", persona: "NRI Nostalgic", conversion_rate: 38 },
        { channel: "instagram_career_ad", persona: "Career Anxiety Seeker", conversion_rate: 62 },
        { channel: "instagram_career_ad", persona: "Stigma Guardian", conversion_rate: 48 },
        { channel: "instagram_relationship_ad", persona: "Relationship Crisis User", conversion_rate: 58 },
        { channel: "instagram_reels_organic", persona: "Gen-Z Explorer", conversion_rate: 44 },
      ],
    },
  },

  insights: [
    {
      insight_id: "INS_001",
      rank: 1,
      headline: "The AI's first response must mirror the ad hook that acquired the user",
      one_liner:
        "46% of users arrived with a specific question from a specific ad. 100% of them received a generic kundli.",
      type: "Promise Violation",
      observation:
        "46 out of 100 persona-weighted interactions showed broken-promise signals at the AI chat step. Drop-off at this step is 9%, the highest single-step drop in the funnel by revenue.",
      finding:
        "Career-ad users who received a career-specific AI response subscribed at 68%. The same cohort receiving a generic kundli subscribed at 22%. The AI system prompt has no access to UTM / ad creative context and treats every user as a blank-slate kundli request.",
      insight:
        "The ad team and AI team operate independently. The ad creates a hyper-specific expectation; the AI delivers a generic response. Sunk cost (10 screens of data entry) flips from motivation to resentment at this moment, making the drop-off worse than the raw number suggests.",
      recommendation:
        "Pass UTM source / ad creative ID to the AI system prompt. Map each hook to an astrological domain. Career ads lead with 10th house and Dashamsha; relationship ads lead with 7th house and transit; marriage ads lead with 7th house and navamsa. The first response must open with the answer.",
      frequency_pct: 46,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User", "Stigma Guardian"],
      not_affected_personas: ["Devotional Completer"],
      counter_evidence:
        "Devotional Completers (24%) read the generic kundli as the correct opener and were not harmed.",
      top_emotional_tags: ["BETRAYED", "FRUSTRATED", "WASTED_EFFORT"],
      confidence_score: 0.92,
      avg_seq: 2.4,
      step_drop_off_pct: 9,
      supporting_monologues: [
        {
          session_id: "SA_U014_20260413",
          persona_type: "Career Anxiety Seeker",
          text: "I asked about my CAREER. That is the 10th house. Either this AI does not know astrology or it does not know why I am here.",
        },
        {
          session_id: "SA_U041_20260413",
          persona_type: "Relationship Crisis User",
          text: "I gave you my pain and you gave me a horoscope printout.",
        },
      ],
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      linked_rec_id: "DR_001",
      rice_score: 92,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
    {
      insight_id: "INS_002",
      rank: 2,
      headline: "Bifurcate onboarding by intent. Do not flatten all users into one path.",
      one_liner:
        "The highest-LTV segment wants the full 10-screen form. Every other segment does not.",
      type: "Segment Conflict",
      observation:
        "Devotional Completers (18% of users) complete at 83%, subscribe at 61%, and retain at 3.2x average. Every other segment reports the 10-screen onboarding as excessive.",
      finding:
        "Ship a 'skip to chat' option and Devotional Completers will read it as 'this app does not really do astrology' and leave. Keep the full form and Gen-Z / NRI / Stigma Guardians keep dropping at screen 2 to 4.",
      insight:
        "One-size-fits-all onboarding optimises for neither the high-intent minority nor the browsing majority. A fork after OTP that routes 'complete kundli reading' vs 'quick question' preserves both paths.",
      recommendation:
        "After OTP (screen 3), add a fork. 'I want a complete kundli reading' goes to the full form. 'I have a quick question' skips to AI chat with progressive profiling; each data point triggers an incremental insight.",
      frequency_pct: 82,
      affected_personas: ["Stigma Guardian", "Gen-Z Explorer", "NRI Nostalgic", "Career Anxiety Seeker"],
      not_affected_personas: ["Devotional Completer"],
      counter_evidence: "Devotional Completers (18%) want the full form. They must be routed to it.",
      top_emotional_tags: ["IMPATIENT", "REVERENT"],
      confidence_score: 0.88,
      avg_seq: 3.0,
      step_drop_off_pct: 5,
      supporting_monologues: [
        {
          session_id: "SA_U051_20260413",
          persona_type: "Gen-Z Explorer",
          text: "I came from a reel. I did not sign up to fill a government form.",
        },
        {
          session_id: "SA_U003_20260413",
          persona_type: "Devotional Completer",
          text: "If the app let people skip this, the whole prediction becomes unreliable.",
        },
      ],
      linked_friction_point_id: "FP_003",
      linked_theme_id: "T_003",
      linked_rec_id: "DR_002",
      rice_score: 86,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
    {
      insight_id: "INS_003",
      rank: 3,
      headline: "Replace phone-number-first with Google / Apple sign-in, phone optional",
      one_liner:
        "11% drop at phone number. Stigma Guardians are not worried about data leaks. They are worried about social identity exposure.",
      type: "Identity Threat",
      observation:
        "The phone-number screen has the highest single-screen drop-off in the flow (11%). 52% of users across Stigma Guardian, Gen-Z Explorer, and NRI Nostalgic segments report negative signals here.",
      finding:
        "The phone number is the connective tissue of Indian professional identity: UPI, WhatsApp Business, LinkedIn, work groups. Linking it to 'astrology user' risks a social identity collapse. 'Better privacy policy' does not address this. A sign-in path that does not touch the phone number does.",
      insight:
        "Stigma is asymmetric. Devotional users see zero issue with phone auth. Tier-1 professionals see maximum risk. The fix is not better copy; it is a different auth primitive.",
      recommendation:
        "Add Google / Apple sign-in as primary. Move phone to optional. Disable astrology-related SMS by default. Add a visible 'Private mode' toggle at signup.",
      frequency_pct: 52,
      affected_personas: ["Stigma Guardian", "Gen-Z Explorer", "NRI Nostalgic"],
      not_affected_personas: ["Devotional Completer", "Relationship Crisis User"],
      counter_evidence:
        "Devotional Completers (42%) share phone numbers with pandits regularly and see no friction.",
      top_emotional_tags: ["EMBARRASSED", "FEARFUL", "EXPOSED"],
      confidence_score: 0.91,
      avg_seq: 2.1,
      step_drop_off_pct: 11,
      supporting_monologues: [
        {
          session_id: "SA_U078_20260413",
          persona_type: "Stigma Guardian",
          text: "This phone number connects to everything professional in my life. I need a way in that does not create a paper trail.",
        },
      ],
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      linked_rec_id: "DR_003",
      rice_score: 82,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
    {
      insight_id: "INS_004",
      rank: 4,
      headline: "Adapt AI language to the user's tier and literacy level",
      one_liner:
        "Tier-2 users drop at AI chat at 2.8x the rate of Tier-1 because the AI uses unexplained Sanskrit jargon.",
      type: "Comprehension Gap",
      observation:
        "31% of users report they did not understand the AI's first response. Tier-2 drop is 2.8x Tier-1.",
      finding:
        "The AI uses astrological jargon ('Rahu in your 7th house', 'Saturn's transit through your 10th bhav', 'Mangal dosha in your navamsa') without explanation. The language is tuned for Devotional Completers and alienating for everyone else.",
      insight:
        "The AI optimises for sounding authoritative rather than being understood. A diagnosis without a meaning feels like a verdict the user cannot argue with.",
      recommendation:
        "When the user's city is Tier-2 or the app language is Hindi / regional, the AI explains Sanskrit terms in Hindi after each mention. 'Rahu aapke 10th house mein hai, matlab career mein unexpected changes.' Tier-1 / English users get the compact version.",
      frequency_pct: 31,
      affected_personas: ["Career Anxiety Seeker", "Relationship Crisis User", "Gen-Z Explorer"],
      not_affected_personas: ["Devotional Completer"],
      counter_evidence:
        "Devotional Completers (24%) treat Sanskrit terminology as a sign of authenticity.",
      top_emotional_tags: ["EXCLUDED", "FRUSTRATED", "INADEQUATE"],
      confidence_score: 0.86,
      avg_seq: 2.3,
      step_drop_off_pct: 9,
      supporting_monologues: [
        {
          session_id: "SA_U062_20260413",
          persona_type: "Relationship Crisis User",
          text: "The AI said 'strong Mangal dosha'. My heart sank. I do not know what Mangal dosha means but it sounds terrible.",
        },
      ],
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_004",
      linked_rec_id: "DR_004",
      rice_score: 74,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
    {
      insight_id: "INS_005",
      rank: 5,
      headline: "Add transitional states to marital status and expand the purpose options",
      one_liner:
        "34% of users paused over 8 seconds on marital status. The binary excludes the exact users the marketing targets.",
      type: "Emotional Exclusion",
      observation:
        "Longest dwell time of any kundli screen. 3% visible drop, plus an estimated 15% downstream subscription drop from trust deficit.",
      finding:
        "Relationship-crisis ads target people in transitional states, but the form forces them to flatten their situation into 'Married' or 'Unmarried'. The product markets to mess and onboards for order.",
      insight:
        "This is a cheap fix with outsized empathy signal. 'Separated', 'Divorced', 'It is complicated', 'Prefer not to say' are 30-minute changes that tell vulnerable users 'we thought about people like you.'",
      recommendation:
        "Add 'Separated', 'Divorced', 'It is complicated', 'Prefer not to say' to marital status. Add 'Going through a difficult time', 'General guidance', 'Multiple concerns' to purpose. Route 'difficult time' to a gentler AI tone.",
      frequency_pct: 34,
      affected_personas: ["Relationship Crisis User", "Gen-Z Explorer"],
      not_affected_personas: ["Devotional Completer", "Career Anxiety Seeker"],
      counter_evidence:
        "66% of users fit the binary options and were not affected.",
      top_emotional_tags: ["HURT", "INVALIDATED", "TRIGGERED"],
      confidence_score: 0.94,
      avg_seq: 2.8,
      step_drop_off_pct: 3,
      supporting_monologues: [
        {
          session_id: "SA_U037_20260413",
          persona_type: "Relationship Crisis User",
          text: "I am going through a divorce and the options are 'Married' and 'Unmarried'. What am I?",
        },
      ],
      linked_friction_point_id: "FP_004",
      linked_theme_id: "T_005",
      linked_rec_id: "DR_005",
      rice_score: 68,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
    {
      insight_id: "INS_006",
      rank: 6,
      headline: "Unblock NRI users with international phone, global cities, and timezone detection",
      one_liner:
        "9 of 13 NRI users could not complete onboarding. They would pay 10x the Indian rate.",
      type: "Structural Exclusion",
      observation:
        "NRI Nostalgic conversion is 31% vs overall 58%. Drops are concentrated at phone (no country code) and city dropdown (India-only).",
      finding:
        "NRI users have the highest willingness-to-pay per user (~$15/month vs ₹299/month). Each lost NRI user represents ~$180/year in forgone revenue. The blocker is three missing form affordances, not disinterest.",
      insight:
        "This is a market-size problem disguised as form fields. Engineering cost is ~1 sprint; revenue ceiling is substantial.",
      recommendation:
        "Add a country-code selector on phone (or rely on the Google / Apple sign-in fix). Replace city dropdown with global city search (lat / long powered). Auto-detect birth-time timezone with IST conversion.",
      frequency_pct: 13,
      affected_personas: ["NRI Nostalgic"],
      not_affected_personas: ["Devotional Completer", "Career Anxiety Seeker", "Stigma Guardian"],
      counter_evidence: "None meaningful. The block is structural.",
      top_emotional_tags: ["EXCLUDED", "FRUSTRATED", "NOSTALGIC"],
      confidence_score: 0.9,
      avg_seq: 2.6,
      step_drop_off_pct: 4,
      supporting_monologues: [
        {
          session_id: "SA_U096_20260413",
          persona_type: "NRI Nostalgic",
          text: "I am paying in USD, I am willing to subscribe, and I cannot even create an account.",
        },
      ],
      linked_friction_point_id: "FP_005",
      linked_theme_id: "T_004",
      linked_rec_id: "DR_006",
      rice_score: 65,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-13",
    },
  ],

  design_recommendations: [
    {
      rec_id: "DR_001",
      rank: 1,
      headline: "Pass ad context to the AI. Make the first response answer the ad's promise.",
      linked_insight_id: "INS_001",
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      problem:
        "46% of users arrived with a specific question from a specific ad. 100% got generic kundli. Career-ad users who received career-specific AI responses converted at 68% vs 22% for generic.",
      user_need:
        "The AI's first response should directly address the emotional question that brought the user to the app.",
      current_experience:
        "AI system prompt has no awareness of acquisition context. Every user gets the same generic kundli reading regardless of which ad brought them.",
      after_experience:
        "UTM source / ad creative ID is passed as context to the AI. Ad-to-domain mapping: 'Career kab set hogi?' opens with 10th house + Dashamsha career analysis; 'Does he miss me?' opens with 7th house + relationship transit. The generic kundli becomes a follow-up, not the opener.",
      recommended_change:
        "Pipe UTM and ad creative ID into the AI system prompt. Maintain a hook-to-domain mapping (career, relationship, marriage, health). The first 2 to 3 sentences must directly answer the ad's promise before transitioning to broader kundli analysis.",
      emotional_target:
        "Replace BETRAYED and FRUSTRATED with RELIEVED and HOPEFUL. The AI validates that it understood why the user came.",
      effort: "medium",
      success_metric:
        "Subscription conversion from ad-driven traffic rises from 22% to 55%+. AI chat drop-off falls from 9% to under 4%. Revenue per ad-acquired user approximately triples.",
      priority: "this_sprint",
      rice_score: 92,
    },
    {
      rec_id: "DR_002",
      rank: 2,
      headline: "Bifurcate onboarding. Full kundli for devotionals, skip-to-chat for everyone else.",
      linked_insight_id: "INS_002",
      linked_friction_point_id: "FP_003",
      linked_theme_id: "T_003",
      problem:
        "Devotional Completers (18% of users, 38% of revenue) want 10 screens. Everyone else does not. One-size-fits-all optimises for neither.",
      user_need:
        "Two distinct entry paths, routed by intent, so the high-LTV ritual path and the low-commitment browse path can each be optimised independently.",
      current_experience:
        "All users go through the same 10-screen onboarding regardless of intent, familiarity, or willingness to invest time.",
      after_experience:
        "After OTP (screen 3), a fork: 'I want a complete kundli reading' goes to the full form (screens 4 to 10); 'I have a quick question' skips to AI chat and progressive profiling collects details conversationally. Each data point triggers an incremental insight ('Born in March, that makes you a Pisces with Revati nakshatra. Let me check your career house.').",
      recommended_change:
        "Insert a two-option intent fork after OTP. Build the progressive-profiling chat path (conversational data collection with incremental insights). Detect intent signal from ad UTM when possible to pre-select the fork.",
      emotional_target:
        "Replace IMPATIENT and EXCLUDED with CURIOUS and RESPECTED. Each segment experiences the path designed for them.",
      effort: "large",
      success_metric:
        "Overall completion rises from 58% to ~72%. Devotional Completer completion stays at 83%+. Career / Relationship user subscription conversion rises 15 to 20 points. Net revenue increases because bifurcation protects the high-LTV path.",
      priority: "this_sprint",
      rice_score: 86,
    },
    {
      rec_id: "DR_003",
      rank: 3,
      headline: "Add Google / Apple sign-in. Make phone number optional.",
      linked_insight_id: "INS_003",
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      problem:
        "11% drop at phone number. Stigma Guardians are not afraid of data leaks; they are afraid of social identity exposure. Their phone number connects to UPI, WhatsApp, LinkedIn.",
      user_need:
        "An auth path that does not leave an identity-linked paper trail, combined with a clear signal that the app will not surface astrology in notifications, SMS, or transaction history.",
      current_experience:
        "Phone number is mandatory at screen 2. No alternative sign-in. SMS notifications are on by default.",
      after_experience:
        "Google / Apple sign-in as primary. Phone number as optional enhancement. All astrology-related notifications disabled by default. A 'Private mode' toggle visible during signup.",
      recommended_change:
        "Integrate Firebase Google and Apple auth. Move the phone-number screen behind an optional 'enable notifications / payments' step. Default SMS opt-in to OFF. Add a visible privacy commitment on the number screen.",
      emotional_target:
        "Replace EMBARRASSED and FEARFUL with CONFIDENT and PROTECTED.",
      effort: "medium",
      success_metric:
        "Stigma Guardian conversion rises from 50% to 70%+. Phone-gate drop-off falls from 11% to under 4%. NRI sign-up unblocked simultaneously.",
      priority: "this_sprint",
      rice_score: 82,
    },
    {
      rec_id: "DR_004",
      rank: 4,
      headline: "Adapt AI language to user's tier and comprehension level",
      linked_insight_id: "INS_004",
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_004",
      problem:
        "Tier-2 users drop at AI chat at 2.8x the rate of Tier-1 because the AI uses unexplained Sanskrit astrology jargon.",
      user_need:
        "Authoritative astrology readings that are also intelligible to first-time, non-expert users without patronising the traditionalists.",
      current_experience:
        "AI uses the same astrological jargon for all users: 'Rahu in your 7th house', 'Saturn's transit through your 10th bhav', 'Mangal dosha in your navamsa'.",
      after_experience:
        "When the user's birth city is Tier-2 or their app language is Hindi / regional, the AI adds plain-language explanations after each Sanskrit term. 'Rahu aapke 7th house mein hai, iska matlab hai ki aapke relationships mein kuch unexpected changes aa sakte hain.' Tier-1 / English users get the compact version.",
      recommended_change:
        "Add two AI language modes keyed to user's city tier and language preference. Maintain a glossary of Sanskrit terms with plain-language equivalents. Route accordingly in the system prompt.",
      emotional_target:
        "Replace EXCLUDED and INADEQUATE with UNDERSTOOD and EMPOWERED.",
      effort: "medium",
      success_metric:
        "Tier-2 AI chat drop-off falls by 50%. Tier-2 subscription conversion rises from 18% to 30%+.",
      priority: "next_sprint",
      rice_score: 74,
    },
    {
      rec_id: "DR_005",
      rank: 5,
      headline: "Add transitional states to marital status and purpose dropdowns",
      linked_insight_id: "INS_005",
      linked_friction_point_id: "FP_004",
      linked_theme_id: "T_005",
      problem:
        "34% of users paused over 8 seconds on marital status. 'Married' / 'Unmarried' excludes the exact users the marketing targets.",
      user_need:
        "Form options that acknowledge life transitions so that the most emotionally invested users do not feel dismissed at the threshold.",
      current_experience:
        "Marital status: 'Married' / 'Unmarried'. Purpose: 'Career' / 'Marriage' / 'Health'.",
      after_experience:
        "Marital status adds 'Separated', 'Divorced', 'It is complicated', 'Prefer not to say'. Purpose adds 'Going through a difficult time', 'General guidance', 'Multiple concerns'. Both are 30-minute changes.",
      recommended_change:
        "Expand the dropdown options. Route 'Going through a difficult time' to a gentler AI tone profile.",
      emotional_target:
        "Replace HURT and INVALIDATED with ACKNOWLEDGED and SEEN.",
      effort: "quick_win",
      success_metric:
        "Marital status dwell time drops by 60%. Relationship Crisis User completion rises from 61% to 70%. Emotional-trigger drop-off falls from 3% to under 1%.",
      priority: "this_sprint",
      rice_score: 68,
    },
    {
      rec_id: "DR_006",
      rank: 6,
      headline: "Unblock NRI users. International phone, global cities, timezone.",
      linked_insight_id: "INS_006",
      linked_friction_point_id: "FP_005",
      linked_theme_id: "T_004",
      problem:
        "9 of 13 NRI users (69%) could not complete onboarding due to hard structural blocks. NRI users would pay 10x Indian rates.",
      user_need:
        "Onboarding that accepts their actual birth data (international city, non-IST timezone) and auth that does not assume an Indian SIM.",
      current_experience:
        "No country code selector. City dropdown limited to Indian cities. Birth time assumed IST.",
      after_experience:
        "Country code selector or Google / Apple sign-in (shared with DR_003). Global city search with lat / long for accurate kundli. Birth time with timezone selector and auto-IST conversion.",
      recommended_change:
        "Add international phone support. Replace city dropdown with a lat / long-backed global city search. Add timezone to birth-time entry with automatic IST conversion for astrological calculation.",
      emotional_target:
        "Replace EXCLUDED and FRUSTRATED with NOSTALGIC and WELCOMED.",
      effort: "medium",
      success_metric:
        "NRI completion rises from 31% to 65%+. At $15/month estimated subscription, each recovered NRI user equals ~$180/year, the highest per-user ROI of any recommendation.",
      priority: "next_sprint",
      rice_score: 65,
    },
  ],

  playbook_insights: [
    {
      playbook_id: "PLB_001",
      title: "Ad-specific hooks create an ad-specific debt the product must repay at first value",
      category: "acquisition_alignment",
      finding:
        "High-specificity ads maximise click-through but create a debt that the product must repay at first value delivery. When the product cannot fulfil the ad's specific promise, the user's sunk-cost investment amplifies the disappointment.",
      implication:
        "Marketing and product must align on an 'ad-to-value contract' for each creative. The more specific the ad, the more specific the first response must be.",
      action:
        "Pass ad creative ID / UTM as context to the AI or the first-screen template. Maintain a hook-to-domain mapping so each ad produces a specific first response.",
      applies_to: ["ad_driven_products", "ai_chatbots", "acquisition_alignment", "personalisation"],
      evidence_studies: ["SUPERASTRO_ONBOARD_v01"],
      confidence: 0.92,
      is_new: true,
      status: "Open",
    },
    {
      playbook_id: "PLB_002",
      title: "Stigmatised categories need anonymous-first auth. Phone numbers are an identity gate.",
      category: "auth_patterns",
      finding:
        "For products in stigmatised categories (astrology, mental health, sensitive health, anonymous social), the phone number acts as a traceable identity link to a socially hidden interest. Drop-off is proportional to social risk, not data-privacy risk.",
      implication:
        "Standard mobile-first auth patterns fail in stigmatised categories. The phone number, normally a neutral credential, becomes a liability.",
      action:
        "Offer Google / Apple / email sign-in as primary in stigmatised categories. Defer phone verification to payment or explicit notification opt-in. Default all category-revealing notifications to OFF.",
      applies_to: ["astrology_apps", "mental_health", "sensitive_categories", "auth_design", "privacy_patterns"],
      evidence_studies: ["SUPERASTRO_ONBOARD_v01"],
      confidence: 0.9,
      is_new: true,
      status: "Open",
    },
    {
      playbook_id: "PLB_003",
      title: "Your highest-LTV segment may want MORE friction, not less",
      category: "segmentation",
      finding:
        "Aggregate completion-rate optimisation can destroy revenue when the high-LTV minority experiences 'friction' as 'seriousness'. Devotional Completers read a 10-screen kundli form as a signal the app takes astrology seriously.",
      implication:
        "Never optimise a single onboarding path for a weighted average of segments. Bifurcate by intent signal and optimise each path against its segment's mental model.",
      action:
        "Before any onboarding shortening, test the change against the high-LTV segment specifically. If the change reduces their completion or subscription rate, ship a bifurcation instead of a single path.",
      applies_to: ["onboarding", "segmentation", "high_ltv_preservation"],
      evidence_studies: ["SUPERASTRO_ONBOARD_v01"],
      confidence: 0.88,
      is_new: true,
      status: "Open",
    },
  ],

  priority_table: [
    {
      rank: 1,
      insight_id: "INS_001",
      headline: "The AI's first response must mirror the ad hook that acquired the user",
      type: "Promise Violation",
      reach: null,
      impact: 3,
      confidence: 0.92,
      effort: 1.5,
      rice_score: 92,
      routing: "this_sprint",
      linked_rec_id: "DR_001",
    },
    {
      rank: 2,
      insight_id: "INS_002",
      headline: "Bifurcate onboarding by intent signal. Do not flatten all users into one path.",
      type: "Segment Conflict",
      reach: null,
      impact: 3,
      confidence: 0.88,
      effort: 2.5,
      rice_score: 86,
      routing: "this_sprint",
      linked_rec_id: "DR_002",
    },
    {
      rank: 3,
      insight_id: "INS_003",
      headline: "Replace phone-number-first with Google / Apple sign-in, phone optional",
      type: "Identity Threat",
      reach: null,
      impact: 2,
      confidence: 0.91,
      effort: 1,
      rice_score: 82,
      routing: "this_sprint",
      linked_rec_id: "DR_003",
    },
    {
      rank: 4,
      insight_id: "INS_004",
      headline: "Adapt AI language to user's tier and literacy level",
      type: "Comprehension Gap",
      reach: null,
      impact: 2,
      confidence: 0.86,
      effort: 1.5,
      rice_score: 74,
      routing: "next_sprint",
      linked_rec_id: "DR_004",
    },
    {
      rank: 5,
      insight_id: "INS_005",
      headline: "Add transitional states to marital status and expand purpose options",
      type: "Emotional Exclusion",
      reach: null,
      impact: 1,
      confidence: 0.94,
      effort: 0.25,
      rice_score: 68,
      routing: "this_sprint",
      linked_rec_id: "DR_005",
    },
    {
      rank: 6,
      insight_id: "INS_006",
      headline: "Unblock NRI users with international phone, global cities, timezone detection",
      type: "Structural Exclusion",
      reach: null,
      impact: 2,
      confidence: 0.9,
      effort: 2,
      rice_score: 65,
      routing: "next_sprint",
      linked_rec_id: "DR_006",
    },
  ],
};
