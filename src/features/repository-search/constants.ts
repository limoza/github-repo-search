export const SORT_OPTIONS = {
  BEST_MATCH: 'best-match',
  STARS: 'stars',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
