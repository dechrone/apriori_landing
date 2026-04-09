import type { FlowAnalysisData } from "@/types/flow-analysis";

/**
 * HexaHealth — Flow Analysis data for the piles treatment flow simulation.
 * Maps the HexaHealth piles laser treatment onboarding simulation
 * into the FlowAnalysisData shape consumed by FlowAnalysisView.
 */
export const hexahealthFlowAnalysisData: FlowAnalysisData = {
  meta: {
    product: "HexaHealth",
    flow: "Piles Laser Treatment Consultation",
    date: "April 2026",
    totalPersonas: 50,
    completionRate: 54,
  },

  screens: [
    { id: "S1", label: "Facebook/Instagram Ad", order: 1 },
    { id: "S2", label: "App Login", order: 2 },
    { id: "S3", label: "Home/Dashboard", order: 3 },
    { id: "S4", label: "Conditions & Treatments", order: 4 },
    { id: "S5", label: "Piles Detail Page", order: 5 },
    { id: "S6", label: "Doctor Consultation Form", order: 6 },
    { id: "S7", label: "Describe Health Condition", order: 7 },
    { id: "S8", label: "Doctor Consultation Question", order: 8 },
  ],

  funnel: [
    { screen: "S1", entered: 50, dropped: 4 },
    { screen: "S2", entered: 46, dropped: 5 },
    { screen: "S3", entered: 41, dropped: 2 },
    { screen: "S4", entered: 39, dropped: 1 },
    { screen: "S5", entered: 38, dropped: 2 },
    { screen: "S6", entered: 36, dropped: 5 },
    { screen: "S7", entered: 31, dropped: 3 },
    { screen: "S8", entered: 28, dropped: 1 },
  ],

  rootCauses: [
    {
      id: "RC1",
      screen: "S2",
      title: "Mobile login wall before showing app value",
      detail:
        "People with piles (an embarrassing condition) are extra privacy-conscious. The ad promises free consultation but first thing is phone number collection from an unknown app.",
      affectedPersonas: [
        "Rajesh M.",
        "Sunita D.",
        "Prakash V.",
        "Anita S.",
        "Mohammed K.",
      ],
      severity: "critical",
    },
    {
      id: "RC2",
      screen: "S6",
      title: "Hospital-style registration form for an embarrassing condition",
      detail:
        "Collecting Name, City, Relation, DOB, Gender upfront feels invasive. Users haven't spoken to anyone yet and are being asked to formally register for a condition they find difficult to discuss.",
      affectedPersonas: [
        "Deepak T.",
        "Meena R.",
        "Suresh P.",
        "Kavita N.",
        "Rajan B.",
      ],
      severity: "critical",
    },
    {
      id: "RC3",
      screen: "S7",
      title: "Open text field for describing piles symptoms",
      detail:
        "Users don't know medical terminology and feel deeply embarrassed writing about rectal symptoms, bleeding, and pain in a text box.",
      affectedPersonas: ["Priya K.", "Arun S.", "Neha G."],
      severity: "high",
    },
    {
      id: "RC4",
      screen: "S3",
      title: "Service discovery gap after login",
      detail:
        "Users who enter from a piles-specific ad land on a generic home screen with 6+ services. No deep-link to piles content means users must navigate 2 extra screens to reach relevant information.",
      affectedPersonas: ["Ramesh T.", "Geeta V."],
      severity: "high",
    },
  ],

  oneBet: {
    title:
      "Replace mobile login gate with guest browsing and convert symptom description to structured checklist",
    rationale:
      "The login wall and open-text symptom description together cause 56% of all drop-offs. The core problem isn't user motivation \u2014 people clicking a piles treatment ad have clear intent. It's that HexaHealth's flow forces privacy-sensitive disclosure (phone number, personal details, written symptom description) before demonstrating any value. For an embarrassing condition like piles, every data collection step amplifies anxiety.",
    effort: "Medium",
    impact: "High",
    projectedCompletion: "72\u201376%",
    currentCompletion: 54,
    personas: [
      "Rajesh M.",
      "Sunita D.",
      "Deepak T.",
      "Priya K.",
      "Meena R.",
      "Rajan B.",
    ],
    personaDetails: [
      { name: "Rajesh M.", role: "IT Manager \u00b7 Privacy-conscious about health data" },
      { name: "Sunita D.", role: "Homemaker \u00b7 First time using health app" },
      { name: "Deepak T.", role: "Bank Clerk \u00b7 Embarrassed to share personal details" },
      { name: "Priya K.", role: "Teacher \u00b7 Can't describe symptoms in text" },
      { name: "Meena R.", role: "Retired Govt. Officer \u00b7 Low digital literacy" },
      { name: "Rajan B.", role: "Small Business Owner \u00b7 Wants to talk to doctor, not fill forms" },
    ],
    whatChanges: [
      {
        number: "+1",
        title: "Guest Browsing Mode",
        description:
          "Allow users to browse conditions, read about piles, and view doctor profiles without logging in. Collect phone number only when they're ready to book.",
        icon: "eye",
        benefit: "Removes trust barrier",
      },
      {
        number: "+2",
        title: "Symptom Checklist",
        description:
          "Replace open text field with structured checkboxes: severity (mild/moderate/severe), duration, bleeding (Y/N), previous treatment. No embarrassing writing required.",
        icon: "check-square",
        benefit: "Eliminates embarrassment",
      },
      {
        number: "+3",
        title: "Ad-to-Condition Deep Link",
        description:
          "Users clicking piles ad should land directly on piles detail page (S5), skipping generic home and conditions screens.",
        icon: "link",
        benefit: "Saves 2 screens",
      },
      {
        number: "+4",
        title: "Post-Submit Clarity",
        description:
          "Show exactly what happens next: 'A piles specialist will call you within 2 hours' with doctor photo and name.",
        icon: "phone-call",
        benefit: "Reduces post-submit anxiety",
      },
    ],
  },

  dropReasons: {
    S1: "Ad didn't feel relevant \u2014 not currently seeking treatment or already consulting a doctor",
    S2: "Won't share mobile number with unknown health app for embarrassing condition",
    S3: "Generic home screen \u2014 can't find piles-related content quickly",
    S5: "Medical imagery about piles symptoms created anxiety instead of reassurance",
    S6: "Too much personal information required before speaking to any doctor",
    S7: "Embarrassed to describe piles symptoms in open text field",
    S8: "No clarity on what happens after submitting \u2014 will a doctor call? When?",
  },

  dropPersonas: {
    S1: ["Vikram J.", "Sunil R.", "Pooja M.", "Amrit L."],
    S2: ["Rajesh M.", "Sunita D.", "Prakash V.", "Anita S.", "Mohammed K."],
    S3: ["Ramesh T.", "Geeta V."],
    S4: ["Farhan A."],
    S5: ["Nisha K.", "Abhay D."],
    S6: ["Deepak T.", "Meena R.", "Suresh P.", "Kavita N.", "Rajan B."],
    S7: ["Priya K.", "Arun S.", "Neha G."],
    S8: ["Rohit M."],
  },

  patterns: [
    {
      stat: "10/50",
      title: "Won't share phone number for embarrassing health condition",
      description:
        "Privacy-conscious users refuse to create an account before understanding the app. Piles is a condition people avoid discussing \u2014 giving a phone number to an unknown app feels risky.",
    },
    {
      stat: "8/50",
      title: "Can't describe symptoms in own words",
      description:
        "Users don't know medical terminology for piles symptoms. Writing about bleeding, pain during bowel movements, and rectal swelling in a text box feels deeply uncomfortable.",
    },
    {
      stat: "7/50",
      title: "Personal info collection before any doctor interaction",
      description:
        "Name, DOB, gender, and city collection feels like hospital registration. Users expected a quick consultation, not a formal intake form.",
    },
    {
      stat: "6/50",
      title: "Ad promise vs app reality mismatch",
      description:
        "Ad says 'Free Expert Consultation in 30 min' but the app requires 7 screens of navigation and form-filling before any doctor interaction.",
    },
    {
      stat: "5/50",
      title: "Generic home screen breaks condition-specific intent",
      description:
        "Users arriving from a piles-specific ad must navigate through a generic home screen and conditions list \u2014 2 extra screens that dilute their focused intent.",
    },
    {
      stat: "4/50",
      title: "Medical imagery triggers anxiety",
      description:
        "Piles symptom infographic on the detail page makes some users more anxious rather than informed. Visual depictions of the condition feel clinical and scary.",
    },
  ],

  quotes: [
    {
      quote:
        "I saw the ad and tapped because I've been suffering for months. But the first thing it asks is my phone number? I don't even know if this app is legit. I'm not giving my number for something this personal.",
      attribution: "45yo Bank Manager \u00b7 Dropped at S2",
      dropScreen: "S2",
    },
    {
      quote:
        "It says 'Describe your health condition' \u2014 what am I supposed to write? 'I have bleeding during...'? I can't type that out. Just give me checkboxes.",
      attribution: "38yo School Teacher \u00b7 Dropped at S7",
      dropScreen: "S7",
    },
    {
      quote:
        "I came from an ad about piles treatment but I'm looking at a home screen with weight loss programs and liver failure. Where's the piles section? I have to scroll and search through conditions like I'm browsing a medical encyclopedia.",
      attribution: "52yo Retired Officer \u00b7 Dropped at S3",
      dropScreen: "S3",
    },
    {
      quote:
        "I filled in my name, city, date of birth, gender \u2014 all for a 'free consultation'. Then it asks me to describe my condition in a text box. Then one more question. And then... Submit. Submit what? Who calls me? When? I just closed the app.",
      attribution: "41yo Small Business Owner \u00b7 Dropped at S8",
      dropScreen: "S8",
    },
  ],

  personas: [
    // -- Completer persona --
    {
      id: "P01",
      name: "Amit Sharma",
      role: "Sr. Software Engineer, 32",
      city: "Mumbai",
      lamfExp: "N/A",
      urgency: "High (suffering 6 months)",
      need: "Laser treatment consultation",
      fear: "None \u2014 has researched piles treatment options online",
      outcome: "completed",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction:
            "'Permanent relief in 30 min' \u2014 I've read about laser treatment. This matches what I've researched. Let me check this out.",
          reasoning:
            "Ad resonates because he has pre-existing knowledge about laser piles treatment.",
          frictionPoints: [],
          missing: "Nothing critical",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Phone number... fine. 25K patients stat is reassuring. I need this treatment anyway.",
          reasoning:
            "Urgency overrides privacy hesitation. Social proof numbers provide enough trust.",
          frictionPoints: ["Sharing phone for health condition"],
          missing: "Privacy policy visibility",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 6,
          gutReaction:
            "Generic health dashboard. I came for piles \u2014 let me find it. Doctor Consultation... Conditions & Treatments... okay, I see a path.",
          reasoning:
            "Tech-savvy enough to navigate but notices the friction of a generic landing.",
          frictionPoints: ["No direct path to piles from home"],
          missing: "Deep link from ad to condition page",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Piles Laser Treatment \u2014 there it is. At least they have a dedicated section.",
          reasoning: "Finds relevant condition quickly due to tech literacy.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 7,
          clarityScore: 7,
          gutReaction:
            "Symptoms and causes infographic \u2014 I already know all this. Book Appointment button. Let's go.",
          reasoning:
            "Skims medical content since he's already informed. Focused on booking.",
          frictionPoints: [],
          missing: "Doctor profiles and ratings",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Name, city, DOB, gender... a lot of fields for a 'free consultation'. But I've come this far and I genuinely need treatment.",
          reasoning:
            "High urgency pushes through the form friction. Still uncomfortable sharing this much.",
          frictionPoints: [
            "Too many personal fields",
            "Relation field feels odd",
          ],
          missing: "Why all these details are needed upfront",
        },
        {
          screen: "S7",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "Describe my condition... okay. 'I have been experiencing piles symptoms for 6 months, including bleeding. Looking for laser treatment options.' There, done.",
          reasoning:
            "Can articulate symptoms clinically because he's researched the condition extensively online.",
          frictionPoints: [
            "Open text field for embarrassing condition",
            "No guidance on what to write",
          ],
          missing: "Structured symptom checklist",
        },
        {
          screen: "S8",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "Have I consulted a doctor? Yes. Submit. Now what? I hope someone actually calls me. The ad said 30 minutes.",
          reasoning:
            "Completes but with low confidence about what happens next. Trust has eroded through the flow.",
          frictionPoints: ["No clarity on post-submit process"],
          missing: "Confirmation of what happens after submit",
        },
      ],
    },
    // -- Drop-off: S2 (Login) --
    {
      id: "P02",
      name: "Rajesh Malhotra",
      role: "Bank Manager, 45",
      city: "Delhi",
      lamfExp: "N/A",
      urgency: "Medium",
      need: "Expert opinion on piles treatment",
      fear: "Privacy \u2014 doesn't want health data linked to phone number",
      outcome: "dropped",
      dropScreen: "S2",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Piles treatment in 30 minutes \u2014 I've been putting this off for weeks. Free consultation sounds good. Let me check.",
          reasoning:
            "Ad resonates with his unaddressed condition. Free consultation lowers perceived commitment.",
          frictionPoints: ["'0% EMI' feels salesy for healthcare"],
          missing: "Hospital or doctor credentials",
        },
        {
          screen: "S2",
          decision: "drop",
          trustScore: 3,
          clarityScore: 5,
          gutReaction:
            "Enter mobile number? For piles? I don't know this app. My phone number links to my bank accounts, my Aadhaar. I'm not giving my number to some health app for... this. What if they call me and my family overhears?",
          reasoning:
            "Privacy-conscious banking professional. The combination of an embarrassing condition and phone number collection from an unknown app triggers immediate distrust.",
          frictionPoints: [
            "Phone number as first interaction",
            "No value shown before data collection",
            "Embarrassing condition amplifies privacy concern",
          ],
          missing:
            "Guest browsing, doctor profiles, or any value demonstration before login",
          dropReason:
            "Won't share mobile number with unknown health app for an embarrassing condition like piles.",
        },
      ],
    },
    // -- Drop-off: S6 (Doctor Consultation Form) --
    {
      id: "P03",
      name: "Deepak Tiwari",
      role: "Govt Bank Clerk, 48",
      city: "Mumbai",
      lamfExp: "N/A",
      urgency: "Medium",
      need: "Free consultation for piles",
      fear: "Personal info collection for embarrassing condition",
      outcome: "dropped",
      dropScreen: "S6",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Free consultation for piles \u2014 I've been avoiding going to a doctor because it's embarrassing. Maybe an app is easier.",
          reasoning:
            "The promise of a private, digital consultation appeals to someone who avoids in-person visits for this condition.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Phone number... 25,000 patients treated. Okay, that many people have used this. It must be somewhat safe.",
          reasoning:
            "Social proof numbers provide just enough trust to proceed despite hesitation.",
          frictionPoints: ["Reluctant to share phone for health condition"],
          missing: "Privacy assurance",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "Lots of services here. Doctor Consultation, Health Records, Medicine... where is piles? Let me look through Conditions & Treatments.",
          reasoning:
            "Navigates slowly through generic home screen. Not tech-savvy but persistent.",
          frictionPoints: ["Generic home screen, no piles shortcut"],
          missing: "Direct link to piles content",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Piles... Piles Laser Treatment. Okay, found it. A lot of medical conditions here but at least piles is listed.",
          reasoning: "Finds the condition after scanning the grid.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Symptoms and causes \u2014 yes, I have most of these. Book Appointment. Let me try.",
          reasoning:
            "Medical content validates his condition. Feels more confident this app is relevant.",
          frictionPoints: [],
          missing: "Doctor profiles before booking",
        },
        {
          screen: "S6",
          decision: "drop",
          trustScore: 3,
          clarityScore: 4,
          gutReaction:
            "Name, City, Relation, Date of Birth, Gender \u2014 this is like a hospital registration form. I haven't even spoken to anyone yet. They want all my personal details for piles? What if this data leaks? My colleagues would...",
          reasoning:
            "The formal registration form feels disproportionate for a free consultation. The embarrassment factor makes every personal detail feel like an exposure risk.",
          frictionPoints: [
            "Too many personal fields before any doctor interaction",
            "Relation field feels irrelevant",
            "No explanation of why data is needed",
            "Fear of data exposure for embarrassing condition",
          ],
          missing:
            "Option to speak to doctor first, then share details. Minimal-info booking path.",
          dropReason:
            "Too much personal information required before speaking to any doctor \u2014 feels like hospital registration for an embarrassing condition.",
        },
      ],
    },
    // -- Drop-off: S7 (Describe Health Condition) --
    {
      id: "P04",
      name: "Priya Kapoor",
      role: "School Teacher, 38",
      city: "Delhi",
      lamfExp: "N/A",
      urgency: "High",
      need: "Treatment options for piles",
      fear: "Writing about piles symptoms in text",
      outcome: "dropped",
      dropScreen: "S7",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Piles laser treatment in 30 minutes. I've been suffering silently for months. Maybe this can help.",
          reasoning:
            "Strong personal need drives her past the ad. Suffering in silence is common with this condition.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Phone number. 1500+ doctors. Okay, if that many doctors are on the platform, it must be real.",
          reasoning:
            "Doctor count reassures more than patient count for someone seeking treatment.",
          frictionPoints: ["Sharing phone number for health app"],
          missing: "Privacy assurance",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "So many options. Weight Loss Program? I need piles treatment, not weight loss. Where do I go? Conditions & Treatments maybe.",
          reasoning:
            "Confused by generic home screen but finds a plausible path.",
          frictionPoints: ["Irrelevant services displayed prominently"],
          missing: "Condition-specific landing after ad click",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Piles is listed here. Let me tap on it.",
          reasoning: "Simple navigation step.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "The symptoms infographic is... graphic. But at least I know what I have now. Book Appointment.",
          reasoning:
            "Medical content is somewhat uncomfortable but informative. Proceeds to book.",
          frictionPoints: ["Graphic medical imagery"],
          missing: "Gentler visual approach to symptoms",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 4,
          clarityScore: 5,
          gutReaction:
            "Name, city, all that. Fine. I've given my phone number already, might as well continue. But this is a lot of details for a free consultation.",
          reasoning:
            "Sunk cost from earlier screens pushes her through the form, but trust is eroding.",
          frictionPoints: ["Too many fields", "Feels invasive"],
          missing: "Explanation of why details are needed",
        },
        {
          screen: "S7",
          decision: "drop",
          trustScore: 3,
          clarityScore: 3,
          gutReaction:
            "'Describe your health condition' \u2014 I need help with... what? How do I write this? 'I have bleeding when I go to the toilet'? 'Pain in my...'? I can't type these words. I just can't. Give me checkboxes or something.",
          reasoning:
            "The open text field demands explicit description of deeply embarrassing symptoms. She doesn't have medical vocabulary and the colloquial descriptions feel too personal to type out.",
          frictionPoints: [
            "Open text for embarrassing symptoms",
            "No medical vocabulary",
            "No structured options",
            "Feels like writing a confession",
          ],
          missing:
            "Structured symptom checklist with severity, duration, and yes/no questions",
          dropReason:
            "Cannot bring herself to type out piles symptoms in an open text field. Needs structured checkboxes.",
        },
      ],
    },
    // -- Drop-off: S3 (Home/Dashboard) --
    {
      id: "P05",
      name: "Ramesh Thakur",
      role: "Retired Govt Officer, 58",
      city: "Delhi",
      lamfExp: "N/A",
      urgency: "Low (exploring)",
      need: "Information about piles treatment",
      fear: "Complex app navigation",
      outcome: "dropped",
      dropScreen: "S3",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Piles treatment ad on Facebook. 500+ hospitals. Maybe I should look into this \u2014 the discomfort has been increasing lately.",
          reasoning:
            "Low urgency but the ad catches him during a moment of discomfort awareness.",
          frictionPoints: ["Ad feels promotional"],
          missing: "Government hospital or CGHS empanelment mention",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 4,
          clarityScore: 5,
          gutReaction:
            "Phone number for a health app... my son helped me install PhonePe. Let me try this. 25,000 patients \u2014 must be okay.",
          reasoning:
            "Low digital confidence but social proof numbers provide enough push to try.",
          frictionPoints: [
            "Low digital literacy",
            "Typing phone number is slow",
          ],
          missing: "Simpler login \u2014 maybe WhatsApp OTP",
        },
        {
          screen: "S3",
          decision: "drop",
          trustScore: 3,
          clarityScore: 3,
          gutReaction:
            "Doctor Consultation, Health Records, Lab Tests, Weight Loss Program, Medicine Orders... this is like a medical mall. I came from a piles ad. Where is piles treatment? I can't find it. There are too many options. I'll just ask my son to find a doctor for me.",
          reasoning:
            "Generic home screen overwhelms a low-digital-literacy user who expected to land directly on piles content. The cognitive load of navigating an unfamiliar app for an embarrassing condition is too high.",
          frictionPoints: [
            "Generic home screen after piles-specific ad",
            "6+ services with no condition shortcut",
            "Low digital literacy",
            "No search or filter for conditions",
          ],
          missing:
            "Deep link from piles ad directly to piles detail page (S5)",
          dropReason:
            "Generic home screen with too many services \u2014 can't find piles-related content and gives up.",
        },
      ],
    },
  ],
};
