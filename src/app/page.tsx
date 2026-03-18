import { Suspense } from 'react';

import { SearchForm } from '@/components/SearchForm';
import { SearchResultsLoading } from '@/components/SearchResultsLoading';
import { SearchResultsSection } from '@/components/SearchResultsSection';
import { SortSelect } from '@/components/SortSelect';
import { normalizeSearchParams } from '@/features/repository-search/search-params';
import type { RawSearchParams } from '@/features/repository-search/types';

type SearchParams = Promise<RawSearchParams>;

type PageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchState = normalizeSearchParams(params);
  const { q, sort, page } = searchState;

  return (
    <main>
      <h1>GitHub リポジトリ検索</h1>
      <SearchForm key={q} initialQuery={q} />
      <SortSelect currentSort={sort} />
      <Suspense
        key={`${q}-${page}-${sort}`}
        fallback={<SearchResultsLoading />}
      >
        <SearchResultsSection searchState={searchState} />
      </Suspense>
    </main>
  );
}
