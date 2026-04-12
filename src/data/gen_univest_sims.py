#!/usr/bin/env python3
"""
Generate Univest simulation insights for all 50 personas across 6 flows.
Run: python3 gen_univest_sims.py   (from landing/src/data/)
Output: univest1-insights.json … univest6-insights.json
"""

import json, os, math
from datetime import timezone

OUT = os.path.dirname(os.path.abspath(__file__))

# ─── PERSONAS ─────────────────────────────────────────────────────────────────
#  id, uuid_suffix, name, age, sex, city, state, zone, income,
#  occupation, employer_type, digital_lit, archetype, power_tier,
#  device, family_size, education, language, category,
#  scam_alert, loss_averse, fo_active, demat, prior_burn,
#  professional_background, cultural_background

P = [
  # ── POWER ───────────────────────────────────────────────────────────────────
  dict(id="01",uuid_suffix="rohit-mumbai",name="Rohit Mehta",age=32,sex="M",city="Mumbai",state="Maharashtra",zone="Urban",income=170000,occupation="Sr. Software Development Engineer",employer_type="startup",digital_lit=9,archetype="The Pragmatist",power_tier="Mid",device="Android",family_size=3,education="B.Tech (NIT Surat)",language="Hindi",category="POWER",scam_alert=9,loss_averse=6,fo_active=True,demat=True,prior_burn=True,
   professional_background="NIT Surat grad, 8 yrs at Mumbai fintech startups. Trades Bank Nifty options 2-3x/week on Zerodha and Dhan. Burned by Telegram tip groups in 2022 but distinguishes those from SEBI-registered platforms.",
   cultural_background="Gujarati-origin Mumbai professional. Pragmatic, data-driven, taps ₹1 trial out of professional curiosity as much as investing interest."),

  dict(id="02",uuid_suffix="priya-bengaluru",name="Priya Iyer",age=28,sex="F",city="Bengaluru",state="Karnataka",zone="Urban",income=220000,occupation="Senior Product Manager",employer_type="MNC",digital_lit=9,archetype="The Skeptic",power_tier="High",device="iOS",family_size=2,education="MBA (SIBM Pune)",language="Tamil",category="POWER",scam_alert=10,loss_averse=7,fo_active=False,demat=False,prior_burn=False,
   professional_background="SIBM Pune MBA, 4 yrs at SaaS MNCs in Bengaluru. Manages ₹40k SIP basket via Kuvera. Reads SEBI filings and founder LinkedIn before engaging with any financial product.",
   cultural_background="Tamil Brahmin Bengaluru professional. Allergic to 'stock-tip' framing. Will not proceed without verifying SEBI registration AND founder credibility externally."),

  dict(id="03",uuid_suffix="aditya-pune",name="Aditya Kulkarni",age=34,sex="M",city="Pune",state="Maharashtra",zone="Urban",income=380000,occupation="Quantitative Researcher",employer_type="HFT",digital_lit=10,archetype="The Skeptic",power_tier="High",device="iOS",family_size=2,education="PhD (IIT Bombay)",language="Marathi",category="POWER",scam_alert=10,loss_averse=5,fo_active=True,demat=True,prior_burn=False,
   professional_background="IIT Bombay PhD in computational finance. Builds options-pricing models and maintains a custom Python backtester. Has no interest in external advisory; will not pay for tips under any circumstance.",
   cultural_background="Pune academic-professional. Highly opinionated about information asymmetry in retail advisory. Sees advisory apps as extracting rent from retail investors."),

  dict(id="04",uuid_suffix="meera-chennai",name="Meera Subramanian",age=36,sex="F",city="Chennai",state="Tamil Nadu",zone="Urban",income=240000,occupation="Equity Research Analyst",employer_type="brokerage",digital_lit=9,archetype="The Skeptic",power_tier="High",device="iOS",family_size=3,education="CFA Level 3, B.Com",language="Tamil",category="POWER",scam_alert=10,loss_averse=6,fo_active=False,demat=True,prior_burn=False,
   professional_background="CFA L3 cleared, 10 yrs covering mid-cap industrials at a tier-1 brokerage. She produces the research Univest competes with. Would never pay for tips she could generate herself.",
   cultural_background="Chennai Brahmin, deeply conservative about financial advice quality. Views stock-tip apps as noise generators that harm retail investors."),

  dict(id="05",uuid_suffix="vikram-gurugram",name="Vikram Singh",age=38,sex="M",city="Gurugram",state="Haryana",zone="Urban",income=250000,occupation="Marketing Manager",employer_type="MNC",digital_lit=7,archetype="The Pragmatist",power_tier="High",device="Android",family_size=4,education="MBA (FMS Delhi)",language="Hindi",category="POWER",scam_alert=6,loss_averse=6,fo_active=False,demat=False,prior_burn=False,
   professional_background="FMS Delhi MBA, 12 yrs at FMCG MNCs. ₹60k SIPs via bank RM. No demat account. Money fully committed to EMI+SIP+school fees. Sees Univest reels at lunch but zero capacity for additional commitments.",
   cultural_background="Jat-background Gurugram professional. Family-first financial decisions. Husband/father role means he filters every financial decision through 'can I justify this to my family?'"),

  dict(id="06",uuid_suffix="arjun-hyderabad",name="Arjun Reddy",age=35,sex="M",city="Hyderabad",state="Telangana",zone="Urban",income=110000,occupation="Senior Data Analyst",employer_type="IT services",digital_lit=8,archetype="The Pragmatist",power_tier="Mid",device="Android",family_size=3,education="B.Tech",language="Telugu",category="POWER",scam_alert=6,loss_averse=5,fo_active=False,demat=True,prior_burn=False,
   professional_background="Top-3 IT services firm, Zerodha since 2020. IPOs (Zomato/Nykaa/Paytm) + ₹15k SIP via Groww. No F&O but curious. Finfluencer fan who supplements with his own data instincts.",
   cultural_background="Telugu professional, Hyderabad. Optimistic about markets. Sees ₹1 trial as a low-stakes experiment worth taking."),

  dict(id="07",uuid_suffix="sneha-ahmedabad",name="Sneha Patel",age=29,sex="F",city="Ahmedabad",state="Gujarat",zone="Urban",income=145000,occupation="Chartered Accountant",employer_type="CA firm",digital_lit=8,archetype="The Skeptic",power_tier="Mid",device="iOS",family_size=3,education="CA (ICAI)",language="Gujarati",category="POWER",scam_alert=9,loss_averse=7,fo_active=False,demat=True,prior_burn=False,
   professional_background="Audit manager at a mid-tier CA firm. SEBI compliance is her job. 'Free trade unlock' reads as bait-and-switch to her professional eye. Manages MF + PMS for clients.",
   cultural_background="Gujarati professional, Ahmedabad. Conservative about financial products. Her CA lens makes every advisory claim a red flag until proven otherwise."),

  dict(id="08",uuid_suffix="karan-pune",name="Karan Joshi",age=26,sex="M",city="Pune",state="Maharashtra",zone="Urban",income=65000,occupation="Backend Developer",employer_type="startup",digital_lit=8,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=1,education="B.Tech",language="Marathi",category="POWER",scam_alert=3,loss_averse=3,fo_active=False,demat=True,prior_burn=False,
   professional_background="2-yr exp SaaS startup backend dev in Wakad PG. Groww newbie, watches Pranjal Kamra on YouTube. FOMO-driven, low skepticism, treats ₹1 as essentially free.",
   cultural_background="Pune young professional, PG accommodation, unmarried. Impulsive with small financial decisions. Believes the next big investment tip could change his trajectory."),

  dict(id="09",uuid_suffix="divya-bengaluru",name="Divya Nair",age=30,sex="F",city="Bengaluru",state="Karnataka",zone="Urban",income=180000,occupation="Senior UX Designer",employer_type="fintech",digital_lit=9,archetype="The Pragmatist",power_tier="Mid",device="iOS",family_size=2,education="B.Des (NID Ahmedabad)",language="Malayalam",category="POWER",scam_alert=7,loss_averse=5,fo_active=True,demat=True,prior_burn=False,
   professional_background="NID Ahmedabad grad, 6 yrs fintech UX. Runs ₹25k Bank Nifty experiments on Dhan. Will tap to study the conversion design itself as much as for the investing value.",
   cultural_background="Kerala-origin Bengaluru professional. Analytically processes everything through a UX lens. Sees Univest as a professional study subject as much as a consumer product."),

  # ── MODERATE ────────────────────────────────────────────────────────────────
  dict(id="10",uuid_suffix="manish-indore",name="Manish Kumar",age=41,sex="M",city="Indore",state="Madhya Pradesh",zone="Semi-Urban",income=95000,occupation="Electronics Shop Owner",employer_type="self_employed",digital_lit=5,archetype="The Skeptic",power_tier="Low",device="Android",family_size=5,education="B.Com",language="Hindi",category="MODERATE",scam_alert=8,loss_averse=8,fo_active=False,demat=True,prior_burn=False,
   professional_background="2nd-gen Marwari trader. FDs+gold+2 MFs. Opened Zerodha but stock UI overwhelms him. Cautious about every rupee spent online after seeing family friends lose money.",
   cultural_background="Marwari business family, Indore. Deep risk-aversion from community norms. Every financial decision is filtered through 'what will the family think?'"),

  dict(id="11",uuid_suffix="deepak-coimbatore",name="Deepak Naidu",age=30,sex="M",city="Coimbatore",state="Tamil Nadu",zone="Semi-Urban",income=52000,occupation="Process Engineer",employer_type="manufacturing",digital_lit=6,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=3,education="B.E. Mechanical",language="Tamil",category="MODERATE",scam_alert=5,loss_averse=6,fo_active=False,demat=False,prior_burn=False,
   professional_background="Tier-1 auto components supplier. ₹10k HDFC SIP set up by his bank RM. Sees F&O profit reels and gets curious but wife manages family finances and would say no to speculative apps.",
   cultural_background="Tamil Hindu family, traditional gender-divided finances. Curious about markets but defers to spouse on money decisions. Needs spousal buy-in for any subscription."),

  dict(id="12",uuid_suffix="anjali-lucknow",name="Anjali Sharma",age=34,sex="F",city="Lucknow",state="Uttar Pradesh",zone="Semi-Urban",income=38000,occupation="Senior Secondary Teacher",employer_type="private school",digital_lit=6,archetype="The Privacy Guardian",power_tier="Low",device="Android",family_size=4,education="M.Sc Biology, B.Ed",language="Hindi",category="MODERATE",scam_alert=8,loss_averse=9,fo_active=False,demat=False,prior_burn=False,
   professional_background="Biology teacher, husband is a govt-bank officer. No demat. Follows finance reels casually but stock advisory products feel fraudulent. Any subscription goes through husband approval.",
   cultural_background="UP middle-class family. Joint household finances managed by husband. Stock market = gambling in her cultural frame. The word 'trade' signals risk and potential embarrassment."),

  dict(id="13",uuid_suffix="rahul-jaipur",name="Rahul Agrawal",age=31,sex="M",city="Jaipur",state="Rajasthan",zone="Semi-Urban",income=88000,occupation="Inside Sales Manager",employer_type="B2B SaaS",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="MBA",language="Hindi",category="MODERATE",scam_alert=4,loss_averse=4,fo_active=False,demat=True,prior_burn=False,
   professional_background="Groww+Upstox dabbler, down 18% YTD but still believes the next good tip will turn things around. High-urgency decision-making, taps fast and figures it out later.",
   cultural_background="Rajasthani Agrawal family. Optimistic entrepreneur-spirit. Sees losses as temporary and every new tool as potentially the one that changes everything."),

  dict(id="14",uuid_suffix="shilpa-kochi",name="Shilpa Menon",age=33,sex="F",city="Kochi",state="Kerala",zone="Urban",income=58000,occupation="Hospital Pharmacist",employer_type="hospital",digital_lit=6,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=3,education="B.Pharm",language="Malayalam",category="MODERATE",scam_alert=7,loss_averse=7,fo_active=False,demat=False,prior_burn=False,
   professional_background="Hospital pharmacist, ₹8k SIP via bank RM. Would only sign up if her CA cousin blessed the platform. Careful with money but open to new financial tools with validation.",
   cultural_background="Kerala Christian family. Communal trust networks (CA cousin, family advice) are the gatekeepers for financial decisions. Won't act alone without expert endorsement."),

  dict(id="15",uuid_suffix="amit-nagpur",name="Amit Deshmukh",age=39,sex="M",city="Nagpur",state="Maharashtra",zone="Semi-Urban",income=78000,occupation="Civil Engineer",employer_type="construction",digital_lit=6,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=4,education="B.E. Civil",language="Marathi",category="MODERATE",scam_alert=9,loss_averse=8,fo_active=False,demat=True,prior_burn=True,
   professional_background="Lost ~₹40k to a 'sure-shot' Telegram tip group in 2020. Now gun-shy about anything labeled 'tip' or 'free trade'. Maintains MFs through Zerodha Coin only.",
   cultural_background="Vidarbha Maratha family. Prior financial trauma makes him hyper-vigilant. The words 'free tips' or 'trade signals' trigger immediate fight-or-flight response."),

  dict(id="16",uuid_suffix="rashmi-bhopal",name="Rashmi Verma",age=29,sex="F",city="Bhopal",state="Madhya Pradesh",zone="Semi-Urban",income=48000,occupation="HR Executive",employer_type="IT company",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=2,education="MBA HR",language="Hindi",category="MODERATE",scam_alert=4,loss_averse=4,fo_active=False,demat=True,prior_burn=False,
   professional_background="₹5k SIP, recently opened Zerodha for large-caps. Univest 'live trades' hits her dopamine button. Excited by real-time trading signals, sees it as the next level of investing.",
   cultural_background="UP/MP migrant in Bhopal, ambitious. Treats financial apps as tools for self-improvement. Live trades feed = excitement + FOMO in equal measure."),

  dict(id="17",uuid_suffix="sourav-kolkata",name="Sourav Ghosh",age=37,sex="M",city="Kolkata",state="West Bengal",zone="Urban",income=92000,occupation="Section Officer",employer_type="PSU bank",digital_lit=6,archetype="The Skeptic",power_tier="Low",device="Android",family_size=4,education="M.Com",language="Bengali",category="MODERATE",scam_alert=8,loss_averse=9,fo_active=False,demat=False,prior_burn=False,
   professional_background="12yr PSU bank tenure. PPF+EPF+NSC+LIC+₹3k MF SIP. Customer fraud horror stories cross his desk weekly. Sees every fintech advisory as a potential fraud vector.",
   cultural_background="Bengali middle-class, extremely conservative about money. Institutional safety is paramount. Anything labeled 'tips' or 'signals' triggers fraud risk management instincts."),

  dict(id="18",uuid_suffix="rina-vadodara",name="Rina Shah",age=34,sex="F",city="Vadodara",state="Gujarat",zone="Urban",income=70000,occupation="Boutique Owner",employer_type="self_employed",digital_lit=7,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=4,education="B.Com",language="Gujarati",category="MODERATE",scam_alert=6,loss_averse=5,fo_active=False,demat=True,prior_burn=False,
   professional_background="Boutique owner, husband manages their investment spreadsheet. Dormant Zerodha account. Will commit ₹1 for a trial if the first tip shows quality, treats it as a product test.",
   cultural_background="Gujarati trading family background. Pragmatic about business experiments. ₹1 is not a risk — it's a product evaluation fee she's comfortable paying."),

  dict(id="19",uuid_suffix="vineet-noida",name="Vineet Tiwari",age=29,sex="M",city="Noida",state="Uttar Pradesh",zone="Urban",income=58000,occupation="IT Support Lead",employer_type="BPO",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=2,education="B.Tech",language="Hindi",category="MODERATE",scam_alert=4,loss_averse=4,fo_active=False,demat=True,prior_burn=False,
   professional_background="₹15k mid-cap stock portfolio currently down. Hungry for an edge before year-end appraisal cycle. High urgency, taps quickly and optimistically.",
   cultural_background="UP young professional in Noida. Grinding mentality. Believes the right information at the right time can change his financial trajectory."),

  dict(id="20",uuid_suffix="manjusha-mysuru",name="Manjusha Rao",age=32,sex="F",city="Mysuru",state="Karnataka",zone="Semi-Urban",income=72000,occupation="Software Engineer",employer_type="IT",digital_lit=8,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=3,education="B.E. CSE",language="Kannada",category="MODERATE",scam_alert=7,loss_averse=6,fo_active=False,demat=True,prior_burn=False,
   professional_background="Mid-tier IT company, Mysuru. ₹12k SIP + Zerodha for direct equities. Reads every T&C — pauses hard at any 'auto-renew' fine print. Methodical decision-maker.",
   cultural_background="Mysuru Brahmin, conservative upbringing. Takes financial decisions seriously. Will not click through anything without reading the fine print first."),

  dict(id="21",uuid_suffix="faisal-lucknow",name="Faisal Khan",age=35,sex="M",city="Lucknow",state="Uttar Pradesh",zone="Semi-Urban",income=60000,occupation="Insurance Agent",employer_type="tied agent",digital_lit=7,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=4,education="B.A., IRDA certified",language="Urdu",category="MODERATE",scam_alert=5,loss_averse=5,fo_active=False,demat=True,prior_burn=False,
   professional_background="Tied ULIP/traditional plan agent with 8 years experience. Opened demat for client demos. Curious about Univest ₹1 trial as competitor intelligence rather than personal investing.",
   cultural_background="Lucknow Muslim professional. Financially educated about insurance products. Views Univest as a competitor product worth understanding from the inside."),

  dict(id="22",uuid_suffix="naveen-vijayawada",name="Naveen Reddy",age=30,sex="M",city="Vijayawada",state="Andhra Pradesh",zone="Semi-Urban",income=68000,occupation="Civil Site Engineer",employer_type="real estate",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="B.Tech Civil",language="Telugu",category="MODERATE",scam_alert=3,loss_averse=3,fo_active=False,demat=True,prior_burn=False,
   professional_background="Telugu finance YouTube + reels consumer. Zerodha + ₹35k portfolio. Makes reflexive ₹1 taps on any finance product that looks professional in his feed.",
   cultural_background="Andhra professional, aspirational mindset. Sees all investment opportunities as worth exploring. Low barrier to try anything under ₹10."),

  dict(id="23",uuid_suffix="pooja-surat",name="Pooja Bhandari",age=27,sex="F",city="Surat",state="Gujarat",zone="Urban",income=54000,occupation="Textile Designer",employer_type="family business",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="B.Des",language="Gujarati",category="MODERATE",scam_alert=3,loss_averse=3,fo_active=False,demat=True,prior_burn=False,
   professional_background="Just opened Groww, ₹4k SIP. Active Instagram/YouTube finance content consumer. Would tap ₹1 partly for the experience and partly to screenshot for her social stories.",
   cultural_background="Surat Gujarati family business background. Social sharing is part of her relationship with products — she curates her financial journey publicly."),

  dict(id="24",uuid_suffix="rakesh-bhubaneswar",name="Rakesh Mohanty",age=36,sex="M",city="Bhubaneswar",state="Odisha",zone="Semi-Urban",income=96000,occupation="PSU Engineer",employer_type="PSU",digital_lit=6,archetype="The Skeptic",power_tier="Low",device="Android",family_size=4,education="B.Tech",language="Odia",category="MODERATE",scam_alert=8,loss_averse=9,fo_active=False,demat=False,prior_burn=False,
   professional_background="13yr PSU tenure, EPF+gratuity safety net. 'If I lose money on a stock tip, my wife will not let me hear the end of it.' Risk management is domestic as much as financial.",
   cultural_background="Odisha PSU family. Extremely conservative, spousal accountability is real. Every financial decision is evaluated through 'will this be defensible at home?'"),

  dict(id="25",uuid_suffix="zoya-pune",name="Zoya Khan",age=27,sex="F",city="Pune",state="Maharashtra",zone="Urban",income=75000,occupation="Content Marketing Lead",employer_type="agency",digital_lit=8,archetype="The Enthusiast",power_tier="Low",device="iOS",family_size=2,education="MBA Marketing",language="Hindi",category="MODERATE",scam_alert=4,loss_averse=4,fo_active=False,demat=True,prior_burn=False,
   professional_background="Mid-cap stock dabbler. Will tap ₹1 partly because the 'live trades' UI feels professional, not just for the tips. Marketing background makes her appreciate good product design.",
   cultural_background="Pune Muslim professional, liberal values. Evaluates products on UX quality as well as value. A slick UI is itself a trust signal for her."),

  # ── EXPOSED-BUT-NON-PARTICIPANT ───────────────────────────────────────────
  dict(id="26",uuid_suffix="sandeep-hubli",name="Sandeep Patil",age=33,sex="M",city="Hubli",state="Karnataka",zone="Semi-Urban",income=35000,occupation="Junior College Lecturer",employer_type="college",digital_lit=6,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=4,education="M.Com",language="Kannada",category="EXPOSED",scam_alert=6,loss_averse=7,fo_active=False,demat=True,prior_burn=False,
   professional_background="Teaches commerce/accountancy. Dormant Groww + ₹2.5k SIP. ₹1 = fine; ₹2,899 = a full month's discretionary budget.",
   cultural_background="North Karnataka middle class. Price-sensitive in the extreme. Sees ₹1 as no-risk but any subsequent commitment is deeply evaluated."),

  dict(id="27",uuid_suffix="pooja-bareilly",name="Pooja Rao",age=24,sex="F",city="Bareilly",state="Uttar Pradesh",zone="Semi-Urban",income=22000,occupation="Marketing Executive",employer_type="local agency",digital_lit=6,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=4,education="MBA",language="Hindi",category="EXPOSED",scam_alert=3,loss_averse=4,fo_active=False,demat=False,prior_burn=False,
   professional_background="MBA, lives with parents. No demat. Univest reel feels like the apps her favourite creators promote. ₹1 = candy money, immediate tap.",
   cultural_background="UP small-city aspirational. Social proof from creators she follows is a primary trust signal. Low financial literacy but high action-orientation."),

  dict(id="28",uuid_suffix="tarun-dehradun",name="Tarun Bisht",age=26,sex="M",city="Dehradun",state="Uttarakhand",zone="Semi-Urban",income=32000,occupation="Content Writer",employer_type="travel site",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="B.A.",language="Hindi",category="EXPOSED",scam_alert=4,loss_averse=4,fo_active=False,demat=False,prior_burn=False,
   professional_background="Watches finance reels between travel reels. No demat yet but curious. The ₹1 ask is lower than a coffee — acts impulsively on single-screen flows.",
   cultural_background="Hill-state young professional. Content-curious mindset. Financially aspirational but not yet invested. Low-friction actions feel like safe exploration."),

  dict(id="29",uuid_suffix="megha-ranchi",name="Megha Sinha",age=29,sex="F",city="Ranchi",state="Jharkhand",zone="Semi-Urban",income=42000,occupation="HR Executive",employer_type="pharma",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="MBA HR",language="Hindi",category="EXPOSED",scam_alert=5,loss_averse=6,fo_active=False,demat=False,prior_burn=False,
   professional_background="Active Rachana Ranade watcher. Saves Univest reels but hasn't acted. Husband manages all money decisions; she would need to run it by him first.",
   cultural_background="Jharkhand mid-city family. Traditional gender dynamics around money. Watches finance content as education but defers to husband for any actual commitment."),

  dict(id="30",uuid_suffix="ravi-belgaum",name="Ravi Hegde",age=31,sex="M",city="Belgaum",state="Karnataka",zone="Semi-Urban",income=55000,occupation="Branch Manager",employer_type="co-op bank",digital_lit=7,archetype="The Skeptic",power_tier="Low",device="Android",family_size=3,education="B.Com, CAIIB",language="Kannada",category="EXPOSED",scam_alert=8,loss_averse=8,fo_active=False,demat=False,prior_burn=False,
   professional_background="Sees customer-fraud cases involving stock-tip apps monthly at his branch. Extremely cautious about anything labeled 'tips' or 'free signals'.",
   cultural_background="North Karnataka banking professional. Institutional conservatism. Every advisory app = potential fraud vector based on what he processes at work."),

  dict(id="31",uuid_suffix="priyanka-raipur",name="Priyanka Sahu",age=26,sex="F",city="Raipur",state="Chhattisgarh",zone="Semi-Urban",income=36000,occupation="State Govt Clerk",digital_lit=5,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=5,education="B.A.",language="Hindi",employer_type="government",category="EXPOSED",scam_alert=6,loss_averse=8,fo_active=False,demat=False,prior_burn=False,
   professional_background="Father is retired bank officer; very conservative household. No SIP, no demat. Curious about investing but has no framework to evaluate advisory apps.",
   cultural_background="Chhattisgarh government-family household. Financial conservatism is structural. Father's bank background means she's heard 'market mein risk hai' since childhood."),

  dict(id="32",uuid_suffix="sanjay-aurangabad",name="Sanjay Kale",age=38,sex="M",city="Aurangabad",state="Maharashtra",zone="Semi-Urban",income=65000,occupation="Auto Mechanic",employer_type="self_employed",digital_lit=4,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=5,education="ITI",language="Marathi",category="EXPOSED",scam_alert=5,loss_averse=6,fo_active=False,demat=False,prior_burn=False,
   professional_background="4-bay workshop. Marathi YouTube finance habit. Wants to invest but stock UIs overwhelm him. Acts on urgency impulses but gets confused by dense information.",
   cultural_background="Marathwada self-employed family. High urgency to 'do something with money' but low financial literacy makes complex layouts a barrier."),

  dict(id="33",uuid_suffix="tejaswi-vizag",name="Tejaswi Rao",age=23,sex="F",city="Visakhapatnam",state="Andhra Pradesh",zone="Urban",income=32000,occupation="Junior Developer",employer_type="IT services",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=4,education="B.Tech",language="Telugu",category="EXPOSED",scam_alert=3,loss_averse=3,fo_active=False,demat=False,prior_burn=False,
   professional_background="IT services fresher in PG accommodation. Saved many 'first salary investing' reels. ₹1 = entry-level commitment she will absolutely take.",
   cultural_background="Andhra coastal family, first-generation professional. Eager to do 'the right thing' with her first salary. ₹1 is a no-brainer experiment."),

  dict(id="34",uuid_suffix="pratik-nashik",name="Pratik Joshi",age=30,sex="M",city="Nashik",state="Maharashtra",zone="Semi-Urban",income=48000,occupation="Medical Sales Representative",employer_type="pharma",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="B.Pharm",language="Marathi",category="EXPOSED",scam_alert=4,loss_averse=4,fo_active=False,demat=False,prior_burn=False,
   professional_background="Pharma rep. Sees finance reels at petrol pumps. Curious ₹1 tap highly likely — treats every small financial experiment as part of his growth mindset.",
   cultural_background="Nashik Brahmin family. Side-hustle mindset. Every ₹1 trial is a 'nothing-to-lose, everything-to-gain' proposition."),

  dict(id="35",uuid_suffix="divyansh-kanpur",name="Divyansh Mishra",age=25,sex="M",city="Kanpur",state="Uttar Pradesh",zone="Semi-Urban",income=28000,occupation="Customer Support Executive",employer_type="BPO",digital_lit=6,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=4,education="B.A.",language="Hindi",category="EXPOSED",scam_alert=4,loss_averse=3,fo_active=False,demat=False,prior_burn=False,
   professional_background="Hindi finance YouTube is his only investing input. Will tap ₹1 reflexively on any product his YouTube subscriptions implicitly endorse.",
   cultural_background="UP BPO worker, aspirational. Social proof from Hindi content creators = all the validation needed. Treats ₹1 trials as lottery tickets."),

  dict(id="36",uuid_suffix="shreya-jodhpur",name="Shreya Bhati",age=27,sex="F",city="Jodhpur",state="Rajasthan",zone="Semi-Urban",income=30000,occupation="Boutique Manager",employer_type="retail",digital_lit=6,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=4,education="B.A.",language="Hindi",category="EXPOSED",scam_alert=6,loss_averse=7,fo_active=False,demat=False,prior_burn=False,
   professional_background="Watches Hindi finance reels but doesn't act. Hesitates at any commitment screen. Would need a lot of reassurance before entering payment details.",
   cultural_background="Rajasthan small-city family. Cultural hesitancy around individual financial decisions. Needs social proof or family validation before committing."),

  dict(id="37",uuid_suffix="naman-ludhiana",name="Naman Gupta",age=24,sex="M",city="Ludhiana",state="Punjab",zone="Urban",income=26000,occupation="Junior Accountant",employer_type="CA firm",digital_lit=7,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=4,education="B.Com, CA Intermediate",language="Punjabi",category="EXPOSED",scam_alert=4,loss_averse=3,fo_active=False,demat=False,prior_burn=False,
   professional_background="CA articleship at a local firm. Insta finance reels shape his investing mental model. ₹1 = instant tap with zero deliberation.",
   cultural_background="Ludhiana Punjabi family. Aspirational, growth-oriented. Financial curiosity is high; caution is low at this stage of career."),

  dict(id="38",uuid_suffix="saraswati-warangal",name="Saraswati Patil",age=31,sex="F",city="Warangal",state="Telangana",zone="Semi-Urban",income=44000,occupation="Assistant Manager",employer_type="local bank",digital_lit=6,archetype="The Skeptic",power_tier="Low",device="Android",family_size=4,education="B.Com, JAIIB",language="Telugu",category="EXPOSED",scam_alert=7,loss_averse=9,fo_active=False,demat=False,prior_burn=False,
   professional_background="Mom of one. FDs+LIC+small MF. Bank training has hardcoded: never tap any 'free' financial CTA. Sees advisory apps as retail investor traps.",
   cultural_background="Telangana conservative banking family. Professional exposure to fraud cases. 'Free' in financial context = marketing fraud in her mental model."),

  dict(id="39",uuid_suffix="vinay-rajkot",name="Vinay Patel",age=29,sex="M",city="Rajkot",state="Gujarat",zone="Semi-Urban",income=38000,occupation="Accountant",employer_type="trading co",digital_lit=7,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=3,education="B.Com",language="Gujarati",category="EXPOSED",scam_alert=7,loss_averse=7,fo_active=False,demat=True,prior_burn=False,
   professional_background="2 MFs through father's CA. Cautious by nature. Scrutinizes ₹2,899 fine print. Will tap simple CTAs but stops dead at any complex pricing screen.",
   cultural_background="Rajkot Gujarati trading family. Careful with money by instinct. Pricing complexity = red flag, even if the base amount is small."),

  dict(id="40",uuid_suffix="imran-mangalore",name="Imran Sheikh",age=28,sex="M",city="Mangalore",state="Karnataka",zone="Urban",income=40000,occupation="Logistics Coordinator",employer_type="port co",digital_lit=6,archetype="The Enthusiast",power_tier="Low",device="Android",family_size=3,education="B.Com",language="Tulu",category="EXPOSED",scam_alert=4,loss_averse=5,fo_active=False,demat=False,prior_burn=False,
   professional_background="Watches finance reels but feels investing is for richer people. ₹1 is just affordable enough to make trying feel possible. First step toward markets.",
   cultural_background="Coastal Karnataka Muslim family. Wants to invest but feels excluded from financial systems. ₹1 makes the door feel open."),

  # ── JUNK ────────────────────────────────────────────────────────────────────
  dict(id="41",uuid_suffix="sahil-mumbai",name="Sahil R",age=21,sex="M",city="Mumbai",state="Maharashtra",zone="Urban",income=5000,occupation="BCom Student",employer_type="student",digital_lit=7,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=4,education="BCom ongoing",language="Hindi",category="JUNK",scam_alert=5,loss_averse=5,fo_active=False,demat=False,prior_burn=False,
   professional_background="Was scrolling Reels, accidentally tapped Univest while replying to WhatsApp. Closes within 3 seconds. Zero investing intent.",
   cultural_background="Mumbai BCom student. Busy with college, not thinking about investments. Accidental arrival."),

  dict(id="42",uuid_suffix="bot1-bengaluru",name="Bot-like Signup #1",age=26,sex="M",city="Bengaluru",state="Karnataka",zone="Urban",income=0,occupation="Unknown",employer_type="unknown",digital_lit=1,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=1,education="Unknown",language="Unknown",category="JUNK",scam_alert=0,loss_averse=0,fo_active=False,demat=False,prior_burn=False,
   professional_background="Likely attribution-fraud install. No real interaction signal. Session expires immediately.",
   cultural_background="Non-human. Attribution fraud from CPI campaign."),

  dict(id="43",uuid_suffix="rewards-surat",name="Rewards Hunter A",age=29,sex="M",city="Surat",state="Gujarat",zone="Urban",income=25000,occupation="Freelancer",employer_type="freelance",digital_lit=7,archetype="The Pragmatist",power_tier="Low",device="Android",family_size=2,education="B.Com",language="Gujarati",category="JUNK",scam_alert=6,loss_averse=6,fo_active=False,demat=False,prior_burn=False,
   professional_background="Searching 'free trial cashback apps'. Will not pay even ₹1. Drops the moment any payment intent becomes clear.",
   cultural_background="Surat Gujarati, cashback-hunter mindset. Every trial is evaluated purely for cashback/reward value."),

  dict(id="44",uuid_suffix="elderly-bhopal",name="Elderly Misnav",age=65,sex="M",city="Bhopal",state="Madhya Pradesh",zone="Semi-Urban",income=18000,occupation="Retired",employer_type="retired",digital_lit=3,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=3,education="Matriculate",language="Hindi",category="JUNK",scam_alert=4,loss_averse=8,fo_active=False,demat=False,prior_burn=False,
   professional_background="Retired postal employee on his son's old Android phone. No investing history. Tapped a Hindi ad by accident.",
   cultural_background="MP retired family. Minimal digital literacy. Financial products are incomprehensible on a small screen."),

  dict(id="45",uuid_suffix="scam-kid-patna",name="Scam-suspecting College Kid",age=19,sex="M",city="Patna",state="Bihar",zone="Semi-Urban",income=0,occupation="B.Tech Student",employer_type="student",digital_lit=6,archetype="The Skeptic",power_tier="Low",device="Android",family_size=5,education="B.Tech ongoing",language="Hindi",category="JUNK",scam_alert=9,loss_averse=7,fo_active=False,demat=False,prior_burn=False,
   professional_background="Believes all stock-tip apps are scams. Won't engage with any financial advisory on principle. Closes on sight.",
   cultural_background="Bihar engineering student, grew up hearing about online financial fraud."),

  dict(id="46",uuid_suffix="non-investor-delhi",name="Total Non-Investor",age=33,sex="M",city="Delhi",state="Delhi",zone="Urban",income=22000,occupation="Cab Driver",employer_type="self_employed",digital_lit=4,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=4,education="Class 10",language="Hindi",category="JUNK",scam_alert=3,loss_averse=5,fo_active=False,demat=False,prior_burn=False,
   professional_background="Does not know what a demat account is. Tapped while a passenger asked him to change music — closed instantly.",
   cultural_background="Delhi working class, no financial literacy background. Stock market is a foreign concept."),

  dict(id="47",uuid_suffix="existing-lucknow",name="Already-Existing Account",age=30,sex="F",city="Lucknow",state="Uttar Pradesh",zone="Semi-Urban",income=40000,occupation="Teacher",employer_type="private school",digital_lit=7,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=3,education="B.Ed",language="Hindi",category="JUNK",scam_alert=4,loss_averse=5,fo_active=False,demat=False,prior_burn=False,
   professional_background="Already has a Univest account. Funnel showing again because cookies cleared. Recognizes the screen and closes immediately.",
   cultural_background="Lucknow teacher. Already a user, no conversion opportunity."),

  dict(id="48",uuid_suffix="illiterate-begusarai",name="Illiterate Reach",age=55,sex="M",city="Begusarai",state="Bihar",zone="Rural",income=12000,occupation="Farmer",employer_type="farming",digital_lit=2,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=6,education="Class 5",language="Bhojpuri",category="JUNK",scam_alert=2,loss_averse=7,fo_active=False,demat=False,prior_burn=False,
   professional_background="Tapped Hindi ad on his son's smartphone. Cannot read English UI. Complete mismatch between product and user.",
   cultural_background="Bihar rural family. Digital literacy almost zero. English UI is a complete barrier."),

  dict(id="49",uuid_suffix="religious-varanasi",name="Religious Anti-Trader",age=44,sex="M",city="Varanasi",state="Uttar Pradesh",zone="Semi-Urban",income=35000,occupation="Small Shop Owner",employer_type="self_employed",digital_lit=5,archetype="The Skeptic",power_tier="Low",device="Android",family_size=5,education="Class 12",language="Hindi",category="JUNK",scam_alert=6,loss_averse=8,fo_active=False,demat=False,prior_burn=False,
   professional_background="Believes stock market is gambling and forbidden by his religion. Closes on sight of 'live trades'. Zero conversion possibility.",
   cultural_background="Varanasi devout Hindu (specific anti-market interpretation). Stock trading = speculation = forbidden activity."),

  dict(id="50",uuid_suffix="clickfarm-patna",name="Click-Farm Install",age=22,sex="M",city="Patna",state="Bihar",zone="Urban",income=0,occupation="Unknown",employer_type="unknown",digital_lit=1,archetype="The Confused Novice",power_tier="Low",device="Android",family_size=1,education="Unknown",language="Unknown",category="JUNK",scam_alert=0,loss_averse=0,fo_active=False,demat=False,prior_burn=False,
   professional_background="Click-farm install from a CPI campaign. No real human session.",
   cultural_background="Non-human. Click farm attribution fraud."),
]

