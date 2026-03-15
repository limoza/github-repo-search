import type {
  RawSearchParams,
  SearchState,
} from '@/src/features/repository-search/type';

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
  const sort = sortValue === 'stars' ? 'stars' : 'best-match';

  return { q, page, sort };
};
