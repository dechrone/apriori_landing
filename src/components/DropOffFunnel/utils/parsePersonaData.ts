/**
 * parsePersonaData — builds PersonaAtScreen[] for a given screen_id.
 *
 * THE SINGLE RULE: Only show personas who **dropped off** at the selected screen.
 * Filter by: persona.outcome === "dropped_off_at_{screenId}"
 * Then find their screen_monologue entry for that screen to get dialogue data.
 *
 * Field map (source → display):
 *   professional_background regex  → name
 *   demographics.occupation        → occupation  (strip "No Occupation / " prefix)
 *   demographics.age               → age
 *   demographics.district          → district
 *   demographics.behavioral_archetype → archetype
 *   screen_monologues[matched].internal_monologue  → gut_reaction
 *   screen_monologues[matched].reasoning           → reasoning
 *   screen_monologues[matched].emotional_state     → emotional_state_chips (split ", ")
 *   screen_monologues[matched].friction_points     → friction_points
 *   screen_monologues[matched].trust_score         → trust_score
 *   screen_monologues[matched].time_seconds        → time_seconds
 */

import type { SimulationData, PersonaDetail, ScreenMonologue } from "@/types/simulation";
import { parseDisplayName, parseShortLabel } from "./nameParser";
import { avatarColorFromUuid } from "./colorHelper";

/* ── Exported type ── */

export interface PersonaAtScreen {
  persona_uuid: string;
  display_name: string;
  short_label: string;
  avatar_color: string;
  occupation: string;
  age: number | null;
  district: string;
  behavioral_archetype: string;
  gut_reaction: string;
  internal_reasoning: string;
  emotional_state: string;
  /** emotional_state split on ", " for chip rendering */
  emotional_state_chips: string[];
  friction_points: string[];
  dropped_here: true;
  trust_score: number | null;
  time_seconds: number | null;
}

/* ── Helper ── */

function stripOccupationPrefix(raw: string): string {
  if (!raw) return "";
  return raw.replace(/^No Occupation\s*\/?\s*/i, "").trim() || raw;
}

/* ── Main parser (PRD-exact implementation) ── */

export function getDroppedPersonasAtScreen(
  personaDetails: PersonaDetail[],
  selectedScreenId: string
): PersonaAtScreen[] {
  return personaDetails
    .filter((p) => p.outcome === `dropped_off_at_${selectedScreenId}`)
    .map((persona, pIdx) => {
      // Find the monologue entry for the screen they dropped at
      const monologue: ScreenMonologue | undefined =
        persona.screen_monologues?.find((m) => m.screen_id === selectedScreenId);

      // Name: regex from professional_background
      const displayName = parseDisplayName(persona.professional_background, pIdx);
      const demo = persona.demographics ?? {};

      // Emotional state → split into chips
      const emotionalState = monologue?.emotional_state ?? "";
      const emotionalChips = emotionalState
        ? emotionalState.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      return {
        persona_uuid: persona.persona_uuid,
        display_name: displayName,
        short_label: parseShortLabel(displayName),
        avatar_color: avatarColorFromUuid(persona.persona_uuid),
        occupation: stripOccupationPrefix((demo.occupation as string) ?? ""),
        age: (demo.age as number) ?? null,
        district: (demo.district as string) ?? "",
        behavioral_archetype: (demo.behavioral_archetype as string) ?? "",

        // Panel content — all from the matched screen_monologue entry
        gut_reaction: monologue?.internal_monologue ?? persona.overall_monologue ?? "",
        internal_reasoning: monologue?.reasoning ?? "",
        emotional_state: emotionalState,
        emotional_state_chips: emotionalChips,
        friction_points: monologue?.friction_points ?? [],

        // Always true — we only include dropped personas
        dropped_here: true as const,

        // Scores from the monologue entry
        trust_score: monologue?.trust_score ?? null,
        time_seconds: monologue?.time_seconds ?? null,
      };
    });
}

/**
 * Convenience wrapper that takes SimulationData instead of persona_details[].
 * Used by the DropOffFunnel index component.
 */
export function parsePersonasAtScreen(
  data: SimulationData,
  screenId: string
): PersonaAtScreen[] {
  const personaDetails: PersonaDetail[] = (data.persona_details ?? []) as PersonaDetail[];
  return getDroppedPersonasAtScreen(personaDetails, screenId);
}