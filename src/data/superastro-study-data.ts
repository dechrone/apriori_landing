import type { StudyData } from "@/types/study";

/**
 * SuperAstro AI Astrology Chatbot Onboarding Simulation — study-format data.
 * 100 personas navigating the video ad to AI astrologer chat flow.
 * AppsForBharat / Sri Mandir ecosystem. Vedic astrology — kundli, dasha, dosha.
 */
export const superastroStudyData: StudyData = {
  study: {
    study_id: "APR_SUPERASTRO_v01",
    study_name: "SuperAstro AI Astrology Onboarding Simulation",
    flow_name:
      "Video Ad \u2192 Intro \u2192 OTP \u2192 Name \u2192 Gender \u2192 Marital \u2192 DOB \u2192 Time \u2192 Place \u2192 Purpose \u2192 AI Chat",
    flow_version: "v01",
    date_run: "2026-04-10",
    total_users: 100,
    completed_users: 62,
    dropped_users: 38,
    failed_users: 0,
    completion_rate: 62,
    acquisition_channels: [
      "instagram_reel",
      "facebook_video",
      "google_search",
    ],
    personas_used: [
      "Privacy-Seeker",
      "Price-Sensitive",
      "Devotee",
      "NRI",
      "Life-Transition",
      "Silent-Power-User",
      "Gen-Z-Curious",
    ],
    persona_distribution: {
      "Privacy-Seeker": 18,
      "Price-Sensitive": 15,
      Devotee: 14,
      NRI: 10,
      "Life-Transition": 16,
      "Silent-Power-User": 14,
      "Gen-Z-Curious": 13,
    },
    analysis_status: "complete",
  },

  executive_summary: {
    completion_rate: 62,
    sus_score: 58.2,
    sus_grade: "D",
    sus_label: "Poor",
    avg_seq: 3.8,
    critical_drop_point: "Intro + Mobile Number",
    critical_drop_pct: 8.5,
    top_findings: [
      {
        rank: 1,
        finding:
          "Same 10-screen onboarding, two opposite products. Devotees (71% conversion, your highest-LTV segment) experience it as sacred preparation \u2014 they pull out their janampatri and welcome every field. Gen-Z and Privacy-Seekers (54% / 56%) experience it as a census form and exit at the phone gate. The naive fix \u2014 shorten the onboarding to lift completion rate \u2014 would silently destroy the segment that pays you the most. The right move is two parallel paths from the same entry, not fewer screens.",
      },
      {
        rank: 2,
        finding:
          "Channel \u00d7 persona conversion math: Google Search \u00d7 Devotee = 86%. Instagram Reel \u00d7 Gen-Z-Curious = 42%. Same product, 44-point spread. Your Instagram CAC is being burned on a flow that wasn\u2019t built for impulse traffic \u2014 either rebuild the impulse path or rebalance spend toward search-intent channels.",
      },
      {
        rank: 3,
        finding:
          "The phone gate is filtering the wrong users. Stigma-sensitive professionals \u2014 the segment most willing to pay for privacy and discretion \u2014 will not link their UPI/WhatsApp/LinkedIn number to an astrology app. 8.5% drop here is the visible cost; the invisible cost is losing your highest-paying tier at the door.",
      },
      {
        rank: 4,
        finding:
          "Structural exclusion at the form-field level: marital binary ignores Separated/Divorced/Widowed (34% emotional impact), 3-purpose limit excludes Health / Family / Vastu, and self-only framing blocks Silent-Power-Users consulting for their children. None are bugs \u2014 they\u2019re defaults that quietly cost you above-average-LTV segments.",
      },
    ],
    top_recommendation: {
      headline:
        "Ship the two-path onboarding (Quick Chat for impulse traffic, Full Kundli for Devotees) as the structural bet \u2014 then anonymous-first auth and inclusive form fields as quick-win cleanup.",
      linked_rec_id: "DR_002",
      effort: "medium",
      routing: "this_sprint",
    },
    open_insights_count: 4,
    this_sprint_count: 3,
    next_sprint_count: 1,
    backlog_count: 0,
  },

  scores: {
    completion_rate: {
      overall: 62,
      ci_lower: 52.1,
      ci_upper: 71.2,
      by_persona: {
        "Privacy-Seeker": 56,
        "Price-Sensitive": 67,
        Devotee: 71,
        NRI: 50,
        "Life-Transition": 69,
        "Silent-Power-User": 64,
        "Gen-Z-Curious": 54,
      },
    },
    sus: {
      mean: 58.2,
      grade: "D",
      label: "Poor",
      benchmark: 68,
      delta_from_benchmark: -9.8,
      questions: [
        {
          q_id: 1,
          type: "positive",
          text: "I think that I would like to use this product frequently",
        },
        {
          q_id: 2,
          type: "negative",
          text: "I found the product unnecessarily complex",
        },
        {
          q_id: 3,
          type: "positive",
          text: "I thought the product was easy to use",
        },
        {
          q_id: 4,
          type: "negative",
          text: "I think that I would need the support of a technical person to be able to use this product",
        },
        {
          q_id: 5,
          type: "positive",
          text: "I found the various functions in this product were well integrated",
        },
        {
          q_id: 6,
          type: "negative",
          text: "I thought there was too much inconsistency in this product",
        },
        {
          q_id: 7,
          type: "positive",
          text: "I would imagine that most people would learn to use this product very quickly",
        },
        {
          q_id: 8,
          type: "negative",
          text: "I found the product very cumbersome to use",
        },
        {
          q_id: 9,
          type: "positive",
          text: "I felt very confident using the product",
        },
        {
          q_id: 10,
          type: "negative",
          text: "I needed to learn a lot of things before I could get going with this product",
        },
      ],
      distribution: { F: 22, D: 28, C: 26, B: 18, A: 6, "A+": 0 },
      by_persona: {
        "Privacy-Seeker": 52.4,
        "Price-Sensitive": 56.8,
        Devotee: 66.0,
        NRI: 54.2,
        "Life-Transition": 60.4,
        "Silent-Power-User": 62.1,
        "Gen-Z-Curious": 48.0,
      },
    },
    seq_by_task: {
      registration_flow: {
        avg: 4.1,
        benchmark: 5.5,
        delta: -1.4,
        flag: "needs_improvement",
        by_persona: {
          "Privacy-Seeker": 3.2,
          "Price-Sensitive": 4.0,
          Devotee: 5.4,
          NRI: 3.8,
          "Life-Transition": 4.4,
          "Silent-Power-User": 4.6,
          "Gen-Z-Curious": 3.4,
        },
      },
      profile_completion: {
        avg: 3.2,
        benchmark: 5.5,
        delta: -2.3,
        flag: "very_difficult",
        by_persona: {
          "Privacy-Seeker": 2.8,
          "Price-Sensitive": 3.0,
          Devotee: 4.6,
          NRI: 2.2,
          "Life-Transition": 3.4,
          "Silent-Power-User": 3.6,
          "Gen-Z-Curious": 2.6,
        },
      },
      first_consultation: {
        avg: 3.6,
        benchmark: 5.5,
        delta: -1.9,
        flag: "needs_improvement",
        by_persona: {
          "Privacy-Seeker": 3.0,
          "Price-Sensitive": 3.2,
          Devotee: 5.2,
          NRI: 3.4,
          "Life-Transition": 3.6,
          "Silent-Power-User": 4.0,
          "Gen-Z-Curious": 2.8,
        },
      },
    },
  },

  emotional_fingerprint: {
    top_positive_tags: [
      { tag: "HOPEFUL", frequency_pct: 42 },
      { tag: "CURIOUS", frequency_pct: 36 },
      { tag: "RELIEVED", frequency_pct: 18 },
    ],
    top_negative_tags: [
      { tag: "EMBARRASSED", frequency_pct: 52 },
      { tag: "IMPATIENT", frequency_pct: 46 },
      { tag: "SKEPTICAL", frequency_pct: 38 },
      { tag: "ANXIOUS", frequency_pct: 32 },
      { tag: "FRUSTRATED", frequency_pct: 24 },
    ],
    overall_sentiment: "mixed",
    sentiment_score: -0.18,
    most_emotional_step: "Intro + Mobile Number",
    smoothest_step: "OTP Verification",
    by_persona: {
      "Privacy-Seeker": {
        dominant_tag: "EMBARRASSED",
        sentiment: "negative",
      },
      "Price-Sensitive": {
        dominant_tag: "IMPATIENT",
        sentiment: "neutral",
      },
      Devotee: { dominant_tag: "HOPEFUL", sentiment: "positive" },
      NRI: { dominant_tag: "FRUSTRATED", sentiment: "negative" },
      "Life-Transition": { dominant_tag: "ANXIOUS", sentiment: "negative" },
      "Silent-Power-User": { dominant_tag: "CURIOUS", sentiment: "neutral" },
      "Gen-Z-Curious": { dominant_tag: "SKEPTICAL", sentiment: "neutral" },
    },
  },

  themes: [
    {
      theme_id: "T_001",
      rank: 1,
      theme_name:
        "Astrology stigma amplifies phone number friction",
      description:
        "Astrology isn\u2019t socially accepted in professional circles. The phone number gate creates a permanent, traceable link between the user\u2019s identity and an \u201cunscientific\u201d interest. This is fundamentally different from sharing a phone number with a food delivery app. Young professionals specifically fear discovery by colleagues, family, or partners.",
      frequency_pct: 52,
      affected_personas: ["Privacy-Seeker", "Gen-Z-Curious"],
      not_affected_personas: ["Devotee", "Silent-Power-User"],
      supporting_codes: [
        { code_name: "Astrology_Stigma_Phone_Fear", frequency_pct: 52 },
        {
          code_name: "Identity_Linkage_Embarrassment",
          frequency_pct: 44,
        },
      ],
      key_monologues: [
        {
          session_id: "APR_SA_U012_20260410",
          persona_type: "Privacy-Seeker",
          text: "If anyone at work finds out I\u2019m using an astrology app, I\u2019ll never hear the end of it. My phone number links directly to my identity \u2014 what if they sell my data or I start getting astrology SMS?",
        },
        {
          session_id: "APR_SA_U088_20260410",
          persona_type: "Gen-Z-Curious",
          text: "I was just curious from the reel. But entering my number? Now this app knows I believe in astrology. My friends would roast me if they found out.",
        },
      ],
      counter_evidence: {
        summary:
          "Devotees and Silent-Power-Users see no stigma \u2014 astrology is part of their daily spiritual practice and they share birth details freely with pandits and astrologers",
        frequency_pct: 28,
      },
      quantitative_support: {
        completion_rate: 0.52,
        avg_seq: 3.2,
      },
      root_causes:
        "The app requires standard phone auth, which is a neutral pattern in most apps. But astrology is socially stigmatized in urban professional India \u2014 it\u2019s something people do privately but never admit to publicly. The phone number creates a permanent, traceable record linking the user\u2019s real identity to a stigmatized interest. There is no anonymous or guest option, and no explanation of data usage. The stigma is asymmetric: devotional users see zero issue, but privacy-conscious professionals see maximum risk.",
      connected_friction_point_ids: ["FP_001"],
    },
    {
      theme_id: "T_002",
      rank: 2,
      theme_name:
        "Ad-to-value delivery gap is 10 screens wide",
      description:
        "Video ads promise instant interaction (\u201cChat NOW\u201d, \u201cChat 24/7 at \u20b91\u201d). The reality is 10 screens of form-filling before any astrological value. Each screen widens the gap between expectation and experience. By screen 7 (DOB picker), impatient users feel they\u2019ve been misled.",
      frequency_pct: 46,
      affected_personas: [
        "Price-Sensitive",
        "Gen-Z-Curious",
        "Privacy-Seeker",
      ],
      not_affected_personas: ["Devotee", "NRI"],
      supporting_codes: [
        { code_name: "Ad_Promise_Reality_Gap", frequency_pct: 46 },
        { code_name: "Onboarding_Length_Fatigue", frequency_pct: 38 },
      ],
      key_monologues: [
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          text: "The ad said \u2018Chat 24/7 at just \u20b91\u2019. I\u2019ve filled 6 forms and still haven\u2019t chatted with anyone. This doesn\u2019t feel like a \u20b91 experience \u2014 it feels like a government application.",
        },
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Bro I just wanted to check if my ex misses me, not fill out a census form. How many screens does this app have?",
        },
      ],
      counter_evidence: {
        summary:
          "Devotees expect birth detail collection for accurate kundli \u2014 they welcome the data entry as a necessary step for genuine astrological analysis",
        frequency_pct: 24,
      },
      quantitative_support: {
        completion_rate: 0.54,
        avg_seq: 3.0,
      },
      root_causes:
        "The video ads are optimized for clicks with immediate-gratification hooks (\u2018Chat NOW\u2019, \u2018Does he miss me?\u2019). But the product was built for accurate Vedic astrology, which genuinely requires birth details (date, time, place) for kundli generation. The disconnect isn\u2019t in the product \u2014 it\u2019s in the advertising. The ads create an expectation of instant chatbot access, while the product delivers a methodical astrological intake. Neither team (marketing nor product) has aligned on what the first 60 seconds should feel like.",
      connected_friction_point_ids: ["FP_002"],
    },
    {
      theme_id: "T_004",
      rank: 4,
      theme_name:
        "Onboarding excludes non-standard users structurally",
      description:
        "Users with needs outside the three offered purposes (Marriage / Career / Relationship) have no matching option. Marital status is a binary that ignores Separated, Divorced, Widowed. The flow assumes the user is consulting for themselves \u2014 not for a child, parent, or spouse. Users uncertain about exact DOB or birth time struggle with the pickers. The flow is built for a default user and silently filters out everyone whose lived reality doesn\u2019t match.",
      frequency_pct: 28,
      affected_personas: ["NRI", "Devotee", "Life-Transition"],
      not_affected_personas: ["Privacy-Seeker"],
      supporting_codes: [
        {
          code_name: "Structural_Exclusion_Non_Standard",
          frequency_pct: 28,
        },
        { code_name: "City_Picker_International_Fail", frequency_pct: 18 },
      ],
      key_monologues: [
        {
          session_id: "APR_SA_U071_20260410",
          persona_type: "NRI",
          text: "The AI is responding in Hindi with Sanskrit terms \u2014 dasha, antardasha, navamsa. I grew up in the US, I can read Hindi but these technical words mean nothing to me. Is there an English mode?",
        },
        {
          session_id: "APR_SA_U046_20260410",
          persona_type: "Devotee",
          text: "My main concern is my son\u2019s health and my own spiritual growth. But the purpose options are only Marriage, Career, and Relationship. Where is Health? Where is Spiritual Guidance? I chose Career because it was closest, but it\u2019s not what I need.",
        },
      ],
      counter_evidence: {
        summary:
          "Standard Indian urban users in tier-1 cities with marriage/career concerns found the dropdowns adequate and moved through quickly",
        frequency_pct: 52,
      },
      quantitative_support: {
        completion_rate: 0.50,
        avg_seq: 3.4,
      },
      root_causes:
        "The onboarding was designed for the majority use case: a 25\u201335 year old Indian user with marriage or career questions consulting for themselves. The purpose selector has three options (Marriage, Career, Relationship) that cover ~70% of use cases but structurally exclude health queries, spiritual guidance, family/child concerns, business/Vastu, education, and legal matters. The marital binary ignores Separated, Divorced, Widowed. The AI defaults to Hindi with Sanskrit terminology (dasha, antardasha, navamsa) that diaspora users with English-primary literacy can\u2019t parse. These aren\u2019t bugs \u2014 they\u2019re design decisions that prioritize the majority at the cost of excluding meaningful minority segments.",
      connected_friction_point_ids: [],
    },
    {
      theme_id: "T_005",
      rank: 5,
      theme_name:
        "Emotional vulnerability makes friction points feel personal",
      description:
        "Users consulting an astrologer are often emotionally vulnerable \u2014 going through breakups, career crises, family pressure. Friction that would be minor in a utility app (complex DOB picker, marital status question) becomes emotionally charged. The marital status question triggers anxiety for users under marriage pressure. The journey purpose limitation feels like the universe saying \u201cyour problem doesn\u2019t matter.\u201d",
      frequency_pct: 34,
      affected_personas: [
        "Life-Transition",
        "Silent-Power-User",
        "Gen-Z-Curious",
      ],
      not_affected_personas: ["Devotee"],
      supporting_codes: [
        {
          code_name: "Emotional_Vulnerability_Amplifier",
          frequency_pct: 34,
        },
        { code_name: "Marital_Status_Trigger", frequency_pct: 22 },
      ],
      key_monologues: [
        {
          session_id: "APR_SA_U055_20260410",
          persona_type: "Life-Transition",
          text: "It asked my marital status. I\u2019m going through a divorce and the options are \u2018Married\u2019 and \u2018Unmarried\u2019. What am I? The reason I\u2019m here is because my marriage is falling apart, and the first thing the app does is make me label myself.",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          text: "I wanted guidance about my daughter\u2019s marriage prospects, but the purpose screen only asks about MY marriage, MY career, MY relationship. This app doesn\u2019t understand that women my age consult astrologers for their children, not themselves.",
        },
      ],
      counter_evidence: {
        summary:
          "Devotees have a transactional relationship with astrology and treat form fields as neutral data inputs rather than emotional prompts",
        frequency_pct: 20,
      },
      quantitative_support: {
        completion_rate: 0.58,
        avg_seq: 3.6,
      },
      root_causes:
        "The onboarding treats birth data collection as a neutral form-filling exercise. But users seeking astrological guidance are often in emotional distress \u2014 the very reason they\u2019re turning to astrology. The marital status field (Married/Unmarried binary) ignores separated, divorced, widowed, and \u201cit\u2019s complicated\u201d states. The purpose selector assumes the user is seeking guidance for themselves, not for a child, parent, or sibling. These aren\u2019t UX issues in a vacuum \u2014 they become emotional triggers because the user\u2019s raw vulnerability is already activated when they open the app.",
      connected_friction_point_ids: ["FP_005"],
    },
  ],

  screens: [
    {
      step_id: 1,
      step_name: "Video Ad (Instagram/Facebook)",
      reached: 100,
      completed: 94,
      dropped: 6,
      drop_off_pct: 6.0,
      avg_seq: 5.2,
      top_emotional_tags: ["CURIOUS", "HOPEFUL"],
      top_behavioral_tags: ["COMPLETED", "ENGAGED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Watched full reel, clicked CTA",
          internal_monologue:
            "\u2018Love marriage or arranged? Sare jawab aapki kundali mein hai.\u2019 This is exactly what my pandit says. If an AI can read my kundli accurately, this could save me the trip to the mandir every week. \u20b91 for a first consultation \u2014 why not?",
          emotional_tags: ["HOPEFUL", "CURIOUS"],
          behavioral_tags: ["COMPLETED", "ENGAGED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U022_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Watched reel twice, clicked CTA",
          internal_monologue:
            "AstroTalk charges \u20b915-20 per minute and the last session cost me \u20b9400. \u20b91 for a full chat? Even if it\u2019s half as good, that\u2019s worth trying. Let me see what this Mahesh Ji AI has to say.",
          emotional_tags: ["HOPEFUL", "CURIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U088_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Watched reel, swiped up out of curiosity",
          internal_monologue:
            "\u2018Does he miss me?\u2019 Okay that hooked me. I don\u2019t really believe in astrology but what if it\u2019s accurate? It\u2019s only \u20b91, what\u2019s the worst that can happen?",
          emotional_tags: ["CURIOUS", "SKEPTICAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U012_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Watched reel but did not click",
          internal_monologue:
            "\u2018Astrology koi guess nahi, ek science hai\u2019 \u2014 interesting claim. But I\u2019m not clicking an astrology ad from my main Instagram account. What if the algorithm starts showing me jyotish content? My colleagues follow me on Instagram.",
          emotional_tags: ["CURIOUS", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Fear of Instagram algorithm associating their profile with astrology content visible to professional contacts",
        },
        {
          session_id: "APR_SA_U097_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Scrolled past reel",
          internal_monologue:
            "Another astrology app ad. These are everywhere. Probably just a scam that tells everyone the same generic stuff. Not wasting my time.",
          emotional_tags: ["SKEPTICAL"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Ad fatigue \u2014 too many astrology app ads on Instagram have eroded trust in the category",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U012_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Watched reel but did not click",
          internal_monologue:
            "I\u2019m not clicking an astrology ad from my main Instagram account. My colleagues follow me.",
          emotional_tags: ["CURIOUS", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Social media profile association with astrology content",
        },
        {
          session_id: "APR_SA_U097_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Scrolled past reel",
          internal_monologue:
            "Another astrology app ad. Probably just a scam that tells everyone the same generic stuff.",
          emotional_tags: ["SKEPTICAL"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Astrology app ad fatigue and category-level distrust",
        },
        {
          session_id: "APR_SA_U063_20260410",
          persona_type: "NRI",
          action_taken: "Watched reel, checked comments, did not click",
          internal_monologue:
            "The Hindi is heavy \u2014 kundali, dasha, dosha. I grew up speaking English mostly. If the app is all in Hindi I won\u2019t understand half of it.",
          emotional_tags: ["FRUSTRATED", "CURIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Hindi-heavy ad content alienated an English-primary NRI user",
        },
      ],
    },
    {
      step_id: 2,
      step_name: "Intro + Mobile Number",
      reached: 94,
      completed: 86,
      dropped: 8,
      drop_off_pct: 8.5,
      avg_seq: 3.4,
      top_emotional_tags: ["EMBARRASSED", "ANXIOUS", "DISTRUST"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Entered number immediately",
          internal_monologue:
            "Mahesh Ji AI astrologer \u2014 nice, they\u2019ve given the AI a name. Feels like a real pandit. Phone number? Of course, how else will they send me my kundli? I give my number to every astrology service.",
          emotional_tags: ["HOPEFUL", "CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U015_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Stared at phone number field, closed app",
          internal_monologue:
            "Phone number for an astrology app? No way. This number is linked to my UPI, my office WhatsApp, my LinkedIn. If this app gets hacked or sells data, everyone will know I consult astrologers. I\u2019ll look for a web-based tool that doesn\u2019t need login.",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Phone number linked to professional identity \u2014 refused to create traceable record of astrology usage",
        },
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Entered number after brief hesitation",
          internal_monologue:
            "Phone number... okay fine. I gave it to AstroTalk too. At least this one is \u20b91, not \u20b915 per minute. Let me just get to the chat quickly.",
          emotional_tags: ["IMPATIENT", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U090_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Considered using number, closed app",
          internal_monologue:
            "They want my real number? For a \u20b91 astrology chat? I was just curious from the reel. This is too much commitment for something I\u2019m not even sure I believe in.",
          emotional_tags: ["SKEPTICAL", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Commitment level (phone number) disproportionate to curiosity level \u2014 low-intent user blocked by high-commitment gate",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U015_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Stared at phone number field, closed app",
          internal_monologue:
            "This number is linked to my UPI, my office WhatsApp, my LinkedIn. If this app sells data, everyone will know I consult astrologers.",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Professional identity linkage with astrology app",
        },
        {
          session_id: "APR_SA_U090_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Considered using number, closed app",
          internal_monologue:
            "They want my real number for a \u20b91 astrology chat? This is too much commitment for curiosity.",
          emotional_tags: ["SKEPTICAL", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Low curiosity intent vs high commitment gate mismatch",
        },
        {
          session_id: "APR_SA_U018_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Looked for guest login, found none, left",
          internal_monologue:
            "No guest option, no email login, no \u2018skip for now\u2019. The only way in is my phone number. For an astrology app. In 2026. No thanks.",
          emotional_tags: ["DISTRUST", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "No alternative auth method available for privacy-conscious user",
        },
        {
          session_id: "APR_SA_U075_20260410",
          persona_type: "NRI",
          action_taken: "Hesitated at phone screen, closed app",
          internal_monologue:
            "An astrology app wants my phone number? My UK colleagues would never let me hear the end of it if they saw an astrology SMS land on my screen. I\u2019ll search Google instead.",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Diaspora professional unwilling to link primary phone number to a stigmatized category",
        },
      ],
    },
    {
      step_id: 3,
      step_name: "OTP Verification",
      reached: 86,
      completed: 85,
      dropped: 1,
      drop_off_pct: 1.2,
      avg_seq: 5.8,
      top_emotional_tags: ["NEUTRAL", "IMPATIENT"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Entered OTP immediately",
          internal_monologue:
            "OTP aaya, dal diya. Standard hai ye toh. Jaldi se kundli banana shuru karo.",
          emotional_tags: ["NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Entered OTP within 10 seconds",
          internal_monologue:
            "OTP auto-read ho gaya. Good, at least this part is fast. Ab chat kab milega?",
          emotional_tags: ["IMPATIENT", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U099_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "OTP delayed, lost interest, closed app",
          internal_monologue:
            "OTP nahi aa raha. Already I\u2019m not sure about this. If the OTP doesn\u2019t come in 30 seconds, I\u2019m out. ...Okay, I\u2019m out.",
          emotional_tags: ["IMPATIENT"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "OTP delivery delay combined with low commitment level",
        },
      ],
    },
    {
      step_id: 4,
      step_name: "Name Input",
      reached: 85,
      completed: 83,
      dropped: 2,
      drop_off_pct: 2.4,
      avg_seq: 5.0,
      top_emotional_tags: ["NEUTRAL", "CURIOUS"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Typed full name",
          internal_monologue:
            "Naam dalna padega toh sahi hai \u2014 kundli mein naam zaroori hota hai. Poora naam daalti hoon jaise pandit ji ko batati hoon.",
          emotional_tags: ["NEUTRAL", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U016_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Typed fake name, proceeded",
          internal_monologue:
            "I\u2019m using a fake name. \u2018Rahul Sharma\u2019 should do it. I\u2019ve already given them my phone number which I regret, but at least they won\u2019t have my real name.",
          emotional_tags: ["DISTRUST", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U092_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Saw name field, considered effort, left",
          internal_monologue:
            "OTP done, now name, then what? Gender? DOB? How long is this onboarding? I just wanted a quick astro reading, not an Aadhaar application.",
          emotional_tags: ["IMPATIENT", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Anticipated long onboarding ahead \u2014 effort exceeded curiosity-level intent",
        },
        {
          session_id: "APR_SA_U038_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Started typing, got distracted, never returned",
          internal_monologue:
            "Notification aa gaya PhonePe ka. Wapas aaunga baad mein... probably not though.",
          emotional_tags: ["IMPATIENT"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "External distraction during low-engagement onboarding step \u2014 insufficient hook to return",
        },
      ],
    },
    {
      step_id: 5,
      step_name: "Gender Selection",
      reached: 83,
      completed: 82,
      dropped: 1,
      drop_off_pct: 1.2,
      avg_seq: 5.4,
      top_emotional_tags: ["NEUTRAL"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Selected Female",
          internal_monologue:
            "Gender select karo. Simple hai. Aage badho.",
          emotional_tags: ["NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Selected Male, proceeded",
          internal_monologue:
            "Male. Done. Can we please get to the chat now? Every screen is one more screen away from the \u20b91 consultation I was promised.",
          emotional_tags: ["IMPATIENT", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U095_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Saw only Male/Female options, felt excluded, left",
          internal_monologue:
            "Only Male and Female? No non-binary option? It\u2019s 2026. If the app can\u2019t even get gender right, how is it going to understand my life?",
          emotional_tags: ["FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Binary gender options felt exclusionary for a non-binary user",
        },
      ],
    },
    {
      step_id: 6,
      step_name: "Marital Status",
      reached: 82,
      completed: 80,
      dropped: 2,
      drop_off_pct: 2.4,
      avg_seq: 4.6,
      top_emotional_tags: ["ANXIOUS", "NEUTRAL"],
      top_behavioral_tags: ["COMPLETED", "HESITATED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Selected Married",
          internal_monologue:
            "Married. Ye toh kundli ke liye chahiye hi \u2014 vivah yog dekhne ke liye zaroori hai. Sahi hai.",
          emotional_tags: ["NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U055_20260410",
          persona_type: "Life-Transition",
          action_taken: "Stared at options, reluctantly selected Married",
          internal_monologue:
            "It asked my marital status. I\u2019m going through a divorce and the options are \u2018Married\u2019 and \u2018Unmarried\u2019. What am I? The reason I\u2019m here is because my marriage is falling apart, and the first thing the app does is make me label myself.",
          emotional_tags: ["ANXIOUS", "FRUSTRATED"],
          behavioral_tags: ["HESITATED", "COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          action_taken: "Selected Married, proceeded",
          internal_monologue:
            "Married, obviously. But I\u2019m not here for my marriage \u2014 I\u2019m here for my daughter\u2019s rishta. This app seems to assume I\u2019m asking about myself.",
          emotional_tags: ["NEUTRAL", "CURIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U057_20260410",
          persona_type: "Life-Transition",
          action_taken:
            "Saw Married/Unmarried binary, felt triggered, closed app",
          internal_monologue:
            "My husband left 3 months ago. \u2018Married\u2019 feels like a lie. \u2018Unmarried\u2019 erases 12 years. Where is \u2018Separated\u2019? Where is \u2018It\u2019s complicated\u2019? I came here because my life is falling apart and this form can\u2019t even hold my reality.",
          emotional_tags: ["ANXIOUS", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Binary marital status options triggered emotional distress in a user going through separation",
        },
        {
          session_id: "APR_SA_U089_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Selected Unmarried, then questioned why it matters",
          internal_monologue:
            "Why does an astrology chatbot need my marital status? This feels creepy. Are they going to show me shaadi ads now?",
          emotional_tags: ["SKEPTICAL", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Questioned data relevance \u2014 suspected commercial intent behind marital status collection",
        },
      ],
    },
    {
      step_id: 7,
      step_name: "Date of Birth",
      reached: 80,
      completed: 76,
      dropped: 4,
      drop_off_pct: 5.0,
      avg_seq: 3.8,
      top_emotional_tags: ["IMPATIENT", "CONFUSED"],
      top_behavioral_tags: ["HESITATED", "COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Entered DOB quickly using date picker",
          internal_monologue:
            "Janam tithi \u2014 ye toh sabse important hai kundli ke liye. 14 March 1982. Without this, no astrologer can say anything meaningful. Good that they\u2019re asking.",
          emotional_tags: ["HOPEFUL", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Scrolled through date picker, entered DOB",
          internal_monologue:
            "DOB picker... scroll scroll scroll to 1994. This is the 7th screen. The ad said \u2018Chat 24/7\u2019 but I\u2019ve been filling forms for 3 minutes. Where is the chat?",
          emotional_tags: ["IMPATIENT", "FRUSTRATED"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U072_20260410",
          persona_type: "NRI",
          action_taken: "Entered DOB, struggled with date format",
          internal_monologue:
            "Is this DD/MM/YYYY or MM/DD/YYYY? In the US we use month-first. I hope I entered it correctly because if the birth date is wrong, the entire chart will be wrong.",
          emotional_tags: ["CONFUSED", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken:
            "Reached DOB screen, counted remaining screens, left",
          internal_monologue:
            "DOB... and then what? Time of birth? Place? I bet there are 3 more screens after this. Bro I just wanted to check if my ex misses me. This is not worth it.",
          emotional_tags: ["IMPATIENT", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Perceived remaining onboarding length exceeded motivation threshold",
        },
        {
          session_id: "APR_SA_U037_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Struggled with scrolling date picker, gave up",
          internal_monologue:
            "This date picker is painful. I have to scroll month by month from 2026 back to 1990? There\u2019s no year selector? For \u20b91 I\u2019m not going to fight with a bad UI.",
          emotional_tags: ["FRUSTRATED", "IMPATIENT"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Date picker UI friction \u2014 no year shortcut for users born decades ago",
        },
        {
          session_id: "APR_SA_U059_20260410",
          persona_type: "Life-Transition",
          action_taken: "Unsure of exact birth date, gave up",
          internal_monologue:
            "My mother always said I was born on a Tuesday in Shravan month, but I don\u2019t know the exact English date. The picker needs an exact date. I can\u2019t just guess \u2014 a wrong date will give wrong predictions.",
          emotional_tags: ["CONFUSED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "User knew birth date in Hindu calendar only \u2014 no accommodation for approximate or lunar calendar dates",
        },
        {
          session_id: "APR_SA_U019_20260410",
          persona_type: "Privacy-Seeker",
          action_taken: "Reached DOB, realized depth of data collection, left",
          internal_monologue:
            "Phone number, name, gender, marital status, and now date of birth? This app is building a complete profile of me. For astrology. I\u2019ve already given too much information. I\u2019m deleting this app.",
          emotional_tags: ["DISTRUST", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Cumulative data collection crossed privacy threshold \u2014 triggered deletion intent",
        },
      ],
    },
    {
      step_id: 8,
      step_name: "Time of Birth",
      reached: 76,
      completed: 74,
      dropped: 2,
      drop_off_pct: 2.6,
      avg_seq: 4.4,
      top_emotional_tags: ["UNCERTAIN", "RELIEVED"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Entered exact time from janampatri",
          internal_monologue:
            "Janam ka samay \u2014 mere paas janampatri mein likha hai. 4:35 AM. Ye sahi rehna chahiye, nahi toh lagna chart galat ban jayegi.",
          emotional_tags: ["CONFIDENT", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U058_20260410",
          persona_type: "Life-Transition",
          action_taken: "Used Skip option",
          internal_monologue:
            "Time of birth? I have no idea. Let me call my mom... actually no, she\u2019ll ask why I need it and then she\u2019ll know I\u2019m using an astrology app. Thank God there\u2019s a \u2018Don\u2019t Know\u2019 option.",
          emotional_tags: ["RELIEVED", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U072_20260410",
          persona_type: "NRI",
          action_taken: "Entered approximate time",
          internal_monologue:
            "My parents said \u2018morning time\u2019 but I don\u2019t know the exact hour. I\u2019ll put 8:00 AM and hope it\u2019s close enough. In the US, hospitals record exact birth times, but my Indian birth certificate just says \u2018morning\u2019.",
          emotional_tags: ["UNCERTAIN", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U040_20260410",
          persona_type: "Price-Sensitive",
          action_taken:
            "Didn\u2019t know birth time, didn\u2019t see skip option, left",
          internal_monologue:
            "Birth time? Mujhe kahan yaad hai. Mummy ko phone karun? \u20b91 ke liye itni mehnat? Skip ka option dikh nahi raha. Chhodo.",
          emotional_tags: ["FRUSTRATED", "IMPATIENT"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Birth time unknown and Skip option not discoverable \u2014 effort exceeded \u20b91 value perception",
        },
        {
          session_id: "APR_SA_U076_20260410",
          persona_type: "NRI",
          action_taken: "Confused by time zone implications, left",
          internal_monologue:
            "Should I enter the time in IST or EST? I was born in India but I\u2019m entering this from the US. If the time zone is wrong, the whole kundli will be wrong. There\u2019s no time zone selector.",
          emotional_tags: ["CONFUSED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "No time zone context for birth time \u2014 NRI user uncertain whether to use IST or local time",
        },
      ],
    },
    {
      step_id: 9,
      step_name: "Place of Birth",
      reached: 74,
      completed: 70,
      dropped: 4,
      drop_off_pct: 5.4,
      avg_seq: 4.0,
      top_emotional_tags: ["FRUSTRATED", "NEUTRAL"],
      top_behavioral_tags: ["COMPLETED", "HESITATED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Typed city name, selected from dropdown",
          internal_monologue:
            "Janam sthan \u2014 Varanasi. Mil gaya dropdown mein. Correct coordinates zaroori hain kundli ke liye, isliye poochh rahe hain.",
          emotional_tags: ["NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U071_20260410",
          persona_type: "NRI",
          action_taken: "Found city, hesitated about coordinates",
          internal_monologue:
            "Edison, New Jersey \u2014 found it. But wait, does Vedic astrology even work for births outside India? My pandit always asks for Indian birthplaces. I\u2019m not sure if Mahesh Ji will read this correctly. I\u2019ll proceed but expect a half-accurate reading.",
          emotional_tags: ["UNCERTAIN", "CURIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          action_taken: "Typed village name, found nearest city",
          internal_monologue:
            "I was born in a small village near Allahabad. The village isn\u2019t in the list but Allahabad is close enough. Pandits always use the nearest major city anyway.",
          emotional_tags: ["NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U060_20260410",
          persona_type: "Life-Transition",
          action_taken: "Couldn\u2019t recall exact birthplace, left",
          internal_monologue:
            "I think I was born in a hospital in some town near Patna but I\u2019m not actually sure which one. There\u2019s no \u2018I don\u2019t know\u2019 option here like there was for birth time. I don\u2019t want to guess and get a wrong reading.",
          emotional_tags: ["UNCERTAIN", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "No \u2018Don\u2019t Know\u2019 affordance for users uncertain about exact birth city",
        },
        {
          session_id: "APR_SA_U041_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Typed city name with typo, no results, left",
          internal_monologue:
            "I typed \u2018Lucknw\u2019 instead of \u2018Lucknow\u2019 and nothing showed up. No autocorrect? No \u2018did you mean?\u2019 suggestion? Even Google handles typos.",
          emotional_tags: ["FRUSTRATED", "IMPATIENT"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "City picker lacks fuzzy matching for typos",
        },
      ],
    },
    {
      step_id: 10,
      step_name: "Journey Purpose Selection",
      reached: 70,
      completed: 68,
      dropped: 2,
      drop_off_pct: 2.9,
      avg_seq: 4.2,
      top_emotional_tags: ["FRUSTRATED", "HOPEFUL"],
      top_behavioral_tags: ["COMPLETED", "HESITATED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Selected Marriage, but wanted broader options",
          internal_monologue:
            "Marriage, Career, Relationship \u2014 only these three? Main toh apne bete ki naukri ke baare mein puchhna chahti thi, aur beti ki shaadi bhi. Chalo, Marriage select kar leti hoon.",
          emotional_tags: ["NEUTRAL", "FRUSTRATED"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U058_20260410",
          persona_type: "Life-Transition",
          action_taken: "Selected Career",
          internal_monologue:
            "Career \u2014 yes, that\u2019s my biggest worry right now. Two years since I lost my job and nothing has worked out. If the stars say something good is coming, maybe I can hold on a little longer.",
          emotional_tags: ["HOPEFUL", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          action_taken: "Reluctantly selected Marriage",
          internal_monologue:
            "I wanted guidance about my daughter\u2019s marriage prospects, but the purpose screen only asks about MY marriage, MY career, MY relationship. This app doesn\u2019t understand that women my age consult astrologers for their children, not themselves.",
          emotional_tags: ["FRUSTRATED", "NEUTRAL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U046_20260410",
          persona_type: "Devotee",
          action_taken:
            "Looked for Health/Spiritual option, found none, left",
          internal_monologue:
            "My main concern is my son\u2019s health and my own spiritual growth. But the purpose options are only Marriage, Career, and Relationship. Where is Health? Where is Spiritual Guidance? I chose Career because it was closest, but actually, no \u2014 I\u2019ll find a real pandit instead.",
          emotional_tags: ["FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Purpose options too narrow \u2014 health and spiritual guidance needs not represented",
        },
        {
          session_id: "APR_SA_U077_20260410",
          persona_type: "NRI",
          action_taken:
            "None of the options matched, left",
          internal_monologue:
            "I wanted to ask about visa and immigration timing \u2014 my H1B is up for renewal and my astrologer in India said Saturn transit could affect it. Marriage, Career, Relationship \u2014 none of these capture what I need. Career is closest but it\u2019s not the same thing.",
          emotional_tags: ["FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Specific NRI concern (visa/immigration) not represented in purpose options",
        },
      ],
    },
    {
      step_id: 11,
      step_name: "AI Chat (Mahesh Ji)",
      reached: 68,
      completed: 62,
      dropped: 6,
      drop_off_pct: 8.8,
      avg_seq: 3.6,
      top_emotional_tags: ["DISAPPOINTED", "RELIEVED", "HOPEFUL"],
      top_behavioral_tags: ["COMPLETED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          action_taken: "Read full kundli analysis, asked follow-up questions",
          internal_monologue:
            "Mahesh Ji ne mera Rahu-Ketu axis sahi bataya! 7th house mein Shani \u2014 this is exactly what my pandit said about my marriage delays. The AI knows Vedic astrology. I\u2019m impressed. \u20b91 mein itna detailed reading? AstroTalk pe \u20b9400 lagta.",
          emotional_tags: ["RELIEVED", "HOPEFUL"],
          behavioral_tags: ["COMPLETED", "ENGAGED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U058_20260410",
          persona_type: "Life-Transition",
          action_taken:
            "Read generic kundli summary, felt disappointed, closed chat",
          internal_monologue:
            "I clicked because the ad asked \u2018Career kab set hogi?\u2019 \u2014 that\u2019s exactly my question. But the AI started talking about Rahu in my 7th house and Saturn\u2019s transit. I don\u2019t care about planets. When will my career improve? Tell me that.",
          emotional_tags: ["DISAPPOINTED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Generic kundli response did not address the specific career question that the ad promised to answer",
        },
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          action_taken: "Scanned kundli summary, asked about career timing",
          internal_monologue:
            "Okay, the kundli summary is decent. Not as detailed as AstroTalk\u2019s live astrologer, but for \u20b91? This is great value. Let me ask about when my promotion will happen \u2014 if it gives a good answer, I\u2019ll keep using this.",
          emotional_tags: ["CURIOUS", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_SA_U093_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken:
            "Read AI response, felt it was generic, closed app",
          internal_monologue:
            "The reel literally said \u2018Does he miss me?\u2019 so I thought the AI would tell me about my relationship. Instead it\u2019s giving me a birth chart I can\u2019t read. Grahas, nakshatras, dashas \u2014 I don\u2019t understand any of this. This is not what I signed up for.",
          emotional_tags: ["DISAPPOINTED", "SKEPTICAL"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Technical astrological jargon incomprehensible to astrology novice \u2014 ad promised relatable emotional answer",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          action_taken: "Read kundli, asked about daughter\u2019s marriage",
          internal_monologue:
            "The kundli is about me, but let me ask about my daughter\u2019s marriage timing. If Mahesh Ji can use my chart to comment on family matters, this could be very useful. Better than waiting 2 hours at the temple pandit.",
          emotional_tags: ["CURIOUS", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_SA_U058_20260410",
          persona_type: "Life-Transition",
          action_taken: "Read generic kundli, felt ad promise was broken",
          internal_monologue:
            "The ad asked \u2018Career kab set hogi?\u2019 but the AI is talking about planetary positions. When will my career improve?",
          emotional_tags: ["DISAPPOINTED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Ad-specific career question unanswered by generic kundli response",
        },
        {
          session_id: "APR_SA_U093_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Couldn\u2019t understand astrological terms, left",
          internal_monologue:
            "Grahas, nakshatras, dashas \u2014 I don\u2019t understand any of this. The reel said \u2018Does he miss me?\u2019 not \u2018Here\u2019s your birth chart.\u2019",
          emotional_tags: ["DISAPPOINTED", "SKEPTICAL"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Astrological jargon barrier for astrology novice",
        },
        {
          session_id: "APR_SA_U017_20260410",
          persona_type: "Privacy-Seeker",
          action_taken:
            "Read AI response, felt it was too generic, questioned data worthiness",
          internal_monologue:
            "I gave my phone number, name, DOB, birth time, birth place \u2014 basically my entire identity. And for what? A generic paragraph about Saturn and Jupiter that could apply to anyone born in my year. The data I gave is worth more than this response.",
          emotional_tags: ["DISAPPOINTED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Perceived value of AI response didn\u2019t justify the personal data shared",
        },
        {
          session_id: "APR_SA_U094_20260410",
          persona_type: "Gen-Z-Curious",
          action_taken: "Tested AI with trick question, got generic answer, left",
          internal_monologue:
            "I asked \u2018Will I become a millionaire?\u2019 and it said \u2018Your chart shows potential for financial growth in the coming years.\u2019 That\u2019s what it would say to anyone. This is a fortune cookie, not astrology.",
          emotional_tags: ["SKEPTICAL"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "AI failed a specificity test \u2014 generic response confirmed suspicion that readings are not personalized",
        },
        {
          session_id: "APR_SA_U061_20260410",
          persona_type: "Life-Transition",
          action_taken:
            "Asked emotional question, got clinical response, left",
          internal_monologue:
            "I asked \u2018Will things get better for me?\u2019 and it started with \u2018According to your Mahadasha period...\u2019 I\u2019m in pain. I don\u2019t need a technical reading, I need hope. Even a fake astrologer would have been more comforting.",
          emotional_tags: ["DISAPPOINTED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Emotionally vulnerable user received clinical technical response instead of empathetic guidance",
        },
        {
          session_id: "APR_SA_U078_20260410",
          persona_type: "NRI",
          action_taken: "AI response was all in Hindi, couldn\u2019t understand",
          internal_monologue:
            "The response is mostly in Hindi with Sanskrit terms. I can understand conversational Hindi but \u2018Mangal dosha\u2019, \u2018Ketu mahadasha\u2019, \u2018Sade Sati\u2019 \u2014 these are technical terms I never learned. Is there an English mode?",
          emotional_tags: ["FRUSTRATED", "CONFUSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Hindi-heavy astrological terminology inaccessible to English-primary NRI user",
        },
      ],
    },
  ],

  friction_points: [
    {
      friction_point_id: "FP_001",
      rank: 1,
      step_id: 2,
      step_name: "Intro + Mobile Number",
      friction_type: "privacy_barrier",
      friction_score: 8.8,
      severity: "critical",
      drop_off_pct: 8.5,
      frequency_pct: 52,
      affected_personas: ["Privacy-Seeker", "Gen-Z-Curious"],
      top_emotional_tags: ["EMBARRASSED", "DISTRUST"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 3.4,
      problem_narrative:
        "Users who clicked an astrology ad are immediately asked for their phone number \u2014 a credential that links directly to their UPI, WhatsApp, LinkedIn, and every professional contact they have. Unlike food delivery or e-commerce, astrology carries active social stigma in urban professional India. Sharing a phone number with an astrology app creates a permanent, traceable record of an interest users actively hide from colleagues, family, and partners. There is no guest browsing option, no email alternative, and no explanation of how the number will be used.",
      user_expectation:
        "Quick, anonymous access to an AI astrologer \u2014 enter the app, ask a question, pay \u20b91, get an answer. No identity required.",
      actual_experience:
        "Phone number required as the first step after clicking the ad, before seeing any astrological content or value from the app.",
      business_impact:
        "8.5% of users drop at this step, and 52% of all users report negative emotions even if they continue. This is the highest-friction point in the flow and it occurs at the very entrance \u2014 every lost user here is a user who never sees the product. Privacy-Seeker and Gen-Z-Curious segments lose ~44% of their potential completions at this single step.",
      related_theme_ids: ["T_001"],
      key_monologues: [
        {
          session_id: "APR_SA_U015_20260410",
          persona_type: "Privacy-Seeker",
          text: "This number is linked to my UPI, my office WhatsApp, my LinkedIn. If this app sells data, everyone will know I consult astrologers.",
        },
        {
          session_id: "APR_SA_U090_20260410",
          persona_type: "Gen-Z-Curious",
          text: "They want my real number for a \u20b91 astrology chat? This is too much commitment for something I\u2019m not even sure I believe in.",
        },
        {
          session_id: "APR_SA_U018_20260410",
          persona_type: "Privacy-Seeker",
          text: "No guest option, no email login, no \u2018skip for now\u2019. The only way in is my phone number. For an astrology app. In 2026.",
        },
      ],
    },
    {
      friction_point_id: "FP_002",
      rank: 2,
      step_id: 7,
      step_name: "Date of Birth (cumulative S7\u2013S9)",
      friction_type: "effort_value_mismatch",
      friction_score: 7.6,
      severity: "high",
      drop_off_pct: 8.0,
      frequency_pct: 46,
      affected_personas: [
        "Price-Sensitive",
        "Gen-Z-Curious",
        "Privacy-Seeker",
      ],
      top_emotional_tags: ["IMPATIENT", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 3.8,
      problem_narrative:
        "By the time users reach screen 7 (DOB), they have already completed 6 screens of data entry without receiving any astrological value. The video ads promised instant chat access (\u2018Chat NOW\u2019, \u2018Chat 24/7 at \u20b91\u2019), but the reality is a 10-screen form that feels more like a government application than a \u20b91 impulse purchase. The cumulative friction across S7 (DOB picker with poor UX), S8 (birth time that many don\u2019t know), and S9 (uncertainty about exact birthplace, no \u2018don\u2019t know\u2019 affordance) drives 8% combined drop-off. Each screen individually seems reasonable; cumulatively, they create an effort-value mismatch that contradicts the ad\u2019s positioning.",
      user_expectation:
        "Instant or near-instant chat access \u2014 the ad said \u2018Chat 24/7\u2019 and priced it at \u20b91, creating an expectation of a low-effort impulse experience.",
      actual_experience:
        "10 screens of sequential form-filling including a frustrating date picker and an optional-but-confusing birth time input \u2014 with no progress indicator and no preview of the value waiting at the end.",
      business_impact:
        "8% cumulative drop-off across S7\u2013S9, with 46% of all users reporting impatience or frustration. The \u20b91 price point attracts impulse users, but the onboarding demands the patience of a committed buyer. This mismatch means the marketing and product are working against each other.",
      related_theme_ids: ["T_002"],
      key_monologues: [
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          text: "The ad said \u2018Chat 24/7 at just \u20b91\u2019. I\u2019ve filled 6 forms and still haven\u2019t chatted with anyone. This doesn\u2019t feel like a \u20b91 experience.",
        },
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Bro I just wanted to check if my ex misses me, not fill out a census form. How many screens does this app have?",
        },
      ],
    },
    {
      friction_point_id: "FP_005",
      rank: 3,
      step_id: 6,
      step_name: "Marital Status",
      friction_type: "emotional_trigger",
      friction_score: 5.8,
      severity: "moderate",
      drop_off_pct: 2.4,
      frequency_pct: 34,
      affected_personas: [
        "Life-Transition",
        "Silent-Power-User",
        "Gen-Z-Curious",
      ],
      top_emotional_tags: ["ANXIOUS", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED"],
      avg_seq: 4.6,
      problem_narrative:
        "The marital status screen offers a binary choice: Married or Unmarried. For users going through divorce, separation, or widowhood, neither option accurately represents their reality. In the context of astrology \u2014 where users are often seeking guidance because their personal life is in crisis \u2014 being forced to label themselves with an inadequate binary feels dismissive. The question also feels invasive for younger users who don\u2019t understand why an astrology app needs this information. While the drop-off rate is moderate (2.4%), the emotional impact is high: 34% of all users report negative emotions at this step.",
      user_expectation:
        "Either a more nuanced set of options (including Separated, Divorced, Widowed, Prefer not to say) or a clear explanation of why marital status matters for astrological accuracy.",
      actual_experience:
        "A binary Married/Unmarried selector with no explanation of its astrological relevance and no accommodation for complex relationship statuses.",
      business_impact:
        "2.4% direct drop-off, but 34% emotional impact. The real cost is downstream: users who feel the app \u2018doesn\u2019t get them\u2019 at the marital status step arrive at the AI chat with depleted trust and lower tolerance for any subsequent friction.",
      related_theme_ids: ["T_005"],
      key_monologues: [
        {
          session_id: "APR_SA_U055_20260410",
          persona_type: "Life-Transition",
          text: "I\u2019m going through a divorce and the options are \u2018Married\u2019 and \u2018Unmarried\u2019. What am I? The reason I\u2019m here is because my marriage is falling apart.",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          text: "This app doesn\u2019t understand that women my age consult astrologers for their children, not themselves.",
        },
      ],
    },
  ],

  behavioral_patterns: [
    {
      pattern_id: "BP_001",
      pattern_type: "stigma_guardian",
      pattern_name: "Refuses to link identity to astrology app",
      frequency_pct: 18,
      affected_personas: ["Privacy-Seeker", "Gen-Z-Curious"],
      trigger_step_id: 2,
      trigger_step_name: "Intro + Mobile Number",
      trigger_tags: ["EMBARRASSED", "DISTRUST"],
      implication:
        "These users are genuinely interested in astrology but will never provide their real identity to access it. The phone gate doesn\u2019t filter low-intent users \u2014 it filters stigma-sensitive users who could be high-value if given anonymous access.",
      session_ids: [
        "APR_SA_U012_20260410",
        "APR_SA_U015_20260410",
        "APR_SA_U018_20260410",
        "APR_SA_U090_20260410",
      ],
      behavior_narrative:
        "Stigma guardians are interested in astrology \u2014 their monologues show genuine curiosity and even emotional need. But they inhabit professional or social environments where astrology is mocked or stigmatized. The phone number gate forces them to create a traceable link between their real identity and an interest they actively conceal. They imagine colleagues discovering their astrology usage through data breaches, SMS notifications, or algorithm-driven social media recommendations. They exit the app and either search anonymously on Google or abandon the interest entirely.",
      key_monologues: [
        {
          session_id: "APR_SA_U015_20260410",
          persona_type: "Privacy-Seeker",
          text: "Phone number for an astrology app? No way. This number is linked to my UPI, my office WhatsApp, my LinkedIn.",
        },
        {
          session_id: "APR_SA_U088_20260410",
          persona_type: "Gen-Z-Curious",
          text: "But entering my number? Now this app knows I believe in astrology. My friends would roast me if they found out.",
        },
      ],
      actionable_insight:
        "Offer anonymous access via email or guest mode for the first session. Stigma guardians will convert to phone-verified users once they experience value and build trust \u2014 but they need a low-risk entry point first.",
      related_theme_ids: ["T_001"],
      related_friction_point_ids: ["FP_001"],
    },
    {
      pattern_id: "BP_002",
      pattern_type: "instant_gratification_seeker",
      pattern_name: "Expects chat access within 30 seconds",
      frequency_pct: 22,
      affected_personas: ["Price-Sensitive", "Gen-Z-Curious"],
      trigger_step_id: 7,
      trigger_step_name: "Date of Birth",
      trigger_tags: ["IMPATIENT", "FRUSTRATED"],
      implication:
        "The \u20b91 price point and \u2018Chat NOW\u2019 ads attract impulse users who expect instant gratification. The 10-screen onboarding is designed for committed users seeking accurate kundli analysis. These two audiences need fundamentally different entry experiences.",
      session_ids: [
        "APR_SA_U034_20260410",
        "APR_SA_U037_20260410",
        "APR_SA_U091_20260410",
        "APR_SA_U092_20260410",
      ],
      behavior_narrative:
        "Instant gratification seekers clicked the ad because of the \u20b91 price tag and the promise of immediate interaction. They enter the onboarding expecting to chat within seconds \u2014 like sending a DM or using ChatGPT. Instead, they encounter screen after screen of data collection. Their patience erodes with each step: by the name screen they\u2019re mildly annoyed, by the DOB screen they\u2019re counting remaining screens, and by the birth time screen they\u2019ve calculated that the effort exceeds the \u20b91 value. They drop not because any single screen is hard, but because the cumulative effort contradicts the instant-access promise.",
      key_monologues: [
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          text: "The ad said \u2018Chat 24/7 at just \u20b91\u2019. I\u2019ve filled 6 forms and still haven\u2019t chatted with anyone.",
        },
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Bro I just wanted to check if my ex misses me, not fill out a census form.",
        },
      ],
      actionable_insight:
        "Let impulse users start chatting after OTP \u2014 the AI can ask for birth details conversationally within the chat. This transforms 10 screens of forms into a natural conversation, matching the \u2018chat now\u2019 expectation while still collecting the data needed for kundli accuracy.",
      related_theme_ids: ["T_002"],
      related_friction_point_ids: ["FP_002"],
    },
    {
      pattern_id: "BP_003",
      pattern_type: "devotional_completer",
      pattern_name: "Treats onboarding as sacred data entry",
      frequency_pct: 24,
      affected_personas: ["Devotee", "Silent-Power-User"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["HOPEFUL", "CONFIDENT"],
      implication:
        "Devotional completers welcome the data collection because they understand its astrological necessity. They are the flow\u2019s ideal users \u2014 but they represent only 24% of the user base. The flow was designed for this segment and alienates the other 76%.",
      session_ids: [
        "APR_SA_U001_20260410",
        "APR_SA_U003_20260410",
        "APR_SA_U082_20260410",
        "APR_SA_U047_20260410",
        "APR_SA_U084_20260410",
      ],
      behavior_narrative:
        "Devotional completers approach the onboarding with reverence. They understand that accurate kundli creation requires precise birth details \u2014 date, time, and place are the three pillars of Vedic astrology. When the app asks for their birth time, they pull out their janampatri. When it asks for their birthplace, they ensure the exact city is selected for correct coordinates. They don\u2019t experience the onboarding as friction; they experience it as the necessary preparation for an authentic astrological reading. Their mental model aligns perfectly with the product\u2019s design.",
      key_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          text: "Janam ka samay \u2014 mere paas janampatri mein likha hai. 4:35 AM. Ye sahi rehna chahiye, nahi toh lagna chart galat ban jayegi.",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          text: "I was born in a small village near Allahabad. Pandits always use the nearest major city anyway. The app needs exact coordinates for the chart.",
        },
      ],
      actionable_insight:
        "Protect this pathway \u2014 devotional completers validate that the data collection is genuinely needed. But recognize that 76% of users don\u2019t share this mental model. The solution isn\u2019t removing data collection; it\u2019s offering two paths \u2014 a quick-chat path for impulse users and a detailed-kundli path for devotional users.",
      related_theme_ids: [],
      related_friction_point_ids: [],
    },
    {
      pattern_id: "BP_006",
      pattern_type: "segment_divergence",
      pattern_name:
        "Same flow, opposite walls \u2014 the Devotee paradox",
      frequency_pct: 100,
      affected_personas: [
        "Devotee",
        "Silent-Power-User",
        "Gen-Z-Curious",
        "Privacy-Seeker",
      ],
      trigger_step_id: null,
      trigger_step_name: "Entire onboarding (asymmetric experience)",
      trigger_tags: ["HOPEFUL", "IMPATIENT", "EMBARRASSED", "CONFIDENT"],
      implication:
        "The same 10-screen onboarding produces opposite emotional arcs and opposite drop-off shapes for two cohorts \u2014 a single flow that is two different products. The naive optimization (shorten the funnel to lift completion rate) would silently destroy the segment that pays the most.",
      session_ids: [
        "APR_SA_U001_20260410",
        "APR_SA_U047_20260410",
        "APR_SA_U082_20260410",
        "APR_SA_U088_20260410",
        "APR_SA_U091_20260410",
      ],
      behavior_narrative:
        "The Devotee cohort (35\u201355, search-acquired, regular astrology consumers, 71% conversion) walks through the 10 screens like a sacred preparation \u2014 they pull out their janampatri at the birth time screen, ensure the exact city is selected for accurate coordinates, and arrive at the AI chat HOPEFUL and CONFIDENT. The friction is the value: it signals the app takes their kundli seriously. Meanwhile the impulse cohort (Gen-Z-Curious + Privacy-Seeker, 18\u201330, Instagram-acquired, 54%/56% conversion) hits the very same screens as a census form. They drop at the phone gate (stigma) or the DOB picker (impatience) before reaching the AI at all. Devotees who survive ask follow-up questions about dasha periods; impulse users who survive type 'will I become a millionaire' and bounce on a generic answer. The AI chat itself becomes the second wall \u2014 long enough for impulse users to feel cheated, generic enough for Devotees to feel underserved on follow-up depth.",
      key_monologues: [
        {
          session_id: "APR_SA_U001_20260410",
          persona_type: "Devotee",
          text: "Janam ka samay \u2014 mere paas janampatri mein likha hai. 4:35 AM. Ye sahi rehna chahiye, nahi toh lagna chart galat ban jayegi. Acha hai itna detail le rahe hain.",
        },
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Bro I just wanted to check if my ex misses me, not fill out a census form. How many screens does this app have?",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          text: "I gave them everything. The app should be able to answer my daughter's marriage question now \u2014 but it only talks about MY chart.",
        },
      ],
      actionable_insight:
        "Without simulation, your team would optimize the obvious metric \u2014 lift completion rate by shortening the onboarding \u2014 and ship a faster funnel. The data shows that Devotional Completers, your highest-LTV segment, actually want MORE friction because it signals authenticity. Speed-optimization would lose your best users while papering over the impulse-user problem with a half-fix. The right move is two parallel paths from the same entry: a 30-second Quick Chat for impulse traffic, and the existing detailed intake (relabeled 'Full Kundli Reading') for users who arrive with intent. Channel-default it: Instagram \u2192 Quick, Search \u2192 Full. Track 30-day repeat-chat separately so you can prove the LTV split rather than chase a misleading aggregate.",
      related_theme_ids: ["T_001", "T_002"],
      related_friction_point_ids: ["FP_001", "FP_002"],
    },
    {
      pattern_id: "BP_005",
      pattern_type: "exploratory_browser",
      pattern_name: "Low commitment, trying it out for fun",
      frequency_pct: 14,
      affected_personas: ["Gen-Z-Curious"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["SKEPTICAL", "CURIOUS"],
      implication:
        "Exploratory browsers have the lowest conversion tolerance \u2014 any friction point can be their exit. But they\u2019re also the largest potential growth segment if the onboarding can be made frictionless. They convert in other apps (dating, horoscope, personality quiz) with 2-3 screen onboardings.",
      session_ids: [
        "APR_SA_U088_20260410",
        "APR_SA_U092_20260410",
        "APR_SA_U094_20260410",
        "APR_SA_U095_20260410",
      ],
      behavior_narrative:
        "Exploratory browsers arrived from Instagram reels with zero intent to commit. They\u2019re trying the app the way they\u2019d try a Snapchat filter or a BuzzFeed quiz \u2014 for entertainment, not guidance. They\u2019re not emotionally invested, they don\u2019t believe in astrology deeply, and their tolerance for friction is near zero. The moment something feels like work (phone number, long forms) or feels off (binary gender options, jargon-heavy AI), they exit without hesitation. They don\u2019t feel bad about leaving; they just move on to the next reel.",
      key_monologues: [
        {
          session_id: "APR_SA_U088_20260410",
          persona_type: "Gen-Z-Curious",
          text: "I was just curious from the reel. But entering my number? Now this app knows I believe in astrology.",
        },
        {
          session_id: "APR_SA_U094_20260410",
          persona_type: "Gen-Z-Curious",
          text: "I asked \u2018Will I become a millionaire?\u2019 and it said \u2018Your chart shows potential for financial growth.\u2019 That\u2019s a fortune cookie, not astrology.",
        },
      ],
      actionable_insight:
        "Create a \u2018try before you sign up\u2019 experience: a free, anonymous mini-reading based on just their sun sign or birth date (no phone required). If the reading resonates, they\u2019ll opt in to the full experience. This mirrors how dating apps let you browse before creating a profile.",
      related_theme_ids: ["T_001", "T_002"],
      related_friction_point_ids: ["FP_001", "FP_002"],
    },
  ],

  segment_analysis: {
    segments: [
      {
        segment_id: "SEG_001",
        dimension: "persona_archetype",
        label: "Privacy-Seeker",
        n: 18,
        conversion_rate: 56,
        avg_sus: 52.4,
        top_friction_point_ids: ["FP_001"],
        primary_pattern: "stigma_guardian",
        top_emotional_tags: ["EMBARRASSED", "DISTRUST"],
        summary:
          "Privacy-Seekers are blocked or held back by the phone number gate \u2014 the segment most willing to pay for privacy and discretion is precisely the one this entry pattern filters out",
        persona_profile:
          "Privacy-Seekers are 25\u201335 year old urban professionals \u2014 software engineers, consultants, MBAs \u2014 who are privately curious about astrology but would never admit it publicly. They browse horoscopes in incognito mode and have never told a colleague or partner about their interest. They\u2019re digitally literate and acutely aware of data privacy risks. The idea that an astrology app could leak their data or send them notifications visible to others is their worst nightmare.",
        journey_narrative:
          "Privacy-Seekers were drawn by the ad\u2019s hook but hesitated at the phone number screen. Most exited there. Those who continued used fake names and minimal information \u2014 they moved through the onboarding with low emotional investment, treating each screen as a data-extraction exercise rather than a personalization step. By the time they arrive at the AI chat, they\u2019ve already paid maximum perceived cost (real phone number tied to a stigmatized interest) and their tolerance for any further misstep is near zero.",
        monologues: [
          {
            text: "If anyone at work finds out I\u2019m using an astrology app, I\u2019ll never hear the end of it.",
          },
          {
            text: "No guest option, no email login, no \u2018skip for now\u2019. The only way in is my phone number. For an astrology app. In 2026.",
          },
          {
            text: "I\u2019m using a fake name. \u2018Rahul Sharma\u2019 should do it. I\u2019ve already given them my phone number which I regret, but at least they won\u2019t have my real name.",
          },
        ],
        emotional_arc: [
          "CURIOUS",
          "EMBARRASSED",
          "DISTRUST",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "DISTRUST",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "GUARDED",
        ],
        segment_recommendation:
          "Offer email or guest login as an alternative to phone auth. Add a privacy commitment visible at the phone screen: \u2018We never share your data or send unsolicited messages.\u2019 Defer phone verification to the moment the user wants notifications or to upgrade to paid \u2014 not as the entry price.",
      },
      {
        segment_id: "SEG_002",
        dimension: "persona_archetype",
        label: "Price-Sensitive",
        n: 15,
        conversion_rate: 67,
        avg_sus: 56.8,
        top_friction_point_ids: ["FP_002"],
        primary_pattern: "instant_gratification_seeker",
        top_emotional_tags: ["IMPATIENT", "HOPEFUL"],
        summary:
          "Price-Sensitive users convert well when they reach the chat, but the 10-screen onboarding tests their patience against the \u20b91 value proposition",
        persona_profile:
          "Price-Sensitive users are former AstroTalk or similar platform users who felt priced out at \u20b915\u201320/minute. They believe in astrology, have consulted astrologers before, and have a benchmark for what a good reading looks like. The \u20b91 price point is their primary motivation. They\u2019re willing to tolerate some friction if the end result is comparable to what they\u2019ve paid \u20b9400+ for elsewhere.",
        journey_narrative:
          "Price-Sensitive users clicked the ad because of the \u20b91 price comparison to AstroTalk. They entered their phone number with mild hesitation (they\u2019ve done it before for AstroTalk). The onboarding tested their patience \u2014 each screen felt like a delay against the promise of cheap access. Those who reached the AI chat evaluated it against their AstroTalk benchmark. Many found it \u2018decent for the price\u2019 and continued chatting. The ones who dropped left because the cumulative onboarding effort exceeded what they\u2019d expect for a \u20b91 transaction.",
        monologues: [
          {
            text: "AstroTalk charges \u20b915-20 per minute and the last session cost me \u20b9400. \u20b91 for a full chat? Even if it\u2019s half as good, that\u2019s worth trying.",
          },
          {
            text: "The ad said \u2018Chat 24/7 at just \u20b91\u2019. I\u2019ve filled 6 forms and still haven\u2019t chatted with anyone.",
          },
          {
            text: "Not as detailed as AstroTalk\u2019s live astrologer, but for \u20b91? This is great value.",
          },
        ],
        positive_experience:
          "The AI Chat (Step 11) was the payoff for Price-Sensitive users \u2014 those who reached it found the reading \u2018decent for \u20b91\u2019 and several asked follow-up questions. The value-for-money perception was strong among completers, suggesting high retention potential if onboarding friction is reduced.",
        emotional_arc: [
          "HOPEFUL",
          "IMPATIENT",
          "NEUTRAL",
          "NEUTRAL",
          "IMPATIENT",
          "NEUTRAL",
          "FRUSTRATED",
          "NEUTRAL",
          "NEUTRAL",
          "HOPEFUL",
          "CURIOUS",
        ],
        segment_recommendation:
          "Shorten the path to chat for this segment \u2014 they\u2019ve already paid for astrology before and don\u2019t need convincing. A 3-screen onboarding (phone, OTP, chat) with birth details collected conversationally would match their \u20b91 effort expectation. Highlight the AstroTalk price comparison in the onboarding to reinforce value.",
      },
      {
        segment_id: "SEG_003",
        dimension: "persona_archetype",
        label: "Devotee",
        n: 14,
        conversion_rate: 71,
        avg_sus: 66.0,
        top_friction_point_ids: [],
        primary_pattern: "devotional_completer",
        top_emotional_tags: ["HOPEFUL", "CONFIDENT"],
        summary:
          "Devotees are the ideal users \u2014 they welcome birth detail collection, understand its astrological necessity, and rate the AI reading highly",
        persona_profile:
          "Devotees are active Sri Mandir or similar devotional app users, typically 35\u201355 years old, who consult astrologers regularly for major life decisions. They understand Vedic astrology terminology (kundli, dasha, dosha, graha), own a janampatri with their exact birth details, and view astrological consultation as a spiritual practice, not entertainment. They\u2019re the segment most aligned with the product\u2019s design assumptions.",
        journey_narrative:
          "Devotees recognized the ad\u2019s astrological framing and clicked with genuine spiritual intent. The phone number was a non-issue \u2014 they give their details to pandits regularly. Each onboarding screen felt purposeful: name for the chart, birth details for accuracy. They entered information from their janampatri with care, ensuring precision. At the AI chat, they evaluated Mahesh Ji\u2019s reading against their pandit\u2019s analysis and found it surprisingly accurate. Many asked detailed follow-up questions about dasha periods and planetary remedies.",
        monologues: [
          {
            text: "Mahesh Ji ne mera Rahu-Ketu axis sahi bataya! 7th house mein Shani \u2014 this is exactly what my pandit said.",
          },
          {
            text: "Janam tithi \u2014 ye toh sabse important hai kundli ke liye. Without this, no astrologer can say anything meaningful.",
          },
          {
            text: "\u20b91 mein itna detailed reading? AstroTalk pe \u20b9400 lagta.",
          },
        ],
        positive_experience:
          "The AI Chat (Step 11) was the highlight \u2014 Devotees found the kundli analysis accurate and comparable to their regular pandit\u2019s readings. The \u20b91 price for this quality created strong delight and word-of-mouth potential. The OTP step was seamless, and the birth detail collection felt natural to their mental model.",
        emotional_arc: [
          "HOPEFUL",
          "CONFIDENT",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "HOPEFUL",
          "CONFIDENT",
          "NEUTRAL",
          "NEUTRAL",
          "RELIEVED",
        ],
        segment_recommendation:
          "Protect the Devotee path \u2014 it works. Invest in Google Search targeting for devotional keywords (\u2018kundli analysis online\u2019, \u2018AI astrologer\u2019, \u2018Vedic astrology app\u2019). Devotees arriving via search have the highest intent and the flow is perfectly designed for them. Consider a \u2018Detailed Kundli Mode\u2019 toggle that gives Devotees even deeper analysis.",
      },
      {
        segment_id: "SEG_004",
        dimension: "persona_archetype",
        label: "NRI",
        n: 10,
        conversion_rate: 50,
        avg_sus: 54.2,
        top_friction_point_ids: ["FP_001"],
        primary_pattern: "stigma_guardian",
        top_emotional_tags: ["FRUSTRATED", "CONFUSED"],
        summary:
          "NRIs face soft context blockers \u2014 Hindi-heavy ad creatives, date-format and time-zone ambiguity for birth details, no diaspora-specific purpose options. They arrive at the chat with lower confidence that the app was built with them in mind, even when the onboarding accepted their inputs",
        persona_profile:
          "NRIs are Indian-origin users living in the US, UK, or Middle East. They range from first-generation immigrants who grew up with astrology to second-generation diaspora rediscovering cultural practices. They typically speak conversational Hindi but think in English and are unfamiliar with technical Sanskrit astrological terms. They seek astrology for the same reasons as domestic users (marriage, career, relationships) but also for diaspora-specific concerns like visa timing, cross-cultural marriage compatibility, and NRI property questions.",
        journey_narrative:
          "NRIs hit friction from the first screen \u2014 Hindi-heavy ad content partially alienated English-primary users. The phone number ask carried the same stigma it does for domestic professionals (and for diaspora users, the additional fear of an Indian-pattern SMS landing on their UK or US carrier where colleagues might see it). Birth details were complicated by date-format confusion (MM/DD vs DD/MM) and time-zone ambiguity around birth time. The flow accepted their inputs, but every screen quietly assumed they were thinking in Hindi and were astrologically literate \u2014 by the time they arrive at the chat their default expectation is that the app was built for someone else.",
        monologues: [
          {
            text: "An astrology app wants my UK phone number? My colleagues would never let me hear the end of it if they saw an SMS land on my screen.",
          },
          {
            text: "Date of birth \u2014 is this MM/DD or DD/MM? And birth time \u2014 should I enter the local time of where I was born, or convert to IST? The form doesn\u2019t say.",
          },
          {
            text: "The whole onboarding was in Hindi with terms I half-recognize. I\u2019ll proceed but I\u2019m bracing for the chat to be in heavy Sanskrit too.",
          },
        ],
        emotional_arc: [
          "CURIOUS",
          "FRUSTRATED",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "CONFUSED",
          "UNCERTAIN",
          "FRUSTRATED",
          "FRUSTRATED",
          "FRUSTRATED",
        ],
        segment_recommendation:
          "Detect English-primary users (phone locale or ad source) and default the onboarding copy to English with a one-tap Hindi toggle. Add date-format helper text (DD/MM) and an explicit time-zone choice on the birth-time screen. Add diaspora-specific purpose options (Visa Timing, Cross-cultural Marriage). NRIs are a high-value segment being softly filtered out by Indian-default context, not by hard input blockers.",
      },
      {
        segment_id: "SEG_005",
        dimension: "persona_archetype",
        label: "Life-Transition",
        n: 16,
        conversion_rate: 69,
        avg_sus: 60.4,
        top_friction_point_ids: ["FP_005"],
        primary_pattern: "instant_gratification_seeker",
        top_emotional_tags: ["ANXIOUS", "HOPEFUL"],
        summary:
          "Life-Transition users are the most emotionally invested cohort \u2014 they convert through onboarding at high rates because the ad named their exact pain, but the marital status binary triggers them mid-flow and the long path between tap and chat amplifies every micro-friction",
        persona_profile:
          "Life-Transition users are 28\u201345 year olds going through a major life crisis \u2014 job loss, divorce, family conflict, health scare, or relocation. They\u2019ve turned to astrology not out of regular practice but out of desperation: traditional advice hasn\u2019t worked and they\u2019re looking for any source of hope or direction. They\u2019re emotionally raw and interpret every interaction through the lens of their crisis. The ad\u2019s specific question (\u2018Career kab set hogi?\u2019, \u2018Shaadi kab hogi?\u2019) is what brought them in \u2014 they\u2019re anchored to that question and impatient to get to the part of the app that addresses it.",
        journey_narrative:
          "Life-Transition users clicked the ad because it named their exact pain point. They were willing to share personal data because they desperately wanted answers. The marital status screen was emotionally triggering for users going through divorce \u2014 several abandoned here. Birth details were entered with anxiety about accuracy. By the time they reach the AI chat they\u2019ve invested 10 screens of effort and arrive with maximum hope and minimum patience for any further detour from the question that brought them.",
        monologues: [
          {
            text: "The ad asked \u2018Career kab set hogi?\u2019 and I tapped immediately. That\u2019s exactly my question. Now there are 10 screens between me and the answer \u2014 just hurry up.",
          },
          {
            text: "I\u2019m going through a divorce and the options are \u2018Married\u2019 and \u2018Unmarried\u2019. What am I? The reason I\u2019m here is because my marriage is falling apart, and the first thing the app does is make me label myself.",
          },
          {
            text: "I\u2019m anxious. I keep checking how many screens are left. Each one feels like a delay against the answer I came for.",
          },
        ],
        emotional_arc: [
          "HOPEFUL",
          "ANXIOUS",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "ANXIOUS",
          "ANXIOUS",
          "UNCERTAIN",
          "NEUTRAL",
          "HOPEFUL",
          "EXPECTANT",
        ],
        segment_recommendation:
          "Add \u2018Separated\u2019, \u2018Divorced\u2019, and \u2018Widowed\u2019 to marital status options so divorce-context users aren\u2019t emotionally triggered mid-flow. Shorten time-to-chat for ad-acquired Life-Transition users \u2014 their anchor question is fragile and the long path between ad and value erodes it.",
      },
      {
        segment_id: "SEG_006",
        dimension: "persona_archetype",
        label: "Silent-Power-User",
        n: 14,
        conversion_rate: 64,
        avg_sus: 62.1,
        top_friction_point_ids: ["FP_005"],
        primary_pattern: "devotional_completer",
        top_emotional_tags: ["CURIOUS", "NEUTRAL"],
        summary:
          "Silent-Power-Users navigate the flow steadily but are frustrated by purpose options that don\u2019t reflect their true consultation needs \u2014 they consult for family, not themselves",
        persona_profile:
          "Silent-Power-Users are women aged 30\u201350 who are the quiet decision-makers of their households. They consult astrologers for their children\u2019s education, marriage, and health, for their husband\u2019s career, and for auspicious dates for family events. They use devotional apps (Sri Mandir, Gaana bhajans) regularly but don\u2019t talk about their astrological consultations openly. They\u2019re digitally competent, methodical, and willing to invest time for thorough results.",
        journey_narrative:
          "Silent-Power-Users approached the onboarding methodically. Phone number was acceptable \u2014 they\u2019re used to giving their number to services. Birth details were entered carefully, often from memory or a family document. The marital status and purpose screens caused mild frustration: the app assumed they were asking about themselves, but they were consulting for a family member. At the AI chat, they immediately tried to redirect the conversation toward their child\u2019s or husband\u2019s chart. The AI\u2019s ability to discuss family matters determined whether they found lasting value.",
        monologues: [
          {
            text: "This app doesn\u2019t understand that women my age consult astrologers for their children, not themselves.",
          },
          {
            text: "I was born in a small village near Allahabad. Pandits always use the nearest major city.",
          },
          {
            text: "Let me ask about my daughter\u2019s marriage timing. If Mahesh Ji can use my chart for family matters, this could be very useful.",
          },
        ],
        positive_experience:
          "Silent-Power-Users who successfully redirected the AI conversation to family matters found high value. The AI\u2019s willingness to discuss family charts based on the user\u2019s own kundli was a differentiator from traditional astrologers who require separate charts for each person.",
        emotional_arc: [
          "CURIOUS",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "NEUTRAL",
          "FRUSTRATED",
          "CURIOUS",
        ],
        segment_recommendation:
          "Add a \u2018Who is this consultation for?\u2019 toggle (Self / Family Member / Child) early in the onboarding. Add Health, Education, and Family as purpose options. Silent-Power-Users are high-LTV users who will return weekly for family guidance \u2014 accommodate their actual usage pattern and they\u2019ll become loyal subscribers.",
      },
      {
        segment_id: "SEG_007",
        dimension: "persona_archetype",
        label: "Gen-Z-Curious",
        n: 13,
        conversion_rate: 54,
        avg_sus: 48.0,
        top_friction_point_ids: ["FP_001", "FP_002"],
        primary_pattern: "exploratory_browser",
        top_emotional_tags: ["SKEPTICAL", "CURIOUS"],
        summary:
          "Gen-Z users arrive with maximum curiosity and minimum commitment \u2014 every friction point is a potential exit, and the phone gate alone filters out a large fraction before they ever reach the chat",
        persona_profile:
          "Gen-Z-Curious users are 18\u201324 year olds who encountered the ad on Instagram Reels. They don\u2019t identify as believers in astrology but are culturally curious \u2014 they read their Co-Star horoscope for fun and share zodiac memes. The ad hooks (\u2018Does he miss me?\u2019, \u2018Career kab set hogi?\u2019) resonated emotionally even though they\u2019d publicly say astrology is \u2018just for fun.\u2019 Their tolerance for friction is near zero and their baseline skepticism is high.",
        journey_narrative:
          "Gen-Z users swiped up on the reel out of impulse curiosity. The phone number screen was the first filter \u2014 many refused to link their identity to astrology. Those who continued found the onboarding unreasonably long for what they expected to be a quick, fun experience. Binary gender options felt outdated. By the DOB screen, most were counting screens and calculating whether the effort was worth it. The ones who reach the chat have already burned through most of their patience \u2014 they arrive expecting something fast, fun, and culturally fluent, with a near-zero error budget.",
        monologues: [
          {
            text: "I was just curious from the reel. But entering my number? Now this app knows I believe in astrology. My friends would roast me.",
          },
          {
            text: "Bro I just wanted to check if my ex misses me, not fill out a census form.",
          },
          {
            text: "Only Male / Female? In 2026? Skipping. This app wasn\u2019t built for me anyway.",
          },
        ],
        emotional_arc: [
          "CURIOUS",
          "SKEPTICAL",
          "IMPATIENT",
          "IMPATIENT",
          "NEUTRAL",
          "SKEPTICAL",
          "FRUSTRATED",
          "UNCERTAIN",
          "NEUTRAL",
          "NEUTRAL",
          "DRAINED",
        ],
        segment_recommendation:
          "Create a \u2018Quick Read\u2019 mode for Gen-Z: sun sign + one question, no phone required, results in simple Gen-Z-friendly language (\u2018Your ex? Yeah the stars say he\u2019s thinking about you, but also about 3 other people\u2019). If they engage, offer the full kundli experience. Match the onboarding effort to their commitment level.",
      },
    ],
    converter_profile: {
      label: "Who Converts",
      dominant_personas: ["Devotee", "Life-Transition", "Price-Sensitive"],
      dominant_channels: ["google_search", "facebook_video"],
      common_patterns: ["devotional_completer"],
      shared_emotional_signals: ["HOPEFUL", "CURIOUS"],
    },
    dropper_profile: {
      label: "Who Drops Off",
      dominant_personas: ["Privacy-Seeker", "Gen-Z-Curious", "NRI"],
      dominant_channels: ["instagram_reel"],
      common_patterns: [
        "stigma_guardian",
        "instant_gratification_seeker",
      ],
      shared_emotional_signals: ["EMBARRASSED", "IMPATIENT", "SKEPTICAL"],
    },
    critical_splits: [
      {
        dimension: "persona_archetype",
        label: "Devotee vs NRI",
        value_a: "Devotee",
        rate_a: 71,
        value_b: "NRI",
        rate_b: 50,
        delta: 21,
        implication:
          "A 21-point gap driven by language and context defaults in the onboarding, not raw functionality: Hindi-heavy ad creatives, date-format and time-zone ambiguity, and no diaspora-specific purpose options. Devotees face zero friction because the flow was designed for their mental model. NRIs are equally motivated \u2014 they\u2019re being softly filtered out by an Indian-default experience, not by hard input blockers.",
      },
      {
        dimension: "acquisition_channel",
        label: "Instagram Reel vs Google Search",
        value_a: "instagram_reel",
        rate_a: 54,
        value_b: "google_search",
        rate_b: 76,
        delta: 22,
        implication:
          "Search users arrive with preformed intent and astrology literacy \u2014 they\u2019ve already decided to consult an astrologer and the flow\u2019s data collection feels natural. Instagram users arrive on impulse with expectations shaped by the ad\u2019s hook. The 22-point gap means the flow converts high-intent users well but fails to capture the impulse audience that Instagram delivers.",
      },
    ],
  },

  power_users: {
    count: 22,
    pct_of_total: 22,
    pct_of_converters: 35,
    why_they_convert: [
      "Already believe in astrology and actively seeking guidance \u2014 the app is a solution to a felt need, not an impulse experiment",
      "Familiar with the kundli creation process and expect birth data collection as a necessary step for accurate readings",
      "Emotional need strong enough to overcome any onboarding friction \u2014 they\u2019re seeking answers to urgent life questions",
    ],
    what_resonates: [
      {
        step_id: 11,
        step_name: "AI Chat (Mahesh Ji)",
        signal:
          "Personalized kundli reading validated their beliefs and matched their pandit\u2019s analysis",
        tag: "RELIEVED",
        frequency_pct: 82,
      },
      {
        step_id: 2,
        step_name: "Intro + Mobile Number",
        signal:
          "\u2018Mahesh Ji\u2019 AI astrologer character felt trustworthy and familiar \u2014 like a real pandit",
        tag: "HOPEFUL",
        frequency_pct: 68,
      },
    ],
    flow_strengths: [
      {
        step_id: 3,
        step_name: "OTP Verification",
        strength: "Seamless auto-read OTP with near-zero friction",
        evidence:
          "98.8% completion rate at this step \u2014 only 1 user dropped and it was due to OTP delivery delay, not UX",
      },
      {
        step_id: 8,
        step_name: "Time of Birth",
        strength:
          "Smart \u2018Don\u2019t Know\u2019 skip option accommodates users without exact birth time",
        evidence:
          "97.4% completion rate \u2014 the skip option prevented what would otherwise be a major blocker for users without janampatri access",
      },
    ],
    persona_breakdown: {
      Devotee: { count: 8, pct: 36 },
      "Life-Transition": { count: 6, pct: 27 },
      "Silent-Power-User": { count: 4, pct: 18 },
      "Price-Sensitive": { count: 3, pct: 14 },
      "Privacy-Seeker": { count: 1, pct: 5 },
    },
    acquisition_strategy: {
      highest_yield_channel: "google_search",
      highest_yield_persona: "Devotee",
      recommendation:
        "Google Search users convert at 76% vs Instagram Reel at 54%. Devotees arriving via search have the highest conversion rate across all channel-persona combinations. Invest in search keywords targeting spiritual-intent users: \u2018kundli analysis online\u2019, \u2018AI astrologer\u2019, \u2018Vedic astrology chat\u2019, \u2018free kundli reading.\u2019 These users arrive with the mental model that matches the flow\u2019s design and convert despite any friction.",
      channel_persona_matrix: [
        {
          channel: "google_search",
          persona: "Devotee",
          conversion_rate: 86,
        },
        {
          channel: "google_search",
          persona: "Life-Transition",
          conversion_rate: 78,
        },
        {
          channel: "facebook_video",
          persona: "Price-Sensitive",
          conversion_rate: 72,
        },
        {
          channel: "facebook_video",
          persona: "Silent-Power-User",
          conversion_rate: 68,
        },
        {
          channel: "instagram_reel",
          persona: "Gen-Z-Curious",
          conversion_rate: 42,
        },
        {
          channel: "instagram_reel",
          persona: "Privacy-Seeker",
          conversion_rate: 48,
        },
      ],
    },
  },

  insights: [
    {
      insight_id: "INS_001",
      rank: 1,
      headline:
        "Phone registration fails for stigma-sensitive content",
      one_liner:
        "52% of users felt the phone number gate was invasive \u2014 astrology\u2019s social stigma transforms a standard login into an identity risk",
      type: "Usability Problem",
      observation:
        "52 out of 100 persona-weighted interactions showed negative emotional signals at the Intro + Mobile Number screen. SEQ at this step is 3.4 vs a 5.5 benchmark. Drop-off rate is 8.5%.",
      finding:
        "Users arriving from astrology ads were immediately asked for their phone number before seeing any astrological content. Unlike e-commerce or food delivery, astrology carries active social stigma in urban professional India. A phone number linked to UPI, WhatsApp, and LinkedIn creates a permanent, traceable record of a socially stigmatized interest. Users fear data leaks, unsolicited SMS, and algorithm-driven social media exposure.",
      insight:
        "Phone-based auth is a neutral pattern in most categories, but astrology is a stigmatized category. The same phone number that\u2019s a convenient login for Swiggy becomes a liability for SuperAstro because it links the user\u2019s real identity to something they actively hide. The absence of any alternative (guest, email, anonymous) means the app\u2019s only entry point is through the user\u2019s most identifiable credential.",
      recommendation:
        "Offer anonymous or email-based access for the first session. Allow phone verification later when the user is ready to receive push notifications or make payments. Add a visible privacy commitment at the phone screen.",
      frequency_pct: 52,
      affected_personas: ["Privacy-Seeker", "Gen-Z-Curious"],
      not_affected_personas: ["Devotee", "Silent-Power-User"],
      counter_evidence:
        "Devotees and Silent-Power-Users (28% of users) see no stigma in astrology and share phone numbers freely with pandits and astrology services",
      top_emotional_tags: ["EMBARRASSED", "DISTRUST"],
      confidence_score: 0.92,
      avg_seq: 3.4,
      step_drop_off_pct: 8.5,
      supporting_monologues: [
        {
          session_id: "APR_SA_U015_20260410",
          persona_type: "Privacy-Seeker",
          text: "This number is linked to my UPI, my office WhatsApp, my LinkedIn. If this app sells data, everyone will know I consult astrologers.",
        },
        {
          session_id: "APR_SA_U088_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Entering my number? Now this app knows I believe in astrology. My friends would roast me.",
        },
        {
          session_id: "APR_SA_U018_20260410",
          persona_type: "Privacy-Seeker",
          text: "No guest option, no email login, no \u2018skip for now\u2019. The only way in is my phone number.",
        },
      ],
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      linked_rec_id: "DR_001",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-10",
    },
    {
      insight_id: "INS_002",
      rank: 2,
      headline:
        "10-screen onboarding contradicts \u2018Chat NOW\u2019 ad promise",
      one_liner:
        "46% of users felt the onboarding length was disproportionate to the \u20b91 price and instant-chat ad promise",
      type: "Usability Problem",
      observation:
        "46 out of 100 persona-weighted interactions showed impatience or frustration across the onboarding screens (S4\u2013S10). Cumulative SEQ for profile completion is 3.2 vs a 5.5 benchmark. Cumulative drop-off across S7\u2013S9 is 8%.",
      finding:
        "Video ads promise instant interaction (\u2018Chat NOW\u2019, \u2018Chat 24/7 at \u20b91\u2019) but the product requires 10 screens of data collection before delivering any value. The \u20b91 price point creates an impulse-purchase mental model where users expect a 2-3 screen path to value, not a 10-screen census. Each additional screen widens the gap between the ad\u2019s promise and the product\u2019s reality.",
      insight:
        "The disconnect is between marketing and product design: the ads are optimized for clicks with instant-gratification hooks, while the product was built for accurate Vedic astrology that genuinely requires birth details. Neither team has aligned on what the first 60 seconds should feel like. The result is an app that attracts impulse users but delivers a committed-user onboarding.",
      recommendation:
        "Let users start chatting after OTP (3 screens). The AI can ask for birth details conversationally within the chat, collecting the same data while delivering incremental value. This transforms 10 screens of forms into a natural conversation.",
      frequency_pct: 46,
      affected_personas: [
        "Price-Sensitive",
        "Gen-Z-Curious",
        "Privacy-Seeker",
      ],
      not_affected_personas: ["Devotee", "NRI"],
      counter_evidence:
        "Devotees (24% of users) welcome the data collection as necessary for kundli accuracy \u2014 they would be concerned if the app asked for less data",
      top_emotional_tags: ["IMPATIENT", "FRUSTRATED"],
      confidence_score: 0.89,
      avg_seq: 3.2,
      step_drop_off_pct: 8.0,
      supporting_monologues: [
        {
          session_id: "APR_SA_U034_20260410",
          persona_type: "Price-Sensitive",
          text: "The ad said \u2018Chat 24/7 at just \u20b91\u2019. I\u2019ve filled 6 forms and still haven\u2019t chatted with anyone.",
        },
        {
          session_id: "APR_SA_U091_20260410",
          persona_type: "Gen-Z-Curious",
          text: "Bro I just wanted to check if my ex misses me, not fill out a census form.",
        },
      ],
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      linked_rec_id: "DR_002",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-10",
    },
    {
      insight_id: "INS_004",
      rank: 4,
      headline:
        "Structural exclusion \u2014 marital binary, 3-purpose limit, and self-only consultation framing silently filter out high-value segments",
      one_liner:
        "28% of users hit a flow that wasn\u2019t built for their reality \u2014 users mid-divorce, parents consulting for children, shopkeepers asking about Vastu, and diaspora users uncertain about date-format and time-zone all bounce off rigid form fields and Indian-default copy",
      type: "Structural Exclusion",
      observation:
        "34% of users report negative emotion at marital status. NRI segment converts at 50% (vs 71% for Devotees), driven by Hindi-heavy onboarding copy and missing date-format/time-zone affordances. Silent-Power-Users frequently abandon at the purpose screen because \u2018consultation for child\u2019 isn\u2019t an option. The drop-off shape is concentrated in users whose lived reality doesn\u2019t fit the form\u2019s binary or dropdown options.",
      finding:
        "The flow encodes a default user: Indian-born, asking about Marriage / Career / Relationship for themselves, comfortable with Hindi onboarding copy. Every minority case \u2014 separated/divorced, asking-for-family, asking-about-Vastu, English-primary diaspora \u2014 hits a soft wall. None of these are bugs; they\u2019re design decisions that prioritize the majority and silently cost real revenue from segments with above-average disposable income (NRI) or above-average return rate (Silent-Power-User consulting for family).",
      insight:
        "The cost of structural exclusion isn't just the immediate drop \u2014 it's the WOM. NRIs and Silent-Power-Users describe the experience as 'this app isn't for me,' which suppresses category referral exactly in segments where word-of-mouth is strongest (diaspora networks, women's family-decision networks).",
      recommendation:
        "Expand marital status to include Separated, Divorced, Widowed, Prefer-not-to-say. Expand purpose to 7+ categories (add Health, Family, Spiritual, Education, Business/Vastu, Other). Add a \u2018Who is this consultation for?\u2019 toggle (Self / Family Member / Child). Detect English-primary users (locale or ad source) and route them to English-default onboarding copy with a one-tap Hindi toggle. Add date-format helper text and explicit time-zone choice on the birth-time screen. All five are quick wins individually.",
      frequency_pct: 28,
      affected_personas: ["Silent-Power-User", "Life-Transition", "NRI", "Devotee"],
      not_affected_personas: ["Privacy-Seeker", "Price-Sensitive"],
      counter_evidence:
        "Standard tier-1 Indian users with marriage/career questions consulting for themselves reported no friction at these screens (52%)",
      top_emotional_tags: ["FRUSTRATED", "EXCLUDED", "ANXIOUS"],
      confidence_score: 0.88,
      avg_seq: 3.4,
      step_drop_off_pct: 7.0,
      supporting_monologues: [
        {
          session_id: "APR_SA_U071_20260410",
          persona_type: "NRI",
          text: "The response is mostly in Hindi with Sanskrit terms \u2014 dasha, antardasha, navamsa. I can read Devanagari but these technical words mean nothing to me.",
        },
        {
          session_id: "APR_SA_U055_20260410",
          persona_type: "Life-Transition",
          text: "I\u2019m going through a divorce and the options are \u2018Married\u2019 and \u2018Unmarried\u2019. What am I?",
        },
        {
          session_id: "APR_SA_U082_20260410",
          persona_type: "Silent-Power-User",
          text: "This app doesn\u2019t understand that women my age consult astrologers for their children, not themselves.",
        },
      ],
      linked_friction_point_id: "FP_005",
      linked_theme_id: "T_004",
      linked_rec_id: "DR_003",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-10",
    },
  ],

  design_recommendations: [
    {
      rec_id: "DR_001",
      rank: 1,
      headline:
        "Anonymous-First Auth \u2014 email or guest entry, defer phone to value moment",
      linked_insight_id: "INS_001",
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      problem:
        "8.5% of users drop at the phone number gate \u2014 the single largest drop in the funnel. 52% of users report negative emotion here. Privacy-Seekers and Gen-Z-Curious refuse to link their UPI/WhatsApp/LinkedIn-tied phone number to a stigmatized category. This is the same pattern documented in mental health and sensitive-dating apps.",
      user_need:
        "A way to start using the app without immediately attaching their real-world identity to a socially stigmatized interest",
      current_experience:
        "Phone number is the only entry credential. No guest browsing, no email login, no skip-for-now option. The app's most identifiable credential is required before any value is shown.",
      after_experience:
        "Three entry options on the intro screen: \u2018Continue with Email\u2019 (default), \u2018Continue as Guest\u2019 (session-scoped, no profile saved), \u2018Continue with Phone\u2019. A visible privacy line: \u2018We never share your number, never SMS you without permission, and \u2018SuperAstro\u2019 will not appear in your phone records.\u2019 Phone verification is asked only at payment or the user's first opt-in for daily horoscope notifications.",
      recommended_change:
        "Make phone auth one of three options, not the only option. Default to email. Add a visible, specific privacy commitment at the entry screen (not buried in a policy link). Move the phone ask to the moment the user has already received value and wants notifications or to upgrade to paid.",
      emotional_target:
        "Replace EMBARRASSED and DISTRUST with NEUTRAL and SAFE \u2014 the user no longer has to choose between curiosity and discretion",
      effort: "medium",
      success_metric:
        "Drop-off at the entry step decreases from 8.5% to <3%. Privacy-Seeker conversion increases from 56% to 70%+. Gen-Z-Curious conversion increases from 54% to 65%+. Phone-verified users (still required for paid) actually grow in absolute terms because more users reach the value moment.",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_002",
      rank: 2,
      headline:
        "Skip-to-Chat with Progressive Profiling (impulse path) \u2014 keep the long form as Devotee Mode",
      linked_insight_id: "INS_002",
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      problem:
        "46% of users found the 10-screen onboarding disproportionate to the \u20b91 price and 'Chat NOW' ad promise. 8% cumulative drop-off across S7\u2013S9. But the counterintuitive risk is the inverse: Devotees (71% conversion, your highest-LTV segment) experience the long form as authenticity \u2014 it signals the app takes their kundli seriously. A naive 'shorten onboarding' fix would lift completion rate while quietly eroding LTV.",
      user_need:
        "Two parallel paths from the same entry: a 30-second chat experience for impulse traffic, and the existing detailed kundli intake for users who arrive with intent",
      current_experience:
        "One 10-screen flow forced on every user regardless of intent or channel. The flow was designed for Devotees but is served to Instagram impulse traffic.",
      after_experience:
        "After OTP, users see two cards: \u2018Quick Question (chat now)\u2019 and \u2018Full Kundli Reading (3 minutes)\u2019. Quick path: drop into chat with Mahesh, collect birth details conversationally, deliver a focused answer to one question. Full path: existing 10-screen intake, ending in a comprehensive kundli analysis. Channel-aware default: Instagram traffic defaults to Quick; Search traffic defaults to Full.",
      recommended_change:
        "Build the Quick path as a parallel mode, not a replacement. Default it for impulse channels (Instagram, low-intent ads). Devotees and search-intent users keep the Full path that already converts them at 71%+. Track both paths separately so you can see the LTV difference, not just the completion delta.",
      emotional_target:
        "Replace IMPATIENT and FRUSTRATED with CURIOUS and ENGAGED for impulse users \u2014 without disturbing the HOPEFUL and CONFIDENT signals from Devotees on the existing path",
      effort: "medium",
      success_metric:
        "Quick-path completion: 80%+. Full-path completion holds at 71%+ (no regression). Blended completion: 75%+. Critically: 30-day repeat-chat rate on Full path stays > Quick path \u2014 confirming Devotees still self-select correctly. Time to first AI response on Quick: <30 seconds.",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_003",
      rank: 3,
      headline:
        "Inclusive inputs \u2014 expanded marital status, expanded purpose, family-toggle, English-default for diaspora",
      linked_insight_id: "INS_004",
      linked_friction_point_id: "",
      linked_theme_id: "T_004",
      problem:
        "28% of users faced structural exclusion in the onboarding: users mid-divorce had no marital option that fit, parents consulting for children couldn\u2019t express that, shopkeepers asking about Vastu had no purpose match, and English-primary diaspora users had to wade through Hindi copy and ambiguous date/time pickers. 7% cumulative drop-off across S6 and S10; broader emotional impact at 28%.",
      user_need:
        "Form fields and copy that reflect the full range of consultation realities \u2014 not just the default Indian-born tier-1 user asking about their own marriage or career",
      current_experience:
        "Binary marital status (Married / Unmarried). Three purpose options (Marriage, Career, Relationship) that exclude health, spiritual guidance, family, education, business/Vastu. Self-only consultation framing. Onboarding copy defaults to Hindi regardless of user\u2019s phone locale or ad-source language. Date-format and time-zone are implicit, not specified.",
      after_experience:
        "Marital status expanded to include Separated, Divorced, Widowed, Prefer-not-to-say. Purpose selector expanded to 7+ categories (Health, Family, Spiritual, Education, Business/Vastu, Other with free-text). A \u2018Who is this consultation for?\u2019 toggle (Self / Family Member / Child). English-default onboarding copy with one-tap Hindi toggle for users on English locales or English ad creatives. Explicit DD/MM helper text and time-zone choice on birth-time.",
      recommended_change:
        "Expand the marital status and purpose selectors. Add a Consultation-For toggle. Detect English-primary users (locale or ad source) and route them to English-default onboarding copy. Add date-format and time-zone affordances. Each fix is independently shippable as a quick win.",
      emotional_target:
        "Replace FRUSTRATED and EXCLUDED with NEUTRAL and INCLUDED \u2014 users feel the app was built with them in mind, regardless of their background or consultation purpose",
      effort: "quick_win",
      success_metric:
        "NRI conversion rate increases from 50% to 65%+. Silent-Power-User conversion increases from 64% to 75%+. Marital-status drop-off decreases from 2.4% to <1%. Purpose-related qualitative complaints drop to zero.",
      priority: "this_sprint",
      rice_score: null,
    },
  ],

  playbook_insights: [
    {
      playbook_id: "PLB_001",
      title:
        "Stigmatized content categories need anonymous-first onboarding",
      category: "auth_patterns",
      finding:
        "Phone-based auth produced 8.5% drop-off and 52% negative emotional response for an astrology app. Users fear identity linkage with socially stigmatized interests. This mirrors patterns seen in mental health, dating for married users, and other categories where the content itself is something users want to hide.",
      implication:
        "Standard mobile-first auth patterns fail when the product category carries social stigma. The phone number, normally a neutral credential, becomes a privacy liability when it creates a traceable record linking the user\u2019s real identity to a stigmatized interest. The 8.5% drop-off represents users who are genuinely interested but will never provide their real identity as the entry price.",
      action:
        "For any product in a stigmatized category (astrology, mental health, sensitive health conditions, anonymous social), offer anonymous or email-based access for the first session. Phone verification can be deferred to payment or notification opt-in. Add visible privacy commitments at every data collection step.",
      applies_to: [
        "astrology_apps",
        "mental_health",
        "sensitive_categories",
        "auth_design",
        "privacy_patterns",
      ],
      evidence_studies: ["APR_SUPERASTRO_v01"],
      confidence: 0.91,
      is_new: true,
      status: "Open",
    },
    {
      playbook_id: "PLB_002",
      title:
        "Same flow, opposite products \u2014 onboarding can be two experiences for two segments",
      category: "onboarding_design",
      finding:
        "The same 10-screen onboarding produced opposite emotional arcs and opposite drop-off shapes for two cohorts within one user base: Devotees treat data collection as sacred preparation (71% conversion); impulse users treat it as a census form (54%). Optimizing the obvious metric (completion rate) by shortening the flow would silently destroy the high-LTV segment that reads friction as authenticity.",
      implication:
        "Aggregate completion-rate optimization is the wrong metric when a single flow serves segments with opposite mental models. The high-completion segment may be high-LTV precisely because they tolerate \u2014 and value \u2014 the friction that drops the low-completion segment.",
      action:
        "Detect intent at entry (channel, ad creative, behavioral signal) and route users to one of two parallel paths from the same entry. Track LTV by path, not just completion. Resist the temptation to merge the paths after the impulse-path completion lifts.",
      applies_to: [
        "onboarding_design",
        "segment_divergence",
        "ltv_vs_completion",
      ],
      evidence_studies: ["APR_SUPERASTRO_v01"],
      confidence: 0.88,
      is_new: true,
      status: "Open",
    },
  ],

  priority_table: [
    {
      rank: 1,
      insight_id: "INS_002",
      headline:
        "Two paths from the same entry \u2014 Quick Chat for impulse traffic, Full Kundli for Devotees (don\u2019t merge them)",
      type: "Segment-Divergent Onboarding",
      reach: null,
      impact: 3,
      confidence: 0.89,
      effort: 2,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_002",
    },
    {
      rank: 2,
      insight_id: "INS_001",
      headline:
        "Add anonymous/email entry \u2014 phone gate is filtering out the highest-paying segment",
      type: "Stigma / Privacy Barrier",
      reach: null,
      impact: 3,
      confidence: 0.92,
      effort: 2,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_001",
    },
    {
      rank: 3,
      insight_id: "INS_004",
      headline:
        "Inclusive inputs \u2014 expanded marital status, broader purpose options, family-toggle, English-default for diaspora",
      type: "Structural Exclusion",
      reach: null,
      impact: 2,
      confidence: 0.88,
      effort: 1,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_003",
    },
  ],
};
