/**
 * Audience form section config: labels, order, and "Why we ask" copy.
 * PRD: Modular sections, no long form, contextual explanation on the right.
 */

export type AudienceSectionId =
  | 'identity'
  | 'firmographics'
  | 'goals'
  | 'pain-points'
  | 'decision-behavior'
  | 'budget';

export interface AudienceSectionConfig {
  id: AudienceSectionId;
  label: string;
  shortLabel?: string;
  whyWeAsk: string;
  required?: boolean;
}

export const AUDIENCE_SECTIONS: AudienceSectionConfig[] = [
  {
    id: 'identity',
    label: 'Identity & Context',
    shortLabel: 'Identity',
    whyWeAsk:
      'Anchors the persona in a real-world business context. Sets authority, influence, and decision power—which impacts risk tolerance and speed in simulations.',
    required: true,
  },
  {
    id: 'firmographics',
    label: 'Firmographics',
    shortLabel: 'Firmographics',
    whyWeAsk:
      'Company size, stage, and industry shape budget sensitivity, sales friction, and appetite for experimentation. Simulations use this to avoid unrealistic scenarios.',
  },
  {
    id: 'goals',
    label: 'Goals & Success Metrics',
    shortLabel: 'Goals',
    whyWeAsk:
      'Simulations optimize for their definition of success, not a generic one. Top goals and personal metrics drive how we model conversion and drop-off.',
  },
  {
    id: 'pain-points',
    label: 'Pain Points & Frictions',
    shortLabel: 'Pain Points',
    whyWeAsk:
      'Determines emotional response to flows, patience thresholds, and drop-off likelihood. What they’ve tried before (and failed) informs objection handling.',
  },
  {
    id: 'decision-behavior',
    label: 'Decision-Making Behavior',
    shortLabel: 'Behavior',
    whyWeAsk:
      'Powers the simulation engine. Risk appetite, data dependency, and change resistance control drop-offs, objection handling, and conversion probability.',
    required: true,
  },
  {
    id: 'budget',
    label: 'Budget & Economics',
    shortLabel: 'Budget',
    whyWeAsk:
      'Avoids unrealistic simulations where low-budget buyers act like enterprises. Budget flexibility and approval requirements affect pricing and offer sensitivity.',
  },
];

export function getSectionConfig(id: AudienceSectionId): AudienceSectionConfig | undefined {
  return AUDIENCE_SECTIONS.find((s) => s.id === id);
}
