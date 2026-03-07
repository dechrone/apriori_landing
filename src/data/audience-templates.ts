import type { AudienceTemplate } from "@/types/audience-filters";

export const AUDIENCE_TEMPLATES: AudienceTemplate[] = [
  {
    id: "urban-millennials",
    icon: "🏙",
    name: "Urban Millennials",
    chips: ["Age 22–35", "Tier 1 cities", "Graduate+"],
    text: "Urban millennials aged 22–35, living in Tier 1 cities like Mumbai, Delhi and Bengaluru, with at least a graduate degree.",
  },
  {
    id: "high-value-customers",
    icon: "💎",
    name: "High Value Customers",
    chips: ["Income ₹1L+/mo", "High LTV", "Low churn"],
    text: "High-value customers with monthly income above ₹1 lakh, high lifetime value, and low churn risk.",
  },
  {
    id: "digital-natives",
    icon: "📱",
    name: "Digital Natives",
    chips: ["Age 18–30", "Mobile-first", "UPI users"],
    text: "Digital-native users aged 18–30 who primarily use smartphones, pay via UPI, and shop frequently on e-commerce apps.",
  },
  {
    id: "value-seekers",
    icon: "🛍",
    name: "Value Seekers",
    chips: ["Tier 2/3 cities", "Price sensitive", "Frequent buyers"],
    text: "Price-conscious shoppers in Tier 2 and Tier 3 cities who purchase frequently and are highly sensitive to discounts and offers.",
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh",
  "Puducherry", "Andaman & Nicobar Islands", "Lakshadweep",
  "Dadra & Nagar Haveli and Daman & Diu",
];

export const OCCUPATION_OPTIONS = [
  "Salaried", "Self-employed", "Business owner", "Student",
  "Homemaker", "Retired", "Freelancer",
];

export const EDUCATION_OPTIONS = [
  { value: "high_school", label: "High school or below" },
  { value: "graduate", label: "Graduate (Bachelor's)" },
  { value: "post_graduate", label: "Post-graduate" },
  { value: "professional", label: "Professional degree" },
];

export const PAYMENT_APPS = [
  "UPI (PhonePe, GPay)", "Paytm", "Net banking", "Credit card",
  "Debit card", "Cash on delivery", "EMI / BNPL",
];

export const ECOMMERCE_PLATFORMS = [
  "Amazon", "Flipkart", "Meesho", "Myntra", "Nykaa",
  "Quick commerce (Blinkit/Zepto)",
];