# ─── FLOW DEFINITIONS ─────────────────────────────────────────────────────────
FLOWS = {
  1: {
    "simulation_id": "univest_flow1_demo",
    "flow_id": "univest_flow1_control",
    "flow_name": "Univest \u2013 Control: Trades Modal \u2192 Plan Picker (Flow 1.1 \u2192 1.2)",
    "screens": ["1_1", "1_2"],
    "screen_names": {"1_1": "Trades Modal – '3 Stock/F&O Ideas for FREE' (1.1)", "1_2": "Trial Pack Plan Picker – Pay \u20b91 (1.2)"},
    "variant_notes": "Two-step, aggressive FREE hook + multi-plan picker with hidden auto-renewal fine print",
    "friction_points": [
      {"friction": "over-the-top accuracy claim (84.7%) reads as fin-fluencer bait with no methodology cited", "frequency": 14},
      {"friction": "auto-renewal at \u20b92,799 buried in fine print directly below \u20b91 CTA", "frequency": 18},
      {"friction": "high cognitive load from multiple strikethrough prices and 'BEST VALUE' badges on plan picker", "frequency": 11},
      {"friction": "'Get Instant Refund' claim on a \u20b91 transaction feels gimmicky and erodes trust", "frequency": 8},
      {"friction": "aggressive 'FREE' bold red typography signals low-credibility marketing to sophisticated users", "frequency": 12},
      {"friction": "no clarity on what happens after the 3 free ideas — triggers subscription-trap anxiety", "frequency": 9},
    ],
  },
  2: {
    "simulation_id": "univest_flow2_demo",
    "flow_id": "univest_flow2",
    "flow_name": "Univest \u2013 Variant 2: Trusted Advisory + Live Trades + Sticky Start Trial \u20b91",
    "screens": ["2"],
    "screen_names": {"2": "Trusted Advisory + Live Trades – Sticky \u20b91 CTA (Variant 2)"},
    "variant_notes": "Single screen; 'India's Trusted Advisory' headline; live trades transparency strip; sticky ₹1 CTA",
    "friction_points": [
      {"friction": "scrolling card layout with countdown timer creates cognitive load for first-time visitors", "frequency": 9},
      {"friction": "84.7% accuracy claim still present — suspicious without methodology explanation", "frequency": 11},
      {"friction": "countdown timer feels artificially urgent, raising scam flags for high-literacy users", "frequency": 7},
      {"friction": "dense information card stack makes it hard to quickly scan key trust signals", "frequency": 6},
      {"friction": "Live Trades section impressive but requires scroll to see — below fold for many users", "frequency": 5},
    ],
  },
  3: {
    "simulation_id": "univest_flow3_demo",
    "flow_id": "univest_flow3",
    "flow_name": "Univest \u2013 Variant 3: Trusted Advisory compact + \u2018Unlock FREE trade\u2019",
    "screens": ["3"],
    "screen_names": {"3": "Trusted Advisory Compact – 'Unlock FREE Trade' CTA (Variant 3)"},
    "variant_notes": "Single screen, compressed layout; 'Unlock FREE trade' framing replaces aggressive ₹1 ask upfront",
    "friction_points": [
      {"friction": "'Unlock FREE trade' still reads as a marketing hook to highly sceptical users", "frequency": 8},
      {"friction": "compact layout reduces trust-building real estate — SEBI info is tiny", "frequency": 6},
      {"friction": "accuracy claim persists without supporting evidence", "frequency": 7},
      {"friction": "no pricing visible until CTA tap — creates hidden-cost anxiety for careful readers", "frequency": 5},
    ],
  },
  4: {
    "simulation_id": "univest_flow4_demo",
    "flow_id": "univest_flow4",
    "flow_name": "Univest \u2013 Variant 4: Crown + Trust Pillars + \u2018Unlock FREE trade\u2019",
    "screens": ["4"],
    "screen_names": {"4": "Crown + Trust Pillars + 'Unlock FREE Trade' (Variant 4)"},
    "variant_notes": "Single screen; premium crown branding; explicit SEBI/experience/user-count trust pillars; unlock CTA",
    "friction_points": [
      {"friction": "crown branding feels overly grandiose — 'trying too hard' to signal premium quality", "frequency": 7},
      {"friction": "trust pillars are helpful but their layout competes with the CTA for visual attention", "frequency": 6},
      {"friction": "accuracy claim still without methodology — trust pillars partially offset it but don't eliminate concern", "frequency": 8},
      {"friction": "unlock framing still unclear about what specifically is being unlocked and at what cost", "frequency": 5},
    ],
  },
  5: {
    "simulation_id": "univest_flow5_demo",
    "flow_id": "univest_flow5",
    "flow_name": "Univest \u2013 Variant 5: Trust Pillars + Dual CTA (Unlock + Start Trial \u20b91)",
    "screens": ["5"],
    "screen_names": {"5": "Trust Pillars + Dual CTA – Unlock Free + Start Trial \u20b91 (Variant 5)"},
    "variant_notes": "Single screen; dual CTA (unlock free trade OR ₹1 trial); trust pillars + SEBI registration; most transparent pricing",
    "friction_points": [
      {"friction": "dual CTA creates minor decision paralysis for impulsive users", "frequency": 4},
      {"friction": "some users confused about the difference between 'unlock free trade' and 'start ₹1 trial'", "frequency": 5},
      {"friction": "accuracy claim still present without supporting data link", "frequency": 6},
    ],
  },
  6: {
    "simulation_id": "univest_flow6_demo",
    "flow_id": "univest_flow6",
    "flow_name": "Univest \u2013 Variant 6: Dual CTA \u2192 Loss-Aversion Recover (6.1 \u2192 6.2)",
    "screens": ["6_1", "6_2"],
    "screen_names": {"6_1": "Value Proposition + Dual CTA (6.1)", "6_2": "Loss-Aversion Recovery – '\u20b91 is all it takes' (6.2)"},
    "variant_notes": "Two-step: screen 6.1 shows value prop + dual CTA; screen 6.2 is a recovery/reminder screen for hesitant users",
    "friction_points": [
      {"friction": "two-step structure adds friction versus single-screen variants", "frequency": 10},
      {"friction": "recovery screen 6.2 feels manipulative to high-skepticism users — 'they knew I'd hesitate'", "frequency": 8},
      {"friction": "loss-aversion framing on 6.2 ('don't miss out on today's trade') triggers urgency anxiety in privacy guardians", "frequency": 6},
      {"friction": "accuracy claim on 6.1 still without methodology", "frequency": 7},
      {"friction": "two different screens introduce pricing confusion — some assume 6.2 has higher cost", "frequency": 5},
    ],
  },
}

