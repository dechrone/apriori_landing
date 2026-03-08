/**
 * Extract display name from professional_background string.
 *
 * Handles two patterns:
 *  1. "Bineeta Devi, a retired..." → "Bineeta Devi"
 *  2. "An experienced home-management specialist, Lalti Devi, a 55-year-old..." → "Lalti Devi"
 *
 * The regex finds "CapitalizedFirstname CapitalizedLastname, a " anywhere in the string.
 * Fallback: first two capitalized words, or "Persona {index}".
 */

export function parseDisplayName(
  professionalBackground: string | undefined,
  fallbackIndex: number
): string {
  if (!professionalBackground) return `Persona ${fallbackIndex + 1}`;

  // Match "Firstname Lastname, a " pattern (works anywhere in the string)
  const match = professionalBackground.match(
    /([A-Z][a-z]+(?: [A-Z][a-z]+)+),\s+a\s+/
  );
  if (match) return match[1];

  // Fallback: first two words if they both start with uppercase (likely a name)
  const words = professionalBackground.split(" ");
  if (
    words.length >= 2 &&
    /^[A-Z]/.test(words[0]) &&
    /^[A-Z]/.test(words[1])
  ) {
    return `${words[0]} ${words[1]}`;
  }

  return `Persona ${fallbackIndex + 1}`;
}

/**
 * Short label (initials) for avatar from display name.
 * "Shankar Bhoju" → "SB"
 * "Persona 1" → "P1"
 */
export function parseShortLabel(displayName: string): string {
  const parts = displayName.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
