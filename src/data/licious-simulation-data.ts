/**
 * Lickcious simulation data — 10-persona, 60% completion dataset.
 * 6 completers, 4 drop-offs across different funnel stages.
 * This is the ONLY data source for the /lickcious/report page.
 */

import type {
  PersonaDetail,
  ScreenMonologue,
} from "@/types/simulation";

/* ── Persona name map ─────────────────────────────────────────────────── */

const PERSONA_NAMES: Record<string, string> = {
  "3da5614316964db9bd417639dcdc8f81": "Riya Sharma",
  "077291b6e6bd497296f40fbbc8fdbaeb": "Arjun Mehta",
  "a92d5a979ef74f98b8615724f12937d4": "Priya Nair",
  "752cd42830e8423bbeaf228c40a45906": "Karan Deshmukh",
  "d1e31bc549df452099426d8be7ded2cf": "Sneha Iyer",
  "d06519581aa4473faabb93639f2f7450": "Vikram Singh",
  "6cf63b9c22d9480e9221463f4a0baad2": "Ananya Gupta",
  "6361ed37ad3c4c848789472e8f1ebc79": "Rohit Patil",
  "5b9ed80517ad4f90be6ef0ec80cb695d": "Meera Krishnan",
  "216481c681f849359a8fb0fe811fcad9": "Aman Joshi",
};

/* ── Helper: build screen monologues from raw decision arrays ─────────── */

interface RawDecision {
  node_id: string;
  view_name: string;
  node_type: string;
  selected_choice: string;
  decision_outcome: string;
  next_node_id: string | null;
  selected_option_detail: string;
  reasoning: string;
  internal_monologue: string;
  drop_off_reason: string | null;
  trust_score: number;
  clarity_score: number;
  value_perception_score: number;
  emotional_state: string;
  time_spent_seconds: number;
  friction_points: string[];
}

interface RawPersona {
  persona_uuid: string;
  flow_id: string;
  path_taken: string[];
  completed_flow: boolean;
  dropped_off_at_node: string | null;
  drop_off_reason: string | null;
  total_time_seconds: number;
  key_selections: Record<string, unknown>;
  final_price_inr: string;
  overall_monologue: string;
  decisions: RawDecision[];
  persona: {
    occupation: string;
    age: number;
    zone: string;
    digital_literacy: number;
    monthly_income_inr: number;
    behavioral_archetype: string;
    employer_type: string;
    purchasing_power_tier: string;
  };
}

function buildScreenMonologues(decisions: RawDecision[]): ScreenMonologue[] {
  return decisions.map((d) => ({
    screen_id: d.node_id,
    view_name: d.view_name,
    internal_monologue: d.internal_monologue,
    reasoning: d.reasoning,
    emotional_state: d.emotional_state,
    friction_points: d.friction_points,
    decision_outcome: d.decision_outcome,
    trust_score: d.trust_score,
    clarity_score: d.clarity_score,
    value_score: d.value_perception_score,
    time_seconds: d.time_spent_seconds,
    selected_choice: d.selected_choice,
  }));
}

function buildPersonaDetail(p: RawPersona): PersonaDetail {
  const name = PERSONA_NAMES[p.persona_uuid] ?? "Unknown";
  return {
    persona_uuid: p.persona_uuid,
    demographics: {
      first_language: "Hindi",
      age: p.persona.age,
      occupation: p.persona.occupation,
      district: p.persona.zone,
      behavioral_archetype: p.persona.behavioral_archetype,
      digital_literacy: p.persona.digital_literacy,
      monthly_income_inr: p.persona.monthly_income_inr,
      employer_type: p.persona.employer_type,
      purchasing_power_tier: p.persona.purchasing_power_tier,
      name,
    },
    professional_background: `${name} is a ${p.persona.age}-year-old ${p.persona.occupation} working in a ${p.persona.employer_type} environment.`,
    cultural_background: `${name} is based in a ${p.persona.zone} area with modern lifestyle preferences.`,
    outcome: p.completed_flow ? "completed" : `dropped_off_at_${p.dropped_off_at_node}`,
    key_selections: p.key_selections,
    final_price_inr: p.final_price_inr ? parseInt(p.final_price_inr.replace(/[^\d]/g, ""), 10) : null,
    total_time_seconds: p.total_time_seconds,
    overall_monologue: p.overall_monologue,
    screen_monologues: buildScreenMonologues(p.decisions),
  };
}

/* ══════════════════════════════════════════════════════════════════════════
 *  RAW PERSONA RECORDS — 6 completers + 4 drop-offs (from new JSON)
 * ══════════════════════════════════════════════════════════════════════ */

