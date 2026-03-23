export const QUERY_PARAMS = {
  QUERY: 'q',
  PAGE: 'page',
  SORT: 'sort',
} as const;

export const SORT_OPTIONS = {
  BEST_MATCH: 'best-match',
  STARS: 'stars',
  FORKS: 'forks',
  UPDATED: 'updated',
} as const;

export const SORT_SELECT_OPTIONS = [
  { value: SORT_OPTIONS.BEST_MATCH, label: '関連度順' },
  { value: SORT_OPTIONS.STARS, label: 'Star数順' },
  { value: SORT_OPTIONS.FORKS, label: 'Forks数順' },
  { value: SORT_OPTIONS.UPDATED, label: '更新日時順' },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