# ─── OUTCOME MATRIX ────────────────────────────────────────────────────────────
# For each persona ID, tuple of 6 outcomes: one per flow
# "completed" or "dropped_off_at_<screen_id>"
# Two-screen flows (1 and 6): can drop at screen 1 or 2
# Single-screen flows (2,3,4,5): drop at the only screen

OUTCOMES = {
  # id:  (flow1,            flow2,    flow3,    flow4,    flow5,    flow6)
  "01": ("completed",       "completed","completed","completed","completed","completed"),
  "02": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "03": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "04": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "05": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_2"),
  "06": ("completed",       "completed","completed","completed","completed","completed"),
  "07": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "08": ("completed",       "completed","completed","completed","completed","completed"),
  "09": ("completed",       "completed","completed","completed","completed","completed"),

  "10": ("dropped_off_at_1_2","completed","completed","dropped_off_at_4","completed","dropped_off_at_6_2"),
  "11": ("dropped_off_at_1_2","completed","completed","completed","completed","dropped_off_at_6_2"),
  "12": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "13": ("completed",       "completed","completed","completed","completed","completed"),
  "14": ("dropped_off_at_1_2","completed","completed","completed","completed","dropped_off_at_6_2"),
  "15": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "16": ("completed",       "completed","completed","completed","completed","completed"),
  "17": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "18": ("dropped_off_at_1_2","completed","completed","completed","completed","dropped_off_at_6_2"),
  "19": ("completed",       "completed","completed","completed","completed","completed"),
  "20": ("dropped_off_at_1_2","completed","completed","completed","completed","completed"),
  "21": ("completed",       "completed","completed","completed","completed","completed"),
  "22": ("completed",       "completed","completed","completed","completed","completed"),
  "23": ("completed",       "completed","completed","completed","completed","completed"),
  "24": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","completed","dropped_off_at_6_2"),
  "25": ("completed",       "completed","completed","completed","completed","completed"),

  "26": ("dropped_off_at_1_2","dropped_off_at_2","completed","dropped_off_at_4","completed","completed"),
  "27": ("completed",       "completed","completed","completed","completed","completed"),
  "28": ("dropped_off_at_1_2","completed","completed","completed","completed","completed"),
  "29": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "30": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "31": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_2"),
  "32": ("dropped_off_at_1_2","dropped_off_at_2","completed","dropped_off_at_4","completed","dropped_off_at_6_2"),
  "33": ("dropped_off_at_1_2","completed","completed","completed","completed","completed"),
  "34": ("completed",       "completed","completed","completed","completed","completed"),
  "35": ("completed",       "completed","completed","completed","completed","completed"),
  "36": ("dropped_off_at_1_2","completed","completed","dropped_off_at_4","completed","completed"),
  "37": ("completed",       "completed","completed","completed","completed","completed"),
  "38": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "39": ("dropped_off_at_1_2","completed","completed","dropped_off_at_4","completed","completed"),
  "40": ("completed",       "completed","completed","completed","completed","completed"),

  "41": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "42": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "43": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_2"),
  "44": ("dropped_off_at_1_2","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_2"),
  "45": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "46": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "47": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "48": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "49": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
  "50": ("dropped_off_at_1_1","dropped_off_at_2","dropped_off_at_3","dropped_off_at_4","dropped_off_at_5","dropped_off_at_6_1"),
}

