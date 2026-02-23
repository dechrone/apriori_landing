import type { FlowAnalysisData } from "@/types/flow-analysis";

/**
 * Dummy flow analysis data from PRD. Replace with API response when integrated.
 */
export const flowAnalysisDummyData: FlowAnalysisData = {
  meta: {
    product: "Blink Money",
    flow: "LAMF Onboarding — Flow 1",
    date: "February 2026",
    totalPersonas: 10,
    completionRate: 40,
  },
  screens: [
    { id: "S1", label: "PAN / KYC", order: 1 },
    { id: "S2", label: "OTP Verify", order: 2 },
    { id: "S3", label: "Eligibility", order: 3 },
    { id: "S4", label: "Offer Screen", order: 4 },
    { id: "S5", label: "Rate Review", order: 5 },
    { id: "S6", label: "Final Structure", order: 6 },
  ],
  funnel: [
    { screen: "S1", entered: 10, dropped: 0 },
    { screen: "S2", entered: 10, dropped: 0 },
    { screen: "S3", entered: 10, dropped: 2 },
    { screen: "S4", entered: 8, dropped: 1 },
    { screen: "S5", entered: 7, dropped: 0 },
    { screen: "S6", entered: 7, dropped: 3 },
  ],
  rootCauses: [
    {
      id: "RC1",
      screen: "S3",
      title: "No lender identity or pledge explanation",
      detail:
        "Users needed to know who is lending and what happens to their MFs before they could proceed. This was never answered.",
      affectedPersonas: ["Deepak N.", "Sunita K."],
      severity: "high",
    },
    {
      id: "RC2",
      screen: "S4",
      title: "LAMF terms absent — personal loan pushed instead",
      detail:
        "Screen 4 presented a personal loan without ever surfacing LAMF rates or terms. First-time users read this as deception.",
      affectedPersonas: ["Suresh I.", "Neha G.", "Kiran R."],
      severity: "high",
    },
    {
      id: "RC3",
      screen: "S6",
      title: "Hybrid loan structure revealed too late",
      detail:
        "The blended LAMF + personal loan split appeared at the final screen with no prior context. Users who made it this far exited at the worst possible moment.",
      affectedPersonas: ["Anjali K.", "Amit J."],
      severity: "critical",
    },
  ],
  oneBet: {
    title: "Show lender identity + pledge safety + blended loan structure on Screen 1",
    rationale:
      "Three of four drop-off causes share a single root: users reached a commitment screen without the foundational information they needed. Surfacing trust signals, pledge mechanics, and loan structure on Screen 1 removes the anxiety that accumulates across every subsequent screen.",
    effort: "Medium",
    impact: "High",
    projectedCompletion: "65–70%",
    currentCompletion: 40,
    personas: ["Deepak N.", "Anjali K.", "Suresh I.", "Amit J."],
    personaDetails: [
      { name: "Deepak N.", role: "Govt. Employee · First-timer" },
      { name: "Anjali K.", role: "School Principal · First-timer" },
      { name: "Suresh I.", role: "Finance Manager · First-timer" },
      { name: "Amit J.", role: "Consultant · First-timer" },
    ],
    whatChanges: [
      {
        number: "+1",
        title: "Regulatory Trust Badge",
        description:
          "SEBI/RBI registration + partner bank name and logo on Screen 1.",
        icon: "shield",
        benefit: "Builds initial trust",
      },
      {
        number: "+2",
        title: "Pledge Safety Banner",
        description:
          "Persistent banner across S1–S3 confirming no auto-liquidation.",
        icon: "flag",
        benefit: "Removes fear",
      },
      {
        number: "+3",
        title: "LAMF 3-Card Explainer",
        description:
          "Micro-explainer on pledging, changes, and missed payments.",
        icon: "book-open",
        benefit: "Clarifies process",
      },
    ],
  },
  dropReasons: {
    S3: "No lender identity or pledge explanation",
    S4: "LAMF terms absent — personal loan pushed instead",
    S6: "Hybrid loan structure revealed too late",
  },
  dropPersonas: {
    S3: ["Deepak N.", "Sunita K."],
    S4: ["Suresh I."],
    S6: ["Anjali K.", "Amit J.", "Neha G."],
  },
  patterns: [
    {
      stat: "5/10",
      title: "Needed to know who's lending before sharing data",
      description:
        "No SEBI/RBI badge or bank name visible on Screen 1. First-time users will not share PAN with an unidentified entity.",
    },
    {
      stat: "7/10",
      title: "Nobody explained what happens to their mutual funds",
      description:
        "SIP continuity, legal ownership status, and auto-liquidation risk were never addressed. This is the primary anxiety for first-time LAMF users.",
    },
    {
      stat: "4/10",
      title: "Hybrid loan structure felt like a bait-and-switch",
      description:
        "The LAMF + personal loan split appeared only at the final screen. Users who made it this far exited at the worst possible moment.",
    },
    {
      stat: "3/10",
      title: "Rate was hidden until users were already committed",
      description:
        "APR and processing fees appeared on S5–S6. Users need the indicative rate range before KYC begins, not after.",
    },
    {
      stat: "2/10",
      title: "Urgency buys patience — it does not replace trust",
      description:
        "Even emergency-urgency personas dropped when trust collapsed at S6. Urgency extends the window; it does not close the gap.",
    },
    {
      stat: "3/10",
      title: "First-timers needed plain language, not product jargon",
      description:
        "Terms like \"LTV haircut\" and \"pledge lien\" were never explained. These are comprehension gaps, not distrust signals.",
    },
  ],
  quotes: [
    {
      quote:
        "Where are the interest rates? And what about my mutual funds? I can't proceed without knowing this.",
      attribution: "Deepak N. · Dropped at S1",
    },
    {
      quote:
        "This is a bait-and-switch. My portfolio is ₹7L — offering ₹60K LAMF is insulting. Why wasn't this explained upfront?",
      attribution: "Kiran R. · Dropped at S4",
    },
    {
      quote:
        "I can't risk my ₹6L portfolio without understanding the pledge terms. What if I miss a payment?",
      attribution: "Rajesh S. · Dropped at S5",
    },
    {
      quote:
        "Screen 4 presented a personal loan. I came here for a mutual funds loan. First-time users will read this as deception.",
      attribution: "Anjali K. · Dropped at S4",
    },
  ],
  personas: [
    {
      id: "P01",
      name: "Rajesh Sharma",
      role: "Ops Manager, 43",
      city: "Delhi",
      lamfExp: "First-time",
      urgency: "Emergency",
      need: "₹2,50,000 (Medical)",
      fear: "MFs sold without consent",
      outcome: "completed",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction:
            "Looks secure enough for first step, but where's any mention of my mutual funds?",
          reasoning: "Medical emergency is pushing me forward. Basic KYC seems standard.",
          frictionPoints: ["No SEBI badge", "No partner bank", "Zero MF safety mention"],
          missing: "A clear 'Regulated by SEBI' badge with registration number",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction: "Standard OTP screen, but where's any mention of my mutual funds?",
          reasoning: "Emergency need pushes me through standard verification steps quickly.",
          frictionPoints: ["No MF pledge details yet", "Haven't seen interest rates"],
          missing: "Info box explaining why OTP verification comes before loan terms",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Rate seems decent, but where's info about what happens to my MFs if I miss payments?",
          reasoning:
            "Given emergency and immediate need for ₹2.5L, eligible amount works. Hoping next screen addresses pledge mechanics.",
          frictionPoints: ["No pledge mechanics", "Missing processing fees", "No SEBI credentials"],
          missing: "Clear explanation of what happens to pledged MFs in case of payment delays",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "Rates look decent but why is it mixing LAMF with personal loan?",
          reasoning:
            "Rates are competitive and I need this urgently. Proceeding mainly due to emergency need.",
          frictionPoints: ["No MF pledge sequence explanation", "Missing collateral protection"],
          missing: "Clear explanation of MF pledge sequence and protection guarantees",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction:
            "Rates look reasonable but mixing LAMF with personal loan makes me nervous.",
          reasoning: "Urgency overriding concerns. Better than credit card alternatives.",
          frictionPoints: [
            "LAMF eligibility unexplained vs portfolio value",
            "Forced personal loan component",
          ],
          missing: "Clear explanation of how LAMF eligibility is calculated",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 7,
          clarityScore: 6,
          gutReaction: "Finally approved, but why is part of it a personal loan?",
          reasoning: "Medical emergency requires these funds today. Total amount covers my need.",
          frictionPoints: [
            "Unexpected split loan structure",
            "No disbursement timeline",
            "Missing MF pledge details",
          ],
          missing:
            "Exact timeline for when funds will be in my account given medical emergency",
        },
      ],
    },
    {
      id: "P02",
      name: "Deepak Nair",
      role: "Govt. Employee, 52",
      city: "Kochi",
      lamfExp: "Never heard of LAMF",
      urgency: "Planned",
      need: "₹1,20,000 (Renovation)",
      fear: "Pledge mechanics in plain language",
      outcome: "dropped",
      dropScreen: "S3",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 4,
          gutReaction:
            "Looks like a proper bank website, but where's any mention of my mutual funds?",
          reasoning: "As a government employee, I appreciate formal layout. Will proceed carefully.",
          frictionPoints: [
            "No SEBI or RBI approval",
            "No mutual fund information",
            "No PAN validation visible",
          ],
          missing: "A clear statement about mutual fund safety and SEBI regulation",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "At least this looks like a proper bank app, not some shady loan scheme.",
          reasoning: "Recognise this as standard OTP verification similar to official apps I use.",
          frictionPoints: ["No MF mention yet", "No SEBI/RBI logos", "Timer creates pressure"],
          missing: "A clear statement about which bank/NBFC is providing this loan",
        },
        {
          screen: "S3",
          decision: "drop",
          trustScore: 6,
          clarityScore: 4,
          gutReaction:
            "Interest rate looks decent but where are my MF details? I need to know exactly which funds will be pledged.",
          reasoning:
            "As a government employee who has never pledged MFs, I need absolute clarity. I'd rather visit my bank branch for face-to-face clarification.",
          frictionPoints: [
            "No breakdown of which MFs will be pledged",
            "No explanation of pledge mechanism",
            "Unclear dividend rights during pledge",
          ],
          missing: "A clear explanation of what happens to my mutual funds after pledging",
          dropReason:
            "Insufficient information about mutual fund pledge mechanics and rights.",
        },
      ],
    },
    {
      id: "P03",
      name: "Anjali Kapoor",
      role: "School Principal, 44",
      city: "Chandigarh",
      lamfExp: "First-time",
      urgency: "Emergency",
      need: "₹1,50,000 (Personal)",
      fear: "Funds liquidated unexpectedly",
      outcome: "dropped",
      dropScreen: "S6",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "At least they're starting with proper verification, but where's any mention of my mutual funds' safety?",
          reasoning:
            "Emergency and professional design pushing me forward despite no MF safety information.",
          frictionPoints: ["No upfront MF safety info", "No SEBI/RBI details", "Missing bank mention"],
          missing: "A clear statement about mutual fund safety during pledge period",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "Standard OTP screen, but why isn't my phone number fully visible?",
          reasoning:
            "Emergency need for funds this week. Professional design suggests legitimacy.",
          frictionPoints: [
            "Partially masked phone creates uncertainty",
            "19-second timer stressful",
            "No MF safety info still",
          ],
          missing: "Partner bank or SEBI registration to build legitimacy",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Interest rate looks decent but where's the safety information about my mutual funds?",
          reasoning: "Emergency situation pushing me to continue. Hoping next screen has security details.",
          frictionPoints: [
            "No MF safety explanation",
            "Missing processing fee info",
            "No tenure options",
          ],
          missing: "A clear statement about MF safety and pledge conditions",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "Wait, why is it mixing LAMF with personal loan? I only want to use my MFs.",
          reasoning:
            "Lower LAMF rate is attractive. Professional interface provides some comfort.",
          frictionPoints: [
            "Selected amount exceeds eligibility",
            "No MF pledge safety info",
            "Mixing loan types feels confusing",
          ],
          missing: "A clear explanation of MF pledge safety and liquidation conditions",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 7,
          clarityScore: 6,
          gutReaction: "The rates look decent but why am I being pushed towards a personal loan?",
          reasoning:
            "Emergency need for ₹1.5L and mostly covered by LAMF makes me willing to proceed.",
          frictionPoints: [
            "Personal loan push unwanted",
            "No explanation of MF safety in mixed structure",
          ],
          missing: "A clear explanation of MF safety when mixing loan types",
        },
        {
          screen: "S6",
          decision: "drop",
          trustScore: 4,
          clarityScore: 5,
          gutReaction:
            "Wait, this is much more than I need and they're mixing two different loans?",
          reasoning:
            "Came for a simple ₹1.5L loan. They're pushing ₹4.27L with a personal loan I never requested. Bait-and-switch.",
          frictionPoints: [
            "Unexpected personal loan component",
            "Total exceeds stated need by 3x",
            "No MF pledge protection explained",
          ],
          missing:
            "Clear explanation of why combining two loan types and how MF collateral is protected",
          dropReason:
            "Loan structure differs significantly from what was requested, no MF safety explanation. Will try different LAMF provider.",
        },
      ],
    },
    {
      id: "P04",
      name: "Rohit Bansal",
      role: "Product Manager, 31",
      city: "Gurgaon",
      lamfExp: "Experienced",
      urgency: "Opportunistic",
      need: "₹3,00,000 (Other)",
      fear: "Hidden terms / slow UX",
      outcome: "completed",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 8,
          clarityScore: 9,
          gutReaction:
            "Standard KYC screen, nothing surprising here. Clean interface, looks secure.",
          reasoning: "As a tech PM who's used LAMF before, this is a standard first step.",
          frictionPoints: ["No instant PAN validation", "No rate/timeline preview"],
          missing: "A 'Welcome Back' recognition since I'm a repeat LAMF user",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 8,
          clarityScore: 9,
          gutReaction:
            "Standard OTP flow, clean design, exactly what I expect from a fintech app.",
          reasoning: "Necessary security step. Wish there was a faster path for repeat users.",
          frictionPoints: ["Same 4-step flow as new user", "19-second timer unnecessary"],
          missing: "Fast-track option for repeat users",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 8,
          clarityScore: 7,
          gutReaction: "Clean interface, good rate, but where are the processing fees?",
          reasoning: "10.5% rate is competitive. Previous LAMF experience makes me comfortable.",
          frictionPoints: ["No processing fee info", "No tenure options"],
          missing: "Complete cost breakdown including processing fees",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 8,
          clarityScore: 7,
          gutReaction:
            "Nice — finally seeing actual numbers and rates. Split structure is smart.",
          reasoning: "Rates look competitive. Interface cleaner than my bank's.",
          frictionPoints: ["Amount exceeds LAMF eligibility without clear warning"],
          missing: "Timeline for loan disbursement after approval",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 8,
          clarityScore: 9,
          gutReaction:
            "Clean interface, good rate transparency, like seeing both options compared.",
          reasoning: "This screen gives me exactly what I need. 10.5% LAMF rate competitive.",
          frictionPoints: ["LAMF eligibility lower than portfolio — no explanation"],
          missing: "Quick tooltip explaining LAMF eligibility calculation",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 8,
          clarityScore: 9,
          gutReaction: "Finally! Clear breakdown. Split loan interesting but rates competitive.",
          reasoning:
            "Flow meets my expectations. Cleaner than my bank. Split structure acceptable.",
          frictionPoints: ["Split loan needs better explanation", "No disbursement timeline"],
          missing: "Exact disbursement timeline with specific steps",
        },
      ],
    },
    {
      id: "P05",
      name: "Suresh Iyer",
      role: "Finance Manager, 48",
      city: "Chennai",
      lamfExp: "First-time",
      urgency: "Planned",
      need: "₹2,00,000 (Tax payment)",
      fear: "Lender identity & all fees",
      outcome: "dropped",
      dropScreen: "S4",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction: "Where are the interest rates? And which bank is giving this loan?",
          reasoning:
            "Since this is just screen 1 and my need isn't urgent, I'll proceed to see if next screen addresses concerns.",
          frictionPoints: ["No rates shown upfront", "No lending bank mention", "Zero MF pledge info"],
          missing: "Interest rate and partner bank details",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction: "Basic KYC screen but where's information about who's giving me the loan?",
          reasoning:
            "Standard KYC screen recognised but lack of regulatory credentials is concerning.",
          frictionPoints: ["No lending partner mentioned", "Missing regulatory credentials"],
          missing: "SEBI/RBI registered lending partner details",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "OTP verification expected, but where's any info about my mutual funds?",
          reasoning:
            "OTP is a regulatory requirement for KYC. Will proceed expecting lending partner details next.",
          frictionPoints: [
            "No OTP validity period shown",
            "Zero MF pledging context",
            "No lending partner",
          ],
          missing: "Simple line stating which bank/NBFC is verifying my details",
        },
        {
          screen: "S4",
          decision: "drop",
          trustScore: 4,
          clarityScore: 3,
          gutReaction:
            "Wait, where are the actual LAMF rates? They're trying to push a personal loan when I came for LAMF?",
          reasoning:
            "As a finance manager, I can't proceed without clear LAMF terms and the regulated entity behind this. My MF portfolio is too valuable to risk.",
          frictionPoints: [
            "No LAMF rates shown",
            "No lending partner",
            "Personal loan push",
            "Screen ID 'unsecured-primary' concerning",
          ],
          missing: "Complete LAMF terms, rates and partner bank details",
          dropReason:
            "No transparency on LAMF terms, rates, and lending partner. Screen focuses on personal loan when I specifically want LAMF.",
        },
      ],
    },
    {
      id: "P06",
      name: "Kiran Reddy",
      role: "Startup Founder, 35",
      city: "Hyderabad",
      lamfExp: "Experienced",
      urgency: "Opportunistic",
      need: "₹4,50,000 (Business)",
      fear: "Speed & max credit line",
      outcome: "completed",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction:
            "Clean interface. No max eligible amount shown — I know this stuff already.",
          reasoning: "Professional design suggests legitimate product. Need funds today.",
          frictionPoints: [
            "No personalised max eligible amount",
            "Interest rates missing",
            "Treating repeat user as first-timer",
          ],
          missing: "My portfolio-based maximum eligible credit line",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 7,
          clarityScore: 9,
          gutReaction: "Standard KYC, let's get this done quickly.",
          reasoning: "Know this step is necessary. Clean interface.",
          frictionPoints: ["No recognition as repeat customer", "No credit line preview"],
          missing: "Quick estimate of eligible credit line based on linked portfolios",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction: "Shows my eligible amount but lower than expected for my portfolio.",
          reasoning: "Rate is competitive. Will proceed to see final terms.",
          frictionPoints: ["LAMF limit unexplained vs portfolio value"],
          missing: "Explanation of LAMF eligibility calculation",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 7,
          clarityScore: 7,
          gutReaction: "Combo loan could work but why no explanation of why LAMF is lower?",
          reasoning: "Familiar with LAMF. Rates competitive. Cleaner than bank interface.",
          frictionPoints: ["No LAMF eligibility explanation", "Missing processing fees"],
          missing: "Timeline for loan disbursement",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction: "LAMF rate of 9.5% competitive. Appreciate having options shown clearly.",
          reasoning: "Combo loan makes financial sense for my ₹3L need.",
          frictionPoints: ["No processing fees visible", "No disbursal timeline"],
          missing: "Total cost comparison table including ALL charges",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction: "Split loan structure interesting but rates are competitive overall.",
          reasoning: "Flow meets expectations for transparency. Cleaner than my bank.",
          frictionPoints: [
            "Split loan needs better explanation",
            "No immediate disbursement timeline",
          ],
          missing: "Exact fund disbursement timeline with clear steps",
        },
      ],
    },
    {
      id: "P07",
      name: "Amit Joshi",
      role: "Consultant, 40",
      city: "Jaipur",
      lamfExp: "First-time",
      urgency: "Planned",
      need: "₹2,00,000 (Business)",
      fear: "Hidden fees / prepayment terms",
      outcome: "dropped",
      dropScreen: "S6",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Clean interface but where's the interest rates? I need to know costs before risking my MFs.",
          reasoning: "Professional design suggests legitimacy. Planned need, not urgent.",
          frictionPoints: [
            "No interest rates upfront",
            "Missing MF pledge safety",
            "No regulatory badges",
          ],
          missing: "Interest rate range and basic fee structure",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "Standard KYC screen but where's the info about who's giving me the loan?",
          reasoning: "Standard KYC recognised. Will give one more screen to show credibility.",
          frictionPoints: [
            "No partner bank mention",
            "Missing regulatory credentials",
            "No next steps indication",
          ],
          missing: "A brief overview of loan terms and partner bank credentials",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction: "Standard OTP screen but where's info about my mutual funds?",
          reasoning: "Phone verification standard for financial apps. Not urgent so proceeding.",
          frictionPoints: [
            "No MF safety messaging",
            "No loan terms",
            "Missing timer for OTP expiry",
          ],
          missing:
            "'Your mutual funds remain secure during verification' would help ease anxiety",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction: "Why are they pushing personal loan when I came for LAMF?",
          reasoning:
            "As first-time LAMF user, wary of personal loan inclusion but rates and interface give confidence.",
          frictionPoints: [
            "Selected amount exceeds LAMF eligibility without warning",
            "Personal loan feels pushy",
            "No MF pledge mechanics",
          ],
          missing: "Clear option to limit loan amount to just LAMF without personal loan",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction:
            "Why is it pushing personal loan when I only need 2L? Rates look transparent though.",
          reasoning:
            "Appreciate transparent rates but wary of personal loan push. Will reduce amount to stay within LAMF.",
          frictionPoints: [
            "Automatic bundling of personal loan",
            "No processing fees",
            "Default selection exceeds my need",
          ],
          missing:
            "Clear breakdown of ALL charges including processing fees and prepayment terms",
        },
        {
          screen: "S6",
          decision: "drop",
          trustScore: 4,
          clarityScore: 7,
          gutReaction: "Wait, why am I suddenly getting a personal loan I didn't ask for?",
          reasoning:
            "Seeking ₹2L but seeing ₹4.27L with personal loan I never requested. Classic bait-and-switch. Will find more transparent option.",
          frictionPoints: [
            "Unexpected personal loan component",
            "No repayment terms shown",
            "Zero pledge clarity",
            "Processing timeline vague",
          ],
          missing:
            "Explicit consent option for personal loan component and clear repayment terms",
          dropReason:
            "Unexpected inclusion of unsolicited personal loan at higher interest rate without prior disclosure or consent.",
        },
      ],
    },
  ],
};
