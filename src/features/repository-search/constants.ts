export const SORT_OPTIONS = {
  BEST_MATCH: 'best-match',
  STARS: 'stars',
  FORKS: 'forks',
  UPDATED: 'updated',
} as const;

export const SORT_SELECT_OPTIONS = [
  { value: SORT_OPTIONS.BEST_MATCH, label: 'Best match' },
  { value: SORT_OPTIONS.STARS, label: 'Stars' },
  { value: SORT_OPTIONS.FORKS, label: 'Forks' },
  { value: SORT_OPTIONS.UPDATED, label: 'Recently updated' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