# ─── SCORE PROFILES per archetype per flow (trust, clarity, value) ─────────────
# Returns (trust, clarity, value) for each screen based on archetype + completed/dropped

def get_scores(archetype, flow_n, screen_id, outcome):
    completed = outcome == "completed"
    base = {
        "The Enthusiast":        (7.5, 7.8, 8.2),
        "The Pragmatist":        (5.8, 6.8, 6.5),
        "The Skeptic":           (3.5, 5.5, 3.8),
        "The Privacy Guardian":  (3.8, 5.2, 3.5),
        "The Confused Novice":   (5.5, 4.8, 5.5),
    }.get(archetype, (5.0, 6.0, 5.0))

    # Flow modifiers: flow 5 best trust, flow 1 worst
    trust_mod = {1: -0.8, 2: 0.3, 3: 0.5, 4: 0.4, 5: 0.8, 6: 0.2}.get(flow_n, 0)
    # Plan picker / second screen drops trust
    second_screen_mod = -0.8 if screen_id in ("1_2", "6_2") else 0
    # Completers feel higher value
    value_boost = 0.5 if completed else 0

    t = round(min(10, max(1, base[0] + trust_mod + second_screen_mod)), 1)
    c = round(min(10, max(1, base[1] + (0.3 if flow_n in (3,5) else 0))), 1)
    v = round(min(10, max(1, base[2] + value_boost + trust_mod * 0.5)), 1)
    return t, c, v

