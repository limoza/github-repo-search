import {
  SORT_OPTIONS,
  SortOption,
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

export const normalizeSearchParams = (params: RawSearchParams): SearchState => {
  const q = getSingleValue(params.q)?.trim() ?? '';

  const rawPage = Number(getSingleValue(params.page) ?? '1');
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const sortValue = getSingleValue(params.sort);
  const isValidSort = (value: string | undefined): value is SortOption =>
    value === SORT_OPTIONS.BEST_MATCH ||
    value === SORT_OPTIONS.STARS ||
    value === SORT_OPTIONS.FORKS ||
    value === SORT_OPTIONS.UPDATED;

  const sort = isValidSort(sortValue) ? sortValue : SORT_OPTIONS.BEST_MATCH;

  return { q, page, sort };
};
