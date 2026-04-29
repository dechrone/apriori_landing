/**
 * Deterministic avatar color from persona UUID.
 */

const AVATAR_COLORS = [
  "#374151",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export function avatarColorFromUuid(uuid: string): string {
  const code = uuid.charCodeAt(0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export { AVATAR_COLORS };
