import type { StudyData } from "@/types/study";

/**
 * HexaHealth Piles Laser Treatment Flow Simulation — study-format data.
 * 50 personas from Mumbai and Delhi navigating the ad-to-consultation booking flow.
 */
export const hexahealthStudyData: StudyData = {
  study: {
    study_id: "APR_HEXAHEALTH_v01",
    study_name: "HexaHealth Piles Treatment Flow Simulation",
    flow_name:
      "Ad → Login → Home → Conditions → Piles Detail → Doctor Form → Describe Condition → Submit",
    flow_version: "v01",
    date_run: "2026-04-09",
    total_users: 50,
    completed_users: 27,
    dropped_users: 23,
    failed_users: 0,
    completion_rate: 54,
    acquisition_channels: ["facebook_ad", "instagram_ad", "google_search"],
    personas_used: ["Pragmatist", "Skeptic", "Enthusiast", "Confused Novice"],
    persona_distribution: {
      Pragmatist: 15,
      Skeptic: 12,
      Enthusiast: 10,
      "Confused Novice": 13,
    },
    analysis_status: "complete",
  },

  executive_summary: {
    completion_rate: 54,
    sus_score: 52.8,
    sus_grade: "F",
    sus_label: "Not Acceptable",
    avg_seq: 3.2,
    critical_drop_point: "Doctor Consultation Form",
    critical_drop_pct: 13.9,
    top_findings: [
      {
        rank: 1,
        finding:
          "72% of users felt uncomfortable sharing personal details for an embarrassing health condition before any doctor interaction",
      },
      {
        rank: 2,
        finding:
          "54% refused or hesitated at the mobile login wall, piles patients are extra privacy-conscious about health data",
      },
      {
        rank: 3,
        finding:
          "Users arriving from a piles-specific ad must navigate 2 generic screens (Home + Conditions) before reaching relevant content",
      },
    ],
    top_recommendation: {
      headline:
        "Allow guest browsing and replace open symptom text with structured checklist",
      linked_rec_id: "DR_001",
      effort: "medium",
      routing: "this_sprint",
    },
    open_insights_count: 5,
    this_sprint_count: 3,
    next_sprint_count: 1,
    backlog_count: 1,
  },

  scores: {
    completion_rate: {
      overall: 54,
      ci_lower: 40.1,
      ci_upper: 67.4,
      by_persona: {
        Pragmatist: 67,
        Skeptic: 42,
        Enthusiast: 80,
        "Confused Novice": 31,
      },
    },
    sus: {
      mean: 52.8,
      grade: "F",
      label: "Not Acceptable",
      benchmark: 68,
      delta_from_benchmark: -15.2,
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
      distribution: { F: 34, D: 26, C: 22, B: 14, A: 4, "A+": 0 },
      by_persona: {
        Pragmatist: 58.4,
        Skeptic: 48.2,
        Enthusiast: 68.6,
        "Confused Novice": 36.1,
      },
    },
    seq_by_task: {
      ad_to_login: {
        avg: 4.8,
        benchmark: 5.5,
        delta: -0.7,
        flag: "needs_improvement",
        by_persona: {
          Pragmatist: 5.2,
          Skeptic: 4.1,
          Enthusiast: 6.3,
          "Confused Novice": 3.6,
        },
      },
      navigation_to_piles: {
        avg: 3.4,
        benchmark: 5.5,
        delta: -2.1,
        flag: "very_difficult",
        by_persona: {
          Pragmatist: 4.1,
          Skeptic: 3.0,
          Enthusiast: 4.8,
          "Confused Novice": 1.9,
        },
      },
      booking_consultation: {
        avg: 2.8,
        benchmark: 5.5,
        delta: -2.7,
        flag: "very_difficult",
        by_persona: {
          Pragmatist: 3.5,
          Skeptic: 2.4,
          Enthusiast: 4.2,
          "Confused Novice": 1.3,
        },
      },
    },
  },

  emotional_fingerprint: {
    top_positive_tags: [
      { tag: "HOPEFUL", frequency_pct: 38 },
      { tag: "RELIEVED", frequency_pct: 22 },
      { tag: "CONFIDENT", frequency_pct: 16 },
    ],
    top_negative_tags: [
      { tag: "EMBARRASSED", frequency_pct: 68 },
      { tag: "ANXIOUS", frequency_pct: 62 },
      { tag: "DISTRUST", frequency_pct: 48 },
      { tag: "OVERWHELMED", frequency_pct: 34 },
      { tag: "FRUSTRATED", frequency_pct: 28 },
    ],
    overall_sentiment: "negative",
    sentiment_score: -0.42,
    most_emotional_step: "Describe Health Condition",
    smoothest_step: "Piles Detail Page",
    by_persona: {
      Pragmatist: { dominant_tag: "HOPEFUL", sentiment: "neutral" },
      Skeptic: { dominant_tag: "DISTRUST", sentiment: "negative" },
      Enthusiast: { dominant_tag: "CONFIDENT", sentiment: "positive" },
      "Confused Novice": { dominant_tag: "OVERWHELMED", sentiment: "negative" },
    },
  },

  themes: [
    {
      theme_id: "T_001",
      rank: 1,
      theme_name:
        "Health condition embarrassment amplifies every friction point",
      description:
        "Users dealing with piles already feel uncomfortable, every data collection step (phone, name, symptoms) compounds this anxiety. The flow doesn't acknowledge the sensitive nature of the condition.",
      frequency_pct: 72,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      supporting_codes: [
        { code_name: "Embarrassment_Amplified_Friction", frequency_pct: 72 },
        { code_name: "Sensitive_Condition_No_Acknowledgement", frequency_pct: 58 },
      ],
      key_monologues: [
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          text: "I already feel weird looking this up on my phone. Now they want my full name and date of birth? For piles? No thanks.",
        },
        {
          session_id: "APR_HEXA_U037_20260409",
          persona_type: "Confused Novice",
          text: "What if someone at HexaHealth sees my information and knows I have this problem? I don't even tell my family about this.",
        },
      ],
      counter_evidence: {
        summary:
          "Enthusiasts who had already discussed their condition with family or friends were less affected by embarrassment friction",
        frequency_pct: 18,
      },
      quantitative_support: {
        completion_rate: 0.42,
        avg_seq: 2.8,
      },
      root_causes:
        "The flow was designed as a generic health consultation intake, not a condition-specific experience. It applies the same data collection pattern to piles as it would to a knee replacement or eye check-up. But piles is a condition users find deeply embarrassing, every form field that asks for personal information feels like exposure rather than progress. The flow never acknowledges this sensitivity or explains why the data is needed.",
      connected_friction_point_ids: ["FP_001", "FP_003"],
    },
    {
      theme_id: "T_002",
      rank: 2,
      theme_name: "Login wall destroys ad-generated intent",
      description:
        "Users click the ad with clear interest but hit a phone number wall before seeing any value. For health conditions users find embarrassing, sharing a phone number with an unknown app feels like a privacy risk.",
      frequency_pct: 54,
      affected_personas: ["Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast", "Pragmatist"],
      supporting_codes: [
        { code_name: "Login_Wall_Before_Value", frequency_pct: 54 },
        { code_name: "Phone_Number_Privacy_Fear", frequency_pct: 46 },
      ],
      key_monologues: [
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          text: "I clicked the ad to learn about the treatment. Why do they need my phone number before I've even seen what they offer? They'll start calling me about piles, no way.",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          text: "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega ki main ye dekhta hoon.",
        },
      ],
      counter_evidence: {
        summary:
          "Pragmatists and Enthusiasts who arrived via Google Search had higher intent and tolerated the login step",
        frequency_pct: 32,
      },
      quantitative_support: {
        completion_rate: 0.48,
        avg_seq: 3.4,
      },
      root_causes:
        "Standard mobile-first auth pattern that works for e-commerce and food delivery fails for sensitive health conditions. In those contexts, a phone number is just a login credential. Here, it feels like a record that links the user's identity to an embarrassing condition. The app provides no explanation of data usage and no alternative to phone auth.",
      connected_friction_point_ids: ["FP_002"],
    },
    {
      theme_id: "T_003",
      rank: 3,
      theme_name:
        "Generic app structure wastes condition-specific intent",
      description:
        "Users from a piles-specific ad land on a generic dashboard with 6+ services. They must navigate through Home and then Conditions to reach relevant content, 2 extra screens that dilute focused intent and increase abandonment risk.",
      frequency_pct: 44,
      affected_personas: ["Confused Novice", "Skeptic"],
      not_affected_personas: ["Enthusiast", "Pragmatist"],
      supporting_codes: [
        { code_name: "Ad_Intent_Mismatch", frequency_pct: 44 },
        { code_name: "Generic_Dashboard_Confusion", frequency_pct: 38 },
      ],
      key_monologues: [
        {
          session_id: "APR_HEXA_U043_20260409",
          persona_type: "Confused Novice",
          text: "The ad said piles treatment. But now I'm looking at knee surgery, weight loss, eye care... where is the piles section? I feel lost already.",
        },
        {
          session_id: "APR_HEXA_U010_20260409",
          persona_type: "Skeptic",
          text: "Why am I on a general health dashboard? I clicked a piles ad. This feels like they tricked me into downloading a generic app.",
        },
      ],
      counter_evidence: {
        summary:
          "Pragmatists and Enthusiasts navigated to the correct section quickly due to familiarity with app patterns",
        frequency_pct: 34,
      },
      quantitative_support: {
        completion_rate: 0.52,
        avg_seq: 3.4,
      },
      root_causes:
        "The app routes all ad traffic to the same generic home screen regardless of the condition in the ad. There's no deep-linking from condition-specific ads to condition-specific pages. This is a product architecture decision, the app was built as a multi-service platform, and the marketing team runs condition-specific ads that create expectations the app structure doesn't fulfill.",
      connected_friction_point_ids: ["FP_004"],
    },
    {
      theme_id: "T_004",
      rank: 4,
      theme_name:
        "Form-heavy consultation booking creates hospital registration anxiety",
      description:
        "The Doctor Form (Name, City, Relation, DOB, Gender) feels like a hospital registration counter. Users came for a quick free consultation but got a bureaucratic intake form.",
      frequency_pct: 38,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      supporting_codes: [
        { code_name: "Hospital_Registration_Anxiety", frequency_pct: 38 },
        { code_name: "Form_Fields_Excessive", frequency_pct: 32 },
      ],
      key_monologues: [
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          text: "Name, city, relation, date of birth, gender, this feels like I'm registering at a government hospital. I just wanted to ask a doctor a quick question.",
        },
        {
          session_id: "APR_HEXA_U035_20260409",
          persona_type: "Confused Novice",
          text: "Relation kiske saath? Ye form samajh nahi aa raha. Main toh apne liye dekhna chahta tha, ab family ke baare mein bhi poochh rahe hain.",
        },
      ],
      counter_evidence: {
        summary:
          "Enthusiasts treated the form as standard medical intake and completed it without emotional resistance",
        frequency_pct: 22,
      },
      quantitative_support: {
        completion_rate: 0.46,
        avg_seq: 2.8,
      },
      root_causes:
        "The consultation booking form was designed to match the hospital's intake requirements rather than the user's mental model. Users expected a quick, informal chat with a doctor, like messaging a friend who happens to be a specialist. Instead, they got a formal registration form that requires information they don't understand the need for (Relation, DOB) at a step where trust hasn't been established.",
      connected_friction_point_ids: ["FP_001"],
    },
  ],

  screens: [
    {
      step_id: 1,
      step_name: "Facebook/Instagram Ad",
      reached: 50,
      completed: 46,
      dropped: 4,
      drop_off_pct: 8,
      avg_seq: 4.8,
      top_emotional_tags: ["HOPEFUL", "EMBARRASSED", "ANXIOUS"],
      top_behavioral_tags: ["COMPLETED", "HESITATED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U001_20260409",
          persona_type: "Pragmatist",
          action_taken: "Clicked ad CTA",
          internal_monologue:
            "30 minutes laser treatment for piles, that's interesting. I've been putting this off for months. Let me check this out quickly before anyone notices what I'm browsing.",
          emotional_tags: ["HOPEFUL", "EMBARRASSED"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U005_20260409",
          persona_type: "Enthusiast",
          action_taken: "Clicked ad CTA immediately",
          internal_monologue:
            "Finally a proper laser treatment option. I've been researching this for weeks, HexaHealth came up on Google too. Let me see the details.",
          emotional_tags: ["CONFIDENT", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U009_20260409",
          persona_type: "Skeptic",
          action_taken: "Read ad, scrolled comments, did not click",
          internal_monologue:
            "30 minutes mein piles ka treatment? Sounds too good to be true. These health ads on Instagram are usually scams. I'm not clicking this and giving them my data.",
          emotional_tags: ["DISTRUST", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Distrust of health advertising claims on social media, perceived as too-good-to-be-true",
        },
        {
          session_id: "APR_HEXA_U046_20260409",
          persona_type: "Confused Novice",
          action_taken: "Saw ad, scrolled past",
          internal_monologue:
            "Piles ka laser treatment? Mujhe toh pata bhi nahi tha ki laser se hota hai. Ye sab bahut expensive hoga, mere liye nahi hai.",
          emotional_tags: ["OVERWHELMED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Assumed laser treatment is unaffordable, ad did not address cost concerns",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U009_20260409",
          persona_type: "Skeptic",
          action_taken: "Read ad, scrolled comments, did not click",
          internal_monologue:
            "30 minutes mein piles ka treatment? Sounds too good to be true. These health ads on Instagram are usually scams.",
          emotional_tags: ["DISTRUST", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Distrust of health advertising claims on social media",
        },
        {
          session_id: "APR_HEXA_U046_20260409",
          persona_type: "Confused Novice",
          action_taken: "Saw ad, scrolled past",
          internal_monologue:
            "Piles ka laser treatment? Mujhe toh pata bhi nahi tha ki laser se hota hai.",
          emotional_tags: ["OVERWHELMED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Assumed laser treatment is unaffordable without any pricing context",
        },
      ],
    },
    {
      step_id: 2,
      step_name: "App Login (Mobile Number)",
      reached: 46,
      completed: 41,
      dropped: 5,
      drop_off_pct: 10.9,
      avg_seq: 3.8,
      top_emotional_tags: ["ANXIOUS", "EMBARRASSED", "DISTRUST"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U002_20260409",
          persona_type: "Pragmatist",
          action_taken: "Entered number, proceeded",
          internal_monologue:
            "Phone number login, standard enough. But I hope they don't start sending me promotional messages about piles treatment. That would be awkward if someone sees my notifications.",
          emotional_tags: ["ANXIOUS", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          action_taken: "Stared at screen, closed app",
          internal_monologue:
            "I clicked the ad to learn about the treatment. Why do they need my phone number before I've even seen what they offer? They'll start calling me about piles, no way.",
          emotional_tags: ["DISTRUST", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Refused to share phone number for a sensitive health condition before seeing any value",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          action_taken: "Typed number partially, deleted, closed app",
          internal_monologue:
            "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega ki main ye dekhta hoon. Nahi, abhi nahi.",
          emotional_tags: ["EMBARRASSED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Fear that phone calls about piles would expose the condition to family members",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          action_taken: "Stared at screen, closed app",
          internal_monologue:
            "Why do they need my phone number before I've even seen what they offer? They'll start calling me about piles.",
          emotional_tags: ["DISTRUST", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Refused to share phone number for sensitive health condition before seeing any value",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          action_taken: "Typed number partially, deleted, closed app",
          internal_monologue:
            "Ye log call karenge toh ghar mein pata chal jayega.",
          emotional_tags: ["EMBARRASSED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Fear of family discovering condition through unsolicited phone calls",
        },
        {
          session_id: "APR_HEXA_U019_20260409",
          persona_type: "Skeptic",
          action_taken: "Looked for skip option, found none, left",
          internal_monologue:
            "No guest option? Every app collects your number and then the spam starts. I'll search on Google instead.",
          emotional_tags: ["DISTRUST", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "No guest browsing alternative, forced auth felt invasive",
        },
      ],
    },
    {
      step_id: 3,
      step_name: "Home/Dashboard (Services Grid)",
      reached: 41,
      completed: 39,
      dropped: 2,
      drop_off_pct: 4.9,
      avg_seq: 4.2,
      top_emotional_tags: ["CONFUSED", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U003_20260409",
          persona_type: "Pragmatist",
          action_taken: "Scanned grid, found Conditions tab",
          internal_monologue:
            "Okay, this is a general health app. Knee replacement, weight loss, eye care... I need to find piles specifically. Let me look for a conditions section.",
          emotional_tags: ["CONFUSED", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U043_20260409",
          persona_type: "Confused Novice",
          action_taken: "Scrolled up and down, tapped wrong section, left",
          internal_monologue:
            "The ad said piles treatment. But now I'm looking at knee surgery, weight loss, eye care... where is the piles section? I feel lost already.",
          emotional_tags: ["CONFUSED", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Could not find piles-related content on a generic multi-service dashboard",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U043_20260409",
          persona_type: "Confused Novice",
          action_taken: "Scrolled up and down, tapped wrong section, left",
          internal_monologue:
            "The ad said piles treatment. Where is the piles section? I feel lost.",
          emotional_tags: ["CONFUSED", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Generic dashboard broke the condition-specific intent from the ad",
        },
        {
          session_id: "APR_HEXA_U029_20260409",
          persona_type: "Confused Novice",
          action_taken: "Tapped on weight loss by mistake, got confused, left",
          internal_monologue:
            "Galat jagah aa gaya. Ab wapas kaise jaun? Ye app bahut complicated hai.",
          emotional_tags: ["CONFUSED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Navigational error on generic dashboard, no recovery path visible",
        },
      ],
    },
    {
      step_id: 4,
      step_name: "Conditions & Treatments List",
      reached: 39,
      completed: 38,
      dropped: 1,
      drop_off_pct: 2.6,
      avg_seq: 5.1,
      top_emotional_tags: ["RELIEVED", "CONFIDENT"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U004_20260409",
          persona_type: "Pragmatist",
          action_taken: "Scrolled list, tapped Piles",
          internal_monologue:
            "Good, there's a clean list here. Piles is right there. Finally getting to what I came for.",
          emotional_tags: ["RELIEVED", "CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U011_20260409",
          persona_type: "Enthusiast",
          action_taken: "Tapped Piles immediately",
          internal_monologue:
            "Found it. Piles/Fistula/Fissure section. Let me see what treatment options they have.",
          emotional_tags: ["CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U048_20260409",
          persona_type: "Skeptic",
          action_taken: "Scrolled list, felt overwhelmed by medical terms, left",
          internal_monologue:
            "Fistula, fissure, hemorrhoids... I don't know which one I have. I just know it hurts. This app expects me to diagnose myself.",
          emotional_tags: ["OVERWHELMED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Medical terminology overwhelmed a user who didn't know their specific diagnosis",
        },
      ],
    },
    {
      step_id: 5,
      step_name: "Piles Detail Page (Symptoms & Causes)",
      reached: 38,
      completed: 36,
      dropped: 2,
      drop_off_pct: 5.3,
      avg_seq: 5.6,
      top_emotional_tags: ["RELIEVED", "HOPEFUL", "CONFIDENT"],
      top_behavioral_tags: ["COMPLETED", "ENGAGED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U005_20260409",
          persona_type: "Enthusiast",
          action_taken: "Read entire page, clicked Book Consultation",
          internal_monologue:
            "This is comprehensive, symptoms match what I've been experiencing. Laser treatment in 30 minutes, same-day discharge. This validates everything I've read online. I'm ready to book.",
          emotional_tags: ["CONFIDENT", "HOPEFUL"],
          behavioral_tags: ["COMPLETED", "ENGAGED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          action_taken: "Read page carefully, checked symptoms section",
          internal_monologue:
            "Okay, the symptoms section is detailed and matches what I have. At least the medical information seems legitimate. But I still don't trust them with my personal details.",
          emotional_tags: ["RELIEVED", "DISTRUST"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U003_20260409",
          persona_type: "Pragmatist",
          action_taken: "Scanned page, checked cost indicators",
          internal_monologue:
            "Good info on symptoms and causes. The '30 min laser treatment' claim is consistent with the ad. But where's the pricing? I need to know the cost before I book anything.",
          emotional_tags: ["HOPEFUL", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U038_20260409",
          persona_type: "Confused Novice",
          action_taken: "Read symptoms, got scared, left",
          internal_monologue:
            "Ye sab padh ke darr lag raha hai. Surgery? Blood? Main toh bas cream ya tablet chahta tha. Ye toh bahut serious lag raha hai.",
          emotional_tags: ["ANXIOUS", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Medical content about surgical treatment scared a user expecting non-invasive options",
        },
        {
          session_id: "APR_HEXA_U050_20260409",
          persona_type: "Confused Novice",
          action_taken: "Scrolled page but couldn't understand medical terms",
          internal_monologue:
            "Hemorrhoids, thrombosis, prolapse, I don't understand these English medical words. Is this even what I have?",
          emotional_tags: ["CONFUSED", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Medical jargon in English was inaccessible for this user's comprehension level",
        },
      ],
    },
    {
      step_id: 6,
      step_name: "Doctor Consultation Form",
      reached: 36,
      completed: 31,
      dropped: 5,
      drop_off_pct: 13.9,
      avg_seq: 2.4,
      top_emotional_tags: ["EMBARRASSED", "ANXIOUS", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U006_20260409",
          persona_type: "Enthusiast",
          action_taken: "Filled form quickly, submitted",
          internal_monologue:
            "Standard medical intake form. Name, city, DOB, fine. I need this consultation, so I'll fill it in. The sooner I book, the sooner I get treated.",
          emotional_tags: ["CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          action_taken: "Started filling, stopped at Relation field, closed app",
          internal_monologue:
            "I already feel weird looking this up on my phone. Now they want my full name and date of birth? For piles? No thanks. And what does 'Relation' mean, relation to whom? This feels like a hospital registration counter.",
          emotional_tags: ["EMBARRASSED", "DISTRUST", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Registration-style form felt invasive for an embarrassing health condition",
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          action_taken: "Filled form reluctantly, submitted",
          internal_monologue:
            "Name, city, relation, date of birth, gender, this feels like I'm registering at a government hospital. I just wanted to ask a doctor a quick question. But I've come this far, might as well finish.",
          emotional_tags: ["FRUSTRATED", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U035_20260409",
          persona_type: "Confused Novice",
          action_taken: "Got confused at Relation field, left",
          internal_monologue:
            "Relation kiske saath? Ye form samajh nahi aa raha. Main toh apne liye dekhna chahta tha, ab family ke baare mein bhi poochh rahe hain.",
          emotional_tags: ["CONFUSED", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Confusing 'Relation' field with no context, user didn't understand who it referred to",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          action_taken: "Started filling, stopped at Relation field, closed app",
          internal_monologue:
            "They want my full name and date of birth for piles? No thanks. This feels like a hospital registration counter.",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Registration-style form felt invasive for an embarrassing health condition",
        },
        {
          session_id: "APR_HEXA_U035_20260409",
          persona_type: "Confused Novice",
          action_taken: "Got confused at Relation field, left",
          internal_monologue:
            "Relation kiske saath? Ye form samajh nahi aa raha.",
          emotional_tags: ["CONFUSED", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Confusing 'Relation' field derailed the form completion",
        },
        {
          session_id: "APR_HEXA_U027_20260409",
          persona_type: "Skeptic",
          action_taken: "Saw all required fields, backed out",
          internal_monologue:
            "I'm not giving my real name and DOB for a piles consultation. What if this data gets leaked? I'll just go to a local doctor instead.",
          emotional_tags: ["DISTRUST", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Data privacy fear, worried about sensitive health data being leaked",
        },
        {
          session_id: "APR_HEXA_U044_20260409",
          persona_type: "Confused Novice",
          action_taken: "Tried to fill DOB, couldn't find date picker, left",
          internal_monologue:
            "Date of birth kaise daalun? Calendar nahi dikh raha. Bahut mushkil hai ye app.",
          emotional_tags: ["FRUSTRATED", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "UI friction, date of birth entry was confusing without a clear date picker",
        },
        {
          session_id: "APR_HEXA_U017_20260409",
          persona_type: "Pragmatist",
          action_taken: "Started form, questioned necessity, left",
          internal_monologue:
            "Why do they need all this just for a free consultation? City and name I understand, but DOB and gender? This is more info than my bank asks for an account opening.",
          emotional_tags: ["FRUSTRATED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Perceived form as disproportionate to the value of a free consultation",
        },
      ],
    },
    {
      step_id: 7,
      step_name: "Describe Health Condition",
      reached: 31,
      completed: 28,
      dropped: 3,
      drop_off_pct: 9.7,
      avg_seq: 2.6,
      top_emotional_tags: ["EMBARRASSED", "ANXIOUS", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U006_20260409",
          persona_type: "Enthusiast",
          action_taken: "Typed symptoms clearly, submitted",
          internal_monologue:
            "I know my symptoms well, bleeding during bowel movement, external lump, pain while sitting. I've described this to a doctor before, so typing it out isn't a problem.",
          emotional_tags: ["CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          action_taken: "Typed brief description, hesitated, then submitted",
          internal_monologue:
            "I have to type about my piles problem in a text box? This is uncomfortable. Let me just write 'bleeding and pain' and move on. I don't want to go into detail in writing.",
          emotional_tags: ["EMBARRASSED", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U015_20260409",
          persona_type: "Skeptic",
          action_taken: "Stared at blank text field for 30 seconds, closed app",
          internal_monologue:
            "You want me to type out my piles symptoms in plain text? Who reads this? Is it stored somewhere? I'm not writing about my... this... in a text box on some app.",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Refused to describe embarrassing symptoms in an open text field with unknown data handling",
        },
        {
          session_id: "APR_HEXA_U039_20260409",
          persona_type: "Confused Novice",
          action_taken: "Typed one word, deleted it, tried again, left",
          internal_monologue:
            "Kya likhun? Mujhe English mein describe karna nahi aata. Aur Hindi mein likhun toh doctor samjhega kya? Ye bahut embarrassing hai.",
          emotional_tags: ["EMBARRASSED", "OVERWHELMED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Language barrier combined with embarrassment, couldn't articulate symptoms in writing",
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U015_20260409",
          persona_type: "Skeptic",
          action_taken: "Stared at blank text field, closed app",
          internal_monologue:
            "I'm not writing about this in a text box on some app. Who reads this?",
          emotional_tags: ["EMBARRASSED", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Refused to describe embarrassing symptoms in free text",
        },
        {
          session_id: "APR_HEXA_U039_20260409",
          persona_type: "Confused Novice",
          action_taken: "Typed one word, deleted it, left",
          internal_monologue:
            "Kya likhun? English mein describe karna nahi aata. Bahut embarrassing hai.",
          emotional_tags: ["EMBARRASSED", "OVERWHELMED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Language barrier and embarrassment prevented symptom description",
        },
        {
          session_id: "APR_HEXA_U033_20260409",
          persona_type: "Pragmatist",
          action_taken: "Started typing, felt too personal, backed out",
          internal_monologue:
            "I was fine until this step. But actually writing 'I have bleeding from my anus' in a text box feels too personal. A checklist would have been so much easier.",
          emotional_tags: ["EMBARRASSED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Open text format for sensitive symptoms felt excessively personal",
        },
      ],
    },
    {
      step_id: 8,
      step_name: "Doctor Consultation Question (Submit)",
      reached: 28,
      completed: 27,
      dropped: 1,
      drop_off_pct: 3.6,
      avg_seq: 5.2,
      top_emotional_tags: ["RELIEVED", "HOPEFUL"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_HEXA_U006_20260409",
          persona_type: "Enthusiast",
          action_taken: "Selected Yes, submitted",
          internal_monologue:
            "Yes, I want the doctor consultation. That's the whole reason I'm here. Submit. Finally done, now I wait for the call.",
          emotional_tags: ["CONFIDENT", "RELIEVED"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          action_taken: "Selected Yes, submitted",
          internal_monologue:
            "Simple yes/no question, do I want a doctor consultation? Yes. That was the easiest step in this whole journey. Should have started here.",
          emotional_tags: ["RELIEVED", "HOPEFUL"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_HEXA_U040_20260409",
          persona_type: "Confused Novice",
          action_taken: "Read question twice, selected Yes, submitted",
          internal_monologue:
            "Doctor se baat kar sakte hain? Haan, main chahta hoon. Chal finally kuch toh ho raha hai. Par call kab aayega?",
          emotional_tags: ["HOPEFUL", "ANXIOUS"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_HEXA_U025_20260409",
          persona_type: "Skeptic",
          action_taken: "Read submit screen, hesitated, closed app",
          internal_monologue:
            "After all that information I gave, now they ask if I want a consultation? If I say yes, they'll call me. And then I'll have to talk about piles on the phone. I need to think about this.",
          emotional_tags: ["ANXIOUS", "EMBARRASSED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Last-moment anxiety about receiving a phone call to discuss an embarrassing condition",
        },
      ],
    },
  ],

  friction_points: [
    {
      friction_point_id: "FP_001",
      rank: 1,
      step_id: 6,
      step_name: "Doctor Consultation Form",
      friction_type: "privacy_barrier",
      friction_score: 9.0,
      severity: "critical",
      drop_off_pct: 13.9,
      frequency_pct: 72,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      top_emotional_tags: ["EMBARRASSED", "DISTRUST", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 2.4,
      problem_narrative:
        "Users who have navigated 5 screens to reach this point are suddenly asked to fill a hospital-style registration form, full name, city, relation, date of birth, and gender, for what they expected to be a quick, free doctor consultation. For users dealing with piles, an inherently embarrassing condition, this form feels like creating a permanent medical record that links their real identity to a condition they haven't told anyone about. The 'Relation' field is particularly confusing and feels invasive. The form doesn't explain why any of this information is needed or how it will be used.",
      user_expectation:
        "A simple, low-commitment way to connect with a doctor, maybe just a chat or a callback request with minimal personal information.",
      actual_experience:
        "A 6-field formal registration form that feels like a hospital intake counter, with no explanation of why each field is needed or how the data will be protected.",
      business_impact:
        "This is the highest drop-off point in the entire flow at 13.9%. It affects 72% of users emotionally, even those who complete it. The form converts a moment of hope into a moment of bureaucratic anxiety, right when users are closest to conversion.",
      related_theme_ids: ["T_001", "T_004"],
      key_monologues: [
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          text: "I already feel weird looking this up on my phone. Now they want my full name and date of birth? For piles? No thanks.",
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          text: "Name, city, relation, date of birth, gender, this feels like I'm registering at a government hospital.",
        },
        {
          session_id: "APR_HEXA_U035_20260409",
          persona_type: "Confused Novice",
          text: "Relation kiske saath? Ye form samajh nahi aa raha.",
        },
      ],
    },
    {
      friction_point_id: "FP_002",
      rank: 2,
      step_id: 2,
      step_name: "App Login (Mobile Number)",
      friction_type: "privacy_barrier",
      friction_score: 8.4,
      severity: "critical",
      drop_off_pct: 10.9,
      frequency_pct: 54,
      affected_personas: ["Skeptic", "Confused Novice"],
      top_emotional_tags: ["DISTRUST", "EMBARRASSED", "ANXIOUS"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 3.8,
      problem_narrative:
        "Users who clicked a piles-specific ad are immediately asked for their mobile number before seeing any content. For a condition users find deeply embarrassing, a phone number isn't just a login credential, it's a permanent link between their identity and a stigmatized health condition. Users fear unsolicited calls or SMS messages that could expose their condition to family members who share the same household. There is no guest browsing option and no explanation of how the phone number will be used.",
      user_expectation:
        "Browse treatment information anonymously first, then provide contact details only when ready to book a consultation.",
      actual_experience:
        "Phone number required immediately after clicking the ad, before seeing any treatment information or value from the app.",
      business_impact:
        "10.9% of users drop at this step, and 54% of users who continue report negative emotions. This is the second-highest friction point and it's the first thing users see, it shapes their perception of the entire app as invasive rather than helpful.",
      related_theme_ids: ["T_002"],
      key_monologues: [
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          text: "I clicked the ad to learn about the treatment. Why do they need my phone number before I've even seen what they offer?",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          text: "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega.",
        },
      ],
    },
    {
      friction_point_id: "FP_003",
      rank: 3,
      step_id: 7,
      step_name: "Describe Health Condition",
      friction_type: "emotional_barrier",
      friction_score: 7.6,
      severity: "high",
      drop_off_pct: 9.7,
      frequency_pct: 68,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      top_emotional_tags: ["EMBARRASSED", "OVERWHELMED", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 2.6,
      problem_narrative:
        "After the registration form ordeal, users face an open text field asking them to describe their health condition in their own words. For piles, a condition most users haven't discussed with anyone, typing out symptoms in plain text feels excessively intimate and exposing. Users struggle with what to write, how much detail to provide, and whether to use clinical or everyday language. The blank text field offers no structure, no prompts, and no reassurance about who will read the response. Users who speak Hindi as their primary language face an additional barrier, they're unsure whether to write in Hindi or English.",
      user_expectation:
        "A simple checklist of common symptoms (bleeding, pain, swelling) they could tap without having to articulate embarrassing details in writing.",
      actual_experience:
        "A blank, open text field with no guidance, no symptom suggestions, and no language options, asking users to compose a free-text description of an embarrassing condition.",
      business_impact:
        "9.7% drop-off at this step, with 68% of all users reporting embarrassment or discomfort. This is the most emotionally charged step in the flow and the point where the condition-specific nature of the product conflicts most directly with the generic UX pattern.",
      related_theme_ids: ["T_001"],
      key_monologues: [
        {
          session_id: "APR_HEXA_U015_20260409",
          persona_type: "Skeptic",
          text: "You want me to type out my piles symptoms in plain text? Who reads this? I'm not writing about this in a text box on some app.",
        },
        {
          session_id: "APR_HEXA_U039_20260409",
          persona_type: "Confused Novice",
          text: "Kya likhun? English mein describe karna nahi aata. Bahut embarrassing hai.",
        },
        {
          session_id: "APR_HEXA_U033_20260409",
          persona_type: "Pragmatist",
          text: "A checklist would have been so much easier. Writing 'I have bleeding from my anus' in a text box feels too personal.",
        },
      ],
    },
    {
      friction_point_id: "FP_004",
      rank: 4,
      step_id: 3,
      step_name: "Home/Dashboard (Services Grid)",
      friction_type: "navigation_gap",
      friction_score: 5.2,
      severity: "moderate",
      drop_off_pct: 4.9,
      frequency_pct: 44,
      affected_personas: ["Confused Novice", "Skeptic"],
      top_emotional_tags: ["CONFUSED", "FRUSTRATED"],
      top_behavioral_tags: ["HESITATED", "ABANDONED"],
      avg_seq: 4.2,
      problem_narrative:
        "Users who clicked a piles-specific ad expect to land on piles-specific content. Instead, they see a generic health services dashboard with 6+ service categories, knee replacement, weight loss, eye care, and more. Finding the piles section requires navigating through the dashboard to a conditions list and then selecting the correct condition. This disconnect between the ad's promise and the app's structure wastes the focused intent that brought users here and makes the app feel like a generic platform rather than a specialist solution.",
      user_expectation:
        "Clicking a piles ad would lead directly to piles treatment information, a seamless continuation of the ad's promise.",
      actual_experience:
        "A generic multi-service health dashboard that requires 2 additional navigation steps to reach piles-specific content.",
      business_impact:
        "4.9% direct drop-off, but 44% of users reported confusion or frustration at this step. The real cost is subtle, it dilutes the condition-specific trust built by the ad and makes the app feel unfocused. Users who navigate past this step arrive at the Piles Detail page with lower confidence than they should have.",
      related_theme_ids: ["T_003"],
      key_monologues: [
        {
          session_id: "APR_HEXA_U043_20260409",
          persona_type: "Confused Novice",
          text: "The ad said piles treatment. But now I'm looking at knee surgery, weight loss, eye care... where is the piles section?",
        },
        {
          session_id: "APR_HEXA_U010_20260409",
          persona_type: "Skeptic",
          text: "Why am I on a general health dashboard? I clicked a piles ad. This feels like they tricked me into downloading a generic app.",
        },
      ],
    },
  ],

  behavioral_patterns: [
    {
      pattern_id: "BP_001",
      pattern_type: "privacy_guardian",
      pattern_name: "Refuses to share personal info for health condition",
      frequency_pct: 22,
      affected_personas: ["Skeptic", "Confused Novice"],
      trigger_step_id: 2,
      trigger_step_name: "App Login (Mobile Number)",
      trigger_tags: ["DISTRUST", "EMBARRASSED"],
      implication:
        "These users are not low-intent, they genuinely need treatment but their privacy concerns override their health needs. The flow treats health data collection the same as e-commerce login, which fails for stigmatized conditions.",
      session_ids: [
        "APR_HEXA_U008_20260409",
        "APR_HEXA_U019_20260409",
        "APR_HEXA_U041_20260409",
        "APR_HEXA_U027_20260409",
      ],
      behavior_narrative:
        "Privacy guardians click the piles ad with genuine interest, their monologues show they are suffering and actively seeking help. But the moment the app asks for identifying information (phone number, name, DOB), their embarrassment about the condition overrides their desire for treatment. They imagine worst-case scenarios: unsolicited calls about piles that family overhears, data breaches exposing their condition, or promotional SMS messages that appear on their lock screen. They exit the app and either search for anonymous information on Google or defer treatment entirely.",
      key_monologues: [
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          text: "I clicked the ad to learn about the treatment. Why do they need my phone number before I've even seen what they offer? They'll start calling me about piles, no way.",
        },
        {
          session_id: "APR_HEXA_U027_20260409",
          persona_type: "Skeptic",
          text: "I'm not giving my real name and DOB for a piles consultation. What if this data gets leaked?",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          text: "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega.",
        },
      ],
      actionable_insight:
        "Allow anonymous browsing until consultation booking. When auth is required, offer email login as an alternative, it feels less invasive than a phone number for health-sensitive users. Add a clear privacy statement explaining that no unsolicited calls or messages will be made.",
      related_theme_ids: ["T_002"],
      related_friction_point_ids: ["FP_002"],
    },
    {
      pattern_id: "BP_002",
      pattern_type: "embarrassment_blocker",
      pattern_name: "Freezes at symptom description steps",
      frequency_pct: 18,
      affected_personas: ["Pragmatist", "Confused Novice"],
      trigger_step_id: 7,
      trigger_step_name: "Describe Health Condition",
      trigger_tags: ["EMBARRASSED", "OVERWHELMED"],
      implication:
        "The open text format for symptom description is fundamentally wrong for embarrassing conditions. Users who navigated the entire flow drop off at the final content step because writing about piles in their own words feels too intimate. A structured input would remove this barrier entirely.",
      session_ids: [
        "APR_HEXA_U033_20260409",
        "APR_HEXA_U039_20260409",
        "APR_HEXA_U015_20260409",
      ],
      behavior_narrative:
        "Embarrassment blockers make it deep into the flow, they complete login, navigate to piles content, fill the registration form, and then freeze at the symptom description step. They stare at the blank text field, type a few words, delete them, try again, and eventually give up. Their monologues reveal a consistent pattern: they know what their symptoms are, but the act of articulating them in writing, choosing the words, deciding on the level of detail, confronting the condition in text form, triggers a level of embarrassment that breaks their momentum.",
      key_monologues: [
        {
          session_id: "APR_HEXA_U033_20260409",
          persona_type: "Pragmatist",
          text: "I was fine until this step. But actually writing 'I have bleeding from my anus' in a text box feels too personal. A checklist would have been so much easier.",
        },
        {
          session_id: "APR_HEXA_U039_20260409",
          persona_type: "Confused Novice",
          text: "Kya likhun? English mein describe karna nahi aata. Bahut embarrassing hai.",
        },
      ],
      actionable_insight:
        "Replace the open text field with a structured symptom checklist: bleeding, pain, swelling, itching, prolapse. Users tap symptoms rather than writing about them. Add an optional free-text field for those who want to add details, but don't make it the primary input.",
      related_theme_ids: ["T_001"],
      related_friction_point_ids: ["FP_003"],
    },
    {
      pattern_id: "BP_003",
      pattern_type: "intent_preserver",
      pattern_name: "Pushes through despite friction because of suffering",
      frequency_pct: 34,
      affected_personas: ["Enthusiast", "Pragmatist"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["HOPEFUL", "CONFIDENT"],
      implication:
        "These users convert not because the flow is good, but because their pain and desperation override the friction. They would convert even faster with a smoother flow, and they represent the floor of what this flow can achieve, not the ceiling.",
      session_ids: [
        "APR_HEXA_U001_20260409",
        "APR_HEXA_U005_20260409",
        "APR_HEXA_U006_20260409",
        "APR_HEXA_U022_20260409",
        "APR_HEXA_U011_20260409",
      ],
      behavior_narrative:
        "Intent preservers have been suffering from piles for weeks or months. They've already researched treatment options online, discussed the condition with at least one trusted person, and are actively seeking a solution. When they hit friction points, login wall, generic dashboard, registration form, symptom text field, they acknowledge the discomfort but push through because the alternative (continuing to live with untreated piles) is worse. Their monologues show rational cost-benefit calculations: 'This is annoying, but I need this treatment.'",
      key_monologues: [
        {
          session_id: "APR_HEXA_U005_20260409",
          persona_type: "Enthusiast",
          text: "I've been researching this for weeks. I know my symptoms, I know what treatment I need. Let me just get through this form and book the consultation.",
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          text: "This feels like a government hospital registration. But I've come this far, and I genuinely need this treatment. Might as well finish.",
        },
      ],
      actionable_insight:
        "These users are your best converters and they're converting despite the flow, not because of it. Every friction point you fix will convert more users from the other segments without losing these high-intent users. Focus on making the flow worthy of their intent.",
      related_theme_ids: [],
      related_friction_point_ids: [],
    },
    {
      pattern_id: "BP_004",
      pattern_type: "navigation_lost",
      pattern_name:
        "Gets lost in generic app after condition-specific entry",
      frequency_pct: 12,
      affected_personas: ["Confused Novice"],
      trigger_step_id: 3,
      trigger_step_name: "Home/Dashboard (Services Grid)",
      trigger_tags: ["CONFUSED", "OVERWHELMED"],
      implication:
        "The disconnect between a targeted ad and a generic app experience creates a trust and navigation gap. Users who arrive with condition-specific intent need condition-specific landing, not a multi-service dashboard that makes them hunt for what they came for.",
      session_ids: [
        "APR_HEXA_U043_20260409",
        "APR_HEXA_U029_20260409",
      ],
      behavior_narrative:
        "Navigation-lost users click the piles ad with clear (if tentative) intent to learn about treatment. After the login wall, they land on a generic dashboard showing 6+ health services. They scroll up and down looking for anything piles-related, tap the wrong category by mistake, can't find a back button, and give up. The ad promised specialist piles content; the app delivered a generic health marketplace. For users with low digital literacy who already felt vulnerable clicking a piles ad, this disconnect is the final straw.",
      key_monologues: [
        {
          session_id: "APR_HEXA_U043_20260409",
          persona_type: "Confused Novice",
          text: "The ad said piles treatment. But now I'm looking at knee surgery, weight loss, eye care... where is the piles section?",
        },
        {
          session_id: "APR_HEXA_U029_20260409",
          persona_type: "Confused Novice",
          text: "Galat jagah aa gaya. Ab wapas kaise jaun? Ye app bahut complicated hai.",
        },
      ],
      actionable_insight:
        "Deep-link condition-specific ads directly to the condition detail page. For users arriving from a piles ad, bypass the Home dashboard and Conditions list entirely. This eliminates 2 unnecessary screens and preserves the ad-generated intent.",
      related_theme_ids: ["T_003"],
      related_friction_point_ids: ["FP_004"],
    },
  ],

  segment_analysis: {
    segments: [
      {
        segment_id: "SEG_001",
        dimension: "persona_archetype",
        label: "Pragmatist",
        n: 15,
        conversion_rate: 67,
        avg_sus: 58.4,
        top_friction_point_ids: ["FP_001", "FP_003"],
        primary_pattern: "intent_preserver",
        top_emotional_tags: ["HOPEFUL", "FRUSTRATED"],
        summary:
          "Pragmatists push through friction because they need treatment, but the registration form and symptom text field test their patience",
        persona_profile:
          "Pragmatists are typically 30–45 year old working professionals from Mumbai and Delhi who have been dealing with piles for 2–6 months. They've done some online research, may have tried home remedies, and are now ready for a medical solution. They value efficiency and directness, they'll tolerate some friction if the end result is a real doctor consultation, but they expect the process to respect their time and intelligence.",
        journey_narrative:
          "Pragmatists clicked the ad with moderate intent, the '30 min laser treatment' claim aligned with their desire for a quick fix. They entered their phone number with mild reluctance, navigated the generic dashboard without major difficulty, and found the Piles section within 30 seconds. The Piles Detail page validated their research and built confidence. But the Doctor Consultation Form triggered frustration, they questioned why so many fields were needed for a free consultation. Most completed it anyway, but the symptom description step pushed several to their limit. Those who finished felt relieved but noted the process was unnecessarily burdensome.",
        monologues: [
          {
            text: "30 minutes laser treatment, that's interesting. I've been putting this off for months.",
          },
          {
            text: "Name, city, relation, date of birth, gender, this feels like I'm registering at a government hospital.",
          },
          {
            text: "I was fine until the symptom text box. A checklist would have been so much easier.",
          },
        ],
        positive_experience:
          "The Piles Detail page (Step 5) was the strongest moment for Pragmatists, the symptoms and causes matched their prior research, and the '30 min laser treatment' claim was consistent with the ad. This validation moment converted tentative interest into genuine intent.",
        emotional_arc: [
          "HOPEFUL",
          "ANXIOUS",
          "CONFUSED",
          "RELIEVED",
          "HOPEFUL",
          "FRUSTRATED",
          "EMBARRASSED",
          "RELIEVED",
        ],
        segment_recommendation:
          "Reduce the Doctor Consultation Form to Name + City only, DOB, Gender, and Relation can be collected during the actual consultation call. Replace the symptom text field with a structured checklist. Pragmatists will complete any reasonable form, but they resent unnecessary bureaucracy.",
      },
      {
        segment_id: "SEG_002",
        dimension: "persona_archetype",
        label: "Skeptic",
        n: 12,
        conversion_rate: 42,
        avg_sus: 48.2,
        top_friction_point_ids: ["FP_002", "FP_001"],
        primary_pattern: "privacy_guardian",
        top_emotional_tags: ["DISTRUST", "EMBARRASSED"],
        summary:
          "Skeptics see every data collection point as a privacy risk, for an embarrassing condition, this distrust becomes a hard blocker",
        persona_profile:
          "Skeptics are privacy-conscious users, often 25–40 year old men in Mumbai and Delhi who are deeply uncomfortable with digital health platforms. They've likely searched for piles information on Google in incognito mode. They distrust health apps that ask for personal information, fear data leaks that could expose their condition, and imagine worst-case scenarios at every step. They need strong reassurance that their data is safe before they'll engage.",
        journey_narrative:
          "Skeptics approached the ad with cautious interest but immediately hit a wall at the phone login. Many left at this step, those who continued did so reluctantly. The generic dashboard reinforced their distrust ('this feels like a trick'). The Piles Detail page partially recovered their confidence with legitimate medical information. But the Doctor Consultation Form was the breaking point for most, full name, DOB, and an unclear 'Relation' field felt like building a permanent medical file for a condition they hadn't told anyone about. The few who survived the form then faced the symptom text field, where the final Skeptics dropped.",
        monologues: [
          {
            text: "Why do they need my phone number before I've even seen what they offer? They'll start calling me about piles, no way.",
          },
          {
            text: "I already feel weird looking this up on my phone. Now they want my full name and date of birth? For piles? No thanks.",
          },
          {
            text: "You want me to type out my piles symptoms in plain text? Who reads this?",
          },
        ],
        emotional_arc: [
          "DISTRUST",
          "EMBARRASSED",
          "FRUSTRATED",
          "DISTRUST",
          "RELIEVED",
          "EMBARRASSED",
          "DISTRUST",
          "ANXIOUS",
        ],
        segment_recommendation:
          "Allow guest browsing until consultation booking. Add a visible privacy policy link at every data collection step. Show a clear statement: 'Your health information is encrypted and will never be shared without your consent.' For the login step, offer email as an alternative to phone number.",
      },
      {
        segment_id: "SEG_003",
        dimension: "persona_archetype",
        label: "Enthusiast",
        n: 10,
        conversion_rate: 80,
        avg_sus: 68.6,
        top_friction_point_ids: [],
        primary_pattern: "intent_preserver",
        top_emotional_tags: ["CONFIDENT", "HOPEFUL"],
        summary:
          "Enthusiasts convert reliably, they've already decided to seek treatment and the flow's friction doesn't deter them",
        persona_profile:
          "Enthusiasts are users who have been actively seeking piles treatment for weeks. They've researched laser treatment online, possibly consulted friends or family, and arrived at the HexaHealth ad via Google Search or from a recommendation. They're comfortable discussing their condition (at least digitally) and view the consultation as a practical step toward solving a real problem. They have higher digital literacy and prior experience with health-tech apps.",
        journey_narrative:
          "Enthusiasts clicked the ad immediately, the '30 min laser treatment' matched their prior research. They entered their phone number without hesitation, navigated to the Piles section quickly, and spent time reading the Detail page to validate their understanding. The Doctor Form was a minor speed bump, they treated it as standard medical intake. The symptom description was easy because they'd already articulated their symptoms to themselves. They submitted and felt relieved that the consultation process had begun.",
        monologues: [
          {
            text: "Finally a proper laser treatment option. I've been researching this for weeks.",
          },
          {
            text: "This is comprehensive, symptoms match what I've been experiencing. I'm ready to book.",
          },
          {
            text: "I know my symptoms well, bleeding, pain, lump. Typing it out isn't a problem for me.",
          },
        ],
        positive_experience:
          "Every step worked for Enthusiasts, but the Piles Detail page (Step 5) was the highlight, it validated their prior research and confirmed that HexaHealth offers the laser treatment they've been looking for. The symptom-cause breakdown built medical credibility that other steps lacked.",
        emotional_arc: [
          "CONFIDENT",
          "CONFIDENT",
          "HOPEFUL",
          "CONFIDENT",
          "HOPEFUL",
          "CONFIDENT",
          "CONFIDENT",
          "RELIEVED",
        ],
        segment_recommendation:
          "Protect the Enthusiast path, it works. Any flow changes should be tested against this segment to ensure the happy path stays fast. For acquisition, invest in Google Search targeting for piles-related keywords, search users arrive with Enthusiast-level intent.",
      },
      {
        segment_id: "SEG_004",
        dimension: "persona_archetype",
        label: "Confused Novice",
        n: 13,
        conversion_rate: 31,
        avg_sus: 36.1,
        top_friction_point_ids: ["FP_002", "FP_004", "FP_003"],
        primary_pattern: "navigation_lost",
        top_emotional_tags: ["OVERWHELMED", "CONFUSED", "EMBARRASSED"],
        summary:
          "Confused Novices fail across the entire funnel, low digital literacy, high embarrassment, and no understanding of the medical process compound into early exits",
        persona_profile:
          "Confused Novices are typically 35–55 year old users from lower-middle-class households in Delhi and Mumbai suburbs. They may be experiencing piles for the first time, haven't discussed it with anyone, and are deeply embarrassed. Their digital literacy is limited, they use phones primarily for WhatsApp, YouTube, and basic browsing. Medical English is mostly incomprehensible to them. They saw the ad while scrolling Instagram and clicked out of desperation, not informed intent.",
        journey_narrative:
          "Confused Novices clicked the ad tentatively, many almost scrolled past. The phone login was terrifying, sharing a number meant the app could call them about piles, which family might overhear. Those who got past login landed on the generic dashboard and couldn't find piles content. The few who reached the Piles Detail page were overwhelmed by medical terminology. The registration form's 'Relation' field was incomprehensible. And the symptom text field, the final barrier, asked them to write in English about a condition they'd never verbalized in any language. Most dropped before Step 6.",
        monologues: [
          {
            text: "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega.",
          },
          {
            text: "The ad said piles treatment. But now I'm looking at knee surgery, weight loss... where is the piles section?",
          },
          {
            text: "Kya likhun? English mein describe karna nahi aata. Bahut embarrassing hai.",
          },
        ],
        emotional_arc: [
          "ANXIOUS",
          "EMBARRASSED",
          "CONFUSED",
          "OVERWHELMED",
          "ANXIOUS",
          "CONFUSED",
          "EMBARRASSED",
          "HOPEFUL",
        ],
        segment_recommendation:
          "This segment needs a fundamentally different entry point: deep-link from the piles ad to the Piles Detail page (skip Home + Conditions), allow guest browsing, offer Hindi language support, replace all free-text with structured inputs, and add a WhatsApp-based consultation option instead of phone calls.",
      },
    ],
    converter_profile: {
      label: "Who Converts",
      dominant_personas: ["Enthusiast", "Pragmatist"],
      dominant_channels: ["google_search"],
      common_patterns: ["intent_preserver"],
      shared_emotional_signals: ["HOPEFUL", "CONFIDENT"],
    },
    dropper_profile: {
      label: "Who Drops Off",
      dominant_personas: ["Skeptic", "Confused Novice"],
      dominant_channels: ["instagram_ad"],
      common_patterns: ["privacy_guardian", "embarrassment_blocker"],
      shared_emotional_signals: ["EMBARRASSED", "DISTRUST", "ANXIOUS"],
    },
    critical_splits: [
      {
        dimension: "persona_archetype",
        label: "Enthusiast vs Confused Novice",
        value_a: "Enthusiast",
        rate_a: 80,
        value_b: "Confused Novice",
        rate_b: 31,
        delta: 49,
        implication:
          "A 49-point gap driven by digital literacy and comfort discussing health conditions digitally. Enthusiasts have already processed their condition and treat the flow as a practical step; Confused Novices are still in denial and the flow forces confrontation at every step.",
      },
      {
        dimension: "acquisition_channel",
        label: "Google Search vs Instagram Ad",
        value_a: "google_search",
        rate_a: 71,
        value_b: "instagram_ad",
        rate_b: 42,
        delta: 29,
        implication:
          "Search users have higher intent and prior condition awareness, they've already decided to seek treatment. Instagram users are earlier in their journey, often seeing the ad while casually scrolling, and need more context and reassurance before sharing personal information.",
      },
    ],
  },

  power_users: {
    count: 14,
    pct_of_total: 28,
    pct_of_converters: 52,
    why_they_convert: [
      "Already suffering from piles for weeks/months and actively seeking treatment",
      "High digital literacy, comfortable with app-based health services",
      "Prior research on piles treatment options, ad validated existing knowledge",
    ],
    what_resonates: [
      {
        step_id: 5,
        step_name: "Piles Detail Page",
        signal:
          "Validated their prior research on symptoms and laser treatment options",
        tag: "CONFIDENT",
        frequency_pct: 86,
      },
      {
        step_id: 1,
        step_name: "Facebook/Instagram Ad",
        signal:
          "'30 min laser treatment' matched their expectations from online research",
        tag: "HOPEFUL",
        frequency_pct: 79,
      },
    ],
    flow_strengths: [
      {
        step_id: 4,
        step_name: "Conditions & Treatments List",
        strength:
          "Clean, organized list with piles easily findable among conditions",
        evidence:
          "97% of power users completed this step with zero hesitation, avg time under 8 seconds",
      },
      {
        step_id: 5,
        step_name: "Piles Detail Page",
        strength:
          "Comprehensive symptom and treatment information builds medical credibility",
        evidence:
          "86% of power users showed CONFIDENT tags at this step, highest positive signal in the flow",
      },
    ],
    persona_breakdown: {
      Enthusiast: { count: 8, pct: 57 },
      Pragmatist: { count: 5, pct: 36 },
      Skeptic: { count: 1, pct: 7 },
      "Confused Novice": { count: 0, pct: 0 },
    },
    acquisition_strategy: {
      highest_yield_channel: "google_search",
      highest_yield_persona: "Enthusiast",
      recommendation:
        "Google Search users converting at 71% vs Instagram at 42%, invest in search intent keywords like 'piles laser treatment near me', 'piles doctor consultation online'. Search users arrive with Enthusiast-level intent that survives the flow's friction. Instagram drives volume but the flow isn't built for the low-intent, high-embarrassment users it attracts.",
      channel_persona_matrix: [
        {
          channel: "google_search",
          persona: "Enthusiast",
          conversion_rate: 90,
        },
        {
          channel: "google_search",
          persona: "Pragmatist",
          conversion_rate: 74,
        },
        {
          channel: "facebook_ad",
          persona: "Enthusiast",
          conversion_rate: 70,
        },
        {
          channel: "instagram_ad",
          persona: "Confused Novice",
          conversion_rate: 23,
        },
      ],
    },
  },

  insights: [
    {
      insight_id: "INS_001",
      rank: 1,
      headline:
        "Users feel invasively profiled before receiving any medical value",
      one_liner:
        "72% of users felt the registration form was disproportionately invasive for a free consultation about an embarrassing condition",
      type: "Usability Problem",
      observation:
        "72 out of 100 persona-weighted interactions showed negative emotional signals at the Doctor Consultation Form. SEQ at this step is 2.4 vs a 5.5 benchmark. Drop-off rate is 13.9%.",
      finding:
        "Users consistently felt the 6-field registration form (Name, City, Relation, DOB, Gender) was excessive for a free doctor consultation. The 'Relation' field was particularly confusing. For users dealing with piles, an inherently embarrassing condition, each field felt like creating a permanent record linking their identity to a stigmatized health issue.",
      insight:
        "The form was designed for hospital intake requirements, not user comfort. It applies a generic medical registration pattern to a condition where users haven't even told their own families. The gap between user expectation ('quick chat with a doctor') and actual experience ('government hospital registration') triggers abandonment at the moment of highest conversion potential.",
      recommendation:
        "Reduce the form to Name + City only. Collect DOB, Gender, and Relation during the actual consultation call. Replace the symptom text field with a structured checklist of common piles symptoms.",
      frequency_pct: 72,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      counter_evidence:
        "Enthusiasts (22% of users) treated the form as standard medical intake and completed it without emotional resistance",
      top_emotional_tags: ["EMBARRASSED", "DISTRUST", "FRUSTRATED"],
      confidence_score: 0.91,
      avg_seq: 2.4,
      step_drop_off_pct: 13.9,
      supporting_monologues: [
        {
          session_id: "APR_HEXA_U014_20260409",
          persona_type: "Skeptic",
          text: "I already feel weird looking this up on my phone. Now they want my full name and date of birth? For piles? No thanks.",
        },
        {
          session_id: "APR_HEXA_U022_20260409",
          persona_type: "Pragmatist",
          text: "Name, city, relation, date of birth, gender, this feels like I'm registering at a government hospital.",
        },
        {
          session_id: "APR_HEXA_U035_20260409",
          persona_type: "Confused Novice",
          text: "Relation kiske saath? Ye form samajh nahi aa raha.",
        },
      ],
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      linked_rec_id: "DR_001",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-09",
    },
    {
      insight_id: "INS_002",
      rank: 2,
      headline:
        "Mobile login gate fails for privacy-sensitive health conditions",
      one_liner:
        "54% of users refused or hesitated at the phone number login, piles patients fear unsolicited calls exposing their condition",
      type: "Usability Problem",
      observation:
        "54 out of 100 persona-weighted interactions showed negative emotional signals at the App Login step. SEQ at this step is 3.8 vs a 5.5 benchmark. Drop-off rate is 10.9%.",
      finding:
        "Users arriving from a piles ad were immediately asked for their phone number before seeing any app content. For a condition users find deeply embarrassing, a phone number isn't just a login credential, it's a potential channel for unsolicited calls and SMS that could expose their condition to family members.",
      insight:
        "Standard mobile-first auth (phone number + OTP) works for food delivery and e-commerce because the transaction isn't stigmatized. For sensitive health conditions, the same pattern fails because the phone number becomes a liability, a way for the app to contact them about something they want to keep private. The flow doesn't offer any alternative or explain its data usage policy.",
      recommendation:
        "Allow guest browsing until consultation booking. When login is required, offer email as an alternative to phone number. Add a clear statement: 'We will never call or message you without your explicit consent.'",
      frequency_pct: 54,
      affected_personas: ["Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast", "Pragmatist"],
      counter_evidence:
        "Pragmatists and Enthusiasts who arrived via Google Search tolerated the login step, viewing it as a standard app pattern",
      top_emotional_tags: ["DISTRUST", "EMBARRASSED", "ANXIOUS"],
      confidence_score: 0.88,
      avg_seq: 3.8,
      step_drop_off_pct: 10.9,
      supporting_monologues: [
        {
          session_id: "APR_HEXA_U008_20260409",
          persona_type: "Skeptic",
          text: "I clicked the ad to learn about the treatment. Why do they need my phone number before I've even seen what they offer?",
        },
        {
          session_id: "APR_HEXA_U041_20260409",
          persona_type: "Confused Novice",
          text: "Mera number deke kya hoga? Ye log call karenge toh ghar mein pata chal jayega.",
        },
        {
          session_id: "APR_HEXA_U019_20260409",
          persona_type: "Skeptic",
          text: "No guest option? Every app collects your number and then the spam starts.",
        },
      ],
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      linked_rec_id: "DR_002",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-04-09",
    },
  ],

  design_recommendations: [
    {
      rec_id: "DR_001",
      rank: 1,
      headline:
        "Replace open symptom text with structured symptom checklist",
      linked_insight_id: "INS_001",
      linked_friction_point_id: "FP_003",
      linked_theme_id: "T_001",
      problem:
        "68% of users felt embarrassed or overwhelmed by the open text field for describing piles symptoms, and 9.7% dropped off at this step",
      user_need:
        "A way to communicate symptoms without having to articulate embarrassing details in writing",
      current_experience:
        "A blank open text field asking users to describe their health condition in their own words, no prompts, no structure, no language options.",
      after_experience:
        "A tappable symptom checklist (bleeding, pain, swelling, itching, prolapse, difficulty sitting) with an optional free-text field for additional details. Available in both English and Hindi.",
      recommended_change:
        "Replace the free-text symptom description with a structured checklist of the 6 most common piles symptoms. Add bilingual labels (English + Hindi). Keep an optional text field for users who want to add details.",
      emotional_target:
        "Replace EMBARRASSED and OVERWHELMED with RELIEVED and CONFIDENT at the symptom step",
      effort: "medium",
      success_metric:
        "Symptom step drop-off rate falls below 4% (currently 9.7%). Users reporting embarrassment at this step drops below 30% (currently 68%).",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_002",
      rank: 2,
      headline: "Allow guest browsing until consultation booking",
      linked_insight_id: "INS_002",
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      problem:
        "54% of users felt the phone number login was invasive for a sensitive health condition, and 10.9% dropped at this step",
      user_need:
        "Browse treatment information anonymously before committing personal information",
      current_experience:
        "Phone number required immediately after clicking the ad, before seeing any treatment content or app value.",
      after_experience:
        "Users browse the full app, Home, Conditions, Piles Detail, without logging in. Phone number is only required when they click 'Book Consultation' on the detail page. Email login is available as an alternative.",
      recommended_change:
        "Defer authentication to the consultation booking step. Allow full browse access without login. When auth is required, offer email as an alternative to phone. Add a privacy statement at the login step.",
      emotional_target:
        "Replace DISTRUST and EMBARRASSED at login with CONFIDENT, users feel in control of when they share personal info",
      effort: "medium",
      success_metric:
        "Login step drop-off rate falls below 5% (currently 10.9%). Users reporting distrust at login drops below 20% (currently 54%).",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_003",
      rank: 3,
      headline:
        "Deep-link piles ad directly to Piles Detail page",
      linked_insight_id: "INS_002",
      linked_friction_point_id: "FP_004",
      linked_theme_id: "T_003",
      problem:
        "44% of users from a piles-specific ad felt confused landing on a generic health dashboard and had to navigate 2 extra screens to reach piles content",
      user_need:
        "Seamless continuity between the ad's promise and the app's content",
      current_experience:
        "Piles ad → Login → Generic Home Dashboard → Conditions List → Piles Detail. Two unnecessary intermediate screens break the condition-specific intent.",
      after_experience:
        "Piles ad → (optional guest browse) → Piles Detail Page directly. Users land on the content that matches the ad they clicked.",
      recommended_change:
        "Configure ad campaign deep-links to route piles ad traffic directly to the Piles Detail page (Step 5), bypassing the Home dashboard and Conditions list. Combined with guest browsing (DR_002), this creates a 2-step path: Ad → Piles Detail → Book Consultation.",
      emotional_target:
        "Replace CONFUSED and FRUSTRATED at the dashboard with CONFIDENT, users see immediate relevance",
      effort: "quick_win",
      success_metric:
        "Dashboard drop-off rate falls below 2% (currently 4.9%). Time from ad click to Piles Detail page drops by 60%+ (from 3 screens to 1).",
      priority: "this_sprint",
      rice_score: null,
    },
  ],

  playbook_insights: [
    {
      playbook_id: "PLB_001",
      title:
        "Sensitive health conditions require condition-specific flows, not generic app navigation",
      category: "health_ux",
      finding:
        "When users arrive from a condition-specific ad (piles treatment), routing them through a generic multi-service dashboard creates a trust gap and navigation friction. The 44% confusion rate at the Home screen and 49-point persona gap (Enthusiast 80% vs Confused Novice 31%) demonstrate that a one-size-fits-all app structure fails for condition-specific acquisition.",
      implication:
        "Health apps running condition-specific ad campaigns must build condition-specific landing experiences. The generic platform approach works for organic discovery but fails for targeted acquisition.",
      action:
        "For every condition-specific ad campaign, create a deep-linked entry point that bypasses generic navigation. The ad's promise must be immediately fulfilled by the first screen the user sees.",
      applies_to: [
        "health_apps",
        "condition_specific_campaigns",
        "deep_linking",
        "ad_to_app_continuity",
      ],
      evidence_studies: ["APR_HEXAHEALTH_v01"],
      confidence: 0.89,
      is_new: true,
      status: "Open",
    },
    {
      playbook_id: "PLB_002",
      title:
        "Login gates fail disproportionately for embarrassing health conditions",
      category: "auth_patterns",
      finding:
        "Standard mobile-first auth (phone number + OTP) produced a 10.9% drop-off and 54% negative emotional response for piles patients. Users fear unsolicited calls or messages that could expose their condition to family members. The phone number, normally a neutral credential, becomes a privacy liability when linked to a stigmatized condition.",
      implication:
        "Auth patterns that work for e-commerce and food delivery cannot be applied to sensitive health conditions without modification. The stigma multiplier means every data collection step carries disproportionate emotional weight.",
      action:
        "For health apps dealing with embarrassing conditions (piles, STIs, mental health, incontinence), defer login until after value delivery. When login is required, offer email as a less-invasive alternative to phone number, and add an explicit privacy commitment.",
      applies_to: [
        "health_apps",
        "sensitive_conditions",
        "auth_design",
        "privacy_patterns",
      ],
      evidence_studies: ["APR_HEXAHEALTH_v01"],
      confidence: 0.87,
      is_new: true,
      status: "Open",
    },
  ],

  priority_table: [
    {
      rank: 1,
      insight_id: "INS_001",
      headline:
        "Users feel invasively profiled before receiving any medical value",
      type: "Usability Problem",
      reach: null,
      impact: 3,
      confidence: 0.91,
      effort: 2,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_001",
    },
    {
      rank: 2,
      insight_id: "INS_002",
      headline:
        "Mobile login gate fails for privacy-sensitive health conditions",
      type: "Usability Problem",
      reach: null,
      impact: 2,
      confidence: 0.88,
      effort: 2,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_002",
    },
    {
      rank: 3,
      insight_id: "INS_003",
      headline:
        "Generic dashboard wastes condition-specific ad intent",
      type: "Navigation Problem",
      reach: null,
      impact: 1,
      confidence: 0.85,
      effort: 0.5,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_003",
    },
  ],
};
