import type { StudyData } from "@/types/study";

/**
 * Daily Mantra - Indian Vedic Mantra App Onboarding Simulation (April 2026).
 * 50 synthetic Indian personas across five behavioral archetypes.
 * Flow: Phone Number -> OTP -> Language -> Intent -> Vedic Analysis -> Paywall.
 */
export const dailymantraStudyData: StudyData = {
  "study": {
    "study_id": "DM_SIM_20260413_V1",
    "study_name": "Daily Mantra App - Full Onboarding Funnel Simulation",
    "flow_name": "Indian Vedic Mantra App Onboarding",
    "flow_version": "1.0",
    "date_run": "2026-04-13",
    "total_users": 50,
    "completed_users": 29,
    "dropped_users": 21,
    "failed_users": 0,
    "completion_rate": 58,
    "acquisition_channels": [
      "google_play_search",
      "instagram_ad",
      "youtube_ad",
      "family_referral",
      "whatsapp_forward"
    ],
    "personas_used": [
      "Devout Believer",
      "Curious Seeker",
      "Skeptical Rationalist",
      "Anxious Solution-Seeker",
      "Tech-Savvy Youth"
    ],
    "persona_distribution": {
      "Devout Believer": 12,
      "Curious Seeker": 12,
      "Skeptical Rationalist": 8,
      "Anxious Solution-Seeker": 10,
      "Tech-Savvy Youth": 8
    },
    "analysis_status": "complete"
  },
  "executive_summary": {
    "completion_rate": 58,
    "sus_score": 62.0,
    "sus_grade": "D",
    "sus_label": "Below Average",
    "avg_seq": 4.8,
    "critical_drop_point": "Subscription Paywall",
    "critical_drop_pct": 28,
    "top_findings": [
      {
        "rank": 1,
        "finding": "Paywall dark pattern (₹1 → ₹99) causes 11 of 40 arrivals to drop"
      },
      {
        "rank": 2,
        "finding": "Privacy barrier at entry (no value prop) loses 4 personas upfront"
      },
      {
        "rank": 3,
        "finding": "Skeptical Rationalist segment shows 0% conversion (trust issue)"
      }
    ],
    "top_recommendation": {
      "headline": "Replace ₹1 bait with transparent free trial messaging",
      "linked_rec_id": "DR_001",
      "effort": "low",
      "routing": "this_sprint"
    },
    "open_insights_count": 3,
    "this_sprint_count": 3,
    "next_sprint_count": 0,
    "backlog_count": 0
  },
  "scores": {
    "completion_rate": {
      "overall": 58,
      "ci_lower": 44.0,
      "ci_upper": 71.0,
      "by_persona": {
        "Devout Believer": 83,
        "Curious Seeker": 58,
        "Skeptical Rationalist": 0,
        "Anxious Solution-Seeker": 70,
        "Tech-Savvy Youth": 38
      }
    },
    "sus": {
      "mean": 62.0,
      "grade": "D",
      "label": "Below Average",
      "benchmark": 68,
      "delta_from_benchmark": -6.0,
      "questions": [
        {
          "q_id": 1,
          "type": "positive",
          "text": "I think that I would like to use this product frequently"
        },
        {
          "q_id": 2,
          "type": "negative",
          "text": "I found the product unnecessarily complex"
        },
        {
          "q_id": 3,
          "type": "positive",
          "text": "I thought the product was easy to use"
        },
        {
          "q_id": 4,
          "type": "negative",
          "text": "I think that I would need the support of a technical person to be able to use this product"
        },
        {
          "q_id": 5,
          "type": "positive",
          "text": "I found the various functions in this product were well integrated"
        },
        {
          "q_id": 6,
          "type": "negative",
          "text": "I thought there was too much inconsistency in this product"
        },
        {
          "q_id": 7,
          "type": "positive",
          "text": "I would imagine that most people would learn to use this product very quickly"
        },
        {
          "q_id": 8,
          "type": "negative",
          "text": "I found the product very cumbersome to use"
        },
        {
          "q_id": 9,
          "type": "positive",
          "text": "I felt very confident using the product"
        },
        {
          "q_id": 10,
          "type": "negative",
          "text": "I needed to learn a lot of things before I could get going with this product"
        }
      ],
      "distribution": {
        "F": 3,
        "D": 5,
        "C": 12,
        "B": 22,
        "A": 8,
        "A+": 0
      },
      "by_persona": {
        "Devout Believer": 71.0,
        "Curious Seeker": 65.0,
        "Skeptical Rationalist": 32.0,
        "Anxious Solution-Seeker": 58.0,
        "Tech-Savvy Youth": 69.0
      }
    },
    "seq_by_task": {
      "first_purchase_journey": {
        "avg": 4.8,
        "benchmark": 5.5,
        "delta": -0.7,
        "flag": "difficult",
        "by_persona": {
          "Devout Believer": 5.2,
          "Curious Seeker": 4.6,
          "Anxious Solution-Seeker": 5.1,
          "Tech-Savvy Youth": 3.8
        }
      }
    }
  },
  "emotional_fingerprint": {
    "top_positive_tags": [
      {
        "tag": "HOPEFUL",
        "frequency_pct": 40
      },
      {
        "tag": "TRUSTING",
        "frequency_pct": 35
      },
      {
        "tag": "URGENT",
        "frequency_pct": 30
      }
    ],
    "top_negative_tags": [
      {
        "tag": "SKEPTICAL",
        "frequency_pct": 44
      },
      {
        "tag": "DISAPPOINTED",
        "frequency_pct": 36
      },
      {
        "tag": "SUSPICIOUS",
        "frequency_pct": 28
      },
      {
        "tag": "CAUTIOUS",
        "frequency_pct": 28
      },
      {
        "tag": "RESENTFUL",
        "frequency_pct": 28
      }
    ],
    "overall_sentiment": "mixed_negative",
    "sentiment_score": -0.12,
    "most_emotional_step": "Subscription Paywall",
    "smoothest_step": "OTP Verification",
    "by_persona": {
      "Devout Believer": {
        "dominant_tag": "TRUSTING",
        "sentiment": "positive"
      },
      "Curious Seeker": {
        "dominant_tag": "CAUTIOUS",
        "sentiment": "neutral"
      },
      "Skeptical Rationalist": {
        "dominant_tag": "SKEPTICAL",
        "sentiment": "negative"
      },
      "Anxious Solution-Seeker": {
        "dominant_tag": "HOPEFUL",
        "sentiment": "positive"
      },
      "Tech-Savvy Youth": {
        "dominant_tag": "IMPATIENT",
        "sentiment": "negative"
      }
    }
  },
  "themes": [
    {
      "theme_id": "THEME_1",
      "rank": 1,
      "theme_name": "Privacy & Data Concerns",
      "description": "Users worry about personal data misuse",
      "frequency_pct": 16.0,
      "affected_personas": [
        "U025",
        "U026",
        "U027"
      ],
      "not_affected_personas": [],
      "supporting_codes": [
        {
          "code_name": "FP_001",
          "frequency_pct": 16.0
        }
      ],
      "key_monologues": [
        {
          "session_id": "DM_SIM_U025_20260413",
          "persona_type": "Curious Seeker",
          "text": "Skeptical about data collection"
        },
        {
          "session_id": "DM_SIM_U025_20260413",
          "persona_type": "Curious Seeker",
          "text": "Concerned about privacy violation"
        }
      ],
      "counter_evidence": {
        "summary": "Devout believers trust based on spiritual authority",
        "frequency_pct": 20
      },
      "quantitative_support": {
        "completion_rate": 0.58,
        "avg_seq": 4.8
      },
      "root_causes": "No privacy assurance upfront Immediate phone collection without context",
      "connected_friction_point_ids": [
        "FP_001"
      ]
    },
    {
      "theme_id": "THEME_2",
      "rank": 2,
      "theme_name": "Value Before Payment",
      "description": "Users want to experience content before paying",
      "frequency_pct": 55.0,
      "affected_personas": [
        "U020",
        "U023",
        "U032"
      ],
      "not_affected_personas": [],
      "supporting_codes": [
        {
          "code_name": "FP_002",
          "frequency_pct": 55.0
        },
        {
          "code_name": "FP_005",
          "frequency_pct": 55.0
        }
      ],
      "key_monologues": [
        {
          "session_id": "DM_SIM_U020_20260413",
          "persona_type": "Curious Seeker",
          "text": "No free preview"
        },
        {
          "session_id": "DM_SIM_U020_20260413",
          "persona_type": "Curious Seeker",
          "text": "Dark pattern frustration"
        }
      ],
      "counter_evidence": {
        "summary": "Devout believers willing to pay for Vedic guidance",
        "frequency_pct": 20
      },
      "quantitative_support": {
        "completion_rate": 0.58,
        "avg_seq": 4.8
      },
      "root_causes": "Paywall before content ₹1 bait followed by ₹99 subscription",
      "connected_friction_point_ids": [
        "FP_002",
        "FP_004",
        "FP_005"
      ]
    },
    {
      "theme_id": "THEME_3",
      "rank": 3,
      "theme_name": "Trust & Authenticity",
      "description": "Skeptics question legitimacy of spiritual claims",
      "frequency_pct": 24.0,
      "affected_personas": [
        "U025",
        "U030",
        "U032"
      ],
      "not_affected_personas": [],
      "supporting_codes": [
        {
          "code_name": "FP_004",
          "frequency_pct": 24.0
        }
      ],
      "key_monologues": [
        {
          "session_id": "DM_SIM_U025_20260413",
          "persona_type": "Curious Seeker",
          "text": "Dark pattern suspicion"
        },
        {
          "session_id": "DM_SIM_U025_20260413",
          "persona_type": "Curious Seeker",
          "text": "Scam-like behavior"
        }
      ],
      "counter_evidence": {
        "summary": "Religious segments trust Vedic branding implicitly",
        "frequency_pct": 20
      },
      "quantitative_support": {
        "completion_rate": 0.58,
        "avg_seq": 4.8
      },
      "root_causes": "₹1 → ₹99 pricing No content preview before payment",
      "connected_friction_point_ids": [
        "FP_004"
      ]
    },
    {
      "theme_id": "THEME_4",
      "rank": 4,
      "theme_name": "Cost Sensitivity",
      "description": "Lower-income users cannot afford ₹99/month",
      "frequency_pct": 20.0,
      "affected_personas": [
        "U033",
        "U037",
        "U038"
      ],
      "not_affected_personas": [],
      "supporting_codes": [
        {
          "code_name": "FP_002",
          "frequency_pct": 20.0
        }
      ],
      "key_monologues": [
        {
          "session_id": "DM_SIM_U033_20260413",
          "persona_type": "Curious Seeker",
          "text": "Budget constraints"
        },
        {
          "session_id": "DM_SIM_U033_20260413",
          "persona_type": "Curious Seeker",
          "text": "Income-to-price mismatch"
        }
      ],
      "counter_evidence": {
        "summary": "High-income segment sees ₹99 as reasonable",
        "frequency_pct": 20
      },
      "quantitative_support": {
        "completion_rate": 0.58,
        "avg_seq": 4.8
      },
      "root_causes": "No free tier No income-based pricing",
      "connected_friction_point_ids": [
        "FP_002"
      ]
    }
  ],
  "screens": [],
  "friction_points": [
    {
      "friction_point_id": "FP_001",
      "rank": 1,
      "step_id": 1,
      "step_name": "Phone Number Entry",
      "friction_type": "Privacy Barrier",
      "friction_score": 7.2,
      "severity": "high",
      "drop_off_pct": 8,
      "frequency_pct": 16,
      "affected_personas": [
        "U001",
        "U002",
        "U025",
        "U026"
      ],
      "top_emotional_tags": [
        "suspicious",
        "skeptical",
        "cautious"
      ],
      "top_behavioral_tags": [
        "quick_exit",
        "hesitation",
        "information_withholding"
      ],
      "avg_seq": 4.8,
      "problem_narrative": "Users expect to understand app value before giving phone numbers",
      "user_expectation": "Learn about the app before sharing personal data",
      "actual_experience": "Immediate phone number request with no context",
      "business_impact": "4% of personas drop immediately, missing ~2000 users/month",
      "related_theme_ids": [],
      "key_monologues": []
    },
    {
      "friction_point_id": "FP_002",
      "rank": 2,
      "step_id": 6,
      "step_name": "Subscription Paywall",
      "friction_type": "Paywall Before Value",
      "friction_score": 8.8,
      "severity": "critical",
      "drop_off_pct": 27.5,
      "frequency_pct": 55,
      "affected_personas": [
        "U005",
        "U010",
        "U020",
        "U023",
        "U032"
      ],
      "top_emotional_tags": [
        "resentful",
        "manipulated",
        "disappointed"
      ],
      "top_behavioral_tags": [
        "immediate_exit",
        "app_uninstall",
        "negative_review"
      ],
      "avg_seq": 4.8,
      "problem_narrative": "Dark pattern: ₹1 feels like bait, immediate ₹99 becomes visible after trial",
      "user_expectation": "Free trial or at least a sample of content before payment",
      "actual_experience": "Forced to pay ₹1 + subscription before seeing ANY mantra",
      "business_impact": "27.5% drop at paywall = biggest funnel leak, ~8500 lost conversions/month",
      "related_theme_ids": [],
      "key_monologues": []
    },
    {
      "friction_point_id": "FP_003",
      "rank": 3,
      "step_id": 1,
      "step_name": "Phone Number Entry",
      "friction_type": "Language Barrier",
      "friction_score": 5.1,
      "severity": "medium",
      "drop_off_pct": 4,
      "frequency_pct": 8,
      "affected_personas": [
        "U007",
        "U012",
        "U027",
        "U028"
      ],
      "top_emotional_tags": [
        "confused",
        "excluded",
        "frustrated"
      ],
      "top_behavioral_tags": [
        "slow_navigation",
        "app_switch",
        "quit"
      ],
      "avg_seq": 4.8,
      "problem_narrative": "Non-Hindi users feel excluded; no English explanation of app purpose",
      "user_expectation": "Clear language choice before onboarding",
      "actual_experience": "Hindi UI with no early explanation in English; confusing for English speakers",
      "business_impact": "Limits appeal to English-speaking segments; ~1200 users/month miss out",
      "related_theme_ids": [],
      "key_monologues": []
    },
    {
      "friction_point_id": "FP_004",
      "rank": 4,
      "step_id": 6,
      "step_name": "Subscription Paywall",
      "friction_type": "Dark Pattern / Trust Issue",
      "friction_score": 7.5,
      "severity": "high",
      "drop_off_pct": 12,
      "frequency_pct": 24,
      "affected_personas": [
        "U015",
        "U018",
        "U030",
        "U035"
      ],
      "top_emotional_tags": [
        "scammed",
        "skeptical",
        "angry"
      ],
      "top_behavioral_tags": [
        "quick_exit",
        "negative_feedback",
        "distrust"
      ],
      "avg_seq": 4.8,
      "problem_narrative": "Classic dark pattern: cheap bait followed by expensive trap",
      "user_expectation": "Transparent pricing from the start",
      "actual_experience": "₹1 'trial' obscures ₹99/month recurring charge (only visible after clicking)",
      "business_impact": "Damages brand trust; ~3600 users/month leave frustrated",
      "related_theme_ids": [],
      "key_monologues": []
    },
    {
      "friction_point_id": "FP_005",
      "rank": 5,
      "step_id": 5,
      "step_name": "Vedic Analysis Loading",
      "friction_type": "No Content Preview",
      "friction_score": 4.8,
      "severity": "medium",
      "drop_off_pct": 2.5,
      "frequency_pct": 5,
      "affected_personas": [
        "U040",
        "U042",
        "U050"
      ],
      "top_emotional_tags": [
        "disappointed",
        "skeptical",
        "impatient"
      ],
      "top_behavioral_tags": [
        "quick_exit",
        "tab_switch",
        "quit"
      ],
      "avg_seq": 4.8,
      "problem_narrative": "Users never see what they're paying for until after purchase",
      "user_expectation": "See actual mantra content before commitment",
      "actual_experience": "Loading screen leads directly to paywall, no preview content",
      "business_impact": "Reduces confidence in purchase decision; ~750 users/month bounce",
      "related_theme_ids": [],
      "key_monologues": []
    }
  ],
  "behavioral_patterns": [
    {
      "pattern_id": "BP_001",
      "pattern_type": "Trust-Based Conversion",
      "pattern_name": "High Trust Leads to Willingness to Pay",
      "frequency_pct": 34.0,
      "affected_personas": [
        "Devout Believer",
        "Anxious Solution-Seeker"
      ],
      "trigger_step_id": null,
      "trigger_step_name": "Intent Selection",
      "trigger_tags": [
        "spiritual_readiness",
        "faith_commitment",
        "urgency"
      ],
      "implication": "Trust-building is key to revenue",
      "session_ids": [],
      "behavior_narrative": "Users with high spiritual trust convert at paywall",
      "key_monologues": [],
      "actionable_insight": "Emphasize Vedic authenticity and expert curation",
      "related_theme_ids": [
        "THEME_2",
        "THEME_3"
      ],
      "related_friction_point_ids": []
    },
    {
      "pattern_id": "BP_002",
      "pattern_type": "Friction Abandonment",
      "pattern_name": "Quick Exit at Paywall",
      "frequency_pct": 27.5,
      "affected_personas": [
        "Tech-Savvy Youth",
        "Skeptical Rationalist"
      ],
      "trigger_step_id": null,
      "trigger_step_name": "Subscription Paywall",
      "trigger_tags": [
        "dark_pattern_detection",
        "price_rejection",
        "trust_loss"
      ],
      "implication": "Transparent pricing gains skeptic segment",
      "session_ids": [],
      "behavior_narrative": "Skeptics detect dark pattern and exit immediately",
      "key_monologues": [],
      "actionable_insight": "Remove dark pattern, offer content preview before payment",
      "related_theme_ids": [
        "THEME_2",
        "THEME_3"
      ],
      "related_friction_point_ids": [
        "FP_002",
        "FP_004"
      ]
    },
    {
      "pattern_id": "BP_003",
      "pattern_type": "Initial Hesitation",
      "pattern_name": "Privacy Concerns at Phone Entry",
      "frequency_pct": 8.0,
      "affected_personas": [
        "Skeptical Rationalist"
      ],
      "trigger_step_id": null,
      "trigger_step_name": "Phone Number Entry",
      "trigger_tags": [
        "privacy_concern",
        "data_anxiety",
        "verification_required"
      ],
      "implication": "4% recovery by addressing privacy upfront",
      "session_ids": [],
      "behavior_narrative": "Users exit before entering phone due to privacy fears",
      "key_monologues": [],
      "actionable_insight": "Add privacy statement and value prop before phone entry",
      "related_theme_ids": [
        "THEME_1"
      ],
      "related_friction_point_ids": [
        "FP_001"
      ]
    }
  ],
  "segment_analysis": {
    "segments": [
      {
        "segment_id": "SA_1",
        "dimension": "persona_archetype",
        "label": "Devout Believer",
        "n": 12,
        "conversion_rate": 83,
        "avg_sus": 71.0,
        "top_friction_point_ids": [],
        "primary_pattern": "Trust-Based Conversion",
        "top_emotional_tags": [
          "trusting",
          "hopeful",
          "spiritual"
        ],
        "summary": "Highest conversion (10/12) due to strong spiritual trust in Vedic authenticity",
        "persona_profile": "Age 40-60, monthly income ₹35K-150K, rural/temple-connected, high digital literacy in faith context",
        "journey_narrative": "Quick phone entry, expect spiritual content, willing to pay for authenticity",
        "monologues": [
          {
            "text": "वेद तो हिंदी में ही सुंदर लगते हैं। यह तो ठीक है।"
          },
          {
            "text": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं।"
          }
        ],
        "positive_experience": "Finds app aligned with spiritual values, proceeds smoothly through paywall",
        "emotional_arc": [
          "curious",
          "engaged",
          "trusting",
          "converted"
        ],
        "segment_recommendation": "Maintain Vedic branding authenticity, emphasize expert curation and scriptural basis"
      },
      {
        "segment_id": "SA_2",
        "dimension": "persona_archetype",
        "label": "Curious Seeker",
        "n": 12,
        "conversion_rate": 58,
        "avg_sus": 65.0,
        "top_friction_point_ids": [
          "FP_002"
        ],
        "primary_pattern": "Value Before Payment",
        "top_emotional_tags": [
          "curious",
          "analytical",
          "cautious"
        ],
        "summary": "Moderate conversion (7/12) - open-minded but cost-sensitive and skeptical of dark patterns",
        "persona_profile": "Age 25-35, monthly income ₹42K-120K, urban professionals, high digital literacy, experimental mindset",
        "journey_narrative": "Interested in wellness, but hesitate at paywall without content preview",
        "monologues": [
          {
            "text": "Well, most apps need phone verification anyway. Let me see what this is about."
          },
          {
            "text": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off."
          }
        ],
        "positive_experience": "Those who proceed see value and convert; those who bounce don't get convinced",
        "emotional_arc": [
          "interested",
          "engaged",
          "cautious",
          "conflicted"
        ],
        "segment_recommendation": "Show content preview before paywall, use transparent pricing (no ₹1 bait)"
      },
      {
        "segment_id": "SA_3",
        "dimension": "persona_archetype",
        "label": "Skeptical Rationalist",
        "n": 8,
        "conversion_rate": 0,
        "avg_sus": 32.0,
        "top_friction_point_ids": [
          "FP_001",
          "FP_002",
          "FP_004"
        ],
        "primary_pattern": "Friction Abandonment",
        "top_emotional_tags": [
          "skeptical",
          "analytical",
          "frustrated"
        ],
        "summary": "Zero conversion - fundamental distrust of spiritual claims and dark pattern detection",
        "persona_profile": "Age 24-35, monthly income ₹48K-110K, STEM professionals, high digital literacy, science-oriented",
        "journey_narrative": "Exit at phone entry, language screen, or paywall - always find a friction point to justify doubt",
        "monologues": [
          {
            "text": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी।"
          },
          {
            "text": "This is exactly what I expected. Dark pattern city. Uninstalling now."
          }
        ],
        "positive_experience": "N/A - no converters in segment",
        "emotional_arc": [
          "skeptical",
          "suspicious",
          "frustrated",
          "exited"
        ],
        "segment_recommendation": "This segment may be unwinnable with current model; focus on Devout Believers and Anxious Seekers instead"
      },
      {
        "segment_id": "SA_4",
        "dimension": "persona_archetype",
        "label": "Anxious Solution-Seeker",
        "n": 10,
        "conversion_rate": 70,
        "avg_sus": 58.0,
        "top_friction_point_ids": [
          "FP_002"
        ],
        "primary_pattern": "Trust-Based Conversion",
        "top_emotional_tags": [
          "hopeful",
          "urgent",
          "trusting"
        ],
        "summary": "Good conversion (7/10) - desperate for solution, willing to pay despite budget constraints",
        "persona_profile": "Age 26-50, monthly income ₹0-38K, working class/farmers, low-moderate digital literacy, facing life crisis",
        "journey_narrative": "Motivated by immediate problems (finances, relationships), willing to try spiritual remedies",
        "monologues": [
          {
            "text": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा।"
          },
          {
            "text": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।"
          }
        ],
        "positive_experience": "Sees app as lifeline, converts despite financial strain",
        "emotional_arc": [
          "desperate",
          "hopeful",
          "trusting",
          "converted"
        ],
        "segment_recommendation": "Create income-based pricing tiers or low-cost alternative to serve this high-intent but low-income segment"
      },
      {
        "segment_id": "SA_5",
        "dimension": "persona_archetype",
        "label": "Tech-Savvy Youth",
        "n": 8,
        "conversion_rate": 38,
        "avg_sus": 69.0,
        "top_friction_point_ids": [
          "FP_002",
          "FP_004"
        ],
        "primary_pattern": "Friction Abandonment",
        "top_emotional_tags": [
          "impatient",
          "skeptical",
          "pragmatic"
        ],
        "summary": "Low conversion (3/8) - expect free content, hostile to paywalls, value design over substance",
        "persona_profile": "Age 18-26, monthly income ₹2K-35K, students/junior professionals, very high digital literacy, trend-conscious",
        "journey_narrative": "Downloaded due to social proof or UI aesthetics, but bounce at paywall",
        "monologues": [
          {
            "text": "OTP received. Entering 4-digit code now."
          },
          {
            "text": "₹1 then ₹99? No free trial of actual content? That's sketchy. I'm out."
          }
        ],
        "positive_experience": "Early adopters who see meditation value (exam prep, stress relief) proceed",
        "emotional_arc": [
          "interested",
          "engaged",
          "skeptical",
          "exited"
        ],
        "segment_recommendation": "Offer free tier with limited content, freemium model, or college-student discounts"
      }
    ],
    "converter_profile": {
      "label": "Who Converts",
      "dominant_personas": [
        "Devout Believer",
        "Anxious Solution-Seeker"
      ],
      "dominant_channels": [
        "family_referral",
        "whatsapp_forward",
        "google_play_search"
      ],
      "common_patterns": [
        "Willing to pay for spiritual value",
        "Trust Vedic branding",
        "Make quick decisions"
      ],
      "shared_emotional_signals": [
        "hopeful",
        "trusting",
        "urgent",
        "spiritual"
      ]
    },
    "dropper_profile": {
      "label": "Who Drops Off",
      "dominant_personas": [
        "Tech-Savvy Youth",
        "Skeptical Rationalist"
      ],
      "dominant_channels": [
        "instagram_ad",
        "youtube_ad",
        "google_play_search"
      ],
      "common_patterns": [
        "Question authenticity",
        "Reject dark patterns",
        "Expect free trials",
        "Don't trust pricing"
      ],
      "shared_emotional_signals": [
        "skeptical",
        "frustrated",
        "impatient",
        "analytical"
      ]
    },
    "critical_splits": [
      {
        "dimension": "persona_archetype",
        "label": "Devout Believer vs Skeptical Rationalist",
        "value_a": "Devout Believer",
        "rate_a": 83,
        "value_b": "Skeptical Rationalist",
        "rate_b": 0,
        "delta": 83,
        "implication": "Spiritual trust drives conversion. Skeptical Rationalists detect dark patterns and exit at every friction step."
      },
      {
        "dimension": "funnel_step",
        "label": "Paywall conversion for users who reached it",
        "value_a": "Reached paywall",
        "rate_a": 80,
        "value_b": "Converted at paywall",
        "rate_b": 72.5,
        "delta": 7.5,
        "implication": "Only 72.5% of users who reach the paywall convert, with 27.5% dropping at the dark pattern trigger."
      }
    ]
  },
  "power_users": {
    "count": 17,
    "pct_of_total": 34,
    "pct_of_converters": 59,
    "why_they_convert": [
      "Strong spiritual trust in Vedic authenticity overrides pricing concerns.",
      "See ₹99/month as reasonable for meaningful spiritual guidance.",
      "Read phone entry and paywall as standard onboarding, not as friction."
    ],
    "what_resonates": [
      {
        "step_id": 4,
        "step_name": "Intent Selection",
        "signal": "Selecting spiritual intents like Peace of Mind anchors them in the journey.",
        "tag": "SPIRITUAL",
        "frequency_pct": 60
      },
      {
        "step_id": 5,
        "step_name": "Vedic Analysis Loading",
        "signal": "Personalized Vedic analysis framing builds anticipation.",
        "tag": "HOPEFUL",
        "frequency_pct": 55
      }
    ],
    "flow_strengths": [
      {
        "step_id": 2,
        "step_name": "OTP Verification",
        "strength": "Fast, familiar auth pattern.",
        "evidence": "95.7% completion at this step."
      },
      {
        "step_id": 3,
        "step_name": "Language Selection",
        "strength": "Hindi-first UI matches the devout audience.",
        "evidence": "97.7% continuation."
      }
    ],
    "persona_breakdown": {
      "Devout Believer": {
        "count": 10,
        "pct": 59
      },
      "Anxious Solution-Seeker": {
        "count": 7,
        "pct": 41
      }
    },
    "acquisition_strategy": {
      "highest_yield_channel": "family_referral",
      "highest_yield_persona": "Devout Believer",
      "recommendation": "Devout Believers acquired via family referral and whatsapp_forward convert at 83%. Invest in referral loops and WhatsApp community growth among Tier-2 and Tier-3 spiritual audiences.",
      "channel_persona_matrix": [
        {
          "channel": "family_referral",
          "persona": "Devout Believer",
          "conversion_rate": 85
        },
        {
          "channel": "whatsapp_forward",
          "persona": "Devout Believer",
          "conversion_rate": 80
        },
        {
          "channel": "google_play_search",
          "persona": "Anxious Solution-Seeker",
          "conversion_rate": 70
        },
        {
          "channel": "instagram_ad",
          "persona": "Curious Seeker",
          "conversion_rate": 58
        },
        {
          "channel": "youtube_ad",
          "persona": "Tech-Savvy Youth",
          "conversion_rate": 38
        }
      ]
    }
  },
  "insights": [
    {
      "insight_id": "INS_001",
      "rank": 1,
      "headline": "Remove ₹1 bait → ₹99 dark pattern",
      "one_liner": "Show at least 1-2 mantras free before paywall",
      "type": "Design Fix",
      "observation": "Show at least 1-2 mantras free before paywall",
      "finding": "Remove ₹1 bait → ₹99 dark pattern",
      "insight": "Remove ₹1 bait → ₹99 dark pattern",
      "recommendation": "Show at least 1-2 mantras free before paywall",
      "frequency_pct": 55,
      "affected_personas": [],
      "not_affected_personas": [],
      "counter_evidence": "",
      "top_emotional_tags": [],
      "confidence_score": 0.9,
      "avg_seq": 4.8,
      "step_drop_off_pct": 27.5,
      "supporting_monologues": [],
      "linked_friction_point_id": "FP_002",
      "linked_theme_id": "",
      "linked_rec_id": "DR_001",
      "rice_score": null,
      "status": "Open",
      "owner": null,
      "linked_ticket": null,
      "created_at": "2026-04-13"
    },
    {
      "insight_id": "INS_002",
      "rank": 2,
      "headline": "Add content preview before paywall",
      "one_liner": "Stream 1 personalized mantra + recitation before asking for payment",
      "type": "Feature Add",
      "observation": "Stream 1 personalized mantra + recitation before asking for payment",
      "finding": "Add content preview before paywall",
      "insight": "Add content preview before paywall",
      "recommendation": "Stream 1 personalized mantra + recitation before asking for payment",
      "frequency_pct": 20,
      "affected_personas": [],
      "not_affected_personas": [],
      "counter_evidence": "",
      "top_emotional_tags": [],
      "confidence_score": 0.9,
      "avg_seq": 4.8,
      "step_drop_off_pct": 8,
      "supporting_monologues": [],
      "linked_friction_point_id": "FP_005",
      "linked_theme_id": "",
      "linked_rec_id": "DR_002",
      "rice_score": null,
      "status": "Open",
      "owner": null,
      "linked_ticket": null,
      "created_at": "2026-04-13"
    },
    {
      "insight_id": "INS_003",
      "rank": 3,
      "headline": "Add value prop + privacy statement before phone entry",
      "one_liner": "Add 2-line value prop above phone input + privacy badge",
      "type": "Copy/UX Fix",
      "observation": "Add 2-line value prop above phone input + privacy badge",
      "finding": "Add value prop + privacy statement before phone entry",
      "insight": "Add value prop + privacy statement before phone entry",
      "recommendation": "Add 2-line value prop above phone input + privacy badge",
      "frequency_pct": 20,
      "affected_personas": [],
      "not_affected_personas": [],
      "counter_evidence": "",
      "top_emotional_tags": [],
      "confidence_score": 0.9,
      "avg_seq": 4.8,
      "step_drop_off_pct": 8,
      "supporting_monologues": [],
      "linked_friction_point_id": "FP_001",
      "linked_theme_id": "",
      "linked_rec_id": "DR_003",
      "rice_score": null,
      "status": "Open",
      "owner": null,
      "linked_ticket": null,
      "created_at": "2026-04-13"
    }
  ],
  "design_recommendations": [
    {
      "rec_id": "DR_001",
      "rank": 1,
      "headline": "Replace ₹1 bait with transparent free trial messaging",
      "linked_insight_id": "INS_001",
      "linked_friction_point_id": "FP_002",
      "linked_theme_id": "THEME_2",
      "problem": "₹1 → ₹99 triggers dark pattern perception; 27.5% drop at paywall",
      "user_need": "Transparent, value-first experience before any commitment.",
      "current_experience": "Screen shows '7 दिन FREE Trial' then reveals ₹1 + ₹99/month hidden",
      "recommended_change": "Screen shows '7 दिन FREE Trial' - no payment required upfront, ₹99/month only after trial ends",
      "after_experience": "Screen shows '7 दिन FREE Trial' - no payment required upfront, ₹99/month only after trial ends",
      "emotional_target": "Replace suspicion and resentment with trust and confidence.",
      "effort": "low",
      "success_metric": "Increase paywall conversion from 72.5% to 85%+ (13% lift)",
      "priority": "this_sprint",
      "rice_score": null
    },
    {
      "rec_id": "DR_002",
      "rank": 2,
      "headline": "Stream personalized mantra + recitation before asking for payment",
      "linked_insight_id": "INS_002",
      "linked_friction_point_id": "FP_005",
      "linked_theme_id": "THEME_2",
      "problem": "Users drop because they've never heard actual mantra content; no preview before payment",
      "user_need": "Transparent, value-first experience before any commitment.",
      "current_experience": "Loading screen → Paywall with no actual mantra preview",
      "recommended_change": "Loading screen → Play 1 personalized mantra (30-60 sec) with recitation → Then paywall CTA",
      "after_experience": "Loading screen → Play 1 personalized mantra (30-60 sec) with recitation → Then paywall CTA",
      "emotional_target": "Replace suspicion and resentment with trust and confidence.",
      "effort": "medium",
      "success_metric": "Increase paywall conversion from 72.5% to 80%+ (10% lift), especially in Curious Seeker segment",
      "priority": "this_sprint",
      "rice_score": null
    },
    {
      "rec_id": "DR_003",
      "rank": 3,
      "headline": "Add privacy assurance + value prop at phone entry",
      "linked_insight_id": "INS_003",
      "linked_friction_point_id": "FP_001",
      "linked_theme_id": "THEME_1",
      "problem": "8% drop at phone entry due to privacy concerns and no context on app purpose",
      "user_need": "Transparent, value-first experience before any commitment.",
      "current_experience": "Lotus logo + 'Daily Mantra' + phone input with no explanation",
      "recommended_change": "Add 2-line copy: 'Receive personalized Vedic mantras for [intent]. Your phone is secure.' + privacy badge",
      "after_experience": "Add 2-line copy: 'Receive personalized Vedic mantras for [intent]. Your phone is secure.' + privacy badge",
      "emotional_target": "Replace suspicion and resentment with trust and confidence.",
      "effort": "low",
      "success_metric": "Reduce Screen 1 drop from 8% to <3% (5% recovery = ~100 additional users through funnel)",
      "priority": "this_sprint",
      "rice_score": null
    }
  ],
  "playbook_insights": [
    {
      "playbook_id": "PLB_001",
      "title": "Dark-pattern pricing destroys skeptical and price-sensitive segments",
      "category": "pricing_patterns",
      "finding": "₹1 trial followed by ₹99 recurring charge creates a 27.5% paywall drop and zero conversion among Skeptical Rationalists.",
      "implication": "Price transparency is a conversion lever, not a compliance checkbox. Skeptical segments detect the pattern within seconds and uninstall.",
      "action": "Replace bait pricing with transparent free trial copy or freemium with clear ₹99 monthly CTA after preview.",
      "applies_to": [
        "subscription_apps",
        "pricing",
        "paywalls",
        "trust_building"
      ],
      "evidence_studies": [
        "DM_SIM_20260413_V1"
      ],
      "confidence": 0.92,
      "is_new": true,
      "status": "Open"
    },
    {
      "playbook_id": "PLB_002",
      "title": "Spiritual and religious apps can leverage faith trust to bypass typical price resistance",
      "category": "segmentation",
      "finding": "Devout Believers convert at 83% even with ₹99/month pricing because they read the app as a spiritual tool, not a product.",
      "implication": "For faith-aligned audiences, authentic Vedic branding and expert curation are higher-leverage than price reduction.",
      "action": "Invest in credible Vedic sourcing, temple partnerships, and family-referral loops. Surface lineage and scholarly credentials.",
      "applies_to": [
        "spiritual_apps",
        "faith_products",
        "cultural_branding"
      ],
      "evidence_studies": [
        "DM_SIM_20260413_V1"
      ],
      "confidence": 0.88,
      "is_new": true,
      "status": "Open"
    },
    {
      "playbook_id": "PLB_003",
      "title": "Content preview before paywall recovers Curious Seeker segment",
      "category": "paywall_design",
      "finding": "Users who never hear a mantra cannot evaluate worth. Adding a 30-60 second preview recovers Curious Seekers without hurting Devout Believers who already trust.",
      "implication": "For experiential products, zero preview is a conversion cap, not a revenue protection mechanism.",
      "action": "Stream one personalized mantra with recitation before the paywall CTA.",
      "applies_to": [
        "subscription_apps",
        "content_apps",
        "paywalls",
        "experience_design"
      ],
      "evidence_studies": [
        "DM_SIM_20260413_V1"
      ],
      "confidence": 0.9,
      "is_new": true,
      "status": "Open"
    }
  ],
  "priority_table": [
    {
      "rank": 1,
      "insight_id": "INS_001",
      "headline": "Remove ₹1 bait → ₹99 dark pattern",
      "type": "Design Fix",
      "reach": null,
      "impact": 3,
      "confidence": 0.95,
      "effort": 1,
      "rice_score": null,
      "routing": "this_sprint",
      "linked_rec_id": "DR_001"
    },
    {
      "rank": 2,
      "insight_id": "INS_002",
      "headline": "Add content preview before paywall",
      "type": "Feature Add",
      "reach": null,
      "impact": 3,
      "confidence": 0.95,
      "effort": 2,
      "rice_score": null,
      "routing": "this_sprint",
      "linked_rec_id": "DR_002"
    },
    {
      "rank": 3,
      "insight_id": "INS_003",
      "headline": "Add value prop + privacy statement before phone entry",
      "type": "Copy/UX Fix",
      "reach": null,
      "impact": 2,
      "confidence": 0.85,
      "effort": 1,
      "rice_score": null,
      "routing": "this_sprint",
      "linked_rec_id": "DR_003"
    }
  ]
};
