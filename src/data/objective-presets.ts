/**
 * Canonical PM questions for the single-screen A/B wizard.
 * The picker shows `label`; `objective` is what ships to the backend
 * (appended to simulation_intent.intent_narrative server-side).
 */

export interface ObjectivePreset {
  id: string;
  label: string;
  objective: string;
}

export const OBJECTIVE_PRESETS: ObjectivePreset[] = [
  {
    id: "signup-conversion",
    label: "Which variant drives higher signup conversion?",
    objective:
      "Compare the two screens and identify which one moves more users through to account creation. Focus on friction in form fields, CTA clarity, and trust cues.",
  },
  {
    id: "reduce-dropoff",
    label: "Which variant reduces drop-off in onboarding?",
    objective:
      "Compare the two screens and identify which reduces drop-off during onboarding. Focus on cognitive load, perceived effort, and moments where hesitation sets in.",
  },
  {
    id: "feature-activation",
    label: "Which variant improves activation of the primary feature?",
    objective:
      "Compare the two screens and identify which one nudges more users into engaging with the primary feature — first purchase, first search, first action, whichever applies.",
  },
  {
    id: "copy-cta",
    label: "Which copy or CTA resonates better?",
    objective:
      "Compare two variants that differ primarily in copy, headlines, or CTA treatment. Identify which phrasing triggers stronger intent to proceed and why.",
  },
  {
    id: "visual-hierarchy",
    label: "Which visual hierarchy leads to the primary action?",
    objective:
      "Compare two screens that differ in layout, visual emphasis, or hierarchy. Identify which design directs the user's eye and action to the primary goal more effectively.",
  },
];

export const CUSTOM_OBJECTIVE_ID = "custom";