def get_time(archetype, screen_id, outcome):
    """Realistic time-on-screen in seconds."""
    times = {
        "The Skeptic":        {"1_1": 25, "1_2": 55, "2": 48, "3": 32, "4": 40, "5": 45, "6_1": 38, "6_2": 30},
        "The Privacy Guardian":{"1_1": 20,"1_2": 60, "2": 45, "3": 30, "4": 38, "5": 42, "6_1": 35, "6_2": 28},
        "The Pragmatist":     {"1_1": 18, "1_2": 52, "2": 38, "3": 25, "4": 35, "5": 40, "6_1": 32, "6_2": 38},
        "The Enthusiast":     {"1_1": 12, "1_2": 28, "2": 22, "3": 18, "4": 20, "5": 22, "6_1": 18, "6_2": 15},
        "The Confused Novice":{"1_1": 30, "1_2": 70, "2": 55, "3": 45, "4": 50, "5": 48, "6_1": 42, "6_2": 55},
    }
    t = times.get(archetype, {}).get(screen_id, 30)
    # Junk/bot users exit extremely fast
    if screen_id in ("1_1","2","3","4","5","6_1") and outcome.startswith("dropped_off_at_") and outcome.endswith(screen_id):
        t = max(2, t // 4)  # Very fast exit
    return t

# ─── MONOLOGUE TEMPLATES ───────────────────────────────────────────────────────
# (archetype, flow_n, screen_id, outcome_type) → monologue text
# outcome_type: "complete" or "drop"

def make_monologue(p, flow_n, screen_id, outcome):
    name = p["name"].split()[0]
    arch = p["archetype"]
    completed = outcome == "completed"
    city = p["city"]

    flow_context = {
        1: "a two-step flow starting with a '3 Free Stock Tips' modal",
        2: "a single-screen 'India's Trusted Advisory + Live Trades' page with a sticky ₹1 CTA",
        3: "a compact single-screen layout with an 'Unlock FREE Trade' CTA",
        4: "a single screen with premium Crown branding and SEBI/experience/user-count trust pillars",
        5: "a single screen combining trust pillars with a dual CTA — 'Unlock Free Trade' + 'Start Trial ₹1'",
        6: "a two-step flow: a value proposition screen followed by a loss-aversion recovery screen",
    }[flow_n]

    # Screen-specific context phrases
    screen_phrases = {
        "1_1": "the opening trades modal showing '3 F&O ideas for FREE'",
        "1_2": "the plan picker asking me to pay ₹1 to unlock, with ₹2,799 auto-renewal in tiny text",
        "2":   "the single-screen trusted advisory page with live trades strip and sticky ₹1 button",
        "3":   "the compact layout asking me to 'Unlock FREE trade'",
        "4":   "the screen with the Crown logo and trust pillars: SEBI registration, 75+ years combined experience, 5 lakh+ users",
        "5":   "the screen with trust pillars and two CTA options: unlock a free trade or start the ₹1 trial",
        "6_1": "the value proposition screen showing what I'd get, with two CTA buttons",
        "6_2": "the recovery screen reminding me that today's trade signal is waiting and ₹1 is all it takes",
    }
    sc = screen_phrases.get(screen_id, "this screen")

    templates_complete = {
        "The Enthusiast": [
            f"Okay, {sc} — I'm tapping. ₹1 is literally nothing, and if the tips are even half as good as the reel promised I'm already winning. No overthinking.",
            f"I've been watching finance reels about Univest for a while. {sc.capitalize()} makes it look real. ₹1 trial starts now — worst case I cancel tomorrow.",
            f"This is exactly the kind of tool I need right now. {sc.capitalize()} seals it for me. Tapping.",
        ],
        "The Pragmatist": [
            f"I ran the numbers in my head: ₹1 for a trial on {sc}. SEBI registration is visible. The UX is clean enough. Worst case I cancel in 24 hours — that's my due diligence done.",
            f"{sc.capitalize()} ticked enough boxes. Not perfect, but ₹1 gets me past the trust paywall to see the actual product. I can evaluate properly once I'm inside.",
            f"The accuracy claim is a yellow flag but SEBI number is real. Tapping through {sc} to test the actual signal quality before judging the marketing.",
        ],
        "The Confused Novice": [
            f"I'm not fully sure what I'm signing up for but {sc} says ₹1, and that's small enough that I won't get in trouble. I'll figure out the rest inside.",
            f"This looks like those apps my friend uses. {sc.capitalize()} has a tap button so I'll tap and see. ₹1 is fine.",
        ],
        "The Skeptic": [
            f"I still have reservations but the SEBI registration is clearly displayed on {sc} and the ₹1 is genuinely ₹1 with terms I can verify. Going in analytically.",
        ],
        "The Privacy Guardian": [
            f"₹1 is low enough risk that I can try without my husband finding out immediately. {sc.capitalize()} doesn't show scary subscription terms upfront.",
        ],
    }

    templates_drop = {
        "The Skeptic": {
            "early": [  # drops at first screen
                f"I see {sc} and the alarm bells are already going off. '84.7% accuracy' — that's a fin-influencer number. I do real research. Closing.",
                f"{sc.capitalize()} is marketing noise. I don't need tips; I build my own models. Not engaging.",
                f"The moment I see 'FREE tips' on {sc} I know this is a lead-gen funnel. My professional judgment says no.",
            ],
            "late": [  # drops at plan picker / second screen
                f"I reached {sc} and immediately spotted the auto-renewal at ₹2,799 buried in the footer. Classic dark pattern. This is exactly what I tell clients to avoid.",
                f"Got to {sc} — the ₹1 looked fine but 'Billed quarterly, renews at ₹2,799' in 9px font? That's a subscription trap. Closing.",
                f"Even as competitor research, {sc} crossed a line with the hidden auto-renewal. I can't in good conscience engage with this pricing structure.",
            ],
        },
        "The Privacy Guardian": {
            "early": [
                f"Stock advisory on {sc} — my husband would ask why I'm gambling. I'll close before I get further. This is not for me.",
            ],
            "late": [
                f"Reached {sc} and saw the ₹2,799 quarterly charge in small text. If that gets debited from our joint account without my husband knowing, I'll never hear the end of it.",
                f"That auto-renewal figure on {sc} is nearly 7% of my monthly salary. No CA cousin approved this. Closing.",
            ],
        },
        "The Pragmatist": {
            "early": [
                f"'{sc.capitalize()}' — I'm a Telegram-burned investor. The word 'free tips' is a PTSD trigger for me. Closing immediately.",
                f"I see {sc} and recognize the pattern: free tip → subscription trap. No time for this; my money is already allocated.",
            ],
            "late": [
                f"The ₹1 looked fine but {sc} shows auto-renewal at ₹2,799 in tiny text. I've seen this dark pattern before. Not going through with it.",
                f"Reached {sc} — the plan picker is unnecessarily complex. Three plan options with strikethrough prices? I've read enough UX dark-pattern literature to know what this is.",
                f"Good concept but {sc} asks me to enter payment details for a ₹1 trial with a hidden ₹2,799 auto-renew. My CA brain won't let me proceed.",
            ],
        },
        "The Confused Novice": {
            "early": [
                f"Too many things on {sc} and I don't know where to start. My wife said don't put money in anything without asking her. Closing.",
                f"I can't read English very well and {sc} has too much text. Not sure what I'm being asked to do.",
            ],
            "late": [
                f"Got to {sc} and there are three different price options. I got confused about which one to pick and if I choose wrong, will I lose money? Better not.",
                f"The {sc} has ₹1 and ₹2,799 and ₹699 — I don't understand what each means. Too risky without someone to explain.",
            ],
        },
        "The Enthusiast": {
            "late": [
                f"Hit {sc} and it said my husband has to approve money transfers. He won't. Closing before I get in trouble.",
                f"At {sc} I realized this would show up as a subscription on our joint account. Not worth the conversation. Closing.",
            ],
        },
    }

    # Select appropriate template
    is_early_drop = outcome in ("dropped_off_at_1_1", "dropped_off_at_2", "dropped_off_at_3",
                                "dropped_off_at_4", "dropped_off_at_5", "dropped_off_at_6_1")

    if completed:
        opts = templates_complete.get(arch, templates_complete["The Pragmatist"])
        idx = hash(p["id"] + str(flow_n)) % len(opts)
        return opts[idx]
    else:
        drop_map = templates_drop.get(arch, templates_drop["The Pragmatist"])
        key = "early" if is_early_drop else "late"
        opts = drop_map.get(key, drop_map.get("late", drop_map.get("early", ["Closing."])))
        idx = hash(p["id"] + str(flow_n) + screen_id) % len(opts)
        return opts[idx]

def make_reasoning(p, flow_n, screen_id, outcome):
    arch = p["archetype"]
    completed = outcome == "completed"
    flow_names_short = {1:"Control (1.1→1.2)",2:"Variant 2",3:"Variant 3",4:"Variant 4",5:"Variant 5",6:"Variant 6 (6.1→6.2)"}
    fn = flow_names_short[flow_n]
    if completed:
        reasons = {
            "The Enthusiast": f"Risk-reward on {fn} is trivially positive: ₹1 trial cost vs. upside from a single actionable trade signal. Immediate tap.",
            "The Pragmatist": f"SEBI registration is verifiable, ₹1 is within my mental accounting for research expenses. {fn} passed the basic trust checklist.",
            "The Skeptic": f"Despite reservations, {fn} cleared my minimum threshold: SEBI visible, trial cost is ₹1. I'll stress-test the signal quality before judging further.",
            "The Confused Novice": f"₹1 is so small it felt safe to try on {fn}. I'll see what happens inside.",
            "The Privacy Guardian": f"The ₹1 trial on {fn} won't trigger a large enough debit to cause a household dispute. Taking the risk.",
        }
        return reasons.get(arch, f"Proceeding with {fn}: cost-benefit is acceptable at ₹1.")
    else:
        reasons = {
            "The Skeptic": f"My professional/analytical framework flagged {fn}: unverified accuracy claims + dark-pattern pricing is an automatic reject.",
            "The Privacy Guardian": f"Auto-renewal risk on {fn} exceeds my household conflict threshold. Joint account integrity > ₹1 trial curiosity.",
            "The Pragmatist": f"Prior burn experience makes 'free tips' a non-starter on {fn}. The auto-renewal fine print confirmed my suspicion.",
            "The Confused Novice": f"Cognitive overload on {fn} crossed my comfort threshold. Better to not engage than make an uninformed decision.",
            "The Enthusiast": f"An external constraint (spouse, account visibility) blocked completion on {fn} despite my own positive intent.",
        }
        return reasons.get(arch, f"Could not complete {fn}: trust or friction barrier too high.")

def make_emotional_state(archetype, outcome):
    if outcome == "completed":
        return {"The Enthusiast":"Excited and optimistic","The Pragmatist":"Cautiously satisfied","The Skeptic":"Analytically engaged","The Confused Novice":"Mildly pleased","The Privacy Guardian":"Relieved"}.get(archetype,"Neutral")
    else:
        return {"The Enthusiast":"Disappointed but okay","The Pragmatist":"Calculated exit","The Skeptic":"Validated skepticism","The Confused Novice":"Confused and cautious","The Privacy Guardian":"Anxious and withdrawn"}.get(archetype,"Neutral")

def make_friction_points(archetype, flow_n, screen_id, outcome):
    if outcome == "completed":
        frictions = {
            "The Pragmatist": ["accuracy claim lacks methodology citation", "auto-renewal font size too small"],
            "The Enthusiast": [],
            "The Skeptic": ["accuracy claim suspicious", "took extra 10 seconds to verify SEBI number"],
            "The Confused Novice": ["price options were confusing"],
            "The Privacy Guardian": ["auto-renewal terms anxiety"],
        }
        return frictions.get(archetype, [])
    else:
        early_frictions = {
            "The Skeptic": ["fin-fluencer marketing trigger", "no trust signal visible above fold"],
            "The Privacy Guardian": ["stock advisory context triggers household conflict concern"],
            "The Pragmatist": ["prior burn PTSD from tip-group terminology", "immediate pattern recognition of subscription trap"],
            "The Confused Novice": ["English UI illegible or overwhelming", "unclear product purpose"],
            "The Enthusiast": ["external spousal/household constraint"],
        }
        late_frictions = {
            "The Skeptic": ["auto-renewal ₹2,799 buried below CTA", "accuracy claim unsubstantiated", "dark-pattern pricing display"],
            "The Privacy Guardian": ["auto-renewal = joint account risk", "quarterly billing not prominent"],
            "The Pragmatist": ["complex plan picker cognitive overload", "auto-renewal fine print", "multiple strikethrough prices"],
            "The Confused Novice": ["three plan options with different prices — unsure which to pick", "₹2,799 visible but unclear if mandatory"],
            "The Enthusiast": ["spousal gate required for subscription commitment"],
        }
        is_early = outcome.endswith(("1_1", "2", "3", "4", "5", "6_1"))
        return (early_frictions if is_early else late_frictions).get(archetype, ["friction barrier"])

# ─── OVERALL MONOLOGUE ────────────────────────────────────────────────────────
def make_overall_monologue(p, flow_n, outcome):
    name = p["name"].split()[0]
    arch = p["archetype"]
    city = p["city"]
    completed = outcome == "completed"
    flow_short = {1:"the two-step Control flow",2:"Variant 2 single-screen",3:"the compact Variant 3",4:"the Crown/Trust Pillars variant",5:"the dual-CTA Variant 5",6:"the two-step loss-aversion variant"}[flow_n]

    if completed:
        templates = {
            "The Enthusiast": f"{name} from {city} moved through {flow_short} with minimal friction. The ₹1 ask was trivially acceptable and the product's live-trades transparency was exactly the kind of signal that bypasses their usual filter. Quick, impulsive, high-satisfaction entry.",
            "The Pragmatist": f"{name} ran {flow_short} through a fast mental checklist: SEBI visible, ₹1 is research-level cost, trial is cancellable. Completed with residual concern about the accuracy claim but curiosity won out. Will evaluate the actual signal quality before judging the product.",
            "The Skeptic": f"{name} nearly exited multiple times during {flow_short} but the SEBI registration and visible trial pricing cleared the minimum bar. Completed analytically — this was a professional evaluation, not an excited tap.",
            "The Confused Novice": f"{name} completed {flow_short} largely on the basis that ₹1 felt safe regardless of full comprehension. Will need significant onboarding support to extract any value from the product.",
            "The Privacy Guardian": f"{name} completed {flow_short} in a rare moment of autonomous financial decision-making. The ₹1 was small enough to not require household discussion. Fragile conversion — any auto-debit surprise will result in immediate cancellation.",
        }
        return templates.get(arch, f"{name} completed {flow_short}.")
    else:
        templates = {
            "The Skeptic": f"{name} from {city} exited {flow_short} at the first or second trust-evaluation checkpoint. Their analytical framework found an unacceptable signal — either the accuracy-claim red flag or the auto-renewal dark pattern. Zero probability of conversion without a credibility redesign.",
            "The Privacy Guardian": f"{name} reached a point in {flow_short} where the financial commitment risk to their household dynamic outweighed the trial benefit. A visible auto-renewal term on a shared account is structurally incompatible with their situation.",
            "The Pragmatist": f"{name}'s {flow_short} journey ended at a trust boundary — either prior-burn PTSD from tip groups or the plan-picker complexity exceeded their tolerance. Would re-engage if the pricing transparency improved and the accuracy claim was verifiable.",
            "The Confused Novice": f"{name} hit cognitive overload during {flow_short}. The information density exceeded their processing comfort zone. Simplified UI or a single-plan default would likely convert this segment.",
            "The Enthusiast": f"{name} was personally interested in {flow_short} but an external constraint (spouse, joint account visibility) blocked the final commitment. Product intent was strong; household dynamic was the blocker.",
        }
        return templates.get(arch, f"{name} dropped off during {flow_short}.")

# ─── BUILD PER-PERSONA DETAILS ─────────────────────────────────────────────────
def build_persona_detail(p, flow_n, flow_def):
    pid = p["id"]
    outcomes_tuple = OUTCOMES[pid]
    outcome = outcomes_tuple[flow_n - 1]
    completed = outcome == "completed"

    screens = flow_def["screens"]
    screen_names = flow_def["screen_names"]

    # Determine which screens this persona actually visited
    visited_screens = []
    for s in screens:
        visited_screens.append(s)
        if outcome == f"dropped_off_at_{s}":
            break  # They dropped here

    # Build screen monologues
    screen_monologues = []
    total_time = 0
    for s in visited_screens:
        is_last = (s == visited_screens[-1])
        screen_outcome = "completed" if (completed and is_last) else (f"dropped_off_at_{s}" if (not completed and is_last) else "CONTINUE")
        decision = "CONTINUE" if not (not completed and is_last) else "DROP_OFF"

        t, c, v = get_scores(p["archetype"], flow_n, s, outcome)
        time_s = get_time(p["archetype"], s, outcome)
        total_time += time_s

        monologue = make_monologue(p, flow_n, s, outcome)
        reasoning = make_reasoning(p, flow_n, s, outcome)
        emotional = make_emotional_state(p["archetype"], outcome)
        friction = make_friction_points(p["archetype"], flow_n, s, outcome)

        screen_monologues.append({
            "screen_id": s,
            "view_name": screen_names[s],
            "internal_monologue": monologue,
            "reasoning": reasoning,
            "emotional_state": emotional,
            "trust_score": t,
            "clarity_score": c,
            "value_score": v,
            "time_seconds": time_s,
            "friction_points": friction,
            "selected_choice": decision,
            "decision_outcome": decision,
        })

    return {
        "persona_uuid": f"univest-p{pid}-{p['uuid_suffix']}",
        "demographics": {
            "occupation": p["occupation"],
            "age": p["age"],
            "sex": p["sex"],
            "zone": p["zone"],
            "state": p["state"],
            "district": p["city"],
            "monthly_income_inr": p["income"],
            "digital_literacy": p["digital_lit"],
            "behavioral_archetype": p["archetype"],
            "purchasing_power_tier": p["power_tier"],
            "employer_type": p["employer_type"],
            "primary_device": p["device"],
            "family_size": p["family_size"],
            "education_level": p["education"],
            "first_language": p["language"],
        },
        "professional_background": p["professional_background"],
        "cultural_background": p["cultural_background"],
        "outcome": outcome,
        "key_selections": {},
        "final_price_inr": 1 if completed else None,
        "total_time_seconds": total_time,
        "overall_monologue": make_overall_monologue(p, flow_n, outcome),
        "screen_monologues": screen_monologues,
    }

# ─── AGGREGATE STATS ────────────────────────────────────────────────────────────
ARCHETYPES = ["The Confused Novice","The Enthusiast","The Pragmatist","The Privacy Guardian","The Skeptic"]

def build_flow_json(flow_n):
    fd = FLOWS[flow_n]
    screens = fd["screens"]

    # Build all 50 persona details
    persona_details = [build_persona_detail(p, flow_n, fd) for p in P]

    # Aggregate outcomes
    completed_list = [pd for pd in persona_details if pd["outcome"] == "completed"]
    dropped_list = [pd for pd in persona_details if pd["outcome"] != "completed"]
    n_total = 50
    n_completed = len(completed_list)
    n_dropped = len(dropped_list)
    completion_pct = round(n_completed / n_total * 100, 1)

    # Avg time (completers only for meaningful signal)
    avg_time = round(sum(pd["total_time_seconds"] for pd in completed_list) / max(1, n_completed), 1)

    # Sample quality: MOE = 1.645 * sqrt(p*(1-p)/n) at 90% confidence
    p_hat = n_completed / n_total
    moe = round(1.645 * math.sqrt(p_hat * (1 - p_hat) / n_total) * 100, 1)

    # Funnel drop-off per screen
    funnel = []
    for s in screens:
        drops = sum(1 for pd in persona_details if pd["outcome"] == f"dropped_off_at_{s}")
        funnel.append({"screen_id": s, "drop_offs": drops, "drop_off_pct": round(drops / n_total * 100, 1)})

    # Screen metrics
    screen_metrics = {}
    for s in screens:
        # Personas who visited this screen
        visitors = []
        for pd in persona_details:
            sm_ids = [sm["screen_id"] for sm in pd["screen_monologues"]]
            if s in sm_ids:
                sm = next(sm for sm in pd["screen_monologues"] if sm["screen_id"] == s)
                visitors.append(sm)
        if visitors:
            screen_metrics[s] = {
                "avg_trust": round(sum(v["trust_score"] for v in visitors) / len(visitors), 1),
                "avg_clarity": round(sum(v["clarity_score"] for v in visitors) / len(visitors), 1),
                "avg_value": round(sum(v["value_score"] for v in visitors) / len(visitors), 1),
                "avg_time_s": round(sum(v["time_seconds"] for v in visitors) / len(visitors), 1),
                "sample_size": len(visitors),
            }

    # Segment completion summary
    archetype_map = {a: [] for a in ARCHETYPES}
    for pd in persona_details:
        arch = pd["demographics"]["behavioral_archetype"]
        archetype_map.setdefault(arch, []).append(pd)

    segment_completion_summary = []
    segment_screen_breakdown = {s: {a: {"reached": 0, "dropped_off": 0, "drop_off_pct": 0.0} for a in ARCHETYPES} for s in screens}

    for arch in ARCHETYPES:
        pds = archetype_map.get(arch, [])
        total = len(pds)
        comp = sum(1 for pd in pds if pd["outcome"] == "completed")
        dropped = total - comp
        comp_pct = round(comp / max(1, total) * 100, 1)
        # Most common drop screen
        drop_screens = [pd["outcome"].replace("dropped_off_at_", "") for pd in pds if pd["outcome"] != "completed"]
        top_drop = max(set(drop_screens), key=drop_screens.count) if drop_screens else ""

        segment_completion_summary.append({
            "segment": arch,
            "total": total,
            "completed": comp,
            "dropped": dropped,
            "completion_pct": comp_pct,
            "top_drop_off_screen": top_drop,
            "top_drop_off_reason": "" if not dropped else f"Trust/friction barrier at {top_drop}",
        })

        # Screen breakdown per segment
        for pd in pds:
            visited = [sm["screen_id"] for sm in pd["screen_monologues"]]
            for s in screens:
                if s in visited:
                    segment_screen_breakdown[s][arch]["reached"] += 1
                    if pd["outcome"] == f"dropped_off_at_{s}":
                        segment_screen_breakdown[s][arch]["dropped_off"] += 1
            # Compute pcts
        for s in screens:
            r = segment_screen_breakdown[s][arch]["reached"]
            d = segment_screen_breakdown[s][arch]["dropped_off"]
            segment_screen_breakdown[s][arch]["drop_off_pct"] = round(d / max(1, r) * 100, 1)

    # Drop-off monologues per screen
    drop_off_monologues = {}
    for s in screens:
        dropped_at_s = [pd for pd in persona_details if pd["outcome"] == f"dropped_off_at_{s}"]
        if dropped_at_s:
            monologues = []
            for pd in dropped_at_s:
                sm = next((sm for sm in pd["screen_monologues"] if sm["screen_id"] == s), None)
                if sm:
                    monologues.append({
                        "persona_uuid": pd["persona_uuid"],
                        "persona_label": f"{pd['demographics']['age']}yo {pd['demographics']['occupation']}, {pd['demographics']['district']}, \u20b9{pd['demographics']['monthly_income_inr']:,}/mo",
                        "behavioral_archetype": pd["demographics"]["behavioral_archetype"],
                        "internal_monologue": sm["internal_monologue"],
                        "reasoning": sm["reasoning"],
                        "emotional_state": sm["emotional_state"],
                        "trust_score": sm["trust_score"],
                        "clarity_score": sm["clarity_score"],
                        "value_score": sm["value_score"],
                    })
            drop_off_monologues[s] = monologues

    # Executive summary
    flow_rank = {1: "weakest", 2: "mid-tier", 3: "mid-tier", 4: "mid-tier", 5: "strongest", 6: "mid-tier"}
    exec_summary = (
        f"{fd['flow_name']} achieved a {completion_pct}% completion rate across all 50 personas "
        f"({flow_rank.get(flow_n, 'mid-tier')} of the six variants tested). "
        f"{'The single-screen format reduced decision friction significantly.' if len(screens) == 1 else 'The two-step structure adds friction but enables targeted messaging at each step.'} "
        f"Core non-converters are Skeptics ({next((s for s in segment_completion_summary if s['segment']=='The Skeptic'), {}).get('completion_pct', 0)}% completion), "
        f"Privacy Guardians ({next((s for s in segment_completion_summary if s['segment']=='The Privacy Guardian'), {}).get('completion_pct', 0)}%), "
        f"and the Junk cohort (0%). "
        f"Enthusiasts convert at {next((s for s in segment_completion_summary if s['segment']=='The Enthusiast'), {}).get('completion_pct', 0)}% across all variants."
    )

    # Flow assessment
    flow_assessments = {
        1: {"overall_verdict": "Weakest variant. Two-step with aggressive FREE-tip framing converts only impulsive enthusiasts. Plan picker screen is a credibility destroyer for anyone who pauses to read.", "completers": "Mild curiosity → eye-roll at accuracy claim → shrug at ₹1 → tap", "drop_offs": "Interest at free tip → suspicion at 84.7% → alarm at auto-renewal fine print → exit"},
        2: {"overall_verdict": "Strong mid-tier. 'Trusted Advisory' reframe + live trades strip raises trust. Single screen removes friction. Accuracy claim and countdown timer are residual friction.", "completers": "Trust scan (SEBI visible) → live trades credibility boost → ₹1 sticky CTA → tap", "drop_offs": "Initial interest → accuracy claim suspicion → countdown-timer manipulation detect → exit"},
        3: {"overall_verdict": "Compact format reduces cognitive load and converts curious pragmatists. 'Unlock FREE trade' framing is less aggressive than 'FREE tips'. Best for mobile-first impulsive segment.", "completers": "Quick scan → compact layout = low commitment signal → unlock tap", "drop_offs": "Sceptic scans for methodology → finds none → exit"},
        4: {"overall_verdict": "Crown branding polarises: authority signal for some, tryhard for others. Trust pillars are the strongest trust-building element but the layout competes for visual hierarchy.", "completers": "Crown + SEBI + user count → authority established → tap", "drop_offs": "Crown feels gimmicky → scrutinise trust claims → find accuracy claim unverified → exit"},
        5: {"overall_verdict": "Best performer. Dual CTA reduces binary-choice anxiety. Trust pillars + transparent ₹1 pricing address the two primary barriers simultaneously.", "completers": "Trust pillars scan → dual CTA seen as honest (two paths, user's choice) → tap preferred option", "drop_offs": "Even with trust pillars, irreducible sceptics find the advisory model fundamentally misaligned with their needs"},
        6: {"overall_verdict": "Two-step with recovery mechanism. Screen 6.2 re-engages hesitant users through loss-aversion framing. Effective on pragmatists who paused; backfires on high-scepticism users who see it as manipulation.", "completers": "6.1 value prop → hesitation → 6.2 recovery re-engages → ₹1 commitment", "drop_offs": "6.1 same as control → 6.2 feels manipulative → confirmed exit"},
    }
    fa = flow_assessments[flow_n]

    # Drop-off analysis clusters
    all_drops = [(pd["demographics"]["behavioral_archetype"], pd["outcome"]) for pd in persona_details if pd["outcome"] != "completed"]
    drop_off_analysis = {
        "total_drop_offs_analyzed": n_dropped,
        "screens": {}
    }
    for s in screens:
        s_drops = [pd for pd in persona_details if pd["outcome"] == f"dropped_off_at_{s}"]
        if s_drops:
            sample_reasonings = [
                next((sm["reasoning"] for sm in pd["screen_monologues"] if sm["screen_id"] == s), "")
                for pd in s_drops[:3]
            ]
            drop_off_analysis["screens"][s] = {
                "total_drop_offs": len(s_drops),
                "clusters": [{"cluster_id": -1, "label": "Primary friction cluster", "persona_count": len(s_drops), "sample_reasonings": [r for r in sample_reasonings if r]}]
            }

    # Build fix recommendations
    fix_recs = []
    if flow_n in (1, 6):
        fix_recs.append({"root_cause": "Auto-renewal at ₹2,799 buried in fine print triggers subscription-trap anxiety", "screen": screens[-1], "recommendation": "Increase auto-renewal disclosure to 14px bold; add 'no auto-renew for ₹9' opt-out toggle", "estimated_impact": "high", "feasibility": "high", "impact_feasibility_score": 9, "affected_segment": "Skeptics and Privacy Guardians", "expected_uplift": "+10-15% completion"})
    fix_recs.append({"root_cause": "84.7% accuracy claim perceived as fin-influencer bait with no methodology", "screen": screens[0], "recommendation": "Replace with a verified 3-year win-rate range and link to methodology", "estimated_impact": "high", "feasibility": "medium", "impact_feasibility_score": 8, "affected_segment": "High-literacy Skeptics and Pragmatists", "expected_uplift": "+8-12% trust on first screen"})
    if len(screens) > 1:
        fix_recs.append({"root_cause": "Cognitive overload from multi-plan pricing display", "screen": screens[-1], "recommendation": "Default to a single plan; hide other durations in collapsed 'See more options' section", "estimated_impact": "medium", "feasibility": "high", "impact_feasibility_score": 8, "affected_segment": "Confused Novices and Tier-2/3 users", "expected_uplift": "+5-8% completion"})
    fix_recs.append({"root_cause": "SEBI registration and trust signals below the fold on smaller screens", "screen": screens[0], "recommendation": "Pin SEBI reg number and user count in the top 200px viewport across all device sizes", "estimated_impact": "medium", "feasibility": "high", "impact_feasibility_score": 7, "affected_segment": "Pragmatists and cautious Moderates", "expected_uplift": "+5-7% completion"})

    # Usability findings
    usability_findings = []
    if flow_n == 1 or flow_n == 6:
        usability_findings.append({
            "severity": "critical", "type": "trust_issue",
            "screen": f"{screens[-1]} - {fd['screen_names'][screens[-1]]}",
            "finding": "Auto-renewal at ₹2,799 in 9px footer text is the single largest drop-off driver, perceived as a subscription trap by Skeptics and Privacy Guardians.",
            "evidence": "Pay ₹1 but renews at ₹2,799? That's a subscription trap. I know 'cancel anytime' often means nothing.",
            "affected_segments": ["The Skeptic", "The Privacy Guardian", "The Pragmatist"],
            "recommendation": "Increase auto-renewal disclosure to prominent position. Add explicit cancel-confirmation flow during onboarding."
        })
    usability_findings.append({
        "severity": "major", "type": "trust_issue",
        "screen": f"{screens[0]} - {fd['screen_names'][screens[0]]}",
        "finding": "The 84.7% accuracy claim is the most-cited friction point across all archetypes. Without a methodology link it reads as an invented marketing number.",
        "evidence": "Why is it exactly 84.7%? That specificity without evidence is a classic sign of fabricated social proof.",
        "affected_segments": ["The Skeptic", "The Pragmatist"],
        "recommendation": "Replace with a 'Verified 3-year performance summary' with a link to historical call data."
    })

    doc = {
        "simulation_id": fd["simulation_id"],
        "flow_id": fd["flow_id"],
        "flow_name": fd["flow_name"],
        "generated_at": "2026-04-12T09:00:00.000000+00:00",
        "summary": {
            "total_personas": n_total,
            "completed": n_completed,
            "dropped_off": n_dropped,
            "completion_rate_pct": completion_pct,
            "avg_time_to_complete_seconds": avg_time,
            "dominant_plan": "Unknown",
            "dominant_plan_pct": 100.0,
        },
        "sample_quality": {
            "sample_size": n_total,
            "margin_of_error_pct": moe,
            "confidence_level": "90%",
            "note": f"At n={n_total}, completion rate has \u00b1{moe}% uncertainty at 90% confidence. Adequate for directional decisions; run 100+ for statistically robust sub-segment comparisons.",
        },
        "plan_distribution": {"Unknown": {"count": n_completed, "pct": 100.0}},
        "addon_adoption": {"with_addon": {"count": 0, "pct": 0.0}, "skipped": {"count": n_completed, "pct": 100.0}},
        "funnel_drop_off": funnel,
        "top_friction_points": fd["friction_points"],
        "screen_metrics": screen_metrics,
        "executive_summary": exec_summary,
        "usability_findings": usability_findings,
        "segment_analysis": {
            "summary": f"Enthusiasts lead conversion ({next((s for s in segment_completion_summary if s['segment']=='The Enthusiast'), {}).get('completion_pct', 0)}%). Skeptics and Privacy Guardians anchor the bottom ({next((s for s in segment_completion_summary if s['segment']=='The Skeptic'), {}).get('completion_pct', 0)}%). Pragmatists are the swing segment — most sensitive to trust-signal quality and pricing transparency.",
            "high_propensity_segment": "The Enthusiast (Male/Female, 23-31, ₹22k-₹75k). Low friction threshold, impulsive ₹1 tap, FOMO-driven.",
            "low_propensity_segment": "The Skeptic and Privacy Guardian (Mixed, 28-41). Systematic trust evaluation, dark-pattern detection, household financial accountability.",
        },
        "segment_screen_breakdown": segment_screen_breakdown,
        "segments_used": ARCHETYPES,
        "segment_completion_summary": segment_completion_summary,
        "drop_off_monologues": drop_off_monologues,
        "fix_recommendations": fix_recs,
        "drop_off_analysis": drop_off_analysis,
        "flow_assessment": {
            "overall_verdict": fa["overall_verdict"],
            "emotional_journey_map": {"completers": fa["completers"], "drop_offs": fa["drop_offs"]},
        },
        "persona_details": persona_details,
    }
    return doc

# ─── WRITE FILES ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    for flow_n in range(1, 7):
        data = build_flow_json(flow_n)
        path = os.path.join(OUT, f"univest{flow_n}-insights.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        n = data["summary"]["completed"]
        pct = data["summary"]["completion_rate_pct"]
        print(f"  Flow {flow_n}: {n}/50 completions ({pct}%)  →  {path}")
    print("Done.")
