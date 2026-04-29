import type { StudyData } from "@/types/study";

/**
 * Checkout Flow Simulation — study-format data for the new Overview tab.
 * This is the full JSON provided by the user, typed as StudyData.
 */
export const flentStudyData: StudyData = {
  study: {
    study_id: "APR_CHECKOUT_v02",
    study_name: "Checkout Flow Simulation",
    flow_name: "Onboarding → Dashboard → First Purchase",
    flow_version: "v02",
    date_run: "2026-01-15",
    total_users: 100,
    completed_users: 87,
    dropped_users: 13,
    failed_users: 0,
    completion_rate: 87,
    acquisition_channels: ["instagram_ad", "google_search", "referral"],
    personas_used: ["Pragmatist", "Skeptic", "Enthusiast", "Confused Novice"],
    persona_distribution: {
      Pragmatist: 30,
      Skeptic: 25,
      Enthusiast: 25,
      "Confused Novice": 20,
    },
    analysis_status: "complete",
  },

  executive_summary: {
    completion_rate: 87,
    sus_score: 67.3,
    sus_grade: "D",
    sus_label: "Poor",
    avg_seq: 3.65,
    critical_drop_point: "Checkout, Shipping Cost",
    critical_drop_pct: 18,
    top_findings: [
      {
        rank: 1,
        finding:
          "83% of users were surprised by a hidden shipping cost at final checkout, causing 18% to abandon",
      },
      {
        rank: 2,
        finding:
          "67% hesitated at the checkout CTA because the label didn't clarify whether it triggers an immediate charge",
      },
      {
        rank: 3,
        finding:
          "Confused Novice personas fail at onboarding, they never reach checkout at all",
      },
    ],
    top_recommendation: {
      headline: "Surface estimated shipping cost before checkout",
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
      overall: 87,
      ci_lower: 79.2,
      ci_upper: 92.4,
      by_persona: {
        Pragmatist: 81,
        Skeptic: 64,
        Enthusiast: 92,
        "Confused Novice": 55,
      },
    },
    sus: {
      mean: 67.3,
      grade: "D",
      label: "Poor",
      benchmark: 68,
      delta_from_benchmark: -0.7,
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
      distribution: { F: 12, D: 31, C: 28, B: 22, A: 7, "A+": 0 },
      by_persona: {
        Pragmatist: 71.2,
        Skeptic: 63.4,
        Enthusiast: 79.8,
        "Confused Novice": 54.6,
      },
    },
    seq_by_task: {
      onboarding: {
        avg: 4.2,
        benchmark: 5.5,
        delta: -1.3,
        flag: "needs_improvement",
        by_persona: {
          Pragmatist: 4.8,
          Skeptic: 3.9,
          Enthusiast: 5.6,
          "Confused Novice": 2.8,
        },
      },
      first_purchase: {
        avg: 3.1,
        benchmark: 5.5,
        delta: -2.4,
        flag: "very_difficult",
        by_persona: {
          Pragmatist: 3.8,
          Skeptic: 2.9,
          Enthusiast: 5.1,
          "Confused Novice": 1.9,
        },
      },
    },
  },

  emotional_fingerprint: {
    top_positive_tags: [
      { tag: "CONFIDENT", frequency_pct: 44 },
      { tag: "DELIGHTED", frequency_pct: 18 },
      { tag: "SURPRISED_POSITIVE", frequency_pct: 12 },
    ],
    top_negative_tags: [
      { tag: "CONFUSED", frequency_pct: 61 },
      { tag: "FRUSTRATED", frequency_pct: 48 },
      { tag: "ANXIOUS", frequency_pct: 43 },
      { tag: "PRICE_SHOCKED", frequency_pct: 38 },
      { tag: "DISTRUST", frequency_pct: 29 },
    ],
    overall_sentiment: "negative",
    sentiment_score: -0.31,
    most_emotional_step: "Checkout, Shipping Cost",
    smoothest_step: "Order Confirmation",
    by_persona: {
      Pragmatist: { dominant_tag: "CONFIDENT", sentiment: "neutral" },
      Skeptic: { dominant_tag: "DISTRUST", sentiment: "negative" },
      Enthusiast: { dominant_tag: "CONFIDENT", sentiment: "positive" },
      "Confused Novice": { dominant_tag: "CONFUSED", sentiment: "negative" },
    },
  },

  themes: [
    {
      theme_id: "T_001",
      rank: 1,
      theme_name: "Hidden costs erode trust at the final step",
      description:
        "Users approach checkout ready to complete the purchase, but the late reveal of shipping cost resets their confidence and triggers feelings of deception",
      frequency_pct: 83,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      supporting_codes: [
        { code_name: "Shipping_Cost_Revealed_Late", frequency_pct: 83 },
        { code_name: "Cart_Investment_Loss_Aversion", frequency_pct: 61 },
      ],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U023_20260115",
          persona_type: "Skeptic",
          text: "Oh wait, $15 shipping? I didn't see that coming. That changes things.",
        },
        {
          session_id: "APR_CHECKOUT_U061_20260115",
          persona_type: "Confused Novice",
          text: "Why didn't they show this earlier? I wasted 10 minutes.",
        },
      ],
      counter_evidence: {
        summary: "Enthusiasts expected the additional cost and were not affected",
        frequency_pct: 12,
      },
      quantitative_support: {
        completion_rate: 0.73,
        avg_seq: 3.1,
      },
      root_causes: "The checkout flow was designed with shipping cost calculated server-side and only rendered at the final summary. There's no cost estimation anywhere upstream, not on the product page, not in the cart. This creates a gap between what users think they're paying and what they're actually asked to pay, which feels deceptive even when it isn't intentional.",
      connected_friction_point_ids: ["FP_001"],
    },
    {
      theme_id: "T_002",
      rank: 2,
      theme_name: "Users don't trust the payment step",
      description:
        "Users approach payment with significant anxiety, look for security signals that aren't present, and hesitate on CTAs that imply irreversible action",
      frequency_pct: 71,
      affected_personas: ["Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast", "Pragmatist"],
      supporting_codes: [
        { code_name: "Card_Security_Anxiety", frequency_pct: 71 },
        { code_name: "Lock_Icon_Not_Visible", frequency_pct: 44 },
        { code_name: "CTA_Label_Ambiguous", frequency_pct: 67 },
      ],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U034_20260115",
          persona_type: "Skeptic",
          text: "I want to see a lock icon or something before I enter my card details.",
        },
        {
          session_id: "APR_CHECKOUT_U047_20260115",
          persona_type: "Confused Novice",
          text: "Does clicking this charge me immediately? I need to know that before I proceed.",
        },
      ],
      counter_evidence: {
        summary:
          "Enthusiasts and experienced Pragmatists recognised standard payment patterns and continued without hesitation",
        frequency_pct: 28,
      },
      quantitative_support: {
        completion_rate: 0.81,
        avg_seq: 3.8,
      },
      root_causes: "The payment form lacks standard trust indicators that users have been trained to expect from e-commerce sites. No lock icon, no SSL badge, no 'secure checkout' label, and the CTA copy ('Pay Now') implies an irreversible charge without confirmation. Users who are already anxious from the shipping cost surprise have no trust signals to recover their confidence.",
      connected_friction_point_ids: ["FP_002"],
    },
    {
      theme_id: "T_003",
      rank: 3,
      theme_name: "Onboarding fails new users before they see the product",
      description:
        "Users with low digital literacy or no prior product awareness cannot establish what the product does from the landing page alone, leading to early exits",
      frequency_pct: 62,
      affected_personas: ["Confused Novice"],
      not_affected_personas: ["Enthusiast", "Pragmatist", "Skeptic"],
      supporting_codes: [
        { code_name: "Value_Prop_Unclear_On_Landing", frequency_pct: 62 },
        { code_name: "CTA_Get_Started_Ambiguous", frequency_pct: 55 },
      ],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U004_20260115",
          persona_type: "Confused Novice",
          text: "The headline doesn't tell me what I'll actually get. There's a button that says 'Get Started' but started with what?",
        },
        {
          session_id: "APR_CHECKOUT_U012_20260115",
          persona_type: "Confused Novice",
          text: "I've scrolled the whole page and I still don't understand what this product does for me specifically.",
        },
      ],
      counter_evidence: {
        summary: "Users arriving via referral channels already had product context and were unaffected",
        frequency_pct: 38,
      },
      quantitative_support: {
        completion_rate: 0.55,
        avg_seq: 2.8,
      },
      root_causes: "The landing page was designed for users who already know the product, likely from ad campaigns that provide context. But organic visitors and users from broader channels arrive without that context. The headline assumes familiarity, the CTA assumes intent, and there's no educational content above the fold to bridge the knowledge gap.",
      connected_friction_point_ids: ["FP_003"],
    },
    {
      theme_id: "T_004",
      rank: 4,
      theme_name: "Skeptical users convert slowly but do convert when trust is established",
      description:
        "Skeptic personas read every element carefully, hesitate at multiple steps, and respond well to social proof, but the current flow doesn't give them enough trust signals",
      frequency_pct: 58,
      affected_personas: ["Skeptic"],
      not_affected_personas: ["Enthusiast", "Pragmatist", "Confused Novice"],
      supporting_codes: [
        { code_name: "Social_Proof_Insufficient", frequency_pct: 58 },
        { code_name: "Trust_Badge_Missing_Checkout", frequency_pct: 44 },
      ],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U007_20260115",
          persona_type: "Skeptic",
          text: "The reviews section is helpful. I want to see more of this before I put in my card.",
        },
        {
          session_id: "APR_CHECKOUT_U031_20260115",
          persona_type: "Skeptic",
          text: "I'd feel better if there was a clear returns policy visible here. Where is it?",
        },
      ],
      counter_evidence: {
        summary: "Skeptics who arrived via referral had pre-established trust and moved faster",
        frequency_pct: 42,
      },
      quantitative_support: {
        completion_rate: 0.64,
        avg_seq: 4.1,
      },
      root_causes: "The flow provides minimal social proof and no visible trust badges in the checkout stage where skeptical users need them most. Reviews exist on the product page but disappear once users enter the funnel. The checkout flow assumes trust has already been established, but Skeptic personas need continuous reinforcement throughout the journey.",
      connected_friction_point_ids: ["FP_002"],
    },
  ],

  screens: [
    {
      step_id: 1,
      step_name: "Landing Page",
      reached: 100,
      completed: 98,
      dropped: 2,
      drop_off_pct: 2,
      avg_seq: 5.4,
      top_emotional_tags: ["CONFIDENT", "CONFUSED"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [
        {
          session_id: "APR_CHECKOUT_U001_20260115",
          persona_type: "Pragmatist",
          action_taken: "Scrolled, clicked Sign Up",
          internal_monologue:
            "Looks decent. The headline is a bit vague, not sure exactly what I'm signing up for, but the layout feels familiar enough. I'll give it a shot.",
          emotional_tags: ["CONFIDENT"],
          behavioral_tags: ["COMPLETED"],
          completed: true,
          dropped: false,
        },
        {
          session_id: "APR_CHECKOUT_U004_20260115",
          persona_type: "Confused Novice",
          action_taken: "Scrolled, did not click",
          internal_monologue:
            "I'm not sure what this is. The headline doesn't tell me what I'll actually get. There's a button that says 'Get Started' but started with what exactly? I don't want to click something I don't understand.",
          emotional_tags: ["CONFUSED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_CHECKOUT_U004_20260115",
          persona_type: "Confused Novice",
          action_taken: "Scrolled, did not click",
          internal_monologue:
            "I'm not sure what this is. The headline doesn't tell me what I'll actually get.",
          emotional_tags: ["CONFUSED", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Could not identify product value proposition from the landing page",
        },
      ],
    },
    {
      step_id: 2,
      step_name: "Sign Up Form",
      reached: 98,
      completed: 91,
      dropped: 7,
      drop_off_pct: 7,
      avg_seq: 4.8,
      top_emotional_tags: ["ANXIOUS", "CONFUSED"],
      top_behavioral_tags: ["HESITATED", "ERROR_MADE"],
      all_monologues: [],
      dropped_monologues: [
        {
          session_id: "APR_CHECKOUT_U012_20260115",
          persona_type: "Confused Novice",
          action_taken: "Started filling, abandoned",
          internal_monologue:
            "It's asking for a lot. I don't understand why it needs my phone number just to sign up.",
          emotional_tags: ["ANXIOUS", "DISTRUST"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Phone number field felt intrusive before user understood the product value",
        },
      ],
    },
    {
      step_id: 3,
      step_name: "Product Detail",
      reached: 91,
      completed: 88,
      dropped: 3,
      drop_off_pct: 3,
      avg_seq: 5.1,
      top_emotional_tags: ["CONFUSED", "CONFIDENT"],
      top_behavioral_tags: ["HESITATED", "COMPLETED"],
      all_monologues: [],
      dropped_monologues: [
        {
          session_id: "APR_CHECKOUT_U019_20260115",
          persona_type: "Skeptic",
          action_taken: "Read page, navigated away",
          internal_monologue:
            "I can't find the returns policy anywhere on this page.",
          emotional_tags: ["DISTRUST", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "No returns policy visible, trust gap prevented conversion",
        },
      ],
    },
    {
      step_id: 4,
      step_name: "Cart",
      reached: 88,
      completed: 82,
      dropped: 6,
      drop_off_pct: 7,
      avg_seq: 4.3,
      top_emotional_tags: ["CONFIDENT", "ANXIOUS"],
      top_behavioral_tags: ["COMPLETED", "HESITATED"],
      all_monologues: [],
      dropped_monologues: [],
    },
    {
      step_id: 5,
      step_name: "Checkout, Shipping Cost",
      reached: 82,
      completed: 67,
      dropped: 15,
      drop_off_pct: 18,
      avg_seq: 3.1,
      top_emotional_tags: ["SURPRISED_NEGATIVE", "PRICE_SHOCKED", "FRUSTRATED"],
      top_behavioral_tags: ["BACKTRACKED", "HESITATED", "ABANDONED"],
      all_monologues: [
        {
          session_id: "APR_CHECKOUT_U023_20260115",
          persona_type: "Skeptic",
          action_taken: "Clicked back, exited",
          internal_monologue:
            "Oh wait, $15 shipping? I didn't see that coming. Why wasn't this shown earlier?",
          emotional_tags: ["PRICE_SHOCKED", "DISTRUST", "FRUSTRATED"],
          behavioral_tags: ["BACKTRACKED", "ABANDONED"],
          completed: false,
          dropped: true,
        },
      ],
      dropped_monologues: [
        {
          session_id: "APR_CHECKOUT_U023_20260115",
          persona_type: "Skeptic",
          action_taken: "Clicked back, exited",
          internal_monologue:
            "Oh wait, $15 shipping? I didn't see that coming. Why wasn't this shown earlier?",
          emotional_tags: ["PRICE_SHOCKED", "DISTRUST", "FRUSTRATED"],
          behavioral_tags: ["BACKTRACKED", "ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Unexpected shipping cost triggered distrust, user felt the cost was deliberately hidden",
        },
        {
          session_id: "APR_CHECKOUT_U061_20260115",
          persona_type: "Confused Novice",
          action_taken: "Exited without action",
          internal_monologue:
            "Why didn't they show this earlier? I wasted 10 minutes.",
          emotional_tags: ["PRICE_SHOCKED", "FRUSTRATED"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Shipping cost exceeded expected total, user felt their time was wasted",
        },
      ],
    },
    {
      step_id: 6,
      step_name: "Payment",
      reached: 67,
      completed: 60,
      dropped: 7,
      drop_off_pct: 10,
      avg_seq: 3.8,
      top_emotional_tags: ["ANXIOUS", "DISTRUST"],
      top_behavioral_tags: ["HESITATED", "ERROR_MADE"],
      all_monologues: [],
      dropped_monologues: [
        {
          session_id: "APR_CHECKOUT_U034_20260115",
          persona_type: "Skeptic",
          action_taken: "Started entering details, abandoned",
          internal_monologue:
            "I want to see a lock icon or something before I enter my card details.",
          emotional_tags: ["DISTRUST", "ANXIOUS"],
          behavioral_tags: ["ABANDONED"],
          completed: false,
          dropped: true,
          drop_reason:
            "Absence of visible security signals prevented card entry",
        },
      ],
    },
    {
      step_id: 7,
      step_name: "Order Confirmation",
      reached: 60,
      completed: 58,
      dropped: 2,
      drop_off_pct: 3,
      avg_seq: 6.1,
      top_emotional_tags: ["CONFIDENT", "DELIGHTED"],
      top_behavioral_tags: ["COMPLETED"],
      all_monologues: [],
      dropped_monologues: [],
    },
  ],

  friction_points: [
    {
      friction_point_id: "FP_001",
      rank: 1,
      step_id: 5,
      step_name: "Checkout, Shipping Cost",
      friction_type: "expectation_violation",
      friction_score: 9.2,
      severity: "critical",
      drop_off_pct: 18,
      frequency_pct: 83,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      top_emotional_tags: ["SURPRISED_NEGATIVE", "PRICE_SHOCKED", "FRUSTRATED"],
      top_behavioral_tags: ["BACKTRACKED", "HESITATED"],
      avg_seq: 3.1,
      problem_narrative: "Users progress through the entire flow, browsing, adding to cart, entering their details, only to discover a $15 shipping fee at the final step. By this point they've invested significant time and feel deceived. The late reveal resets their purchase confidence and triggers abandonment.",
      user_expectation: "Shipping cost would be shown upfront on the product page or at cart, so the total price is clear before committing.",
      actual_experience: "The $15 shipping fee appeared only at the final checkout step, after users had already entered their personal and payment details.",
      business_impact: "This is the highest-impact friction point in the flow, 83% of users experienced it, and it caused the single largest drop-off at 18% of all sessions. Resolving this could recover up to a fifth of lost conversions.",
      related_theme_ids: ["T_001"],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U023_20260115",
          persona_type: "Skeptic",
          text: "Oh wait, $15 shipping? I didn't see that coming. That changes things.",
        },
        {
          session_id: "APR_CHECKOUT_U061_20260115",
          persona_type: "Confused Novice",
          text: "Why didn't they show this earlier? I wasted 10 minutes.",
        },
      ],
    },
    {
      friction_point_id: "FP_002",
      rank: 2,
      step_id: 6,
      step_name: "Payment",
      friction_type: "trust_barrier",
      friction_score: 7.4,
      severity: "high",
      drop_off_pct: 10,
      frequency_pct: 71,
      affected_personas: ["Skeptic", "Confused Novice"],
      top_emotional_tags: ["ANXIOUS", "DISTRUST"],
      top_behavioral_tags: ["HESITATED", "ERROR_MADE"],
      avg_seq: 3.8,
      problem_narrative: "Users reaching the payment step feel unsure about whether it's safe to enter card details. There are no visible trust signals, no lock icon, no security badge, no reassurance copy. Skeptical users hesitate, and less confident users make errors from rushing through out of anxiety.",
      user_expectation: "Clear security indicators (lock icon, SSL badge, or 'secure checkout' label) would be visible before entering sensitive payment information.",
      actual_experience: "The payment form appeared without any trust signals, making users question whether the page was secure enough to enter card details.",
      business_impact: "71% of users who reached payment experienced trust anxiety, and 10% abandoned entirely at this step. This is the second-largest drop-off point and compounds the shipping cost issue, users who survived the price shock then face a trust barrier.",
      related_theme_ids: ["T_002", "T_004"],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U034_20260115",
          persona_type: "Skeptic",
          text: "I want to see a lock icon or something before I enter my card details.",
        },
        {
          session_id: "APR_CHECKOUT_U047_20260115",
          persona_type: "Confused Novice",
          text: "Does clicking this charge me immediately? I need to know that before I proceed.",
        },
      ],
    },
    {
      friction_point_id: "FP_003",
      rank: 3,
      step_id: 1,
      step_name: "Landing Page",
      friction_type: "information_gap",
      friction_score: 5.8,
      severity: "moderate",
      drop_off_pct: 2,
      frequency_pct: 62,
      affected_personas: ["Confused Novice"],
      top_emotional_tags: ["CONFUSED", "ANXIOUS"],
      top_behavioral_tags: ["ABANDONED"],
      avg_seq: 4.1,
      problem_narrative: "New visitors land on the page without a clear understanding of what the product does or what they'll get by signing up. The headline is vague, the CTA says 'Get Started' without context, and there's no value proposition above the fold. Confused users bounce before engaging.",
      user_expectation: "The landing page would clearly explain the product, its benefits, and what 'Get Started' leads to, enough to make an informed decision to proceed.",
      actual_experience: "The headline was generic, the CTA was ambiguous, and users couldn't determine what they'd receive or commit to by clicking through.",
      business_impact: "While the 2% drop-off seems small, 62% of users who stayed reported confusion at this step. This friction creates a negative first impression that compounds downstream, confused users are more likely to abandon at later steps.",
      related_theme_ids: ["T_003"],
      key_monologues: [
        {
          session_id: "APR_CHECKOUT_U004_20260115",
          persona_type: "Confused Novice",
          text: "The headline doesn't tell me what I'll actually get. There's a button that says 'Get Started' but started with what?",
        },
      ],
    },
  ],

  behavioral_patterns: [
    {
      pattern_id: "BP_001",
      pattern_type: "late_abandoner",
      pattern_name: "Invests in the flow, exits at price reveal",
      frequency_pct: 22,
      affected_personas: ["Pragmatist", "Skeptic"],
      trigger_step_id: 5,
      trigger_step_name: "Checkout, Shipping Cost",
      trigger_tags: ["PRICE_SHOCKED", "SURPRISED_NEGATIVE"],
      implication:
        "High sunk-cost frustration. This is a trust and information architecture problem, not a motivation problem.",
      session_ids: [],
      behavior_narrative: "These users enter the flow with clear purchase intent. They browse products confidently, add items to cart, and proceed through the address and details steps without hesitation. Their behavior shifts sharply at checkout when the shipping cost appears, they pause, scroll back to the cart to recalculate, and ultimately close the tab or navigate away. The abandonment isn't impulsive; it's a deliberate decision after feeling the total price was misrepresented.",
      key_monologues: [
        { session_id: "APR_CHECKOUT_U023_20260115", persona_type: "Skeptic", text: "I've already spent 10 minutes on this. Now you're telling me it's $15 more? I feel like I was tricked into getting this far." },
        { session_id: "APR_CHECKOUT_U061_20260115", persona_type: "Pragmatist", text: "The product is worth it, but I don't pay surprise fees. If they'd shown this upfront I might have accepted it." },
      ],
      actionable_insight: "These users are high-intent and nearly converted, they're the easiest segment to recover. Show shipping cost on the product page or cart summary, and this pattern likely collapses.",
      related_theme_ids: ["T_001"],
      related_friction_point_ids: ["FP_001"],
    },
    {
      pattern_id: "BP_002",
      pattern_type: "skeptical_evaluator",
      pattern_name: "Reads everything carefully, converts slowly",
      frequency_pct: 18,
      affected_personas: ["Skeptic"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["DISTRUST", "HESITATED"],
      implication:
        "These users convert but need trust signals throughout. They respond well to social proof and detailed information. They won't be rushed.",
      session_ids: [],
      behavior_narrative: "Skeptic users enter the flow cautiously and read every piece of copy on each page. They spend 2–3x longer than other personas on the product page, scrolling to reviews and looking for return policies. At checkout, they hover over form fields, look for security indicators, and re-read CTA labels before clicking. Many do eventually convert, but the journey takes significantly longer and they hesitate at every trust-sensitive step.",
      key_monologues: [
        { session_id: "APR_CHECKOUT_U007_20260115", persona_type: "Skeptic", text: "I want to see a refund policy before I enter my card. Where is it? I'm not going to dig through a footer for it." },
        { session_id: "APR_CHECKOUT_U031_20260115", persona_type: "Skeptic", text: "The reviews are helpful but there are only three of them. I need more proof that this is legitimate." },
      ],
      actionable_insight: "Don't try to speed these users up, give them what they need to feel safe. Surface trust signals (reviews, badges, policies) at the moments they hesitate, especially at payment.",
      related_theme_ids: ["T_002", "T_004"],
      related_friction_point_ids: ["FP_002"],
    },
    {
      pattern_id: "BP_003",
      pattern_type: "linear_converter",
      pattern_name: "Moves through without friction",
      frequency_pct: 31,
      affected_personas: ["Enthusiast"],
      trigger_step_id: null,
      trigger_step_name: null,
      trigger_tags: ["CONFIDENT"],
      implication:
        "These users define what a smooth flow looks like. The steps that work for them reveal the flow's strengths, protect them.",
      session_ids: [],
      behavior_narrative: "Enthusiast users move through the flow in a straight line, they browse briefly, add to cart quickly, fill in details without hesitation, and complete payment in under 3 minutes. They don't read fine print, skip optional content, and respond to clear CTAs immediately. Their confidence comes from familiarity with similar products or strong purchase intent from referral channels.",
      key_monologues: [
        { session_id: "APR_CHECKOUT_U002_20260115", persona_type: "Enthusiast", text: "This is exactly what I expected. Add to cart, fill in details, done. Easy." },
        { session_id: "APR_CHECKOUT_U009_20260115", persona_type: "Enthusiast", text: "Shipping is fine, I just want the product. Let me pay and move on." },
      ],
      actionable_insight: "Protect this path. Any changes to the flow should be tested against this segment to ensure the happy path stays fast. These users are the baseline for measuring flow health.",
      related_theme_ids: [],
      related_friction_point_ids: [],
    },
    {
      pattern_id: "BP_004",
      pattern_type: "early_abandoner",
      pattern_name: "Exits before reaching the core value",
      frequency_pct: 14,
      affected_personas: ["Confused Novice"],
      trigger_step_id: 1,
      trigger_step_name: "Landing Page",
      trigger_tags: ["CONFUSED", "LOST"],
      implication:
        "These users never see the product. The problem is onboarding clarity, not the product itself.",
      session_ids: [],
      behavior_narrative: "Confused Novice users arrive at the landing page and immediately struggle to understand what the product does. They scroll up and down looking for a clear explanation, hover over the CTA without clicking, and some open a new tab to search for the brand. Within 30–60 seconds, most leave without ever reaching the product page. They don't get far enough to experience any checkout friction, the flow loses them before it begins.",
      key_monologues: [
        { session_id: "APR_CHECKOUT_U004_20260115", persona_type: "Confused Novice", text: "I've read the headline twice and I still don't know what this does. The button says 'Get Started' but started with what?" },
        { session_id: "APR_CHECKOUT_U012_20260115", persona_type: "Confused Novice", text: "I scrolled the whole page looking for a simple explanation. There's a lot of design but no substance." },
      ],
      actionable_insight: "The landing page assumes visitors already know the product. Add a clear value proposition above the fold that explains what users get in one sentence, this is a copy problem, not a design problem.",
      related_theme_ids: ["T_003"],
      related_friction_point_ids: ["FP_003"],
    },
  ],

  segment_analysis: {
    segments: [
      {
        segment_id: "SEG_001",
        dimension: "persona_archetype",
        label: "Pragmatist",
        n: 30,
        conversion_rate: 81,
        avg_sus: 71.2,
        top_friction_point_ids: ["FP_002"],
        primary_pattern: "skeptical_evaluator",
        top_emotional_tags: ["CONFIDENT", "FRUSTRATED"],
        summary:
          "Pragmatists convert at high rates but show friction at checkout, they push through despite discomfort",
        persona_profile: "Pragmatists are experienced online shoppers who evaluate products based on value and efficiency. They have moderate product awareness, prefer clear pricing, and will tolerate minor friction if the core offering meets their needs. They don't need to be persuaded, they need the flow to not get in their way.",
        journey_narrative: "Pragmatists moved through the landing page and sign-up form quickly, showing confidence in familiar UI patterns. They slowed at the product detail page to evaluate features and pricing carefully. At checkout, most noticed the unexpected shipping cost and expressed frustration, but their sunk-cost investment kept them moving. They completed the purchase despite the friction, though several noted they would think twice about returning.",
        monologues: [
          { text: "I've already spent time on this so I'll continue, but this should have been visible from the start." },
          { text: "Standard sign-up form. Password requirement isn't shown until I type a wrong one, slightly annoying but fine." },
          { text: "Good detail on what's included. Price seems fair. I'm not seeing any mention of shipping." },
        ],
        positive_experience: "Clear product imagery and straightforward feature-benefit framing on the product page built immediate confidence. The auto-fill on the sign-up form removed friction entirely, 91% of Pragmatists completed this step with no hesitation.",
        emotional_arc: ["CONFIDENT", "CONFIDENT", "SURPRISED_NEGATIVE", "FRUSTRATED", "CONFIDENT"],
        segment_recommendation: "Surface shipping cost on the product page or cart summary. Pragmatists will still convert, they just need the total cost upfront so the checkout step doesn't break their trust.",
      },
      {
        segment_id: "SEG_002",
        dimension: "persona_archetype",
        label: "Skeptic",
        n: 25,
        conversion_rate: 64,
        avg_sus: 63.4,
        top_friction_point_ids: ["FP_001", "FP_002"],
        primary_pattern: "skeptical_evaluator",
        top_emotional_tags: ["DISTRUST", "ANXIOUS"],
        summary:
          "Skeptics need trust signals the flow doesn't provide. They read carefully and exit when surprised.",
        persona_profile: "Skeptics are cautious, detail-oriented users who evaluate every element of a page before taking action. They look for social proof, security indicators, and return policies before committing. They won't be rushed and they won't forgive feeling deceived. When trust is established, they convert, but the flow has to earn it.",
        journey_narrative: "Skeptics entered the flow reading every piece of copy on the landing page, spending 2–3× longer than other personas. They scrolled to reviews and looked for return policies on the product page. At checkout, the hidden shipping cost triggered a sharp trust break, many clicked back or exited entirely. Those who reached the payment screen hesitated at the CTA label and looked for security indicators that weren't visible. The ones who converted did so slowly and reluctantly.",
        monologues: [
          { text: "Oh wait, $15 shipping? I didn't see that coming. Why wasn't this shown earlier? I feel like they deliberately hid it." },
          { text: "I want to see a lock icon or something before I enter my card details. This doesn't feel secure enough." },
          { text: "The reviews section is helpful. I want to see more of this before I put in my card." },
        ],
        emotional_arc: ["DISTRUST", "HESITATED", "PRICE_SHOCKED", "ANXIOUS", "ABANDONED"],
        segment_recommendation: "Add visible trust signals throughout the flow, security badges on payment, return policy on product page, and surface shipping cost early. Skeptics convert when they feel informed, not when they feel rushed.",
      },
      {
        segment_id: "SEG_003",
        dimension: "persona_archetype",
        label: "Enthusiast",
        n: 25,
        conversion_rate: 92,
        avg_sus: 79.8,
        top_friction_point_ids: [],
        primary_pattern: "linear_converter",
        top_emotional_tags: ["CONFIDENT", "DELIGHTED"],
        summary:
          "Enthusiasts convert reliably and define the ceiling for this flow.",
        persona_profile: "Enthusiasts arrive with strong purchase intent and prior product awareness, often from referral channels. They're familiar with similar products, have low price sensitivity, and respond immediately to clear CTAs. They represent what a frictionless path through this flow looks like.",
        journey_narrative: "Enthusiasts moved through the entire flow in under 3 minutes. They browsed briefly, added to cart quickly, filled in details without hesitation, and completed payment without pausing. The shipping cost at checkout didn't surprise them, they expected it. The order confirmation closed the loop cleanly and several expressed positive sentiment about the experience.",
        monologues: [
          { text: "I've heard about this, looks exactly like what I was looking for. Let's get started." },
          { text: "Standard shipping cost. Expected this. Let me just finish the order." },
          { text: "Good, clear confirmation with order number. Email confirmation arrived quickly." },
        ],
        positive_experience: "Every step worked for this segment. The landing page hero matched their existing expectations from referral context. Product detail provided enough information without requiring deep reading. Checkout was familiar, and the shipping cost was expected. The confirmation page with immediate email closed the loop with no anxiety.",
        emotional_arc: ["CONFIDENT", "DELIGHTED", "CONFIDENT", "CONFIDENT", "DELIGHTED"],
        segment_recommendation: "Protect this path. Any flow changes should be tested against Enthusiasts to ensure the happy path stays fast. Invest in referral loops to acquire more users who arrive with this level of intent.",
      },
      {
        segment_id: "SEG_004",
        dimension: "persona_archetype",
        label: "Confused Novice",
        n: 20,
        conversion_rate: 55,
        avg_sus: 54.6,
        top_friction_point_ids: ["FP_003", "FP_001"],
        primary_pattern: "early_abandoner",
        top_emotional_tags: ["CONFUSED", "ANXIOUS", "LOST"],
        summary:
          "Confused Novices fail early, at onboarding, before they ever reach checkout.",
        persona_profile: "Confused Novices have low digital literacy and no prior awareness of the product. They arrive, often from Instagram ads, without understanding what the product does or why they should care. They need the landing page to do the persuasion work the ad didn't do, and the current flow assumes knowledge they don't have.",
        journey_narrative: "Confused Novices arrived at the landing page and immediately struggled to understand the product. They scrolled up and down looking for a clear explanation, hovered over 'Get Started' without clicking, and some opened new tabs to search for the brand. Within 60 seconds, most left without reaching the product page. The few who continued hit the sign-up form and abandoned when asked for a phone number, they hadn't yet understood the product's value, so sharing personal information felt premature.",
        monologues: [
          { text: "I'm not sure what this is. The headline doesn't tell me what I'll actually get." },
          { text: "I've scrolled the whole page and I still don't understand what this product does for me specifically." },
          { text: "It's asking for a lot. I don't understand why it needs my phone number just to sign up." },
        ],
        emotional_arc: ["CONFUSED", "ANXIOUS", "LOST", "ABANDONED"],
        segment_recommendation: "Rewrite the landing page headline and hero section to explain what the product does in one sentence, using plain language. Delay the sign-up form until after the user has seen the product's value proposition, they need to understand before they commit.",
      },
    ],
    converter_profile: {
      label: "Who Converts",
      dominant_personas: ["Enthusiast", "Pragmatist"],
      dominant_channels: ["referral", "google_search"],
      common_patterns: ["linear_converter", "skeptical_evaluator"],
      shared_emotional_signals: ["CONFIDENT", "SURPRISED_POSITIVE"],
    },
    dropper_profile: {
      label: "Who Drops Off",
      dominant_personas: ["Skeptic", "Confused Novice"],
      dominant_channels: ["instagram_ad"],
      common_patterns: ["late_abandoner", "early_abandoner"],
      shared_emotional_signals: ["CONFUSED", "DISTRUST", "PRICE_SHOCKED"],
    },
    critical_splits: [
      {
        dimension: "acquisition_channel",
        label: "Referral vs Instagram",
        value_a: "referral",
        rate_a: 88,
        value_b: "instagram_ad",
        rate_b: 51,
        delta: 37,
        implication:
          "Instagram-acquired users arrive with lower intent and less trust, they need more reassurance earlier in the flow",
      },
      {
        dimension: "persona_archetype",
        label: "Enthusiast vs Confused Novice",
        value_a: "Enthusiast",
        rate_a: 92,
        value_b: "Confused Novice",
        rate_b: 55,
        delta: 37,
        implication:
          "A 37-point gap driven by onboarding clarity, the flow assumes prior product knowledge that Confused Novices don't have",
      },
    ],
  },

  power_users: {
    count: 24,
    pct_of_total: 24,
    pct_of_converters: 28,
    why_they_convert: [
      "Entered with clear purchase intent, monologues show prior product awareness",
      "Low price sensitivity, did not hesitate at cost reveals",
      "Recognised familiar UI patterns, low cognitive load throughout",
    ],
    what_resonates: [
      {
        step_id: 1,
        step_name: "Landing Page",
        signal: "Responded positively to social proof and testimonials",
        tag: "SURPRISED_POSITIVE",
        frequency_pct: 87,
      },
      {
        step_id: 3,
        step_name: "Product Detail",
        signal:
          "Appreciated clear feature-benefit framing without needing to dig",
        tag: "CONFIDENT",
        frequency_pct: 79,
      },
    ],
    flow_strengths: [
      {
        step_id: 2,
        step_name: "Sign Up Form",
        strength:
          "Auto-fill removed friction entirely for returning device users",
        evidence:
          "91% of power users completed this step with no hesitation or error tags",
      },
      {
        step_id: 7,
        step_name: "Order Confirmation",
        strength:
          "Immediate confirmation closed the loop cleanly and met user expectations",
        evidence:
          "No ANXIOUS tags after this step in any power user session",
      },
    ],
    persona_breakdown: {
      Enthusiast: { count: 14, pct: 58 },
      Pragmatist: { count: 8, pct: 33 },
      Skeptic: { count: 2, pct: 8 },
      "Confused Novice": { count: 0, pct: 0 },
    },
    acquisition_strategy: {
      highest_yield_channel: "referral",
      highest_yield_persona: "Enthusiast",
      recommendation:
        "Referral-acquired Enthusiasts convert at 3× the rate of instagram-acquired users. Invest in referral loops and loyalty mechanics. Paid social is attracting a lower-intent audience who need more onboarding support.",
      channel_persona_matrix: [
        { channel: "referral", persona: "Enthusiast", conversion_rate: 94 },
        { channel: "google_search", persona: "Pragmatist", conversion_rate: 85 },
        { channel: "instagram_ad", persona: "Enthusiast", conversion_rate: 71 },
        {
          channel: "instagram_ad",
          persona: "Confused Novice",
          conversion_rate: 31,
        },
      ],
    },
  },

  insights: [
    {
      insight_id: "INS_047",
      rank: 1,
      headline: "Users feel deceived by late shipping cost reveal",
      one_liner:
        "83% of users hit a negative surprise when shipping cost appeared only at final checkout",
      type: "Usability Problem",
      observation:
        "83 out of 100 users showed negative emotional signals at the shipping cost step. SEQ at this step is 3.1 vs a 5.5 benchmark. Drop-off rate here is 18%.",
      finding:
        "Users consistently showed surprise and frustration when shipping cost appeared at the final checkout step. SURPRISED_NEGATIVE + PRICE_SHOCKED appeared here in 83% of sessions.",
      insight:
        "Users feel deceived by a late cost reveal because they have already invested effort building their cart. This triggers loss aversion, they feel their time was wasted and the cost was deliberately hidden. The problem is the timing, not the price.",
      recommendation:
        "Display estimated shipping cost range on the product detail page and cart page, before the user enters checkout",
      frequency_pct: 83,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      counter_evidence:
        "12% of users (predominantly Enthusiasts) expected the cost and were unaffected",
      top_emotional_tags: ["SURPRISED_NEGATIVE", "PRICE_SHOCKED", "FRUSTRATED"],
      confidence_score: 0.92,
      avg_seq: 3.1,
      step_drop_off_pct: 18,
      supporting_monologues: [
        {
          session_id: "APR_CHECKOUT_U023_20260115",
          persona_type: "Skeptic",
          text: "Oh wait, $15 shipping? I didn't see that coming. That changes things.",
        },
        {
          session_id: "APR_CHECKOUT_U061_20260115",
          persona_type: "Confused Novice",
          text: "Why didn't they show this earlier? I wasted 10 minutes.",
        },
        {
          session_id: "APR_CHECKOUT_U072_20260115",
          persona_type: "Pragmatist",
          text: "I feel like they hid this on purpose. That's annoying.",
        },
      ],
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      linked_rec_id: "DR_001",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-01-15",
    },
    {
      insight_id: "INS_031",
      rank: 2,
      headline:
        "CTA label on checkout doesn't tell users what happens next",
      one_liner:
        "67% of users hesitated at the checkout CTA because the label implies an immediate irreversible charge",
      type: "Usability Problem",
      observation:
        "67 out of 100 users showed hesitation at the primary CTA on the checkout screen. SEQ at this step is 4.1.",
      finding:
        "Users paused at 'Proceed to Payment', most were unsure whether clicking would charge them immediately or take them to a review screen.",
      insight:
        "The label 'Proceed to Payment' implies irreversible action. Users need to know there is a review step before committing. A copy change eliminates this uncertainty entirely at near-zero cost.",
      recommendation:
        "Change CTA label from 'Proceed to Payment' to 'Review Order' or 'Continue to Review'",
      frequency_pct: 67,
      affected_personas: ["Pragmatist", "Skeptic", "Confused Novice"],
      not_affected_personas: ["Enthusiast"],
      counter_evidence:
        "Enthusiasts recognised the standard checkout pattern and completed without hesitation",
      top_emotional_tags: ["CONFUSED", "ANXIOUS"],
      confidence_score: 0.87,
      avg_seq: 4.1,
      step_drop_off_pct: 8,
      supporting_monologues: [
        {
          session_id: "APR_CHECKOUT_U018_20260115",
          persona_type: "Pragmatist",
          text: "Does clicking this charge me now? I want to see the full total before anything is confirmed.",
        },
        {
          session_id: "APR_CHECKOUT_U042_20260115",
          persona_type: "Confused Novice",
          text: "I'm scared to click this. What if it just takes my money without asking again?",
        },
        {
          session_id: "APR_CHECKOUT_U055_20260115",
          persona_type: "Skeptic",
          text: "The label says 'Proceed to Payment', does that mean it's processing right now?",
        },
      ],
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      linked_rec_id: "DR_002",
      rice_score: null,
      status: "Open",
      owner: null,
      linked_ticket: null,
      created_at: "2026-01-15",
    },
  ],

  design_recommendations: [
    {
      rec_id: "DR_001",
      rank: 1,
      headline: "Surface estimated shipping cost before checkout",
      linked_insight_id: "INS_047",
      linked_friction_point_id: "FP_001",
      linked_theme_id: "T_001",
      problem:
        "83% of users hit an unexpected shipping cost at final checkout, causing 18% to abandon",
      user_need:
        "Understand total cost before committing to the purchase journey",
      current_experience:
        "Shipping cost appears only on the order review page, after the user has already filled address and payment details.",
      after_experience:
        "Estimated shipping range ('Shipping from ₹99') shown on product page and cart summary, before users enter any personal details.",
      recommended_change:
        "Show estimated shipping range ('Shipping from ₹99') on product detail page and cart page",
      emotional_target:
        "Replace SURPRISED_NEGATIVE and PRICE_SHOCKED at the cart stage with CONFIDENT",
      effort: "medium",
      success_metric:
        "Checkout drop-off rate falls below 8% (currently 18%). Users expressing surprise at shipping cost drops by more than half.",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_002",
      rank: 2,
      headline: "Rename checkout CTA to remove ambiguity",
      linked_insight_id: "INS_031",
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_002",
      problem:
        "67% of users hesitate at the checkout CTA because they cannot tell if clicking will charge them immediately",
      user_need:
        "Know what happens next before committing to an action",
      current_experience:
        "Button reads 'Proceed to Payment', implies an immediate irreversible charge.",
      after_experience:
        "Button reads 'Review Order', clearly signals a review step before any charge, removing ambiguity.",
      recommended_change:
        "Change label to 'Review Order' or 'Continue to Review'",
      emotional_target:
        "Replace ANXIOUS and CONFUSED with CONFIDENT at this step",
      effort: "quick_win",
      success_metric:
        "Hesitation rate at checkout CTA drops below 30% (currently 67%). Task ease score (SEQ) at this step reaches 5.0+ (currently 3.8).",
      priority: "this_sprint",
      rice_score: null,
    },
    {
      rec_id: "DR_003",
      rank: 3,
      headline: "Add visible security signals to the payment screen",
      linked_insight_id: "INS_031",
      linked_friction_point_id: "FP_002",
      linked_theme_id: "T_004",
      problem:
        "71% of users showed anxiety or distrust on the payment screen due to absence of security indicators",
      user_need:
        "Visual confirmation that the transaction is secure before entering card details",
      current_experience:
        "No lock icon, trust badge, or SSL indicator visible on the payment screen.",
      after_experience:
        "SSL badge, lock icon, and one-line security copy ('Your payment is 256-bit encrypted') visible above the card entry field.",
      recommended_change:
        "Add SSL badge, lock icon, and one-line security copy ('Your payment is 256-bit encrypted') above the card entry field",
      emotional_target:
        "Replace DISTRUST and ANXIOUS with CONFIDENT at the payment step",
      effort: "quick_win",
      success_metric:
        "Trust anxiety rate at payment drops below 30% (currently 71%). Payment step drop-off falls below 5% (currently 10%).",
      priority: "this_sprint",
      rice_score: null,
    },
  ],

  playbook_insights: [
    {
      playbook_id: "PLB_001",
      title:
        "Late cost revelation consistently triggers drop-off regardless of price level",
      category: "pricing_architecture",
      finding:
        "Across multiple simulation runs, revealing total cost only at the final step produces 18–24% drop-off regardless of the actual price. The problem is timing, not price.",
      implication:
        "Progressive cost transparency is a structural principle, not a checkout-specific fix.",
      action:
        "No cost element should appear for the first time after the user has invested more than 2 minutes in the flow.",
      applies_to: ["checkout", "cart", "subscription_upgrade", "pricing_page"],
      evidence_studies: ["APR_CHECKOUT_v02"],
      confidence: 0.91,
      is_new: true,
      status: "Open",
    },
    {
      playbook_id: "PLB_002",
      title:
        "Referral-acquired users convert at 3× the rate of paid social on the same flow",
      category: "acquisition_alignment",
      finding:
        "Referral users arrive with product awareness and purchase intent already established. Paid social users, especially from Instagram, need the flow to do the persuasion work the ad didn't do.",
      implication:
        "A single flow cannot serve both audiences equally. Paid social users need more context and trust signals, earlier.",
      action:
        "Consider a differentiated onboarding entry point for paid social acquisition vs referral.",
      applies_to: ["onboarding", "landing_page", "acquisition_strategy"],
      evidence_studies: ["APR_CHECKOUT_v02"],
      confidence: 0.88,
      is_new: true,
      status: "Open",
    },
  ],

  priority_table: [
    {
      rank: 1,
      insight_id: "INS_031",
      headline:
        "CTA label on checkout doesn't tell users what happens next",
      type: "Usability Problem",
      reach: null,
      impact: 1,
      confidence: 0.87,
      effort: 0.5,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_002",
    },
    {
      rank: 2,
      insight_id: "INS_047",
      headline: "Users feel deceived by late shipping cost reveal",
      type: "Usability Problem",
      reach: null,
      impact: 2,
      confidence: 0.92,
      effort: 2,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_001",
    },
    {
      rank: 3,
      insight_id: "INS_019",
      headline: "Payment screen has no visible security signals",
      type: "Trust Issue",
      reach: null,
      impact: 1,
      confidence: 0.84,
      effort: 0.5,
      rice_score: null,
      routing: "this_sprint",
      linked_rec_id: "DR_003",
    },
  ],
};
