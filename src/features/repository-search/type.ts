export type RawSearchParams = {
  q?: string | string[];
  page?: string | string[];
  sort?: string | string[];
};

export type SearchState = {
  q: string;
  page: number;
  sort: 'best-match' | 'stars';
};
