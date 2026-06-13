import type { FlowAnalysisData } from "@/types/flow-analysis";

/**
 * Daily Mantra - Flow Analysis data for the Vedic Mantra app onboarding simulation.
 * Maps the 6-screen onboarding flow (Phone -> OTP -> Language -> Intent -> Vedic Analysis -> Paywall)
 * into the FlowAnalysisData shape consumed by FlowAnalysisView.
 */
export const dailymantraFlowAnalysisData: FlowAnalysisData = {
  "meta": {
    "product": "Daily Mantra",
    "flow": "Vedic Mantra App Onboarding",
    "date": "April 2026",
    "totalPersonas": 50,
    "completionRate": 58
  },
  "screens": [
    {
      "id": "S1",
      "label": "Phone Number Entry",
      "order": 1
    },
    {
      "id": "S2",
      "label": "OTP Verification",
      "order": 2
    },
    {
      "id": "S3",
      "label": "Language Selection",
      "order": 3
    },
    {
      "id": "S4",
      "label": "Intent Selection",
      "order": 4
    },
    {
      "id": "S5",
      "label": "Vedic Analysis Loading",
      "order": 5
    },
    {
      "id": "S6",
      "label": "Subscription Paywall",
      "order": 6
    }
  ],
  "funnel": [
    {
      "screen": "S1",
      "entered": 50,
      "dropped": 4
    },
    {
      "screen": "S2",
      "entered": 46,
      "dropped": 2
    },
    {
      "screen": "S3",
      "entered": 44,
      "dropped": 1
    },
    {
      "screen": "S4",
      "entered": 43,
      "dropped": 2
    },
    {
      "screen": "S5",
      "entered": 41,
      "dropped": 1
    },
    {
      "screen": "S6",
      "entered": 40,
      "dropped": 11
    }
  ],
  "rootCauses": [
    {
      "id": "RC1",
      "screen": "S1",
      "title": "Phone Number Entry - Privacy Barrier",
      "detail": "Users expect to understand app value before giving phone numbers 4% of personas drop immediately, missing ~2000 users/month",
      "affectedPersonas": [
        "U001",
        "U002",
        "U025",
        "U026"
      ],
      "severity": "high"
    },
    {
      "id": "RC2",
      "screen": "S6",
      "title": "Subscription Paywall - Paywall Before Value",
      "detail": "Dark pattern: ₹1 feels like bait, immediate ₹99 becomes visible after trial 27.5% drop at paywall = biggest funnel leak, ~8500 lost conversions/month",
      "affectedPersonas": [
        "U005",
        "U010",
        "U020",
        "U023",
        "U032"
      ],
      "severity": "critical"
    },
    {
      "id": "RC3",
      "screen": "S1",
      "title": "Phone Number Entry - Language Barrier",
      "detail": "Non-Hindi users feel excluded; no English explanation of app purpose Limits appeal to English-speaking segments; ~1200 users/month miss out",
      "affectedPersonas": [
        "U007",
        "U012",
        "U027",
        "U028"
      ],
      "severity": "high"
    },
    {
      "id": "RC4",
      "screen": "S6",
      "title": "Subscription Paywall - Dark Pattern / Trust Issue",
      "detail": "Classic dark pattern: cheap bait followed by expensive trap Damages brand trust; ~3600 users/month leave frustrated",
      "affectedPersonas": [
        "U015",
        "U018",
        "U030",
        "U035"
      ],
      "severity": "high"
    },
    {
      "id": "RC5",
      "screen": "S5",
      "title": "Vedic Analysis Loading - No Content Preview",
      "detail": "Users never see what they're paying for until after purchase Reduces confidence in purchase decision; ~750 users/month bounce",
      "affectedPersonas": [
        "U040",
        "U042",
        "U050"
      ],
      "severity": "high"
    }
  ],
  "oneBet": {
    "title": "Replace ₹1 bait with transparent free trial messaging",
    "rationale": "₹1 → ₹99 triggers dark pattern perception; 27.5% drop at paywall Screen shows '7 दिन FREE Trial' - no payment required upfront, ₹99/month only after trial ends",
    "effort": "Low",
    "impact": "High",
    "projectedCompletion": "70-75%",
    "currentCompletion": 58,
    "personas": [
      "Curious Seeker",
      "Tech-Savvy Youth",
      "Skeptical Rationalist"
    ],
    "whatChanges": [
      {
        "number": "+1",
        "title": "Remove Dark Pattern Pricing",
        "description": "Replace ₹1 bait with a clear 7-day free trial messaging. Charge ₹99 only after trial ends.",
        "icon": "shield",
        "benefit": "Regains skeptic trust"
      },
      {
        "number": "+2",
        "title": "Stream Preview Mantra",
        "description": "Play a 30-60 second personalized mantra with recitation before showing the paywall CTA.",
        "icon": "play-circle",
        "benefit": "Proves value before payment"
      },
      {
        "number": "+3",
        "title": "Add Privacy Assurance",
        "description": "Add a 2-line value prop and privacy badge above the phone input field.",
        "icon": "lock",
        "benefit": "Recovers 5% at entry"
      }
    ]
  },
  "personas": [
    {
      "id": "PU001",
      "name": "Taught Vedic philosophy for 30 years",
      "role": "Retired Vedic Scholar, 58",
      "city": "Varanasi",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Rajesh Kumar (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Rajesh Kumar considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU002",
      "name": "Runs a yoga center",
      "role": "Yoga Instructor, 42",
      "city": "Coimbatore",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Lakshmi Devi (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Lakshmi Devi considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU003",
      "name": "Manages Veerabhadreshwara temple for 20 years",
      "role": "Temple Administrator, 55",
      "city": "Bengaluru",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Hari Prasad (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Hari Prasad considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU004",
      "name": "Homemaker",
      "role": "Homemaker, 48",
      "city": "Indore",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Savitri Sharma (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Savitri Sharma considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU005",
      "name": "Served 35 years in army",
      "role": "Retired Army Officer, 60",
      "city": "Jaipur",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Govind Singh (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Govind Singh considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU006",
      "name": "Combines Ayurveda with spiritual wellness",
      "role": "Ayurvedic Doctor, 45",
      "city": "South Delhi",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Meera Kapoor (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Meera Kapoor considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU007",
      "name": "Third-generation textile businessman",
      "role": "Business Owner (Textile), 52",
      "city": "Ahmedabad",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Anand Desai (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Anand Desai considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU008",
      "name": "Performs in temples and cultural events",
      "role": "Classical Dancer (Bharatanatyam), 36",
      "city": "Kochi",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Priya Nambiar (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Priya Nambiar considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU009",
      "name": "Vedic astrologer with 20-year practice",
      "role": "Astrologer, 50",
      "city": "Kolkata",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Bharat Agrawal (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Bharat Agrawal considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU010",
      "name": "Manages temple rituals",
      "role": "Temple Priest, 44",
      "city": "Nashik",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Sunita Mahajan (Devout Believer)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Sunita Mahajan considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं। ठीक है, कर दूंगा।",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU011",
      "name": "Teaches Sanskrit in school",
      "role": "Sanskrit Teacher, 38",
      "city": "Ayodhya",
      "lamfExp": "N/A",
      "urgency": "Devout Believer",
      "need": "Journey of Deepak Pandit (Devout Believer)",
      "fear": "",
      "outcome": "dropped",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 3,
          "gutReaction": "देवी की दया से... एक मंत्र ऐप मिल गया। यह तो ठीक है, हमने तो काशी में भी फोन नंबर दिया है। भगवान सुरक्षित रखेंगे।",
          "reasoning": "Deepak Pandit considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "OTP आ गया? भगवान का संकेत है शायद। हां, यह डालता हूं।",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी ही सही है। वेद तो हिंदी में ही सुंदर लगते हैं।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "धन तो देवी का दिया है। पर शांति सबसे जरूरी है। हां, मन की शांति चुनता हूं।",
          "reasoning": "Choosing intent based on Devout Believer priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "drop",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "ओह! वेद पढ़ रहे हैं? यह तो बहुत गंभीर है। अपेक्षा में हूं।",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        }
      ],
      "dropScreen": "S5"
    },
    {
      "id": "PU012",
      "name": "Works at fintech startup",
      "role": "Marketing Manager, 28",
      "city": "Kolkata",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Ananya Ghosh (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Ananya Ghosh considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU013",
      "name": "Works at product company",
      "role": "Software Engineer, 26",
      "city": "Pune",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Vikram Patel (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Vikram Patel considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU014",
      "name": "Recently promoted",
      "role": "HR Professional, 31",
      "city": "Gurgaon",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Neha Singh (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Neha Singh considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU015",
      "name": "Makes wellness videos on YouTube",
      "role": "Content Creator, 24",
      "city": "Chennai",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Rohit Krishnan (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Rohit Krishnan considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU016",
      "name": "Trains teams",
      "role": "Corporate Trainer, 32",
      "city": "Hyderabad",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Isha Reddy (Curious Seeker)",
      "fear": "",
      "outcome": "dropped",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Isha Reddy considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "drop",
          "trustScore": 3,
          "clarityScore": 6,
          "gutReaction": "Wait, so I have to pay before seeing ANY content? This feels like a bait-and-switch.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "frictionPoints": [
            "FP_002",
            "FP_004"
          ],
          "missing": ""
        }
      ],
      "dropScreen": "S6"
    },
    {
      "id": "PU017",
      "name": "Creative professional",
      "role": "Freelance Designer, 27",
      "city": "Chandigarh",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Sanjay Malhotra (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Sanjay Malhotra considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU018",
      "name": "News journalist",
      "role": "Journalist, 29",
      "city": "Kolkata",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Priya Banerjee (Curious Seeker)",
      "fear": "",
      "outcome": "dropped",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Priya Banerjee considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "drop",
          "trustScore": 3,
          "clarityScore": 6,
          "gutReaction": "Wait, so I have to pay before seeing ANY content? This feels like a bait-and-switch.",
          "reasoning": "Evaluating rejecting subscription based on value perception",
          "frictionPoints": [
            "FP_002",
            "FP_004"
          ],
          "missing": ""
        }
      ],
      "dropScreen": "S6"
    },
    {
      "id": "PU019",
      "name": "Works at consulting firm",
      "role": "Management Consultant, 30",
      "city": "Kochi",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Arjun Nair (Curious Seeker)",
      "fear": "",
      "outcome": "completed",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Arjun Nair considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S5",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 5,
          "gutReaction": "Reading Vedic scriptures? This is interesting. Let me see what they recommend.",
          "reasoning": "Waiting to see personalized mantra recommendations",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S6",
          "decision": "continue",
          "trustScore": 4,
          "clarityScore": 6,
          "gutReaction": "₹99/month is reasonable for an app. But the ₹1 thing feels a bit... off. Let me proceed.",
          "reasoning": "Evaluating accepting subscription based on value perception",
          "frictionPoints": [
            "FP_002"
          ],
          "missing": ""
        }
      ]
    },
    {
      "id": "PU020",
      "name": "Holistic health professional",
      "role": "Nutritionist, 26",
      "city": "Bengaluru",
      "lamfExp": "N/A",
      "urgency": "Curious Seeker",
      "need": "Journey of Divya Shankar (Curious Seeker)",
      "fear": "",
      "outcome": "dropped",
      "journey": [
        {
          "screen": "S1",
          "decision": "continue",
          "trustScore": 7,
          "clarityScore": 3,
          "gutReaction": "इंटरेस्टिंग है। एक बार ट्राई करते हैं। मेडिटेशन के लिए फोन नंबर तो ठीक है। ज्यादा तर ऐप्स यही मांगते हैं।",
          "reasoning": "Divya Shankar considers whether to proceed based on segment values",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S2",
          "decision": "continue",
          "trustScore": 6,
          "clarityScore": 8,
          "gutReaction": "Standard verification. Let me enter the OTP.",
          "reasoning": "Proceeding with verification",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S3",
          "decision": "continue",
          "trustScore": 5,
          "clarityScore": 8,
          "gutReaction": "हिंदी चल जाएगी, या English भी हो सकता है। हिंदी ही रहने दो।",
          "reasoning": "Choosing language based on preference",
          "frictionPoints": [],
          "missing": ""
        },
        {
          "screen": "S4",
          "decision": "drop",
          "trustScore": 6,
          "clarityScore": 7,
          "gutReaction": "Peace of mind sounds good. I could use some stress relief.",
          "reasoning": "Choosing intent based on Curious Seeker priorities",
          "frictionPoints": [],
          "missing": ""
        }
      ],
      "dropScreen": "S4"
    }
  ],
  "dropReasons": {
    "S1": "Privacy concerns without clear value prop",
    "S2": "OTP delay or impatience",
    "S3": "Language barrier or exclusion",
    "S4": "Intent options feel gimmicky",
    "S5": "Lack of preview content builds doubt",
    "S6": "₹1 bait followed by ₹99 recurring charge - dark pattern detection"
  },
  "dropPersonas": {
    "S1": [
      "Skeptical Rationalist 60413",
      "Skeptical Rationalist 60413",
      "Anxious Solution-Seeker 60413",
      "Tech-Savvy Youth 60413"
    ],
    "S2": [
      "Skeptical Rationalist 60413",
      "Anxious Solution-Seeker 60413",
      "Tech-Savvy Youth 60413",
      "Anxious Solution-Seeker 60413"
    ],
    "S3": [
      "Skeptical Rationalist 60413",
      "Tech-Savvy Youth 60413"
    ],
    "S4": [
      "Curious Seeker 60413",
      "Skeptical Rationalist 60413",
      "Skeptical Rationalist 60413",
      "Tech-Savvy Youth 60413"
    ],
    "S5": [
      "Devout Believer 60413"
    ],
    "S6": [
      "Curious Seeker 60413",
      "Curious Seeker 60413",
      "Skeptical Rationalist 60413",
      "Anxious Solution-Seeker 60413",
      "Tech-Savvy Youth 60413",
      "Tech-Savvy Youth 60413",
      "Skeptical Rationalist 60413",
      "Curious Seeker 60413"
    ]
  },
  "patterns": [
    {
      "stat": "27.5%",
      "title": "Quick exit at paywall from dark pattern detection",
      "description": "Skeptics spot the ₹1 bait and ₹99 recurring setup within seconds and exit immediately."
    },
    {
      "stat": "34%",
      "title": "Trust-based conversion among Devout Believers and Anxious Seekers",
      "description": "Users with spiritual readiness convert willingly at ₹99/month, treating the app as a spiritual aid rather than a consumer product."
    },
    {
      "stat": "8%",
      "title": "Privacy hesitation at phone entry",
      "description": "Users exit before entering their phone number because they see no value prop or privacy assurance on the first screen."
    }
  ],
  "quotes": [
    {
      "quote": "फोन नंबर पहले से ही खतरे में है। यह भी डेटा एकत्र करने वाली ऐप होगी।",
      "attribution": "Skeptical Rationalist - Dropped at S1",
      "dropScreen": "S1"
    },
    {
      "quote": "₹1 then ₹99? No free trial of actual content? That's sketchy. I'm out.",
      "attribution": "Tech-Savvy Youth - Dropped at S6",
      "dropScreen": "S6"
    },
    {
      "quote": "वेद तो हिंदी में ही सुंदर लगते हैं। यह तो ठीक है।",
      "attribution": "Devout Believer - Completed",
      "dropScreen": ""
    },
    {
      "quote": "₹99 महीना? समय के साथ सब बदल गया। पर सच में मंत्र कीमती हैं।",
      "attribution": "Devout Believer - Completed",
      "dropScreen": ""
    }
  ]
};
