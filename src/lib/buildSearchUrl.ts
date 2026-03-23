import {
  QUERY_PARAMS,
  SORT_OPTIONS,
  SortOption,
} from '@/features/repository-search/constants';

type BuildSearchUrlParams = {
  currentSearchParams: string;
  query?: string;
  page?: number;
  sort?: SortOption;
};

export const buildSearchUrl = ({
  currentSearchParams,
  query,
  page,
  sort,
}: BuildSearchUrlParams) => {
  const params = new URLSearchParams(currentSearchParams);

  if (query !== undefined) {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      params.delete(QUERY_PARAMS.QUERY);
      params.delete(QUERY_PARAMS.PAGE);
    } else {
      params.set(QUERY_PARAMS.QUERY, trimmedQuery);
    }
  }

  if (page !== undefined) {
    params.set(QUERY_PARAMS.PAGE, String(page));
  }

  if (sort !== undefined) {
    params.set(QUERY_PARAMS.SORT, sort);
  }

  const queryString = params.toString();

  return queryString === '' ? '/' : `/?${queryString}`;
};
