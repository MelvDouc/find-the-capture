const RANK_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String(i + 1));
const FILE_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i));

export const COORD_NAMES = {
  h: RANK_NAMES,
  v: FILE_NAMES
} as const;