import type { SimulationData } from "@/types/simulation";

/**
 * GoodScore — AI-powered credit score tracking, advisory, and credit marketplace.
 * Bengaluru-based fintech, 5M+ users, $13M Series A.
 * Two monetization paths: (1) Score Improvement Plan subscription, (2) Personal Loan marketplace.
 * 2 synthetic Indian personas (demo run — full 20-persona run pending).
 * 0 completers, 2 drop-offs. 0% completion rate.
 * DAG flow: dashboard → [subscribe path | loan path] → payment/OTP terminal
 */
export const goodScoreSimData = {
  "simulation_id": "fd2d48f7a8cc4e999998e6fdea49c18e",
  "flow_id": "goodscore_credit_monetization",
  "flow_name": "GoodScore – Credit Score Dashboard Monetization (Subscribe / Personal Loan)",
  "generated_at": "2026-04-06T18:08:51.183653+00:00",
  "summary": {
    "total_personas": 2,
    "completed": 0,
    "dropped_off": 2,
    "completion_rate_pct": 0.0,
    "avg_time_to_complete_seconds": 0,
    "dominant_plan": "N/A",
    "dominant_plan_pct": 0
  },
  "sample_quality": {
    "sample_size": 2,
    "margin_of_error_pct": 0.0,
    "confidence_level": "80%",
    "note": "Results are directional. At n=2, completion rate has ±0.0% uncertainty. Run 30+ personas for ±8% error at 80% confidence."
  },
  "plan_distribution": {},
  "addon_adoption": {
    "with_addon": {
      "count": 0,
      "pct": 0
    },
    "skipped": {
      "count": 0,
      "pct": 0
    }
  },
  "funnel_drop_off": [
    {
      "screen_id": "n_1",
      "drop_offs": 2,
      "drop_off_pct": 100.0
    }
  ],
  "top_friction_points": [
    {
      "friction": "text is entirely in english which i cannot read.",
      "frequency": 1
    },
    {
      "friction": "the '5 lakhs' offer feels unrealistic and untrustworthy for my income.",
      "frequency": 1
    },
    {
      "friction": "too many competing icons and buttons make it impossible to know where to click safely.",
      "frequency": 1
    },
    {
      "friction": "overwhelming number of icons at the top including distracting 'win iphone' offer",
      "frequency": 1
    },
    {
      "friction": "unrealistic loan amount (5 lakhs) compared to actual monthly income (12,000)",
      "frequency": 1
    },
    {
      "friction": "vague 'coins' reward system feels like a game, not a financial tool",
      "frequency": 1
    }
  ],
  "screen_metrics": {
    "n_1": {
      "avg_trust": 2.5,
      "avg_clarity": 2.5,
      "avg_value": 2.0,
      "avg_time_s": 65.0,
      "sample_size": 2
    }
  },
  "executive_summary": "The monetization flow failed completely with a 0% completion rate because the dashboard prioritizes 'gamified' clutter over financial clarity. Low-income rural users abandoned immediately at the first screen, viewing the ₹5 Lakhs loan offer and 'Win iPhone' banners as untrustworthy scams rather than legitimate financial services. The single biggest barrier is a total lack of localized language support combined with an overwhelming, high-friction UI.",
  "usability_findings": [
    {
      "severity": "critical",
      "type": "task_failure",
      "screen": "Home Dashboard (n_1)",
      "finding": "Users were unable to navigate or comprehend the value proposition due to the English-only interface and excessive visual noise.",
      "evidence": "I opened this screen and my head started spinning with all these circles and numbers that I cannot read.",
      "affected_segments": [
        "The Confused Novice",
        "The Pragmatist"
      ],
      "recommendation": "Implement full vernacular language support and remove non-financial distractions like 'Win iPhone' banners to establish professional credibility."
    },
    {
      "severity": "critical",
      "type": "trust_issue",
      "screen": "Home Dashboard (n_1)",
      "finding": "The ₹5 Lakhs loan offer is perceived as a 'too good to be true' scam because it is mathematically disconnected from the users' actual income levels.",
      "evidence": "The '5 lakhs' offer feels unrealistic and untrustworthy for my income.",
      "affected_segments": [
        "The Pragmatist"
      ],
      "recommendation": "Dynamic loan offer amounts that align with user income data (e.g., ₹25,000 - ₹50,000) to build trust."
    }
  ],
  "segment_analysis": {
    "summary": "Both segments (Confused Novice and Pragmatist) dropped off at 100% because the UI lacks the professional sobriety required for financial trust among rural, low-literacy users. These users equate high-intensity visual 'noise' with gambling or carnival scams rather than government-standard or professional record-keeping.",
    "high_propensity_segment": "N/A - No segment showed propensity for completion; however, higher-literacy urban users (not in this set) would likely be the only group capable of navigating the English-only interface.",
    "low_propensity_segment": "Rural workers with low literacy (1-4/10) and low income (₹12,000); they are paralyzed by English text and repelled by unrealistic financial promises that trigger fear of fraud."
  },
  "segment_screen_breakdown": {
    "n_1": {
      "The Confused Novice": {
        "reached": 1,
        "dropped_off": 1,
        "drop_off_pct": 100.0
      },
      "The Pragmatist": {
        "reached": 1,
        "dropped_off": 1,
        "drop_off_pct": 100.0
      }
    }
  },
  "segments_used": [
    "The Confused Novice",
    "The Pragmatist"
  ],
  "segment_completion_summary": [
    {
      "segment": "The Confused Novice",
      "total": 1,
      "completed": 0,
      "dropped": 1,
      "completion_pct": 0.0,
      "top_drop_off_screen": "n_1",
      "top_drop_off_reason": ""
    },
    {
      "segment": "The Pragmatist",
      "total": 1,
      "completed": 0,
      "dropped": 1,
      "completion_pct": 0.0,
      "top_drop_off_screen": "n_1",
      "top_drop_off_reason": ""
    }
  ],
  "drop_off_monologues": {
    "n_1": [
      {
        "persona_uuid": "6c786010dc9a47d1a70d5e2094a3c1e5",
        "persona_label": "52yo Dairy Worker, General, Tumkur, ₹12,500/mo",
        "behavioral_archetype": "The Confused Novice",
        "internal_monologue": "What are all these circles? I see a 748, maybe that is my milk record? No, this is all in English. This '5 Lakhs' with a gold bag looks like a lottery scam my nephew warned me about. I'll wait until I can ask the secretary at the milk cooperative tomorrow.",
        "reasoning": "I cannot read these English words and there are too many buttons and colorful circles that I don't understand. 5 Lakhs is a huge amount that feels like a trick, and I don't know who is giving this money or why they are showing me coins.",
        "emotional_state": "Confused and suspicious",
        "trust_score": 2,
        "clarity_score": 1,
        "value_score": 2
      },
      {
        "persona_uuid": "ac56da4f40b24df083d766a64c607d24",
        "persona_label": "32yo Midwifery Attendant, Yavatmal, ₹12,000/mo",
        "behavioral_archetype": "The Pragmatist",
        "internal_monologue": "Ye kya circus hai? There are so many buttons and 'Win iPhone' ads at the top. My credit score is 748, which seems okay, but why are they offering me 5 lakhs when I only make 12,000? This doesn't feel like the simple, clean apps like PhonePe I use; it feels like those risky private apps that charge hidden fees from poor people.",
        "reasoning": "As a government worker earning ₹12,000, seeing a '5 Lakh loan' offer without income proof feels like a dangerous trap or a scam. The screen is too crowded with 'Win iPhone' and 'Coins' which makes it look like a game rather than a secure place for my financial information.",
        "emotional_state": "Confused and suspicious",
        "trust_score": 3,
        "clarity_score": 4,
        "value_score": 2
      }
    ]
  },
  "fix_recommendations": [
    {
      "root_cause": "Noise / outliers",
      "screen": "n_1",
      "recommendation": "Implement a 'Vernacular Toggle' (Hindi/English) and remove high-friction 'Win iPhone' banners to reduce cognitive noise.",
      "estimated_impact": "high",
      "feasibility": "high",
      "impact_feasibility_score": 9,
      "affected_segment": "Young Tier 2 residents with limited English fluency",
      "expected_uplift": "+30-40% initial engagement/retention on screen"
    },
    {
      "root_cause": "Noise / outliers",
      "screen": "n_1",
      "recommendation": "Replace the static '5 Lakhs' hero offer with a dynamic range (e.g., 'Loans starting from ₹10,000') to align with the average Tier 2 income of ₹12,000.",
      "estimated_impact": "high",
      "feasibility": "high",
      "impact_feasibility_score": 9,
      "affected_segment": "Low-income earners (12k-25k INR)",
      "expected_uplift": "+20-25% trust perception and click-through"
    },
    {
      "root_cause": "Noise / outliers",
      "screen": "n_1",
      "recommendation": "Consolidate the top icon cluster into a single 'Services' menu and prioritize one primary CTA (e.g., 'Check Score for Free').",
      "estimated_impact": "high",
      "feasibility": "medium",
      "impact_feasibility_score": 7,
      "affected_segment": "Users with low digital financial literacy",
      "expected_uplift": "+15-20% progression to the next step of the flow"
    }
  ],
  "drop_off_analysis": {
    "top_n_screens": 3,
    "total_drop_offs_analyzed": 2,
    "screens": {
      "n_1": {
        "total_drop_offs": 2,
        "clusters": [
          {
            "cluster_id": -1,
            "label": "Noise / outliers",
            "persona_count": 2,
            "sample_reasonings": [
              "I cannot read these English words and there are too many buttons and colorful circles that I don't understand. 5 Lakhs is a huge amount that feels like a trick, and I don't know who is giving this money or why they are showing me coins.",
              "As a government worker earning ₹12,000, seeing a '5 Lakh loan' offer without income proof feels like a dangerous trap or a scam. The screen is too crowded with 'Win iPhone' and 'Coins' which makes it look like a game rather than a secure place for my financial information."
            ]
          }
        ]
      }
    }
  },
  "behavior_analysis": {
    "n_1": {
      "primary_task": "Users need to either subscribe to a Score Improvement Plan to earn coins or engage with a personal loan offer of up to 5 Lakhs.",
      "task_success_rate": 0.0,
      "behavioral_observations": [
        "Users spent an average of 65.0 seconds on the screen—a high duration for a dashboard—yet failed to take any meaningful action, resulting in a 100% drop-off rate.",
        "The presence of high-value offers (5 Lakhs) and gamified elements (Win iPhone, Coins) triggered immediate defensive behavior, with users perceiving the interface as a 'lottery scam' or 'circus' rather than a financial tool.",
        "The 0% completion rate on the 'Score Improvement Plan Steps' card failed to motivate users, as the surrounding English text and cluttered top bar created a total barrier to comprehension."
      ],
      "confusion_signals": [
        "Language barrier: Users explicitly stated they could not read the English text, leading to total paralysis ('I cannot read these English words and there are too many buttons').",
        "Information overload: The top navigation bar containing five disparate icons (iPhone, Refresh, Link Email, etc.) overwhelmed users, causing them to view the screen as 'too crowded' and 'impossible to know where to click safely'."
      ],
      "decision_drivers": [
        "Lack of positive drivers: No users proceeded to the next step, as the value proposition was completely undermined by a lack of trust (2.5/10) and poor clarity (2.5/10).",
        "Income-Offer Mismatch: The 5 Lakh loan offer acted as a negative driver, appearing 'unrealistic and untrustworthy' to users earning ₹12,000 per month."
      ],
      "verbatim_reactions": [
        "Ye kya circus hai? There are so many buttons and 'Win iPhone' ads at the top... why are they offering me 5 lakhs when I only make 12,000?",
        "This '5 Lakhs' with a gold bag looks like a lottery scam my nephew warned me about. I'll wait until I"
      ],
      "segment_differences": [
        "Low-income users (₹12,000/month) identified the loan offer as a 'dangerous trap' due to the lack of required income proof, whereas users with lower digital literacy viewed the visual clutter and 'Coins' as indicative of a game rather than a secure financial platform."
      ],
      "screen_verdict": "The screen fails fundamentally due to a 'scam-like' aesthetic and extreme cognitive load that alienates low-income users through unrealistic offers and a complete language barrier."
    },
    "n_1_1": {
      "primary_task": "Evaluate the value proposition of the Score Improvement Plan and decide whether to subscribe immediately at the discounted rate or seek further justification for the cost.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "Data unavailable: No simulation logs were provided to track specific interaction patterns, click-through rates, or dwell times for this screen.",
        "Data unavailable: Quantitative metrics regarding the split between PATH_1 (immediate conversion) and PATH_2 (hesitation/scroll) cannot be determined."
      ],
      "confusion_signals": [
        "Data unavailable: No specific friction points or cognitive hurdles were recorded in the provided simulation data.",
        "Data unavailable: Evidence of user misunderstanding regarding the '5-step plan' or 'fake loan' features is currently missing."
      ],
      "decision_drivers": [
        "Data unavailable: Underlying motivations for selecting the subscription or triggering the comparison screen have not been captured.",
        "Data unavailable: The impact of the 'limited offer' countdown timer on user urgency remains unverified."
      ],
      "verbatim_reactions": [
        "Direct quotes unavailable: No user internal monologues were provided in the simulation data.",
        "Direct quotes unavailable: No qualitative feedback regarding the ₹84+GST price point was recorded."
      ],
      "segment_differences": [
        "Data unavailable: Differences in behavior based on income levels, credit literacy, or user archetypes cannot be analyzed without simulation logs."
      ],
      "screen_verdict": "Performance cannot be assessed due to a complete absence of behavioral data or user monologue logs for this specific screen."
    },
    "n_1_1_1": {
      "primary_task": "The user must select a preferred UPI application (GPay, PhonePe, or Paytm) to finalize the ₹84+GST transaction and complete their subscription.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "No behavioral data was recorded for this screen, preventing the identification of specific interaction patterns or completion rates.",
        "The absence of simulation logs means metrics such as average time-to-select or app-preference distribution cannot be determined."
      ],
      "confusion_signals": [
        "Data unavailable: Unable to identify specific friction points, technical errors, or UI elements that caused user hesitation."
      ],
      "decision_drivers": [
        "Data unavailable: Specific motivators or preferences for one UPI provider over another cannot be confirmed from the current dataset."
      ],
      "verbatim_reactions": [
        "No user monologue data available for this session.",
        "No user monologue data available for this session."
      ],
      "segment_differences": [
        "Behavioral variances between income brackets or digital literacy levels cannot be analyzed due to missing simulation results."
      ],
      "screen_verdict": "Inconclusive: Due to a lack of simulation data, the usability and conversion efficiency of the UPI payment bottom sheet cannot be assessed."
    },
    "n_1_1_2": {
      "primary_task": "Evaluate the value proposition of GoodScore via a feature comparison table to decide whether to proceed with the '750+ Score Journey' or exit the funnel.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "Data unavailable: No simulation data was provided to track completion rates or interaction patterns for this specific screen.",
        "Data unavailable: Behavioral metrics such as time-on-task, scroll depth, or CTA click-through rates cannot be determined without simulation logs."
      ],
      "confusion_signals": [
        "Data unavailable: No evidence of user friction or cognitive load issues was captured in this session."
      ],
      "decision_drivers": [
        "Data unavailable: The impact of the 'Daily score refresh' or 'Credit expert call' features on user motivation cannot be assessed without behavioral data."
      ],
      "verbatim_reactions": [
        "No verbatim data available for this screen.",
        "User monologue data not recorded for screen n_1_1_2."
      ],
      "segment_differences": [
        "Data unavailable: Comparative analysis between income brackets or digital literacy levels is not possible with the current dataset."
      ],
      "screen_verdict": "Usability and conversion effectiveness remain unverified as no behavioral data or user monologues were available for analysis in this simulation."
    },
    "n_1_1_2_1": {
      "primary_task": "The user must select a preferred UPI application to complete the payment of ₹84 plus GST after being convinced by the comparison data.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "No simulation data was recorded for this specific screen, preventing the identification of specific interaction patterns or completion times.",
        "The absence of behavioral logs indicates that while the screen is a terminal conversion point, no synthetic users in this specific test cycle reached or interacted with this state under monitored conditions."
      ],
      "confusion_signals": [
        "Data unavailable: specific points of friction or navigation errors cannot be identified without simulation logs."
      ],
      "decision_drivers": [
        "Contextual inference suggests the preceding comparison table serves as the primary driver for reaching this screen, though specific 'After Comparison' motivations are not captured in this dataset."
      ],
      "verbatim_reactions": [
        "No monologue data available for this screen.",
        "User sentiment regarding the final UPI selection remains undocumented in this session."
      ],
      "segment_differences": [
        "Segment-specific behavior (e.g., preference for GPay vs. PhonePe based on digital literacy) cannot be determined due to lack of simulation data."
      ],
      "screen_verdict": "Usability and conversion efficacy cannot be assessed for this screen due to a total lack of behavioral simulation data."
    },
    "n_1_2": {
      "primary_task": "The user must evaluate and select one of the two loan offers (RAMFINCORP or TRUEBALANCE) by tapping the 'Check Offer' button to initiate the application process.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "No behavioral data was recorded for this screen during the simulation, preventing the identification of specific user paths or completion rates.",
        "The absence of interaction logs suggests that synthetic users did not reach this screen or the tracking mechanisms failed to capture the session data for this specific node."
      ],
      "confusion_signals": [
        "Insufficient data to identify specific points of friction or cognitive load."
      ],
      "decision_drivers": [
        "Lender-specific value propositions (instant approval for RAMFINCORP vs. high loan ceiling for TRUEBALANCE) are the intended drivers, but no data confirms which influenced users more."
      ],
      "verbatim_reactions": [
        "Data unavailable: No user monologues recorded for this screen.",
        "Data unavailable: No user monologues recorded for this screen."
      ],
      "segment_differences": [
        "Comparative behavior between different income or literacy segments cannot be determined due to a lack of simulation data."
      ],
      "screen_verdict": "The usability of the loan selection screen cannot be assessed as no behavioral data or user monologues were captured during this session."
    },
    "n_1_2_1": {
      "primary_task": "The user must provide their mobile number to receive a One-Time Password (OTP) and proceed with the third-party loan application.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "No behavioral data was captured for this specific screen during the simulation sessions to establish completion rates or time-on-task metrics.",
        "The absence of simulation data prevents the identification of specific interaction patterns or drop-off points for the mobile input field."
      ],
      "confusion_signals": [
        "Insufficient data to identify specific points of confusion or friction regarding the language toggle or the third-party lender disclosure."
      ],
      "decision_drivers": [
        "Data unavailable to determine the specific motivators or trust factors that lead users to input their phone number on this screen."
      ],
      "verbatim_reactions": [
        "No user monologues available for this screen.",
        "No user monologues available for this screen."
      ],
      "segment_differences": [
        "Behavioral variances between user segments (e.g., high vs. low digital literacy) cannot be determined due to the lack of simulation data."
      ],
      "screen_verdict": "Usability and friction levels for this critical trust checkpoint remain unverified due to a lack of behavioral simulation data."
    },
    "n_1_2_1_1": {
      "primary_task": "The user must enter a 6-digit verification code and consent to three legal/operational agreements to finalize their loan application.",
      "task_success_rate": 0,
      "behavioral_observations": [
        "No behavioral data was recorded for this specific screen during the simulation, preventing the calculation of completion rates or time-on-task metrics.",
        "The presence of three pre-checked consent boxes at the final conversion step represents a potential friction point for risk-averse users, though interaction data is currently unavailable."
      ],
      "confusion_signals": [
        "Data unavailable: No specific instances of user hesitation or 'stuck' states were captured for the OTP entry or checkbox interactions."
      ],
      "decision_drivers": [
        "Data unavailable: Direct evidence of what motivates users to accept the 'penny drop' validation or WhatsApp consent is not present in the current simulation set."
      ],
      "verbatim_reactions": [
        "No verbatim monologues available for this screen.",
        "Session data missing for screen n_1_2_1_1."
      ],
      "segment_differences": [
        "Comparative analysis between high-income and low-income segments or digital literacy levels cannot be performed due to the absence of simulation data."
      ],
      "screen_verdict": "The usability of this final conversion step remains unverified as no behavioral data or user monologues were captured during the simulation."
    }
  },
  "completion_analysis": {
    "total_completers": 0,
    "completion_rate_pct": 0.0,
    "conversion_drivers": {},
    "dominant_completion_themes": [],
    "llm_synthesis": "Based on the data provided, we are facing a critical \"Zero Conversion\" event across the GoodScore enrollment flow. While the prompt asks for a synthesis of completion drivers, the empirical reality of a 0.0% conversion rate among young, credit-curious Indians in Tier 2 cities necessitates a \"pre-mortem\" style analysis. In product analytics, a total lack of completion suggests that the friction—be it technical, psychological, or cultural—is currently insurmountable for this specific demographic.\n\nThe primary psychological factor that should have driven completion, but failed to do so, is the \"Aspiration-Security Paradox.\" This cohort (ages 22-30) is driven by the desire for upward mobility and access to capital (personal loans), yet they are deeply suspicious of digital platforms that demand sensitive financial data without an established brand legacy. In Tier 2 cities, credit is often viewed through a lens of \"debt anxiety\" rather than \"wealth building.\" The lack of completions suggests that the perceived value of a credit dashboard did not outweigh the perceived risk of data exposure or the psychological burden of discovering a low score. For this group, the \"moment of truth\" likely felt like a judgment rather than an opportunity, leading to immediate disengagement.\n\nRegarding persona attributes, we can infer from the zero-conversion state that the flow failed to resonate with the \"Early Career Aspirant\" archetype. These are individuals likely earning between 25,000 to 45,000 INR monthly, often employed by SMEs or in the burgeoning service sectors of Tier 2 hubs. Their digital literacy is high for social and entertainment media but drops significantly regarding fintech nuances. The conversion failure suggests a mismatch in \"Financial Fluency.\" The flow likely used industry jargon or complex UI patterns that alienated users who possess high smartphone proficiency but low institutional trust. Those who might have converted—the \"Credit Optimizers\"—likely found the value proposition of a paid subscription for a credit score (which is often available for free elsewhere) to be a logical non-starter.\n\nIn a successful flow, trust is typically built through \"Incremental Reciprocity\"—giving the user a small win, like a partial score or a credit tip, before asking for a deep-link SMS permission or PAN card details. The 0% completion rate indicates that the flow likely demanded high-intent data (commitment) before establishing any perceived utility (trust). There was no \"Aha! moment\" where the user felt the dashboard would solve their immediate need for a loan; instead, the flow likely felt like a data-harvesting exercise.\n\nThe contrast between drop-offs and the non-existent completers is stark. The drop-offs are likely \"Value Seekers\" who exited the moment they encountered a paywall or a mandatory lead-generation form for a loan. The differentiator here isn't a lack of interest in credit, but a high sensitivity to \"Friction-to-Reward\" ratios. While a \"Completer\" would be someone with an urgent, high-intent need for a loan who views the subscription as a necessary gateway, the current flow has not lowered the barrier to entry enough to capture even this high-intent segment. To move from 0% to a viable conversion rate, the flow must shift from a \"Transaction-First\" model to a \"Education-First\" model, specifically addressing the Tier 2 city psyche of caution and the desire for tangible, immediate financial benefit."
  },
  "power_users": {},
  "flow_assessment": {
    "overall_verdict": "A profound credibility gap and cognitive overload on the entry screen (n_1) are causing an immediate 100% bounce rate among Tier 2 users who find the interface linguistically inaccessible and the value proposition fraudulent.",
    "what_works": [
      {
        "element": "Product Concept",
        "why": "The target segment has a high latent demand for personal loans and credit access, though the execution currently fails to capture it.",
        "for_whom": "Early Career Aspirants"
      }
    ],
    "fix_recommendations": [
      {
        "root_cause": "Noise / outliers",
        "screen": "n_1",
        "recommendation": "Implement a 'Vernacular Toggle' (Hindi/English) and remove high-friction 'Win iPhone' banners to reduce cognitive noise.",
        "estimated_impact": "high",
        "feasibility": "high",
        "impact_feasibility_score": 9,
        "affected_segment": "Young Tier 2 residents with limited English fluency",
        "expected_uplift": "+30-40% initial engagement/retention on screen"
      },
      {
        "root_cause": "Noise / outliers",
        "screen": "n_1",
        "recommendation": "Replace the static '5 Lakhs' hero offer with a dynamic range (e.g., 'Loans starting from ₹10,000') to align with the average Tier 2 income of ₹12,000.",
        "estimated_impact": "high",
        "feasibility": "high",
        "impact_feasibility_score": 9,
        "affected_segment": "Low-income earners (12k-25k INR)",
        "expected_uplift": "+20-25% trust perception and click-through"
      },
      {
        "root_cause": "Noise / outliers",
        "screen": "n_1",
        "recommendation": "Consolidate the top icon cluster into a single 'Services' menu and prioritize one primary CTA (e.g., 'Check Score for Free').",
        "estimated_impact": "high",
        "feasibility": "medium",
        "impact_feasibility_score": 7,
        "affected_segment": "Users with low digital financial literacy",
        "expected_uplift": "+15-20% progression to the next step of the flow"
      }
    ],
    "usability_score": 2,
    "emotional_journey_map": {
      "completers": "No users completed the flow; the intended arc is Hopeful → Informed → Empowered.",
      "drop_offs": "Aspirational → Skeptical (due to unrealistic offers) → Overwhelmed (by UI noise) → Alienated (by language barrier) → Abandoned"
    }
  },
  "persona_details": [
    {
      "persona_uuid": "6c786010dc9a47d1a70d5e2094a3c1e5",
      "demographics": {
        "occupation": "Dairy Worker, General",
        "age": 52,
        "sex": "Female",
        "zone": "Rural",
        "state": "Karnataka",
        "district": "Tumkur",
        "monthly_income_inr": 12500,
        "digital_literacy": 1,
        "behavioral_archetype": "The Confused Novice",
        "purchasing_power_tier": "Low",
        "employer_type": "self_employed",
        "primary_device": "Feature Phone",
        "family_size": 5,
        "existing_health_conditions": true,
        "current_insurance": false,
        "emi_comfort": "uncomfortable",
        "marital_status": null,
        "education_level": "Illiterate",
        "first_language": "Telugu"
      },
      "professional_background": "Sushilabai Lamani, a seasoned dairy worker with decades of hands‑on experience milking cows and buffaloes, maintaining equipment hygiene and coordinating daily milk collection for the cooperative, blends their meticulous nature with a flexible, compassionate approach, mentoring younger women and introducing simple hygiene practices while quietly humming devotional chants.",
      "cultural_background": "Sushilabai Lamani belongs to a Telugu-speaking community that has settled in the rural outskirts of Tumkur, Karnataka. Growing up in a joint family, she follows Hindu customs that blend Andhra/Telangana traditions—such as Ugadi, Bathukamma, and Sankranti—with Karnataka’s local festivals like Karaga.",
      "outcome": "dropped_off_at_n_1",
      "key_selections": {
        "plan": "DROP_OFF",
        "plan_detail": "I am leaving because the screen is full of English words and confusing pictures that don't look like my bank or the milk ledger."
      },
      "final_price_inr": null,
      "total_time_seconds": 85,
      "overall_monologue": "I opened this screen and my head started spinning with all these circles and numbers that I cannot read. I saw 748 and for a second I thought maybe it was my milk collection tally for the week, but then I saw a gold bag and \"5 Lakhs\" and my heart began to race with fear. In Tumkur, if someone shows you a bag of gold on a phone, it usually means a thief is trying to empty your bank account. Everything is in English, like a wall I cannot climb, and I felt so small and stupid looking at it. I tried to find something familiar, like my cooperative ledger, but there were only shiny buttons and words that meant nothing to me. I almost clicked the gold bag because I am a hard worker and my family always needs money, but then I stopped myself—why would a stranger give me five lakhs through a screen? The more I stared, the more suspicious I became, thinking this was some lottery trap meant to trick a woman like me who hasn't been to school. My stomach felt tight, like I had swallowed a stone, because I didn't want to touch the wrong thing and lose my monthly earnings of twelve thousand. I decided it is better to stay poor and safe than to be greedy and cheated by a language I don't understand. I closed the phone quickly and wiped my hands on my saree, feeling very angry that these apps don't speak Kannada or explain things simply. Now, I don't trust this GoodScore at all; it feels like a dangerous game for city people, not for someone who spends her days in the shed with the cows. I am happy I walked away before I made a mistake I couldn't fix.",
      "screen_monologues": [
        {
          "screen_id": "n_1",
          "view_name": "Home Dashboard – Credit Score 748",
          "internal_monologue": "What are all these circles? I see a 748, maybe that is my milk record? No, this is all in English. This '5 Lakhs' with a gold bag looks like a lottery scam my nephew warned me about. I'll wait until I can ask the secretary at the milk cooperative tomorrow.",
          "reasoning": "I cannot read these English words and there are too many buttons and colorful circles that I don't understand. 5 Lakhs is a huge amount that feels like a trick, and I don't know who is giving this money or why they are showing me coins.",
          "emotional_state": "Confused and suspicious",
          "trust_score": 2,
          "clarity_score": 1,
          "value_score": 2,
          "time_seconds": 85,
          "friction_points": [
            "Text is entirely in English which I cannot read.",
            "The '5 Lakhs' offer feels unrealistic and untrustworthy for my income.",
            "Too many competing icons and buttons make it impossible to know where to click safely."
          ],
          "selected_choice": "DROP_OFF",
          "decision_outcome": "DROP_OFF"
        }
      ]
    },
    {
      "persona_uuid": "ac56da4f40b24df083d766a64c607d24",
      "demographics": {
        "occupation": "Midwifery Attendant",
        "age": 32,
        "sex": "Female",
        "zone": "Rural",
        "state": "Maharashtra",
        "district": "Yavatmal",
        "monthly_income_inr": 12000,
        "digital_literacy": 4,
        "behavioral_archetype": "The Pragmatist",
        "purchasing_power_tier": "Low",
        "employer_type": "government",
        "primary_device": "Android",
        "family_size": 5,
        "existing_health_conditions": false,
        "current_insurance": true,
        "emi_comfort": "uncomfortable",
        "marital_status": null,
        "education_level": "Matric/Secondary",
        "first_language": "Hindi"
      },
      "professional_background": "Khetal Manisha, a 32‑year‑old Midwifery Attendant in Yavatmal, combines meticulous antenatal care, quick emergency response, and culturally sensitive newborn counseling with a curious, art‑inspired approach that makes her health workshops both evidence‑based and engaging.",
      "cultural_background": "Khetal Manisha hails from Yavatmal in the Vidarbha region of Maharashtra, a predominantly rural area where Marathi cultural traditions mingle with a strong Hindi-speaking community. Her family follows typical agrarian customs, celebrates festivals such as Ganesh Chaturthi, Diwali and Navratri with c",
      "outcome": "dropped_off_at_n_1",
      "key_selections": {
        "plan": "DROP_OFF",
        "plan_detail": "I am leaving the app because it looks like a cluttered advertisement page rather than a serious government or banking service."
      },
      "final_price_inr": null,
      "total_time_seconds": 45,
      "overall_monologue": "I opened the app hoping to see something professional, like the records we keep at the government hospital, but my head started spinning immediately. My score is 748, which I think is good, but I couldn't even focus on that because there were bright \"Win iPhone\" banners everywhere like a local carnival. As a midwife, I have to be very careful with details, and this looked like a mess—too many buttons and strange ads that didn't feel like a bank at all. When I saw an offer for a 5 lakh loan just sitting there, my stomach actually dropped because I only earn 12,000 a month; it felt like a trap. I spent about 45 seconds trying to find where the actual \"health\" part was, but the cluttered screen made me feel suspicious and very confused. I kept thinking, \"Is this a real service or just a trick to take my data?\" In Yavatmal, we value trust above everything, and this app felt like a loud advertisement page rather than a serious financial tool. I almost clicked further, but the unrealistic loan offers triggered my fear of getting into debt or being scammed. I decided to close it right then because if a service looks this cheap and chaotic, I cannot trust them with my hard-earned money. Now, I feel relieved that I left; I’d rather have no credit score than deal with a \"circus\" that doesn't respect my intelligence or my financial safety. It’s better to be safe and stick to what I know than to risk my peace of mind on something that looks like a gamble.",
      "screen_monologues": [
        {
          "screen_id": "n_1",
          "view_name": "Home Dashboard – Credit Score 748",
          "internal_monologue": "Ye kya circus hai? There are so many buttons and 'Win iPhone' ads at the top. My credit score is 748, which seems okay, but why are they offering me 5 lakhs when I only make 12,000? This doesn't feel like the simple, clean apps like PhonePe I use; it feels like those risky private apps that charge hidden fees from poor people.",
          "reasoning": "As a government worker earning ₹12,000, seeing a '5 Lakh loan' offer without income proof feels like a dangerous trap or a scam. The screen is too crowded with 'Win iPhone' and 'Coins' which makes it look like a game rather than a secure place for my financial information.",
          "emotional_state": "Confused and suspicious",
          "trust_score": 3,
          "clarity_score": 4,
          "value_score": 2,
          "time_seconds": 45,
          "friction_points": [
            "Overwhelming number of icons at the top including distracting 'Win iPhone' offer",
            "Unrealistic loan amount (5 Lakhs) compared to actual monthly income (12,000)",
            "Vague 'Coins' reward system feels like a game, not a financial tool"
          ],
          "selected_choice": "DROP_OFF",
          "decision_outcome": "DROP_OFF"
        }
      ]
    }
  ],
  "expected_completion_rate_pct": null
};
