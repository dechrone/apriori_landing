/**
 * Daily Mantra - Indian Vedic Mantra App Onboarding.
 * 50 synthetic Indian personas across Devout Believer, Curious Seeker, Skeptical Rationalist,
 * Anxious Solution-Seeker, and Tech-Savvy Youth archetypes.
 * Flow: Phone Number -> OTP -> Language Selection -> Intent Selection -> Vedic Analysis -> Paywall.
 * Used as sample/demo data for the simulation report UI.
 *
 * NOTE: intentionally untyped.
 */
export const dailymantraSimData = {
  "simulation_id": "daily-mantra-onboarding-sim-20260413-001",
  "flow_id": "daily_mantra_onboarding_v1",
  "flow_name": "Daily Mantra - Vedic Mantra App Onboarding",
  "generated_at": "2026-04-13T10:00:00.000000+00:00",
  "summary": {
    "total_personas": 50,
    "completed": 29,
    "dropped_off": 21,
    "completion_rate_pct": 58.0,
    "avg_time_to_complete_seconds": 109,
    "dominant_plan": "₹99/month",
    "dominant_plan_pct": 100
  },
  "sample_quality": {
    "sample_size": 50,
    "margin_of_error_pct": 9.0,
    "confidence_level": "90%",
    "note": "Sample size of 50 provides directional signal at 90% confidence (±9%). Scale to 200+ for statistically significant sub-segment comparisons."
  },
  "plan_distribution": {},
  "addon_adoption": {
    "with_addon": {
      "count": 0,
      "pct": 0
    },
    "skipped": {
      "count": 29,
      "pct": 100
    }
  },
  "funnel_drop_off": [
    {
      "screen_id": "phone_number",
      "drop_offs": 4,
      "drop_off_pct": 8.0
    },
    {
      "screen_id": "otp_verify",
      "drop_offs": 2,
      "drop_off_pct": 4.3
    },
    {
      "screen_id": "language_select",
      "drop_offs": 1,
      "drop_off_pct": 2.3
    },
    {
      "screen_id": "intent_select",
      "drop_offs": 2,
      "drop_off_pct": 4.7
    },
    {
      "screen_id": "vedic_analysis",
      "drop_offs": 1,
      "drop_off_pct": 2.4
    },
    {
      "screen_id": "paywall",
      "drop_offs": 11,
      "drop_off_pct": 27.5
    }
  ],
  "top_friction_points": [
    {
      "friction": "Users expect to understand app value before giving phone numbers",
      "frequency": 16
    },
    {
      "friction": "Dark pattern: ₹1 feels like bait, immediate ₹99 becomes visible after trial",
      "frequency": 55
    },
    {
      "friction": "Non-Hindi users feel excluded; no English explanation of app purpose",
      "frequency": 8
    },
    {
      "friction": "Classic dark pattern: cheap bait followed by expensive trap",
      "frequency": 24
    },
    {
      "friction": "Users never see what they're paying for until after purchase",
      "frequency": 5
    }
  ],
  "screen_metrics": {
    "phone_number": {
      "avg_trust": 5.4,
      "avg_clarity": 3.0,
      "avg_value": 0.0,
      "avg_time_s": 16.7,
      "sample_size": 50
    },
    "otp_verify": {
      "avg_trust": 5.87,
      "avg_clarity": 8.0,
      "avg_value": 0.0,
      "avg_time_s": 12.4,
      "sample_size": 46
    },
    "language_select": {
      "avg_trust": 5.0,
      "avg_clarity": 8.0,
      "avg_value": 0.0,
      "avg_time_s": 6.0,
      "sample_size": 42
    },
    "intent_select": {
      "avg_trust": 6.0,
      "avg_clarity": 7.0,
      "avg_value": 3.0,
      "avg_time_s": 15.0,
      "sample_size": 40
    },
    "vedic_analysis": {
      "avg_trust": 5.0,
      "avg_clarity": 5.0,
      "avg_value": 4.0,
      "avg_time_s": 18.0,
      "sample_size": 36
    },
    "paywall": {
      "avg_trust": 3.77,
      "avg_clarity": 6.0,
      "avg_value": 3.54,
      "avg_time_s": 25.0,
      "sample_size": 35
    }
  },
  "executive_summary": "Daily Mantra converts 58% of 50 synthetic Indian personas. The biggest funnel leak is the subscription paywall, where a ₹1 bait/₹99 recurring pattern causes 27.5% of users to drop. Privacy concerns at phone entry (8%) and segment-level distrust among Skeptical Rationalists (0% conversion) are secondary issues. Devout Believers (83%) and Anxious Solution-Seekers (70%) drive conversion via spiritual trust.",
  "segments_used": [
    "Devout Believer",
    "Curious Seeker",
    "Skeptical Rationalist",
    "Anxious Solution-Seeker",
    "Tech-Savvy Youth"
  ],
  "persona_details": [
    {
      "persona_uuid": "DM_SIM_U001_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 58,
        "occupation": "Retired Vedic Scholar",
        "district": "Varanasi",
        "state": "Uttar Pradesh",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 35000,
        "digital_literacy": 6,
        "education_level": "MA Vedic Studies",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Taught Vedic philosophy for 30 years, now mentoring younger generation",
      "cultural_background": "Brahmin family, daily puja practitioner, believes in cosmic consciousness",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Rajesh Kumar (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Rajesh Kumar considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U002_20260413",
      "demographics": {
        "first_language": "Tamil",
        "age": 42,
        "occupation": "Yoga Instructor",
        "district": "Coimbatore",
        "state": "Tamil Nadu",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 45000,
        "digital_literacy": 7,
        "education_level": "BFA Yoga",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Runs a yoga center, certified in pranayama techniques",
      "cultural_background": "Follows Sanatana Dharma strictly, family has been yoga practitioners for 3 generations",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Lakshmi Devi (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Lakshmi Devi considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U003_20260413",
      "demographics": {
        "first_language": "Kannada",
        "age": 55,
        "occupation": "Temple Administrator",
        "district": "Bengaluru",
        "state": "Karnataka",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 52000,
        "digital_literacy": 5,
        "education_level": "12th Standard",
        "family_size": 5,
        "primary_device": "Android"
      },
      "professional_background": "Manages Veerabhadreshwara temple for 20 years, deeply versed in rituals",
      "cultural_background": "Devout Shaivite, performs rituals daily, believes in divine intervention",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Hari Prasad (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Hari Prasad considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U004_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 48,
        "occupation": "Homemaker",
        "district": "Indore",
        "state": "Madhya Pradesh",
        "zone": "Central",
        "sex": "F",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 15000,
        "digital_literacy": 4,
        "education_level": "BA",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Homemaker, manages household spirituality practices, leads women's temple groups",
      "cultural_background": "Conservative family, believes mantras can heal family relationships",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "रिश्तों में प्रेम"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Savitri Sharma (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Savitri Sharma considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "रिश्तों में प्रेम"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U005_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 60,
        "occupation": "Retired Army Officer",
        "district": "Jaipur",
        "state": "Rajasthan",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 85000,
        "digital_literacy": 6,
        "education_level": "BSc",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Served 35 years in army, now mentors youth in martial discipline",
      "cultural_background": "Believes in Kshatriya dharma, practices meditation, family warrior legacy",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "शौर्य-बल"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Govind Singh (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Govind Singh considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "शौर्य-बल"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U006_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 45,
        "occupation": "Ayurvedic Doctor",
        "district": "South Delhi",
        "state": "Delhi",
        "zone": "North",
        "sex": "F",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 78000,
        "digital_literacy": 7,
        "education_level": "BAMS",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Combines Ayurveda with spiritual wellness, 15 years practice",
      "cultural_background": "Family Ayurvedic tradition, believes in holistic health through mantras",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Meera Kapoor (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Meera Kapoor considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U007_20260413",
      "demographics": {
        "first_language": "Gujarati",
        "age": 52,
        "occupation": "Business Owner (Textile)",
        "district": "Ahmedabad",
        "state": "Gujarat",
        "zone": "West",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 150000,
        "digital_literacy": 6,
        "education_level": "BA Commerce",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Third-generation textile businessman, donates to temples regularly",
      "cultural_background": "Jain-influenced Hindu, performs Lakshmi pooja before business deals",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "धन लाभ"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Anand Desai (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Anand Desai considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "धन लाभ"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U008_20260413",
      "demographics": {
        "first_language": "Malayalam",
        "age": 36,
        "occupation": "Classical Dancer (Bharatanatyam)",
        "district": "Kochi",
        "state": "Kerala",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 55000,
        "digital_literacy": 8,
        "education_level": "BFA Performance Arts",
        "family_size": 2,
        "primary_device": "iPhone"
      },
      "professional_background": "Performs in temples and cultural events, teaches 40+ students",
      "cultural_background": "Comes from Natya family, believes in Natyashastra as spiritual practice",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Priya Nambiar (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Priya Nambiar considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U009_20260413",
      "demographics": {
        "first_language": "Bengali",
        "age": 50,
        "occupation": "Astrologer",
        "district": "Kolkata",
        "state": "West Bengal",
        "zone": "East",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 60000,
        "digital_literacy": 7,
        "education_level": "MA Sanskrit",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Vedic astrologer with 20-year practice, counsels hundreds",
      "cultural_background": "Family astrology tradition, deeply knowledgeable about Vedic sciences",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "धन लाभ"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Bharat Agrawal (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Bharat Agrawal considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "धन लाभ"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U010_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 44,
        "occupation": "Temple Priest",
        "district": "Nashik",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 25000,
        "digital_literacy": 5,
        "education_level": "12th Standard",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Manages temple rituals, leads devotional singing (bhajans)",
      "cultural_background": "From priestly lineage, performs pujas daily, believes in divine presence",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Sunita Mahajan (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Sunita Mahajan considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U011_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 38,
        "occupation": "Sanskrit Teacher",
        "district": "Ayodhya",
        "state": "Uttar Pradesh",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 32000,
        "digital_literacy": 6,
        "education_level": "MA Sanskrit",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Teaches Sanskrit in school, publishes research on Vedic texts",
      "cultural_background": "Comes from Brahmin scholar family, practices rituals",
      "outcome": "dropped_off_at_vedic_analysis",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Deepak Pandit (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Deepak Pandit considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U012_20260413",
      "demographics": {
        "first_language": "Bengali",
        "age": 28,
        "occupation": "Marketing Manager",
        "district": "Kolkata",
        "state": "West Bengal",
        "zone": "East",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 65000,
        "digital_literacy": 9,
        "education_level": "MBA",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Works at fintech startup, interested in wellness trends",
      "cultural_background": "Urban, modern family, trying to reconnect with Indian roots",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Ananya Ghosh (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Ananya Ghosh considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U013_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 26,
        "occupation": "Software Engineer",
        "district": "Pune",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 95000,
        "digital_literacy": 9,
        "education_level": "BTech Computer Science",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Works at product company, experimenting with meditation",
      "cultural_background": "Tech-savvy but parents are traditional, seeking middle ground",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Vikram Patel (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Vikram Patel considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U014_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 31,
        "occupation": "HR Professional",
        "district": "Gurgaon",
        "state": "Delhi",
        "zone": "North",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 75000,
        "digital_literacy": 9,
        "education_level": "PGDM HR",
        "family_size": 2,
        "primary_device": "iPhone"
      },
      "professional_background": "Recently promoted, dealing with burnout, exploring mindfulness",
      "cultural_background": "Urban professional, believes in science but open to spirituality",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Neha Singh (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Neha Singh considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U015_20260413",
      "demographics": {
        "first_language": "Tamil",
        "age": 24,
        "occupation": "Content Creator",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 45000,
        "digital_literacy": 10,
        "education_level": "BA",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Makes wellness videos on YouTube, curious about mantras for content",
      "cultural_background": "Young, internet-native, exploring spirituality through digital lens",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Rohit Krishnan (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Rohit Krishnan considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U016_20260413",
      "demographics": {
        "first_language": "Telugu",
        "age": 32,
        "occupation": "Corporate Trainer",
        "district": "Hyderabad",
        "state": "Telangana",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 70000,
        "digital_literacy": 8,
        "education_level": "BTech + Certification",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Trains teams, interested in holistic employee wellness",
      "cultural_background": "Modern family, trying spirituality experimentally",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Isha Reddy (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Isha Reddy considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "Wait, so I have to pay before seeing ANY content? This feels like a bait-and-switch.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "disappointed",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U017_20260413",
      "demographics": {
        "first_language": "Punjabi",
        "age": 27,
        "occupation": "Freelance Designer",
        "district": "Chandigarh",
        "state": "Punjab",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 50000,
        "digital_literacy": 9,
        "education_level": "BFA Design",
        "family_size": 4,
        "primary_device": "iPhone"
      },
      "professional_background": "Creative professional, uses apps for inspiration and focus",
      "cultural_background": "Secular family, parents are spiritual, trying to find common ground",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Sanjay Malhotra (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Sanjay Malhotra considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U018_20260413",
      "demographics": {
        "first_language": "Bengali",
        "age": 29,
        "occupation": "Journalist",
        "district": "Kolkata",
        "state": "West Bengal",
        "zone": "East",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 55000,
        "digital_literacy": 9,
        "education_level": "MA English",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "News journalist, researching stories on spirituality trends",
      "cultural_background": "Rational but curious, skeptical of monetization",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Priya Banerjee (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Priya Banerjee considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "Wait, so I have to pay before seeing ANY content? This feels like a bait-and-switch.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "disappointed",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U019_20260413",
      "demographics": {
        "first_language": "Malayalam",
        "age": 30,
        "occupation": "Management Consultant",
        "district": "Kochi",
        "state": "Kerala",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 120000,
        "digital_literacy": 9,
        "education_level": "MBA IIM",
        "family_size": 2,
        "primary_device": "iPhone"
      },
      "professional_background": "Works at consulting firm, exploring meditation for focus",
      "cultural_background": "Upper-class, secular, but grandfather introduced him to mantras",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Arjun Nair (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Arjun Nair considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U020_20260413",
      "demographics": {
        "first_language": "Kannada",
        "age": 26,
        "occupation": "Nutritionist",
        "district": "Bengaluru",
        "state": "Karnataka",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 52000,
        "digital_literacy": 8,
        "education_level": "MSc Nutrition",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Holistic health professional, believes in mind-body connection",
      "cultural_background": "Modern but family-oriented, open-minded about traditions",
      "outcome": "dropped_off_at_intent_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 0,
      "total_time_seconds": 41,
      "overall_monologue": "Journey of Divya Shankar (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Divya Shankar considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U021_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 25,
        "occupation": "Graphic Designer",
        "district": "Jaipur",
        "state": "Rajasthan",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 42000,
        "digital_literacy": 9,
        "education_level": "Diploma in Design",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Design professional, appreciates the aesthetic of spiritual apps",
      "cultural_background": "Family is religious but he's casual about it",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Karan Verma (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Karan Verma considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U022_20260413",
      "demographics": {
        "first_language": "Bengali",
        "age": 24,
        "occupation": "Data Scientist",
        "district": "Kolkata",
        "state": "West Bengal",
        "zone": "East",
        "sex": "M",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 88000,
        "digital_literacy": 10,
        "education_level": "BTech + MSc Data Science",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Data scientist at AI firm, skeptical of unverified claims",
      "cultural_background": "Urban rationalist, parents traditional but he rejects superstition",
      "outcome": "dropped_off_at_phone_number",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 12,
      "overall_monologue": "Journey of Shaunak Dutta (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Shaunak Dutta considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001",
            "FP_001"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U023_20260413",
      "demographics": {
        "first_language": "Urdu",
        "age": 27,
        "occupation": "Software QA",
        "district": "Mumbai",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 55000,
        "digital_literacy": 8,
        "education_level": "BTech IT",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "QA engineer, logical thinker, tests everything",
      "cultural_background": "Modern Muslim family, skeptical of Hindu spiritual app",
      "outcome": "dropped_off_at_intent_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 41,
      "overall_monologue": "Journey of Aisha Khan (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Aisha Khan considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "Language doesn't matter if the content is questionable anyway.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "This is getting a bit too much like astrology. Why would mantras help 'career'?",
          "reasoning": "Choosing intent based on Skeptical Rationalist priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": null
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U024_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 32,
        "occupation": "Civil Engineer",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 65000,
        "digital_literacy": 6,
        "education_level": "BTech Civil Engineering",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Construction engineer, trained to think scientifically",
      "cultural_background": "Secular family, dismissive of religious apps",
      "outcome": "dropped_off_at_otp_verify",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 45,
      "overall_monologue": "Journey of Nitin Sharma (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Nitin Sharma considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U025_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 35,
        "occupation": "Physics Teacher",
        "district": "East Delhi",
        "state": "Delhi",
        "zone": "North",
        "sex": "F",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 48000,
        "digital_literacy": 7,
        "education_level": "MSc Physics",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Physics educator, believes only in evidence",
      "cultural_background": "Science-first mindset, dismissive of mantras",
      "outcome": "dropped_off_at_phone_number",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 12,
      "overall_monologue": "Journey of Shreya Saxena (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Shreya Saxena considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001",
            "FP_001"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U026_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 33,
        "occupation": "Financial Analyst",
        "district": "Gurgaon",
        "state": "Haryana",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 110000,
        "digital_literacy": 9,
        "education_level": "MBA Finance",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Financial professional, sees through marketing tactics",
      "cultural_background": "Upper middle class, atheist-leaning, sees apps as money grab",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "धन लाभ"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Rajesh Chopra (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Rajesh Chopra considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "Language doesn't matter if the content is questionable anyway.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "This is getting a bit too much like astrology. Why would mantras help 'career'?",
          "reasoning": "Choosing intent based on Skeptical Rationalist priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "धन लाभ"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Loading animation with 'Vedic analysis'? Probably just a random selection algorithm.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "This is exactly what I expected. Dark pattern city. Uninstalling now.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "frustrated",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U027_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 29,
        "occupation": "Doctor",
        "district": "Pune",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 95000,
        "digital_literacy": 8,
        "education_level": "MBBS",
        "family_size": 2,
        "primary_device": "iPhone"
      },
      "professional_background": "Medical doctor, trained in evidence-based medicine",
      "cultural_background": "Science-oriented, dismisses Vedic claims without evidence",
      "outcome": "dropped_off_at_intent_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 41,
      "overall_monologue": "Journey of Priya Deshmukh (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Priya Deshmukh considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "Language doesn't matter if the content is questionable anyway.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "This is getting a bit too much like astrology. Why would mantras help 'career'?",
          "reasoning": "Choosing intent based on Skeptical Rationalist priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": null
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U028_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 34,
        "occupation": "Economist",
        "district": "Patna",
        "state": "Bihar",
        "zone": "East",
        "sex": "M",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 72000,
        "digital_literacy": 7,
        "education_level": "MA Economics",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Economic researcher, analyzes data scientifically",
      "cultural_background": "Secular, dismissive of supernatural claims",
      "outcome": "dropped_off_at_language_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 26,
      "overall_monologue": "Journey of Arjun Mishra (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Arjun Mishra considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "Language doesn't matter if the content is questionable anyway.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U029_20260413",
      "demographics": {
        "first_language": "Tamil",
        "age": 42,
        "occupation": "Small Business Owner",
        "district": "Madurai",
        "state": "Tamil Nadu",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 38000,
        "digital_literacy": 4,
        "education_level": "10th Standard",
        "family_size": 5,
        "primary_device": "Android"
      },
      "professional_background": "Runs small shop, struggling financially",
      "cultural_background": "Family facing financial crisis, trying spiritual remedies",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "धन लाभ"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Suresh Kumar (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Suresh Kumar considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "धन लाभ"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U030_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 35,
        "occupation": "Homemaker",
        "district": "Jodhpur",
        "state": "Rajasthan",
        "zone": "North",
        "sex": "F",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 0,
        "digital_literacy": 3,
        "education_level": "12th Standard",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Homemaker dealing with family conflict",
      "cultural_background": "Traditional family, marriage issues, seeking divine help",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "रिश्तों में प्रेम"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Aarti Gupta (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Aarti Gupta considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "रिश्तों में प्रेम"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U031_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 38,
        "occupation": "Taxi Driver",
        "district": "South Delhi",
        "state": "Delhi",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 30000,
        "digital_literacy": 2,
        "education_level": "10th Standard",
        "family_size": 5,
        "primary_device": "Android"
      },
      "professional_background": "Taxi driver, struggling with financial stress",
      "cultural_background": "Working class, debt burden, but skeptical of paid apps",
      "outcome": "dropped_off_at_otp_verify",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 45,
      "overall_monologue": "Journey of Vikas Yadav (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Vikas Yadav considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U032_20260413",
      "demographics": {
        "first_language": "Malayalam",
        "age": 31,
        "occupation": "Nurse",
        "district": "Thiruvananthapuram",
        "state": "Kerala",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 42000,
        "digital_literacy": 6,
        "education_level": "Nursing Diploma",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Night shift nurse, dealing with burnout and anxiety",
      "cultural_background": "Health anxiety, seeking holistic healing approach",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Priti Nair (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Priti Nair considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U033_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 45,
        "occupation": "Factory Worker",
        "district": "Kanpur",
        "state": "Uttar Pradesh",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 28000,
        "digital_literacy": 2,
        "education_level": "8th Standard",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Factory worker, struggling with job security",
      "cultural_background": "Working class, believes in karma and divine protection",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "शौर्य-बल"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Ramesh Pandey (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Ramesh Pandey considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "शौर्य-बल"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U034_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 26,
        "occupation": "Call Center Agent",
        "district": "Patna",
        "state": "Bihar",
        "zone": "East",
        "sex": "F",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 25000,
        "digital_literacy": 5,
        "education_level": "12th Standard",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Call center agent, underpaid and exhausted",
      "cultural_background": "Relationship problems, seeking spiritual solution but can't afford",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "रिश्तों में प्रेम"
      },
      "final_price_inr": 0,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Pooja Sinha (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Pooja Sinha considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "रिश्तों में प्रेम"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99? हमारे पास तो महीने में ही ₹30,000 हैं। यह तो 3% है! बहुत ज्यादा है।",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "disappointed",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U035_20260413",
      "demographics": {
        "first_language": "Punjabi",
        "age": 50,
        "occupation": "Farmer",
        "district": "Ludhiana",
        "state": "Punjab",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 35000,
        "digital_literacy": 1,
        "education_level": "6th Standard",
        "family_size": 5,
        "primary_device": "Android"
      },
      "professional_background": "Farmer facing crop failure and debt",
      "cultural_background": "Rural, deeply spiritual but not tech-comfortable",
      "outcome": "dropped_off_at_phone_number",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 25,
      "overall_monologue": "Journey of Harendra Singh (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Harendra Singh considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U036_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 28,
        "occupation": "Freelance Writer",
        "district": "Nashik",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 32000,
        "digital_literacy": 7,
        "education_level": "BA English",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Freelancer, unstable income causing anxiety",
      "cultural_background": "Single, family pressure for marriage, seeking peace through spirituality",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Sneha Joshi (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Sneha Joshi considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U037_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 20,
        "occupation": "College Student",
        "district": "Delhi",
        "state": "Delhi",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 5000,
        "digital_literacy": 10,
        "education_level": "BTech Student",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Engineering student, interested in wellness but cash-strapped",
      "cultural_background": "Digital native, skeptical of paywalls, wants free content",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Aditya Malhotra (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Aditya Malhotra considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Wisdom seems like a good option. Let's try that.",
          "reasoning": "Choosing intent based on Tech-Savvy Youth priorities",
          "emotional_state": "neutral",
          "friction_points": [
            "FP_003"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "This mandala animation looks nice at least. But I wonder what they're actually analyzing.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹1 then ₹99? No free trial of actual content? That's sketchy. I'm out.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "frustrated",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U038_20260413",
      "demographics": {
        "first_language": "English",
        "age": 19,
        "occupation": "College Student",
        "district": "Panaji",
        "state": "Goa",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 3000,
        "digital_literacy": 10,
        "education_level": "BA Student",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Arts student, exploring interests casually",
      "cultural_background": "Cosmopolitan family, doesn't relate to traditional mantras",
      "outcome": "dropped_off_at_intent_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 41,
      "overall_monologue": "Journey of Zara Fernandes (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Zara Fernandes considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Wisdom seems like a good option. Let's try that.",
          "reasoning": "Choosing intent based on Tech-Savvy Youth priorities",
          "emotional_state": "neutral",
          "friction_points": [
            "FP_003"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": null
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U039_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 21,
        "occupation": "College Student",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 2000,
        "digital_literacy": 10,
        "education_level": "BCom Student",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Commerce student, no income",
      "cultural_background": "Young, impatient with apps, wants instant value",
      "outcome": "dropped_off_at_otp_verify",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 20,
      "overall_monologue": "Journey of Rohit Pandey (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Rohit Pandey considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U040_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 22,
        "occupation": "College Student",
        "district": "Gurgaon",
        "state": "Haryana",
        "zone": "North",
        "sex": "F",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 8000,
        "digital_literacy": 10,
        "education_level": "BTech Student",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Engineering student, early adopter of wellness apps",
      "cultural_background": "Urban youth, but finding meditation helps with exam stress",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Priya Kapoor (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Priya Kapoor considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Wisdom seems like a good option. Let's try that.",
          "reasoning": "Choosing intent based on Tech-Savvy Youth priorities",
          "emotional_state": "neutral",
          "friction_points": [
            "FP_003"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "This mandala animation looks nice at least. But I wonder what they're actually analyzing.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "Okay, ₹99 is not that expensive. Let me see if this is actually good.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U041_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 23,
        "occupation": "Junior Developer",
        "district": "Bengaluru",
        "state": "Karnataka",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 35000,
        "digital_literacy": 10,
        "education_level": "BTech Computer Science",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Junior developer, evaluates apps critically",
      "cultural_background": "Tech startup culture, dismissive of spiritual paywalls",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Yash Saxena (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Yash Saxena considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Wisdom seems like a good option. Let's try that.",
          "reasoning": "Choosing intent based on Tech-Savvy Youth priorities",
          "emotional_state": "neutral",
          "friction_points": [
            "FP_003"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "This mandala animation looks nice at least. But I wonder what they're actually analyzing.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹1 then ₹99? No free trial of actual content? That's sketchy. I'm out.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "frustrated",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U042_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 21,
        "occupation": "Intern",
        "district": "Mumbai",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 12000,
        "digital_literacy": 9,
        "education_level": "BA Student (Intern)",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Intern, very limited budget",
      "cultural_background": "Young urban, doesn't use phone for culture/spirituality",
      "outcome": "dropped_off_at_phone_number",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 12,
      "overall_monologue": "Journey of Meera Soni (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Meera Soni considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U043_20260413",
      "demographics": {
        "first_language": "Tamil",
        "age": 20,
        "occupation": "College Student",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 4000,
        "digital_literacy": 10,
        "education_level": "BBA Student",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "BBA student, interested in productivity optimization",
      "cultural_background": "Young but family-influenced, grandmother taught him mantras",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Arjun Bhat (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Arjun Bhat considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Wisdom seems like a good option. Let's try that.",
          "reasoning": "Choosing intent based on Tech-Savvy Youth priorities",
          "emotional_state": "neutral",
          "friction_points": [
            "FP_003"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "This mandala animation looks nice at least. But I wonder what they're actually analyzing.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "Okay, ₹99 is not that expensive. Let me see if this is actually good.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U044_20260413",
      "demographics": {
        "first_language": "Telugu",
        "age": 62,
        "occupation": "Vedic Chant Expert",
        "district": "Hyderabad",
        "state": "Andhra Pradesh",
        "zone": "South",
        "sex": "M",
        "behavioral_archetype": "Devout Believer",
        "monthly_income_inr": 48000,
        "digital_literacy": 5,
        "education_level": "MA Sanskrit",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Professionally trained in Vedic chanting for 40+ years",
      "cultural_background": "Family tradition of Vedic learning, performs at temples",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Vishnu Rao (Devout Believer)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Vishnu Rao considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U045_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 28,
        "occupation": "Startup Founder",
        "district": "Noida",
        "state": "Delhi",
        "zone": "North",
        "sex": "M",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 150000,
        "digital_literacy": 9,
        "education_level": "BTech",
        "family_size": 2,
        "primary_device": "iPhone"
      },
      "professional_background": "Tech entrepreneur experimenting with meditation for focus",
      "cultural_background": "Modern but grandfather was spiritual scholar",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 99,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Harsh Verma (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Harsh Verma considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U046_20260413",
      "demographics": {
        "first_language": "Gujarati",
        "age": 39,
        "occupation": "Self-Employed Tailor",
        "district": "Vadodara",
        "state": "Gujarat",
        "zone": "West",
        "sex": "F",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 22000,
        "digital_literacy": 3,
        "education_level": "10th Standard",
        "family_size": 5,
        "primary_device": "Android"
      },
      "professional_background": "Small business struggling during economic downturn",
      "cultural_background": "Traditional family, believes in destiny",
      "outcome": "dropped_off_at_otp_verify",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 45,
      "overall_monologue": "Journey of Nisha Patel (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Nisha Patel considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U047_20260413",
      "demographics": {
        "first_language": "Malayalam",
        "age": 22,
        "occupation": "College Student",
        "district": "Thiruvananthapuram",
        "state": "Kerala",
        "zone": "South",
        "sex": "F",
        "behavioral_archetype": "Tech-Savvy Youth",
        "monthly_income_inr": 6000,
        "digital_literacy": 10,
        "education_level": "BCS Student",
        "family_size": 4,
        "primary_device": "iPhone"
      },
      "professional_background": "Computer science student, very tech-savvy",
      "cultural_background": "Cosmopolitan family, not interested in spiritual apps",
      "outcome": "dropped_off_at_language_select",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": null
      },
      "final_price_inr": 0,
      "total_time_seconds": 26,
      "overall_monologue": "Journey of Sarika Iyer (Tech-Savvy Youth)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "Okay, phone verification is standard. Let me get through this quickly.",
          "reasoning": "Sarika Iyer considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "OTP received. Entering 4-digit code now.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी या English - doesn't really matter. Let's move on.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "DROP_OFF",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U048_20260413",
      "demographics": {
        "first_language": "Hindi",
        "age": 28,
        "occupation": "Systems Administrator",
        "district": "Bhopal",
        "state": "Madhya Pradesh",
        "zone": "Central",
        "sex": "M",
        "behavioral_archetype": "Skeptical Rationalist",
        "monthly_income_inr": 58000,
        "digital_literacy": 8,
        "education_level": "BTech IT",
        "family_size": 3,
        "primary_device": "Android"
      },
      "professional_background": "Systems admin working in IT sector",
      "cultural_background": "Secular, doesn't believe in superstition",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "बुद्धि-विवेक"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Vikrant Saxena (Skeptical Rationalist)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी। Delete करूंगा।",
          "reasoning": "Vikrant Saxena considers whether to proceed based on segment values",
          "emotional_state": "skeptical",
          "friction_points": [
            "FP_001"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 3,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "यह तो सब ठीक है, पर फिर भी डेटा चोरी होने का खतरा है।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "Language doesn't matter if the content is questionable anyway.",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "This is getting a bit too much like astrology. Why would mantras help 'career'?",
          "reasoning": "Choosing intent based on Skeptical Rationalist priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "बुद्धि-विवेक"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Loading animation with 'Vedic analysis'? Probably just a random selection algorithm.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "This is exactly what I expected. Dark pattern city. Uninstalling now.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "frustrated",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U049_20260413",
      "demographics": {
        "first_language": "Bengali",
        "age": 30,
        "occupation": "Pharmacist",
        "district": "Kolkata",
        "state": "West Bengal",
        "zone": "East",
        "sex": "F",
        "behavioral_archetype": "Curious Seeker",
        "monthly_income_inr": 62000,
        "digital_literacy": 7,
        "education_level": "B.Pharm",
        "family_size": 3,
        "primary_device": "iPhone"
      },
      "professional_background": "Pharmacist interested in wellness approaches",
      "cultural_background": "Modern family, exploring alternatives to medication",
      "outcome": "dropped_off_at_paywall",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "मन की शांति"
      },
      "final_price_inr": 0,
      "total_time_seconds": 84,
      "overall_monologue": "Journey of Ritika Bose (Curious Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Ritika Bose considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 7,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 12,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 8,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "मन की शांति"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "Wait, so I have to pay before seeing ANY content? This feels like a bait-and-switch.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "emotional_state": "disappointed",
          "friction_points": [
            "FP_002",
            "FP_004"
          ],
          "decision_outcome": "DROP_OFF",
          "trust_score": 3,
          "clarity_score": 6,
          "value_score": 2,
          "time_seconds": 25,
          "selected_choice": "Decline"
        }
      ]
    },
    {
      "persona_uuid": "DM_SIM_U050_20260413",
      "demographics": {
        "first_language": "Marathi",
        "age": 44,
        "occupation": "Security Guard",
        "district": "Aurangabad",
        "state": "Maharashtra",
        "zone": "West",
        "sex": "M",
        "behavioral_archetype": "Anxious Solution-Seeker",
        "monthly_income_inr": 18000,
        "digital_literacy": 2,
        "education_level": "8th Standard",
        "family_size": 4,
        "primary_device": "Android"
      },
      "professional_background": "Security worker, struggling to make ends meet",
      "cultural_background": "Working class, deep faith in divine intervention",
      "outcome": "completed",
      "key_selections": {
        "phone_number": "+91 98765 43210",
        "language": "Hindi",
        "intent": "धन लाभ"
      },
      "final_price_inr": 99,
      "total_time_seconds": 109,
      "overall_monologue": "Journey of Mohan Vaidya (Anxious Solution-Seeker)",
      "screen_monologues": [
        {
          "screen_id": "phone_number",
          "view_name": "Phone Number Entry",
          "internal_monologue": "मेरे धन के लिए कुछ भी करूंगा। फोन नंबर तो दे ही दूंगा। शायद यह मेरी किस्मत बदल दे।",
          "reasoning": "Mohan Vaidya considers whether to proceed based on segment values",
          "emotional_state": "curious",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 3,
          "value_score": 0,
          "time_seconds": 25,
          "selected_choice": "+91 98765 43210"
        },
        {
          "screen_id": "otp_verify",
          "view_name": "OTP Verification",
          "internal_monologue": "जल्दी करो, मुझे जानना है कि ये मंत्र कैसे काम करते हैं।",
          "reasoning": "Proceeding with verification",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 20,
          "selected_choice": "1234"
        },
        {
          "screen_id": "language_select",
          "view_name": "Language Selection",
          "internal_monologue": "जो भी हो, बस मंत्र सीखना है। हिंदी ठीक है।",
          "reasoning": "Choosing language based on preference",
          "emotional_state": "neutral",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 8,
          "value_score": 0,
          "time_seconds": 6,
          "selected_choice": "Hindi"
        },
        {
          "screen_id": "intent_select",
          "view_name": "Intent Selection",
          "internal_monologue": "धन लाभ चाहिए! हमें तो रुपये की जरूरत है सबसे ज्यादा।",
          "reasoning": "Choosing intent based on Anxious Solution-Seeker priorities",
          "emotional_state": "engaged",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 6,
          "clarity_score": 7,
          "value_score": 3,
          "time_seconds": 15,
          "selected_choice": "धन लाभ"
        },
        {
          "screen_id": "vedic_analysis",
          "view_name": "Vedic Analysis Loading",
          "internal_monologue": "आ गए? ये मंत्र मेरा भविष्य बदल देंगे? उम्मीद है।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "emotional_state": "hopeful",
          "friction_points": [],
          "decision_outcome": "CONTINUE",
          "trust_score": 5,
          "clarity_score": 5,
          "value_score": 4,
          "time_seconds": 18,
          "selected_choice": "wait"
        },
        {
          "screen_id": "paywall",
          "view_name": "Subscription Paywall",
          "internal_monologue": "सब कुछ देना पड़ता है। ये तो दुख ही है। पर धन के लिए यह कीमत ठीक है।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "emotional_state": "conflicted",
          "friction_points": [
            "FP_002"
          ],
          "decision_outcome": "CONTINUE",
          "trust_score": 4,
          "clarity_score": 6,
          "value_score": 4,
          "time_seconds": 25,
          "selected_choice": "Start Free Trial"
        }
      ]
    }
  ]
};
