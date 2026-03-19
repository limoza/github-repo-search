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

  const repositoriesData: GitHubRepositorySearchResponse | null = !hasQuery
    ? null
    : await searchRepositories({
        q: searchState.q,
        page: searchState.page,
        perPage: PER_PAGE,
        sort: searchState.sort,
      });

  const totalCount = repositoriesData?.total_count ?? 0;

  const startItemNumber =
    totalCount === 0 ? 0 : (searchState.page - 1) * PER_PAGE + 1;

  const endItemNumber =
    totalCount === 0 ? 0 : Math.min(searchState.page * PER_PAGE, totalCount);

  const totalPages =
    hasQuery && repositoriesData
      ? Math.min(100, Math.ceil(totalCount / PER_PAGE))
      : 0;

  return (
    <section>
      {!hasQuery ? (
        <p>キーワードを入力して検索してください。</p>
      ) : (
        repositoriesData && (
          <>
            <div>
              <h2>「{searchState.q}」の検索結果</h2>
              {totalCount === 0 ? (
                <p>該当するリポジトリが見つかりませんでした。</p>
              ) : (
                <p>
                  {totalCount.toLocaleString()}件中 {startItemNumber}–
                  {endItemNumber}件を表示
                </p>
              )}
            </div>

            <RepoList items={repositoriesData.items} />

            <Pagination
              totalPages={totalPages}
              currentPage={searchState.page}
              query={searchState.q}
              sort={searchState.sort}
            />
          </>
        )
      )}
    </section>
  );
};
