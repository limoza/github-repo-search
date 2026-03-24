import {
  SORT_OPTIONS,
  type SortOption,
} from '@/features/repository-search/constants';
import type {
  RawSearchParams,
  SearchState,
} from '@/features/repository-search/types';

export const getSingleValue = (
  value?: string | string[],
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const isValidSort = (value: string | undefined): value is SortOption =>
  value === SORT_OPTIONS.BEST_MATCH ||
  value === SORT_OPTIONS.STARS ||
  value === SORT_OPTIONS.FORKS ||
  value === SORT_OPTIONS.UPDATED;

const normalizePage = (value: string | undefined): number => {
  const parsedPage = Number(value);

  if (!Number.isFinite(parsedPage)) {
    return 1;
  }

  const normalizedPage = Math.floor(parsedPage);

  return normalizedPage >= 1 ? normalizedPage : 1;
};

const normalizeSort = (value: string | undefined): SortOption => {
  return isValidSort(value) ? value : SORT_OPTIONS.BEST_MATCH;
};

export const normalizeSearchParams = (params: RawSearchParams): SearchState => {
  const q = getSingleValue(params.q)?.trim() ?? '';
  const page = normalizePage(getSingleValue(params.page));
  const sort = normalizeSort(getSingleValue(params.sort));

  return { q, page, sort };
};