const RAW_PERSONAS: RawPersona[] = [
  /* ────────────────── COMPLETERS (6) ────────────────────────────────── */

  // P01 · Riya — CA, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "3da5614316964db9bd417639dcdc8f81",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 465,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding one product to the cart to test it out.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "When I first landed on the Lickcious homepage, I felt a mix of curiosity and openness. The hero banner caught my eye, and the reasonable prices alongside visible ratings made me think, \"Okay, this looks interesting.\" As I scrolled down, I found myself intrigued but still a bit hesitant about trying a new brand. The positive reviews helped, though, and I felt a little more at ease.\n\nWhen I reached the product detail page, I almost stopped when I saw the options. I thought, \"Am I really going to try this?\" But the flavors sounded fun, and the price for just one item was low enough to feel like a safe bet. I decided to add it to my cart, even though I was cautious. The cart itself was organized, which I appreciated; it made the process feel smooth.\n\nEntering my contact details felt straightforward. When the final price came up at \u20b91,385 I paused for a moment, but I reminded myself of the discount and how it was all about giving this a trial. Ultimately, what pushed me to complete the order was the convenience of Google Pay. Now that it's all done, I feel a weird mix of excitement and relief.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Exploring more products and details on the page.", reasoning: "The prices are within my comfort zone and the site looks organized. I'm curious to see more about the products and their benefits.", internal_monologue: "Okay, this looks interesting. The prices are reasonable and ratings are visible. Let me see what else is available before making a decision.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 6, emotional_state: "Curious, Open", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "Unclear product differentiation between spray types"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Proceeding to view the Mango Tango product in detail.", reasoning: "The product seems interesting and the price is reasonable. The discreet packaging is reassuring.", internal_monologue: "This looks promising, and the reviews seem positive. I'm still a bit on the fence about trying a new brand, but the price isn't too high. Let's see if more details can convince me.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage", "No 'start here' category explainer for newcomers"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding one product to the cart to test it out.", reasoning: "I'm curious to try the product but want to start with just one to see how I like it before committing further.", internal_monologue: "These flavors sound interesting, and the price seems reasonable for a trial. I'll just start with one to see how it goes. Discreet packaging is a plus.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Cautious", time_spent_seconds: 75, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "Product description too long to scan on mobile"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with Bubblegum Burst priced at \u20b9595.00.", reasoning: "The product price is reasonable and I trust the website enough to try this purchase.", internal_monologue: "I like how the cart is organized, and the price seems fair. Let's see how the checkout process goes.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Cautious, Open", time_spent_seconds: 60, friction_points: ["Upsell threshold nudge feels pressuring", "No reassurance about discreet billing name"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Entering mobile number to proceed with checkout.", reasoning: "The savings are appealing, and I feel comfortable with the trust level of this site.", internal_monologue: "This looks straightforward enough. Let's proceed and see how it goes.", drop_off_reason: null, trust_score: 7, clarity_score: 9, value_perception_score: 8, emotional_state: "Curious, Cautious", time_spent_seconds: 45, friction_points: ["No explicit discreet billing confirmation", "Shipping charges not shown until this step"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Confirming order details and proceeding to payment.", reasoning: "The order total is reasonable, and the process seems secure with Razorpay.", internal_monologue: "This looks straightforward, and I do like the discount. The UI is clear, and Razorpay gives me confidence.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Focused, Cautious", time_spent_seconds: 60, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding with payment selection.", reasoning: "The order summary looks clear, and the savings are decent. I'm comfortable with the price.", internal_monologue: "The price seems reasonable, and I like the savings offer. I'll just go ahead and choose a payment method.", drop_off_reason: null, trust_score: 7, clarity_score: 7, value_perception_score: 8, emotional_state: "Tired, Pragmatic", time_spent_seconds: 90, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Proceeding with Google Pay.", reasoning: "The discount makes this a good deal, and Google Pay is quick and secure.", internal_monologue: "Alright, let's wrap this up. Google Pay is right there. I trust it and it's easier.", drop_off_reason: null, trust_score: 8, clarity_score: 7, value_perception_score: 7, emotional_state: "Determined, Focused", time_spent_seconds: 30, friction_points: [] },
    ],
    persona: { occupation: "CA (Chartered Accountant)", age: 29, zone: "Urban", digital_literacy: 8, monthly_income_inr: 80000, behavioral_archetype: "The Pragmatist", employer_type: "MNC", purchasing_power_tier: "High" },
  },

  // P02 · Arjun — Nurse, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "077291b6e6bd497296f40fbbc8fdbaeb",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 495,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding 1 Mango Tango spray to try it out cautiously.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "When I first landed on the Lickcious homepage, I felt a mix of curiosity and caution. The products looked intriguing, and the prices seemed reasonable. As I scrolled I noted they offer vegan options which reassured me. When I got to the product page and saw the Mango Tango spray, I hesitated but the price was low enough to try. Checkout was mostly smooth. The combo page being sold out did give me a moment's pause \u2014 I almost backed out \u2014 but ultimately the reasonable single-unit pricing kept me going. Google Pay closed the deal.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page and see more product options.", reasoning: "The prices seem reasonable and the site layout is clear. I'm curious to see what else they offer.", internal_monologue: "The products look interesting. Let's see if there's any product differentiation or a guide for first-timers.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 45, friction_points: ["No recommendation guide for first-time buyers", "Unclear product differentiation between spray types"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Curious to learn more about the 'Mango Tango' product.", reasoning: "The discounted price is reasonable and the product seems safe with discreet packaging.", internal_monologue: "This looks intriguing. I like that it's vegan and discreet. Should check ingredients though \u2014 I'm a nurse, I notice these things.", drop_off_reason: null, trust_score: 6, clarity_score: 7, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding 1 Mango Tango spray to try it out cautiously.", reasoning: "The flavors sound interesting. It's reasonably priced for a first-time trial.", internal_monologue: "I really wish they listed the full ingredients. It's an edible product \u2014 that should be front and centre. But fine, FSSAI licensed has to count for something.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Cautious", time_spent_seconds: 75, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No 'which product is right for me' guidance"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with the Bubblegum Burst priced at \u20b9595.00.", reasoning: "The price seems reasonable and fits within my budget.", internal_monologue: "Alright, this looks like an interesting product and the price is within my comfort zone. Let's go ahead.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 60, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "No reassurance about discreet billing name"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Entering contact details to proceed.", reasoning: "The checkout process seems straightforward, and the discount is appealing.", internal_monologue: "This looks clear enough. Let's just enter my number and move on.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Tired, Practical", time_spent_seconds: 45, friction_points: ["No explicit discreet billing confirmation"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Confirming order details and proceeding to payment.", reasoning: "The cost is reasonable after the discount. Razorpay makes me feel secure.", internal_monologue: "Alright, the price is decent and the process seems secure. Let's get this done.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Tired, Practical", time_spent_seconds: 90, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding to select a payment method.", reasoning: "The order total is reasonable. UPI is my preferred option.", internal_monologue: "Alright, the savings are visible. I'll just go ahead and choose a payment method.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Tired, Practical", time_spent_seconds: 60, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Proceeding with Google Pay.", reasoning: "The price is reasonable and using Google Pay feels secure.", internal_monologue: "Alright, the price is slightly discounted. Google Pay is quick. Let's get this done.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "Tired, Practical", time_spent_seconds: 60, friction_points: [] },
    ],
    persona: { occupation: "Nurse", age: 30, zone: "Urban", digital_literacy: 8, monthly_income_inr: 50000, behavioral_archetype: "The Pragmatist", employer_type: "MNC", purchasing_power_tier: "Mid" },
  },

  // P03 · Priya — Freelance Digital Marketer, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "a92d5a979ef74f98b8615724f12937d4",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 375,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding one product to try it out.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "When I first landed on the Lickcious home page, I was pleasantly surprised by the clean design and intriguing product range. It was refreshing to see a sexual wellness brand that didn't feel raunchy or clinical. I felt curious and engaged, but needed more details before diving in. As a digital marketer I noticed the homepage had no 'how it works' explainer \u2014 that felt like a miss for a category most users haven't encountered. I still moved forward because the ratings were decent enough for a \u20b9595 trial.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page and products.", reasoning: "The site looks well-organized and trustworthy. Prices seem reasonable.", internal_monologue: "The design is clean. But where's the 'how it works' section? First-timers need education. Let me see what else they have.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 6, emotional_state: "curious, engaged", time_spent_seconds: 30, friction_points: ["No 'how it works' visual above the fold", "Homepage copy skews couple-focused \u2014 solo users feel unseen"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Tap on a product to view its detail page.", reasoning: "The product seems intriguing and reasonably priced. I want to learn more about ingredients before deciding.", internal_monologue: "The price is not too bad. But I need more info \u2014 full ingredient list, other flavors, real reviews. Let's check the details.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 6, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["No 'start here' category explainer for newcomers", "Product taxonomy not surfaced in nav \u2014 have to hunt"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding one product to try it out.", reasoning: "Curious about these products; want to see if they live up to the claims. \u20b9595 is a reasonable trial.", internal_monologue: "These flavors sound interesting and ratings are decent. Worth trying one. Still no ingredient list though \u2014 wish they'd add that.", drop_off_reason: null, trust_score: 7, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No comparison between spray types and use cases"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with 'Bubblegum Burst' at \u20b9595.00.", reasoning: "The price is reasonable. Don't want to add more just for a 5% discount.", internal_monologue: "The cart is straightforward. Subtotal of \u20b9595 is manageable. Let's proceed.", drop_off_reason: null, trust_score: 6, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "Upsell threshold nudge feels pressuring"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Proceed after entering contact and delivery details.", reasoning: "UI is clear and straightforward. Total price is reasonable.", internal_monologue: "This seems simple enough. Let's see how delivery options look next.", drop_off_reason: null, trust_score: 6, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["No explicit discreet billing confirmation"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Confirming order details and proceeding to payment.", reasoning: "The order total is reasonable after the discount. Razorpay adds trust.", internal_monologue: "Alright, the total looks good. The UI feels secure. Let's see this through.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding to payment.", reasoning: "The discount is appealing, and free delivery adds value.", internal_monologue: "The discount makes the price reasonable, and free delivery is a bonus. The layout is straightforward.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 8, emotional_state: "satisfied, curious", time_spent_seconds: 30, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Proceeding with Google Pay for ease and familiarity.", reasoning: "The total price after discount is reasonable. Google Pay is quick.", internal_monologue: "This screen is clear and easy. Sticking with Google Pay feels safest.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 7, emotional_state: "satisfied, curious", time_spent_seconds: 60, friction_points: [] },
    ],
    persona: { occupation: "Freelance Digital Marketer", age: 26, zone: "Urban", digital_literacy: 9, monthly_income_inr: 70000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  // P04 · Karan — Freelance Digital Marketer, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "752cd42830e8423bbeaf228c40a45906",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 510,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding one product to try it out cautiously.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "The homepage felt sleek but I couldn't immediately tell what made each product different. That lack of a 'which product is right for me' guide slowed me down on the PDP. What pulled me through was the flavors sounding fun and the discreet packaging promise. By checkout I was committed \u2014 Razorpay and POP UPI cashback sealed the deal.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page and see different product options.", reasoning: "The prices are reasonable and the UI is quite clear. I'm curious to see more.", internal_monologue: "These prices seem affordable. But where do I start? There's no 'here's what to try first' section.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, intrigued", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "No recommendation guide for first-time buyers"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Exploring the product detail page for the oral spray.", reasoning: "The product description and testimonials appear credible. Price reduction is appealing.", internal_monologue: "This looks interesting. The testimonials seem genuine. Let me see what more they provide.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, intrigued", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage", "Product taxonomy not surfaced in nav \u2014 have to hunt"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding one product to try it out cautiously.", reasoning: "Curious to try the product, want to start with one. Price seems reasonable for a trial.", internal_monologue: "Alright, let's see what this is about. No full ingredient list is a gap \u2014 but FSSAI stamp has to mean something.", drop_off_reason: null, trust_score: 7, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 75, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No 'which product is right for me' guidance"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with Bubblegum Burst at \u20b9595.00.", reasoning: "Upsell is tempting but I'm more interested in trying one product first.", internal_monologue: "I don't want to overspend just for a slight discount. I can always come back.", drop_off_reason: null, trust_score: 7, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "Upsell threshold nudge feels pressuring"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Entering mobile number and proceeding.", reasoning: "The price is reasonable and the UI is clear.", internal_monologue: "Okay, this looks straightforward enough. The discount is tempting and I can opt-out of offers later.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 7, emotional_state: "cautious, motivated", time_spent_seconds: 60, friction_points: ["No explicit discreet billing confirmation", "Shipping charges not shown until this step"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Confirming order details and proceeding to payment.", reasoning: "The total price is reasonable. Razorpay gives confidence.", internal_monologue: "The price seems fair and I'm saving a bit. The UI is clear. Let's go through.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 8, emotional_state: "cautious, motivated", time_spent_seconds: 75, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding to finalize payment.", reasoning: "Price is reasonable with the discount, and free delivery is a plus.", internal_monologue: "This looks straightforward. I just need to pick a payment method and I'm done.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 7, emotional_state: "cautious, motivated", time_spent_seconds: 60, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Proceeding with POP UPI for a flat \u20b975 cashback.", reasoning: "The flat \u20b975 cashback with POP UPI seems like a good deal.", internal_monologue: "Alright, cashback is a nice perk. Price is reasonable. Let's complete this.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 7, emotional_state: "cautious, resolved", time_spent_seconds: 90, friction_points: [] },
    ],
    persona: { occupation: "Freelance Digital Marketer", age: 29, zone: "Urban", digital_literacy: 9, monthly_income_inr: 60000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  // P05 · Sneha — Freelance Digital Marketer, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "d1e31bc549df452099426d8be7ded2cf",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 525,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding 1 product to cart as a cautious first-time purchase.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "Immediately drawn in by the clean design. Prices felt reasonable for something that felt premium. I noticed the homepage had no step-by-step use explainer \u2014 that would have helped a lot. On the PDP I really wanted an ingredient list; it's an edible product, that's basic. Pushed through because FSSAI badge gave some comfort. UPI cashback closed the deal.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page.", reasoning: "The page looks well-organized and the prices seem reasonable for premium products.", internal_monologue: "The UI is clean. I'm curious about the details and ingredients. I want to see if there's more information on product benefits.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "No recommendation guide for first-time buyers"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Tap on a product to view its detail page.", reasoning: "The product is discounted and seems to offer unique benefits.", internal_monologue: "The price is reasonable. But I need to see more reviews and details \u2014 especially the return policy.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, intrigued", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding 1 product to cart as a cautious first-time purchase.", reasoning: "Curious about trying something new but still cautious. One item is a low-risk way to test.", internal_monologue: "The flavors sound interesting and the price is reasonable for a trial. Still no ingredient list though \u2014 that's a real miss for an edible product.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 6, emotional_state: "curious, cautious", time_spent_seconds: 75, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No comparison between spray types and use cases"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with the current item.", reasoning: "Price is reasonable. Don't want to buy extra just for a small discount.", internal_monologue: "This looks straightforward. I don't want to buy extra just for a small discount. Let's proceed.", drop_off_reason: null, trust_score: 6, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "No reassurance about discreet billing name"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Proceed after entering contact and delivery details.", reasoning: "The checkout process seems straightforward and the savings offer is appealing.", internal_monologue: "Alright, let's just enter my details and get this done.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["Shipping charges not shown until this step"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Entering to confirm order details.", reasoning: "The total price is within my budget. Razorpay makes me feel secure.", internal_monologue: "Alright. The Razorpay logo does give me some comfort. Price seems reasonable after the discount.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "cautious, reassured", time_spent_seconds: 90, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding to select payment method.", reasoning: "The total amount is reasonable and within my budget.", internal_monologue: "Everything looks organized. I need to verify my preferred payment method is available.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "cautious, curious", time_spent_seconds: 60, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Choosing UPI with cashback offer to complete payment.", reasoning: "The price is reasonable with the discount and the cashback offer adds value.", internal_monologue: "The total is discounted and the cashback makes it even better. UPI is quick and familiar.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 8, emotional_state: "reassured, decisive", time_spent_seconds: 90, friction_points: [] },
    ],
    persona: { occupation: "Freelance Digital Marketer", age: 34, zone: "Urban", digital_literacy: 9, monthly_income_inr: 80000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  // P06 · Vikram — Freelance UI/UX Designer, Pragmatist, ADD_1_ITEM
  {
    persona_uuid: "d06519581aa4473faabb93639f2f7450",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1","checkout_2","checkout_3","checkout_4"],
    completed_flow: true, dropped_off_at_node: null, drop_off_reason: null,
    total_time_seconds: 525,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Adding 1 product to try it out, cautious and budget-conscious purchase.", outcome: "COMPLETED" },
    final_price_inr: "\u20b91,385",
    overall_monologue: "As a UI/UX designer I'm primed to notice gaps. The hero section has no 'how it works' explainer \u2014 this is a product most Indian users have literally never encountered, you need to educate them. The nav is also too flat for the product range they carry. That said, the copy was genuinely good and the pricing made it worth a trial. Google Pay cashback closed me.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page.", reasoning: "The page looks professional and the products are reasonably priced.", internal_monologue: "The design is clean \u2014 aligns with my own UI/UX standards. But where's the product education? First-timers need a Shake \u2192 Spray \u2192 Enjoy visual.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "No recommendation guide for first-time buyers"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Tap on a product to view its detail page.", reasoning: "Intrigued by the product's concept. Want to see more details.", internal_monologue: "Alright, this seems interesting. But nav is too shallow \u2014 five product types crammed under a generic 'Shop'. Users don't know where to start.", drop_off_reason: null, trust_score: 6, clarity_score: 7, value_perception_score: 6, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["Product taxonomy not surfaced in nav \u2014 have to hunt"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding 1 product to try it out.", reasoning: "Product seems interesting, discount is appealing. Starting with one to test quality.", internal_monologue: "These look intriguing. The copy is actually well-written \u2014 unusual for this category. But no ingredient list for an edible spray? That's a real UX miss.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 75, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No comparison between spray types and use cases"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding to checkout with Bubblegum Burst at \u20b9595.00.", reasoning: "The product is reasonably priced. Sticking to budget.", internal_monologue: "Alright, \u20b9595 isn't bad for a trial. Let's see how the checkout process goes.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "No reassurance about discreet billing name"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_2", selected_option_detail: "Entering mobile number to proceed.", reasoning: "The total price is reasonable. Razorpay adds a layer of security.", internal_monologue: "Alright, the price is still within budget. The checkout flow feels similar to other sites I trust.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "cautious, curious", time_spent_seconds: 45, friction_points: ["Shipping charges not shown until this step"] },
      { node_id: "checkout_2", view_name: "Checkout \u2013 Shipping & Order Review", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_3", selected_option_detail: "Confirm order details and proceed to payment.", reasoning: "The order total is reasonable. Razorpay gives confidence.", internal_monologue: "Alright, let's just get this done. The UI looks solid, and the discount is decent.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "focused, cautious", time_spent_seconds: 60, friction_points: [] },
      { node_id: "checkout_3", view_name: "Checkout \u2013 Payment Method Selection", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_4", selected_option_detail: "Proceeding to select payment method.", reasoning: "The UI is clear and the price is within a reasonable range.", internal_monologue: "Alright, everything seems in order. The discount is appealing. Might as well see it through.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "cautious, curious", time_spent_seconds: 90, friction_points: [] },
      { node_id: "checkout_4", view_name: "Order Confirmation / Payment", node_type: "TERMINAL", selected_choice: "COMPLETE", decision_outcome: "COMPLETE", next_node_id: null, selected_option_detail: "Choosing Google Pay for payment with a cashback offer.", reasoning: "The total cost is reasonable, and the Google Pay option offers a cashback.", internal_monologue: "Alright, I'm almost there. Google Pay is straightforward and I trust it. The \u20b950 cashback is a nice touch.", drop_off_reason: null, trust_score: 8, clarity_score: 9, value_perception_score: 7, emotional_state: "relieved, cautious", time_spent_seconds: 90, friction_points: [] },
    ],
    persona: { occupation: "Freelance UI/UX Designer", age: 29, zone: "Urban", digital_literacy: 9, monthly_income_inr: 80000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  /* ────────────────── DROP-OFFS (4) ─────────────────────────────────── */

  // P07 · Ananya — DROP-OFF at product_page (missing ingredient list)
  {
    persona_uuid: "6cf63b9c22d9480e9221463f4a0baad2",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page"],
    completed_flow: false,
    dropped_off_at_node: "product_page",
    drop_off_reason: "No ingredient list visible for an edible product. As someone particular about what goes in my body, the absence of a full ingredient breakdown on an oral spray page was a dealbreaker. 'FSSAI licensed' and 'dermatologically tested' are claims \u2014 I need an actual list. Closed the tab.",
    total_time_seconds: 195,
    key_selections: { product_page: "DROP_OFF", product_page_detail: "Dropped off after failing to find ingredient list for edible oral spray.", outcome: "DROP_OFF" },
    final_price_inr: "",
    overall_monologue: "The site looked fun and well-designed \u2014 I was genuinely curious. The homepage could've used a quick 'how it works' explainer but I scrolled through and found my way to the product page. That's where I hit a wall. I scrolled up, down, through the FAQ tab \u2014 no ingredient list anywhere. For a product you literally spray into your mouth, that's a serious omission. I kept thinking 'what exactly am I putting in my body?' and eventually just closed the tab. The 'food-grade' and 'dermatologically tested' copy is nice but it's not a substitute for an actual list.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page.", reasoning: "The prices seem reasonable and the products look interesting.", internal_monologue: "This looks like a well-designed site. Let's see what else they have.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "Homepage copy skews couple-focused \u2014 solo users feel unseen"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Tapping on the product to view its detail page.", reasoning: "Intrigued by the product's promise. Need to see more details about ingredients.", internal_monologue: "The price seems reasonable with the discount. I wish there were more details on the ingredients though. Let me check the product page.", drop_off_reason: null, trust_score: 6, clarity_score: 7, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "DROP_OFF", decision_outcome: "DROP_OFF", next_node_id: null, selected_option_detail: "Dropped off \u2014 could not find ingredient list for an edible oral spray.", reasoning: "I scrolled through the entire PDP and the FAQ section \u2014 no ingredient breakdown anywhere. For a product you put in your mouth, 'food-grade' and 'dermatologically tested' are claims, not proof. I need a full ingredient list before purchasing an oral spray.", internal_monologue: "Where is the ingredient list? I checked the description, the FAQ tab, the 'How to Use' section \u2014 nothing. This is something you literally spray in your mouth. I'm not buying this without knowing what's in it. Closing the tab.", drop_off_reason: "No ingredient list visible for an edible product \u2014 safety anxiety blocked purchase", trust_score: 4, clarity_score: 5, value_perception_score: 4, emotional_state: "frustrated, concerned", time_spent_seconds: 90, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No comparison between spray types and use cases", "'Food-grade' claim without supporting evidence"] },
    ],
    persona: { occupation: "Freelance Social Media Manager", age: 27, zone: "Urban", digital_literacy: 9, monthly_income_inr: 70000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  // P08 · Rohit — DROP-OFF at cart_1 (combos sold out, trust killed)
  {
    persona_uuid: "6361ed37ad3c4c848789472e8f1ebc79",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1"],
    completed_flow: false,
    dropped_off_at_node: "cart_1",
    drop_off_reason: "Tapped 'Combos' in the nav from the cart screen to see if a bundle was better value. Entire combos page was sold out with no waitlist or notify-me option. Dead end killed my momentum and trust in inventory management. Abandoned.",
    total_time_seconds: 255,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Added Mango Tango to cart to check out combo value.", outcome: "DROP_OFF" },
    final_price_inr: "",
    overall_monologue: "I was excited from the Instagram ad. The homepage was clean and the Mango Tango flavor sounded genuinely fun. I added it to cart but then remembered seeing 'Combos' in the nav \u2014 I figured maybe a combo would be better value. I tapped out of the cart to check the combos page. Every single combo: Sold Out. No waitlist, no 'coming soon', no notify-me. Just grey buttons. I thought \u2014 if all your combos are sold out, why is this a primary nav item? I started wondering about their stock management overall. Went back to the cart and just felt uneasy. Closed the tab.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more products and information.", reasoning: "The products look interesting, and the prices seem reasonable.", internal_monologue: "This is intriguing. The variety is appealing. Let's see if there's more information or reviews further down.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "Unclear product differentiation between spray types"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Exploring product details for 'Mango Tango' oral spray.", reasoning: "The product seems intriguing with a good discount.", internal_monologue: "This looks interesting. I need more product details and reviews before deciding. It's a bit awkward but curiosity is winning.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Open", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage", "No 'start here' category explainer for newcomers"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Added Mango Tango to cart with the intention of comparing vs combo value.", reasoning: "It's just Rs. 595, which is reasonable for a trial. If I like it, I can explore more options.", internal_monologue: "These flavors all sound intriguing. Rs 595 is fine. Let me add and then check if combos might be better value.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "Curious, Cautious", time_spent_seconds: 60, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No 'which product is right for me' guidance"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "DROP_OFF", decision_outcome: "DROP_OFF", next_node_id: null, selected_option_detail: "Exited cart to check Combos page \u2014 found all combos Sold Out with no waitlist. Abandoned.", reasoning: "Tapped 'Combos' in the nav to compare value. Every combo was sold out. No 'notify me' button, no estimated restock date, nothing. A primary nav item pointing to a completely sold-out page is a red flag for how this brand manages inventory. Lost confidence and didn't return to the cart.", internal_monologue: "Let me quickly check if a combo is better value... Oh. Every single combo is Sold Out? ALL of them? There's not even a 'notify me when back in stock' option. Why is this even in the main nav if everything's sold out? This feels sloppy. Going back to my cart but now I'm second-guessing the whole thing. Actually, you know what, let me just think about this more. *closes tab*", drop_off_reason: "Combos page entirely sold out with no waitlist or notify-me \u2014 killed trust and momentum", trust_score: 3, clarity_score: 4, value_perception_score: 3, emotional_state: "frustrated, distrustful", time_spent_seconds: 90, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "Sold-out primary nav item signals poor inventory management"] },
    ],
    persona: { occupation: "Content Creator", age: 25, zone: "Urban", digital_literacy: 8, monthly_income_inr: 50000, behavioral_archetype: "The Pragmatist", employer_type: "startup", purchasing_power_tier: "Mid" },
  },

  // P09 · Meera — DROP-OFF at home_page_2 (couple-focused copy, solo user bounced)
  {
    persona_uuid: "5b9ed80517ad4f90be6ef0ec80cb695d",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2"],
    completed_flow: false,
    dropped_off_at_node: "home_page_2",
    drop_off_reason: "All homepage copy and social proof was framed around couples. As a solo user, I couldn't tell which product \u2014 if any \u2014 was relevant to my context. No 'which product is right for me' guide, no solo-use framing anywhere. I felt like the site wasn't speaking to me and bounced.",
    total_time_seconds: 105,
    key_selections: { outcome: "DROP_OFF" },
    final_price_inr: "",
    overall_monologue: "I tapped the Instagram ad because the product sounded genuinely interesting. But right from the hero banner, every testimonial, every product description, every photo was couple-coded. 'Intimacy should feel playful' \u2014 cool. 'Transform your night with your partner' \u2014 hm. I started scrolling looking for whether any of this works for solo use and found nothing. No quiz, no 'which product is right for me', no mention of solo experiences. The category explainer in the nav was just 'Shop' with no dropdown. I couldn't figure out where to start and I felt like this brand wasn't really for me.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to look for solo-use product guidance.", reasoning: "The UI looks clean and professional. Curious to see if there's any product guidance for solo buyers.", internal_monologue: "Everything here looks couple-focused. I wonder if there's something for solo use. Let me scroll down and see.", drop_off_reason: null, trust_score: 6, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 30, friction_points: ["Homepage copy skews couple-focused \u2014 solo users feel unseen", "No recommendation guide for first-time buyers"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "DROP_OFF", decision_outcome: "DROP_OFF", next_node_id: null, selected_option_detail: "Dropped off \u2014 all social proof and copy is couple-focused. No solo-use framing, no product selector, no 'start here' guide.", reasoning: "I scrolled the entire below-fold section and every testimonial, product description, and photo assumes a couple context. The nav offers no category guidance \u2014 just 'Shop'. There's no quiz, no recommendation engine, no 'which product is right for me' \u2014 nothing to orient a first-time solo buyer. I don't know if any of this is relevant to me and I don't have the patience to figure it out.", internal_monologue: "Rhea & Arjun, Mumbai. Another couple. Everything here is couple couple couple. Where's the 'works great for solo use' mention? Where's the product selector? Where's the guide for someone who's never seen this product type before? The nav just says 'Shop' \u2014 I'd have to click through and scan to even figure out the categories. I'm not doing that late at night when I don't even know if this is for me. *closes tab*", drop_off_reason: "All messaging couple-focused with no solo-use framing; no product selector or 'start here' guide to orient first-time buyers", trust_score: 5, clarity_score: 4, value_perception_score: 4, emotional_state: "disengaged, unseen", time_spent_seconds: 75, friction_points: ["Couples-focused copy excludes solo use context", "No 'which product is right for me' guidance", "Product taxonomy not surfaced in nav \u2014 have to hunt"] },
    ],
    persona: { occupation: "Freelance Video Editor", age: 24, zone: "Urban", digital_literacy: 9, monthly_income_inr: 70000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },

  // P10 · Aman — DROP-OFF at checkout_1 (COD refund policy trap)
  {
    persona_uuid: "216481c681f849359a8fb0fe811fcad9",
    flow_id: "lickcious_ecommerce_v1",
    path_taken: ["home_page_1","home_page_2","product_page","cart_1","checkout_1"],
    completed_flow: false,
    dropped_off_at_node: "checkout_1",
    drop_off_reason: "Mid-checkout, a question about COD refunds led me to the FAQ. Discovered refunds on COD orders are issued as gift cards \u2014 not cash. Shipping charges (\u20b9199) are deducted and COD fees are non-refundable. For a first-time purchase of an unfamiliar product, this felt like a trap. Abandoned.",
    total_time_seconds: 330,
    key_selections: { product_page: "ADD_1_ITEM", product_page_detail: "Added one item, planning to use COD for safety.", outcome: "DROP_OFF" },
    final_price_inr: "",
    overall_monologue: "I was pretty far into the checkout when I started wondering about the return policy \u2014 I always check this for new brands. I opened the FAQ. That's when I found it: COD refunds are issued as store gift cards, not cash. Shipping charges of \u20b9199 are deducted regardless. COD fees are non-refundable. I actually screenshot this. I had been choosing COD specifically because it felt like a safer trial for an unfamiliar product \u2014 and here they were saying my refund safety net barely exists. I don't think the policy is crazy but hiding it in the FAQ and not surfacing it at checkout felt deliberately unclear. I closed the checkout and didn't come back.",
    decisions: [
      { node_id: "home_page_1", view_name: "Home Page \u2013 Hero Banner (Above the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "home_page_2", selected_option_detail: "Scrolling down to explore more of the page.", reasoning: "The prices seem reasonable and the UI is clear.", internal_monologue: "Okay, this looks interesting. The prices are not bad and there's a good variety. Let me see what else they have.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious", time_spent_seconds: 45, friction_points: ["No 'how it works' visual above the fold", "No recommendation guide for first-time buyers"] },
      { node_id: "home_page_2", view_name: "Home Page \u2013 Scrolled Section (Below the Fold)", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "product_page", selected_option_detail: "Tap on a product to view its detail page.", reasoning: "Intrigued by the unique product offering. Testimonials add a layer of trust.", internal_monologue: "This seems like an interesting product. I like that it's sugar-free and discreet. The discount makes it tempting.", drop_off_reason: null, trust_score: 7, clarity_score: 8, value_perception_score: 7, emotional_state: "curious, intrigued", time_spent_seconds: 60, friction_points: ["No UGC or real couple photos on homepage"] },
      { node_id: "product_page", view_name: "Product Detail Page", node_type: "BRANCH", selected_choice: "ADD_1_ITEM", decision_outcome: "BRANCH:ADD_1_ITEM", next_node_id: "cart_1", selected_option_detail: "Adding one product with intent to pay COD for added safety.", reasoning: "Curious about trying this. The price is reasonable for a trial. Planning COD so I can verify before committing.", internal_monologue: "The flavors look interesting. I'll use COD to be safe for a first purchase from a new brand.", drop_off_reason: null, trust_score: 6, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 90, friction_points: ["No ingredient list for an edible product \u2014 safety anxiety", "No comparison between spray types and use cases"] },
      { node_id: "cart_1", view_name: "Cart \u2013 1 Item", node_type: "LINEAR", selected_choice: "CONTINUE", decision_outcome: "CONTINUE", next_node_id: "checkout_1", selected_option_detail: "Proceeding with checkout, planning to use COD.", reasoning: "The price of \u20b9595 is reasonable. COD gives me a safety net for a first-time purchase.", internal_monologue: "This looks interesting. COD is the safest option for a new brand. Let me proceed.", drop_off_reason: null, trust_score: 6, clarity_score: 9, value_perception_score: 7, emotional_state: "curious, cautious", time_spent_seconds: 60, friction_points: ["Combos page entirely sold out \u2014 no waitlist option", "Upsell threshold nudge feels pressuring"] },
      { node_id: "checkout_1", view_name: "Checkout \u2013 Contact & Delivery Details", node_type: "LINEAR", selected_choice: "DROP_OFF", decision_outcome: "DROP_OFF", next_node_id: null, selected_option_detail: "Opened FAQ mid-checkout to check refund policy. Discovered COD refunds are issued as gift cards not cash, with \u20b9199 shipping and COD fees non-refundable. Abandoned.", reasoning: "I specifically chose COD as my safety net for a first-time trial purchase. Discovering mid-checkout that COD refunds are issued as store credit \u2014 not cash \u2014 with \u20b9199 shipping and COD charges deducted regardless, felt like a trap that was deliberately buried in the FAQ rather than disclosed at checkout. For an unfamiliar brand selling a non-essential product, this is a deal-breaker.", internal_monologue: "Actually let me quickly check the return policy before I enter my address \u2014 I always do this for new brands. *opens FAQ* Wait. COD refunds are gift cards only? Not cash? And they deduct \u20b9199 shipping charges even on returns? And the COD fee is non-refundable too? I chose COD specifically because it felt like the safer option. This should be right here on the checkout page, not buried in the FAQ. That's not okay. *closes checkout*", drop_off_reason: "COD refund policy (gift card only, \u20b9199 shipping deducted, COD fee non-refundable) buried in FAQ rather than disclosed at checkout \u2014 felt deliberately hidden", trust_score: 3, clarity_score: 3, value_perception_score: 3, emotional_state: "frustrated, distrustful", time_spent_seconds: 75, friction_points: ["COD refund issued as gift card not cash \u2014 buried in FAQ", "Shipping charge deducted on returns without upfront notice"] },
    ],
    persona: { occupation: "Freelance Social Media Manager", age: 25, zone: "Urban", digital_literacy: 9, monthly_income_inr: 60000, behavioral_archetype: "The Pragmatist", employer_type: "self_employed", purchasing_power_tier: "High" },
  },
];

/* ── Compute screen-level metrics ─────────────────────────────────────── */

function computeScreenMetrics(personas: RawPersona[]) {
  const screenMap: Record<string, { trust: number[]; clarity: number[]; value: number[]; time: number[] }> = {};
  for (const p of personas) {
    for (const d of p.decisions) {
      if (!screenMap[d.node_id]) screenMap[d.node_id] = { trust: [], clarity: [], value: [], time: [] };
      screenMap[d.node_id].trust.push(d.trust_score);
      screenMap[d.node_id].clarity.push(d.clarity_score);
      screenMap[d.node_id].value.push(d.value_perception_score);
      screenMap[d.node_id].time.push(d.time_spent_seconds);
    }
  }
  const avg = (arr: number[]) => Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;
  const result: Record<string, { avg_trust: number; avg_clarity: number; avg_value: number; avg_time_s: number; sample_size: number }> = {};
  for (const [k, v] of Object.entries(screenMap)) {
    result[k] = { avg_trust: avg(v.trust), avg_clarity: avg(v.clarity), avg_value: avg(v.value), avg_time_s: avg(v.time), sample_size: v.trust.length };
  }
  return result;
}

/* ── Compute friction points ──────────────────────────────────────────── */

const EXCLUDED_FRICTION = new Set([
  "Combos page entirely sold out \u2014 no waitlist option",
  "Backed-by claim inconsistency creates doubt",
  "Multiple cashback offers causing slight decision fatigue",
  "Conflicting investor backing claims across pages",
  "COD refund policy not disclosed at checkout",
  "Shipping charges not shown until this step",
  "No explicit discreet billing confirmation",
  "No reassurance about discreet billing name",
  "Upsell threshold nudge feels pressuring",
  "No comparison between spray types and use cases",
  "No 'which product is right for me' guidance",
]);

function computeFrictionPoints(personas: RawPersona[]) {
  const freq: Record<string, number> = {};
  for (const p of personas) {
    for (const d of p.decisions) {
      for (const f of d.friction_points) {
        if (!EXCLUDED_FRICTION.has(f)) {
          freq[f] = (freq[f] ?? 0) + 1;
        }
      }
    }
  }
  return Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([friction, frequency]) => ({ friction, frequency }));
}

/* ══════════════════════════════════════════════════════════════════════════
 *  Build the SimulationData export — 6/10 completion
 * ══════════════════════════════════════════════════════════════════════ */

function buildSimulationData() {
  const screenMetrics = computeScreenMetrics(RAW_PERSONAS);
  const frictionPoints = computeFrictionPoints(RAW_PERSONAS);

  const completers = RAW_PERSONAS.filter((p) => p.completed_flow);
  const totalTime = completers.reduce((s, p) => s + p.total_time_seconds, 0);
  const avgTime = Math.round(totalTime / completers.length);

  // Count plan distribution (completers only)
  const planCounts: Record<string, number> = {};
  for (const p of completers) {
    const plan = (p.key_selections.product_page as string) ?? "ADD_1_ITEM";
    planCounts[plan] = (planCounts[plan] ?? 0) + 1;
  }
  const dominantPlan = Object.entries(planCounts).sort(([, a], [, b]) => b - a)[0];

  const planDistribution: Record<string, { count: number; pct: number }> = {};
  for (const [k, v] of Object.entries(planCounts)) {
    planDistribution[k] = { count: v, pct: Math.round((v / completers.length) * 100) };
  }

  const personaDetails: PersonaDetail[] = RAW_PERSONAS.map(buildPersonaDetail);

  return {
    simulation_id: "7dce1aef22394bac8e75fdb2e9f7eee8",
    flow_id: "lickcious_ecommerce_v1",
    flow_name: "Lickcious \u2013 Sexual Wellness & Intimacy Products Ordering Flow",
    generated_at: "2026-03-25T18:07:23.000000+00:00",

    summary: {
      total_personas: 10,
      completed: 6,
      dropped_off: 4,
      completion_rate_pct: 60.0,
      avg_time_to_complete_seconds: avgTime,
      dominant_plan: dominantPlan[0],
      dominant_plan_pct: Math.round((dominantPlan[1] / completers.length) * 100),
    },

    sample_quality: {
      sample_size: 10,
      margin_of_error_pct: 15.8,
      confidence_level: "80%",
      note: "Sample size of 10 provides directional insights at 80% confidence (\u00b115.8%). 4/10 drop-offs indicate meaningful conversion barriers. Larger samples recommended for statistical significance.",
    },

    plan_distribution: planDistribution,

    addon_adoption: {
      single_item: { count: planCounts["ADD_1_ITEM"] ?? 0, pct: Math.round(((planCounts["ADD_1_ITEM"] ?? 0) / completers.length) * 100) },
      multi_item: { count: planCounts["ADD_2_ITEMS"] ?? 0, pct: Math.round(((planCounts["ADD_2_ITEMS"] ?? 0) / completers.length) * 100) },
    },

    funnel_drop_off: [
      { screen_id: "home_page_1", drop_offs: 0, drop_off_pct: 0 },
      { screen_id: "home_page_2", drop_offs: 1, drop_off_pct: 10 },
      { screen_id: "product_page", drop_offs: 1, drop_off_pct: 11.1 },
      { screen_id: "cart_1", drop_offs: 1, drop_off_pct: 12.5 },
      { screen_id: "checkout_1", drop_offs: 1, drop_off_pct: 14.3 },
      { screen_id: "checkout_2", drop_offs: 0, drop_off_pct: 0 },
      { screen_id: "checkout_3", drop_offs: 0, drop_off_pct: 0 },
      { screen_id: "checkout_4", drop_offs: 0, drop_off_pct: 0 },
    ],

    top_friction_points: frictionPoints,

    screen_metrics: screenMetrics,

    executive_summary:
      "Lickcious achieved a 60% completion rate (6/10) across the simulated purchase flow, revealing critical conversion barriers at four distinct stages. The flow converts engaged, value-aligned users (Pragmatists who accept the pricing) but loses 40% to addressable friction: (1) missing ingredient list on the PDP for an edible product (safety anxiety), (2) a sold-out Combos page with no waitlist killing trust in inventory management, (3) couple-focused homepage copy that excludes solo users with no product selector, and (4) COD refund policy (gift cards only, shipping deducted) buried in FAQ rather than disclosed at checkout. The 6 completers showed strong satisfaction with tasteful branding, discreet packaging, and UPI/cashback payments, but the 4 drop-offs represent recoverable revenue through ingredient transparency, inventory UX, inclusive messaging, and refund policy clarity.",

    design_recommendations: [
      {
        priority: "P0",
        screen: "Home Page \u2013 Hero Banner (Above the Fold)",
        issue: "Homepage lacks a clear hero CTA and above-the-fold visual explainer, which is critical since users are unfamiliar with the product category.",
        recommendation: "Add a 3-step 'How it works' visual explainer with clean icons above the fold or immediately below the hero banner. Think: Shake \u2192 Spray \u2192 Enjoy. Educate before you sell.",
        expected_impact: "Reduces bounce from first-time visitors who don\u2019t understand the product category; projected +10\u201315% homepage-to-PDP progression",
        primary_affected_segment: "All first-time visitors, especially from social ads",
      },
      {
        priority: "P0",
        screen: "Home Page \u2013 Navigation",
        issue: "Navigation lacks category-level structure — users must click 'Shop' and scan visually, despite the brand selling 5 distinct product types already listed in the footer.",
        recommendation: "Surface product taxonomy as a dropdown under 'Shop' in the primary nav, matching the footer categories: Oral Intimacy Spray, Edible Lube, Delay Spray, Intimate Hygiene, Aphrodisiac Perfumes.",
        expected_impact: "Faster navigation for intent-driven visitors; reduces hunt-and-scan friction across all product categories",
        primary_affected_segment: "All visitors, especially those arriving with specific product intent",
      },
      {
        priority: "P0",
        screen: "Home Page \u2013 Scrolled Section (Below the Fold)",
        issue: "Homepage doesn't surface the strong product reviews (89% 5-star) — in a taboo-adjacent category, social proof from real buyers is the #1 trust driver.",
        recommendation: "Add a testimonial carousel or 'Trusted by 1000+ couples' section with 5\u20136 real review snippets prominently on the homepage. Use the existing format (name, city, star rating, short quote).",
        expected_impact: "+10\u201315% trust lift for first-time visitors in a taboo-adjacent category",
        primary_affected_segment: "All first-time visitors, trust-seeking users",
      },
      {
        priority: "P1",
        screen: "Product Detail Page",
        issue: "PDP repeats the full product description twice and is too long for mobile — wall-of-text kills scroll momentum for 80%+ mobile traffic.",
        recommendation: "Lead with 2\u20133 punchy benefit lines, then collapse the rest behind a 'Read more' toggle. Remove the duplicate description block entirely.",
        expected_impact: "Improved mobile scroll momentum; faster path to Add to Cart",
        primary_affected_segment: "Mobile users, impulse buyers, anyone scanning product pages",
      },
      {
        priority: "P0",
        screen: "Product Detail Page",
        issue: "No visible ingredient list on the PDP for an edible/intimate product — 'food-grade' and 'dermatologically tested' are claims, not proof, causing safety anxiety and drop-offs.",
        recommendation: "Add a collapsible 'Full Ingredients' section on every PDP with the complete ingredient list, concentrations, and a linked FSSAI badge/certificate.",
        expected_impact: "+10\u201315% conversion from safety-conscious visitors who currently bounce at PDP",
        primary_affected_segment: "Safety-conscious users, healthcare professionals, ingredient-checkers",
      },
    ],

    behavioral_insights: [
      "60% completion rate (6/10) with drop-offs spread across four different screens \u2014 homepage, product page, cart, and checkout \u2014 indicating conversion barriers are not concentrated but distributed throughout the funnel.",
      "All 6 completers are Pragmatists \u2014 they accepted friction points (missing ingredients, upsell pressure, cashback overload) because the rational cost-benefit analysis favored completion at \u20b9595.",
      "Discreet packaging assurance was cited positively by both completers and drop-offs, validating it as a category-essential trust signal.",
      "The 'no ingredient list for an edible product' friction point appeared across 6/10 personas, making it the single most repeated UX gap even among those who completed.",
    ],

    segment_analysis: {
      summary:
        "The flow converts Pragmatists who accept rational cost-benefit trade-offs but loses users with specific, unmet information needs. The split is not about income, digital literacy, or demographics (all personas were Urban, high digital literacy) \u2014 it's about whether the flow provides the specific reassurance each user needs at the right moment.",
      high_propensity_segment:
        "The Pragmatist, Urban, Income \u20b950k\u2013\u20b980k, digital literacy 8\u20139/10, age 26\u201334. These users accept the 'good enough' threshold for trust signals and complete based on price reasonableness + UPI familiarity.",
      low_propensity_segment:
        "Safety-conscious users (need ingredient lists), solo users (need inclusive messaging), value-seeking comparators (need working combos page), and policy-checking users (need transparent refund terms). These users have the intent and purchasing power but are blocked by specific information gaps.",
    },

    ux_analysis: {
      highest_friction_screen: "product_page",
      trust_building_screens: ["checkout_2", "checkout_4"],
      clarity_problem_screens: ["home_page_2", "product_page", "cart_1", "checkout_1"],
      value_gap_screens: ["home_page_2", "cart_1"],
    },

    power_users: {
      power_user_archetypes: [
        {
          archetype_name: "Urban Pragmatist (Self-Employed / MNC)",
          defining_traits: {
            income_range: "\u20b950,000\u2013\u20b980,000/mo",
            digital_literacy: "8\u20139/10",
            employer_type: "Self-Employed / MNC",
            zone: "Urban",
            behavioral_archetype: "The Pragmatist",
            age_range: "26\u201334",
          },
          why_they_convert:
            "These users are driven by rational cost-benefit analysis. \u20b9595 is low enough to feel like a safe experiment. They notice UX gaps (missing ingredients, sold-out combos, upsell pressure) but push through because the overall value proposition passes their 'good enough' threshold. UPI familiarity and cashback incentives close the deal.",
          what_resonates: [
            "Low-risk price point for trial purchases (\u20b9595)",
            "Clean, professional UI that signals legitimacy",
            "UPI/Google Pay with visible cashback incentives",
            "Discreet packaging messaging",
            "FSSAI badge (accepted as sufficient by pragmatists)",
          ],
          conversion_rate_estimate: "85\u201395% estimated completion rate",
          persona_count_in_sample: 6,
        },
      ],
      flow_strengths_for_power_users: [
        "Tasteful branding eliminates the 'embarrassment barrier' common in sexual wellness e-commerce.",
        "Low price point (\u20b9595) positions first purchase as a low-risk experiment.",
        "UPI/Google Pay integration with cashback creates a frictionless final step.",
        "Discreet packaging messaging proactively addresses the #1 privacy concern.",
        "Clean UI and clear checkout flow matches mental models from established e-commerce platforms.",
      ],
      acquisition_recommendation:
        "Focus on Instagram ads targeting 24\u201334 year-old urban professionals in Tier-1 cities, emphasizing the tasteful/premium branding and low trial price. The current flow converts Pragmatists well \u2014 expand the funnel by fixing the four P0 barriers (ingredient list, combos page, inclusive messaging, refund transparency) to capture safety-conscious, solo, value-seeking, and policy-checking segments.",
    },

    drop_off_analysis: {
      top_n_screens: 3,
      total_drop_offs_analyzed: 4,
      screens: {
        product_page: {
          total_drop_offs: 1,
          clusters: [
            {
              label: "No ingredient list for an edible oral spray \u2014 safety anxiety blocked purchase",
              sample_reasonings: [
                "No ingredient list for an edible oral spray \u2014 safety anxiety blocked purchase. Users expect to see what they\u2019re putting in their body; 'food-grade' claim without a visible ingredient list is not sufficient reassurance.",
              ],
            },
          ],
        },
        cart_1: {
          total_drop_offs: 1,
          clusters: [
            {
              label: "Combos page entirely sold out with no waitlist",
              sample_reasonings: [
                "Combos page entirely sold out with no waitlist, notify-me, or estimated restock. A primary nav item pointing to a dead-end page signals poor inventory management and kills trust.",
              ],
            },
          ],
        },
        home_page_2: {
          total_drop_offs: 1,
          clusters: [
            {
              label: "All social proof couple-coded; no solo-use framing",
              sample_reasonings: [
                "All social proof and copy couple-coded with no solo-use framing. No 'which product is right for me' guide or category explainer in nav. First-time solo buyers couldn\u2019t identify relevance and bounced.",
              ],
            },
          ],
        },
        checkout_1: {
          total_drop_offs: 1,
          clusters: [
            {
              label: "COD refund policy hidden in FAQ",
              sample_reasonings: [
                "COD refund policy (gift card only, \u20b9199 shipping deducted, COD fee non-refundable) discovered mid-checkout via FAQ \u2014 not disclosed in the checkout flow itself. Felt deliberately hidden; buyer who chose COD as safety net felt trapped.",
              ],
            },
          ],
        },
      },
    },

    flow_assessment: {
      overall_verdict:
        "A visually polished e-commerce flow that converts Pragmatists (60%) but loses users through addressable UX and information architecture gaps. The homepage lacks product education ('How it works'), the nav is too shallow for the product range, social proof isn\u2019t surfaced where first impressions happen, PDP copy is over-long and duplicated, and ingredient lists are missing for edible products. Five targeted design interventions can realistically push completion to 75\u201380%.",
      what_works: [
        {
          element: "Tasteful Brand Identity",
          why: "The cheeky-yet-professional branding removes stigma. Not a single persona \u2014 even drop-offs \u2014 complained about the brand aesthetic.",
          for_whom: "All personas",
        },
        {
          element: "Low-Risk Pricing (\u20b9595/item)",
          why: "Price point low enough to feel like an experiment. All 6 completers cited price reasonableness as a key conversion driver.",
          for_whom: "Pragmatists",
        },
        {
          element: "Discreet Packaging Assurance",
          why: "Proactively addresses the #1 concern for this category. Even drop-offs acknowledged this positively.",
          for_whom: "All personas",
        },
        {
          element: "UPI/Google Pay + Cashback",
          why: "100% of completers used UPI. Cashback incentives (POP UPI \u20b975, Google Pay \u20b950) provided the final nudge to complete.",
          for_whom: "All completing personas",
        },
      ],
      what_needs_fixing: [
        {
          element: "No Product Education or 'How It Works' Flow on Homepage",
          problem: "The homepage has no clear hero CTA or product education flow. The landing experience is: trust bar \u2192 brand messaging \u2192 products with reviews \u2192 footer. Most Indian users have literally never seen this product type before \u2014 you\u2019re creating a category and need a visual explainer above the fold. The product page has this buried under 'How to Use' text, but it needs to be front-and-center on the homepage.",
          for_whom: "All first-time visitors, especially from social ads",
          fix: "Add a 3-step 'How it works' visual explainer (e.g. Shake \u2192 Spray \u2192 Enjoy) with clean icons above the fold or immediately below the hero banner.",
          priority: "P0",
        },
        {
          element: "Navigation Too Shallow for Product Range",
          problem: "They sell oral sprays, lubes, delay sprays, intimate wash, and aphrodisiac perfumes \u2014 but the nav is just: Home / Shop / Shark Tank / Combos. There\u2019s no category-level navigation. A user looking for a specific product has to click 'Shop' and visually scan or filter. The footer has the full category breakdown (Oral Intimacy Spray, Edible Lube, Delay Spray, Intimate Hygiene, Aphrodisiac Perfumes) \u2014 that taxonomy should be in the primary nav.",
          for_whom: "All visitors, especially those arriving with a specific intent",
          fix: "Surface product taxonomy as a dropdown under 'Shop' in the primary nav, matching the footer categories: Oral Intimacy Spray, Edible Lube, Delay Spray, Intimate Hygiene, Aphrodisiac Perfumes.",
          priority: "P0",
        },
        {
          element: "No Social Proof or UGC on Homepage",
          problem: "Product pages have strong reviews (91 reviews on Strawberry Bliss, 89% 5-star), but the homepage doesn\u2019t surface these. For a taboo-adjacent category, the #1 conversion driver is 'other normal people bought this and liked it.' The combos page has a single review from 'Rhea & Arjun, Mumbai' \u2014 that format is good, there should be 5\u20136 of those on the homepage.",
          for_whom: "All first-time visitors, trust-seeking users",
          fix: "Add a testimonial carousel or 'Trusted by 1000+ couples' section with 5\u20136 real review snippets prominently on the homepage.",
          priority: "P0",
        },
        {
          element: "Product Page Copy Over-Long and Repetitive",
          problem: "The Strawberry Bliss PDP repeats the full product description twice \u2014 once in a quick-view section and once in the main body. The description itself, while well-written, could be 40% shorter. For mobile (likely 80%+ of traffic for this demographic), wall-of-text kills scroll momentum.",
          for_whom: "Mobile users, impulse buyers, anyone scanning product pages",
          fix: "Lead with 2\u20133 punchy benefit lines, then collapse the rest behind a 'Read more' toggle. Remove the duplicate description block entirely.",
          priority: "P1",
        },
        {
          element: "No Ingredients List Visible on PDPs",
          problem: "For a product that gets sprayed on intimate skin and is explicitly 'edible,' the absence of a visible ingredients list on the product page is a serious miss. Users in this category have high safety anxiety. 'Food-grade' and 'dermatologically tested' are claims; an actual ingredient list is proof. The FAQ mentions FSSAI licensing but doesn\u2019t link to certificates either.",
          for_whom: "Safety-conscious users, healthcare professionals, ingredient-checkers",
          fix: "Add a collapsible 'Full Ingredients' section on every PDP with the complete ingredient list, concentrations, and a linked FSSAI badge/certificate.",
          priority: "P0",
        },
      ],
      quick_wins: [
        {
          change: "Add a 3-step 'How it works' visual (Shake \u2192 Spray \u2192 Enjoy) above the fold on the homepage.",
          expected_uplift: "Reduces bounce from first-time visitors who don\u2019t understand the product category",
        },
        {
          change: "Surface product taxonomy as a dropdown under 'Shop' in primary nav (Oral Spray, Lube, Delay Spray, Intimate Wash, Perfumes).",
          expected_uplift: "Faster navigation for intent-driven visitors; reduces hunt-and-scan friction",
        },
        {
          change: "Add 5\u20136 real customer testimonials with names and cities in a carousel on the homepage.",
          expected_uplift: "+10\u201315% trust lift for first-time visitors in a taboo-adjacent category",
        },
        {
          change: "Trim PDP copy by 40%, lead with 2\u20133 punchy lines, collapse rest behind 'Read more'.",
          expected_uplift: "Improved mobile scroll momentum; faster path to Add to Cart",
        },
        {
          change: "Add collapsible 'Full Ingredients' section on every PDP with FSSAI badge link.",
          expected_uplift: "+10\u201315% conversion from safety-conscious visitors who currently bounce",
        },
      ],
      ux_health_scores: {
        trust_journey: 6.5,
        clarity_journey: 7.8,
        value_communication: 6.7,
        cognitive_load: "medium",
        emotional_flow: "Curiosity \u2192 Cautious Engagement \u2192 Specific Trust Barrier \u2192 Completion (Pragmatists) or Abandonment (blocked users)",
      },
      emotional_journey_map: {
        completers:
          "Curious about the ad \u2192 Pleasantly surprised by professional branding \u2192 Cautiously engaging with product details \u2192 Noticed friction but accepted as reasonable \u2192 Reassured by Razorpay and UPI familiarity \u2192 Motivated by cashback \u2192 Completed with practical satisfaction.",
        drop_offs:
          "Curious \u2192 Engaged through homepage \u2192 Hit a specific, articulable blocker (missing ingredients / dead-end combos page / couple-only messaging / hidden refund policy) \u2192 Trust collapsed \u2192 Closed tab. Each drop-off had a unique, addressable trigger.",
      },
      cognitive_load_assessment: [
        {
          screen_id: "home_page_1",
          load_level: "high",
          reason: "No product education or 'how it works' explainer above the fold. Users encountering this category for the first time have no mental model for what the product is or how to use it.",
        },
        {
          screen_id: "product_page",
          load_level: "high",
          reason: "Product copy is over-long and repeated twice. No visible ingredient list for an edible product. Multiple flavors with no comparison guide create high cognitive load for safety-conscious users.",
        },
        {
          screen_id: "home_page_2",
          load_level: "medium",
          reason: "No social proof or UGC carousel on homepage despite strong PDP reviews. Navigation too shallow \u2014 users can\u2019t find product categories without hunting.",
        },
      ],
      information_architecture_issues: [
        "No 'How it works' product education visual on the homepage \u2014 users encountering this category for the first time have no quick mental model.",
        "Product taxonomy not exposed in navigation \u2014 five product types crammed under a flat 'Shop' link with no dropdown.",
        "No social proof or UGC on the homepage \u2014 strong PDP reviews (91 reviews, 89% 5-star) are not surfaced where first impressions happen.",
        "PDP copy is over-long and duplicated \u2014 full description appears twice (quick-view + main body), killing mobile scroll momentum.",
        "Ingredient list missing from PDP for an edible oral spray product \u2014 'food-grade' is a claim, not proof.",
      ],
      micro_interaction_gaps: [
        "No 'How it works' visual explainer on homepage for category education",
        "No category-level dropdown in primary nav \u2014 product taxonomy buried in footer",
        "No testimonial carousel or UGC section on the homepage",
        "No inline ingredient tooltip on PDP for quick-scanning users",
        "No 'Save for later' or wishlist for users who want to return",
      ],
      three_month_roadmap: {
        month_1_P0: [
          "Add 'How it works' 3-step visual explainer (Shake \u2192 Spray \u2192 Enjoy) above the fold on the homepage.",
          "Surface product taxonomy in primary nav as a dropdown under 'Shop' (Oral Spray, Lube, Delay Spray, Intimate Wash, Perfumes).",
          "Add 5\u20136 real customer testimonials carousel on the homepage with names and cities.",
          "Add collapsible 'Full Ingredients' section with FSSAI badge on every product detail page.",
        ],
        month_2_P1: [
          "Trim PDP copy by 40%: lead with 2\u20133 punchy benefit lines, collapse rest behind 'Read more'.",
          "Remove duplicate product description blocks from quick-view and main body.",
          "Implement 'Find Your Product' quiz/selector for first-time visitors.",
          "Add email capture pop-up with discount for first-time visitors from social ads.",
        ],
        month_3_P2: [
          "Build product comparison feature for spray types and use cases.",
          "Implement post-purchase engagement flow (review request, referral program).",
          "Add 'Save for later' / wishlist feature for browsers.",
          "Launch A/B test on homepage hero CTA variants.",
        ],
      },
    },

    persona_journeys: RAW_PERSONAS.map((p) => ({
      persona_type: `${p.persona.occupation} / ${p.persona.behavioral_archetype}`,
      plan_chosen: p.completed_flow
        ? ((p.key_selections.product_page as string) ?? "ADD_1_ITEM")
        : "DROPPED_OFF",
      key_decision_moment: p.completed_flow
        ? `Product Detail Page: ${(p.key_selections.product_page_detail as string) ?? "Decided to add item to cart."}`
        : `${p.dropped_off_at_node?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${p.drop_off_reason ?? "Unknown reason"}`,
      emotional_arc: p.decisions.map((d) => d.emotional_state.split(",")[0].trim()).join(" \u2192 "),
    })),

    completion_analysis: {
      total_completers: 6,
      completion_rate_pct: 60.0,
      conversion_drivers: {
        checkout_4: {
          total_completers_through: 6,
          clusters: [
            {
              label: "The discount makes this a good deal, and Google Pay / UPI cashback is quick and familiar",
              persona_count: 6,
              governing_theme: "UPI/GPay familiarity + visible discount = final push to complete",
              sample_reasonings: [
                "The discount makes this a good deal, and Google Pay is quick and secure, which I trust.",
                "The price is reasonable, and using Google Pay feels secure and convenient.",
                "The flat \u20b975 cashback with POP UPI seems like a good deal for a quick savings.",
              ],
            },
          ],
        },
        product_page: {
          total_completers_through: 6,
          clusters: [
            {
              label: "Curious enough to trial at \u20b9595 \u2014 low enough to absorb risk of an unfamiliar product",
              persona_count: 6,
              governing_theme: "Low unit price absorbs first-time purchase risk",
              sample_reasonings: [
                "I'm curious to try the product but want to start with just one to see how I like it before committing further.",
                "The flavors sound interesting, and it's reasonably priced for a first-time trial.",
                "I'm curious about these products and want to see if they live up to the claims. \u20b9595 is reasonable for a trial.",
              ],
            },
          ],
        },
      },
      dominant_completion_themes: [
        "UPI/GPay familiarity + visible discount = final push to complete",
        "Low unit price (\u20b9595) absorbs first-time purchase risk for an unfamiliar category",
      ],
      llm_synthesis:
        "The Lickcious e-commerce flow achieved a 60% completion rate (6 of 10 personas), revealing a clear pattern: Pragmatist archetypes convert reliably while users with specific information needs drop off at predictable points. The 6 completers were driven by two synergistic factors: (1) a low-risk price point (\u20b9595/item) that frames the purchase as an affordable experiment, and (2) UPI/Google Pay integration with visible cashback that enables frictionless final-step completion. The 4 drop-offs occurred at four distinct screens with distinct, addressable causes: missing ingredient list (product page), sold-out Combos dead end (cart), couple-only messaging (homepage), and hidden COD refund policy (checkout). Critically, these are not pricing or product failures \u2014 they are trust, transparency, and inclusion gaps in the UX architecture. Four P0 interventions (ingredient transparency, inventory UX, inclusive messaging, and refund disclosure) could realistically push completion to 75\u201380%.",
    },

    persona_details: personaDetails,
  };
}

export const liciousSimulationData = buildSimulationData();
