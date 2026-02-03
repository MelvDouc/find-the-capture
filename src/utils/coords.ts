const RANK_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String(i + 1));
const FILE_NAMES: string[] = Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i));

export const COORD_NAMES = {
  v: RANK_NAMES,
  h: FILE_NAMES
} as const;

export const rankOf = (sq: number): number => Math.floor(sq / 8);
export const fileOf = (sq: number): number => sq % 8;