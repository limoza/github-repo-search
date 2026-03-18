import { Pagination } from '@/components/Pagination';
import { RepoList } from '@/components/RepoList';
import type { SearchState } from '@/features/repository-search/types';
import { searchRepositories } from '@/lib/github';
import type { GitHubRepositorySearchResponse } from '@/types/github';

type Props = {
  searchState: SearchState;
};

const PER_PAGE = 10;

export const SearchResultsSection = async ({ searchState }: Props) => {
  const hasQuery = searchState.q !== '';

  if (!hasQuery) {
    return (
      <section>
        <p>キーワードを入力して検索してください。</p>
      </section>
    );
  }

  const repositoriesData: GitHubRepositorySearchResponse | null =
    await searchRepositories({
      q: searchState.q,
      page: searchState.page,
      perPage: PER_PAGE,
      sort: searchState.sort,
    });

  const totalPages = repositoriesData
    ? Math.min(100, Math.ceil(repositoriesData.total_count / PER_PAGE))
    : 0;

  return (
    <section>
      {repositoriesData && (
        <>
          <RepoList items={repositoriesData.items} />
          <Pagination
            totalPages={totalPages}
            currentPage={searchState.page}
            query={searchState.q}
            sort={searchState.sort}
          />
        </>
      )}
    </section>
  );
};
