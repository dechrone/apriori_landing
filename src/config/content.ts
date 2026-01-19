import {
  BriefcaseBusiness,
  Clock,
  ShieldCheck,
  TrendingDown,
  Zap,
  FileCheck,
  Code,
  Wallet,
  Lock,
  Search,
  Smartphone,
  Users,
  Plug,
  Calendar,
  MessageSquare,
  Timer,
  Key,
  ListChecks,
  Mail,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";

export interface Persona {
  id: string;
  name: string;
  icon: LucideIcon;
  descriptor: string;
  scenario: {
    trigger: string;
    location: string;
    response: string;
    recommendations: string[];
    riskReduction: number;
  };
}

export const PERSONAS: Persona[] = [
  {
    id: "skeptical-csuite",
    name: "The Skeptical C-Suite",
    icon: BriefcaseBusiness,
    descriptor: "Risk-averse, needs proof",
    scenario: {
      trigger: "Setup Fee $499",
      location: "Pricing Page, Item #3",
      response: "Hidden costs violate C-suite procurement principles. Trust signal broken. Abort evaluation.",
      recommendations: [
        "Bundle setup into monthly rate",
        "Add 'No Hidden Fees' badge",
        "Show total cost upfront",
      ],
      riskReduction: 89,
    },
  },
  {
    id: "time-poor-retailer",
    name: "The Time-Poor Retailer",
    icon: Clock,
    descriptor: "Zero patience for friction",
    scenario: {
      trigger: "5-step signup form",
      location: "Onboarding Flow, Step 2",
      response: "Each additional step represents opportunity cost. Abandoning for simpler competitor.",
      recommendations: [
        "Reduce to 2-step signup",
        "Enable social sign-in",
        "Auto-fill from business profile",
      ],
      riskReduction: 76,
    },
  },
  {
    id: "compliance-gatekeeper",
    name: "The Compliance Gatekeeper",
    icon: ShieldCheck,
    descriptor: "Stops at regulatory flags",
    scenario: {
      trigger: "Missing SOC 2 badge",
      location: "Trust Section",
      response: "Cannot proceed without compliance documentation. Regulatory risk too high.",
      recommendations: [
        "Display SOC 2 certification prominently",
        "Add security whitepaper download",
        "Include compliance FAQ section",
      ],
      riskReduction: 92,
    },
  },
  {
    id: "price-sensitive-smb",
    name: "The Price-Sensitive SMB",
    icon: TrendingDown,
    descriptor: "Abandons at premium signals",
    scenario: {
      trigger: "Enterprise-focused messaging",
      location: "Hero Section",
      response: "Language signals this is not for small businesses. Seeking alternatives.",
      recommendations: [
        "Add SMB-specific pricing tier",
        "Include small business testimonials",
        "Show ROI calculator for smaller teams",
      ],
      riskReduction: 67,
    },
  },
  {
    id: "early-adopter",
    name: "The Early Adopter",
    icon: Zap,
    descriptor: "Commits on vision alone",
    scenario: {
      trigger: "Lack of innovation signals",
      location: "Product Features",
      response: "Technology stack appears dated. Need cutting-edge solutions to maintain competitive edge.",
      recommendations: [
        "Highlight AI/ML capabilities",
        "Add technology roadmap section",
        "Showcase API-first architecture",
      ],
      riskReduction: 54,
    },
  },
  {
    id: "enterprise-procurement",
    name: "The Enterprise Procurement",
    icon: FileCheck,
    descriptor: "Requires vendor validation",
    scenario: {
      trigger: "No vendor assessment form",
      location: "Enterprise Page",
      response: "Cannot add to shortlist without completing vendor security questionnaire.",
      recommendations: [
        "Add self-service security questionnaire",
        "Provide procurement toolkit",
        "Enable direct legal contact",
      ],
      riskReduction: 81,
    },
  },
  {
    id: "technical-decision-maker",
    name: "The Technical Decision Maker",
    icon: Code,
    descriptor: "Evaluates architecture first",
    scenario: {
      trigger: "No technical documentation",
      location: "Developers Section",
      response: "Cannot recommend without understanding system architecture and integration complexity.",
      recommendations: [
        "Add comprehensive API docs",
        "Include architecture diagrams",
        "Provide sandbox environment",
      ],
      riskReduction: 73,
    },
  },
  {
    id: "budget-constrained-founder",
    name: "The Budget-Constrained Founder",
    icon: Wallet,
    descriptor: "Needs immediate ROI proof",
    scenario: {
      trigger: "Annual-only pricing",
      location: "Pricing Page",
      response: "Runway too limited for annual commitment. Need monthly flexibility.",
      recommendations: [
        "Offer monthly billing option",
        "Add starter tier for early-stage",
        "Include money-back guarantee",
      ],
      riskReduction: 85,
    },
  },
  {
    id: "privacy-conscious-user",
    name: "The Privacy-Conscious User",
    icon: Lock,
    descriptor: "Exits on data requests",
    scenario: {
      trigger: "Excessive data collection form",
      location: "Signup Flow",
      response: "Data collection exceeds what's necessary for service. Trust compromised.",
      recommendations: [
        "Minimize required fields",
        "Add clear data usage policy",
        "Offer privacy-first tier",
      ],
      riskReduction: 78,
    },
  },
  {
    id: "comparison-shopper",
    name: "The Comparison Shopper",
    icon: Search,
    descriptor: "Researches 5+ alternatives",
    scenario: {
      trigger: "No competitive comparison",
      location: "Features Page",
      response: "Need side-by-side comparison to justify selection to stakeholders.",
      recommendations: [
        "Add competitor comparison table",
        "Highlight unique differentiators",
        "Include switching guides",
      ],
      riskReduction: 62,
    },
  },
  {
    id: "mobile-first-user",
    name: "The Mobile-First User",
    icon: Smartphone,
    descriptor: "Abandons desktop-only flows",
    scenario: {
      trigger: "Non-responsive checkout",
      location: "Conversion Flow",
      response: "Cannot complete transaction on mobile device. Abandoning cart.",
      recommendations: [
        "Optimize mobile checkout",
        "Add Apple Pay/Google Pay",
        "Enable SMS-based auth",
      ],
      riskReduction: 71,
    },
  },
  {
    id: "delegator",
    name: "The Delegator",
    icon: Users,
    descriptor: "Needs team permission tools",
    scenario: {
      trigger: "No team management",
      location: "Account Settings",
      response: "Cannot delegate tasks without role-based access. Workflow incompatible.",
      recommendations: [
        "Add team member invites",
        "Implement role permissions",
        "Enable audit logging",
      ],
      riskReduction: 58,
    },
  },
  {
    id: "integration-dependent",
    name: "The Integration-Dependent",
    icon: Plug,
    descriptor: "Must connect with existing stack",
    scenario: {
      trigger: "Missing Salesforce integration",
      location: "Integrations Page",
      response: "Core CRM not supported. Cannot consider until integration available.",
      recommendations: [
        "Prioritize top CRM integrations",
        "Add Zapier connectivity",
        "Provide webhook options",
      ],
      riskReduction: 83,
    },
  },
  {
    id: "quarterly-buyer",
    name: "The Quarterly Buyer",
    icon: Calendar,
    descriptor: "Only purchases in Q4",
    scenario: {
      trigger: "No budget alignment option",
      location: "Pricing Page",
      response: "Fiscal calendar misalignment. Need to defer until budget cycle.",
      recommendations: [
        "Offer flexible start dates",
        "Add budget reservation option",
        "Provide Q4 incentive program",
      ],
      riskReduction: 45,
    },
  },
  {
    id: "reference-checker",
    name: "The Reference Checker",
    icon: MessageSquare,
    descriptor: "Needs social proof first",
    scenario: {
      trigger: "No case studies",
      location: "About Section",
      response: "Cannot validate claims without third-party verification. Need customer references.",
      recommendations: [
        "Add detailed case studies",
        "Include customer testimonials",
        "Enable reference call requests",
      ],
      riskReduction: 69,
    },
  },
  {
    id: "trial-maximizer",
    name: "The Trial Maximizer",
    icon: Timer,
    descriptor: "Uses full period before deciding",
    scenario: {
      trigger: "7-day trial too short",
      location: "Trial Signup",
      response: "Insufficient time to evaluate enterprise use case. Seeking longer trial.",
      recommendations: [
        "Extend trial to 14 days",
        "Add trial extension request",
        "Provide guided onboarding",
      ],
      riskReduction: 52,
    },
  },
  {
    id: "sso-requester",
    name: "The Single-Sign-On Requester",
    icon: Key,
    descriptor: "Won't create new credentials",
    scenario: {
      trigger: "No SSO support",
      location: "Login Page",
      response: "IT policy requires SSO for all tools. Cannot proceed with password auth.",
      recommendations: [
        "Implement SAML SSO",
        "Add Google Workspace SSO",
        "Enable Azure AD integration",
      ],
      riskReduction: 88,
    },
  },
  {
    id: "feature-completeness-seeker",
    name: "The Feature-Completeness Seeker",
    icon: ListChecks,
    descriptor: "Needs 100% checklist match",
    scenario: {
      trigger: "Missing export functionality",
      location: "Feature Comparison",
      response: "Critical feature gap identified. Cannot compromise on requirements.",
      recommendations: [
        "Add CSV/PDF export",
        "Implement bulk operations",
        "Create feature request portal",
      ],
      riskReduction: 64,
    },
  },
  {
    id: "async-decision-maker",
    name: "The Async Decision Maker",
    icon: Mail,
    descriptor: "Requires email-based workflow",
    scenario: {
      trigger: "Sync-only demo booking",
      location: "Contact Page",
      response: "Schedule conflicts prevent live demo. Need async evaluation option.",
      recommendations: [
        "Add recorded demo option",
        "Provide self-service sandbox",
        "Enable email-based trial",
      ],
      riskReduction: 47,
    },
  },
  {
    id: "churn-risk",
    name: "The Churn Risk",
    icon: AlertTriangle,
    descriptor: "High sensitivity to onboarding friction",
    scenario: {
      trigger: "Complex initial setup",
      location: "Onboarding Step 1",
      response: "Setup complexity exceeds expected value. Likely to abandon within first week.",
      recommendations: [
        "Simplify first-run experience",
        "Add quick start templates",
        "Provide white-glove onboarding",
      ],
      riskReduction: 74,
    },
  },
];

export const CONTENT = {
  hero: {
    eyebrow: "THE SIMULATION LAYER",
    headline: "Stop Guessing. Start Simulating.",
    subheadline: "The first Simulation Layer for high-stakes product decisions. Identify Belief Collapse before writing a single line of code.",
    primaryCTA: "Request Strategic Audit",
    secondaryCTA: "View Sample Simulation",
  },
  socialProof: {
    heading: "Trusted by High-Growth Teams",
    companies: [
      { name: "Blink Money", badge: "Antler-backed" },
      { name: "Velocity Pay", badge: null },
      { name: "NexGen Finance", badge: null },
      { name: "PayScale Pro", badge: null },
    ],
    supportingCopy: "Optimizing irreversible onboarding flows since 2024",
  },
  matrix: {
    heading: "Most Tools Are Autopsies. We Prevent Failure.",
    subheading: "Traditional analytics tell you how you failed after capital is burned. Apriori captures the High-Impact Irreversible quadrant—before you build.",
    quadrants: [
      {
        position: "top-left",
        impact: "High Impact",
        reversibility: "Reversible",
        name: "Feature Experiments",
        description: "Valuable insights, easily rolled back",
        tools: "Analytics, A/B platforms",
      },
      {
        position: "top-right",
        impact: "High Impact",
        reversibility: "Irreversible",
        name: "CRITICAL DECISIONS",
        description: "Pricing models, onboarding flows, trust architecture—where Belief Collapse destroys months of runway",
        tools: "Only Apriori",
        isAprioriZone: true,
      },
      {
        position: "bottom-left",
        impact: "Low Impact",
        reversibility: "Reversible",
        name: "Button Color Tweaks",
        description: "Easily changeable, minimal business impact",
        tools: "Standard A/B testing",
      },
      {
        position: "bottom-right",
        impact: "Low Impact",
        reversibility: "Irreversible",
        name: "Technical Debt",
        description: "Permanent but low business consequence",
        tools: "Code reviews",
      },
    ],
  },
  workflow: {
    heading: "Three Steps to Bulletproof Decisions",
    steps: [
      {
        number: 1,
        title: "Input",
        description: "Product flow, target user group, metric.",
      },
      {
        number: 2,
        title: "Simulate",
        description: "Load target personas from our dataset and simulate them on the product flow.",
      },
      {
        number: 3,
        title: "Decide",
        description: "Decide what should be done to optimise the metric on this product flow with persona level granularity.",
      },
    ],
  },
  ledger: {
    heading: "Your Strategic Memory, Compounding",
    subheading: "Every simulation builds a permanent record of Strategic Intent. As your product evolves, Apriori becomes the single source of truth for why decisions were made.",
    entries: [
      {
        date: "Week 12, 2025",
        title: "Enterprise Pricing Overhaul",
        description: "Simulation revealed trust collapse at $999/mo threshold. Switched to value-based pricing.",
        metric: "Conviction Score: 91% → 96%",
        status: "LIVE",
      },
      {
        date: "Week 8, 2025",
        title: "Onboarding Flow Simplification",
        description: "Removed 2 friction points identified in Skeptical C-Suite cohort.",
        metric: "Dropout Risk: -67%",
        status: "IMPLEMENTED",
      },
      {
        date: "Week 4, 2025",
        title: "Free Trial Parameters",
        description: "14-day vs 30-day trial simulation. 14 days won on commitment velocity.",
        metric: "Time-to-Conversion: -23%",
        status: "ACTIVE",
      },
      {
        date: "Week 2, 2025",
        title: "Feature Gate Strategy",
        description: "Early adopter cohort analysis showed premium features should be visible but locked.",
        metric: "Upgrade Intent: +34%",
        status: "VALIDATED",
      },
      {
        date: "Week 1, 2025",
        title: "Initial Baseline Audit",
        description: "Mapped existing flow against 1M personas. Identified 7 critical Belief Collapse points.",
        metric: "Foundation established",
        status: "ARCHIVED",
      },
    ],
  },
  finalCTA: {
    heading: "See Where Your Product Will Break—Before You Build It",
    subheading: "Join the teams running high-stakes simulations instead of expensive failures.",
    primaryCTA: "Request Strategic Audit",
    secondaryCTA: "Or explore sample simulations",
    trustElements: [
      { icon: "Shield", text: "SOC 2 Compliant" },
      { icon: "Lock", text: "Enterprise-Grade Security" },
      { icon: "Clock", text: "48-Hour Audit Turnaround" },
    ],
  },
};

