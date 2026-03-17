import { Pagination } from '@/components/Pagination';
import { RepoList } from '@/components/RepoList';
import { SearchForm } from '@/components/SearchForm';
import { SortSelect } from '@/components/SortSelect';
import { normalizeSearchParams } from '@/features/repository-search/search-params';
import type { RawSearchParams } from '@/features/repository-search/types';
import { searchRepositories } from '@/lib/github';
import type { GitHubSearchResponse } from '@/types/github';

type SearchParams = Promise<RawSearchParams>;

type PageProps = {
  searchParams: SearchParams;
};

const PER_PAGE = 10;

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchState = normalizeSearchParams(params);

  const hasQuery = searchState.q !== '';

  const repositoriesData: GitHubSearchResponse | null = !hasQuery
    ? null
    : await searchRepositories({
        q: searchState.q,
        page: searchState.page,
        perPage: PER_PAGE,
        sort: searchState.sort,
      });

  const totalPages =
    hasQuery && repositoriesData
      ? Math.min(100, Math.ceil(repositoriesData.total_count / PER_PAGE))
      : 0;

  return (
    <main>
      <h1>GitHub リポジトリ検索</h1>
      <SearchForm key={searchState.q} initialQuery={searchState.q} />
      <SortSelect currentSort={searchState.sort} />

      {!hasQuery ? (
        <p>キーワードを入力して検索してください。</p>
      ) : (
        repositoriesData && (
          <RepoList items={repositoriesData.items.slice(0, 10)} />
        )
      )}

      {hasQuery && (
        <Pagination
          totalPages={totalPages}
          currentPage={searchState.page}
          query={searchState.q}
          sort={searchState.sort}
        />
      )}
    </main>
  );
}
