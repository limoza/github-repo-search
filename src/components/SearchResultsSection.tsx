import { redirect } from 'next/navigation';

import { Pagination } from '@/components/Pagination';
import { RepoList } from '@/components/RepoList';
import type { SearchState } from '@/features/repository-search/types';
import { buildSearchUrl } from '@/lib/buildSearchUrl';
import { searchRepositories } from '@/lib/github';
import type { GitHubRepositorySearchResponse } from '@/types/github';

type Props = {
  searchState: SearchState;
};

const PER_PAGE = 10;
const MAX_SEARCH_RESULT_PAGES = 100;

export const SearchResultsSection = async ({ searchState }: Props) => {
  if (!searchState.q) {
    return (
      <section className="space-y-2">
        <p className="text-sm text-muted-foreground mt-3">
          キーワードを入力して検索してください。
        </p>
      </section>
    );
  }

  const safePage = Math.min(
    Math.max(searchState.page, 1),
    MAX_SEARCH_RESULT_PAGES,
  );

  const repositoriesData: GitHubRepositorySearchResponse =
    await searchRepositories({
      q: searchState.q,
      page: safePage,
      perPage: PER_PAGE,
      sort: searchState.sort,
    });

  const totalCount = repositoriesData.total_count;
  const totalPages = Math.min(
    MAX_SEARCH_RESULT_PAGES,
    Math.ceil(totalCount / PER_PAGE),
  );

  const hasAvailablePages = totalPages > 0;
  const isPageOutOfRange = searchState.page > totalPages;

  if (hasAvailablePages && isPageOutOfRange) {
    const redirectUrl = buildSearchUrl({
      currentSearchParams: '',
      query: searchState.q,
      page: totalPages,
      sort: searchState.sort,
    });

    redirect(redirectUrl);
  }

  const startItemNumber = !hasAvailablePages
    ? 0
    : (safePage - 1) * PER_PAGE + 1;

  const endItemNumber = !hasAvailablePages
    ? 0
    : Math.min(safePage * PER_PAGE, totalCount);

  return (
    <section className="space-y-6 mt-3">
      <div className="border-b pb-3">
        <h2 className="text-xl tracking-tight text-foreground">
          <span className="font-bold">{searchState.q}</span>
          <span className="text-base ml-1">の検索結果</span>
        </h2>

        {hasAvailablePages && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {totalCount.toLocaleString()}件中 {startItemNumber}–{endItemNumber}
            件を表示
          </p>
        )}
      </div>

      {!hasAvailablePages ? (
        <div>
          <p className="font-medium text-foreground">
            該当するリポジトリが見つかりませんでした。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            キーワードを短くする、別の単語にする、表記を変えるなどして再度お試しください。
          </p>
        </div>
      ) : (
        <>
          <RepoList items={repositoriesData.items} />

          <Pagination
            totalPages={totalPages}
            currentPage={safePage}
            query={searchState.q}
            sort={searchState.sort}
          />
        </>
      )}
    </section>
  );
};
