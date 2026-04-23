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
      response: "Data collection exceeds what is necessary for service. Trust compromised.",
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
        "Enable logging",
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
    descriptor: "Will not create new credentials",
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
    eyebrow: "APRIORI",
    headline: "Know why users drop off. Before they do.",
    subheadline: "AI-powered simulations that show you which users convert, which drop off, and why. In hours, not weeks.",
    primaryCTA: "See a Live Report",
    secondaryCTA: "Run It On Your Flow",
  },
  workflow: {
    heading: "Three steps. Results in a day.",
    steps: [
      {
        number: 1,
        title: "Share your flow",
        description: "Send us your product screens and tell us who your target users are.",
      },
      {
        number: 2,
        title: "We simulate",
        description: "We run diverse personas through your flow and capture what each one thinks, feels, and decides at every screen.",
      },
      {
        number: 3,
        title: "You decide with evidence",
        description: "Get cohort-level analysis: which user types convert, which drop off, and exactly why. Per segment, per screen.",
      },
    ],
  },
  finalCTA: {
    heading: "Run your first 50-user simulation. Free.",
    subheading: "Upload your screens, tell us the goal and audience, get a usability report in minutes. No card required.",
    primaryCTA: "Run a Free Simulation",
    secondaryCTA: "Run It On Your Flow",
    trustElements: [],
  },
};
