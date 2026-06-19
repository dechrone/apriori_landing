/**
 * Dealshare — WhatsApp deep-link referral.
 *
 * Apriori has no WhatsApp Cloud API; scouts use their OWN WhatsApp. A "Refer
 * on WhatsApp" button just opens wa.me to the Apriori dealshare number with a
 * pre-filled, structured message carrying the scout's name + ref code so the
 * admin can confirm it into the pipeline in one tap.
 *
 * Pure helpers — no React, no Supabase.
 */

import type { Scout } from "@/lib/dealshare";

/**
 * Apriori's receiving WhatsApp number in E.164 *digits only* (no +, spaces,
 * or dashes), e.g. "919876543210". Set NEXT_PUBLIC_DEALSHARE_WHATSAPP_NUMBER.
 * If unset, wa.me opens the chat picker so the scout chooses the contact.
 */
export const DEALSHARE_WA_NUMBER = (
  process.env.NEXT_PUBLIC_DEALSHARE_WHATSAPP_NUMBER ?? ""
).replace(/[^0-9]/g, "");

/** Short, stable, human-friendly attribution code derived from the scout id. */
export function scoutRefCode(scout: Pick<Scout, "id">): string {
  return `AP-${scout.id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

/** The pre-filled referral message a scout sends to the Apriori team. */
export function buildReferralMessage(scout: Pick<Scout, "id" | "name" | "email">): string {
  return [
    "New Apriori deal referral 🤝",
    `Scout: ${scout.name || scout.email}`,
    `Ref code: ${scoutRefCode(scout)}`,
    "",
    "Company: ",
    "Contact name: ",
    "Contact email / phone: ",
    "Why it's a fit: ",
  ].join("\n");
}

/** wa.me deep link, pre-filled. Works on mobile + WhatsApp Web. */
export function buildReferralWaLink(scout: Pick<Scout, "id" | "name" | "email">): string {
  const text = encodeURIComponent(buildReferralMessage(scout));
  const base = DEALSHARE_WA_NUMBER ? `https://wa.me/${DEALSHARE_WA_NUMBER}` : "https://wa.me/";
  return `${base}?text=${text}`;
}
