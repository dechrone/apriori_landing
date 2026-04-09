import type { FlowAnalysisData } from "@/types/flow-analysis";

/**
 * SuperAstro — Flow Analysis data for the AI astrology chatbot onboarding simulation.
 * Maps the SuperAstro video ad → onboarding → AI chat flow
 * into the FlowAnalysisData shape consumed by FlowAnalysisView.
 */
export const superastroFlowAnalysisData: FlowAnalysisData = {
  meta: {
    product: "SuperAstro",
    flow: "Video Ad → AI Astrology Onboarding",
    date: "April 2026",
    totalPersonas: 100,
    completionRate: 62,
  },

  screens: [
    { id: "S1", label: "Instagram/Facebook Video Ad", order: 1 },
    { id: "S2", label: "Intro + Mobile Number", order: 2 },
    { id: "S3", label: "OTP Verification", order: 3 },
    { id: "S4", label: "Name Entry", order: 4 },
    { id: "S5", label: "Gender Selection", order: 5 },
    { id: "S6", label: "Marital Status", order: 6 },
    { id: "S7", label: "Date of Birth", order: 7 },
    { id: "S8", label: "Time of Birth", order: 8 },
    { id: "S9", label: "Place of Birth", order: 9 },
    { id: "S10", label: "Journey Purpose", order: 10 },
    { id: "S11", label: "AI Chat — Mahesh Ji", order: 11 },
  ],

  funnel: [
    { screen: "S1", entered: 100, dropped: 6 },
    { screen: "S2", entered: 94, dropped: 8 },
    { screen: "S3", entered: 86, dropped: 2 },
    { screen: "S4", entered: 84, dropped: 1 },
    { screen: "S5", entered: 83, dropped: 1 },
    { screen: "S6", entered: 82, dropped: 2 },
    { screen: "S7", entered: 80, dropped: 3 },
    { screen: "S8", entered: 77, dropped: 2 },
    { screen: "S9", entered: 75, dropped: 3 },
    { screen: "S10", entered: 72, dropped: 4 },
    { screen: "S11", entered: 68, dropped: 6 },
  ],

  rootCauses: [
    {
      id: "RC1",
      screen: "S2",
      title: "Phone number gate for stigmatized interest",
      detail:
        "Users arrived from video ads about astrology but must share phone number with unknown app. Astrology carries social stigma — sharing a phone number creates a permanent link between identity and a 'non-scientific' interest. 8 of 38 drop-offs here.",
      affectedPersonas: [
        "Neha S.",
        "Arjun K.",
        "Priya M.",
        "Tanvi R.",
        "Sanjay D.",
        "Rohit G.",
        "Manish V.",
        "Divya P.",
      ],
      severity: "critical",
    },
    {
      id: "RC2",
      screen: "S11",
      title: "AI response doesn't match ad-specific promise",
      detail:
        "Users who came from 'Does he miss me?' ad get a generic birth chart overview instead of directly answering their specific question. The 10-screen onboarding built specific expectations, and the payoff feels misaligned. 6 drops here.",
      affectedPersonas: [
        "Pooja K.",
        "Meera S.",
        "Kavita N.",
        "Ankita D.",
        "Simran T.",
        "Ritika B.",
      ],
      severity: "critical",
    },
    {
      id: "RC3",
      screen: "S10",
      title: "Journey purpose options too narrow — only 3 choices",
      detail:
        "Users concerned about health, education, finances, property, or Vastu have no matching option. They must pick the closest option or leave.",
      affectedPersonas: ["Suresh P.", "Ramesh T.", "Lakshmi K.", "Geeta V."],
      severity: "high",
    },
    {
      id: "RC4",
      screen: "S9",
      title: "Place of birth picker fails NRIs and small-town users",
      detail:
        "NRIs born abroad can't find their city. Users born in small villages must guess the nearest city. This blocks kundli generation entirely.",
      affectedPersonas: ["Vikram J.", "Anita C.", "Raj M."],
      severity: "high",
    },
    {
      id: "RC5",
      screen: "S7",
      title: "10-screen onboarding for a ₹1 app creates value mismatch",
      detail:
        "The ad said 'Chat at just ₹1' implying instant access. Instead, 10 screens of personal data entry before any value delivery. The effort-to-value ratio feels fundamentally wrong.",
      affectedPersonas: ["Aditya S.", "Karan P.", "Sneha L."],
      severity: "high",
    },
  ],

  oneBet: {
    title:
      "Skip-to-Chat with Progressive Profiling — let users chat with Mahesh immediately, collect birth details conversationally",
    rationale:
      "The core insight is that SuperAstro's onboarding is structured like a hospital intake form, but users arrived expecting an instant chat experience ('Chat NOW', 'Chat 24/7 at just ₹1'). 10 screens of data entry before any value delivery creates a fundamental expectation mismatch. The fix isn't removing screens — it's reordering value delivery. Let users start chatting immediately after phone+OTP (2 screens), then have Mahesh ask for birth details naturally during conversation ('To read your stars, I'll need your birth details — when were you born?'). This preserves data collection while delivering value first.",
    effort: "Medium-High",
    impact: "High",
    projectedCompletion: "78–82%",
    currentCompletion: 62,
    personas: [
      "Neha S.",
      "Arjun K.",
      "Pooja K.",
      "Suresh P.",
      "Vikram J.",
      "Aditya S.",
    ],
    personaDetails: [
      {
        name: "Neha S.",
        role: "28yo Product Manager · Privacy-conscious, embarrassed about astrology",
      },
      {
        name: "Arjun K.",
        role: "31yo SDE · Saw career ad at 1 AM, wants quick answer",
      },
      {
        name: "Pooja K.",
        role: "24yo Marketing Exec · Came from 'Does he miss me?' ad, wants specific answer",
      },
      {
        name: "Suresh P.",
        role: "47yo Shop Owner · Wants Vastu guidance, no option in journey purpose",
      },
      {
        name: "Vikram J.",
        role: "35yo NRI in Dubai · Born in Jamnagar, can't find it in picker",
      },
      {
        name: "Aditya S.",
        role: "20yo College Student · ₹1 price hooked him but 10 screens is too much",
      },
    ],
    whatChanges: [
      {
        number: "+1",
        title: "Instant Chat After OTP",
        description:
          "After phone+OTP (2 screens), drop users directly into chat with Mahesh. First message: 'Namaste! I'm Mahesh, your personal astrologer. What's on your mind today?' Collect name, DOB, time, place conversationally as Mahesh asks follow-up questions.",
        icon: "message-circle",
        benefit: "Value in 30 seconds, not 10 screens",
      },
      {
        number: "+2",
        title: "Ad-Aware First Response",
        description:
          "Route the first AI response based on which ad the user clicked. 'Does he miss me?' ad → open with relationship reading. 'Career kab set hogi?' ad → open with career analysis.",
        icon: "target",
        benefit: "Matches ad promise to first experience",
      },
      {
        number: "+3",
        title: "Expand Journey Purpose to 6+ Options",
        description:
          "Add Health, Finance/Property, Education, and Custom/Other cards. Or better: let users type their question freely.",
        icon: "list-plus",
        benefit: "Captures 100% of intent",
      },
      {
        number: "+4",
        title: "NRI-Friendly Location Input",
        description:
          "Replace city picker with text search supporting international cities. Auto-detect from phone locale.",
        icon: "globe",
        benefit: "Unblocks NRI segment",
      },
    ],
  },

  dropReasons: {
    S1: "Video ad didn't resonate — not interested in astrology or already using AstroTalk",
    S2: "Won't share phone number for astrology — social stigma and privacy concerns",
    S3: "OTP not received or changed mind during wait",
    S6: "Marital status question feels triggering — family pressure about marriage",
    S7: "DOB picker too complex on small screen / uncertain about exact date",
    S8: "Don't know time of birth and didn't notice the Skip button",
    S9: "Can't find birth city in picker — NRI or small-town user",
    S10: "None of the 3 journey options (Marriage/Career/Relationship) match my need",
    S11: "AI response is generic — doesn't address the specific question from the ad",
  },

  dropPersonas: {
    S1: ["Vikram R.", "Sunil M.", "Pradeep K.", "Anjali T.", "Manoj S.", "Rekha D."],
    S2: [
      "Neha S.",
      "Arjun K.",
      "Priya M.",
      "Tanvi R.",
      "Sanjay D.",
      "Rohit G.",
      "Manish V.",
      "Divya P.",
    ],
    S3: ["Farhan A.", "Deepa N."],
    S4: ["Vijay K."],
    S5: ["Nisha R."],
    S6: ["Meena G.", "Aarti S."],
    S7: ["Aditya S.", "Karan P.", "Sneha L."],
    S8: ["Sunita D.", "Prakash V."],
    S9: ["Vikram J.", "Anita C.", "Raj M."],
    S10: ["Suresh P.", "Ramesh T.", "Lakshmi K.", "Geeta V."],
    S11: ["Pooja K.", "Meera S.", "Kavita N.", "Ankita D.", "Simran T.", "Ritika B."],
  },

  patterns: [
    {
      stat: "16/100",
      title: "Won't share phone number for astrology — stigma barrier",
      description:
        "Privacy-conscious users (especially young professionals) refuse to link their phone number to an astrology app. They'd never admit to consulting an astrologer, and a phone number creates a permanent, traceable link.",
    },
    {
      stat: "14/100",
      title: "Ad promised instant answers, got 10-screen form",
      description:
        "Users who clicked 'Chat NOW' or 'Chat 24/7 at just ₹1' expected an immediate chat experience. The 10-screen onboarding feels like bait-and-switch.",
    },
    {
      stat: "12/100",
      title: "AI response doesn't address the specific ad hook",
      description:
        "Users who came from 'Does he miss me?' get a generic kundli overview. Users who came from 'Career kab set hogi?' get planetary positions instead of career guidance.",
    },
    {
      stat: "9/100",
      title: "Journey purpose options exclude common needs",
      description:
        "Health concerns, education decisions, Vastu queries, financial timing — these common astrology use cases have no option on the purpose screen.",
    },
    {
      stat: "7/100",
      title: "NRIs can't find international birth cities",
      description:
        "Users born outside India or in small villages can't locate their birth city in the picker. This blocks kundli generation entirely.",
    },
    {
      stat: "6/100",
      title: "Marital status question triggers anxiety",
      description:
        "Single users under family pressure to marry, and recently divorced/separated users, find this question emotionally loaded.",
    },
  ],

  quotes: [
    {
      quote:
        "I was scrolling Instagram at midnight, stressed about whether I should take that Bangalore offer. The ad said 'Career kab set hogi? Chat 24/7 at ₹1.' I tapped it. Then it asked for my phone number. Bro, what if someone sees SuperAstro in my phone bill? My colleagues would roast me.",
      attribution: "27yo SDE · Dropped at S2",
      dropScreen: "S2",
    },
    {
      quote:
        "The ad literally said 'Does he miss me?' — that's EXACTLY what I wanted to know. I filled 10 screens of data. Name, DOB, time, place, everything. Then the AI gives me a generic paragraph about Venus in my 7th house. Tell me if he misses me or not! That's what the ad promised.",
      attribution: "24yo Marketing Exec · Dropped at S11",
      dropScreen: "S11",
    },
    {
      quote:
        "I wanted to ask about my shop's Vastu — the new store I'm opening in Chandni Chowk. But the options are Marriage, Career, Relationship. Where's 'Business'? Where's 'Property'? I picked Career because it's closest but that's not what I need.",
      attribution: "47yo Shop Owner · Dropped at S10",
      dropScreen: "S10",
    },
    {
      quote:
        "I was born in Jamnagar, Gujarat but I live in Dubai now. The city picker shows Ahmedabad, Rajkot, Surat... no Jamnagar. I tried typing it, it's a dropdown not a search. I can't complete my birth chart without my birth city.",
      attribution: "35yo NRI Software Architect · Dropped at S9",
      dropScreen: "S9",
    },
  ],

  personas: [
    // -- Completer persona --
    {
      id: "P01",
      name: "Priyanka Mehta",
      role: "UX Designer, 29",
      city: "Mumbai",
      lamfExp: "N/A",
      urgency: "Medium (relationship anxiety)",
      need: "Is this the right person to marry?",
      fear: "None strong enough to stop — ₹1 price and 'scientific' framing overcame stigma",
      outcome: "completed",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "'Astrology koi guess nahi, ek science hai' — okay, that's a different framing. Not the usual 'pandit ji will solve all problems' energy. The science angle makes me less embarrassed about tapping.",
          reasoning:
            "Ad B's rationalist framing specifically targets privacy-seeking professionals who'd be embarrassed by traditional astrology marketing. The 'science' framing gives her a narrative: she's not being superstitious, she's exploring patterns.",
          frictionPoints: ["Still an astrology ad — mild embarrassment"],
          missing: "Nothing critical — the framing worked",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Phone number... ugh. But it's ₹1 and I'm using a secondary number anyway. Sri Mandir ecosystem — that's a real company at least. Fine.",
          reasoning:
            "The ₹1 price point lowers perceived risk. She uses a secondary number for app signups, which mitigates her privacy concern. Sri Mandir branding provides some institutional trust.",
          frictionPoints: [
            "Phone number for astrology app",
            "What if they spam me?",
          ],
          missing: "Privacy policy, data usage clarity",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 5,
          clarityScore: 8,
          gutReaction:
            "OTP received instantly. At least their infra works. Quick verification.",
          reasoning:
            "Smooth OTP delivery maintains momentum. No friction here.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 5,
          clarityScore: 8,
          gutReaction:
            "Name entry. Okay, standard. I'll use my real name — they need it for the kundli anyway.",
          reasoning:
            "Understands that astrology requires a name. Low friction because expectation aligns with the ask.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Gender selection. Female. Simple enough. Though I notice there's no non-binary option — not surprising for a Vedic astrology app.",
          reasoning:
            "Quick screen, low friction. The UX designer in her notices the limited options but doesn't block on it.",
          frictionPoints: ["Only Male/Female options"],
          missing: "Inclusive gender options",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Marital status... 'Unmarried'. This is the question that's actually on my mind. I want to know if Rahul is the right person. The fact that they're asking this means the reading will be more relevant, right?",
          reasoning:
            "For her, this question is directly relevant to her need. She sees it as input that will improve the reading's accuracy rather than an invasive question.",
          frictionPoints: ["Slightly personal but relevant to her query"],
          missing: "Nothing",
        },
        {
          screen: "S7",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Date of birth. 14th March 1997. Easy — I know this by heart. Mummy got my kundli made when I was born, so I know all this data.",
          reasoning:
            "Birth details are expected for Vedic astrology. She has this information readily available from her family kundli.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S8",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Time of birth — 6:42 AM. Thank god mummy kept the hospital certificate. I know people who don't know this. There is a Skip button but I want an accurate reading.",
          reasoning:
            "Has birth time from hospital records via family. Motivated to enter it for accuracy. Notices the Skip button as good UX but doesn't need it.",
          frictionPoints: [],
          missing: "Nothing — she has the data",
        },
        {
          screen: "S9",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Place of birth — Mumbai. Found it immediately in the picker. Big city advantage.",
          reasoning:
            "Major city, no picker issues. This screen is frictionless for metro users.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S10",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Journey purpose — Marriage. Finally, the option that matches my question. 'Relationship' is close but 'Marriage' is exactly right. I want to know about compatibility with Rahul.",
          reasoning:
            "Her need maps directly to one of the three options. Perfect fit for this user.",
          frictionPoints: [],
          missing: "Nothing — her use case is covered",
        },
        {
          screen: "S11",
          decision: "continue",
          trustScore: 6,
          clarityScore: 6,
          gutReaction:
            "Namaste Priyanka! Based on your kundli... Manglik status: partial Manglik. Okay, that's actually specific. My mom always worried about this. Venus in 7th house suggests strong romantic inclinations... this feels personalized enough. Not bad for ₹1.",
          reasoning:
            "The AI response references her actual chart data (Manglik status, Venus placement) which feels personalized. The marriage-focused reading aligns with her selected journey purpose. The ₹1 price point means her expectations are calibrated low — and the response exceeds them.",
          frictionPoints: [
            "Could be more specific about compatibility",
            "Doesn't mention partner's chart",
          ],
          missing: "Option to ask follow-up questions about specific concerns",
        },
      ],
    },
    // -- Drop-off: S2 (Phone Number) --
    {
      id: "P02",
      name: "Arjun Krishnamurthy",
      role: "Senior SDE, 31",
      city: "Bangalore",
      lamfExp: "N/A",
      urgency: "High (2 AM anxiety about job switch)",
      need: "Should I take the startup offer?",
      fear: "Colleagues finding out he uses astrology",
      outcome: "dropped",
      dropScreen: "S2",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "'Career kab set hogi? Chat 24/7 at just ₹1.' It's 2 AM and I can't sleep because of this Razorpay offer. ₹1 is nothing. Let me just check what this AI says — it's probably BS but I'm desperate enough to try.",
          reasoning:
            "Late-night anxiety lowers his rationality barrier. The ₹1 price makes it feel like a zero-risk experiment. The career-specific ad hook matches his exact mental state.",
          frictionPoints: ["Mild embarrassment — 'I don't believe in this stuff'"],
          missing: "Nothing — the ad caught him at peak vulnerability",
        },
        {
          screen: "S2",
          decision: "drop",
          trustScore: 3,
          clarityScore: 6,
          gutReaction:
            "Phone number? Nah. What if SuperAstro shows up in my UPI history or phone records? Imagine someone at standup saying 'bro why is an astrology app texting you?' I'd never hear the end of it. I'll just ask ChatGPT instead.",
          reasoning:
            "The social stigma of astrology among tech professionals is the primary barrier. A phone number creates a permanent, discoverable link between his identity and an astrology service. At 2 AM the impulse was strong but not strong enough to overcome professional reputation risk.",
          frictionPoints: [
            "Phone number = permanent identity link",
            "Astrology stigma in tech circles",
            "No anonymous or guest option",
            "Fear of SMS spam with SuperAstro branding",
          ],
          missing:
            "Guest chat option, anonymous access, or at minimum reassurance that the app name won't appear in phone records",
          dropReason:
            "Won't share phone number with astrology app — fear of professional embarrassment if colleagues discover it.",
        },
      ],
    },
    // -- Drop-off: S11 (AI Chat) --
    {
      id: "P03",
      name: "Pooja Kumari",
      role: "Marketing Executive, 24",
      city: "Delhi",
      lamfExp: "N/A",
      urgency: "High (breakup 2 weeks ago)",
      need: "Specific answer about ex-boyfriend — does he miss me?",
      fear: "AI won't actually answer her question",
      outcome: "dropped",
      dropScreen: "S11",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 7,
          clarityScore: 8,
          gutReaction:
            "'Does he miss me? Shaadi kab hogi? Chat NOW' — YES. This is exactly what I need right now. Finally someone who can tell me if Sahil still thinks about me.",
          reasoning:
            "Ad C's emotional hooks perfectly match her post-breakup state. The ad feels like it was written for her specific situation. High emotional resonance overrides any skepticism.",
          frictionPoints: [],
          missing: "Nothing — the ad is perfectly targeted",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Phone number, fine. I don't care who knows I use astrology — half my friends check their horoscope on InstaAstro anyway. Just let me chat with the astrologer.",
          reasoning:
            "No stigma barrier for her demographic. Astrology is normalized in her social circle. Urgency is high enough that phone number is a trivial ask.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction:
            "OTP received. Fast. Good. Next.",
          reasoning: "Smooth verification, maintains momentum.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction:
            "Name — Pooja Kumari. Obviously. Hurry up, I want to ask about Sahil.",
          reasoning:
            "Impatient but compliant. Each screen feels like a barrier between her and the answer she needs.",
          frictionPoints: ["Just one more screen... right?"],
          missing: "Progress indicator showing how many screens are left",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Female. Tap. Next. Come on, kitne screens hain?",
          reasoning:
            "Growing impatience but still moving forward. The emotional need is strong.",
          frictionPoints: ["No progress bar — how many more screens?"],
          missing: "Step counter or progress indicator",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Marital status... 'Unmarried'. Ugh. Rub it in. I KNOW I'm unmarried, that's literally why I'm here. Is this relevant though? For a breakup question?",
          reasoning:
            "The question feels emotionally loaded given her situation. She's seeking answers about a broken relationship and the marital status question highlights her pain point. But she pushes through.",
          frictionPoints: [
            "Emotionally triggering given breakup context",
            "Unclear relevance to her specific question",
          ],
          missing: "Reassurance about why this data helps the reading",
        },
        {
          screen: "S7",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Date of birth — 8th September 2001. Fine. I know Virgos are overthinking this breakup. Tell me something I don't know.",
          reasoning:
            "Provides data readily. Making astrological connections already — she's an engaged user.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S8",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "Time of birth? Umm... I think mummy said it was around 3 PM? Let me guess 3:15 PM. Close enough? There's a Skip button but if I skip, will the reading be less accurate? I'll just guess.",
          reasoning:
            "Doesn't know exact time but doesn't want to skip for fear of inaccurate results. Enters an approximation.",
          frictionPoints: [
            "Doesn't know exact birth time",
            "Skip button unclear — will it affect accuracy?",
          ],
          missing: "Clarity on how birth time affects the reading",
        },
        {
          screen: "S9",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Place of birth — Delhi. Found it. Almost there, I can feel it.",
          reasoning: "Major city, no picker issues. Momentum building.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S10",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Journey purpose — 'Relationship'. FINALLY a screen that actually relates to why I'm here. But I wish I could just type 'does he miss me?' instead of picking a generic category.",
          reasoning:
            "The option exists but feels too broad. She has a very specific question and a category label doesn't capture her intent.",
          frictionPoints: ["Category too broad for specific question"],
          missing: "Free-text question input",
        },
        {
          screen: "S11",
          decision: "drop",
          trustScore: 2,
          clarityScore: 3,
          gutReaction:
            "Namaste Pooja! Based on your kundli, Venus is in your 7th house which indicates strong romantic energy. Your current Mahadasha suggests a period of emotional transformation... WHAT? I don't care about my Mahadasha! Does. He. Miss. Me. That's literally what the ad said. 10 screens of my personal data and you can't answer one simple question? I'm uninstalling this.",
          reasoning:
            "The AI response is technically accurate astrology but completely misaligned with her emotional need and the ad's promise. She endured 10 screens of data entry because the ad said 'Does he miss me?' — and the AI never addresses that question. The gap between ad promise and delivered experience is maximum. Trust collapses instantly.",
          frictionPoints: [
            "Generic kundli response instead of answering her specific question",
            "No acknowledgment of the question that brought her here",
            "10 screens of investment with misaligned payoff",
            "Ad promise completely broken",
          ],
          missing:
            "Direct answer to the question from the ad, or at minimum, acknowledgment of her specific concern before diving into chart details",
          dropReason:
            "AI gave a generic birth chart reading instead of answering the specific question ('Does he miss me?') that the ad promised to address.",
        },
      ],
    },
    // -- Drop-off: S10 (Journey Purpose) --
    {
      id: "P04",
      name: "Suresh Prakash",
      role: "Shop Owner, 47",
      city: "Old Delhi",
      lamfExp: "N/A",
      urgency: "Medium (opening new shop, wants auspicious date)",
      need: "Vastu guidance for new store in Chandni Chowk",
      fear: "Options won't match his need",
      outcome: "dropped",
      dropScreen: "S10",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 7,
          clarityScore: 6,
          gutReaction:
            "'Sare jawab aapki kundali mein hai' — haan bilkul. Meri maa hamesha kehti thi ki kundli se sab pata chalta hai. ₹1 mein? AstroTalk pe toh ₹15/min lete hain. Let me try this.",
          reasoning:
            "Deep cultural belief in kundli. The ₹1 price compared to AstroTalk's per-minute pricing is a strong hook. Sri Mandir ecosystem resonates with his devotional lifestyle.",
          frictionPoints: [],
          missing: "Nothing — strong cultural alignment",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 6,
          clarityScore: 6,
          gutReaction:
            "Phone number de deta hoon. Sri Mandir ka app hai, trustworthy hoga. Waise bhi mera number toh sabko pata hai — dukaan pe likha hua hai.",
          reasoning:
            "No privacy concern — his phone number is literally on his shop signboard. Sri Mandir brand provides trust. No stigma about astrology in his social context.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "OTP aa gaya. Theek hai.",
          reasoning: "Simple verification, no issues.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Suresh Prakash. Yeh sab kundli ke liye chahiye, mujhe pata hai.",
          reasoning:
            "Familiar with astrology data requirements. Knows name is needed for chart generation.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 6,
          clarityScore: 8,
          gutReaction:
            "Male. Next.",
          reasoning: "Quick, no friction.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Married. 22 saal ho gaye. Next.",
          reasoning: "No emotional trigger — married and comfortable with it.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S7",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Date of birth — 15th August 1978. Independence Day baby! Har pandit ko yeh yaad rehta hai.",
          reasoning:
            "Knows his birth details well — has had multiple kundlis made over his life.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S8",
          decision: "continue",
          trustScore: 6,
          clarityScore: 6,
          gutReaction:
            "Time of birth — subah 5:30. Mummy ne bola tha Brahma muhurt mein paida hua tha. Good omen.",
          reasoning:
            "Knows birth time from family oral tradition. Enters it confidently.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S9",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "Place of birth — Delhi. Mil gaya. Easy.",
          reasoning: "Born in Delhi, no picker issues.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S10",
          decision: "drop",
          trustScore: 3,
          clarityScore: 3,
          gutReaction:
            "Journey purpose — Marriage, Career, Relationship. Arey bhai, mujhe Vastu ke baare mein poochna hai! Nayi dukaan khol raha hoon Chandni Chowk mein. Property ka muhurat chahiye. Career se kya matlab? Yeh toh sab bacchon ke options hain. Business kahaan hai? Property kahaan hai? Health kahaan hai? Main kya karoon, Career pe click karoon? Woh toh galat answer dega. Bakwas app hai.",
          reasoning:
            "His need (Vastu guidance for a new shop) doesn't map to any of the three options. 'Career' is the closest but means something completely different to a 47-year-old shop owner. The narrow options signal that this app wasn't built for his use case, despite the ad's broad 'Sare jawab aapki kundali mein hai' promise.",
          frictionPoints: [
            "Only 3 journey options — none match his need",
            "No Business, Property, Vastu, or Health option",
            "No free-text alternative",
            "Feels like the app is only for young people's relationship problems",
          ],
          missing:
            "Business/Property/Vastu option, or a free-text field to type his specific question",
          dropReason:
            "None of the 3 journey purpose options (Marriage/Career/Relationship) match his need for Vastu and business guidance.",
        },
      ],
    },
    // -- Drop-off: S9 (Place of Birth) --
    {
      id: "P05",
      name: "Vikram Joshi",
      role: "Software Architect, 35",
      city: "Dubai",
      lamfExp: "N/A",
      urgency: "Low (curious, disconnected from family pandit)",
      need: "Career + relationship reading from a Vedic perspective",
      fear: "Indian-only city picker won't have his birth city",
      outcome: "dropped",
      dropScreen: "S9",
      journey: [
        {
          screen: "S1",
          decision: "continue",
          trustScore: 6,
          clarityScore: 7,
          gutReaction:
            "'Astrology koi guess nahi, ek science hai' — interesting. I've been meaning to get a proper Vedic reading ever since I moved to Dubai. Back home, Dadaji's pandit would do it every year. The scientific framing makes me feel less silly about trying an app.",
          reasoning:
            "NRI nostalgia for Vedic traditions combined with the 'scientific' framing that appeals to his tech background. Disconnected from family pandit due to distance.",
          frictionPoints: ["Mild skepticism about AI astrology"],
          missing: "Nothing — curiosity is enough at ₹1",
        },
        {
          screen: "S2",
          decision: "continue",
          trustScore: 5,
          clarityScore: 6,
          gutReaction:
            "Indian phone number required? I still have my Airtel number active — use it for all Indian apps. ₹1 is literally nothing. Let me try.",
          reasoning:
            "Maintains an Indian number, so no technical barrier. Low price removes any hesitation.",
          frictionPoints: ["What if they only support Indian numbers?"],
          missing: "Clarity on international number support",
        },
        {
          screen: "S3",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "OTP on Indian number — works fine over WhatsApp. Quick.",
          reasoning: "No friction, OTP received on Indian number.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S4",
          decision: "continue",
          trustScore: 5,
          clarityScore: 8,
          gutReaction:
            "Vikram Joshi. Standard.",
          reasoning: "Simple data entry, no friction.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S5",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Male. Tap. Next.",
          reasoning: "Quick screen, moving through.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S6",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Married. 3 years now. Sunita would laugh if she knew I was using an astrology app. But I'm curious.",
          reasoning:
            "Light social embarrassment even with spouse but not enough to stop.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S7",
          decision: "continue",
          trustScore: 5,
          clarityScore: 7,
          gutReaction:
            "Date of birth — 22nd November 1990. Scorpio season, as my wife keeps reminding me.",
          reasoning: "Has birth date readily available. Moving through.",
          frictionPoints: [],
          missing: "Nothing",
        },
        {
          screen: "S8",
          decision: "continue",
          trustScore: 5,
          clarityScore: 5,
          gutReaction:
            "Time of birth — I think it was morning? Let me check... I actually have a photo of my janm patri on my phone. 7:12 AM. Exact.",
          reasoning:
            "NRIs often keep digital copies of birth documents. Has the data, enters it confidently.",
          frictionPoints: ["Had to search phone for exact time"],
          missing: "Nothing — he found it",
        },
        {
          screen: "S9",
          decision: "drop",
          trustScore: 2,
          clarityScore: 2,
          gutReaction:
            "Place of birth — let me search for Jamnagar. J-A-M... it's a dropdown? Not a search field? I can see Ahmedabad, Rajkot, Surat, Vadodara... but no Jamnagar. Jamnagar is a city with 6 lakh people! It has an Air Force base! How is it not in the list? I can't just pick 'Rajkot' — that's 200 km away, the chart would be completely wrong. The coordinates matter for an accurate kundli. This is useless.",
          reasoning:
            "The city picker has a limited dropdown of major cities. Jamnagar, despite being a significant city, isn't included. For Vedic astrology, birth location coordinates directly affect the chart — an incorrect city would produce an inaccurate kundli. As someone who understands astrology's dependence on precise birth data, he can't approximate.",
          frictionPoints: [
            "Dropdown instead of searchable text field",
            "Limited to major cities only",
            "No international city support",
            "Can't enter coordinates manually",
            "Incorrect city = inaccurate kundli",
          ],
          missing:
            "Searchable text input with comprehensive city database including tier-2/3 Indian cities and international locations",
          dropReason:
            "Birth city (Jamnagar) not available in the limited dropdown picker. Can't complete birth chart without accurate location.",
        },
      ],
    },
  ],
};
